import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CaseStudyIndex } from "@/components/case-study-index";
import { CASE_STUDY_IDS, getCaseStudyPath } from "../case-studies";

/**
 * Every case study must be reachable from the portfolio index in both locales.
 *
 * Why this exists: PR #91 shipped five case studies and the portfolio grid
 * linked only four. The grid renders `getLiveYouTubePortfolioItems`, which
 * filters to `media.kind === "youtube"`, and `flas-concierge` is an image
 * entry — so its case study was reachable only from the sitemap. It was the
 * worst possible one to orphan: FLAS is the single client whose Google review
 * is published on the site.
 *
 * Measured on production before the fix: `/portfolio` and `/es/portafolio` each
 * linked 4 of 5.
 */
describe("case studies are not orphaned", () => {
  for (const locale of ["en", "es"] as const) {
    it(`links every case study from the ${locale} portfolio index`, () => {
      const markup = renderToStaticMarkup(
        React.createElement(CaseStudyIndex, { locale }),
      );

      for (const id of CASE_STUDY_IDS) {
        const path = getCaseStudyPath(id, locale);
        expect(
          markup.includes(`href="${path}"`),
          `${id} is not linked from the ${locale} portfolio index (${path})`,
        ).toBe(true);
      }
    });
  }

  it("does not depend on the grid's media filter", () => {
    // The regression was a media-kind filter silently excluding an entry. This
    // asserts the index is driven by the case-study list itself, so changing
    // how the grid filters portfolio media cannot orphan a case study again.
    const markup = renderToStaticMarkup(
      React.createElement(CaseStudyIndex, { locale: "en" }),
    );
    const linkCount = (markup.match(/href="\/case-studies\//g) ?? []).length;
    expect(linkCount).toBe(CASE_STUDY_IDS.length);
  });
});
