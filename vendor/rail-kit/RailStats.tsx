"use client";

import type { ReactNode } from "react";

export type RailStatTile = {
  id: string;
  /** The figure. A node, so "$0" can carry a small ".00". */
  value: ReactNode;
  /** What the figure is. Required: a number with no label is not information. */
  label: string;
  /** A mark beside the figure — a coin, a token, a brand glyph. */
  icon?: ReactNode;
  /** Makes the whole tile a link. */
  href?: string;
};

export type RailStatsProps = {
  tiles: RailStatTile[];
  /** Tiles per row on a wide screen. Two is the default and usually right. */
  columns?: 2 | 3 | 4;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * Two to four figures side by side — the account summary at the top of a
 * screen: what you have, what it is worth.
 *
 * Not a rail. A rail is for many things alike that scroll; this is a small
 * fixed set that must all be visible at once, because the whole point is
 * comparing them without moving.
 */
export default function RailStats({
  tiles,
  columns = 2,
  source,
  onSelect,
  className,
}: RailStatsProps) {
  if (tiles.length === 0) return null;

  return (
    <div
      className={["rail-stats", className].filter(Boolean).join(" ")}
      data-rail-stats={source}
      data-rail-columns={columns}
    >
      {tiles.map((tile, index) => {
        const inner = (
          <>
            {tile.icon && (
              <span className="rail-stats__icon" aria-hidden="true">
                {tile.icon}
              </span>
            )}
            <span className="rail-stats__text">
              <span className="rail-stats__value">{tile.value}</span>
              <span className="rail-stats__label">{tile.label}</span>
            </span>
          </>
        );
        return tile.href ? (
          <a
            className="rail-stats__tile"
            key={tile.id}
            href={tile.href}
            onClick={() => onSelect?.({ source, id: tile.id, index })}
          >
            {inner}
          </a>
        ) : (
          <div className="rail-stats__tile" key={tile.id}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
