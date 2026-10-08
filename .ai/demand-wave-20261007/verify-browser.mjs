import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { newPage } from '../../scripts/uat/cdp.mjs';

const out = resolve('.ai/demand-wave-20261007');
const profile = resolve(out, 'chrome-profile');
mkdirSync(profile, { recursive: true });
const port = 9447;
const proc = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  `--disk-cache-dir=${profile}/cache`, '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--hide-scrollbars', 'about:blank',
], { stdio: 'ignore' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const records = [];
const routes = { en: '/daily-script-pacing-calculator', es: '/es/calculadora-de-ritmo-de-video' };
const base = process.argv[2] || 'http://127.0.0.1:4417';
const section = '[data-section="script-pacing-help"]';
let page;
try {
  for (let i=0; i<60; i++) {
    try { if ((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) break; } catch {}
    await wait(250);
  }
  for (const [locale, route] of Object.entries(routes)) {
    for (const [width,height] of [[375,667],[390,844],[1440,900]]) {
      page = await newPage(port,{width,height});
      await page.send('Network.enable');
      await page.send('Network.setBlockedURLs', { urls: ['*google-analytics.com*', '*googletagmanager.com*'] });
      await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      await page.goto(base + route);
      const initial = await page.eval(`
        const help = document.querySelector('${section}');
        if (!help) throw new Error('missing help');
        return { details: help.querySelectorAll('details').length, open: help.querySelectorAll('details[open]').length, title: document.title, width: document.documentElement.scrollWidth, viewport: innerWidth };
      `);
      assert.equal(initial.details,3); assert.equal(initial.open,0); assert.ok(initial.width<=initial.viewport);
      await page.eval(`document.querySelector('#script-input').focus(); document.querySelector('#script-input').select();`);
      await page.send('Input.insertText', { text: Array(60).fill(locale === 'es' ? 'palabra' : 'word').join(' ') });
      await page.eval(`const s=document.querySelector('#wpm-select'); s.value='120'; s.dispatchEvent(new Event('change',{bubbles:true}));`);
      const estimate = await page.eval(`
        const label=[...document.querySelectorAll('span')].find(e=>e.textContent.trim()==='${locale==='es'?'Tiempo estimado':'Est. duration'}');
        return label.parentElement.innerText;
      `);
      assert.match(estimate,/30s/);
      await page.eval(`const help=document.querySelector('${section}'); window.scrollTo(0, help.getBoundingClientRect().top+scrollY-80);`);
      await wait(300);
      const closed = await page.send('Page.captureScreenshot',{format:'png'});
      writeFileSync(resolve(out,`${locale}-${width}-closed.png`),Buffer.from(closed.data,'base64'));
      const target = await page.eval(`const e=document.querySelector('${section} summary'); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2,width:r.width,height:r.height};`);
      assert.ok(target.height>=44);
      if (width<768) {
        await page.send('Emulation.setTouchEmulationEnabled',{enabled:true});
        await page.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:target.x,y:target.y}]});
        await page.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      } else {
        await page.eval(`document.querySelector('${section} summary').focus();`);
        await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',unmodifiedText:'\r',windowsVirtualKeyCode:13});
        await page.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
      }
      await wait(250);
      const opened = await page.eval(`
        const help=document.querySelector('${section}'); const detail=help.querySelector('details'); const answer=detail.querySelector('.rail-faq__a');
        const css=getComputedStyle(answer); return {open:detail.open, text:answer.innerText, size:css.fontSize, lineHeight:css.lineHeight, width:document.documentElement.scrollWidth, viewport:innerWidth};
      `);
      assert.equal(opened.open,true); assert.ok(opened.width<=opened.viewport); assert.ok(parseFloat(opened.size)>=16);
      const open = await page.send('Page.captureScreenshot',{format:'png'});
      writeFileSync(resolve(out,`${locale}-${width}-open.png`),Buffer.from(open.data,'base64'));
      await page.eval(`document.querySelector('${section} summary').focus();`);
      await page.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',unmodifiedText:'\r',windowsVirtualKeyCode:13});
      await page.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
      await wait(150);
      assert.equal(await page.eval(`return document.querySelector('${section} details').open;`),false);
      await page.send('Runtime.evaluate',{expression:readFileSync('node_modules/.pnpm/axe-core@4.11.4/node_modules/axe-core/axe.min.js','utf8')});
      const axe = await page.eval(`return (await axe.run({include:[['${section}']]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,impact:v.impact,description:v.description}));`);
      assert.deepEqual(axe,[]);
      records.push({locale,width,height,initial,estimate,target,opened,keyboardClose:true,scopedAxeViolations:axe});
      await page.close();page=null;
    }
    page=await newPage(port,{width:390,height:844});
    await page.send('Emulation.setScriptExecutionDisabled',{value:true});
    await page.goto(base+route);
    const noJs=await page.eval(`const help=document.querySelector('${section}');return {details:help.querySelectorAll('details').length,text:help.textContent,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)).filter(d=>d['@type']==='FAQPage')};`);
    assert.equal(noJs.details,3);assert.equal(noJs.schemas[0].mainEntity.length,3);
    for(const qa of noJs.schemas[0].mainEntity) assert.ok(noJs.text.includes(qa.acceptedAnswer.text));
    records.push({locale,noJs:true,details:3,faqSchemaParity:true});
    await page.close();page=null;
  }
  writeFileSync(resolve(out,'browser-results.json'),JSON.stringify({checkedAt:new Date().toISOString(),base,records},null,2)+'\n');
  console.log(`PASS: ${records.length} browser scenarios; EN/ES, 3 viewports, touch/keyboard, reduced motion, no-JS, 60 words at 120 WPM = 30s.`);
} finally {
  if(page) await page.close();
  proc.kill();
}
