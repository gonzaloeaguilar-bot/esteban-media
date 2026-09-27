#!/usr/bin/env node
// Film the lens opening and exercise the touchable camera in headless Chrome.
//   node scripts/uat/film-3d.mjs <baseUrl> <outDir> [route]
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, newPage } from "./cdp.mjs";

const [base = "http://localhost:4415", out = "/tmp/em-3d", route = "/es"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const { proc, port } = await launch(9450);
const report = {};
try {
  for (const vp of [{ name: "p390", width: 390, height: 844 }, { name: "d1440", width: 1440, height: 900 }]) {
    const page = await newPage(port, vp);
    await page.send("Runtime.enable");
    const shot = async (n) => {
      const { data } = await page.send("Page.captureScreenshot", { format: "jpeg", quality: 72 });
      writeFileSync(join(out, `${vp.name}-${n}.jpg`), Buffer.from(data, "base64"));
    };
    await page.send("Page.navigate", { url: base + route });
    const t0 = Date.now();
    for (const at of [400, 1200, 2000, 2700, 3300, 4200]) {
      await sleep(Math.max(0, at - (Date.now() - t0)));
      await shot(`intro-${at}`);
    }
    await sleep(1500);
    const after = await page.eval(`return {
      attr: document.documentElement.hasAttribute('data-brand-moment'),
      moment: !!document.querySelector('.wk-moment'),
      overflow: getComputedStyle(document.documentElement).overflow,
      nav: !!document.querySelector('.em-appnav'), navVisible: getComputedStyle(document.querySelector('.em-appnav')).display }`);

    // The camera: scroll to it, wait for the scene, drag, tap a hotspot.
    await page.eval(`document.querySelector('.em-play').scrollIntoView({block:'start'}); scrollBy(0,-60)`);
    await sleep(2500);
    const live = await page.eval(`return document.querySelector('.em-play__stage').dataset.live`);
    await shot("play-idle");
    const r = await page.eval(`const b=document.querySelector('.em-play__canvas').getBoundingClientRect(); return {x:b.left+b.width/2,y:b.top+b.height*0.55}`);
    await page.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: r.x - 80, y: r.y }] }).catch(()=>{});
    await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: r.x - 80, y: r.y, button: "left", clickCount: 1 });
    for (let i = 1; i <= 8; i++) { await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: r.x - 80 + i * 20, y: r.y, button: "left", buttons: 1 }); await sleep(30); }
    await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: r.x + 80, y: r.y, button: "left", clickCount: 1 });
    await sleep(400);
    await shot("play-dragged");
    const hot = await page.eval(`const b=document.querySelector('.em-play__hot[data-part="lens"]').getBoundingClientRect(); return {x:b.left+22,y:b.top+22}`);
    await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: hot.x, y: hot.y, button: "left", clickCount: 1 });
    await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: hot.x, y: hot.y, button: "left", clickCount: 1 });
    await sleep(1600);
    await shot("play-lens");
    const card = await page.eval(`const c=document.querySelector('.em-play__card'); return {open:c.dataset.open, text:c.innerText.replace(/\\s+/g,' ').slice(0,140)}`);
    await page.eval(`document.querySelector('[data-rail-segmented] button:last-child, .rail-segmented button:last-of-type')?.click()`);
    await page.eval(`document.querySelector('.em-play__hot[data-part="viewfinder"]').click()`);
    await sleep(1800);
    await shot("play-night-monitor");
    report[vp.name] = { after, live, card };
    await page.close();
  }
} finally { proc.kill(); }
console.log(JSON.stringify(report, null, 1));
