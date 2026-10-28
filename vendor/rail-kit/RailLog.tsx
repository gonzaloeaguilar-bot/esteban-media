"use client";

import type { ReactNode } from "react";

export type RailLogEntry = {
  id: string;
  /** What was logged: "Rice White Cooked Without Salt". */
  title: string;
  /** The figures under it, already formatted: "390 kcal · 7P · 1F · 86C". */
  meta?: ReactNode;
  /** How much of it: "300 g". */
  amount?: ReactNode;
  /** A mark, a photograph, an emoji. */
  glyph?: ReactNode;
  /** The row's own action. Usually editing it. */
  action?: { label: string; glyph?: ReactNode };
};

export type RailLogGroup = {
  id: string;
  /** When this group happened: "16:00", "Breakfast". */
  at: string;
  entries: RailLogEntry[];
};

export type RailLogProps = {
  groups: RailLogGroup[];
  /** What the log is: "Today's food log". */
  label: string;
  heading?: string;
  /** Shown when a group has a time but nothing in it. */
  emptyLabel?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  onAct?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * What happened today, in the order it happened: a time, and the things
 * logged against it.
 *
 * THE TIME IS A HEADING, NOT A LABEL ON THE FIRST ROW. Three foods at 16:00
 * are one event to the person who ate them; hanging the time off the first
 * card makes the other two look like they happened at no time at all. The
 * rail down the side is the thread between them, and it is drawn, not
 * announced.
 *
 * EVERY ROW HAS TWO THINGS TO DO AND THEY ARE TWO TARGETS: open it, or edit
 * it. The card is not one big button with a pencil painted inside — the same
 * rule `RailGoods` follows, for the same reason.
 *
 * AN EMPTY HOUR IS KEPT, not skipped, when the site passes it: the gaps are
 * how a day reads as a day rather than as a list. `emptyLabel` says so in
 * words.
 */
export default function RailLog({
  groups,
  label,
  heading,
  emptyLabel,
  source,
  onSelect,
  onAct,
  className,
}: RailLogProps) {
  if (groups.length === 0) return null;

  return (
    <section
      className={["rail-log", className].filter(Boolean).join(" ")}
      data-rail-log={source}
      aria-label={label}
    >
      {heading && <h2 className="rail-log__heading">{heading}</h2>}

      <ol className="rail-log__groups">
        {groups.map((group) => (
          <li className="rail-log__group" key={group.id}>
            <h3 className="rail-log__at">{group.at}</h3>

            {group.entries.length === 0 ? (
              emptyLabel && <p className="rail-log__empty">{emptyLabel}</p>
            ) : (
              <ul className="rail-log__entries">
                {group.entries.map((entry) => (
                  <li className="rail-log__entry" key={entry.id}>
                    <button
                      type="button"
                      className="rail-log__open"
                      onClick={() => onSelect?.({ source, id: entry.id })}
                    >
                      {entry.glyph && (
                        <span className="rail-log__glyph" aria-hidden="true">
                          {entry.glyph}
                        </span>
                      )}
                      <span className="rail-log__text">
                        <span className="rail-log__title">{entry.title}</span>
                        {entry.meta && (
                          <span className="rail-log__meta">{entry.meta}</span>
                        )}
                        {entry.amount && (
                          <span className="rail-log__amount">
                            {entry.amount}
                          </span>
                        )}
                      </span>
                    </button>

                    {entry.action && (
                      <button
                        type="button"
                        className="rail-log__act"
                        onClick={() => onAct?.({ source, id: entry.id })}
                      >
                        <span aria-hidden="true">
                          {entry.action.glyph ?? "✎"}
                        </span>
                        <span className="rail-sr-only">
                          {entry.action.label} {entry.title}
                        </span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
