"use client";

import type { ReactNode } from "react";

export type RailRing = {
  id: string;
  /** What this ring is: "Move". */
  label: string;
  value: number;
  target: number;
  /** Its unit, after the figures: "CAL", "MIN", "HRS". */
  unit?: string;
  /** The ring's own colour. */
  tone?: string;
  /** How the pair reads. Default is "512/1,000". */
  format?: (value: number, target: number) => ReactNode;
  /** A mark at the ring's leading end — an arrow, a chevron. */
  glyph?: ReactNode;
};

export type RailRingsProps = {
  /** Two to four. More than four and no ring is legible. */
  rings: RailRing[];
  /** What the set is: "Today's activity". */
  label: string;
  heading?: string;
  locale?: string;
  source: string;
  className?: string;
};

/**
 * Two or three goals that share a centre, and the figures beside them.
 *
 * NOT `RailDial`, which is ONE goal with its own figure in the middle. This
 * is the other question: several goals at once, none of them more important
 * than the others, read as a shape — "the red one is nearly closed" — before
 * any number is read at all. The centre is empty on purpose: a figure there
 * would belong to one ring and silently rank it above the rest.
 *
 * THE LEGEND IS NOT OPTIONAL and the rings are `aria-hidden`. Three
 * overlapping arcs cannot be read by anybody who cannot see them, cannot be
 * compared by somebody with a red/green difficulty, and cannot be read at all
 * in a screenshot with no colour. The figures beside them are the component;
 * the rings are the picture of the figures.
 *
 * OVER-TARGET DOES NOT WRAP — the arc stops full and the figure keeps
 * counting, same as `RailDial`. A ring that starts a second lap reads as a
 * ring that has barely started.
 *
 * Each arc leaves a gap at its own end so a closed ring still shows where it
 * closed: a full circle and a 99% circle are otherwise the same drawing.
 */
export default function RailRings({
  rings,
  label,
  heading,
  locale,
  source,
  className,
}: RailRingsProps) {
  if (rings.length === 0) return null;
  const nf = new Intl.NumberFormat(locale);

  /* Outermost first, so ring 0 is the biggest — the order the legend reads. */
  const R0 = 56;
  const STEP = 15;
  const WIDTH = 13;

  return (
    <section
      className={["rail-rings", className].filter(Boolean).join(" ")}
      data-rail-rings={source}
      aria-label={label}
    >
      {heading && <h2 className="rail-rings__heading">{heading}</h2>}

      <div className="rail-rings__row">
        <svg
          className="rail-rings__svg"
          viewBox="0 0 140 140"
          /* The legend says all of this in words, in the same order. */
          aria-hidden="true"
          focusable="false"
        >
          {rings.map((ring, index) => {
            const r = R0 - index * STEP;
            const c = 2 * Math.PI * r;
            const target = ring.target > 0 ? ring.target : 0;
            const pct =
              target > 0
                ? Math.min(Math.max(ring.value, 0) / target, 1)
                : 0;
            /* A CLOSED RING MUST SHOW WHERE IT CLOSED. At exactly 100% the
               arc is a complete circle, and a complete circle and a 99% one
               are the same drawing — the round cap lands exactly on the start
               and disappears. Reached or passed, the stroke runs one width
               PAST its own beginning, so the cap sits on top of the start as
               a visible ridge. Filmed: without this the 80/30 ring was an
               unbroken hoop. */
            const drawn = pct >= 1 ? c + WIDTH * 2 : c * pct;
            return (
              <g key={ring.id} style={{ ["--_ring-tone" as string]: ring.tone }}>
                <circle
                  className="rail-rings__rest"
                  cx="70"
                  cy="70"
                  r={r}
                  strokeWidth={WIDTH}
                />
                <circle
                  className="rail-rings__arc"
                  cx="70"
                  cy="70"
                  r={r}
                  strokeWidth={WIDTH}
                  strokeDasharray={`${drawn} ${c}`}
                />
              </g>
            );
          })}
        </svg>

        <dl className="rail-rings__legend">
          {rings.map((ring) => {
            const target = ring.target > 0 ? ring.target : 0;
            return (
              <div
                className="rail-rings__entry"
                key={ring.id}
                style={
                  ring.tone
                    ? ({ "--_ring-tone": ring.tone } as React.CSSProperties)
                    : undefined
                }
              >
                <dt className="rail-rings__label">{ring.label}</dt>
                <dd className="rail-rings__figures">
                  {ring.format
                    ? ring.format(ring.value, target)
                    : `${nf.format(ring.value)}/${nf.format(target)}`}
                  {ring.unit && (
                    <span className="rail-rings__unit">{ring.unit}</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
