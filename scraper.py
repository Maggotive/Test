import asyncio
import time
from playwright.async_api import async_playwright

async def scrape_spar(product_name: str):
    """
    Scrapes the Spar website for a given product.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        )

        try:
            await page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            print("Navigating to Spar website...")
            await page.goto("https://www.spar.co.za/", timeout=60000)

            # Handle cookie banner
            try:
                print("Closing cookie banner...")
                await page.click('button[aria-label="close"]', timeout=5000)
            except Exception:
                print("Cookie banner not found or already closed.")

            # Find the search input and type the product name.
            search_input_selector = 'input[placeholder="Search..."]'
            print(f"Searching for '{product_name}'...")
            await page.fill(search_input_selector, product_name)
            await page.press(search_input_selector, "Enter")

            # Wait for the search results to load.
            await page.wait_for_load_state("load", timeout=60000)
            print(f"Search results page title: {await page.title()}")

            # Take a screenshot of the search results.
            await page.screenshot(path="spar_search_results.png")
            print("Screenshot of search results saved to spar_search_results.png")

        except Exception as e:
            print(f"An error occurred: {e}")

        finally:
            await browser.close()

async def main():
    """
    Main function to run the scraper.
    """
    await scrape_spar("milk")

if __name__ == "__main__":
    asyncio.run(main())
