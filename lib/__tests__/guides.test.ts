import { describe, expect, it } from "vitest";

import {
  buildGuideMetadata,
  buildGuideStructuredData,
  buildGuidesIndexMetadata,
  buildGuidesIndexStructuredData,
  getGuideAlternates,
  getGuidePath,
  getGuides,
  getGuideSupportLinks,
  guidePolicyNotes,
  guidesIndexCopy,
} from "../guides";
import { site } from "../site";

describe("bilingual practical guides", () => {
  it("returns exactly 9 guides for English", () => {
    const guides = getGuides("en");
    expect(guides).toHaveLength(9);
    expect(guides.every((guide) => guide.locale === "en")).toBe(true);
  });

  it("returns exactly 9 guides for Spanish", () => {
    const guides = getGuides("es");
    expect(guides).toHaveLength(9);
    expect(guides.every((guide) => guide.locale === "es")).toBe(true);
  });

  it("publishes complete reciprocal guide pairs", () => {
    const englishGuides = getGuides("en");
    const spanishGuides = getGuides("es");

    expect(englishGuides).toHaveLength(9);
    expect(spanishGuides).toHaveLength(9);
    expect(englishGuides.map(({ id }) => id)).toEqual(
      spanishGuides.map(({ id }) => id),
    );
    expect(new Set(englishGuides.map(({ slug }) => slug))).toHaveLength(9);
    expect(new Set(spanishGuides.map(({ slug }) => slug))).toHaveLength(9);

    for (const guide of [...englishGuides, ...spanishGuides]) {
      expect(guide.answer.length).toBeGreaterThan(80);
      expect(guide.sections.length).toBeGreaterThanOrEqual(2);
      expect(guide.proof.href).toMatch(/^\/(?:es\/portafolio|portfolio)\//);
      expect(guide.proof.description).toMatch(
        guide.locale === "es"
          ? /no como prueba|no están publicados|no publica|nada publicado confirma/i
          : /not as evidence|not published|does not publish|nothing published confirms/i,
      );
    }
  });

  it("builds unique canonical metadata with reciprocal hreflang", () => {
    const allGuides = [...getGuides("en"), ...getGuides("es")];
    const canonicalPaths = allGuides.map(getGuidePath);
    const metadataTitles = allGuides.map(({ metadataTitle }) => metadataTitle);
    const descriptions = allGuides.map(({ description }) => description);

    expect(new Set(canonicalPaths).size).toBe(18);
    expect(new Set(metadataTitles).size).toBe(18);
    expect(new Set(descriptions).size).toBe(18);

    for (const guide of allGuides) {
      const metadata = buildGuideMetadata(guide);
      const alternates = getGuideAlternates(guide);

      expect(`${guide.metadataTitle} | ${site.name}`.length).toBeLessThanOrEqual(
        60,
      );
      expect(metadata.alternates).toEqual({
        canonical: getGuidePath(guide),
        languages: alternates,
      });
      expect(alternates["en-US"]).toMatch(/^\/guides\//);
      expect(alternates["es-US"]).toMatch(/^\/es\/guias\//);
      expect(alternates["x-default"]).toBe(alternates["en-US"]);
    }

    for (const copy of Object.values(guidesIndexCopy)) {
      expect(`${copy.metadataTitle} | ${site.name}`.length).toBeLessThanOrEqual(
        60,
      );
    }

    expect(buildGuidesIndexMetadata("en").alternates).toEqual({
      canonical: "/guides",
      languages: {
        "en-US": "/guides",
        "es-US": "/es/guias",
        "x-default": "/guides",
      },
    });
    expect(buildGuidesIndexMetadata("es").alternates).toEqual({
      canonical: "/es/guias",
      languages: {
        "en-US": "/guides",
        "es-US": "/es/guias",
        "x-default": "/guides",
      },
    });
  });

  it("labels every article as general guidance without implying a private policy", () => {
    const corpus = JSON.stringify({
      guides: [...getGuides("en"), ...getGuides("es")],
      indexes: guidesIndexCopy,
      supportLinks: {
        en: getGuideSupportLinks("en"),
        es: getGuideSupportLinks("es"),
      },
    });
    const unsupportedClaims = [
      /Esteban (?:reviews|reviewed).*files/i,
      /Esteban(?:'s|’s) (?:workflow|process|delivery)/i,
      /published (?:workflow|process)/i,
      /flujo (?:de trabajo )?publicado/i,
      /review link/i,
      /enlace de revisión/i,
      /timestamped notes/i,
      /notas con marcas de tiempo/i,
      /files? before (?:the )?scope/i,
      /archivos? antes de (?:definir )?el alcance/i,
      /delivers? final exports/i,
      /entrega (?:los )?exportes finales/i,
      /captions, pacing, color/i,
      /subtítulos, el ritmo, el color/i,
      /send the goal, date, location/i,
      /envía la meta, fecha, locación/i,
    ];

    for (const claim of unsupportedClaims) {
      expect(corpus).not.toMatch(claim);
    }

    expect(guidePolicyNotes.en).toContain(
      "not Esteban Moreno Media policy",
    );
    expect(guidePolicyNotes.es).toContain(
      "no una política de Esteban Moreno Media",
    );
  });

  it("adds visible-page-aligned breadcrumb data without FAQ schema", () => {
    for (const guide of [...getGuides("en"), ...getGuides("es")]) {
      const structuredData = buildGuideStructuredData(guide);
      const graph = structuredData["@graph"];
      const breadcrumbs = graph.find(
        (node) => node["@type"] === "BreadcrumbList",
      );

      if (!breadcrumbs || !("itemListElement" in breadcrumbs)) {
        throw new Error(`Missing breadcrumbs for ${getGuidePath(guide)}`);
      }

      expect(graph[0]).toMatchObject({
        "@type": "WebPage",
        url: `https://estebanmorenomedia.com${getGuidePath(guide)}`,
        name: guide.title,
      });
      expect(breadcrumbs?.itemListElement).toHaveLength(3);
      expect(breadcrumbs?.itemListElement.at(-1)).toMatchObject({
        name: guide.title,
        item: `https://estebanmorenomedia.com${getGuidePath(guide)}`,
      });
      expect(JSON.stringify(structuredData)).not.toContain("FAQPage");
    }

    for (const locale of ["en", "es"] as const) {
      const breadcrumbs = buildGuidesIndexStructuredData(locale)["@graph"].find(
        (node) => node["@type"] === "BreadcrumbList",
      );

      if (!breadcrumbs || !("itemListElement" in breadcrumbs)) {
        throw new Error(`Missing ${locale} guide index breadcrumbs`);
      }

      expect(breadcrumbs.itemListElement).toHaveLength(2);
    }
  });

  it("links each locale to editing services, portfolio proof, and contact", () => {
    for (const locale of ["en", "es"] as const) {
      const hrefs = getGuideSupportLinks(locale).map(({ href }) => href);

      expect(hrefs).toHaveLength(3);
      expect(hrefs.some((href) => href.includes("servic"))).toBe(true);
      expect(
        hrefs.some(
          (href) => href.includes("portfolio") || href.includes("portafolio"),
        ),
      ).toBe(true);
      expect(
        hrefs.some(
          (href) => href.includes("contact") || href.includes("contacto"),
        ),
      ).toBe(true);
    }
  });
});
