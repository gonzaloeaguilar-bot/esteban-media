import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { GuideDetailPage } from "@/components/guide-pages";
import { getGuideBySlug, buildGuideStructuredData } from "@/lib/guides";

const TARGET_PAGES = [
  {
    locale: "es" as const,
    slug: "cuanto-cuesta-la-fotografia-de-producto",
    path: "/es/guias/cuanto-cuesta-la-fotografia-de-producto",
    requiredPhrase: "parten desde $280 por sesión",
    serviceLink: "/es/fotografia-de-producto-con-ia-miami",
    contactLink: "/es/contacto",
    companionSlug: "how-much-does-product-photography-cost",
    companionPath: "/guides/how-much-does-product-photography-cost",
  },
  {
    locale: "en" as const,
    slug: "fastest-way-to-send-large-video-files-to-editor",
    path: "/guides/fastest-way-to-send-large-video-files-to-editor",
    requiredPhrase: "large video files",
    serviceLink: "/services",
    contactLink: "/contact",
    companionSlug: "como-enviar-archivos-pesados-de-video-para-edicion",
    companionPath: "/es/guias/como-enviar-archivos-pesados-de-video-para-edicion",
    metadataTitle: "Fastest Way to Send Large Video Files",
    companionMetadataTitle: "Cómo Enviar Archivos Grandes de Video",
  },
  {
    locale: "en" as const,
    slug: "video-editor-vs-videographer",
    path: "/guides/video-editor-vs-videographer",
    requiredPhrase: "Hire a videographer when you need physical camera operation",
    serviceLink: "/services",
    contactLink: "/contact",
    companionSlug: "editor-de-video-vs-videografo",
    companionPath: "/es/guias/editor-de-video-vs-videografo",
  },
  {
    locale: "es" as const,
    slug: "editor-de-video-vs-videografo",
    path: "/es/guias/editor-de-video-vs-videografo",
    requiredPhrase: "Contrata un videógrafo cuando requieras",
    serviceLink: "/es/servicios",
    contactLink: "/es/contacto",
    companionSlug: "video-editor-vs-videographer",
    companionPath: "/guides/video-editor-vs-videographer",
  },
  {
    locale: "en" as const,
    slug: "video-production-cost-fort-lauderdale",
    path: "/guides/video-production-cost-fort-lauderdale",
    requiredPhrase: "remote editing packages start from $100 per video",
    serviceLink: "/services",
    contactLink: "/contact",
    companionSlug: "cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
    companionPath: "/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
    metadataTitle: "Fort Lauderdale Video Editing Costs",
    companionMetadataTitle: "Edición Video Ft Lauderdale Costos",
  },
  {
    locale: "es" as const,
    slug: "cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
    path: "/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
    requiredPhrase: "edición remota parten desde $100 por video",
    serviceLink: "/es/servicios",
    contactLink: "/es/contacto",
    companionSlug: "video-production-cost-fort-lauderdale",
    companionPath: "/guides/video-production-cost-fort-lauderdale",
    metadataTitle: "Edición Video Ft Lauderdale Costos",
    companionMetadataTitle: "Fort Lauderdale Video Editing Costs",
  },
] as const;

function extractVisibleText(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  const words = text.split(/\s+/).filter(Boolean);
  return words.length;
}

