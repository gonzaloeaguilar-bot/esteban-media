#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import {
  verifyApprovedSitemap,
  verifyLocalizedPairs,
} from "./verify-technical-seo-inventory.mjs";

const canonicalOrigin = "https://estebanmorenomedia.com";
const baseUrl = normalizeOrigin(
  process.argv[2] || process.env.SITE_BASE_URL || canonicalOrigin,
);
const measurementId = "G-W9CM4CE2MQ";
const htmlCache = new Map();

function normalizeOrigin(value) {
  const url = new URL(value);
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`SITE_BASE_URL must use HTTP or HTTPS: ${value}`);
  }
  return url.origin;
}

async function fetchResponse(pathname) {
  return fetch(new URL(pathname, baseUrl), {
    headers: { "User-Agent": "esteban-media-technical-seo-verifier/1.0" },
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });
}

async function fetchOk(pathname) {
  const response = await fetchResponse(pathname);
  if (!response.ok) {
    throw new Error(`${pathname} returned HTTP ${response.status}`);
  }
  return response;
}

async function fetchHtml(pathname) {
  if (!htmlCache.has(pathname)) {
    htmlCache.set(
      pathname,
      (async () => {
        const response = await fetchResponse(pathname);
        return {
          status: response.status,
          html: await response.text(),
        };
      })(),
    );
  }
  return htmlCache.get(pathname);
}

