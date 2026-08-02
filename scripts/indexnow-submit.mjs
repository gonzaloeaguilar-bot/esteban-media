#!/usr/bin/env node
// IndexNow discovery submission for estebanmorenomedia.com.
//
// Pulls the canonical URL list from the live sitemap.xml (single source of
// truth — no route-logic duplication) and submits it to the IndexNow API,
// which fans out to Bing, Yandex, Seznam, and other participating engines.
//
// Usage:
//   node scripts/indexnow-submit.mjs dry-run   # default — prints what would be sent, no network POST
//   node scripts/indexnow-submit.mjs run       # actually submits to IndexNow
//   node scripts/indexnow-submit.mjs status    # verifies the hosted key file is reachable
//
// The IndexNow key is PUBLIC by design (it is hosted at the key-location URL so
// the engines can verify ownership). It is NOT a secret.

const HOST = "estebanmorenomedia.com";
const KEY = "7935c8701eedf6b0bee7ab5ba869ec41";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Parse <loc> entries out of a sitemap.xml body. Exported for unit testing.
export function parseSitemapLocations(xml) {
  const urls = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    urls.push(decodeXmlEntities(match[1].trim()));
  }
  // De-dupe while preserving order.
  return [...new Set(urls)];
}

function decodeXmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchSitemapUrls() {
  const response = await fetch(SITEMAP_URL, {
    headers: { "User-Agent": "esteban-media-indexnow/1.0" },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`sitemap fetch failed: HTTP ${response.status}`);
  }
  const xml = await response.text();
  const urls = parseSitemapLocations(xml);
  // Defensive: only submit URLs on our own host (IndexNow rejects mixed hosts).
  const onHost = urls.filter((url) => {
    try {
      return new URL(url).host === HOST;
    } catch {
      return false;
    }
  });
  if (onHost.length === 0) {
    throw new Error("no on-host URLs parsed from sitemap");
  }
  return onHost;
}

async function verifyKeyFile() {
  const response = await fetch(KEY_LOCATION, {
    headers: { "User-Agent": "esteban-media-indexnow/1.0" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`key file not reachable: HTTP ${response.status}`);
  }
  const body = (await response.text()).trim();
  if (body !== KEY) {
    throw new Error(`key file content mismatch at ${KEY_LOCATION}`);
  }
  return true;
}

async function submit(urls) {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "esteban-media-indexnow/1.0",
    },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  // IndexNow returns 200 (accepted) or 202 (accepted, pending). Anything else is a failure.
  const ok = response.status === 200 || response.status === 202;
  return { ok, status: response.status, body: await response.text().catch(() => "") };
}

async function main() {
  const mode = process.argv[2] || "dry-run";

  if (mode === "status") {
    await verifyKeyFile();
    console.log(`✅ IndexNow key file reachable and correct: ${KEY_LOCATION}`);
    return;
  }

  const urls = await fetchSitemapUrls();
  console.log(`IndexNow: ${urls.length} URLs from ${SITEMAP_URL}`);

  if (mode === "dry-run") {
    console.log(`[dry-run] would POST ${urls.length} URLs to ${INDEXNOW_ENDPOINT}`);
    console.log(`[dry-run] keyLocation: ${KEY_LOCATION}`);
    urls.slice(0, 10).forEach((url) => console.log(`  - ${url}`));
    if (urls.length > 10) console.log(`  ... and ${urls.length - 10} more`);
    console.log("[dry-run] no network submission made. Re-run with 'run' to submit.");
    return;
  }

  if (mode === "run") {
    await verifyKeyFile();
    const result = await submit(urls);
    if (!result.ok) {
      throw new Error(`IndexNow submission failed: HTTP ${result.status} ${result.body}`);
    }
    console.log(`✅ IndexNow accepted ${urls.length} URLs (HTTP ${result.status}).`);
    return;
  }

  throw new Error(`unknown mode "${mode}" (expected dry-run | run | status)`);
}

// Only run when invoked directly, so the parser can be imported in tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  });
}
