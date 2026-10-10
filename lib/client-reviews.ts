import { site } from "@/lib/site";

import googleReviewsData from "@/data/google-reviews.json";

/**
 * Reviews published on Esteban's verified Google Business Profile.
 *
 * The DATA lives in data/google-reviews.json, written by
 * scripts/sync-google-reviews.mjs (`pnpm reviews:sync`). The script can only
 * ever update counts, the sampled-reviewer names, the read date, and the
 * `readAt` of a review it can verify verbatim at the source — it never
 * authors text, so nothing here can drift into a paraphrase.
 *
 * Provenance rules, enforced by lib/__tests__/client-reviews.test.ts:
 *
 * 1. Every entry is a VERBATIM quote read from the profile via the Places API,
 *    never paraphrased and never written for the client. Typos ("hes", the
 *    missing punctuation) are reproduced on purpose: cleaning them up would
 *    make the testimonial something we authored.
 * 2. Reviews are presented as GOOGLE reviews — attributed to the reviewer,
 *    dated, and linked to the profile where a reader can verify them — which
 *    is what they are. `portfolioId` is an OPTIONAL cross-link: when a
 *    reviewer's work is also published in lib/portfolio.ts (e.g. Fort
 *    Lauderdale Auto Sales → flas-concierge) the card may link across to it.
 *    A reviewer without a published project is not a verifiable client and
 *    gets no cross-link, but their review still ran on the public profile and
 *    is reproduced as attributed Google content, not as a claimed client.
 *
 *    HISTORY: this used to require a published `portfolioId` before ANY quote
 *    could run, which left the band showing one review out of eleven. The
 *    operator asked for the public reviews to be shown (2026-10-10) and the
 *    gate was relaxed to the honest form above. What it still refuses is the
 *    thing it was really protecting: inventing clients, editing quotes, or
 *    dressing a volunteer/peer review up as paid work.
 * 3. The rating is shown as attributed prose next to a link to the source. It
 *    is never emitted as `aggregateRating` JSON-LD; a rating collected on
 *    Google and asserted here about ourselves is self-serving markup.
 *
 * COUNT: 11 reviews at 5.0 as of 2026-10-08, read live from the public
 * profile with `python3 ~/.claude/durable/esteban-review-watch.py --json`.
 * The Places API returns a rotating sample of ~5 reviews per call (verified
 * 2026-08-14: two calls minutes apart returned different fives), so
 * `sampledAuthors` is who happened to be in the latest sample — it is a
 * provenance record, not a roster. `reviews` is the set whose full text has
 * been read at the source (6 of 11 today); the remaining five can only be
 * copied by hand from the profile.
 */

export type GoogleReview = {
  /** Reviewer name exactly as Google publishes it. */
  author: string;
  /** Star rating as published. */
  rating: number;
  /** Verbatim review text. Never edited for length, tone, or typos. */
  quote: string;
  /** Publish time reported by the Places API. */
  publishedAt: string;
  /** ISO date this quote was last read at the source. */
  readAt: string;
  /** Optional cross-link to a matching project id in lib/portfolio.ts. */
  portfolioId?: string;
};

/** @deprecated Use GoogleReview. Kept as an alias while imports migrate. */
export type ClientReview = GoogleReview;

export type GoogleReviewSnapshot = {
  rating: number;
  reviewCount: number;
  sampledReviews: number;
  readAt: string;
  sourceCommand: string;
  /** Reviewer display names in the latest Places API sample. */
  sampledAuthors: string[];
};

/**
 * The shape of data/google-reviews.json. The JSON import is narrowed through
 * this type rather than read structurally, because the file's `reviews` array
 * is heterogeneous (`portfolioId` appears on only some entries) and a raw
 * inferred union would make `review.portfolioId` a type error.
 */
type GoogleReviewsFile = {
  $comment: string;
  readAt: string;
  sourceCommand: string;
  profile: { rating: number; reviewCount: number; reviewsSampled: number };
  sampledAuthors: string[];
  reviews: GoogleReview[];
};

const googleReviewsFile = googleReviewsData as GoogleReviewsFile;

export const googleReviewSnapshot: GoogleReviewSnapshot = {
  rating: googleReviewsFile.profile.rating,
  reviewCount: googleReviewsFile.profile.reviewCount,
  sampledReviews: googleReviewsFile.profile.reviewsSampled,
  readAt: googleReviewsFile.readAt,
  sourceCommand: googleReviewsFile.sourceCommand,
  sampledAuthors: [...googleReviewsFile.sampledAuthors],
};

export const googleReviews: GoogleReview[] = googleReviewsFile.reviews.map(
  (review) => ({
    author: review.author,
    rating: review.rating,
    quote: review.quote,
    publishedAt: review.publishedAt,
    readAt: review.readAt,
    ...(review.portfolioId ? { portfolioId: review.portfolioId } : {}),
  }),
);

/** Where a reader can verify every quote above. */
export const reviewSourceUrl = site.googleBusinessProfile;

export const reviewSourceLabel = {
  en: "Read on Google",
  es: "Ver en Google",
} as const;
