import { AudienceRouter } from "@/components/audience-router";
import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { SignalIntro } from "@/components/signal-intro";
import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { KeepReading } from "@/components/keep-reading";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

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
  openGraph: {
    title: "Fort Lauderdale Video Production & Editing | Esteban Moreno",
    description:
      "Video editing, on-location capture and social content for businesses in Fort Lauderdale, Broward and Miami-Dade. Spanish-first, English available.",
  },
  twitter: {
    title: "Fort Lauderdale Video Production & Editing | Esteban Moreno",
    description:
      "Video editing, on-location capture and social content for businesses in Fort Lauderdale, Broward and Miami-Dade. Spanish-first, English available.",
  },
};

export default function Home() {
  return (
    <main className="bg-[#f7f5f1] text-[#101214]">
      <SignalIntro locale="en" />
      <HeroVideo />
      {/* Social traffic ALL lands here: 36 sessions from Facebook and Instagram in
          30 days, every one of them on "/", and all three of the site's form starts
          came from m.facebook.com. The pages that convert existed and the homepage
          linked to none of them. Above the fold on purpose — a visitor from an
          Instagram bio link should not have to open a fold-out to find their lane. */}
      <AudienceRouter locale="en" />
      <PackagesSection locale="en" />
      <PortfolioTeaser locale="en" />
      <ClientReviews locale="en" />
      <KeepReading id="more" className="em-fold" title="Want to see everything?" destinations="Services, areas, guides and more about Esteban.">
        <HomeAuthorityHub />
        <ServicesStrip />
        <AboutTeaser />
        <ContactCta />
      </KeepReading>
      <ClosingCredits locale="en" />
    </main>
  );
}
