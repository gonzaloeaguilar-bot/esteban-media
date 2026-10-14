import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";

/**
 * Honest "last changed" dates for routes: sitemap `lastmod`, the visible
 * "Updated" line on the home pages and `dateModified` in JSON-LD all read from
 * here, so the three can never disagree.
 *
 * Source: the date of the newest git commit that touched any file the route
 * renders from (its page file plus the lib/ and components/ modules it imports,
 * followed transitively). That is the truthful statement "the source this page
 * is built from last changed on this day". It is NOT build time and NOT a
 * blanket date: a uniform lastmod is what suppressed recrawl on the DuPont
 * site, and a fabricated one is forbidden.
 *
 * It can be later than the true edit to one page when the page shares a
 * content module with its siblings (every guide shares lib/guides.ts). It is
 * never earlier than a real change to the rendered source.
 *
 * Fail closed: with no git, or a SHALLOW clone (where git reports the clone
 * boundary commit as the author of every file, which would invent a date), this
 * returns nothing. A missing lastmod means "unknown"; callers must not
 * substitute today's date. See scripts/unshallow-for-dates.mjs, which deepens
 * the clone on Vercel before the build.
 */

const ROOT = process.cwd();
const ROUTE_GROUPS = ["app/(english)", "app/(spanish)"] as const;

/**
 * Site-wide chrome and plumbing. A change here touches every page, so letting
 * it count would collapse every route onto one date and say nothing.
 */
const SITE_WIDE: readonly RegExp[] = [
  /^vendor\//,
  /^components\/ui\//,
  /^components\/site-/,
  /^components\/(analytics|rail-)/,
  /^lib\/(site|site-metadata|utils|entity-schema|analytics-events|cdp-event|cdp-outcome|google-analytics-script|quote-cta|content-dates)\.ts$/,
  /^app\/(layout|globals\.css|robots|sitemap)/,
];

type DateMap = Map<string, string>;

let cachedDates: DateMap | null | undefined;
const importCache = new Map<string, string[]>();
const warned = new Set<string>();

function warnOnce(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(`[content-dates] ${message}`);
}

function git(args: string[]): string {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
}

/** file -> ISO date of the newest commit touching it, or null when unknowable. */
function loadGitDates(): DateMap | null {
  if (cachedDates !== undefined) return cachedDates;
  try {
    if (git(["rev-parse", "--is-shallow-repository"]).trim() !== "false") {
      warnOnce("shallow clone: git dates would be wrong, so no lastmod is emitted");
      return (cachedDates = null);
    }
    const out = git(["log", "--no-renames", "--name-only", "--format=%x00%cI"]);
    const dates: DateMap = new Map();
    let current = "";
    for (const line of out.split("\n")) {
      if (line.startsWith("\u0000")) {
        current = line.slice(1).trim();
      } else if (line.trim() && current && !dates.has(line.trim())) {
        // git log is newest-first, so the first sighting is the newest commit.
        dates.set(line.trim(), current);
      }
    }
    return (cachedDates = dates.size > 0 ? dates : null);
  } catch {
    warnOnce("git history unavailable: no lastmod is emitted");
    return (cachedDates = null);
  }
}

function resolveModule(spec: string, fromFile: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = spec.slice(2);
  else if (spec.startsWith(".")) base = relative(ROOT, join(ROOT, dirname(fromFile), spec));
  else return null;
  const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.mjs`, `${base}/index.ts`, `${base}/index.tsx`];
  for (const candidate of candidates) {
    const full = join(ROOT, candidate);
    if (existsSync(full) && !readdirSafe(full)) return candidate;
  }
  return null;
}

function readdirSafe(path: string): boolean {
  try {
    readdirSync(path);
    return true; // it is a directory
  } catch {
    return false;
  }
}

function importsOf(file: string): string[] {
  const cached = importCache.get(file);
  if (cached) return cached;
  let found: string[] = [];
  if (/\.(ts|tsx|mjs)$/.test(file)) {
    const source = readFileSync(join(ROOT, file), "utf8");
    const specs = new Set<string>();
    for (const match of source.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)) specs.add(match[1]);
    found = [...specs]
      .map((spec) => resolveModule(spec, file) ?? (/\.css$/.test(spec) ? cssPath(spec, file) : null))
      .filter((value): value is string => Boolean(value));
  }
  importCache.set(file, found);
  return found;
}

function cssPath(spec: string, fromFile: string): string | null {
  if (!spec.startsWith(".")) return null;
  const rel = relative(ROOT, join(ROOT, dirname(fromFile), spec));
  return existsSync(join(ROOT, rel)) ? rel : null;
}

function closure(entry: string): string[] {
  const seen = new Set<string>();
  const stack = [entry];
  while (stack.length > 0) {
    const file = stack.pop()!;
    if (seen.has(file) || SITE_WIDE.some((pattern) => pattern.test(file))) continue;
    seen.add(file);
    stack.push(...importsOf(file));
  }
  return [...seen];
}

/** The page.tsx that renders a route, following [dynamic] segments. */
export function pageFileFor(routePath: string): string | null {
  const segments = routePath.split("/").filter(Boolean);
  for (const group of ROUTE_GROUPS) {
    let dir: string = group;
    let ok = true;
    for (const segment of segments) {
      const exact = join(ROOT, dir, segment);
      if (existsSync(exact)) {
        dir = `${dir}/${segment}`;
        continue;
      }
      const dynamic = existsSync(join(ROOT, dir))
        ? readdirSync(join(ROOT, dir)).find((name) => /^\[[^\]]+\]$/.test(name))
        : undefined;
      if (!dynamic) {
        ok = false;
        break;
      }
      dir = `${dir}/${dynamic}`;
    }
    const page = `${dir}/page.tsx`;
    if (ok && existsSync(join(ROOT, page))) return page;
  }
  return null;
}

/** Source files a route renders from (page + transitive local imports). */
export function sourceFilesFor(routePath: string): string[] {
  const page = pageFileFor(routePath);
  return page ? closure(page) : [];
}

/**
 * ISO 8601 date-time of the newest commit touching the route's rendered
 * source, or undefined when it cannot be dated honestly.
 */
export function contentDateFor(routePath: string): string | undefined {
  const dates = loadGitDates();
  if (!dates) return undefined;
  let newest: string | undefined;
  for (const file of sourceFilesFor(routePath)) {
    const date = dates.get(file);
    if (date && (!newest || Date.parse(date) > Date.parse(newest))) newest = date;
  }
  return newest;
}

/** "2026-10-14" from an ISO date-time (the commit's own calendar day). */
export function isoDay(date: string): string {
  return date.slice(0, 10);
}

const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
} as const;

/** "Updated October 14, 2026" / "Actualizado el 14 de octubre de 2026". */
export function updatedLabel(date: string, locale: "en" | "es"): string {
  const [year, month, day] = isoDay(date).split("-").map(Number);
  return locale === "es"
    ? `Actualizado el ${day} de ${MONTHS.es[month - 1]} de ${year}`
    : `Updated ${MONTHS.en[month - 1]} ${day}, ${year}`;
}
