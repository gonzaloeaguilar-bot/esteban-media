import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  Calculator,
  Camera,
  CheckCircle2,
  Compass,
  FileText,
  Mail,
  Phone,
  Video,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  REAL_ESTATE_MEDIA_PRICES,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  usd,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const PATH = "/real-estate";

const PAGE_DESCRIPTION = `Freelance real estate videographer and listing media in Fort Lauderdale, Miami-Dade, and Broward. Monthly plans from ${usd(REAL_ESTATE_PLANS[0].price)}/mo, listing photography by size, and Zillow 3D tours from ${usd(REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom)}.`;

export const metadata = buildPageMetadata({
  title: "Real Estate Video, Drone & Photography Hub — Fort Lauderdale & Miami",
  description: PAGE_DESCRIPTION,
  path: PATH,
  locale: "en",
});

const realEstateRoutes = [
  {
    title: "Real Estate Pricing & Rate Card",
    href: "/pricing/real-estate",
    description: "Published photo tiers by square footage, listing video rates, drone add-ons, and travel fees.",
    tag: "Rates",
  },
  {
    title: "Real Estate Reels Editor (South Florida)",
    href: "/services/real-estate-reels-video-editor-south-florida",
    description: "Vertical property walk-throughs and listing reels formatted for Instagram, TikTok, and YouTube Shorts.",
    tag: "Social / Reels",
  },
  {
    title: "Commercial Real Estate Video (Miami)",
    href: "/services/commercial-real-estate-video-miami",
    description: "Showcases for office complexes, retail centers, industrial facilities, and leasing galleries.",
    tag: "Commercial",
  },
  {
    title: "Drone Video Editing for Real Estate",
    href: "/services/real-estate-drone-video-editing-miami",
    description: "Stabilized aerial cinematography, lot boundaries, shoreline proximity, and neighborhood context.",
    tag: "Drone",
  },
  {
    title: "AI Real Estate Photo Enhancement",
    href: "/services/ai-real-estate-photo-enhancement",
    description: "Virtual staging, twilight sky enhancements, decluttering, and natural lighting adjustments.",
    tag: "AI Media",
  },
  {
    title: "Luxury Real Estate Video — Aventura",
    href: "/services/real-estate-video-aventura-miami",
    description: "Condominium and waterfront property videos highlighting luxury amenities, marinas, and intracoastal views.",
    tag: "Aventura",
  },
  {
    title: "Real Estate Video — Coral Gables",
    href: "/services/real-estate-video-coral-gables",
    description: "Architectural estates, Mediterranean revivals, tree-lined avenues, and historic community framing.",
    tag: "Coral Gables",
  },
  {
    title: "Real Estate Video — Sunny Isles Beach",
    href: "/services/real-estate-video-sunny-isles",
    description: "High-rise beachfront towers, oceanfront balconies, penthouse finishes, and resort lifestyle coverage.",
    tag: "Sunny Isles",
  },
  {
    title: "Miami Real Estate Video Cost Guide",
    href: "/guides/how-much-does-real-estate-video-cost-miami",
    description: "Transparent cost breakdown: average market rates, Esteban's photo price sheet, and package differences.",
    tag: "Pricing Guide",
  },
];

