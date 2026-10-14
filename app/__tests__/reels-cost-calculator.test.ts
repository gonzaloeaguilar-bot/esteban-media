import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ReelsCostCalculatorPage } from "@/components/reels-cost-calculator-page";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import {
  ARRANQUE_WEEKLY_OPTIONS,
  ARRANQUE_WEEKLY_TERMS,
  PACKAGE_PRICES,
  usd,
} from "@/lib/pricing";
import {
  COST_ROWS,
  PERIOD_WEEKS,
  REELS_COST_CALCULATOR_PATHS,
  costFor,
  reelsCostCalculatorCopy,
} from "@/lib/reels-cost-calculator";
import { languageAlternates } from "@/lib/spanish-site";
import sitemap from "../sitemap";

const words = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const starter = PACKAGE_PRICES.arranque;
const perVideo = starter.kind === "from" ? starter.amount : NaN;
const [one, two] = ARRANQUE_WEEKLY_OPTIONS;

describe("reels cost calculator: arithmetic from lib/pricing.ts only", () => {
  it("uses the plan minimum as the comparison period", () => {
    expect(PERIOD_WEEKS).toBe(ARRANQUE_WEEKLY_TERMS.minimumWeeks);
  });

  it("matches the published prices for 1 and 2 videos a week", () => {
    expect(costFor(1)).toMatchObject({
      singlePerWeek: perVideo,
      singlePerPeriod: perVideo * PERIOD_WEEKS,
      planPerWeek: one.pricePerWeek,
      planPerPeriod: one.pricePerWeek * PERIOD_WEEKS,
      savingPerPeriod: (perVideo - one.pricePerWeek) * PERIOD_WEEKS,
    });
    expect(costFor(2)).toMatchObject({
      singlePerPeriod: 2 * perVideo * PERIOD_WEEKS,
      planPerPeriod: two.pricePerWeek * PERIOD_WEEKS,
      savingPerPeriod: (2 * perVideo - two.pricePerWeek) * PERIOD_WEEKS,
    });
  });

  it("never invents a weekly price above two videos a week", () => {
    for (const row of COST_ROWS.filter((r) => r.videosPerWeek > two.videosPerWeek)) {
      expect(row.plan).toBeNull();
      expect(row.planPerPeriod).toBeNull();
      expect(row.savingPerPeriod).toBeNull();
    }
  });
});

describe("reels cost calculator pages", () => {
  for (const locale of ["en", "es"] as const) {
    const c = reelsCostCalculatorCopy[locale];
    const html = renderToStaticMarkup(createElement(ReelsCostCalculatorPage, { locale }));
    const visible = html.replace(/<script\b[\s\S]*?<\/script>/g, "");

    it(`${locale}: the answer, the method and every row are in the server HTML`, () => {
      expect(visible).toContain("<h1");
      expect(visible).toContain(usd(one.pricePerWeek * PERIOD_WEEKS));
      expect(visible).toContain(usd(two.pricePerWeek * PERIOD_WEEKS));
      expect(visible).toContain(usd(perVideo * PERIOD_WEEKS));
      for (const row of COST_ROWS) expect(visible).toContain(usd(row.singlePerPeriod));
      for (const s of c.sections) expect(visible).toContain(s.heading);
      expect(visible).toContain("<table");
    });

    it(`${locale}: sections are question-headed and citable (100-180 words)`, () => {
      for (const s of c.sections) {
        expect(s.heading).toMatch(/\?$/);
        const n = words(s.paragraphs.join(" "));
        expect(n, `${s.heading}: ${n}`).toBeGreaterThanOrEqual(100);
        expect(n, `${s.heading}: ${n}`).toBeLessThanOrEqual(180);
      }
    });

    it(`${locale}: FAQ depth sits in native <details>, interactive part is enhancement`, () => {
      expect((visible.match(/<details/g) ?? []).length).toBe(c.faqs.length);
      expect(visible).toContain('data-filter="videos_per_week"');
      expect(visible).toContain('data-section="reels_cost_calculator"');
      expect(visible).toMatch(/data-cta="reels_cost_calculator_quote"/);
    });

    it(`${locale}: only dollar figures that lib/pricing.ts produces`, () => {
      const allowed = new Set<string>();
      for (const row of COST_ROWS) {
        allowed.add(usd(row.singlePerPeriod));
        allowed.add(usd(row.singlePerWeek));
        if (row.planPerPeriod !== null) allowed.add(usd(row.planPerPeriod));
        if (row.planPerWeek !== null) allowed.add(usd(row.planPerWeek));
        if (row.savingPerPeriod !== null) allowed.add(usd(row.savingPerPeriod));
      }
      allowed.add(usd(perVideo));
      const text = visible.replace(/<[^>]+>/g, " ");
      for (const d of text.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []) expect(allowed, d).toContain(d);
    });
  }

  it("is paired for hreflang and in the sitemap in both languages", () => {
    const { en, es } = REELS_COST_CALCULATOR_PATHS;
    expect(getPairedLanguageRoute(en)).toBe(es);
    expect(getPairedLanguageRoute(es)).toBe(en);
    for (const path of [en, es]) {
      expect(languageAlternates[path]).toEqual({ "en-US": en, "es-US": es, "x-default": en });
    }
    const urls = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(urls).toContain(en);
    expect(urls).toContain(es);
  });
});
