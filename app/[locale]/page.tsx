import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/Hero";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  // Opt the static route in to per-locale rendering so child components can
  // call `useTranslations` without forcing the route into dynamic mode.
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ServicesStrip />
      <AboutTeaser />
      <ContactCTA />
    </main>
  );
}
