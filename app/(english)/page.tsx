import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  // Lead the homepage title with the brand-name entity ("Esteban Moreno")
  // to close the entity gap on the "esteban moreno" brand query.
  title: {
    absolute:
      "Esteban Moreno | Fort Lauderdale Video Editor & Content Creator",
  },
  description: site.description,
  openGraph: {
    title: "Esteban Moreno | Fort Lauderdale Video Editor & Content Creator",
    description: site.description,
  },
  twitter: {
    title: "Esteban Moreno | Fort Lauderdale Video Editor & Content Creator",
    description: site.description,
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
