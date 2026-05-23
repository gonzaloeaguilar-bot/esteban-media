import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, serviceAreas, services, site, siteUrl } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Esteban Moreno Media | Video, Photo, Drone in Fort Lauderdale",
    template: "%s | Esteban Moreno Media",
  },
  description:
    "Fort Lauderdale visual storyteller for short-form video, photography, drone, editing, and local business content across Broward and Miami-Dade.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-US": "/es",
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: "Esteban Moreno Media | Fort Lauderdale Visual Storyteller",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esteban Moreno Media | Fort Lauderdale Visual Storyteller",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": absoluteUrl("/#business"),
  name: site.name,
  url: absoluteUrl("/"),
  email: site.email,
  description: site.description,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fort Lauderdale",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "Place",
    name: area.name,
  })),
  sameAs: [site.instagram],
  availableLanguage: ["English", "Spanish"],
  founder: {
    "@type": "Person",
    "@id": absoluteUrl("/#esteban"),
    name: "Esteban Moreno",
    jobTitle: "Visual storyteller, videographer, photographer, and editor",
    url: absoluteUrl("/about"),
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative production services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Fort Lauderdale", "Broward County", "Miami-Dade"],
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
