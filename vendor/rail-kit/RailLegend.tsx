"use client";

import type { ReactNode } from "react";

export type RailLegendKey = {
  id: string;
  /** What the mark means: "Intake", "Target", "Range". */
  label: string;
  /** How the series is drawn: a bar, a line, a band. */
  mark?: "bar" | "line" | "band" | "dot";
  /** The series' own colour. Falls back to the accent. */
  tone?: string;
};

export type RailLegendProps = {
  keys: RailLegendKey[];
  /** What the set is: "What the chart is showing". */
  label: string;
  /** The "what am I looking at" button at the end of the row. */
  explain?: { label: string; onExplain: () => void; glyph?: ReactNode };
  source: string;
  className?: string;
};

/**
 * What each mark on the chart means.
 *
 * WHY IT IS A COMPONENT AND NOT THREE SPANS. A legend is the only part of a
 * chart that is pure text, and it is the part every site reinvents as three
 * hand-placed spans that drift out of step with the series they name. Here
 * the mark's SHAPE is a prop — a bar is not a line is not a band — because a
 * legend that draws every series as the same dot has told the reader nothing
 * about which one is the dashed target.
 *
 * `explain` IS A BUTTON, NOT A TOOLTIP ON THE `i`. A tooltip on hover does
 * not exist on a phone, which is where this row is read.
 */
export default function RailLegend({
  keys,
  label,
  explain,
  source,
  className,
}: RailLegendProps) {
  if (keys.length === 0) return null;

  return (
    <section
      className={["rail-legend", className].filter(Boolean).join(" ")}
      data-rail-legend={source}
      aria-label={label}
    >
      <ul className="rail-legend__keys">
        {keys.map((key) => (
          <li className="rail-legend__key" key={key.id}>
            <span
              className="rail-legend__mark"
              data-rail-mark={key.mark ?? "bar"}
              style={
                key.tone
                  ? ({ "--_key-tone": key.tone } as React.CSSProperties)
                  : undefined
              }
              aria-hidden="true"
            />
            {key.label}
          </li>
        ))}
      </ul>

      {explain && (
        <button
          type="button"
          className="rail-legend__explain"
          onClick={explain.onExplain}
        >
          <span aria-hidden="true">{explain.glyph ?? "i"}</span>
          <span className="rail-sr-only">{explain.label}</span>
        </button>
      )}
    </section>
  );
}
