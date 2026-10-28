import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/portfolio-teaser.tsx"), "utf8");
const rail = readFileSync(join(process.cwd(), "components/home-portfolio-rail.tsx"), "utf8");
const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

describe("homepage portfolio rail", () => {
  it("leads with The Great Reviewer, excludes the two removed projects, and keeps the rail reusable", () => {
    expect(source).toContain('source = "home_portfolio"');
    expect(source).toContain('source={source}');
    expect(source).toContain('HOMEPAGE_RAIL_EXCLUDED_IDS = new Set(["la-huelga", "banacol", "ml-colombia"])');
    expect(source).toContain('HOMEPAGE_RAIL_FEATURED_ID = "great-reviewer-iphone-18"');
    expect(source).toContain('!HOMEPAGE_RAIL_EXCLUDED_IDS.has(item.id)');
    expect(source).toContain('item.id !== HOMEPAGE_RAIL_FEATURED_ID');
    expect(source.indexOf("featuredItem ? [featuredItem]")).toBeLessThan(
      source.indexOf("REELS_IN_DISPLAY_ORDER.map"),
    );
    expect(source.indexOf("REELS_IN_DISPLAY_ORDER.map")).toBeLessThan(
      source.indexOf("...items.map((item) => {"),
    );
  });

  it("uses the locally mirrored YouTube preview for the lead card", () => {
    const portfolio = readFileSync(join(process.cwd(), "lib/portfolio.ts"), "utf8");
    expect(portfolio).toContain('poster: "/portfolio/great-reviewer-iphone-18.jpg"');
    expect(portfolio).toContain("Exact YouTube preview, mirrored locally");
  });

  it("gives the Great Reviewer lead and video work an iPhone-shaped card without cropping landscape people", () => {
    expect(source).toContain('phoneFrame: true');
    expect(rail).toContain('phoneFrame: item.phoneFrame ?? item.isReel');
    expect(css).toContain('.em-cartel .rail-card[data-rail-phone-frame="true"] {');
    expect(css).toContain('.em-cartel .rail-card[data-rail-phone-frame="true"]::before');
    expect(css).toContain('border: clamp(7px, 1.5vw, 10px) solid #080809;');
    expect(css).toContain('width: clamp(56px, 15vw, 68px);');
    expect(css).toContain('padding-top: clamp(50px, 13vw, 64px);');
    expect(css).toContain('.em-cartel .rail-card[data-rail-phone-frame="true"] .rail-card__figure');
    expect(css).toContain('object-fit: contain !important;');
    expect(css).toContain('object-fit: cover !important;');
    expect(rail).toContain('videoSurface?: boolean;');
    expect(rail).toContain('className="em-phone-video"');
    expect(rail).toContain('item.embedUrl && item.id === litId && !reduced');
    expect(rail).toContain('setLitId(null);');
    expect(rail).not.toContain('em-phone-video__controls');
    expect(rail).not.toContain('bg-[var(--em-accent-ink)] text-white');
    expect(css).toContain('.em-phone-video__screen');
    expect(css).toContain('aspect-ratio: 16 / 9;');
    expect(source).toContain('phoneFrame: isVideoWork');
    expect(source).toContain('videoSurface: isVideoWork');
  });

  it("opens the Great Reviewer YouTube reel in the same autoplaying carousel sheet", () => {
    expect(source).toContain('embedUrl: "https://www.youtube-nocookie.com/embed/BDRru8eXaj4?autoplay=1&mute=1&playsinline=1&loop=1&playlist=BDRru8eXaj4&rel=0"');
    expect(rail).toContain('i.videoSrc || i.embedUrl');
    expect(rail).toContain('embedUrl: item.embedUrl');
    expect(rail).toContain('embedUrl: i.embedUrl');
    expect(rail).toContain('phoneFrame: item.phoneFrame ?? item.isReel');
  });

  it("passes every public YouTube social video into the centred muted player", () => {
    expect(source).toContain('const isYouTubeVideo = item.media.kind === "youtube";');
    expect(source).toContain('https://www.youtube-nocookie.com/embed/${item.media.videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${item.media.videoId}&rel=0');
    expect(source).toContain('Instagram does not provide an equivalent');
  });

  it("gives every real carousel video the phone treatment and plays supported sources", () => {
    expect(source).toContain('const isSelfHostedVideo = item.media.kind === "video";');
    expect(source).toContain('const isVideoWork = isYouTubeVideo || isInstagramVideo || isSelfHostedVideo;');
    expect(source).toContain('videoSrc: item.media.kind === "video" ? item.media.src : undefined');
    expect(rail).toContain('videoSurfaceBrand?: "youtube" | "instagram";');
    expect(rail).toContain('item.videoSurfaceBrand === "instagram" ? "Instagram" : "YouTube"');
  });
});
