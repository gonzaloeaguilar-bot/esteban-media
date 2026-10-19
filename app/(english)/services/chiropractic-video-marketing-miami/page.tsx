import Link from "next/link";
import { ArrowRight, Activity, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { CHIROPRACTIC_VIDEO_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Chiropractic Video Marketing Miami",
  description:
    "Chiropractic video marketing in Miami: spinal adjustment acoustics, mobility assessments, posture rehabilitation explainers, and new patient onboarding reels.",
  path: "/services/chiropractic-video-marketing-miami",
  locale: "en",
});

export default function ChiropracticVideoMarketingMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/chiropractic-video-marketing-miami"),
        PORTED_SERVICE_FAQS["/services/chiropractic-video-marketing-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/chiropractic-video-marketing-miami",
        name: "Chiropractic Video Marketing Miami",
        description:
          "Chiropractic clinic video marketing, spinal adjustment acoustic recording, posture education reels, and patient onboarding videos in Miami and Doral.",
        crumb: "Chiropractic Video Marketing Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/chiropractic-video-marketing-miami#service"),
        name: "Chiropractic Video Marketing Miami",
        description:
          "Educational, acoustic-rich video production for chiropractors, spine health practices, and physical rehabilitation clinics in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / Doral / Coral Gables",
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
              "/services/chiropractic-video-marketing-miami",
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
                Chiropractic Video Marketing Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami &amp; Doral / Chiropractic Practice &amp; Spine Health Video
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Chiropractic Video Marketing.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Crisp acoustic capture of manual spinal adjustments, gentle posture correction walkthroughs, patient consent protocols, and approachable doctor educational reels in Miami.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Practice Shoot
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Activity className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What wellness video proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Explore specialized wellness, gym, and health video production across Miami. Review our guide on <Link href="/services/wellness-spa-video-marketing-miami" className="underline decoration-[#e85d3e] underline-offset-4">wellness spa video marketing Miami</Link>.
              </p>
              <Link
                href="/services/wellness-spa-video-marketing-miami"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Wellness Video Guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="chiropractic video marketing in Miami" />

      <ServiceDeepDive
        id={CHIROPRACTIC_VIDEO_DEEP_DIVE.id}
        title={CHIROPRACTIC_VIDEO_DEEP_DIVE.title}
        destinations={CHIROPRACTIC_VIDEO_DEEP_DIVE.destinations}
        sections={CHIROPRACTIC_VIDEO_DEEP_DIVE.sections}
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
                  Attracting new patients to your Miami clinic?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share clinic rooms, common patient questions, and adjustment techniques for an approachable practice video proposal.
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
        faqs={PORTED_SERVICE_FAQS["/services/chiropractic-video-marketing-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/chiropractic-video-marketing-miami" />
      <NicheAnswers path="/services/chiropractic-video-marketing-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
