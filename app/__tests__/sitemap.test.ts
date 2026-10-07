import { describe, expect, it } from "vitest";

import {
  getCaseStudies,
  getCaseStudyAlternates,
  getCaseStudyPath,
} from "@/lib/case-studies";
import {
  getGuideAlternates,
  getGuidePath,
  getGuides,
} from "@/lib/guides";
import {
  getPortfolioWatchItems,
  getPortfolioWatchLanguages,
  getPortfolioWatchPath,
} from "@/lib/portfolio-watch";

import sitemap from "../sitemap";

describe("portfolio sitemap entries", () => {
  const entries = sitemap();

  it("publishes the exact 279-URL consolidated inventory, each URL once", () => {
    const urls = entries.map((entry) => entry.url);

    // 279 = 243 consolidated + /desk-recommendations (owner-ordered
    // 2026-09-16) + /pricing and /es/precios (owner-ordered 2026-09-27)
    // + /pricing/real-estate and /es/precios/inmobiliaria (owner-ordered
    // 2026-09-29, demand-backed) + three buyer-prep resources and the remote
    // editor service page added 2026-10-01 + four EN GEO pages and three ES
    // GEO pages added from same-day GSC query evidence + the five bilingual
    // niche pairs added 2026-10-06 (ten URLs, owner-ordered) and the
    // food/places creator pair added 2026-10-07 (two URLs, owner-ordered).
    expect(entries).toHaveLength(279);
    expect(new Set(urls)).toHaveLength(279);
  });

  // This used to assert every entry carried lastModified 2026-07-19. That
  // pinned a single hardcoded date across all 259 URLs, which stopped being
  // true the moment anything shipped. lastmod truthfulness is now asserted in
  // sitemap-lastmod-truth.test.ts instead of a bulk date being locked in here.
  const englishUrl = "https://estebanmorenomedia.com/portfolio";
  const spanishUrl = "https://estebanmorenomedia.com/es/portafolio";

  it("includes both portfolio routes exactly once", () => {
    const urls = entries.map((entry) => entry.url);

    expect(urls.filter((url) => url === englishUrl)).toHaveLength(1);
    expect(urls.filter((url) => url === spanishUrl)).toHaveLength(1);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("publishes reciprocal language alternates", () => {
    const english = entries.find((entry) => entry.url === englishUrl);
    const spanish = entries.find((entry) => entry.url === spanishUrl);
    const expected = {
      "en-US": englishUrl,
      "es-US": spanishUrl,
      "x-default": englishUrl,
    };

    expect(english?.alternates?.languages).toEqual(expected);
    expect(spanish?.alternates?.languages).toEqual(expected);
  });

  it("includes all 16 localized watch pages once with reciprocal alternates", () => {
    const urls = entries.map((entry) => entry.url);

    for (const item of getPortfolioWatchItems()) {
      const expectedLanguages = Object.fromEntries(
        Object.entries(getPortfolioWatchLanguages(item.id)).map(
          ([language, path]) => [
            language,
            `https://estebanmorenomedia.com${path}`,
          ],
        ),
      );

      for (const locale of ["en", "es"] as const) {
        const url = `https://estebanmorenomedia.com${getPortfolioWatchPath(
          item.id,
          locale,
        )}`;
        const entry = entries.find((candidate) => candidate.url === url);

        expect(urls.filter((candidate) => candidate === url)).toHaveLength(1);
        expect(entry?.alternates?.languages).toEqual(expectedLanguages);
        expect(entry?.changeFrequency).toBe("monthly");
      }
    }
  });

  it("includes both guide indexes and all eight guide details with reciprocal alternates", () => {
    const urls = entries.map((entry) => entry.url);
    const indexLanguages = {
      "en-US": "https://estebanmorenomedia.com/guides",
      "es-US": "https://estebanmorenomedia.com/es/guias",
      "x-default": "https://estebanmorenomedia.com/guides",
    };

    for (const path of ["/guides", "/es/guias"]) {
      const entry = entries.find(
        (candidate) =>
          candidate.url === `https://estebanmorenomedia.com${path}`,
      );
      expect(entry?.alternates?.languages).toEqual(indexLanguages);
    }

    for (const locale of ["en", "es"] as const) {
      for (const guide of getGuides(locale)) {
        const url = `https://estebanmorenomedia.com${getGuidePath(guide)}`;
        const expectedLanguages = Object.fromEntries(
          Object.entries(getGuideAlternates(guide)).map(
            ([language, path]) => [
              language,
              `https://estebanmorenomedia.com${path}`,
            ],
          ),
        );
        const entry = entries.find((candidate) => candidate.url === url);

        expect(urls.filter((candidate) => candidate === url)).toHaveLength(1);
        expect(entry?.alternates?.languages).toEqual(expectedLanguages);
      }
    }
  });

  it("includes all ten case study URLs with reciprocal alternates", () => {
    const urls = entries.map((entry) => entry.url);

    for (const locale of ["en", "es"] as const) {
      for (const study of getCaseStudies(locale)) {
        const url = `https://estebanmorenomedia.com${getCaseStudyPath(study)}`;
        const expectedLanguages = Object.fromEntries(
          Object.entries(getCaseStudyAlternates(study)).map(
            ([language, path]) => [
              language,
              `https://estebanmorenomedia.com${path}`,
            ],
          ),
        );
        const entry = entries.find((candidate) => candidate.url === url);

        expect(urls.filter((candidate) => candidate === url)).toHaveLength(1);
        expect(entry?.alternates?.languages).toEqual(expectedLanguages);
        expect(entry?.changeFrequency).toBe("monthly");
        expect(entry?.priority).toBe(0.8);
      }
    }
  });
});
