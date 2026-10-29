import Link from "next/link";
import { CREW_RECORDING_RATES, usd } from "@/lib/pricing";
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
import { CONFERENCE_VIDEOGRAPHER_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Conference Videographer Fort Lauderdale",
  description:
    "Conference videography and convention filming in Fort Lauderdale and Broward venues, including keynote speeches, panel discussions, and highlight recaps.",
  path: "/services/conference-videographer-fort-lauderdale",
  locale: "en",
});

export default function ConferenceVideographerFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/conference-videographer-fort-lauderdale"),
        PORTED_SERVICE_FAQS["/services/conference-videographer-fort-lauderdale"],
      ),
      ...buildServicePageNodes({
        path: "/services/conference-videographer-fort-lauderdale",
        name: "Conference Videographer Fort Lauderdale",
        description:
          "Keynote session recording, panel discussion coverage, and conference recap video production in Fort Lauderdale and Broward County.",
        crumb: "Conference Videographer Fort Lauderdale",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/conference-videographer-fort-lauderdale#service"),
        name: "Conference Videographer Fort Lauderdale",
        description:
          "Conference videography, convention filming, and business summit video production in Fort Lauderdale.",
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
              "/services/conference-videographer-fort-lauderdale",
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
                Conference Videographer Fort Lauderdale
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Conferences &amp; Conventions
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Conference Videographer in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Comprehensive convention coverage, stage keynote filming, and sponsor recap videos at the Broward County Convention Center and Fort Lauderdale hotel venues. Redundant audio and power for all-day reliability.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Conference Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What all-day conference proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Esteban provides continuous 8-to-10 hour event coverage with dual-card recording backups, direct console audio tap, and rapid highlight turnaround. Also explore our <Link href="/portfolio/banacol" className="underline decoration-[#e85d3e] underline-offset-4">Banacol commercial production</Link>.
              </p>
              <Link
                href="/portfolio/banacol"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review Corporate Production Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="conference videography in Fort Lauderdale" />

      <ServiceDeepDive
        id={CONFERENCE_VIDEOGRAPHER_DEEP_DIVE.id}
        title={CONFERENCE_VIDEOGRAPHER_DEEP_DIVE.title}
        destinations={CONFERENCE_VIDEOGRAPHER_DEEP_DIVE.destinations}
        sections={CONFERENCE_VIDEOGRAPHER_DEEP_DIVE.sections}
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
                  Organizing a convention or conference in Broward?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Filming from {usd(CREW_RECORDING_RATES.solo.hourly)}/hr or full-day Local Presence production with keynote and recap delivery.
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
        faqs={PORTED_SERVICE_FAQS["/services/conference-videographer-fort-lauderdale"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/conference-videographer-fort-lauderdale" />
      <NicheAnswers path="/services/conference-videographer-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
