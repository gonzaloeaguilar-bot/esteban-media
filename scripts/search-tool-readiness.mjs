#!/usr/bin/env node

// Read-only readiness check for the free Bing Webmaster Tools and Ahrefs
// Webmaster Tools UI/export workflows. This checks owned technical surfaces;
// it does not create accounts, submit URLs, or claim an external profile.

import { parseSitemapLocations } from "./indexnow-submit.mjs";

export const CANONICAL_ORIGIN = "https://estebanmorenomedia.com";
export const INDEXNOW_KEY = "7935c8701eedf6b0bee7ab5ba869ec41";
export const REQUIRED_SITEMAPS = ["/sitemap.xml", "/video-sitemap.xml"];

function normalizeOrigin(value) {
  const url = new URL(value);
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`base URL must use HTTP or HTTPS: ${value}`);
  }
  return url.origin;
}

export function robotsSitemaps(body) {
  return [...body.matchAll(/^\s*sitemap:\s*(\S+)\s*$/gim)].map((match) => match[1]);
}

export function evaluateResponses(origin, responses) {
  const expectedSitemaps = REQUIRED_SITEMAPS.map((path) => new URL(path, origin).href);
  const checks = [];
  const add = (name, ok, details) => checks.push({ name, ok, ...details });

  const robots = responses.robots;
  const robotsBody = robots.body || "";
  const advertised = robotsSitemaps(robotsBody);
  add("robots", robots.status === 200 && /^\s*user-agent:\s*\*\s*$/im.test(robotsBody) && /^\s*allow:\s*\/\s*$/im.test(robotsBody), {
    url: new URL("/robots.txt", origin).href,
    status: robots.status,
    detail: "must allow the public site for the wildcard crawler group",
  });
  add("robots-sitemaps", expectedSitemaps.every((url) => advertised.includes(url)), {
    url: new URL("/robots.txt", origin).href,
    advertised,
    expected: expectedSitemaps,
    detail: "must advertise both normal and video sitemaps",
  });

  const regular = responses.sitemap;
  const regularUrls = parseSitemapLocations(regular.body || "");
  add("sitemap", regular.status === 200 && regularUrls.length > 0 && regularUrls.every((url) => new URL(url).origin === origin), {
    url: new URL("/sitemap.xml", origin).href,
    status: regular.status,
    urlCount: regularUrls.length,
    detail: "must contain at least one canonical on-origin URL",
  });

  const video = responses.videoSitemap;
  add("video-sitemap", video.status === 200 && /<urlset\b/i.test(video.body || "") && /xmlns:video=/i.test(video.body || ""), {
    url: new URL("/video-sitemap.xml", origin).href,
    status: video.status,
    detail: "must be a Video Sitemap XML document",
  });

  const key = responses.indexNowKey;
  add("indexnow-key", key.status === 200 && (key.body || "").trim() === INDEXNOW_KEY, {
    url: new URL(`/${INDEXNOW_KEY}.txt`, origin).href,
    status: key.status,
    detail: "must expose the public IndexNow ownership key",
  });

  return {
    schema: "esteban-media.search-tool-readiness.v1",
    origin,
    overall: checks.every((check) => check.ok) ? "PASS" : "DEGRADED",
    checks,
  };
}

async function get(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "esteban-media-search-tool-readiness/1.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    return { status: response.status, body: await response.text() };
  } catch (error) {
    return { status: null, body: "", error: error instanceof Error ? error.message : String(error) };
  }
}

export async function checkReadiness(baseUrl = CANONICAL_ORIGIN) {
  const origin = normalizeOrigin(baseUrl);
  const [robots, sitemap, videoSitemap, indexNowKey] = await Promise.all([
    get(new URL("/robots.txt", origin)),
    get(new URL("/sitemap.xml", origin)),
    get(new URL("/video-sitemap.xml", origin)),
    get(new URL(`/${INDEXNOW_KEY}.txt`, origin)),
  ]);
  return {
    checkedAt: new Date().toISOString(),
    ...evaluateResponses(origin, { robots, sitemap, videoSitemap, indexNowKey }),
  };
}

async function main() {
  const json = process.argv.includes("--json");
  const input = process.argv.find((arg) => /^https?:\/\//.test(arg));
  const report = await checkReadiness(input || process.env.SITE_BASE_URL || CANONICAL_ORIGIN);
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`Search-tool readiness: ${report.overall} (${report.origin})`);
    for (const check of report.checks) {
      console.log(`${check.ok ? "PASS" : "FAIL"} ${check.name}: ${check.detail}`);
    }
  }
  if (report.overall !== "PASS") process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`search-tool readiness failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}
