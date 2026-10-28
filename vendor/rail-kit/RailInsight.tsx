"use client";

import type { ReactNode } from "react";

export type RailInsightProps = {
  /** "Expenditure", "Weight Trend". */
  title: string;
  /** The window the figure covers: "Last 7 Days". Not optional — see below. */
  period: string;
  /** The headline figure, already formatted: "1534", "168.4". */
  value: string;
  /** Its unit, small and after it: "kcal", "lb", "%". */
  unit?: string;
  /**
   * The picture: a sparkline, a bar strip, a track. Any chart library, or
   * nothing. The kit does not own the chart because a brand's chart is the
   * one decision it should not inherit.
   */
  chart?: ReactNode;
  /** Where the full chart lives. A link: it is a different page. */
  href?: string;
  source: string;
  onSelect?: (info: { source: string }) => void;
  className?: string;
};

/**
 * One measured thing, small: what it is, over what window, drawn, and the
 * number.
 *
 * `period` IS REQUIRED AND CANNOT BE HIDDEN. "1,534 kcal" is not a fact
 * until it says over what — a daily average and a weekly total are the same
 * glyphs and different by a factor of seven. This is the same rule the kit
 * applies to a rating without its sample.
 *
 * THE WHOLE TILE IS THE TARGET when `href` is given, and there is no second
 * action inside it: a tile with a link AND a button is two intents in one
 * 160px square, and the thumb cannot tell them apart. If a tile needs a
 * second action it is not a tile, it is a card.
 *
 * The chart is a slot, not a dependency. `aria-hidden` is NOT applied for
 * you: whether your drawing carries meaning the number does not is something
 * only you can know.
 */
export default function RailInsight({
  title,
  period,
  value,
  unit,
  chart,
  href,
  source,
  onSelect,
  className,
}: RailInsightProps) {
  const body = (
    <>
      <span className="rail-insight__title">{title}</span>
      <span className="rail-insight__period">{period}</span>
      {chart && <span className="rail-insight__chart">{chart}</span>}
      <span className="rail-insight__foot">
        <span className="rail-insight__value">
          {value}
          {unit && <span className="rail-insight__unit"> {unit}</span>}
        </span>
        {href && (
          <span className="rail-insight__chevron" aria-hidden="true">
            ›
          </span>
        )}
      </span>
    </>
  );

  if (!href) {
    return (
      <section
        className={["rail-insight", className].filter(Boolean).join(" ")}
        data-rail-insight={source}
      >
        {body}
      </section>
    );
  }

  return (
    <a
      className={["rail-insight", className].filter(Boolean).join(" ")}
      data-rail-insight={source}
      href={href}
      onClick={() => onSelect?.({ source })}
    >
      {body}
    </a>
  );
}
