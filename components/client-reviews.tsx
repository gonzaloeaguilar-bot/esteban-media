import { Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  clientReviews,
  reviewSourceLabel,
  reviewSourceUrl,
} from "@/lib/client-reviews";

const copy = {
  en: {
    eyebrow: "Client reviews",
    title: "What clients have said publicly.",
    lead: "Every quote below is published on the Google Business Profile and reproduced word for word. Follow the link to read it at the source.",
    verify: reviewSourceLabel.en,
    ratingNote: (count: number) =>
      `Published on Google, where ${count === 1 ? "this review is" : "these reviews are"} shown alongside the profile's current rating.`,
  },
  es: {
    eyebrow: "Reseñas de clientes",
    title: "Lo que los clientes han dicho públicamente.",
    lead: "Cada cita está publicada en el perfil de Google Business y se reproduce palabra por palabra. Sigue el enlace para leerla en la fuente.",
    verify: reviewSourceLabel.es,
    ratingNote: (count: number) =>
      `Publicado en Google, donde ${count === 1 ? "esta reseña aparece" : "estas reseñas aparecen"} junto a la calificación actual del perfil.`,
  },
} as const;

export function ClientReviews({ locale = "en" }: { locale?: "en" | "es" }) {
  if (clientReviews.length === 0) {
    return null;
  }

  const t = copy[locale];

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
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-[#101214] sm:text-3xl"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#41474d] sm:text-base">
          {t.lead}
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
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
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      aria-hidden="true"
                      className="size-3.5 fill-[#e85d3e] text-[#e85d3e]"
                    />
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-[#5a6066]">
          {t.ratingNote(clientReviews.length)}{" "}
          <a
            href={reviewSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-2 hover:text-[#7f2f20]"
          >
            {t.verify}
          </a>
        </p>
      </Container>
    </section>
  );
}
