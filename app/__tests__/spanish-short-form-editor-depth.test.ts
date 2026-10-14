import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { SpanishNichePage } from "@/components/spanish-niche-page";
import { buildSpanishNicheStructuredData, getSpanishNichePage } from "@/lib/spanish-site";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function wordCount(markup: string) {
  return markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

describe("Spanish short-form video editor page depth and FAQ schema", () => {
  it("renders substantive Spanish short-form video editing guidance with FAQPage parity", () => {
    const slug = "editor-de-video-corto-para-redes-miami";
    const page = getSpanishNichePage(slug);
    expect(page).toBeDefined();
    if (!page) return;

    const markup = renderToStaticMarkup(React.createElement(SpanishNichePage, { slug }));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(800);
    expect(page.sections).toHaveLength(4);
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');
    expect(markup).toContain('href="/es/guias/editor-de-video-freelance-vs-agencia-de-postproduccion"');
    expect(markup).toContain('href="/es/contacto"');

    const graph = buildSpanishNicheStructuredData(page)["@graph"] as Array<{
      "@type": string;
      mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
    }>;
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    expect(faq?.mainEntity).toHaveLength(5);
    for (const item of faq?.mainEntity ?? []) {
      expect(markup).toContain(item.name);
      expect(markup).toContain(item.acceptedAnswer.text);
    }
  });
});
