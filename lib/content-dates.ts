import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";

import { pageLastModified } from "@/lib/page-lastmod";

/**
 * Honest "last changed" dates for routes: sitemap `lastmod`, the visible
 * "Updated" lines and `dateModified` in JSON-LD all read the same date, so they
 * can never disagree.
 *
 * Since 2026-10-14 (PR #423) contentDateFor() reads the per-page ledger,
 * config/page-lastmod.json (lib/page-lastmod.ts, scripts/page-lastmod.mjs): a
 * page's date moves only when its OWN route folder or its own entry in lib/*.ts
 * changes, and a test fails when content changes without the ledger. No git is
 * read at build time, so shallow clones (Vercel, CI) emit the same real dates.
 *
 * The transitive-import mapping below (pageFileFor, sourceFilesFor) was the
 * first source (PR #422). It dated a route by the newest commit to any module it
 * imports, which put 300 of 352 sitemap paths on one day because every Spanish
 * page imports lib/spanish-site.ts. It stays as a navigation aid only.
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

const importCache = new Map<string, string[]>();

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
 * The route's date, from the per-page ledger (config/page-lastmod.json, see
 * lib/page-lastmod.ts). Since 2026-10-14 the ledger is the one source for the
 * sitemap lastmod, JSON-LD dateModified and every visible "Updated" line.
 *
 * Why not the transitive git date above: every Spanish niche page imports
 * lib/spanish-site.ts and every guide imports lib/guides.ts, so one commit to
 * either file re-dated ~85% of the site to the same day (measured on main at
 * aaa2f8ed: 300 of 352 sitemap paths on 2026-10-14, 6 distinct dates). The
 * ledger dates each page by its OWN entry inside those files, needs no git at
 * build time, and still never emits a date for a path it does not know.
 * sourceFilesFor() stays as a navigation aid.
 */
export function contentDateFor(routePath: string): string | undefined {
  return pageLastModified(routePath);
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