describe("demand pages depth and substance", () => {
  for (const target of TARGET_PAGES) {
    describe(`target page: ${target.path}`, () => {
      const guide = getGuideBySlug(target.locale, target.slug);

      it("guide exists in dataset", () => {
        expect(guide).toBeDefined();
      });

      if (!guide) return;

      if ("metadataTitle" in target) {
        it("keeps the search title aligned with the guide's direct answer in both languages", () => {
          const companion = getGuideBySlug(
            target.locale === "en" ? "es" : "en",
            target.companionSlug,
          );

          expect(guide.metadataTitle).toBe(target.metadataTitle);
          expect(companion?.metadataTitle).toBe(target.companionMetadataTitle);
        });
      }

      const markup = renderToStaticMarkup(
        React.createElement(GuideDetailPage, { guide })
      );
      const visibleText = extractVisibleText(markup);
      const wordCount = countWords(visibleText);

      it("rendered body copy >= 900 words", () => {
        expect(wordCount).toBeGreaterThanOrEqual(900);
      });

      it("the first 80 words contain a direct answer with required phrase", () => {
        const first80Words = visibleText.split(/\s+/).slice(0, 80).join(" ");
        expect(first80Words.toLowerCase()).toContain(
          target.requiredPhrase.toLowerCase()
        );
      });

      it("every FAQPage question name appears in visible rendered markup", () => {
        const structuredData = buildGuideStructuredData(guide);
        const graph = structuredData["@graph"] as Array<{
          "@type": string;
          mainEntity?: Array<{ name: string }>;
        }>;
        const faqNode = graph?.find((node) => node["@type"] === "FAQPage");

        if (faqNode && faqNode.mainEntity?.length) {
          for (const item of faqNode.mainEntity) {
            expect(markup).toContain(item.name);
          }
        }
      });

      it("contains internal links to matching service page and contact page", () => {
        expect(markup).toContain(`href="${target.serviceLink}"`);
        expect(markup).toContain(`href="${target.contactLink}"`);
      });

      it("contains link to companion guide in the other language", () => {
        expect(markup).toContain(`href="${target.companionPath}"`);
      });
    });
  }

  it("deepens the video editor vs videographer guide with raw footage handoff guidance", () => {
    const guide = getGuideBySlug("en", "video-editor-vs-videographer");

    expect(
      guide?.sections.some(
        (section) =>
          section.heading ===
          "How does the state of your raw footage change the role you should hire?",
      ),
    ).toBe(true);
    expect(
      guide?.faqs?.some(
        (faq) =>
          faq.question ===
          "How do I know if my existing footage is enough for editing?",
      ),
    ).toBe(true);

    const markup = renderToStaticMarkup(
      React.createElement(GuideDetailPage, { guide: guide! }),
    );

    expect(markup).toContain("Good editor handoff");
    expect(markup).toContain("Videographer need");
    expect(markup).toContain("Existing footage is usually enough");
  });
});

describe("Spanish niche page depth: reels-para-negocios-miami", () => {
  it("renders with substantive sections, FAQs, and portfolio links", async () => {
    const { SpanishNichePage } = await import("@/components/spanish-niche-page");
    const { getSpanishNichePage, buildSpanishNicheStructuredData } = await import(
      "@/lib/spanish-site"
    );

    const slug = "reels-para-negocios-miami";
    const page = getSpanishNichePage(slug);
    expect(page).toBeDefined();
    if (!page) return;

    const markup = renderToStaticMarkup(
      React.createElement(SpanishNichePage, { slug })
    );
    const visibleText = extractVisibleText(markup);
    const wordCount = countWords(visibleText);

    // High substantive depth (>= 800 words)
    expect(wordCount).toBeGreaterThanOrEqual(800);

    // Contains all 4 substantive section headings
    expect(page.sections).toBeDefined();
    expect(page.sections?.length).toBe(4);
    for (const section of page.sections ?? []) {
      expect(markup).toContain(section.heading);
    }

    // FAQ schema alignment: every FAQ in schema is in visible markup
    const structuredData = buildSpanishNicheStructuredData(page);
    const graph = structuredData["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
    }>;
    const faqNode = graph.find((node) => node["@type"] === "FAQPage");
    expect(faqNode).toBeDefined();
    expect(faqNode?.mainEntity?.length).toBeGreaterThanOrEqual(6);

    for (const faq of faqNode?.mainEntity ?? []) {
      expect(markup).toContain(faq.name);
      expect(markup).toContain(faq.acceptedAnswer.text);
    }

    // Internal links to published portfolio proof
    expect(markup).toContain('href="/es/portafolio/bar-door-monkey"');
    expect(markup).toContain('href="/es/portafolio/ml-colombia"');
    expect(markup).toContain('href="/es/areas#miami-dade"');
    expect(markup).toContain('href="/es/contacto"');

    // Internal links to related guides
    expect(markup).toContain('href="/es/guias/video-vertical-horizontal-y-zonas-seguras"');
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');
  });

  it("receives internal links from Spanish guides and site navigation", async () => {
    const { getGuides } = await import("@/lib/guides");
    const spanishGuides = getGuides("es");
    const linkingGuides = spanishGuides.filter((g) =>
      JSON.stringify(g.sections).includes("/es/reels-para-negocios-miami"),
    );

    // At least 4 guides contain contextual inbound links to reels-para-negocios-miami
    expect(linkingGuides.length).toBeGreaterThanOrEqual(4);

    const linkingSlugs = linkingGuides.map((g) => g.slug);
    expect(linkingSlugs).toContain("video-vertical-horizontal-y-zonas-seguras");
    expect(linkingSlugs).toContain("como-usar-instagram-reels-para-tu-negocio");
    expect(linkingSlugs).toContain("reels-vs-tiktok-vs-shorts-para-negocios-locales");
    expect(linkingSlugs).toContain("como-reutilizar-video-largo-en-reels");
    expect(linkingSlugs).toContain("mejores-estilos-de-subtitulos-para-reels");
  });
});

