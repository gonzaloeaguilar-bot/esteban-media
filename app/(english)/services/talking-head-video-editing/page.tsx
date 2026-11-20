import Link from "next/link";
import { ArrowRight, Video, Mail, Phone, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import {
  TALKING_HEAD_DEEP_DIVE,
  TALKING_HEAD_FAQS,
  TALKING_HEAD_RELATED,
} from "@/lib/talking-head-christian-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { whatsappHref } from "@/lib/packages";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/talking-head-video-editing";

export const metadata = buildPageMetadata({
  title: "Talking-Head Video Editing Service",
  description:
    "Remote talking-head video editing from your Drive footage: pause trimming, noise reduction, captions, and vertical Shorts in English and Spanish.",
  path,
  locale: "en",
});

export default function TalkingHeadVideoEditingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), TALKING_HEAD_FAQS),
      ...buildServicePageNodes({
        path,
        name: "Talking-Head Video Editing Service",
        description:
          "Remote talking-head video editing from client-supplied Drive footage: cut pauses, clean audio, dynamic captions, and vertical Shorts in English and Spanish.",
        crumb: "Talking-Head Video Editing",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Talking-Head Video Editing Service",
        description:
          "Professional remote editing of talking-head video recordings from phone or camera files: pacing optimization, audio mastering, dynamic subtitles, and vertical clips.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward / Remote",
        serviceType: "Talking-head video editing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Talking-Head Video Editing", item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService(path, jsonLd)) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="talking-head-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-8 text-sm text-[#5a6066]">
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
                Talking-Head Video Editing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Remote Supplied-Footage Editing · Bilingual English & Spanish
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                You record yourself speaking and send the Drive link; I cut pauses, clean audio, add captions, and cut Shorts.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                No complicated agency layers. Record on your phone or camera in English or Spanish, share your cloud folder, and receive drop-ready YouTube videos and vertical social clips with dynamic subtitles.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I have talking-head recordings ready to edit.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send Drive Link
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Remote video editing starts from the Starter package rate or weekly recurring editing plans. On-location filming across Miami-Dade and Broward is scoped per project based on half-day or full-day rates.
              </p>
            </div>

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Verified editing proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review <strong>Healthy Smile Miami</strong> and <strong>Homeowners Palm Beach</strong> in our portfolio for published examples of dialogue audio mastering, speech pacing, and localized subtitles.
              </p>
              <Link
                href="/portfolio/healthy-smile"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Inspect Healthy Smile Patient Dialogue Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="Talking-head video editing" />
      <ServiceDeepDive
        id={TALKING_HEAD_DEEP_DIVE.id}
        title={TALKING_HEAD_DEEP_DIVE.title}
        destinations={TALKING_HEAD_DEEP_DIVE.destinations}
        sections={TALKING_HEAD_DEEP_DIVE.sections}
      />
      <ServiceFaqs
        heading="Questions before sending your talking-head footage."
        faqs={TALKING_HEAD_FAQS}
        sectionId="talking-head-faq"
      />

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Have talking-head video files ready for editing?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw video links for professional remote post-production.
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

      <ServiceRelated
        heading="Complementary editing and production services."
        services={TALKING_HEAD_RELATED}
        sectionId="talking-head-related"
      />
      <NicheAnswers path={path} fact={String(metadata.description ?? "")} />
    </main>
  );
}
