"use client";

import type { ReactNode } from "react";

export type RailProgressProps = {
  /** What is being worked towards — "Next $5 reward", "Profile complete". */
  label: string;
  value: number;
  target: number;
  /**
   * How the pair reads beside the label. Given `(4144, 5000)` the default is
   * "4,144 / 5,000". Pass your own for a unit or another language.
   */
  format?: (value: number, target: number) => ReactNode;
  /** A line under the bar — what happens when it fills. */
  note?: string;
  source: string;
  className?: string;
};

const nf = new Intl.NumberFormat();

/**
 * Progress towards one thing worth reaching.
 *
 * WHAT MAKES THIS HONEST rather than a slot machine, which is the line the
 * kit draws elsewhere too: the bar states both real numbers, so a visitor can
 * check it. A bar with no numbers is a feeling; a bar with numbers is a fact
 * about their account. `label` and `target` are both required for that reason
 * — there is no way to render an unlabelled or open-ended meter with this.
 *
 * It is a real <progress>, so assistive technology reads the value without a
 * pile of aria, and the value is announced as a proportion rather than as a
 * decorative bar.
 */
export default function RailProgress({
  label,
  value,
  target,
  format,
  note,
  source,
  className,
}: RailProgressProps) {
  // A meter that can exceed its own target reads as broken, and one fed a
  // negative or a zero target divides by nothing.
  const safeTarget = target > 0 ? target : 0;
  const safeValue = Math.min(Math.max(value, 0), safeTarget);
  const pct = safeTarget > 0 ? (safeValue / safeTarget) * 100 : 0;

  return (
    <section
      className={["rail-progress", className].filter(Boolean).join(" ")}
      data-rail-progress={source}
    >
      <div className="rail-progress__head">
        <span className="rail-progress__label">{label}</span>
        <span className="rail-progress__value">
          {format
            ? format(safeValue, safeTarget)
            : `${nf.format(safeValue)} / ${nf.format(safeTarget)}`}
        </span>
      </div>
      <progress
        className="rail-progress__bar"
        value={safeValue}
        max={safeTarget || 1}
      >
        {Math.round(pct)}%
      </progress>
      {note && <p className="rail-progress__note">{note}</p>}
    </section>
  );
}