function requireMatch(html, pattern, label, pathname) {
  const match = html.match(pattern);
  if (!match) {
    throw new Error(`${pathname} is missing ${label}`);
  }
  return match[1];
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'");
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\s+[^>]*>`, "gi"))].map(
    (match) => match[0],
  );
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return match ? decodeXml(match[1]) : undefined;
}

function taggedValue(html, tagName, key, value, result, pathname) {
  const tag = tags(html, tagName).find(
    (candidate) => attribute(candidate, key) === value,
  );
  const resolved = tag ? attribute(tag, result) : undefined;
  if (!resolved) {
    throw new Error(`${pathname} is missing ${tagName}[${key}=${value}] ${result}`);
  }
  return resolved;
}

function metaContent(html, key, value, pathname) {
  return taggedValue(html, "meta", key, value, "content", pathname);
}

function linkHref(html, rel, pathname) {
  return taggedValue(html, "link", "rel", rel, "href", pathname);
}

function languageLinks(html) {
  return Object.fromEntries(
    tags(html, "link")
      .filter((tag) => attribute(tag, "rel") === "alternate")
      .map((tag) => [attribute(tag, "hreflang"), attribute(tag, "href")])
      .filter(([language, href]) => language && href),
  );
}

function pngDimensions(buffer) {
  const bytes = new Uint8Array(buffer);
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!signature.every((byte, index) => bytes[index] === byte)) {
    throw new Error("/social-card did not return a PNG file");
  }
  const view = new DataView(buffer);
  return {
    width: view.getUint32(16),
    height: view.getUint32(20),
  };
}

function normalizedEmbeddedSource(html) {
  return html.replaceAll("&quot;", '"').replace(/\\+"/g, '"');
}

function visibleText(html) {
  return decodeXml(
    html
      .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  );
}

function requireStructuredType(html, type, pathname) {
  const structuredDataBlocks = [
    ...html.matchAll(
      /<script\b(?=[^>]*\btype="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => normalizedEmbeddedSource(match[1]));
  const hasType = (value) => {
    if (!value || typeof value !== "object") return false;
    const declared = value["@type"];
    if (declared === type || (Array.isArray(declared) && declared.includes(type))) return true;
    return Object.values(value).some((child) =>
      Array.isArray(child) ? child.some(hasType) : hasType(child),
    );
  };
  if (!structuredDataBlocks.some((block) => hasType(JSON.parse(block)))) {
    throw new Error(`${pathname} is missing ${type} structured data`);
  }
}

async function verifyPage(pathname, expectedAlternates = null) {
  const { status, html } = await fetchHtml(pathname);
  if (status !== 200) {
    throw new Error(`${pathname} returned HTTP ${status}`);
  }

  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const expectedLanguage = isSpanish ? "es" : "en-US";
  const expectedAlternateLanguage = isSpanish ? "es-US" : "en-US";
  const language = requireMatch(
    html,
    /<html[^>]*\blang="([^"]+)"/i,
    "document language",
    pathname,
  );
  if (language !== expectedLanguage) {
    throw new Error(
      `${pathname} has lang=${language}; expected ${expectedLanguage}`,
    );
  }

  const title = decodeXml(
    requireMatch(html, /<title>([^<]+)<\/title>/i, "title", pathname),
  );
  if (!title.trim()) {
    throw new Error(`${pathname} has an empty title`);
  }

  const description = metaContent(html, "name", "description", pathname);
  if (!description.trim()) {
    throw new Error(`${pathname} has an empty description`);
  }

  const canonical = new URL(linkHref(html, "canonical", pathname)).toString();
  const expectedCanonical = new URL(pathname, canonicalOrigin).toString();
  if (canonical !== expectedCanonical) {
    throw new Error(
      `${pathname} canonical is ${canonical}; expected ${expectedCanonical}`,
    );
  }

  const socialFields = {
    "og:url": new URL(
      metaContent(html, "property", "og:url", pathname),
    ).toString(),
    "og:title": metaContent(html, "property", "og:title", pathname),
    "og:description": metaContent(
      html,
      "property",
      "og:description",
      pathname,
    ),
    "twitter:title": metaContent(html, "name", "twitter:title", pathname),
    "twitter:description": metaContent(
      html,
      "name",
      "twitter:description",
      pathname,
    ),
  };
  if (socialFields["og:url"] !== canonical) {
    throw new Error(`${pathname} og:url is ${socialFields["og:url"]}; expected ${canonical}`);
  }
  for (const field of ["og:title", "og:description", "twitter:title", "twitter:description"]) {
    if (!socialFields[field].trim()) {
      throw new Error(`${pathname} ${field} is empty`);
    }
  }

  const ogImage = metaContent(html, "property", "og:image", pathname);
  const twitterImage = metaContent(html, "name", "twitter:image", pathname);
  for (const [field, imageUrl] of Object.entries({ ogImage, twitterImage })) {
    if (!/^https?:\/\//.test(imageUrl)) {
      throw new Error(`${pathname} ${field} is not absolute: ${imageUrl}`);
    }
  }

  const loader = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  if (!html.includes(loader)) {
    throw new Error(`${pathname} is missing GA4 loader ${loader}`);
  }
  const normalizedScriptSource = normalizedEmbeddedSource(html);
  if (
    !new RegExp(
      `(?:window\\.)?gtag\\(['\"]config['\"]\\s*,\\s*${JSON.stringify(measurementId)}`,
    ).test(normalizedScriptSource) ||
    !normalizedScriptSource.includes(
      `window.location.hostname !== ${JSON.stringify(new URL(canonicalOrigin).hostname)}`,
    ) ||
    !normalizedScriptSource.includes("send_page_view: false") ||
    !normalizedScriptSource.includes(
      "page_location: canonicalOrigin + safePagePath(window.location.pathname)",
    ) ||
    !normalizedScriptSource.includes("page_referrer: currentPageReferrer")
  ) {
    throw new Error(
      `${pathname} is missing the production-scoped, query-safe GA4 config`,
    );
  }

  const alternates = Object.fromEntries(
    Object.entries(languageLinks(html)).map(([language, href]) => [
      language,
      new URL(href).toString(),
    ]),
  );
  if (Object.keys(alternates).length > 0 && alternates[expectedAlternateLanguage] !== canonical) {
    throw new Error(
      `${pathname} ${expectedAlternateLanguage} alternate is ${alternates[expectedAlternateLanguage]}; expected ${canonical}`,
    );
  }
  if (expectedAlternates !== null) {
    for (const locale of Object.keys(expectedAlternates)) {
      if (alternates[locale] !== expectedAlternates[locale]) {
        throw new Error(
          `${pathname} ${locale} alternate differs from /sitemap.xml: ${alternates[locale]} versus ${expectedAlternates[locale]}`,
        );
      }
    }
  }

  return {
    pathname,
    canonical,
    alternates,
    language,
    titleLength: title.length,
    descriptionLength: description.length,
  };
}

