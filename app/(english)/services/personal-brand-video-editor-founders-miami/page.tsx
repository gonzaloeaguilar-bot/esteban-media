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
import { FOUNDER_BRAND_DEPTH as depth } from "@/lib/service-depth-content";
import { FOUNDER_BRAND_DEEP_DIVE as dive } from "@/lib/service-deep-dive-content";
import { priceSentence, whatsappHref } from "@/lib/packages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/personal-brand-video-editor-founders-miami";

export const metadata = buildPageMetadata({
  title: "Personal Brand Video Editor Miami",
  description: "Video editing for founders, coaches and consultants in Miami: talking-head Reels, TikToks, Shorts and LinkedIn videos cut from your own recordings.",
  path,
  locale: "en",
});

const inquiry = {
  serviceId: "founder_personal_brand_video",
  serviceName: "personal brand videos",
  goalPrompt: "post short videos about my work every week",
  assetPrompt: "recordings from my phone or a studio and a list of topics",
  proofHref: "/portfolio/ml-colombia",
  proofLabel: "See the founder-led brand Esteban ran",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), depth.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Personal Brand Video Editor for Founders Miami",
        description: "Remote editing of founder, coach and consultant recordings into captioned short videos for Instagram Reels, TikTok, YouTube Shorts and the LinkedIn feed, in English or Spanish, for clients in Miami-Dade and Broward, with on-location filming as a paid add-on scoped per project.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward / Remote",
        availableLanguage: ["Spanish", "English"],
        serviceType: "Personal brand video editing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Founder & Personal Brand Videos", item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/personal-brand-video-editor-founders-miami", jsonLd)) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="founder-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">{"Founder & Personal Brand Videos"}</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">{"Founders / Coaches / Consultants"}</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">{"Your expertise on camera, edited into videos people finish."}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">{"Record your answers on your phone or in a studio. Esteban edits them remotely into captioned vertical videos for Reels, TikTok and Shorts, and versions for the LinkedIn feed, in English or Spanish."}</p>
              <div className="mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I'd like a quote for editing my personal brand videos.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="founder_hero_whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask for a quote on WhatsApp
                </a>
                <Link
                  href="#founder-inquiry"
                  data-cta="founder_hero_quote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send the project details
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Based in Fort Lauderdale, working across Miami-Dade and Broward. Remote editing: {priceSentence("en", "arranque").toLowerCase()}. On-location filming is a paid add-on scoped per project; the Local Presence package is {priceSentence("en", "presencia-local").toLowerCase()}.
              </p>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section="founder-answer">
              <h2 className="font-serif text-3xl">{depth.answer.question}</h2>
              <p className="mt-4 text-base leading-7 text-[#252a2d]">{depth.answer.answer}</p>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">{depth.proof.note}</p>
              <Link
                href={depth.proof.href}
                data-cta="founder_hero_proof"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {depth.proof.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="founder-craft" />
      <ServiceDeepDive id={dive.id} title={dive.title} destinations={dive.destinations} sections={dive.sections} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="founder-faq" />
      <ServiceInquiryRail service={inquiry} sectionId="founder-inquiry" />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="founder-related" />
      <NicheAnswers path="/services/personal-brand-video-editor-founders-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
