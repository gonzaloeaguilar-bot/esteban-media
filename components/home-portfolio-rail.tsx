"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rail, type RailItem } from "@/vendor/rail-kit";
import { ReelFunnel, type ReelFunnelReel } from "@/components/reel-funnel";
import { RAIL_LABELS_EN, RAIL_LABELS_ES } from "@/components/em-rails";

/**
 * The homepage's selected work, as a rail.
 *
 * This is the first thing a visitor sees, and it was a 3-up grid: on a phone
 * that is six stacked cards — roughly four screens of scrolling before the
 * page gets to say anything else. A rail puts the same six in one strip you
 * push sideways, which is how a catalogue of things-you-look-at is meant to
 * behave.
 *
 * Every string the grid rendered is still rendered here: category, title,
 * location, and the same destination for each card. This component chooses
 * layout and never wording.
 */

export type HomePortfolioCard = {
  id: string;
  /** Portrait reel photograph: may fill a tall frame (see globals.css). */
  isReel?: boolean;
  /** Explicit device treatment for a vertical video case that is not a property Reel. */
  phoneFrame?: boolean;
  /** A landscape video shown in a phone gets a player surface, never a crop. */
  videoSurface?: boolean;
  /** Visible player chrome must identify the work without guessing a channel. */
  videoSurfaceLabel?: string;
  /** The shell names the real source rather than presenting every film as YouTube. */
  videoSurfaceBrand?: "youtube" | "instagram";
  /** The reel's MP4. Present only on reels; makes the card open a player. */
  videoSrc?: string;
  /** A published YouTube reel: opens in the same player sheet as local MP4s. */
  embedUrl?: string;
  /** The player respects the film's own frame independently of its card shell. */
  playerAspect?: "landscape";
  href: string;
  title: string;
  eyebrow: string;
  /** Verified location context only; absent for items that have none. */
  location?: string;
  /** Local approved still; absent for items with no poster. */
  poster?: string;
  /** What the still shows, for people who cannot see it. */
  posterAlt?: string;
};

