import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const cinema = readFileSync(join(process.cwd(), "app/cinema.css"), "utf8");

describe("desktop hero composition", () => {
  it("aims the tall on-location frame at Esteban instead of the empty sky", () => {
    const desktop = cinema.slice(
      cinema.indexOf("@media (min-width: 1024px)"),
      cinema.indexOf("/* Reduced motion", cinema.indexOf("@media (min-width: 1024px)")),
    );

    expect(desktop).toContain("object-position: 50% 60%;");
    expect(desktop).not.toContain("object-position: 50% 38%;");
  });
});
