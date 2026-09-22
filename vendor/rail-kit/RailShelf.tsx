"use client";

import { useId, useMemo, useState, type ReactNode } from "react";

export type RailShelfItem = {
  /** Stable id. Used for the panel's id and for `onOpen`. */
  id: string;
  /** The words on the spine. A label, not a sentence. */
  label: ReactNode;
  /** A count or a mark beside the label — "12", "NEW". */
  badge?: ReactNode;
  /** One line under the label, on the spine itself. Optional. */
  hint?: ReactNode;
  /**
   * What the search box reads.
   *
   * `children` is an opaque ReactNode, so a component cannot look inside it to
   * find out whether a query matches. A shelf whose search only matched the
   * spine labels would be a shelf that says "nothing found" while the thing is
   * sitting two taps away, so the consumer passes the searchable text — the
   * titles inside, joined — and the match is honest.
   */
  searchText?: string;
  children: ReactNode;
};

export type RailShelfProps = {
  items: RailShelfItem[];
  source: string;
  /** Which one starts open. Default is none: a shelf opens closed. */
  defaultId?: string;
  /**
   * Adds a search field above the shelf. The label is what a screen reader
   * hears; without it there is no search field at all.
   */
  search?: { label: string; placeholder?: string };
  /** Shown when a query matches nothing. */
  emptyLabel?: ReactNode;
  onOpen?: (info: { source: string; id: string }) => void;
  onSearch?: (info: { source: string; query: string; matches: number }) => void;
  className?: string;
};

/**
 * A shelf of folders, stacked vertically, one open at a time.
 *
 * WHY THIS AND NOT RailDisclosure. A disclosure is a heading with a triangle:
 * correct, quiet, and completely flat. It is the right component for two or
 * three optional paragraphs. This is for the case where the sections are
 * MATERIAL — a library, a filing cabinet, a set of collections someone browses
 * rather than reads — and where the flatness is the problem. The spine carries
 * a label, a count and a line of description, so the shelf can be read without
 * opening anything.
 *
 * WHY NOT RailFolder. That one is a drawer: staggered tabs along the top, so
 * the labels compete for one horizontal line and a phone gets four or five
 * before they scroll out of sight. A shelf runs down the page, so it takes as
 * many as it needs and each one gets a full line for its name.
 *
 * ONE OPEN AT A TIME, and the spine stays put while its panel is open — it is
 * the thing you tapped, and losing it is how people forget which folder they
 * are inside. Tapping the open spine closes it.
 *
 * THE SEARCH FILTERS SPINES, NOT WORDS ON THE PAGE. It hides the folders that
 * cannot match and opens the first that can, which is the behaviour of a
 * filing cabinet: you are not reading results, you are narrowing shelves.
 * It needs `searchText` per item to do that honestly — see the note there.
 *
 * SEMANTICS. Buttons with `aria-expanded` and `aria-controls`, panels as
 * regions labelled by their spine. It looks like furniture; it announces
 * itself as a set of expandable sections, because a metaphor is worth nothing
 * to somebody who cannot see it.
 */
export default function RailShelf({
  items,
  source,
  defaultId,
  search,
  emptyLabel = "Nothing here matches that.",
  onOpen,
  onSearch,
  className,
}: RailShelfProps) {
  const uid = useId();
  const [open, setOpen] = useState<string | null>(defaultId ?? null);
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!needle) return items;
    return items.filter((item) => {
      const hay = `${textOf(item.label)} ${textOf(item.hint)} ${item.searchText ?? ""}`;
      return hay.toLowerCase().includes(needle);
    });
  }, [items, needle]);

  if (!items.length) return null;

  function toggle(id: string) {
    const next = open === id ? null : id;
    setOpen(next);
    if (next) onOpen?.({ source, id: next });
  }

  function onQuery(value: string) {
    setQuery(value);
    const n = value.trim().toLowerCase();
    const matches = n
      ? items.filter((i) =>
          `${textOf(i.label)} ${textOf(i.hint)} ${i.searchText ?? ""}`
            .toLowerCase()
            .includes(n),
        )
      : items;
    onSearch?.({ source, query: value, matches: matches.length });
    /* A query that narrows to one shelf opens it. Leaving the reader to tap
       the single remaining folder is a step that exists only because the
       component could not be bothered. */
    setOpen(n && matches.length === 1 ? matches[0].id : null);
  }

  return (
    <div
      className={["rail-shelf", className].filter(Boolean).join(" ")}
      data-rail-shelf={source}
    >
      {search ? (
        <div className="rail-shelf__search">
          <label className="rail-shelf__label" htmlFor={`${uid}-q`}>
            {search.label}
          </label>
          <input
            id={`${uid}-q`}
            className="rail-shelf__field"
            type="search"
            value={query}
            placeholder={search.placeholder}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
      ) : null}

      <ul className="rail-shelf__stack">
        {shown.map((item) => {
          const isOpen = open === item.id;
          return (
            <li
              key={item.id}
              className="rail-shelf__book"
              data-rail-open={isOpen ? "" : undefined}
            >
              <button
                type="button"
                className="rail-shelf__spine"
                id={`${uid}-s-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span className="rail-shelf__edge" aria-hidden="true" />
                <span className="rail-shelf__title">
                  {item.label}
                  {item.hint ? (
                    <span className="rail-shelf__hint">{item.hint}</span>
                  ) : null}
                </span>
                {item.badge ? (
                  <span className="rail-shelf__badge">{item.badge}</span>
                ) : null}
                <span className="rail-shelf__chevron" aria-hidden="true">
                  ⌄
                </span>
              </button>
              <div
                className="rail-shelf__panel"
                id={`${uid}-p-${item.id}`}
                role="region"
                aria-labelledby={`${uid}-s-${item.id}`}
                hidden={!isOpen}
              >
                {item.children}
              </div>
            </li>
          );
        })}
      </ul>

      {shown.length === 0 ? (
        <p className="rail-shelf__empty">{emptyLabel}</p>
      ) : null}
    </div>
  );
}

/** Reads the words out of a label so the search can match what a reader sees. */
function textOf(node: ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  const kids = (node as { props?: { children?: ReactNode } })?.props?.children;
  return kids ? textOf(kids) : "";
}
