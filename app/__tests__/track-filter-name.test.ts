// The shared measurement layer (public/track.js, vendored from
// ~/.claude/durable/analytics/track.js) stripped `filter_name` as if it were a
// person's name: every filter_apply reached GA4 as filter_name="unknown".
// Measured live on /reels-editing-cost-calculator, 2026-10-14. This loads the
// vendored file itself and fires a change on the calculator's select.
import { createRequire } from "node:module";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("public/track.js keeps contract params that end in _name", () => {
  it("filter_apply carries filter_name from data-filter", () => {
    const listeners: Record<string, (ev: unknown) => void> = {};
    const noop = () => {};
    const g = globalThis as unknown as Record<string, unknown>;
    const saved = { ...g };
    Object.assign(g, {
      window: g,
      location: { pathname: "/reels-editing-cost-calculator", href: "https://x.test/", hostname: "x.test" },
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
      const out: [string, Record<string, unknown>][] = [];
      A.init({ brand: "esteban", locale: "en", sink: (e: string, p: Record<string, unknown>) => out.push([e, p]) });
      const attrs: Record<string, string> = { "data-filter": "videos_per_week", name: "videos_per_week" };
      listeners.change({
        target: {
          tagName: "SELECT", name: "videos_per_week", value: "2", nodeType: 1, parentElement: null,
          closest: () => null,
          hasAttribute: (k: string) => k in attrs,
          getAttribute: (k: string) => attrs[k] ?? null,
        },
      });
      const f = out.filter(([e]) => e === "filter_apply");
      expect(f).toHaveLength(1);
      expect(f[0][1].filter_name).toBe("videos_per_week");
      expect(f[0][1].filter_value).toBe("2");
    } finally {
      for (const k of ["window", "location", "document", "addEventListener", "history", "IntersectionObserver", "MutationObserver"]) {
        if (k in saved) g[k] = saved[k]; else delete g[k];
      }
    }
  });
});
