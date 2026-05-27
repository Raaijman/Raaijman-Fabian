# Raaijman-Fabian

Persoonlijke CV-pagina van Fabian Raaijman op [fabian.raaijman.nl](https://fabian.raaijman.nl).

Nuxt 4 app, sibling van [Raaijman-nl](https://github.com/Raaijman/Raaijman-nl), [Tourtoto](https://github.com/Raaijman/Tourtoto) en [WK-toto](https://github.com/Raaijman/WK-toto). Centrale orkestratie staat in [Raaijman-Orchestrator](https://github.com/Raaijman/Raaijman-Orchestrator).

## Snel starten

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3003>.

## CV bijwerken

Bewerk [`shared/data/cv-data.ts`](shared/data/cv-data.ts). Push, merge naar `release/fabian`, GitHub Actions deployt.

## Bouwen + PDF

```bash
pnpm build:ci   # nuxt build + puppeteer → .output/public/cv.pdf
```

## Deploy

Zie [DEPLOY.md](../Raaijman-Orchestrator/DEPLOY.md) in de orchestrator.

## Licentie

Privé. Niet voor hergebruik.
