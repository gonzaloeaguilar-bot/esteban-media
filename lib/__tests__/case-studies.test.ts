import { describe, expect, it } from "vitest";

import {
  CASE_STUDY_IDS,
  buildCaseStudyStructuredData,
  getCaseStudies,
  getCaseStudyAlternates,
  getCaseStudyById,
  getCaseStudyPath,
  type CaseStudyLocale,
} from "../case-studies";
import { languageAlternates } from "../spanish-site";

const locales: readonly CaseStudyLocale[] = ["en", "es"];

function extractAllText(caseStudy: ReturnType<typeof getCaseStudyById>): string {
  if (!caseStudy) return "";
  const parts: string[] = [
    caseStudy.title,
    caseStudy.summary,
    caseStudy.role,
    caseStudy.deliverables,
    caseStudy.agencyContext ?? "",
    caseStudy.reviewNote ?? "",
    ...caseStudy.keyFacts.map((f) => `${f.label} ${f.value}`),
    ...caseStudy.scopingQuestions,
    ...caseStudy.sections.flatMap((s) => [
      s.heading,
      s.subheading ?? "",
      ...s.paragraphs,
      ...(s.bullets ?? []),
      s.callout ? `${s.callout.title} ${s.callout.text}` : "",
    ]),
  ];
  return parts.join(" ");
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

describe("case studies - 5 target portfolio projects", () => {
  it("ships exactly the five approved target case studies", () => {
    expect(CASE_STUDY_IDS).toEqual([
      "banacol",
      "homeowners",
      "flas-concierge",
      "healthy-smile",
      "my-dler",
    ]);
  });

  for (const locale of locales) {
    describe(`locale: ${locale}`, () => {
      const studies = getCaseStudies(locale);

      it("resolves all 5 case studies without missing entries", () => {
        expect(studies).toHaveLength(5);
        expect(studies.map((s) => s.id)).toEqual([...CASE_STUDY_IDS]);
      });

      for (const id of CASE_STUDY_IDS) {
        describe(`case study: ${id}`, () => {
          const study = getCaseStudyById(locale, id);

          it("exists and has valid identifiers", () => {
            expect(study).toBeDefined();
            expect(study?.id).toBe(id);
            expect(study?.locale).toBe(locale);
          });

          it("is reachable at its canonical path with reciprocal hreflang", () => {
            if (!study) return;
            const path = getCaseStudyPath(study);
            const expectedPath =
              locale === "es"
                ? `/es/casos-de-estudio/${id}`
                : `/case-studies/${id}`;
            expect(path).toBe(expectedPath);

            const alternates = getCaseStudyAlternates(study);
            expect(alternates["en-US"]).toBe(`/case-studies/${id}`);
            expect(alternates["es-US"]).toBe(`/es/casos-de-estudio/${id}`);
            expect(alternates["x-default"]).toBe(`/case-studies/${id}`);

            // Reciprocity with languageAlternates registry
            expect(languageAlternates[path]).toEqual(alternates);
            const partnerPath =
              locale === "es"
                ? `/case-studies/${id}`
                : `/es/casos-de-estudio/${id}`;
            expect(languageAlternates[partnerPath]).toEqual(alternates);
          });

          it("renders substantive body copy exceeding 700 words", () => {
            if (!study) return;
            const fullText = extractAllText(study);
            const words = countWords(fullText);
            expect(
              words,
              `Expected ${locale}/${id} to have >= 700 words, got ${words}`,
            ).toBeGreaterThanOrEqual(700);
          });

          it("includes internal links to matching service page and contact", () => {
            if (!study) return;
            expect(study.serviceLink.href).toMatch(/^\/(es\/)?services|^\/es\//);
            expect(study.serviceLink.label.length).toBeGreaterThan(0);
            expect(study.contactLink.href).toBe(
              locale === "es" ? "/es/contacto" : "/contact",
            );
            expect(study.portfolioLink.href).toBe(
              locale === "es" ? `/es/portafolio/${id}` : `/portfolio/${id}`,
            );
          });

          it("strictly omits aggregateRating and review in structured data", () => {
            if (!study) return;
            const schema = buildCaseStudyStructuredData(study);
            const serialized = JSON.stringify(schema);

            expect(serialized).not.toContain("aggregateRating");
            expect(serialized).not.toContain("AggregateRating");
            expect(serialized).not.toContain('"@type":"Review"');
            expect(serialized).not.toContain('"@type": "Review"');
            expect(serialized).not.toMatch(/"ratingValue"/i);
            expect(serialized).not.toMatch(/"reviewCount"/i);
          });

          it("claim-hygiene guard: contains NO %-suffixed performance figures and NO currency amounts", () => {
            if (!study) return;
            const fullText = extractAllText(study);

            // Strictest guard: no % characters anywhere in body or metrics
            expect(fullText).not.toMatch(/\d+%/);
            expect(fullText).not.toMatch(/\d+\s*%/);
            expect(fullText).not.toContain("%");

            // Currency amounts guard ($ followed by numbers or written currency claims)
            expect(fullText).not.toMatch(/\$\d+/);
            expect(fullText).not.toMatch(/\$\s*\d+/);
            expect(fullText).not.toMatch(/USD\s*\d+/i);
          });
        });
      }
    });
  }

  it("FLAS case study references Google review honestly without star rating claims", () => {
    for (const locale of locales) {
      const flas = getCaseStudyById(locale, "flas-concierge");
      expect(flas).toBeDefined();
      expect(flas?.reviewUrl).toContain("google.com");
      expect(flas?.reviewNote).toBeDefined();
      const text = extractAllText(flas);
      expect(text).not.toMatch(/5\s*stars?/i);
      expect(text).not.toMatch(/5\s*estrellas/i);
    }
  });

  it("My D'ler case study carries transparent concept/pitch disclaimer", () => {
    for (const locale of locales) {
      const myDler = getCaseStudyById(locale, "my-dler");
      const text = extractAllText(myDler);
      if (locale === "es") {
        expect(text).toMatch(/propuesta|pitch|presentación|no se publican métricas/i);
      } else {
        expect(text).toMatch(/pitch|concept|no claims|presentation/i);
      }
    }
  });
});
