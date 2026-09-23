"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type RailOfferProps = {
  /** The saving, as it reads: "25% off $15+ on convenience". */
  headline: string;
  /**
   * When it stops working. A real date — "Use by 22 Sep 2026" — or a real
   * rule. The kit draws no countdown anywhere, and an offer strip is where
   * that temptation is strongest.
   */
  validity?: string;
  /** Opens the small print. An offer with conditions owes a way to read them. */
  onExplain?: () => void;
  explainLabel?: string;
  glyph?: ReactNode;
  /** The one thing to do. Omit once it is claimed and pass `claimed`. */
  action?: { label: string; onClick?: () => void; href?: string };
  /** Renders as taken: quieter, and the action replaced by a state. */
  claimed?: boolean;
  claimedLabel?: string;
  source: string;
  className?: string;
};

/**
 * One offer, as a strip, with the ticket's notch bitten out of its edge.
 *
 * The notch is the whole visual argument: it says this is a thing you take,
 * not a banner you read past. RailCoupons is the same idea stacked into a
 * book; this is the single one that sits inline on a page.
 *
 * `validity` states a date or a rule and never a countdown. A ticking clock on
 * a discount is manufactured urgency, and the kit refuses it on cards,
 * banners, buttons and coupons already — the strip is not an exception because
 * it is small.
 */
export default function RailOffer({
  headline,
  validity,
  onExplain,
  explainLabel,
  glyph,
  action,
  claimed,
  claimedLabel = "Claimed",
  source,
  className,
}: RailOfferProps) {
  const root = useRef<HTMLDivElement>(null);
  const hasStub = Boolean(claimed || action);

  /**
   * THE NOTCH GOES WHERE THE STUB STARTS. It used to sit at a fixed 76% of
   * the strip, and the stub is as wide as its label: at 390px the tear line
   * ran at x=288 straight through "Get first word" (213–356). The tear line
   * itself is CSS and follows the stub on its own (rail.css); the two bites
   * are a mask on this element, and a mask cannot see where a child is, so
   * they are measured. Before this runs they fall back to 76%. A brand that
   * set --rail-offer-notch-at has placed them on purpose and keeps them.
   */
  useEffect(() => {
    const el = root.current;
    const stub = el?.querySelector<HTMLElement>(".rail-offer__action, .rail-offer__claimed");
    if (!el || !stub || typeof ResizeObserver !== "function") return;
    if (getComputedStyle(el).getPropertyValue("--rail-offer-notch-at").trim()) return;
    const place = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      el.style.setProperty("--_notch-at", `${stub.offsetLeft - gap / 2}px`);
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(el);
    observer.observe(stub);
    return () => {
      observer.disconnect();
      el.style.removeProperty("--_notch-at");
    };
  }, [claimed, action, claimedLabel]);

  return (
    <div
      ref={root}
      className={["rail-offer", className].filter(Boolean).join(" ")}
      data-rail-offer={source}
      data-rail-claimed={claimed ? "" : undefined}
      data-rail-stub={hasStub ? "" : undefined}
    >
      {glyph && (
        <span className="rail-offer__glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      <div className="rail-offer__text">
        <p className="rail-offer__headline">{headline}</p>
        {validity && (
          <p className="rail-offer__validity">
            {validity}
            {onExplain && (
              <button
                type="button"
                className="rail-offer__explain"
                onClick={onExplain}
              >
                <span aria-hidden="true">ⓘ</span>
                <span className="rail-offer__sr">
                  {explainLabel ?? `Terms for ${headline}`}
                </span>
              </button>
            )}
          </p>
        )}
      </div>
      {claimed ? (
        <span className="rail-offer__claimed">{claimedLabel}</span>
      ) : (
        action &&
        (action.href ? (
          <a className="rail-offer__action" href={action.href}>
            {action.label}
          </a>
        ) : (
          <button
            type="button"
            className="rail-offer__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))
      )}
    </div>
  );
}
