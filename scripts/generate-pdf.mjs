// Build-time PDF-generatie. Start de gebuilde Nuxt-server op poort 3010,
// laat puppeteer de root-page renderen met print-CSS, schrijft het resultaat
// naar .output/public/cv.pdf zodat /cv.pdf wordt geserveerd.
//
// Wordt aangeroepen door `pnpm build:ci` (= `nuxt build && node scripts/generate-pdf.mjs`).
// Vereist dat .output/server/index.mjs bestaat — dus draai eerst `nuxt build`.

import { spawn } from 'node:child_process';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import puppeteer from 'puppeteer';

const PORT = 3010;
const ROOT = `http://localhost:${PORT}/`;
const SERVER_ENTRY = resolve('.output/server/index.mjs');
const OUT_PATH = resolve('.output/public/cv.pdf');

if (!existsSync(SERVER_ENTRY)) {
  console.error(`[generate-pdf] ontbrekend: ${SERVER_ENTRY} — draai eerst \`pnpm build\`.`);
  process.exit(1);
}

console.log(`[generate-pdf] start preview-server op poort ${PORT}…`);
const server = spawn(process.execPath, [SERVER_ENTRY], {
  env: { ...process.env, PORT: String(PORT), NITRO_PORT: String(PORT) },
  stdio: 'inherit',
});

// Wacht op de server (max ~15s).
let ready = false;
for (let i = 0; i < 30; i++) {
  try {
    const r = await fetch(ROOT);
    if (r.ok) {
      ready = true;
      break;
    }
  } catch {
    // nog niet klaar
  }
  await wait(500);
}

if (!ready) {
  console.error('[generate-pdf] preview-server kwam niet up binnen 15s.');
  server.kill();
  process.exit(1);
}

console.log('[generate-pdf] preview-server up; render PDF…');

try {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(ROOT, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  const outDir = resolve('.output/public');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(OUT_PATH, pdf);
  console.log(`[generate-pdf] geschreven: ${OUT_PATH} (${pdf.length} bytes)`);

  await browser.close();
} finally {
  server.kill();
}
