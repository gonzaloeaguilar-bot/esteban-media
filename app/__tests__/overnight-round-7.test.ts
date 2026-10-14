import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { packageMetaDescription, packageMetadata } from "@/components/package-detail";
import { hasNicheCost } from "@/components/niche-answers";
import { spanishPriceSection } from "@/components/spanish-niche-page";
import { getGuideBySlug } from "@/lib/guides";
import { priceSentence } from "@/lib/packages";
import { getSpanishNichePage, spanishNichePages } from "@/lib/spanish-site";

const root = process.cwd();

describe("Spanish price answer is its own H2 (round 7)", () => {
  // Live crawl 2026-10-14: 73 Spanish pages answered "¿Cuánto cuesta…?" only as
  // an h3 at heading 4-25 of the page; the English twins carry it as an H2.
  it("finds the price section on the Spanish Reels flagship", () => {
    const page = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    expect(spanishPriceSection(page?.sections)?.heading).toBe("¿Cuánto cuesta editar Reels en Fort Lauderdale?");
  });

  it("lifts a price answer (own section or the niche cost answer) on at least 70 Spanish niche pages", () => {
    const confirmed = spanishNichePages.filter((p) => p.availability !== "pending-confirmation");
    const own = confirmed.filter((p) => spanishPriceSection(p.sections));
    const niche = confirmed.filter((p) => !spanishPriceSection(p.sections) && hasNicheCost(`/es/${p.slug}`, p.description));
    expect(own.length).toBeGreaterThanOrEqual(15);
    expect(own.length + niche.length).toBeGreaterThanOrEqual(70);
  });

  it("only matches a question that starts with ¿Cuánto cuesta / cuestan", () => {
    expect(spanishPriceSection([{ heading: "¿Qué incluye el precio?" }])).toBeUndefined();
    expect(spanishPriceSection([{ heading: "¿Cuánto cuestan los reels para mi negocio en Miami?" }])?.heading).toMatch(/cuestan/);
  });

  it("the template renders the lifted section once and drops it from the scope guide", () => {
    const src = readFileSync(join(root, "components/spanish-niche-page.tsx"), "utf8");
    expect(src).toContain('data-section="es_niche_price"');
    expect(src).toContain("section !== priceSection");
    expect(src).toContain("omitCost={liftNicheCost}");
  });
});

describe("pricing detail pages (round 7)", () => {
  it("a quoted package reads as English and Spanish, not 'quote custom'", () => {
    expect(priceSentence("en", "todo-incluido")).toBe("Quoted per project");
    expect(priceSentence("es", "todo-incluido")).toBe("Cotizado a medida");
    const en = packageMetadata("todo-incluido", "en").description ?? "";
    expect(en).toMatch(/^The All-In package is quoted per project\./);
    expect(en).not.toMatch(/quote custom/i);
  });

  it("no package description falls back to a bare price sentence", () => {
    for (const id of ["arranque", "crecimiento", "presencia-local", "todo-incluido"] as const) {
      for (const locale of ["en", "es"] as const) {
        const d = packageMetadata(id, locale).description ?? "";
        expect(d.length, `${id} ${locale}`).toBeGreaterThanOrEqual(90);
        expect(d.length, `${id} ${locale}`).toBeLessThanOrEqual(160);
      }
    }
  });

  it("packageMetaDescription keeps whole include lines under 160", () => {
    const d = packageMetaDescription("Lead.", "x".repeat(200), ["One thing", "Two thing.", "y".repeat(200)]);
    expect(d).toBe("Lead. One thing. Two thing.");
  });

  it("every pricing detail page renders the trail (BreadcrumbList + dated WebPage)", () => {
    for (const file of ["components/package-detail.tsx", "components/real-estate-pricing.tsx"]) {
      const src = readFileSync(join(root, file), "utf8");
      expect(src, file).toContain("<PricingTrail");
      expect(src, file).toContain("<PageUpdated");
    }
  });
});

describe("caption guide snippet (round 7)", () => {
  it("answers first, under 160 characters", () => {
    const guide = getGuideBySlug("en", "best-caption-styles-for-instagram-reels");
    const d = guide?.metaDescription ?? "";
    expect(d).toMatch(/^Best Reel captions:/);
    expect(d.length).toBeLessThanOrEqual(160);
  });
});
