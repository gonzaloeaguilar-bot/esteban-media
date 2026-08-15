import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Compass,
  FileText,
  Mail,
  Phone,
  Scissors,
  Sparkles,
  UtensilsCrossed,
  Video,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Restaurant Promo Video Editing Miami",
  description:
    "Professional restaurant promo video editing in Miami. High-retention food reels, dish spotlight cuts & social promo videos tailored for South Florida dining.",
  path: "/services/restaurant-promo-video-editing-miami",
  locale: "en",
});

export default function RestaurantPromoVideoEditingMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/restaurant-promo-video-editing-miami#service"),
        name: "Restaurant Promo Video Editing Miami",
        description:
          "Professional restaurant promo video editing in Miami. High-retention food reels, dish spotlight cuts & social promo videos tailored for South Florida dining.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami / Wynwood",
        serviceType: "Restaurant video marketing",
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
                Restaurant Promo Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Culinary & Hospitality
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Restaurant Promo Video Editing in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Appetizing food video edits, slow-motion beverage preparation, and high-converting restaurant promotional reels designed for Instagram, TikTok, and digital menus.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Edit Restaurant Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Restaurant Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Restaurant video proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our portfolio project <strong>Bar Door Monkey Miami</strong> proves published promotional hospitality videography and editing.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[#c84a2c]"
                >
                  Explore Bar Door Monkey Case Study
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Connected Services & Solutions
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Complete visual production for hospitality & dining.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/ai-food-photography-restaurants"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <UtensilsCrossed className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">AI Food Photography</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                AI-assisted dish rendering and dining atmosphere staging for digital menus and delivery platforms.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore AI Food Photos
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/short-form-video-editor-miami"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Scissors className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Short-Form Video Editing</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                High-retention 9:16 vertical reels with sound design and animated captions for Instagram and TikTok.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Short-Form Editing
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/creative-video-production-wynwood"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Sparkles className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Wynwood Creative Video</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Energetic venue and nightlife video production capturing Wynwood dining and cocktail culture.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Wynwood Video
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Practical Production Guidance
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Guides to plan and scale your restaurant video content.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/guides/video-content-ideas-for-restaurants"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <FileText className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                Video Content Ideas That Bring Customers to Your Restaurant
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Simple, high-impact video concepts for restaurants and bars to showcase signature dishes, kitchen action, and dining energy.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Restaurant Video Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/guides/how-to-use-instagram-reels-for-business"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <Compass className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                How to Use Instagram Reels for Business
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                A practical guide to structuring 15-to-30 second reels with strong opening hooks and direct calls to action.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Reels Strategy Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Promoting a restaurant or bar in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw food footage or kitchen clips to start post-production, or calculate your custom project scope online.
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
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"
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
    </main>
  );
}
