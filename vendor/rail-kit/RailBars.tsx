"use client";

import type { ReactNode } from "react";

export type RailBar = {
  id: string;
  value: number;
  /** What this column is, for the screen reader's table: a date, a day. */
  label: string;
  /** No bar at all — a day with nothing logged is not a day with zero. */
  missing?: boolean;
};

export type RailBarsProps = {
  bars: RailBar[];
  /** What the set is: "Energy balance, last 30 days". */
  label: string;
  heading?: string;
  /** The line drawn across the bars, and what it is: a target, an average. */
  marker?: { value: number; label: string };
  /** Under the chart, on the trailing side: "Last 30 Days". */
  caption?: string;
  /**
   * Labels along the bottom: "00", "06", "12", "18". Each one names a bar by
   * its `id`, so a tick cannot drift away from the column it marks — which is
   * exactly what happens when an axis is a separate list of evenly spaced
   * words. Absent means no axis, which is right for a sparkline.
   */
  ticks?: { id: string; label: string }[];
  /** The sum under it: "1770 − 1700 = 70", each with its own word. */
  summary?: { id: string; value: string; label: string; glyph?: ReactNode }[];
  locale?: string;
  source: string;
  className?: string;
};

/**
 * Thirty columns and a line across them: what was spent each day against what
 * it was meant to be.
 *
 * A MISSING DAY IS NOT A ZERO. `missing` leaves the column empty rather than
 * drawing a bar of no height, because a gap that renders as a floor makes an
 * untracked week look like a starved one — and that is the reading a person
 * acts on. The two cannot share a shape.
 *
 * THE BARS ARE SCALED AGAINST THE TALLEST BAR OR THE MARKER, whichever is
 * higher, so the marker is always visible. A target line drawn off the top of
 * its own chart is the one thing a target line must never do.
 *
 * NO AXIS, NO GRID, NO TOOLTIP. This is the shape of a month, read in a
 * second, and everything else belongs on the full chart behind the tile. It
 * is CSS and no dependency; the day-level reading is a `<table>` in
 * visually-hidden text, so the series is available rather than merely drawn.
 */
export default function RailBars({
  bars,
  label,
  heading,
  marker,
  caption,
  ticks,
  summary,
  locale,
  source,
  className,
}: RailBarsProps) {
  if (bars.length === 0) return null;
  const nf = new Intl.NumberFormat(locale);

  const drawn = bars.filter((bar) => !bar.missing);
  const top = Math.max(
    ...drawn.map((bar) => Math.max(bar.value, 0)),
    marker ? Math.max(marker.value, 0) : 0,
    1,
  );

  return (
    <section
      className={["rail-bars", className].filter(Boolean).join(" ")}
      data-rail-bars={source}
      aria-label={label}
    >
      {heading && <h2 className="rail-bars__heading">{heading}</h2>}

      <div className="rail-bars__plot">
        {marker && (
          <span
            className="rail-bars__marker"
            style={{ insetBlockEnd: `${(marker.value / top) * 100}%` }}
            aria-hidden="true"
          />
        )}
        <ol className="rail-bars__series" aria-hidden="true">
          {bars.map((bar) => (
            <li className="rail-bars__col" key={bar.id}>
              {!bar.missing && (
                <span
                  className="rail-bars__bar"
                  style={{
                    blockSize: `${(Math.max(bar.value, 0) / top) * 100}%`,
                  }}
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Drawn above, readable here. A chart with no text is a picture. */}
      <table className="rail-sr-only">
        <caption>{label}</caption>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.id}>
              <th scope="row">{bar.label}</th>
              <td>{bar.missing ? "—" : nf.format(bar.value)}</td>
            </tr>
          ))}
          {marker && (
            <tr>
              <th scope="row">{marker.label}</th>
              <td>{nf.format(marker.value)}</td>
            </tr>
          )}
        </tbody>
      </table>

      {ticks && ticks.length > 0 && (
        <ol className="rail-bars__axis" aria-hidden="true">
          {bars.map((bar) => {
            const tick = ticks.find((t) => t.id === bar.id);
            return (
              <li className="rail-bars__tick" key={bar.id}>
                {tick ? tick.label : ""}
              </li>
            );
          })}
        </ol>
      )}

      {caption && <p className="rail-bars__caption">{caption}</p>}

      {summary && summary.length > 0 && (
        <dl className="rail-bars__summary">
          {summary.map((item) => (
            <div className="rail-bars__sum" key={item.id}>
              <dd className="rail-bars__sum-value">{item.value}</dd>
              <dt className="rail-bars__sum-label">
                {item.glyph && (
                  <span className="rail-bars__sum-glyph" aria-hidden="true">
                    {item.glyph}
                  </span>
                )}
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
