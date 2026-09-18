import type { ReactElement } from "react";

/**
 * The kit's generic icon set.
 *
 * The paths are Tabler Icons (https://tabler.io/icons), MIT licensed —
 * Copyright (c) 2020-2026 Paweł Kuna. See LICENSES.md. They are COPIED, not
 * imported: rail-kit is vendored into static sites and one Shopify/Liquid
 * theme, so a runtime dependency for twelve glyphs would be a poor trade.
 * Take any other Tabler icon the same way; keep the attribution.
 *
 * Every icon is 24×24 on `currentColor`, so a brand gets its own accent for
 * free and no icon here carries a brand's personality. A brand with its own
 * icon language passes its own node as `icon` and never touches this set.
 */
export type RailIconName =
  | "spark"
  | "check"
  | "chart"
  | "calculator"
  | "compare"
  | "chat"
  | "clock"
  | "book"
  | "target"
  | "users"
  | "tag"
  | "map";

// Tabler draws at stroke-width 2; the kit renders smaller than 24px in most
// places, so 1.75 keeps the weight even against the card's type.
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const RAIL_ICONS: Record<RailIconName, ReactElement> = {
  spark: (
    <g {...s}>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
    </g>
  ),
  check: (
    <g {...s}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </g>
  ),
  chart: (
    <g {...s}>
      <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
      <path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
      <path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
      <path d="M4 20h14" />
    </g>
  ),
  calculator: (
    <g {...s}>
      <path d="M4 5a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -14" />
      <path d="M8 8a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -1" />
      <path d="M8 14l0 .01" />
      <path d="M12 14l0 .01" />
      <path d="M16 14l0 .01" />
      <path d="M8 17l0 .01" />
      <path d="M12 17l0 .01" />
      <path d="M16 17l0 .01" />
    </g>
  ),
  compare: (
    <g {...s}>
      <path d="M21 17l-18 0" />
      <path d="M6 10l-3 -3l3 -3" />
      <path d="M3 7l18 0" />
      <path d="M18 20l3 -3l-3 -3" />
    </g>
  ),
  chat: (
    <g {...s}>
      <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
    </g>
  ),
  clock: (
    <g {...s}>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 7v5l3 3" />
    </g>
  ),
  book: (
    <g {...s}>
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6l0 13" />
      <path d="M12 6l0 13" />
      <path d="M21 6l0 13" />
    </g>
  ),
  target: (
    <g {...s}>
      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </g>
  ),
  users: (
    <g {...s}>
      <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </g>
  ),
  tag: (
    <g {...s}>
      <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" />
    </g>
  ),
  map: (
    <g {...s}>
      <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
      <path d="M9 4v13" />
      <path d="M15 7v13" />
    </g>
  ),
};

export function RailIcon({ name }: { name: RailIconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {RAIL_ICONS[name]}
    </svg>
  );
}
