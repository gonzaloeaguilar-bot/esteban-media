import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { CHRISTIAN_YOUTUBE_DEPTH as depth } from "@/lib/service-depth-content";
import { CHRISTIAN_YOUTUBE_DEEP_DIVE as dive } from "@/lib/service-deep-dive-content";
import { priceSentence, whatsappHref } from "@/lib/packages";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/christian-youtube-video-editor";

export const metadata = buildPageMetadata({
  title: "Christian YouTube Video Editor — Ministries & Devotionals",
  description:
    `Video editing for Christian, ministry, and devotional YouTube creators recording at home: clean cuts, scripture lower-thirds, captions, and Shorts from ${usd(SHORT_FORM.perVideoFrom)}/video.`,
  path,
  locale: "en",
});

const inquiry = {
  serviceId: "christian_youtube_video_editor",
  serviceName: "Christian YouTube video editing",
  goalPrompt: "publish weekly devotionals, teachings, and YouTube Shorts",
  assetPrompt: "raw camera recording, scripture list, sermon title, and preferred translation",
  proofHref: "/portfolio/diana-jack",
  proofLabel: "Review long-form speaking cut into clips",
};

export default function ChristianYouTubePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), depth.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Christian YouTube Video Editor",
        description:
          "Video editing for Christian creators, pastors, and ministries recording at home or in studio: audio mastering, scripture lower-thirds, and vertical Shorts cutdowns.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Remote / Fort Lauderdale / Miami-Dade",
        availableLanguage: ["Spanish", "English"],
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
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="christian-youtube-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Christian YouTube Video Editor</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Pastors / Ministries / Devotional Creators</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Christian YouTube video editing: clean cuts, scripture lower-thirds, captions, and Shorts.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                For Christian and ministry creators recording devotionals or teachings at home. Send your camera clips and scripture references; Esteban cuts stumbles, balances vocal audio, adds biblical graphic overlays, and extracts vertical Shorts.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I'd like a quote for editing our Christian YouTube channel videos.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="christian_youtube_hero_whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask for a quote on WhatsApp
                </a>
                <Link
                  href="#christian-youtube-inquiry"
                  data-cta="christian_youtube_hero_quote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send project details
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Remote editing from {usd(SHORT_FORM.perVideoFrom)}/video with Starter, or weekly subscriptions at {usd(SHORT_FORM.weekly[0].pricePerWeek)}/wk for 1 video and {usd(SHORT_FORM.weekly[1].pricePerWeek)}/wk for 2 videos. Based in Fort Lauderdale, serving creators remotely worldwide.
              </p>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section="christian-youtube-answer">
              <h2 className="font-serif text-3xl">{depth.answer.question}</h2>
              <p className="mt-4 text-base leading-7 text-[#252a2d]">{depth.answer.answer}</p>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">{depth.proof.note}</p>
              <Link
                href={depth.proof.href}
                data-cta="christian_youtube_hero_proof"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {depth.proof.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="christian-youtube-craft" />
      <ServiceDeepDive id={dive.id} title={dive.title} destinations={dive.destinations} sections={dive.sections} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="christian-youtube-faq" />
      <ServiceInquiryRail service={inquiry} sectionId="christian-youtube-inquiry" />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="christian-youtube-related" />
      <NicheAnswers path={path} fact={String(metadata.description ?? "")} />
    </main>
  );
}
