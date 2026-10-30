"use client";

import type { ReactNode } from "react";

export type RailField = {
  id: string;
  /** What the setting is: "Birthday". */
  label: string;
  /**
   * What it is set to right now, as the person would read it: "6/1/1990",
   * "5 ft 6 in". Formatting is the site's: a component that formats a date
   * here formats it for every country the same way.
   */
  value?: ReactNode;
  /** Shown instead of the value when nothing is set. */
  emptyLabel?: string;
  /** The row's own action. Usually "Edit"; sometimes "Add", "Verify". */
  action?: { label: string };
  /** The row cannot be changed here, and why. */
  lockedLabel?: string;
};

export type RailFieldsProps = {
  fields: RailField[];
  /** What the group is: "Profile", "Security". */
  label: string;
  heading?: string;
  source: string;
  onAct?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * The settings group: a name, what it is set to, and the way to change it.
 *
 * THE BUTTON'S NAME CARRIES THE ROW'S. Eleven buttons all called "Edit" is a
 * screen reader's list of eleven identical controls, which is the same as no
 * list at all; here the accessible name is "Edit Birthday" while the visible
 * word stays "Edit". Nothing about the design changes and the row becomes
 * findable.
 *
 * THE VALUE IS SHOWN, ALWAYS. A settings row that hides what it is set to
 * makes a person open it to find out, and then they are in an editor they did
 * not want to be in. `emptyLabel` covers the not-set case in words rather
 * than leaving a blank that reads as a rendering bug.
 *
 * A LOCKED ROW SAYS WHY. `lockedLabel` replaces the button with the reason —
 * never a disabled button, which is a target that swallows a press and
 * explains nothing.
 */
export default function RailFields({
  fields,
  label,
  heading,
  source,
  onAct,
  className,
}: RailFieldsProps) {
  if (fields.length === 0) return null;

  return (
    <section
      className={["rail-fields", className].filter(Boolean).join(" ")}
      data-rail-fields={source}
    >
      {heading && <h2 className="rail-fields__heading">{heading}</h2>}

      {/* NOT A <dl>, though the shape begs for one. A description list allows
          dt/dd as children or ONE div wrapping them — and this row needs a
          wrapper for the text AND a button beside it, which puts every dt two
          levels deep and the button somewhere it may not be. Measured: 12
          invalid nodes in one story. A list of rows is honest and valid. */}
      <ul className="rail-fields__list" aria-label={label}>
        {fields.map((field) => (
          <li className="rail-fields__row" key={field.id}>
            <span className="rail-fields__text">
              <span className="rail-fields__label">{field.label}</span>
              <span className="rail-fields__value">
                {field.value ?? (
                  <span className="rail-fields__empty">{field.emptyLabel}</span>
                )}
              </span>
            </span>

            {field.lockedLabel ? (
              <p className="rail-fields__locked">{field.lockedLabel}</p>
            ) : (
              field.action && (
                <button
                  type="button"
                  className="rail-fields__act"
                  onClick={() => onAct?.({ source, id: field.id })}
                >
                  <span aria-hidden="true">{field.action.label}</span>
                  <span className="rail-sr-only">
                    {field.action.label} {field.label}
                  </span>
                </button>
              )
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
