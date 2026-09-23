"use client";

import type { ReactNode } from "react";

export type RailTrackItem = {
  id: string;
  title: string;
  /** Who it is by, or the second line: an author, a length, a date. */
  by?: string;
  href?: string;
  art?: { src: string; alt?: string };
  /** Small marks before the second line — downloaded, explicit, exclusive. */
  marks?: { id: string; glyph: ReactNode; label: string }[];
  /** The row currently sounding. Draws the state and names it. */
  playing?: boolean;
  /** Saved, added, in the library. `state` names it; there is no bare tick. */
  saved?: boolean;
};

export type RailTrackProps = {
  items: RailTrackItem[];
  /** What the list is, for a screen reader: "This Is deadmau5, 24 tracks". */
  label: string;
  heading?: string;
  /** Names the playing row for a screen reader: "Now playing". */
  playingLabel?: string;
  /** Names the saved state. Required if any row passes `saved`. */
  savedLabel?: string;
  /**
   * The row menu. `label` takes the track's title because eight buttons all
   * called "More" is a list a screen-reader user cannot navigate: the name has
   * to say which row it belongs to.
   */
  menu?: {
    label: (title: string) => string;
    glyph?: ReactNode;
    onOpen: (id: string) => void;
  };
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A list of tracks, episodes or chapters: a thumbnail, a title, who it is by,
 * and what state the row is in.
 *
 * NOT RailList. That one is for a few different choices, each row a distinct
 * destination with a chevron promising a next screen. This is many rows of the
 * same kind of thing, where the interesting information is the STATE — which
 * one is sounding, which are downloaded, which are saved — and where the row
 * does not lead anywhere new so much as act on what is already open.
 *
 * THE MENU BUTTON IS NAMED AFTER ITS ROW. `menu.label` is a function of the
 * title for one reason: a list of twenty rows each with a button called "More"
 * is unusable with a screen reader, which reads the buttons and not the
 * geometry. "More options for Ghosts 'n' Stuff" costs nothing and is the
 * difference between a navigable list and a wall of identical controls.
 *
 * EVERY STATE IS NAMED, never drawn alone. A green tick that says nothing is a
 * tick whose meaning a sighted regular has learnt and nobody else has; the
 * `savedLabel` and `playingLabel` props exist so the state is heard as well as
 * seen, and each `mark` carries its own label for the same reason.
 */
export default function RailTrack({
  items,
  label,
  heading,
  playingLabel,
  savedLabel,
  menu,
  source,
  onSelect,
  className,
}: RailTrackProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={["rail-track", className].filter(Boolean).join(" ")}
      data-rail-track={source}
    >
      {heading && <h2 className="rail-track__heading">{heading}</h2>}
      <ul className="rail-track__list" aria-label={label}>
        {items.map((item, index) => {
          const body = (
            <>
              {item.art && (
                <img
                  className="rail-track__art"
                  src={item.art.src}
                  alt={item.art.alt ?? ""}
                  loading="lazy"
                />
              )}
              <span className="rail-track__text">
                <span className="rail-track__title">
                  {item.playing && playingLabel && (
                    <span className="rail-sr-only">{playingLabel}: </span>
                  )}
                  {item.title}
                </span>
                {(item.by || item.marks) && (
                  <span className="rail-track__by">
                    {item.marks?.map((mark) => (
                      <span className="rail-track__mark" key={mark.id}>
                        <span aria-hidden="true">{mark.glyph}</span>
                        <span className="rail-sr-only">{mark.label}</span>
                      </span>
                    ))}
                    {item.by}
                  </span>
                )}
              </span>
            </>
          );

          return (
            <li
              className="rail-track__row"
              key={item.id}
              data-rail-playing={item.playing ? "" : undefined}
            >
              {item.href ? (
                <a
                  className="rail-track__link"
                  href={item.href}
                  onClick={() => onSelect?.({ source, id: item.id, index })}
                >
                  {body}
                </a>
              ) : (
                <div className="rail-track__link">{body}</div>
              )}
              {item.saved && savedLabel && (
                <span className="rail-track__saved">
                  <span aria-hidden="true">&#10003;</span>
                  <span className="rail-sr-only">{savedLabel}</span>
                </span>
              )}
              {menu && (
                <button
                  type="button"
                  className="rail-track__menu"
                  onClick={() => menu.onOpen(item.id)}
                >
                  <span aria-hidden="true">{menu.glyph ?? "⋯"}</span>
                  <span className="rail-sr-only">{menu.label(item.title)}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
