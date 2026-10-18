import Link from "next/link";
import { ArrowRight, Home, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { LUXURY_PENTHOUSE_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Luxury Penthouse Video Tour Miami",
  description:
    "Luxury penthouse video tours and architectural walkthroughs in Sunny Isles Beach, Miami Beach, and Downtown Miami with balanced oceanfront views and international buyer marketing.",
  path: "/services/luxury-penthouse-video-tour-miami",
  locale: "en",
});

export default function LuxuryPenthouseVideoTourMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/luxury-penthouse-video-tour-miami"),
        PORTED_SERVICE_FAQS["/services/luxury-penthouse-video-tour-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/luxury-penthouse-video-tour-miami",
        name: "Luxury Penthouse Video Tour Miami",
        description:
          "Luxury penthouse video tours, oceanfront sky residence walkthroughs, and architectural cinematography in Sunny Isles Beach, Miami Beach, and Downtown Miami.",
        crumb: "Luxury Penthouse Video Tour Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/luxury-penthouse-video-tour-miami#service"),
        name: "Luxury Penthouse Video Tour Miami",
        description:
          "Cinematic architectural video tours for luxury real estate brokerages marketing multi-million-dollar penthouses in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Sunny Isles Beach / Miami Beach / Downtown Miami",
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
              "/services/luxury-penthouse-video-tour-miami",
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
                Luxury Penthouse Video Tour Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Sunny Isles Beach &amp; Miami Beach / Luxury Sky Residences
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Luxury Penthouse Video Tours.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Balanced floor-to-ceiling ocean vistas, fluid interior gimbal walkthroughs, and broadcast-grade marketing films for signature penthouses across Sunny Isles Beach and Miami Beach.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Penthouse Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Home className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What architectural proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified real estate and event cinematography filmed in South Florida. Watch our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">Diana and Jack portfolio film</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Visual Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="luxury penthouse video tours in Miami" />

      <ServiceDeepDive
        id={LUXURY_PENTHOUSE_DEEP_DIVE.id}
        title={LUXURY_PENTHOUSE_DEEP_DIVE.title}
        destinations={LUXURY_PENTHOUSE_DEEP_DIVE.destinations}
        sections={LUXURY_PENTHOUSE_DEEP_DIVE.sections}
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
                  Representing a luxury penthouse in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share property address, building orientation, and marketing timeline for a tailored production estimate.
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
        faqs={PORTED_SERVICE_FAQS["/services/luxury-penthouse-video-tour-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/luxury-penthouse-video-tour-miami" />
      <NicheAnswers path="/services/luxury-penthouse-video-tour-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
