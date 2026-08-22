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

describe("moonlighting public identity firewall", () => {
  it("keeps the behind-the-scenes operator out of public source and asset names", () => {
    const violations: string[] = [];

    for (const surface of publicSurfaceRoots) {
      for (const file of publicFiles(join(root, surface))) {
        const haystack = `${relative(root, file)}\n${readFileSync(file, "utf8")}`.toLowerCase();
        for (const token of prohibitedTokens) {
          if (haystack.includes(token)) violations.push(`${relative(root, file)}:${token}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
