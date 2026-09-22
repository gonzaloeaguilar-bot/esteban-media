"use client";

import type { ReactNode } from "react";

export type RailMilestoneProps = {
  /** The node reached. */
  from: ReactNode;
  /** The node being worked towards. */
  to: ReactNode;
  value: number;
  target: number;
  /** What the count is, for a screen reader: "Credits earned this month". */
  label: string;
  /** Shown above the bar. Defaults to "2 / 10". */
  format?: (value: number, target: number) => ReactNode;
  /** The line under it — a reset rule, what the next level gives. */
  note?: string;
  source: string;
  className?: string;
};

const nf = new Intl.NumberFormat();

/**
 * Progress between two named points — level 1 to level 2, bronze to silver.
 *
 * Different from RailProgress, and the difference is what the visitor is
 * being told. A progress bar says how far along one thing is. A milestone
 * says which rung you are on and which one is next, and it needs both
 * endpoints drawn to say that at all.
 *
 * Same rule as RailProgress: label and target are required, the count is
 * stated in real numbers, and the value is clamped. A rung ladder with no
 * numbers on it is the part of a loyalty scheme nobody can audit.
 */
export default function RailMilestone({
  from,
  to,
  value,
  target,
  label,
  format,
  note,
  source,
  className,
}: RailMilestoneProps) {
  const safeTarget = target > 0 ? target : 0;
  const safeValue = Math.min(Math.max(value, 0), safeTarget);
  const pct = safeTarget > 0 ? (safeValue / safeTarget) * 100 : 0;

  return (
    <section
      className={["rail-milestone", className].filter(Boolean).join(" ")}
      data-rail-milestone={source}
    >
      <p className="rail-milestone__count">
        {format ? (
          format(safeValue, safeTarget)
        ) : (
          <>
            <span className="rail-milestone__value">{nf.format(safeValue)}</span>
            <span className="rail-milestone__target">
              {" / "}
              {nf.format(safeTarget)}
            </span>
          </>
        )}
      </p>
      <div className="rail-milestone__track-row">
        <span className="rail-milestone__node" data-rail-reached="">
          {from}
        </span>
        <span
          className="rail-milestone__track"
          role="progressbar"
          aria-label={label}
          aria-valuenow={safeValue}
          aria-valuemin={0}
          aria-valuemax={safeTarget || 1}
        >
          <span
            className="rail-milestone__fill"
            style={{ inlineSize: `${pct}%` }}
          />
        </span>
        <span className="rail-milestone__node">{to}</span>
      </div>
      {note && <p className="rail-milestone__note">{note}</p>}
    </section>
  );
}
