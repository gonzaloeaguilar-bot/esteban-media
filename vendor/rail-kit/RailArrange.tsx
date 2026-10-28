"use client";

import type { ReactNode } from "react";

export type RailArrangeItem = {
  id: string;
  /** What the row is: "Weigh-In", "Expenditure". */
  label: string;
  /** A miniature of the thing being arranged — a sparkline, three dots. */
  preview?: ReactNode;
  /** When the row can also be switched off without being removed. */
  on?: boolean;
};

export type RailArrangeProps = {
  items: RailArrangeItem[];
  /** What the set is: "Insights & Analytics". */
  label: string;
  heading?: string;
  /**
   * The words on the two move buttons, with the row's label appended for a
   * screen reader: "Move up" -> "Move up Weigh-In".
   */
  upLabel?: string;
  downLabel?: string;
  /** The switch's name, when rows carry one: "Show". */
  toggleLabel?: string;
  /** The button under the list: "Add or Remove Habits". */
  action?: { label: string; onAct: () => void };
  source: string;
  onMove?: (info: {
    source: string;
    id: string;
    from: number;
    to: number;
  }) => void;
  onToggle?: (info: { source: string; id: string; on: boolean }) => void;
  className?: string;
};

/**
 * The list a person puts in their own order.
 *
 * TWO BUTTONS, NOT A DRAG HANDLE. The grip is drawn — it is what a thumb
 * reaches for and leaving it out would be worse — but the ORDER CHANGES
 * THROUGH THE BUTTONS, and they are real buttons with real names. A list that
 * can only be reordered by dragging cannot be reordered by a keyboard, by a
 * switch, by voice, or by anybody whose hand is not steady, and "reorder your
 * dashboard" is exactly the setting those people need most. Wire your own
 * pointer dragging on top if you want it; this is the floor, not the ceiling.
 *
 * THE FIRST ROW HAS NO "UP" AND THE LAST HAS NO "DOWN". They are absent, not
 * disabled: a disabled button is a target that swallows a press and says
 * nothing about why.
 *
 * The order is the SITE'S state, not the component's. It renders what it is
 * given and reports the move — a list that reorders itself and tells you
 * afterwards is a list that disagrees with your database the moment a save
 * fails.
 */
export default function RailArrange({
  items,
  label,
  heading,
  upLabel = "Move up",
  downLabel = "Move down",
  toggleLabel,
  action,
  source,
  onMove,
  onToggle,
  className,
}: RailArrangeProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={["rail-arrange", className].filter(Boolean).join(" ")}
      data-rail-arrange={source}
    >
      {heading && <h2 className="rail-arrange__heading">{heading}</h2>}

      <ul className="rail-arrange__list" aria-label={label}>
        {items.map((item, index) => (
          <li className="rail-arrange__row" key={item.id}>
            {item.preview && (
              <span className="rail-arrange__preview" aria-hidden="true">
                {item.preview}
              </span>
            )}

            <span className="rail-arrange__label">{item.label}</span>

            {typeof item.on === "boolean" && toggleLabel && (
              <button
                type="button"
                className="rail-arrange__switch"
                role="switch"
                aria-checked={item.on}
                onClick={() => onToggle?.({ source, id: item.id, on: !item.on })}
              >
                <span className="rail-sr-only">
                  {toggleLabel} {item.label}
                </span>
                <span className="rail-arrange__knob" aria-hidden="true" />
              </button>
            )}

            <span className="rail-arrange__moves">
              {/* BOTH SLOTS ARE ALWAYS DRAWN, even when one holds no button.
                  Without them the first row's "down" slides into the "up"
                  column and the last row's "up" lands where every other row
                  keeps "down": the two arrows change place down the list and
                  the eye has to find them again on every row. The slot is
                  empty, not a disabled button — there is still nothing to
                  press. */}
              <span className="rail-arrange__slot">
                {index > 0 && (
                  <button
                    type="button"
                    className="rail-arrange__move"
                    onClick={() =>
                      onMove?.({ source, id: item.id, from: index, to: index - 1 })
                    }
                  >
                    <span aria-hidden="true">↑</span>
                    <span className="rail-sr-only">
                      {upLabel} {item.label}
                    </span>
                  </button>
                )}
              </span>
              <span className="rail-arrange__slot">
                {index < items.length - 1 && (
                  <button
                    type="button"
                    className="rail-arrange__move"
                    onClick={() =>
                      onMove?.({ source, id: item.id, from: index, to: index + 1 })
                    }
                  >
                    <span aria-hidden="true">↓</span>
                    <span className="rail-sr-only">
                      {downLabel} {item.label}
                    </span>
                  </button>
                )}
              </span>
              {/* Drawn, not operable: the grip says "this row moves", and the
                  two buttons beside it are how. */}
              <span className="rail-arrange__grip" aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>

      {action && (
        <button
          type="button"
          className="rail-arrange__action"
          onClick={action.onAct}
        >
          {action.label}
        </button>
      )}
    </section>
  );
}
