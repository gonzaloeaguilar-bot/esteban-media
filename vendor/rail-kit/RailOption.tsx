"use client";

import type { ReactNode } from "react";

export type RailOptionItem = {
  id: string;
  /** The top line — the terms. "O 4.5", "12 months", "Standard". */
  line: ReactNode;
  /** The bottom line — the price, in the accent. "+260", "$450/mo". */
  price: ReactNode;
  /** A line above both, usually a column heading in a grid. */
  eyebrow?: string;
  disabled?: boolean;
};

export type RailOptionsProps = {
  options: RailOptionItem[];
  /** The id currently chosen, if any. */
  selectedId?: string;
  /** What is being chosen, for a screen reader: "Spread", "Plan length". */
  label: string;
  /** Columns on a wide screen. Defaults to however many options there are. */
  columns?: number;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A row of two-line choices: terms on top, price underneath.
 *
 * This is the sportsbook's odds button, and it is also the plan picker, the
 * finance-term picker and the delivery-slot picker. The shape is the same
 * every time — a thing you are agreeing to, and what it costs — which is why
 * it is one component and not four.
 *
 * Real radio semantics: `role="radiogroup"` with `aria-checked` buttons. These
 * are mutually exclusive and only one can be live at a time, and a screen
 * reader should say "2 of 3" rather than reading three unrelated buttons.
 *
 * ON THE PRICE being its own line rather than appended to the terms: at a
 * glance somebody is scanning ONE of the two — either what the bet is, or
 * what it pays. Two registers in one line makes both slower to find.
 */
export default function RailOptions({
  options,
  selectedId,
  label,
  columns,
  source,
  onSelect,
  className,
}: RailOptionsProps) {
  if (options.length === 0) return null;

  return (
    <div
      className={["rail-options", className].filter(Boolean).join(" ")}
      data-rail-options={source}
      role="radiogroup"
      aria-label={label}
      style={{
        ["--_cols" as string]: String(columns ?? options.length),
      }}
    >
      {options.map((option, index) => (
        <button
          type="button"
          className="rail-options__option"
          key={option.id}
          role="radio"
          aria-checked={option.id === selectedId}
          disabled={option.disabled}
          onClick={() => onSelect?.({ source, id: option.id, index })}
        >
          {option.eyebrow && (
            <span className="rail-options__eyebrow">{option.eyebrow}</span>
          )}
          <span className="rail-options__line">{option.line}</span>
          <span className="rail-options__price">{option.price}</span>
        </button>
      ))}
    </div>
  );
}
