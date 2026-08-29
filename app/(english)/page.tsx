import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export const metadata: Metadata = {
  // Lead the homepage title with the exact business name ("Esteban Moreno Media")
  // for entity clarity and brand discovery.
  title: {
    absolute:
      "Esteban Moreno Media | Video Editing & AI Content",
  },
  description:
    "Video editing, AI-assisted content, and social production for South Florida businesses. Bilingual English/Español. Fort Lauderdale — get a fast quote.",
  openGraph: {
    title: "Esteban Moreno Media | Video Editing & AI Content",
    description:
      "Video editing, AI-assisted content, and social production for South Florida businesses. Bilingual English/Español. Fort Lauderdale — get a fast quote.",
  },
  twitter: {
    title: "Esteban Moreno Media | Video Editing & AI Content",
    description:
      "Video editing, AI-assisted content, and social production for South Florida businesses. Bilingual English/Español. Fort Lauderdale — get a fast quote.",
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
