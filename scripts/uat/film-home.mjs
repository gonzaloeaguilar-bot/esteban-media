#!/usr/bin/env node
// Film the cinematic home in a real (visible, headless) Chrome.
//
//   node scripts/uat/film-home.mjs <baseUrl> <outDir> [path...]
//
// Captures, per path and viewport: the opening (frames over the first 2.2s),
// the scroll transition (frames as the hero leaves), and one frame per major
// section. Prints the measurements a screenshot alone cannot prove: primary
// CTA inside the first screen, horizontal overflow, whether the clip is
// actually advancing, and console errors.
//
// The in-app browser pane cannot do this: its document is hidden, so video,
// requestAnimationFrame and IntersectionObserver never run there.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, newPage } from "./cdp.mjs";

const [base = "http://localhost:4311", out = "/tmp/em-film", ...paths] = process.argv.slice(2);
const routes = paths.length ? paths : ["/es"];
const viewports = [
  { name: "p375", width: 375, height: 667 },
  { name: "p390", width: 390, height: 844 },
  { name: "d1440", width: 1440, height: 900 },
];
mkdirSync(out, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { proc, port } = await launch(9444);
const report = [];

try {
  for (const route of routes) {
    for (const vp of viewports) {
      const page = await newPage(port, vp);
      const errors = [];
      await page.send("Log.enable").catch(() => {});
      const tag = `${route.replace(/\W+/g, "_") || "root"}-${vp.name}`;
      const shot = async (name) => {
        const { data } = await page.send("Page.captureScreenshot", { format: "jpeg", quality: 70 });
        writeFileSync(join(out, `${tag}-${name}.jpg`), Buffer.from(data, "base64"));
      };

      // Opening: navigate without the harness's settle delay, then sample.
      await page.send("Page.navigate", { url: base + route });
      const t0 = Date.now();
      for (const at of [250, 700, 1200, 2200]) {
        await sleep(Math.max(0, at - (Date.now() - t0)));
        await shot(`open-${at}`);
      }
      await sleep(600);

      const m = await page.eval(`
        const v = document.querySelector('.em-cine__video');
        const a = v ? v.currentTime : null;
        await new Promise(r => setTimeout(r, 700));
        const cta = document.querySelector('[data-em-hero-actions] a');
        const r = cta ? cta.getBoundingClientRect() : null;
        return {
          ctaBottom: r ? Math.round(r.bottom) : null,
          vh: innerHeight,
          overflowX: document.documentElement.scrollWidth - innerWidth,
          videoAdvancing: v ? v.currentTime !== a : null,
          videoPlaying: v ? v.dataset.playing === 'true' : null,
          display: getComputedStyle(document.querySelector('.em-cine__brand')).fontFamily.split(',')[0],
          hidden: document.hidden,
        };
      `);

      // Scroll transition.
      for (const y of [0, 120, 260, 420]) {
        await page.eval(`scrollTo(0, ${y}); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));`);
        await sleep(120);
        await shot(`scroll-${y}`);
      }
      const p = await page.eval(`return getComputedStyle(document.getElementById('em-cine-hero')).getPropertyValue('--p')`);

      // Sections.
      for (const sel of [".em-pk-choose", ".em-pk-scenes", ".em-pkcard", ".em-pk-carte", ".em-pk-steps", ".em-close"]) {
        await page.eval(`document.querySelector('${sel}')?.scrollIntoView({block:'start'}); window.scrollBy(0,-70);`);
        await sleep(1300);
        await shot(`sec-${sel.replace(/\W+/g, "")}`);
      }

      report.push({ route, vp: vp.name, ...m, pAt420: p.trim(), errors });
      await page.close();
    }
  }
} finally {
  proc.kill();
}

console.log(JSON.stringify(report, null, 1));
