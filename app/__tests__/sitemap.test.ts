import { describe, expect, it } from "vitest";

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

  it("publishes the exact 201-URL release inventory with the release date", () => {
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(201);
    expect(new Set(urls)).toHaveLength(201);
    expect(
      entries.every(
        (entry) =>
          entry.lastModified &&
          new Date(entry.lastModified).toISOString() ===
            "2026-07-19T00:00:00.000Z",
      ),
    ).toBe(true);
  });
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
});
