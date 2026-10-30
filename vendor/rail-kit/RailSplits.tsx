"use client";

import type { ReactNode } from "react";

export type RailSplitPart = {
  id: string;
  /** What this part is: "Protein". */
  label: string;
  /** Its share of the whole, in whatever unit the row counts in. */
  value: number;
  /** The part's own colour across every row. */
  tone?: string;
};

export type RailSplitRow = {
  id: string;
  /** What the row is: "Fri, Sep 25". */
  label: string;
  parts: RailSplitPart[];
  /** Where the row leads, when it leads anywhere. */
  href?: string;
};

export type RailSplitsProps = {
  rows: RailSplitRow[];
  /** What the set is: "Macros by day". */
  label: string;
  heading?: string;
  /**
   * How the shares read beside the date. Given the parts, return the line.
   * The default is "45% P · 15% F · 39% C" using each part's first letter,
   * which is right for English macros and wrong for almost everything else —
   * so pass your own the moment the labels are words.
   */
  format?: (parts: { part: RailSplitPart; percent: number }[]) => ReactNode;
  /** Rows with nothing in them, said rather than drawn as an empty bar. */
  emptyLabel?: string;
  /**
   * The locale the shares are written in. `45%` is not universal: Turkish
   * writes `%45`, and several locales use different digits entirely, so the
   * percentage goes through Intl rather than a hand-built string.
   */
  locale?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * A day per row, and how that day divided up.
 *
 * NOT `RailAllocation`, which is ONE bar with a legend under it — the split
 * of a single thing, explained. This is many rows of the same split, where
 * the legend would be repeated thirty times and the point is the SHAPE
 * changing down the column: you read a week of eating by the green edge
 * moving, not by any one number.
 *
 * THE PERCENTAGES ARE DERIVED FROM THE PARTS, never taken as a prop. A row
 * that prints "45% P" beside a bar drawn from different numbers is the
 * quietest kind of wrong, and it survives every test that checks the two
 * separately.
 *
 * A DAY WITH NOTHING IN IT IS NOT A DAY OF ZEROES. With no parts the row says
 * so in words instead of drawing an empty track, because an empty bar and a
 * bar of nothing-but-carbs are the same picture at a glance.
 */
export default function RailSplits({
  rows,
  label,
  heading,
  format,
  emptyLabel,
  locale,
  source,
  onSelect,
  className,
}: RailSplitsProps) {
  if (rows.length === 0) return null;
  const pf = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <section
      className={["rail-splits", className].filter(Boolean).join(" ")}
      data-rail-splits={source}
    >
      {heading && <h2 className="rail-splits__heading">{heading}</h2>}

      <ul className="rail-splits__rows" aria-label={label}>
        {rows.map((row) => {
          const total = row.parts.reduce(
            (sum, part) => sum + Math.max(part.value, 0),
            0,
          );
          const shares = row.parts.map((part) => ({
            part,
            percent: total > 0 ? (Math.max(part.value, 0) / total) * 100 : 0,
          }));
          const summary =
            total > 0
              ? format
                ? format(shares)
                : shares
                    .map(
                      ({ part, percent }) =>
                        `${pf.format(percent / 100)} ${part.label.slice(0, 1)}`,
                    )
                    .join(" · ")
              : emptyLabel;

          const body = (
            <>
              <span className="rail-splits__head">
                <span className="rail-splits__label">{row.label}</span>
                {summary && (
                  <span className="rail-splits__summary">{summary}</span>
                )}
              </span>
              {total > 0 && (
                <span className="rail-splits__bar">
                  {shares.map(({ part, percent }) => (
                    <span
                      className="rail-splits__part"
                      key={part.id}
                      style={{
                        inlineSize: `${percent}%`,
                        ...(part.tone
                          ? ({ "--_part-tone": part.tone } as React.CSSProperties)
                          : {}),
                      }}
                      /* The summary above says the same thing in words and in
                         the same order; a screen reader reading both hears the
                         day twice. */
                      aria-hidden="true"
                    />
                  ))}
                </span>
              )}
            </>
          );

          return (
            <li className="rail-splits__row" key={row.id}>
              {row.href ? (
                <a
                  className="rail-splits__link"
                  href={row.href}
                  onClick={() => onSelect?.({ source, id: row.id })}
                >
                  {body}
                </a>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
