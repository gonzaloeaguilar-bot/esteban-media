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
//             past a set comparison. Compared BOTH ways — see below.
//   alt       the multiset of words inside alt/title/aria-label. These are text
//             a reader or a crawler consumes but that no tag-stripping pass can
//             see, because stripping tags throws the attributes away with them.
//             Found by testing the gate rather than by reading it: blanking an
//             alt from "Fotograma del proyecto Bar Door Monkey" to "" passed
//             the first version silently. That matters most on exactly this
//             change, whose whole point is adding pictures.
//   headings  every h1..h6 as "<level>:<text>", IN ORDER. h1-h3 only was wrong:
//             demoting an h4 to an h5 keeps every word, so nothing else here
//             would notice. Order matters too — reordering an outline changes
//             the document even when the words all survive.
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
    ...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi),
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

  // Attribute text, which the strip above deliberately discards along with the
  // tag it lived on. Read from the ORIGINAL html, not `stripped`, and only from
  // the attributes a person or a crawler actually consumes.
  const alt = [
    ...html.matchAll(/\s(?:alt|title|aria-label)="([^"]*)"/gi),
  ]
    .flatMap((m) => decodeEntities(m[1]).split(/\s+/))
    .filter(Boolean)
    .sort();

  return {
    words: words.join(" "),
    alt: alt.join(" "),
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

/**
 * Every token the card redesign is allowed to ADD, and nothing else.
 *
 * Grouped by what puts it there, because a bare word list is unreviewable:
 *
 *   rail controls   ← → Anterior Siguiente   the arrows and their labels
 *   position        1..9 de                  "1 de 2" under the arrows
 *   card actions    Ver el proyecto servicio "Ver el proyecto" / "Ver el servicio"
 *   picture alt     Fotograma del proyecto   plus the project names already
 *                   + project names          published on these same pages
 *
 * The project names are the only entries that are not fixed UI strings. They
 * are allowed because they are the titles of projects the page ALREADY links
 * to by name in its visible copy — the alt text repeats an existing fact, it
 * does not introduce one.
 */
const ALLOWED_ADDITIONS = new Set([
  // rail controls and their labels
  "\u2190", "\u2192", "Anterior", "Siguiente",
  // position counter: "1 de 2"
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "de", "\u2013",
  // card calls to action
  "Ver", "el", "proyecto", "servicio",
  // alt text for the stills the rail adds
  "Fotograma", "del",
  // project titles, each already named in the page's own visible copy
  "Bar", "Door", "Monkey", "Miami", "Healthy", "Smile", "Homeowners",
  "My", "D'ler", "Banacol", "ML", "Colombia", "La", "Huelga",
  // The two rails' accessible names — "Proyectos publicados" and "Servicios
  // relacionados". aria-label only; nothing here is drawn on screen, because
  // the page's own h2 already names both strips for anyone who can see it.
  // These replaced `Options — niche_projects_<slug>`, which is what the kit
  // says when a headingless rail is given no name: English, on a Spanish page,
  // followed by a telemetry slug. Fixed upstream in rail-kit@57a13c6.
  "Proyectos", "publicados", "Servicios", "relacionados",
]);

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

  // Both directions. The first version only reported words LOST, which reads
  // as the safe half but is not: this change claims presentation and nothing
  // else, so a word that APPEARS is as much a breach of that claim as one that
  // vanishes — it would mean the template started asserting something the copy
  // never said. Silently adding "charlie delta" passed the one-directional
  // version.
  const wordDelta = (from, to) => {
    const extra = [];
    const counts = new Map();
    for (const w of to) counts.set(w, (counts.get(w) ?? 0) + 1);
    for (const w of from) {
      const n = counts.get(w) ?? 0;
      if (n === 0) extra.push(w);
      else counts.set(w, n - 1);
    }
    return extra;
  };

  for (const [field, label] of [
    ["words", "word"],
    ["alt", "alt/title/aria-label word"],
  ]) {
    const before = a[field] === undefined ? [] : a[field].split(" ").filter(Boolean);
    const after = b[field] === undefined ? [] : b[field].split(" ").filter(Boolean);
    const lost = wordDelta(before, after);
    const added = wordDelta(after, before);
    if (lost.length) {
      problems.push(
        `${route}: ${lost.length} ${label}(s) lost — ${lost.slice(0, 8).join(" ")}`,
      );
    }
    // Additions are allowlisted, not forbidden. A rail cannot be adopted
    // without introducing the words it speaks itself — its arrows, its
    // position counter, the call to action on a card, and the alt text of the
    // pictures it finally puts on the page. Refusing all of that would mean
    // refusing the change. Refusing NONE of it would mean a future edit could
    // slip a new claim into 70 pages and call itself presentation.
    //
    // So every token the redesign is allowed to add is written down below, and
    // anything else fails. The list is short on purpose: read it, and you know
    // exactly what these pages started saying.
    const unexpected = added.filter((w) => !ALLOWED_ADDITIONS.has(w));
    if (unexpected.length) {
      problems.push(
        `${route}: ${unexpected.length} UNEXPECTED ${label}(s) added — ` +
          `${[...new Set(unexpected)].slice(0, 8).join(" ")}`,
      );
    }
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
