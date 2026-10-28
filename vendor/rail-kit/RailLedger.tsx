"use client";

import type { ReactNode } from "react";

export type RailLedgerEntry = {
  id: string;
  /** The figure for that day, already formatted: "1534 kcal". */
  value: ReactNode;
  /** When: "Fri, Sep 25". */
  when: string;
  /**
   * What happened to it. Either a change from the day before, or a named
   * state — and the two are drawn differently on purpose, see below.
   */
  state:
    | { kind: "change"; change: number; format?: (change: number) => ReactNode }
    | { kind: "state"; label: string };
};

export type RailLedgerGroup = {
  id: string;
  /** The month, the week, the season: "September 2026". */
  title: string;
  entries: RailLedgerEntry[];
};

export type RailLedgerProps = {
  groups: RailLedgerGroup[];
  /** What the ledger is: "Expenditure history". */
  label: string;
  /**
   * How small a change still counts as none, in the same unit as `change`.
   * Default 0.
   */
  flatWithin?: number;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * The history, day by day, grouped by the month it happened in: what the
 * figure was, and what moved it.
 *
 * A CHANGE AND A STATE ARE NOT THE SAME COLUMN. "+1 kcal" is arithmetic;
 * "Holding" is the system saying it did not compute one — the estimate stood
 * still because it had nothing to work with. Rendering them as the same kind
 * of chip teaches a person to read "Holding" as a small number, which is the
 * one thing it is not. The mark differs, and a state is never given an arrow.
 *
 * `flatWithin` EXISTS BECAUSE ZERO IS RARELY ZERO — a hair of drift is not a
 * direction, and a column of arrows pointing at noise is a column nobody
 * reads.
 *
 * THE MONTH IS A HEADING INSIDE THE LIST, not a separate list per month: one
 * scroll, one thing, and the reader keeps their place when the month turns
 * over. The figures are the site's, already formatted — a ledger that rounds
 * is a ledger that disagrees with the screen it came from.
 */
export default function RailLedger({
  groups,
  label,
  flatWithin = 0,
  source,
  onSelect,
  className,
}: RailLedgerProps) {
  if (groups.length === 0) return null;

  return (
    <section
      className={["rail-ledger", className].filter(Boolean).join(" ")}
      data-rail-ledger={source}
      aria-label={label}
    >
      {groups.map((group) => (
        <section className="rail-ledger__group" key={group.id}>
          <h2 className="rail-ledger__title">{group.title}</h2>

          <ul className="rail-ledger__entries">
            {group.entries.map((entry) => {
              const isChange = entry.state.kind === "change";
              const change = isChange
                ? (entry.state as { change: number }).change
                : 0;
              const flat = isChange && Math.abs(change) <= flatWithin;
              const way = !isChange
                ? "state"
                : flat
                  ? "flat"
                  : change > 0
                    ? "up"
                    : "down";

              const row = (
                <>
                  <span className="rail-ledger__figures">
                    <span className="rail-ledger__value">{entry.value}</span>
                    <span className="rail-ledger__when">{entry.when}</span>
                  </span>
                  <span className="rail-ledger__state" data-rail-way={way}>
                    <span className="rail-ledger__mark" aria-hidden="true" />
                    {entry.state.kind === "state"
                      ? entry.state.label
                      : entry.state.format
                        ? entry.state.format(change)
                        : change}
                  </span>
                </>
              );

              return (
                <li className="rail-ledger__entry" key={entry.id}>
                  {onSelect ? (
                    <button
                      type="button"
                      className="rail-ledger__open"
                      onClick={() => onSelect({ source, id: entry.id })}
                    >
                      {row}
                    </button>
                  ) : (
                    row
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </section>
  );
}
