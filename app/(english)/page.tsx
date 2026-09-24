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
  title: {
    absolute: "Esteban Moreno Media | Video Production & Photography Services in Fort Lauderdale",
  },
  description: "Professional video production and photography for businesses in Fort Lauderdale and South Florida. Boost your brand with Esteban Moreno Media.",
  openGraph: {
    title: "Esteban Moreno Media | Video Production & Photography Services in Fort Lauderdale",
    description: "Professional video production and photography for businesses in Fort Lauderdale and South Florida. Boost your brand with Esteban Moreno Media.",
  },
  twitter: {
    title: "Esteban Moreno Media | Video Production & Photography Services in Fort Lauderdale",
    description: "Professional video production and photography for businesses in Fort Lauderdale and South Florida. Boost your brand with Esteban Moreno Media.",
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
