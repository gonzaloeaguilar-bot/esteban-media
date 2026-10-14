import { packageRoutes } from "@/lib/package-routes";
import type { MetadataRoute } from "next";

import {
  getCaseStudies,
  getCaseStudyPath,
  type CaseStudyLocale,
} from "@/lib/case-studies";
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
import { isConsolidatedPath } from "@/lib/consolidation";
import { growthSystems } from "@/lib/growth-systems";
import { eventSectionPaths } from "@/lib/events";
import { languageAlternates, spanishRoutes } from "@/lib/spanish-site";
import { contentDateFor } from "@/lib/content-dates";
import { absoluteUrl } from "@/lib/site";
import { restaurantIgStudyPaths } from "@/lib/restaurant-ig-study";

/**
 * The 2026-10-10 inventory additions, both languages: six growth-system pairs,
 * five daily tool pairs, the two case-study hubs, /lens and /fort-lauderdale.
 */
export const inventoryAdditions20261010Paths: readonly string[] = [
  ...growthSystems.flatMap((system) => [
    `/services/${system.slug}`,
    `/es/${system.spanishSlug}`,
  ]),
  "/daily-publish-prompt",
  "/daily-hook-planner",
  "/daily-shot-list-planner",
  "/daily-script-pacing-calculator",
  "/daily-script-timer",
  "/es/prompt-de-publicacion-diaria",
  "/es/planificador-de-ganchos-de-video",
  "/es/planificador-de-tomas-de-video",
  "/es/calculadora-de-ritmo-de-video",
  "/es/temporizador-de-guiones-de-video",
  "/case-studies",
  "/es/casos-de-estudio",
  "/lens",
  "/fort-lauderdale",
];

function inventoryAdditionPriority(path: string): number {
  if (path === "/fort-lauderdale") return 0.85;
  if (path.startsWith("/services/") || growthSystems.some((s) => path === `/es/${s.spanishSlug}`)) {
    return 0.8;
  }
  if (path === "/case-studies" || path === "/es/casos-de-estudio") return 0.75;
  return 0.6;
}

const inventoryAdditions20261010 = inventoryAdditions20261010Paths.map((path) => ({
  path,
  priority: inventoryAdditionPriority(path),
}));

