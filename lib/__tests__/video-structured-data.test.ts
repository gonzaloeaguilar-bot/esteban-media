// VideoObject validation for every video the site plays.
//
// Checks the structured data against the files that actually ship and against
// Google's video requirements (required: name, thumbnailUrl, uploadDate;
// recommended: description, duration, contentUrl or embedUrl), with no
// network and no ffprobe: the MP4 duration is read from the file's own `mvhd`
// box and the poster size from the JPEG frame header. If a reel is re-encoded
// or replaced, the schema has to change with it or this test fails.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { RealEstateReels } from "@/components/real-estate-reels";
import { buildPortfolioWatchSchema } from "@/lib/portfolio-schema";
import {
  getPortfolioWatchCopy,
  getPortfolioWatchItems,
  getPortfolioWatchPath,
  isoDurationToSeconds,
} from "@/lib/portfolio-watch";
import {
  REAL_ESTATE_REELS,
  REAL_ESTATE_REELS_PUBLISHED,
  buildRealEstateReelsJsonLd,
  realEstateReelsPath,
} from "@/lib/real-estate-reels";
import { siteUrl } from "@/lib/site";
import { buildVideoSitemapXml } from "@/lib/video-sitemap";

const PUBLIC = join(process.cwd(), "public");
const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
const ISO_DURATION = /^PT(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?$/;

/** Seconds from the MP4 movie header (`mvhd`), version 0 or 1. */
function mp4DurationSeconds(file: string): number {
  const buf = readFileSync(file);
  const at = buf.indexOf("mvhd");
  if (at < 0) throw new Error(`${file}: no mvhd box`);
  const body = at + 4;
  const version = buf[body];
  if (version === 1) {
    const timescale = buf.readUInt32BE(body + 4 + 16);
    const duration = Number(buf.readBigUInt64BE(body + 4 + 16 + 4));
    return duration / timescale;
  }
  const timescale = buf.readUInt32BE(body + 4 + 8);
  const duration = buf.readUInt32BE(body + 4 + 8 + 4);
  return duration / timescale;
}

/** Width and height from the first JPEG start-of-frame marker. */
function jpegSize(file: string): { width: number; height: number } {
  const buf = readFileSync(file);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error(`${file}: bad JPEG marker at ${i}`);
    const marker = buf[i + 1];
    const length = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + length;
  }
  throw new Error(`${file}: no SOF marker`);
}

function isSiteUrl(value: unknown): boolean {
  return typeof value === "string" && value.startsWith(`${siteUrl}/`);
}

function durationSeconds(iso: string): number {
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/);
  if (!m) return Number.NaN;
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

describe("self-hosted reels: the schema matches the files that ship", () => {
  it.each(REAL_ESTATE_REELS.map((reel) => [reel.id, reel] as const))(
    "%s: mp4 and poster exist, duration and size are measured",
    (_id, reel) => {
      const video = join(PUBLIC, reel.src);
      const poster = join(PUBLIC, reel.poster);
      expect(existsSync(video)).toBe(true);
      expect(existsSync(poster)).toBe(true);
      expect(Math.abs(mp4DurationSeconds(video) - reel.durationSeconds)).toBeLessThanOrEqual(0.6);
      expect(jpegSize(poster)).toEqual({ width: reel.width, height: reel.height });
    },
  );

  it("carries the git date the files were first published, with a timezone", () => {
    expect(REAL_ESTATE_REELS_PUBLISHED).toMatch(ISO_DATETIME);
    expect(Number.isNaN(Date.parse(REAL_ESTATE_REELS_PUBLISHED))).toBe(false);
  });

  it.each(["en", "es"] as const)("%s JSON-LD has every Google field, valid", (locale) => {
    const jsonLd = buildRealEstateReelsJsonLd(locale);
    expect(jsonLd["@context"]).toBe("https://schema.org");
    const graph = jsonLd["@graph"];
    expect(graph).toHaveLength(REAL_ESTATE_REELS.length);
    graph.forEach((node, index) => {
      const reel = REAL_ESTATE_REELS[index];
      expect(node["@type"]).toBe("VideoObject");
      expect(node.name.length).toBeGreaterThan(0);
      expect(node.description.length).toBeGreaterThan(0);
      expect(node.thumbnailUrl.every(isSiteUrl)).toBe(true);
      expect(node.uploadDate).toBe(REAL_ESTATE_REELS_PUBLISHED);
      expect(node.duration).toMatch(ISO_DURATION);
      expect(durationSeconds(node.duration)).toBe(
        Math.round(mp4DurationSeconds(join(PUBLIC, reel.src))),
      );
      expect(isSiteUrl(node.contentUrl)).toBe(true);
      expect(node.contentUrl.endsWith(reel.src)).toBe(true);
    });
  });

  it.each(["en", "es"] as const)("%s: every JSON-LD name is visible text on the shelf", (locale) => {
    const html = renderToStaticMarkup(createElement(RealEstateReels, { locale }));
    expect(html).toContain('type="application/ld+json"');
    const visible = html.replace(/<script\b[\s\S]*?<\/script>/g, "");
    for (const node of buildRealEstateReelsJsonLd(locale)["@graph"]) {
      expect(visible).toContain(node.name.replaceAll("&", "&amp;"));
    }
  });
});

