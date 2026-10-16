import { describe, expect, it } from "vitest";

import { evaluateResponses } from "./search-tool-readiness.mjs";

const origin = "https://estebanmorenomedia.com";
const valid = {
  robots: {
    status: 200,
    body: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\nSitemap: ${origin}/video-sitemap.xml\n`,
  },
  sitemap: {
    status: 200,
    body: `<urlset><url><loc>${origin}/</loc></url><url><loc>${origin}/services</loc></url></urlset>`,
  },
  videoSitemap: {
    status: 200,
    body: '<urlset xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"></urlset>',
  },
  indexNowKey: { status: 200, body: "7935c8701eedf6b0bee7ab5ba869ec41\n" },
};

describe("search-tool readiness", () => {
  it("passes the Bing/Ahrefs owned-surface contract", () => {
    expect(evaluateResponses(origin, valid).overall).toBe("PASS");
  });

  it("fails when robots stops advertising the video sitemap", () => {
    const report = evaluateResponses(origin, {
      ...valid,
      robots: { ...valid.robots, body: `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` },
    });
    expect(report.overall).toBe("DEGRADED");
    expect(report.checks.find((check) => check.name === "robots-sitemaps")?.ok).toBe(false);
  });

  it("fails when the public IndexNow key differs", () => {
    const report = evaluateResponses(origin, {
      ...valid,
      indexNowKey: { status: 200, body: "different-key" },
    });
    expect(report.checks.find((check) => check.name === "indexnow-key")?.ok).toBe(false);
  });
});
