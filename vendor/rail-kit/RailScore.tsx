"use client";

export type RailScoreProps = {
  /** What is being scored, for a screen reader. */
  label: string;
  /** The word for the current score, in the site's language. */
  scoreLabel: string;
  score: number;
  /**
   * The best so far, and its word. This is what makes the next attempt matter:
   * without a record, a number that only goes up is a tally, and a tally cannot
   * be beaten.
   */
  bestLabel?: string;
  best?: number;
  /**
   * Anything else being counted — bounces, attempts, time. Secondary on
   * purpose: a count is not a score. Measured on gonzalo.tech, the board said
   * only "Rebotes: 6", and you could neither win nor lose it.
   */
  extra?: { label: string; value: number }[];
  /** BCP-47 tag for number formatting. 1234 is 1,234 or 1.234 depending. */
  locale?: string;
  source: string;
  className?: string;
};

/**
 * The scoreboard for a small game: what you have now, the best you have done,
 * and whatever else is being counted.
 *
 * It is an `<output>` with `aria-live="polite"`, so the number is announced
 * when it changes — a score painted into a canvas is invisible to anyone not
 * looking at it, and a score nobody can read is decoration.
 *
 * Polite, not assertive: a goal is not an alarm, and interrupting whatever
 * somebody is reading to say "3" is how a game becomes hostile.
 */
export default function RailScore({
  label,
  scoreLabel,
  score,
  bestLabel,
  best,
  extra = [],
  locale,
  source,
  className,
}: RailScoreProps) {
  const format = (value: number) => new Intl.NumberFormat(locale).format(value);

  return (
    <output
      className={["rail-score", className].filter(Boolean).join(" ")}
      data-rail-score={source}
      aria-label={label}
      aria-live="polite"
    >
      <span className="rail-score__part rail-score__part--now">
        <span className="rail-score__label">{scoreLabel}</span>
        <span className="rail-score__value">{format(score)}</span>
      </span>
      {bestLabel && typeof best === "number" && (
        <span className="rail-score__part">
          <span className="rail-score__label">{bestLabel}</span>
          <span className="rail-score__value">{format(best)}</span>
        </span>
      )}
      {extra.map((item) => (
        <span className="rail-score__part rail-score__part--extra" key={item.label}>
          <span className="rail-score__label">{item.label}</span>
          <span className="rail-score__value">{format(item.value)}</span>
        </span>
      ))}
    </output>
  );
}
