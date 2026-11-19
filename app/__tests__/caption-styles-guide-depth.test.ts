import { describe, expect, it } from "vitest";

import { buildGuideStructuredData, getGuideBySlug } from "@/lib/guides";

describe("caption styles guide content depth, parity, and FAQ schema", () => {
  it("provides comprehensive FAQ content and FAQPage schema for both EN and ES locales", () => {
    const enGuide = getGuideBySlug("en", "best-caption-styles-for-instagram-reels");
    expect(enGuide).toBeDefined();
    expect(enGuide?.faqs).toBeDefined();
    expect(enGuide?.faqs?.length).toBe(5);

    const esGuide = getGuideBySlug("es", "mejores-estilos-de-subtitulos-para-reels");
    expect(esGuide).toBeDefined();
    expect(esGuide?.faqs).toBeDefined();
    expect(esGuide?.faqs?.length).toBe(5);

    // The guide's visible proof must stay current; an older restaurant example
    // should not quietly return to this AI-referral entry surface.
    expect(enGuide?.proof.href).toBe("/portfolio/great-reviewer-iphone-18");
    expect(enGuide?.proof.title).toBe("The Great Reviewer Reel");
    expect(esGuide?.proof.href).toBe("/es/portafolio/great-reviewer-iphone-18");
    expect(esGuide?.proof.title).toBe("El Reel de The Great Reviewer");

    // Verify structured data includes FAQPage schema on both locales
    const enSchema = buildGuideStructuredData(enGuide!);
    const enGraph = (enSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string; acceptedAnswer?: { text: string } }> }> })["@graph"];
    const enFaqNode = enGraph.find((node) => node["@type"] === "FAQPage");
    expect(enFaqNode).toBeDefined();
    expect(enFaqNode?.mainEntity?.length).toBe(5);
    expect(enFaqNode?.mainEntity?.[3]?.name).toBe("Do automatic captions work well enough for Reels?");
    expect(enFaqNode?.mainEntity?.[4]?.name).toBe("What fonts work best for Instagram Reel subtitles?");

    const esSchema = buildGuideStructuredData(esGuide!);
    const esGraph = (esSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string; acceptedAnswer?: { text: string } }> }> })["@graph"];
    const esFaqNode = esGraph.find((node) => node["@type"] === "FAQPage");
    expect(esFaqNode).toBeDefined();
    expect(esFaqNode?.mainEntity?.length).toBe(5);
    expect(esFaqNode?.mainEntity?.[3]?.name).toBe("¿Sirven los subtítulos automáticos para Reels?");
    expect(esFaqNode?.mainEntity?.[4]?.name).toBe("¿Qué fuentes funcionan mejor para subtítulos de Reels?");
  });
});
