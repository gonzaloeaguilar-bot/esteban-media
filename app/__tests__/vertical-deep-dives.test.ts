import { describe, expect, it } from "vitest";

import { PACKAGE_PRICES, PRICING_BANDS, usd } from "@/lib/pricing";
import { getSpanishNichePage } from "@/lib/spanish-site";
import {
  AUTOMOTIVE_DEEP_DIVE,
  AUTOMOTIVE_ES_SECTIONS,
  DENTAL_DEEP_DIVE,
  DENTAL_ES_SECTIONS,
  MED_SPA_DEEP_DIVE,
  MED_SPA_ES_SECTIONS,
  YACHT_CHARTER_DEEP_DIVE,
  YACHT_CHARTER_ES_SECTIONS,
} from "@/lib/vertical-deep-dives";

const countWords = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

type Section = { heading: string; paragraphs: readonly string[] };

const sets: Record<string, readonly Section[]> = {
  "automotive en": AUTOMOTIVE_DEEP_DIVE.sections,
  "dental en": DENTAL_DEEP_DIVE.sections,
  "med spa en": MED_SPA_DEEP_DIVE.sections,
  "yacht charter en": YACHT_CHARTER_DEEP_DIVE.sections,
  "automotive es": AUTOMOTIVE_ES_SECTIONS,
  "dental es": DENTAL_ES_SECTIONS,
  "med spa es": MED_SPA_ES_SECTIONS,
  "yacht charter es": YACHT_CHARTER_ES_SECTIONS,
};

describe("vertical deep dives (automotive, dental, med spa, yacht charter)", () => {
  for (const [name, sections] of Object.entries(sets)) {
    it(`${name}: three question-headed sections in the 100-180 word band`, () => {
      expect(sections.length).toBeGreaterThanOrEqual(3);
      for (const section of sections) {
        expect(section.heading).toMatch(/\?$/);
        const words = countWords(section.paragraphs.join(" "));
        expect(words, `${name}: ${section.heading}`).toBeGreaterThanOrEqual(100);
        expect(words, `${name}: ${section.heading}`).toBeLessThanOrEqual(180);
      }
    });

    it(`${name}: opens with a cost answer priced from lib/pricing.ts`, () => {
      const [cost] = sections;
      expect(cost.heading).toMatch(/cost|cuesta/i);
      const text = cost.paragraphs.join(" ");
      expect(text).toContain(usd(PRICING_BANDS.social.baseMin));
      expect(text).toContain(usd(PRICING_BANDS.social.baseMax));
      const starter = PACKAGE_PRICES.arranque;
      if (starter.kind === "from") expect(text).toContain(usd(starter.amount));
    });

    it(`${name}: makes no claim Esteban does not publish`, () => {
      const text = JSON.stringify(sections);
      // No flying, no compliance promises, no turnaround promises, no results.
      expect(text).not.toMatch(/\bdron|\bdrone|Part 107|HIPAA|same-day|mismo día|guarantee|garantiza|\d+%|reviews?\b|reseñas/i);
      // Every dollar figure must be one of the published ones.
      const published = new Set<string>();
      for (const band of Object.values(PRICING_BANDS)) {
        published.add(usd(band.baseMin));
        published.add(usd(band.baseMax));
      }
      for (const p of Object.values(PACKAGE_PRICES)) if (p.kind === "from") published.add(usd(p.amount));
      for (const figure of text.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []) expect(published, figure).toContain(figure);
    });
  }

  it("the Spanish niche pages carry the sections behind a disclosure", () => {
    for (const slug of [
      "marketing-de-video-automotriz-miami",
      "marketing-de-video-para-dentistas-miami",
      "marketing-de-video-para-clinicas-esteticas-miami",
      "marketing-de-video-para-alquiler-de-yates-miami",
    ]) {
      const page = getSpanishNichePage(slug);
      expect(page?.sections?.length, slug).toBeGreaterThanOrEqual(3);
      expect(page?.sectionsDisclosure, slug).toMatch(/\?$/);
      expect(page?.sectionsDestinations, slug).toBeTruthy();
    }
  });
});