export default function RealEstateHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(PATH),
        url: absoluteUrl(PATH),
        name: "Real Estate Video, Drone & Photography Hub — Fort Lauderdale & Miami",
        description: PAGE_DESCRIPTION,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Real Estate", item: absoluteUrl(PATH) },
          ],
        },
      },
      {
        "@type": "Service",
        "@id": absoluteUrl(`${PATH}#service`),
        name: "Freelance Real Estate Videographer & Listing Media",
        description:
          "Real estate video production, property walk-throughs, aerial drone editing, and listing photography across Fort Lauderdale, Broward, and Miami-Dade.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Fort Lauderdale", "Broward County", "Miami-Dade County"],
        serviceType: "Real Estate Videography and Photography",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Real Estate Media Plans",
          itemListElement: REAL_ESTATE_PLANS.map((plan) => ({
            "@type": "Offer",
            name: `${plan.id.charAt(0).toUpperCase() + plan.id.slice(1)} Plan`,
            price: plan.price,
            priceCurrency: "USD",
            description: `${plan.properties} properties per month, ${plan.productionDays} production days, ${plan.postsPerWeek} posts per week (${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum).`,
          })),
        },
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService(PATH, jsonLd)) }}
      />
      
      {/* Hero Section */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="real-estate-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Real Estate Media Hub
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
                Fort Lauderdale · Broward · Miami-Dade
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Freelance Real Estate Videographer &amp; Listing Media.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Specialized property cinematography, drone footage editing, vertical listing Reels, and architectural photography for agents, brokers, and developers across South Florida.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/pricing/real-estate"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  View Rate Sheet
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Book Listing Media
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#5a6066]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#9f3c27]" />
                  Monthly plans from ${REAL_ESTATE_PLANS[0].price}/mo
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#9f3c27]" />
                  Zillow 3D tours from ${REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#9f3c27]" />
                  Listing photo tiers from ${REAL_ESTATE_MEDIA_PRICES.photoTiers[0]}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
              <Building className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl sm:text-3xl">Owner-Confirmed Pricing Overview</h2>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                All rates are confirmed in writing from Esteban Moreno Media&apos;s published price schedule. Standalone photography is based on square footage, while regular listing video production is packaged into predictable monthly retainer plans.
              </p>
              
              <div className="mt-6 space-y-3 border-t border-[#ddd4c8] pt-4 text-sm">
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#252a2d]">Essential Retainer (1 Property)</span>
                  <span className="font-semibold text-[#101214]">${REAL_ESTATE_PLANS[0].price} / month</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#252a2d]">Plus Retainer (2 Properties)</span>
                  <span className="font-semibold text-[#101214]">${REAL_ESTATE_PLANS[1].price} / month</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-[#252a2d]">Premium Retainer (3 Properties + Drone)</span>
                  <span className="font-semibold text-[#101214]">${REAL_ESTATE_PLANS[2].price} / month</span>
                </div>
                <div className="flex justify-between py-1 border-t border-[#e8dfd3] pt-2">
                  <span className="text-[#5a6066]">Zillow 3D Interactive Tour</span>
                  <span className="font-semibold text-[#101214]">From ${REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/pricing/real-estate"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:underline"
                >
                  Review full listing price sheet
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Answer-First Section (Dual-Audience) */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              Direct Guidance
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              How does real estate videography work with a freelance specialist in South Florida?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[#252a2d]">
              <p>
                Working with a freelance real estate videographer provides direct personal craft without agency overhead or outsourced subcontractors. Esteban Moreno Media coordinates production shoots on location across Fort Lauderdale, Broward County, and Miami-Dade, or edits client-supplied high-resolution video and drone footage remotely.
              </p>
              <p>
                Single-listing shoots include high-resolution interior and exterior framing, vertical walk-through edits for Instagram Reels, and unbranded MLS-compliant versions. Agents listing multiple properties quarterly benefit from monthly plans (${REAL_ESTATE_PLANS[0].price} to ${REAL_ESTATE_PLANS[2].price}/month with a {REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum), establishing predictable turnaround and consistent marketing cadences.
              </p>
            </div>
          </div>

          {/* Collapsible server-rendered details for depth */}
          <div className="mt-8 max-w-3xl space-y-4">
            <details className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="cursor-pointer font-serif text-xl font-medium text-[#101214] hover:text-[#9f3c27]">
                What is included in the monthly property marketing plans?
              </summary>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[#252a2d]">
                <p>
                  The Essential plan (${REAL_ESTATE_PLANS[0].price}/mo) covers 1 property per month with 2 production half-days and 2 posts per week. The Plus plan (${REAL_ESTATE_PLANS[1].price}/mo) covers 2 properties with 3 production days and 3–4 weekly posts. The Premium plan (${REAL_ESTATE_PLANS[2].price}/mo) covers 3 properties with 3 production days, full drone coverage included, and 5 weekly posts.
                </p>
                <p>
                  All monthly retainers require a {REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum commitment and a {REAL_ESTATE_PLAN_TERMS.cancelNoticeDays}-day written cancellation notice, with performance reviews tracked every {REAL_ESTATE_PLAN_TERMS.reportEveryDays} days.
                </p>
              </div>
            </details>

            <details className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="cursor-pointer font-serif text-xl font-medium text-[#101214] hover:text-[#9f3c27]">
                How are travel, boundaries, and reshoots handled?
              </summary>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[#252a2d]">
                <p>
                  Travel across Broward County and northern Miami-Dade is included in standard shoot rates. Properties outside the standard operational radius incur a published out-of-area fee of ${REAL_ESTATE_MEDIA_PRICES.outOfAreaFee}. If a property is not prepped or weather prevents filming after arrival, the reshoot fee is ${REAL_ESTATE_MEDIA_PRICES.reshootFee}.
                </p>
              </div>
            </details>
          </div>
        </Container>
      </section>

      {/* Hub Directory Grid */}
      <section className="border-b border-[#ddd4c8] py-14 sm:py-20" data-section="real-estate-directory">
        <Container size="xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
              Real Estate Services &amp; Coverage
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Explore Dedicated Real Estate Media Routes
            </h2>
            <p className="mt-4 text-base leading-7 text-[#252a2d]">
              Access specialized services for commercial developments, residential luxury listings, aerial drone edits, and neighborhood-specific guides.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {realEstateRoutes.map((route) => (
              <div
                key={route.href}
                className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition-all hover:border-[#9f3c27]/40"
              >
                <div>
                  <span className="inline-block rounded-full bg-[#eee5d8] px-3 py-1 text-xs font-semibold text-[#5a6066]">
                    {route.tag}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-[#101214]">
                    <Link href={route.href} className="hover:text-[#9f3c27]">
                      {route.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {route.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#ddd4c8]/60">
                  <Link
                    href={route.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9f3c27] hover:underline"
                  >
                    View details
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className="py-14 sm:py-20">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5a6066]">
                  Get In Touch
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Need listing video or monthly media production in South Florida?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#252a2d]">
                  Send the property address, square footage, and required deliverables. You will receive an exact quote based on Esteban&apos;s published rates with zero hidden fees.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" />
                  Budget Calculator
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" />
                  Email Esteban
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" />
                  Call ({site.phone.display})
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <EventSeasonLinks locale="en" path={PATH} />
      <NicheAnswers path={PATH} fact={String(metadata.description ?? "")} />
    </main>
  );
}
