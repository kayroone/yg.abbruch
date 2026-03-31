const { test, expect } = require("@playwright/test");

test.describe("Scroll-Animationen", () => {
  test("Elemente mit animate-on-scroll existieren", async ({ page }) => {
    await page.goto("/");
    const elements = page.locator(".animate-on-scroll");
    const count = await elements.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("Elemente werden sichtbar nach Scroll", async ({ page }) => {
    await page.goto("/");
    const card = page.locator(".flip-card.animate-on-scroll").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/visible/, { timeout: 5000 });
  });

  test("prefers-reduced-motion wird respektiert", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const card = page.locator(".animate-on-scroll").first();
    const transition = await card.evaluate(
      (el) => getComputedStyle(el).transitionDuration,
    );
    expect(transition).toBe("0s");
  });
});
