"use client";

import type { ReactNode } from "react";

export type RailTrendRow = {
  id: string;
  /** The window: "3-day", "90-day". */
  period: string;
  /**
   * The change over that window, signed, in the site's own unit. The
   * DIRECTION is read from this number — never taken as a prop, because a row
   * whose arrow disagrees with its figure is a row nobody can trust, and the
   * two drift the moment one of them is computed somewhere else.
   */
  change: number;
  /** How the figure reads: "-209 kcal". Default is the number alone. */
  format?: (change: number) => ReactNode;
  /** A miniature of the window — a sparkline, a strip. Optional. */
  spark?: ReactNode;
};

export type RailTrendProps = {
  rows: RailTrendRow[];
  /** What the set is: "Expenditure changes". */
  label: string;
  heading?: string;
  /**
   * The three words for the three directions. Required, and in the site's
   * language: "Increase" / "Decrease" / "No Change" is English, and an arrow
   * on its own is not a word at all.
   */
  directions: { up: string; down: string; flat: string };
  /**
   * How small a change still counts as none. Given in the same unit as
   * `change`. Default 0 — every non-zero number gets an arrow, which is right
   * for whole units and wrong for anything measured finely.
   */
  flatWithin?: number;
  source: string;
  className?: string;
};

/**
 * The same measure over several windows, and which way each one went.
 *
 * WHY THE WINDOWS ARE ROWS AND NOT A CHART. Three days, a week, a month and a
 * quarter are four different questions about one number, and a chart answers
 * none of them directly: it shows the shape and leaves the reader to
 * subtract. This is the subtraction, done, four times.
 *
 * THE ARROW IS DERIVED FROM THE FIGURE. Not a prop — the one thing this
 * component exists to prevent is a row that says "-2 kcal" beside an arrow
 * pointing up, which is what happens the first time a direction is computed
 * in a different place from the number.
 *
 * `flatWithin` EXISTS BECAUSE ZERO IS RARELY ZERO. A 0.3 kcal drift over
 * three days is noise wearing a direction, and a screen full of arrows
 * pointing at noise teaches a person to ignore all of them.
 *
 * The arrows are `aria-hidden` and the direction is a word, because "↗" is
 * announced as "north east arrow", which is not what the row means.
 */
export default function RailTrend({
  rows,
  label,
  heading,
  directions,
  flatWithin = 0,
  source,
  className,
}: RailTrendProps) {
  if (rows.length === 0) return null;

  return (
    <section
      className={["rail-trend", className].filter(Boolean).join(" ")}
      data-rail-trend={source}
    >
      {heading && <h2 className="rail-trend__heading">{heading}</h2>}

      <ul className="rail-trend__rows" aria-label={label}>
        {rows.map((row) => {
          const flat = Math.abs(row.change) <= flatWithin;
          const way = flat ? "flat" : row.change > 0 ? "up" : "down";
          const word = directions[way];

          return (
            <li className="rail-trend__row" key={row.id} data-rail-way={way}>
              <span className="rail-trend__period">{row.period}</span>
              <span className="rail-trend__spark" aria-hidden="true">
                {row.spark}
              </span>
              <span className="rail-trend__change">
                {row.format ? row.format(row.change) : row.change}
              </span>
              <span className="rail-trend__way">
                <span className="rail-trend__arrow" aria-hidden="true">
                  {way === "up" ? "↗" : way === "down" ? "↘" : "→"}
                </span>
                {word}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
