import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HomeClosingLinks } from "@/components/home-closing-links";
import { HeroVideo } from "@/components/hero-video";
import { HomeProjectPath } from "@/components/home-project-path";
import { SignalIntro } from "@/components/signal-intro";
import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { KeepReading } from "@/components/keep-reading";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { englishRootMetadata } from "@/lib/site-metadata";
import "../homepage-visual.css";

export const metadata: Metadata = {
  // Keep the observed homepage intent in one bounded contract: video editing,
  // website designer support, and scoped video production are all confirmed offerings.
  //
  // CTR TEST, started 2026-10-06. This is a test, not a fix — causation is not
  // established and the ceiling is small.
  //
  // Baseline, live Search Console 2026-07-06..2026-10-04, homepage:
  //   "video production services"        40 impr, avg position 1.0, 0 clicks
  //   "fort lauderdale video production" 19 impr, avg position 1.0, 0 clicks
  //   "video production service"         16 impr, avg position 1.0, 0 clicks
  // 75 impressions at position 1 and zero clicks, over 90 days.
  //
  // The old title led with a brand name the searcher does not know, and the old
  // description made no offer ("View our portfolio, services, and contact us").
  // The new pair leads with the service and the city the queries actually use,
  // keeps the brand, and states the one real differentiator — Spanish-first.
  //
  // Read the same three queries in GSC after 2026-11-06. If clicks are still
  // zero, the snippet was not the constraint and this should be reverted rather
  // than iterated: 0.8 impressions a day cannot carry more work than this.
  title: {
    absolute:
      "Fort Lauderdale Video Production & Editing | Esteban Moreno",
  },
  description:
    "Video editing, on-location capture and social content for businesses in Fort Lauderdale, Broward and Miami-Dade. Spanish-first, English available.",
  // Next REPLACES a nested openGraph/twitter object instead of merging it with
  // the root layout's, so spreading the root defaults is what keeps og:image,
  // og:url, og:type, og:site_name, og:locale and the large twitter card on "/".
  // Without the spread the homepage (where all social traffic lands) shared
  // with no image and a "summary" card (SEO/GEO audit 2026-10-10, finding 1).
  openGraph: {
    ...englishRootMetadata.openGraph,
    title: "Fort Lauderdale Video Production & Editing | Esteban Moreno",
    description:
      "Video editing, on-location capture and social content for businesses in Fort Lauderdale, Broward and Miami-Dade. Spanish-first, English available.",
  },
  twitter: {
    ...englishRootMetadata.twitter,
    title: "Fort Lauderdale Video Production & Editing | Esteban Moreno",
    description:
      "Video editing, on-location capture and social content for businesses in Fort Lauderdale, Broward and Miami-Dade. Spanish-first, English available.",
  },
};

export default function Home() {
  return (
    <main className="em-home bg-[#f7f5f1] text-[#101214]">
      <SignalIntro locale="en" />
      <HeroVideo />
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#101214]">Video Production Services in Fort Lauderdale & Miami</h2>
          <p className="text-lg text-[#5a6066] mb-4">
            Esteban Moreno Media offers professional video editing, on-location production, social content creation, and remote editing for businesses across South Florida. From corporate videos to social reels, we handle pre-production, filming, post-production, and delivery.
          </p>
          <p className="text-lg text-[#5a6066] mb-6">
            Need to know pricing? Check our <a href="/guides/corporate-video-production-cost-miami" className="font-semibold text-blue-600 hover:text-blue-700">video production cost guide</a> to understand pricing factors, editing rates, and filming timelines.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/services" className="inline-block px-6 py-3 bg-[#101214] text-white rounded hover:bg-gray-800 transition">
              Explore All Services
            </a>
            <a href="/contact" className="inline-block px-6 py-3 border-2 border-[#101214] text-[#101214] rounded hover:bg-[#f7f5f1] transition">
              Get a Quote
            </a>
          </div>
        </div>
      </section>
      <PortfolioTeaser locale="en" />
      <HomeProjectPath locale="en" />
      {/* Proof and contact now sit TOGETHER right at the decision, not one
          compact mention above the chooser plus a full repeat three screens
          later. Owner, 2026-10-12: "be convinced" is half the ask — the
          reviews are the convincing, so they belong where the choice is
          made, once. */}
      <ClientReviews locale="en" compact />
      {/* One contact moment, not two near-duplicates (owner, 2026-10-13,
          looking at the live page: "these 2 sections are basically the
          same"). ContactCta now carries HomeContactStrip's calm, guided
          shape (promise line, numbered 1-2-3, three direct taps) as the
          visible ask, with the longer form as voluntary depth under a
          native <details>. ClosingCredits below stays as the quiet closing
          tap. */}
      <ContactCta locale="en" />
      <KeepReading id="more" className="em-fold" title="Explore more services" destinations="Package add-ons, process, FAQ, about and how Esteban works.">
        {/* showGuide=false: the four packages and their prices already sit
            at the chooser's PriceSheet. This keeps the à la carte add-ons,
            the 3-step quote process and the FAQ — none of which duplicate
            the chooser. */}
        <PackagesSection locale="en" showRealEstatePlans={false} quiet showGuide={false} showALaCarte={false} />
        <AboutTeaser />
      </KeepReading>
      <ClosingCredits locale="en">
        <HomeClosingLinks locale="en" />
      </ClosingCredits>
    </main>
  );
}
