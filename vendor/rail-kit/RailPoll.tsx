"use client";

import type { ReactNode } from "react";

export type RailPollSide = {
  id: string;
  name: string;
  votes: number;
};

export type RailPollProps = {
  sides: [RailPollSide, RailPollSide];
  /** What was asked. Required — a result with no question is a bar. */
  question: string;
  /** The one the reader picked, if they have. Draws the check. */
  chosenId?: string;
  /** Overrides "1,474 total votes". */
  totalLabel?: (total: number) => ReactNode;
  source: string;
  className?: string;
};

const nf = new Intl.NumberFormat();

/**
 * The result of a two-way vote: both counts, the total, and the split.
 *
 * Every number here is stated, not just drawn. A bar on its own is a feeling;
 * with 954, 520 and 1,474 beside it, a reader can add them up and check that
 * the picture matches. That also means the percentages cannot quietly drift
 * from the counts, because both are on screen.
 *
 * The check marks the reader's OWN pick, not the winner. Marking the winner
 * would make a majority look like a verdict, which is the bit of social proof
 * that turns a poll into a nudge.
 */
export default function RailPoll({
  sides,
  question,
  chosenId,
  totalLabel,
  source,
  className,
}: RailPollProps) {
  const [left, right] = sides;
  const total = Math.max(0, left.votes) + Math.max(0, right.votes);
  // No votes is not a tie. Drawing a half-full bar for it would invent a result.
  const leftPct = total > 0 ? Math.round((left.votes / total) * 100) : null;
  const rightPct = leftPct === null ? null : 100 - leftPct;

  return (
    <section
      className={["rail-poll", className].filter(Boolean).join(" ")}
      data-rail-poll={source}
      aria-label={question}
    >
      <div className="rail-poll__heads">
        <p className="rail-poll__side">
          <span className="rail-poll__name">{left.name}</span>
          <span className="rail-poll__votes">{nf.format(left.votes)} votes</span>
        </p>
        <p className="rail-poll__total">
          {totalLabel ? totalLabel(total) : `${nf.format(total)} total votes`}
        </p>
        <p className="rail-poll__side" data-rail-side="right">
          <span className="rail-poll__name">{right.name}</span>
          <span className="rail-poll__votes">{nf.format(right.votes)} votes</span>
        </p>
      </div>

      {leftPct === null ? (
        <p className="rail-poll__empty">No votes yet.</p>
      ) : (
        <div className="rail-poll__bar">
          {sides.map((side, index) => {
            const pct = index === 0 ? leftPct : rightPct;
            return (
              <span
                className="rail-poll__fill"
                key={side.id}
                data-rail-chosen={side.id === chosenId ? "" : undefined}
                style={{ inlineSize: `${pct}%` }}
              >
                <span className="rail-poll__pct">{pct}%</span>
                {side.id === chosenId && (
                  <span className="rail-poll__check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </span>
            );
          })}
        </div>
      )}
      {chosenId && (
        <p className="rail-poll__sr">
          You picked {sides.find((s) => s.id === chosenId)?.name}.
        </p>
      )}
    </section>
  );
}
