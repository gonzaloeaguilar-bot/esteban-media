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
    expect(css).toContain("grid-template-rows: minmax(0, min(760px, calc(100dvh - 56px)))");
    expect(css).toContain(".em-funnel__media:not(.em-funnel__media--landscape)");
    expect(css).toContain("justify-self: center");
    expect(css).toContain(".em-funnel__panel--landscape");
    expect(css).toContain("height: min(42dvh, 420px)");
    expect(css).toContain(".em-funnel__video {");
    expect(css).toContain("iframe.em-funnel__video { border: 0; }");
    expect(source).toContain('aspect?: "landscape"');
    expect(source).toContain('em-funnel__media--landscape');
    expect(source).toContain('em-funnel__panel--landscape');
    expect(source).toContain('askRef.current?.scrollTo({ top: 0, behavior: "smooth" })');
    expect(css).toContain("aspect-ratio: 16 / 9");
    expect(css).toContain("object-fit: contain");
    expect(css).toContain(".em-funnel__ask {");
    expect(css).toContain("overflow: auto");
  });

  it("captures the reel request before offering booking or WhatsApp", () => {
    expect(source).toContain('source: "reel-funnel"');
    expect(source).toContain('fetch("/api/lead"');
    expect(source).toContain('setStep("saved")');
    expect(source).toContain('href={site.booking}');
    expect(source).toContain('data-cta="reel_funnel_whatsapp"');
    expect(source).not.toContain('reel_funnel_${need.id}_whatsapp');
  });
});
