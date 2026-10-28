"use client";

import type { ReactNode } from "react";

export type RailDialBar = {
  id: string;
  /** "Protein", "Fat", "Carbs". */
  label: string;
  value: number;
  target: number;
  /** The bar's own colour, when the three are read as a set. */
  tone?: string;
  /** How the pair reads: the default is "147 / 150". */
  format?: (value: number, target: number) => ReactNode;
};

export type RailDialProps = {
  /** The figure in the middle, and what it is. */
  value: number;
  target: number;
  /** "Consumed", under the big figure. */
  valueLabel: string;
  /** "Target", under the figure on the trailing side. */
  targetLabel: string;
  /**
   * The figure on the leading side and its word — usually what is left.
   * Computed by the site, not here: what "remaining" means when the target is
   * already passed is a product decision (zero? a negative? "over by"?), and
   * a component that picks one is picking it for every brand.
   */
  remaining?: { value: number; label: string };
  /** The three macro bars under the ring. Two to four. */
  bars?: RailDialBar[];
  /** What the whole thing is, for a screen reader: "Daily nutrition". */
  label: string;
  heading?: string;
  locale?: string;
  source: string;
  className?: string;
};

/**
 * The ring: one figure in the middle, what it is aiming at, and the split
 * underneath.
 *
 * WHY A RING AND NOT `RailProgress`. The bar answers "how far along"; the
 * ring answers "how much of today is left", which is a different question a
 * person asks ten times a day. The arc is the same fact drawn so it can be
 * read at arm's length without reading a number at all — and then the number
 * is there anyway, because a proportion nobody can check is a feeling.
 *
 * THE ARC IS AN SVG, NOT A CONIC GRADIENT. A conic gradient cannot round its
 * own ends, cannot be dashed, and has no accessible value; this one is a
 * `stroke-dasharray` on a circle, which animates, caps and reads.
 *
 * OVER-TARGET DOES NOT WRAP. At 110% the arc stops full and the figure keeps
 * counting: an arc that starts a second lap reads as 10%, and a nutrition
 * screen that shows 1,870 calories as a tenth of a day is worse than no
 * screen.
 */
export default function RailDial({
  value,
  target,
  valueLabel,
  targetLabel,
  remaining,
  bars,
  label,
  heading,
  locale,
  source,
  className,
}: RailDialProps) {
  const nf = new Intl.NumberFormat(locale);
  const safeTarget = target > 0 ? target : 0;
  const pct =
    safeTarget > 0 ? Math.min(Math.max(value, 0) / safeTarget, 1) * 100 : 0;

  /* The arc is 3/4 of the circle, opened at the bottom so the two flanking
     figures sit in the gap rather than beside a closed ring. */
  const R = 52;
  const SWEEP = 0.75;
  const circumference = 2 * Math.PI * R;
  const arc = circumference * SWEEP;

  return (
    <section
      className={["rail-dial", className].filter(Boolean).join(" ")}
      data-rail-dial={source}
      aria-label={label}
    >
      {heading && <h2 className="rail-dial__heading">{heading}</h2>}

      <div className="rail-dial__ring">
        {remaining && (
          <p className="rail-dial__flank" data-rail-side="start">
            <span className="rail-dial__flank-value">
              {nf.format(remaining.value)}
            </span>
            <span className="rail-dial__flank-label">{remaining.label}</span>
          </p>
        )}

        <div className="rail-dial__dial">
          <svg
            className="rail-dial__svg"
            viewBox="0 0 128 128"
            /* The figures below say the same thing in words. A screen reader
               reading a second, differently-rounded copy of the number is
               noise, not access. */
            aria-hidden="true"
            focusable="false"
          >
            <circle
              className="rail-dial__rest"
              cx="64"
              cy="64"
              r={R}
              strokeDasharray={`${arc} ${circumference}`}
            />
            <circle
              className="rail-dial__arc"
              cx="64"
              cy="64"
              r={R}
              strokeDasharray={`${(arc * pct) / 100} ${circumference}`}
            />
          </svg>
          <p className="rail-dial__centre">
            <span className="rail-dial__value">{nf.format(value)}</span>
            <span className="rail-dial__value-label">{valueLabel}</span>
          </p>
        </div>

        <p className="rail-dial__flank" data-rail-side="end">
          <span className="rail-dial__flank-value">{nf.format(target)}</span>
          <span className="rail-dial__flank-label">{targetLabel}</span>
        </p>
      </div>

      {bars && bars.length > 0 && (
        <ul className="rail-dial__bars">
          {bars.map((bar) => {
            const barTarget = bar.target > 0 ? bar.target : 0;
            const barPct =
              barTarget > 0
                ? Math.min(Math.max(bar.value, 0) / barTarget, 1) * 100
                : 0;
            return (
              <li className="rail-dial__bar" key={bar.id}>
                <span className="rail-dial__bar-label">{bar.label}</span>
                <span
                  className="rail-dial__bar-track"
                  style={
                    bar.tone
                      ? ({ "--_bar-tone": bar.tone } as React.CSSProperties)
                      : undefined
                  }
                >
                  <span
                    className="rail-dial__bar-fill"
                    style={{ inlineSize: `${barPct}%` }}
                  />
                </span>
                <span className="rail-dial__bar-value">
                  {bar.format
                    ? bar.format(bar.value, barTarget)
                    : `${nf.format(bar.value)} / ${nf.format(barTarget)}`}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
