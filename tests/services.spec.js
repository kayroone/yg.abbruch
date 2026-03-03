const { test, expect } = require("@playwright/test");

test.describe("AP-3: Leistungen-Sektion", () => {
  test("Hauptüberschrift ist sichtbar", async ({ page }) => {
    await page.goto("/");
    const services = page.locator("section#services");
    await expect(services).toContainText(
      "Ihr Profi für Abriss, Reparaturen & Renovierungen!",
    );
  });

  test('Bereich "Abbruch & Entsorgung" mit 5 Punkten', async ({ page }) => {
    await page.goto("/");
    const services = page.locator("section#services");
    await expect(services).toContainText("Abbruch & Entsorgung");
    await expect(services).toContainText("Abriss & Entkernung von Gebäuden");
    await expect(services).toContainText(
      "Fachgerechte Entsorgung von Bauschutt & Materialien",
    );
    await expect(services).toContainText(
      "Abriss kleinerer Gebäude und Anbauten",
    );
    await expect(services).toContainText(
      "Trennwände einreißen & Rückbau für Sanierungen",
    );
    await expect(services).toContainText(
      "Entrümpelungen von Grundstücken und Häusern",
    );
  });

  test('Bereich "Reparatur & Renovierung" mit 2 Punkten', async ({ page }) => {
    await page.goto("/");
    const services = page.locator("section#services");
    await expect(services).toContainText("Reparatur & Renovierung");
    await expect(services).toContainText(
      "Kleinere Reparaturen in Haus und Wohnung",
    );
    await expect(services).toContainText(
      "Renovierungsarbeiten für Ihre Modernisierung",
    );
  });

  test("Alle 7 Leistungspunkte sind einzelne Elemente", async ({ page }) => {
    await page.goto("/");
    const items = page.locator("section#services li");
    await expect(items).toHaveCount(7);
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

  test("Service-Kategorien haben Karten-Styling mit Schatten", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page.locator(".service-category").first();
    const shadow = await card.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe("none");
  });
});
