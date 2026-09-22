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
  /**
   * How the figure moved, as the words a person would say: "+$0.52",
   * "-2.77%". A string and not a number, because the sign, the currency and
   * the decimals are the consumer's to decide — and a component that formats
   * money is a component that gets the locale wrong somewhere.
   */
  delta?: string;
  /**
   * Which way that movement counts, AND the words for it. They travel
   * together and the type enforces it: the first version let a caller pass
   * `direction` alone, which set the colour and emitted nothing for a screen
   * reader — the exact failure the field exists to prevent. Colour carrying
   * the meaning on its own is the bug, so the type does not allow it.
   *
   * `labels` ships no English: the consumer says "sube"/"baja", "up"/"down".
   */
  movement?: { way: "up" | "down"; labels: { up: string; down: string } };
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
              <span className="rail-stats__value">
                {tile.value}
                {tile.delta && (
                  <span
                    className="rail-stats__delta"
                    data-direction={tile.movement?.way}
                  >
                    {tile.movement && (
                      <span className="rail-sr-only">
                        {tile.movement.labels[tile.movement.way]}{" "}
                      </span>
                    )}
                    {tile.delta}
                  </span>
                )}
              </span>
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
