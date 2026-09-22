"use client";

import type { ReactNode } from "react";

export type RailReaction = {
  id: string;
  /** The mark: an emoji, an inline SVG, a team crest. */
  glyph: ReactNode;
  /**
   * What this reaction means, in words. Required, and it is why this is not a
   * row of unlabelled pictures: an emoji has no accessible name of its own,
   * and "🔥 193" reaches a screen reader as a number with no subject.
   */
  label: string;
  count: number;
  /** The reader already gave this one. */
  mine?: boolean;
};

export type RailReactionsProps = {
  reactions: RailReaction[];
  /** What is being reacted to, for a screen reader. */
  label: string;
  /** Most reactions shown before the rest collapse. */
  max?: number;
  /** The words for the collapsed remainder, given how many are hidden. */
  moreLabel: (hidden: number) => string;
  /** The words on the add-a-reaction control. */
  addLabel?: string;
  /** BCP-47 for the counts. */
  locale?: string;
  onReact?: (info: { source: string; id: string; mine: boolean }) => void;
  onAdd?: (info: { source: string }) => void;
  source: string;
  className?: string;
};

/**
 * What a room thought of something, as a row of marks with counts.
 *
 * Each one is a real toggle button with a name and a pressed state, so a reader
 * hears "fuego, 193, pulsado" instead of a picture and a number. The counts are
 * formatted for the locale, because 1193 is 1,193 or 1.193 depending on who is
 * looking.
 *
 * The row collapses past `max` rather than wrapping. A reaction row that grows
 * to three lines pushes the thing being reacted to off the screen, which
 * inverts what the two are for.
 */
export default function RailReactions({
  reactions,
  label,
  max = 5,
  moreLabel,
  addLabel,
  locale,
  onReact,
  onAdd,
  source,
  className,
}: RailReactionsProps) {
  const shown = reactions.slice(0, max);
  const hidden = reactions.length - shown.length;
  const format = (value: number) => new Intl.NumberFormat(locale).format(value);

  return (
    <div
      className={["rail-reactions", className].filter(Boolean).join(" ")}
      data-rail-reactions={source}
      role="group"
      aria-label={label}
    >
      {shown.map((r) => (
        <button
          key={r.id}
          type="button"
          className="rail-reactions__chip"
          data-mine={r.mine ? "" : undefined}
          aria-pressed={Boolean(r.mine)}
          onClick={() => onReact?.({ source, id: r.id, mine: !r.mine })}
        >
          <span className="rail-reactions__glyph" aria-hidden="true">
            {r.glyph}
          </span>
          <span className="rail-sr-only">{r.label}</span>
          <span className="rail-reactions__count">{format(r.count)}</span>
        </button>
      ))}
      {hidden > 0 && (
        <span className="rail-reactions__more">{moreLabel(hidden)}</span>
      )}
      {addLabel && (
        <button
          type="button"
          className="rail-reactions__add"
          aria-label={addLabel}
          onClick={() => onAdd?.({ source })}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 14c.8 1 1.9 1.5 3 1.5s2.2-.5 3-1.5M9.5 10h.01M14.5 10h.01"
              fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