function verifyReciprocalAlternates(pages) {
  const byCanonical = new Map(pages.map((page) => [page.canonical, page]));
  for (const page of pages) {
    for (const href of Object.values(page.alternates)) {
      const target = byCanonical.get(href);
      if (target && !Object.values(target.alternates).includes(page.canonical)) {
        throw new Error(
          `${page.pathname} alternate ${href} does not link back to ${page.canonical}`,
        );
      }
    }
  }
}

async function verifyPrivacyPage(pathname) {
  const page = await verifyPage(pathname);
  const { html } = await fetchHtml(pathname);
  for (const required of [
    "Google Analytics 4",
    "https://policies.google.com/technologies/partner-sites",
    "https://tools.google.com/dlpage/gaoptout",
  ]) {
    if (!html.includes(required)) {
      throw new Error(`${pathname} privacy notice is missing ${required}`);
    }
  }
  const robots = metaContent(html, "name", "robots", pathname);
  if (!robots.includes("noindex") || !robots.includes("follow")) {
    throw new Error(`${pathname} must publish noindex, follow`);
  }
  return page;
}

async function verifyNotFound(pathname, expectedLanguage, expectedCopy) {
  const { status, html } = await fetchHtml(pathname);
  if (status !== 404) {
    throw new Error(`${pathname} returned HTTP ${status}; expected 404`);
  }
  const language = requireMatch(
    html,
    /<html[^>]*\blang="([^"]+)"/i,
    "document language",
    pathname,
  );
  if (language !== expectedLanguage || !html.includes(expectedCopy)) {
    throw new Error(`${pathname} did not render the localized 404 experience`);
  }
  if (!html.includes("noindex")) {
    throw new Error(`${pathname} 404 is missing noindex`);
  }
}

