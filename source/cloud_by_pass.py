# # important module use for detection and by passing the cloudeflare antibot mechanism
# # another algorithm is to create a snapshot of the page and regex it to find key things related to claoude flare then try to find out the botten next
# #
# # todo : one key thing here is that this file is must be open to changes for fast updates
# import time
# from selenium.webdriver import Chrome
# #import threading : later we have to add threading for high performance stuffs
# import logging
# from selenium.webdriver.common.by import By   # NEW: Needed to find elements by tag
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

# from DrissionPage import ChromiumPage

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(levelname)s - %(message)s'
# )
# logger = logging.getLogger(__name__)



# # NEW: CloudflareBypasser class for bot detection and bypassing.

# class CloudflareBypasser:
#     def __init__(self, driver: Chrome, max_retries: int = -1, log: bool = True):
#         self.driver = driver
#         self.max_retries = max_retries
#         self.log = log

#     def log_message(self, message):
#         if self.log:
#             logger.info(message)

#     # def click_verification_button(self):
#     #     try:
#     #         # Look for input elements that might be related to Cloudflare turnaround (e.g., turnstile)
#     #         inputs = self.driver.find_elements(By.TAG_NAME, "input")
#     #         button = None
#     #         for ele in inputs:
#     #             name = ele.get_attribute("name")
#     #             type_attr = ele.get_attribute("type")
#     #             if name and type_attr and "turnstile" in name and type_attr == "hidden":
#     #                 button = ele
#     #                 break
#     #         if button:
#     #             self.log_message("Verification button found. Attempting to click.")
#     #             button.click()
#     #         else:
#     #             self.log_message("Verification button not found.")
#     #     except Exception as e:
#     #         self.log_message(f"Error clicking verification button: {e}")


#     # def click_verification_button(self):
#     #     try:
#     #         # Try multiple selector strategies
#     #         selectors = [
#     #             ('iframe[title*="challenge"]', "iframe"),
#     #             ('div.marketplace_header > a[href*="cloudflare"]', "link"),
#     #             ('input[value*="Verify"]', "input"),
#     #             ('button#challenge-submit', "button")
#     #         ]

#     #         for selector, selector_type in selectors:
#     #             try:
#     #                 element = WebDriverWait(self.driver, 5).until(
#     #                     EC.presence_of_element_located((By.CSS_SELECTOR, selector))
#     #                 )
#     #                 if selector_type == "iframe":
#     #                     self.driver.switch_to.frame(element)
#     #                     button = WebDriverWait(self.driver, 5).until(
#     #                         EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[value*="Verify"]'))
#     #                     )
#     #                     button.click()
#     #                     self.driver.switch_to.default_content()
#     #                 else:
#     #                     element.click()
#     #                 self.log_message(f"Clicked element using {selector}")
#     #                 return
#     #             except Exception:
#     #                 continue

#     #         self.log_message("No verification elements found")
#     #     except Exception as e:
#     #         self.log_message(f"Error in verification click: {e}")

#     # def is_bypassed(self):
#     #     try:
#     #         title = self.driver.title.lower()
#     #         # If the title contains “just a moment”, assume that Cloudflare is still blocking the page.
#     #         return "just a moment" not in title
#     #     except Exception as e:
#     #         self.log_message(f"Error checking page title: {e}")
#     #         return False

#     # def is_bypassed(self):
#     #     try:
#     #         title = self.driver.title.lower()
#     #         blocked_phrases = [
#     #             "just a moment",
#     #             "attention required",
#     #             "security check",
#     #             "are you human"
#     #         ]
#     #         page_source = self.driver.page_source.lower()
#     #         # Check both title and common Cloudflare elements
#     #         return not any(phrase in title for phrase in blocked_phrases) \
#     #             and "cloudflare ray id" not in page_source
#     #     except Exception as e:
#     #         self.log_message(f"Error checking bypass: {e}")
#     #         return False


