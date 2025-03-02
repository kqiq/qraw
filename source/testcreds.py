# this is going to test our creds
import random
import re
from tavily import TavilyClient
import time
import concurrent.futures

def extract_credentials(creds_text):
    """Extract email and API key pairs from the credentials text."""
    pattern = r'([\w.-]+@[\w.-]+)\s*(tvly-[\w-]+)?'
    matches = re.findall(pattern, creds_text)
    # Filter out entries without API keys
    return [(email, api_key) for email, api_key in matches if api_key]

def test_tavily_cred(api_key):
    """Test a single Tavily API credential."""
    try:
        client = TavilyClient(api_key=api_key)
        # Make a simple test query
        response = client.search(
            query="What is artificial intelligence?",
            search_depth="basic"
        )
        if 'detail' in response : 
            if response['detail']['error'] : 
                print(response['detail']['error'])
                return False
        return True
        # return True
    except Exception as e:
        print(e)
        return False

def test_cred_wrapper(index, email_api_tuple):
    """Wrapper function to test a credential and return results in structured format."""
    email, api_key = email_api_tuple
    is_valid = test_tavily_cred(api_key)
    return {
        'index': index,
        'email': email,
        'api_key': api_key,
        'valid': is_valid
    }

def main():
    # Read credentials file
    with open('./creds', 'r') as f:
        creds_text = f.read()

    # Extract and process credentials
    all_creds = extract_credentials(creds_text)
    
    # Randomly select 10 credentials
    test_creds = random.sample(all_creds, 50)
    
    print("Testing 50 random credentials in parallel...")
    print("-" * 50)
    
    # Use ThreadPoolExecutor to test credentials in parallel
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit all testing tasks
        future_to_cred = {
            executor.submit(test_cred_wrapper, i, cred): (i, cred) 
            for i, cred in enumerate(test_creds, 1)
        }
        
        # Process results as they complete
        for future in concurrent.futures.as_completed(future_to_cred):
            result = future.result()
            print(f"\nTesting credential {result['index']}/50:")
            print(f"Email: {result['email']}")
            print(f"API Key: {result['api_key']}")
            print(f"Status: {'Valid ✅' if result['valid'] else 'Invalid ❌'}")



if __name__ == "__main__":
    main()
