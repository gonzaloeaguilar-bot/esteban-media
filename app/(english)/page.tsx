import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { ClosingCredits, PackagesSection } from "@/components/packages-section";
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
    <main className="bg-[#f7f5f1] text-[#101214]">
      <HeroVideo />
      <PackagesSection locale="en" />
      <PortfolioTeaser locale="en" />
      <ClientReviews locale="en" />
      <HomeAuthorityHub />
      <ServicesStrip />
      <AboutTeaser />
      <ContactCta />
      <ClosingCredits locale="en" />
    </main>
  );
}