export function HomePortfolioRail({
  locale,
  items,
  source = "home_portfolio",
}: {
  locale: "en" | "es";
  items: HomePortfolioCard[];
  /** Surface name for delegated analytics; the same work shelf also appears in guides. */
  source?: string;
}) {
  const isSpanish = locale === "es";
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [openReel, setOpenReel] = useState<ReelFunnelReel | null>(null);
  const [litId, setLitId] = useState<string | null>(null);

  /** A reel card PLAYS instead of navigating.
      It used to be a link to the reels service page: the visitor asked to see
      the video and got a page. The anchor stays in the markup — it is the
      crawlable route to that page and the no-JS fallback — and the click is
      intercepted only when we have a file to play. */
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const byId = new Map(items.filter((i) => i.videoSrc || i.embedUrl).map((i) => [i.id, i]));
    if (byId.size === 0) return;

    function onClick(event: MouseEvent) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      const card = (event.target as HTMLElement)?.closest<HTMLElement>(".rail-card");
      const id = card?.getAttribute("data-rail-card");
      const item = id ? byId.get(id) : undefined;
      if (!item || (!item.videoSrc && !item.embedUrl) || !item.poster) return;
      event.preventDefault();
      // The rail preview is an autoplaying YouTube iframe.  Leaving it mounted
      // while the full player opens creates two players for the same video;
      // iPhone can then leave the player the visitor tapped paused.  Tear down
      // the preview first, so the user gesture creates one unambiguous player.
      setLitId(null);
      setOpenReel({
        id: item.id,
        title: item.title,
        src: item.videoSrc,
        embedUrl: item.embedUrl,
        aspect: item.playerAspect,
        poster: item.poster,
      });
    }

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [items]);

  /** SPOTLIGHT. On a strip you push sideways, the card under your thumb is the
      one you are actually looking at, and every other card competes with it.
      The most-centred card in the scroller is marked so CSS can lift it and
      let the rest sit back. Measured against the SCROLLER, not the viewport:
      a horizontal rail's off-screen cards still intersect the page vertically,
      so a viewport-rooted observer would light several at once. */
  useEffect(() => {
    const scroller = wrapRef.current?.querySelector<HTMLElement>(".rail__scroller");
    if (!scroller) return;
    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".rail-card"));
    if (cards.length === 0) return;

    let frame = 0;
    const mark = () => {
      frame = 0;
      if (!railVisible) return;
      const box = scroller.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      let best: HTMLElement | null = null;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        if (r.right < box.left || r.left > box.right) continue;
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) { bestDist = d; best = card; }
      }
      for (const card of cards) {
        if (card === best) card.setAttribute("data-em-spotlight", "true");
        else card.removeAttribute("data-em-spotlight");
      }
      setLitId(best?.getAttribute("data-rail-card") ?? null);
    };
    /* The spotlight is measured INSIDE the scroller, so a card is "most
       centred" even while the whole rail is far off screen — which mounted a
       clip on page load and broke the promise that nothing is fetched until
       you arrive. The lit id is therefore gated on the RAIL being in the
       viewport; off screen there is no lit card and no video. */
    let railVisible = false;
    const railIO = new IntersectionObserver(
      ([entry]) => {
        railVisible = entry.isIntersecting;
        if (!railVisible) {
          setLitId(null);
          for (const card of cards) card.removeAttribute("data-em-spotlight");
        } else {
          mark();
        }
      },
      { threshold: 0.15 },
    );
    railIO.observe(scroller);

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(mark); };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      railIO.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  /** THE SPOTLIT CARD PLAYS.
      A rail of still posters on a video editor's homepage is the same defect
      the reel shelf had: the work does not move. So the card currently in the
      spotlight mounts its own clip — ONE at a time, only the lit one, and only
      where there is a file. Every other card stays a poster, so the shelf is
      still never fetched up front. Skipped entirely under reduced motion. */
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Safari can leave an embedded YouTube preview on its thumbnail even with
      autoplay=1 when it first appears inside a horizontal scroller. Give the
      muted preview the IFrame API and explicitly begin it after load. */
  const previewUrl = (embedUrl: string) => {
    if (typeof window === "undefined") return embedUrl;
    const url = new URL(embedUrl);
    url.searchParams.set("enablejsapi", "1");
    url.searchParams.set("origin", window.location.origin);
    return url.toString();
  };

  const startPreview = (iframe: HTMLIFrameElement) => {
    const command = (func: "mute" | "playVideo") =>
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: "" }),
        "https://www.youtube-nocookie.com",
      );
    command("mute");
    command("playVideo");
  };

  const railItems: RailItem[] = items.map((item) => ({
    kind: "media",
    id: item.id,
    // Playing in the in-place Reel viewer and looking like a phone are related
    // but not identical. The lead Great Reviewer iPhone case is a published
    // vertical video without a property-Reel MP4, so it opts into the same
    // device presentation explicitly.
    phoneFrame: item.phoneFrame ?? item.isReel,
    href: item.href,
    title: item.title,
    // The category rides in the BODY, not over the picture. Every still in this
    // rail is a website screenshot with headline type in it, so a badge laid on
    // the photograph always covers a word: at the top it sat on "Inspected by a
    // mechanic.", at the foot on "Backed by a warranty." There is no safe
    // corner on a picture that is itself text.
    meta: item.eyebrow,
    metaPlacement: "block",
    // The grid showed the location under the title; keep it there.
    subtitle: item.location,
    // `image` is required by the media shape, but the rail never renders it
    // when `media` is present — next/image owns the box instead, so the
    // homepage keeps its LCP optimisation, its srcset and its lazy loading.
    image: { src: item.poster ?? "", alt: "" },
    media: item.poster ? (
      <>
        {/* A slow warm sweep across the cover. Three passes, then it stops:
            an animation that never ends stops being a highlight and becomes
            wallpaper — and on a rail of six it would be six things moving at
            once. The kit guards it behind prefers-reduced-motion. */}
        <span data-rail-shimmer aria-hidden="true" className="absolute inset-0 z-[1]" />
        {item.videoSrc && item.id === litId && !reduced ? (
          <video
            key={`${item.id}-spot`}
            src={item.videoSrc}
            poster={item.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            className="em-cartel-spot-video pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
          />
        ) : null}
        {/* The grid this replaces opened each card link with a screen-reader
            -only verb, so the link announced "Watch <title>" rather than just
            the title. Dropping it was a real loss — caught by diffing the
            rendered text against production, which showed six "Watch"/"Ver"
            missing per page. The figure is the first thing inside the card's
            anchor, so putting it back here restores the exact same reading
            order. `rail-sr-only` is the kit's own hidden-text class. */}
        <span className="rail-sr-only">{isSpanish ? "Ver " : "Watch "}</span>
        {item.videoSurface ? (
          <span className="em-phone-video" aria-hidden="true">
            <span className="em-phone-video__top">
              <span className={`em-phone-video__wordmark em-phone-video__wordmark--${item.videoSurfaceBrand ?? "youtube"}`}>
                {item.videoSurfaceBrand === "instagram" ? "Instagram" : "YouTube"}
              </span>
              <span className="em-phone-video__live">Now playing</span>
            </span>
            <span className="em-phone-video__screen">
              {item.embedUrl && item.id === litId && !reduced ? (
                <iframe
                  className="em-phone-video__embed"
                  src={previewUrl(item.embedUrl)}
                  title={`${item.title} preview`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  tabIndex={-1}
                  onLoad={(event) => startPreview(event.currentTarget)}
                />
              ) : (
                <Image src={item.poster} alt="" fill sizes="(min-width: 768px) 380px, 78vw" className="em-phone-video__poster" />
              )}
            </span>
            <span className="em-phone-video__info">
              <strong>{item.title}</strong>
              <span>{item.videoSurfaceLabel ?? item.eyebrow}</span>
            </span>
          </span>
        ) : (
          <Image
            src={item.poster}
            // Describes the still (a frame from the video), not the title that
            // follows it. Empty before 2026-10-14, when the human audit counted
            // 14 rail images with no alt text.
            alt={item.posterAlt ?? ""}
            fill
            // The card renders at min(380px, 78vw) on this rail — the lg width
            // set in globals.css — so the srcset hint matches what is actually
            // shown (the previous 332px values described a layout two
            // generations back).
            sizes="(min-width: 768px) 380px, 78vw"
            className="object-cover"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
        />
      </>
    ) : undefined,
  }));

  return (
    <div ref={wrapRef}>
    <Rail
      items={railItems}
      source={`${source}_${locale}`}
      variant="poster"
      size="lg"
      titleAs="h3"
      cta="none"
      // The whole card is already a link, so a button would be a second way in
      // rather than a new one. `none` keeps the card quiet and clickable.
      ariaLabel={isSpanish ? "Trabajo seleccionado" : "Selected work"}
      /* No "1 of 14". Owner, 2026-10-12: "remove also the counter for the
         scrolling, we don't need it for the project carousel." The kit only
         renders the counter when labels.position exists, so it is dropped
         here rather than by editing vendor/rail-kit — that directory is
         synced from the shared library and a local edit would be overwritten
         on the next sync, and would silently remove the counter from every
         other brand that vendors the kit. The arrows and their accessible
         labels are untouched. */
      labels={(({ position: _drop, ...rest }) => rest)(
        isSpanish ? RAIL_LABELS_ES : RAIL_LABELS_EN,
      )}
      showControls
    />
    <ReelFunnel
      reel={openReel}
      playlist={items
        .filter((i) => (i.videoSrc || i.embedUrl) && i.poster)
        .map((i) => ({
          id: i.id,
          title: i.title,
          src: i.videoSrc,
          embedUrl: i.embedUrl,
          aspect: i.playerAspect,
          poster: i.poster!,
        }))}
      locale={locale}
      onClose={() => setOpenReel(null)}
      onSelect={setOpenReel}
    />
    </div>
  );
}
