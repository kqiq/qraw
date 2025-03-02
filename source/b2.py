
import time
import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse
from typing import Optional, Dict, List
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException
import threading
from bs4 import BeautifulSoup
import logging
import os
import sys
from cloud_by_pass import CloudflareBypasser

from DrissionPage import ChromiumPage, ChromiumOptions
#from pyvirtualdisplay import Display

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)



class ChromeDriverManager:
    """Manage Chrome driver instances with resource pooling"""
    def __init__(self, max_drivers: int = os.cpu_count(), headless: bool = True):
        self.max_drivers = max_drivers
        self.headless = headless
        self.driver_pool = []
        self.lock = threading.Lock()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close_all_drivers()

    def get_driver(self) -> ChromiumPage:
        """Get a driver from pool or create new one"""
        with self.lock:
            if self.driver_pool:
                return self.driver_pool.pop()

            # Configure ChromiumOptions
            browser_path = os.getenv('CHROME_PATH', "/usr/bin/google-chrome")

            options = ChromiumOptions().auto_port()
            options.set_paths(browser_path=browser_path)

            # Basic arguments for both headless and non-headless modes
            arguments = [
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-software-rasterizer",
                "--disable-blink-features=AutomationControlled",
                "--disable-features=IsolateOrigins,site-per-process",
                "--enable-features=NetworkService,NetworkServiceInProcess",
                "--window-size=1920,1080",
            ]

            if self.headless:
                arguments.extend([
                    "--headless=new",
                ])
            else:
                arguments.extend([
                    "--start-maximized",
                    "--disable-notifications"
                ])

            # Set user agent
            options.set_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36")

            # Add all arguments
            for argument in arguments:
                options.set_argument(argument)

            # Additional DrissionPage-specific settings
            options.set_pref('excludeSwitches', ['enable-automation'])
            options.set_pref('useAutomationExtension', False)

            # Create and configure the page
            page = ChromiumPage(addr_or_opts=options)

            # Set timeouts using the correct method
            page.set.timeouts(30, 30, 30)  # page load, script, element

            return page

    def return_driver(self, driver: ChromiumPage):
        """Return driver to the pool"""
        with self.lock:
            if len(self.driver_pool) < self.max_drivers:
                self.driver_pool.append(driver)
            else:
                driver.quit()

    def close_all_drivers(self):
        """Cleanup all drivers"""
        with self.lock:
            for driver in self.driver_pool:
                driver.quit()
            self.driver_pool.clear()

