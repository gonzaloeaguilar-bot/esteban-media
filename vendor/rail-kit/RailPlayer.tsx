"use client";

import { useState, type ReactNode } from "react";

export type RailPlayerProps = {
  /** The embed, built only once somebody presses play. */
  embedUrl: string;
  /** The still frame. A player with no poster is a black box. */
  poster: { src: string; alt: string };
  title: string;
  /** Small line under the title — a show, a date, a duration. */
  meta?: string;
  /** The play control's accessible name, e.g. "Play — Ecuavisa interview". */
  playLabel?: string;
  /** The consumer's own mark inside the play disc. Defaults to a triangle. */
  playGlyph?: ReactNode;
  source: string;
  onPlay?: (info: { source: string; title: string }) => void;
  className?: string;
};

/**
 * A video that does not load until somebody wants it — a facade.
 *
 * An embedded YouTube or Vimeo player costs hundreds of kilobytes and a pile
 * of third-party cookies on a page nobody may ever press play on. This renders
 * a still and a button, and builds the iframe on the first press.
 *
 * ON THE PLAY DISC being opaque: it started as a white glyph on a black disc
 * at 34% — translucent, so its real contrast depended on whichever frame sat
 * underneath, and against a pale mount it measured 1.06:1. A control whose
 * legibility is decided by a photograph is not a control. Opaque disc, ink
 * glyph, 15:1 whatever the picture does.
 */
export default function RailPlayer({
  embedUrl,
  poster,
  title,
  meta,
  playLabel,
  playGlyph,
  source,
  onPlay,
  className,
}: RailPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div
        className={["rail-player", className].filter(Boolean).join(" ")}
        data-rail-player={source}
        data-rail-playing=""
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={["rail-player", className].filter(Boolean).join(" ")}
      data-rail-player={source}
      onClick={() => {
        setPlaying(true);
        onPlay?.({ source, title });
      }}
    >
      <span className="rail-player__shot">
        <img src={poster.src} alt={poster.alt} loading="lazy" decoding="async" />
        <span className="rail-player__mark" aria-hidden="true">
          {playGlyph ?? "▶"}
        </span>
      </span>
      <span className="rail-player__title">{title}</span>
      {meta && <span className="rail-player__meta">{meta}</span>}
      <span className="rail-player__sr">{playLabel ?? `Play — ${title}`}</span>
    </button>
  );
}
