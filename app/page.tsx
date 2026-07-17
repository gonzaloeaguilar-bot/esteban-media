import { AboutTeaser } from "@/components/about-teaser";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export default function Home() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <HeroVideo />
      <ServicesStrip />
      <PortfolioTeaser locale="en" />
      <AboutTeaser />
      <ContactCta />
    </main>
  );
}
