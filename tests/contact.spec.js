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

  test('E-Mail "kontakt@yg-abbruch.de" ist sichtbar', async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    await expect(contact).toContainText("kontakt@yg-abbruch.de");
  });

  test("E-Mail ist als mailto:-Link klickbar", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    const mailLink = contact.locator('a[href^="mailto:"]');
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toHaveAttribute(
      "href",
      "mailto:kontakt@yg-abbruch.de",
    );
    await expect(mailLink).toContainText("kontakt@yg-abbruch.de");
  });

  test("Keine Adresse in der Kontakt-Sektion", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("section#contact");
    await expect(contact).not.toContainText("Tiller");
    await expect(contact).not.toContainText("Adresse");
  });

  test("Keine Karte eingebettet", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("iframe")).toHaveCount(0);
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
});
