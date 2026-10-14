import pageDates from "@/lib/generated/page-dates.json";

/**
 * Honest "last changed" dates for routes: sitemap `lastmod`, the visible
 * "Updated" line on the home pages and `dateModified` in JSON-LD all read from
 * here, so the three can never disagree.
 *
 * The data is generated at build time by scripts/page-dates.mjs (prebuild,
 * pretest, pretypecheck) from git: a page's date is the newest commit that
 * touched its page file or any module it renders from. Never build time, never
 * "today". When git history is unavailable (a shallow clone) the file is `{}`
 * and every function here returns undefined: unknown, not guessed.
 *
 * This module does NO filesystem or git access on purpose: a computed fs path
 * under the project root makes Next's tracer bundle the whole project into every
 * function that imports it (386 MB, deploy refused, 2026-10-14).
 */
const DATES = pageDates as Record<string, string>;
const PAGE_FILES = Object.keys(DATES);

/** The page.tsx that renders a route, matching [dynamic] segments. */
export function pageFileFor(routePath: string): string | null {
  const segments = routePath.split("/").filter(Boolean);
  for (const group of ["app/(english)", "app/(spanish)"]) {
    for (const file of PAGE_FILES) {
      if (!file.startsWith(`${group}/`)) continue;
      const parts = file.slice(group.length + 1, -"/page.tsx".length).split("/").filter(Boolean);
      if (parts.length !== segments.length) continue;
      if (parts.every((part, i) => part === segments[i] || /^\[[^\]]+\]$/.test(part))) {
        // Prefer an exact directory over a dynamic one when both exist.
        const exact = PAGE_FILES.find(
          (other) =>
            other.startsWith(`${group}/`) &&
            other.slice(group.length + 1, -"/page.tsx".length).split("/").filter(Boolean).join("/") === segments.join("/"),
        );
        return exact ?? file;
      }
    }
  }
  return null;
}

/** ISO 8601 date-time of the newest commit behind the route, or undefined. */
export function contentDateFor(routePath: string): string | undefined {
  const file = pageFileFor(routePath);
  return file ? DATES[file] : undefined;
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
