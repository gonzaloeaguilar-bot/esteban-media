import Link from "next/link";
import { ArrowRight, MessageCircle, Scissors, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { SHORT_FORM_DEPTH } from "@/lib/service-depth-content";
import { SHORT_FORM_DEEP_DIVE_EN, shortFormServiceJsonLd, shortFormWhatsappHref } from "@/lib/short-form-recs";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Short Form Video Editor Miami",
  description: `Short-form video editing for Instagram Reels, TikTok, and YouTube Shorts for influencers, creators and businesses in Miami and Fort Lauderdale. From ${usd(SHORT_FORM.perVideoFrom)} per video.`,
  path: "/services/short-form-video-editor-miami",
  locale: "en",
});

export default function ShortFormVideoEditorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/short-form-video-editor-miami"), SHORT_FORM_DEPTH.faqs),
      shortFormServiceJsonLd("en"),
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
                Short-Form Editor
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Reels / Shorts / TikTok
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Short-Form Video Editing for Reels & TikTok.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                High-retention 9:16 vertical editing with bold captions, visual hooks, and sound design to keep audiences watching.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start Short-Form Editing
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/ml-colombia"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View ML Colombia Reel Proof
                </Link>
              </div>
              <p className="mt-3 text-sm text-[#5a6066]">
                Updated: <time dateTime="2026-10-08">October 8, 2026</time>
              </p>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Scissors className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Reel proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our portfolio project <strong>ML Colombia</strong> proves published short-form social video editing. For food & beverage concepts, see our dedicated{" "}
                <Link
                  href="/services/restaurant-promo-video-editing-miami"
                  className="font-semibold text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
                >
                  restaurant promo video editing in Miami
                </Link>.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Scale your short-form content output.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw video files to start short-form editing packages. Call, text or WhatsApp{" "}
                  <strong>{site.phone.display}</strong>, or email <strong>{site.email}</strong>.
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
                <a
                  href={shortFormWhatsappHref("en")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="short_form_video_whatsapp"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ServiceCraft
        heading={SHORT_FORM_DEPTH.craftHeading}
        cards={SHORT_FORM_DEPTH.craft}
        sectionId="short-form-craft"
      />
      <ServiceDeepDive
        id={SHORT_FORM_DEEP_DIVE_EN.id}
        title={SHORT_FORM_DEEP_DIVE_EN.title}
        destinations={SHORT_FORM_DEEP_DIVE_EN.destinations}
        sections={SHORT_FORM_DEEP_DIVE_EN.sections}
      />
      <ServiceFaqs heading={SHORT_FORM_DEPTH.faqHeading} faqs={SHORT_FORM_DEPTH.faqs} />
      <ServiceInquiryRail
        service={{
          serviceId: "short_form_video",
          serviceName: "short-form video editing",
          goalPrompt: "turn supplied footage into Reels, TikTok, or Shorts",
          assetPrompt: "raw clips, references, brand notes, and the platforms where the videos will run",
          proofHref: "/portfolio/ml-colombia",
          proofLabel: "Review short-form portfolio proof",
        }}
      />
      <ServiceRelated heading={SHORT_FORM_DEPTH.relatedHeading} services={SHORT_FORM_DEPTH.related} />
    </main>
  );
}
