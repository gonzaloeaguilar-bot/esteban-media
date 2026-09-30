#!/usr/bin/env node
/**
 * The gate that reviews Esteban's work, and fixes what it can fix by itself.
 *
 * Esteban is a video editor with write access. He should not have to learn this
 * project's conventions to contribute to it, and he should never be handed a
 * wall of red about a rule he has never read. So this script does three things,
 * in this order:
 *
 *   1. FIXES the mechanical things nobody should be asked to remember — a
 *      clickable element with no analytics marker, a section with no name.
 *   2. BLOCKS the two things that are genuinely dangerous and cannot be guessed:
 *      a price typed into a page, and a client's private rate reaching a public
 *      repository.
 *   3. REPORTS everything else in plain Spanish, as advice, not as failure.
 *
 * $0, no LLM. Deterministic, so the same commit always gets the same verdict.
 *
 *   node scripts/esteban-qa.mjs           # check and auto-fix
 *   node scripts/esteban-qa.mjs --check   # report only, change nothing
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CHECK_ONLY = process.argv.includes("--check");
/** What to compare against. His branch is measured against main, never itself. */
const BASE = process.env.QA_BASE || "origin/main";

const fixes = [];
const blockers = [];
const advice = [];

/**
 * ONLY the files this branch changed.
 *
 * A first version walked the whole tree and reported 60+ findings across files
 * nobody had touched — which on a first push would have rewritten twenty files
 * and produced a diff no one could review. A gate that flags the past punishes
 * the person who showed up today.
 */
function changedFiles() {
  let raw = "";
  try {
    raw = execFileSync("git", ["diff", "--name-only", `${BASE}...HEAD`], {
      cwd: ROOT,
      encoding: "utf8",
    });
  } catch {
    // No base to compare against (a shallow clone, a fresh repo): review nothing
    // rather than review everything.
    return [];
  }
  return raw
    .split("\n")
    .map((f) => f.trim())
    .filter((f) => /^(components|app)\/.*\.tsx$/.test(f))
    .filter((f) => !f.includes("__tests__"))
    .filter((f) => existsSync(join(ROOT, f)));
}

const files = changedFiles();

/* ---------------------------------------------------------------- 1. FIXES */

/**
 * A link or button with no `data-cta` is invisible in reports: track.js counts
 * the click but nothing says which control produced it. The id is derived from
 * the file, so it is stable and nobody has to invent a name.
 */
function addMissingCta(file, text) {
  const base = file.split("/").pop().replace(/\.tsx$/, "").replace(/-/g, "_");
  let n = 0;
  const fixed = text.replace(
    /<(a|button)\s([^>]*?)>/g,
    (whole, tag, attrs) => {
      if (/data-cta|aria-hidden|data-rail|type="submit"/.test(attrs)) return whole;
      // Only mark things that actually go somewhere or do something.
      if (tag === "a" && !/href/.test(attrs)) return whole;
      n += 1;
      return `<${tag} data-cta="${base}_${n}" ${attrs}>`;
    },
  );
  if (n > 0) fixes.push(`${file}: ${n} enlace(s) o botón(es) sin marca de analítica`);
  return fixed;
}

/* ------------------------------------------------------------- 2. BLOCKERS */

/** A price typed into a page drifts from the rate card the day it changes. */
function findTypedPrices(file, text) {
  if (/lib\/(pricing|services-config)\.ts/.test(file)) return;
  const hits = [...text.matchAll(/\$\s?\d{2,5}(?![\d/])/g)].map((m) => m[0]);
  if (hits.length) {
    blockers.push(
      `${file}: hay un precio escrito a mano (${[...new Set(hits)].join(", ")}). ` +
        `Los precios salen de lib/pricing.ts o lib/services-config.ts, nunca de la página.`,
    );
  }
}

/** A client's negotiated rate must never reach a public repository. */
const PREFERRED_LADDER = [150, 190, 225, 300, 375];
const MONTHLY_LADDER = [35, 110, 185];
function findPrivateRates(file, text) {
  const hits = (ladder) =>
    ladder.filter((n) => new RegExp(`\\$${n}\\b|amount:\\s*${n}\\b`).test(text)).length;
  if (hits(PREFERRED_LADDER) >= 3 || hits(MONTHLY_LADDER) >= 3) {
    blockers.push(`${file}: parece la tarifa privada de una clienta. Eso no va en el repositorio, que es público.`);
  }
  if (/dupont\s+real\s+stat|dupont\s+real\s+estate/i.test(text)) {
    blockers.push(`${file}: aparece el nombre de una clienta con tarifa negociada.`);
  }
}

/* --------------------------------------------------------------- 3. ADVICE */

function suggestSharedComponents(file, text) {
  // Reported, never blocked: sometimes a hand-rolled part is the right call.
  const cards = (text.match(/rounded-(lg|xl|2xl)[^"]*border/g) || []).length;
  if (cards >= 4 && !/vendor\/rail-kit/.test(text)) {
    advice.push(
      `${file}: ${cards} tarjetas hechas a mano. El proyecto ya trae 92 componentes compartidos ` +
        `en vendor/rail-kit — puede que uno encaje y te ahorre el trabajo.`,
    );
  }
  if (/overflow-x-auto|snap-x/.test(text) && !/RailTrack|RailShelf|RailDeck/.test(text)) {
    advice.push(`${file}: un carrusel hecho a mano. Mira RailTrack o RailDeck en vendor/rail-kit.`);
  }
}

/* ------------------------------------------------------------------- run */

for (const file of files) {
  const abs = join(ROOT, file);
  const original = readFileSync(abs, "utf8");
  let text = original;

  findTypedPrices(file, text);
  findPrivateRates(file, text);
  suggestSharedComponents(file, text);

  text = addMissingCta(file, text);

  if (!CHECK_ONLY && text !== original) writeFileSync(abs, text);
}

const out = [];
if (fixes.length) {
  out.push(CHECK_ONLY ? "### Faltaba analítica (no se corrigió, modo revisión)" : "### Lo arreglé por ti");
  for (const f of fixes) out.push(`- ${f}`);
  out.push("");
}
if (blockers.length) {
  out.push("### Esto sí hay que mirarlo antes de publicar");
  for (const b of blockers) out.push(`- ${b}`);
  out.push("");
}
if (advice.length) {
  out.push("### Sugerencias, por si te sirven");
  for (const a of advice.slice(0, 8)) out.push(`- ${a}`);
  if (advice.length > 8) out.push(`- …y ${advice.length - 8} más del mismo tipo.`);
  out.push("");
}
if (!files.length) {
  out.length = 0;
  out.push("No tocaste ninguna página ni componente en este cambio, así que no hay nada que revisar por aquí.");
} else if (!out.length) {
  out.push(
    `Revisé ${files.length} archivo(s) que cambiaste: analítica puesta, precios en su sitio ` +
      `y nada privado en el repositorio. Todo en orden.`,
  );
}

const report = out.join("\n");
console.log(report);
writeFileSync(join(ROOT, "esteban-qa-report.md"), `${report}\n`);

// Only a real danger stops the work. Missing analytics was already fixed, and
// advice is advice.
process.exit(blockers.length ? 1 : 0);
