"use client";

export type RailStreakDay = {
  /** An ISO date, or whatever the site keys a day by. */
  id: string;
  /** How the day reads aloud: "Monday 22 September". */
  label: string;
  done: boolean;
  /**
   * A day that has not happened yet. Drawn as nothing rather than as a miss,
   * because the future is not a failure — and a grid that says otherwise
   * reads as a worse week than the person is having.
   */
  future?: boolean;
};

export type RailStreakProps = {
  days: RailStreakDay[];
  /** What the habit is: "Weigh-in". */
  title: string;
  /** The window: "Last 30 Days". */
  period: string;
  /** The count that matters now, already phrased: "1/7 this week". */
  summary?: string;
  /** Where the habit's own page is. */
  href?: string;
  source: string;
  onSelect?: (info: { source: string }) => void;
  className?: string;
};

/**
 * A month of a habit as a grid of marks, and the count for this week under
 * it.
 *
 * WHY THE WEEK'S COUNT AND NOT THE STREAK. A streak is a number that can only
 * be lost, and a person who misses a Tuesday after forty days is told they
 * have nothing — which is both false and the moment they stop. "5/7 this
 * week" survives a bad day, and it is the number that answers what to do
 * today. The component takes the phrase already written rather than counting,
 * because a week does not start on the same day in every country.
 *
 * THREE STATES, NOT TWO: done, missed, and not yet. Collapsing the third into
 * the second draws the rest of the month as failure.
 */
export default function RailStreak({
  days,
  title,
  period,
  summary,
  href,
  source,
  onSelect,
  className,
}: RailStreakProps) {
  const done = days.filter((day) => day.done).length;

  const body = (
    <>
      <span className="rail-streak__title">{title}</span>
      <span className="rail-streak__period">{period}</span>
      <span className="rail-streak__grid" aria-hidden="true">
        {days.map((day) => (
          <span
            className="rail-streak__day"
            key={day.id}
            data-rail-state={
              day.future ? "future" : day.done ? "done" : "missed"
            }
          />
        ))}
      </span>
      {/* The grid is a picture; this is the fact it draws. */}
      <span className="rail-sr-only">
        {`${done} / ${days.filter((day) => !day.future).length}`}
      </span>
      {summary && (
        <span className="rail-streak__foot">
          <span className="rail-streak__summary">{summary}</span>
          {href && (
            <span className="rail-streak__chevron" aria-hidden="true">
              ›
            </span>
          )}
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <section
        className={["rail-streak", className].filter(Boolean).join(" ")}
        data-rail-streak={source}
      >
        {body}
      </section>
    );
  }

  return (
    <a
      className={["rail-streak", className].filter(Boolean).join(" ")}
      data-rail-streak={source}
      href={href}
      onClick={() => onSelect?.({ source })}
    >
      {body}
    </a>
  );
}
