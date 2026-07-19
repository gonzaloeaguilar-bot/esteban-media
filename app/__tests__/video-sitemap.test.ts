import { describe, expect, it } from "vitest";

import robots from "../robots";
import { GET } from "../video-sitemap.xml/route";

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
    expect(xml.match(/<url>/g)).toHaveLength(16);
    expect(xml.match(/<video:video>/g)).toHaveLength(16);

    for (const item of getPortfolioWatchItems()) {
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
