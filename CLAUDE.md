# CLAUDE.md — Raaijman-Fabian

> **Hub-banner**: deze repo is een sibling in de [Raaijman-familie](../Raaijman-Orchestrator/CLAUDE.md). Voor cross-project taken (docker-compose, env.shared, deploy-strategie) start je dáár.

## 1. Wat is dit?

Persoonlijke CV-pagina van Fabian Raaijman op `fabian.raaijman.nl`. Eén Nuxt 4-route die de Klassiek-Academisch-variant rendert uit `shared/data/cv-data.ts`. Build-time wordt er een PDF van gemaakt via Puppeteer (`scripts/generate-pdf.mjs`) → komt mee in `.output/public/cv.pdf` zodat de "Download als PDF"-knop een statische file serveert.

**Content-only**: geen database, geen Drizzle, geen `server/plugins/migrate.ts`, geen mail, geen auth-routes. Wel een `NUXT_SESSION_COOKIE_DOMAIN`-slot in `.env.production.example` voor de toekomst (mocht je willen detecteren dat de bezoeker via de gedeelde `.raaijman.nl`-cookie ingelogd is).

## 2. Architectuur

- **Nuxt 4 SSR** via DA Node.js Selector — zelfde flow als Raaijman-nl/Tourtoto/WK-toto. Zie [DEPLOY.md §4.3](../Raaijman-Orchestrator/DEPLOY.md).
- `app/components/cv/*` — A4-paginarendering, opgesplitst per blok (Sidebar/Main/Portrait/SectionH/SubH/FieldRow/ProjectTag).
- `app/pages/index.vue` — de enige route; mount `CvPage` met de data.
- `shared/data/cv-data.ts` + `shared/types/cv.ts` — single source of truth voor de CV-inhoud.
- `app/assets/foto.png` — portret; ge-import via `~/assets/foto.png` zodat Vite hashed.
- `scripts/generate-pdf.mjs` — start `.output/server/index.mjs` op poort 3010 in CI, laat Puppeteer de pagina printen naar `.output/public/cv.pdf`, killt de server.

## 3. Lokale dev

```powershell
pnpm install
pnpm dev              # http://localhost:3003
```

PDF lokaal testen:

```powershell
pnpm build
pnpm generate:pdf     # schrijft .output/public/cv.pdf
pnpm preview          # http://localhost:3000 (Nuxt's preview-default-poort)
```

**Visuele regressie-test** — garandeert dat de Nuxt-render visueel identiek is aan de baseline (de originele React-export uit mei 2026):

```powershell
pnpm build            # eerst, want test draait tegen .output/
pnpm test:visual      # rendert baseline + current op 794×1123 in headless Chromium,
                      # diff't via pixelmatch, faalt als > 2 % verschilt
```

Diff-screenshot komt in `tests/output/diff.png`. Baseline staat in
[tests/baseline/cv-baseline.html](tests/baseline/cv-baseline.html) (10.5 MB,
committed). Bij CV-data-wijzigingen mag deze drempel niet stijgen; bij design-
wijzigingen update je de baseline en commit 'm opnieuw.

## 4. Deploy

GitHub Actions over SSH naar mijn.host. Trigger: push naar `release/fabian`. Workflow draait `pnpm build:ci` (= build + PDF) en rsync't `.output/` naar `/home/qv134692/fabian.raaijman.nl/`. Geen DB-migratie-stap, geen Poule-Framework-sibling-checkout.

Eerste deploy: zie [DEPLOY.md §4.3.c](../Raaijman-Orchestrator/DEPLOY.md). Belangrijk: vóór DA's "Create Application" eerst handmatig een `.output/` neerleggen op de server, anders crasht Passenger bij Create.

## 5. Content bijwerken

Bewerk `shared/data/cv-data.ts`. Push naar `main`, merge `main → release/fabian`, workflow doet de rest. Geen build-stap nodig op je dev-PC.

## 6. Toekomst (niet in v1-scope)

- `app/pages/admin/cv.vue` — protected page (via gedeelde `.raaijman.nl`-cookie + admin-allowlist) waar je `cv-data.ts` via een form-UI bewerkt en gedrafte versies in DB opslaat.
- `app/components/design/*` — Vue-port van de DesignCanvas + TweaksPanel uit de originele React-playground, live-preview van varianten en tweaks (accent, font, density).
- `server/api/cv/publish.post.ts` — knop "publiceer wijzigingen" die de data committed en GitHub-deploy triggert.

Voor nu: alleen v1. De map-indeling laat ruimte voor `app/components/design/` en `app/pages/admin/` zonder herstructurering.
