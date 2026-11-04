import { describe, expect, it } from "vitest";

import { buildGuideStructuredData, getGuideBySlug } from "@/lib/guides";
import { estebanPriceRows, marketPriceRows, REELS_PRICE_INDEX_CHECKED_ON } from "@/lib/reels-price-index";
import { ARRANQUE_WEEKLY_OPTIONS, PACKAGE_PRICES, PRICING_BANDS, REAL_ESTATE_PLANS, SHORT_FORM, arranqueWeeklyPerVideo, usd } from "@/lib/pricing";

describe("Reels price index guide", () => {
  const enSlug = "reels-video-editing-prices-south-florida";
  const esSlug = "precios-edicion-de-reels-y-video-sur-de-florida";

  it("renders the declared EN and ES guide pair with reciprocal FAQPage questions", () => {
    const en = getGuideBySlug("en", enSlug);
    const es = getGuideBySlug("es", esSlug);
    expect(en?.priceIndex).toBe(true);
    expect(es?.priceIndex).toBe(true);
    expect(en?.faqs).toHaveLength(6);
    expect(es?.faqs).toHaveLength(6);
    for (const guide of [en, es]) {
      const graph = buildGuideStructuredData(guide!) ["@graph"] as Array<{ "@type": string; mainEntity?: unknown[] }>;
      expect(graph.find((node) => node["@type"] === "FAQPage")?.mainEntity).toHaveLength(6);
    }
  });

  it("keeps every sourced market row linkable and dated", () => {
    expect(marketPriceRows).toHaveLength(21);
    for (const row of marketPriceRows) {
      expect(row.href).toMatch(/^https:\/\//);
      expect(row.checkedOn).toBe(REELS_PRICE_INDEX_CHECKED_ON);
      expect(row.price.length).toBeGreaterThan(0);
    }
  });

  it("derives Esteban's ladder from pricing constants", () => {
    const rows = estebanPriceRows("en");
    expect(rows.map((row) => row.price)).toContain(`From ${usd(SHORT_FORM.perVideoFrom)}`);
    expect(rows.map((row) => row.price)).toContain(`From ${usd(PACKAGE_PRICES.crecimiento.kind === "from" ? PACKAGE_PRICES.crecimiento.amount : 0)}`);
    for (const option of ARRANQUE_WEEKLY_OPTIONS) expect(rows.map((row) => row.price)).toContain(`${usd(option.pricePerWeek)} (${usd(arranqueWeeklyPerVideo(option))} per video)`);
    for (const plan of REAL_ESTATE_PLANS) expect(rows.map((row) => row.price)).toContain(usd(plan.price));
    expect(rows.map((row) => row.price)).toContain(usd(PRICING_BANDS["on-location"].baseMin));
  });
});
