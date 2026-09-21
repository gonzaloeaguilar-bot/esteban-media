"use client";

import type { ReactNode } from "react";

export type RailFilter = {
  id: string;
  label: string;
  /** A mark before the label — a sport glyph, a category icon. */
  icon?: ReactNode;
  /** Present when the filter is a real page. Absent makes it a button. */
  href?: string;
  /** Optional count, e.g. "Under $500 down (14)". Must be a real count. */
  count?: number;
  /**
   * Draws the icon alone, without the words. `label` sigue siendo obligatorio y
   * pasa a ser el nombre accesible: un chip sin texto y sin nombre es un boton
   * que nadie puede nombrar ni buscar por voz.
   *
   * Solo para marcas que todo el mundo reconoce en esa fila —una brujula de
   * explorar, un ajuste— y nunca para una categoria, donde el icono es una
   * adivinanza.
   */
  iconOnly?: boolean;
};

export type RailFiltersProps = {
  filters: RailFilter[];
  activeId?: string;
  source: string;
  /** Accessible name for the group, e.g. "Filter inventory". */
  label: string;
  /**
   * Wraps onto more rows instead of scrolling sideways. Right when the set is
   * fixed and you are meant to see all of it — a menu of sections — and wrong
   * for a long list you browse, where a second row pushes the content down.
   */
  wrap?: boolean;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * The chip row above the rails. Links when each filter is a real URL —
 * crawlable, shareable, back-button-safe — and buttons when it only changes
 * what is already on the page.
 */
function chipClass(filter: RailFilter) {
  return ["rail-filters__chip", filter.iconOnly && "rail-filters__chip--icon"]
    .filter(Boolean)
    .join(" ");
}

export default function RailFilters({
  filters,
  activeId,
  wrap,
  source,
  label,
  onSelect,
  className,
}: RailFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <nav
      className={["rail-filters", className].filter(Boolean).join(" ")}
      aria-label={label}
      data-rail-filters={source}
      data-rail-wrap={wrap ? "" : undefined}
    >
      <ul className="rail-filters__list rail-scroller" tabIndex={0}>
        {filters.map((filter, index) => {
          const active = filter.id === activeId;
          const content = (
            <>
              {filter.icon && (
                <span className="rail-filters__icon" aria-hidden="true">
                  {filter.icon}
                </span>
              )}
              {filter.iconOnly ? (
                <span className="rail-sr-only">{filter.label}</span>
              ) : (
                filter.label
              )}
              {typeof filter.count === "number" && (
                /* Formatted, not raw: RailPresence already uses Intl for the
                   same job, and 26198 reads as 26,198 or 26.198 depending on
                   who is looking at it. */
                <span className="rail-filters__count">
                  {new Intl.NumberFormat().format(filter.count)}
                </span>
              )}
            </>
          );
          const handle = () => onSelect?.({ source, id: filter.id, index });

          return (
            <li key={filter.id}>
              {filter.href ? (
                <a
                  className={chipClass(filter)}
                  href={filter.href}
                  aria-current={active ? "page" : undefined}
                  data-active={active ? "" : undefined}
                  onClick={handle}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className={chipClass(filter)}
                  aria-pressed={active}
                  data-active={active ? "" : undefined}
                  onClick={handle}
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
