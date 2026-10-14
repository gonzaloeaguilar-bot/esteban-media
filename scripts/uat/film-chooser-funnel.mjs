#!/usr/bin/env node
// Film the chooser section + its funnel takeover over real HTTP, headless
// Chrome, measuring the pixel (not the DOM) at each step.
//
//   node scripts/uat/film-chooser-funnel.mjs <baseUrl> <outDir>

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, newPage } from "./cdp.mjs";

const [base = "http://localhost:4173", out = "/tmp/em-chooser-film"] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(out, { recursive: true });

const { port } = await launch(9445);
const report = { routes: {} };

async function filmRoute(route, locale) {
  const page = await newPage(port, { width: 390, height: 844 });
  const tag = `${locale}`;
  const shot = async (name) => {
    const { data } = await page.send("Page.captureScreenshot", { format: "jpeg", quality: 75 });
    writeFileSync(join(out, `${tag}-${name}.jpg`), Buffer.from(data, "base64"));
  };

  await page.goto(base + route);

  // Zero-interaction price proof, before any click.
  const zeroInteraction = await page.eval(`
    const num = document.querySelector('[data-section="home-project-path"] .em-art-price-num, [data-section="home-project-path"] .em-lane-answer .em-art-price-num');
    if (!num) return { found: false };
    const r = num.getBoundingClientRect();
    return { found: true, visible: num.checkVisibility(), w: r.width, h: r.height };
  `);

  await shot("00-landed");

  // Open the funnel from the first lane's CTA.
  const opened = await page.eval(`
    const cta = document.querySelector('[data-section="home-project-path"] [data-cta^="home-path-"]');
    if (!cta) return false;
    cta.click();
    return true;
  `);
  await sleep(350);
  await shot("01-confirm");

  const confirmState = await page.eval(`
    const rec = document.querySelector('.em-funnel-rec');
    const strip = [...document.querySelectorAll('.em-funnel-strip i')].map(i => i.dataset.lit);
    const heading = document.querySelector('.em-funnel-h')?.textContent || null;
    return {
      recRecording: rec?.dataset.recording,
      recDone: rec?.dataset.done,
      stripLit: strip,
      heading,
    };
  `);

  await page.eval(`
    const btn = document.querySelector('[data-cta="home_path_funnel_continue"]');
    if (btn) btn.click();
  `);
  await sleep(350);
  await shot("02-contact");

  const contactState = await page.eval(`
    const rec = document.querySelector('.em-funnel-rec');
    const strip = [...document.querySelectorAll('.em-funnel-strip i')].map(i => i.dataset.lit);
    return { recRecording: rec?.dataset.recording, recDone: rec?.dataset.done, stripLit: strip };
  `);

  // Supabase creds aren't present in this local run (503 from /api/lead) --
  // stub fetch so the SAME component code path (not a fake DOM) reaches its
  // done render, the thing we're actually filming.
  await page.eval(`
    window.__origFetch = window.fetch;
    window.fetch = async (url, opts) => {
      if (String(url).includes('/api/lead')) return new Response(JSON.stringify({ success: true }), { status: 200 });
      return window.__origFetch(url, opts);
    };
  `);

  // Fill and submit.
  await page.eval(`
    const name = document.querySelector('.em-funnel-field input');
    const reach = document.querySelectorAll('.em-funnel-field input')[1];
    name.value = 'Test Visitor';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    reach.value = 'test@example.com';
    reach.dispatchEvent(new Event('input', { bubbles: true }));
  `);
  await page.eval(`
    const form = document.querySelector('form');
    const btn = document.querySelector('[data-cta="home_path_funnel_send"]');
    if (btn) btn.click();
  `);
  await sleep(500);
  await shot("03-done");

  const doneState = await page.eval(`
    const rec = document.querySelector('.em-funnel-rec');
    const strip = [...document.querySelectorAll('.em-funnel-strip i')].map(i => i.dataset.lit);
    const reveal = document.querySelector('.em-funnel-done-reveal');
    return {
      recRecording: rec?.dataset.recording, recDone: rec?.dataset.done,
      stripLit: strip, revealFound: !!reveal,
      heading: document.querySelector('.em-funnel-h')?.textContent || null,
    };
  `);

  await page.close();
  return { zeroInteraction, opened, confirmState, contactState, doneState };
}

report.routes.en = await filmRoute("/#start", "en");
report.routes.es = await filmRoute("/es/#start", "es");

writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(0);
