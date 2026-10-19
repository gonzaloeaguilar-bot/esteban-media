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
import { YACHT_PARTY_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Yacht Party Videographer Miami",
  description:
    "Yacht party videographer in Miami: stabilized on-water celebrations, bachelorette cruises, sunset skyline dancing, and fast social teaser reels.",
  path: "/services/yacht-party-videographer-miami",
  locale: "en",
});

export default function YachtPartyVideographerMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/yacht-party-videographer-miami"),
        PORTED_SERVICE_FAQS["/services/yacht-party-videographer-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/yacht-party-videographer-miami",
        name: "Yacht Party Videographer Miami",
        description:
          "Private yacht party videography, bachelorette charter recap films, and on-water celebration cinematography across Biscayne Bay and Haulover Sandbar.",
        crumb: "Yacht Party Videographer Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/yacht-party-videographer-miami#service"),
        name: "Yacht Party Videographer Miami",
        description:
          "Cinematic on-water celebration videography for luxury yacht charters, private parties, and bachelorette groups in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami Beach / Biscayne Bay / Haulover",
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
              "/services/yacht-party-videographer-miami",
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
                Yacht Party Videographer Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Biscayne Bay &amp; Miami Beach / Private Yacht Party Cinematography
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Yacht Party Videographer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Three-axis gimbal stabilized camera work, sunset champagne toasts against the Downtown skyline, deck dancing, and rapid social media highlight recaps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Yacht Videographer
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What on-water event proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Explore private boat celebrations and luxury marine event coverage across South Florida. Review our guide on <Link href="/services/yacht-event-videographer-miami" className="underline decoration-[#e85d3e] underline-offset-4">yacht event videographer Miami</Link>.
              </p>
              <Link
                href="/services/yacht-event-videographer-miami"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Yacht Event Guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="yacht party videographer in Miami" />

      <ServiceDeepDive
        id={YACHT_PARTY_DEEP_DIVE.id}
        title={YACHT_PARTY_DEEP_DIVE.title}
        destinations={YACHT_PARTY_DEEP_DIVE.destinations}
        sections={YACHT_PARTY_DEEP_DIVE.sections}
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
                  Planning a yacht celebration or bachelorette party in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share departure marina, cruise hours, charter size, and requested recap deliverables for an exact quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/yacht-party-videographer-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/yacht-party-videographer-miami" />
      <NicheAnswers path="/services/yacht-party-videographer-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
