import { absoluteUrl } from "@/lib/site";
import {
  getPortfolioWatchCopy,
  getPortfolioWatchItems,
  getPortfolioWatchPath,
  isoDurationToSeconds,
  type PortfolioWatchLocale,
} from "@/lib/portfolio-watch";
import {
  REAL_ESTATE_REELS_PUBLISHED,
  REELS_IN_DISPLAY_ORDER,
  realEstateReelsPath,
} from "@/lib/real-estate-reels";

/**
 * The video sitemap (served at /video-sitemap.xml, listed in robots.txt).
 *
 * Two kinds of video live on the site:
 *  - YouTube portfolio pieces, one per watch page (/portfolio/[id] and
 *    /es/portafolio/[id]), played through the youtube-nocookie embed;
 *  - six self-hosted real-estate reels, shown together on the real-estate
 *    reels service page in each language.
 *
 * Every field reads the same record the page and its VideoObject JSON-LD read
 * (lib/portfolio.ts, lib/real-estate-reels.ts), so the sitemap cannot describe
 * a video differently from the page it points at.
 */

const locales: readonly PortfolioWatchLocale[] = ["en", "es"];

function escapeXml(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function youtubeEntries(): string[] {
  return locales.flatMap((locale) =>
    getPortfolioWatchItems()
      .filter((item) => item.media.kind === "youtube")
      .map((item) => {
        if (item.media.kind !== "youtube") return "";
        const copy = getPortfolioWatchCopy(item, locale);
        const pageUrl = absoluteUrl(getPortfolioWatchPath(item.id, locale));
        const playerUrl = `https://www.youtube-nocookie.com/embed/${item.media.videoId}`;

        return [
          "  <url>",
          `    <loc>${escapeXml(pageUrl)}</loc>`,
          "    <video:video>",
          `      <video:thumbnail_loc>${escapeXml(absoluteUrl(item.media.poster))}</video:thumbnail_loc>`,
          `      <video:title>${escapeXml(copy.title)}</video:title>`,
          `      <video:description>${escapeXml(copy.summary)}</video:description>`,
          `      <video:player_loc allow_embed="yes">${escapeXml(playerUrl)}</video:player_loc>`,
          `      <video:duration>${isoDurationToSeconds(item.media.duration)}</video:duration>`,
          `      <video:publication_date>${escapeXml(item.media.uploadDate)}</video:publication_date>`,
          "    </video:video>",
          "  </url>",
        ].join("\n");
      }),
  );
}

/** One <url> per language: the reels service page, carrying all six reels. */
function realEstateReelEntries(): string[] {
  return locales.map((locale) => {
    const isEs = locale === "es";
    const videos = REELS_IN_DISPLAY_ORDER.map((reel) =>
      [
        "    <video:video>",
        `      <video:thumbnail_loc>${escapeXml(absoluteUrl(reel.poster))}</video:thumbnail_loc>`,
        `      <video:title>${escapeXml(isEs ? reel.titleEs : reel.title)}</video:title>`,
        `      <video:description>${escapeXml(isEs ? reel.captionEs : reel.caption)}</video:description>`,
        `      <video:content_loc>${escapeXml(absoluteUrl(reel.src))}</video:content_loc>`,
        `      <video:duration>${Math.round(reel.durationSeconds)}</video:duration>`,
        `      <video:publication_date>${escapeXml(REAL_ESTATE_REELS_PUBLISHED)}</video:publication_date>`,
        "      <video:family_friendly>yes</video:family_friendly>",
        "    </video:video>",
      ].join("\n"),
    );
    return [
      "  <url>",
      `    <loc>${escapeXml(absoluteUrl(realEstateReelsPath(locale)))}</loc>`,
      ...videos,
      "  </url>",
    ].join("\n");
  });
}

export function buildVideoSitemapXml(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
    ...youtubeEntries(),
    ...realEstateReelEntries(),
    "</urlset>",
    "",
  ].join("\n");
}
