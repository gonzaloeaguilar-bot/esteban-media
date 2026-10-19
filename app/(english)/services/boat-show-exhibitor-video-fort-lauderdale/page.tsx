import Link from "next/link";
import { ArrowRight, Anchor, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { BOAT_SHOW_EXHIBITOR_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Boat Show Exhibitor Video Fort Lauderdale",
  description:
    "Boat show exhibitor video in Fort Lauderdale: marine booth displays, yacht walkthroughs, equipment demos, and rapid recap films for FLIBS exhibitors.",
  path: "/services/boat-show-exhibitor-video-fort-lauderdale",
  locale: "en",
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/boat-show-exhibitor-video-fort-lauderdale"),
        PORTED_SERVICE_FAQS["/services/boat-show-exhibitor-video-fort-lauderdale"],
      ),
      ...buildServicePageNodes({
        path: "/services/boat-show-exhibitor-video-fort-lauderdale",
        name: "Boat Show Exhibitor Video Fort Lauderdale",
        description:
          "Boat show exhibitor video in Fort Lauderdale: marine booth displays, yacht walkthroughs, equipment demos, and rapid recap films for FLIBS exhibitors.",
        crumb: "Boat Show Exhibitor Video FL",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/boat-show-exhibitor-video-fort-lauderdale#service"),
        name: "Boat Show Exhibitor Video Fort Lauderdale",
        description:
          "Boat show exhibitor video in Fort Lauderdale: marine booth displays, yacht walkthroughs, equipment demos, and rapid recap films for FLIBS exhibitors.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Bahia Mar / Broward Convention Center",
        serviceType: "Boat show exhibitor video production",
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
              "/services/boat-show-exhibitor-video-fort-lauderdale",
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
                Boat Show Exhibitor Video FL
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Marine Trade Show Video Production
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Boat Show Exhibitor Video Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Dedicated on-site exhibitor video production for the Fort Lauderdale International Boat Show: booth displays, vessel walkthroughs, and rapid recap films.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What on-site marine event proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review our verified production work and cinematography pacing. Watch our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">Watch Published On-Location Marine and Event Cinematography</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published On-Location Marine and Event Cinematography
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="boat show exhibitor video production" />

      <ServiceDeepDive
        id={BOAT_SHOW_EXHIBITOR_DEEP_DIVE.id}
        title={BOAT_SHOW_EXHIBITOR_DEEP_DIVE.title}
        destinations={BOAT_SHOW_EXHIBITOR_DEEP_DIVE.destinations}
        sections={BOAT_SHOW_EXHIBITOR_DEEP_DIVE.sections}
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
                  Exhibiting at the Fort Lauderdale International Boat Show?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share dock location, vessel models on display, VIP event dates, and requested delivery turnaround for a dedicated show quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/boat-show-exhibitor-video-fort-lauderdale"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/boat-show-exhibitor-video-fort-lauderdale" />
      <NicheAnswers path="/services/boat-show-exhibitor-video-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
