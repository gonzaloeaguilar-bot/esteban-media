import { describe, expect, it } from "vitest";

import {
  googleReviews,
  googleReviewSnapshot,
  reviewSourceUrl,
} from "../client-reviews";
import { localBusinessEntityJsonLd, personEntityJsonLd } from "../entity-schema";
import { PORTFOLIO_ITEMS } from "../portfolio";
import { site } from "../site";

describe("published client reviews", () => {
  it("publishes the verbatim Google reviews the operator asked to surface", () => {
    // The band used to show one gated quote out of eleven. The operator asked
    // for the public reviews themselves (2026-10-10); the six whose full text
    // has been read at the source run, attributed to Google and linked there.
    expect(googleReviews.map((review) => review.author)).toEqual([
      "Caro Suarez",
      "Dawid Scierka",
      "Fort Lauderdale Auto Sales",
      "Alejandro Navarro",
      "Die Coro",
      "andres otero",
    ]);
  });

  it("cross-links a project only when the reviewer's work is published", () => {
    // portfolioId is now an OPTIONAL cross-link, not a gate: a review may run
    // without one, but any portfolioId that IS present must name a real,
    // published project — this is still what stops an invented client.
    const publishedIds = new Set(PORTFOLIO_ITEMS.map((item) => item.id));

    for (const review of googleReviews) {
      if (review.portfolioId === undefined) continue;
      expect(
        publishedIds.has(review.portfolioId),
        `${review.author} points at unpublished project "${review.portfolioId}"`,
      ).toBe(true);
    }

    const flas = googleReviews.find(
      (review) => review.author === "Fort Lauderdale Auto Sales",
    );
    expect(flas?.portfolioId).toBe("flas-concierge");
  });

  it("carries the provenance needed to check every quote at the source", () => {
    for (const review of googleReviews) {
      expect(review.author.trim()).not.toBe("");
      expect(review.quote.trim()).not.toBe("");
      expect(review.rating).toBe(5);
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
      readAt: "2026-10-08",
      sourceCommand: "python3 ~/.claude/durable/esteban-review-watch.py --json",
    });
    // The Places API sample is a rotating ~5-review window, not a roster, so
    // this is PROVENANCE — who was in the latest read, names exactly as
    // Google publishes them — and the UI may only present it as that.
    expect(googleReviewSnapshot.sampledAuthors).toEqual([
      "Dawid Scierka",
      "Caro Suarez",
      "Die Coro",
      "andres otero",
      "Alejandro Navarro",
    ]);
  });

  it("reproduces the Google review text verbatim, typos included", () => {
    // The quotes as the Places API returns them. Cleaning up "hes" or the
    // missing punctuation would make them a paraphrase we authored, which is
    // exactly what a testimonial must never be.
    const flas = googleReviews.find(
      (review) => review.author === "Fort Lauderdale Auto Sales",
    );
    expect(flas?.quote).toBe(
      "Esteban has done great Media work for our company i highly recommend him for any project you have hes highly knowledgeable and very detail oriented",
    );

    const caro = googleReviews.find(
      (review) => review.author === "Caro Suarez",
    );
    // Paragraph breaks preserved: this is the real-estate proof the niche is
    // starving for, and it must not be flattened into one run-on sentence.
    expect(caro?.quote).toContain(
      "real estate photography and videography needs",
    );
    expect(caro?.quote).toContain("\n\n");
  });

  it("still refuses to assert a rating about the business in markup", () => {
    // Publishing more quotes does not change reference-no-self-serving-aggregaterating.
    // The stars in the UI are attributed to Google and linked to the source;
    // structured data stays silent about the rating.
    expect(localBusinessEntityJsonLd).not.toHaveProperty("aggregateRating");
    expect(localBusinessEntityJsonLd).not.toHaveProperty("review");
    expect(personEntityJsonLd).not.toHaveProperty("aggregateRating");
    expect(personEntityJsonLd).not.toHaveProperty("review");
  });
});
