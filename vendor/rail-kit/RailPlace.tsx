"use client";

import type { ReactNode } from "react";

export type RailPlaceProps = {
  /**
   * The map, as the site's own node — a static image, an embed it already
   * pays for, a canvas. The kit draws no map and ships no tile provider: a
   * component that picked one would put every consumer on that bill and in
   * that privacy policy.
   */
  map?: ReactNode;
  /** How long it takes, already phrased: "9 min drive". */
  travel?: { label: string; glyph?: ReactNode };
  /** How far, already phrased: "4.6 mi". */
  distance?: string;
  /** The address, as it is written where the place is. */
  address: ReactNode;
  /**
   * What you can do about it: directions, a call, a save. The FIRST is drawn
   * as the primary one.
   */
  actions?: { id: string; label: string; href?: string; glyph?: ReactNode }[];
  /** What the whole thing is, for a screen reader: "Where it is". */
  label: string;
  heading?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * Where it is, how far, and how to get there.
 *
 * THE MAP IS A SLOT AND ALWAYS WILL BE. Tiles cost money and carry a privacy
 * policy; a kit that picked a provider would put every brand on that bill and
 * in that policy, silently. Pass an image, an embed, or nothing.
 *
 * THE ADDRESS IS REQUIRED AND IS NEVER REPLACED BY THE MAP. A picture of a
 * street is not an address: it cannot be copied, pasted into another app,
 * read aloud, or posted through a letterbox, and it is worth nothing at all
 * to a screen reader. Whatever the map does, the words stay.
 *
 * `travel` ARRIVES PHRASED. "9 min drive" depends on the mode, the traffic,
 * the time of day and the language, and a component that formats it invents
 * three of those four.
 */
export default function RailPlace({
  map,
  travel,
  distance,
  address,
  actions,
  label,
  heading,
  source,
  onSelect,
  className,
}: RailPlaceProps) {
  return (
    <section
      className={["rail-place", className].filter(Boolean).join(" ")}
      data-rail-place={source}
      aria-label={label}
    >
      {heading && <h2 className="rail-place__heading">{heading}</h2>}

      {map && (
        <div className="rail-place__map" aria-hidden="true">
          {map}
        </div>
      )}

      <div className="rail-place__where">
        {(travel || distance) && (
          <p className="rail-place__travel">
            {travel && (
              <span className="rail-place__time">
                {travel.glyph && (
                  <span className="rail-place__glyph" aria-hidden="true">
                    {travel.glyph}
                  </span>
                )}
                {travel.label}
              </span>
            )}
            {distance && (
              <span className="rail-place__distance">{distance}</span>
            )}
          </p>
        )}
        <address className="rail-place__address">{address}</address>
      </div>

      {/* The row scrolls, so it must be focusable: a keyboard cannot move a
          scroller it cannot reach, and the actions past the edge become
          unreachable even though every one of them is tabbable. */}
      {actions && actions.length > 0 && (
        <ul className="rail-place__actions" tabIndex={0}>
          {actions.map((action, index) => (
            <li className="rail-place__action-cell" key={action.id}>
              {action.href ? (
                <a
                  className="rail-place__action"
                  data-rail-primary={index === 0 ? "" : undefined}
                  href={action.href}
                  onClick={() => onSelect?.({ source, id: action.id })}
                >
                  {action.glyph && (
                    <span className="rail-place__glyph" aria-hidden="true">
                      {action.glyph}
                    </span>
                  )}
                  {action.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="rail-place__action"
                  data-rail-primary={index === 0 ? "" : undefined}
                  onClick={() => onSelect?.({ source, id: action.id })}
                >
                  {action.glyph && (
                    <span className="rail-place__glyph" aria-hidden="true">
                      {action.glyph}
                    </span>
                  )}
                  {action.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
