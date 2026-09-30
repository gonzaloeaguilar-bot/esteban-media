import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";

/**
 * "Which of these are you?" — the step social traffic never gets.
 *
 * MEASURED 2026-09-30 in GA4, 30 days:
 *
 *   m.facebook.com    21 sessions -> ALL landed on "/"
 *   l.instagram.com   11 sessions -> ALL landed on "/"
 *   facebook.com       4 sessions -> ALL landed on "/"
 *
 * Every one of the 36 social sessions arrived on the homepage, and all three of
 * the site's form starts in that window came from m.facebook.com. Facebook is the
 * channel that converts. Meanwhile the page that produced the only contact click
 * was /es/reels-para-negocios-miami, and the fourth-biggest landing page on the
 * whole site was /es/guias/ideas-de-reels-para-agentes-de-bienes-raices — with
 * ONE search impression, so that audience came from social too.
 *
 * So the pages that convert exist, social sends people who want them, and the
 * homepage linked to none of them: `grep` for all four slugs in either home page
 * returned 0. That is the leak this closes.
 *
 * ServicesStrip already routes by SERVICE (what Esteban does). This routes by
 * AUDIENCE (who the visitor is), which is a different question and the one a
 * realtor arriving from an Instagram bio link is actually asking.
 *
 * Every lane carries `data-cta`, and the section carries `data-section`, so
 * public/track.js attributes the clicks with no hand-written event — which is
 * what makes "did this work?" answerable in 28 days instead of arguable.
 */
export function AudienceRouter({ locale }: { locale: AudienceLocale }) {
  const copy = AUDIENCE_LANES[locale];

  return (
    <section
      id="audience"
      aria-labelledby="audience-heading"
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-14 sm:py-20"
      data-section="audience-router"
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
          {copy.eyebrow}
        </p>
        <h2
          id="audience-heading"
          className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl"
        >
          {copy.heading}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.lanes.map((lane) => (
            <Link
              key={lane.href}
              href={lane.href}
              data-cta={`audience-${lane.id}`}
              className="group flex flex-col rounded-2xl border border-[#d6ccc0] bg-[#f6f1ea] p-6 transition hover:border-[#101214] sm:p-7"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9f3c27]">
                {lane.who}
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-tight">{lane.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">{lane.detail}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-[#9f3c27]">
                {lane.action}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
