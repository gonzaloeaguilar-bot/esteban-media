import Link from "next/link";
import { ArrowRight, Mail, Martini, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { MIXOLOGY_COCKTAIL_DEEP_DIVE } from "@/lib/hospitality-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Mixology Cocktail Videographer Miami",
  description:
    "Craft cocktail and mixology video production in Wynwood, South Beach, and Fort Lauderdale with high-speed slow motion, ice acoustics, and kinetic bar social reels.",
  path: "/services/mixology-cocktail-videographer-miami",
  locale: "en",
});

export default function MixologyCocktailVideographerMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/mixology-cocktail-videographer-miami"),
        PORTED_SERVICE_FAQS["/services/mixology-cocktail-videographer-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/mixology-cocktail-videographer-miami",
        name: "Mixology Cocktail Videographer Miami",
        description:
          "Craft cocktail and mixology video production, slow-motion bar cinematography, and nightlife social media reels in Wynwood, South Beach, and Fort Lauderdale.",
        crumb: "Mixology Cocktail Videographer Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/mixology-cocktail-videographer-miami#service"),
        name: "Mixology Cocktail Videographer Miami",
        description:
          "High-speed cinematic mixology videography and beverage brand storytelling for cocktail lounges, speakeasies, and spirits brands in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Wynwood / South Beach / Downtown Fort Lauderdale",
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
              "/services/mixology-cocktail-videographer-miami",
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
                Mixology Cocktail Videographer Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Wynwood &amp; South Beach / Craft Cocktail &amp; Nightlife
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Craft Cocktail &amp; Mixology Videographer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                High-speed 120fps slow-motion capture, crisp bar acoustics, and beat-matched vertical reels for cocktail lounges, speakeasies, and artisanal spirits brands across Wynwood and South Beach.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Cocktail Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Martini className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What hospitality video proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified hospitality and restaurant promotional video filmed in Miami. Watch our published <Link href="/portfolio/bar-door-monkey" className="underline decoration-[#e85d3e] underline-offset-4">Bar Door Monkey promo spot</Link>.
              </p>
              <Link
                href="/portfolio/bar-door-monkey"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Venue Portfolio Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="craft cocktail and mixology videography in Miami" />

      <ServiceDeepDive
        id={MIXOLOGY_COCKTAIL_DEEP_DIVE.id}
        title={MIXOLOGY_COCKTAIL_DEEP_DIVE.title}
        destinations={MIXOLOGY_COCKTAIL_DEEP_DIVE.destinations}
        sections={MIXOLOGY_COCKTAIL_DEEP_DIVE.sections}
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
                  Highlighting an artisanal cocktail menu in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your bar location, featured spirits, and cocktail count for an itemized filming proposal.
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
        faqs={PORTED_SERVICE_FAQS["/services/mixology-cocktail-videographer-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/mixology-cocktail-videographer-miami" />
      <NicheAnswers path="/services/mixology-cocktail-videographer-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
