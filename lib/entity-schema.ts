import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl, serviceAreas, services, site } from "@/lib/site";

export const entityIds = {
  business: absoluteUrl("/#business"),
  person: absoluteUrl("/#esteban"),
  website: absoluteUrl("/#website"),
} as const;

export const personEntityJsonLd = {
  "@type": "Person",
  "@id": entityIds.person,
  name: site.founder.fullName,
  alternateName: site.founder.name,
  description:
    "Spanish-first video editor and content creator based in Fort Lauderdale, with intermediate English communication available.",
  // Round 2 (2026-10-14): autocomplete for "esteban moreno" lists other people
  // with the name; this line and the visible "Who is Esteban Moreno?" section on
  // /about say which one this is.
  disambiguatingDescription:
    "Video editor and content creator in Fort Lauderdale, Florida; founder of Esteban Moreno Media.",
  url: absoluteUrl("/about"),
  // The photo shown on /about (components/on-set-media.tsx).
  image: absoluteUrl("/about/esteban-on-location.jpg"),
  // The Google Business Profile is the business listing, not the person; it
  // stays on the #business sameAs only (SEO/GEO audit 2026-10-10, fix 7).
  sameAs: [site.instagram, site.youtube],
  jobTitle: "Video editor and content creator",
  worksFor: {
    "@id": entityIds.business,
  },
  knowsLanguage: ["Spanish", "English (intermediate)"],
  workLocation: [
    { "@type": "City", name: "Fort Lauderdale, Florida" },
    { "@type": "AdministrativeArea", name: "Broward County, Florida" },
    { "@type": "AdministrativeArea", name: "Miami-Dade County, Florida" },
    { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
  ],
  knowsAbout: [
    "AI-assisted content",
    "selectively scoped on-location video production",
    "social media planning",
    "short-form video",
    "video editing",
    "South Florida local business content",
  ],
};

export const localBusinessEntityJsonLd = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": entityIds.business,
  name: site.name,
  url: absoluteUrl("/"),
  email: site.email,
  telephone: site.phone.e164,
  // Published starting prices only: Arranque / Starter from $100 per video (low)
  // to Presencia Local / Local Presence from $800 per production day (high), with
  // Todo Incluido / All-In quoted per project. "+" signals the custom-quote
  // ceiling rather than inventing a fixed maximum.
  priceRange: "$100-$800+",
  description: site.description,
  // 180x180 app icon, the only square brand mark the repo ships (public/
  // has no separate logo asset). Meets Google's minimum recommended
  // logo size (112x112) for the Organization/LocalBusiness rich-result eligibility check.
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/apple-icon.png"),
    width: 180,
    height: 180,
  },
  // The "A" of NAP. Read live 2026-08-15: the Google profile is
  // CUSTOMER_LOCATION_ONLY with storefrontAddress null, so no streetAddress may
  // ever be published here — but locality/region/country must be, because
  // areaServed says where he works, not where the business is, and
  // LocalBusiness is defined around `address`. Keep this identical to the GBP
  // city and to every citation (esteban-citation-packet-2026-08-14).
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fort Lauderdale",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": area.schemaType,
    name: area.name,
  })),
  sameAs: [
    site.instagram,
    site.youtube,
    site.googleBusinessProfile,
    site.bingPlaces,
    site.instagramBusiness,
    site.behance,
    site.vimeo,
    site.nextdoor,
  ],
  availableLanguage: ["Spanish", "English (intermediate)"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "project inquiries",
    email: site.email,
    telephone: site.phone.e164,
    availableLanguage: ["Spanish", "English (intermediate)"],
  },
  founder: {
    "@id": entityIds.person,
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
        provider: { "@id": entityIds.business },
        areaServed: serviceAreas.map((area) => area.name),
      },
    })),
  },
};

export const websiteEntityJsonLd = {
  "@type": "WebSite",
  "@id": entityIds.website,
  name: site.name,
  url: absoluteUrl("/"),
  inLanguage: ["en-US", "es-US"],
  publisher: {
    "@id": entityIds.business,
  },
  creator: {
    "@id": entityIds.person,
  },
  about: {
    "@id": entityIds.person,
  },
  potentialAction: {
    "@type": "ContactAction",
    target: absoluteUrl("/contact"),
    name: "Start a creative project",
  },
};

export const siteEntityGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personEntityJsonLd,
    localBusinessEntityJsonLd,
    websiteEntityJsonLd,
  ],
};

export function buildProfilePageJsonLd({
  path,
  name,
  description,
  language,
}: {
  path: "/about" | "/es/sobre-esteban";
  name: string;
  description: string;
  language: "en-US" | "es-US";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl(`${path}#profile`),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: language,
    ...(pageLastModified(path) ? { dateModified: pageLastModified(path) } : {}),
    isPartOf: {
      "@id": entityIds.website,
    },
    about: {
      "@id": entityIds.person,
    },
    mainEntity: {
      "@id": entityIds.person,
    },
  };
}
