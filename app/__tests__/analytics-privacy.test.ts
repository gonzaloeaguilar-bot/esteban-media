import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

function analyticsSource() {
  return [
    source("components/google-analytics.tsx"),
    source("lib/google-analytics-script.ts"),
  ].join("\n");
}

function executeAnalyticsScript(navigator?: Record<string, unknown>) {
  const dataLayer: IArguments[] = [];
  const location = {
    hostname: "estebanmorenomedia.com",
    pathname: "/contact",
  };
  const storage = new Map<string, string>();
  const history = {
    pushState(_state: unknown, _unused: string, url?: string | URL | null) {
      if (url) {
        location.pathname = new URL(url, "https://estebanmorenomedia.com").pathname;
      }
    },
    replaceState(_state: unknown, _unused: string, url?: string | URL | null) {
      if (url) {
        location.pathname = new URL(url, "https://estebanmorenomedia.com").pathname;
      }
    },
  };
  const window = {
    location,
    history,
    dataLayer,
    sessionStorage: {
      getItem(key: string) {
        return storage.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        storage.set(key, value);
      },
    },
    requestAnimationFrame(callback: () => void) {
      callback();
      return 1;
    },
    setTimeout(callback: () => void) {
      callback();
      return 1;
    },
    addEventListener() {},
  } as Record<string, unknown>;

  class FakeElement {}

  runInNewContext(
    buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/", "/contact", "/es/contacto"],
    }),
    {
      window,
      document: {
        referrer:
          "https://chatgpt.com/share?email=visitor%40example.com&prompt=private",
        documentElement: { lang: "en" },
        addEventListener() {},
      },
      URL,
      Element: FakeElement,
      ...(navigator ? { navigator } : {}),
    },
  );

  return {
    calls: () => dataLayer.map((entry) => Array.from(entry)),
    history,
  };
}

describe("analytics safeguards", () => {
  it("limits collection to production and disables advertising signals", () => {
    const analytics = analyticsSource();

    expect(analytics).toContain("window.location.hostname !==");
    expect(analytics).toContain("allow_google_signals: false");
    expect(analytics).toContain("allow_ad_personalization_signals: false");
    expect(analytics).toContain("send_page_view: false");
    expect(analytics).not.toContain("send_page_view: true");
    expect(analytics).toContain("page_location:");
    expect(analytics).toContain("page_referrer:");
  });

  it("tracks contact intent and identifies known AI referral visits", () => {
    const analytics = analyticsSource();

    expect(analytics).toContain("contact_cta_click");
    expect(analytics).toContain("contact_intent");
    expect(analytics).toContain("ai_referral_visit");
    expect(analytics).toContain("chatgpt.com");
    expect(analytics).toContain("perplexity.ai");
    expect(analytics).toContain("claude.ai");
    expect(analytics).toContain("transport_type: 'beacon'");
  });

  it("disables enhanced measurement and publishes its privacy disclosure", () => {
    const provisioning = source("scripts/ga4-provision.mjs");
    const privacy = source("components/privacy-notice.tsx");

    expect(provisioning).toContain("streamEnabled: false");
    expect(provisioning).toContain("pageChangesEnabled: false");
    expect(provisioning).toContain('parameterName: "contact_method"');
    expect(provisioning).toContain('parameterName: "ai_source"');
    expect(privacy).toContain(
      "https://policies.google.com/technologies/partner-sites",
    );
    expect(privacy).toContain("Google Analytics 4");
  });

  it("builds manual page views from an exact path allowlist", () => {
    const script = buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/", "/contact", "/es/contacto"],
    });

    expect(script).toContain("send_page_view: false");
    expect(script).toContain("sendEvent('page_view', {})");
    expect(script).toContain("safePagePath(window.location.pathname)");
    expect(script).toContain("return allowedPaths.has(pathname) ? pathname : '/not-found'");
    expect(script).toContain("page_location: canonicalOrigin + pagePath");
    expect(script).toContain("page_referrer: currentPageReferrer");
    expect(script).not.toContain("window.location.href");
    expect(script).not.toContain("window.location.search");
    expect(script).not.toContain("document.location");
  });

  it("never queues query strings or unknown-path PII in GA4 calls", () => {
    const runtime = executeAnalyticsScript();
    const initialCalls = runtime.calls();
    const config = initialCalls.find((call) => call[0] === "config");
    const initialPageView = initialCalls.find(
      (call) => call[0] === "event" && call[1] === "page_view",
    );

    expect(config?.[2]).toMatchObject({
      send_page_view: false,
      page_location: "https://estebanmorenomedia.com/contact",
      page_referrer: "https://chatgpt.com/",
      page_title: "/contact",
    });
    expect(initialPageView?.[2]).toMatchObject({
      page_path: "/contact",
      page_location: "https://estebanmorenomedia.com/contact",
      page_referrer: "https://chatgpt.com/",
    });

    runtime.history.pushState(
      {},
      "",
      "/es/contacto?email=visitor%40example.com",
    );
    runtime.history.pushState(
      {},
      "",
      "/private/visitor%40example.com?prompt=secret",
    );

    const calls = runtime.calls();
    const pageViews = calls.filter(
      (call) => call[0] === "event" && call[1] === "page_view",
    );
    expect(pageViews.at(-2)?.[2]).toMatchObject({
      page_path: "/es/contacto",
      page_location: "https://estebanmorenomedia.com/es/contacto",
      page_referrer: "https://estebanmorenomedia.com/contact",
    });
    expect(pageViews.at(-1)?.[2]).toMatchObject({
      page_path: "/not-found",
      page_location: "https://estebanmorenomedia.com/not-found",
      page_referrer: "https://estebanmorenomedia.com/es/contacto",
    });

    const queuedPayload = JSON.stringify(calls);
    expect(queuedPayload).not.toContain("visitor@example.com");
    expect(queuedPayload).not.toContain("visitor%40example.com");
    expect(queuedPayload).not.toContain("prompt=private");
    expect(queuedPayload).not.toContain("prompt=secret");
  });
});

describe("automated browsers", () => {
  const configCalls = (nav?: Record<string, unknown>) =>
    executeAnalyticsScript(nav).calls().filter((c) => c[0] === "config").length;
  const iphone =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1";

  it("configures GA4 for a real phone", () => {
    expect(configCalls({ userAgent: iphone })).toBe(1);
  });

  it("never configures GA4 when navigator.webdriver is true", () => {
    expect(configCalls({ userAgent: iphone, webdriver: true })).toBe(0);
  });

  it.each([
    "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0)",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 HeadlessChrome/128.0 Safari/537.36",
  ])("never configures GA4 for %s", (ua) => {
    expect(configCalls({ userAgent: ua })).toBe(0);
  });
});
