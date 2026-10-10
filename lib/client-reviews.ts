import { site } from "@/lib/site";

import googleReviewsData from "@/data/google-reviews.json";

/**
 * Reviews published on Esteban's verified Google Business Profile.
 *
 * The DATA lives in data/google-reviews.json, written by
 * scripts/sync-google-reviews.mjs (`pnpm reviews:sync`). The script can only
 * ever update counts, the sampled-reviewer names, and the read date of a
 * quote it can verify verbatim at the source — it never authors text, so
 * nothing here can drift into a paraphrase.
 *
 * Provenance rules, enforced by lib/__tests__/client-reviews.test.ts:
 *
 * 1. Every entry is a VERBATIM quote read from the profile via the Places API,
 *    never paraphrased and never written for the client.
 * 2. `portfolioId` must name a project already published in lib/portfolio.ts.
 *    A reviewer with no published project is not a verifiable client, and
 *    AGENTS.md forbids inventing clients. Friends and family of the operator
 *    are excluded by that rule alone — the published-work requirement is what
 *    makes it mechanical instead of a judgement call.
 * 3. The rating is shown as attributed prose next to a link to the source. It
 *    is never emitted as `aggregateRating` JSON-LD; a rating collected on
 *    Google and asserted here about ourselves is self-serving markup.
 *
 * COUNT: 11 reviews at 5.0 as of 2026-10-08, read live from the public
 * profile with `python3 ~/.claude/durable/esteban-review-watch.py --json`.
 * The Places API returns a rotating sample of ~5 reviews per call (verified
 * 2026-08-14: two calls minutes apart returned different fives), so
 * `sampledAuthors` is who happened to be in the latest sample — it is a
 * provenance record, not a roster. Only quotes that clear rule 2 are
 * published below; that gap is a CONTENT decision, not a bug. Add more when
 * a reviewer's work is published in lib/portfolio.ts, not before.
 */

export type ClientReview = {
  /** Reviewer name exactly as Google publishes it. */
  author: string;
  /** Verbatim review text. Never edited for length or tone. */
  quote: string;
  /** Publish time reported by the Places API. */
  publishedAt: string;
  /** Matching project id in lib/portfolio.ts. */
  portfolioId: string;
  /** ISO date this quote was last read at the source. */
  readAt: string;
};

export type GoogleReviewSnapshot = {
  rating: number;
  reviewCount: number;
  sampledReviews: number;
  readAt: string;
  sourceCommand: string;
  /** Reviewer display names in the latest Places API sample. */
  sampledAuthors: string[];
};

export const googleReviewSnapshot: GoogleReviewSnapshot = {
  rating: googleReviewsData.profile.rating,
  reviewCount: googleReviewsData.profile.reviewCount,
  sampledReviews: googleReviewsData.profile.reviewsSampled,
  readAt: googleReviewsData.readAt,
  sourceCommand: googleReviewsData.sourceCommand,
  sampledAuthors: [...googleReviewsData.sampledAuthors],
};

export const clientReviews: ClientReview[] = googleReviewsData.quotes.map(
  (quote) => ({
    author: quote.author,
    quote: quote.quote,
    publishedAt: quote.publishedAt,
    portfolioId: quote.portfolioId,
    readAt: quote.readAt,
  }),
);

/** Where a reader can verify every quote above. */
export const reviewSourceUrl = site.googleBusinessProfile;

export const reviewSourceLabel = {
  en: "Read on Google",
  es: "Ver en Google",
} as const;
