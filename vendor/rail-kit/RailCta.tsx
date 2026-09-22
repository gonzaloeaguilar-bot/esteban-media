"use client";

import type { ReactNode } from "react";

export type RailCtaProps = {
  /**
   * The words on the button — an imperative: "Open the drop", not "Drops".
   * A node, so a price that changed can show both: <><s>+663</s> → +893</>.
   */
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  /**
   * A line ABOVE the label, smaller — what this is. "Level 1 drop available".
   * It is context, not a second instruction.
   */
  eyebrow?: string;
  /**
   * A line BELOW the label, smaller still — a condition or a deadline.
   * "Expires 1 Oct, 12:00". State only what you can prove: a real date, a
   * real limit. Never an invented countdown.
   */
  fineprint?: string;
  variant?: "primary" | "secondary" | "link";
  size?: "md" | "lg";
  /** Fills its container. The right default for a phone. */
  block?: boolean;
  /** A mark before the label. */
  icon?: ReactNode;
  /** Draws a trailing arrow. For a CTA that leads somewhere, not one that acts. */
  arrow?: boolean;
  disabled?: boolean;
  source: string;
  className?: string;
};

/**
 * One call to action, standing on its own — outside a card, outside a rail.
 *
 * The stacked shape (eyebrow / label / fineprint) exists because the honest
 * version of an urgent button needs three registers at once: what this is,
 * what pressing it does, and what the catch is. Squeezing all three into one
 * line produces the button nobody trusts. Giving the catch its own line, in
 * the same control, is how it stays readable and still gets read.
 *
 * `disabled` renders a real disabled <button>. A disabled LINK does not exist
 * in HTML — an <a> without href is not focusable and announces as nothing —
 * so passing both `href` and `disabled` drops the href on purpose.
 */
export default function RailCta({
  label,
  href,
  onClick,
  eyebrow,
  fineprint,
  variant = "primary",
  size = "md",
  block,
  icon,
  arrow,
  disabled,
  source,
  className,
}: RailCtaProps) {
  const inner = (
    <>
      {eyebrow && <span className="rail-cta__eyebrow">{eyebrow}</span>}
      <span className="rail-cta__main">
        {icon && (
          <span className="rail-cta__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="rail-cta__label">{label}</span>
        {arrow && (
          <span className="rail-cta__arrow" aria-hidden="true">
            →
          </span>
        )}
      </span>
      {fineprint && <span className="rail-cta__fineprint">{fineprint}</span>}
    </>
  );

  const common = {
    className: ["rail-cta", className].filter(Boolean).join(" "),
    "data-rail-cta": source,
    "data-rail-variant": variant,
    "data-rail-size": size,
    "data-rail-block": block ? "" : undefined,
    "data-rail-stacked": eyebrow || fineprint ? "" : undefined,
  };

  if (href && !disabled) {
    return (
      <a {...common} href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button {...common} type="button" onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
