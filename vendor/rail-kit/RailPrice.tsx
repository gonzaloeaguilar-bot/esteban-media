"use client";

import type { ReactNode } from "react";

export type RailPriceProps = {
  /** What it costs today, as a plain string: "39.99", "18,300". */
  now: string;
  /** Currency mark. Rendered small and raised, before the figure. */
  currency?: string;
  /**
   * The price this was actually sold at before. ONLY pass one you charged:
   * a struck-through number that was never a real price is illegal in most
   * places the kit's consumers trade, and the component cannot check it.
   */
  was?: string;
  /** "From", "Now", "Per month" — what qualifies the figure. */
  prefix?: string;
  /** A second, lower price and what unlocks it: "$24.99 with coupons". */
  secondary?: { amount: string; condition: string };
  /** Per-unit tail, small: "/mo", "/night", "each". */
  unit?: string;
  size?: "md" | "lg";
  source: string;
  className?: string;
};

/** "39.99" -> ["39", "99"] so the cents can sit small and raised. */
function split(amount: string): [string, string | null] {
  const match = amount.match(/^(.*?)([.,]\d{2})$/);
  return match ? [match[1], match[2].slice(1)] : [amount, null];
}

/**
 * A price, with everything that qualifies it.
 *
 * Big figure, small cents — the typographic trick every shop uses, and it is
 * fine: the pounds are the decision and the pence are the detail. What is not
 * fine is the rest of the block going missing, which is why `was`, `secondary`
 * and `unit` are all on the same component rather than left to each site.
 *
 * ON `was`: **only pass a price you actually charged.** A struck-through
 * number that was never real is a fabricated saving, illegal in most places
 * the kit's consumers trade, and nothing here can check it. The component
 * computes the discount from the two figures rather than taking it as a prop,
 * so at least the percentage cannot disagree with the numbers beside it.
 */
export default function RailPrice({
  now,
  currency = "$",
  was,
  prefix,
  secondary,
  unit,
  size = "md",
  source,
  className,
}: RailPriceProps) {
  const [whole, cents] = split(now);

  // Derived, never passed: a discount prop can drift from the prices it claims
  // to describe, and then the card lies in a way nobody notices.
  const toNumber = (s: string) => Number(s.replace(/[^\d.]/g, ""));
  const nowNum = toNumber(now);
  const wasNum = was ? toNumber(was) : null;
  const off =
    wasNum && nowNum && wasNum > nowNum
      ? Math.round(((wasNum - nowNum) / wasNum) * 100)
      : null;

  return (
    <p
      className={["rail-price", className].filter(Boolean).join(" ")}
      data-rail-price={source}
      data-rail-size={size}
    >
      {prefix && <span className="rail-price__prefix">{prefix}</span>}
      {/* The figure is split into currency, pounds and pence so the pence can
          sit small and raised. That is a TYPOGRAPHIC decomposition, and a
          screen reader reading the spans in turn announces "$", "39", ".99" as
          three separate things. The group carries the whole price as one
          accessible name and hides its own pieces, so the price is heard the
          way it is read. */}
      <span className="rail-price__now">
        {/* aria-label on a bare <span> is ignored by most screen readers, and
            role="text" is a Safari quirk, not ARIA. The reliable construct is
            the one the rest of this kit already uses: hide the typographic
            pieces and put the whole price in visually-hidden text. */}
        <span className="rail-sr-only">
          {`${currency ?? ""}${now}${unit ?? ""}`}
        </span>
        <span className="rail-price__currency" aria-hidden="true">{currency}</span>
        <span className="rail-price__whole" aria-hidden="true">{whole}</span>
        {cents && <span className="rail-price__cents" aria-hidden="true">.{cents}</span>}
        {unit && <span className="rail-price__unit" aria-hidden="true">{unit}</span>}
      </span>
      {was && (
        <s className="rail-price__was">
          {currency}
          {was}
        </s>
      )}
      {off !== null && <span className="rail-price__off">-{off}%</span>}
      {secondary && (
        <span className="rail-price__secondary">
          {prefix && <span>{prefix} </span>}
          <span className="rail-price__secondary-amount">
            {currency}
            {secondary.amount}
          </span>{" "}
          {secondary.condition}
        </span>
      )}
    </p>
  );
}
