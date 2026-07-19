import { describe, expect, it } from "vitest";

import { getPairedLanguageRoute } from "@/lib/language-routes";

describe("getPairedLanguageRoute", () => {
  it("keeps portfolio visitors on the same work in the other language", () => {
    expect(getPairedLanguageRoute("/portfolio/healthy-smile")).toBe(
      "/es/portafolio/healthy-smile",
    );
    expect(getPairedLanguageRoute("/es/portafolio/healthy-smile")).toBe(
      "/portfolio/healthy-smile",
    );
  });

  it("maps every guide to its localized companion", () => {
    const pairs = [
      ["/guides", "/es/guias"],
      [
        "/guides/prepare-footage-for-video-editing",
        "/es/guias/preparar-material-para-edicion-de-video",
      ],
      [
        "/guides/write-a-useful-video-brief",
        "/es/guias/como-escribir-un-brief-util-de-video",
      ],
      [
        "/guides/vertical-horizontal-video-exports-and-safe-zones",
        "/es/guias/video-vertical-horizontal-y-zonas-seguras",
      ],
      [
        "/guides/remote-video-editing-handoff",
        "/es/guias/entrega-para-edicion-remota-de-video",
      ],
    ] as const;

    for (const [englishPath, spanishPath] of pairs) {
      expect(getPairedLanguageRoute(englishPath)).toBe(spanishPath);
      expect(getPairedLanguageRoute(spanishPath)).toBe(englishPath);
    }
  });

  it("keeps privacy visitors on the localized privacy notice", () => {
    expect(getPairedLanguageRoute("/privacy")).toBe("/es/privacidad");
    expect(getPairedLanguageRoute("/es/privacidad")).toBe("/privacy");
  });

  it("falls back to the other-language home for unpaired routes", () => {
    expect(getPairedLanguageRoute("/unknown")).toBe("/es");
    expect(getPairedLanguageRoute("/es/sin-pareja")).toBe("/");
  });
});
