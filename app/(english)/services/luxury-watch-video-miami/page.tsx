import Link from "next/link";
import { ArrowRight, Watch, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { LUXURY_WATCH_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Luxury Watch Video Miami",
  description:
    "Macro luxury watch video production in Downtown Miami Diamond District with true 1:1 optics, dial detail lighting, and bezel finish inspection reels.",
  path: "/services/luxury-watch-video-miami",
  locale: "en",
});

export default function LuxuryWatchVideoMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/luxury-watch-video-miami"),
        PORTED_SERVICE_FAQS["/services/luxury-watch-video-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/luxury-watch-video-miami",
        name: "Luxury Watch Video Miami",
        description:
          "Macro luxury watch commercial video production, horology condition inspection reels, and timepiece cinematography in Downtown Miami Diamond District.",
        crumb: "Luxury Watch Video Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/luxury-watch-video-miami#service"),
        name: "Luxury Watch Video Miami",
        description:
          "High-precision 1:1 macro video production for luxury watch dealers, horology retailers, and fine jewelry collectors in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Downtown Miami / Coral Gables / Palm Beach",
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
              "/services/luxury-watch-video-miami",
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
                Luxury Watch Video Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Downtown Miami / Diamond District &amp; Luxury Horology
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Luxury Watch Commercial Video.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                True 1:1 macro cinematography, diffuse anti-reflective lighting, mechanical acoustic capture, and collector condition inspection reels in Miami.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Watch Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Watch className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What product commercial proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified commercial cinematography and close-up product pacing. Watch our published <Link href="/portfolio/bar-door-monkey" className="underline decoration-[#e85d3e] underline-offset-4">Bar Door Monkey commercial spot</Link>.
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

      <ServiceAnswerFirst service="luxury watch video in Miami" />

      <ServiceDeepDive
        id={LUXURY_WATCH_DEEP_DIVE.id}
        title={LUXURY_WATCH_DEEP_DIVE.title}
        destinations={LUXURY_WATCH_DEEP_DIVE.destinations}
        sections={LUXURY_WATCH_DEEP_DIVE.sections}
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
                  Marketing fine watches or jewelry in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share number of timepieces, reference details, and filming schedule for a secure on-site or studio macro video estimate.
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
        faqs={PORTED_SERVICE_FAQS["/services/luxury-watch-video-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/luxury-watch-video-miami" />
      <NicheAnswers path="/services/luxury-watch-video-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
