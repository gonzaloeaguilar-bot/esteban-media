"use client";

import type { ReactNode } from "react";

export type RailMasonryProps = {
  children: ReactNode;
  /** Columns on a wide screen. Two on a phone whatever this says. */
  columns?: 2 | 3 | 4;
  source: string;
  className?: string;
};

/**
 * A staggered grid, for things of honestly different heights: a photograph
 * that is tall beside a product shot that is square.
 *
 * CSS columns, not a JavaScript masonry library. The trade is real and worth
 * stating: columns flow top-to-bottom then across, so **reading order is down
 * each column, not across the rows** — which is also the order a screen reader
 * and the Tab key follow. That is correct for a browsable grid where nothing
 * outranks anything, and wrong for a ranked list, where a plain grid belongs.
 *
 * `break-inside: avoid` on the children is what stops a card being sliced in
 * half across a column boundary, and it is the rule everyone forgets.
 */
export default function RailMasonry({
  children,
  columns = 2,
  source,
  className,
}: RailMasonryProps) {
  return (
    <div
      className={["rail-masonry", className].filter(Boolean).join(" ")}
      data-rail-masonry={source}
      data-rail-columns={columns}
    >
      {children}
    </div>
  );
}
