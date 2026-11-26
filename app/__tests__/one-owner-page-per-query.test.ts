import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ShortFormMiamiPage, {
  metadata as shortFormMiamiMetadata,
} from "../(english)/services/short-form-video-editor-miami/page";
import { metadata as reelsMiamiMetadata } from "../(english)/services/reels-editor-miami/page";
import { metadata as reelsFtlMetadata } from "../(english)/services/reels-editor-fort-lauderdale/page";
import { getGuides } from "@/lib/guides";
import { getSpanishNichePage } from "@/lib/spanish-site";

/**
 * One owner page per query family (GSC query x page x device, 2026-10-28..11-25).
 *
 * - "editor de videos cortos fort lauderdale" was split over 10 page/device rows
 *   and none was the Spanish Fort Lauderdale Reels page. Owner:
 *   /es/editor-de-reels-fort-lauderdale.
 * - "short form video editor fort lauderdale": 26 of 26 impressions landed on the
 *   Miami short-form page. Owner: /services/reels-editor-fort-lauderdale.
 * - "reel editor miami": split between the short-form hub (15 @6.3) and the
 *   Reels page (11 @13.4). Owner: /services/reels-editor-miami.
 *
 * Non-owner pages keep their own query, drop the competing city phrase, and
 * link to the owner with the query as anchor text.
 */

const FTL_ES = "/es/editor-de-reels-fort-lauderdale";

function titleText(title: unknown): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title) {
    return String((title as { absolute: string }).absolute);
  }
  return String(title);
}

describe("one owner page per query", () => {
  it("makes the Spanish Fort Lauderdale Reels page own 'editor de videos cortos fort lauderdale'", () => {
    const owner = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    expect(owner).toBeDefined();
    if (!owner) return;
    expect(owner.metadataTitle).toContain("Editor de Reels en Fort Lauderdale");
    // The title stays as PR #821 set it (60-char brand-template limit); the
    // "videos cortos" phrase lives in the H1, lead and description.
    expect(owner.description).toContain("videos cortos");
    expect(owner.h1).toContain("videos cortos en Fort Lauderdale");
    expect(owner.lead).toContain("editor de videos cortos");
  });

  it("stops the Spanish Miami short-form page from claiming Fort Lauderdale and points it to the owner", () => {
    const page = getSpanishNichePage("editor-de-video-corto-para-redes-miami");
    expect(page).toBeDefined();
    if (!page) return;
    expect(page.description).not.toContain("Fort Lauderdale");
    expect(JSON.stringify(page)).toContain(`[editor de videos cortos en Fort Lauderdale](${FTL_ES})`);
  });

  it("links the remote-editing page and both comparison guides to the Fort Lauderdale owners", () => {
    const remote = getSpanishNichePage("contratar-editor-de-video-remoto");
    expect(remote?.projectFit).toContain(`[editor de videos cortos en Fort Lauderdale](${FTL_ES})`);

    const guides = JSON.stringify([...getGuides("en"), ...getGuides("es")]);
    expect(guides).toContain(`[editor de videos cortos en Fort Lauderdale](${FTL_ES})`);
    expect(guides).toContain("[Reels editor in Fort Lauderdale](/services/reels-editor-fort-lauderdale)");
  });

  it("keeps the Miami short-form hub on its own query and hands Reels and Fort Lauderdale to their owners", () => {
    const title = titleText(shortFormMiamiMetadata.title);
    expect(title).toContain("Short-Form Video Editor Miami");
    expect(title).not.toContain("Fort Lauderdale");
    expect(String(shortFormMiamiMetadata.description)).not.toContain("Fort Lauderdale");

    const html = renderToStaticMarkup(React.createElement(ShortFormMiamiPage));
    expect(html).toMatch(/<h1[^>]*>\s*Short-Form Video Editor in Miami/);
    expect(html).toMatch(/href="\/services\/reels-editor-miami"[^>]*>\s*reel editor in Miami\s*</);
    expect(html).toMatch(
      /href="\/services\/reels-editor-fort-lauderdale"[^>]*>\s*short-form video editor in Fort Lauderdale\s*</,
    );
    expect(html).toMatch(/href="\/es\/editor-de-reels-fort-lauderdale"[^>]*>\s*editor de videos cortos en Fort Lauderdale\s*</);
    expect(html).not.toContain("Miami Reels editing page");
  });

  it("keeps the owner titles of the English Reels pages", () => {
    expect(titleText(reelsMiamiMetadata.title)).toContain("Reels Editor Miami");
    expect(String(reelsMiamiMetadata.description)).toMatch(/^Reel editor in Miami/);
    expect(titleText(reelsFtlMetadata.title)).toContain("Reel Editor in Fort Lauderdale");
  });
});
