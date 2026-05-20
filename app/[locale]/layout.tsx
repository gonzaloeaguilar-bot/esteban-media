import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";

import "../globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo/business-info";
import { buildPageMetadata } from "@/lib/seo/metadata";
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

/**
 * Viewport + theme color. In Next 15 these MUST be exported separately from
 * `generateMetadata` — putting them in the Metadata object emits a build-time
 * warning and won't render the `<meta name="theme-color">` tag, which knocks
 * Lighthouse SEO + PWA points.
 *
 * `themeColor` ships both light/dark variants so the browser chrome on iOS
 * Safari / Android Chrome matches the visitor's OS preference. Values mirror
 * the `--background` token set in `globals.css` (oklch white / near-black).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Don't lock zoom — accessibility regression and a Lighthouse a11y fail.
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Layout-level metadata. Anything set here is the *default* — child pages
 * that export their own `generateMetadata` can override per field, but note
 * that `openGraph` and `twitter` blocks are not deep-merged: a child that
 * sets `openGraph` replaces this one wholesale. That's why every page calls
 * `buildPageMetadata` from `lib/seo/metadata.ts` to emit the complete block.
 *
 * `metadataBase` resolves relative URLs (used by the auto-attached
 * `opengraph-image.tsx`) to absolute URLs. Reading from `SITE_URL` keeps
 * preview-vs-prod swappable via the `NEXT_PUBLIC_SITE_URL` env.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });

  // Build the full page-level block (openGraph/twitter/alternates) as the
  // default for any descendant route that doesn't export its own metadata.
  const base = await buildPageMetadata({
    locale: locale as Locale,
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    path: "",
    absoluteTitle: true,
  });

  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    // Layout owns the title template so child pages can export a simple
    // string title and get the brand suffix applied automatically. `default`
    // is used when a child page doesn't export its own title.
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate", { title: "%s" }),
    },
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
