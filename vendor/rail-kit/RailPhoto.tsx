"use client";

import type { ReactNode } from "react";

export type RailPhotoProps = {
  image: { src: string; alt: string };
  /**
   * The cutline: what is happening in the picture. REQUIRED, and it is not
   * the alt text — see below.
   */
  caption: ReactNode;
  /**
   * Who took it and who owns it: "(AP Photo/Yuki Iwamura, File)". Separate
   * from the caption because it is a different obligation.
   */
  credit?: ReactNode;
  /** Open it full-screen. The site does the opening. */
  expand?: { label: string; glyph?: ReactNode };
  source: string;
  onExpand?: (info: { source: string }) => void;
  className?: string;
};

/**
 * A photograph, what is happening in it, and who owns it.
 *
 * NOT `RailFigures`, which is two to four labelled NUMBERS in a row — the
 * names collide in English and mean nothing like each other, so this one is
 * called what it holds.
 *
 * `alt` AND `caption` ARE BOTH REQUIRED AND THEY ARE NOT THE SAME TEXT. The
 * caption is for everybody: it says what the picture shows and when. The alt
 * is for somebody who cannot see it, and repeating the caption there makes a
 * screen reader read the same sentence twice in a row — once as the image and
 * once as the text under it. The component cannot write either, so it demands
 * both and refuses to guess.
 *
 * `credit` IS ITS OWN FIELD because it is its own obligation: a wire photo
 * carries a licence, and a licence that lives inside a free-text caption gets
 * edited away by the first person shortening the line. Keeping it separate
 * means a site can style it, audit it, and never lose it.
 *
 * THE EXPAND IS A BUTTON OVER THE PICTURE, not the picture itself. A
 * photograph that opens full-screen when tapped anywhere steals every scroll
 * that starts on it, which on a phone is most of them.
 */
export default function RailPhoto({
  image,
  caption,
  credit,
  expand,
  source,
  onExpand,
  className,
}: RailPhotoProps) {
  return (
    <figure
      className={["rail-photo", className].filter(Boolean).join(" ")}
      data-rail-photo={source}
    >
      <div className="rail-photo__frame">
        <img
          className="rail-photo__art"
          src={image.src}
          alt={image.alt}
          loading="lazy"
        />
        {expand && (
          <button
            type="button"
            className="rail-photo__expand"
            onClick={() => onExpand?.({ source })}
          >
            <span aria-hidden="true">{expand.glyph ?? "⤢"}</span>
            <span className="rail-sr-only">{expand.label}</span>
          </button>
        )}
      </div>
      <figcaption className="rail-photo__caption">
        {caption}
        {credit && <span className="rail-photo__credit">{credit}</span>}
      </figcaption>
    </figure>
  );
}