describe("Restaurant promo video editing internal links mesh", () => {
  it("renders multiple high-relevance English guides linking contextually to /services/restaurant-promo-video-editing-miami", async () => {
    const guideSlugs = [
      "video-content-ideas-for-restaurants",
      "how-to-use-instagram-reels-for-business",
      "how-to-repurpose-long-form-video-into-reels",
      "how-to-script-social-video-ads",
      "best-caption-styles-for-instagram-reels",
      "how-to-use-ai-for-product-photography",
    ];

    for (const slug of guideSlugs) {
      const guide = getGuideBySlug("en", slug);
      expect(guide).toBeDefined();
      if (!guide) continue;

      const markup = renderToStaticMarkup(
        React.createElement(GuideDetailPage, { guide }),
      );
      expect(markup).toContain(
        'href="/services/restaurant-promo-video-editing-miami"',
      );
    }
  });

  it("renders Spanish companion guides linking to /es/edicion-de-video-promocional-para-restaurantes-miami", async () => {
    const spanishGuideSlugs = [
      "ideas-de-contenido-de-video-para-restaurantes",
      "como-usar-instagram-reels-para-tu-negocio",
      "como-reutilizar-video-largo-en-reels",
      "como-escribir-guiones-para-anuncios-de-video",
      "mejores-estilos-de-subtitulos-para-reels",
      "como-usar-inteligencia-artificial-para-fotografia-de-producto",
    ];

    for (const slug of spanishGuideSlugs) {
      const guide = getGuideBySlug("es", slug);
      expect(guide).toBeDefined();
      if (!guide) continue;

      const markup = renderToStaticMarkup(
        React.createElement(GuideDetailPage, { guide }),
      );
      expect(markup).toContain(
        'href="/es/edicion-de-video-promocional-para-restaurantes-miami"',
      );
    }
  });

  it("renders restaurant-promo-video-editing-miami page with connected services, proof, guides, and tools", async () => {
    const { default: RestaurantPromoPage } = await import(
      "@/app/(english)/services/restaurant-promo-video-editing-miami/page"
    );

    const markup = renderToStaticMarkup(React.createElement(RestaurantPromoPage));

    expect(markup).toContain('href="/portfolio/bar-door-monkey"');
    expect(markup).toContain(
      'href="/services/ai-food-photography-restaurants"',
    );
    expect(markup).toContain(
      'href="/services/short-form-video-editor-miami"',
    );
    expect(markup).toContain(
      'href="/services/creative-video-production-wynwood"',
    );
    expect(markup).toContain(
      'href="/guides/video-content-ideas-for-restaurants"',
    );
    expect(markup).toContain(
      'href="/guides/how-to-use-instagram-reels-for-business"',
    );
    expect(markup).toContain('href="/calculator"');
    expect(markup).toContain('href="/contact"');
  });

  it("has bidirectional language route pairing for restaurant promo video editing", async () => {
    const { getPairedLanguageRoute } = await import("@/lib/language-routes");

    expect(
      getPairedLanguageRoute("/services/restaurant-promo-video-editing-miami"),
    ).toBe("/es/edicion-de-video-promocional-para-restaurantes-miami");

    expect(
      getPairedLanguageRoute(
        "/es/edicion-de-video-promocional-para-restaurantes-miami",
      ),
    ).toBe("/services/restaurant-promo-video-editing-miami");
  });
});

