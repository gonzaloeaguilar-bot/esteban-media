/**
 * Smoke tests for the portfolio data model.
 *
 * Validates:
 *   - Every PortfolioItem points to a known PortfolioCategoryId.
 *   - The data model's category list aligns (cardinality + key names) with the
 *     i18n payload under `Portfolio.categories.*` in both en + es.
 *   - Helper functions (lookup, filter, count) return consistent results.
 *   - Discriminated union narrowing helpers behave correctly.
 *
 * Runtime: written for Vitest (Next.js 15 default). The describe/it/expect
 * surface is shared with Jest, so this file is portable across either runner.
 */
import { describe, it, expect } from "vitest";

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
  type MediaSource,
} from "../portfolio";

describe("portfolio data model", () => {
  it("declares the six product-required categories in order", () => {
    expect(PORTFOLIO_CATEGORY_IDS).toEqual([
      "reels",
      "real-estate",
      "restaurants",
      "aerial",
      "events",
      "business-promos",
    ]);
  });

  it("every item belongs to a declared category", () => {
    const validIds = new Set<string>(PORTFOLIO_CATEGORY_IDS);
    for (const item of PORTFOLIO_ITEMS) {
      expect(validIds.has(item.category)).toBe(true);
    }
  });

  it("item ids are unique", () => {
    const ids = PORTFOLIO_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every category has at least one item (so UI never renders empty bucket)", () => {
    for (const category of PORTFOLIO_CATEGORY_IDS) {
      expect(getPortfolioItemsByCategory(category).length).toBeGreaterThan(0);
    }
  });

  it("placeholder items carry status:'placeholder' so UI dims them", () => {
    for (const item of PORTFOLIO_ITEMS) {
      if (item.media.kind === "placeholder") {
        expect(item.status).toBe("placeholder");
      }
    }
  });
});

describe("i18n key cardinality alignment", () => {
  const locales = { en: enMessages, es: esMessages };

  for (const [locale, messages] of Object.entries(locales)) {
    describe(locale, () => {
      it("declares the Portfolio namespace", () => {
        expect(messages).toHaveProperty("Portfolio");
      });

      it("has a translated entry for every category id", () => {
        const categories = (messages as { Portfolio: { categories: Record<string, unknown> } })
          .Portfolio.categories;
        for (const id of PORTFOLIO_CATEGORY_IDS) {
          expect(categories).toHaveProperty(id);
          const entry = categories[id] as { title?: string; description?: string };
          expect(typeof entry.title).toBe("string");
          expect(typeof entry.description).toBe("string");
          expect(entry.title?.length ?? 0).toBeGreaterThan(0);
          expect(entry.description?.length ?? 0).toBeGreaterThan(0);
        }
      });

      it("category key set equals the data model category set (no orphans)", () => {
        const categories = (messages as { Portfolio: { categories: Record<string, unknown> } })
          .Portfolio.categories;
        const i18nKeys = Object.keys(categories).sort();
        const dataKeys = [...PORTFOLIO_CATEGORY_IDS].sort();
        expect(i18nKeys).toEqual(dataKeys);
      });

      it("ships the shared Portfolio copy strings", () => {
        const ns = (messages as { Portfolio: Record<string, unknown> }).Portfolio;
        for (const key of ["eyebrow", "title", "subtitle", "emptyState"]) {
          expect(ns).toHaveProperty(key);
          expect(typeof ns[key]).toBe("string");
        }
      });
    });
  }
});

describe("helper functions", () => {
  it("getPortfolioCategories returns all six categories", () => {
    expect(getPortfolioCategories()).toHaveLength(PORTFOLIO_CATEGORY_IDS.length);
    expect(getPortfolioCategories()).toBe(PORTFOLIO_CATEGORIES);
  });

  it("getPortfolioItemsByCategory filters correctly", () => {
    const reels = getPortfolioItemsByCategory("reels");
    expect(reels.length).toBeGreaterThan(0);
    expect(reels.every((item) => item.category === "reels")).toBe(true);
  });

  it("getPortfolioItemById returns undefined for unknown ids", () => {
    expect(getPortfolioItemById("does-not-exist")).toBeUndefined();
  });

  it("getPortfolioItemById round-trips on real ids", () => {
    const sample = PORTFOLIO_ITEMS[0];
    expect(getPortfolioItemById(sample.id)).toBe(sample);
  });

  it("getPortfolioCategoryBySlug returns undefined for unknown slugs", () => {
    expect(getPortfolioCategoryBySlug("nonsense")).toBeUndefined();
  });

  it("getPortfolioCategoryBySlug resolves every declared slug", () => {
    for (const id of PORTFOLIO_CATEGORY_IDS) {
      const cat = getPortfolioCategoryBySlug(id);
      expect(cat).toBeDefined();
      expect(cat?.id).toBe(id);
    }
  });

  it("getFeaturedPortfolioItems falls back to placeholders when no live items exist", () => {
    // Today's data: all placeholder. Featured fallback should still surface
    // items so the homepage strip is never blank.
    const featured = getFeaturedPortfolioItems();
    expect(featured.length).toBeGreaterThan(0);
  });

  it("getFeaturedPortfolioItems honors limit", () => {
    expect(getFeaturedPortfolioItems(1)).toHaveLength(1);
  });

  it("placeholder + live counts sum to total item count", () => {
    expect(getPlaceholderItemCount() + getLivePortfolioItemCount()).toBe(
      PORTFOLIO_ITEMS.length,
    );
  });
});

describe("media source narrowing helpers", () => {
  const samples: MediaSource[] = [
    { kind: "instagram", url: "https://www.instagram.com/p/X/" },
    { kind: "video", src: "https://example.com/v.m3u8", poster: "p.jpg" },
    { kind: "image", src: "i.jpg", alt: "alt" },
    { kind: "placeholder", note: "soon" },
  ];

  it("isInstagramSource only matches kind:'instagram'", () => {
    expect(samples.filter(isInstagramSource)).toHaveLength(1);
  });

  it("isSelfHostedVideoSource only matches kind:'video'", () => {
    expect(samples.filter(isSelfHostedVideoSource)).toHaveLength(1);
  });

  it("isPlaceholderSource only matches kind:'placeholder'", () => {
    expect(samples.filter(isPlaceholderSource)).toHaveLength(1);
  });
});
