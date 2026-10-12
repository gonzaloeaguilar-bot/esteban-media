import { ExternalLink, Star } from "lucide-react";

import { ReviewsBand } from "@/components/reviews-band";
import { REELS_IN_DISPLAY_ORDER } from "@/lib/real-estate-reels";
import { ReviewCarousel } from "@/components/review-carousel";
import { Container } from "@/components/ui/container";
import {
  googleReviews,
  googleReviewSnapshot,
  reviewSourceLabel,
  reviewSourceUrl,
} from "@/lib/client-reviews";

const copy = {
  en: {
    eyebrow: "Client reviews",
    title: "What clients have said publicly.",
    lead: "Real reviews from my verified Google profile, word for word.",
    ratingKicker: "Google rating",
    ratingAria: `${googleReviewSnapshot.rating.toFixed(1)} out of 5 on Google, from ${googleReviewSnapshot.reviewCount} reviews`,
    reviewCount: (count: number) =>
      `${count} public review${count === 1 ? "" : "s"} on Google`,
    verifiedBadge: "Verified on Google",
    verify: reviewSourceLabel.en,
    summaryNote: (shown: number, total: number) =>
      `Showing ${shown} of ${total} reviews. The rest are on Google.`,
  },
  es: {
    eyebrow: "Reseñas de clientes",
    title: "Lo que los clientes han dicho públicamente.",
    lead: "Reseñas reales de mi perfil verificado de Google, palabra por palabra.",
    ratingKicker: "Calificación de Google",
    ratingAria: `${googleReviewSnapshot.rating.toFixed(1)} de 5 en Google, con ${googleReviewSnapshot.reviewCount} reseñas`,
    reviewCount: (count: number) =>
      `${count} reseña${count === 1 ? "" : "s"} pública${count === 1 ? "" : "s"} en Google`,
    verifiedBadge: "Verificado en Google",
    verify: reviewSourceLabel.es,
    summaryNote: (shown: number, total: number) =>
      `Mostrando ${shown} de ${total} reseñas. El resto está en Google.`,
  },
} as const;

/** The hero star row: five large, filled stars, sized in CSS (`em-stars`). */
function BigStars() {
  return (
    <span className="em-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="fill-current" />
      ))}
    </span>
  );
}

export function ClientReviews({ locale = "en", compact = false }: { locale?: "en" | "es"; compact?: boolean }) {
  if (googleReviews.length === 0) {
    return null;
  }

  const t = copy[locale];
  const { rating, reviewCount } = googleReviewSnapshot;

  /* The HOME band. `compact` is the homepage variant and it used to render the
     aggregate card with the carousel switched OFF — so the six real, verbatim,
     attributed five-star reviews only existed further down, inside the
     collapsed keep-reading fold. The number was in front of the visitor and
     the words people actually respond to were behind a fold. Two of the real
     quotes now ride in the band itself; the full set still lives in the
     carousel below, unchanged.

     The two chosen are the SHORTEST verbatim quotes, so nothing is truncated
     and nothing is edited — an excerpt would be us authoring a testimonial,
     which lib/client-reviews.ts exists to prevent. */
  if (compact) {
    const shortest = [...googleReviews]
      .sort((a, b) => a.quote.length - b.quote.length)
      .slice(0, 2)
      .map((r) => ({ author: r.author, quote: r.quote, publishedAt: r.publishedAt }));

    return (
      <ReviewsBand
        locale={locale}
        eyebrow={t.eyebrow}
        heading={locale === "es" ? "Reseñas verificadas en Google." : "Verified Google reviews."}
        rating={rating}
        reviewCount={reviewCount}
        quotes={shortest}
        action={
          locale === "es"
            ? `Leer las ${reviewCount} en Google`
            : `Read all ${reviewCount} on Google`
        }
        sourceUrl={reviewSourceUrl}
        posters={REELS_IN_DISPLAY_ORDER.map((reel) => reel.poster)}
      />
    );
  }

  return (
    <section
      aria-labelledby="client-reviews-heading"
      className={`border-b border-[#ddd4c8] bg-[#f6f1ea] ${compact ? "py-10 sm:py-14" : "py-14 sm:py-20"}`}
    >
      <Container size="xl">
        <p className="em-eyebrow">
          {t.eyebrow}
        </p>
        <h2
          id="client-reviews-heading"
          /* The shared section heading (.em-h2), like every home h2. */
          className="mt-2 max-w-2xl em-h2 text-[#101214]"
        >
          {compact
            ? (locale === "es" ? "Reseñas verificadas en Google." : "Verified Google reviews.")
            : t.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#41474d] sm:text-base">
          {compact
            ? (locale === "es" ? "Reseñas públicas enlazadas directamente a su fuente." : "Public reviews linked directly to their source.")
            : t.lead}
        </p>

        {/* The aggregate hero. This is the number the visitor is actually asking
            for — "is he good on Google?" — so it leads as a fact with its own
            large surface: the rating figure next to an oversized row of stars.
            It is attributed prose next to a link to the source, never
            aggregateRating markup: the JSON-LD rule lives in
            lib/__tests__/client-reviews.test.ts and still holds. */}
        <a
          href={reviewSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.ratingAria}
          className="em-rating-hero mt-8 flex flex-col gap-6 rounded-2xl border border-[#ddd4c8] bg-white p-6 transition-colors hover:border-[#e85d3e] sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
              {t.ratingKicker}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="em-rating font-serif text-[#101214]">
                {rating.toFixed(1)}
              </span>
              <BigStars />
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#101214]">
              {t.reviewCount(reviewCount)}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe3d4] bg-[#eef6f0] px-2.5 py-1 text-xs font-medium text-[#256a3d]">
                <Star className="size-3 fill-current" aria-hidden="true" />
                {t.verifiedBadge}
              </span>
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[#9f3c27]">
            {t.verify}
            <ExternalLink className="size-4" aria-hidden="true" />
          </span>
        </a>

        {!compact && <div className="mt-8">
          <ReviewCarousel
            reviews={googleReviews}
            locale={locale}
            sourceUrl={reviewSourceUrl}
            sourceLabel={t.verify}
          />
        </div>}

        {/* Visible copy stays customer-facing. The provenance rules did not
            move: quotes stay verbatim and dated in lib/client-reviews.ts, and
            no aggregateRating/review markup is emitted about the business
            (lib/__tests__/client-reviews.test.ts). */}
        <p className="mt-8 text-xs leading-relaxed text-[#5a6066]">
          {compact
            ? (locale === "es" ? "Lee todas las reseñas verificadas en Google." : "Read every verified review on Google.")
            : t.summaryNote(googleReviews.length, reviewCount)}
        </p>
      </Container>
    </section>
  );
}
