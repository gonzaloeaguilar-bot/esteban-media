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
import { BILINGUAL_SUBTITLING_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Bilingual Video Subtitling Service",
  description:
    "Professional English and Spanish bilingual video subtitling and closed captioning for corporate training, webinars, social media reels, and client interviews.",
  path: "/services/bilingual-video-subtitling-service",
  locale: "en",
});

export default function BilingualVideoSubtitlingServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/bilingual-video-subtitling-service"),
        PORTED_SERVICE_FAQS["/services/bilingual-video-subtitling-service"],
      ),
      ...buildServicePageNodes({
        path: "/services/bilingual-video-subtitling-service",
        name: "Bilingual Video Subtitling Service",
        description:
          "Professional English and Spanish subtitle translation, video caption formatting, and SRT file generation for business and social video.",
        crumb: "Bilingual Video Subtitling Service",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/bilingual-video-subtitling-service#service"),
        name: "Bilingual Video Subtitling Service",
        description:
          "Accurate bilingual captioning and subtitle localization in English and Spanish for corporate and social video.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "United States / Latin America / Remote",
        serviceType: "Video editing",
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
              "/services/bilingual-video-subtitling-service",
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
                Bilingual Video Subtitling Service
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Localization / English &amp; Spanish Subtitling
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Bilingual Video Subtitling Service.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno Media subtitles short-form and business video in English and Spanish from Fort Lauderdale. Esteban translates and times every caption himself, and delivers SRT files or burned-in captions inside platform safe zones, with short videos back in 24 to 48 hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Order Bilingual Subtitles
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What subtitling proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified bilingual video campaigns and post-production work localized by Esteban Moreno. Explore our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">portfolio work</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst
        service="bilingual video subtitling"
        answerOverride="Esteban Moreno Media is a one-person service run by Esteban Moreno in Fort Lauderdale. For bilingual subtitling, you send the video and Esteban translates between English and Spanish himself, checking every line against the audio rather than machine-generating it. Delivery is burned-in captions, an SRT file, or both, with lines kept inside each platform's safe zones. Short videos up to 60 seconds are delivered in 24 to 48 hours; longer recordings are quoted per minute of audio. Spanish is his first language and his English is intermediate, and the service is presented that way: the Spanish reads naturally and the English is reviewed with care before delivery. Every project gets a written quote before work starts."
      />

      <ServiceDeepDive
        id={BILINGUAL_SUBTITLING_DEEP_DIVE.id}
        title={BILINGUAL_SUBTITLING_DEEP_DIVE.title}
        destinations={BILINGUAL_SUBTITLING_DEEP_DIVE.destinations}
        sections={BILINGUAL_SUBTITLING_DEEP_DIVE.sections}
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
                  Need bilingual subtitles for your video content?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your video duration, source language, target subtitle language, and intended publishing channels.
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
        faqs={PORTED_SERVICE_FAQS["/services/bilingual-video-subtitling-service"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/bilingual-video-subtitling-service" />
      <NicheAnswers path="/services/bilingual-video-subtitling-service" fact={String(metadata.description ?? "")} />
    </main>
  );
}
