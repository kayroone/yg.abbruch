const { test, expect } = require("@playwright/test");

test.describe("AP-4: Kontakt-Sektion", () => {
  test('Telefonnummer "+49 163 6193240" ist sichtbar', async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    await expect(contact).toContainText("+49 163 6193240");
  });

  test("Telefonnummer ist als tel:-Link klickbar", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    const telLink = contact.locator('a[href^="tel:"]');
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute("href", "tel:+491636193240");
    await expect(telLink).toContainText("+49 163 6193240");
  });

  test('E-Mail "yg-team.abbruch7@outlook.de" ist sichtbar', async ({
    page,
  }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    await expect(contact).toContainText("yg-team.abbruch7@outlook.de");
  });

  test("E-Mail ist als mailto:-Link klickbar", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    const mailLink = contact.locator('a[href^="mailto:"]');
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toHaveAttribute(
      "href",
      "mailto:yg-team.abbruch7@outlook.de",
    );
    await expect(mailLink).toContainText("yg-team.abbruch7@outlook.de");
  });

  test("Adresse-Platzhalter ist vorhanden", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    await expect(contact).toContainText("Adresse");
  });

  test("OpenStreetMap iframe ist eingebettet", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    const iframe = contact.locator("iframe");
    await expect(iframe).toHaveCount(1);
  });

  test("Layout auf Mobile und Desktop ohne Overflow", async ({ page }) => {
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const contact = page.locator("section#contact");
      const box = await contact.boundingBox();
      expect(box.width).toBeLessThanOrEqual(width);
    }
  });

  test("Kontakt-Items haben Karten-Styling", async ({ page }) => {
    await page.goto("/");
    const card = page.locator(".contact-card").first();
    const shadow = await card.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe("none");
  });

  test("OSM-Karte hat abgerundete Ecken", async ({ page }) => {
    await page.goto("/");
    const map = page.locator(".contact-map");
    const radius = await map.evaluate(
      (el) => getComputedStyle(el).borderRadius,
    );
    expect(radius).not.toBe("0px");
  });

  test("OSM-Karte iframe hat title-Attribut fuer Accessibility", async ({
    page,
  }) => {
    await page.goto("/");
    const iframe = page.locator(".contact-map iframe");
    const title = await iframe.getAttribute("title");
    expect(title).toBeTruthy();
  });
});
