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
});
