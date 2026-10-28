"use client";

import type { ReactNode } from "react";

export type RailReadoutItem = {
  id: string;
  /** The figure or the word being reported: "1534", "Holding". */
  value: ReactNode;
  /** Its unit, under the value: "kcal". A state has none. */
  unit?: string;
  /** What it is: "Current Expenditure". */
  title: string;
  /**
   * What it MEANS — the sentence or two that makes the number usable. This is
   * the whole point of the component; see below.
   */
  body: ReactNode;
  /** Where the full thing lives. */
  href?: string;
};

export type RailReadoutProps = {
  items: RailReadoutItem[];
  /** What the set is: "Your current estimates". */
  label: string;
  heading?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * A number, and the paragraph that makes it mean something.
 *
 * NOT `RailStats` or `RailFigures`, which put two to four figures side by
 * side for a reader who already knows what they are. This is the opposite
 * case: a derived estimate — an expenditure, a state called "Holding", a risk
 * band — where the number without its explanation is either meaningless or,
 * worse, confidently misread. "1534 kcal" is a fact; "the latest estimate of
 * your daily energy expenditure based on your weight trend and nutrition
 * data" is what stops it being treated as a measurement.
 *
 * `body` IS REQUIRED. A readout with the explanation made optional becomes a
 * stats tile with extra padding the first time someone is in a hurry, and the
 * number goes back out into the world naked. If there is nothing to explain,
 * this is the wrong component and `RailStats` is the right one.
 *
 * THE VALUE BLOCK IS NOT A CHART, a badge or a colour-coded verdict: it says
 * what it is and nothing more. A readout that turns amber has made a judgement
 * the sentence beside it has not.
 */
export default function RailReadout({
  items,
  label,
  heading,
  source,
  onSelect,
  className,
}: RailReadoutProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={["rail-readout", className].filter(Boolean).join(" ")}
      data-rail-readout={source}
    >
      {heading && <h2 className="rail-readout__heading">{heading}</h2>}

      <ul className="rail-readout__items" aria-label={label}>
        {items.map((item) => {
          const body = (
            <>
              <span className="rail-readout__block">
                <span className="rail-readout__value">{item.value}</span>
                {item.unit && (
                  <span className="rail-readout__unit">{item.unit}</span>
                )}
              </span>
              <span className="rail-readout__text">
                <span className="rail-readout__title">{item.title}</span>
                <span className="rail-readout__body">{item.body}</span>
              </span>
            </>
          );

          return (
            <li className="rail-readout__item" key={item.id}>
              {item.href ? (
                <a
                  className="rail-readout__link"
                  href={item.href}
                  onClick={() => onSelect?.({ source, id: item.id })}
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
