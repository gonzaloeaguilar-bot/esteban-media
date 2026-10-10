import { ExternalLink, Star } from "lucide-react";

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
    lead: "Real reviews from Esteban's verified Google profile, reproduced word for word — typos and all. Nothing on this page is written for the site.",
    ratingKicker: "Google rating",
    ratingAria: `${googleReviewSnapshot.rating.toFixed(1)} out of 5 on Google, from ${googleReviewSnapshot.reviewCount} reviews`,
    reviewCount: (count: number) =>
      `${count} public review${count === 1 ? "" : "s"} on Google`,
    verifiedBadge: "Verified on Google",
    verify: reviewSourceLabel.en,
    summaryNote: (shown: number, total: number) =>
      `Showing ${shown} of ${total} reviews — the ones whose full text has been read at the source so far. The rest live on Google.`,
    sourceNote:
      "Attributed to Google, linked to the profile, and never emitted as rating markup about ourselves.",
  },
  es: {
    eyebrow: "Reseñas de clientes",
    title: "Lo que los clientes han dicho públicamente.",
    lead: "Reseñas reales del perfil verificado de Google de Esteban, reproducidas palabra por palabra — con erratas incluidas. Nada en esta página se escribe para el sitio.",
    ratingKicker: "Calificación de Google",
    ratingAria: `${googleReviewSnapshot.rating.toFixed(1)} de 5 en Google, con ${googleReviewSnapshot.reviewCount} reseñas`,
    reviewCount: (count: number) =>
      `${count} reseña${count === 1 ? "" : "s"} pública${count === 1 ? "" : "s"} en Google`,
    verifiedBadge: "Verificado en Google",
    verify: reviewSourceLabel.es,
    summaryNote: (shown: number, total: number) =>
      `Mostrando ${shown} de ${total} reseñas — aquellas cuyo texto completo se ha leído en la fuente hasta ahora. El resto vive en Google.`,
    sourceNote:
      "Atribuidas a Google, enlazadas al perfil y nunca emitidas como markup de calificación sobre nosotros mismos.",
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

export function ClientReviews({ locale = "en" }: { locale?: "en" | "es" }) {
  if (googleReviews.length === 0) {
    return null;
  }

  const t = copy[locale];
  const { rating, reviewCount, readAt } = googleReviewSnapshot;

  return (
    <section
      aria-labelledby="client-reviews-heading"
      className="border-b border-[#ddd4c8] bg-[#f6f1ea] py-14 sm:py-20"
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
          {t.eyebrow}
        </p>
        <h2
          id="client-reviews-heading"
          /* Matched to the site's H2 system (Newsreader 36/400), not the
             ui-sans-serif 24/600 it used to be. */
          className="mt-2 max-w-2xl font-serif text-4xl leading-tight text-[#101214]"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#41474d] sm:text-base">
          {t.lead}
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

        <div className="mt-8">
          <ReviewCarousel
            reviews={googleReviews}
            locale={locale}
            sourceUrl={reviewSourceUrl}
            sourceLabel={t.verify}
          />
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[#5a6066]">
          {t.summaryNote(googleReviews.length, reviewCount)}{" "}
          {t.sourceNote} <span aria-hidden="true">·</span>{" "}
          {locale === "es"
            ? `Instantánea del perfil leída el ${readAt}`
            : `Profile snapshot read ${readAt}`}
        </p>
      </Container>
    </section>
  );
}
