const { test, expect } = require("@playwright/test");

test.describe("AP-2: Hero-Sektion", () => {
  test("Logo ist sichtbar in der Hero-Sektion", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section#hero");
    await expect(hero.locator("img")).toBeVisible();
  });

  test("Logo hat aussagekraeftigen alt-Text", async ({ page }) => {
    await page.goto("/");
    const img = page.locator("section#hero img");
    const alt = await img.getAttribute("alt");
    expect(alt).toContain("YG Team Abbruch");
  });

  test("Hero hat kein Overflow auf Mobile und Desktop", async ({ page }) => {
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const hero = page.locator("section#hero");
      const box = await hero.boundingBox();
      expect(box.width).toBeLessThanOrEqual(width);
    }
  });

  test("Hero hat dunklen Hintergrund", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section#hero");
    const bg = await hero.evaluate(
      (el) => getComputedStyle(el).backgroundImage,
    );
    expect(bg).toContain("linear-gradient");
    expect(bg).toContain("rgb(10, 22, 40)");
  });
});
