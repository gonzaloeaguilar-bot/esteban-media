import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import "../globals.css";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Statically render every supported locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // 404 on unknown locales rather than silently rendering the default.
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Required so server components rendered below can call useTranslations
  // without an extra await.
  setRequestLocale(locale as Locale);

  // Pass messages explicitly so client components (LanguageSwitcher) can
  // read translations without round-tripping to the server. next-intl 3.x
  // does not auto-forward server messages to the client provider.
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>

          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
