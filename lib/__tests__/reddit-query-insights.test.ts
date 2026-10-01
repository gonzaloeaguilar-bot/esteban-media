import { describe, expect, it } from "vitest";

import { redditQueryInsights } from "../reddit-query-insights";

describe("Reddit-sourced query insights", () => {
  it("covers Esteban's core remote and South Florida service intents", () => {
    expect(redditQueryInsights).toHaveLength(8);

    const corpus = JSON.stringify(redditQueryInsights);

    expect(corpus).toContain("monthly reels editing package");
    expect(corpus).toContain("paquete mensual de edicion de reels");
    expect(corpus).toContain("remote video editing handoff");
    expect(corpus).toContain("entrega para edicion remota de video");
    expect(corpus).toContain("AI product photography for ecommerce");
    expect(corpus).toContain("fotografia de producto con IA para ecommerce");
    expect(corpus).toContain("AI real estate photo enhancement");
    expect(corpus).toContain("mejora de fotos inmobiliarias con IA");
    expect(corpus).toContain("hire a remote YouTube video editor");
    expect(corpus).toContain("UGC video editor for ecommerce");
    expect(corpus).toContain("restaurant promo video editing Miami");
    expect(corpus).toContain("remote bilingual video editor");
  });

  it("keeps every insight sourced, bilingual, and internally linked", () => {
    for (const insight of redditQueryInsights) {
      expect(insight.sourceUrl).toMatch(/^https:\/\/www\.reddit\.com\//);
      expect(insight.sourceLabel).toMatch(/^r\//);
      expect(insight.audienceQuestion.en).toMatch(/\?/);
      expect(insight.audienceQuestion.es).toMatch(/\?/);
      expect(insight.contentAngle.en.length).toBeGreaterThan(100);
      expect(insight.contentAngle.es.length).toBeGreaterThan(100);
      expect(insight.keywordTargets).toHaveLength(3);
      expect(insight.internalLinks.length).toBeGreaterThanOrEqual(3);

      for (const link of insight.internalLinks) {
        expect(link.en).toMatch(/^\//);
        expect(link.es).toMatch(/^\/es\//);
      }
    }
  });
});
