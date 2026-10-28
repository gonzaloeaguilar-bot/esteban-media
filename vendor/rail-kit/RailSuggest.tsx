"use client";

import type { ReactNode } from "react";

export type RailSuggestion = {
  id: string;
  /** The name as it is displayed. */
  name: string;
  href: string;
  avatar?: { src: string; alt?: string };
  /**
   * WHY this one is being suggested, in the site's words: "2 mutuals",
   * "Suggested for you", "Follows you". Required — see below.
   */
  reason: string;
  /** The faces behind the reason, when there are any. */
  mutuals?: { src: string; alt?: string }[];
  /** A small state over the avatar: "New". */
  badge?: ReactNode;
  /** Already following. The button says so and stops asking. */
  followed?: boolean;
};

export type RailSuggestProps = {
  suggestions: RailSuggestion[];
  /** What the set is: "Suggested for you". */
  label: string;
  heading?: string;
  /** Where the full list is. */
  seeAll?: { label: string; href: string };
  followLabel?: string;
  followedLabel?: string;
  /** The × on each card. Absent means the card cannot be dismissed. */
  dismissLabel?: string;
  source: string;
  onFollow?: (info: { source: string; id: string; index: number }) => void;
  onDismiss?: (info: { source: string; id: string; index: number }) => void;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * The row of people a site thinks you should follow: a face, a name, why, and
 * one button.
 *
 * `reason` IS REQUIRED AND THERE IS NO PROP TO HIDE IT. A suggestion with no
 * stated reason is an advert wearing a friend's clothes, and the difference
 * between "2 mutuals" and "suggested for you" is the entire difference
 * between a recommendation and a placement. The kit will not render the
 * second as though it were the first.
 *
 * THE DISMISS IS OPT-IN AND NAMED. A bare × in a corner is a 24px target
 * that announces nothing; pass `dismissLabel` and it becomes "Dismiss
 * <name>". Leave it out and the card simply cannot be dismissed, which is
 * honest — a × that does nothing until a reload is worse than no ×.
 *
 * It scrolls horizontally and snaps, with the cards sized so the next one is
 * visibly cut: a row that ends flush at the edge reads as a row that ends.
 */
export default function RailSuggest({
  suggestions,
  label,
  heading,
  seeAll,
  followLabel = "Follow",
  followedLabel = "Following",
  dismissLabel,
  source,
  onFollow,
  onDismiss,
  onSelect,
  className,
}: RailSuggestProps) {
  if (suggestions.length === 0) return null;

  return (
    <section
      className={["rail-suggest", className].filter(Boolean).join(" ")}
      data-rail-suggest={source}
    >
      {(heading || seeAll) && (
        <div className="rail-suggest__head">
          {heading && <h2 className="rail-suggest__heading">{heading}</h2>}
          {seeAll && (
            <a className="rail-suggest__seeall" href={seeAll.href}>
              {seeAll.label}
            </a>
          )}
        </div>
      )}

      {/* A horizontal scroller that cannot be focused cannot be scrolled by a
          keyboard at all: the cards are reachable one by one, but the
          container never moves under them. tabIndex here is the same fix the
          rail itself carries. */}
      <ul className="rail-suggest__row" aria-label={label} tabIndex={0}>
        {suggestions.map((item, index) => (
          <li className="rail-suggest__cell" key={item.id}>
            <article className="rail-suggest__card">
              {dismissLabel && (
                <button
                  type="button"
                  className="rail-suggest__dismiss"
                  onClick={() => onDismiss?.({ source, id: item.id, index })}
                >
                  <span aria-hidden="true">×</span>
                  <span className="rail-sr-only">
                    {dismissLabel} {item.name}
                  </span>
                </button>
              )}

              <a
                className="rail-suggest__link"
                href={item.href}
                onClick={() => onSelect?.({ source, id: item.id, index })}
              >
                <span className="rail-suggest__face">
                  {item.avatar && (
                    <img
                      className="rail-suggest__avatar"
                      src={item.avatar.src}
                      alt={item.avatar.alt ?? ""}
                      loading="lazy"
                    />
                  )}
                  {item.badge && (
                    <span className="rail-suggest__badge">{item.badge}</span>
                  )}
                </span>
                <span className="rail-suggest__name">{item.name}</span>
              </a>

              <p className="rail-suggest__reason">
                {item.mutuals && item.mutuals.length > 0 && (
                  <span className="rail-suggest__mutuals" aria-hidden="true">
                    {item.mutuals.slice(0, 3).map((face, i) => (
                      <img
                        className="rail-suggest__mutual"
                        src={face.src}
                        alt=""
                        loading="lazy"
                        key={i}
                      />
                    ))}
                  </span>
                )}
                {item.reason}
              </p>

              <button
                type="button"
                className="rail-suggest__follow"
                data-rail-followed={item.followed ? "" : undefined}
                aria-pressed={item.followed ?? false}
                onClick={() => onFollow?.({ source, id: item.id, index })}
              >
                {item.followed ? followedLabel : followLabel}
              </button>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
