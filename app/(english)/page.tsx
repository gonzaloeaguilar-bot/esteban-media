import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { SiteIntro } from "@/components/site-intro";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export const metadata: Metadata = {
  // Keep the observed homepage intent in one bounded contract: video editing,
  // website designer support, and scoped video production are all confirmed offerings.
  title: {
    absolute:
      "Esteban Moreno Media | Fort Lauderdale Video Producer",
  },
  description:
    "Esteban Moreno Media creates professional video content for Fort Lauderdale businesses. View our portfolio, services, and contact us to discuss your project.",
  openGraph: {
    title: "Esteban Moreno Media | Fort Lauderdale Video Producer",
    description:
      "Esteban Moreno Media creates professional video content for Fort Lauderdale businesses. View our portfolio, services, and contact us to discuss your project.",
  },
  twitter: {
    title: "Esteban Moreno Media | Fort Lauderdale Video Producer",
    description:
      "Esteban Moreno Media creates professional video content for Fort Lauderdale businesses. View our portfolio, services, and contact us to discuss your project.",
  },
};

export default function Home() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <SiteIntro tagline="Clear creative support, from your footage to ready-to-publish content." />
      <HeroVideo />
      <PortfolioTeaser locale="en" />
      <HomeAuthorityHub />
      <ServicesStrip />
      <ClientReviews locale="en" />
      <AboutTeaser />
      <ContactCta />
    </main>
  );
}
