// Post-build / live check for lib/owner-page-faqs.ts: every owned question and
// the start of its answer must be in the raw HTML, inside a <details>, and in
// the page's FAQPage when the page has one. Usage:
//   node --experimental-strip-types scripts/verify-owner-page-faqs.mjs build    (reads .next/server/app)
//   node --experimental-strip-types scripts/verify-owner-page-faqs.mjs <origin>  (fetches the live pages)
// Checks question AND full answer text in raw HTML, inside <details>, and in FAQPage.
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Load the real registry (TypeScript, "@/..." imports) so answers are checked
// as rendered, not re-parsed from source. Run with --experimental-strip-types.
const repo = new URL("..", import.meta.url);
register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(spec, ctx, next) {
      if (spec.startsWith("@/")) return next(new URL(spec.slice(2) + ".ts", ${JSON.stringify(repo.href)}).href, ctx);
      return next(spec, ctx);
    }`),
  pathToFileURL("./"),
);
const { OWNER_PAGE_FAQS } = await import(new URL("lib/owner-page-faqs.ts", repo).href);
const paths = Object.keys(OWNER_PAGE_FAQS);
const faqsFor = (p) => OWNER_PAGE_FAQS[p].faqs;
/** Markdown links read as their label on the page and in JSON-LD. */
const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, (_m, l) => l);
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
  for (const faq of faqsFor(path)) {
    const q = faq.question;
    // Whole answer must be in the HTML and the <details>; JSON-LD holds it verbatim.
    const a = plain(faq.answer);
    const inHtml = text.includes(q) && text.includes(a);
    const inDetails = details.some((d) => d.includes(q) && d.includes(a));
    const ldText = decode(ld);
    // Every owner page must carry the FAQ in a FAQPage node; no exemption.
    const inLd = hasFaqPage && ldText.includes(q) && ldText.includes(JSON.stringify(a).slice(1, -1));
    const ok = inHtml && inDetails && inLd;
    if (!ok) fail++;
    console.log(`${ok ? "ok  " : "FAIL"} ${path} | html=${inHtml} details=${inDetails} faqpage=${inLd} | ${q}`);
  }
}
console.log(fail ? `${fail} failures` : `all ${paths.length} pages ok`);
process.exit(fail ? 1 : 0);
