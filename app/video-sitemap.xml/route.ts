import { absoluteUrl } from "@/lib/site";
import {
  getPortfolioWatchCopy,
  getPortfolioWatchItems,
  getPortfolioWatchPath,
  isoDurationToSeconds,
  type PortfolioWatchLocale,
} from "@/lib/portfolio-watch";

export const dynamic = "force-static";

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

function buildVideoSitemapXml() {
  const urls = locales.flatMap((locale) =>
    getPortfolioWatchItems().map((item) => {
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

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildVideoSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
