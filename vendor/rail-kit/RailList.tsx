"use client";

import type { ReactNode } from "react";
import { RailIcon, type RailIconName } from "./icons";

export type RailListItem = {
  id: string;
  title: string;
  /** One clause. If it needs two, it is not a list row. */
  description?: string;
  /** A kit icon name, or the brand's own node — an SVG, a logo, an emoji. */
  icon?: RailIconName | ReactNode;
  /** Where the row goes. Omit and the row is not a link. */
  href?: string;
  /**
   * The button at the end of the row. Defaults to the row's own href, which is
   * the common case: one destination, stated twice for the thumb.
   */
  action?: { label: string; href?: string };
  /** A figure at the end instead of a button — a price, a count, a distance. */
  value?: ReactNode;
  /**
   * A picture at the start of the row instead of an icon — a poster, a
   * vehicle, a headshot. Wins over `icon`: a real photograph always beats a
   * glyph at telling somebody which row is theirs.
   */
  image?: { src: string; alt: string };
  /**
   * A second line under the description, set apart — an order reference, a
   * status, whose booking this is.
   */
  note?: ReactNode;
  /**
   * Draws a chevron at the end. Only for a row that goes somewhere: it is a
   * promise of a next screen, and drawing one on a row that does nothing is a
   * lie the visitor only finds out by tapping.
   */
  chevron?: boolean;
};

export type RailListProps = {
  items: RailListItem[];
  /** The section's own title. Omit when the page already has one above it. */
  heading?: string;
  /** Small line above the heading. */
  eyebrow?: string;
  /** The row-level escape hatch — "View all", "See every league". */
  headerAction?: { label: string; href: string };
  /**
   * "glass" turns the row stack into a translucent panel. It needs something
   * behind it to be worth anything, so it is opt-in.
   */
  surface?: "solid" | "glass";
  source: string;
  onSelect?: (info: {
    source: string;
    id: string;
    index: number;
    /** "row" when the row itself was taken, "action" when the button was. */
    via: "row" | "action";
  }) => void;
  className?: string;
};

function isIconName(icon: unknown): icon is RailIconName {
  return typeof icon === "string";
}

/**
 * A vertical stack of one-line choices: a menu of games, a list of services, a
 * set of plans, the places a visitor can go next.
 *
 * The rail is for browsing things that are alike and many; this is for
 * choosing between things that are few and different. A rail of five items
 * that never scrolls should have been this.
 *
 * On anchors: a row with one destination is a single <a> and the button on it
 * is styled emphasis — the same rule RailCard follows, for the same reason.
 * Only when the button goes somewhere else does the row stop being a link and
 * the title take over, because anchors cannot nest.
 */
export default function RailList({
  items,
  heading,
  eyebrow,
  headerAction,
  surface,
  source,
  onSelect,
  className,
}: RailListProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={["rail-list", className].filter(Boolean).join(" ")}
      data-rail-list={source}
      data-rail-surface={surface}
    >
      {(heading || headerAction) && (
        <div className="rail-list__header">
          <div className="rail-list__heading-group">
            {eyebrow && <p className="rail-list__eyebrow">{eyebrow}</p>}
            {heading && <h2 className="rail-list__heading">{heading}</h2>}
          </div>
          {headerAction && (
            <a
              className="rail-list__header-action"
              href={headerAction.href}
              onClick={() =>
                onSelect?.({ source, id: "header", index: -1, via: "action" })
              }
            >
              {headerAction.label}
            </a>
          )}
        </div>
      )}

      <ul className="rail-list__items">
        {items.map((item, index) => {
          const actionHref = item.action?.href ?? item.href;
          // The row and the button compete for the click only when they point
          // somewhere different. Otherwise one anchor wraps everything.
          const split =
            Boolean(item.href) &&
            Boolean(item.action?.href) &&
            item.action!.href !== item.href;
          const rowHref = split ? undefined : (item.href ?? actionHref);
          const RowTag = rowHref ? "a" : "div";

          return (
            <li className="rail-list__item" key={item.id}>
              <RowTag
                className="rail-list__row"
                {...(rowHref
                  ? {
                      href: rowHref,
                      onClick: () =>
                        onSelect?.({ source, id: item.id, index, via: "row" }),
                    }
                  : {})}
              >
                {item.image ? (
                  <img
                    className="rail-list__image"
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  item.icon !== undefined && (
                    <span className="rail-list__icon" aria-hidden="true">
                      {isIconName(item.icon) ? (
                        <RailIcon name={item.icon} />
                      ) : (
                        item.icon
                      )}
                    </span>
                  )
                )}

                <span className="rail-list__text">
                  <span className="rail-list__title">
                    {split ? (
                      <a
                        className="rail-list__title-link"
                        href={item.href}
                        onClick={() =>
                          onSelect?.({
                            source,
                            id: item.id,
                            index,
                            via: "row",
                          })
                        }
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </span>
                  {item.description && (
                    <span className="rail-list__description">
                      {item.description}
                    </span>
                  )}
                  {item.note !== undefined && (
                    <span className="rail-list__note">{item.note}</span>
                  )}
                </span>

                {item.value !== undefined && (
                  <span className="rail-list__value">{item.value}</span>
                )}

                {item.action &&
                  (split ? (
                    <a
                      className="rail-list__action"
                      href={item.action.href}
                      onClick={() =>
                        onSelect?.({
                          source,
                          id: item.id,
                          index,
                          via: "action",
                        })
                      }
                    >
                      {item.action.label}
                    </a>
                  ) : (
                    <span className="rail-list__action">
                      {item.action.label}
                    </span>
                  ))}

                {item.chevron && (
                  <span className="rail-list__chevron" aria-hidden="true">
                    ›
                  </span>
                )}
              </RowTag>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
