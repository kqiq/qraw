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

    def get_driver(self) -> Chrome:
        """Get a driver from pool or create new one"""
        with self.lock:
            if self.driver_pool:
                return self.driver_pool.pop()

            options = Options()
            if self.headless:
                options.add_argument("--headless=new")
            options.add_argument("--disable-gpu")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            return Chrome(options=options)

    def return_driver(self, driver: Chrome):
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

    def _extract_text(self, driver: Chrome, url: str) -> Dict:
        """Core extraction logic"""
        driver.set_page_load_timeout(self.timeout)
        driver.get(url)


        # this implementation is shallow and you have to work more on it
        # all we do is to with the initilized driver only file the item and click on that
        cf_bypasser = CloudflareBypasser(driver)
        cf_bypasser.bypass()



        content_snapshots = []
        last_height = 0

        # Initial content
        content_snapshots.append(driver.page_source)

        # Scroll-based content triggering
        for _ in range(self.scroll_attempts):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.5)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
            content_snapshots.append(driver.page_source)

        # Process and merge content
        cleaned_texts = [self.cleaner.clean(html) for html in content_snapshots]
        merged_text = self.cleaner.merge_texts(cleaned_texts)

        return {
            "url": url,
            "text": merged_text,
            "word_count": len(merged_text.split()),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

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
        "headless": True,
        "timeout": 45,
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
