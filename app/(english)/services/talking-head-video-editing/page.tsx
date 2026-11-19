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
import { TALKING_HEAD_DEPTH as depth } from "@/lib/service-depth-content";
import { TALKING_HEAD_DEEP_DIVE as dive } from "@/lib/service-deep-dive-content";
import { priceSentence, whatsappHref } from "@/lib/packages";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/talking-head-video-editing";

export const metadata = buildPageMetadata({
  title: "Talking-Head Video Editing — Solo Creators & Founders",
  description:
    `You record yourself speaking and send the Drive link; Esteban edits, cleans audio, adds captions, and cuts Shorts. Starter from ${usd(SHORT_FORM.perVideoFrom)}/video, ${usd(SHORT_FORM.weekly[0].pricePerWeek)}/wk for 1, ${usd(SHORT_FORM.weekly[1].pricePerWeek)}/wk for 2.`,
  path,
  locale: "en",
});

const inquiry = {
  serviceId: "talking_head_video_editing",
  serviceName: "talking-head video editing",
  goalPrompt: "record myself speaking and get polished videos and Shorts",
  assetPrompt: "camera or phone recording uploaded to Drive/Dropbox, topics, and brand notes",
  proofHref: "/portfolio/ml-colombia",
  proofLabel: "See founder speaking-to-camera proof",
};

export default function TalkingHeadPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), depth.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Talking-Head Video Editing",
        description:
          "Remote video editing for solo creators, founders, and educators recording to camera: audio cleaning, pause reduction, animated captions, and vertical Shorts cutdowns.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Remote / Fort Lauderdale / Miami-Dade",
        availableLanguage: ["Spanish", "English"],
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
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Talking-Head Video Editing</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Solo Creators / Founders / Educators</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                You record speaking to camera. We edit, clean audio, add captions, and cut Shorts.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Record your video on your phone or camera and drop the raw files in Google Drive. Esteban edits pauses, levels audio, adds burned-in captions, and delivers full edits plus vertical Shorts for YouTube, Reels, and TikTok.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I'd like a quote for editing my talking-head videos.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="talking_head_hero_whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask for a quote on WhatsApp
                </a>
                <Link
                  href="#talking-head-inquiry"
                  data-cta="talking_head_hero_quote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send project details
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Remote editing from {usd(SHORT_FORM.perVideoFrom)}/video with Starter, or weekly subscriptions at {usd(SHORT_FORM.weekly[0].pricePerWeek)}/wk for 1 video and {usd(SHORT_FORM.weekly[1].pricePerWeek)}/wk for 2 videos. Based in Fort Lauderdale, working across South Florida and remotely worldwide.
              </p>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section="talking-head-answer">
              <h2 className="font-serif text-3xl">{depth.answer.question}</h2>
              <p className="mt-4 text-base leading-7 text-[#252a2d]">{depth.answer.answer}</p>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">{depth.proof.note}</p>
              <Link
                href={depth.proof.href}
                data-cta="talking_head_hero_proof"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {depth.proof.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="talking-head-craft" />
      <ServiceDeepDive id={dive.id} title={dive.title} destinations={dive.destinations} sections={dive.sections} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="talking-head-faq" />
      <ServiceInquiryRail service={inquiry} sectionId="talking-head-inquiry" />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="talking-head-related" />
      <NicheAnswers path={path} fact={String(metadata.description ?? "")} />
    </main>
  );
}
