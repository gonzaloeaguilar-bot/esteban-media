import type { Metadata } from "next";
import localFont from "next/font/local";

import { GoogleAnalytics } from "@/components/google-analytics";
import { site, siteUrl } from "@/lib/site";
import "../globals.css";

const geist = localFont({
  src: "../fonts/geist-sans-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});
const instrumentSerif = localFont({
  src: "../fonts/instrument-serif-latin.woff2",
  variable: "--font-price",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: `%s | ${site.name}` },
  robots: { index: false, follow: true },
};

export default function CardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-US">
      <body className={`${geist.variable} ${instrumentSerif.variable} bg-[#f6f1ea] antialiased`}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
