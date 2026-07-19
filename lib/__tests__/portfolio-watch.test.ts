import { describe, expect, it } from "vitest";

import {
  getPortfolioPosterSize,
  getPortfolioWatchCopy,
  getPortfolioWatchItem,
  getPortfolioWatchItems,
  getPortfolioWatchLanguages,
  getPortfolioWatchPath,
  getRelevantServiceId,
  isoDurationToSeconds,
  type PortfolioWatchLocale,
} from "../portfolio-watch";

const locales: readonly PortfolioWatchLocale[] = ["en", "es"];

describe("portfolio watch-page source", () => {
  it("creates one stable path per locale for all eight approved videos", () => {
    const items = getPortfolioWatchItems();
    const paths = items.flatMap((item) =>
      locales.map((locale) => getPortfolioWatchPath(item.id, locale)),
    );

    expect(items).toHaveLength(8);
    expect(paths).toHaveLength(16);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/portfolio/my-dler");
    expect(paths).toContain("/es/portafolio/my-dler");
  });

  it("resolves unique approved copy in both languages", () => {
    for (const locale of locales) {
      const localized = getPortfolioWatchItems().map((item) =>
        getPortfolioWatchCopy(item, locale),
      );

      expect(new Set(localized.map((copy) => copy.title)).size).toBe(8);
      expect(new Set(localized.map((copy) => copy.summary)).size).toBe(8);
      expect(
        localized.every(
          (copy) => copy.summary.length > 0 && copy.credits.length > 0,
        ),
      ).toBe(true);
    }
  });

  it("publishes reciprocal English, Spanish, and default language paths", () => {
    for (const item of getPortfolioWatchItems()) {
      expect(getPortfolioWatchLanguages(item.id)).toEqual({
        "en-US": `/portfolio/${item.id}`,
        "es-US": `/es/portafolio/${item.id}`,
        "x-default": `/portfolio/${item.id}`,
      });
    }
  });

  it("maps each verified category to an existing localized service anchor", () => {
    for (const item of getPortfolioWatchItems()) {
      expect(getRelevantServiceId(item.category, "en")).toMatch(
        /^(editing|ai-content|social-planning|on-location)$/,
      );
      expect(getRelevantServiceId(item.category, "es")).toMatch(
        /^(edicion|contenido-ia|planificacion-social|videografia)$/,
      );
    }
  });

  it("preserves real poster dimensions and parses the verified durations", () => {
    expect(getPortfolioPosterSize("my-dler")).toEqual({
      width: 1280,
      height: 720,
    });
    expect(getPortfolioPosterSize("la-huelga")).toEqual({
      width: 480,
      height: 360,
    });
    expect(isoDurationToSeconds("PT0M11S")).toBe(11);
    expect(isoDurationToSeconds("PT1M48S")).toBe(108);
    expect(isoDurationToSeconds("PT1H2M3S")).toBe(3723);
    expect(() => isoDurationToSeconds("1:48")).toThrow(
      "Unsupported ISO 8601 video duration",
    );
  });

  it("resolves every known item and rejects an unknown id", () => {
    for (const item of getPortfolioWatchItems()) {
      expect(getPortfolioWatchItem(item.id)).toBe(item);
    }
    expect(getPortfolioWatchItem("not-a-project")).toBeUndefined();
  });
});
