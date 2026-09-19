"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * How far down a very long page you are.
 *
 * Measured reason: these pages are 11.6 screens (a niche page), 21.8 (a
 * service page) and 44.6 (the Spanish home) on a 375px phone. A scrollbar on a
 * phone is a thin ghost that appears while you drag and vanishes after; there
 * is otherwise no answer to "how much of this is left".
 *
 * It adds no text at all, which is the reason it is built here instead of
 * using the kit's `rail-progress` — that one is a labelled card with a value,
 * and every word of it would be a new claim on 91 routes.
 *
 * `aria-hidden`, and deliberately: this is decoration for a sighted reader.
 * A screen reader already reports position, and a live progress value read out
 * on every scroll tick would be hostile.
 *
 * It only appears on pages long enough to need it — under two screens there is
 * nothing to track — and it never animates its width, so a reduced-motion
 * visitor gets the same information without the movement.
 */
export function ReadingProgress() {
  const pathname = usePathname();
  const [pct, setPct] = useState(0);
  const [long, setLong] = useState(false);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setLong(document.documentElement.scrollHeight > window.innerHeight * 2);
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  if (!long) return null;

  return (
    <div className="em-progress" aria-hidden="true">
      <div className="em-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
