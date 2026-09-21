"use client";

import type { ReactNode } from "react";

export type RailRatingProps = {
  /** The average, on `outOf`. */
  value: number;
  /**
   * How many ratings it is an average OF. Required: 4.5 from three people and
   * 4.5 from three thousand are different facts, and a star row without it is
   * the most quietly misleading thing on a product card.
   */
  count: number;
  outOf?: number;
  /** A second figure beside it — "104K sold". State only what you can prove. */
  meta?: ReactNode;
  /** Overrides "(1,234)". */
  countLabel?: (count: number) => string;
  source: string;
  className?: string;
};

const nf = new Intl.NumberFormat();

/**
 * A star average, its sample size, and optionally what else is true.
 *
 * `count` IS REQUIRED and there is no prop to hide it. 4.5 from three people
 * and 4.5 from three thousand are different facts; showing the stars without
 * the sample is the quietest lie a product card tells.
 *
 * The stars are decoration — `aria-hidden` — and the real value is written out
 * for assistive technology as "4.5 out of 5 from 1,234 ratings". Ten separate
 * star glyphs read aloud is noise, and half a glyph cannot be read at all.
 */
export default function RailRating({
  value,
  count,
  outOf = 5,
  meta,
  countLabel,
  source,
  className,
}: RailRatingProps) {
  const clamped = Math.min(Math.max(value, 0), outOf);
  const pct = (clamped / outOf) * 100;

  return (
    <p
      className={["rail-rating", className].filter(Boolean).join(" ")}
      data-rail-rating={source}
    >
      <span className="rail-rating__value" aria-hidden="true">
        {clamped.toFixed(1)}
      </span>
      {/* One gradient-clipped row rather than N glyphs: a half star cannot be
          spoken, and ten of them in a row is noise. */}
      <span className="rail-rating__stars" aria-hidden="true">
        <span className="rail-rating__stars-fill" style={{ inlineSize: `${pct}%` }}>
          {"★".repeat(outOf)}
        </span>
        <span className="rail-rating__stars-track">{"★".repeat(outOf)}</span>
      </span>
      <span className="rail-rating__count" aria-hidden="true">
        {countLabel ? countLabel(count) : `(${nf.format(count)})`}
      </span>
      {meta && (
        <span className="rail-rating__meta" aria-hidden="true">
          {meta}
        </span>
      )}
      <span className="rail-rating__sr">
        {clamped.toFixed(1)} out of {outOf} from {nf.format(count)} ratings
        {meta ? ". " : ""}
      </span>
    </p>
  );
}
