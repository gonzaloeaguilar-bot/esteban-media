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
      "Esteban Moreno Media | Video Editing, Production & Websites",
  },
  description:
    "Esteban Moreno Media offers video editing services, website designer support, and scoped video production services in South Florida. View video editing work.",
  openGraph: {
    title: "Esteban Moreno Media | Video Editing, Production & Websites",
    description:
      "Esteban Moreno Media offers video editing services, website designer support, and scoped video production services in South Florida. View video editing work.",
  },
  twitter: {
    title: "Esteban Moreno Media | Video Editing, Production & Websites",
    description:
      "Esteban Moreno Media offers video editing services, website designer support, and scoped video production services in South Florida. View video editing work.",
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
