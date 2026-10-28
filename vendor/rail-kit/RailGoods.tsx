"use client";

import type { ReactNode } from "react";
import RailPrice from "./RailPrice";

export type RailGood = {
  id: string;
  /** What it is. The link's accessible name, so write it as a shopper reads it. */
  name: string;
  href: string;
  image?: { src: string; alt?: string };
  /** What it costs today, as a plain string: "0.99", "3.64". */
  now: string;
  /** Only a price you actually charged. See RailPrice — nothing here can check it. */
  was?: string;
  /**
   * The comparable, already formatted by the site: "$0.25/count", "$1.21/lb".
   * NOT computed here: unit maths needs the pack size, the locale and the
   * rounding rule, and a component that guesses any of the three prints a
   * number the shelf label disagrees with.
   */
  unitPrice?: string;
  /** When it lands, in the site's words: "Overnight 7 AM - 11 AM". */
  promise?: ReactNode;
  /** A mark before the promise — a shipping tier, a membership. */
  tag?: ReactNode;
  /** How many are in the basket already. Absent means none. */
  quantity?: number;
  /** No button, and the reason is shown instead. */
  unavailableLabel?: string;
  /**
   * Saved for later. A second, SEPARATE press from adding — a shop that puts
   * "want it" and "buy it" on the same target sells one and loses the other.
   * Off by default: a heart nobody wired up is a control that forgets.
   */
  saved?: boolean;
};

export type RailGoodsProps = {
  items: RailGood[];
  /** What the set is, for a screen reader: "Top sellers in Grocery". */
  label: string;
  heading?: string;
  currency?: string;
  /**
   * The add button's words, with the item's name appended for the screen
   * reader: "Add" -> "Add Banana Bunch". A bare "+" is a target with no name.
   */
  addLabel?: string;
  /**
   * The heart's name, with the item's appended: "Save" -> "Save Banana
   * Bunch". Absent means no heart at all, which is honest — a heart that does
   * nothing until a reload is worse than none.
   */
  saveLabel?: string;
  /** The heart's name once it is on: "Saved". */
  savedLabel?: string;
  columns?: 2 | 3;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  onAdd?: (info: { source: string; id: string; index: number }) => void;
  onSave?: (info: {
    source: string;
    id: string;
    index: number;
    saved: boolean;
  }) => void;
  className?: string;
};

/**
 * A grid of things you can buy without opening them: picture, name, price,
 * what it works out at, when it arrives, and one button that puts it in the
 * basket.
 *
 * NOT RailTiles, which is a name with art beside it and nothing to decide.
 * The difference is the second action: here the whole cell is a link to the
 * product AND a button that adds it, and those are two different intents that
 * must be two different targets. A card that is one big link with a "+"
 * painted inside it adds to the basket when the shopper meant to read the
 * label, which is the one mistake a shop cannot make quietly.
 *
 * THE PRICE IS `RailPrice`, not a string. The struck-through was-price, the
 * derived discount and the small cents are decisions the kit already made
 * once; a shop that re-renders a price by hand loses the part that keeps the
 * percentage from disagreeing with the two numbers beside it.
 *
 * `unitPrice` IS TAKEN, NOT COMPUTED — see the prop.
 */
export default function RailGoods({
  items,
  label,
  heading,
  currency = "$",
  addLabel = "Add",
  saveLabel,
  savedLabel,
  columns = 3,
  source,
  onSelect,
  onAdd,
  onSave,
  className,
}: RailGoodsProps) {
  if (items.length === 0) return null;

  /* A SET IS EITHER PHOTOGRAPHED OR IT IS NOT. With art on some cells and not
     others, the grid rows go ragged: the name, the price and the promise sit
     at a different height in every cell, so nothing can be compared by
     scanning down a column — which is the only thing a grid is for. Measured
     at 390px with three of six items photographed. When any item has a
     picture, the ones without get an empty box of the same size. */
  const anyArt = items.some((item) => item.image);

  return (
    <section
      className={["rail-goods", className].filter(Boolean).join(" ")}
      data-rail-goods={source}
      data-rail-columns={columns}
    >
      {heading && <h2 className="rail-goods__heading">{heading}</h2>}
      <ul className="rail-goods__grid" aria-label={label}>
        {items.map((item, index) => (
          <li className="rail-goods__cell" key={item.id}>
            <article className="rail-goods__good" data-rail-art={item.image || anyArt ? "" : undefined}>
              <a
                className="rail-goods__link"
                href={item.href}
                onClick={() => onSelect?.({ source, id: item.id, index })}
              >
                {!item.image && anyArt && (
                  <span className="rail-goods__art rail-goods__art--none" aria-hidden="true" />
                )}
                {item.image && (
                  <img
                    className="rail-goods__art"
                    src={item.image.src}
                    /* The name is right underneath. Describing the photograph
                       again makes a screen reader read the product twice. */
                    alt={item.image.alt ?? ""}
                    loading="lazy"
                  />
                )}
                <span className="rail-goods__name">{item.name}</span>
              </a>

              <RailPrice
                now={item.now}
                was={item.was}
                currency={currency}
                source={`${source}:${item.id}`}
                className="rail-goods__price"
              />

              {item.unitPrice && (
                <p className="rail-goods__unit">{item.unitPrice}</p>
              )}

              {(item.tag || item.promise) && (
                <p className="rail-goods__promise">
                  {item.tag && (
                    <span className="rail-goods__tag">{item.tag}</span>
                  )}
                  {item.promise}
                </p>
              )}

              {saveLabel && (
                <button
                  type="button"
                  className="rail-goods__save"
                  aria-pressed={item.saved ?? false}
                  onClick={() =>
                    onSave?.({
                      source,
                      id: item.id,
                      index,
                      saved: !item.saved,
                    })
                  }
                >
                  <span className="rail-goods__heart" aria-hidden="true">
                    {item.saved ? "\u2665" : "\u2661"}
                  </span>
                  <span className="rail-sr-only">
                    {(item.saved && savedLabel ? savedLabel : saveLabel)}{" "}
                    {item.name}
                  </span>
                </button>
              )}

              {item.unavailableLabel ? (
                <p className="rail-goods__unavailable">
                  {item.unavailableLabel}
                </p>
              ) : (
                <button
                  type="button"
                  className="rail-goods__add"
                  onClick={() => onAdd?.({ source, id: item.id, index })}
                >
                  {/* The glyph is the affordance and the words are the name:
                      an icon-only button is a 24px target that announces
                      nothing. */}
                  <span className="rail-goods__plus" aria-hidden="true">
                    +
                  </span>
                  <span className="rail-sr-only">
                    {addLabel} {item.name}
                  </span>
                  {item.quantity ? (
                    <span className="rail-goods__count">{item.quantity}</span>
                  ) : null}
                </button>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
