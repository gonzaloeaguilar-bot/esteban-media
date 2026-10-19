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
import { EXECUTIVE_VIDEO_BIO_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Executive Video Bio Production Miami",
  description:
    "Executive video bio production in Miami: board profile films, conversational leadership interviews, C-suite brand stories, and modular LinkedIn thought leadership reels.",
  path: "/services/executive-video-bio-production-miami",
  locale: "en",
});

export default function ExecutiveVideoBioMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/executive-video-bio-production-miami"),
        PORTED_SERVICE_FAQS["/services/executive-video-bio-production-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/executive-video-bio-production-miami",
        name: "Executive Video Bio Production Miami",
        description:
          "Executive video bio production, C-suite leadership interviews, and board profile films in Downtown Miami and Coral Gables.",
        crumb: "Executive Video Bio Production Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/executive-video-bio-production-miami#service"),
        name: "Executive Video Bio Production Miami",
        description:
          "Authoritative, conversational executive video biography production for corporate leaders, partners, and board directors across South Florida.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Downtown Miami / Coral Gables / Fort Lauderdale",
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
              "/services/executive-video-bio-production-miami",
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
                Executive Video Bio Production Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Downtown Miami &amp; Coral Gables / Corporate Leadership &amp; Board Bios
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Executive Video Bio Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Soft multi-point lighting, balanced executive suite acoustics, teleprompter-free conversational interviews, and modular thought leadership cutdowns for LinkedIn.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Executive Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Briefcase className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What executive interview proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Explore conversational corporate interviews and executive video framing across South Florida. Review our guide on <Link href="/services/executive-interview-videographer-miami" className="underline decoration-[#e85d3e] underline-offset-4">executive interview videographer Miami</Link>.
              </p>
              <Link
                href="/services/executive-interview-videographer-miami"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Executive Interview Guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="executive video bio production in Miami" />

      <ServiceDeepDive
        id={EXECUTIVE_VIDEO_BIO_DEEP_DIVE.id}
        title={EXECUTIVE_VIDEO_BIO_DEEP_DIVE.title}
        destinations={EXECUTIVE_VIDEO_BIO_DEEP_DIVE.destinations}
        sections={EXECUTIVE_VIDEO_BIO_DEEP_DIVE.sections}
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
                  Filming an executive bio or corporate profile in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share executive schedule, office or boardroom location, and target publishing channels for a discreet production plan.
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
        faqs={PORTED_SERVICE_FAQS["/services/executive-video-bio-production-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/executive-video-bio-production-miami" />
      <NicheAnswers path="/services/executive-video-bio-production-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
