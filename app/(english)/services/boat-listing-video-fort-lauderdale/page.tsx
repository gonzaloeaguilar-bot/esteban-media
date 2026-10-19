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
import { BOAT_LISTING_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Boat Listing Video Fort Lauderdale",
  description:
    "Boat listing video production and yacht brokerage walkthroughs in Fort Lauderdale with dockside staging, helm console reviews, and cabin layout tours.",
  path: "/services/boat-listing-video-fort-lauderdale",
  locale: "en",
});

export default function BoatListingVideoFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/boat-listing-video-fort-lauderdale"),
        PORTED_SERVICE_FAQS["/services/boat-listing-video-fort-lauderdale"],
      ),
      ...buildServicePageNodes({
        path: "/services/boat-listing-video-fort-lauderdale",
        name: "Boat Listing Video Fort Lauderdale",
        description:
          "Boat listing video production, yacht brokerage sales walkthroughs, and helm console reviews in Fort Lauderdale and Dania Beach.",
        crumb: "Boat Listing Video Fort Lauderdale",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/boat-listing-video-fort-lauderdale#service"),
        name: "Boat Listing Video Fort Lauderdale",
        description:
          "Professional yacht brokerage sales walkthroughs and boat listing video production for marine brokers and dealerships in Fort Lauderdale.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Dania Beach / Palm Beach",
        serviceType: "Video production",
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
              "/services/boat-listing-video-fort-lauderdale",
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
                Boat Listing Video Fort Lauderdale
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale &amp; Dania Beach / Marine Brokerage Sales
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Boat Listing Video Walkthroughs.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Dockside exterior sweeps, helm station ergonomics, cabin interior walkthroughs, and technical specification cards for yacht brokers across Fort Lauderdale.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Vessel Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What marine video experience is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Explore specialized on-water hospitality and luxury yacht video production across South Florida. Review our guide on <Link href="/services/superyacht-charter-marketing-video-fort-lauderdale" className="underline decoration-[#e85d3e] underline-offset-4">superyacht charter marketing video</Link>.
              </p>
              <Link
                href="/services/superyacht-charter-marketing-video-fort-lauderdale"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Marine Video Guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="boat listing video in Fort Lauderdale" />

      <ServiceDeepDive
        id={BOAT_LISTING_DEEP_DIVE.id}
        title={BOAT_LISTING_DEEP_DIVE.title}
        destinations={BOAT_LISTING_DEEP_DIVE.destinations}
        sections={BOAT_LISTING_DEEP_DIVE.sections}
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
                  Listing a boat or yacht in Fort Lauderdale?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share vessel make, length, marina slip location, and broker listing timeline for an itemized production quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/boat-listing-video-fort-lauderdale"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/boat-listing-video-fort-lauderdale" />
      <NicheAnswers path="/services/boat-listing-video-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
