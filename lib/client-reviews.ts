import { site } from "@/lib/site";

/**
 * Reviews published on Esteban's verified Google Business Profile.
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
 * The profile received 7 ratings on 2026-08-14. Only the entries below cleared
 * rule 2. Add more when a reviewer's work is published, not before.
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

export const clientReviews: ClientReview[] = [
  {
    author: "Fort Lauderdale Auto Sales",
    quote:
      "Esteban has done great Media work for our company i highly recommend him for any project you have hes highly knowledgeable and very detail oriented",
    publishedAt: "2026-08-14",
    portfolioId: "flas-concierge",
    readAt: "2026-08-14",
  },
];

/** Where a reader can verify every quote above. */
export const reviewSourceUrl = site.googleBusinessProfile;

export const reviewSourceLabel = {
  en: "Read on Google",
  es: "Ver en Google",
} as const;
