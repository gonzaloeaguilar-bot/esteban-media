import Link from "next/link";
import { ArrowRight, Sparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { COSMETICS_PRODUCT_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Cosmetics Product Video Miami",
  description:
    "Cosmetics product video production in Miami: macro skincare textures, dropper drips, non-glare beauty lighting, and TikTok Shop conversion reels.",
  path: "/services/cosmetics-product-video-miami",
  locale: "en",
});

export default function CosmeticsProductVideoMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/cosmetics-product-video-miami"),
        PORTED_SERVICE_FAQS["/services/cosmetics-product-video-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/cosmetics-product-video-miami",
        name: "Cosmetics Product Video Miami",
        description:
          "Macro cosmetics video production, clean skincare commercial filming, and beauty product cinematography across Miami Beach and Wynwood.",
        crumb: "Cosmetics Product Video Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/cosmetics-product-video-miami#service"),
        name: "Cosmetics Product Video Miami",
        description:
          "High-precision 1:1 macro video production for cosmetics labels, skincare founders, and beauty product e-commerce brands in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami Beach / Wynwood / Downtown Miami",
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
              "/services/cosmetics-product-video-miami",
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
                Cosmetics Product Video Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami Beach &amp; Wynwood / Beauty &amp; Skincare Cinematography
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Cosmetics &amp; Beauty Product Video.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                1:1 macro cinematography, velvety emulsion spreads, pipette dropper passes, and pore-accurate skin tone calibration for beauty and skincare brands in Miami.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Cosmetics Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Sparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What macro video experience is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified macro cinematography and studio product lighting. Watch our published <Link href="/portfolio/bar-door-monkey" className="underline decoration-[#e85d3e] underline-offset-4">Bar Door Monkey commercial spot</Link>.
              </p>
              <Link
                href="/portfolio/bar-door-monkey"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Commercial Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="cosmetics product video in Miami" />

      <ServiceDeepDive
        id={COSMETICS_PRODUCT_DEEP_DIVE.id}
        title={COSMETICS_PRODUCT_DEEP_DIVE.title}
        destinations={COSMETICS_PRODUCT_DEEP_DIVE.destinations}
        sections={COSMETICS_PRODUCT_DEEP_DIVE.sections}
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
                  Marketing beauty or skincare formulations in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share product SKU details, formulation textures, target distribution channels, and shoot timeline for a detailed production plan.
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
        faqs={PORTED_SERVICE_FAQS["/services/cosmetics-product-video-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/cosmetics-product-video-miami" />
      <NicheAnswers path="/services/cosmetics-product-video-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
