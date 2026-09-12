import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import RestaurantPromoPage from "../(english)/services/restaurant-promo-video-editing-miami/page";
import { SpanishNichePage } from "@/components/spanish-niche-page";
import { buildSpanishNicheStructuredData, getSpanishNichePage } from "@/lib/spanish-site";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function wordCount(markup: string) {
  return markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

describe("restaurant promo page depth and FAQ schema", () => {
  it("renders substantive English restaurant editing guidance with FAQPage parity", () => {
    const markup = renderToStaticMarkup(React.createElement(RestaurantPromoPage));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(900);
    expect(markup).toContain("9:16 and 1:1");
    expect(markup).toContain("client-supplied footage");
    expect(markup).toContain("without claiming a guaranteed reservation result");
    expect(markup).toContain('href="/portfolio"');
    expect(markup).toContain('href="/guides/remote-video-editing-handoff"');
    expect(markup).toContain('href="/contact"');
    expect(markup).toContain('"@type":"FAQPage"');
    expect(markup).toContain("What footage can a restaurant provide for promo video editing?");
  });

  it("keeps Spanish restaurant FAQPage questions and answers visible", () => {
    const slug = "edicion-de-video-promocional-para-restaurantes-miami";
    const page = getSpanishNichePage(slug);
    expect(page).toBeDefined();
    if (!page) return;
    const markup = renderToStaticMarkup(React.createElement(SpanishNichePage, { slug }));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(900);
    expect(markup).toContain("sin prometer un resultado de reservas");
    expect(page.sections).toHaveLength(4);
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');
    expect(markup).toContain('href="/es/contacto"');
    const graph = buildSpanishNicheStructuredData(page)["@graph"] as Array<{ "@type": string; mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }> }>;
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    expect(faq?.mainEntity).toHaveLength(5);
    for (const item of faq?.mainEntity ?? []) {
      expect(markup).toContain(item.name);
      expect(markup).toContain(item.acceptedAnswer.text);
    }
  });
});
