import { describe, expect, it } from "vitest";

import { buildPageMetadata, englishRootMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";

/**
 * The root layouts set `title.template` to `%s | Esteban Moreno Media`, so a
 * page that supplies a plain string title has the brand appended by Next. A
 * page whose own title already names the brand would then render the brand
 * twice — e.g. "Contact Esteban Moreno Media | Esteban Moreno Media". This test
 * exercises buildPageMetadata directly to prove a branded title is emitted as
 * `{ absolute }` (template skipped) and an unbranded one is templated once.
 */
const BRAND = site.name;
const rootTitle = englishRootMetadata.title;
const TEMPLATE =
  rootTitle && typeof rootTitle === "object" && "template" in rootTitle
    ? (rootTitle.template ?? "%s")
    : "%s";

type MetadataTitle =
  | string
  | { absolute?: string; default?: string; template?: string }
  | null
  | undefined;

/** Apply the parent title template the way Next renders a page title. */
function effectiveTitle(title: MetadataTitle): string {
  if (typeof title === "string") {
    return TEMPLATE.replace("%s", title);
  }
  if (title && typeof title === "object") {
    if (typeof title.absolute === "string") return title.absolute;
    if (typeof title.default === "string") return TEMPLATE.replace("%s", title.default);
  }
  return "";
}

function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

function buildTitle(title: string) {
  return buildPageMetadata({
    title,
    description: "A description long enough to be meaningful for the page.",
    path: "/contact",
    locale: "en",
  });
}

describe("page title brand dedup", () => {
  it("does not re-append the brand to an already-branded title", () => {
    const branded = `Contact ${BRAND}`;
    const metadata = buildTitle(branded);

    // A branded title is wrapped in { absolute } so the parent template is
    // skipped entirely.
    expect(metadata.title).toEqual({ absolute: branded });
    const effective = effectiveTitle(metadata.title as MetadataTitle);
    expect(effective).toBe(branded);
    expect(countOccurrences(effective, BRAND)).toBe(1);

    // Social surfaces must not brand it a second time either.
    expect(metadata.openGraph?.title).toBe(branded);
    expect(metadata.twitter?.title).toBe(branded);
  });

  it("appends the brand exactly once to an unbranded title", () => {
    const plain = "Video Editing Rates";
    const metadata = buildTitle(plain);

    expect(metadata.title).toBe(plain);
    const effective = effectiveTitle(metadata.title as MetadataTitle);
    expect(effective).toBe(`${plain} | ${BRAND}`);
    expect(countOccurrences(effective, BRAND)).toBe(1);

    expect(metadata.openGraph?.title).toBe(`${plain} | ${BRAND}`);
    expect(metadata.twitter?.title).toBe(`${plain} | ${BRAND}`);
  });

  it("never lets any built title contain the brand twice", () => {
    const titles = [
      `Contact ${BRAND}`,
      `About ${BRAND} in Fort Lauderdale`,
      "Video Editing Rates",
      `${BRAND} — Portfolio`,
      "Reels for Restaurants",
    ];

    const doubled = titles.filter(
      (title) => countOccurrences(effectiveTitle(buildTitle(title).title as MetadataTitle), BRAND) > 1,
    );

    expect(doubled).toEqual([]);
  });
});
