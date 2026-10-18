import Link from "next/link";
import { ArrowRight, Camera, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { EXECUTIVE_INTERVIEW_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Executive Interview Videographer Miami",
  description:
    "Executive interview videography and corporate testimonial filming in Miami offices and venues, with professional lighting, dual audio, and clean editing.",
  path: "/services/executive-interview-videographer-miami",
  locale: "en",
});

export default function ExecutiveInterviewVideographerMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/executive-interview-videographer-miami"),
        PORTED_SERVICE_FAQS["/services/executive-interview-videographer-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/executive-interview-videographer-miami",
        name: "Executive Interview Videographer Miami",
        description:
          "Executive interview filming, leadership thought-video production, and client testimonial capture in Miami and South Florida.",
        crumb: "Executive Interview Videographer Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/executive-interview-videographer-miami#service"),
        name: "Executive Interview Videographer Miami",
        description:
          "Executive interview videography, corporate testimonial video production, and LinkedIn thought-leadership editing in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade County / Remote",
        serviceType: "Corporate video production",
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
              "/services/executive-interview-videographer-miami",
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
                Executive Interview Videographer Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Corporate Leadership &amp; Testimonials
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Executive Interview Videographer in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                On-location filming for executive leadership interviews, investor updates, and client case study testimonials across Miami. Studio-grade lighting, noise-isolated dual audio, and professional brand editing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Executive Interview
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What corporate interview proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Esteban films on-location business leadership and brand profiles with crisp sound and balanced lighting. Review our commercial brand work for <Link href="/portfolio/banacol" className="underline decoration-[#e85d3e] underline-offset-4">Banacol</Link>.
              </p>
              <Link
                href="/portfolio/banacol"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review Banacol Production Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="executive interview videography in Miami" />

      <ServiceDeepDive
        id={EXECUTIVE_INTERVIEW_DEEP_DIVE.id}
        title={EXECUTIVE_INTERVIEW_DEEP_DIVE.title}
        destinations={EXECUTIVE_INTERVIEW_DEEP_DIVE.destinations}
        sections={EXECUTIVE_INTERVIEW_DEEP_DIVE.sections}
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
                  Scheduling an executive interview or client testimonial?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Hourly on-location filming from $80/hr with full horizontal and vertical social cuts.
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
        faqs={PORTED_SERVICE_FAQS["/services/executive-interview-videographer-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/executive-interview-videographer-miami" />
      <NicheAnswers path="/services/executive-interview-videographer-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
