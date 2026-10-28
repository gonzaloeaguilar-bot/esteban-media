import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "app/illustrated-commercial.css"), "utf8");

describe("HomePathFunnel desktop geometry", () => {
  it("uses its own vertical-only animation and a centred, readable desktop sheet", () => {
    expect(css).toContain("animation:em-funnel-panel-up 220ms");
    expect(css).toContain("@keyframes em-funnel-panel-up{from{transform:translateY(16px);opacity:.6}to{transform:translateY(0);opacity:1}}");
    expect(css).toContain("width:min(680px,calc(100vw - 64px))");
    expect(css).toContain("max-height:min(760px,calc(100dvh - 64px))");
    expect(css).toContain(".em-funnel-scrim{align-items:center}");
  });

  it("keeps optional-service cards equal-height within a desktop grid row", () => {
    expect(css).toContain(".em-single-list{list-style:none;margin:0 0 14px;padding:0;display:grid;grid-template-columns:1fr;gap:10px;align-items:stretch}");
    expect(css).toContain(".em-single-item{height:100%;background:#fffaf3");
  });

  it("makes the Local businesses image cover the complete route-card surface", () => {
    expect(css).toContain(".em-route-card__visual--local-business{display:block;inset:0;width:100%;height:100%}");
    expect(css).toContain(".em-route-card__visual--local-business>img{width:100%;height:100%;object-fit:cover;object-position:center}");
  });
});
