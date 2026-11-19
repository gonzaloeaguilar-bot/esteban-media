import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ReelsEditorMiamiPage from "../(english)/services/reels-editor-miami/page";

describe("Miami Reels hero proof", () => {
  it("shows a current published Reel in the server-rendered opening", () => {
    const html = renderToStaticMarkup(React.createElement(ReelsEditorMiamiPage));

    expect(html).toContain("A recent published Reel");
    expect(html).toContain("The Great Reviewer Reel");
    expect(html).toContain("great-reviewer-iphone-18.jpg");
    expect(html).not.toContain("Miami short-form intent");
  });
});
