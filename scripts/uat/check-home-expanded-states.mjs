#!/usr/bin/env node
// Verify the homepage's optional expanded states at the real browser boundary.
//
//   node scripts/uat/check-home-expanded-states.mjs <baseUrl>
//
// The selected-package sheet, detailed brief, and reading path are easy to
// regress while still leaving the collapsed page healthy. This checks the
// actual mobile and desktop interactions and saves reviewable PNG evidence.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { launch, newPage } from "./cdp.mjs";

const [base = "http://localhost:4415"] = process.argv.slice(2);
const evidenceDir = join(tmpdir(), "esteban-home-expanded-states");
rmSync(evidenceDir, { recursive: true, force: true });
mkdirSync(evidenceDir, { recursive: true });

const viewports = [
  { name: "phone", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];
const failures = [];
const fail = (message) => { failures.push(message); console.log("FAIL", message); };

async function screenshot(page, name) {
  const { data } = await page.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  const path = join(evidenceDir, `${name}.png`);
  writeFileSync(path, Buffer.from(data, "base64"));
  return path;
}

const { proc, port } = await launch(9447);
try {
  for (const viewport of viewports) {
    const page = await newPage(port, viewport);
    await page.goto(base + "/");
    // The homepage has a short visual opening. Dismiss it so screenshots show
    // the interaction being checked, not a decorative loading moment.
    await page.eval(`
      const skip = [...document.querySelectorAll('button')].find((node) => /^(Skip|Saltar)$/i.test(node.textContent || ''));
      skip?.click();
      await new Promise((resolve) => setTimeout(resolve, 450));
    `);

    const sheet = await page.eval(`
      const picker = [...document.querySelectorAll('button')].find((node) => /Real estate/i.test(node.textContent || ''));
      picker?.click();
      await new Promise((resolve) => setTimeout(resolve, 250));
      const select = [...document.querySelectorAll('button')].find((node) => /Essential/i.test(node.textContent || ''));
      select?.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dialog = document.querySelector('[role="dialog"]');
      const rect = dialog?.getBoundingClientRect();
      return {
        dialog: Boolean(dialog),
        bodyLocked: getComputedStyle(document.body).overflow === 'hidden',
        inViewport: Boolean(rect && rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight),
        overflow: document.documentElement.scrollWidth <= innerWidth,
        text: dialog?.textContent?.trim(),
      };
    `);
    const sheetShot = await screenshot(page, `${viewport.name}-selected-package`);
    if (!sheet.dialog || !sheet.bodyLocked || !sheet.inViewport || !sheet.overflow || !/Essential/.test(sheet.text || "")) {
      fail(`${viewport.name} selected-package sheet: ${JSON.stringify(sheet)}`);
    }
    console.log("ok", viewport.name, "selected-package", JSON.stringify({ ...sheet, screenshot: sheetShot }));
    await page.eval(`document.querySelector('[role="dialog"] button')?.click(); await new Promise((resolve) => setTimeout(resolve, 150));`);

    const brief = await page.eval(`
      const details = [...document.querySelectorAll('details')].find((node) => /Build a detailed brief/i.test(node.textContent || ''));
      details?.scrollIntoView({ block: 'center' });
      details?.querySelector('summary')?.click();
      await new Promise((resolve) => setTimeout(resolve, 250));
      const fields = details ? [...details.querySelectorAll('input, textarea, select')].map((node) => ({ tag: node.tagName, label: node.getAttribute('aria-label'), disabled: node.disabled })) : [];
      return { open: details?.open === true, fields, overflow: document.documentElement.scrollWidth <= innerWidth };
    `);
    const briefShot = await screenshot(page, `${viewport.name}-detailed-brief`);
    if (!brief.open || brief.fields.length < 3 || !brief.overflow) fail(`${viewport.name} detailed brief: ${JSON.stringify(brief)}`);
    console.log("ok", viewport.name, "detailed-brief", JSON.stringify({ ...brief, screenshot: briefShot }));

    const reading = await page.eval(`
      const details = document.querySelector('#more');
      details?.scrollIntoView({ block: 'center' });
      details?.querySelector('summary')?.click();
      await new Promise((resolve) => setTimeout(resolve, 350));
      return {
        open: details?.open === true,
        headingCount: details?.querySelectorAll('h2, h3').length || 0,
        overflow: document.documentElement.scrollWidth <= innerWidth,
      };
    `);
    const readingShot = await screenshot(page, `${viewport.name}-reading-path`);
    if (!reading.open || reading.headingCount < 3 || !reading.overflow) fail(`${viewport.name} reading path: ${JSON.stringify(reading)}`);
    console.log("ok", viewport.name, "reading-path", JSON.stringify({ ...reading, screenshot: readingShot }));
    await page.close();
  }
} finally {
  proc.kill();
}

console.log(`Evidence: ${evidenceDir}`);
process.exit(failures.length ? 1 : 0);
