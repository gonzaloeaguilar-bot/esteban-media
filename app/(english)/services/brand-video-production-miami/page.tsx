import Link from "next/link";
import { ArrowRight, WandSparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Brand Video Production Miami",
  description:
    "Brand story videos, founder manifestos, and company overview video production for businesses in Miami.",
  path: "/services/brand-video-production-miami",
  locale: "en",
});

export default function BrandVideoProductionMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/brand-video-production-miami"), PORTED_SERVICE_FAQS["/services/brand-video-production-miami"]),
      ...buildServicePageNodes({
        path: "/services/brand-video-production-miami",
        name: "Brand Video Production Miami",
        description:
          "Brand story videos, founder manifestos, and company overview video production for businesses in Miami.",
        crumb: "Brand Video Production",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/brand-video-production-miami#service"),
        name: "Brand Video Production Miami",
        description:
          "Brand manifesto videos, founder story video production, and commercial brand positioning videos in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / South Florida",
        serviceType: "Brand video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/brand-video-production-miami", jsonLd)) }}
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
                Brand Video Production
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Brand Storytelling
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Brand Video Production in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Connect your business mission with customers through cinematic founder stories, brand manifestos, and company intro videos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Brand Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <WandSparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Brand video proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>{" "}
                project <strong>Healthy Smile</strong> proves published commercial brand video production, on-location shooting, and editing in Miami.
              </p>
              <Link
                href="/portfolio/healthy-smile"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review Healthy Smile Miami Brand Video Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="Brand video production" />

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Before a proposal</p>
            <h2 className="mt-3 font-serif text-4xl">What should a brand-film brief decide first?</h2>
            <p className="mt-4 text-base leading-7 text-[#252a2d]">Clarify the audience, approved message, launch date, final formats, brand references, review owner, and any usage questions. A shared brief lets a team compare proposals without assuming that a requested version or production choice is included.</p>
            <Link href="/guides/video-production-rfp-template-miami" className="mt-5 inline-flex text-sm font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#6f2417]">Use the video-production RFP template</Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Relaunching or defining your brand story?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Email or call to outline your brand video.
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
        faqs={PORTED_SERVICE_FAQS["/services/brand-video-production-miami"]}
        sectionId="ported-faq"
      />
      <NicheAnswers path="/services/brand-video-production-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
