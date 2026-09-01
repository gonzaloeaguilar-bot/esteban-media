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
      "Video Editing & Production Services | Esteban Moreno Media",
  },
  description:
    "Video editing and scoped video production services for South Florida businesses. AI-assisted content and social planning. Bilingual English/Español.",
  openGraph: {
    title: "Video Editing & Production Services | Esteban Moreno Media",
    description:
      "Video editing and scoped video production services for South Florida businesses. AI-assisted content and social planning. Bilingual English/Español.",
  },
  twitter: {
    title: "Video Editing & Production Services | Esteban Moreno Media",
    description:
      "Video editing and scoped video production services for South Florida businesses. AI-assisted content and social planning. Bilingual English/Español.",
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
