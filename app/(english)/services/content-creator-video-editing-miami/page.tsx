import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { CREATOR_DEPTH } from "@/lib/service-depth-content";
import { ArranqueWeeklySection } from "@/components/arranque-weekly-section";
import { arranqueWeeklyFaq, arranqueWeeklyOfferJsonLd } from "@/lib/arranque-weekly";
import { CREATOR_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const path = "/services/content-creator-video-editing-miami";

export const metadata = buildPageMetadata({
  title: "Content Creator Video Editing Miami",
  description:
    "Video editing and a steady posting rhythm for creators and influencers: vertical edits, burned-in captions, and one filming block turned into a week of posts.",
  path,
  locale: "en",
});

export default function ContentCreatorVideoEditingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), [...CREATOR_DEPTH.faqs, ...arranqueWeeklyFaq("en")]),
      arranqueWeeklyOfferJsonLd("en", absoluteUrl(path), absoluteUrl("/#business")),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Content Creator Video Editing Miami",
        description:
          "Vertical video editing, caption work, and publishing cadence support for content creators and influencers, remotely or in South Florida.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward / Remote",
        serviceType: "Content creator video editing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          {
            "@type": "ListItem",
            position: 3,
            name: "Content Creator Video Editing",
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                Content Creator Video Editing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Creators / Influencers / Personal Brands
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Editing and a posting rhythm for creators.
              </h1>
              {/* Answer first: what this is, and what to do next. */}
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                You film; Esteban cuts the vertical posts, burns in the captions,
                and turns one filming block into a stack of separate uploads with
                a running order. Send the original files and a line about where
                each post is going, and you get back finished exports in the
                formats the platforms need.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-cta="content_creator_hero_contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Send a week of footage
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/ml-colombia"
                  data-cta="content_creator_hero_proof"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  See published social content
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Megaphone className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What comes back</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Vertical exports at 1080x1920 with captions inside the safe band,
                a horizontal version where the same idea is worth a long-form
                upload, and thumbnails or cover frames pulled from the footage
                rather than invented.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Tell Esteban which clips are paid partnerships so the disclosure
                lands in the cut rather than in a caption nobody expands.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ArranqueWeeklySection locale="en" />
      <ServiceCraft
        heading={CREATOR_DEPTH.craftHeading}
        cards={CREATOR_DEPTH.craft}
        sectionId="content-creator-craft"
      />
      <ServiceDeepDive
        id={CREATOR_DEEP_DIVE.id}
        title={CREATOR_DEEP_DIVE.title}
        destinations={CREATOR_DEEP_DIVE.destinations}
        sections={CREATOR_DEEP_DIVE.sections}
      />
      <ServiceFaqs heading={CREATOR_DEPTH.faqHeading} faqs={CREATOR_DEPTH.faqs} />
      <ServiceInquiryRail
        service={{
          serviceId: "content_creator_video",
          serviceName: "video editing for a content creator",
          goalPrompt: "keep a posting rhythm on Reels, TikTok and Shorts",
          assetPrompt: "original camera files, the platforms and handles, and any paid partnerships",
          proofHref: "/portfolio/ml-colombia",
          proofLabel: "Review published social content",
        }}
      />
      <ServiceRelated
        heading={CREATOR_DEPTH.relatedHeading}
        services={CREATOR_DEPTH.related}
      />
    </main>
  );
}