describe("YouTube portfolio videos", () => {
  const youtube = getPortfolioWatchItems().filter((item) => item.media.kind === "youtube");

  it("has videos to validate", () => {
    expect(youtube.length).toBeGreaterThan(0);
  });

  it.each(youtube.map((item) => [item.id, item] as const))("%s VideoObject is valid", (_id, item) => {
    if (item.media.kind !== "youtube") throw new Error("unreachable");
    const copy = getPortfolioWatchCopy(item, "en");
    const schema = buildPortfolioWatchSchema({
      path: getPortfolioWatchPath(item.id, "en"),
      locale: "en-US",
      title: copy.title,
      summary: copy.summary,
      credits: copy.credits,
      url: item.media.url,
      poster: item.media.poster,
      video: {
        videoId: item.media.videoId,
        uploadDate: item.media.uploadDate,
        duration: item.media.duration,
      },
      breadcrumbs: [{ name: "Home", path: "/" }],
    });
    const video = schema["@graph"].find((node) => node["@type"] === "VideoObject") as
      | Record<string, string>
      | undefined;
    expect(video).toBeDefined();
    expect(video!.name).toBe(copy.title);
    expect(video!.description).toBe(copy.summary);
    expect(isSiteUrl(video!.thumbnailUrl)).toBe(true);
    expect(existsSync(join(PUBLIC, item.media.poster))).toBe(true);
    expect(video!.uploadDate).toMatch(ISO_DATETIME);
    expect(video!.duration).toMatch(ISO_DURATION);
    expect(video!.embedUrl).toBe(`https://www.youtube-nocookie.com/embed/${item.media.videoId}`);
  });
});

describe("video sitemap agrees with the JSON-LD", () => {
  const xml = buildVideoSitemapXml();
  const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const unescape = (value: string) =>
    value
      .replaceAll("&apos;", "'")
      .replaceAll("&quot;", '"')
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&amp;", "&");

  it("lists every YouTube page in both languages plus one page per language for the reels", () => {
    const youtubeCount = getPortfolioWatchItems().filter((item) => item.media.kind === "youtube").length;
    expect(blocks).toHaveLength(youtubeCount * 2 + 2);
  });

  it.each(["en", "es"] as const)("%s reels page: titles, files, dates and durations match", (locale) => {
    const loc = `${siteUrl}${realEstateReelsPath(locale)}`;
    const block = blocks.find((b) => b.includes(`<loc>${loc}</loc>`));
    expect(block).toBeDefined();
    const titles = [...block!.matchAll(/<video:title>([^<]+)<\/video:title>/g)].map((m) => unescape(m[1]));
    const names = buildRealEstateReelsJsonLd(locale)["@graph"].map((node) => node.name);
    expect([...titles].sort()).toEqual([...names].sort());
    for (const reel of REAL_ESTATE_REELS) {
      expect(block).toContain(`<video:content_loc>${siteUrl}${reel.src}</video:content_loc>`);
      expect(block).toContain(`<video:thumbnail_loc>${siteUrl}${reel.poster}</video:thumbnail_loc>`);
      expect(block).toContain(`<video:duration>${Math.round(reel.durationSeconds)}</video:duration>`);
    }
    expect(block!.match(/<video:publication_date>/g)).toHaveLength(REAL_ESTATE_REELS.length);
    expect(block).toContain(
      `<video:publication_date>${REAL_ESTATE_REELS_PUBLISHED}</video:publication_date>`,
    );
  });

  it("every duration is whole seconds within Google's 1-28800 range", () => {
    const durations = [...xml.matchAll(/<video:duration>([^<]+)<\/video:duration>/g)].map((m) => m[1]);
    expect(durations.length).toBeGreaterThan(0);
    for (const d of durations) {
      expect(d).toMatch(/^\d+$/);
      expect(Number(d)).toBeGreaterThanOrEqual(1);
      expect(Number(d)).toBeLessThanOrEqual(28800);
    }
    for (const item of getPortfolioWatchItems()) {
      if (item.media.kind !== "youtube") continue;
      expect(xml).toContain(`<video:duration>${isoDurationToSeconds(item.media.duration)}</video:duration>`);
    }
  });
});