describe("Spanish niche page depth: video-para-restaurantes-miami", () => {
  it("renders with substantive sections, FAQs, and portfolio links", async () => {
    const { SpanishNichePage } = await import("@/components/spanish-niche-page");
    const { getSpanishNichePage, buildSpanishNicheStructuredData } = await import(
      "@/lib/spanish-site"
    );

    const slug = "video-para-restaurantes-miami";
    const page = getSpanishNichePage(slug);
    expect(page).toBeDefined();
    if (!page) return;

    const markup = renderToStaticMarkup(
      React.createElement(SpanishNichePage, { slug }),
    );
    const visibleText = extractVisibleText(markup);
    const wordCount = countWords(visibleText);

    // High substantive depth (>= 800 words)
    expect(wordCount).toBeGreaterThanOrEqual(800);

    // Contains all 4 substantive section headings
    expect(page.sections).toBeDefined();
    expect(page.sections?.length).toBe(4);
    for (const section of page.sections ?? []) {
      expect(markup).toContain(section.heading);
    }

    // FAQ schema alignment: every FAQ in schema is in visible markup
    const structuredData = buildSpanishNicheStructuredData(page);
    const graph = structuredData["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
    }>;
    const faqNode = graph.find((node) => node["@type"] === "FAQPage");
    expect(faqNode).toBeDefined();
    expect(faqNode?.mainEntity?.length).toBeGreaterThanOrEqual(6);

    for (const faq of faqNode?.mainEntity ?? []) {
      expect(markup).toContain(faq.name);
      expect(markup).toContain(faq.acceptedAnswer.text);
    }

    // Internal links to published portfolio proof
    expect(markup).toContain('href="/es/portafolio/bar-door-monkey"');
    expect(markup).toContain('href="/es/areas#miami-dade"');
    expect(markup).toContain('href="/es/contacto"');

    // Internal links to related guides & niche services
    expect(markup).toContain(
      'href="/es/guias/ideas-de-contenido-de-video-para-restaurantes"',
    );
    expect(markup).toContain(
      'href="/es/guias/video-vertical-horizontal-y-zonas-seguras"',
    );
    expect(markup).toContain(
      'href="/es/guias/entrega-para-edicion-remota-de-video"',
    );
    expect(markup).toContain('href="/es/reels-para-negocios-miami"');
    expect(markup).toContain(
      'href="/es/fotografia-de-comida-con-ia-restaurantes"',
    );
  });

  it("receives internal links from Spanish guides and site navigation", async () => {
    const { getGuides } = await import("@/lib/guides");
    const spanishGuides = getGuides("es");
    const linkingGuides = spanishGuides.filter((g) =>
      JSON.stringify(g.sections).includes("/es/video-para-restaurantes-miami"),
    );

    // At least 6 guides contain contextual inbound links to video-para-restaurantes-miami
    expect(linkingGuides.length).toBeGreaterThanOrEqual(6);

    const linkingSlugs = linkingGuides.map((g) => g.slug);
    expect(linkingSlugs).toContain(
      "ideas-de-contenido-de-video-para-restaurantes",
    );
    expect(linkingSlugs).toContain(
      "como-usar-inteligencia-artificial-para-fotografia-de-producto",
    );
    expect(linkingSlugs).toContain("como-usar-instagram-reels-para-tu-negocio");
    expect(linkingSlugs).toContain(
      "reels-vs-tiktok-vs-shorts-para-negocios-locales",
    );
    expect(linkingSlugs).toContain("como-reutilizar-video-largo-en-reels");
    expect(linkingSlugs).toContain(
      "estrategia-de-video-bilingue-south-florida",
    );
    expect(linkingSlugs).toContain(
      "como-seleccionar-broll-para-video-corporativo",
    );
    expect(linkingSlugs).toContain(
      "duracion-ideal-de-video-para-redes-sociales",
    );
    expect(linkingSlugs).toContain("mejores-estilos-de-subtitulos-para-reels");
    expect(linkingSlugs).toContain(
      "como-escribir-guiones-para-anuncios-de-video",
    );
  });

  it("resolves an English counterpart for the restaurant video page", async () => {
    const { getPairedLanguageRoute } = await import("@/lib/language-routes");

    expect(
      getPairedLanguageRoute("/es/video-para-restaurantes-miami"),
    ).toBe("/services/restaurant-promo-video-editing-miami");

    // The forward English -> Spanish direction stays owned by the canonical pair
    // shipped in #96. One English page cannot declare two Spanish counterparts,
    // so this page declares the Spanish -> English direction only.
    expect(
      getPairedLanguageRoute("/services/restaurant-promo-video-editing-miami"),
    ).toBe("/es/edicion-de-video-promocional-para-restaurantes-miami");
  });
});

