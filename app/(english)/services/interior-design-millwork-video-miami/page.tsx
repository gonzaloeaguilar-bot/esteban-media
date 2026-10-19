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
import { INTERIOR_DESIGN_MILLWORK_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Interior Design & Millwork Video Miami",
  description:
    "Interior design and architectural millwork video in Miami: custom cabinetry, luxury kitchen installations, designer walkthroughs, and showroom films.",
  path: "/services/interior-design-millwork-video-miami",
  locale: "en",
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/interior-design-millwork-video-miami"),
        PORTED_SERVICE_FAQS["/services/interior-design-millwork-video-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/interior-design-millwork-video-miami",
        name: "Interior Design & Millwork Video Miami",
        description:
          "Interior design and architectural millwork video in Miami: custom cabinetry, luxury kitchen installations, designer walkthroughs, and showroom films.",
        crumb: "Interior Design & Millwork Video Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/interior-design-millwork-video-miami#service"),
        name: "Interior Design & Millwork Video Miami",
        description:
          "Interior design and architectural millwork video in Miami: custom cabinetry, luxury kitchen installations, designer walkthroughs, and showroom films.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Miami Design District / Coral Gables",
        serviceType: "Interior design and millwork video production",
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
              "/services/interior-design-millwork-video-miami",
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
                Interior Design &amp; Millwork Video Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Luxury Interior Design &amp; Millwork Video
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Interior Design &amp; Millwork Video Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Cinematic architectural video production for interior designers, custom millwork fabricators, and luxury showrooms in Miami and the Design District.
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
              <Home className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What architectural production proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review our verified production work and cinematography pacing. Watch our published <Link href="/portfolio/bar-door-monkey" className="underline decoration-[#e85d3e] underline-offset-4">Watch Published Commercial Video Production Work</Link>.
              </p>
              <Link
                href="/portfolio/bar-door-monkey"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Commercial Video Production Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="interior design and millwork video production" />

      <ServiceDeepDive
        id={INTERIOR_DESIGN_MILLWORK_DEEP_DIVE.id}
        title={INTERIOR_DESIGN_MILLWORK_DEEP_DIVE.title}
        destinations={INTERIOR_DESIGN_MILLWORK_DEEP_DIVE.destinations}
        sections={INTERIOR_DESIGN_MILLWORK_DEEP_DIVE.sections}
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
                  Documenting high-end interior architecture, cabinetry, or showroom designs?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your project staging dates, custom millwork features, designer walkthrough notes, and portfolio goals for a customized production quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/interior-design-millwork-video-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/interior-design-millwork-video-miami" />
      <NicheAnswers path="/services/interior-design-millwork-video-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
