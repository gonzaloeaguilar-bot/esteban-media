import { describe, expect, it } from "vitest";

import { getGuides } from "@/lib/guides";
import { PACKAGE_PRICES, PRICING_BANDS, usd } from "@/lib/pricing";
import baseline from "./fixtures/guide-figure-baseline.json";

/**
 * Every guide page must be citable on its own: at least two sections in the
 * 100-180 word band, every section heading shaped as the question it answers,
 * and nothing over 250 words. This mirrors scripts/dual-audience-gate.mjs at
 * the data level so a thin guide fails here, before it reaches production.
 *
 * Depth must not come from invented facts. The figure baseline was frozen from
 * the guides as published on 2026-10-07: a guide may not gain a dollar figure
 * or a percentage it did not already carry, and no section may lean on an
 * unnamed "study" or flying a drone.
 */

const words = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const figures = baseline as Record<string, { dollars: string[]; percents: string[] }>;

// A figure interpolated from lib/pricing.ts is published by definition.
const pricingFigures = new Set<string>();
for (const band of Object.values(PRICING_BANDS)) {
  pricingFigures.add(usd(band.baseMin));
  pricingFigures.add(usd(band.baseMax));
  pricingFigures.add(usd(band.marketMin));
  pricingFigures.add(usd(band.marketMax));
}
for (const p of Object.values(PACKAGE_PRICES)) if (p.kind === "from") pricingFigures.add(usd(p.amount));

describe("guide citable depth", () => {
  for (const locale of ["en", "es"] as const) {
    for (const guide of getGuides(locale)) {
      const key = `${locale}:${guide.id}`;
      const sizes = guide.sections.map((s) => words([...s.paragraphs, ...(s.bullets ?? [])].join(" ")));

      it(`${key}: at least two sections in the 100-180 word band, none over 250`, () => {
        expect(sizes.filter((n) => n >= 100 && n <= 180).length, `${key} ${sizes.join(",")}`).toBeGreaterThanOrEqual(2);
        expect(Math.max(...sizes), key).toBeLessThanOrEqual(250);
      });

      it(`${key}: every section heading is a question`, () => {
        for (const s of guide.sections) expect(s.heading, key).toMatch(/\?$/);
      });

      it(`${key}: no figure, study or drone flight that was not already published`, () => {
        const text = guide.sections.map((s) => [...s.paragraphs, ...(s.bullets ?? [])].join(" ")).join(" ");
        const base = figures[key] ?? { dollars: [], percents: [] };
        for (const d of text.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []) {
          if (!pricingFigures.has(d)) expect(base.dollars, `${key} ${d}`).toContain(d);
        }
        for (const p of text.match(/\d+(?:[.,]\d+)?\s?%/g) ?? []) expect(base.percents, `${key} ${p}`).toContain(p);
        expect(text, key).not.toMatch(/\b(stud(?:y|ies) (?:show|shows|find|finds|suggest)s?|research (?:shows|finds)|according to (?:a )?(?:study|research)|estudios? (?:muestran|demuestran)|según (?:un|los) estudios?)\b/i);
        expect(text, key).not.toMatch(/\b(we|Esteban) (?:fly|flies|pilot)|(?:volamos|pilotea|piloteamos)\b/i);
      });
    }
  }
});
