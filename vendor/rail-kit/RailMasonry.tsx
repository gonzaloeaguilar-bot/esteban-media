"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

export type RailMasonryProps = {
  children: ReactNode;
  /** Columns on a wide screen. Two on a phone whatever this says. */
  columns?: 2 | 3 | 4;
  source: string;
  className?: string;
};

// Layout, not effect: the placement has to land before the first paint, or
// the grid is drawn once in the wrong place and then jumps. On the server
// there is no layout to wait for.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A staggered grid, for things of honestly different heights: a photograph
 * that is tall beside a product shot that is square.
 *
 * EACH ITEM GOES INTO THE SHORTEST COLUMN. This used to be CSS columns alone,
 * which fill down one column and then the next and can only break between
 * whole items, so the columns ended wherever the last break fell: measured on
 * The Dancing Chairs /works, 191px apart at 390 and 268px apart at 1280.
 * Placing each item, in source order, under whichever column is currently
 * shortest ends them within one item's height of each other — the rule every
 * masonry layout that looks finished is using.
 *
 * READING ORDER FOLLOWS THE PAGE, NOT THE COLUMNS. The items are not moved in
 * the DOM; they are placed on a grid. Because item n goes to the shortest
 * column, the source order runs across the top and then down, which is also
 * the order a screen reader and the Tab key follow — no longer down the whole
 * of column one before column two begins.
 *
 * Without JavaScript (or before it runs) the old CSS columns still apply, so
 * the grid is never missing, only less even.
 *
 * `break-inside: avoid` on the children is what stops a card being sliced in
 * half across a column boundary in that fallback, and it is the rule everyone
 * forgets.
 */
export default function RailMasonry({
  children,
  columns = 2,
  source,
  className,
}: RailMasonryProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver !== "function") return;
    let frame = 0;

    const place = () => {
      frame = 0;
      const style = getComputedStyle(el);
      const count = Math.max(1, parseInt(style.getPropertyValue("--_cols"), 10) || 1);
      const gap = parseFloat(style.columnGap) || 0;
      const items = Array.from(el.children) as HTMLElement[];
      // Measured before the switch: CSS columns and the grid give an item the
      // same width, so its height is the same in both.
      const heights = items.map((item) => item.getBoundingClientRect().height);
      const ends = new Array<number>(count).fill(0);
      el.setAttribute("data-rail-balanced", "");
      items.forEach((item, i) => {
        let column = 0;
        for (let c = 1; c < count; c++) if (ends[c] < ends[column]) column = c;
        const span = Math.max(1, Math.ceil(heights[i] + gap));
        item.style.gridColumn = String(column + 1);
        item.style.gridRow = `${ends[column] + 1} / span ${span}`;
        ends[column] += span;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    for (const item of Array.from(el.children)) observer.observe(item);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [children, columns]);

  return (
    <div
      ref={ref}
      className={["rail-masonry", className].filter(Boolean).join(" ")}
      data-rail-masonry={source}
      data-rail-columns={columns}
    >
      {children}
    </div>
  );
}
