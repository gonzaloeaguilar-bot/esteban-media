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

/**
 * Google truncates a description around 155-160 characters, so a long tail is
 * written for nobody. Measured on production 2026-09-28: 6 of a 40-URL sample
 * ran over, up to 280 characters — portfolio and case-study pages, whose
 * descriptions are generated from body copy rather than written.
 *
 * The ceiling is 170, not 158: hand-written descriptions on this site land at
 * 150-160 by design, and clamping those would rewrite good copy to fix bad
 * copy. 170 leaves them untouched and still cuts the generated 179-280s.
 *
 * Cut on a word, never mid-word, and never add an ellipsis to something that
 * already ends in punctuation.
 */
export function clampDescription(value: string, max = 170): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const atWord = cut.slice(0, cut.lastIndexOf(" "));
  const body = (atWord.length > max * 0.6 ? atWord : cut).replace(/[\s,;:—-]+$/, "");
  return /[.!?]$/.test(body) ? body : `${body}…`;
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
  const metaDescription = clampDescription(description);

  return {
    title: titleAlreadyBranded ? { absolute: title } : title,
    description: metaDescription,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: site.name,
      title: socialTitle,
      description: metaDescription,
      locale: locale === "es" ? "es_US" : "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: metaDescription,
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
