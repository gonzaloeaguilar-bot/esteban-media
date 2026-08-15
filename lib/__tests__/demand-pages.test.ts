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
    requiredPhrase: "No existe una tarifa única responsable",
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

