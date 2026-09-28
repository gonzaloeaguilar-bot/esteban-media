import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { SignalIntro } from "@/components/signal-intro";
import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { KeepReading } from "@/components/keep-reading";
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
      <SignalIntro locale="en" />
      <HeroVideo />
      <PackagesSection locale="en" />
      <PortfolioTeaser locale="en" />
      <ClientReviews locale="en" />
      <KeepReading id="more" title="Want to see everything?" destinations="Services, areas, guides and more about Esteban.">
        <HomeAuthorityHub />
        <ServicesStrip />
        <AboutTeaser />
        <ContactCta />
      </KeepReading>
      <ClosingCredits locale="en" />
    </main>
  );
}
