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
import { TRADE_SHOW_BOOTH_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Trade Show Booth Videographer Fort Lauderdale",
  description:
    "Trade show booth and convention floor videography in Fort Lauderdale and Miami with stabilized 4K footage, booth demonstration capture, and B2B social video.",
  path: "/services/trade-show-booth-videographer-fort-lauderdale",
  locale: "en",
});

export default function TradeShowBoothVideographerFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/trade-show-booth-videographer-fort-lauderdale"),
        PORTED_SERVICE_FAQS["/services/trade-show-booth-videographer-fort-lauderdale"],
      ),
      ...buildServicePageNodes({
        path: "/services/trade-show-booth-videographer-fort-lauderdale",
        name: "Trade Show Booth Videographer Fort Lauderdale",
        description:
          "Convention floor videography, trade show booth demo filming, and exhibitor B2B video production in Fort Lauderdale and Miami.",
        crumb: "Trade Show Booth Videographer Fort Lauderdale",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/trade-show-booth-videographer-fort-lauderdale#service"),
        name: "Trade Show Booth Videographer Fort Lauderdale",
        description:
          "Exhibition booth capture, convention floor demo filming, and trade show video production in Fort Lauderdale and Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Broward County / Miami",
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
              "/services/trade-show-booth-videographer-fort-lauderdale",
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
                Trade Show Booth Videographer Fort Lauderdale
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale &amp; Miami / Conventions &amp; Trade Shows
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Trade Show Booth &amp; Convention Floor Videographer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Stabilized 4K filming on convention floors, live booth demonstrations, and dynamic B2B video recaps for exhibitors at the Broward County and Miami Beach convention centers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Check Event Dates
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What on-set event proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified on-location event videography and commercial production filmed by Esteban Moreno across South Florida. Explore our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">event film portfolio</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Event Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="trade show booth videography in Fort Lauderdale and Miami" />

      <ServiceDeepDive
        id={TRADE_SHOW_BOOTH_DEEP_DIVE.id}
        title={TRADE_SHOW_BOOTH_DEEP_DIVE.title}
        destinations={TRADE_SHOW_BOOTH_DEEP_DIVE.destinations}
        sections={TRADE_SHOW_BOOTH_DEEP_DIVE.sections}
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
                  Exhibiting at an upcoming convention in South Florida?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your convention center venue, booth dimensions, and filming schedule for a prompt written proposal.
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
        faqs={PORTED_SERVICE_FAQS["/services/trade-show-booth-videographer-fort-lauderdale"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/trade-show-booth-videographer-fort-lauderdale" />
      <NicheAnswers path="/services/trade-show-booth-videographer-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
