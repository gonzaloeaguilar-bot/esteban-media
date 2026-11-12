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
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { YACHT_CHARTER_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  SHORT_FORM,
  TURNKEY_PRODUCTION_BUNDLES,
  YACHT_PRODUCTION,
  usd,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Yacht Charter Video Production Fort Lauderdale",
  description:
    `Yacht charter video production in Fort Lauderdale: remote charter reels from ${usd(SHORT_FORM.perVideoFrom)} per video, half-day shoots from ${usd(YACHT_PRODUCTION.halfDaySolo)} raw or ${usd(TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay)} turnkey.`,
  path: "/services/yacht-charter-video-production-fort-lauderdale",
  locale: "en",
});

export default function YachtCharterVideoProductionFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildServicePageNodes({
        path: "/services/yacht-charter-video-production-fort-lauderdale",
        name: "Yacht Charter Video Production Fort Lauderdale",
        description:
          `Yacht charter video production in Fort Lauderdale: remote charter reels from ${usd(SHORT_FORM.perVideoFrom)} per video, half-day shoots from ${usd(YACHT_PRODUCTION.halfDaySolo)} raw or ${usd(TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay)} turnkey.`,
        crumb: "Fort Lauderdale Yacht Charter Video",
      }),
      buildServiceFaqSchema(
        absoluteUrl("/services/yacht-charter-video-production-fort-lauderdale"),
        YACHT_CHARTER_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/yacht-charter-video-production-fort-lauderdale#service"),
        name: "Yacht Charter Video Production Fort Lauderdale",
        description:
          "Yacht charter video production and marine editing in Fort Lauderdale: dockside capture, remote charter reels, and booking films for yacht brokers and captains.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Broward",
        serviceType: "Yacht charter video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/yacht-charter-video-production-fort-lauderdale", jsonLd)) }}
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
                Fort Lauderdale Yacht Charter Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Yachting &amp; Marine
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Yacht Charter Video Production and Marine Editing in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Charter films, dockside capture, and booking Reels for Fort Lauderdale yacht brokers and captains. Remote editing from {usd(SHORT_FORM.perVideoFrom)} per video, half-day shoots from {usd(YACHT_PRODUCTION.halfDaySolo)} raw or {usd(TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay)} turnkey, with captions in English and Spanish.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Charter Film
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
              <p className="mt-6 text-sm text-[#5a6066]">
                ¿Prefieres español? Lee la versión en español:{" "}
                <Link href="/es/video-para-yates-y-hospitalidad-fort-lauderdale" className="underline decoration-[#e85d3e] underline-offset-4 hover:text-[#9f3c27]">
                  video para yates y hospitalidad
                </Link>
                .
              </p>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Marine &amp; aerial proof</h2>
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
                  Review Banacol Marine &amp; Aerial Drone Proof
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
        Citable depth for the charter hub. The three craft cards below name
        the criteria; these three sections carry the argument at citable
        weight (100-180 words each) without restating the FAQ answers, which
        already cover footage, remote editing, formats, and pricing.
      */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="yacht-charter-depth">
        <Container size="xl">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="border-b border-[#ddd4c8] pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Scope and technical criteria
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                What a charter film has to prove, in order
              </h2>
            </div>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">What does a charter film actually have to show?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A charter film carries two jobs at once: show the vessel accurately, and make the
                day feel worth booking. Wide exterior passes establish the boat, but the material
                that actually supports a booking is usually closer in, guests boarding, shaded
                seating, clean cabins, catering, water toys, and the crew at work. The edit has
                to connect those details to the vessel itself. When it does not, the piece drifts
                into a lifestyle montage that could belong to any boat, and a charter buyer learns
                nothing they can act on. The test is simple: after watching, can a viewer say
                which vessel this was and what a day on it would be like.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">How should a marine edit move between slow and fast?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                Pace is not one setting across a charter piece. Interiors and deck spaces need
                slower shots so a viewer can read the layout, the finish, and how much room there
                actually is; water sports, aerial passes, and arrival moments survive much faster
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
                it runs from, and how a booking is actually made. Those are not an interruption
                to the atmosphere; they are the reason the atmosphere is being shown. The aim is
                to make the offer easier to inspect, not only to make the footage prettier. Where
                a detail is commercially sensitive, specifications, pricing, availability, it stays
                the operator&rsquo;s to confirm and publish, and the edit leaves room for it rather
                than inventing it.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={YACHT_CHARTER_DEPTH.craftHeading}
        cards={YACHT_CHARTER_DEPTH.craft}
        sectionId="yacht-charter-craft"
      />
      <ServiceFaqs
        heading={YACHT_CHARTER_DEPTH.faqHeading}
        faqs={YACHT_CHARTER_DEPTH.faqs}
      />
      <ServiceInquiryRail
        service={{
          serviceId: "yacht_charter_video_production",
          serviceName: "yacht charter video production",
          goalPrompt: "turn charter, broker, or hospitality footage into a booking film",
          assetPrompt: "vessel name, specifications safe to publish, drone and cabin footage, booking contact, and shots not to use",
          proofHref: "/portfolio/banacol",
          proofLabel: "Review Banacol marine and aerial proof",
        }}
      />
      <ServiceRelated
        heading={YACHT_CHARTER_DEPTH.relatedHeading}
        services={YACHT_CHARTER_DEPTH.related}
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
                  Marketing a charter fleet or a single vessel in Fort Lauderdale?
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
      <EventSeasonLinks locale="en" path="/services/yacht-charter-video-production-fort-lauderdale" />
      <NicheAnswers path="/services/yacht-charter-video-production-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
