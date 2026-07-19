import { describe, expect, it } from "vitest";

import {
  socialImageAlt,
  socialImageSize,
} from "../../lib/social-image";

describe("branded Open Graph image", () => {
  it("publishes the social-card dimensions and accessible description", () => {
    expect(socialImageSize).toEqual({ width: 1200, height: 630 });
    expect(socialImageAlt).toContain("Esteban Moreno Media");
    expect(socialImageAlt).toContain("South Florida");
  });
});
