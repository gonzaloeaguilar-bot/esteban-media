import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/reel-funnel.tsx"), "utf8");

describe("ReelFunnel exit path", () => {
  it("keeps one explicit close control and an Escape-key exit for every rail consumer", () => {
    expect(source).toContain('aria-label={t.close}');
    expect(source).toContain('onClick={onClose}');
    expect(source).toContain('if (event.key === "Escape") onClose()');
    expect(source).toContain('document.addEventListener("keydown", onKey)');
    expect(source).toContain('document.removeEventListener("keydown", onKey)');
  });
});
