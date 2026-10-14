"use client";

import { Play } from "lucide-react";
import { useState } from "react";

/**
 * Click-to-load YouTube player for the hero of a case study or portfolio page.
 *
 * The parent already server-renders the poster with next/image (priority, so
 * it stays the LCP element). This overlays a play button on that poster and
 * builds the youtube-nocookie iframe only when somebody presses it.
 *
 * Why (overnight loop row 51, 2026-10-14): the eager iframe cost every visit
 * 588 KiB of unused JavaScript (PageSpeed mobile on /case-studies/healthy-smile)
 * and 8-10 YouTube requests, on the pages ChatGPT referrals land on. The
 * VideoObject JSON-LD, title and description are built elsewhere and do not
 * depend on the iframe being in the HTML.
 *
 * Same pattern as components/portfolio-video.tsx and rail-kit RailPlayer; this
 * one keeps the parent's next/image poster instead of a lazy <img>, which
 * would delay the hero's largest paint.
 */
export function YouTubeFacade({
  videoId,
  title,
  playLabel,
  source,
}: {
  videoId: string;
  /** Accessible name of the iframe once it is built. */
  title: string;
  /** Accessible name of the play button, e.g. "Play Healthy Smile Miami". */
  playLabel: string;
  /** data-cta value, so the press is measured as a cta_click. */
  source: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 size-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?playsinline=1&rel=0&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      data-cta={source}
      data-video-facade={videoId}
      aria-label={playLabel}
      className="group absolute inset-0 flex size-full cursor-pointer items-center justify-center bg-gradient-to-t from-black/45 via-transparent to-black/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-white text-[#101214] shadow-xl transition group-hover:scale-105 sm:size-20">
        <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
      </span>
    </button>
  );
}
