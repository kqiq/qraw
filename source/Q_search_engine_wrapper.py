import time
import json
import re
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, List
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException
from bs4 import BeautifulSoup
import logging
import os
import threading
import random
import sys

from selenium_stealth import stealth
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

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
        self.user_agents = self._load_user_agents()
        self.current_ua = None

    def __enter__(self):
        return self

    def _load_user_agents(self):
            """Extended list of modern user agents"""
            return [
                # Chrome
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

                # Firefox
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.3; rv:122.0) Gecko/20100101 Firefox/122.0",

                # Safari
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",

                # Edge
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",

                # Mobile
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
                "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
            ]

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


            # anti detection stuffs
            options.add_argument("--disable-blink-features=AutomationControlled")
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option("useAutomationExtension", False)
            options.add_argument("--disable-gpu")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")




            self.current_ua = random.choice(self.user_agents)
            options.add_argument(f"user-agent={self.current_ua}")




            # just for testing
            #
            driver = Chrome(options=options)

            stealth(driver,languages=["en-US", "en"],vendor="Google Inc.",platform="Win32",webgl_vendor="Intel Inc.",renderer="Intel Iris OpenGL Engine",fix_hairline=True,)

            # Additional anti-detection measures
            driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
                "source": """
                    Object.defineProperty(navigator, 'webdriver', {
                        get: () => undefined
                    })
                """
            })
            return driver;



            #return Chrome(options=options)

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

