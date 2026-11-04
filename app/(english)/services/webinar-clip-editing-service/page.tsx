import Link from "next/link";
import { ArrowRight, WandSparkles, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS, serviceSiblings } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";
import { PACKAGE_PRICES, usd } from "@/lib/pricing";

export const metadata = buildPageMetadata({
  title: "Webinar Clip Editing Service",
  description:
    "Webinar clip editing service: extracting key takeaway clips from virtual events, formatting into 9:16 vertical reels with captions.",
  path: "/services/webinar-clip-editing-service",
  locale: "en",
});

export default function WebinarClipEditingServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/webinar-clip-editing-service"), PORTED_SERVICE_FAQS["/services/webinar-clip-editing-service"]),
      ...buildServicePageNodes({
        path: "/services/webinar-clip-editing-service",
        name: "Webinar Clip Editing Service",
        description:
          "Webinar clip editing service: extracting key takeaway clips from virtual events, formatting into 9:16 vertical reels with captions.",
        crumb: "Webinar Clip Editing Service",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/webinar-clip-editing-service#service"),
        name: "Webinar Clip Editing Service",
        description:
          "Webinar snippet video editing, long Zoom/recording clip extraction, vertical social video reel formatting, and animated subtitle overlays.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward",
        serviceType: "Webinar clip editing",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/webinar-clip-editing-service", jsonLd)) }}
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
                Webinar Clip Editing Service
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Virtual Events & Webinars
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Webinar Clip & Snippet Video Editing for LinkedIn & Social.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Extract high-value moments from Zoom recordings and virtual events, turning long webinars into viral LinkedIn, YouTube Shorts, and 9:16 social clips.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Edit Webinar Clips
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/executive-linkedin-video-series-miami"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Executive LinkedIn Series
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <WandSparkles className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Webinar clip proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Explore our published work across video editing, motion design, and digital content delivery in the{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio index
                </Link>
                .
              </p>
              <Link
                href="/portfolio"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Explore Portfolio Index
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst
        service="Webinar clip editing"
        answerOverride={`Webinar clip editing turns full-length Zoom recordings, keynotes, and virtual events into short video clips for LinkedIn, YouTube Shorts, and Instagram Reels. Esteban Moreno Media is based in Fort Lauderdale and handles webinar video clipping remotely: you share the raw event recording or cloud link, and Esteban extracts the strongest moments, adds captions, and delivers 4:5, 1:1, or 9:16 vertical cuts. Remote editing starts from ${usd(PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : 100)} per video on the Starter package, with weekly posting workflows available and larger multi-clip event batches quoted per project. For teams planning recurring thought leadership content, see our dedicated executive LinkedIn video series. Communication is Spanish-first, with intermediate English available for South Florida and remote teams.`}
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
                  Have full webinar recordings ready for clipping?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw webinar links for clip extraction.
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
        faqs={PORTED_SERVICE_FAQS["/services/webinar-clip-editing-service"]}
        sectionId="ported-faq"
      />
      <ServiceRelated
        heading="Related services nearby."
        services={serviceSiblings("/services/webinar-clip-editing-service")}
        sectionId="sibling-services"
      />
      <NicheAnswers path="/services/webinar-clip-editing-service" fact={String(metadata.description ?? "")} />
    </main>
  );
}
