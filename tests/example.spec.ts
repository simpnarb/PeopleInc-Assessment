import { test, expect } from '@playwright/test';

test('Go to verywellhealth, click on a link and verify a component on the page', async ({ page }) => {
  // Go to the website with custom headers to mimic a real browser as webkit is being blocked by the website
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  });
  await page.goto('https://www.verywellhealth.com/');

  // Click on the first link with the class 'block__title'
  const link = page.locator('.block__title').first();
  const linkTitle = await link.textContent();
  await link.click();

  // Verify that the component with the class 'article-header' is visible and contains the same title from the link clicked
  const articleHeader = page.locator('#article-heading_1-0');
  await expect(articleHeader).toBeVisible();
  await expect(articleHeader).toHaveText(linkTitle?.trim() || '');
});
