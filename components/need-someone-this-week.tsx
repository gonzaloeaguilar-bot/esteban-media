import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { whatsappHref } from "@/lib/packages";
import { turnaroundFor } from "@/lib/pricing";
import { site } from "@/lib/site";

/**
 * "Need someone this week?" — the last-minute buyer's decision block
 * (commercial-intent strategy 2026-11-26, wedge 6 "panic").
 *
 * Server-rendered text only: the answer is in the first sentence, the limits
 * are stated plainly, and nothing is promised that the site does not already
 * say. Availability is never asserted; it is confirmed in writing. The editing
 * floor reads from lib/pricing.ts so the copy cannot drift from the owner's
 * answer.
 */
export type NeedSomeoneThisWeekProof = { href: string; label: string };

const COPY = {
  en: {
    question: "Need someone this week?",
    answer: (phone: string) =>
      `Message the date, place and hours on WhatsApp at ${phone}; Esteban replies whether the date is open, and it is booked only once confirmed in writing.`,
    limits: (days: number) =>
      `Not promised: same-day raw files or a same-day finished film on a last-minute booking. Delivery is agreed in writing; edits take at least ${days} days.`,
    cta: "Ask on WhatsApp",
    message: "Hi Esteban, I need a videographer this week. Here are the date, place and hours:",
    proofPrefix: "See published work first:",
  },
  es: {
    question: "¿Necesitas a alguien esta semana?",
    answer: (phone: string) =>
      `Envía por WhatsApp al ${phone} la fecha, el lugar y el horario; Esteban responde si la fecha está libre, y queda reservada solo cuando se confirma por escrito.`,
    limits: (days: number) =>
      `No se promete: archivos originales ni una película terminada el mismo día en una reserva de último momento. La entrega se acuerda por escrito; la edición toma al menos ${days} días.`,
    cta: "Preguntar por WhatsApp",
    message: "Hola Esteban, necesito un videógrafo esta semana. Te paso la fecha, el lugar y el horario:",
    proofPrefix: "Mira trabajo publicado primero:",
  },
} as const;

export function NeedSomeoneThisWeek({
  locale,
  proof,
}: {
  locale: "en" | "es";
  proof?: NeedSomeoneThisWeekProof;
}) {
  const t = COPY[locale];
  const days = turnaroundFor("arranque").minimumDays;
  const headingId = `need-this-week-${locale}`;
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-10 sm:py-12"
      data-section="need_this_week"
      aria-labelledby={headingId}
    >
      <Container size="lg">
        <h2 id={headingId} className="font-serif text-3xl leading-tight sm:text-4xl">
          {t.question}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{t.answer(site.phone.display)}</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#3f4548]">{t.limits(days)}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={whatsappHref(site.phone.e164, t.message)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="need_this_week_whatsapp"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t.cta}
          </a>
          {proof ? (
            <p className="text-sm leading-6 text-[#3f4548]">
              {t.proofPrefix}{" "}
              <Link
                href={proof.href}
                data-cta="need_this_week_proof"
                className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {proof.label}
              </Link>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
