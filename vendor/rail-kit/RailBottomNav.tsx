"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RailIcon, type RailIconName } from "./icons";

export type RailBottomNavItem = {
  id: string;
  label: string;
  href: string;
  /** A kit icon name or the brand's own node. */
  icon: RailIconName | ReactNode;
  /** A count on the icon — unread, in basket. */
  badge?: ReactNode;
};

export type RailBottomNavProps = {
  items: RailBottomNavItem[];
  activeId?: string;
  /** What this navigation is, for a screen reader. */
  label: string;
  /**
   * Detaches the bar into a floating pill with the page visible behind and
   * beside it.
   *
   * Only with a real backdrop. Floating means content scrolls underneath, so
   * a transparent pill puts moving text under the labels; give it
   * `--rail-bottomnav-floating-bg`. The spacer still reserves the height —
   * floating does not mean the last call to action may sit under it.
   */
  floating?: boolean;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

function isIconName(icon: unknown): icon is RailIconName {
  return typeof icon === "string";
}

/**
 * The bar of destinations pinned to the bottom of the screen: three to five
 * places, each one a real page.
 *
 * Bottom, not top, because this is where a thumb reaches. Five is the cap —
 * past that the labels shrink below reading size and the targets below a
 * thumb's width, and what you have is a menu pretending to be navigation.
 *
 * Like RailStickyBar it reserves its own height with a measured spacer rather
 * than writing `padding-bottom` to <body>: a fixed bar with nothing holding
 * its space sits on top of the end of every page, which is where the last
 * call to action lives.
 */
export default function RailBottomNav({
  items,
  activeId,
  label,
  floating = false,
  source,
  onSelect,
  className,
}: RailBottomNavProps) {
  const ref = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const bar = ref.current;
    if (!bar || typeof ResizeObserver !== "function") return;
    const observer = new ResizeObserver(() => setHeight(bar.offsetHeight));
    observer.observe(bar);
    setHeight(bar.offsetHeight);
    return () => observer.disconnect();
  }, []);

  const shown = items.slice(0, 5);

  return (
    <>
      <div className="rail-bottomnav__spacer" style={{ height }} aria-hidden="true" />
      <nav
        ref={ref}
        className={["rail-bottomnav", floating && "rail-bottomnav--floating", className]
          .filter(Boolean)
          .join(" ")}
        data-rail-bottomnav={source}
        aria-label={label}
      >
        <ul className="rail-bottomnav__list">
          {shown.map((item, index) => (
            <li className="rail-bottomnav__item" key={item.id}>
              <a
                className="rail-bottomnav__link"
                href={item.href}
                aria-current={item.id === activeId ? "page" : undefined}
                onClick={() => onSelect?.({ source, id: item.id, index })}
              >
                <span className="rail-bottomnav__icon" aria-hidden="true">
                  {isIconName(item.icon) ? <RailIcon name={item.icon} /> : item.icon}
                  {item.badge !== undefined && (
                    <span className="rail-bottomnav__badge">{item.badge}</span>
                  )}
                </span>
                <span className="rail-bottomnav__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
