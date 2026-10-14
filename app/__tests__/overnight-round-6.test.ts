import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { enServicePhrase, esServicePhrase } from "@/components/service-depth";
import { getEventPageCopy } from "@/lib/event-content";
import { getGuideBySlug } from "@/lib/guides";
import { getSpanishNichePage, spanishNichePages } from "@/lib/spanish-site";

const root = process.cwd();
const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

describe("answer-first question reads as a sentence (round 6)", () => {
  // Live crawl 2026-10-14: "¿Cómo funciona el servicio de editor de reels Fort
  // Lauderdale…?" on the Spanish flagship, "servicio de servicio de edición de
  // video con dron", "How does content repurposing service with…".
  it.each([
    ["editor de reels Fort Lauderdale", "edición de Reels en Fort Lauderdale"],
    ["editor de reels Miami", "edición de Reels en Miami"],
    ["editor de reels Boca Raton", "edición de Reels en Boca Raton"],
    ["reels para negocios Miami", "Reels para negocios en Miami"],
    ["video para restaurantes Miami", "video para restaurantes en Miami"],
    ["producción de video Fort Lauderdale", "producción de video en Fort Lauderdale"],
    ["servicio de edición de video con dron en Miami", "edición de video con dron en Miami"],
    ["video creativo en Wynwood Miami", "video creativo en Wynwood Miami"],
    ["editor de video UGC en Miami", "edición de video UGC en Miami"],
    ["videógrafo en Miami", "videógrafo en Miami"],
    ["video para quinceañeras", "video para quinceañeras"],
  ])("es: %s -> %s", (keyword, phrase) => {
    expect(esServicePhrase(keyword)).toBe(phrase);
  });

  it("no Spanish niche keyword produces a doubled 'servicio de' or a bare trailing city", () => {
    for (const page of spanishNichePages) {
      const phrase = esServicePhrase(page.keyword);
      expect(phrase, page.slug).not.toMatch(/^servicio de/i);
      if (!/\ben\b/.test(phrase)) expect(phrase, page.slug).not.toMatch(/\s(Fort Lauderdale|Miami|Boca Raton)$/);
    }
  });

  it("en: drops a trailing 'service'", () => {
    expect(enServicePhrase("content repurposing service")).toBe("content repurposing");
    expect(enServicePhrase("drone video editing service")).toBe("drone video editing");
    expect(enServicePhrase("headshot photography")).toBe("headshot photography");
  });
});

describe("price headings on the GeoServicePage pages (round 6)", () => {
  // Was `How much does ${serviceName.toLowerCase()} cost?`, i.e. "How much does
  // reels editor fort lauderdale cost?" on the page that wins the AI Overview.
  const pages = [
    ["reels-editor-fort-lauderdale", "How much does a Reels editor in Fort Lauderdale cost?"],
    ["reels-editor-miami", "How much does a Reels editor in Miami cost?"],
    ["video-production-fort-lauderdale", "How much does video production in Fort Lauderdale cost?"],
    ["real-estate-reels-video-editor-south-florida", "How much does a real estate Reels editor in South Florida cost?"],
    ["video-production-boca-raton", "How much does Reels and video editing in Boca Raton cost?"],
  ] as const;
  it.each(pages)("%s asks the buyer's question", (slug, question) => {
    const src = readFileSync(join(root, "app/(english)/services", slug, "page.tsx"), "utf8");
    expect(src).toContain(`pricingQuestion: "${question}"`);
  });
  it("the template no longer lower-cases the SEO name into the heading", () => {
    const src = readFileSync(join(root, "components/geo-service-page.tsx"), "utf8");
    expect(src).not.toContain("serviceName.toLowerCase()");
  });
});

describe("Spanish subtitles guide answers how to make them (round 6)", () => {
  // GSC 90d: 56 impressions @9.9, 0 clicks; autocomplete "como hacer subtitulos
  // para reels", "subtitulos automaticos para reels", "fuentes para subtitulos reels".
  const guide = getGuideBySlug("es", "mejores-estilos-de-subtitulos-para-reels")!;
  it("has a 100-180 word how-to section first", () => {
    const section = guide.sections[0];
    expect(section.heading).toBe("¿Cómo hacer subtítulos para Reels?");
    const n = words(section.paragraphs.join(" "));
    expect(n).toBeGreaterThanOrEqual(100);
    expect(n).toBeLessThanOrEqual(180);
    expect(section.paragraphs.join(" ")).toContain("1080x1920");
  });
  it("answers automatic subtitles and fonts in the FAQ", () => {
    const qs = (guide.faqs ?? []).map((f) => f.question);
    expect(qs).toContain("¿Sirven los subtítulos automáticos para Reels?");
    expect(qs).toContain("¿Qué fuentes funcionan mejor para subtítulos de Reels?");
  });
});

describe("boat show titles say video (round 6)", () => {
  // Autocomplete 2026-10-14: "fort lauderdale boat show videos"; the show opens ~10-28.
  it.each([
    ["flibs", "en"],
    ["flibs", "es"],
    ["miami-boat-show", "en"],
    ["miami-boat-show", "es"],
  ] as const)("%s %s", (id, locale) => {
    const title = getEventPageCopy(id, locale).metaTitle;
    expect(title).toMatch(/\bVideo\b/);
    expect(title.length).toBeLessThanOrEqual(60);
  });
});

describe("Pembroke Pines Spanish page has the city Reels answer (round 6)", () => {
  it("matches the English twin's question, in the 100-180 band", () => {
    const page = getSpanishNichePage("video-para-pequenos-negocios-pembroke-pines")!;
    const section = page.sections?.[0];
    expect(section?.heading).toBe("¿Quién edita Reels para negocios en Pembroke Pines?");
    const text = section!.paragraphs.join(" ");
    const n = words(text);
    expect(n).toBeGreaterThanOrEqual(100);
    expect(n).toBeLessThanOrEqual(180);
    expect(text).toContain("inglés intermedio");
    expect(text).toMatch(/\$100/);
  });
});

describe("portfolio hub question headings (round 6)", () => {
  it("asks two more questions", () => {
    const src = readFileSync(join(root, "app/(english)/portfolio/page.tsx"), "utf8");
    expect(src).toContain("What kind of work is in this portfolio?");
    expect(src).toContain("How does a project move from raw footage to final delivery?");
  });
});
