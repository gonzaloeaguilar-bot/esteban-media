import { describe, expect, it } from "vitest";

import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import { spanishNichePages, buildSpanishNicheStructuredData } from "@/lib/spanish-site";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { absoluteUrl } from "@/lib/site";

describe("bilingual subtitling FAQ schema depth and exact query phrasings", () => {
  it("declares FAQPage schema using the exact bilingual subtitling query phrasings in EN and ES", () => {
    // 1. English Subtitling Service FAQ and Schema
    const enFaqs = PORTED_SERVICE_FAQS["/services/bilingual-video-subtitling-service"];
    expect(enFaqs).toBeDefined();
    expect(enFaqs.length).toBeGreaterThanOrEqual(4);

    const enSchema = buildServiceFaqSchema(
      absoluteUrl("/services/bilingual-video-subtitling-service"),
      enFaqs,
    );
    expect(enSchema["@type"]).toBe("FAQPage");
    const enQuestionNames = enSchema.mainEntity.map((item) => item.name);
    
    // Exactly matches the query phrasing
    const exactEnQuery = "Who provides a bilingual English Spanish video subtitling service?";
    expect(enQuestionNames).toContain(exactEnQuery);

    // 2. Spanish Subtitling Service FAQ and Schema
    const esPage = spanishNichePages.find(
      (p) => p.slug === "servicio-de-subtitulado-bilingue-de-video",
    );
    expect(esPage).toBeDefined();
    expect(esPage?.faqs).toBeDefined();
    expect(esPage?.faqs.length).toBeGreaterThanOrEqual(5);

    const esSchema = buildSpanishNicheStructuredData(esPage!);
    const esFaqNode = esSchema["@graph"].find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name: string }>;
    };
    expect(esFaqNode).toBeDefined();
    const esQuestionNames = esFaqNode.mainEntity?.map((item) => item.name) || [];

    // Exactly matches the query phrasing
    const exactEsQuery = "¿Quién ofrece servicio de subtitulado bilingüe inglés español para videos?";
    expect(esQuestionNames).toContain(exactEsQuery);
  });
});
