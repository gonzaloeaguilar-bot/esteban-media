import { describe, expect, it } from "vitest";

import {
  contactTier,
  inMarket,
  isVendorAddress,
  usableEmails,
} from "./niche-prospect-scraper.mjs";

describe("usableEmails", () => {
  it("keeps real addresses and drops platform/asset noise", () => {
    const html = `
      <a href="mailto:info@thevenue.com">info@thevenue.com</a>
      owner@gmail.com
      a7f3@sentry.io logo@2x.png someone@example.com`;
    const found = usableEmails(html, "thevenue.com");
    expect(found).toContain("info@thevenue.com");
    expect(found).toContain("owner@gmail.com");
    expect(
      found.some((e) => e.includes("sentry") || e.includes("example.com") || e.endsWith(".png")),
    ).toBe(false);
  });

  it("ranks the own-domain role address first", () => {
    expect(usableEmails("owner@gmail.com info@thevenue.com", "thevenue.com")[0]).toBe(
      "info@thevenue.com",
    );
  });
});

describe("contactTier", () => {
  it("tiers own-domain role, own-domain personal, and free mail", () => {
    expect(contactTier("info@thevenue.com", "thevenue.com")).toBe("A");
    expect(contactTier("bridget@thevenue.com", "thevenue.com")).toBe("B");
    expect(contactTier("thevenue@gmail.com", "thevenue.com")).toBe("C");
  });
});

describe("isVendorAddress", () => {
  it("rejects a webmaster address on an unrelated domain", () => {
    expect(isVendorAddress("seo@s-fx.com", "angelaesthetics.com")).toBe(true);
  });

  it("accepts the business's own and free-mail addresses", () => {
    expect(isVendorAddress("info@angelaesthetics.com", "angelaesthetics.com")).toBe(false);
    expect(isVendorAddress("angelaesthetics@gmail.com", "angelaesthetics.com")).toBe(false);
  });

  it("accepts a role address on a dealer platform subdomain", () => {
    expect(isVendorAddress("sales@shop.edealerhub.com", "carlux.com")).toBe(false);
  });
});

describe("inMarket", () => {
  it("keeps the named city and same-state neighbours", () => {
    expect(
      inMarket({ city: "Fort Lauderdale", address: "1 Las Olas Blvd, Fort Lauderdale, FL" }, "Fort Lauderdale FL"),
    ).toBe(true);
    expect(
      inMarket({ city: "Pompano Beach", address: "2 Atlantic Blvd, Pompano Beach, FL 33060" }, "Fort Lauderdale FL"),
    ).toBe(true);
  });

  it("drops another state", () => {
    expect(inMarket({ city: "New York", address: "10 Pier 40, New York, NY 10014" }, "Miami FL")).toBe(false);
  });
});
