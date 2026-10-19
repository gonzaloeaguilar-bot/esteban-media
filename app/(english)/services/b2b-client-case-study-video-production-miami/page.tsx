import Link from "next/link";
import { ArrowRight, Briefcase, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { B2B_CLIENT_CASE_STUDY_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "B2B Client Case Study Video Production Miami",
  description:
    "B2B client case study video production in Miami: executive customer interviews, enterprise ROI proof, workflow B-roll, and testimonial films.",
  path: "/services/b2b-client-case-study-video-production-miami",
  locale: "en",
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/b2b-client-case-study-video-production-miami"),
        PORTED_SERVICE_FAQS["/services/b2b-client-case-study-video-production-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/b2b-client-case-study-video-production-miami",
        name: "B2B Client Case Study Video Production Miami",
        description:
          "B2B client case study video production in Miami: executive customer interviews, enterprise ROI proof, workflow B-roll, and testimonial films.",
        crumb: "B2B Case Study Video Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/b2b-client-case-study-video-production-miami#service"),
        name: "B2B Client Case Study Video Production Miami",
        description:
          "B2B client case study video production in Miami: executive customer interviews, enterprise ROI proof, workflow B-roll, and testimonial films.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Brickell / Coral Gables",
        serviceType: "B2B client case study video production",
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
              "/services/b2b-client-case-study-video-production-miami",
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
                B2B Case Study Video Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / B2B Enterprise Video Production
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                B2B Client Case Study Video Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Executive client video case studies and testimonial production for enterprise SaaS, fintech, and professional services firms in Miami and Brickell.
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
              <Briefcase className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What corporate documentary proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review our verified production work and cinematography pacing. Watch our published <Link href="/portfolio/homeowners" className="underline decoration-[#e85d3e] underline-offset-4">Watch Published Corporate Documentary Video Work</Link>.
              </p>
              <Link
                href="/portfolio/homeowners"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Corporate Documentary Video Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="B2B client case study video production" />

      <ServiceDeepDive
        id={B2B_CLIENT_CASE_STUDY_DEEP_DIVE.id}
        title={B2B_CLIENT_CASE_STUDY_DEEP_DIVE.title}
        destinations={B2B_CLIENT_CASE_STUDY_DEEP_DIVE.destinations}
        sections={B2B_CLIENT_CASE_STUDY_DEEP_DIVE.sections}
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
                  Accelerating enterprise sales cycles with customer video case studies?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your client industry, filming location, interview objectives, and sales enablement formats for a customized B2B production quote.
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
        faqs={PORTED_SERVICE_FAQS["/services/b2b-client-case-study-video-production-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/b2b-client-case-study-video-production-miami" />
      <NicheAnswers path="/services/b2b-client-case-study-video-production-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
