const { test, expect } = require("@playwright/test");

test.describe("Cookie-Banner", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("Banner ist bei Erstbesuch sichtbar", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator("#cookie-banner");
    await expect(banner).toBeVisible();
  });

  test("Banner enthält Akzeptieren- und Ablehnen-Button", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#cookie-accept")).toBeVisible();
    await expect(page.locator("#cookie-decline")).toBeVisible();
  });

  test("Banner enthält Link zur Datenschutzerklärung", async ({ page }) => {
    await page.goto("/");
    const link = page.locator("#cookie-banner a[href='datenschutz.html']");
    await expect(link).toBeVisible();
  });

  test("Akzeptieren schliesst Banner und setzt Cookie", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.locator("#cookie-accept").click();
    await expect(page.locator("#cookie-banner")).not.toBeVisible();
    const cookies = await context.cookies();
    const consent = cookies.find((c) => c.name === "yg_cookie_consent");
    expect(consent).toBeTruthy();
    expect(consent.value).toBe("accepted");
  });

  test("Ablehnen schliesst Banner und setzt Cookie", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.locator("#cookie-decline").click();
    await expect(page.locator("#cookie-banner")).not.toBeVisible();
    const cookies = await context.cookies();
    const consent = cookies.find((c) => c.name === "yg_cookie_consent");
    expect(consent).toBeTruthy();
    expect(consent.value).toBe("declined");
  });

  test("Banner erscheint nicht bei erneutem Besuch nach Akzeptieren", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#cookie-accept").click();
    await page.goto("/");
    await expect(page.locator("#cookie-banner")).not.toBeVisible();
  });

  test("Banner erscheint nicht bei erneutem Besuch nach Ablehnen", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#cookie-decline").click();
    await page.goto("/");
    await expect(page.locator("#cookie-banner")).not.toBeVisible();
  });

  test("Banner ist auch auf Unterseiten sichtbar", async ({ page }) => {
    await page.goto("/impressum.html");
    await expect(page.locator("#cookie-banner")).toBeVisible();
    await page.goto("/datenschutz.html");
    await expect(page.locator("#cookie-banner")).toBeVisible();
  });
});
