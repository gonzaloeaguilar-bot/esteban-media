"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import RailSheet from "./RailSheet";
import { highlight, search, terms as splitTerms } from "./find";

export type RailFinderEntry = {
  id: string;
  /** What the page is called. This is what gets matched and shown. */
  title: string;
  /** Where it goes. A real URL: crawlable, shareable, back-button-safe. */
  href: string;
  /** Which part of the site it belongs to — "Servicios", "Blog", "Precios". */
  section?: string;
  /** One line under the title. Matched too. */
  summary?: string;
  /**
   * Words a visitor might type that are not in the title — synonyms, the old
   * name of the page, the English word on a Spanish site.
   */
  keywords?: string[];
  /** A picture for the row — an avatar, a cover, a logo. */
  thumb?: { src: string; alt: string };
  /** The brand's own mark for this row: a tick, a glyph. Decorative only. */
  badge?: ReactNode;
  /** Small mark at the end of the row — a count, an unread dot. */
  trailing?: ReactNode;
};

export type RailFinderProps = {
  /**
   * Every page or topic that can be reached. The kit does not crawl, fetch or
   * invent this: only the site knows what it publishes, and a search that
   * silently misses pages is worse than no search.
   */
  entries: RailFinderEntry[];
  /** The sheet's heading. */
  title: string;
  /** Accessible name of the thing that opens it. */
  label: string;
  placeholder?: string;
  /** Shown when the query matches nothing. The query is rendered next to it. */
  noResultsLabel?: string;
  /**
   * How the results count is announced. Receives the number so the caller owns
   * plurals and language — the kit cannot pluralise a language it does not know.
   */
  countLabel?: (count: number) => string;
  /** `"bar"` is a small search field; `"icon"` is a single round button. */
  trigger?: "bar" | "icon";
  /**
   * `"rows"` is the autocomplete list: picture, title with the match picked
   * out, one line under it. `"cards"` gives each result its own block, for
   * when the results are destinations rather than suggestions.
   */
  layout?: "rows" | "cards";
  /** The brand's own glyph. A magnifier is supplied if absent. */
  glyph?: ReactNode;
  closeLabel?: string;
  source: string;
  onSelect?: (info: { source: string; id: string; href: string; query: string }) => void;
  className?: string;
};

/**
 * Search the whole site from anywhere: a small field that opens a tall sheet,
 * with every page and topic inside it, filtered as you type, each one a link.
 *
 * With an empty query it lists everything, so the sheet doubles as the site's
 * index — a visitor who does not know what to type still gets somewhere. A
 * search box that shows nothing until you guess a word is a dead end for the
 * people most likely to need it.
 *
 * Matching folds accents, so "diseno" finds "diseño". On a Spanish site that
 * is not a nicety: phone keyboards and hurried typing drop diacritics
 * constantly, and an exact-match filter answers "no results" to a word the
 * site definitely has.
 *
 * The sheet is `RailSheet`, so Escape closes it, focus is trapped while it is
 * open and returns to the trigger when it shuts. Its height is the brand's:
 * set `--rail-sheet-height` to `100vh` for a full-screen finder.
 */
export default function RailFinder({
  entries,
  title,
  label,
  placeholder,
  noResultsLabel = "Nothing matches",
  countLabel,
  trigger = "bar",
  layout = "rows",
  glyph,
  closeLabel,
  source,
  onSelect,
  className,
}: RailFinderProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // `showModal()` manda el foco al primer elemento enfocable, que es el boton
  // de cerrar. Un buscador que abre con el foco en "cerrar" obliga a tabular
  // para escribir. Se enfoca el campo en el frame siguiente, ya abierta.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const terms = useMemo(() => splitTerms(query), [query]);
  const results = useMemo(() => search(entries, terms), [entries, terms]);

  const mark = glyph ?? (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <>
      <button
        type="button"
        className={[
          "rail-finder__trigger",
          `rail-finder__trigger--${trigger}`,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        data-rail-finder={source}
        aria-label={trigger === "icon" ? label : undefined}
        onClick={() => setOpen(true)}
      >
        <span className="rail-finder__glyph">{mark}</span>
        {trigger === "bar" && <span className="rail-finder__hint">{label}</span>}
      </button>

      <RailSheet
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        closeLabel={closeLabel}
        source={`${source}:sheet`}
      >
        <div className="rail-finder">
          <div className="rail-finder__field">
            <span className="rail-finder__glyph" aria-hidden="true">
              {mark}
            </span>
            <input
              ref={inputRef}
              className="rail-finder__input"
              /* `type="search"` NO: en Chromium, Escape dentro de un campo de
                 busqueda borra el texto y se COME la tecla, asi que la hoja no
                 cerraba mientras el foco estuviera en el campo — que es
                 siempre, porque lo enfocamos al abrir. Medido: valor "" y
                 dialog[open] seguia a 1. */
              type="text"
              value={query}
              aria-label={label}
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {/* El recuento se ANUNCIA. Una lista que cambia en silencio bajo un
              campo de texto no existe para quien no la ve. */}
          <p className="rail-sr-only" role="status" aria-live="polite">
            {countLabel ? countLabel(results.length) : `${results.length}`}
          </p>

          {results.length === 0 ? (
            <p className="rail-finder__empty">
              {noResultsLabel} <span className="rail-finder__query">{query}</span>
            </p>
          ) : (
            <ul className={`rail-finder__results rail-finder__results--${layout}`}>
              {results.map((entry) => (
                <li className="rail-finder__result" key={entry.id}>
                  <a
                    className="rail-finder__link"
                    href={entry.href}
                    onClick={() =>
                      onSelect?.({ source, id: entry.id, href: entry.href, query })
                    }
                  >
                    <span className="rail-finder__thumb" aria-hidden="true">
                      {entry.thumb ? (
                        <img
                          className="rail-finder__thumb-image"
                          src={entry.thumb.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        mark
                      )}
                    </span>
                    <span className="rail-finder__text">
                      {entry.section && (
                        <span className="rail-finder__section">{entry.section}</span>
                      )}
                      <span className="rail-finder__title">
                        {highlight(entry.title, terms).map((piece, at) =>
                          piece.hit ? (
                            <mark className="rail-finder__match" key={at}>
                              {piece.text}
                            </mark>
                          ) : (
                            <span key={at}>{piece.text}</span>
                          ),
                        )}
                        {entry.badge && (
                          <span className="rail-finder__badge" aria-hidden="true">
                            {entry.badge}
                          </span>
                        )}
                      </span>
                      {entry.summary && (
                        <span className="rail-finder__summary">{entry.summary}</span>
                      )}
                    </span>
                    {entry.trailing && (
                      <span className="rail-finder__trailing" aria-hidden="true">
                        {entry.trailing}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </RailSheet>
    </>
  );
}