#     def is_bypassed(self):
#         try:
#             # Check for multiple Cloudflare indicators
#             title = self.driver.title.lower()
#             page_source = self.driver.page_source.lower()

#             blocked_indicators = {
#                 "just a moment": title,
#                 "cloudflare ray id": page_source,
#                 "challenge-platform": page_source,
#                 "cdn-cgi/challenge-platform": page_source
#             }

#             security_check = any(value for key, value in blocked_indicators.items() if key)
#             return not security_check
#         except Exception as e:
#             self.log_message(f"Bypass check error: {e}")
#             return False

#     def wait_for_challenge_resolution(self):
#         """Handle challenge with meta refresh and JS loading"""
#         try:
#             # Check for meta refresh challenge
#             meta_refresh = self.driver.find_elements(
#                 By.XPATH,
#                 '//meta[@http-equiv="refresh" and contains(@content, "")]'
#             )

#             if meta_refresh:
#                 self.log_message("Detected meta refresh challenge")
#                 # Cloudflare usually resolves after 3-5 seconds in these cases
#                 time.sleep(8)

#                 # Check if challenge auto-resolves
#                 return self.is_bypassed()

#             # Wait for challenge script to load
#             WebDriverWait(self.driver, 30).until(
#                 lambda d: d.execute_script(
#                     'return document.readyState === "complete" && '
#                     'typeof _cf_chl_opt !== "undefined"'
#                 )
#             )
#             self.log_message("Challenge platform script detected")

#             # Wait for challenge to auto-resolve
#             time.sleep(5)
#             return True

#         except Exception as e:
#             self.log_message(f"Challenge wait error: {e}")
#             return False


#     def bypass(self):
#         try_count = 0
#         while True:
#             if self.is_bypassed():
#                 self.log_message("Bypass successful")
#                 return True

#             if self.max_retries != -1 and try_count >= self.max_retries:
#                 self.log_message("Max retries exceeded")
#                 return False

#             self.log_message(f"Bypass attempt {try_count + 1}")

#             try:
#                 # Handle JavaScript challenges and meta refresh
#                 if self.wait_for_challenge_resolution():
#                     continue

#                 # Fallback to element detection
#                 self.click_verification_button()

#                 # Wait for challenge to complete
#                 WebDriverWait(self.driver, 15).until(
#                     lambda d: self.is_bypassed() or
#                     d.find_elements(By.ID, 'challenge-error-text')
#                 )

#                 time.sleep(3)

#             except Exception as e:
#                 self.log_message(f"Attempt failed: {str(e)}")

#             try_count += 1



#     # def bypass(self):
#     #     try_count = 0
#     #     while True:
#     #         if self.is_bypassed():
#     #             self.log_message("Bypass successful.")
#     #             return True

#     #         if self.max_retries != -1 and try_count >= self.max_retries:
#     #             self.log_message("Max retries exceeded.")
#     #             return False

#     #         self.log_message(f"Attempt {try_count + 1} to bypass...")

#     #         try:
#     #             WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
#     #             self.click_verification_button()

#     #             # Wait for either success or new challenge
#     #             WebDriverWait(self.driver, 15).until(
#     #                 lambda d: self.is_bypassed() or d.find_elements(By.ID, 'challenge-form')
#     #             )

#     #         except Exception as e:
#     #             self.log_message(f"Bypass attempt failed: {e}")

#     #         try_count += 1
#     #         time.sleep(2)


#     def click_verification_button(self):
#         try:
#             # Check for new challenge types
#             selectors = [
#                 ('iframe[src*="challenge-platform"]', "iframe"),
#                 ('div#challenge-error-text', "error_text"),
#                 ('script[src*="challenge-platform"]', "script"),
#                 ('meta[http-equiv="refresh"]', "meta_refresh")
#             ]

