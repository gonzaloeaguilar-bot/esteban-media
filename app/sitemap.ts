import type { MetadataRoute } from "next";

import {
  getGuideAlternates,
  getGuidePath,
  getGuides,
  type GuideLocale,
} from "@/lib/guides";
import {
  getPortfolioWatchItems,
  getPortfolioWatchLanguages,
  getPortfolioWatchPath,
  type PortfolioWatchLocale,
} from "@/lib/portfolio-watch";
import { languageAlternates, spanishRoutes } from "@/lib/spanish-site";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/services/ai-product-photography-miami", priority: 0.85 },
  { path: "/services/dental-video-marketing-south-florida", priority: 0.85 },
  { path: "/services/med-spa-video-marketing-south-florida", priority: 0.85 },
  { path: "/services/content-repurposing-service-miami", priority: 0.85 },
  { path: "/services/small-business-video-production-miami", priority: 0.85 },
  { path: "/services/ai-real-estate-photo-enhancement", priority: 0.85 },
  { path: "/services/ai-food-photography-restaurants", priority: 0.85 },
  { path: "/services/contractor-video-marketing-south-florida", priority: 0.85 },
  { path: "/services/headshot-photographer-miami", priority: 0.85 },
  { path: "/services/short-form-video-editor-miami", priority: 0.85 },
  { path: "/services/video-production-boca-raton", priority: 0.85 },
  { path: "/services/video-editing-west-palm-beach", priority: 0.85 },
  { path: "/services/video-production-doral-miami", priority: 0.85 },
  { path: "/services/real-estate-video-coral-gables", priority: 0.85 },
  { path: "/services/yacht-hospitality-video-fort-lauderdale", priority: 0.85 },
  { path: "/services/corporate-video-production-brickell", priority: 0.85 },
  { path: "/services/small-business-video-pembroke-pines", priority: 0.85 },
  { path: "/services/plastic-surgery-video-marketing-miami", priority: 0.85 },
  { path: "/services/jewelry-product-photography-miami", priority: 0.85 },
  { path: "/services/fitness-gym-video-marketing-miami", priority: 0.85 },
  { path: "/services/corporate-event-videographer-miami", priority: 0.85 },
  { path: "/services/automotive-video-marketing-miami", priority: 0.85 },
  { path: "/services/hotel-hospitality-video-production-miami", priority: 0.85 },
  { path: "/services/video-podcast-editing-service-miami", priority: 0.85 },
  { path: "/services/ugc-video-editor-ecommerce", priority: 0.85 },
  { path: "/services/architecture-design-video-miami", priority: 0.85 },
  { path: "/services/wellness-spa-video-marketing-miami", priority: 0.85 },
  { path: "/services/event-video-editing-miami", priority: 0.85 },
  { path: "/services/brand-video-production-miami", priority: 0.85 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/areas", priority: 0.85 },
  { path: "/areas/palm-beach-county", priority: 0.85 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
];

function sitemapAlternates(path: string) {
  const languages = languageAlternates[path];

  if (!languages) {
    return undefined;
  }

  return {
    languages: Object.fromEntries(
      Object.entries(languages).map(([language, route]) => [
        language,
        absoluteUrl(route),
      ]),
    ),
  };
}

function watchSitemapAlternates(id: string) {
  return {
    languages: Object.fromEntries(
      Object.entries(getPortfolioWatchLanguages(id)).map(([language, path]) => [
        language,
        absoluteUrl(path),
      ]),
    ),
  };
}

function guideSitemapAlternates(locale: GuideLocale, slug: string) {
  const guide = getGuides(locale).find((candidate) => candidate.slug === slug);

  if (!guide) {
    throw new Error(`Missing ${locale} guide for sitemap slug ${slug}`);
  }

  return {
    languages: Object.fromEntries(
      Object.entries(getGuideAlternates(guide)).map(([language, path]) => [
        language,
        absoluteUrl(path),
      ]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const releaseLastModified = new Date("2026-07-19");
  const watchLocales: readonly PortfolioWatchLocale[] = ["en", "es"];
  const guideLocales: readonly GuideLocale[] = ["en", "es"];

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: releaseLastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
      alternates: sitemapAlternates(route.path),
    })),
    ...spanishRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: releaseLastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/es" ? 0.95 : 0.75,
      alternates: sitemapAlternates(path),
    })),
    ...getPortfolioWatchItems().flatMap((item) =>
      watchLocales.map((locale) => ({
        url: absoluteUrl(getPortfolioWatchPath(item.id, locale)),
        lastModified: releaseLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: watchSitemapAlternates(item.id),
      })),
    ),
    ...guideLocales.map((locale) => {
      const path = locale === "es" ? "/es/guias" : "/guides";
      return {
        url: absoluteUrl(path),
        lastModified: releaseLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            "en-US": absoluteUrl("/guides"),
            "es-US": absoluteUrl("/es/guias"),
            "x-default": absoluteUrl("/guides"),
          },
        },
      };
    }),
    ...guideLocales.flatMap((locale) =>
      getGuides(locale).map((guide) => ({
        url: absoluteUrl(getGuidePath(guide)),
        lastModified: releaseLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: guideSitemapAlternates(locale, guide.slug),
      })),
    ),
  ];
}
