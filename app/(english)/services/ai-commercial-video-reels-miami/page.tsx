import Link from "next/link";
import { ArrowRight, Sparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import {
  AI_COMMERCIAL_REELS_DEEP_DIVE,
  AI_COMMERCIAL_REELS_FAQS,
} from "@/lib/event-ai-pages-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { CaseStudyRail } from "@/components/case-study-rail";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "AI Commercial Video Reels Miami",
  description:
    "AI-assisted commercial Reels for restaurants, real estate, and ecommerce in Miami. Clear disclosure, platform labeling compliance, and human post-production control.",
  path: "/services/ai-commercial-video-reels-miami",
  locale: "en",
});

export default function AiCommercialVideoReelsMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/ai-commercial-video-reels-miami"),
        AI_COMMERCIAL_REELS_FAQS,
      ),
      ...buildServicePageNodes({
        path: "/services/ai-commercial-video-reels-miami",
        name: "AI Commercial Video Reels Miami",
        description:
          "AI-assisted commercial Reels for restaurants, real estate, and ecommerce in Miami. Clear disclosure, platform labeling compliance, and human post-production control.",
        crumb: "AI Commercial Video Reels Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/ai-commercial-video-reels-miami#service"),
        name: "AI Commercial Video Reels Miami",
        description:
          "AI-assisted short-form commercial video editing, motion graphics, captioning, and voiceover enhancement for South Florida businesses.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / South Florida / Remote",
        serviceType: "Video editing and post-production",
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
              "/services/ai-commercial-video-reels-miami",
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
                AI Commercial Video Reels Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / AI-Assisted Short-Form
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                AI Commercial Video Reels in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                AI-assisted vertical commercial Reels for local restaurants, real estate portfolios, and ecommerce brands. We leverage AI acceleration for voiceovers, generated atmospheric b-roll, motion graphics, and rapid captioning—while narrative pacing, hooks, claims, and compliance remain strictly supervised by human editors.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Contact for Commercial Reels
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Sparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What portfolio proof supports commercial video editing?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <strong>My D&apos;ler</strong>: commercial product and brand video editing showcasing human rhythm, pacing, and visual polish. For clinic video and on-location captures, see <strong>Healthy Smile Miami</strong>. AI assists speed and asset generation; final storytelling decisions and client brand integrity are led by human editing.
              </p>
              <Link
                href="/portfolio/my-dler"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review My D&apos;ler Portfolio Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="AI commercial video reels in Miami" />
      <CaseStudyRail ids={["dupont-ai-commercial"]} locale="en" source="ai_commercial_service_case" heading="What did an AI commercial do for a South Florida realtor?" />

      <ServiceDeepDive
        id={AI_COMMERCIAL_REELS_DEEP_DIVE.id}
        title={AI_COMMERCIAL_REELS_DEEP_DIVE.title}
        destinations={AI_COMMERCIAL_REELS_DEEP_DIVE.destinations}
        sections={AI_COMMERCIAL_REELS_DEEP_DIVE.sections}
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
                  Ready to test AI-assisted commercial Reels?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Email or call with your raw assets, product details, and target social platforms to scope production.
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
        faqs={AI_COMMERCIAL_REELS_FAQS}
        sectionId="ai-commercial-faqs"
      />
      <NicheAnswers path="/services/ai-commercial-video-reels-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
