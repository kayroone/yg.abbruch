const { test, expect } = require("@playwright/test");

test.describe("AP-3: Leistungen-Sektion", () => {
  test("Hauptüberschrift ist sichtbar", async ({ page }) => {
    await page.goto("/");
    const services = page.locator("section#services");
    await expect(services.locator("h2")).toBeVisible();
  });

  test("Alle Leistungstexte sind vorhanden", async ({ page }) => {
    await page.goto("/");
    const services = page.locator("section#services");
    await expect(services).toContainText("Abriss & Entkernung");
    await expect(services).toContainText("Entsorgung");
    await expect(services).toContainText("Rückbau");
    await expect(services).toContainText("Entrümpelung");
    await expect(services).toContainText("Reparatur");
    await expect(services).toContainText("Renovierung");
  });

  test("Mindestens 5 Service-Karten vorhanden", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("section#services .service-card");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test("Jede Karte hat Icon, Titel und Beschreibung", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("section#services .service-card");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator("svg")).toBeVisible();
      await expect(card.locator("h3")).toBeVisible();
      await expect(card.locator("p")).toBeVisible();
    }
  });

  test("Layout auf Mobile und Desktop ohne Overflow", async ({ page }) => {
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const services = page.locator("section#services");
      const box = await services.boundingBox();
      expect(box.width).toBeLessThanOrEqual(width);
    }
  });

  test("Leistungs-Sektion hat grauen Hintergrund", async ({ page }) => {
    await page.goto("/");
    const services = page.locator("section#services");
    const bg = await services.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
    expect(bg).not.toBe("rgb(255, 255, 255)");
  });

  test("Service-Karten haben Schatten", async ({ page }) => {
    await page.goto("/");
    const card = page.locator(".service-card").first();
    const shadow = await card.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe("none");
  });
});
