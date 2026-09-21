"use client";

import type { ReactNode } from "react";

export type RailTableColumn = {
  id: string;
  /** The column heading. Short — it repeats down the whole table. */
  label: string;
  /** Right-align a numeric column so the digits line up. */
  numeric?: boolean;
};

export type RailTableRow = {
  id: string;
  /** The row's own name, with whatever mark belongs to it. */
  name: ReactNode;
  image?: { src: string; alt: string };
  /** A rank shown before the name. */
  rank?: ReactNode;
  /** Keyed by column id. A missing key renders an em dash, not a blank. */
  cells: Record<string, ReactNode>;
  href?: string;
  /** Marks this as the reader's own row. One per table. */
  mine?: boolean;
};

export type RailTableProps = {
  columns: RailTableColumn[];
  rows: RailTableRow[];
  /** What the table is, for a screen reader: "League standings". */
  label: string;
  /** The heading above it, if the page has not already given one. */
  heading?: string;
  /**
   * The two column headers the kit draws itself. They default to English
   * because most consumers are English, but a Spanish-first brand must be able
   * to replace them — they were literals with no prop until the kit was run
   * through its own adoption gate, which is the defect that failed Trophy UI.
   */
  rankLabel?: string;
  nameLabel?: string;
  headerAction?: { label: string; href: string };
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A standings table: a rank, a name, and a few numbers per row.
 *
 * A REAL <table>, not a grid of divs. A table is what lets a screen reader say
 * "row 3, Points for, 130.90" instead of reading nine unlabelled numbers in a
 * line, and it is what makes the whole thing copy-and-pasteable into a
 * spreadsheet. `scope` on the headers is the two attributes that do it.
 *
 * `mine` highlights the reader's own row. The highlight is a background AND a
 * marker in the row's accessible name, because a colour alone is invisible to
 * anyone who cannot see it — which in a standings table is the one row they
 * came for.
 *
 * A missing cell renders an em dash rather than nothing: a blank cell reads as
 * a rendering failure, and the reader cannot tell "no data" from "broken".
 */
export default function RailTable({
  columns,
  rows,
  label,
  heading,
  rankLabel = "Rank",
  nameLabel = "Name",
  headerAction,
  source,
  onSelect,
  className,
}: RailTableProps) {
  if (rows.length === 0) return null;

  return (
    <section
      className={["rail-table", className].filter(Boolean).join(" ")}
      data-rail-table={source}
    >
      {(heading || headerAction) && (
        <div className="rail-table__header">
          {heading && <h2 className="rail-table__heading">{heading}</h2>}
          {headerAction && (
            <a className="rail-table__header-action" href={headerAction.href}>
              {headerAction.label}
              <span aria-hidden="true"> ›</span>
            </a>
          )}
        </div>
      )}
      <div className="rail-table__scroll" role="region" aria-label={label} tabIndex={0}>
        <table aria-label={label}>
          <thead>
            <tr>
              {rows.some((r) => r.rank !== undefined) && (
                <th scope="col" className="rail-table__rank-head">
                  {rankLabel}
                </th>
              )}
              <th scope="col">{nameLabel}</th>
              {columns.map((column) => (
                <th
                  scope="col"
                  key={column.id}
                  data-rail-numeric={column.numeric ? "" : undefined}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} data-rail-mine={row.mine ? "" : undefined}>
                {rows.some((r) => r.rank !== undefined) && (
                  <td className="rail-table__rank">{row.rank ?? "—"}</td>
                )}
                {/* The name is the row's header: that is what a screen reader
                    reads back with every cell in the row. */}
                <th scope="row" className="rail-table__name">
                  {row.image && (
                    <img
                      className="rail-table__avatar"
                      src={row.image.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {row.href ? (
                    <a
                      href={row.href}
                      onClick={() => onSelect?.({ source, id: row.id, index })}
                    >
                      {row.name}
                    </a>
                  ) : (
                    row.name
                  )}
                  {row.mine && (
                    <span className="rail-table__sr"> (your row)</span>
                  )}
                </th>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    data-rail-numeric={column.numeric ? "" : undefined}
                  >
                    {row.cells[column.id] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
