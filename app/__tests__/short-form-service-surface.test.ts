import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ShortFormVideoEditorPage, {
  metadata,
} from "@/app/(english)/services/short-form-video-editor-miami/page";
import { ServicesStrip } from "@/components/services-strip";

describe("short-form video editing search surface", () => {
  it("publishes distinct metadata and substantive service-area copy", () => {
    const markup = renderToStaticMarkup(
      React.createElement(ShortFormVideoEditorPage),
    );

    expect(metadata.title).toBe("Short-Form Video Editing Miami");
    expect(metadata.description).toContain("supplied footage");
    expect(markup).toContain("Turn supplied footage into platform-ready vertical video.");
    expect(markup).toContain("Broward and Miami-Dade");
    expect(markup).not.toMatch(/street address|studio address/i);
  });

  it("links directly from the homepage services strip", () => {
    const markup = renderToStaticMarkup(React.createElement(ServicesStrip));

    expect(markup).toContain('href="/services/short-form-video-editor-miami"');
  });
});
