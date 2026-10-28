"use client";

export type RailWeekDay = {
  id: string;
  /** The number in the ring: "21". */
  number: string;
  /** The two letters under it: "Mo". */
  weekday: string;
  /** How the day reads aloud, in full: "Monday 21 September". */
  label: string;
  /**
   * How much of the day is accounted for, 0 to 1. The ring draws it. Absent
   * means nothing was recorded — which is not the same as zero, and does not
   * draw a ring at all.
   */
  progress?: number;
  /** Today. Marked, and only one day can be. */
  today?: boolean;
  /** Not yet arrived: drawn quiet, never as a miss. */
  future?: boolean;
};

export type RailWeekProps = {
  days: RailWeekDay[];
  /** Which day is being shown below the strip. */
  selectedId: string;
  /** What the strip is: "Pick a day". */
  label: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * The week across the top: seven days, how full each one is, and the one you
 * are looking at.
 *
 * THE SELECTED DAY AND TODAY ARE TWO DIFFERENT MARKS. Every calendar strip
 * that draws them the same way tells a person looking at last Tuesday that it
 * is Tuesday today — and they will log a meal against the wrong date, which
 * is the one mistake a food diary cannot afford. Here the selection is a
 * filled ground and today is a dot under the number, so a day can be both,
 * either, or neither and still read correctly.
 *
 * A DAY WITH NOTHING RECORDED DRAWS NO RING. Not an empty one: an empty ring
 * and a ring at 2% are the same picture, and one of them means "you did not
 * open the app" while the other means "you ate an apple".
 *
 * They are buttons, and they carry the day's full name — "21" alone is not a
 * date to anyone who cannot see the column it sits in.
 */
export default function RailWeek({
  days,
  selectedId,
  label,
  source,
  onSelect,
  className,
}: RailWeekProps) {
  if (days.length === 0) return null;

  return (
    <section
      className={["rail-week", className].filter(Boolean).join(" ")}
      data-rail-week={source}
    >
      <ul className="rail-week__days" aria-label={label}>
        {days.map((day) => (
          <li className="rail-week__cell" key={day.id}>
            <button
              type="button"
              className="rail-week__day"
              data-rail-today={day.today ? "" : undefined}
              data-rail-future={day.future ? "" : undefined}
              aria-pressed={day.id === selectedId}
              onClick={() => onSelect?.({ source, id: day.id })}
            >
              <span className="rail-sr-only">{day.label}</span>
              {/* THE RING IS A CIRCLE, and it needs its own square to be one.
                  Drawn on the whole cell — which is a pill, taller than it is
                  wide — a conic sweep masked into a ring comes out as an
                  ellipse whose stroke thickens at the ends: the same 80% reads
                  as a different amount on a narrow phone than on a wide one. */}
              <span className="rail-week__disc">
              {typeof day.progress === "number" && (
                <span
                  className="rail-week__ring"
                  style={{
                    // A conic sweep is right here and wrong on the dial: this
                    // ring is 34px with no cap to round and no value to
                    // animate, and it costs no element.
                    ["--_sweep" as string]: `${
                      Math.min(Math.max(day.progress, 0), 1) * 360
                    }deg`,
                  }}
                  aria-hidden="true"
                />
              )}
              <span className="rail-week__number" aria-hidden="true">
                {day.number}
              </span>
              </span>
              <span className="rail-week__weekday" aria-hidden="true">
                {day.weekday}
              </span>
              {day.today && (
                <span className="rail-week__dot" aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
