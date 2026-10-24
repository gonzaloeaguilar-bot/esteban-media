import { describe, expect, it } from "vitest";

import robots from "../robots";
import { GET } from "../video-sitemap.xml/route";
import videoInventory from "@/config/video-sitemap-inventory.json";

import {
  getPortfolioWatchItems,
  getPortfolioWatchPath,
} from "@/lib/portfolio-watch";

describe("video sitemap", () => {
  it("returns standards-namespaced XML with one localized URL per video", async () => {
    const response = GET();
    const xml = await response.text();

    expect(response.headers.get("content-type")).toBe(
      "application/xml; charset=utf-8",
    );
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"',
    );
    const localizedVideoCount = getPortfolioWatchItems().filter(
      (item) => item.media.kind === "youtube",
    ).length * 2;
    expect(getPortfolioWatchItems().filter((item) => item.media.kind === "youtube").map((item) => item.id).sort()).toEqual(
      [...videoInventory.videoPortfolioIds].sort(),
    );
    const selfHosted = videoInventory.selfHostedVideoPages;
    const selfHostedVideos = selfHosted.reduce((sum, page) => sum + page.videos, 0);
    expect(xml.match(/<url>/g)).toHaveLength(localizedVideoCount + selfHosted.length);
    const localizedVideoEntries = getPortfolioWatchItems().filter((item) => item.media.kind === "youtube").reduce((total, item) => total + 1 + (item.companionVideos?.length ?? 0), 0) * 2;
    expect(xml.match(/<video:video>/g)).toHaveLength(localizedVideoEntries + selfHostedVideos);
    const actualUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
    const expectedUrls = [
      ...getPortfolioWatchItems().filter((item) => item.media.kind === "youtube").flatMap((item) =>
        [
          `https://estebanmorenomedia.com/portfolio/${item.id}`,
          `https://estebanmorenomedia.com/es/portafolio/${item.id}`,
        ],
      ),
      ...selfHosted.map((page) => `https://estebanmorenomedia.com${page.path}`),
    ].sort();
    expect(actualUrls).toEqual(expectedUrls);

    for (const item of getPortfolioWatchItems()) {
      if (item.media.kind !== "youtube") continue;
      expect(xml).toContain(
        `<loc>https://estebanmorenomedia.com${getPortfolioWatchPath(
          item.id,
          "en",
        )}</loc>`,
      );
      expect(xml).toContain(
        `<loc>https://estebanmorenomedia.com${getPortfolioWatchPath(
          item.id,
          "es",
        )}</loc>`,
      );
      expect(xml.match(new RegExp(item.media.videoId, "g"))).toHaveLength(2);
    }
  });

  it("uses local thumbnails, verified public metadata, and escaped copy", async () => {
    const xml = await GET().text();

    expect(xml).toContain(
      "<video:title>My D&apos;ler</video:title>",
    );
    expect(xml).toContain(
      "<video:thumbnail_loc>https://estebanmorenomedia.com/portfolio/my-dler.jpg</video:thumbnail_loc>",
    );
    expect(xml).toContain("<video:duration>11</video:duration>");
    expect(xml).toContain(
      "<video:publication_date>2024-01-23T14:21:54-08:00</video:publication_date>",
    );
    expect(xml).not.toMatch(/drive\.google\.com|googleusercontent\.com/i);
  });

  it("is advertised alongside the regular sitemap in robots metadata", () => {
    expect(robots().sitemap).toEqual([
      "https://estebanmorenomedia.com/sitemap.xml",
      "https://estebanmorenomedia.com/video-sitemap.xml",
    ]);
  });
});
