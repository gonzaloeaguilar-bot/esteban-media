import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { BILINGUAL_WEB_VIDEO_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { LANDING_PAGE_PRICE, usd } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Bilingual Web Design & Video South Florida",
  description:
    `Bilingual website design and commercial video in South Florida. Native English and Spanish pages, with Reels that point to the offer. Landing pages from ${usd(LANDING_PAGE_PRICE.from)}.`,
  path: "/services/bilingual-web-design-video-south-florida",
  locale: "en",
});

export default function BilingualWebDesignVideoSouthFloridaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildServicePageNodes({
        path: "/services/bilingual-web-design-video-south-florida",
        name: "Bilingual Web Design & Video South Florida",
        description:
          `Bilingual website design and commercial video in South Florida. Native English and Spanish pages, with Reels that point to the offer. Landing pages from ${usd(LANDING_PAGE_PRICE.from)}.`,
        crumb: "South Florida Bilingual Web Design",
      }),
      buildServiceFaqSchema(
        absoluteUrl("/services/bilingual-web-design-video-south-florida"),
        BILINGUAL_WEB_VIDEO_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/bilingual-web-design-video-south-florida#service"),
        name: "Bilingual Web Design & Video South Florida",
        description:
          "Bilingual website design and commercial video in South Florida: dedicated English and Spanish pages with Reels that send visitors to the offer.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Miami-Dade",
        serviceType: "Bilingual website design and video",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/bilingual-web-design-video-south-florida", jsonLd)) }}
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
                South Florida Bilingual Web Design
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                South Florida / Bilingual Web &amp; Video
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Bilingual Website Design and Commercial Video in South Florida.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Full websites with dedicated English and Spanish pages, built with the commercial video and short-form Reels that send visitors to the offer. Basic landing pages from {usd(LANDING_PAGE_PRICE.from)}; larger custom builds usually {usd(LANDING_PAGE_PRICE.typicalUpper)} or more.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Bilingual Build
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/caro-sells-miami"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Bilingual Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
              <p className="mt-6 text-sm text-[#5a6066]">
                ¿Prefieres español? Lee la versión en español:{" "}
                <Link href="/es/diseno-web-fort-lauderdale" className="underline decoration-[#e85d3e] underline-offset-4 hover:text-[#9f3c27]">
                  diseño web en Fort Lauderdale
                </Link>
                .
              </p>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Globe className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Three live builds</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <Link
                  href="/portfolio/caro-sells-miami"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  Caro Sells Miami
                </Link>{" "}
                runs English and Spanish buyer paths,{" "}
                <a
                  href="https://dupontrealtysouthflorida.com/"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  DuPont Realty South Florida
                </a>{" "}
                serves buyers in English and French, and the{" "}
                <Link
                  href="/portfolio/great-reviewer-website"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  Great Reviewer
                </Link>{" "}
                website pairs its review platform with short video.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/caro-sells-miami"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
                >
                  Review the Caro Sells Miami Build
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
        Citable depth for the bilingual hub. The three craft cards below name
        the criteria; these three sections carry the argument at citable
        weight (100-180 words each) without restating the FAQ answers, which
        already cover pricing, native pages, published builds, and one-studio
        delivery.
      */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="bilingual-web-depth">
        <Container size="xl">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="border-b border-[#ddd4c8] pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Scope and technical criteria
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                How one offer survives in two languages
              </h2>
            </div>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">What breaks when a bilingual site is translated, not written?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A bilingual site is not one page run through translation. Each language version is
                written for its own reader, with its own page, its own metadata, and its own call
                to action, so an English buyer and a Spanish buyer both land on copy that reads as
                if it was written for them. A Spanish ad that lands on an English page breaks the
                promise the ad just made, and the same is true in reverse. A machine-translation
                overlay breaks more than tone: it can break layouts on a phone, and in search each
                language version needs its own page to rank at all.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">Where should the video point, and what should the page do next?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                Short video earns its place when it sends people somewhere specific: the Reel about
                one offer points to the page for that offer, not to a home page where the visitor
                has to look for it. The page then carries the same proof the video showed, real
                work, real reviews, and one action, so the visitor who tapped through does not have
                to start over. That handoff is the whole point of building the website and the
                video together: the Reel makes the promise, the page keeps it, and the visitor
                never has to guess which offer they just saw.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">What proves a bilingual build before a quote is discussed?</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A bilingual build is judged on the sites that are already live, not on a mockup.
                Caro Sells Miami runs English and Spanish buyer paths for real estate, DuPont
                Realty South Florida serves buyers in English and French with market-area guidance,
                and the Great Reviewer site pairs its review platform with short-form video. Each
                one opens from its portfolio page, so the work can be inspected before a quote is
                discussed. If a studio cannot show a live bilingual site, its promise about
                translation quality, page speed, and conversion is a claim, not a record.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={BILINGUAL_WEB_VIDEO_DEPTH.craftHeading}
        cards={BILINGUAL_WEB_VIDEO_DEPTH.craft}
        sectionId="bilingual-web-craft"
      />
      <ServiceFaqs
        heading={BILINGUAL_WEB_VIDEO_DEPTH.faqHeading}
        faqs={BILINGUAL_WEB_VIDEO_DEPTH.faqs}
      />
      <ServiceInquiryRail
        service={{
          serviceId: "bilingual_web_design_video",
          serviceName: "bilingual web design and video",
          goalPrompt: "build a bilingual website and short video that send visitors to one offer",
          assetPrompt: "your current website, brand assets, the offer each language version should sell, and example videos you like",
          proofHref: "/portfolio/caro-sells-miami",
          proofLabel: "Review the Caro Sells Miami bilingual build",
        }}
      />
      <ServiceRelated
        heading={BILINGUAL_WEB_VIDEO_DEPTH.relatedHeading}
        services={BILINGUAL_WEB_VIDEO_DEPTH.related}
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
                  Need a website and video that sell in both languages?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your current site, the offer each language version should sell, and examples you like for a written quote.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" aria-hidden="true" />
                  Budget Calculator
                </Link>
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
      <EventSeasonLinks locale="en" path="/services/bilingual-web-design-video-south-florida" />
      <NicheAnswers path="/services/bilingual-web-design-video-south-florida" fact={String(metadata.description ?? "")} />
    </main>
  );
}
