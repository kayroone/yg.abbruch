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

  test("Mindestens 10 Flip-Cards vorhanden", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("section#services .flip-card");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test("Jede Flip-Card hat Icon und Titel auf der Vorderseite", async ({
    page,
  }) => {
    await page.goto("/");
    const cards = page.locator("section#services .flip-card");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const front = cards.nth(i).locator(".flip-card-front");
      await expect(front.locator("svg")).toBeAttached();
      await expect(front.locator("h3")).toBeAttached();
    }
  });

  test("CTA-Karte ist vorhanden und verlinkt zum Kontakt", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("section#services .service-cta");
    await expect(cta).toBeAttached();
    const href = await cta.getAttribute("href");
    expect(href).toBe("#contact");
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

  test("Flip-Card-Vorderseite hat Schatten", async ({ page }) => {
    await page.goto("/");
    const front = page.locator(".flip-card-front").first();
    const shadow = await front.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe("none");
  });
});
