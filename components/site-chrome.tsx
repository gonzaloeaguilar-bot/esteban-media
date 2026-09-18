import { Geist, Geist_Mono, Newsreader } from "next/font/google";

import { GoogleAnalytics } from "@/components/google-analytics";
import { MOTION_GATE_SCRIPT, RouteVeil, SiteMotion } from "@/components/site-motion";
import { StickyCta } from "@/components/em-sticky-cta";
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
      {/* Before paint, always. Adding the gate class after first paint would
          let a block render visible and then snap to opacity 0, which is worse
          than no animation; and the arrival veil has to exist before the new
          page's first frame, which a script at the end of <body> cannot do. */}
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: MOTION_GATE_SCRIPT }}
      />
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
      <SiteMotion />
      <StickyCta />
      <RouteVeil />
      <GoogleAnalytics />
    </>
  );
}
