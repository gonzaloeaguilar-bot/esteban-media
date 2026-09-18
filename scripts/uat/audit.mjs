import { launch, newPage } from "./cdp.mjs";
const base = process.argv[2];
const routes = process.argv.slice(3);
const VIEWPORTS = [[320,568],[375,667],[390,844],[768,1024],[1440,900]];
const { proc, port } = await launch();
const page = await newPage(port, { width: 375, height: 667 });
const findings = [];
const add = (sev, route, vp, what) => findings.push({ sev, route, vp, what });

for (const route of routes) {
  for (const [w,h] of VIEWPORTS) {
    await page.resize(w,h);
    await page.goto(base + route);
    const r = await page.eval(`
      const d=document;
      const q=s=>[...d.querySelectorAll(s)];
      const vis=e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed';
      const bar=d.querySelector('.em-stickybar');
      const heroRow=d.querySelector('[data-em-hero-actions]');
      const firstBtn=heroRow?heroRow.querySelector(':scope > a'):null;
      // WCAG 2.5.8 exempts links that sit INSIDE a sentence of text. Counting
      // them makes the report look worse and mean less, so they are excluded:
      // an anchor whose parent is a text block and which has text on either
      // side of it is inline by definition.
      const isInline=(e)=>{
        if(e.tagName!=='A') return false;
        const p=e.parentElement; if(!p) return false;
        if(!/^(P|LI|DD|SPAN|EM|STRONG|BLOCKQUOTE)$/.test(p.tagName)) return false;
        const txt=(p.innerText||'').trim(); const own=(e.innerText||'').trim();
        return txt.length > own.length + 4;
      };
      const tap=q('a,button,summary,input,select').filter(vis).filter(e=>!isInline(e)).map(e=>{const r=e.getBoundingClientRect();
        return {t:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,24),w:Math.round(r.width),h:Math.round(r.height)};})
        .filter(x=>x.h>0&&(x.h<24||x.w<24));
      const imgs=q('img');
      const hs=q('h1,h2,h3,h4,h5,h6').map(e=>+e.tagName[1]);
      let jumps=[]; for(let i=1;i<hs.length;i++) if(hs[i]-hs[i-1]>1) jumps.push(hs[i-1]+'->'+hs[i]);
      let cls=0; try{ new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) cls+=e.value;}).observe({type:'layout-shift',buffered:true}); }catch(e){}
      await new Promise(r=>setTimeout(r,400));
      return {
        overflow: d.documentElement.scrollWidth > innerWidth ? d.documentElement.scrollWidth : 0,
        pageHeight: d.body.scrollHeight,
        screens: +(d.body.scrollHeight/innerHeight).toFixed(1),
        heroCtaBottom: firstBtn?Math.round(firstBtn.getBoundingClientRect().bottom):null,
        h1Count: hs.filter(x=>x===1).length,
        headingJumps: jumps,
        imgCount: imgs.length,
        imgNoAlt: imgs.filter(i=>!i.hasAttribute('alt')).length,
        smallTargets: tap.slice(0,6), smallTargetCount: tap.length,
        barDisplay: bar?getComputedStyle(bar).display:'none',
        cls:+cls.toFixed(4),
        emptyLinks: q('a').filter(a=>!(a.innerText||'').trim()&&!a.getAttribute('aria-label')).length,
      };
    `);
    const vp = w+'x'+h;
    if (r.overflow) add('ALTO', route, vp, `desbordamiento horizontal: scrollWidth ${r.overflow} > ${w}`);
    if (r.h1Count !== 1) add('ALTO', route, vp, `${r.h1Count} elementos h1`);
    if (r.headingJumps.length) add('MEDIO', route, vp, `saltos de nivel de titulo: ${r.headingJumps.join(', ')}`);
    if (r.imgNoAlt) add('ALTO', route, vp, `${r.imgNoAlt} imagenes sin alt`);
    if (r.emptyLinks) add('ALTO', route, vp, `${r.emptyLinks} enlaces sin texto accesible`);
    if (r.cls > 0.1) add('ALTO', route, vp, `CLS ${r.cls}`);
    if (r.smallTargetCount) add('MEDIO', route, vp, `${r.smallTargetCount} objetivos tactiles <24px: ${r.smallTargets.map(t=>t.t+'('+t.w+'x'+t.h+')').join(', ')}`);
    if (r.heroCtaBottom && r.heroCtaBottom > h) add('ALTO', route, vp, `CTA del heroe bajo el pliegue (${r.heroCtaBottom} > ${h})`);
    if (w < 640 && r.barDisplay === 'none') add('MEDIO', route, vp, 'barra de accion ausente en telefono');
    if (w >= 640 && r.barDisplay !== 'none') add('MEDIO', route, vp, 'barra de accion visible en escritorio');
    if (r.screens > 12) add('BAJO', route, vp, `pagina de ${r.screens} pantallas`);
    if (w === 375) add('INFO', route, vp, `${r.screens} pantallas, ${r.imgCount} imagenes, CLS ${r.cls}`);
  }
}
const order={ALTO:0,MEDIO:1,BAJO:2,INFO:3};
findings.sort((a,b)=>order[a.sev]-order[b.sev]);
for (const f of findings) console.log(`[${f.sev}] ${f.route} @${f.vp} — ${f.what}`);
console.log(`\nTOTAL: ${findings.filter(f=>f.sev!=='INFO').length} hallazgos (${findings.filter(f=>f.sev==='ALTO').length} altos)`);
await page.close(); proc.kill();
