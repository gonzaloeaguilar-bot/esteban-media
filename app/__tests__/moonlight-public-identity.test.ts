import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();
const publicSurfaceRoots = ["app", "components", "lib", "messages", "public"];
const textExtensions = new Set([".css", ".csv", ".html", ".json", ".md", ".svg", ".ts", ".tsx", ".txt"]);
const prohibitedTokens = [
  "gon" + "zalo",
  "agui" + "lar",
  "gon" + "zalo.tech",
  "gon" + "zalotech",
];

function publicFiles(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(path, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__") return [];
      return publicFiles(absolute);
    }
    return textExtensions.has(extname(entry.name).toLowerCase()) ? [absolute] : [];
  });
}

/**
 * EXEMPTION — added 2026-09-16 by explicit owner decision (Gonzalo), after the
 * risk was put to him directly and he chose this option.
 *
 * The affiliate desk-recommendations page monetises with Gonzalo's Amazon
 * Associates tag (gonzalotech-20) and credits him in its disclosure, so it
 * necessarily contains the tokens this firewall blocks everywhere else.
 *
 * This is a NARROW path exemption, not a weakening of the rule: every other
 * file under app/, components/, lib/, messages/ and public/ is still scanned.
 * Do not widen this list without another explicit owner decision — the rule
 * exists because a public link between the operator's consulting identity and
 * a client site is the exact association his employer flagged.
 */
const exemptPaths = ["app/(english)/desk-recommendations/page.tsx"];

describe("moonlighting public identity firewall", () => {
  it("keeps the behind-the-scenes operator out of public source and asset names", () => {
    const violations: string[] = [];

    for (const surface of publicSurfaceRoots) {
      for (const file of publicFiles(join(root, surface))) {
        if (exemptPaths.includes(relative(root, file))) continue;
        const haystack = `${relative(root, file)}\n${readFileSync(file, "utf8")}`.toLowerCase();
        for (const token of prohibitedTokens) {
          if (haystack.includes(token)) violations.push(`${relative(root, file)}:${token}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
