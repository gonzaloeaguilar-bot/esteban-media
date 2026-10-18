import Link from "next/link";
import { ArrowRight, Building2, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { COMMERCIAL_REAL_ESTATE_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Commercial Real Estate Video Miami",
  description:
    "Commercial real estate video production in Miami and Doral with architectural walkthroughs, Class A office tours, and logistics warehouse video for leasing brokers.",
  path: "/services/commercial-real-estate-video-miami",
  locale: "en",
});

export default function CommercialRealEstateVideoMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/commercial-real-estate-video-miami"),
        PORTED_SERVICE_FAQS["/services/commercial-real-estate-video-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/commercial-real-estate-video-miami",
        name: "Commercial Real Estate Video Miami",
        description:
          "Commercial real estate video walkthroughs, office leasing tours, and industrial warehouse video production in Miami and Doral.",
        crumb: "Commercial Real Estate Video Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/commercial-real-estate-video-miami#service"),
        name: "Commercial Real Estate Video Miami",
        description:
          "Professional architectural video walkthroughs for commercial leasing brokers, asset managers, and industrial property owners in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Doral / Downtown Miami",
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
              "/services/commercial-real-estate-video-miami",
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
                Commercial Real Estate Video Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami &amp; Doral / Commercial Office &amp; Logistics Leasing
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Commercial Real Estate Video Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Architectural walkthroughs, Class A office tours, and logistics warehouse video for commercial brokers and asset managers across Miami, Doral, and Downtown Miami.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Property Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Building2 className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What corporate production proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified corporate and architectural production filmed in South Florida. Watch our published <Link href="/portfolio/homeowners" className="underline decoration-[#e85d3e] underline-offset-4">Homeowners portfolio film</Link>.
              </p>
              <Link
                href="/portfolio/homeowners"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Commercial Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="commercial real estate video in Miami" />

      <ServiceDeepDive
        id={COMMERCIAL_REAL_ESTATE_DEEP_DIVE.id}
        title={COMMERCIAL_REAL_ESTATE_DEEP_DIVE.title}
        destinations={COMMERCIAL_REAL_ESTATE_DEEP_DIVE.destinations}
        sections={COMMERCIAL_REAL_ESTATE_DEEP_DIVE.sections}
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
                  Marketing a commercial property in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share property location, square footage, and target tenant timeline for an itemized commercial proposal.
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
        faqs={PORTED_SERVICE_FAQS["/services/commercial-real-estate-video-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/commercial-real-estate-video-miami" />
      <NicheAnswers path="/services/commercial-real-estate-video-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
