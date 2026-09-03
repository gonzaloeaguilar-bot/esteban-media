import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { metadata as spanishHomeMetadata } from "../(spanish)/es/page";
import {
  englishRootMetadata,
  spanishRootMetadata,
} from "../../lib/site-metadata";
import { spanishSite } from "../../lib/spanish-site";
import { site, socialImage } from "../../lib/site";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

const englishHomepageDescription =
  "Video editing services, video production services, and website design for South Florida businesses. View portfolio work and request a scoped project quote.";

describe("localized home metadata", () => {
  it("publishes concise English and Spanish root metadata with brand entity", () => {
    expect(englishRootMetadata).toMatchObject({
      title: {
        default: `Esteban Moreno | Video Editor in Fort Lauderdale | ${site.name}`,
        template: `%s | ${site.name}`,
      },
      description: site.description,
      openGraph: {
        locale: "en_US",
        images: [socialImage],
      },
      twitter: {
        images: [socialImage.url],
      },
    });
    expect(spanishRootMetadata).toMatchObject({
      title: {
        default: `${spanishSite.title} | ${site.name}`,
        template: `%s | ${site.name}`,
      },
      openGraph: {
        locale: "es_US",
        images: [socialImage],
      },
    });
    expect(spanishHomeMetadata).toMatchObject({
      title: spanishSite.title,
      description: spanishSite.description,
      openGraph: {
        title: `${spanishSite.title} | ${site.name}`,
        description: spanishSite.description,
        images: [socialImage],
      },
    });

    const englishHomeSource = source("app/(english)/page.tsx");
    expect(englishHomeSource).toContain(
      'absolute:\n      "Esteban Moreno Media | Video Editing Services & Website Design"',
    );
    expect(englishHomeSource).toContain("Video Editing Services & Website Design");
    expect(englishHomeSource.match(/Video editing services/g)).toHaveLength(3);
    expect(englishHomeSource.match(/video production services/g)).toHaveLength(3);
    expect(englishHomeSource.match(/website design/g)).toHaveLength(4);
    expect(englishHomeSource).toContain("openGraph:");
    expect(englishHomeSource).toContain("twitter:");
  });

  it("keeps the English homepage search and social snippets aligned", () => {
    const englishHomeSource = source("app/(english)/page.tsx");

    expect(englishHomeSource.match(/portfolio work/g)).toHaveLength(3);
    expect(englishHomepageDescription.length).toBeGreaterThanOrEqual(120);
    expect(englishHomepageDescription.length).toBeLessThanOrEqual(160);
    expect(englishHomepageDescription.toLowerCase()).toContain(
      "video editing services",
    );
    expect(englishHomepageDescription.toLowerCase()).toContain(
      "video production services",
    );
    expect(englishHomepageDescription.toLowerCase()).toContain(
      "website design",
    );
    expect(englishHomepageDescription).toContain("portfolio work");
  });

  it("verifies brand entity presence and optimal character bounds for CTR", () => {
    expect(site.description.startsWith("Esteban Moreno")).toBe(true);
    expect(spanishSite.description.startsWith("Esteban Moreno")).toBe(true);
    expect(site.description.length).toBeGreaterThanOrEqual(120);
    expect(site.description.length).toBeLessThanOrEqual(160);
    expect(spanishSite.description.length).toBeGreaterThanOrEqual(120);
    expect(spanishSite.description.length).toBeLessThanOrEqual(160);
    expect(spanishSite.title.startsWith("Esteban Moreno")).toBe(true);
  });
});
