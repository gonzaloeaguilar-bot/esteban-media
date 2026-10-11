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
    // spanishSite.title already names the brand ("Esteban Moreno Media |
    // Sistemas de Growth..."), so the root default must NOT append site.name
    // again — that double-branded the /es <title> in production (fixed
    // 2026-09-24, see lib/site-metadata.ts).
    expect(spanishRootMetadata).toMatchObject({
      title: {
        default: spanishSite.title,
        template: `%s | ${site.name}`,
      },
      openGraph: {
        locale: "es_US",
        images: [socialImage],
      },
    });
    // buildPageMetadata detects the title already contains the brand and
    // wraps it in `{ absolute }` so the parent template doesn't append the
    // brand a second time.
    // The Spanish home anchors its snippet on the published starting price
    // (2026-09-27); every other Spanish page keeps spanishSite.description.
    expect(spanishSite.homeDescription).toContain("desde $100 por video");
    expect(spanishSite.homeDescription.length).toBeLessThanOrEqual(160);
    expect(spanishHomeMetadata).toMatchObject({
      title: { absolute: spanishSite.title },
      description: spanishSite.homeDescription,
      openGraph: {
        title: spanishSite.title,
        description: spanishSite.homeDescription,
        images: [socialImage],
      },
    });

    const englishHomeSource = source("app/(english)/page.tsx");
    expect(englishHomeSource).toContain(
      'absolute:\n      "Fort Lauderdale Video Production & Editing | Esteban Moreno"',
    );
    expect(englishHomeSource).toContain(
      "Fort Lauderdale Video Production & Editing",
    );
    expect(englishHomeSource).toContain(
      "Spanish-first, English available.",
    );
    expect(
      englishHomeSource.match(/Spanish-first, English available\./g),
    ).toHaveLength(3);
    expect(englishHomeSource).toContain("openGraph:");
    expect(englishHomeSource).toContain("twitter:");
  });

  // Next replaces (never merges) a page's nested openGraph/twitter object, so a
  // homepage that only overrode title/description silently dropped og:image,
  // og:url, og:type, og:site_name, og:locale and the large twitter card
  // (SEO/GEO audit 2026-10-10, finding 1). Every social visit lands on "/".
  it("keeps the full social card on the English homepage", async () => {
    const { metadata: englishHomeMetadata } = await import("../(english)/page");
    const og = englishHomeMetadata.openGraph as Record<string, unknown>;
    const twitter = englishHomeMetadata.twitter as Record<string, unknown>;

    expect(og.images).toEqual([socialImage]);
    expect(og.url).toBe("https://estebanmorenomedia.com/");
    expect(og.type).toBe("website");
    expect(og.siteName).toBe(site.name);
    expect(og.locale).toBe("en_US");
    expect(og.title).toBe("Fort Lauderdale Video Production & Editing | Esteban Moreno");
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.images).toEqual([socialImage.url]);
    expect(twitter.title).toBe("Fort Lauderdale Video Production & Editing | Esteban Moreno");
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
