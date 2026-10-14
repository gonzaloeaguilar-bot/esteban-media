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
 * The first source (PR #422) dated a route by the newest commit to any module it
 * imports, which put 300 of 352 sitemap paths on one day because every Spanish
 * page imports lib/spanish-site.ts.
 */

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
 * The transitive-import helpers (pageFileFor, sourceFilesFor) were deleted:
 * they read the filesystem on computed paths under the project root, which
 * makes Next's file tracer bundle the whole project into every function that
 * imports this module. llms.txt.rsc reached 386 MB against Vercel's 250 MB
 * limit and three production deploys failed on 2026-10-14 (a7dc70ea, aaa2f8ed,
 * f402a29). This module must stay free of fs and git.
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
