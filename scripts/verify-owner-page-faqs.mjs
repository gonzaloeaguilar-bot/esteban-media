// Post-build / live check for lib/owner-page-faqs.ts: every owned question and
// the start of its answer must be in the raw HTML, inside a <details>, and in
// the page's FAQPage when the page has one. Usage:
//   node scripts/verify-owner-page-faqs.mjs build    (reads .next/server/app)
//   node scripts/verify-owner-page-faqs.mjs <origin>  (fetches the live pages)
import { readFileSync, existsSync } from "node:fs";
const src = readFileSync(new URL("../lib/owner-page-faqs.ts", import.meta.url), "utf8");
const paths = [...src.matchAll(/^  "(\/[^"]+)": \{$/gm)].map((m) => m[1]);
const questions = Object.fromEntries(paths.map((p) => [p, []]));
let current = null;
for (const line of src.split("\n")) {
  const p = line.match(/^  "(\/[^"]+)": \{$/); if (p) current = p[1];
  const q = line.match(/^\s+question: "(.+)",$/); if (q && current) questions[current].push(q[1]);
}
const mode = process.argv[2] ?? "build";
const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
let fail = 0;
for (const path of paths) {
  let html;
  if (mode === "build") {
    const f = `.next/server/app${path}.html`;
    if (!existsSync(f)) { console.log(`FAIL ${path}: no built html`); fail++; continue; }
    html = readFileSync(f, "utf8");
  } else {
    const r = await fetch(`${mode}${path}?v=${Date.now()}`, { headers: { "user-agent": "Mozilla/5.0 (owner-faq-check)" } });
    if (r.status !== 200) { console.log(`FAIL ${path}: HTTP ${r.status}`); fail++; continue; }
    html = await r.text();
  }
  const text = decode(html);
  const details = [...html.matchAll(/<details\b[\s\S]*?<\/details>/g)].map((m) => decode(m[0]));
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join(" ");
  const hasFaqPage = ld.includes('"FAQPage"');
  for (const q of questions[path]) {
    const inHtml = text.includes(q);
    const inDetails = details.some((d) => d.includes(q));
    const inLd = !hasFaqPage || decode(ld).includes(q);
    const ok = inHtml && inDetails && inLd;
    if (!ok) fail++;
    console.log(`${ok ? "ok  " : "FAIL"} ${path} | html=${inHtml} details=${inDetails} faqpage=${hasFaqPage ? inLd : "none"} | ${q}`);
  }
}
console.log(fail ? `${fail} failures` : `all ${paths.length} pages ok`);
process.exit(fail ? 1 : 0);
