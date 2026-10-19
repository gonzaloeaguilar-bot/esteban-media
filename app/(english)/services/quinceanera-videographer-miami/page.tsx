import Link from "next/link";
import { ArrowRight, Heart, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { QUINCEANERA_VIDEOGRAPHER_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Quinceanera Videographer Miami",
  description:
    "Quinceanera videographer in Miami: full-day event cinematography, multicam church ceremony coverage, waltz choreography, and vertical family reels.",
  path: "/services/quinceanera-videographer-miami",
  locale: "en",
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/quinceanera-videographer-miami"),
        PORTED_SERVICE_FAQS["/services/quinceanera-videographer-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/quinceanera-videographer-miami",
        name: "Quinceanera Videographer Miami",
        description:
          "Quinceanera videographer in Miami: full-day event cinematography, multicam church ceremony coverage, waltz choreography, and vertical family reels.",
        crumb: "Quinceanera Videographer Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/quinceanera-videographer-miami#service"),
        name: "Quinceanera Videographer Miami",
        description:
          "Quinceanera videographer in Miami: full-day event cinematography, multicam church ceremony coverage, waltz choreography, and vertical family reels.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Coral Gables / Doral / Kendall",
        serviceType: "Quinceanera videographer",
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
              "/services/quinceanera-videographer-miami",
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
                Quinceanera Videographer Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami & Coral Gables / Milestone Family Cinematography
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Quinceañera Event Videographer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Full-day quinceañera event cinematography in Miami: multicam church blessings, court of honor choreography, waltz highlights, and vertical family reels.
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
              <Heart className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What celebration cinematography proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review our verified production work and cinematography pacing. Watch our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">Watch Published Milestone Celebration Cinematography</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Milestone Celebration Cinematography
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="quinceanera videographer" />

      <ServiceDeepDive
        id={QUINCEANERA_VIDEOGRAPHER_DEEP_DIVE.id}
        title={QUINCEANERA_VIDEOGRAPHER_DEEP_DIVE.title}
        destinations={QUINCEANERA_VIDEOGRAPHER_DEEP_DIVE.destinations}
        sections={QUINCEANERA_VIDEOGRAPHER_DEEP_DIVE.sections}
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
                  Planning a daughter&apos;s quinceañera celebration in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share celebration date, church venue, ballroom location, and court schedule for an accurate full-day cinematography quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/quinceanera-videographer-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/quinceanera-videographer-miami" />
      <NicheAnswers path="/services/quinceanera-videographer-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
