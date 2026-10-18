import Link from "next/link";
import { ArrowRight, Camera, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { CORPORATE_EVENT_FTL_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Corporate Event Videographer Fort Lauderdale",
  description:
    "Corporate event videography for Fort Lauderdale conferences, conventions, and business summits, with coverage and recap editing scoped before the date.",
  path: "/services/corporate-event-videographer-fort-lauderdale",
  locale: "en",
});

export default function CorporateEventVideographerFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/corporate-event-videographer-fort-lauderdale"),
        PORTED_SERVICE_FAQS["/services/corporate-event-videographer-fort-lauderdale"],
      ),
      ...buildServicePageNodes({
        path: "/services/corporate-event-videographer-fort-lauderdale",
        name: "Corporate Event Videographer Fort Lauderdale",
        description:
          "Event video coverage, convention highlight recaps, and conference video production for corporate events in Fort Lauderdale and Broward County.",
        crumb: "Corporate Event Videographer Fort Lauderdale",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/corporate-event-videographer-fort-lauderdale#service"),
        name: "Corporate Event Videographer Fort Lauderdale",
        description:
          "Corporate event video capture, convention highlight video editing, and conference recaps in Fort Lauderdale.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Broward County",
        serviceType: "Event video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            withNicheService(
              "/services/corporate-event-videographer-fort-lauderdale",
              jsonLd,
            ),
          ),
        }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
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
                <Link href="/services" className="hover:text-[#9f3c27]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Corporate Event Videographer Fort Lauderdale
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Corporate Events
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Corporate Event Videographer in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                On-location video capture and recap editing for Broward County conventions, corporate meetings and multi-day summits. Coverage, sound, and deliverables are scoped before the event date.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Event Videography
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What published event video proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <strong>Healthy Smile Miami</strong>: social-media videos for a South Florida clinic. Esteban filmed on location, video and sound, then edited and delivered the finished pieces. For a filmed event, see the <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">Diana &amp; Jack</Link> wedding film.
              </p>
              <Link
                href="/portfolio/healthy-smile"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review Healthy Smile Video Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="corporate event videography in Fort Lauderdale" />

      <ServiceDeepDive
        id={CORPORATE_EVENT_FTL_DEEP_DIVE.id}
        title={CORPORATE_EVENT_FTL_DEEP_DIVE.title}
        destinations={CORPORATE_EVENT_FTL_DEEP_DIVE.destinations}
        sections={CORPORATE_EVENT_FTL_DEEP_DIVE.sections}
      />

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Hosting an upcoming conference in Fort Lauderdale?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Email or call to reserve event video coverage dates in Broward County.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ServiceFaqs
        heading="Common questions before you start."
        faqs={PORTED_SERVICE_FAQS["/services/corporate-event-videographer-fort-lauderdale"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/corporate-event-videographer-fort-lauderdale" />
      <NicheAnswers path="/services/corporate-event-videographer-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
