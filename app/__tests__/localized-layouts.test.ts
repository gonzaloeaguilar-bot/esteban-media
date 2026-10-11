import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("localized root layouts", () => {
  it("server-renders the correct document language for each route group", () => {
    expect(source("app/(english)/layout.tsx")).toMatch(/<html lang="en-US"[\s>]/);
    expect(source("app/(spanish)/layout.tsx")).toMatch(/<html lang="es"[\s>]/);
    expect(source("components/site-header-client.tsx")).not.toContain(
      "document.documentElement.lang",
    );
    expect(source("app/global-not-found.tsx")).toMatch(/<html lang="en-US"[\s>]/);
    expect(source("next.config.ts")).toContain("globalNotFound: true");
    expect(source("components/spanish-niche-page.tsx")).toContain(
      "buildSpanishNicheMetadata",
    );
  });
});
