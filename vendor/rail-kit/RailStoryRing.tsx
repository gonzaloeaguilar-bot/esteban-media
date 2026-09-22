"use client";

import type { ReactNode } from "react";

export type RailStoryRingProps = {
  name: string;
  image?: { src: string; alt: string };
  media?: ReactNode;
  href?: string;
  /** Draws the ring and the badge. Only when they really are broadcasting. */
  live?: boolean;
  /** The word on the badge. "LIVE", "EN VIVO". */
  liveLabel?: string;
  /** Dims the ring — seen already, finished, offline. */
  seen?: boolean;
  size?: "sm" | "md" | "lg";
  source: string;
  onSelect?: (info: { source: string; name: string }) => void;
  className?: string;
};

/**
 * A round avatar inside a ring: a seller who is broadcasting, a story not yet
 * watched.
 *
 * The ring is the whole message, so it carries a word as well as a colour.
 * "Live" is drawn on a badge and put in the accessible name, because a
 * coloured ring alone says nothing to a screen reader and not much to anyone
 * who does not already know the convention.
 *
 * `live` should track whether they are ACTUALLY broadcasting. A permanent ring
 * is the same trick as a permanent countdown: the first time somebody presses
 * it and nothing is on, the ring never works again.
 */
export default function RailStoryRing({
  name,
  image,
  media,
  href,
  live,
  liveLabel = "Live",
  seen,
  size = "md",
  source,
  onSelect,
  className,
}: RailStoryRingProps) {
  const inner = (
    <>
      <span className="rail-storyring__ring">
        <span className="rail-storyring__avatar">
          {media ?? (image && <img src={image.src} alt="" loading="lazy" decoding="async" />)}
        </span>
        {live && (
          <span className="rail-storyring__badge" aria-hidden="true">
            {liveLabel}
          </span>
        )}
      </span>
      <span className="rail-storyring__name">{name}</span>
      {live && <span className="rail-storyring__sr">— {liveLabel} now</span>}
    </>
  );

  const props = {
    className: ["rail-storyring", className].filter(Boolean).join(" "),
    "data-rail-storyring": source,
    "data-rail-size": size,
    "data-rail-live": live ? "" : undefined,
    "data-rail-seen": seen ? "" : undefined,
    onClick: () => onSelect?.({ source, name }),
  };

  return href ? (
    <a {...props} href={href}>
      {inner}
    </a>
  ) : (
    <button {...props} type="button">
      {inner}
    </button>
  );
}
