import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "@/app/sitemap";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

const geoPages = [
  [
    "/services/video-production-fort-lauderdale",
    "app/(english)/services/video-production-fort-lauderdale/page.tsx",
    "fort_lauderdale_video_production",
  ],
  [
    "/services/reels-editor-fort-lauderdale",
    "app/(english)/services/reels-editor-fort-lauderdale/page.tsx",
    "reels_editor_fort_lauderdale",
  ],
  [
    "/services/reels-editor-miami",
    "app/(english)/services/reels-editor-miami/page.tsx",
    "reels_editor_miami",
  ],
  [
    "/services/real-estate-reels-video-editor-south-florida",
    "app/(english)/services/real-estate-reels-video-editor-south-florida/page.tsx",
    "real_estate_reels",
  ],
] as const;

const spanishGeoPages = [
  [
    "/es/produccion-de-video-fort-lauderdale",
    "app/(spanish)/es/produccion-de-video-fort-lauderdale/page.tsx",
    "produccion-de-video-fort-lauderdale",
    "es_video_production_fort_lauderdale",
  ],
  [
    "/es/editor-de-reels-fort-lauderdale",
    "app/(spanish)/es/editor-de-reels-fort-lauderdale/page.tsx",
    "editor-de-reels-fort-lauderdale",
    "es_reels_editor_fort_lauderdale",
  ],
  [
    "/es/editor-de-reels-miami",
    "app/(spanish)/es/editor-de-reels-miami/page.tsx",
    "editor-de-reels-miami",
    "es_reels_editor_miami",
  ],
] as const;

describe("GEO growth service pages", () => {
  it.each(geoPages)("%s uses the common measured service component", (route, file, serviceId) => {
    const text = source(file);

    expect(sitemapRoutes.map((entry) => entry.path)).toContain(route);
    expect(text).toContain("GeoServicePage");
    expect(text).toContain("GeoServicePageContent");
    expect(text).toContain(`path: "${route}"`);
    expect(text).toContain(`serviceId: "${serviceId}"`);
    expect(text).toContain("craft:");
    expect(text).toContain("faqs:");
    expect(text).toContain("related:");
  });

  it("links the new GEO pages from the services hub and llms.txt", () => {
    const servicesHub = source("app/(english)/services/page.tsx");
    const llms = source("public/llms.txt");

    for (const [route] of geoPages) {
      expect(servicesHub).toContain(route);
      expect(llms).toContain(`https://estebanmorenomedia.com${route}`);
    }
  });

  it.each(spanishGeoPages)("%s uses the Spanish shared niche page and inquiry rail", (route, file, slug, serviceId) => {
    const text = source(file);
    const spanishSite = source("lib/spanish-site.ts");
    const spanishComponent = source("components/spanish-niche-page.tsx");
    const llms = source("public/llms.txt");

    expect(text).toContain("SpanishNichePage");
    expect(text).toContain(`const slug = "${slug}"`);
    expect(spanishSite).toContain(`slug: "${slug}"`);
    expect(spanishComponent).toContain(`"${slug}": {`);
    expect(spanishComponent).toContain(`serviceId: "${serviceId}"`);
    expect(llms).toContain(`https://estebanmorenomedia.com${route}`);
  });

  it("keeps every page plain-language and avoids internal operations labels", () => {
    for (const [, file] of [...geoPages, ...spanishGeoPages]) {
      const text = source(file).toLowerCase();
      expect(text).not.toContain("analytics");
      expect(text).not.toContain("guardrail");
      expect(text).not.toContain("uAT".toLowerCase());
      expect(text).not.toContain("staging");
    }
  });
});
