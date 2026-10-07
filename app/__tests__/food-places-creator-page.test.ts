import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { ServiceInquiryLink } from "@/components/service-inquiry-link";
import { pairedLanguageRoutes } from "@/lib/language-routes";
import { languageAlternates, spanishNichePages, spanishRoutes, buildSpanishNicheStructuredData } from "@/lib/spanish-site";
import { CREATOR_DEPTH, FOOD_PLACES_CREATOR_DEPTH, FOOD_PLACES_CREATOR_SECTIONS } from "@/lib/service-depth-content";
import { sitemapRoutes } from "@/app/sitemap";

const en = "/services/food-and-places-creator-video-editing-miami";
const slug = "edicion-de-video-para-creadores-de-comida-y-lugares-miami";
const es = `/es/${slug}`;
const spanishPage = spanishNichePages.find((page) => page.slug === slug)!;
const source = (path: string) => readFileSync(path, "utf8");
const englishSource = source(`app/(english)${en}/page.tsx`);
const enSiblings = ["/services/content-creator-video-editing-miami", "/services/restaurant-promo-video-editing-miami"];
const esSiblings = ["edicion-de-video-para-creadores-de-contenido-miami", "edicion-de-video-promocional-para-restaurantes-miami", "video-para-restaurantes-miami"];

describe("food and places creator pages", () => {
  it.each([
    ["food_places_creator_video", "en"],
    ["es_food_places_creator_video", "es"],
  ] as const)("sends %s contact interest through the existing writer", (serviceId, locale) => {
    const writer = vi.fn();
    const gtag = vi.fn();
    vi.stubGlobal("window", { __estebanTrack: writer, gtag });
    try {
      const link = ServiceInquiryLink({ href: "https://wa.me/13054974478", serviceId, locale });
      link.props.onClick();
      expect(writer).toHaveBeenCalledTimes(1);
      expect(writer).toHaveBeenCalledWith("service_interest", { service: serviceId, locale });
      expect(gtag).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("pairs language switching and hreflang reciprocally", () => {
    expect(pairedLanguageRoutes[en]).toBe(es);
    expect(pairedLanguageRoutes[es]).toBe(en);
    for (const route of [en, es]) expect(languageAlternates[route]).toEqual({ "en-US": en, "es-US": es, "x-default": en });
  });

  it("includes both routes in sitemap inputs and the Spanish renderer", () => {
    expect(sitemapRoutes).toContainEqual({ path: en, priority: 0.85 });
    expect(spanishRoutes).toContain(es);
    expect(spanishPage).toBeDefined();
    expect(source(`app/(spanish)${es}/page.tsx`)).toContain(`SpanishNichePage slug={slug}`);
  });

  it("links each English sibling back and links out in body copy and related cards", () => {
    expect(CREATOR_DEPTH.related.some(({ href }) => href === en)).toBe(true);
    expect(source("app/(english)/services/content-creator-video-editing-miami/page.tsx")).toContain("CREATOR_DEPTH.related");
    expect(source("app/(english)/services/restaurant-promo-video-editing-miami/page.tsx")).toContain(`href="${en}"`);
    for (const href of enSiblings) {
      expect(FOOD_PLACES_CREATOR_DEPTH.related.some((item) => item.href === href)).toBe(true);
      expect(JSON.stringify(FOOD_PLACES_CREATOR_SECTIONS)).toContain(`](${href})`);
    }
  });

  it("links all three Spanish siblings both ways in server-rendered paragraphs", () => {
    for (const sibling of esSiblings) {
      const page = spanishNichePages.find((entry) => entry.slug === sibling)!;
      expect(JSON.stringify(page.sections)).toContain(`](${es})`);
      expect(JSON.stringify(spanishPage.sections)).toContain(`](/es/${sibling})`);
    }
  });

  it("uses the price source instead of literal dollar amounts", () => {
    expect(englishSource).not.toMatch(/\$\s*\d/);
    expect(englishSource).toContain('priceSentence("en", "crecimiento")');
    expect(source("lib/service-depth-content.ts").split("export const FOOD_PLACES_CREATOR_DEPTH")[1]).not.toMatch(/\$\s*\d/);
  });

  it("gives each language at least four question-led sections of 100–180 words", () => {
    for (const sections of [FOOD_PLACES_CREATOR_SECTIONS, spanishPage.sections!]) {
      expect(sections.length).toBeGreaterThanOrEqual(4);
      for (const section of sections) {
        expect(section.heading).toMatch(/\?$/);
        const text = section.paragraphs.join(" ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
        const words = text.split(/\s+/).length;
        expect(words, section.heading).toBeGreaterThanOrEqual(100);
        expect(words, section.heading).toBeLessThanOrEqual(180);
      }
    }
  });

  it("keeps Spanish FAQ schema aligned with the visible answers", () => {
    const graph = buildSpanishNicheStructuredData(spanishPage)["@graph"];
    const faq = graph.find((node) => node["@type"] === "FAQPage") as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(faq.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(spanishPage.faqs);
    expect(englishSource).toContain("buildServiceFaqSchema(absoluteUrl(path), [...depth.faqs, ...arranqueWeeklyFaq(\"en\")])");
    expect(englishSource).toContain("collapsible");
  });
});
