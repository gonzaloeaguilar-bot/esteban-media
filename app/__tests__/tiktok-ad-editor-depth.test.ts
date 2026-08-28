import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import TiktokAdEditorPage from "../(english)/services/tiktok-ad-video-editor-miami/page";
import { SpanishNichePage } from "@/components/spanish-niche-page";
import { buildSpanishNicheStructuredData, getSpanishNichePage } from "@/lib/spanish-site";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function wordCount(markup: string) {
  return markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

describe("TikTok ad video editor page depth and FAQ schema", () => {
  it("renders substantive English TikTok ad editing guidance with FAQPage parity", () => {
    const markup = renderToStaticMarkup(React.createElement(TiktokAdEditorPage));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(800);
    expect(markup).toContain("9:16 &amp; 4:5 crops");
    expect(markup).toContain("client-supplied footage");
    expect(markup).toContain('href="/portfolio"');
    expect(markup).toContain('href="/guides/remote-video-editing-handoff"');
    expect(markup).toContain('href="/guides/how-to-use-instagram-reels-for-business"');
    expect(markup).toContain('href="/contact"');
    expect(markup).toContain('"@type":"FAQPage"');
    expect(markup).toContain("What raw footage should I provide for TikTok ad video editing?");
    expect(markup).toContain("Do you provide multiple hook variations for creative testing?");
  });

  it("keeps Spanish TikTok ad editing FAQPage questions and answers visible", () => {
    const slug = "editor-de-video-para-anuncios-de-tiktok-miami";
    const page = getSpanishNichePage(slug);
    expect(page).toBeDefined();
    if (!page) return;
    const markup = renderToStaticMarkup(React.createElement(SpanishNichePage, { slug }));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(800);
    expect(page.sections).toHaveLength(4);
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');
    expect(markup).toContain('href="/es/guias/reels-vs-tiktok-vs-shorts-para-negocios-locales"');
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
