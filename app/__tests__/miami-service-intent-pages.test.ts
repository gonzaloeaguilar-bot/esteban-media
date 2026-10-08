import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import sitemap from "../sitemap";
import BrandVideoProductionPage, {
  metadata as brandVideoMetadata,
} from "../(english)/services/brand-video-production-miami/page";
import BusinessVideoProductionPage, {
  metadata as businessVideoMetadata,
} from "../(english)/services/corporate-video-production-brickell/page";
import EventCoveragePage, {
  metadata as eventCoverageMetadata,
} from "../(english)/services/corporate-event-videographer-miami/page";
import BrandPhotographyPage, {
  metadata as brandPhotographyMetadata,
} from "../(english)/services/headshot-photographer-miami/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

const urls = sitemap().map((entry) => new URL(entry.url).pathname);

describe("Miami service-intent page strengthening", () => {
  it("keeps the strengthened priority pages in the frozen sitemap inventory once", () => {
    expect(sitemap()).toHaveLength(243);
    expect(urls.filter((path) => path === "/services/headshot-photographer-miami")).toHaveLength(1);
    expect(urls.filter((path) => path === "/services/corporate-event-videographer-miami")).toHaveLength(1);
    expect(urls.filter((path) => path === "/services/corporate-video-production-brickell")).toHaveLength(1);
    expect(urls.filter((path) => path === "/services/brand-video-production-miami")).toHaveLength(1);
  });

  it("targets Miami brand photographer intent without inventing package claims", () => {
    expect(brandPhotographyMetadata.title).toBe(
      "Miami Brand Photographer | Headshots & Portraits",
    );
    expect(brandPhotographyMetadata.description).toContain(
      "Miami brand photographer",
    );

    const markup = renderToStaticMarkup(React.createElement(BrandPhotographyPage));
    expect(markup).toContain("Miami Brand Photographer");
    expect(markup).toContain("scoped around your real use case");
    expect(markup).toContain("before any date is reserved");
    expect(markup).not.toContain("package");
  });

  it("targets Miami event photographer intent with a scoped coverage path", () => {
    expect(eventCoverageMetadata.title).toBe(
      "Miami Event Photographer & Videographer",
    );
    expect(eventCoverageMetadata.description).toContain(
      "Miami event photographer and videographer",
    );

    const markup = renderToStaticMarkup(React.createElement(EventCoveragePage));
    expect(markup).toContain("Miami Event Photographer");
    expect(markup).toContain("photo needs scoped before the date is confirmed");
    expect(markup).toContain("date, venue, schedule, desired photos");
    expect(markup).toContain('href="/portfolio/healthy-smile"');
  });

  it("targets Miami business video production intent on both business-video pages", () => {
    expect(businessVideoMetadata.title).toBe(
      "Miami Business Video Production | Brickell",
    );
    expect(businessVideoMetadata.description).toContain(
      "Miami business video production",
    );
    expect(brandVideoMetadata.title).toBe(
      "Miami Business Video Production | Brand Stories",
    );
    expect(brandVideoMetadata.description).toContain(
      "Miami business video production",
    );

    const brickellMarkup = renderToStaticMarkup(
      React.createElement(BusinessVideoProductionPage),
    );
    const brandMarkup = renderToStaticMarkup(
      React.createElement(BrandVideoProductionPage),
    );

    expect(brickellMarkup).toContain("Miami Business Video Production");
    expect(brickellMarkup).toContain("existing assets, and desired formats");
    expect(brandMarkup).toContain("Miami Business Video Production");
    expect(brandMarkup).toContain("confirmed footage and project scope");
  });
});
