#!/usr/bin/env node
/**
 * Dual-audience gate — $0, deterministic, no LLM.
 *
 * Measures whether a page is built as citable units: sections of 100-180 words
 * under question-shaped headings, present in the RAW HTML, with depth in native
 * <details> rather than behind JavaScript.
 *
 * This exists because the property was mis-measured three times in one session,
 * each time by substituting a proxy:
 *
 *   1. counting <details> blocks — says nothing about section length, and the
 *      FAQ answers were already in the raw HTML, so moving them into <details>
 *      would have helped humans and done nothing for crawlers;
 *   2. splitting sections on <h2> only — lumps every <h3> subsection into one
 *      block and reports a 615-word monolith that does not exist;
 *   3. reading the component source instead of the served output.
 *
 * A section is the text under its own heading, h2 OR h3. Measure the served
 * bytes, never the source.
 *
 * Usage: node scripts/dual-audience-gate.mjs <url> [url...] [--json]
 * Exit 1 if any page fails.
 */

const BAND_MIN = 100;
const BAND_MAX = 180;
const OVERSIZED = 250;

const strip = (html) =>
  html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");

const text = (html) =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export function analyse(html) {
  const body = strip(html);
  const headings = [...body.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
    (m) => text(m[2]),
  );
  // A section is the text under its own heading, whatever its level.
  const chunks = body.split(/<h[23][^>]*>/i).slice(1);
  const sizes = chunks.map((c) => text(c).split(" ").filter(Boolean).length);

  const questions = headings.filter((h) => h.endsWith("?")).length;
  const inBand = sizes.filter((s) => s >= BAND_MIN && s <= BAND_MAX).length;
  const oversized = sizes.filter((s) => s > OVERSIZED).length;
  const details = (body.match(/<details/gi) ?? []).length;
  const h1 = /<h1[^>]*>/i.test(body);

  return {
    headings: headings.length,
    questions,
    questionRatio: headings.length ? questions / headings.length : 0,
    sections: sizes.length,
    inBand,
    oversized,
    details,
    h1,
    words: text(body).split(" ").filter(Boolean).length,
  };
}

/**
 * A page passes when it has an h1 in the raw HTML, at least two citable
 * sections, at least a quarter of its headings shaped as questions, and nothing
 * over the oversized ceiling.
 */
export function verdict(m) {
  const failures = [];
  if (!m.h1) failures.push("no <h1> in raw HTML");
  if (m.inBand < 2) failures.push(`only ${m.inBand} section(s) in the ${BAND_MIN}-${BAND_MAX} word band`);
  if (m.questionRatio < 0.25) failures.push(`${m.questions}/${m.headings} headings are question-shaped (<25%)`);
  if (m.oversized > 0) failures.push(`${m.oversized} section(s) over ${OVERSIZED} words`);
  return failures;
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const urls = args.filter((a) => !a.startsWith("--"));
  if (urls.length === 0) {
    console.error("usage: dual-audience-gate.mjs <url> [url...] [--json]");
    process.exit(2);
  }

  const results = [];
  for (const url of urls) {
    let html = "";
    try {
      // Raw fetch on purpose: this must see what a non-JS crawler sees.
      const res = await fetch(url, { headers: { "user-agent": "dual-audience-gate" } });
      if (!res.ok) {
        results.push({ url, error: `HTTP ${res.status}` });
        continue;
      }
      html = await res.text();
    } catch (err) {
      results.push({ url, error: String(err) });
      continue;
    }
    const m = analyse(html);
    results.push({ url, ...m, failures: verdict(m) });
  }

  if (json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const r of results) {
      if (r.error) {
        console.log(`FAIL  ${r.url}  ${r.error}`);
        continue;
      }
      const tag = r.failures.length === 0 ? "PASS" : "FAIL";
      console.log(
        `${tag}  ${r.url}\n      ${r.words}w  headings ${r.questions}/${r.headings} questions  in-band ${r.inBand}  oversized ${r.oversized}  details ${r.details}`,
      );
      for (const f of r.failures) console.log(`      - ${f}`);
    }
    const failed = results.filter((r) => r.error || r.failures.length > 0).length;
    console.log(`\n${results.length - failed}/${results.length} pass`);
  }

  process.exit(results.some((r) => r.error || r.failures.length > 0) ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
