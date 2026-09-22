"use client";

import { useId, useState, type ReactNode } from "react";

export type RailDisclosureProps = {
  /** The heading that stays visible. */
  summary: ReactNode;
  children: ReactNode;
  /** Open on first render. */
  defaultOpen?: boolean;
  /**
   * Where the control sits. "footer" is the full-width row under a card —
   * "Show selections"; "header" is the section heading with the chevron at
   * its end — a market, a panel.
   */
  tone?: "header" | "footer";
  /** A mark beside the summary — a tag, a count, a status chip. */
  badge?: ReactNode;
  /**
   * The words for each state, so the control says what it will DO rather than
   * what it is. Defaults to the same label both ways.
   */
  labels?: { open: string; closed: string };
  source: string;
  onToggle?: (info: { source: string; open: boolean }) => void;
  className?: string;
};

/**
 * A section that folds away.
 *
 * Controlled with state rather than <details>, unlike RailFaq. <details> works
 * beautifully for prose — it is what RailFaq uses — but it cannot be driven
 * from outside, and a market panel routinely needs to be: opened by a deep
 * link, closed when a filter changes, all of them collapsed at once.
 *
 * The badge sits INSIDE the control, before the chevron, because a tag like
 * "SGP" describes the section it labels. If yours is a control rather than a
 * label — something with its own action — render it next to this component
 * instead of passing it here, so it gets its own tap target.
 *
 * `aria-expanded` and `aria-controls` are what make a screen reader announce
 * the state and let it jump to the region — the two things a hand-rolled
 * accordion usually forgets.
 */
export default function RailDisclosure({
  summary,
  children,
  defaultOpen,
  tone = "header",
  badge,
  labels,
  source,
  onToggle,
  className,
}: RailDisclosureProps) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const panelId = useId();

  return (
    <section
      className={["rail-disclosure", className].filter(Boolean).join(" ")}
      data-rail-disclosure={source}
      data-rail-tone={tone}
      data-rail-open={open ? "" : undefined}
    >
      <div className="rail-disclosure__head">
        <button
          type="button"
          className="rail-disclosure__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen(!open);
            onToggle?.({ source, open: !open });
          }}
        >
          <span className="rail-disclosure__summary">
            {labels ? (open ? labels.open : labels.closed) : summary}
          </span>
          {badge && <span className="rail-disclosure__badge">{badge}</span>}
          <span className="rail-disclosure__chevron" aria-hidden="true">
            ⌄
          </span>
        </button>
      </div>
      <div className="rail-disclosure__panel" id={panelId} hidden={!open}>
        {children}
      </div>
    </section>
  );
}
