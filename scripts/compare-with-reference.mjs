// Visuele regressie-test. Rendert zowel de baseline (tests/baseline/cv-baseline.html,
// een 10.5 MB export uit de oude React-playground) als de live Nuxt-output, beide
// op A4-formaat (794×1123 px @ 96 dpi), en diff't pixel-voor-pixel via pixelmatch.
//
// Failt als > THRESHOLD_PCT van de pixels verschilt. Schrijft een diff-PNG naar
// tests/output/diff.png voor visuele inspectie.
//
// Vereist een gebuilde .output/ (run `pnpm build` eerst); dit script start zelf
// een preview-server op poort 3010, net als generate-pdf.mjs.

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as wait } from 'node:timers/promises';
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const PORT = 3010;
const VIEWPORT = { width: 794, height: 1123 }; // A4 portrait @ 96 dpi
const THRESHOLD_PCT = 2.0; // tolereer < 2 % verschil (anti-aliasing, font-hinting)
const PIXEL_THRESHOLD = 0.15; // pixelmatch per-pixel sensitivity (0–1, hoger = losser)

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const SERVER_ENTRY = resolve(ROOT, '.output/server/index.mjs');
const BASELINE_HTML = resolve(ROOT, 'tests/baseline/cv-baseline.html');
const OUT_DIR = resolve(ROOT, 'tests/output');

if (!existsSync(SERVER_ENTRY)) {
  console.error(`[compare] ontbrekend: ${SERVER_ENTRY} — draai eerst \`pnpm build\`.`);
  process.exit(1);
}
if (!existsSync(BASELINE_HTML)) {
  console.error(`[compare] ontbrekend: ${BASELINE_HTML}`);
  process.exit(1);
}
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

console.log(`[compare] start preview-server op poort ${PORT}…`);
const server = spawn(process.execPath, [SERVER_ENTRY], {
  env: { ...process.env, PORT: String(PORT), NITRO_PORT: String(PORT) },
  stdio: ['ignore', 'inherit', 'inherit'],
});

let exitCode = 1;

try {
  // Wacht op de Nuxt-server
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/`);
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {
      // nog niet klaar
    }
    await wait(500);
  }
  if (!ready) throw new Error('preview-server kwam niet up binnen 15s');

  console.log('[compare] launch headless Chromium…');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Hulpfunctie: laad URL, emuleer print-media (verbergt .no-print elementen
  // zoals de "Download als PDF"-knop), neem screenshot op viewport-grootte.
  async function snap(url, label) {
    const page = await browser.newPage();
    await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
    await page.emulateMediaType('print');
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });
    // Wacht op fonts (anders krijgen we soms een serif-fallback)
    await page.evaluate(() => document.fonts.ready);
    await wait(300);
    const png = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, ...VIEWPORT },
    });
    writeFileSync(resolve(OUT_DIR, `${label}.png`), png);
    await page.close();
    console.log(`[compare] snapshot ${label}.png (${png.length} bytes)`);
    return PNG.sync.read(Buffer.from(png));
  }

  const baselinePng = await snap(pathToFileURL(BASELINE_HTML).href, 'baseline');
  const currentPng = await snap(`http://localhost:${PORT}/`, 'current');

  if (
    baselinePng.width !== currentPng.width ||
    baselinePng.height !== currentPng.height
  ) {
    console.warn(
      `[compare] formaat-mismatch baseline=${baselinePng.width}x${baselinePng.height} vs current=${currentPng.width}x${currentPng.height}`,
    );
  }

  const { width, height } = baselinePng;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(
    baselinePng.data,
    currentPng.data,
    diff.data,
    width,
    height,
    {
      threshold: PIXEL_THRESHOLD,
      includeAA: false,
      alpha: 0.4,
      diffColor: [255, 0, 0],
    },
  );
  const totalPixels = width * height;
  const diffPct = (diffPixels / totalPixels) * 100;

  writeFileSync(resolve(OUT_DIR, 'diff.png'), PNG.sync.write(diff));

  console.log(
    `[compare] verschil: ${diffPixels.toLocaleString()} / ${totalPixels.toLocaleString()} pixels = ${diffPct.toFixed(2)}%`,
  );
  console.log(`[compare] drempel: ${THRESHOLD_PCT.toFixed(2)}%`);
  console.log(`[compare] diff-PNG: ${resolve(OUT_DIR, 'diff.png')}`);

  if (diffPct <= THRESHOLD_PCT) {
    console.log('[compare] ✓ PASS — Nuxt-render matched baseline binnen tolerantie.');
    exitCode = 0;
  } else {
    console.error(`[compare] ✗ FAIL — diff ${diffPct.toFixed(2)}% > drempel ${THRESHOLD_PCT}%.`);
    exitCode = 1;
  }

  await browser.close();
} catch (err) {
  console.error('[compare] error:', err);
  exitCode = 1;
} finally {
  server.kill();
}

process.exit(exitCode);
