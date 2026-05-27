# Baseline voor visuele regressie-test

`cv-baseline.html` is de gedownloade export uit de oude React-playground
(`Fabian/CV Fabian Raaijman 2026.html`, 10.5 MB, mei 2026). Bevat alles
inline (base64-fonts, gerenderde React-tree, foto).

[scripts/compare-with-reference.mjs](../../scripts/compare-with-reference.mjs)
gebruikt deze file als ground-truth: rendert 'm in een headless Chromium op
A4-formaat, doet hetzelfde met de live Nuxt-render (`http://localhost:3010/`),
en vergelijkt pixel-voor-pixel via `pixelmatch`. Een diff boven de drempel
faalt de test.

De file is groot maar onveranderlijk — commit 'm. Als het CV ooit een
nieuwe baseline krijgt: vervang `cv-baseline.html` en commit, dan loopt
de test tegen het nieuwe doel.
