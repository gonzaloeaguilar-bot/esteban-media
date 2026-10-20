#!/usr/bin/env node
/**
 * Synthetic crawler availability monitor.
 *
 * This checks that the production homepage returns indexable HTML to the
 * declared crawler user agents. It deliberately does not claim to prove how a
 * request from an engine's verified IP range will be treated; a spoofed user
 * agent cannot establish that. Its job is to catch a regression in the raw
 * HTML boundary that would make the site unavailable to a JavaScript-free
 * fetcher.
 *
 * Usage: node scripts/crawler-availability.mjs [origin] [--json]
 */

export const DEFAULT_ORIGIN = "https://estebanmorenomedia.com";
export const CRAWLERS = [
  ["Googlebot", "Googlebot"],
  ["GPTBot", "GPTBot"],
  ["ClaudeBot", "ClaudeBot"],
  ["PerplexityBot", "PerplexityBot"],
];

export function normalizeOrigin(value) {
  const url = new URL(value);
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`origin must use HTTP or HTTPS: ${value}`);
  }
  return url.origin;
}

export function evaluateResponse({ name, userAgent, response, html, origin }) {
  const errors = [];
  const contentType = response.headers.get("content-type") || "";
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  if (!contentType.toLowerCase().includes("text/html")) {
    errors.push(`content type ${contentType || "missing"}`);
  }
  const canonicalTag = html.match(/<link\b(?=[^>]*\brel="canonical")[^>]*>/i)?.[0];
  const canonicalHref = canonicalTag?.match(/\bhref="([^"]+)"/i)?.[1];
  if (!canonicalHref || new URL(canonicalHref, origin).toString() !== new URL("/", origin).toString()) {
    errors.push("missing canonical homepage link");
  }
  if (!/<h1\b/i.test(html)) errors.push("missing raw HTML h1");

  return {
    name,
    userAgent,
    status: response.status,
    contentType,
    ok: errors.length === 0,
    errors,
  };
}

export async function probeCrawlers(origin = DEFAULT_ORIGIN, request = fetch) {
  const normalizedOrigin = normalizeOrigin(origin);
  return Promise.all(
    CRAWLERS.map(async ([name, userAgent]) => {
      try {
        const response = await request(`${normalizedOrigin}/`, {
          headers: { "user-agent": userAgent },
          redirect: "follow",
          signal: AbortSignal.timeout(10_000),
        });
        const html = await response.text();
        return evaluateResponse({ name, userAgent, response, html, origin: normalizedOrigin });
      } catch (error) {
        return {
          name,
          userAgent,
          status: null,
          contentType: "",
          ok: false,
          errors: [String(error)],
        };
      }
    }),
  );
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const origin = args.find((arg) => !arg.startsWith("--")) || DEFAULT_ORIGIN;
  const probes = await probeCrawlers(origin);
  const report = {
    origin: normalizeOrigin(origin),
    scope: "synthetic user-agent availability only; verified crawler-IP treatment remains unmeasured",
    probes,
  };
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const probe of probes) {
      console.log(`${probe.ok ? "PASS" : "FAIL"} ${probe.name} HTTP ${probe.status ?? "unavailable"} ${probe.contentType || "no-content-type"}`);
      for (const error of probe.errors) console.log(`  - ${error}`);
    }
  }
  if (probes.some((probe) => !probe.ok)) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(`Crawler availability monitor failed: ${error.message || error}`);
    process.exitCode = 1;
  });
}
