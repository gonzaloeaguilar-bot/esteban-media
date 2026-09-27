#!/usr/bin/env node
// Reduced motion, no script, and colour contrast on the cinematic home.
//
//   node scripts/uat/check-home-states.mjs <baseUrl> [path...]
//
// Exit 1 on any failure. axe-core is loaded from cdnjs into the page, so the
// repo gains no dependency.

import { launch, newPage } from "./cdp.mjs";

const [base = "http://localhost:4415", ...paths] = process.argv.slice(2);
const routes = paths.length ? paths : ["/es", "/"];
const AXE = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { proc, port } = await launch(9445);
const failures = [];
const fail = (m) => { failures.push(m); console.log("FAIL", m); };

try {
  for (const route of routes) {
    for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const tag = `${route} @${vp.width}`;

      // 1. Reduced motion: still frame, no shutter, everything readable.
      let page = await newPage(port, vp);
      await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      await page.goto(base + route);
      await page.eval(`for (let i = 0; i < 50 && !document.querySelector('main .em-pkcard'); i++) await new Promise(r => setTimeout(r, 100));`);
      const rm = await page.eval(`
        const v = document.querySelector('.em-cine__video');
        const bar = document.querySelector('.em-cine__bar');
        return {
          anim: document.documentElement.classList.contains('rail-anim'),
          video: v ? getComputedStyle(v).display : 'missing',
          bar: bar ? getComputedStyle(bar).display : 'missing',
          poster: document.querySelector('.em-cine__poster')?.complete,
          hiddenReveals: [...document.querySelectorAll('[data-em-reveal]')].filter(e => getComputedStyle(e).opacity === '0').length,
          h1: document.querySelector('h1')?.textContent,
          clipped: [...document.querySelectorAll('.em-pkcard__scene')].filter(e => getComputedStyle(e).clipPath !== 'none').length,
        };
      `);
      if (rm.anim) fail(`${tag} reduced-motion still sets rail-anim`);
      if (rm.video !== "none") fail(`${tag} reduced-motion shows video (${rm.video})`);
      if (rm.bar !== "none") fail(`${tag} reduced-motion shows letterbox bars`);
      if (!/Esteban Moreno Media/.test(rm.h1 || "")) fail(`${tag} h1 text is "${rm.h1}"`);
      if (!rm.poster) fail(`${tag} reduced-motion poster not loaded`);
      if (rm.hiddenReveals || rm.clipped) fail(`${tag} reduced-motion hides content (${rm.hiddenReveals} hidden, ${rm.clipped} clipped)`);

      // 2. Colour contrast, every section, in the reduced-motion (fully visible) state.
      const axe = await page.eval(`
        await new Promise((res, rej) => { const s = document.createElement('script'); s.src = '${AXE}'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
        const r = await axe.run(document.querySelector('main'), { runOnly: ['color-contrast', 'link-name', 'button-name', 'image-alt', 'heading-order', 'list', 'listitem', 'aria-allowed-attr'] });
        return r.violations.map(v => ({ id: v.id, n: v.nodes.length, sample: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + (n.any[0]?.message || '')) }));
      `);
      for (const v of axe) fail(`${tag} axe ${v.id} x${v.n}: ${v.sample.join(" | ")}`);
      await page.close();

      // 3. No script: every package, price and link is still in the document and visible.
      page = await newPage(port, vp);
      await page.send("Emulation.setScriptExecutionDisabled", { value: true });
      await page.send("Page.navigate", { url: base + route });
      await sleep(2500);
      const nojs = await page.eval(`
        return {
          cards: document.querySelectorAll('.em-pkcard').length,
          prices: document.querySelectorAll('.em-pkcard .rail-price').length,
          needs: document.querySelectorAll('.em-pk-need').length,
          h1: document.querySelector('h1')?.textContent,
          hiddenReveals: [...document.querySelectorAll('[data-em-reveal]')].filter(e => getComputedStyle(e).opacity === '0').length,
        };
      `).catch(() => null);
      // Script disabled also disables Runtime.evaluate in some Chrome builds; fall back to DOM.
      if (nojs) {
        if (nojs.cards !== 4 || nojs.prices !== 3 || nojs.needs !== 4) fail(`${tag} no-JS content missing ${JSON.stringify(nojs)}`);
        if (nojs.hiddenReveals) fail(`${tag} no-JS hides ${nojs.hiddenReveals} blocks`);
      }
      console.log("ok", tag, JSON.stringify({ rm, axe: axe.length, nojs }));
      await page.close();
    }
  }
} finally {
  proc.kill();
}
process.exit(failures.length ? 1 : 0);
