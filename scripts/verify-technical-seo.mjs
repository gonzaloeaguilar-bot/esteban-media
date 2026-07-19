#!/usr/bin/env node

const baseUrl = normalizeOrigin(
  process.argv[2] || process.env.SITE_BASE_URL || "http://localhost:3000",
);
const canonicalOrigin = "https://estebanmorenomedia.com";
const measurementId = "G-W9CM4CE2MQ";
const expectedIndexablePages = 20;
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

async function verifyPage(pathname) {
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
  if (title.length > 60) {
    throw new Error(`${pathname} title is ${title.length} characters: ${title}`);
  }

  const description = metaContent(html, "name", "description", pathname);
  if (description.length > 160) {
    throw new Error(
      `${pathname} description is ${description.length} characters`,
    );
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
  const expectedSocialFields = {
    "og:url": canonical,
    "og:title": title,
    "og:description": description,
    "twitter:title": title,
    "twitter:description": description,
  };
  for (const [field, expected] of Object.entries(expectedSocialFields)) {
    if (socialFields[field] !== expected) {
      throw new Error(
        `${pathname} ${field} is ${JSON.stringify(socialFields[field])}; expected ${JSON.stringify(expected)}`,
      );
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
  const normalizedScriptSource = html.replace(/\\+"/g, '"');
  if (
    !normalizedScriptSource.includes(
      `gtag('config', ${JSON.stringify(measurementId)}`,
    ) ||
    !normalizedScriptSource.includes(
      `window.location.hostname === ${JSON.stringify(new URL(canonicalOrigin).hostname)}`,
    )
  ) {
    throw new Error(`${pathname} is missing the production-scoped GA4 config`);
  }

  const alternates = Object.fromEntries(
    Object.entries(languageLinks(html)).map(([language, href]) => [
      language,
      new URL(href).toString(),
    ]),
  );
  if (alternates[expectedAlternateLanguage] !== canonical) {
    throw new Error(
      `${pathname} ${expectedAlternateLanguage} alternate is ${alternates[expectedAlternateLanguage]}; expected ${canonical}`,
    );
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
  const canonicalUrls = [
    ...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((match) => decodeXml(match[1]));
  const pathnames = canonicalUrls.map((url) => new URL(url).pathname);
  const uniquePathnames = [...new Set(pathnames)];

  if (uniquePathnames.length !== expectedIndexablePages) {
    throw new Error(
      `sitemap has ${uniquePathnames.length} unique pages; expected ${expectedIndexablePages}`,
    );
  }

  const pages = await Promise.all(uniquePathnames.map(verifyPage));
  verifyReciprocalAlternates(pages);

  const englishHome = (await fetchHtml("/")).html;
  const spanishHome = (await fetchHtml("/es")).html;
  if (
    !englishHome.includes(
      "Esteban Moreno Media provides video editing, AI-assisted content, and social planning from Fort Lauderdale",
    )
  ) {
    throw new Error("/ is missing the direct entity/service/location sentence");
  }
  if (
    !spanishHome.includes(
      "Esteban Moreno Media ofrece edición de video, contenido con IA y planificación para redes desde Fort Lauderdale",
    )
  ) {
    throw new Error("/es is missing the direct entity/service/location sentence");
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
