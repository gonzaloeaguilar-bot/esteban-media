"use client";

import type { ReactNode } from "react";

export type RailSpotProps = {
  /** The place's name. */
  name: string;
  href: string;
  image?: { src: string; alt?: string };
  /**
   * What somebody said, pulled onto the picture. A QUOTE, not a summary: the
   * marks are drawn by the component so nothing can pass its own prose off as
   * somebody else's words.
   */
  quote?: {
    text: string;
    /** What it is about — the dish, the room, the service. */
    about?: string;
    /** The faces behind it, and how many more. */
    people?: { src: string; alt?: string }[];
    moreLabel?: string;
  };
  /** The average and its sample. Both, or neither — see below. */
  rating?: { value: string; count: string };
  /** What kind of place it is: "Ice cream". */
  category?: string;
  /**
   * Open or shut, in the site's own words, and WHICH it is as a flag the CSS
   * can colour: the component never decides this from a clock it cannot see.
   */
  status?: { label: string; open: boolean };
  /** How far, phrased by the site: "7.9 km". */
  distance?: string;
  /** A line about how busy it usually is. */
  note?: ReactNode;
  /** Where it sits, for a reader who does not know: "Broward County, Miami". */
  where?: string;
  /** Save it for later. */
  save?: { label: string; savedLabel?: string; saved?: boolean };
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  onSave?: (info: { source: string; saved: boolean }) => void;
  className?: string;
};

/**
 * A place as a card: a picture, something somebody said about it, and whether
 * you can go right now.
 *
 * NOT `RailMerchant`, which is a vertical directory row — a name, a distance,
 * and whether it is open. This is the card that goes in a rail, and the
 * difference is the QUOTE: the thing that makes a stranger's place feel like
 * a recommendation rather than a listing.
 *
 * `rating` TAKES BOTH FIGURES OR NEITHER. 4.8 from six people and 4.8 from
 * six hundred are different facts, and the kit already refuses stars without
 * their sample everywhere else.
 *
 * `status.open` IS A FLAG THE SITE SETS, and `status.label` is its own
 * sentence. A component that decided "open" from a clock would be reading the
 * visitor's timezone, not the shop's, and would be wrong for every place a
 * person is planning to visit tomorrow.
 *
 * THE QUOTE MARKS ARE DRAWN, not typed into the text. A card that lets its
 * consumer decide whether to add quotation marks is a card that will
 * eventually present the site's own summary as a customer's words.
 */
export default function RailSpot({
  name,
  href,
  image,
  quote,
  rating,
  category,
  status,
  distance,
  note,
  where,
  save,
  source,
  onSelect,
  onSave,
  className,
}: RailSpotProps) {
  return (
    <article
      className={["rail-spot", className].filter(Boolean).join(" ")}
      data-rail-spot={source}
    >
      <a
        className="rail-spot__link"
        href={href}
        onClick={() => onSelect?.({ source, id: name })}
      >
        <span className="rail-spot__frame">
          {image && (
            <img
              className="rail-spot__art"
              src={image.src}
              alt={image.alt ?? ""}
              loading="lazy"
            />
          )}

          {quote && (
            <span className="rail-spot__quote">
              <span className="rail-spot__said">
                <span className="rail-spot__mark" aria-hidden="true">
                  &ldquo;
                </span>
                {quote.text}
                <span className="rail-spot__mark" aria-hidden="true">
                  &rdquo;
                </span>
              </span>
              <span className="rail-spot__who">
                {quote.about && (
                  <span className="rail-spot__about">{quote.about}</span>
                )}
                {quote.people && quote.people.length > 0 && (
                  <span className="rail-spot__faces" aria-hidden="true">
                    {quote.people.slice(0, 3).map((face, i) => (
                      <img
                        className="rail-spot__face"
                        src={face.src}
                        alt=""
                        loading="lazy"
                        key={i}
                      />
                    ))}
                    {quote.moreLabel && (
                      <span className="rail-spot__more">{quote.moreLabel}</span>
                    )}
                  </span>
                )}
              </span>
            </span>
          )}
        </span>

        <span className="rail-spot__body">
          <span className="rail-spot__name">{name}</span>

          <span className="rail-spot__facts">
            {rating && (
              <span className="rail-spot__rating">
                {rating.value}
                <span className="rail-spot__star" aria-hidden="true">
                  ★
                </span>
                <span className="rail-spot__count">({rating.count})</span>
              </span>
            )}
            {category && (
              <span className="rail-spot__category">{category}</span>
            )}
          </span>

          <span className="rail-spot__facts">
            {status && (
              <span
                className="rail-spot__status"
                data-rail-open={status.open ? "" : undefined}
              >
                {status.label}
              </span>
            )}
            {distance && (
              <span className="rail-spot__distance">{distance}</span>
            )}
          </span>

          {note && <span className="rail-spot__note">{note}</span>}
          {where && <span className="rail-spot__where">{where}</span>}
        </span>
      </a>

      {save && (
        <button
          type="button"
          className="rail-spot__save"
          aria-pressed={save.saved ?? false}
          onClick={() => onSave?.({ source, saved: !save.saved })}
        >
          <span aria-hidden="true">{save.saved ? "★" : "☆"}</span>
          <span className="rail-sr-only">
            {(save.saved && save.savedLabel ? save.savedLabel : save.label)}{" "}
            {name}
          </span>
        </button>
      )}
    </article>
  );
}
