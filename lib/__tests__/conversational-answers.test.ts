import { describe, expect, it } from "vitest";

import { ALL_CONVERSATIONAL_UNITS } from "@/lib/conversational-answers";
import { getGuideById } from "@/lib/guides";
import { PACKAGE_PRICES, SHORT_FORM, usd } from "@/lib/pricing";
import { site } from "@/lib/site";
import { SHORT_FORM_DEEP_DIVE_EN, SHORT_FORM_SECTIONS_ES } from "@/lib/short-form-recs";
import { CREATOR_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { spanishNichePages } from "@/lib/spanish-site";

const words = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const published = new Set<string>([
  usd(SHORT_FORM.perVideoFrom),
  ...SHORT_FORM.weekly.map((o) => usd(o.pricePerWeek)),
  ...Object.values(PACKAGE_PRICES).flatMap((p) => (p.kind === "from" ? [usd(p.amount)] : [])),
]);

describe("conversational answers (Reels Fort Lauderdale formula, 2026-10-14)", () => {
  it("has the ten units the formula targets", () => {
    expect(ALL_CONVERSATIONAL_UNITS).toHaveLength(10);
  });

  for (const unit of ALL_CONVERSATIONAL_UNITS) {
    it(`${unit.heading}: question-shaped, 100-180 words, starter price, no unpublished figure`, () => {
      expect(unit.heading).toMatch(/\?$/);
      const n = words(unit.text);
      expect(n, unit.heading).toBeGreaterThanOrEqual(100);
      expect(n, unit.heading).toBeLessThanOrEqual(180);
      for (const d of unit.text.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []) expect(published, d).toContain(d);
      expect(unit.text).not.toMatch(/drone|dron|aerial|aére|followers|seguidores|reviews|reseñas/i);
    });
  }

  it("answers the Spanish conversational questions word for word", () => {
    const headings = ALL_CONVERSATIONAL_UNITS.map((u) => u.heading);
    expect(headings).toContain("¿Necesitas un editor de videos para tu negocio en Fort Lauderdale?");
    expect(headings).toContain("¿Necesitas un editor de videos para tu negocio en Miami?");
    expect(headings).toContain("¿Hay un editor de video que hable español en Miami?");
    expect(headings).toContain("¿Hay un editor de video que hable español en Fort Lauderdale?");
    expect(headings).toContain("Quiero empezar a crear contenido para Instagram, ¿quién me ayuda con los videos?");
    expect(getGuideById("es", "short-form-editor-cost-guide")?.sections[0].heading).toBe("¿Cuánto cuesta editar un reel?");
  });

  it("is wired into the pages that should answer it", () => {
    const page = (slug: string) => spanishNichePages.find((p) => p.slug === slug)!;
    const has = (slug: string, h: string) => (page(slug).sections ?? []).some((s) => s.heading === h);
    expect(has("editor-de-reels-miami", "¿Hay un editor de video que hable español en Miami?")).toBe(true);
    expect(has("editor-de-reels-fort-lauderdale", "¿Hay un editor de video que hable español en Fort Lauderdale?")).toBe(true);
    expect(has("edicion-de-video-para-creadores-de-contenido-miami", "Quiero empezar a crear contenido para Instagram, ¿quién me ayuda con los videos?")).toBe(true);
    expect(SHORT_FORM_DEEP_DIVE_EN.sections.map((s) => s.heading)).toContain("Who edits TikToks for businesses and creators in Miami?");
    expect(SHORT_FORM_SECTIONS_ES.map((s) => s.heading)).toContain("¿Quién edita TikToks para negocios y creadores en Miami?");
    expect(CREATOR_DEEP_DIVE.sections.map((s) => s.heading)).toContain("Who helps a new influencer in Miami with their videos?");
  });

  it("the hubs link the money pages", () => {
    const text = (id: Parameters<typeof getGuideById>[1], locale: "en" | "es") =>
      JSON.stringify(getGuideById(locale, id));
    expect(text("food-account-start-guide", "en")).toContain("/services/food-and-places-creator-video-editing-miami");
    expect(text("food-account-start-guide", "es")).toContain("/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami");
    expect(text("record-with-iphone-guide", "en")).toContain("/services/reels-editor-miami");
    expect(text("record-with-iphone-guide", "es")).toContain("/es/editor-de-reels-fort-lauderdale");
    expect(text("short-form-editor-cost-guide", "en")).toContain("/services/short-form-video-editor-miami");
    expect(text("short-form-editor-cost-guide", "es")).toContain("/es/editor-de-video-corto-para-redes-miami");
  });

  it("uses the canonical phone", () => {
    expect(ALL_CONVERSATIONAL_UNITS.some((u) => u.text.includes(site.phone.display))).toBe(true);
  });
});
