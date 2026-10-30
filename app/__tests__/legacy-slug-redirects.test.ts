import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Guards the 2026-10-10 fix for production 404s.
 *
 * GA4 showed steady `/not-found` traffic (10 views/28d, third-equal page) whose
 * referrers were the site's own pages. The missing requests were bare slugs that
 * never had a route — Spanish-first visitors and AI/external links use the
 * un-prefixed Spanish slug (`/precios`, `/contacto`, `/servicios` …) and the
 * agency winner page is linked without its `/services/` segment. Each 404'd
 * while its canonical twin served 200.
 *
 * This test reads next.config.ts off disk (same approach as redirect-integrity)
 * and asserts every known bare slug 301s to the real page, in both slash forms.
 */
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const nextConfigPath = path.join(repoRoot, "next.config.ts");

const EXPECTED: Record<string, string> = {
  "/precios": "/es/precios",
  "/contacto": "/es/contacto",
  "/servicios": "/es/servicios",
  "/portafolio": "/es/portafolio",
  "/guias": "/es/guias",
  "/calculadora": "/es/calculadora",
  "/evaluacion": "/es/evaluacion",
  "/sobre-esteban": "/es/sobre-esteban",
  "/videografo-en-miami": "/es/videografo-en-miami",
  "/white-label-video-editing-for-agencies": "/services/white-label-video-editing-for-agencies",
  "/es/servicios/edicion-de-video-para-reels": "/es/editor-de-reels-fort-lauderdale",
  "/servicios/edicion-de-video-para-reels": "/es/editor-de-reels-fort-lauderdale",
};

function readRedirects(): Map<string, string> {
  const source = fs.readFileSync(nextConfigPath, "utf8");
  const pairs = new Map<string, string>();
  const pattern = /source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    pairs.set(match[1], match[2]);
  }
  return pairs;
}

const redirects = readRedirects();

describe("legacy bare-slug redirects (production 404 fix)", () => {
  it("301s every bare slug to its live canonical page", () => {
    const missing = Object.entries(EXPECTED)
      .filter(([from, to]) => redirects.get(from) !== to)
      .map(([from, to]) => `${from} -> ${to} (found: ${redirects.get(from) ?? "none"})`);
    expect(missing, missing.join("\n")).toEqual([]);
  });

  it("also covers the trailing-slash form of every bare slug", () => {
    const missing = Object.entries(EXPECTED)
      .filter(([from, to]) => redirects.get(`${from}/`) !== to)
      .map(([from, to]) => `${from}/ -> ${to} (found: ${redirects.get(`${from}/`) ?? "none"})`);
    expect(missing, missing.join("\n")).toEqual([]);
  });
});
