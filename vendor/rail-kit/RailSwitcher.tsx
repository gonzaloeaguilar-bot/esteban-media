"use client";

import type { ReactNode } from "react";

export type RailSwitcherPlace = {
  id: string;
  /** The place's name. It IS the button's name — see below. */
  name: string;
  href: string;
  image?: { src: string; alt?: string };
  /** Initials or a mark, when there is no picture. */
  glyph?: ReactNode;
  /** Something unseen in there. */
  unread?: boolean;
  /** How many are waiting for this person by name. */
  count?: number;
};

export type RailSwitcherProps = {
  places: RailSwitcherPlace[];
  /** Which one you are in. */
  activeId?: string;
  /** What the rail is: "Your servers". */
  label: string;
  /** The word for unseen activity: "unread". */
  unreadLabel: string;
  /** The last button: joining or making one. */
  add?: { label: string; href?: string };
  /**
   * The locale the counts are written in. A badge is a number, and a number
   * is not the same glyphs everywhere: 1,200 is 1.200 in half of Europe and
   * ١٢٠٠ in Arabic.
   */
  locale?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  onAdd?: (info: { source: string }) => void;
  className?: string;
};

/**
 * The column of places you can be in, down the edge of the screen.
 *
 * THE PICTURE IS NEVER THE NAME. A rail of avatars reads as a rail of
 * unlabelled squares to anybody who cannot see them, and as a memory test to
 * anybody who joined more than five: the name goes in the accessible name,
 * always, and `alt` on the image stays empty so it is not read twice.
 *
 * SELECTED AND UNREAD ARE TWO DIFFERENT MARKS — a bar at the leading edge for
 * where you are, a dot for what has happened. Drawing both as the same pill
 * is how a person clicks into a room they were already in, looking for news
 * that was somewhere else.
 *
 * IT SCROLLS, SO IT IS FOCUSABLE. A vertical rail longer than the screen that
 * a keyboard cannot scroll hides everything past the fold even though each
 * item is tabbable.
 */
export default function RailSwitcher({
  places,
  activeId,
  label,
  unreadLabel,
  add,
  locale,
  source,
  onSelect,
  onAdd,
  className,
}: RailSwitcherProps) {
  if (places.length === 0) return null;
  const nf = new Intl.NumberFormat(locale);

  return (
    <nav
      className={["rail-switcher", className].filter(Boolean).join(" ")}
      data-rail-switcher={source}
      aria-label={label}
    >
      <ul className="rail-switcher__list" tabIndex={0}>
        {places.map((place) => (
          <li className="rail-switcher__cell" key={place.id}>
            <a
              className="rail-switcher__place"
              href={place.href}
              data-rail-unread={place.unread ? "" : undefined}
              aria-current={place.id === activeId ? "page" : undefined}
              onClick={() => onSelect?.({ source, id: place.id })}
            >
              {place.image ? (
                <img
                  className="rail-switcher__art"
                  src={place.image.src}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <span className="rail-switcher__glyph" aria-hidden="true">
                  {place.glyph}
                </span>
              )}
              <span className="rail-sr-only">
                {place.name}
                {place.unread
                  ? `, ${
                      typeof place.count === "number"
                        ? `${nf.format(place.count)} ${unreadLabel}`
                        : unreadLabel
                    }`
                  : ""}
              </span>
              {place.unread && (
                <span className="rail-switcher__dot" aria-hidden="true" />
              )}
              {typeof place.count === "number" && (
                <span className="rail-switcher__count" aria-hidden="true">
                  {nf.format(place.count)}
                </span>
              )}
            </a>
          </li>
        ))}

        {add && (
          <li className="rail-switcher__cell">
            {add.href ? (
              <a className="rail-switcher__add" href={add.href}>
                <span aria-hidden="true">+</span>
                <span className="rail-sr-only">{add.label}</span>
              </a>
            ) : (
              <button
                type="button"
                className="rail-switcher__add"
                onClick={() => onAdd?.({ source })}
              >
                <span aria-hidden="true">+</span>
                <span className="rail-sr-only">{add.label}</span>
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
