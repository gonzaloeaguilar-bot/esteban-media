import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_CATEGORY_IDS,
  PORTFOLIO_ITEMS,
  getFeaturedPortfolioItems,
  getLivePortfolioItemCount,
  getPlaceholderItemCount,
  getPortfolioCategories,
  getPortfolioCategoryBySlug,
  getPortfolioItemById,
  getPortfolioItemsByCategory,
  isInstagramSource,
  isPlaceholderSource,
  isSelfHostedVideoSource,
  isYouTubeSource,
  type MediaSource,
  type PortfolioCategoryId,
} from "../portfolio";

type PortfolioMessagePayload = {
  Portfolio: {
    categories: Record<
      string,
      { title: string; description: string; shortLabel: string }
    >;
    items: Record<string, { title: string; summary: string; credits: string }>;
  };
};

const locales = {
  en: enMessages as PortfolioMessagePayload,
  es: esMessages as PortfolioMessagePayload,
};

const expectedCategoryByItem: Record<string, PortfolioCategoryId> = {
  "my-dler": "animation",
  banacol: "business-promos",
  "bar-door-monkey": "business-promos",
  "healthy-smile": "business-promos",
  homeowners: "editing",
  "diana-jack": "events",
  "la-huelga": "narrative",
  "ml-colombia": "social-content",
};

const verifiedYears: Record<string, number> = {
  banacol: 2021,
  "bar-door-monkey": 2020,
  "healthy-smile": 2021,
  homeowners: 2021,
  "la-huelga": 2017,
};

describe("verified portfolio data", () => {
  it("declares the six evidence-based categories in display order", () => {
    expect(PORTFOLIO_CATEGORY_IDS).toEqual([
      "animation",
      "business-promos",
      "social-content",
      "events",
      "editing",
      "narrative",
    ]);
  });

  it("ships exactly eight unique live projects with no placeholder media", () => {
    expect(PORTFOLIO_ITEMS).toHaveLength(8);
    expect(new Set(PORTFOLIO_ITEMS.map((item) => item.id)).size).toBe(8);

    for (const item of PORTFOLIO_ITEMS) {
      expect(item.status).toBe("live");
      expect(item.media.kind).not.toBe("placeholder");
    }

    expect(getLivePortfolioItemCount()).toBe(8);
    expect(getPlaceholderItemCount()).toBe(0);
  });

  it("assigns every project only to its verified category", () => {
    expect(Object.keys(expectedCategoryByItem).sort()).toEqual(
      PORTFOLIO_ITEMS.map((item) => item.id).sort(),
    );

    for (const item of PORTFOLIO_ITEMS) {
      expect(item.category).toBe(expectedCategoryByItem[item.id]);
    }
  });

  it("keeps every category populated", () => {
    for (const category of PORTFOLIO_CATEGORY_IDS) {
      const items = getPortfolioItemsByCategory(category);
      expect(items.length).toBeGreaterThan(0);
      expect(items.every((item) => item.category === category)).toBe(true);
    }
  });

  it("publishes only canonical YouTube watch URLs with matching ids", () => {
    const videoIds = new Set<string>();

    for (const item of PORTFOLIO_ITEMS) {
      expect(isYouTubeSource(item.media)).toBe(true);
      if (!isYouTubeSource(item.media)) {
        throw new Error(`${item.id} must use a YouTube media source`);
      }

      expect(item.media.videoId).toMatch(/^[A-Za-z0-9_-]{11}$/);
      expect(item.media.url).toBe(
        `https://www.youtube.com/watch?v=${item.media.videoId}`,
      );
      expect(item.media.aspect).toBe("16:9");
      expect(item.media.uploadDate).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
      );
      expect(item.media.duration).toMatch(/^PT\d+M\d+S$/);
      videoIds.add(item.media.videoId);
    }

    expect(videoIds.size).toBe(PORTFOLIO_ITEMS.length);
  });

  it("uses an existing local poster named after each stable item id", () => {
    for (const item of PORTFOLIO_ITEMS) {
      if (!isYouTubeSource(item.media)) {
        throw new Error(`${item.id} must use a YouTube media source`);
      }

      expect(item.media.poster).toBe(`/portfolio/${item.id}.jpg`);
      expect(
        existsSync(join(process.cwd(), "public", item.media.poster)),
      ).toBe(true);
    }
  });

  it("contains no private Google Drive URLs", () => {
    const serialized = JSON.stringify(PORTFOLIO_ITEMS);
    expect(serialized).not.toMatch(/drive\.google\.com/i);
    expect(serialized).not.toMatch(/docs\.google\.com/i);
    expect(serialized).not.toMatch(/googleusercontent\.com/i);
  });

  it("includes only the years verified in the source portfolio", () => {
    for (const item of PORTFOLIO_ITEMS) {
      if (item.id in verifiedYears) {
        expect(item.year).toBe(verifiedYears[item.id]);
      } else {
        expect(item.year).toBeUndefined();
      }
    }
  });
});

