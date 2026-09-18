#!/usr/bin/env node
// Prove a presentation change did not move a single word.
//
//   node scripts/text-parity.mjs snapshot <buildDir> <out.json>
//   node scripts/text-parity.mjs check    <buildDir> <baseline.json>
//
// The redesign of the Spanish niche template rearranges 70 routes into cards.
// The whole premise is that the SEO/GEO surface is untouched, and "I was
// careful" is not evidence. This reads the BUILT HTML — the real artifact that
// ships, not the source — and fingerprints, per route:
//
//   words     the multiset of visible words, whitespace-normalised. A multiset,
//             not a set: dropping one of three identical bullets would slip
//             past a set comparison.
//   headings  every h1/h2/h3 as "<level>:<text>", IN ORDER. Order matters —
//             reordering an outline changes the document even when the words
//             all survive.
//   links     the set of hrefs.
//   jsonld    a sha256 over every application/ld+json blob, joined in order.
//             Hashed rather than stored: any byte that moves changes the hash,
//             and the blobs alone were half the fixture.
//
// Script, style and JSON-LD contents are stripped before the word pass so a
// schema edit cannot disguise itself as prose, and Next's own hydration
// payload (self.__next_f) never counts as page text.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative } from "node:path";

const [, , mode, buildDir, file] = process.argv;
if (!["snapshot", "check"].includes(mode) || !buildDir || !file) {
  console.error(
    "usage: text-parity.mjs <snapshot|check> <buildDir> <file.json>",
  );
  process.exit(2);
}

/** Only the routes this change touches. */
const SCOPE = /^es\/[^/]+\.html$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

function fingerprint(html) {
  const jsonld = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
    .map((m) => m[1].trim())
    .join("\u0000");

  const headings = [
    ...html.matchAll(/<(h[123])\b[^>]*>([\s\S]*?)<\/\1>/gi),
  ].map(
    (m) =>
      `${m[1].toLowerCase()}:${decodeEntities(m[2].replace(/<[^>]+>/g, " "))
        .replace(/\s+/g, " ")
        .trim()}`,
  );

  const links = [
    ...new Set(
      [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"/gi)].map((m) => m[1]),
    ),
  ].sort();

  const stripped = html.replace(
    /<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi,
    " ",
  );
  const words = decodeEntities(stripped.replace(/<[^>]+>/g, " "))
    .split(/\s+/)
    .filter(Boolean)
    .sort();

  return {
    words: words.join(" "),
    headings,
    links,
    jsonld: createHash("sha256").update(jsonld).digest("hex"),
  };
}

const files = walk(buildDir)
  .map((p) => [relative(buildDir, p), p])
  .filter(([rel]) => SCOPE.test(rel))
  .sort(([a], [b]) => a.localeCompare(b));

const current = {};
for (const [rel, p] of files) current[rel] = fingerprint(readFileSync(p, "utf8"));

if (mode === "snapshot") {
  writeFileSync(
    file,
    `${JSON.stringify(current, null, 0).replace(/},"/g, '},\n"')}\n`,
  );
  console.log(`text-parity: captured ${Object.keys(current).length} routes`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(file, "utf8"));
const problems = [];

const seen = new Set(Object.keys(current));
for (const route of Object.keys(baseline)) {
  if (!seen.has(route)) {
    problems.push(`${route}: route disappeared from the build`);
    continue;
  }
  const a = baseline[route];
  const b = current[route];

  const missing = [];
  const counts = new Map();
  for (const w of b.words.split(" ")) counts.set(w, (counts.get(w) ?? 0) + 1);
  for (const w of a.words.split(" ")) {
    const n = counts.get(w) ?? 0;
    if (n === 0) missing.push(w);
    else counts.set(w, n - 1);
  }
  if (missing.length) {
    problems.push(
      `${route}: ${missing.length} word(s) lost — ${missing.slice(0, 8).join(" ")}`,
    );
  }

  if (a.headings.join("\u0000") !== b.headings.join("\u0000")) {
    const gone = a.headings.filter((h) => !b.headings.includes(h));
    problems.push(
      `${route}: heading outline changed` +
        (gone.length ? ` — lost ${gone.slice(0, 3).join(" | ")}` : " (order)"),
    );
  }

  const lostLinks = a.links.filter((h) => !b.links.includes(h));
  if (lostLinks.length) {
    problems.push(`${route}: ${lostLinks.length} link(s) lost — ${lostLinks.slice(0, 5).join(" ")}`);
  }

  if (a.jsonld !== b.jsonld) {
    problems.push(`${route}: JSON-LD changed`);
  }
}

if (problems.length) {
  console.error(`text-parity: ${problems.length} problem(s)\n`);
  for (const p of problems.slice(0, 40)) console.error(`  ${p}`);
  if (problems.length > 40) console.error(`  … and ${problems.length - 40} more`);
  process.exit(1);
}

console.log(
  `text-parity: ${Object.keys(baseline).length} routes keep every word, heading, link and schema blob`,
);
