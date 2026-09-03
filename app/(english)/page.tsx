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
  // then lead with the observed editing-services intent. Production remains
  // explicitly scoped to avoid expanding the confirmed on-location offering.
  title: {
    absolute:
      "Video Editing Services | Esteban Moreno Media",
  },
  description:
    "Video editing services for South Florida businesses, with scoped video production, AI-assisted content, and social planning from Esteban Moreno Media.",
  openGraph: {
    title: "Video Editing Services | Esteban Moreno Media",
    description:
      "Video editing services for South Florida businesses, with scoped video production, AI-assisted content, and social planning from Esteban Moreno Media.",
  },
  twitter: {
    title: "Video Editing Services | Esteban Moreno Media",
    description:
      "Video editing services for South Florida businesses, with scoped video production, AI-assisted content, and social planning from Esteban Moreno Media.",
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
