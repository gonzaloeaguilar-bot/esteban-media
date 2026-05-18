import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";

import "../globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { buildSiteGraph } from "@/lib/seo/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Pre-render both locales as static segments. `dynamicParams = false` 404s any
 * unknown locale prefix instead of falling through to runtime locale detection,
 * which keeps the canonical URL set tight (`/en/*` and `/es/*` only).
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate", { title: "%s" }),
    },
    description: t("defaultDescription"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required for static rendering to pick up the right locale per request.
  setRequestLocale(locale);

  // Site-wide structured data: LocalBusiness + Person, linked via @id refs.
  // Rendered once on every page so crawlers can resolve the org/person on
  // any URL without depending on the homepage being the entry point.
  const siteGraph = buildSiteGraph();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd id="site-graph" data={siteGraph} />
        <NextIntlClientProvider>
          <SiteHeader />
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
