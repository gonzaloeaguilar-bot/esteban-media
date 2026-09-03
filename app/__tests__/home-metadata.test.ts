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
      'absolute:\n      "Video Editing Services | Esteban Moreno Media"',
    );
    expect(englishHomeSource).toContain(
      "Video editing services for South Florida businesses, with scoped video production",
    );
    expect(englishHomeSource).toContain(
      "AI-assisted content, and social planning",
    );
    expect(englishHomeSource).toContain("openGraph:");
    expect(englishHomeSource).toContain("twitter:");
  });

  it("keeps the English homepage search and share snippets aligned", () => {
    const englishHomeSource = source("app/(english)/page.tsx");
    const title = "Video Editing Services | Esteban Moreno Media";
    const description =
      "Video editing services for South Florida businesses, with scoped video production, AI-assisted content, and social planning from Esteban Moreno Media.";

    expect(englishHomeSource.split(title)).toHaveLength(4);
    expect(englishHomeSource.split(description)).toHaveLength(4);
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(160);
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
