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
  CHRISTIAN_YOUTUBE_DEEP_DIVE,
  CHRISTIAN_YOUTUBE_FAQS,
  CHRISTIAN_YOUTUBE_RELATED,
} from "@/lib/talking-head-christian-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { whatsappHref } from "@/lib/packages";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/christian-youtube-video-editor";

export const metadata = buildPageMetadata({
  title: "Christian YouTube Video Editor",
  description:
    "Remote video editing for Christian and devotional YouTube creators: cut home teachings, overlay scripture citations, balance audio, and cut vertical Shorts.",
  path,
  locale: "en",
});

export default function ChristianYouTubeVideoEditorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), CHRISTIAN_YOUTUBE_FAQS),
      ...buildServicePageNodes({
        path,
        name: "Christian YouTube Video Editor",
        description:
          "Video editor for Christian and devotional YouTube creators recording at home: pacing, scripture lower-thirds, audio mastering, and Shorts.",
        crumb: "Christian YouTube Video Editor",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Christian YouTube Video Editor",
        description:
          "Remote YouTube video editing for pastors, ministries, and Christian creators: sermon refinement, Bible study editing, clean audio, and vertical devotional clips.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward / Remote",
        serviceType: "Christian YouTube video editing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Christian YouTube Video Editor", item: absoluteUrl(path) },
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
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="christian-hero">
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
                Christian YouTube Video Editor
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Pastors · Ministries · Devotional Creators
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Devotional teachings and home Bible studies, edited for YouTube and weekly Shorts.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Record at home with your phone or camera. Esteban removes awkward pauses, masters dialogue audio, integrates respectful scripture lower-thirds, and cuts engaging 9:16 Shorts in English or Spanish.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I am looking for a video editor for our Christian YouTube channel.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send Channel Details
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Remote editing begins from the Starter package rate or weekly recurring editing plans. On-location filming across Miami-Dade and Broward is scoped per project based on half-day or full-day rates.
              </p>
            </div>

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Pacing & dialogue proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                See <strong>Diana & Jack</strong> in our portfolio for an example of condensing long live event recordings into structured highlights, narrative pacing, and focused message delivery.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Inspect Event Highlight Editing Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="Christian YouTube video editing" />
      <ServiceDeepDive
        id={CHRISTIAN_YOUTUBE_DEEP_DIVE.id}
        title={CHRISTIAN_YOUTUBE_DEEP_DIVE.title}
        destinations={CHRISTIAN_YOUTUBE_DEEP_DIVE.destinations}
        sections={CHRISTIAN_YOUTUBE_DEEP_DIVE.sections}
      />
      <ServiceFaqs
        heading="Common questions about Christian YouTube post-production."
        faqs={CHRISTIAN_YOUTUBE_FAQS}
        sectionId="christian-youtube-faq"
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
                  Ready to launch or polish your ministry YouTube channel?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your raw footage links for dependable weekly video post-production.
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
        heading="Related editing and clipping services."
        services={CHRISTIAN_YOUTUBE_RELATED}
        sectionId="christian-youtube-related"
      />
      <NicheAnswers path={path} fact={String(metadata.description ?? "")} />
    </main>
  );
}
