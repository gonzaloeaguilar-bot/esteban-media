// Computes an honest "last changed" date for every page.tsx, at BUILD time, and
// writes lib/generated/page-dates.json (gitignored). lib/content-dates.ts reads
// that JSON; it does no filesystem or git work at all.
//
// Why a generated file and not git calls inside the app: Next's file tracer
// treats a computed fs path under process.cwd() as "include the whole project",
// which inflated the llms.txt function to 386 MB and failed the Vercel deploy
// (limit 250 MB) on 2026-10-14. Reading git in a prebuild script keeps the
// tracer out of it.
//
// A page's date = the newest git commit that touched its page.tsx or any local
// module it imports (followed transitively), excluding site-wide chrome (a
// change there touches every page and would collapse every date onto one).
// Never build time, never "today". On a SHALLOW clone git reports the boundary
// commit as the author of every file, which would invent a date, so this writes
// {} instead: unknown, not guessed.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_WIDE = [
  /^vendor\//,
  /^components\/ui\//,
  /^components\/site-/,
  /^components\/(analytics|rail-)/,
  /^lib\/(site|site-metadata|utils|entity-schema|analytics-events|cdp-event|cdp-outcome|google-analytics-script|quote-cta|content-dates)\.ts$/,
  /^lib\/generated\//,
  /^app\/(layout|globals\.css|robots|sitemap)/,
];

const git = (root, args) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 512 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });

export function loadGitDates(root) {
  if (git(root, ["rev-parse", "--is-shallow-repository"]).trim() !== "false") return null;
  const dates = new Map();
  let current = "";
  for (const line of git(root, ["log", "--no-renames", "--name-only", "--format=%x00%cI"]).split("\n")) {
    if (line.startsWith("\u0000")) current = line.slice(1).trim();
    else if (line.trim() && current && !dates.has(line.trim())) dates.set(line.trim(), current); // newest first
  }
  return dates.size > 0 ? dates : null;
}

function pageFiles(root) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(join(root, dir))) {
      const rel = `${dir}/${name}`;
      if (name === "page.tsx") out.push(rel);
      else if (statSync(join(root, rel)).isDirectory()) walk(rel);
    }
  };
  for (const group of ["app/(english)", "app/(spanish)"]) if (existsSync(join(root, group))) walk(group);
  return out;
}

function resolveSpec(root, spec, from) {
  let base;
  if (spec.startsWith("@/")) base = spec.slice(2);
  else if (spec.startsWith(".")) base = relative(root, join(root, dirname(from), spec));
  else return null;
  for (const c of [base, `${base}.ts`, `${base}.tsx`, `${base}.mjs`, `${base}/index.ts`, `${base}/index.tsx`]) {
    const full = join(root, c);
    if (existsSync(full) && statSync(full).isFile()) return c;
  }
  return null;
}

function importsOf(root, file, cache) {
  if (cache.has(file)) return cache.get(file);
  let found = [];
  if (/\.(ts|tsx|mjs)$/.test(file)) {
    const specs = new Set();
    for (const m of readFileSync(join(root, file), "utf8").matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)) specs.add(m[1]);
    found = [...specs].map((s) => resolveSpec(root, s, file) ?? (s.startsWith(".") && /\.css$/.test(s) && existsSync(join(root, dirname(file), s)) ? relative(root, join(root, dirname(file), s)) : null)).filter(Boolean);
  }
  cache.set(file, found);
  return found;
}

export function computePageDates(root, dates = loadGitDates(root)) {
  if (!dates) return {};
  const cache = new Map();
  const result = {};
  for (const page of pageFiles(root)) {
    const seen = new Set();
    const stack = [page];
    let newest;
    while (stack.length) {
      const file = stack.pop();
      if (seen.has(file) || SITE_WIDE.some((p) => p.test(file))) continue;
      seen.add(file);
      const d = dates.get(file);
      if (d && (!newest || Date.parse(d) > Date.parse(newest))) newest = d;
      stack.push(...importsOf(root, file, cache));
    }
    if (newest) result[page] = newest;
  }
  return result;
}

const here = fileURLToPath(import.meta.url);
if (process.argv[1] && join(process.argv[1]) === here) {
  const root = join(dirname(here), "..");
  let dates = {};
  try {
    dates = computePageDates(root);
  } catch (error) {
    console.warn(`[page-dates] git unavailable: ${String(error.message).split("\n")[0]}`);
  }
  const count = Object.keys(dates).length;
  if (count === 0) console.warn("[page-dates] no git history (shallow clone?): no dates, so no lastmod and no Updated line");
  else console.log(`[page-dates] ${count} pages dated from git`);
  mkdirSync(join(root, "lib/generated"), { recursive: true });
  writeFileSync(join(root, "lib/generated/page-dates.json"), `${JSON.stringify(dates, null, 1)}\n`);
}
