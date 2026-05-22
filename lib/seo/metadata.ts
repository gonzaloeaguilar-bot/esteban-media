/**
 * Page-level `Metadata` builder for Esteban Moreno Media.
 *
 * Why this exists:
 *  - Next.js does NOT deeply-merge `openGraph` / `twitter` blocks across
 *    layout → page. A page that exports its own `openGraph` *replaces* the
 *    layout's openGraph wholesale. So every page that wants page-specific
 *    title/description in OG cards must emit the full block.
 *  - To keep that DRY (and to avoid hard-coding English strings into TSX),
 *    each page calls `buildPageMetadata({...})` from its `generateMetadata`.
 *  - The helper sources all visible strings from `messages/{locale}.json`
 *    under the `Metadata` namespace. No copy lives in TSX.
 *
 * OG images are NOT set explicitly here. Next.js auto-attaches any
 * `opengraph-image.(tsx|png|jpg)` file colocated in a parent segment (we ship
 * `app/[locale]/opengraph-image.tsx`) to the `openGraph.images` /
 * `twitter.images` arrays at build time. Setting `images` here would override
 * that auto-detection — see
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";

import { SITE_URL } from "./business-info";

/**
 * Map app locales → OG `og:locale` codes. `og:locale` expects `lang_TERRITORY`
 * (BCP-47-ish). The site targets South Florida bilingual audiences, so US
 * English and US Spanish are the right pairings.
 */
const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_US",
};

/**
 * Hardcoded list of supported app locales narrowed to `Locale`. We avoid
 * importing the un-narrowed `routing.locales` directly into typed Record keys
 * by using `as readonly Locale[]` here.
 */
const ALL_LOCALES = routing.locales as readonly Locale[];

export type PageMetadataInput = {
  locale: Locale;
  /**
   * Human-readable page title. The template (`"{title} · Esteban Moreno Media"`)
   * wraps this for the OG/Twitter card title automatically. If `absoluteTitle`
   * is true, the title is emitted as-is (used for the homepage, which already
   * carries the brand name in its default title).
   */
  title: string;
  /** Page-specific meta description (≤ ~160 chars recommended). */
  description: string;
  /**
   * Path under the locale segment, with a leading slash. Use empty string for
   * the locale root (homepage). Examples: "", "/services", "/contact",
   * "/services/aerial".
   */
  path: string;
  /**
   * If true, emit `title` as the absolute document title (no template wrap).
   * Use for the homepage where `defaultTitle` already includes the brand.
   */
  absoluteTitle?: boolean;
};

/**
 * Build a fully-formed Next `Metadata` object for one page.
 *
 * Includes:
 *  - `metadataBase` so `openGraph.images` (auto-attached from
 *    `opengraph-image.tsx`) resolve to absolute URLs.
 *  - `alternates.canonical` for the current locale + `alternates.languages`
 *    mapping every supported locale to its corresponding URL (hreflang).
 *  - `openGraph` block with type=website, siteName, url, locale +
 *    alternateLocale, title (template-wrapped unless absolute), description.
 *  - `twitter` block with card=summary_large_image and title/description that
 *    mirror the OG values.
 */
export async function buildPageMetadata({
  locale,
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteName = t("siteName");

  // Template-wrapped title is what users see in OG/Twitter cards. For the
  // document `<title>` we let next-intl's `titleTemplate` handle it via the
  // `title.template` field set on the locale layout, except when the caller
  // wants an absolute title (homepage).
  const cardTitle = absoluteTitle
    ? title
    : t("titleTemplate", { title });

  const url = `${SITE_URL}/${locale}${path}`;
  const otherLocales = ALL_LOCALES.filter((l) => l !== locale);

  // hreflang map. Includes the current locale too — Google treats self-refs
  // as valid and it makes the inheritance behaviour explicit for anyone
  // reading the rendered <head>.
  const languages: Record<string, string> = Object.fromEntries(
    ALL_LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: cardTitle,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: otherLocales.map((l) => OG_LOCALES[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
    },
  };
}
