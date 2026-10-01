import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();

function files(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...files(path));
    else if (entry.isFile() && path.endsWith(".tsx")) out.push(path);
  }
  return out;
}

const source = (path: string) => readFileSync(join(root, path), "utf8");

const APPROVED_SHARED_RENDERERS = [
  "SpanishNichePage",
  "GuidesIndexPage",
  "GuideDetailPage",
  "CaseStudiesIndexPage",
  "CaseStudyPage",
  "PortfolioPage",
  "PackageDetailPage",
  "GrowthSystemPage",
] as const;

const COMMON_COMPONENT_MARKERS = [
  "@/vendor/rail-kit",
  "vendor/rail-kit",
  "@/components/ui/",
  "@/components/service-depth",
  "@/components/em-rails",
  "@/components/em-surface",
] as const;

/**
 * Existing high-density hand-rolled pages. This is not approval forever; it is
 * the starting debt ledger. New pages must not join this list, and migrations
 * should remove entries from it.
 */
const LEGACY_HAND_ROLLED_PAGES = new Set([
  "app/(english)/desk-recommendations/page.tsx",
  "app/(english)/page.tsx",
  "app/(english)/portfolio/[id]/page.tsx",
  "app/(english)/pricing/all-in/page.tsx",
  "app/(english)/pricing/growth/page.tsx",
  "app/(english)/pricing/local-presence/page.tsx",
  "app/(english)/pricing/real-estate/page.tsx",
  "app/(english)/pricing/starter/page.tsx",
  "app/(english)/privacy/page.tsx",
  "app/(english)/unsubscribe/page.tsx",
  "app/(spanish)/es/portafolio/[id]/page.tsx",
  "app/(spanish)/es/precios/arranque/page.tsx",
  "app/(spanish)/es/precios/crecimiento/page.tsx",
  "app/(spanish)/es/precios/inmobiliaria/page.tsx",
  "app/(spanish)/es/precios/presencia-local/page.tsx",
  "app/(spanish)/es/precios/todo-incluido/page.tsx",
  "app/(spanish)/es/privacidad/page.tsx",
]);

function hasCommonComponent(text: string) {
  return COMMON_COMPONENT_MARKERS.some((marker) => text.includes(marker));
}

function usesApprovedSharedRenderer(text: string) {
  return APPROVED_SHARED_RENDERERS.some((name) => text.includes(name));
}

function handRolledDensity(text: string) {
  return [
    "rounded-xl border",
    "rounded-lg border",
    "border-[#ddd4c8]",
    "bg-[#fbf6ef]",
    "bg-[#f6f1ea]",
  ].reduce((sum, marker) => sum + text.split(marker).length - 1, 0);
}

describe("Rail/common component adoption", () => {
  it("keeps the AI contributor template in the repo", () => {
    const template = source(".ai/service-page-template.md");
    expect(template).toContain("ServiceCraft");
    expect(template).toContain("ServiceFaqs");
    expect(template).toContain("ServiceRelated");
    expect(template).toContain("data-section");
    expect(template).toContain("data-cta");
  });

  it("does not allow new dense hand-rolled public pages without a common component or approved renderer", () => {
    const offenders: string[] = [];

    for (const path of files("app").filter((file) => file.endsWith("/page.tsx"))) {
      const text = source(path);
      if (hasCommonComponent(text) || usesApprovedSharedRenderer(text)) continue;
      if (LEGACY_HAND_ROLLED_PAGES.has(path)) continue;
      const density = handRolledDensity(text);
      if (density >= 8) offenders.push(`${path} (${density} repeated card/surface markers)`);
    }

    expect(offenders).toEqual([]);
  });

  it("keeps the migrated yacht hospitality page on the service-depth pattern", () => {
    const path = "app/(english)/services/yacht-hospitality-video-fort-lauderdale/page.tsx";
    const text = source(path);
    expect(text).toContain("YACHT_HOSPITALITY_DEPTH");
    expect(text).toContain("<ServiceCraft");
    expect(text).toContain("<ServiceFaqs");
    expect(text).toContain("<ServiceRelated");
    expect(text).toContain("buildServiceFaqSchema");
    expect(text).not.toContain("const faqs = [");
  });
});

