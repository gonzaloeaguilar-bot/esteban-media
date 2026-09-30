import { describe, expect, it } from "vitest";

import {
  clientReviews,
  googleReviewSnapshot,
  reviewSourceUrl,
} from "../client-reviews";
import { localBusinessEntityJsonLd, personEntityJsonLd } from "../entity-schema";
import { PORTFOLIO_ITEMS } from "../portfolio";
import { site } from "../site";

describe("published client reviews", () => {
  it("only quotes reviewers whose work is already published in the portfolio", () => {
    // AGENTS.md: never invent clients. The mechanical form of that rule is that
    // a quote may only run if the reviewer's project is on the site already.
    //
    // This is the gate that keeps the operator's friends and family off a
    // client's public page. The profile took 7 ratings on 2026-08-14; several
    // came from people with no published project here, and they stay out.
    const publishedIds = new Set(PORTFOLIO_ITEMS.map((item) => item.id));

    expect(clientReviews.length).toBeGreaterThan(0);
    for (const review of clientReviews) {
      expect(
        publishedIds.has(review.portfolioId),
        `${review.author} has no published project (portfolioId "${review.portfolioId}")`,
      ).toBe(true);
    }
  });

  it("carries the provenance needed to check every quote at the source", () => {
    for (const review of clientReviews) {
      expect(review.author.trim()).not.toBe("");
      expect(review.quote.trim()).not.toBe("");
      // A quote with no read date cannot be re-verified, and a review that
      // Google later filters would otherwise sit here unnoticed.
      expect(review.readAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(review.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(reviewSourceUrl).toBe(site.googleBusinessProfile);
  });

  it("publishes only the live Google profile snapshot, not unsourced review markup", () => {
    expect(googleReviewSnapshot).toMatchObject({
      rating: 5,
      reviewCount: 11,
      sampledReviews: 5,
      readAt: "2026-09-30",
      sourceCommand: "python3 ~/.claude/durable/esteban-review-watch.py --json",
    });
  });

  it("reproduces the Google review text verbatim, typos included", () => {
    // The one published quote as the Places API returns it. Cleaning up "hes"
    // or the missing punctuation would make it a paraphrase we authored, which
    // is exactly what a testimonial must never be.
    const flas = clientReviews.find(
      (review) => review.author === "Fort Lauderdale Auto Sales",
    );

    expect(flas?.quote).toBe(
      "Esteban has done great Media work for our company i highly recommend him for any project you have hes highly knowledgeable and very detail oriented",
    );
  });

  it("still refuses to assert a rating about the business in markup", () => {
    // Publishing quotes does not change reference-no-self-serving-aggregaterating.
    // The stars in the UI are attributed to Google and linked to the source;
    // structured data stays silent about the rating.
    expect(localBusinessEntityJsonLd).not.toHaveProperty("aggregateRating");
    expect(localBusinessEntityJsonLd).not.toHaveProperty("review");
    expect(personEntityJsonLd).not.toHaveProperty("aggregateRating");
    expect(personEntityJsonLd).not.toHaveProperty("review");
  });
});
