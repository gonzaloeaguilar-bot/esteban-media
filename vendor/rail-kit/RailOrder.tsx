"use client";

import type { ReactNode } from "react";

export type RailOrderLine = {
  id: string;
  label: string;
  /** Already formatted, currency included: "$18.86", "FREE". */
  amount: string;
  /** The price before it was waived, struck through: shipping at "$9.99". */
  was?: string;
  /** A mark before the label — a membership, a tier. */
  tag?: ReactNode;
};

export type RailOrderRow = {
  id: string;
  /** "Paying with", "Delivering to". */
  label: string;
  /** "Visa 1420", the name on the address. */
  value: string;
  /** The rest of it, under the value: the street, the card's expiry. */
  detail?: ReactNode;
  /** Where it is changed. A link, because it is a different page. */
  change?: { label: string; href: string };
};

export type RailOrderProps = {
  /** Items, shipping, tax — everything above the total. */
  lines: RailOrderLine[];
  total: { label: string; amount: string };
  /**
   * The one irreversible press. It is a button, never a link: a link is
   * followed by a prefetcher, a crawler and a middle-click, and this one
   * takes money.
   */
  action: { label: string; onAct: () => void; busyLabel?: string; busy?: boolean };
  /** What the press agrees to. Shown ABOVE the button, where it is read. */
  terms?: ReactNode;
  /** Payment, address, anything else that has a value and a way to change it. */
  rows?: RailOrderRow[];
  /** "Arriving Sep 25" plus the condition under it. */
  arrival?: { label: string; detail?: ReactNode };
  heading?: string;
  /** What the set is, for a screen reader: "Order summary". */
  label: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * The last screen: what it costs, what it is charged to, where it goes, when
 * it lands, and the press that spends the money.
 *
 * WHY THE TOTAL IS NOT JUST ANOTHER LINE. It is the number the shopper
 * decides on, and the one every other figure has to add up to. It renders as
 * its own row with its own weight so the eye cannot mistake the subtotal for
 * the amount being charged — which is exactly what happens when a shipping
 * waiver sits under a bolded items figure.
 *
 * THE COMPONENT DOES NO ARITHMETIC. Every amount arrives formatted. Tax,
 * rounding and currency are the site's law, not a component's guess, and a
 * total computed here could quietly disagree with the one the payment
 * processor charges.
 *
 * `terms` SITS ABOVE THE BUTTON. Below it, the sentence is a footnote after
 * the decision; above it, it is part of the decision. The same words, and
 * only one of the two placements is consent.
 *
 * Pair it with `RailStickyBar` when the summary is longer than the screen:
 * this component keeps its own press, and the bar repeats it.
 */
export default function RailOrder({
  lines,
  total,
  action,
  terms,
  rows,
  arrival,
  heading,
  label,
  source,
  onSelect,
  className,
}: RailOrderProps) {
  return (
    <section
      className={["rail-order", className].filter(Boolean).join(" ")}
      data-rail-order={source}
      aria-label={label}
    >
      {heading && <h2 className="rail-order__heading">{heading}</h2>}

      {terms && <p className="rail-order__terms">{terms}</p>}

      <button
        type="button"
        className="rail-order__act"
        onClick={action.onAct}
        /* Not disabled: a disabled button loses focus mid-press and stops
           announcing. Busy keeps it in the tab order and says what it is
           doing. */
        aria-busy={action.busy || undefined}
      >
        {action.busy ? action.busyLabel ?? action.label : action.label}
      </button>

      <dl className="rail-order__lines">
        {lines.map((line) => (
          <div className="rail-order__line" key={line.id}>
            <dt className="rail-order__line-label">
              {line.tag && <span className="rail-order__tag">{line.tag}</span>}
              {line.label}
            </dt>
            <dd className="rail-order__line-amount">
              {line.was && <s className="rail-order__was">{line.was}</s>}
              {line.amount}
            </dd>
          </div>
        ))}
        <div className="rail-order__line" data-rail-total="">
          <dt className="rail-order__line-label">{total.label}</dt>
          <dd className="rail-order__line-amount">{total.amount}</dd>
        </div>
      </dl>

      {rows?.map((row) => (
        <div className="rail-order__row" key={row.id}>
          <p className="rail-order__row-label">
            {row.label} <strong className="rail-order__row-value">{row.value}</strong>
          </p>
          {row.detail && <p className="rail-order__row-detail">{row.detail}</p>}
          {row.change && (
            <a
              className="rail-order__change"
              href={row.change.href}
              onClick={() => onSelect?.({ source, id: row.id })}
            >
              {row.change.label}
            </a>
          )}
        </div>
      ))}

      {arrival && (
        <div className="rail-order__arrival">
          <p className="rail-order__arrival-label">{arrival.label}</p>
          {arrival.detail && (
            <p className="rail-order__arrival-detail">{arrival.detail}</p>
          )}
        </div>
      )}
    </section>
  );
}
