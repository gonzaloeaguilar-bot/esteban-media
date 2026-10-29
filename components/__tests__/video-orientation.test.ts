import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PORTFOLIO_ITEMS, mediaOrientation } from "@/lib/portfolio";
import { cardOrientation } from "@/components/home-portfolio-rail";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

/**
 * Vertical video must fill the phone card and open in a 9:16 stage.
 *
 * Owner, 2026-10-28, with screenshots ("todo tiene el problema"): every clip
 * in the homepage rail sat in one 16:9 strip in the top third of the phone
 * ("se ven pequeños"), and the player cropped a vertical Reel to a slice
 * ("cuando lo abro se ve terrible"). Most of this portfolio is 9:16, so each
 * item now declares its orientation and both surfaces size from it.
 *
 * Orientation evidence (2026-10-28): ffprobe on the eight local MP4s gives
 * 720x1280 / 576x1024; `youtube.com/shorts/<id>` answers 200 for a real Short
 * and 303-redirects to /watch for a landscape film.
 */
describe("vertical video orientation", () => {
  it("derives portrait only from a declared vertical aspect", () => {
    expect(mediaOrientation({ kind: "youtube", videoId: "x", url: "https://www.youtube.com/watch?v=x", poster: "/portfolio/x.jpg", uploadDate: "2026-01-01", duration: "PT1S", aspect: "9:16" })).toBe("portrait");
    expect(mediaOrientation({ kind: "youtube", videoId: "x", url: "https://www.youtube.com/watch?v=x", poster: "/portfolio/x.jpg", uploadDate: "2026-01-01", duration: "PT1S", aspect: "16:9" })).toBe("landscape");
    expect(mediaOrientation({ kind: "video", src: "/x.mp4", poster: "/x.jpg", aspect: "4:5" })).toBe("portrait");
    expect(mediaOrientation({ kind: "image", src: "/x.jpg" } as never)).toBe("landscape");
  });

  it("marks the verified YouTube Shorts as 9:16 and the films as 16:9", () => {
    const byId = new Map(PORTFOLIO_ITEMS.map((item) => [item.id, item.media]));
    const aspectOf = (id: string) => {
      const media = byId.get(id);
      return media && "aspect" in media ? media.aspect : undefined;
    };
    // youtube.com/shorts/<id> -> 200
    expect(aspectOf("gains-from-geebs-shorts")).toBe("9:16");
    expect(aspectOf("healthy-smile")).toBe("9:16");
    expect(aspectOf("ml-colombia")).toBe("9:16");
    // youtube.com/shorts/<id> -> 303 to /watch
    expect(aspectOf("great-reviewer-iphone-18")).toBe("16:9");
    expect(aspectOf("bar-door-monkey")).toBe("16:9");
    expect(aspectOf("my-dler")).toBe("16:9");
  });

  it("resolves a card's orientation explicitly, then from the legacy flag, then to portrait", () => {
    expect(cardOrientation({ orientation: "landscape" })).toBe("landscape");
    expect(cardOrientation({ orientation: "portrait", playerAspect: "landscape" })).toBe("portrait");
    expect(cardOrientation({ playerAspect: "landscape" })).toBe("landscape");
    expect(cardOrientation({})).toBe("portrait");
  });

  it("declares orientation on every homepage rail item", () => {
    const teaser = read("components/portfolio-teaser.tsx");
    expect(teaser).toContain('playerAspect: "landscape" as const,\n                orientation: "landscape" as const,');
    expect(teaser).toContain('videoSrc: "/portfolio/sony-a7iv-unboxing.mp4",');
    expect(teaser.indexOf('orientation: "portrait" as const', teaser.indexOf("sony-a7iv-unboxing.mp4"))).toBeGreaterThan(-1);
    expect(teaser).toContain("isReel: true,\n              videoSrc: reel.src,");
    expect(teaser).toContain("orientation: mediaOrientation(item.media),");
  });

  it("lets a portrait clip own the whole phone screen in the rail and keeps a film whole", () => {
    const rail = read("components/home-portfolio-rail.tsx");
    const css = read("app/globals.css");
    expect(rail).toContain('data-orientation={cardOrientation(item)}');
    expect(rail).toContain("orientation: cardOrientation(item),");
    expect(rail).toContain("orientation: cardOrientation(i),");
    expect(css).toContain('.em-phone-video[data-orientation="portrait"] .em-phone-video__screen { position: absolute; inset: 0; aspect-ratio: auto; }');
    expect(css).toContain('.em-phone-video[data-orientation="portrait"] .em-phone-video__embed { top: 50%; bottom: auto; height: auto; aspect-ratio: 9 / 16; transform: translateY(-50%); }');
    expect(css).toContain('.em-phone-video[data-orientation="landscape"] .em-phone-video__screen { align-self: center; }');
  });

  it("gives the player a true 9:16 stage that never crops and a 16:9 stage for films", () => {
    const funnel = read("components/reel-funnel.tsx");
    const cinema = read("app/cinema.css");
    expect(funnel).toContain('orientation?: "portrait" | "landscape";');
    expect(funnel).toContain('data-orientation={landscape ? "landscape" : "portrait"}');
    // The phone layout: full width, capped by height, centred; no 48dvh cap
    // and no cover, which together produced the cropped slice.
    expect(cinema).toContain("width: min(100%, calc(86svh * 9 / 16));");
    expect(cinema).not.toContain("max-height: min(48dvh, 420px);");
    const videoRule = cinema.slice(cinema.indexOf(".em-funnel__video {"), cinema.indexOf("}", cinema.indexOf(".em-funnel__video {")));
    expect(videoRule).toContain("object-fit: contain");
    expect(videoRule).not.toContain("object-fit: cover");
    // Desktop keeps #611's bounded, centred 9:16 cell and the side panel.
    expect(cinema).toContain(".em-funnel__media:not(.em-funnel__media--landscape)");
    expect(cinema).toContain("grid-template-columns: minmax(0, 1.35fr) minmax(340px, .85fr)");
  });

  it("sizes the portfolio page players from the same orientation", () => {
    for (const path of ["components/portfolio-video.tsx", "components/portfolio-video-modal.tsx", "components/portfolio-watch-page.tsx"]) {
      const source = read(path);
      expect(source, path).toContain('"mx-auto aspect-[9/16]" : "aspect-video"');
      expect(source, path).toContain('width: "min(100%, calc(86svh * 9 / 16))"');
    }
    expect(read("components/portfolio-grid.tsx")).toContain("orientation={mediaOrientation(item.media)}");
  });
});
