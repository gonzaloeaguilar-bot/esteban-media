"use client";

import type { ReactNode } from "react";

export type RailTab = {
  id: string;
  label: string;
  /**
   * The tab's own URL. With one, the tab is a real link: crawlable,
   * shareable, and the back button works. Without one it is a button that
   * only changes what is on screen.
   */
  href?: string;
  /** A count or status beside the label — "4", "New". */
  badge?: ReactNode;
  /** A mark before the label — a league crest, a sport glyph. */
  icon?: ReactNode;
};

export type RailTabsProps = {
  tabs: RailTab[];
  activeId: string;
  /** What this set of tabs is, for a screen reader: "Sections", "My account". */
  label: string;
  /**
   * Lets the strip scroll sideways instead of splitting the width evenly.
   * Past about four tabs equal columns stop fitting on a phone and the labels
   * start truncating, which is worse than a scroll a thumb already expects.
   */
  scroll?: boolean;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  source: string;
  className?: string;
};

/**
 * The strip of sections across the top of a screen, with the active one
 * underlined.
 *
 * Links when each tab is a real URL, buttons when it only changes what is on
 * screen — the same rule RailFilters follows. A tab that is really a page and
 * is built as a button cannot be linked to, cannot be opened in a new tab, and
 * breaks the back button, which on a phone is the control people actually use.
 *
 * Deliberately NOT the ARIA tabs pattern (`role="tablist"` + arrow-key
 * roving focus). That pattern is for tabs inside one document; these are top
 * level navigation, and announcing a page's main sections as a widget takes
 * them out of a screen reader's landmark list. `<nav>` plus `aria-current` is
 * the honest description of what this is.
 */
export default function RailTabs({
  tabs,
  activeId,
  label,
  scroll,
  onSelect,
  source,
  className,
}: RailTabsProps) {
  return (
    <nav
      className={["rail-tabs", className].filter(Boolean).join(" ")}
      data-rail-tabs={source}
      data-rail-scroll={scroll ? "" : undefined}
      aria-label={label}
    >
      <ul className="rail-tabs__list" tabIndex={0}>
        {tabs.map((tab, index) => {
          const active = tab.id === activeId;
          const content = (
            <>
              {tab.icon && (
                <span className="rail-tabs__icon" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span className="rail-tabs__label">{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="rail-tabs__badge">{tab.badge}</span>
              )}
            </>
          );
          return (
            <li className="rail-tabs__item" key={tab.id}>
              {tab.href ? (
                <a
                  className="rail-tabs__tab"
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => onSelect?.({ source, id: tab.id, index })}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className="rail-tabs__tab"
                  // Not a page, so not aria-current="page": this one only
                  // changes what is on screen.
                  aria-current={active ? "true" : undefined}
                  onClick={() => onSelect?.({ source, id: tab.id, index })}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
