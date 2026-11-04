import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import WebinarClipEditingServicePage from "../(english)/services/webinar-clip-editing-service/page";
import ProductDemoVideoMiamiPage from "../(english)/services/product-demo-video-production-miami/page";
import AmazonProductVideoMiamiPage from "../(english)/services/amazon-product-video-production-miami/page";
import CrowdfundingVideoEditorMiamiPage from "../(english)/services/crowdfunding-video-editor-miami/page";
import UGCAdVariationVideoEditingPage from "../(english)/services/ugc-ad-variation-video-editing/page";
import VideoPodcastEditingServiceMiamiPage from "../(english)/services/video-podcast-editing-service-miami/page";
import ExecutiveInterviewVideographerMiamiPage from "../(english)/services/executive-interview-videographer-miami/page";
import VideoProductionDoralPage from "../(english)/services/video-production-doral-miami/page";
import ReelsEditorFortLauderdalePage from "../(english)/services/reels-editor-fort-lauderdale/page";
import WebinarClipsSpanishPage from "../(spanish)/es/edicion-de-clips-para-webinars/page";
import UGCAdVariationsSpanishPage from "../(spanish)/es/edicion-de-variaciones-de-anuncios-ugc/page";
import PodcastVideoSpanishPage from "../(spanish)/es/edicion-de-video-podcast-miami/page";
import CrowdfundingSpanishPage from "../(spanish)/es/editor-de-video-para-campanas-de-crowdfunding/page";
import ReelsFortLauderdaleSpanishPage from "../(spanish)/es/editor-de-reels-fort-lauderdale/page";
import ExecutiveInterviewSpanishPage from "../(spanish)/es/videografo-para-entrevistas-ejecutivas-miami/page";
import AmazonProductSpanishPage from "../(spanish)/es/video-para-productos-de-amazon-miami/page";
import ProductDemoSpanishPage from "../(spanish)/es/video-de-demostracion-de-producto-miami/page";
import DoralSpanishPage from "../(spanish)/es/produccion-de-video-doral-miami/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("niche-specific answer-first openers on 8 service pages", () => {
  const pages = [
    { name: "webinar-clip-editing-service", Component: WebinarClipEditingServicePage },
    { name: "product-demo-video-production-miami", Component: ProductDemoVideoMiamiPage },
    { name: "amazon-product-video-production-miami", Component: AmazonProductVideoMiamiPage },
    { name: "crowdfunding-video-editor-miami", Component: CrowdfundingVideoEditorMiamiPage },
    { name: "ugc-ad-variation-video-editing", Component: UGCAdVariationVideoEditingPage },
    { name: "video-podcast-editing-service-miami", Component: VideoPodcastEditingServiceMiamiPage },
    { name: "executive-interview-videographer-miami", Component: ExecutiveInterviewVideographerMiamiPage },
    { name: "video-production-doral-miami", Component: VideoProductionDoralPage },
  ];

  const genericPrefix =
    "Esteban Moreno Media is a Fort Lauderdale-based service-area business run by Esteban Moreno";

  it("renders distinct niche-specific answer-first openers for all 8 pages", () => {
    const openers: string[] = [];

    for (const { name, Component } of pages) {
      const html = renderToStaticMarkup(React.createElement(Component));

      // Extract the paragraph inside the answer-first section
      const match = html.match(
        /<section[^>]*data-section="answer-first"[^>]*>[\s\S]*?<p[^>]*class="[^"]*text-base[^"]*"[^>]*>([\s\S]*?)<\/p>/,
      );
      expect(match, `Opener paragraph not found on page ${name}`).toBeTruthy();

      const opener = match![1].trim();
      const words = opener.split(/\s+/).filter(Boolean);

      // Verify word count is between 100 and 180 words
      expect(words.length, `Word count for ${name} should be between 100 and 180`).toBeGreaterThanOrEqual(100);
      expect(words.length, `Word count for ${name} should be between 100 and 180`).toBeLessThanOrEqual(180);

      // Verify it does NOT start with the generic boilerplate
      expect(opener).not.toContain(genericPrefix);

      // Verify uniqueness across the 8 pages
      expect(openers).not.toContain(opener);
      openers.push(opener);
    }

    expect(new Set(openers).size).toBe(8);
  });

  it("verifies specific required content across individual niche pages", () => {
    // Webinar page
    const webinarHtml = renderToStaticMarkup(React.createElement(WebinarClipEditingServicePage));
    expect(webinarHtml).toContain("LinkedIn");
    expect(webinarHtml).toContain('href="/services/executive-linkedin-video-series-miami"');
    expect(webinarHtml).not.toContain("Healthy Smile");
    expect(webinarHtml).toContain('href="/portfolio"');

    // Product demo page
    const productDemoHtml = renderToStaticMarkup(React.createElement(ProductDemoVideoMiamiPage));
    const productDemoProofCard = productDemoHtml.match(/<div class="rounded-lg border[^>]*>[\s\S]*?What product demonstration proof is available[\s\S]*?<\/div>/);
    expect(productDemoProofCard, "Product demo proof card should exist").toBeTruthy();
    expect(productDemoProofCard![0]).not.toContain("Bar Door Monkey");
    expect(productDemoProofCard![0]).toContain('href="/portfolio"');

    // Executive interview page
    const execInterviewHtml = renderToStaticMarkup(React.createElement(ExecutiveInterviewVideographerMiamiPage));
    expect(execInterviewHtml).toContain("$125 per hour");

    // Doral page
    const doralHtml = renderToStaticMarkup(React.createElement(VideoProductionDoralPage));
    expect(doralHtml).toContain("on site at your Doral facility");
    expect(doralHtml).toContain("video editing is handled remotely");
    expect(doralHtml).toContain("agreed project by project from Esteban&#x27;s base in Fort Lauderdale");
  });

  it("renders distinct Spanish answer-first openers for the 8 paired niche pages", () => {
    const pages = [
      { name: "webinars", Component: WebinarClipsSpanishPage },
      { name: "product-demo", Component: ProductDemoSpanishPage },
      { name: "amazon", Component: AmazonProductSpanishPage },
      { name: "crowdfunding", Component: CrowdfundingSpanishPage },
      { name: "ugc", Component: UGCAdVariationsSpanishPage },
      { name: "podcast", Component: PodcastVideoSpanishPage },
      { name: "executive-interview", Component: ExecutiveInterviewSpanishPage },
      { name: "doral", Component: DoralSpanishPage },
    ];
    const genericPrefix = "Esteban Moreno Media es un negocio de servicio con base en Fort Lauderdale";
    const openers: string[] = [];

    for (const { name, Component } of pages) {
      const html = renderToStaticMarkup(React.createElement(Component));
      const match = html.match(
        /<section[^>]*data-section="en-corto"[^>]*>[\s\S]*?<p[^>]*class="[^"]*text-base[^"]*"[^>]*>([\s\S]*?)<\/p>/,
      );
      expect(match, `Opener paragraph not found on Spanish page ${name}`).toBeTruthy();

      const opener = match![1].trim();
      const words = opener.split(/\s+/).filter(Boolean);
      expect(words.length, `Word count for Spanish ${name} should be between 100 and 180`).toBeGreaterThanOrEqual(100);
      expect(words.length, `Word count for Spanish ${name} should be between 100 and 180`).toBeLessThanOrEqual(180);
      expect(opener).not.toContain(genericPrefix);
      expect(openers).not.toContain(opener);
      openers.push(opener);
    }

    expect(new Set(openers).size).toBe(8);
  });

  it("renders the required Esteban, Fort Lauderdale, and Instagram Reels sentence on both Reels pages", () => {
    const englishHtml = renderToStaticMarkup(React.createElement(ReelsEditorFortLauderdalePage));
    const spanishHtml = renderToStaticMarkup(React.createElement(ReelsFortLauderdaleSpanishPage));

    expect(englishHtml).toContain("Esteban Moreno Media provides Instagram Reels editing for Fort Lauderdale businesses.");
    expect(spanishHtml).toContain("Esteban Moreno Media ofrece edición de Instagram Reels para negocios en Fort Lauderdale.");
  });
});
