import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PortfolioTeaser } from "@/components/portfolio-teaser";

describe("PortfolioTeaser", () => {
  it.each(["en", "es"] as const)("omits Banacol and ML Colombia from the %s homepage rail", (locale) => {
    const html = renderToStaticMarkup(createElement(PortfolioTeaser, { locale }));

    expect(html).not.toContain('data-rail-card="banacol"');
    expect(html).not.toContain('data-rail-card="ml-colombia"');
  });
});
