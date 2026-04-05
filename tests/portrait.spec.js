const { test, expect } = require("@playwright/test");

test.describe("AP-7: Owner Portrait", () => {
  test("Portrait-Bild ist in der Kontakt-Sektion sichtbar", async ({
    page,
  }) => {
    await page.goto("/");
    const img = page.locator('section#contact img[src="assets/yoldas.png"]');
    await expect(img).toBeVisible();
  });

  test("Portrait-Container ist direktes Kind von contact-grid", async ({
    page,
  }) => {
    await page.goto("/");
    const portrait = page.locator(".contact-grid > .contact-portrait");
    await expect(portrait).toHaveCount(1);
  });

  test("Portrait-Bild hat beschreibenden Alt-Text", async ({ page }) => {
    await page.goto("/");
    const img = page.locator('img[src="assets/yoldas.png"]');
    await expect(img).toHaveAttribute(
      "alt",
      "Yoldas Gueden, Geschaeftsfuehrer von YG Team Abbruch",
    );
  });

  test("Portrait-Bild hat width und height Attribute", async ({ page }) => {
    await page.goto("/");
    const img = page.locator('img[src="assets/yoldas.png"]');
    const width = await img.getAttribute("width");
    const height = await img.getAttribute("height");
    expect(width).toBeTruthy();
    expect(height).toBeTruthy();
  });

  test("Portrait-Bild laedt lazy", async ({ page }) => {
    await page.goto("/");
    const img = page.locator('img[src="assets/yoldas.png"]');
    await expect(img).toHaveAttribute("loading", "lazy");
  });

  test("Portrait-Bild hat abgerundete Ecken (12px)", async ({ page }) => {
    await page.goto("/");
    const img = page.locator(".contact-portrait img");
    const radius = await img.evaluate(
      (el) => getComputedStyle(el).borderRadius,
    );
    expect(radius).toBe("12px");
  });

  test("Portrait-Container hat Box-Shadow", async ({ page }) => {
    await page.goto("/");
    const portrait = page.locator(".contact-portrait");
    const shadow = await portrait.evaluate(
      (el) => getComputedStyle(el).boxShadow,
    );
    expect(shadow).not.toBe("none");
  });

  test("Portrait stapelt sich unter den Kontakt-Karten auf Mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const info = page.locator(".contact-info");
    const portrait = page.locator(".contact-portrait");
    const infoBox = await info.boundingBox();
    const portraitBox = await portrait.boundingBox();
    expect(portraitBox.y).toBeGreaterThan(infoBox.y + infoBox.height - 1);
  });

  test("Portrait ist neben den Kontakt-Karten auf Desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const info = page.locator(".contact-info");
    const portrait = page.locator(".contact-portrait");
    const infoBox = await info.boundingBox();
    const portraitBox = await portrait.boundingBox();
    expect(portraitBox.x).toBeGreaterThanOrEqual(infoBox.x + infoBox.width - 1);
  });

  test("Portrait verursacht keinen horizontalen Overflow auf Mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const img = page.locator(".contact-portrait img");
    const box = await img.boundingBox();
    expect(box.width).toBeLessThanOrEqual(375);
  });

  test("Kein horizontaler Overflow auf Desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const section = page.locator("section#contact");
    const box = await section.boundingBox();
    expect(box.width).toBeLessThanOrEqual(1280);
  });

  test("Contact-Grid hat genau 3 direkte Kinder", async ({ page }) => {
    await page.goto("/");
    const children = page.locator(".contact-grid > *");
    await expect(children).toHaveCount(3);
    await expect(page.locator(".contact-grid > .contact-info")).toHaveCount(1);
    await expect(page.locator(".contact-grid > .contact-portrait")).toHaveCount(
      1,
    );
    await expect(page.locator(".contact-grid > .contact-map")).toHaveCount(1);
  });

  test("Portrait-Container hat animate-on-scroll Klasse", async ({ page }) => {
    await page.goto("/");
    const portrait = page.locator(".contact-portrait");
    await expect(portrait).toHaveClass(/animate-on-scroll/);
  });
});
