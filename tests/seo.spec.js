const { test, expect } = require("@playwright/test");

test.describe("AP-6: SEO & Meta-Tags", () => {
  test('index.html: title enthält "YG Team Abbruch"', async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/YG Team Abbruch/);
  });

  test("index.html: meta description vorhanden", async ({ page }) => {
    await page.goto("/");
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveCount(1);
    const content = await desc.getAttribute("content");
    expect(content.length).toBeGreaterThan(10);
  });

  test("index.html: Open Graph Tags vorhanden", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(
      1,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toMatch(/^https?:\/\//);
  });

  test("index.html: JSON-LD LocalBusiness vorhanden", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const content = await jsonLd.textContent();
    const data = JSON.parse(content);
    expect(data["@type"]).toContain("LocalBusiness");
  });

  test('impressum.html: title enthält "Impressum"', async ({ page }) => {
    await page.goto("/impressum.html");
    await expect(page).toHaveTitle(/Impressum/);
  });

  test('datenschutz.html: title enthält "Datenschutz"', async ({ page }) => {
    await page.goto("/datenschutz.html");
    await expect(page).toHaveTitle(/Datenschutz/);
  });

  test("alle Seiten: meta viewport vorhanden", async ({ page }) => {
    for (const path of ["/", "/impressum.html", "/datenschutz.html"]) {
      await page.goto(path);
      await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
    }
  });
});
