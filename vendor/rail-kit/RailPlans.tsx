"use client";

import type { ReactNode } from "react";
import RailPrice from "./RailPrice";

export type RailPlanFeature = {
  id: string;
  /** What you get: "500MB uploads". */
  label: string;
  /** A mark before it. */
  glyph?: ReactNode;
};

export type RailPlan = {
  id: string;
  /** The plan's name: "Nitro", "Nitro Basic". */
  name: string;
  /** What it costs, as a plain string: "9.99". */
  price: string;
  /** What that buys: "/ month". */
  period: string;
  features: RailPlanFeature[];
  /** The action. A plan card has exactly one. */
  action: { label: string };
  /** Art in the corner. Decoration: the features are the offer. */
  image?: { src: string; alt?: string };
  /** A flag over the card: "Best value", "Most popular". */
  flag?: string;
  /** The plan this person is already on. The action says so and does nothing. */
  currentLabel?: string;
  /** The plan's own colours, as a CSS background. */
  tone?: string;
};

export type RailPlansProps = {
  plans: RailPlan[];
  /** What the set is: "Choose a plan". */
  label: string;
  heading?: string;
  currency?: string;
  source: string;
  onChoose?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * Two or three plans, side by side or stacked, each one priced and spelled
 * out.
 *
 * NOT `RailTiers`, which is a rewards ladder — what you unlock by doing more.
 * These are things you BUY, and the difference is the price: a tier is earned
 * and a plan is charged, so this one carries `RailPrice` and a single action
 * per card.
 *
 * EVERY PLAN LISTS ITS OWN FEATURES IN FULL, and there is no "everything in
 * the plan above, plus" prop. That phrasing is why comparison tables exist:
 * it makes the cheaper plan unreadable on its own, and a person looking at
 * one card on a phone cannot see the card it refers to. Repetition costs
 * nothing; a reader reconstructing an offer from two cards costs the sale.
 *
 * NO PLAN IS STYLED AS THE OBVIOUS ONE by the component. `flag` puts a word
 * on a card — "Most popular" — and that word is the site's claim, written and
 * checkable. What the kit will not do is make one card bigger, brighter or
 * pre-selected on its own, because that is a recommendation nobody has taken
 * responsibility for.
 *
 * THE CURRENT PLAN IS NOT A DISABLED BUTTON: `currentLabel` replaces the
 * action with a statement, so the card says "Your plan" instead of offering a
 * press that goes nowhere.
 */
export default function RailPlans({
  plans,
  label,
  heading,
  currency = "$",
  source,
  onChoose,
  className,
}: RailPlansProps) {
  if (plans.length === 0) return null;

  return (
    <section
      className={["rail-plans", className].filter(Boolean).join(" ")}
      data-rail-plans={source}
    >
      {heading && <h2 className="rail-plans__heading">{heading}</h2>}

      <ul className="rail-plans__list" aria-label={label}>
        {plans.map((plan, index) => (
          <li className="rail-plans__cell" key={plan.id}>
            <article
              className="rail-plans__plan"
              style={
                plan.tone
                  ? ({ "--_plan-tone": plan.tone } as React.CSSProperties)
                  : undefined
              }
            >
              {plan.image && (
                <img
                  className="rail-plans__art"
                  src={plan.image.src}
                  /* The features are the offer; the mascot is not. */
                  alt={plan.image.alt ?? ""}
                  loading="lazy"
                />
              )}

              {plan.flag && <p className="rail-plans__flag">{plan.flag}</p>}

              <h3 className="rail-plans__name">{plan.name}</h3>

              {/* The period rides RailPrice's own `unit`, rather than sitting
                  beside it as a sibling. Tried that first: `RailPrice` is a
                  wrapping flex container, and as a flex item it measured 0px
                  wide while its currency, pounds and pence spilled out of it —
                  the cents dropped a line and the period landed on the figure.
                  The rect check said "same line" while the screen said
                  otherwise, which is why this was caught in a screenshot. */}
              <RailPrice
                now={plan.price}
                currency={currency}
                unit={plan.period}
                size="lg"
                source={`${source}:${plan.id}`}
                className="rail-plans__price"
              />

              <ul className="rail-plans__features">
                {plan.features.map((feature) => (
                  <li className="rail-plans__feature" key={feature.id}>
                    {feature.glyph && (
                      <span className="rail-plans__glyph" aria-hidden="true">
                        {feature.glyph}
                      </span>
                    )}
                    {feature.label}
                  </li>
                ))}
              </ul>

              {plan.currentLabel ? (
                <p className="rail-plans__current">{plan.currentLabel}</p>
              ) : (
                <button
                  type="button"
                  className="rail-plans__act"
                  onClick={() => onChoose?.({ source, id: plan.id, index })}
                >
                  <span aria-hidden="true">{plan.action.label}</span>
                  {/* "Get Nitro" and "Get Basic" are distinguishable; "Choose"
                      three times is not, and that is the common case. */}
                  <span className="rail-sr-only">
                    {plan.action.label} — {plan.name}
                  </span>
                </button>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
