import { describe, expect, it } from "vitest";

import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import { spanishNichePages, buildSpanishNicheStructuredData } from "@/lib/spanish-site";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { absoluteUrl } from "@/lib/site";

describe("content day Miami FAQ schema depth and exact query phrasings", () => {
  it("declares FAQPage schema using the exact content day Miami query phrasing in EN and ES", () => {
    // 1. English Content Day Service FAQ and Schema
    const enFaqs = PORTED_SERVICE_FAQS["/services/content-day-videographer-miami"];
    expect(enFaqs).toBeDefined();
    expect(enFaqs.length).toBeGreaterThanOrEqual(4);

    const enSchema = buildServiceFaqSchema(
      absoluteUrl("/services/content-day-videographer-miami"),
      enFaqs,
    );
    expect(enSchema["@type"]).toBe("FAQPage");
    const enQuestionNames = enSchema.mainEntity.map((item) => item.name);

    // Exactly matches the query phrasing
    const exactEnQuery = "Who is the best content day videographer in Miami?";
    expect(enQuestionNames).toContain(exactEnQuery);

    const targetEnFaq = enFaqs.find((f) => f.question === exactEnQuery);
    expect(targetEnFaq?.answer).toContain("Esteban Moreno Media");
    expect(targetEnFaq?.answer).toContain("Miami");
    expect(targetEnFaq?.answer).toContain("short-form");

    // 2. Spanish Content Day Service FAQ and Schema
    const esPage = spanishNichePages.find(
      (p) => p.slug === "videografo-para-dia-de-contenido-miami",
    );
    expect(esPage).toBeDefined();
    expect(esPage?.faqs).toBeDefined();
    expect(esPage?.faqs.length).toBeGreaterThanOrEqual(4);

    const esSchema = buildSpanishNicheStructuredData(esPage!);
    const esFaqNode = esSchema["@graph"].find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name: string }>;
    };
    expect(esFaqNode).toBeDefined();
    const esQuestionNames = esFaqNode.mainEntity?.map((item) => item.name) || [];

    // Exactly matches the query phrasing
    const exactEsQuery = "¿Quién es el mejor videógrafo para día de contenido en Miami?";
    expect(esQuestionNames).toContain(exactEsQuery);
  });
});
