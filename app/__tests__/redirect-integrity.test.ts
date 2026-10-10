import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "@/app/sitemap";

/**
 * Redirect integrity for the redirects this site actually ships.
 *
 * Sources of truth (read directly from disk rather than importing next.config,
 * which would execute the whole config module):
 *   1. The inline `redirects()` pairs in next.config.ts.
 *   2. `merges` in config/cohort-consolidation.json — the ones next.config
 *      spreads into that same array (currently empty, kept so a future merge is
 *      checked automatically).
 *
 * A redirect breaks SEO in three quiet ways this suite refuses to allow:
 *   (a) a location that redirects to itself (infinite loop / wasted hop),
 *   (b) a chain where the destination is itself a redirect source (an extra
 *       hop Google may treat as a soft 404 instead of following),
 *   (c) a destination that is not a real route — a redirect must land on a page
 *       that exists (a real page directory under app/, accounting for route
 *       groups and dynamic segments) or on a URL the sitemap advertises.
 *
 * `deferredMerges` (also in cohort-consolidation.json) are deliberately NOT
 * forced through check (c): by design their targets may not exist yet. They are
 * still checked for (a) and (b) so a future promotion cannot introduce a loop
 * or a chain.
 */
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const nextConfigPath = path.join(repoRoot, "next.config.ts");
const cohortPath = path.join(repoRoot, "config", "cohort-consolidation.json");
const appDir = path.join(repoRoot, "app");

type Redirect = { source: string; destination: string; origin: string };

function normalize(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/)[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

function readInlineRedirects(): Redirect[] {
  const source = fs.readFileSync(nextConfigPath, "utf8");
  const pairs: Redirect[] = [];
  const pattern =
    /source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    pairs.push({ source: match[1], destination: match[2], origin: "next.config.ts" });
  }
  return pairs;
}

function readCohortRedirects(): { active: Redirect[]; deferred: Redirect[] } {
  const data = JSON.parse(fs.readFileSync(cohortPath, "utf8")) as {
    merges?: { from: string; to: string }[];
    deferredMerges?: { from: string; to: string }[];
  };
  const toRedirect = (origin: string) => (entry: { from: string; to: string }): Redirect => ({
    source: entry.from,
    destination: entry.to,
    origin,
  });
  return {
    active: (data.merges ?? []).map(toRedirect("cohort-consolidation.json#merges")),
    deferred: (data.deferredMerges ?? []).map(
      toRedirect("cohort-consolidation.json#deferredMerges"),
    ),
  };
}

/** Every page route the app can serve, as segment patterns (route groups dropped). */
function collectAppRoutePatterns(): string[][] {
  const patterns: string[][] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) continue;
      const relative = path.relative(appDir, dir);
      const segments =
        relative === ""
          ? []
          : relative
              .split(path.sep)
              .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")))
              .map((segment) => {
                if (/^\[\[?\.\.\..+\]\]?$/.test(segment)) return "**";
                if (segment.startsWith("[") && segment.endsWith("]")) return "*";
                return segment;
              });
      patterns.push(segments);
    }
  };
  walk(appDir);
  return patterns;
}

function segmentsMatch(pathSegments: string[], pattern: string[]): boolean {
  for (let i = 0; i < pattern.length; i += 1) {
    const segment = pattern[i];
    if (segment === "**") return pathSegments.length >= i;
    if (i >= pathSegments.length) return false;
    if (segment !== "*" && segment !== pathSegments[i]) return false;
  }
  return pattern.length === pathSegments.length;
}

const appRoutePatterns = collectAppRoutePatterns();
const sitemapRoutePaths = new Set(sitemapRoutes.map((route) => normalize(route.path)));
const inlineRedirects = readInlineRedirects();
const cohort = readCohortRedirects();

const activeRedirects = [...inlineRedirects, ...cohort.active];
const allRedirects = [...activeRedirects, ...cohort.deferred];

function isPlausibleDestination(destination: string): boolean {
  const target = normalize(destination);
  if (sitemapRoutePaths.has(target)) return true;
  const pathSegments = target.split("/").filter(Boolean);
  return appRoutePatterns.some((pattern) => segmentsMatch(pathSegments, pattern));
}

describe("redirect integrity", () => {
  it("has redirects to check (guards against a silently empty parser)", () => {
    expect(inlineRedirects.length).toBeGreaterThan(0);
  });

  it("never redirects a path to itself", () => {
    const selfLoops = allRedirects
      .filter((redirect) => normalize(redirect.source) === normalize(redirect.destination))
      .map((redirect) => `${redirect.source} -> ${redirect.destination} (${redirect.origin})`);
    expect(selfLoops, selfLoops.join("\n")).toEqual([]);
  });

  it("never chains one redirect into another", () => {
    const sources = new Set(allRedirects.map((redirect) => normalize(redirect.source)));
    const chains = allRedirects
      .filter((redirect) => sources.has(normalize(redirect.destination)))
      .map(
        (redirect) =>
          `${redirect.source} -> ${redirect.destination} where ${redirect.destination} is itself a source (${redirect.origin})`,
      );
    expect(chains, chains.join("\n")).toEqual([]);
  });

  it("points every active redirect at a real route", () => {
    const implausible = activeRedirects
      .filter((redirect) => !isPlausibleDestination(redirect.destination))
      .map(
        (redirect) =>
          `${redirect.source} -> ${redirect.destination} does not resolve to a page under app/ or appear in sitemapRoutes (${redirect.origin})`,
      );
    expect(implausible, implausible.join("\n")).toEqual([]);
  });
});
