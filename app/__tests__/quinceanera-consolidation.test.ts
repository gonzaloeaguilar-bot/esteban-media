import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";
import sitemap from "../sitemap";
import { spanishNichePages } from "@/lib/spanish-site";
import { pairedLanguageRoutes } from "@/lib/language-routes";

describe("quinceañera consolidation (301s, sitemap, language routes)", () => {
  const OLD_EN = "/services/quinceanera-videographer-miami";
  const TARGET_EN = "/services/quinceanera-video-miami";
  const OLD_ES = "/es/videografo-de-quinceaneras-miami";
  const TARGET_ES = "/es/video-para-quinceaneras-miami";

  it("next.config.ts defines permanent 301 redirects from old URLs to target URLs", async () => {
    const config = typeof nextConfig === "function" ? await nextConfig("phase-production-build", {} as any) : nextConfig;
    const redirectsFn = config.redirects;
    expect(typeof redirectsFn).toBe("function");

    const redirects = await redirectsFn();

    const enRedirect = redirects.find((r: any) => r.source === OLD_EN);
    expect(enRedirect).toBeDefined();
    expect(enRedirect.destination).toBe(TARGET_EN);
    expect(enRedirect.permanent).toBe(true);

    const esRedirect = redirects.find((r: any) => r.source === OLD_ES);
    expect(esRedirect).toBeDefined();
    expect(esRedirect.destination).toBe(TARGET_ES);
    expect(esRedirect.permanent).toBe(true);
  });

  it("sitemap excludes consolidated duplicate URLs and includes target URLs", () => {
    const urls = sitemap().map((entry) => entry.url);
    const siteUrl = "https://estebanmorenomedia.com";

    expect(urls).not.toContain(`${siteUrl}${OLD_EN}`);
    expect(urls).not.toContain(`${siteUrl}${OLD_ES}`);
    expect(urls).toContain(`${siteUrl}${TARGET_EN}`);
    expect(urls).toContain(`${siteUrl}${TARGET_ES}`);
  });

  it("spanishNichePages does not include consolidated duplicate Spanish slug", () => {
    const slugs = spanishNichePages.map((p) => p.slug);
    expect(slugs).not.toContain("videografo-de-quinceaneras-miami");
    expect(slugs).toContain("video-para-quinceaneras-miami");
  });

  it("pairedLanguageRoutes correctly maps TARGET_EN <-> TARGET_ES and does not map consolidated duplicates", () => {
    expect(pairedLanguageRoutes[TARGET_EN]).toBe(TARGET_ES);
    expect(pairedLanguageRoutes[TARGET_ES]).toBe(TARGET_EN);

    expect(pairedLanguageRoutes[OLD_EN]).toBeUndefined();
    expect(pairedLanguageRoutes[OLD_ES]).toBeUndefined();
  });
});
