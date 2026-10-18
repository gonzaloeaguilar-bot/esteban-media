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

import sitemap, { inventoryAdditions20261010Paths } from "../sitemap";

describe("portfolio sitemap entries", () => {
  const entries = sitemap();

  it("publishes the exact 372-URL consolidated inventory, each URL once", () => {
    const urls = entries.map((entry) => entry.url);

    // 279 = 243 consolidated + /desk-recommendations (owner-ordered
    // 2026-09-16) + /pricing and /es/precios (owner-ordered 2026-09-27)
    // + /pricing/real-estate and /es/precios/inmobiliaria (owner-ordered
    // 2026-09-29, demand-backed) + three buyer-prep resources and the remote
    // editor service page added 2026-10-01 + four EN GEO pages and three ES
    // GEO pages added from same-day GSC query evidence + the five bilingual
    // niche pairs added 2026-10-06 (ten URLs, owner-ordered) and the
    // food/places creator pair added 2026-10-07 (two URLs, owner-ordered).
    // +4 = the 2026-10-07 restaurant and real-estate cost-answer guide pairs.
    // +1 = /es/editor-de-video-miami (2026-10-07, Spanish-first demand-backed).
    // +26 = the indexable-but-unsitemapped pages Esteban ordered in on
    // 2026-10-10: 12 growth-system pages, 10 daily tool pages, the 2
    // case-study hubs, /lens and /fort-lauderdale.
    // +6 = the annual-events hub pair plus the Fort Lauderdale boat show and Art Basel Miami Beach pairs (2026-10-10, owner-approved).
    // +10 = the five remaining annual-event pairs: Miami International Boat Show, South Beach Wine & Food Festival, eMerge Americas, Miami Music Week and Miami Spice (2026-10-10, owner-approved).
    // +16 = niche wave 8 (2026-10-11, owner-approved bilingual pairs).
    // +1 = the 2026-10-11 real product photography buyer page.
    // +1 = the Spanish companion to the real product photography buyer page.
    // +4 = founder/personal-brand and podcast-clipping pairs (2026-10-13, round 3).
    // +4 = food-account and short-form cost guide hubs, EN+ES (2026-10-14).
    // +2 = Reels editing cost calculator, EN+ES (2026-10-14).
    // +4 = local vs Fiverr vs agency and restaurant Reels-per-week guides, EN+ES (2026-10-14).
    // +2 = Boca Raton pair (2026-10-14, owner decision): the EN page re-admitted
    // from the cohort noindex list, plus its new Spanish twin.
    // +2 = Miami restaurant Instagram study pair (2026-10-14, original data).
    // +1 = /es/contratar-editor-de-video-remoto, ES twin of the remote editor page (2026-10-14, row 30).
    // +2 = wedding videographer pair (2026-10-14, owner fact: films weddings).
    // +4 = chatbot and landing-page pairs (2026-10-14, web line).
    // +3 = demand-map wave (2026-10-14): videographer Miami + influencer guide pair.
    // +4 = corporate and networking event pairs (2026-10-18): FTL corporate + Miami networking.
    // +8 = wave 2 niche expansions (2026-10-18): wedding, vlog, conference, executive interview.
    // +8 = wave 3 niche expansions (2026-10-18): yacht, content day, colombia, subtitling.
    // +8 = wave 4 niche expansions (2026-10-18): trade show, gala, superyacht, rehearsal dinner.
    expect(entries).toHaveLength(400);
    expect(new Set(urls)).toHaveLength(400);
  });

  it("pairs real product photography pages with reciprocal language alternatives", () => {
    const english = "https://estebanmorenomedia.com/services/product-photography-miami";
    const spanish = "https://estebanmorenomedia.com/es/fotografia-de-producto-miami";
    const expected = { "en-US": english, "es-US": spanish, "x-default": english };
    for (const url of [english, spanish]) {
      expect(entries.find((entry) => entry.url === url)?.alternates?.languages).toEqual(expected);
    }
  });

  it("advertises every 2026-10-10 owner-ordered addition with matching hreflang", () => {
    const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
    const paired: Record<string, string> = {
      "/daily-hook-planner": "/es/planificador-de-ganchos-de-video",
      "/daily-publish-prompt": "/es/prompt-de-publicacion-diaria",
      "/daily-script-timer": "/es/temporizador-de-guiones-de-video",
      "/daily-shot-list-planner": "/es/planificador-de-tomas-de-video",
      "/daily-script-pacing-calculator": "/es/calculadora-de-ritmo-de-video",
      "/case-studies": "/es/casos-de-estudio",
      "/services/conversion-websites": "/es/sitios-web-de-conversion",
      "/services/creative-production": "/es/produccion-creativa",
    };

    for (const path of inventoryAdditions20261010Paths) {
      expect(byUrl.has(`https://estebanmorenomedia.com${path}`), path).toBe(true);
    }
    expect(inventoryAdditions20261010Paths).toHaveLength(26);

    for (const [en, es] of Object.entries(paired)) {
      const expected = {
        "en-US": `https://estebanmorenomedia.com${en}`,
        "es-US": `https://estebanmorenomedia.com${es}`,
        "x-default": `https://estebanmorenomedia.com${en}`,
      };
      expect(byUrl.get(`https://estebanmorenomedia.com${en}`)?.alternates?.languages).toEqual(expected);
      expect(byUrl.get(`https://estebanmorenomedia.com${es}`)?.alternates?.languages).toEqual(expected);
    }
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
