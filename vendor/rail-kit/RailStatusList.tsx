"use client";

import type { ReactNode } from "react";

export type RailStatusState = {
  /** The mark: a spinner, a raised hand, an empty ring. Decorative. */
  glyph: ReactNode;
  /**
   * What the state is called. Not optional: the glyph is shape and colour, so
   * without a word the row's most important fact — that this one is waiting
   * for you — reaches nobody who cannot see it.
   */
  label: string;
  /** Marks the states a person has to act on, so the brand can lift them. */
  attention?: boolean;
};

export type RailStatusItem = {
  id: string;
  title: string;
  /** One line under the title: where it runs, what it belongs to. */
  meta?: string;
  /** Which state this row is in. Must be a key of `states`. */
  state: string;
  href?: string;
};

export type RailStatusListProps = {
  items: RailStatusItem[];
  /**
   * The state vocabulary, supplied by the site. The kit does not ship one:
   * "running", "waiting", "queued" mean different things per product, and a
   * guessed vocabulary is a wrong one.
   */
  states: Record<string, RailStatusState>;
  /** What this list is, for a screen reader. */
  label: string;
  source: string;
  onSelect?: (info: { source: string; id: string; state: string }) => void;
  className?: string;
};

/**
 * A list of work and what each piece is doing: running, waiting for you, idle.
 *
 * The leading mark is a STATE, not a face or a thumbnail, and that is the whole
 * point of the component — you scan the column of glyphs to find the one that
 * needs you. So each state carries its word, and rows the brand marks as
 * needing attention can be lifted without inventing a meaning for a colour.
 *
 * An unknown state renders the row with no mark rather than throwing: a list of
 * work that disappears because the server sent a status the front end has not
 * heard of is worse than a row with a gap.
 */
function RowLink({
  href,
  onSelect,
  children,
}: {
  href?: string;
  onSelect: () => void;
  children: ReactNode;
}) {
  return href ? (
    <a className="rail-statuslist__link" href={href} onClick={onSelect}>
      {children}
    </a>
  ) : (
    <div className="rail-statuslist__link">{children}</div>
  );
}

export default function RailStatusList({
  items,
  states,
  label,
  source,
  onSelect,
  className,
}: RailStatusListProps) {
  return (
    <ul
      className={["rail-statuslist", className].filter(Boolean).join(" ")}
      aria-label={label}
      data-rail-statuslist={source}
    >
      {items.map((item, index) => {
        const state = states[item.state];
        return (
          <li
            className={[
              "rail-statuslist__item",
              state?.attention && "rail-statuslist__item--attention",
            ]
              .filter(Boolean)
              .join(" ")}
            key={item.id}
            data-state={item.state}
          >
            {/* Rama literal, no `<Tag>`: el ancla dentro de una variable es
                invisible para un comprobador que lee el fuente. */}
            <RowLink href={item.href} onSelect={() => onSelect?.({ source, id: item.id, state: item.state })}>
              <span className="rail-statuslist__mark" aria-hidden="true">
                {state?.glyph}
              </span>
              <span className="rail-statuslist__body">
                <span className="rail-statuslist__title">{item.title}</span>
                <span className="rail-statuslist__meta">
                  {state && (
                    <span className="rail-statuslist__state">{state.label}</span>
                  )}
                  {state && item.meta && (
                    <span className="rail-statuslist__sep" aria-hidden="true">
                      {" · "}
                    </span>
                  )}
                  {item.meta}
                </span>
              </span>
            </RowLink>
          </li>
        );
      })}
    </ul>
  );
}
