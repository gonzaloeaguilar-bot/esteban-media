import { describe, expect, it } from "vitest";

import { GET } from "@/app/pay/route";
import { site } from "@/lib/site";

describe("/pay payment redirect", () => {
  it("redirects to the canonical Stripe payment link with a temporary 307", () => {
    const response = GET();
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(site.pay);
  });

  it("points at a live Stripe payment link", () => {
    expect(site.pay).toMatch(/^https:\/\/buy\.stripe\.com\//);
  });
});
