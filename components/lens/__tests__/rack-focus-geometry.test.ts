import { describe, expect, it } from "vitest";

import { holePath } from "@/components/lens/rack-focus-stage";

/**
 * The aperture is the page. These lock the two properties that have already
 * broken once each and that a render test cannot see.
 */
describe("rack focus aperture geometry", () => {
  it("opens: the hole is strictly larger at every step", () => {
    // Measure the RADIUS, not the horizontal span. The hole rotates as it
    // opens, so its x-extent is not monotonic even while it is strictly
    // growing — the first version of this test failed on a correct aperture.
    const radius = (open: number) => {
      const [x, y] = holePath(open)
        .slice(2)
        .split(" ", 2)
        .map(Number);
      return Math.hypot(x - 160, y - 160);
    };
    const steps = [0, 0.25, 0.5, 0.75, 1].map(radius);
    for (let i = 1; i < steps.length; i += 1) {
      expect(steps[i]).toBeGreaterThan(steps[i - 1]);
    }
  });

  it("bows the blade edges inward, not outward", () => {
    // Sweep flag 0 renders the opening as a shield instead of an aperture. It
    // shipped that way once and the lens stopped reading as a lens.
    expect(holePath(1)).toContain(" 0 0 1 ");
    expect(holePath(1)).not.toContain(" 0 0 0 ");
  });

  it("closes to a near-point rather than to nothing", () => {
    // A zero-radius hole collapses the clip path and the frame vanishes with no
    // error anywhere.
    expect(holePath(0)).toMatch(/\d/);
    expect(holePath(0).length).toBeGreaterThan(40);
  });
});
