const { test, expect } = require("@playwright/test");

test.describe("AP-5: Impressum & Datenschutz", () => {
  test('Impressum: Überschrift "Impressum" sichtbar', async ({ page }) => {
    await page.goto("/impressum.html");
    await expect(page.locator("h1")).toContainText("Impressum");
  });

  test("Impressum: Platzhalter-Angaben vorhanden", async ({ page }) => {
    await page.goto("/impressum.html");
    const main = page.locator("main");
    await expect(main).toContainText("Name");
    await expect(main).toContainText("Adresse");
    await expect(main).toContainText("Kontakt");
  });

  test('Datenschutz: Überschrift "Datenschutzerklärung" sichtbar', async ({
    page,
  }) => {
    await page.goto("/datenschutz.html");
    await expect(page.locator("h1")).toContainText("Datenschutzerklärung");
  });

  test("Datenschutz: Abschnitt über OpenStreetMap vorhanden", async ({
    page,
  }) => {
    await page.goto("/datenschutz.html");
    const main = page.locator("main");
    await expect(main).toContainText("OpenStreetMap");
  });

  test("Datenschutz: Cookie-Hinweis und Tracking-Info vorhanden", async ({
    page,
  }) => {
    await page.goto("/datenschutz.html");
    const main = page.locator("main");
    await expect(main).toContainText("Cookies");
    await expect(main).toContainText("Google Analytics");
    await expect(main).toContainText("Meta Pixel");
    await expect(main).toContainText("Einwilligung");
  });

  test("Beide Seiten haben Navigation zurück zur Startseite", async ({
    page,
  }) => {
    for (const path of ["/impressum.html", "/datenschutz.html"]) {
      await page.goto(path);
      await expect(page.locator('a[href="index.html"]')).toBeVisible();
    }
  });

  test("Layout auf Mobile und Desktop ohne Overflow", async ({ page }) => {
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      for (const path of ["/impressum.html", "/datenschutz.html"]) {
        await page.goto(path);
        const main = page.locator("main");
        const box = await main.boundingBox();
        expect(box.width).toBeLessThanOrEqual(width);
      }
    }
  });
});
