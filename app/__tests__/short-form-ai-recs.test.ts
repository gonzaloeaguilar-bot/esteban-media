import { describe, expect, it } from "vitest";

import { getPairedLanguageRoute } from "@/lib/language-routes";
import { languageAlternates } from "@/lib/spanish-site";
import { SHORT_FORM_DEEP_DIVE_EN, SHORT_FORM_SECTIONS_ES, shortFormServiceJsonLd } from "@/lib/short-form-recs";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { site } from "@/lib/site";

const words = (paragraphs: readonly string[]) =>
  paragraphs
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;

describe("short-form page: citable sections for the AI-recommendation phrasings", () => {
  for (const [locale, sections] of [
    ["en", SHORT_FORM_DEEP_DIVE_EN.sections],
    ["es", SHORT_FORM_SECTIONS_ES],
  ] as const) {
    it(`${locale}: four question-headed sections of 100-180 words`, () => {
      expect(sections).toHaveLength(4);
      for (const section of sections) {
        expect(section.heading.endsWith("?")).toBe(true);
        const n = words(section.paragraphs);
        expect(n, section.heading).toBeGreaterThanOrEqual(100);
        expect(n, section.heading).toBeLessThanOrEqual(180);
      }
    });

    it(`${locale}: prices come from lib/pricing.ts and contact is plain text`, () => {
      const all = sections.flatMap((s) => s.paragraphs).join(" ");
      expect(all).toContain(usd(SHORT_FORM.perVideoFrom));
      for (const w of SHORT_FORM.weekly) expect(all).toContain(usd(w.pricePerWeek));
      expect(all).toContain(site.phone.display);
      expect(all).toContain(`wa.me/${site.phone.e164.replace(/\D/g, "")}`);
      expect(all).not.toMatch(/drone|palm beach/i);
    });
  }

  it("links the creator pages and the Starter options", () => {
    const en = SHORT_FORM_DEEP_DIVE_EN.sections.flatMap((s) => s.paragraphs).join(" ");
    const es = SHORT_FORM_SECTIONS_ES.flatMap((s) => s.paragraphs).join(" ");
    for (const href of [
      "/services/food-and-places-creator-video-editing-miami",
      "/services/content-creator-video-editing-miami",
      "/pricing#paquete-arranque",
    ]) expect(en).toContain(`(${href}`);
    for (const href of [
      "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
      "/es/edicion-de-video-para-creadores-de-contenido-miami",
      "/es/precios#paquete-arranque",
    ]) expect(es).toContain(`(${href}`);
  });

  it("JSON-LD carries the visible telephone, areas and service type", () => {
    const en = shortFormServiceJsonLd("en");
    expect(en.serviceType).toBe("short-form video editing");
    expect(en.provider.telephone).toBe(site.phone.e164);
    expect(en.provider["@type"]).toEqual(["LocalBusiness", "ProfessionalService"]);
    expect(en.areaServed.map((a) => a.name)).toEqual([
      "Miami",
      "Fort Lauderdale",
      "Miami-Dade County",
      "Broward County",
    ]);
    expect(en.offers.priceSpecification.minPrice).toBe(SHORT_FORM.perVideoFrom);
  });

  it("language switcher and hreflang point at the same Spanish twin", () => {
    const es = "/es/editor-de-video-corto-para-redes-miami";
    expect(getPairedLanguageRoute("/services/short-form-video-editor-miami")).toBe(es);
    expect(getPairedLanguageRoute(es)).toBe("/services/short-form-video-editor-miami");
    expect(languageAlternates["/services/short-form-video-editor-miami"]["es-US"]).toBe(es);
  });
});
