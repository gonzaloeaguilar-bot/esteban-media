import Link from "next/link";
import { ArrowRight, Fish, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { SPORTFISHING_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Sportfishing Videographer Miami",
  description:
    "Sportfishing videographer in Miami and Fort Lauderdale: offshore tournament coverage, high-speed strike captures, billfish releases, and sponsor highlight films.",
  path: "/services/sportfishing-videographer-miami",
  locale: "en",
});

export default function SportfishingVideographerMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/sportfishing-videographer-miami"),
        PORTED_SERVICE_FAQS["/services/sportfishing-videographer-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/sportfishing-videographer-miami",
        name: "Sportfishing Videographer Miami",
        description:
          "Offshore tournament videography, sportfishing charter documentation, and billfish release cinematography across South Florida and the Florida Keys.",
        crumb: "Sportfishing Videographer Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/sportfishing-videographer-miami#service"),
        name: "Sportfishing Videographer Miami",
        description:
          "High-speed offshore action videography for tournament teams, sportfishing charters, and marine industry sponsors in South Florida.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Fort Lauderdale / Florida Keys",
        serviceType: "Videography",
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
              "/services/sportfishing-videographer-miami",
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
                Sportfishing Videographer Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami &amp; Fort Lauderdale / Offshore Marine Tournament Videography
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Sportfishing Videographer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Weather-sealed cinema optics, high-frame-rate strike captures, cockpit team coordination, and clean slow-motion billfish releases for tournament crews and marine sponsors.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Tournament Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Fish className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What marine brokerage proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Explore specialized marine sales and vessel walkthrough cinematography. Review our guide on <Link href="/services/boat-listing-video-fort-lauderdale" className="underline decoration-[#e85d3e] underline-offset-4">boat listing video Fort Lauderdale</Link>.
              </p>
              <Link
                href="/services/boat-listing-video-fort-lauderdale"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Vessel Walkthroughs
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="sportfishing videographer in Miami" />

      <ServiceDeepDive
        id={SPORTFISHING_DEEP_DIVE.id}
        title={SPORTFISHING_DEEP_DIVE.title}
        destinations={SPORTFISHING_DEEP_DIVE.destinations}
        sections={SPORTFISHING_DEEP_DIVE.sections}
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
                  Filming an offshore tournament or charter in South Florida?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share tournament dates, home marina, target pelagic species, and sponsor branding deliverables for a custom production quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/sportfishing-videographer-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/sportfishing-videographer-miami" />
      <NicheAnswers path="/services/sportfishing-videographer-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
