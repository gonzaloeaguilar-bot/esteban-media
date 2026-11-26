// Every non-contact outbound click was silent. components/google-analytics.tsx
// disabled outbound_click in the shared layer (public/track.js) on the claim
// that the site's GA script owned it, but lib/google-analytics-script.ts never
// emits outbound_click; it only maps the name. Found when the official-site
// CTA in PR #842's event booking block reported nothing (codex review).
// This loads the vendored track.js with the loader's real disable list and
// clicks three links.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";

type Out = [string, Record<string, unknown>];

function loaderDisableList(): string[] {
  const loader = readFileSync(join(process.cwd(), "components/google-analytics.tsx"), "utf8");
  const raw = /disable:\s*\[([^\]]*)\]/.exec(loader)?.[1] ?? "";
  return [...raw.matchAll(/'([a-z_]+)'/g)].map((m) => m[1]);
}

function el(tag: string, attrs: Record<string, string>, text: string, parent: unknown = null) {
  const node = {
    tagName: tag, nodeType: 1, parentElement: parent, textContent: text, innerText: text,
    hasAttribute: (k: string) => k in attrs,
    getAttribute: (k: string) => attrs[k] ?? null,
    closest: () => node,
  };
  return node;
}

function clickWithSharedLayer(target: unknown, claimFirst = false): Out[] {
  const listeners: Record<string, (ev: unknown) => void> = {};
  const noop = () => {};
  const g = globalThis as unknown as Record<string, unknown>;
  const keys = ["window", "location", "document", "addEventListener", "history", "IntersectionObserver", "MutationObserver"];
  const saved: Record<string, unknown> = {};
  for (const k of keys) saved[k] = g[k];
  Object.assign(g, {
    window: g,
    location: { pathname: "/services/art-basel-miami-art-week-video", href: "https://estebanmorenomedia.com/services/art-basel-miami-art-week-video", hostname: "estebanmorenomedia.com" },
    document: {
      readyState: "complete",
      documentElement: { clientHeight: 800, scrollHeight: 800 },
      currentScript: null,
      title: "t",
      addEventListener: (n: string, f: (ev: unknown) => void) => { listeners[n] = f; },
      querySelector: () => null,
      querySelectorAll: () => [],
    },
    addEventListener: noop,
    history: { pushState: noop, replaceState: noop },
    IntersectionObserver: function () { return { observe: noop, disconnect: noop }; },
    MutationObserver: function () { return { observe: noop, disconnect: noop }; },
  });
  try {
    const require = createRequire(import.meta.url);
    const path = join(process.cwd(), "public/track.js");
    delete require.cache[path];
    const A = require(path);
    const out: Out[] = [];
    A.init({ brand: "esteban", locale: "en", disable: loaderDisableList(), sink: (e: string, p: Record<string, unknown>) => out.push([e, p]) });
    out.length = 0;
    if (claimFirst) A.claim();
    listeners.click({ target });
    return out;
  } finally {
    for (const k of keys) {
      if (saved[k] === undefined) delete g[k]; else g[k] = saved[k];
    }
  }
}

describe("outbound_click has exactly one owner", () => {
  const section = el("SECTION", { "data-section": "event_booking_art_basel" }, "");

  it("the official-site CTA emits one outbound_click with its domain", () => {
    const link = el("A", { href: "https://www.artbasel.com/miami-beach", "data-cta": "event_booking_art_basel_official_site" }, "Official dates", section);
    const out = clickWithSharedLayer(link);
    expect(out.map(([e]) => e)).toEqual(["outbound_click"]);
    expect(out[0][1]).toMatchObject({ destination_domain: "www.artbasel.com", link_context: "event_booking_art_basel" });
  });

  it("an internal proof CTA emits one cta_click", () => {
    const link = el("A", { href: "/portfolio/bar-door-monkey", "data-cta": "drone_near_me_proof" }, "See the work", section);
    const out = clickWithSharedLayer(link);
    expect(out.map(([e]) => e)).toEqual(["cta_click"]);
    expect(out[0][1]).toMatchObject({ cta_id: "drone_near_me_proof" });
  });

  it("a WhatsApp CTA is left to the GA script (contact_click stays disabled in the shared layer)", () => {
    const link = el("A", { href: "https://wa.me/13054974478?text=Hola", "data-cta": "event_booking_art_basel_whatsapp" }, "WhatsApp", section);
    expect(clickWithSharedLayer(link)).toEqual([]);
    expect(loaderDisableList()).toContain("contact_click");
  });

  it("the GA script never emits outbound_click itself, so nothing double-counts", () => {
    const script = buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/"],
    });
    expect(script.includes("sendEvent('outbound_click'")).toBe(false);
    expect(loaderDisableList()).not.toContain("outbound_click");
  });
});

describe("/lens is not double-counted (its own telemetry claims the click)", () => {
  it("track.js emits nothing for a click the page has claimed", () => {
    const link = el("A", { href: "/contact-next", "data-cta": "lens_stop_next" }, "Next", null);
    expect(clickWithSharedLayer(link).map(([e]) => e)).toEqual(["cta_click"]);
    expect(clickWithSharedLayer(link, true)).toEqual([]);
  });

  it("LensTelemetry listens in capture phase and claims before it emits", () => {
    const src = readFileSync(join(process.cwd(), "components/lens/lens-telemetry.tsx"), "utf8");
    expect(src).toContain('document.addEventListener("click", onClick, true)');
    const claim = src.indexOf("Analytics?.claim?.()");
    const emit = src.indexOf('track("cta_click"');
    expect(claim).toBeGreaterThan(-1);
    expect(claim).toBeLessThan(emit);
  });
});
