/**
 * /areas must route service queries to the dedicated pages, not answer them.
 *
 * GSC 2026-07-26..10-22 (property https://estebanmorenomedia.com/):
 *   "restaurant promo video editing miami"  /areas 6.2 vs the restaurant page 7.2
 *   "editor de reels fort lauderdale"       /areas 50.7, /es 40.5, dedicated ES page 57.0
 *   "ugc video editor fort lauderdale"      /areas 14.7; the UGC page never said Fort Lauderdale
 * and both /areas pages failed scripts/dual-audience-gate.mjs (0 sections in
 * the 100-180 band, the 835/2,160-word link directory over 250).
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EnglishAreasPage from "../(english)/areas/page";
import SpanishAreasPage from "../(spanish)/es/areas/page";
import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import { SpanishServiceLandingDirectory } from "@/components/spanish-service-landing-directory";
import { UGC_ECOMMERCE_DEPTH } from "@/lib/service-depth-content";
import { spanishNichePages } from "@/lib/spanish-site";
// The gate is the measurement; the test reuses it instead of re-deriving it.
import { analyse, verdict } from "../../scripts/dual-audience-gate.mjs";

const strip = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const words = (s: string) => strip(s).split(" ").filter(Boolean).length;

/** Word count under each h2/h3 heading, the same split the gate uses. */
function sections(html: string) {
  const parts = html.split(/<h([23])[^>]*>/i);
  const out: Array<{ heading: string; words: number }> = [];
  for (let i = 1; i < parts.length; i += 2) {
    const chunk = parts[i + 1];
    out.push({ heading: strip(chunk.split(/<\/h[23]>/i)[0]), words: words(chunk) });
  }
  return out;
}

const EN = renderToStaticMarkup(React.createElement(EnglishAreasPage));
const ES = renderToStaticMarkup(React.createElement(SpanishAreasPage));

const EXACT_ANCHORS_EN: Array<[string, string]> = [
  ["/services/reels-editor-fort-lauderdale", "Reels editor in Fort Lauderdale"],
  ["/services/ugc-video-editor-ecommerce", "UGC video editor for e-commerce brands"],
  ["/services/restaurant-promo-video-editing-miami", "restaurant promo video editing in Miami"],
  ["/services/reels-editor-miami", "Reels editor in Miami"],
  ["/services/short-form-video-editor-miami", "short-form video editor in Miami"],
  ["/services/video-production-fort-lauderdale", "video production in Fort Lauderdale"],
];
const EXACT_ANCHORS_ES: Array<[string, string]> = [
  ["/es/editor-de-reels-fort-lauderdale", "editor de Reels en Fort Lauderdale"],
  ["/es/editor-de-video-ugc-para-ecommerce", "editor de video UGC para e-commerce"],
  ["/es/edicion-de-video-promocional-para-restaurantes-miami", "edición de video promocional para restaurantes en Miami"],
  ["/es/editor-de-reels-miami", "editor de Reels en Miami"],
  ["/es/editor-de-video-miami", "editor de video en Miami"],
];

describe("/areas routes service queries to the dedicated pages", () => {
  it.each([
    ["en", EN, EXACT_ANCHORS_EN],
    ["es", ES, EXACT_ANCHORS_ES],
  ] as const)("%s: each area block links the dedicated page with exact anchor text", (_l, html, anchors) => {
    for (const [href, label] of anchors) {
      const re = new RegExp(`<a[^>]*href="${href.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}"[^>]*>${label}</a>`, "u");
      expect(html, `${href} with anchor "${label}"`).toMatch(re);
    }
  });

  it.each([
    ["en", EN, /^(What does Esteban edit|Which Broward cities|What Miami-Dade projects|Is Palm Beach County part)/],
    ["es", ES, /^¿(Qué edita y graba|Qué ciudades de Broward|Qué proyectos toma|Palm Beach County forma parte)/],
  ] as const)("%s: every area block is a question-headed section in the 100-180 word band", (_l, html, areaQuestion) => {
    const blocks = sections(html).filter((s) => areaQuestion.test(s.heading));
    expect(blocks).toHaveLength(4);
    for (const b of blocks) {
      expect(b.heading.endsWith("?"), b.heading).toBe(true);
      expect(b.words, b.heading).toBeGreaterThanOrEqual(100);
      expect(b.words, b.heading).toBeLessThanOrEqual(180);
    }
  });

  it.each([
    ["en", EN],
    ["es", ES],
  ])("%s: the areas hub passes the dual-audience gate on its rendered markup", (_l, html) => {
    expect(verdict(analyse(html))).toEqual([]);
  });

  it("the area blocks never quote a price (they route, they do not answer)", () => {
    expect(EN.match(/\$\d+/g) ?? []).toEqual([]);
    expect(ES.match(/\$\d+/g) ?? []).toEqual([]);
  });
});

describe("the service directories stay measurable", () => {
  it.each([
    ["en", renderToStaticMarkup(React.createElement(ServiceLandingDirectory))],
    ["es", renderToStaticMarkup(React.createElement(SpanishServiceLandingDirectory))],
  ])("%s: no directory group runs past 250 words", (_l, html) => {
    const groups = sections(html).filter((s) => s.words > 0);
    expect(groups.length).toBeGreaterThanOrEqual(8);
    for (const g of groups) expect(g.words, g.heading).toBeLessThanOrEqual(250);
  });
});

describe("the UGC page answers the Fort Lauderdale question", () => {
  it("English FAQ names Fort Lauderdale in a 100-180 word answer", () => {
    const faq = UGC_ECOMMERCE_DEPTH.faqs.find((f) => /Fort Lauderdale/.test(f.question));
    expect(faq).toBeDefined();
    const n = words(`${faq!.question} ${faq!.answer}`);
    expect(n).toBeGreaterThanOrEqual(100);
    expect(n).toBeLessThanOrEqual(180);
    expect(faq!.answer).not.toMatch(/\$\d/);
  });

  it("Spanish FAQ names Fort Lauderdale in a 100-180 word answer", () => {
    const page = spanishNichePages.find((p) => p.slug === "editor-de-video-ugc-para-ecommerce");
    const faq = page?.faqs.find((f) => /Fort Lauderdale/.test(f.question));
    expect(faq).toBeDefined();
    const n = words(`${faq!.question} ${faq!.answer}`);
    expect(n).toBeGreaterThanOrEqual(100);
    expect(n).toBeLessThanOrEqual(180);
    expect(faq!.answer).not.toMatch(/\$\d/);
  });
});
