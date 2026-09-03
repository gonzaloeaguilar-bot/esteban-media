import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export const metadata: Metadata = {
  // Lead with the exact business name for the observed branded homepage query,
  // then state the confirmed service category for production-services intent.
  title: {
    absolute:
      "Esteban Moreno Media | Video Editing & Production Services",
  },
  description:
    "Esteban Moreno Media: video editing services and scoped video production services for South Florida businesses, plus AI-assisted content and social planning.",
  openGraph: {
    title: "Esteban Moreno Media | Video Editing & Production Services",
    description:
      "Esteban Moreno Media: video editing services and scoped video production services for South Florida businesses, plus AI-assisted content and social planning.",
  },
  twitter: {
    title: "Esteban Moreno Media | Video Editing & Production Services",
    description:
      "Esteban Moreno Media: video editing services and scoped video production services for South Florida businesses, plus AI-assisted content and social planning.",
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