class SearchEngineScraper:
    """Scrape top results from major search engines"""

    SEARCH_URLS = {
            'google': 'https://www.google.com/search?q={}&num=20',
            'bing': 'https://www.bing.com/search?q={}&count=20',
            'yahoo': 'https://search.yahoo.com/search?p={}&n=20',
            'duckduckgo': 'https://duckduckgo.com/html/?q={}',
            'brave': 'https://search.brave.com/search?q={}&source=web',
            'yandex': 'https://yandex.com/search/?text={}',
            'aol': 'https://search.aol.com/aol/search?q={}' ,
        }

    def __init__(self, driver_manager: ChromeDriverManager):
        self.driver_manager = driver_manager
        self.timeout = 30

    def scrape_all_engines(self, query: str, engines: List[str]) -> Dict[str, List[str]]:
        """Scrape multiple search engines in parallel"""
        with ThreadPoolExecutor(max_workers=self.driver_manager.max_drivers) as executor:
            futures = {
                executor.submit(self.scrape_engine, engine, query): engine
                for engine in engines
            }

            results = {}
            for future in as_completed(futures):
                engine = futures[future]
                try:
                    results[engine] = future.result()
                except Exception as e:
                    logger.error(f"Failed scraping {engine}: {str(e)}")
                    results[engine] = []
            return results

    def scrape_engine(self, engine: str, query: str) -> List[str]:
        """Scrape a single search engine with retry logic"""
        driver = None
        try:
            driver = self.driver_manager.get_driver()
            return self._extract_results(driver, engine, query)
        except WebDriverException as e:
            logger.warning(f"Retrying {engine} due to error: {str(e)}")
            return self._retry_scrape(engine, query)
        except Exception as e:
            logger.error(f"Critical error with {engine}: {str(e)}")
            return []
        finally:
            if driver:
                self.driver_manager.return_driver(driver)
    def _extract_results(self, driver: Chrome, engine: str, query: str) -> List[str]:
        """Enhanced extraction for AOL and Ecosia"""

        if engine == 'brave':
            encoded_query = urllib.parse.quote_plus(query)
        else:
            encoded_query = urllib.parse.quote(query)


        #search_url = self.SEARCH_URLS[engine].format(urllib.parse.quote(encoded_query))

        search_url = self.SEARCH_URLS[engine].format(encoded_query)
        driver.set_page_load_timeout(self.timeout)

        try:
            driver.get(search_url)
            time.sleep(2)  # Allow initial results to load
        except WebDriverException:
            pass  # Page might still have loaded content

        # Scroll to trigger dynamic loading
        for _ in range(2):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.5)

        html = driver.page_source
        parser = getattr(self, f"_parse_{engine}")
        return parser(html)[:10]  # Return top 10 results


    # def _extract_results(self, driver: Chrome, engine: str, query: str) -> List[str]:
    #     """Core scraping logic for search results"""

    #     # if engine == 'ecosia':
    #     #     # Ecosia needs full page interaction
    #     #     encoded_query = urllib.parse.quote(query)
    #     #     search_url = self.SEARCH_URLS[engine].format(encoded_query)

    #     #     try:
    #     #         driver.get(search_url)
    #     #         # Wait for JavaScript rendering
    #     #         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.result'))
    #     #         # Scroll through multiple pages
    #     #         for _ in range(2):
    #     #             driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    #     #             time.sleep(1.5)
    #     #     except Exception as e:
    #     #         logger.warning(f"Ecosia loading issue: {str(e)}")

    #     #     return self._parse_ecosia(driver.page_source)

        # if engine == 'brave':
        #     encoded_query = urllib.parse.quote_plus(query)
        # else:
        #     encoded_query = urllib.parse.quote(query)


        # search_url = self.SEARCH_URLS[engine].format(urllib.parse.quote(encoded_query))
        # driver.set_page_load_timeout(self.timeout)

        # try:
        #     driver.get(search_url)
        #     time.sleep(2)  # Allow initial results to load
        # except WebDriverException:
        #     pass  # Page might still have loaded content

        # # Scroll to trigger dynamic loading
        # for _ in range(2):
        #     driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        #     time.sleep(1.5)

        # html = driver.page_source
        # parser = getattr(self, f"_parse_{engine}")
        # return parser(html)[:10]  # Return top 10 results

    def _retry_scrape(self, engine: str, query: str, max_retries: int = 2) -> List[str]:
        """Retry mechanism with exponential backoff"""
        for attempt in range(1, max_retries + 1):
            try:
                driver = self.driver_manager.get_driver()
                return self._extract_results(driver, engine, query)
            except Exception as e:
                logger.warning(f"Retry {attempt} failed for {engine}: {str(e)}")
                time.sleep(2 ** attempt)
            finally:
                if driver:
                    self.driver_manager.return_driver(driver)
        return []

    def _parse_aol(self, html: str) -> List[str]:
        """AOL parser targeting specific link classes"""
        soup = BeautifulSoup(html, 'lxml')
        results = []

        # Find all links with specified classes
        for link in soup.select('a.ac-algo.fz-l.ac-21th.lh-24[href]'):
            url = link['href']
            # Clean URL parameters and fragments
            parsed = urllib.parse.urlparse(url)
            if not parsed.netloc:  # Handle relative URLs
                continue
            clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}".rstrip('/')
            results.append(clean_url)

        # Remove duplicates while preserving order
        seen = set()
        return [url for url in results if url not in seen and not seen.add(url)][:10]


    # Add new parsers for Brave and Yandex
    def _parse_brave(self, html: str) -> List[str]:
        """Parse Brave search results with updated selectors"""
        soup = BeautifulSoup(html, 'lxml')

        results = []

        # Main result containers
        for result in soup.select('[data-loc="main"] div.card, [data-loc="main"] div.fdb'):
            # Extract both organic and news results
            link = result.select_one('a[href].h:not([data-type="outlink"])')
            if link and link.has_attr('href'):
                url = link['href'].split('?')[0]  # Clean tracking parameters
                results.append(url)

        # Remove duplicates while preserving order
        seen = set()
        return [url for url in results if url not in seen and not seen.add(url)][:10]

    def _parse_yandex(self, html: str) -> List[str]:
        """Parse Yandex search results"""
        soup = BeautifulSoup(html, 'lxml')
        results = []
        for result in soup.select('li.serp-item'):
            link = result.select_one('a.OrganicTitle-Link[href]')
            if link:
                results.append(link['href'])
        return results


    def _parse_google(self, html: str) -> List[str]:
        """Parse Google search results with updated selectors"""
        soup = BeautifulSoup(html, 'lxml')
        results = []

        # Main organic results container
        main_div = soup.find('div', id='search')
        if not main_div:
            return []

        # Different types of result containers
        for result in main_div.select('div.g, div.g, div.xpd, div.Ww4FFb, div.tF2Cxc'):
            # Skip featured snippets and ads
            if result.find_parents('div', {'data-sncf': '1'}):
                continue

            # Extract link from different possible locations
            link = result.select_one('a[href^="/url?q="], a[ping]')
            if not link or not link.has_attr('href'):
                continue

            # Clean Google tracking parameters
            raw_url = link['href']
            if raw_url.startswith('/url?q='):
                url_match = re.search(r'q=([^&]*)', raw_url)
                if url_match:
                    decoded_url = urllib.parse.unquote(url_match.group(1))
            else:
                decoded_url = raw_url

            # Validate and clean URL
            if decoded_url.startswith('http'):
                # Remove tracking parameters
                clean_url = urllib.parse.urlparse(decoded_url)
                final_url = f"{clean_url.scheme}://{clean_url.netloc}{clean_url.path}"
                results.append(final_url.split('&')[0])  # Remove any remaining parameters

        # Remove duplicates while preserving order
        seen = set()
        return [url for url in results if not (url in seen or seen.add(url))][:10]

    def _parse_bing(self, html: str) -> List[str]:
        """Parse Bing search results"""
        soup = BeautifulSoup(html, 'lxml')
        return [a['href'] for li in soup.select('li.b_algo')
                if (a := li.select_one('h2 a')) and a.has_attr('href')]

    def _parse_yahoo(self, html: str) -> List[str]:
        """Parse Yahoo search results"""
        soup = BeautifulSoup(html, 'lxml')
        return [a['href'] for div in soup.select('div.algo-sr')
                if (a := div.select_one('h3.title a')) and a.has_attr('href')]

    def _parse_duckduckgo(self, html: str) -> List[str]:
        """Parse DuckDuckGo search results"""
        soup = BeautifulSoup(html, 'lxml')
        results = []
        for result in soup.select('div.result'):
            if link := result.select_one('a.result__url'):
                href = link['href']
                if not href.startswith('//ad'):
                    results.append(urllib.parse.unquote(href))
        return results

# Usage Example
if __name__ == "__main__":
    if len(sys.argv) < 2 :
        print('Usage : python file query')
        sys.exit(1)

    query = str(sys.argv[1])

    config = {
        "max_drivers": 4,
        "headless": True,
        "timeout": 45,
        "query": query,
        "engines": [ "google", "bing", "yahoo", "duckduckgo" , "aol"]
    }

    with ChromeDriverManager(
        max_drivers=config["max_drivers"],
        headless=config["headless"]
    ) as driver_manager:
        scraper = SearchEngineScraper(driver_manager)


        results = scraper.scrape_all_engines(config["query"], config["engines"])

        print("\nTop Search Results:")
        for engine, urls in results.items():
            print(f"\n{engine.capitalize()} Results:")
            for i, url in enumerate(urls[:10], 1):  # Ensure only top 10
                print(f"{i}. {url}")

        # Save results to JSON
        with open("search_results.json", "w") as f:
            json.dump(results, f, indent=2)
        logger.info("Results saved to search_results.json")
