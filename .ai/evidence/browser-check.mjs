import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {newPage} from '../../scripts/uat/cdp.mjs';
const root=process.cwd()+'/.ai/evidence';
const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--remote-debugging-port=9448',`--user-data-dir=${process.cwd()}/.next/browser-profile`,'--no-first-run','--no-default-browser-check','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try {
 for(let i=0;i<40;i++){try{await fetch('http://127.0.0.1:9448/json/version');break;}catch{await sleep(250);}}
 const results=[];
 for(const width of [320,375,414,768,1024,1440]){
  const page=await newPage(9448,{width,height:width<500?667:900});
  await page.send('Network.setUserAgentOverride',{userAgent:'Mozilla/5.0 Chrome Safari'});
  await page.goto('http://localhost:3128/pricing/growth');
  const state=await page.eval(`
    const control=document.querySelector('[data-cta="header_language"]');
    const box=control.getBoundingClientRect();
    const rects=[...document.querySelectorAll('header a, header button')].map(el=>({text:el.textContent,box:el.getBoundingClientRect()})).filter(x=>x.box.width&&x.box.height);
    return {width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,language:{x:box.x,y:box.y,width:box.width,height:box.height},overlaps:rects.filter(x=>x.text!==control.textContent&&x.box.x<box.right&&x.box.right>box.left&&x.box.y<box.bottom&&x.box.bottom>box.top).map(x=>x.text)};
  `);
  assert(state.overflow<=0);assert(state.language.width>=24&&state.language.height>=24);assert.deepEqual(state.overlaps,[]);
  results.push(state);
  const shot=await page.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${root}/header-${width}.png`,Buffer.from(shot.data,'base64'));
  if(width===375){
   await page.eval(`document.querySelector('[aria-controls="mobile-primary-navigation"]').click()`);
   assert.equal(await page.eval(`return document.querySelectorAll('#mobile-primary-navigation [data-cta="header_language"]').length`),0);
   await page.eval(`document.querySelector('[data-cta="header_language"]').click()`);await sleep(1400);
   assert.equal(await page.eval(`return location.pathname`),'/es/precios/crecimiento');
   assert.match(await page.eval(`return document.cookie`),/em_lang=es/);
   await page.goto('http://localhost:3128/');
   assert.equal(await page.eval(`return location.pathname`),'/es');
   await page.eval(`document.querySelector('[data-cta="header_language"]').click()`);await sleep(1400);
   assert.equal(await page.eval(`return location.pathname`),'/');
   assert.match(await page.eval(`return document.cookie`),/em_lang=en/);
  }
  await page.close();
 }
 const page=await newPage(9448,{width:375,height:667});
 await page.goto('http://localhost:3128/es/precios');
 for (const id of ['arranque','crecimiento','presencia-local','todo-incluido']) {
  await page.eval(`document.querySelector('[aria-controls="paquete-${id}-body"]').click()`);
  await sleep(450);
  const card=await page.eval(`const a=document.querySelector('[data-cta="package_${id}_details"]');a.scrollIntoView({block:'center'});const r=a.getBoundingClientRect();return {href:a.getAttribute('href'),height:r.height,width:r.width,open:a.closest('li').dataset.state};`);
  assert.equal(card.open,'open'); assert(card.height>=24);results.push(card);
 }
 await page.eval(`document.querySelector('[data-cta="package_todo-incluido_details"]').click()`);await sleep(1500);
 assert.equal(await page.eval(`return location.pathname`),'/es/precios/todo-incluido');
 assert.equal(await page.eval(`return scrollY`),0);
 const shot=await page.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${root}/all-in-mobile.png`,Buffer.from(shot.data,'base64'));
 await page.close();
 fs.writeFileSync(`${root}/browser-results.json`,JSON.stringify(results,null,2));
 console.log('Browser geometry, menu, paired navigation, cookie, expanded cards: PASS');
} finally {chrome.kill();}
