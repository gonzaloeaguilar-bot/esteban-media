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
      "Esteban Moreno Media | AI Chatbots, Automation & Websites",
  },
  description:
    "AI lead-capture chatbots, customer workflows, and conversion websites for Fort Lauderdale businesses across Broward and Miami-Dade.",
  openGraph: {
    title: "Esteban Moreno Media | AI Chatbots, Automation & Websites",
    description:
      "AI lead-capture chatbots, customer workflows, and conversion websites for Fort Lauderdale businesses across Broward and Miami-Dade.",
  },
  twitter: {
    title: "Esteban Moreno Media | AI Chatbots, Automation & Websites",
    description:
      "AI lead-capture chatbots, customer workflows, and conversion websites for Fort Lauderdale businesses across Broward and Miami-Dade.",
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
