import { describe, expect, it } from "vitest";

import { buildGuideStructuredData, getGuideBySlug } from "@/lib/guides";

describe("video production rfp template content depth and FAQ schema", () => {
  it("provides comprehensive FAQ content and FAQPage schema for both EN and ES locales", () => {
    const enGuide = getGuideBySlug("en", "video-production-rfp-template-miami");
    expect(enGuide).toBeDefined();
    expect(enGuide?.faqs).toBeDefined();
    expect(enGuide?.faqs?.length).toBeGreaterThanOrEqual(4);

    const esGuide = getGuideBySlug("es", "plantilla-brief-rfp-produccion-video-miami");
    expect(esGuide).toBeDefined();
    expect(esGuide?.faqs).toBeDefined();
    expect(esGuide?.faqs?.length).toBeGreaterThanOrEqual(4);

    // Verify structured data includes FAQPage schema
    const enSchema = buildGuideStructuredData(enGuide!);
    const enGraph = (enSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string }> }> })["@graph"];
    const enFaqNode = enGraph.find((node) => node["@type"] === "FAQPage");
    expect(enFaqNode).toBeDefined();
    expect(enFaqNode?.mainEntity?.length).toBe(4);
    expect(enFaqNode?.mainEntity?.[0]?.name).toBe("What is the most common omission in a video production RFP?");

    const esSchema = buildGuideStructuredData(esGuide!);
    const esGraph = (esSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string }> }> })["@graph"];
    const esFaqNode = esGraph.find((node) => node["@type"] === "FAQPage");
    expect(esFaqNode).toBeDefined();
    expect(esFaqNode?.mainEntity?.length).toBe(4);
    expect(esFaqNode?.mainEntity?.[0]?.name).toBe("¿Cuál es la omisión más común en un RFP de producción de video?");
  });
});
