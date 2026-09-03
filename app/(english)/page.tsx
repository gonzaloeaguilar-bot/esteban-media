import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export const metadata: Metadata = {
  // Keep the observed homepage intent in one bounded contract: video editing
  // and scoped video production are confirmed offerings and the only services
  // represented in this CTR-focused snippet.
  title: {
    absolute:
      "Video Editing Services & Production | Esteban Moreno Media",
  },
  description:
    "Video editing services and scoped video production for South Florida businesses. Explore Esteban Moreno Media's portfolio and start your project.",
  openGraph: {
    title: "Video Editing Services & Production | Esteban Moreno Media",
    description:
      "Video editing services and scoped video production for South Florida businesses. Explore Esteban Moreno Media's portfolio and start your project.",
  },
  twitter: {
    title: "Video Editing Services & Production | Esteban Moreno Media",
    description:
      "Video editing services and scoped video production for South Florida businesses. Explore Esteban Moreno Media's portfolio and start your project.",
  },
};

export default function Home() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <HeroVideo />
      <HomeAuthorityHub />
      <ServicesStrip />
      <PortfolioTeaser locale="en" />
      <ClientReviews locale="en" />
      <AboutTeaser />
      <ContactCta />
    </main>
  );
}
