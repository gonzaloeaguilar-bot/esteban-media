import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { HomeProjectPath } from "@/components/home-project-path";
import { RealEstateBlock } from "@/components/real-estate-block";

const source = (path: string) => readFileSync(path, "utf8");

describe("homepage human pass", () => {
  it.each(["en", "es"] as const)("keeps the compact real-estate proof path in %s", (locale) => {
    const path = renderToStaticMarkup(React.createElement(HomeProjectPath, { locale }));
    const block = renderToStaticMarkup(React.createElement(RealEstateBlock, { locale }));
    expect(path).toContain('href="#real-estate-reels-heading"');
    expect(path).toContain("%2Fportfolio%2Fhomeowners.jpg");
    expect(block.match(/data-rail-card/g)?.length).toBe(3);
    expect(block).toContain(locale === "es" ? "Ver los 6 Reels de propiedades" : "Watch all 6 property Reels");
  });

  it("does not gate selected work behind the scroll reveal", () => {
    expect(source("components/portfolio-teaser.tsx")).not.toContain('className="em-on-dark em-cartel mt-8" data-em-reveal');
  });

  it("serves footer links inside native disclosures", () => {
    const footer = source("components/site-footer-client.tsx");
    expect(footer).toContain('<details className="em-footer-group">');
    expect(footer).toContain("<summary");
    expect(source("app/globals.css")).toContain(".em-footer-group > ul { display:block !important;");
  });

  it("keeps the opening short and the mobile navigation surfaces exclusive", () => {
    const intro = source("components/signal-intro.tsx");
    const nav = source("components/app-nav.tsx");
    expect(intro).toContain("runMs: 1400");
    expect(intro).toContain("setTimeout(lock, 1200)");
    expect(nav).toContain("dialog[open]");
    expect(nav).toContain("emMenuOpen");
  });
});
