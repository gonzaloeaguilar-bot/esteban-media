import { ExternalLink, Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  clientReviews,
  googleReviewSnapshot,
  reviewSourceLabel,
  reviewSourceUrl,
} from "@/lib/client-reviews";

const copy = {
  en: {
    eyebrow: "Client reviews",
    title: "What clients have said publicly.",
    lead: "Every quote below is published on the Google Business Profile and reproduced word for word. Follow the link to read it at the source.",
    ratingAria: `${googleReviewSnapshot.rating.toFixed(1)} out of 5 on Google`,
    ratedOn: "on Google",
    reviewCount: (count: number) =>
      `${count} public review${count === 1 ? "" : "s"}`,
    snapshotRead: (date: string) => `Profile snapshot read ${date}`,
    verify: reviewSourceLabel.en,
    sampledByline: "Recent reviewers on the profile",
    sampledNote:
      "Google returns a rotating sample of recent reviews; the full text of every one of these lives on the profile.",
    ratingNote: (count: number) =>
      `Published on Google, where ${count === 1 ? "this review is" : "these reviews are"} shown alongside the profile's current rating.`,
  },
  es: {
    eyebrow: "Reseñas de clientes",
    title: "Lo que los clientes han dicho públicamente.",
    lead: "Cada cita está publicada en el perfil de Google Business y se reproduce palabra por palabra. Sigue el enlace para leerla en la fuente.",
    ratingAria: `${googleReviewSnapshot.rating.toFixed(1)} de 5 en Google`,
    ratedOn: "en Google",
    reviewCount: (count: number) =>
      `${count} reseña${count === 1 ? "" : "s"} pública${count === 1 ? "" : "s"}`,
    snapshotRead: (date: string) => `Instantánea del perfil leída el ${date}`,
    verify: reviewSourceLabel.es,
    sampledByline: "Reseñas recientes en el perfil",
    sampledNote:
      "Google devuelve una muestra rotativa de reseñas recientes; el texto completo de cada una vive en el perfil.",
    ratingNote: (count: number) =>
      `Publicado en Google, donde ${count === 1 ? "esta reseña aparece" : "estas reseñas aparecen"} junto a la calificación actual del perfil.`,
  },
} as const;

function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center gap-0.5 text-[#e85d3e]"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

export function ClientReviews({ locale = "en" }: { locale?: "en" | "es" }) {
  if (clientReviews.length === 0) {
    return null;
  }

  const t = copy[locale];
  const { rating, reviewCount, readAt, sampledAuthors } = googleReviewSnapshot;

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
          /* Matched to the site's H2 system. Measured on /es: every other section
             heading is Newsreader 36/400; this one was ui-sans-serif 24/600 — the
             single band carrying social proof was set in a different design system
             and read as imported. */
          className="mt-2 max-w-2xl font-serif text-4xl leading-tight text-[#101214]"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#41474d] sm:text-base">
          {t.lead}
        </p>

        {/* The aggregate band. This is the number the visitor is actually asking
            for — "is he good on Google?" — so it leads as a fact with its own
            surface, not as a line of prose. It is attributed prose next to a
            link to the source, never aggregateRating markup: the JSON-LD rule
            lives in lib/__tests__/client-reviews.test.ts and still holds. */}
        <a
          href={reviewSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg border border-[#ddd4c8] bg-white p-5 transition-colors hover:border-[#e85d3e] sm:items-center"
        >
          <span className="em-rating font-serif text-[#101214]">
            {rating.toFixed(1)}
          </span>
          <span className="flex flex-col gap-1">
            <Stars className="size-4" />
            <span className="text-sm font-medium text-[#101214]">
              {t.reviewCount(reviewCount)} {t.ratedOn}
            </span>
          </span>
          <span className="text-xs text-[#5a6066]">{t.snapshotRead(readAt)}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#9f3c27]">
            {t.verify}
            <ExternalLink className="size-4" aria-hidden="true" />
          </span>
        </a>

        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {clientReviews.map((review) => (
            <li
              key={review.author}
              className="flex flex-col rounded-lg border border-[#ddd4c8] bg-white p-6"
            >
              <Quote
                aria-hidden="true"
                className="size-5 shrink-0 text-[#e85d3e]"
              />
              <blockquote className="mt-3 grow text-sm leading-relaxed text-[#22262a] sm:text-base">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div className="mt-4 border-t border-[#ece5da] pt-4">
                <p className="text-sm font-medium text-[#101214]">
                  {review.author}
                </p>
                <p
                  className="mt-1 flex items-center gap-1 text-xs text-[#5a6066]"
                  aria-label={`5 out of 5, ${review.author}`}
                >
                  <Stars className="size-3.5" />
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* The sampled-reviewer strip. Names only: the Places API sample does not
            carry stable per-review URLs, and a chip that goes nowhere would be
            dishonest — so these are attribution, and the band above is the link. */}
        {sampledAuthors.length > 0 && (
          <div className="mt-6 rounded-lg border border-[#ece5da] bg-[#fbf6ef] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
              {t.sampledByline}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {sampledAuthors.map((author) => (
                <li
                  key={author}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#ddd4c8] bg-white px-3 py-1.5 text-xs font-medium text-[#22262a]"
                >
                  <Stars className="size-3" />
                  {author}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-[#5a6066]">
              {t.sampledNote}
            </p>
          </div>
        )}

        <p className="mt-6 text-xs leading-relaxed text-[#5a6066]">
          {t.ratingNote(clientReviews.length)}{" "}
          <a
            href={reviewSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="-mx-2 inline-flex min-h-10 items-center rounded-md px-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-2 hover:text-[#7f2f20]"
          >
            {t.verify}
          </a>
        </p>
      </Container>
    </section>
  );
}
