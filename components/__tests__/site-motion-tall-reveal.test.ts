import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/site-motion.tsx"), "utf8");

describe("auto reveal on tall sections", () => {
  it("observes targets taller than the viewport at the first visible pixel", () => {
    // Production 2026-10-29: /es/portafolio's 16,708px grid section never reached a
    // 5% threshold on a phone, so everything below the featured project stayed hidden.
    expect(source).toContain("threshold: 0 }");
    expect(source).toMatch(/getBoundingClientRect\(\)\.height > window\.innerHeight \? tallObserver : observer/);
    expect(source).toContain("tallObserver?.disconnect()");
  });
});
