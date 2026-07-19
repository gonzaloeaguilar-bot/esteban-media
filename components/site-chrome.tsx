import { Geist, Geist_Mono, Newsreader } from "next/font/google";

import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteEntityGraphJsonLd } from "@/lib/entity-schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const siteBodyClassName = `${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteEntityGraphJsonLd),
        }}
      />
      <a
        href="#main-content"
        className="sr-only z-50 rounded-full bg-[#101214] px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content / Saltar al contenido
      </a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <SiteFooter />
      <GoogleAnalytics />
    </>
  );
}
