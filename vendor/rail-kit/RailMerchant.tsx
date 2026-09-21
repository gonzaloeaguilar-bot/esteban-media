"use client";

import type { ReactNode } from "react";

export type RailMerchantItem = {
  id: string;
  /** The place's name, as it trades. */
  name: string;
  href?: string;
  /** The logo. A directory without marks is a wall of text. */
  logo?: { src: string; alt: string } | ReactNode;
  /**
   * How long, how far — "16 min", "2.4 km". A real measurement, never an
   * estimate dressed as one.
   */
  eta?: string;
  /** A second clause: a category, an address line. */
  meta?: string;
  /**
   * The offer, as it reads: "250+ items on sale", "20% off $20+". Stated, not
   * computed here: the component cannot check whether it is true.
   */
  offer?: string;
  /**
   * Programmes this place takes — "SNAP", "EBT", "Financiación". These are
   * eligibility facts somebody is scanning for, which is why they are a
   * separate field and not part of `meta`: a benefits recipient reading a
   * directory is looking for exactly this word.
   */
  tags?: string[];
  /**
   * Closed, out of range, out of stock. A row that cannot be used says so and
   * stops being a link, rather than failing on the next screen.
   */
  unavailable?: string;
};

export type RailMerchantProps = {
  items: RailMerchantItem[];
  /** What this list is, for a screen reader: "Convenience stores near you". */
  label: string;
  heading?: string;
  /**
   * The favourite control. Omit it and no hearts are drawn — a directory that
   * cannot remember a favourite should not draw a control that pretends to.
   */
  favourite?: {
    ids: string[];
    /** Both states need naming: "Save 7-Eleven" and "Remove 7-Eleven". */
    addLabel: (name: string) => string;
    removeLabel: (name: string) => string;
    onToggle: (id: string, next: boolean) => void;
  };
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

function Logo({ logo, name }: { logo: RailMerchantItem["logo"]; name: string }) {
  if (!logo) {
    return (
      <span className="rail-merchant__logo rail-merchant__logo--letter" aria-hidden="true">
        {name.slice(0, 1)}
      </span>
    );
  }
  if (typeof logo === "object" && logo !== null && "src" in logo) {
    return (
      <img className="rail-merchant__logo" src={logo.src} alt={logo.alt} loading="lazy" />
    );
  }
  return (
    <span className="rail-merchant__logo" aria-hidden="true">
      {logo as ReactNode}
    </span>
  );
}

/**
 * A vertical directory of places: a name, how far, what is on, and whether it
 * is open at all.
 *
 * NOT RailList, and the difference is the population. RailList is for things
 * that are few and different — a menu of services, a set of plans — where each
 * row is a distinct choice. This is for many rows that are alike, scanned
 * rather than read, where somebody is looking for one line in a column of
 * forty: a store list, a vendor directory, a set of branches.
 *
 * `unavailable` is the field most directories leave out. A row that is closed,
 * out of range or out of stock STOPS BEING A LINK here and says why, because
 * the alternative is a visitor tapping through and finding out on the next
 * screen, which is the same information delivered one step later and one step
 * more annoying.
 *
 * `tags` exists separately from `meta` for the same reason `RailRating` will
 * not hide its sample size: somebody scanning a directory for "SNAP" or
 * "EBT" is scanning for an eligibility fact, and burying it in a comma-joined
 * meta line means they cannot find it.
 *
 * The favourite control is opt-in. A heart that forgets what it was told is
 * worse than no heart, so if the site cannot persist it, it is not drawn.
 */
export default function RailMerchant({
  items,
  label,
  heading,
  favourite,
  source,
  onSelect,
  className,
}: RailMerchantProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={["rail-merchant", className].filter(Boolean).join(" ")}
      data-rail-merchant={source}
    >
      {heading && <h2 className="rail-merchant__heading">{heading}</h2>}
      <ul className="rail-merchant__list" aria-label={label}>
        {items.map((item, index) => {
          const saved = favourite?.ids.includes(item.id) ?? false;
          const body = (
            <>
              <Logo logo={item.logo} name={item.name} />
              <span className="rail-merchant__text">
                <span className="rail-merchant__name">{item.name}</span>
                {(item.eta || item.meta) && (
                  <span className="rail-merchant__meta">
                    {[item.eta, item.meta].filter(Boolean).join(" · ")}
                  </span>
                )}
                {item.offer && (
                  <span className="rail-merchant__offer">{item.offer}</span>
                )}
                {item.tags && item.tags.length > 0 && (
                  <span className="rail-merchant__tags">
                    {item.tags.map((tag) => (
                      <span className="rail-merchant__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
                {item.unavailable && (
                  <span className="rail-merchant__unavailable">
                    {item.unavailable}
                  </span>
                )}
              </span>
            </>
          );

          return (
            <li className="rail-merchant__row" key={item.id} data-rail-unavailable={item.unavailable ? "" : undefined}>
              {item.href && !item.unavailable ? (
                <a
                  className="rail-merchant__link"
                  href={item.href}
                  onClick={() => onSelect?.({ source, id: item.id, index })}
                >
                  {body}
                </a>
              ) : (
                <div className="rail-merchant__link">{body}</div>
              )}
              {favourite && (
                <button
                  type="button"
                  className="rail-merchant__favourite"
                  aria-pressed={saved}
                  onClick={() => favourite.onToggle(item.id, !saved)}
                >
                  <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
                  <span className="rail-sr-only">
                    {saved
                      ? favourite.removeLabel(item.name)
                      : favourite.addLabel(item.name)}
                  </span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
