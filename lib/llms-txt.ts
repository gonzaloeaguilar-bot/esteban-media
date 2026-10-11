import { readFileSync } from "node:fs";
import { join } from "node:path";

import sitemap from "@/app/sitemap";
import { getCaseStudies, getCaseStudyPath } from "@/lib/case-studies";
import { getGuidePath, getGuides } from "@/lib/guides";
import { growthSystems } from "@/lib/growth-systems";
import {
  getPortfolioWatchCopy,
  getPortfolioWatchItems,
  getPortfolioWatchPath,
} from "@/lib/portfolio-watch";
import { siteUrl } from "@/lib/site";
import { spanishNichePages } from "@/lib/spanish-site";

/**
 * /llms.txt = the hand-written facts in lib/llms-base.txt + a page index
 * generated from the same sources as app/sitemap.ts.
 *
 * The hand-maintained file drifted (SEO/GEO audit 2026-10-10, finding 6): it
 * listed 3 noindexed URLs and omitted 213 of the 284 sitemap URLs, including
 * every case study and the real-estate rate card. Generating the index from
 * sitemap() means a page added to the sitemap is listed here automatically, and
 * a consolidated page drops out automatically, so the two cannot drift again.
 *
 * Labels come only from titles the site already publishes (guides, case
 * studies, portfolio, Spanish niche pages, growth systems). Other URLs are
 * listed bare rather than given an invented label.
 */

const BASE_PATH = join(process.cwd(), "lib/llms-base.txt");

const CORE_LABELS: Record<string, string> = {
  "/": "Home",
  "/es": "Inicio en español",
  "/services": "Services hub",
  "/es/servicios": "Servicios",
  "/pricing": "Pricing",
  "/es/precios": "Precios",
  "/portfolio": "Portfolio",
  "/es/portafolio": "Portafolio",
  "/areas": "Service areas",
  "/es/areas": "Áreas de servicio",
  "/about": "About Esteban",
  "/es/sobre-esteban": "Sobre Esteban",
  "/contact": "Contact",
  "/es/contacto": "Contacto",
  "/guides": "Guides index",
  "/es/guias": "Índice de guías",
  "/case-studies": "Case studies index",
  "/es/casos-de-estudio": "Índice de casos de estudio",
};

function publishedLabels(): Map<string, string> {
  const labels = new Map<string, string>(Object.entries(CORE_LABELS));

  for (const locale of ["en", "es"] as const) {
    for (const guide of getGuides(locale)) labels.set(getGuidePath(guide), guide.title);
    for (const study of getCaseStudies(locale)) labels.set(getCaseStudyPath(study), study.title);
    for (const item of getPortfolioWatchItems()) {
      labels.set(getPortfolioWatchPath(item.id, locale), getPortfolioWatchCopy(item, locale).title);
    }
  }
  for (const page of spanishNichePages) labels.set(`/es/${page.slug}`, page.title);
  for (const system of growthSystems) {
    labels.set(`/services/${system.slug}`, system.title);
    labels.set(`/es/${system.spanishSlug}`, system.spanishTitle);
  }
  return labels;
}

type Group = { heading: string; match: (path: string) => boolean };

// First match wins, so the specific groups come before the catch-alls.
const GROUPS: readonly Group[] = [
  { heading: "English guides", match: (p) => p.startsWith("/guides/") },
  { heading: "Guías en español", match: (p) => p.startsWith("/es/guias/") },
  { heading: "Case studies", match: (p) => p.startsWith("/case-studies/") || p.startsWith("/es/casos-de-estudio/") },
  { heading: "Portfolio watch pages", match: (p) => p.startsWith("/portfolio/") || p.startsWith("/es/portafolio/") },
  { heading: "Pricing and packages", match: (p) => p.startsWith("/pricing/") || p.startsWith("/es/precios/") },
  { heading: "English service pages", match: (p) => p.startsWith("/services/") },
  { heading: "Core pages, hubs, tools and resources", match: (p) => !p.startsWith("/es") || p === "/es" || CORE_LABELS[p] !== undefined },
  { heading: "Páginas de servicio en español", match: (p) => p.startsWith("/es/") },
];

export function llmsIndexPaths(): string[] {
  return sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/");
}

function buildIndex(): string {
  const labels = publishedLabels();
  const buckets = new Map<string, string[]>(GROUPS.map((group) => [group.heading, []]));

  for (const path of llmsIndexPaths()) {
    const group = GROUPS.find((candidate) => candidate.match(path));
    if (!group) continue;
    const url = `${siteUrl}${path === "/" ? "/" : path}`;
    const label = labels.get(path);
    buckets.get(group.heading)!.push(label ? `- ${label}: ${url}` : `- ${url}`);
  }

  const sections = [...buckets.entries()]
    .filter(([, lines]) => lines.length > 0)
    .map(([heading, lines]) => `### ${heading}\n\n${lines.join("\n")}`);

  return [
    "## Page Index",
    "",
    "Every URL in https://estebanmorenomedia.com/sitemap.xml, generated from the same source as the sitemap. Noindexed and redirected pages are never listed.",
    "",
    sections.join("\n\n"),
  ].join("\n");
}

export function buildLlmsTxt(): string {
  const base = readFileSync(BASE_PATH, "utf8").trimEnd();
  return `${base}\n\n${buildIndex()}\n`;
}
