import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("localized root layouts", () => {
  it("server-renders the correct document language for each route group", () => {
    expect(source("app/(english)/layout.tsx")).toContain(
      '<html lang="en-US">',
    );
    expect(source("app/(spanish)/layout.tsx")).toContain('<html lang="es">');
    expect(source("components/site-header-client.tsx")).not.toContain(
      "document.documentElement.lang",
    );
    expect(source("app/global-not-found.tsx")).toContain('<html lang="en-US">');
    expect(source("next.config.ts")).toContain("globalNotFound: true");
    expect(source("components/spanish-niche-page.tsx")).toContain(
      "buildSpanishNicheMetadata",
    );
  });
});
