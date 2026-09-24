import type { Metadata } from "next";
import { isNoindexPath } from "@/lib/consolidation";

import { languageAlternates, spanishSite } from "@/lib/spanish-site";
import { absoluteUrl, site, siteUrl, socialImage } from "@/lib/site";

type SocialMetadataImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: "en" | "es";
  languages?: Record<string, string>;
  type?: "website" | "profile";
  images?: SocialMetadataImage[];
};

// The root layouts (english + spanish) set a `title.template` of
// `%s | ${site.name}` so any page that supplies a plain string title gets
// the brand appended automatically. A page whose own title already names
// the brand (e.g. "Contact Esteban Moreno Media | ...") would then render
// with the brand twice — once from the page, once from the template. When
// that happens, wrap the title in `{ absolute }` so Next renders it exactly
// as written instead of running it through the parent template again.
function containsBrand(value: string): boolean {
  return value.toLowerCase().includes(site.name.toLowerCase());
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  languages = languageAlternates[path],
  type = "website",
  images = [socialImage],
}: PageMetadataOptions): Metadata {
  const titleAlreadyBranded = containsBrand(title);
  const socialTitle = titleAlreadyBranded ? title : `${title} | ${site.name}`;

  return {
    title: titleAlreadyBranded ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: site.name,
      title: socialTitle,
      description,
      locale: locale === "es" ? "es_US" : "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.map((image) => image.url),
    },
    // Pages carrying a 2026-08-12 NOINDEX decision: Google saw them, declined
    // to index them, and they earn nothing. The directive makes that explicit
    // instead of leaving them to be recrawled indefinitely.
    ...(isNoindexPath(path)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

function buildRootMetadata(locale: "en" | "es"): Metadata {
  const isSpanish = locale === "es";
  const path = isSpanish ? "/es" : "/";
  // spanishSite.title already names the brand ("Esteban Moreno Media |
  // Sistemas de Growth..."); appending site.name again double-branded /es.
  const title = isSpanish
    ? spanishSite.title
    : `Esteban Moreno | Video Editor in Fort Lauderdale | ${site.name}`;
  const description = isSpanish ? spanishSite.description : site.description;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates[path],
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      siteName: site.name,
      title,
      description,
      locale: isSpanish ? "es_US" : "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: site.googleSiteVerification,
    },
  };
}

export const englishRootMetadata = buildRootMetadata("en");
export const spanishRootMetadata = buildRootMetadata("es");
