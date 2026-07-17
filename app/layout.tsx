import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { languageAlternates } from "@/lib/spanish-site";
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
    default: "Esteban Moreno Media | Video Editing & Content in South Florida",
    template: "%s | Esteban Moreno Media",
  },
  description:
    "Fort Lauderdale video editor and content partner for AI-assisted creative, social media planning, and scoped production across Broward, Miami-Dade, Palm Beach County, and remote projects.",
  alternates: {
    canonical: "/",
    languages: languageAlternates["/"],
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: "Esteban Moreno Media | Video Editor & Content Partner",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esteban Moreno Media | Video Editor & Content Partner",
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
  telephone: site.phone.e164,
  description: site.description,
  areaServed: serviceAreas.map((area) => ({
    "@type": area.schemaType,
    name: area.name,
  })),
  sameAs: [site.instagram, site.youtube],
  availableLanguage: ["Spanish", "English"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "project inquiries",
    email: site.email,
    telephone: site.phone.e164,
    availableLanguage: ["Spanish", "English"],
  },
  founder: {
    "@type": "Person",
    "@id": absoluteUrl("/#esteban"),
    name: "Esteban Moreno",
    jobTitle: "Audiovisual communicator, video editor, and content creator",
    url: absoluteUrl("/about"),
    sameAs: [site.instagram, site.youtube],
    knowsLanguage: ["Spanish", "English"],
    knowsAbout: [
      "AI-assisted content",
      "social media planning",
      "mobile video capture",
      "product photography",
      "short-form video",
      "video editing",
      "South Florida local business content",
    ],
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
        areaServed: serviceAreas.map((area) => area.name),
      },
    })),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  url: absoluteUrl("/"),
  inLanguage: ["en-US", "es-US"],
  publisher: {
    "@id": absoluteUrl("/#business"),
  },
  potentialAction: {
    "@type": "ContactAction",
    target: absoluteUrl("/contact"),
    name: "Start a creative project",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
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
      </body>
    </html>
  );
}