export const sitemapRoutes = [
  ...Object.values(packageRoutes).map((route) => ({ path: route.en, priority: 0.8 })),
  { path: "/", priority: 1 },
  { path: "/pricing", priority: 0.95 },
  // Published rates for a service line the packages do not cover.
  { path: "/pricing/real-estate", priority: 0.9 },
  { path: "/calculator", priority: 0.9 },
  { path: "/resources/social-video-kit", priority: 0.9 },
  { path: "/resources/video-project-brief-template", priority: 0.85 },
  { path: "/resources/remote-editing-handoff-checklist", priority: 0.85 },
  // Original data study (2026-10-14); the ES twin ships through spanishRoutes.
  { path: restaurantIgStudyPaths.en, priority: 0.8 },
  { path: "/resources/ai-product-photo-truth-checklist", priority: 0.85 },
  { path: "/assessment", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/services/hire-remote-video-editor", priority: 0.9 },
  { path: "/services/video-production-fort-lauderdale", priority: 0.88 },
  { path: "/services/reels-editor-fort-lauderdale", priority: 0.88 },
  { path: "/services/reels-editor-miami", priority: 0.88 },
  { path: "/services/real-estate-reels-video-editor-south-florida", priority: 0.88 },
  { path: "/services/website-design-fort-lauderdale", priority: 0.85 },
  { path: "/services/ai-product-photography-miami", priority: 0.85 },
  { path: "/services/product-photography-miami", priority: 0.85 },
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
  { path: "/services/fitness-trainer-video-production-miami", priority: 0.85 },
  { path: "/services/food-and-places-creator-video-editing-miami", priority: 0.85 },
  { path: "/services/restaurant-promo-video-editing-miami", priority: 0.85 },
  { path: "/services/law-firm-video-production-miami", priority: 0.85 },
  { path: "/services/yacht-charter-video-marketing-miami", priority: 0.85 },
  { path: "/services/cosmetic-dentistry-video-marketing-miami", priority: 0.85 },
  { path: "/services/nightlife-event-video-editing-miami", priority: 0.85 },
  { path: "/services/roofing-contractor-video-marketing-south-florida", priority: 0.85 },
  { path: "/services/wealth-management-video-production-miami", priority: 0.85 },
  { path: "/services/boutique-hotel-video-editing-miami", priority: 0.85 },
  { path: "/services/ecommerce-product-video-editor-miami", priority: 0.85 },
  { path: "/services/luxury-jewelry-video-editing-miami", priority: 0.85 },
  { path: "/services/real-estate-drone-video-editing-miami", priority: 0.85 },
  { path: "/services/video-editing-miami-beach", priority: 0.85 },
  { path: "/services/real-estate-video-aventura-miami", priority: 0.85 },
  { path: "/services/creative-video-production-wynwood", priority: 0.85 },
  { path: "/services/corporate-video-editing-weston-fl", priority: 0.85 },
  { path: "/services/luxury-brand-video-jupiter-fl", priority: 0.85 },
  { path: "/services/small-business-video-hollywood-fl", priority: 0.85 },
  { path: "/services/video-production-delray-beach", priority: 0.85 },
  { path: "/services/real-estate-video-sunny-isles", priority: 0.85 },
  { path: "/services/video-editing-palm-beach-gardens", priority: 0.85 },
  { path: "/services/video-production-davie-fl", priority: 0.85 },
  { path: "/services/youtube-video-editing-service-miami", priority: 0.85 },
  { path: "/services/tiktok-ad-video-editor-miami", priority: 0.85 },
  { path: "/services/online-course-video-editing-service", priority: 0.85 },
  { path: "/services/corporate-training-video-editing-miami", priority: 0.85 },
  { path: "/services/crowdfunding-video-editor-miami", priority: 0.85 },
  { path: "/services/drone-video-editing-service-miami", priority: 0.85 },
  { path: "/services/music-video-post-production-miami", priority: 0.85 },
  { path: "/services/webinar-clip-editing-service", priority: 0.85 },
  { path: "/services/social-media-video-batching-miami", priority: 0.85 },
  { path: "/services/interview-video-editing-service", priority: 0.85 },
  // 2026-10-06 niche batch: five buyers the site had no page for.
  { path: "/services/medical-practice-video-marketing-miami", priority: 0.85 },
  { path: "/services/content-creator-video-editing-miami", priority: 0.85 },
  { path: "/services/white-label-video-editing-for-agencies", priority: 0.85 },
  { path: "/services/salon-barbershop-video-marketing-miami", priority: 0.85 },
  { path: "/services/auto-detailing-tint-wrap-video-marketing-miami", priority: 0.85 },
  // 2026-10-11 niche wave 8 (owner-approved).
  { path: "/services/pre-construction-condo-video-marketing-miami", priority: 0.85 },
  { path: "/services/vacation-rental-video-marketing-fort-lauderdale", priority: 0.85 },
  { path: "/services/insurance-agency-video-marketing-miami", priority: 0.85 },
  { path: "/services/mortgage-broker-video-marketing-miami", priority: 0.85 },
  { path: "/services/immigration-attorney-video-marketing-miami", priority: 0.85 },
  { path: "/services/church-sermon-clip-editing-miami", priority: 0.85 },
  { path: "/services/personal-brand-video-editor-founders-miami", priority: 0.85 },
  { path: "/services/podcast-clipping-service-miami", priority: 0.85 },
  { path: "/services/quinceanera-video-miami", priority: 0.85 },
  { path: "/services/wedding-videographer-fort-lauderdale", priority: 0.85 },
  { path: "/services/dance-studio-music-school-video-marketing-miami", priority: 0.85 },
  { path: "/desk-recommendations", priority: 0.85 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/areas", priority: 0.85 },
  { path: "/areas/palm-beach-county", priority: 0.85 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  // 2026-10-10, owner decision (Esteban): the 26 pages that were indexable and
  // self-canonical but not advertised (SEO/GEO audit finding 8) join the
  // sitemap. See ownerOrderedAdditions in config/indexable-inventory-freeze.json.
  ...inventoryAdditions20261010,
  // 2026-10-14: the free Reels editing cost calculator, EN + ES (demand
  // evidence in config/indexable-inventory-freeze.json ownerOrderedAdditions).
  { path: "/reels-editing-cost-calculator", priority: 0.8 },
  { path: "/es/calculadora-de-costo-de-edicion-de-reels", priority: 0.8 },
  // Annual-events section (2026-10-10, owner-approved): hub + event pairs, EN and ES.
  ...eventSectionPaths().map((path) => ({ path, priority: 0.8 })),
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

function allSitemapEntries(): MetadataRoute.Sitemap {
  // lastModified is emitted ONLY where it can be dated honestly.
  //
  // History: every URL once carried one hardcoded date (2026-07-19), which
  // asserted that all 259 pages changed on one day. That was untrue the moment
  // anything shipped, so lastmod was removed (and then Google had no change
  // signal at all: 0 lastmod on 354 URLs, audit 2026-10-14).
  //
  // Now each route's date comes from the per-page ledger (config/page-lastmod.json
  // via lib/content-dates.ts -> lib/page-lastmod.ts): moved only when that
  // page's own sources change, checked by app/__tests__/page-lastmod.test.ts.
  // A path the ledger does not know gets NO lastmod, which means "unknown".
  const dated = <T extends { url: string }>(entry: T) => {
    const lastModified = contentDateFor(new URL(entry.url).pathname.replace(/\/$/, "") || "/");
    return lastModified ? { ...entry, lastModified } : entry;
  };
  const watchLocales: readonly PortfolioWatchLocale[] = ["en", "es"];
  const guideLocales: readonly GuideLocale[] = ["en", "es"];
  const caseStudyLocales: readonly CaseStudyLocale[] = ["en", "es"];

  const entries: MetadataRoute.Sitemap = [
    ...sitemapRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: "weekly" as const,
      priority: route.priority,
      alternates: sitemapAlternates(route.path),
    })),
    ...spanishRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "weekly" as const,
      priority: path === "/es" ? 0.95 : 0.75,
      alternates: sitemapAlternates(path),
    })),
    ...getPortfolioWatchItems().flatMap((item) =>
      watchLocales.map((locale) => ({
        url: absoluteUrl(getPortfolioWatchPath(item.id, locale)),
          changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: watchSitemapAlternates(item.id),
      })),
    ),
    ...caseStudyLocales.flatMap((locale) =>
      getCaseStudies(locale).map((study) => ({
        url: absoluteUrl(getCaseStudyPath(study)),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: sitemapAlternates(getCaseStudyPath(study)),
      })),
    ),
    ...guideLocales.map((locale) => {
      const path = locale === "es" ? "/es/guias" : "/guides";
      return {
        url: absoluteUrl(path),
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
          changeFrequency: "monthly" as const,
        priority: 0.65,
        alternates: guideSitemapAlternates(locale, guide.slug),
      })),
    ),
  ];
  return entries.map(dated);
}

/**
 * Merged and noindexed URLs from the 2026-08-12 cohort decisions must not be
 * advertised. A 301 source or a noindex page in a sitemap is a contradictory
 * signal, and leaving them listed is exactly what kept the inventory frozen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return allSitemapEntries()
    .filter((entry) => {
      const path = new URL(entry.url).pathname.replace(/\/$/, "") || "/";
      return !isConsolidatedPath(path);
    });
}
