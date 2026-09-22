"use client";

import type { ReactNode } from "react";

export type RailShortcut = {
  id: string;
  label: string;
  /** The mark. Big — this is what somebody aims at, not the words. */
  glyph: ReactNode;
  href?: string;
};

export type RailShortcutsProps = {
  shortcuts: RailShortcut[];
  /** What the set is, for a screen reader: "Browse by category". */
  label: string;
  /** Wraps onto rows instead of scrolling. */
  wrap?: boolean;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A row of big marks with small words: browse by category.
 *
 * The mark leads and the label follows, which is the opposite of RailFilters
 * and deliberate. A filter is read; a shortcut is recognised. You aim at the
 * pizza, not at the word "Pizza".
 *
 * That only works if the marks are actually distinguishable from each other.
 * A row of six variations of the same grey outline icon is a row of six
 * identical targets, and then the label is doing all the work and this is the
 * wrong component — use RailFilters.
 *
 * The label is never hidden, whatever the mark. An emoji has no reliable
 * accessible name across platforms, and an icon has none at all.
 */
export default function RailShortcuts({
  shortcuts,
  label,
  wrap,
  source,
  onSelect,
  className,
}: RailShortcutsProps) {
  if (shortcuts.length === 0) return null;

  return (
    <nav
      className={["rail-shortcuts", className].filter(Boolean).join(" ")}
      data-rail-shortcuts={source}
      data-rail-wrap={wrap ? "" : undefined}
      aria-label={label}
    >
      <ul className="rail-shortcuts__list" tabIndex={0}>
        {shortcuts.map((shortcut, index) => {
          const inner = (
            <>
              <span className="rail-shortcuts__glyph" aria-hidden="true">
                {shortcut.glyph}
              </span>
              <span className="rail-shortcuts__label">{shortcut.label}</span>
            </>
          );
          return (
            <li className="rail-shortcuts__item" key={shortcut.id}>
              {shortcut.href ? (
                <a
                  className="rail-shortcuts__shortcut"
                  href={shortcut.href}
                  onClick={() => onSelect?.({ source, id: shortcut.id, index })}
                >
                  {inner}
                </a>
              ) : (
                <button
                  type="button"
                  className="rail-shortcuts__shortcut"
                  onClick={() => onSelect?.({ source, id: shortcut.id, index })}
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
