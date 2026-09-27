import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { BRAND_MOMENT_BOOT_JS } from "@/vendor/web-kit/brand-moment/boot.generated";

const root = join(__dirname, "..", "..");

describe("web-kit brand moment", () => {
  it("compiles the vendored boot.js in byte for byte", () => {
    expect(BRAND_MOMENT_BOOT_JS).toBe(readFileSync(join(root, "vendor/web-kit/brand-moment/boot.js"), "utf8"));
  });

  it("never reads a file at runtime from the site chrome", () => {
    // Pages rendered on request run without vendor/ on disk: a read there is a
    // 500 on /es/contacto and every other dynamic route (2026-09-27).
    const chrome = readFileSync(join(root, "components/site-chrome.tsx"), "utf8");
    expect(chrome).not.toMatch(/readFileSync|node:fs/);
  });
});
