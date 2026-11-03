import { describe, expect, it } from "vitest";

import { buildGuideStructuredData, getGuideBySlug } from "@/lib/guides";

describe("transfer large video files guide content depth and FAQ schema", () => {
  it("provides comprehensive FAQ content and FAQPage schema for both EN and ES locales", () => {
    const enGuide = getGuideBySlug("en", "fastest-way-to-send-large-video-files-to-editor");
    expect(enGuide).toBeDefined();
    expect(enGuide?.faqs).toBeDefined();
    expect(enGuide?.faqs?.length).toBe(6);

    const esGuide = getGuideBySlug("es", "como-enviar-archivos-pesados-de-video-para-edicion");
    expect(esGuide).toBeDefined();
    expect(esGuide?.faqs).toBeDefined();
    expect(esGuide?.faqs?.length).toBe(6);

    // Verify structured data includes FAQPage schema
    const enSchema = buildGuideStructuredData(enGuide!);
    const enGraph = (enSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string; acceptedAnswer?: { text: string } }> }> })["@graph"];
    const enFaqNode = enGraph.find((node) => node["@type"] === "FAQPage");
    expect(enFaqNode).toBeDefined();
    expect(enFaqNode?.mainEntity?.length).toBe(6);
    expect(enFaqNode?.mainEntity?.[0]?.name).toBe("What is the fastest cloud service for sending large 4K video files?");

    const esSchema = buildGuideStructuredData(esGuide!);
    const esGraph = (esSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string; acceptedAnswer?: { text: string } }> }> })["@graph"];
    const esFaqNode = esGraph.find((node) => node["@type"] === "FAQPage");
    expect(esFaqNode).toBeDefined();
    expect(esFaqNode?.mainEntity?.length).toBe(6);
    expect(esFaqNode?.mainEntity?.[0]?.name).toBe("¿Cuál es el servicio en la nube más rápido para enviar archivos de video 4K pesados?");
    expect(esFaqNode?.mainEntity?.[0]?.acceptedAnswer?.text).toContain("MASV y Frame.io");
  });
});
