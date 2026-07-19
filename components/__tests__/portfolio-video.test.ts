import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("PortfolioVideo", () => {
  it("renders a poster control without loading YouTube before interaction", () => {
    const source = readFileSync(
      join(process.cwd(), "components/portfolio-video.tsx"),
      "utf8",
    );
    const playerConditional = source.indexOf("{isPlaying ? (");
    const iframe = source.indexOf("<iframe", playerConditional);
    const conditionalClose = source.indexOf(") : null}", iframe);

    expect(playerConditional).toBeGreaterThan(-1);
    expect(iframe).toBeGreaterThan(playerConditional);
    expect(conditionalClose).toBeGreaterThan(iframe);
    expect(source).not.toContain('loading="lazy"');
    expect(source).toContain("&autoplay=1");
  });
});
