import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/Hero";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { LocalMarketStrip } from "@/components/sections/LocalMarketStrip";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Homepage metadata. Uses `defaultTitle` as the absolute document title (no
 * "X · Esteban Moreno Media" template wrap — the default already carries the brand
 * name + tagline) and the default site description.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPageMetadata({
    locale: locale as Locale,
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    path: "",
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  // Opt the static route in to per-locale rendering so child components can
  // call `useTranslations` without forcing the route into dynamic mode.
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ServicesStrip />
      <LocalMarketStrip locale={locale as Locale} />
      <AboutTeaser />
      <ContactCTA />
    </main>
  );
}
