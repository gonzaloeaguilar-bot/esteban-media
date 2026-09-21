"use client";

import type { ReactNode } from "react";

export type RailSegment = {
  id: string;
  label: string;
  /** A mark before the label — a play glyph, a heart. */
  icon?: ReactNode;
  /** Makes the segment a real link. Without one it is a button. */
  href?: string;
};

export type RailSegmentedProps = {
  segments: RailSegment[];
  activeId: string;
  /** What the choice is, for a screen reader: "Rewards view", "Sort". */
  label: string;
  /** Fills the width and splits it evenly. Default on a phone either way. */
  block?: boolean;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * Two or three views of the same thing, in a pill — My Rewards / Store,
 * Last played / Favourites, Promos / Rewards.
 *
 * NOT the same control as RailTabs, and the difference is worth keeping. Tabs
 * are the sections of a screen and sit at the top of it; a segmented control
 * is a switch INSIDE one section, changing how that section's own content is
 * shown. Using tabs for a switch makes a page look like it has more top-level
 * structure than it does, and a switch for tabs buries the navigation.
 *
 * Three is the cap. Past that the labels stop fitting on a phone and the
 * control wants to be RailFilters, which scrolls.
 */
export default function RailSegmented({
  segments,
  activeId,
  label,
  block,
  source,
  onSelect,
  className,
}: RailSegmentedProps) {
  const shown = segments.slice(0, 3);

  return (
    <div
      className={["rail-segmented", className].filter(Boolean).join(" ")}
      data-rail-segmented={source}
      data-rail-block={block ? "" : undefined}
      role="group"
      aria-label={label}
    >
      {shown.map((segment, index) => {
        const active = segment.id === activeId;
        const content = (
          <>
            {segment.icon && (
              <span className="rail-segmented__icon" aria-hidden="true">
                {segment.icon}
              </span>
            )}
            <span className="rail-segmented__label">{segment.label}</span>
          </>
        );
        const props = {
          className: "rail-segmented__segment",
          "data-active": active ? "" : undefined,
          onClick: () => onSelect?.({ source, id: segment.id, index }),
        };
        return segment.href ? (
          <a
            key={segment.id}
            {...props}
            href={segment.href}
            aria-current={active ? "page" : undefined}
          >
            {content}
          </a>
        ) : (
          <button
            key={segment.id}
            {...props}
            type="button"
            // A switch, not a page: aria-pressed is the honest description.
            aria-pressed={active}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
