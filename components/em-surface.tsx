import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The site's surfaces — one definition, used everywhere.
 *
 * Before this file, `border border-[#ddd4c8] bg-[#fbf6ef]` was written out in
 * a dozen places across the templates. Two components repeating a surface
 * means changing how the site looks requires editing both and remembering the
 * third. This is the third.
 *
 * Nothing here is a rail. The rail is for a sequence you scan sideways; these
 * are for the blocks that stay put.
 */

/**
 * A cartel: a card that reads as an object rather than a cut-out rectangle.
 *
 * What lifts it is not the border. It is light along the top edge and a step
 * of shadow underneath — the light arriving from above, the same direction the
 * shadow already implies. A very faint diagonal wash adds volume; past about
 * 5% white it stops reading as volume and starts reading as a gradient, so it
 * is capped well under that.
 *
 * `interactive` is only for a cartel that is genuinely a link or a button. A
 * hover state on an `<article>` promises an action that does not exist — and
 * on a phone it does not exist at all.
 */
export function Cartel({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: {
  as?: "div" | "article" | "section" | "aside" | "li";
  interactive?: boolean;
  className?: string;
  children: ReactNode;
} & Record<`data-${string}`, unknown>) {
  return (
    <Tag
      {...rest}
      className={cn(
        "relative rounded-[4px] border border-[#ddd4c8] bg-[#fbf6ef]",
        "bg-[linear-gradient(148deg,rgba(255,255,255,0.05),rgba(255,255,255,0)_58%)]",
        "shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(16,18,20,0.04),0_6px_16px_-8px_rgba(16,18,20,0.14)]",
        interactive &&
          "transition-colors hover:border-[#e85d3e] focus-within:border-[#e85d3e]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * One figure, at a size the page does not otherwise reach.
 *
 * The value is measured against its CONTAINER, not the window — a figure sized
 * in `vw` inside a grid overflows the moment the grid changes column count.
 * `tabular-nums` is on in the stylesheet so digits do not shift width.
 *
 * The glow behind the value is what makes the card have a light source instead
 * of a number sitting in a box.
 */
export function Figure({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("em-figure relative overflow-hidden px-4 py-5", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-10 size-32 rounded-full bg-[#e85d3e] opacity-[0.11] blur-2xl"
      />
      <dt className="relative text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#5a6066]">
        {label}
      </dt>
      <dd className="em-figure__value relative mt-2 break-words">{value}</dd>
    </div>
  );
}

/**
 * A list where each item is an object rather than another bullet.
 *
 * The numeral is the point of interest these lists never had: a niche page
 * carried fifty-five identical check-marks down a single column. The numeral
 * bleeds off the left edge rather than being cropped along its base — it is
 * set in the serif at a size the surrounding text never reaches, which is what
 * makes the row scannable at a glance.
 *
 * It is drawn by a CSS counter, not rendered into the DOM. The first version
 * put `{index + 1}` in an `aria-hidden` span, and the parity gate was right to
 * call that out: decorative or not, it puts "1 2 3 4" into the page's text
 * where a crawler reads it, and this template is supposed to change
 * presentation and nothing else. A counter is the version where that claim is
 * simply true rather than argued.
 */
export function NumberedList({
  items,
  className,
  renderItem,
}: {
  /** Readonly: these arrive straight from the frozen site-data arrays. */
  items: readonly string[];
  className?: string;
  renderItem?: (item: string) => ReactNode;
}) {
  return (
    <ol className={cn("em-numbered mt-6 space-y-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="em-numbered__item relative flex gap-4 rounded-[4px] border border-[#e6ddd0] bg-[#f6f1ea]/70 px-4 py-3.5"
        >
          <span className="text-sm leading-6 text-[#252a2d]">
            {renderItem ? renderItem(item) : item}
          </span>
        </li>
      ))}
    </ol>
  );
}
