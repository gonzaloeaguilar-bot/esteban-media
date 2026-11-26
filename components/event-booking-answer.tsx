import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { eventBookingAnswer } from "@/lib/event-content";
import { getEvent, type EventId, type EventLocale } from "@/lib/events";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * "When is <event> <year>, and how do I book video for it?" — the answer-first
 * booking block for events whose next dates were read on the organizer's own
 * site (lib/events.ts `organizerConfirmed`). Server-rendered text: the date,
 * the source, the published prices and the booking rule are in the HTML a
 * crawler fetches. Renders nothing for guide-listed or ended editions.
 *
 * The WhatsApp link is picked up by the site-wide contact_click listener
 * (method whatsapp, lead_type, landing_page), so no extra handler is needed.
 */
const COPY = {
  en: {
    cta: "Ask about these dates on WhatsApp",
    message: (name: string) => `Hi Esteban, I want video around ${name}. Here are the dates, place and hours:`,
    source: "Official dates",
  },
  es: {
    cta: "Preguntar por estas fechas por WhatsApp",
    message: (name: string) => `Hola Esteban, quiero video para ${name}. Te paso las fechas, el lugar y el horario:`,
    source: "Fechas oficiales",
  },
} as const;

export function EventBookingAnswer({
  id,
  locale,
  variant = "section",
}: {
  id: EventId;
  locale: EventLocale;
  /** "hero": the compact first-screen box on the event pages (the hero already has the WhatsApp button). */
  variant?: "section" | "hero";
}) {
  const event = getEvent(id);
  const booking = eventBookingAnswer(event, locale);
  if (!booking) return null;
  const t = COPY[locale];
  const key = id.replace(/-/g, "_");
  if (variant === "hero") {
    return (
      <div
        className="mt-4 max-w-2xl rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 text-sm leading-6 text-[#252a2d]"
        data-section={`event_booking_${key}`}
      >
        {/* No source link here: the date card beside the hero already links the official site. */}
        <p>{booking.answer}</p>
      </div>
    );
  }
  const headingId = `event-booking-${id}-${locale}`;
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-10 sm:py-12"
      data-section={`event_booking_${key}`}
      aria-labelledby={headingId}
    >
      <Container size="lg">
        <h2 id={headingId} className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
          {booking.question}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{booking.answer}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={whatsappHref(site.phone.e164, t.message(event.name))}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`event_booking_${key}_whatsapp`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t.cta}
          </a>
          <a
            href={booking.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`event_booking_${key}_official_site`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4"
          >
            {t.source}: {event.name}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
