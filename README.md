# YG Team Abbruch — Visitenkartenwebseite

Statische Visitenkartenwebseite für eine Abrissfirma in Kalkar (Niederrhein). Reines HTML/CSS + minimales Vanilla JS, kein Framework, kein Build-Prozess.

## Seiten

- **`index.html`** — One-Pager: Hero (Logo), Leistungen, Kontakt mit OpenStreetMap
- **`impressum.html`** — Impressum
- **`datenschutz.html`** — Datenschutzerklärung (DSGVO)

## Lokal starten

```bash
npm run serve
# → http://localhost:8080
```

## Tests

```bash
npm test                              # Alle 76 Playwright E2E Tests
npx playwright test tests/hero.spec.js  # Einzelne Testdatei
```

## Hosting

GitHub Pages direkt aus `main`-Branch.

## SEO

- JSON-LD Structured Data (LocalBusiness)
- Open Graph + Twitter Card Tags
- robots.txt + sitemap.xml
- Canonical URLs