try {
  const sitemapXml = await (await fetchOk("/sitemap.xml")).text();
  const sitemapEntries = [...sitemapXml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)]
    .map((match) => match[1]);
  const canonicalUrls = sitemapEntries.map((entry) => decodeXml(
    requireMatch(entry, /<loc>([^<]+)<\/loc>/i, "page location", "/sitemap.xml"),
  ));
  const sitemapAlternates = new Map(sitemapEntries.map((entry, index) => [
    new URL(canonicalUrls[index]).pathname,
    Object.fromEntries(tags(entry, "xhtml:link").map((tag) => [
      attribute(tag, "hreflang"),
      new URL(attribute(tag, "href")).toString(),
    ])),
  ]));
  const approvedInventory = JSON.parse(
    await readFile(new URL("../config/indexable-inventory-freeze.json", import.meta.url), "utf8"),
  );
  const uniquePathnames = verifyApprovedSitemap(canonicalUrls, approvedInventory, canonicalOrigin);

  const pages = await Promise.all(uniquePathnames.map((pathname) =>
    verifyPage(pathname, sitemapAlternates.get(pathname)),
  ));
  verifyReciprocalAlternates(pages);

  const sitemapPathSet = new Set(uniquePathnames);
  const watchUrls = canonicalUrls.filter((url) => {
    const pathname = new URL(url).pathname;
    return (
      /^\/portfolio\/[^/]+$/.test(pathname) ||
      /^\/es\/portafolio\/[^/]+$/.test(pathname)
    );
  });
  const watchPathnames = watchUrls.map((url) => new URL(url).pathname);
  verifyLocalizedPairs(watchPathnames, "/portfolio/", "/es/portafolio/", "watch inventory");

  const robotsText = await (await fetchOk("/robots.txt")).text();
  for (const sitemapUrl of [
    `${canonicalOrigin}/sitemap.xml`,
    `${canonicalOrigin}/video-sitemap.xml`,
  ]) {
    if (!robotsText.split(/\r?\n/).includes(`Sitemap: ${sitemapUrl}`)) {
      throw new Error(`/robots.txt does not advertise ${sitemapUrl}`);
    }
  }

  const videoSitemapResponse = await fetchOk("/video-sitemap.xml");
  if (
    !videoSitemapResponse.headers
      .get("content-type")
      ?.toLowerCase()
      .includes("xml")
  ) {
    throw new Error("/video-sitemap.xml content type is not XML");
  }
  const videoSitemapXml = await videoSitemapResponse.text();
  const videoEntries = [
    ...videoSitemapXml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi),
  ].map((match) => match[1]);
  const videoUrls = videoEntries.map((entry, index) => {
    if (!/<video:video\b/i.test(entry)) {
      throw new Error(
        `/video-sitemap.xml entry ${index + 1} is missing video metadata`,
      );
    }
    const location = requireMatch(
      entry,
      /<loc>([^<]+)<\/loc>/i,
      "page location",
      "/video-sitemap.xml",
    );
    return new URL(decodeXml(location)).toString();
  });
  const videoInventory = JSON.parse(
    await readFile(new URL("../config/video-sitemap-inventory.json", import.meta.url), "utf8"),
  );
  // Self-hosted reels live on service pages, not portfolio watch pages: check
  // them on their own (listed in config, sitemapped, and one VideoObject per
  // <video:video> in the served HTML), then verify the YouTube set as before.
  const selfHostedPaths = new Set(
    (videoInventory.selfHostedVideoPages ?? []).map((page) => page.path),
  );
  for (const page of videoInventory.selfHostedVideoPages ?? []) {
    const index = videoUrls.findIndex((url) => new URL(url).pathname === page.path);
    if (index === -1) {
      throw new Error(`/video-sitemap.xml is missing self-hosted video page ${page.path}`);
    }
    const declared = (videoEntries[index].match(/<video:video\b/gi) ?? []).length;
    const contentLocs = (videoEntries[index].match(/<video:content_loc>/gi) ?? []).length;
    if (declared !== page.videos || contentLocs !== page.videos) {
      throw new Error(`${page.path}: expected ${page.videos} self-hosted videos in /video-sitemap.xml, got ${declared}`);
    }
    if (!sitemapPathSet.has(page.path)) {
      throw new Error(`${page.path} is in /video-sitemap.xml but not in /sitemap.xml`);
    }
    const { html } = await fetchHtml(page.path);
    const videoObjects = (html.match(/"@type":"VideoObject"/g) ?? []).length;
    if (videoObjects !== page.videos) {
      throw new Error(`${page.path}: ${videoObjects} VideoObject nodes in the served HTML, expected ${page.videos}`);
    }
  }
  const watchVideoUrls = videoUrls.filter((url) => !selfHostedPaths.has(new URL(url).pathname));
  const videoUrlSet = new Set(watchVideoUrls);
  const watchUrlSet = new Set(watchUrls.map((url) => new URL(url).toString()));
  const videoPathnames = watchVideoUrls.map((url) => new URL(url).pathname);
  verifyLocalizedPairs(videoPathnames, "/portfolio/", "/es/portafolio/", "video inventory");
  const expectedVideoUrls = new Set(videoInventory.videoPortfolioIds.flatMap((id) => [
    `${canonicalOrigin}/portfolio/${id}`,
    `${canonicalOrigin}/es/portafolio/${id}`,
  ]));
  if (
    videoUrlSet.size !== watchVideoUrls.length ||
    [...videoUrlSet].some((url) => !watchUrlSet.has(url)) ||
    watchVideoUrls.some((url) => !sitemapPathSet.has(new URL(url).pathname)) ||
    videoUrlSet.size !== expectedVideoUrls.size ||
    [...expectedVideoUrls].some((url) => !videoUrlSet.has(url))
  ) {
    throw new Error(
      "/video-sitemap.xml does not exactly match rendered YouTube portfolio pages in /sitemap.xml",
    );
  }

  await Promise.all(
    videoPathnames.map(async (pathname) => {
      const { html } = await fetchHtml(pathname);
      if (
        !/<iframe\b[^>]*\bsrc="https:\/\/www\.youtube-nocookie\.com\/embed\//i.test(
          html,
        )
      ) {
        throw new Error(`${pathname} is missing its rendered YouTube iframe`);
      }
      requireStructuredType(html, "VideoObject", pathname);
      requireStructuredType(html, "BreadcrumbList", pathname);
    }),
  );

  for (const pathname of ["/portfolio", "/es/portafolio"]) {
    const { html } = await fetchHtml(pathname);
    if (/<iframe\b[^>]*(?:youtube\.com|youtube-nocookie\.com|youtu\.be)/i.test(html)) {
      throw new Error(`${pathname} eagerly renders a YouTube iframe`);
    }
  }

  const guidePathnames = uniquePathnames.filter(
    (pathname) =>
      pathname === "/guides" ||
      pathname.startsWith("/guides/") ||
      pathname === "/es/guias" ||
      pathname.startsWith("/es/guias/"),
  );
  verifyLocalizedPairs(guidePathnames, "/guides", "/es/guias", "guide inventory");
  for (const pathname of [...watchPathnames, ...guidePathnames]) {
    const alternates = sitemapAlternates.get(pathname);
    for (const locale of ["en-US", "es-US", "x-default"]) {
      if (!alternates?.[locale] || !canonicalUrls.includes(alternates[locale])) {
        throw new Error(`${pathname} has no approved ${locale} alternate in /sitemap.xml`);
      }
    }
  }
  await Promise.all(
    guidePathnames.map(async (pathname) => {
      const { html } = await fetchHtml(pathname);
      requireStructuredType(html, "BreadcrumbList", pathname);
    }),
  );

  const englishHome = (await fetchHtml("/")).html;
  const spanishHome = (await fetchHtml("/es")).html;
  for (const [pathname, html, service] of [
    ["/", englishHome, /video editing/i],
    ["/es", spanishHome, /edición de video/i],
  ]) {
    const text = visibleText(html);
    const brandPosition = text.indexOf("Esteban Moreno Media");
    const firstScreenAnswer = text.slice(brandPosition, brandPosition + 500);
    if (brandPosition < 0 || !service.test(firstScreenAnswer) || !firstScreenAnswer.includes("Fort Lauderdale")) {
      throw new Error(`${pathname} is missing the visible brand, service, or location near the first screen`);
    }
    requireStructuredType(html, "LocalBusiness", pathname);
  }

  const privacyPages = await Promise.all([
    verifyPrivacyPage("/privacy"),
    verifyPrivacyPage("/es/privacidad"),
  ]);
  await Promise.all([
    verifyNotFound("/definitely-missing", "en-US", "Page not found"),
    verifyNotFound(
      "/es/definitely-missing",
      "en-US",
      "Página no encontrada",
    ),
    verifyNotFound(
      "/es/definitely/missing",
      "en-US",
      "Página no encontrada",
    ),
  ]);

  const socialCard = await fetchOk("/social-card");
  if (socialCard.headers.get("content-type") !== "image/png") {
    throw new Error(
      `/social-card has content-type ${socialCard.headers.get("content-type")}; expected image/png`,
    );
  }
  const dimensions = pngDimensions(await socialCard.arrayBuffer());
  if (dimensions.width !== 1200 || dimensions.height !== 630) {
    throw new Error(
      `/social-card is ${dimensions.width}x${dimensions.height}; expected 1200x630`,
    );
  }

  console.log(
    JSON.stringify(
      {
        baseUrl,
        indexablePages: pages.length,
        videoSitemapPages: videoUrlSet.size,
        guidePages: guidePathnames.length,
        privacyPages: privacyPages.length,
        verifiedNotFoundRoutes: 3,
        languages: {
          "en-US": pages.filter((page) => page.language === "en-US").length,
          es: pages.filter((page) => page.language === "es").length,
        },
        maximumTitleLength: Math.max(...pages.map((page) => page.titleLength)),
        maximumDescriptionLength: Math.max(
          ...pages.map((page) => page.descriptionLength),
        ),
        measurementId,
        socialCard: dimensions,
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.error(`Technical SEO verification failed: ${error.message || error}`);
  process.exit(1);
}
