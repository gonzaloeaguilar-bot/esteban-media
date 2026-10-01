import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "@/app/sitemap";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

const resourcePages = [
  [
    "/resources/video-project-brief-template",
    "app/(english)/resources/video-project-brief-template/page.tsx",
    "Video project brief template",
  ],
  [
    "/resources/remote-editing-handoff-checklist",
    "app/(english)/resources/remote-editing-handoff-checklist/page.tsx",
    "Remote video editing handoff checklist",
  ],
  [
    "/resources/ai-product-photo-truth-checklist",
    "app/(english)/resources/ai-product-photo-truth-checklist/page.tsx",
    "AI product photo truth checklist",
  ],
] as const;

const spanishInquiryIds = [
  "es_short_form_video",
  "es_ai_product_photography",
  "es_ai_real_estate_photo",
  "es_restaurant_promo_video",
  "es_ecommerce_product_video",
  "es_ugc_video_ecommerce",
  "es_social_video_batching",
  "es_youtube_video_editing",
] as const;

describe("conversion resources and remote service pages", () => {
  it.each(resourcePages)("%s is indexed and has a useful contact path", (route, file, title) => {
    const text = source(file);
    expect(sitemapRoutes.map((entry) => entry.path)).toContain(route);
    expect(text).toContain(title);
    expect(text).toContain("data-cta=");
    expect(text).toContain("@/components/ui/container");
  });

  it("publishes the remote video editor service page with shared inquiry analytics and Google review proof", () => {
    const text = source("app/(english)/services/hire-remote-video-editor/page.tsx");
    expect(sitemapRoutes.map((entry) => entry.path)).toContain("/services/hire-remote-video-editor");
    expect(text).toContain("<ServiceInquiryRail");
    expect(text).toContain('serviceId: "remote_video_editor"');
    expect(text).toContain("<ClientReviews");
    expect(text).toContain("/resources/remote-editing-handoff-checklist");
  });

  it("shows verified Google review proof on the main services hub", () => {
    const text = source("app/(english)/services/page.tsx");
    expect(text).toContain("import { ClientReviews }");
    expect(text).toContain("<ClientReviews locale=\"en\" />");
  });

  it("adopts the shared Spanish inquiry rail on the matching priority pages", () => {
    const text = source("components/spanish-niche-page.tsx");
    expect(text).toContain("<ServiceInquiryRail");
    expect(text).toContain('locale="es"');
    expect(text).toContain('sectionId="consulta-de-servicio"');
    for (const serviceId of spanishInquiryIds) {
      expect(text).toContain(`serviceId: "${serviceId}"`);
    }
  });
});
