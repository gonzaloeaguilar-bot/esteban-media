import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resolvePublishedProjectProof } from "@/components/published-project-proof";
import { getGuides } from "@/lib/guides";

const input = {
  title: "Healthy Smile Miami",
  description: "Published project scope.",
  eyebrow: "Published project",
  linkLabel: "View the project page",
};

describe("PublishedProjectProof", () => {
  it("resolves only an existing local poster from a published portfolio path", () => {
    expect(resolvePublishedProjectProof({ ...input, href: "/portfolio/healthy-smile" })).toMatchObject({
      id: "healthy-smile",
      poster: "/portfolio/healthy-smile.jpg",
    });
    expect(resolvePublishedProjectProof({ ...input, href: "/es/portafolio/healthy-smile" })).toMatchObject({
      id: "healthy-smile",
      poster: "/portfolio/healthy-smile.jpg",
    });
  });

  it("refuses links that are not a published local portfolio record", () => {
    expect(resolvePublishedProjectProof({ ...input, href: "https://example.com/work" })).toBeNull();
    expect(resolvePublishedProjectProof({ ...input, href: "/case-studies/healthy-smile" })).toBeNull();
    expect(resolvePublishedProjectProof({ ...input, href: "/portfolio/not-a-project" })).toBeNull();
  });

  it("uses visual proof only for the localized RFP guide pair", () => {
    const english = getGuides("en").find((guide) => guide.id === "video-production-rfp-template")!;
    const spanish = getGuides("es").find((guide) => guide.id === "video-production-rfp-template")!;
    const unrelated = getGuides("en").find((guide) => guide.id === "video-brief")!;

    expect(english.heroProof?.href).toBe("/portfolio/healthy-smile");
    expect(spanish.heroProof?.href).toBe("/es/portafolio/healthy-smile");
    expect(unrelated.heroProof).toBeUndefined();
  });

  it("keeps the project card reusable by services and guides with delegated click tracking", () => {
    const component = readFileSync(join(process.cwd(), "components/published-project-proof.tsx"), "utf8");
    const service = readFileSync(join(process.cwd(), "components/geo-service-page.tsx"), "utf8");
    const guides = readFileSync(join(process.cwd(), "components/guide-pages.tsx"), "utf8");
    const corporate = readFileSync(
      join(process.cwd(), "app/(english)/services/corporate-video-production-brickell/page.tsx"),
      "utf8",
    );
    const brand = readFileSync(
      join(process.cwd(), "app/(english)/services/brand-video-production-miami/page.tsx"),
      "utf8",
    );
    const weston = readFileSync(
      join(process.cwd(), "app/(english)/services/corporate-video-editing-weston-fl/page.tsx"),
      "utf8",
    );

    expect(component).toContain('data-cta={`published_project_proof_${resolved.id}`}');
    expect(component).toContain("Published project:");
    expect(service).toContain("<PublishedProjectProof proof={publishedProof} />");
    expect(guides).toContain("guide.heroProof ?");
    expect(corporate).toContain('href: "/portfolio/healthy-smile"');
    expect(brand).toContain('href: "/portfolio/healthy-smile"');
    expect(weston).toContain('href: "/portfolio/my-dler"');
    expect(corporate).toContain("<PublishedProjectProof");
    expect(brand).toContain("<PublishedProjectProof");
    expect(weston).toContain("<PublishedProjectProof");
  });
});
