import Script from "next/script";
import { Geist, Geist_Mono, Instrument_Serif, Newsreader, Oswald } from "next/font/google";

import { GoogleAnalytics } from "@/components/google-analytics";
import { MOTION_GATE_SCRIPT, RouteVeil, SiteMotion } from "@/components/site-motion";
import { AppNav } from "@/components/app-nav";
import { BRAND_MOMENT_BOOT_JS } from "@/vendor/web-kit/brand-moment/boot.generated";
import { ReadingProgress } from "@/components/em-reading-progress";
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
  preload: false,
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

// The title-card face: condensed, uppercase, for opening credits and package
// names only. Body and editorial copy stay on Geist and Newsreader.
const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-price",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const siteBodyClassName = `${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${oswald.variable} ${instrumentSerif.variable} antialiased`;

// The web-kit brand moment, decided before first paint. Vendored unmodified
// (vendor/web-kit/SOURCE.txt), compiled in as a string (boot.generated.ts,
// kept identical to boot.js by a test) so no page reads a file at runtime. Plays once per tab, only
// on the two home pages, never under reduced motion; the failsafe clears the
// veil even if the bundle never arrives.
// Renamed with the opening it belongs to: the key is what marks a tab as
// "already saw it", so a new name means every visitor gets the edit bay once,
// including the ones who had already seen the camera.
export const MOMENT_KEY = "em_signal_moment";
const BRAND_MOMENT_BOOT = `${BRAND_MOMENT_BOOT_JS}
wkBrandMoment({ key: "${MOMENT_KEY}", only: ["/", "/es"], failsafeMs: 8000 });`;

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
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: BRAND_MOMENT_BOOT }}
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
      <ReadingProgress />
      <AppNav />
      {/* beforeInteractive, not after: the veil is up from first paint, and the
          opening cannot mount until this script exists. Measured at 390x844 on
          a 2x context, afterInteractive left 2.4s of BLACK before the edit bay
          appeared — the visitor was looking at nothing while the page waited
          for hydration. The file is ~2KB. */}
      <Script id="web-kit-moment" src="/web-kit/mount.js" strategy="beforeInteractive" />
      <RouteVeil />
      <GoogleAnalytics />
    </>
  );
}
