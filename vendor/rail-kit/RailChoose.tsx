"use client";

import type { ReactNode } from "react";

export type RailChoice = {
  id: string;
  /** "D — Daily". The whole choice, in the site's words. */
  label: string;
  /** What it means, under the label. */
  detail?: ReactNode;
  /** Present but not selectable, and the reason is said out loud. */
  unavailableLabel?: string;
};

export type RailChooseProps = {
  choices: RailChoice[];
  /** Which one is on. */
  selectedId: string;
  /** What is being chosen: "Chart averaging". */
  label: string;
  heading?: string;
  /**
   * The name the group submits under, when it is inside a form. Without it
   * the choices are still a radio group for assistive technology — they just
   * do not post.
   */
  name?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * One of several, picked: the list inside a settings sheet.
 *
 * NOT `RailOptions`, which is a ROW of two-line commercial choices — terms on
 * top, price underneath. This is a vertical list where the mark is the whole
 * point and the choice takes effect at once.
 *
 * THEY ARE REAL RADIO INPUTS. A list of divs with `aria-checked` loses arrow
 * keys, loses the group's own name, and loses the browser's idea of which one
 * has focus; a radio group gets all three for free and a brand can still draw
 * the mark however it likes. The visible circle is drawn from the input's own
 * checked state, so the drawing cannot disagree with the value.
 *
 * NO CONFIRM BUTTON, deliberately: a sheet with one setting and an OK asks
 * for two presses to change one thing. If yours needs confirming, it has more
 * than one setting and it is a form, not this.
 */
export default function RailChoose({
  choices,
  selectedId,
  label,
  heading,
  name,
  source,
  onSelect,
  className,
}: RailChooseProps) {
  if (choices.length === 0) return null;
  const group = name ?? `rail-choose-${source}`;

  return (
    <section
      className={["rail-choose", className].filter(Boolean).join(" ")}
      data-rail-choose={source}
      role="radiogroup"
      aria-label={label}
    >
      {heading && <h2 className="rail-choose__heading">{heading}</h2>}

      <ul className="rail-choose__list">
        {choices.map((choice) => (
          <li className="rail-choose__item" key={choice.id}>
            <label
              className="rail-choose__choice"
              data-rail-unavailable={choice.unavailableLabel ? "" : undefined}
            >
              <input
                className="rail-choose__input"
                type="radio"
                name={group}
                value={choice.id}
                checked={choice.id === selectedId}
                disabled={Boolean(choice.unavailableLabel)}
                onChange={() => onSelect?.({ source, id: choice.id })}
              />
              <span className="rail-choose__text">
                <span className="rail-choose__label">{choice.label}</span>
                {choice.detail && (
                  <span className="rail-choose__detail">{choice.detail}</span>
                )}
                {choice.unavailableLabel && (
                  <span className="rail-choose__unavailable">
                    {choice.unavailableLabel}
                  </span>
                )}
              </span>
              <span className="rail-choose__mark" aria-hidden="true" />
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