describe("bilingual portfolio copy", () => {
  for (const [locale, messages] of Object.entries(locales)) {
    describe(locale, () => {
      it("matches the data model category set without orphan keys", () => {
        expect(Object.keys(messages.Portfolio.categories).sort()).toEqual(
          [...PORTFOLIO_CATEGORY_IDS].sort(),
        );

        for (const category of PORTFOLIO_CATEGORY_IDS) {
          const copy = messages.Portfolio.categories[category];
          expect(copy.title.trim().length).toBeGreaterThan(0);
          expect(copy.description.trim().length).toBeGreaterThan(0);
          expect(copy.shortLabel.trim().length).toBeGreaterThan(0);
        }
      });

      it("provides title, summary, and honest credits for every item", () => {
        expect(Object.keys(messages.Portfolio.items).sort()).toEqual(
          PORTFOLIO_ITEMS.map((item) => item.id).sort(),
        );

        for (const item of PORTFOLIO_ITEMS) {
          expect(item.titleI18nKey).toBe(item.id);
          expect(item.descriptionI18nKey).toBe(item.id);
          expect(item.creditsI18nKey).toBe(item.id);

          const copy = messages.Portfolio.items[item.id];
          expect(copy.title.trim().length).toBeGreaterThan(0);
          expect(copy.summary.trim().length).toBeGreaterThan(0);
          expect(copy.credits.trim().length).toBeGreaterThan(0);
        }
      });
    });
  }

  it("does not retain unsupported speed or same-day-edit claims", () => {
    const copy = JSON.stringify({ enMessages, esMessages });
    expect(copy).not.toMatch(/move properties faster/i);
    expect(copy).not.toMatch(/same-day edits/i);
    expect(copy).not.toMatch(/mueven listings/i);
    expect(copy).not.toMatch(/ediciones del mismo día/i);
  });
});

describe("portfolio helpers", () => {
  it("returns canonical category objects and resolves every slug", () => {
    expect(getPortfolioCategories()).toBe(PORTFOLIO_CATEGORIES);

    for (const category of PORTFOLIO_CATEGORIES) {
      expect(getPortfolioCategoryBySlug(category.slug)).toBe(category);
    }
    expect(getPortfolioCategoryBySlug("not-a-category")).toBeUndefined();
  });

  it("round-trips known item ids and rejects unknown ids", () => {
    for (const item of PORTFOLIO_ITEMS) {
      expect(getPortfolioItemById(item.id)).toBe(item);
    }
    expect(getPortfolioItemById("not-a-project")).toBeUndefined();
  });

  it("returns only live featured work and applies safe limits", () => {
    const featured = getFeaturedPortfolioItems();
    expect(featured.length).toBeGreaterThan(0);
    expect(
      featured.every((item) => item.featured && item.status === "live"),
    ).toBe(true);
    expect(getFeaturedPortfolioItems(2)).toEqual(featured.slice(0, 2));
    expect(getFeaturedPortfolioItems(0)).toEqual([]);
    expect(getFeaturedPortfolioItems(-1)).toEqual([]);
  });
});

describe("media narrowing helpers", () => {
  const samples: MediaSource[] = [
    { kind: "instagram", url: "https://www.instagram.com/p/X/" },
    { kind: "video", src: "https://example.com/video.m3u8", poster: "p.jpg" },
    {
      kind: "youtube",
      videoId: "vMvbC5yOzgs",
      url: "https://www.youtube.com/watch?v=vMvbC5yOzgs",
      poster: "/portfolio/my-dler.jpg",
      uploadDate: "2024-01-23T14:21:54-08:00",
      duration: "PT0M11S",
      aspect: "16:9",
    },
    { kind: "image", src: "image.jpg", alt: "Portfolio still" },
    { kind: "placeholder", note: "Pending" },
  ];

  it("narrows each supported media kind independently", () => {
    expect(samples.filter(isInstagramSource)).toHaveLength(1);
    expect(samples.filter(isSelfHostedVideoSource)).toHaveLength(1);
    expect(samples.filter(isYouTubeSource)).toHaveLength(1);
    expect(samples.filter(isPlaceholderSource)).toHaveLength(1);
  });
});
