import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("analytics safeguards", () => {
  it("limits collection to production and disables advertising signals", () => {
    const analytics = source("components/google-analytics.tsx");

    expect(analytics).toContain("window.location.hostname ===");
    expect(analytics).toContain("allow_google_signals: false");
    expect(analytics).toContain("allow_ad_personalization_signals: false");
  });

  it("provisions enhanced measurement and publishes its privacy disclosure", () => {
    const provisioning = source("scripts/ga4-provision.mjs");
    const privacy = source("components/privacy-notice.tsx");

    expect(provisioning).toContain("streamEnabled: true");
    expect(provisioning).toContain("pageChangesEnabled: true");
    expect(privacy).toContain(
      "https://policies.google.com/technologies/partner-sites",
    );
    expect(privacy).toContain("Google Analytics 4");
  });
});
