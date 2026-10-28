import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/reel-funnel.tsx"), "utf8");
const css = readFileSync(join(process.cwd(), "app/cinema.css"), "utf8");

describe("ReelFunnel exit path", () => {
  it("keeps one explicit close control and an Escape-key exit for every rail consumer", () => {
    expect(source).toContain('aria-label={t.close}');
    expect(source).toContain('onClick={onClose}');
    expect(source).toContain('if (event.key === "Escape") onClose()');
    expect(source).toContain('document.addEventListener("keydown", onKey)');
    expect(source).toContain('document.removeEventListener("keydown", onKey)');
  });

  it("uses a horizontal two-column composition for the desktop takeover without changing phone layout", () => {
    expect(css).toContain("@media (min-width: 1024px) {");
    expect(css).toContain("grid-template-columns: minmax(0, 1.35fr) minmax(340px, .85fr)");
    expect(css).toContain(".em-funnel__video {");
    expect(css).toContain("object-fit: contain");
    expect(css).toContain(".em-funnel__ask {");
    expect(css).toContain("overflow: auto");
  });
});
