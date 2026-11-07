import { describe, expect, it } from "vitest";
import { buildGuideStructuredData, getGuideBySlug } from "@/lib/guides";

describe("editor-vs-videographer guide depth, parity, and FAQ schema", () => {
  it("provides comprehensive FAQ content and FAQPage schema for both EN and ES locales", () => {
    const enGuide = getGuideBySlug("en", "video-editor-vs-videographer");
    expect(enGuide).toBeDefined();
    expect(enGuide?.faqs?.length).toBe(7);

    const esGuide = getGuideBySlug("es", "editor-de-video-vs-videografo");
    expect(esGuide).toBeDefined();
    expect(esGuide?.faqs?.length).toBe(7);

    const esSchema = buildGuideStructuredData(esGuide!);
    const esGraph = (esSchema as { "@graph": Array<{ "@type": string; mainEntity?: Array<{ name: string; acceptedAnswer?: { text: string } }> }> })["@graph"];
    const esFaqNode = esGraph.find((node) => node["@type"] === "FAQPage");
    expect(esFaqNode).toBeDefined();
    expect(esFaqNode?.mainEntity?.length).toBe(7);
  });
});
