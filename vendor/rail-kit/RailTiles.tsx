"use client";

import type { ReactNode } from "react";

export type RailTile = {
  id: string;
  /** The words. They are the whole meaning: the art is decoration. */
  label: string;
  href: string;
  /** Cover art, a category photo, a logo. */
  image?: { src: string; alt?: string };
  /** A mark instead of a picture. */
  glyph?: ReactNode;
  /** A small state at the end — playing, new, a count. */
  badge?: ReactNode;
};

export type RailTilesProps = {
  tiles: RailTile[];
  /** What the set is, for a screen reader: "Jump back in". */
  label: string;
  heading?: string;
  /**
   * Two on a phone, and the cap is deliberate. Three 120px tiles across a
   * 390px screen leaves each label about eleven characters before it
   * truncates, which turns a grid of names into a grid of stubs.
   */
  columns?: 2 | 3;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A grid of short, wide tiles: a picture and a name, two across.
 *
 * NOT RailShortcuts, which is a horizontal ROW of marks with small words under
 * them, aimed at rather than read — you aim at the pizza, not at the word
 * "Pizza". This is the opposite balance: the label leads and the art supports
 * it, because "This Is deadmau5" and "Anime Lofi Playlist" are not things
 * anybody recognises from a thumbnail.
 *
 * THE ART IS `alt=""` BY DEFAULT and the label is the accessible name. Cover
 * art beside its own title is decoration, and describing it makes a screen
 * reader read the same thing twice. Pass `alt` only when the picture says
 * something the label does not.
 *
 * Two columns, not four. The label has to survive at 390px, and a tile whose
 * name truncates at eleven characters is not a tile, it is a guess.
 */
export default function RailTiles({
  tiles,
  label,
  heading,
  columns = 2,
  source,
  onSelect,
  className,
}: RailTilesProps) {
  if (tiles.length === 0) return null;

  return (
    <section
      className={["rail-tiles", className].filter(Boolean).join(" ")}
      data-rail-tiles={source}
      data-rail-columns={columns}
    >
      {heading && <h2 className="rail-tiles__heading">{heading}</h2>}
      <ul className="rail-tiles__grid" aria-label={label}>
        {tiles.map((tile, index) => (
          <li className="rail-tiles__cell" key={tile.id}>
            <a
              className="rail-tiles__tile"
              href={tile.href}
              onClick={() => onSelect?.({ source, id: tile.id, index })}
            >
              {tile.image ? (
                <img
                  className="rail-tiles__art"
                  src={tile.image.src}
                  alt={tile.image.alt ?? ""}
                  loading="lazy"
                />
              ) : (
                tile.glyph && (
                  <span className="rail-tiles__glyph" aria-hidden="true">
                    {tile.glyph}
                  </span>
                )
              )}
              <span className="rail-tiles__label">{tile.label}</span>
              {tile.badge && (
                <span className="rail-tiles__badge">{tile.badge}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
