import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export const metadata: Metadata = {
  // Keep the observed homepage intent in one bounded contract: video editing,
  // website design, and scoped video production are all confirmed offerings.
  title: {
    absolute:
      "Esteban Moreno Media | Video Editing Services & Website Design",
  },
  description:
    "Video editing services, video production services, and website design for South Florida businesses. View portfolio work and request a scoped project quote.",
  openGraph: {
    title: "Esteban Moreno Media | Video Editing Services & Website Design",
    description:
      "Video editing services, video production services, and website design for South Florida businesses. View portfolio work and request a scoped project quote.",
  },
  twitter: {
    title: "Esteban Moreno Media | Video Editing Services & Website Design",
    description:
      "Video editing services, video production services, and website design for South Florida businesses. View portfolio work and request a scoped project quote.",
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
