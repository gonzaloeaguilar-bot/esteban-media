import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { SiteFooter } from "@/components/site-footer";
import { localBusinessEntityJsonLd, personEntityJsonLd } from "@/lib/entity-schema";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

const FACEBOOK = "https://www.facebook.com/profile.php?id=61583136001307";
const LINKEDIN_COMPANY = "https://www.linkedin.com/company/esteban-moreno-media/";
const YELP_LIVE = "https://www.yelp.com/biz/esteban-moreno-media-plantation";

describe("footer social profile links (2026-11-26)", () => {
  const html = renderToStaticMarkup(React.createElement(SiteFooter));
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

  it("links the business Facebook page and the LinkedIn company page", () => {
    expect(hrefs).toContain(FACEBOOK);
    expect(hrefs).toContain(LINKEDIN_COMPANY);
  });

  it("points Yelp at the live -plantation listing, never the dead -fort-lauderdale slug", () => {
    expect(hrefs).toContain(YELP_LIVE);
    expect(html).not.toContain("esteban-moreno-media-fort-lauderdale\"");
    expect(hrefs.some((h) => h.includes("yelp.com/biz/esteban-moreno-media-fort-lauderdale"))).toBe(false);
  });

  it("puts both on the business entity only, never the person", () => {
    expect(localBusinessEntityJsonLd.sameAs).toEqual(expect.arrayContaining([FACEBOOK, LINKEDIN_COMPANY, YELP_LIVE]));
    expect(personEntityJsonLd.sameAs).not.toContain(FACEBOOK);
    expect(personEntityJsonLd.sameAs).not.toContain(LINKEDIN_COMPANY);
  });

  it("publishes no street address in the business JSON-LD", () => {
    const address = (localBusinessEntityJsonLd as { address: Record<string, string> }).address;
    expect(address.streetAddress).toBeUndefined();
    expect(address.postalCode).toBeUndefined();
  });
});
