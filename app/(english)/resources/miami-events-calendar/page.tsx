import Link from "next/link";
import { ArrowRight, Calendar, AlertCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";
import {
  MIAMI_EVENTS_CALENDAR,
  formatCalendarDateRange,
} from "@/lib/event-ai-pages-content";

export const metadata = buildPageMetadata({
  title: "Miami Events Calendar for Creators & Videographers",
  description:
    "Verified-pending calendar of premier Miami and South Florida conferences, boat shows, expos, and festivals for event coverage planning.",
  path: "/resources/miami-events-calendar",
  locale: "en",
});

export default function MiamiEventsCalendarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": absoluteUrl("/resources/miami-events-calendar#webpage"),
    url: absoluteUrl("/resources/miami-events-calendar"),
    name: "Miami Events Calendar for Creators & Videographers",
    description:
      "Listing of premier Miami conferences, expos, boat shows, and festivals for video coverage planning.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/resources" className="hover:text-[#9f3c27]">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Miami Events Calendar
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-[#5a6066]">
              South Florida Event Seasons
            </p>
            <h1 className="mt-4 font-serif em-display">
              Miami Events Calendar for Creators &amp; Brands.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#252a2d]">
              A curated calendar of high-profile Miami conferences, conventions, boat shows, and trade expos. Small businesses, creators, exhibitors, and sponsors use this schedule to plan on-location video capture and roving attendee interview coverage before the season begins.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-[#e85d3e]/30 bg-[#fbf6ef] p-4 text-sm text-[#252a2d] flex items-start gap-3">
            <AlertCircle className="size-5 text-[#e85d3e] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Important planning note:</strong> Dates below represent verified-pending calendar windows for the 2026-2027 season. Always <em>confirm dates with organizer</em> before making flight or vendor commitments. Esteban Moreno Media provides independent videography and video editing services and is not affiliated with or endorsed by any event organizer.
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MIAMI_EVENTS_CALENDAR.map((evt) => (
              <div
                key={evt.name.en}
                className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#9f3c27]">
                    <Calendar className="size-4" aria-hidden="true" />
                    <span>{formatCalendarDateRange(evt.start, evt.end, "en")}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl text-[#101214]">
                    {evt.name.en}
                  </h2>
                  <p className="mt-1 text-xs text-[#5a6066]">{evt.where.en}</p>
                  <p className="mt-3 inline-block rounded bg-[#eee5d8] px-2 py-1 text-xs font-medium text-[#5a6066]">
                    confirm dates with organizer
                  </p>
                  {evt.note && (
                    <p className="mt-3 text-xs leading-5 text-[#252a2d]">
                      {evt.note.en}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#ddd4c8]">
                  <Link
                    href={evt.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#9f3c27] hover:underline"
                  >
                    {evt.dedicatedPage ? "Event video coverage details" : "Videographer service details"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-8">
            <h3 className="font-serif text-2xl">Need video capture or attendee interviews at an upcoming Miami event?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#252a2d]">
              Review our dedicated on-location videography options, including roving stick-mic attendee interviews and rapid same-day recap editing.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/services/event-attendee-interview-videographer-miami"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                Attendee Interview Videography
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services/corporate-event-videographer-miami"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium text-[#101214] hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                Corporate Event Video Miami
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium text-[#101214] hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                Contact Esteban
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