#             for selector, stype in selectors:
#                 elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
#                 if elements:
#                     self.log_message(f"Found {stype} challenge element")
#                     if stype == "iframe":
#                         self.driver.switch_to.frame(elements[0])
#                         self.driver.find_element(
#                             By.CSS_SELECTOR, 'input[type="checkbox"]'
#                         ).click()
#                         self.driver.switch_to.default_content()
#                     return True

#             self.log_message("No detectable challenge elements found")
#             return False

#         except Exception as e:
#             self.log_message(f"Element interaction error: {e}")
#             return False


#     # def bypass(self):
#     #     try_count = 0
#     #     # Retry indefinitely if max_retries is -1; otherwise, stop after reaching max_retries.
#     #     while not self.is_bypassed():
#     #         if self.max_retries != -1 and try_count >= self.max_retries:
#     #             self.log_message("Exceeded maximum retries. Bypass failed.")
#     #             break
#     #         self.log_message(f"Attempt {try_count + 1}: Verification page detected. Trying to bypass...")
#     #         self.click_verification_button()
#     #         try_count += 1
#     #         time.sleep(2)
#     #     if self.is_bypassed():
#     #         self.log_message("Bypass successful.")
#     #     else:
#     #         self.log_message("Bypass failed.")

import time
from DrissionPage import ChromiumPage

class CloudflareBypasser:
    def __init__(self, driver: ChromiumPage, max_retries=-1, log=True):
        self.driver = driver
        self.max_retries = max_retries
        self.log = log

    def search_recursively_shadow_root_with_iframe(self,ele):
        if ele.shadow_root:
            if ele.shadow_root.child().tag == "iframe":
                return ele.shadow_root.child()
        else:
            for child in ele.children():
                result = self.search_recursively_shadow_root_with_iframe(child)
                if result:
                    return result
        return None

    def search_recursively_shadow_root_with_cf_input(self,ele):
        if ele.shadow_root:
            if ele.shadow_root.ele("tag:input"):
                return ele.shadow_root.ele("tag:input")
        else:
            for child in ele.children():
                result = self.search_recursively_shadow_root_with_cf_input(child)
                if result:
                    return result
        return None

    def locate_cf_button(self):
        button = None
        eles = self.driver.eles("tag:input")
        for ele in eles:
            if "name" in ele.attrs.keys() and "type" in ele.attrs.keys():
                if "turnstile" in ele.attrs["name"] and ele.attrs["type"] == "hidden":
                    button = ele.parent().shadow_root.child()("tag:body").shadow_root("tag:input")
                    break

        if button:
            return button
        else:
            # If the button is not found, search it recursively
            self.log_message("Basic search failed. Searching for button recursively.")
            ele = self.driver.ele("tag:body")
            iframe = self.search_recursively_shadow_root_with_iframe(ele)
            if iframe:
                button = self.search_recursively_shadow_root_with_cf_input(iframe("tag:body"))
            else:
                self.log_message("Iframe not found. Button search failed.")
            return button

    def log_message(self, message):
        if self.log:
            print(message)

    def click_verification_button(self):
        try:
            button = self.locate_cf_button()
            if button:
                self.log_message("Verification button found. Attempting to click.")
                button.click()
            else:
                self.log_message("Verification button not found.")

        except Exception as e:
            self.log_message(f"Error clicking verification button: {e}")

    def is_bypassed(self):
        try:
            title = self.driver.title.lower()
            return "just a moment" not in title
        except Exception as e:
            self.log_message(f"Error checking page title: {e}")
            return False

    def bypass(self):

        try_count = 0

        while not self.is_bypassed():
            if 0 < self.max_retries + 1 <= try_count:
                self.log_message("Exceeded maximum retries. Bypass failed.")
                break

            self.log_message(f"Attempt {try_count + 1}: Verification page detected. Trying to bypass...")
            self.click_verification_button()

            try_count += 1
            time.sleep(2)

        if self.is_bypassed():
            self.log_message("Bypass successful.")
        else:
            self.log_message("Bypass failed.")