class SPATextExtractor:
    """High-performance SPA text extraction with resource pooling"""
    def __init__(self, driver_manager: ChromeDriverManager):
        self.driver_manager = driver_manager
        self.visited_urls = set()
        self.cleaner = TextCleaner()
        self.scroll_attempts = 3
        self.timeout = 30

    def process_urls(self, urls: List[str]) -> Dict[str, Optional[Dict]]:
        """Process multiple URLs in parallel"""
        with ThreadPoolExecutor(max_workers=self.driver_manager.max_drivers) as executor:
            futures = {
                executor.submit(self.process_single_url, url): url
                for url in urls if url not in self.visited_urls
            }

            results = {}
            for future in as_completed(futures):
                url = futures[future]
                try:
                    results[url] = future.result()
                except Exception as e:
                    logger.error(f"Failed processing {url}: {str(e)}")
                    results[url] = None
            return results

    def process_single_url(self, url: str) -> Optional[Dict]:
        """Process a single URL with retry logic"""
        driver = None
        try:
            driver = self.driver_manager.get_driver()
            result = self._extract_text(driver, url)
            self.visited_urls.add(url)
            return result
        except WebDriverException as e:
            logger.warning(f"Retrying {url} due to error: {str(e)}")
            return self._retry_extraction(url)
        except Exception as e:
            logger.error(f"Critical error processing {url}: {str(e)}")
            return None
        finally:
            if driver:
                self.driver_manager.return_driver(driver)

    def _scroll_page(self, driver: ChromiumPage) -> List[str]:
        """Handle scrolling with DrissionPage compatibility"""
        content_snapshots = []
        last_height = 0

        # Get initial content
        content_snapshots.append(driver.html)

        # Scroll using DrissionPage's methods
        for _ in range(self.scroll_attempts):
            # Using DrissionPage's page_scroll method
            driver.scroll.to_bottom()
            time.sleep(1.5)

            # Get new height using run_js
            new_height = driver.run_js("return document.body.scrollHeight")

            if new_height == last_height:
                break

            last_height = new_height
            content_snapshots.append(driver.html)

        return content_snapshots

    def _extract_text(self, driver: ChromiumPage, url: str) -> Dict:
        """Core extraction logic"""
        try:
            # Navigate to URL
            driver.get(url)

            # Initialize and run Cloudflare bypass
            cf_bypasser = CloudflareBypasser(driver, max_retries=3)
            bypass_success = cf_bypasser.bypass()

            if not bypass_success:
                raise Exception("Failed to bypass Cloudflare protection")

            # Get content with scrolling
            content_snapshots = self._scroll_page(driver)

            # Process and merge content
            cleaned_texts = [self.cleaner.clean(html) for html in content_snapshots]
            merged_text = self.cleaner.merge_texts(cleaned_texts)

            # Verify the content isn't still showing Cloudflare page
            if "attention required" in merged_text.lower() and "cloudflare" in merged_text.lower():
                raise Exception("Still on Cloudflare protection page")

            return {
                "url": url,
                "text": merged_text,
                "word_count": len(merged_text.split()),
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
            }

        except Exception as e:
            logger.error(f"Extraction error for {url}: {str(e)}")
            return None



    # def _extract_text(self, driver: ChromiumPage, url: str) -> Dict:
    #     """Core extraction logic"""
    #     driver.get(url)

    #     # Use the new CloudflareBypasser
    #     cf_bypasser = CloudflareBypasser(driver)
    #     cf_bypasser.bypass()

    #     content_snapshots = []
    #     last_height = 0

    #     # Initial content
    #     content_snapshots.append(driver.html)  # Use .html instead of .page_source

    #     # Scroll-based content triggering
    #     for _ in range(self.scroll_attempts):
    #         driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    #         time.sleep(1.5)
    #         new_height = driver.execute_script("return document.body.scrollHeight")
    #         if new_height == last_height:
    #             break
    #         last_height = new_height
    #         content_snapshots.append(driver.html)

    #     # Process and merge content
    #     cleaned_texts = [self.cleaner.clean(html) for html in content_snapshots]
    #     merged_text = self.cleaner.merge_texts(cleaned_texts)

    #     return {
    #         "url": url,
    #         "text": merged_text,
    #         "word_count": len(merged_text.split()),
    #         "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    #     }

    # def _extract_text(self, driver: Chrome, url: str) -> Dict:
    #     """Core extraction logic"""
    #     driver.set_page_load_timeout(self.timeout)
    #     driver.get(url)


    #     # this implementation is shallow and you have to work more on it
    #     # all we do is to with the initilized driver only file the item and click on that
    #     cf_bypasser = CloudflareBypasser(driver)
    #     cf_bypasser.bypass()



    #     content_snapshots = []
    #     last_height = 0

    #     # Initial content
    #     content_snapshots.append(driver.page_source)

    #     # Scroll-based content triggering
    #     for _ in range(self.scroll_attempts):
    #         driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    #         time.sleep(1.5)
    #         new_height = driver.execute_script("return document.body.scrollHeight")
    #         if new_height == last_height:
    #             break
    #         last_height = new_height
    #         content_snapshots.append(driver.page_source)

    #     # Process and merge content
    #     cleaned_texts = [self.cleaner.clean(html) for html in content_snapshots]
    #     merged_text = self.cleaner.merge_texts(cleaned_texts)

    #     return {
    #         "url": url,
    #         "text": merged_text,
    #         "word_count": len(merged_text.split()),
    #         "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    #     }

    def _retry_extraction(self, url: str, max_retries: int = 2) -> Optional[Dict]:
        """Retry mechanism with exponential backoff"""
        for attempt in range(1, max_retries + 1):
            try:
                driver = self.driver_manager.get_driver()
                return self._extract_text(driver, url)
            except Exception as e:
                logger.warning(f"Retry {attempt} failed for {url}: {str(e)}")
                time.sleep(2 ** attempt)
            finally:
                if driver:
                    self.driver_manager.return_driver(driver)
        return None

class TextCleaner:
    """Optimized text cleaning and processing"""
    def __init__(self):
        self.remove_patterns = re.compile(r'\[.*?\]|\(.*?\)|\{.*?\}|<.*?>')
        self.whitespace_pattern = re.compile(r'\s{2,}')
        self.non_printable = re.compile(r'[\x00-\x1f\x7f-\x9f]')

        self.excluded_tags = {'script', 'style', 'nav', 'header',
                            'footer', 'noscript', 'meta', 'link',
                            'svg', 'img', 'button', 'input'}

    def clean(self, html: str) -> str:
        """Fast HTML cleaning pipeline"""
        try:
            soup = BeautifulSoup(html, 'lxml')
            for tag in self.excluded_tags:
                for element in soup.find_all(tag):
                    element.decompose()

            text = soup.get_text()
            text = self.remove_patterns.sub('', text)
            text = self.non_printable.sub(' ', text)
            text = self.whitespace_pattern.sub(' ', text)
            return text.strip()
        except Exception as e:
            logger.error(f"Cleaning error: {str(e)}")
            return ''

    def merge_texts(self, texts: List[str]) -> str:
        """Memory-efficient text merging with deduplication"""
        seen = set()
        unique_lines = []

        for text in texts:
            for line in text.split('\n'):
                line = line.strip()
                if line and line not in seen:
                    seen.add(line)
                    unique_lines.append(line)
                    # Memory management for large texts
                    if len(seen) > 10000:
                        seen.clear()

        return '\n'.join(unique_lines)




# Usage Example
if __name__ == "__main__":
    if len(sys.argv) < 2 :
        print('Usage : python file [<url> <url2>')
        sys.exit(1)


    urls = sys.argv[1:]


    config = {
        "max_drivers": 4,
        "headless": False,

        "urls": urls
    }

    with ChromeDriverManager(
        max_drivers=config["max_drivers"],
        headless=config["headless"]
    ) as driver_manager:
        extractor = SPATextExtractor(driver_manager)
        # batch
        results = extractor.process_urls(config["urls"])
        print(results)

        # # single
        # res = extractor.process_urls(['https://google.com'])
        # print(res)

        for url, data in results.items():
            if data:
                filename = f"{urlparse(url).netloc}.json"
                with open(filename, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False)

# scp and scp advance are both working and its good : all in one url scrapper whether spa or whatever.
