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
import { PACKAGE_PRICES, PRICING_BANDS, REAL_ESTATE_PLANS, REAL_ESTATE_PLAN_TERMS, usd } from "../pricing";
import { REAL_ESTATE_MEDIA } from "../services-config";

const countWords = (text: string) => text
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

describe("bilingual practical guides", () => {
  it.each(["en", "es"] as const)("keeps %s niche cost answers concise, linked, and tied to published figures", (locale) => {
    const ids = ["restaurant-video-cost-guide", "real-estate-video-cost-guide"];
    const guides = getGuides(locale).filter(({ id }) => ids.includes(id));
    expect(guides).toHaveLength(ids.length);

    for (const guide of guides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(4);
      expect(guide.sections.length).toBeLessThanOrEqual(5);
      for (const section of guide.sections) {
        expect(section.heading).toMatch(/\?$/);
        const words = countWords([...section.paragraphs, ...(section.bullets ?? [])].join(" "));
        expect(words, `${guide.slug}: ${section.heading}`).toBeGreaterThanOrEqual(100);
        expect(words, `${guide.slug}: ${section.heading}`).toBeLessThanOrEqual(180);
      }
      expect(guide.faqs!.length).toBeGreaterThanOrEqual(4);
      expect(guide.faqs!.length).toBeLessThanOrEqual(5);
      for (const faq of guide.faqs!) expect(countWords(faq.answer)).toBeLessThan(60);
      const text = JSON.stringify(guide);
      expect(text).toContain(locale === "es" ? "](/es/calculadora)" : "](/calculator)");
      expect(text).toContain(locale === "es" ? "](/es/contacto)" : "](/contact)");
    }

    const restaurant = JSON.stringify(guides.find(({ id }) => id === "restaurant-video-cost-guide"));
    expect(restaurant).toContain(locale === "es" ? "](/es/edicion-de-video-promocional-para-restaurantes-miami)" : "](/services/restaurant-promo-video-editing-miami)");
    for (const id of ["arranque", "crecimiento", "presencia-local"] as const) {
      const price = PACKAGE_PRICES[id];
      expect(price.kind).toBe("from");
      if (price.kind === "from") expect(restaurant).toContain(usd(price.amount));
    }
    for (const [text, band] of [[restaurant, PRICING_BANDS.social]] as const) {
      expect(text).toContain(usd(band.baseMin));
      expect(text).toContain(usd(band.baseMax));
      expect(text).toContain(usd(PRICING_BANDS["on-location"].baseMin));
      expect(text).toContain(usd(PRICING_BANDS["on-location"].baseMax));
    }

    const realEstate = guides.find(({ id }) => id === "real-estate-video-cost-guide")!;
    const text = JSON.stringify(realEstate);
    expect(text).toContain(usd(REAL_ESTATE_MEDIA.photography[0].amount!));
    expect(text).not.toMatch(/drone|dron|aerial|aére/i);
    expect(text).toContain(locale === "es" ? "](/es/precios/inmobiliaria)" : "](/pricing/real-estate)");
    expect(realEstate.sections[0].bullets).toEqual(REAL_ESTATE_MEDIA.photography.map((tier) =>
      `${tier.label[locale]}: ${tier.amount === null ? (locale === "es" ? "llama para conversar" : "call to discuss") : usd(tier.amount)}.`,
    ));
    for (const item of [...REAL_ESTATE_MEDIA.addOns.filter(({ id }) => id === "premium-listing-video" || id === "zillow-3d-tour"), ...REAL_ESTATE_MEDIA.fees]) {
      expect(text).toContain(usd(item.amount));
      if ("note" in item && item.note) expect(text.toLowerCase()).toContain(item.note[locale].toLowerCase());
    }
    for (const plan of REAL_ESTATE_PLANS) expect(text).toContain(usd(plan.price));
    expect(text).toContain(`${REAL_ESTATE_PLAN_TERMS.minimumMonths} ${locale === "es" ? "meses" : "months"}`);
    expect(text).toContain(REAL_ESTATE_MEDIA.terms[locale]);
  });

  it.each(["en", "es"] as const)("keeps existing %s cost-guide sections within the reading ceiling", (locale) => {
    for (const guide of getGuides(locale).filter(({ id }) => ["corporate-video-cost-guide", "fort-lauderdale-video-cost-guide"].includes(id))) {
      for (const section of guide.sections) {
        expect(section.heading).toMatch(/\?$/);
        expect(countWords([...section.paragraphs, ...(section.bullets ?? [])].join(" "))).toBeLessThanOrEqual(180);
      }
    }
  });

  it("returns exactly 41 guides for English", () => {
    const guides = getGuides("en");
    expect(guides).toHaveLength(41);
    expect(guides.every((guide) => guide.locale === "en")).toBe(true);
  });

  it("returns exactly 41 guides for Spanish", () => {
    const guides = getGuides("es");
    expect(guides).toHaveLength(41);
    expect(guides.every((guide) => guide.locale === "es")).toBe(true);
  });

  it("publishes complete reciprocal guide pairs", () => {
    const englishGuides = getGuides("en");
    const spanishGuides = getGuides("es");

    expect(englishGuides).toHaveLength(41);
    expect(spanishGuides).toHaveLength(41);
    expect(englishGuides.map(({ id }) => id)).toEqual(
      spanishGuides.map(({ id }) => id),
    );
    expect(new Set(englishGuides.map(({ slug }) => slug))).toHaveLength(41);
    expect(new Set(spanishGuides.map(({ slug }) => slug))).toHaveLength(41);

    for (const guide of [...englishGuides, ...spanishGuides]) {
      expect(guide.answer.length).toBeGreaterThan(60);
      expect(guide.sections.length).toBeGreaterThanOrEqual(1);
      expect(guide.proof.href).toMatch(/^\/(?:es\/portafolio|portfolio)\//);
      expect(guide.proof.description).toMatch(
        guide.locale === "es"
          ? /no como prueba|no están publicados|no publica|nada publicado confirma/i
          : /not as evidence|not published|does not publish|nothing published confirms/i,
      );
    }
  }, 15000);

  it("builds unique canonical metadata with reciprocal hreflang", () => {
    const allGuides = [...getGuides("en"), ...getGuides("es")];
    const canonicalPaths = allGuides.map(getGuidePath);
    const metadataTitles = allGuides.map(({ metadataTitle }) => metadataTitle);
    const descriptions = allGuides.map(({ description }) => description);

    expect(new Set(canonicalPaths).size).toBe(82);
    expect(new Set(metadataTitles).size).toBe(82);
    expect(new Set(descriptions).size).toBe(82);

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

  it("targets Miami video production cost intent with truthful metadata", () => {
    const guide = getGuides("en").find(
      ({ id }) => id === "corporate-video-cost-guide",
    );

    expect(guide).toMatchObject({
      slug: "corporate-video-production-cost-miami",
      metadataTitle: "Miami Video Production Cost Guide",
      description:
        "Plan a Miami video production budget: compare scope, filming, editing, deliverables, and quote inputs before choosing a production path.",
    });
    expect(buildGuideMetadata(guide!).title).toBe(
      "Miami Video Production Cost Guide",
    );
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

  it("adds visible-page-aligned breadcrumb data and FAQ schema only where visible", () => {
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
      expect(JSON.stringify(structuredData).includes("FAQPage")).toBe(
        Boolean(guide.faqs?.length),
      );
      expect(graph.some((node) => node["@type"] === "Article")).toBe(true);
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

      expect(hrefs).toHaveLength(6);
      expect(hrefs.some((href) => href.includes("servic"))).toBe(true);
      expect(hrefs.some((href) => href.includes("precios") || href.includes("pricing"))).toBe(true);
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

  it("rebuilds product photography cost guide with real scope, visible FAQ, Article schema, portfolio proof, and conversion paths", () => {
    const esGuide = getGuides("es").find(
      (g) => g.slug === "cuanto-cuesta-la-fotografia-de-producto",
    );
    expect(esGuide).toBeDefined();
    if (!esGuide) return;

    // Real scope & variables
    const prose = JSON.stringify(esGuide.sections);
    expect(prose).toMatch(/SKUs|productos/i);
    expect(prose).toMatch(/ángulos/i);
    expect(prose).toMatch(/catálogo|estilo de vida|lifestyle/i);
    expect(prose).toMatch(/retoque/i);
    expect(prose).toMatch(/licencias|uso/i);

    // Visible FAQs & Schema alignment
    expect(esGuide.faqs?.length).toBeGreaterThanOrEqual(3);
    const structuredData = buildGuideStructuredData(esGuide);
    const faqNode = structuredData["@graph"].find(
      (node) => node["@type"] === "FAQPage",
    );
    expect(faqNode).toBeDefined();

    // Portfolio proof accurately credited
    expect(esGuide.proof.href).toBe("/es/portafolio/my-dler");
    expect(esGuide.proof.description).toMatch(/nada publicado confirma/i);

    // Conversion path links
    expect(prose).toContain("/es/calculadora");
    expect(prose).toContain("/es/contacto");

    // Owner-authorized starting price (2026-08-28, docs/pricing-basis.md):
    // "Desde $280 por sesión" is a floor, never a closed quote.
    expect(esGuide.answer).toContain("parten desde $280 por sesión");
    expect(esGuide.answer).toContain("no existe una tarifa única cerrada");
    // Market figures stay framed as market context, and the direct reference
    // is explicitly attributed to Esteban Moreno Media as a starting price.
    expect(prose).toMatch(/mercado/i);
    expect(prose).toContain("parten desde $280 por sesión");
    expect(prose).toContain("Es un precio inicial, nunca una cifra cerrada");
    expect(prose).toMatch(/Esteban Moreno Media/);
  });

  it("deepens the caption-styles guide pair with FAQPage schema for GSC-backed demand", () => {
    const enGuide = getGuides("en").find(
      (g) => g.slug === "best-caption-styles-for-instagram-reels",
    );
    const esGuide = getGuides("es").find(
      (g) => g.slug === "mejores-estilos-de-subtitulos-para-reels",
    );

    expect(enGuide).toBeDefined();
    expect(esGuide).toBeDefined();
    if (!enGuide || !esGuide) return;

    expect(enGuide.sections).toHaveLength(3);
    expect(esGuide.sections).toHaveLength(3);
    expect(enGuide.faqs).toHaveLength(3);
    expect(esGuide.faqs).toHaveLength(3);

    const enProse = JSON.stringify(enGuide.sections);
    const esProse = JSON.stringify(esGuide.sections);
    expect(enProse).toContain("How do you choose a caption style for the viewing context?");
    expect(enProse).toContain("How do you balance word highlighting with readability?");
    expect(enProse).toContain("/services/restaurant-promo-video-editing-miami");
    expect(esProse).toContain("¿Cómo se elige el estilo según cómo se verá el video?");
    expect(esProse).toContain("¿Cómo se resalta sin perder legibilidad?");
    expect(esProse).toContain("/es/reels-para-negocios-miami");

    for (const guide of [enGuide, esGuide]) {
      const structuredData = buildGuideStructuredData(guide);
      const faqNode = structuredData["@graph"].find(
        (
          node,
        ): node is {
          "@type": string;
          "@id": string;
          mainEntity: {
            "@type": string;
            name: string;
            acceptedAnswer: { "@type": string; text: string };
          }[];
        } => node["@type"] === "FAQPage" && "mainEntity" in node,
      );
      expect(faqNode).toBeDefined();
      expect(faqNode?.["@id"]).toBe(
        `https://estebanmorenomedia.com${getGuidePath(guide)}#faq`,
      );
      expect(faqNode?.mainEntity).toEqual(
        guide.faqs?.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      );
    }
  });

  it("deepens the editor-vs-videographer guide pair with quote-decision guidance", () => {
    const enGuide = getGuides("en").find(
      (g) => g.slug === "video-editor-vs-videographer",
    );
    const esGuide = getGuides("es").find(
      (g) => g.slug === "editor-de-video-vs-videografo",
    );

    expect(enGuide).toBeDefined();
    expect(esGuide).toBeDefined();
    if (!enGuide || !esGuide) return;

    expect(enGuide.sections).toHaveLength(10);
    expect(esGuide.sections).toHaveLength(8);
    expect(enGuide.faqs).toHaveLength(7);
    expect(esGuide.faqs).toHaveLength(6);

    const enProse = JSON.stringify(enGuide.sections);
    const esProse = JSON.stringify(esGuide.sections);

    expect(enProse).toContain(
      "What decision brief should you write before requesting a quote?",
    );
    expect(enProse).toContain("Editing-first: existing footage");
    expect(enProse).toContain("Filming-first: location");
    expect(enProse).toContain(
      "How does the state of your raw footage change the role you should hire?",
    );
    expect(enProse).toContain("Good editor handoff: clear speech");
    expect(enGuide.faqs?.map((faq) => faq.question)).toContain(
      "How do I know if my existing footage is enough for editing?",
    );
    expect(enProse).toContain("/services/short-form-video-editor-miami");
    expect(enProse).toContain("/services/corporate-event-videographer-miami");

    expect(esProse).toContain(
      "¿Qué brief sencillo conviene escribir antes de pedir una cotización?",
    );
    expect(esProse).toContain("Primero edición: material existente");
    expect(esProse).toContain("Primero grabación: locación");
    expect(esProse).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(esProse).toContain("/es/videografo-en-miami");

    for (const guide of [enGuide, esGuide]) {
      const structuredData = buildGuideStructuredData(guide);
      const faqNode = structuredData["@graph"].find(
        (
          node,
        ): node is {
          "@type": string;
          "@id": string;
          mainEntity: {
            "@type": string;
            name: string;
            acceptedAnswer: { "@type": string; text: string };
          }[];
        } => node["@type"] === "FAQPage" && "mainEntity" in node,
      );
      expect(faqNode).toBeDefined();
      expect(faqNode?.["@id"]).toBe(
        `https://estebanmorenomedia.com${getGuidePath(guide)}#faq`,
      );
      expect(faqNode?.mainEntity).toEqual(
        guide.faqs?.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      );
    }
  });

  it("deepens the AI video editing vs human editor guide pair with FAQPage schema and contextual links", () => {
    const enGuide = getGuides("en").find(
      (g) => g.slug === "ai-video-editing-vs-human-editor",
    );
    const esGuide = getGuides("es").find(
      (g) => g.slug === "edicion-de-video-con-ia-vs-editor-profesional",
    );

    expect(enGuide).toBeDefined();
    expect(esGuide).toBeDefined();
    if (!enGuide || !esGuide) return;

    expect(enGuide.sections).toHaveLength(5);
    expect(esGuide.sections).toHaveLength(5);
    expect(enGuide.faqs).toHaveLength(4);
    expect(esGuide.faqs).toHaveLength(4);

    const enProse = JSON.stringify(enGuide.sections);
    const esProse = JSON.stringify(esGuide.sections);

    expect(enProse).toContain(
      "Where do automated AI video tools save time in post-production?",
    );
    expect(enProse).toContain(
      "Where do automated tools struggle with pacing, emotion and context?",
    );
    expect(enProse).toContain("/portfolio/my-dler");
    expect(enProse).toContain("/services/short-form-video-editor-miami");
    expect(enProse).toContain("/services/ai-product-photography-miami");
    expect(enProse).toContain("/guides/how-to-choose-a-video-editor-in-miami");
    expect(enProse).toContain("/assessment");
    expect(enProse).toContain("/contact");

    expect(esProse).toContain(
      "¿Dónde ahorran tiempo las herramientas automatizadas de IA?",
    );
    expect(esProse).toContain(
      "¿Dónde falla el software automatizado en narrativa, emoción y contexto?",
    );
    expect(esProse).toContain("/es/portafolio/my-dler");
    expect(esProse).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(esProse).toContain("/es/fotografia-de-producto-con-ia-miami");
    expect(esProse).toContain("/es/guias/como-elegir-un-editor-de-video-en-miami");
    expect(esProse).toContain("/es/evaluacion");
    expect(esProse).toContain("/es/contacto");

    for (const guide of [enGuide, esGuide]) {
      const structuredData = buildGuideStructuredData(guide);
      const faqNode = structuredData["@graph"].find(
        (
          node,
        ): node is {
          "@type": string;
          "@id": string;
          mainEntity: {
            "@type": string;
            name: string;
            acceptedAnswer: { "@type": string; text: string };
          }[];
        } => node["@type"] === "FAQPage" && "mainEntity" in node,
      );
      expect(faqNode).toBeDefined();
      expect(faqNode?.["@id"]).toBe(
        `https://estebanmorenomedia.com${getGuidePath(guide)}#faq`,
      );
      expect(faqNode?.mainEntity).toEqual(
        guide.faqs?.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      );
    }
  });

  it("deepens the remote vs local video editing guide pair with FAQPage schema and contextual links", () => {
    const enGuide = getGuides("en").find(
      (g) => g.slug === "remote-vs-local-video-editing",
    );
    const esGuide = getGuides("es").find(
      (g) => g.slug === "edicion-remota-vs-estudio-local",
    );

    expect(enGuide).toBeDefined();
    expect(esGuide).toBeDefined();
    if (!enGuide || !esGuide) return;

    expect(enGuide.sections).toHaveLength(4);
    expect(esGuide.sections).toHaveLength(4);
    expect(enGuide.faqs).toHaveLength(4);
    expect(esGuide.faqs).toHaveLength(4);

    const enProse = JSON.stringify(enGuide.sections);
    const esProse = JSON.stringify(esGuide.sections);

    expect(enProse).toContain(
      "Why can remote editing remove studio overhead?",
    );
    expect(enProse).toContain(
      "How do project-based post-production and studio day rates compare?",
    );
    expect(enProse).toContain(
      "Which collaboration tools and review workflows suit remote teams?",
    );
    expect(enProse).toContain(
      "When is a local studio required, and when does remote editing fit?",
    );
    expect(enProse).toContain("/services/short-form-video-editor-miami");
    expect(enProse).toContain("/guides/fastest-way-to-send-large-video-files-to-editor");
    expect(enProse).toContain("/portfolio/homeowners");
    expect(enProse).toContain("/case-studies/homeowners");
    expect(enProse).toContain("/services");
    expect(enProse).toContain("/guides/write-a-useful-video-brief");
    expect(enProse).toContain("/guides/video-editor-vs-videographer");
    expect(enProse).toContain("/assessment");
    expect(enProse).toContain("/contact");

    expect(esProse).toContain(
      "¿Por qué la edición remota puede reducir costos fijos?",
    );
    expect(esProse).toContain(
      "¿Cómo se comparan los paquetes de edición y las tarifas por jornada de estudio?",
    );
    expect(esProse).toContain(
      "¿Qué herramientas y flujos de revisión sirven a equipos remotos?",
    );
    expect(esProse).toContain(
      "¿Cuándo se necesita un estudio local y cuándo conviene la edición remota?",
    );
    expect(esProse).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(esProse).toContain("/es/guias/como-enviar-archivos-pesados-de-video-para-edicion");
    expect(esProse).toContain("/es/portafolio/homeowners");
    expect(esProse).toContain("/es/casos-de-estudio/homeowners");
    expect(esProse).toContain("/es/servicios");
    expect(esProse).toContain("/es/guias/como-escribir-un-brief-util-de-video");
    expect(esProse).toContain("/es/guias/editor-de-video-vs-videografo");
    expect(esProse).toContain("/es/evaluacion");
    expect(esProse).toContain("/es/contacto");

    for (const guide of [enGuide, esGuide]) {
      const structuredData = buildGuideStructuredData(guide);
      const faqNode = structuredData["@graph"].find(
        (
          node,
        ): node is {
          "@type": string;
          "@id": string;
          mainEntity: {
            "@type": string;
            name: string;
            acceptedAnswer: { "@type": string; text: string };
          }[];
        } => node["@type"] === "FAQPage" && "mainEntity" in node,
      );
      expect(faqNode).toBeDefined();
      expect(faqNode?.["@id"]).toBe(
        `https://estebanmorenomedia.com${getGuidePath(guide)}#faq`,
      );
      expect(faqNode?.mainEntity).toEqual(
        guide.faqs?.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      );
    }
  });
});
