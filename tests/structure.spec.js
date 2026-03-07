const { test, expect } = require("@playwright/test");

test.describe("AP-1: HTML-Grundgerüst", () => {
  test("index.html ist erreichbar", async ({ page }) => {
    const response = await page.goto("/");
    expect(response.status()).toBe(200);
  });

  test("index.html hat alle Sektionen", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("section#hero")).toBeVisible();
    await expect(page.locator("section#why-us")).toBeVisible();
    await expect(page.locator("section#services")).toBeVisible();
    await expect(page.locator("section#process")).toBeVisible();
    await expect(page.locator("section#contact")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("Navigation enthält alle Links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav");
    await expect(nav.locator('a[href="#services"]')).toBeVisible();
    await expect(nav.locator('a[href="#contact"]')).toBeVisible();
    await expect(nav.locator('a[href="impressum.html"]')).toBeVisible();
    await expect(nav.locator('a[href="datenschutz.html"]')).toBeVisible();
  });

  test("impressum.html ist erreichbar", async ({ page }) => {
    const response = await page.goto("/impressum.html");
    expect(response.status()).toBe(200);
  });

  test("datenschutz.html ist erreichbar", async ({ page }) => {
    const response = await page.goto("/datenschutz.html");
    expect(response.status()).toBe(200);
  });

  test("alle Seiten haben lang=de und charset", async ({ page }) => {
    for (const path of ["/", "/impressum.html", "/datenschutz.html"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "de");
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toHaveCount(1);
    }
  });

  test("Impressum und Datenschutz haben Link zur Startseite", async ({
    page,
  }) => {
    for (const path of ["/impressum.html", "/datenschutz.html"]) {
      await page.goto(path);
      await expect(page.locator('a[href="index.html"]')).toBeVisible();
    }
  });

  test("Seiten rendern auf Mobile und Desktop ohne Fehler", async ({
    page,
  }) => {
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      for (const path of ["/", "/impressum.html", "/datenschutz.html"]) {
        await page.goto(path);
        const body = page.locator("body");
        await expect(body).toBeVisible();
        const box = await body.boundingBox();
        expect(box.width).toBeLessThanOrEqual(width);
      }
    }
  });

  test("Mobile: Hamburger-Button ist sichtbar", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await expect(page.locator(".nav-toggle")).toBeVisible();
  });

  test("Desktop: Hamburger-Button ist nicht sichtbar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.locator(".nav-toggle")).not.toBeVisible();
  });

  test("Mobile: Nav-Links sind initial versteckt", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await expect(page.locator(".nav-links")).not.toBeVisible();
  });

  test("Mobile: Nav-Links werden nach Klick auf Hamburger sichtbar", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await page.locator(".nav-toggle").click();
    await expect(page.locator(".nav-links")).toBeVisible();
  });

  test("Mobile: Nav-Link Klick schliesst Hamburger-Menü", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await page.locator(".nav-toggle").click();
    await expect(page.locator(".nav-links")).toBeVisible();
    await page.locator('.nav-links a[href="#services"]').click();
    await expect(page.locator(".nav-links")).not.toBeVisible();
  });

  test("Mobile: Escape-Taste schliesst Hamburger-Menü", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await page.locator(".nav-toggle").click();
    await expect(page.locator(".nav-links")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".nav-links")).not.toBeVisible();
  });

  test("Mobile: aria-expanded wird korrekt gesetzt", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const toggle = page.locator(".nav-toggle");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("Footer enthält Copyright, Kontaktlinks und rechtliche Links", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toContainText("YG Team Abbruch");
    await expect(footer).toContainText("2026");
    await expect(footer.locator('a[href="tel:+491636193240"]')).toBeVisible();
    await expect(
      footer.locator('a[href="mailto:yg-team.abbruch7@outlook.de"]'),
    ).toBeVisible();
    await expect(footer.locator('a[href="impressum.html"]')).toBeVisible();
    await expect(footer.locator('a[href="datenschutz.html"]')).toBeVisible();
  });
});
