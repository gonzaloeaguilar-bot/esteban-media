import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";

import { GoogleAnalytics } from "@/components/google-analytics";
import { site, siteUrl } from "@/lib/site";
import "../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-price",
  subsets: ["latin"],
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
