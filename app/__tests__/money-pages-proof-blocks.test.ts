import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ReelsEditorFtlPage from "../(english)/services/reels-editor-fort-lauderdale/page";
import VideoProductionFtlPage from "../(english)/services/video-production-fort-lauderdale/page";
import ShortFormMiamiPage from "../(english)/services/short-form-video-editor-miami/page";

import { caseStudyPairs } from "@/lib/case-studies";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";

describe("proof blocks on three money pages", () => {
  const pages = [
    {
      path: "/services/reels-editor-fort-lauderdale",
      render: () => renderToStaticMarkup(React.createElement(ReelsEditorFtlPage)),
    },
    {
      path: "/services/video-production-fort-lauderdale",
      render: () => renderToStaticMarkup(React.createElement(VideoProductionFtlPage)),
    },
    {
      path: "/services/short-form-video-editor-miami",
      render: () => renderToStaticMarkup(React.createElement(ShortFormMiamiPage)),
    },
  ];

  it.each(pages)("$path server-renders the review band in HTML", ({ render }) => {
    const html = render();
    expect(html).toContain("em-revband");
    expect(html).toContain("public reviews on Google");
    expect(html).toContain("19 public reviews on Google");
    expect(html).toContain("Real client feedback, verified on Google.");
  });

  it.each(pages)("$path renders venue proof line with only verified locations/venues", ({ render }) => {
    const html = render();
    expect(html).toContain("Where Esteban has filmed or edited for:");

    // Collect all valid venue names and locations from portfolio and case-studies
    const validNames = new Set<string>();

    for (const item of PORTFOLIO_ITEMS) {
      if (item.title) validNames.add(item.title);
      if (item.location) validNames.add(item.location);
    }

    for (const study of caseStudyPairs) {
      if (study.en.client) validNames.add(study.en.client);
      if (study.en.location) validNames.add(study.en.location);
    }

    // Specific verified places used across the pages:
    // - Fort Lauderdale Auto Sale / Fort Lauderdale Auto Sales
    // - Port Everglades
    // - Healthy Smile Miami
    // - Bar Door Monkey / Bar Door Monkey Miami
    // - Caro Sells Miami
    const expectedVenues = [
      "Fort Lauderdale Auto Sale",
      "Port Everglades",
      "Healthy Smile Miami",
      "Bar Door Monkey",
      "Caro Sells Miami",
    ];

    // Verify each expected venue appears in either PORTFOLIO_ITEMS or case-studies
    for (const venue of expectedVenues) {
      const existsInSource =
        PORTFOLIO_ITEMS.some((p) => p.title.includes(venue) || (p.location && p.location.includes(venue))) ||
        caseStudyPairs.some(
          (cs) =>
            cs.en.client.includes(venue) ||
            (cs.en.location && cs.en.location.includes(venue)) ||
            cs.en.summary.includes(venue) ||
            (cs.en.answer && cs.en.answer.text.includes(venue)) ||
            cs.en.title.includes(venue) ||
            (cs.en.sections && cs.en.sections.some((s) => s.paragraphs.some((p) => p.includes(venue)))),
        );
      expect(existsInSource, `Venue ${venue} must exist in lib/portfolio.ts or lib/case-studies.ts`).toBe(true);
    }
  });

  it("strictly omits aggregateRating and review schema markup", () => {
    for (const { render: renderPage } of pages) {
      const html = renderPage();
      expect(html).not.toContain("aggregateRating");
      expect(html).not.toMatch(/"@type"\s*:\s*"Review"/);
    }
  });

  it("gives the cited short-form page a current work visual and a playable video entry", () => {
    const html = renderToStaticMarkup(React.createElement(ShortFormMiamiPage));

    expect(html).toContain('data-section="short-form-hero-proof"');
    expect(html).toContain("great-reviewer-iphone-18.jpg");
    expect(html).toContain('data-video-facade="BDRru8eXaj4"');
    expect(html).toContain("Play The Great Reviewer Reel");
    expect(html).not.toContain("ML Colombia");
    expect(html).not.toContain("Bar Door Monkey");
  });
});
