"use client";

import type { ReactNode } from "react";

export type RailCouponItem = {
  id: string;
  /** The saving, as it reads: "60% off", "$25 off", "Free delivery". */
  headline: string;
  /** The condition. "No minimum spend on eligible products." */
  terms: string;
  /**
   * When it stops working — a real date, or a real rule like "1 day after
   * claiming". Never a countdown: a clock designed to hurry somebody is the
   * pattern this kit refuses everywhere else.
   */
  validity?: string;
  /** Opens the small print. */
  onExplain?: () => void;
  explainLabel?: string;
  claimed?: boolean;
};

export type RailCouponsProps = {
  coupons: RailCouponItem[];
  heading?: string;
  subheading?: string;
  /** The one button that takes all of them. */
  action?: { label: string; onClick: () => void };
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * A stack of offers, perforated like a book of tickets.
 *
 * The perforation is a dashed border between the stubs, which is doing more
 * than decoration: it says these are separate things you take, not one block
 * of text with three prices in it.
 *
 * **No countdowns.** `validity` states a real rule — a date, or "1 day after
 * claiming" — because a ticking clock on a discount is manufactured urgency,
 * and the kit refuses it on cards, banners and buttons already.
 */
export default function RailCoupons({
  coupons,
  heading,
  subheading,
  action,
  source,
  onSelect,
  className,
}: RailCouponsProps) {
  if (coupons.length === 0) return null;

  return (
    <section
      className={["rail-coupons", className].filter(Boolean).join(" ")}
      data-rail-coupons={source}
    >
      {(heading || subheading) && (
        <div className="rail-coupons__head">
          {heading && <h2 className="rail-coupons__heading">{heading}</h2>}
          {subheading && <p className="rail-coupons__sub">{subheading}</p>}
        </div>
      )}
      <ul className="rail-coupons__list">
        {coupons.map((coupon) => (
          <li
            className="rail-coupons__coupon"
            key={coupon.id}
            data-rail-claimed={coupon.claimed ? "" : undefined}
          >
            <p className="rail-coupons__headline">{coupon.headline}</p>
            <p className="rail-coupons__terms">
              {coupon.terms}
              {coupon.onExplain && (
                <button
                  type="button"
                  className="rail-coupons__explain"
                  onClick={() => {
                    coupon.onExplain?.();
                    onSelect?.({ source, id: coupon.id });
                  }}
                >
                  <span aria-hidden="true">ⓘ</span>
                  <span className="rail-coupons__sr">
                    {coupon.explainLabel ?? `Terms for ${coupon.headline}`}
                  </span>
                </button>
              )}
            </p>
            {coupon.validity && (
              <p className="rail-coupons__validity">{coupon.validity}</p>
            )}
          </li>
        ))}
      </ul>
      {action && (
        <button
          type="button"
          className="rail-coupons__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </section>
  );
}
