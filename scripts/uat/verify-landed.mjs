import { launch, newPage } from "./cdp.mjs";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("/tmp/em-chooser-film", { recursive: true });
const { port } = await launch(9446);
const viewports = [
  { w: 390, h: 844, n: "p390" },
  { w: 375, h: 600, n: "p375x600" },
  { w: 390, h: 664, n: "p390x664" },
  { w: 1440, h: 900, n: "d1440" },
];
for (const vp of viewports) {
  const page = await newPage(port, { width: vp.w, height: vp.h });
  await page.goto("http://localhost:4173/");
  await new Promise((r) => setTimeout(r, 2800));
  const m = await page.eval(`
    document.querySelector('#start').scrollIntoView();
    await new Promise(r => setTimeout(r, 300));
    const num = document.querySelector('[data-section="home-project-path"] .em-art-price-num');
    const r = num ? num.getBoundingClientRect() : null;
    const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    return { found: !!num, visible: num ? num.checkVisibility() : false, rect: r ? {w:r.width,h:r.height} : null, overflow };
  `);
  const { data } = await page.send("Page.captureScreenshot", { format: "jpeg", quality: 75 });
  writeFileSync(`/tmp/em-chooser-film/landed-${vp.n}.jpg`, Buffer.from(data, "base64"));
  console.log(vp.n, JSON.stringify(m));
  await page.close();
}
process.exit(0);
