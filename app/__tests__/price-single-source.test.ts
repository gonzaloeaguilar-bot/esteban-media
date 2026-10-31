import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

import * as pricing from "@/lib/pricing";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";

/**
 * ONE source of truth for prices: lib/pricing.ts.
 *
 * Owner rule (Gonzalo, 2026-10-28): every price the site, the FAQ answers,
 * the WhatsApp CTAs, llms.txt and the client-facing catalog PDF show must be
 * the same number, and that number lives in lib/pricing.ts only. Before this
 * test, three service pages said "$80/hr" while the FAQ said "$100/hr", the
 * catalog said Local Presence "$1,600/mes" while the site said "$800/day",
 * and the drone add-on was $120 on the site and +$99 in the catalog.
 *
 * Rules enforced here:
 *  1. No hand-typed "$<number>" in app/, lib/, components/ outside
 *     lib/pricing.ts, except the MARKET_FIGURES ledger below (third-party
 *     market numbers quoted with their source, never our own prices).
 *  2. lib/llms-base.txt carries {{TOKENS}} only, resolved from pricing.ts.
 *  3. Every "$<number>" in the published catalog HTML is a value that
 *     exists in lib/pricing.ts (so the PDF cannot drift from the site).
 */

const ROOT = process.cwd();
const SOURCE_DIRS = ["app", "lib", "components"];

/** Third-party market figures that are allowed as literals, by file. */
const MARKET_FIGURES: Record<string, string[]> = {
  "lib/guides.ts": ["$50", "$150", "$2,000", "$10,000", "$2,500", "$100", "$149"],
  "lib/guide-comparisons.ts": ["$100", "$149", "$3.50", "$200", "$10,000"],
};

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      walk(p, out);
    } else if (/\.(ts|tsx|txt)$/.test(name)) out.push(p);
  }
  return out;
}

function priceLiterals(text: string): { value: string; line: number }[] {
  const found: { value: string; line: number }[] = [];
  text.split("\n").forEach((line, i) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    // Skip regex replacement groups like "$1" (no thousands, single digit followed by non-digit/comma)
    for (const m of line.matchAll(/\$(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)/g)) {
      const value = `$${m[1]}`;
      const after = line[m.index! + m[0].length] ?? "";
      if (/^\$\d$/.test(value) && (after === '"' || after === "\\" || after === ")" || after === "'")) continue;
      found.push({ value, line: i + 1 });
    }
  });
  return found;
}

function pricingValues(): Set<string> {
  const values = new Set<string>();
  const visit = (v: unknown) => {
    if (typeof v === "number" && Number.isFinite(v)) values.add(pricing.usd(v));
    else if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === "object") Object.values(v as Record<string, unknown>).forEach(visit);
  };
  for (const value of Object.values(pricing)) {
    if (typeof value === "function") continue;
    visit(value);
  }
  visit(REAL_ESTATE_MEDIA);
  return values;
}

describe("prices have one source of truth: lib/pricing.ts", () => {
  it("no hand-typed dollar figure lives outside lib/pricing.ts (except ledgered market figures)", () => {
    const offenders: string[] = [];
    for (const dir of SOURCE_DIRS) {
      for (const file of walk(join(ROOT, dir))) {
        const rel = relative(ROOT, file);
        if (rel === "lib/pricing.ts") continue;
        const allowed = new Set(MARKET_FIGURES[rel] ?? []);
        for (const { value, line } of priceLiterals(readFileSync(file, "utf8"))) {
          if (allowed.has(value)) continue;
          offenders.push(`${rel}:${line} ${value}`);
        }
      }
    }
    expect(offenders, "hand-typed prices outside lib/pricing.ts:\n" + offenders.join("\n")).toEqual([]);
  });

  it("llms-base.txt carries price tokens only, and every token resolves", async () => {
    const base = readFileSync(join(ROOT, "lib/llms-base.txt"), "utf8");
    expect(base).not.toMatch(/\$\d/);
    const tokens = [...base.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]);
    expect(tokens.length).toBeGreaterThan(3);
    const { fillPrices } = await import("@/lib/llms-txt");
    const filled = fillPrices(base);
    expect(filled).not.toMatch(/\{\{/);
    expect(filled).toContain(pricing.usd(pricing.PACKAGE_PRICES.arranque.kind === "from" ? pricing.PACKAGE_PRICES.arranque.amount : 0));
  });

  it("every price in the published catalog HTML exists in lib/pricing.ts", () => {
    const html = readFileSync(join(ROOT, "public/deliverables/esteban-moreno-media-catalogo-2026.html"), "utf8");
    const values = pricingValues();
    const stray = [...new Set(priceLiterals(html).map((p) => p.value))].filter((v) => !values.has(v) && v !== "$0");
    expect(stray, "catalog prices not present in lib/pricing.ts: " + stray.join(", ")).toEqual([]);
  });
});
