import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/youtube-facade.tsx"), "utf8");

describe("YouTubeFacade exit path", () => {
  it("keeps an explicit close control and Escape-key exit after loading YouTube", () => {
    expect(source).toContain('aria-label={closeLabel}');
    expect(source).toContain('onClick={closePlayer}');
    expect(source).toContain('if (event.key === "Escape")');
    expect(source).toContain('document.addEventListener("keydown", onKey)');
    expect(source).toContain('document.removeEventListener("keydown", onKey)');
    expect(source).toContain('playButtonRef.current?.focus()');
  });
});
