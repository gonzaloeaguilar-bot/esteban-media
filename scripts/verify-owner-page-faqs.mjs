// Post-build / live check for lib/owner-page-faqs.ts: every owned question and
// the start of its answer must be in the raw HTML, inside a <details>, and in
// the page's FAQPage when the page has one. Usage:
//   node --experimental-strip-types scripts/verify-owner-page-faqs.mjs build    (reads .next/server/app)
//   node --experimental-strip-types scripts/verify-owner-page-faqs.mjs <origin>  (fetches the live pages)
// Checks question AND full answer text in raw HTML, inside one <details>, and as an
// exact name/acceptedAnswer pair in a parsed FAQPage. `--self-test` runs the negative controls.
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
/** All FAQPage Question entries from every parsed JSON-LD script (nodes, arrays, @graph). */
export function faqEntries(html) {
  const out = [];
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node["@graph"])) node["@graph"].forEach(walk);
    const type = node["@type"];
    if (type === "FAQPage" || (Array.isArray(type) && type.includes("FAQPage"))) {
      for (const q of [].concat(node.mainEntity ?? [])) out.push({ name: q?.name, text: q?.acceptedAnswer?.text });
    }
  };
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { walk(JSON.parse(m[1])); } catch { /* unparsable blob: contributes nothing */ }
  }
  return out;
}

/** One FAQ against one page: visible pair in one <details>, and an exact FAQPage pair. */
export function checkFaq(html, question, answer) {
  const text = decode(html);
  const details = [...html.matchAll(/<details\b[\s\S]*?<\/details>/g)].map((m) => decode(m[0]));
  const inHtml = text.includes(question) && text.includes(answer);
  const inDetails = details.some((d) => d.includes(question) && d.includes(answer));
  const inLd = faqEntries(html).some((e) => e.name === question && e.text === answer);
  return { inHtml, inDetails, inLd, ok: inHtml && inDetails && inLd };
}

let fail = 0;
if (mode === "--self-test") {
  // Negative controls: the checker must reject a split pair and a missing FAQPage.
  const q = "Q one?", a = "Answer one.";
  const good = `<details><summary>${q}</summary><p>${a}</p></details><script type="application/ld+json">${JSON.stringify({ "@graph": [{ "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }] }] })}</script>`;
  const split = good.replace(JSON.stringify(a), JSON.stringify("Other.")).replace("</script>", "</script>") + `<script type="application/ld+json">${JSON.stringify({ "@type": "WebPage", description: a })}</script>`;
  const noFaqPage = `<details><summary>${q}</summary><p>${a}</p></details><script type="application/ld+json">${JSON.stringify({ "@type": "WebPage", name: q, text: a })}</script>`;
  const splitDetails = `<details><summary>${q}</summary></details><details><p>${a}</p></details>` + good.slice(good.indexOf("<script"));
  const cases = [["good", good, true], ["answer split from its question in JSON-LD", split, false], ["no FAQPage", noFaqPage, false], ["question and answer in different <details>", splitDetails, false]];
  for (const [name, html, want] of cases) {
    const got = checkFaq(html, q, a).ok;
    if (got !== want) fail++;
    console.log(`${got === want ? "ok  " : "FAIL"} self-test: ${name} -> ${got}`);
  }
  console.log(fail ? `${fail} self-test failures` : "self-test ok");
  process.exit(fail ? 1 : 0);
}
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
  for (const faq of faqsFor(path)) {
    const { inHtml, inDetails, inLd, ok } = checkFaq(html, faq.question, plain(faq.answer));
    if (!ok) fail++;
    console.log(`${ok ? "ok  " : "FAIL"} ${path} | html=${inHtml} details=${inDetails} faqpage-pair=${inLd} | ${faq.question}`);
  }
}
console.log(fail ? `${fail} failures` : `all ${paths.length} pages ok`);
process.exit(fail ? 1 : 0);
