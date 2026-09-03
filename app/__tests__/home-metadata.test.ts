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
      'absolute:\n      "Esteban Moreno Media | Video Editing, Production & Websites"',
    );
    expect(englishHomeSource).toContain(
      "Video Editing, Production & Websites",
    );
    expect(englishHomeSource).toContain(
      "video editing services, website designer support",
    );
    expect(englishHomeSource).toContain("scoped video production services");
    expect(englishHomeSource).toContain("View portfolio work.");
    expect(
      englishHomeSource.match(/video editing services, website designer support/g),
    ).toHaveLength(3);
    expect(englishHomeSource.match(/scoped video production services/g)).toHaveLength(3);
    expect(englishHomeSource.match(/View portfolio work\./g)).toHaveLength(3);
    expect(englishHomeSource).toContain("openGraph:");
    expect(englishHomeSource).toContain("twitter:");
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
