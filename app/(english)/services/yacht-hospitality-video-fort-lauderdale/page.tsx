import React from "react";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Calculator,
  Mail,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { YACHT_HOSPITALITY_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Yacht Hospitality Video Fort Lauderdale | Marine Editing",
  description:
    "Fort Lauderdale yacht video editing and promotional marine post-production. Turn charter, broker, and waterfront hospitality footage into engaging video.",
  path: "/services/yacht-hospitality-video-fort-lauderdale",
  locale: "en",
});

export default function YachtHospitalityVideoFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/yacht-hospitality-video-fort-lauderdale"),
        YACHT_HOSPITALITY_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/yacht-hospitality-video-fort-lauderdale#service"),
        name: "Yacht Hospitality Video Fort Lauderdale",
        description:
          "Fort Lauderdale yacht video editing, marine drone footage formatting, and luxury charter promotional video post-production.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Fort Lauderdale / Broward",
        serviceType: "Marine video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                Fort Lauderdale Yacht Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Yachting & Marine
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Yacht & Marine Video Editing in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Promotional video post-production for yacht charter companies, marine brokers, and waterfront hospitality venues in South Florida.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Yacht Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/banacol"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Marine Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Marine & aerial proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>{" "}
                project <strong>Banacol</strong> proves published aerial drone cinematography filmed on assignment from boats at sea.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/banacol"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
                >
                  Review Banacol Marine & Aerial Drone Proof
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/*
        Citable depth for the marine page.
        Measured 2026-10-06 with scripts/dual-audience-gate.mjs: this page scored
        ZERO sections in the 100-180 word band — every unit was 46-90 words.
        It was first reported as blocked on new facts from Esteban. That was
        wrong: the page already publishes the material, fragmented across three
        craft cards and five FAQ answers, all below citable weight.
        These three sections expand the craft cards' own argument — what the
        piece has to show, how it should move, and what it must still let a
        buyer inspect. They deliberately do NOT restate the FAQ answers, which
        already cover footage, sound, drone handling, formats and handoff.
      */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="yacht-depth">
        <Container size="xl">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="border-b border-[#ddd4c8] pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Scope and technical criteria
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                How a charter edit stays desirable and still answerable
              </h2>
            </div>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">What does a yacht promo actually have to show?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A yacht promo carries two jobs at once: show the vessel accurately, and make the
                day feel worth booking. Wide exterior passes establish the boat, but the material
                that actually supports a booking is usually closer in — guests boarding, towels,
                catering, shaded seating, clean cabins, and the water moving past the hull. The
                edit has to connect those details to the vessel itself. When it does not, the
                piece drifts into a vague lifestyle montage that could belong to any boat, and a
                charter buyer learns nothing they can act on. The test is simple: after watching,
                can a viewer say which vessel this was and what a day on it would be like.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">How should a marine edit move between slow and fast?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                Pace is not one setting across a charter piece. Interiors and deck spaces need
                slower shots so a viewer can read the layout, the finish and how much room there
                actually is; water sports, aerial passes and arrival moments survive much faster
                cutting and lose energy without it. Mixing those two rhythms deliberately is most
                of what makes a charter edit feel expensive rather than merely busy. The risk runs
                both ways: cut the interiors at social-media speed and the vessel becomes
                unreadable, and hold the action shots too long and the day stops feeling like
                something worth being on board for.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">Can a polished edit still answer a buyer&rsquo;s questions?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A charter edit can feel polished and still answer the practical things a broker or
                guest needs: the vessel name, the layout, what the passenger experience is, where
                it runs from, and how a booking is actually made. Those are not an interruption to
                the atmosphere; they are the reason the atmosphere is being shown. The aim is to
                make the offer easier to inspect, not only to make the footage prettier. Where a
                detail is commercially sensitive — specifications, pricing, availability — it stays
                the operator&rsquo;s to confirm and publish, and the edit leaves room for it rather
                than inventing it.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={YACHT_HOSPITALITY_DEPTH.craftHeading}
        cards={YACHT_HOSPITALITY_DEPTH.craft}
        sectionId="yacht-hospitality-craft"
      />
      <ServiceFaqs
        heading={YACHT_HOSPITALITY_DEPTH.faqHeading}
        faqs={YACHT_HOSPITALITY_DEPTH.faqs}
      />
      <ServiceRelated
        heading={YACHT_HOSPITALITY_DEPTH.relatedHeading}
        services={YACHT_HOSPITALITY_DEPTH.related}
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
                  Promoting a yacht charter or marine service in Fort Lauderdale?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send your vessel clips or drone footage for editing, or calculate your custom project scope online.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" aria-hidden="true" />
                  Budget Calculator
                </Link>
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
    </main>
  );
}
