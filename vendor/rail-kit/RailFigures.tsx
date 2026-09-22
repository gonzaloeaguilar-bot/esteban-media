"use client";

import type { ReactNode } from "react";

export type RailFigure = {
  id: string;
  /** What the number is. Required — a figure with no label is not information. */
  label: string;
  value: ReactNode;
  /** Colours the value. Never decorative. */
  tone?: "up" | "down" | "neutral";
};

export type RailFiguresProps = {
  figures: RailFigure[];
  /** Bigger type for the figure that is the point of the card. */
  size?: "md" | "lg";
  source: string;
  className?: string;
};

/**
 * Two to four labelled numbers in a row — wager and payout, min and max,
 * down payment and monthly, asking and sold.
 *
 * Different from RailStats, which is a set of tiles each on its own surface:
 * this is a strip INSIDE one card, comparing figures that belong to the same
 * thing. Tiles say "here are your balances"; a figure strip says "here are
 * the terms of this one item".
 */
export default function RailFigures({
  figures,
  size = "md",
  source,
  className,
}: RailFiguresProps) {
  if (figures.length === 0) return null;

  return (
    <dl
      className={["rail-figures", className].filter(Boolean).join(" ")}
      data-rail-figures={source}
      data-rail-size={size}
    >
      {figures.map((figure) => (
        <div className="rail-figures__pair" key={figure.id}>
          <dt className="rail-figures__label">{figure.label}</dt>
          <dd
            className="rail-figures__value"
            data-rail-tone={figure.tone ?? "neutral"}
          >
            {figure.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
