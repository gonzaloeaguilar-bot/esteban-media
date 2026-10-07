import { describe, expect, it } from "vitest";

import {
  CORPORATE_EVENT_ES_SECTIONS,
  HOTEL_DEEP_DIVE,
  HOTEL_ES_SECTIONS,
  NIGHTLIFE_DEEP_DIVE,
  NIGHTLIFE_ES_SECTIONS,
} from "@/lib/hospitality-deep-dive-content";
import { EXPRESS_MULTIPLIER, PACKAGE_PRICES, PRICING_BANDS, usd } from "@/lib/pricing";
import { getSpanishNichePage, languageAlternates } from "@/lib/spanish-site";

const countWords = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const fromAmount = (id: keyof typeof PACKAGE_PRICES) => {
  const p = PACKAGE_PRICES[id];
  return p.kind === "from" ? usd(p.amount) : "";
};

const sets = {
  "nightlife EN": NIGHTLIFE_DEEP_DIVE.sections,
  "hotel EN": HOTEL_DEEP_DIVE.sections,
  "nightlife ES": NIGHTLIFE_ES_SECTIONS,
  "hotel ES": HOTEL_ES_SECTIONS,
  "corporate event ES": CORPORATE_EVENT_ES_SECTIONS,
};

describe("hospitality, nightlife and event cost answers", () => {
  for (const [name, sections] of Object.entries(sets)) {
    it(`${name}: question-headed sections in the 100-180 word citable band`, () => {
      expect(sections.length).toBeGreaterThanOrEqual(3);
      for (const section of sections) {
        expect(section.heading).toMatch(/\?$/);
        const words = countWords(section.paragraphs.join(" "));
        expect(words, section.heading).toBeGreaterThanOrEqual(100);
        expect(words, section.heading).toBeLessThanOrEqual(180);
      }
    });

    it(`${name}: makes no claim the site cannot back`, () => {
      const text = JSON.stringify(sections);
      expect(text).not.toMatch(/drone|aerial|dron\b|a[ée]reo|HIPAA|same-day|mismo día|guarantee[ds]? (a|the) |garantizamos/i);
      // Bar Door Monkey is a restaurant spot, never presented as a club or hotel client.
      if (text.includes("Bar Door Monkey")) expect(text).toMatch(/restaurant|restaurante/);
    });
  }

  it("leads each page with the cost question and figures from lib/pricing.ts only", () => {
    expect(NIGHTLIFE_DEEP_DIVE.sections[0].heading).toBe("How much does a nightclub or bar promo video cost in Miami?");
    expect(HOTEL_DEEP_DIVE.sections[0].heading).toBe("How much does hotel video production cost in Miami?");
    expect(CORPORATE_EVENT_ES_SECTIONS[0].heading).toBe("¿Cuánto cuesta la videografía de un evento en Miami?");

    const nightlife = JSON.stringify([NIGHTLIFE_DEEP_DIVE, NIGHTLIFE_ES_SECTIONS]);
    for (const figure of [
      usd(PRICING_BANDS.social.baseMin),
      usd(PRICING_BANDS.social.baseMax),
      usd(PRICING_BANDS["on-location"].baseMin),
      fromAmount("arranque"),
      fromAmount("crecimiento"),
      fromAmount("presencia-local"),
      String(EXPRESS_MULTIPLIER),
    ]) {
      expect(nightlife).toContain(figure);
    }

    const hotel = JSON.stringify([HOTEL_DEEP_DIVE, HOTEL_ES_SECTIONS]);
    for (const figure of [
      usd(PRICING_BANDS.corporate.baseMin),
      usd(PRICING_BANDS.corporate.baseMax),
      usd(PRICING_BANDS.social.baseMin),
      fromAmount("presencia-local"),
    ]) {
      expect(hotel).toContain(figure);
    }
    expect(hotel).toMatch(/no published hotel project/);
    expect(hotel).toMatch(/no hay un proyecto de hotel publicado/);

    const event = JSON.stringify(CORPORATE_EVENT_ES_SECTIONS);
    expect(event).toContain(usd(PRICING_BANDS.corporate.baseMin));
    expect(event).toContain(usd(PRICING_BANDS.corporate.baseMax));
    expect(event).toContain("](/es/portafolio/diana-jack)");
  });

  it("renders the Spanish sections on the three Spanish pages", () => {
    for (const slug of [
      "edicion-de-video-para-discotecas-y-eventos-miami",
      "produccion-de-video-para-hoteles-miami",
      "videografo-para-eventos-corporativos-miami",
    ]) {
      const page = getSpanishNichePage(slug);
      expect(page?.sections?.length, slug).toBeGreaterThanOrEqual(4);
      expect(page?.sectionsDisclosure, slug).toMatch(/\?$/);
      expect(page?.sectionsDestinations, slug).toBeTruthy();
      expect(JSON.stringify(page?.faqs), slug).not.toMatch(/el mismo día para publicar/);
    }
  });

  it("keeps the noindexed Spanish corporate event page out of hreflang", () => {
    // config/cohort-consolidation.json noindexes it; hreflang to a noindexed URL is an error.
    expect(languageAlternates["/es/videografo-para-eventos-corporativos-miami"]).toBeUndefined();
    expect(languageAlternates["/services/nightlife-event-video-editing-miami"]?.["es-US"]).toBe(
      "/es/edicion-de-video-para-discotecas-y-eventos-miami",
    );
    expect(languageAlternates["/es/produccion-de-video-para-hoteles-miami"]?.["en-US"]).toBe(
      "/services/hotel-hospitality-video-production-miami",
    );
  });
});
