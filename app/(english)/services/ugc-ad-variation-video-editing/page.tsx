import Link from "next/link";
import { ArrowRight, Film, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { UGC_AD_VARIATION_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "UGC Ad Variation Video Editing",
  description:
    "UGC ad variation video editing: modular hook testing, problem-solution cutdowns, platform safe-zone formatting, and rapid iteration for Meta and TikTok ads.",
  path: "/services/ugc-ad-variation-video-editing",
  locale: "en",
});

export default function UgcAdVariationVideoEditingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/ugc-ad-variation-video-editing"),
        PORTED_SERVICE_FAQS["/services/ugc-ad-variation-video-editing"],
      ),
      ...buildServicePageNodes({
        path: "/services/ugc-ad-variation-video-editing",
        name: "UGC Ad Variation Video Editing",
        description:
          "High-volume UGC ad variation post-production, modular creative assembly, and paid social testing frameworks for D2C brands and performance agencies.",
        crumb: "UGC Ad Variation Video Editing",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/ugc-ad-variation-video-editing#service"),
        name: "UGC Ad Variation Video Editing",
        description:
          "Fast-turnaround UGC ad variation editing for paid social media buyers, DTC brands, and growth agencies scaling TikTok and Meta campaigns.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Remote / Miami / Fort Lauderdale",
        serviceType: "Video post-production",
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
              "/services/ugc-ad-variation-video-editing",
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
                UGC Ad Variation Video Editing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Paid Social Creative / Meta &amp; TikTok Ad Performance
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                UGC Ad Variation Video Editing.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Modular assembly of creator footage into high-converting 9:16 ad variants with varied hooks, problem framings, and calls to action that drive down cost per acquisition.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start Creative Sprint
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Film className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What paid ad editing experience is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified short-form editing structure and pacing. Explore our dedicated <Link href="/services/short-form-video-editor-miami" className="underline decoration-[#e85d3e] underline-offset-4">short-form video editor Miami</Link> service page.
              </p>
              <Link
                href="/services/short-form-video-editor-miami"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Short-Form Systems
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="ugc ad variation video editing" />

      <ServiceDeepDive
        id={UGC_AD_VARIATION_DEEP_DIVE.id}
        title={UGC_AD_VARIATION_DEEP_DIVE.title}
        destinations={UGC_AD_VARIATION_DEEP_DIVE.destinations}
        sections={UGC_AD_VARIATION_DEEP_DIVE.sections}
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
                  Scaling paid TikTok or Meta campaigns with UGC?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share creator raw footage links, monthly ad spend targets, and creative testing requirements for a custom editing retainer proposal.
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
        faqs={PORTED_SERVICE_FAQS["/services/ugc-ad-variation-video-editing"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/ugc-ad-variation-video-editing" />
      <NicheAnswers path="/services/ugc-ad-variation-video-editing" fact={String(metadata.description ?? "")} />
    </main>
  );
}
