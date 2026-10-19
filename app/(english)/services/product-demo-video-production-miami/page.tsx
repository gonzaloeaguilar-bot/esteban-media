import Link from "next/link";
import { ArrowRight, Laptop, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { PRODUCT_DEMO_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Product Demo Video Production Miami",
  description:
    "Product demonstration video production in Miami: overhead unboxing angles, step-by-step assembly guides, QR-linked support clips, and high-fidelity sound.",
  path: "/services/product-demo-video-production-miami",
  locale: "en",
});

export default function ProductDemoVideoMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/product-demo-video-production-miami"),
        PORTED_SERVICE_FAQS["/services/product-demo-video-production-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/product-demo-video-production-miami",
        name: "Product Demo Video Production Miami",
        description:
          "Product demo video production, step-by-step hardware walkthroughs, and unboxing cinematography in Miami and Fort Lauderdale.",
        crumb: "Product Demo Video Production Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/product-demo-video-production-miami#service"),
        name: "Product Demo Video Production Miami",
        description:
          "Clear, high-converting product demonstration and unboxing video production for consumer brands, hardware makers, and tech startups in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Doral / Fort Lauderdale",
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
              "/services/product-demo-video-production-miami",
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
                Product Demo Video Production Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami &amp; Doral / Product Demonstration &amp; Assembly Walkthroughs
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Product Demo Video Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Overhead tabletop camera setups, step-by-step unboxing choreography, tactile component sound, and clear instructional edits that eliminate customer confusion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Demo Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Laptop className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What product demonstration proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified product commercial pacing and close-up assembly footage. Watch our published <Link href="/portfolio/bar-door-monkey" className="underline decoration-[#e85d3e] underline-offset-4">Bar Door Monkey commercial spot</Link>.
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

      <ServiceAnswerFirst service="product demo video production in Miami" />

      <ServiceDeepDive
        id={PRODUCT_DEMO_DEEP_DIVE.id}
        title={PRODUCT_DEMO_DEEP_DIVE.title}
        destinations={PRODUCT_DEMO_DEEP_DIVE.destinations}
        sections={PRODUCT_DEMO_DEEP_DIVE.sections}
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
                  Building a clear product demonstration video in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Tell us about product complexity, key customer objections, and preferred deliverable format for a fast production timeline.
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
        faqs={PORTED_SERVICE_FAQS["/services/product-demo-video-production-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/product-demo-video-production-miami" />
      <NicheAnswers path="/services/product-demo-video-production-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
