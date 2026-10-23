import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import EcommerceProductVideoEditorMiamiPage from "../(english)/services/ecommerce-product-video-editor-miami/page";
import ProductPhotographyMiamiPage from "../(english)/services/product-photography-miami/page";
import FotografiaDeProductoMiamiPage from "../(spanish)/es/fotografia-de-producto-miami/page";
import { getSpanishNichePage } from "@/lib/spanish-site";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("ecommerce portfolio proof", () => {
  it("connects ecommerce video editing to the correct published portfolio work", () => {
    const markup = renderToStaticMarkup(React.createElement(EcommerceProductVideoEditorMiamiPage));
    expect(markup).toContain('href="/portfolio/my-dler"');
    expect(markup).toContain("product-visual and motion package");
    expect(markup).toContain('href="/portfolio/bar-door-monkey"');
    expect(markup).toContain("not a claim that either project was an Amazon or Shopify listing campaign");
  });

  it("does not turn digital product visuals into a physical-product photography claim", () => {
    const markup = renderToStaticMarkup(React.createElement(ProductPhotographyMiamiPage));
    expect(markup).toContain("My D&#x27;ler");
    expect(markup).toContain("not represented as physical product photography");
    expect(markup).not.toContain("rush 24-hour turnaround");
    expect(markup).not.toContain("100% pure white isolation");
  });

  it("keeps the Spanish ecommerce proof specific to the published work", () => {
    const markup = renderToStaticMarkup(React.createElement(FotografiaDeProductoMiamiPage));
    const ecommercePage = getSpanishNichePage("editor-de-video-de-productos-para-ecommerce");
    expect(markup).toContain('href="/es/portafolio/my-dler"');
    expect(markup).toContain("no se presenta como una sesión de fotografía de producto físico");
    expect(ecommercePage?.description).not.toContain("Amazon");
    expect(ecommercePage?.description).not.toContain("Shopify");
  });
});
