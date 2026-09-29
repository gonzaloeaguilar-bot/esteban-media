"use client";

import { useEffect, useRef } from "react";

/**
 * The fold-out. ONE definition for the whole site — the kit's rule is never to
 * paste the markup per page, because FLAS shipped it to 22 routes as a component
 * and a static site gets one CSS block and one script.
 *
 * What it is for: a page long enough that the last call to action is twenty
 * screens from the first. Everything a visitor needs in order to ACT stays
 * visible; everything that only supports READING collapses behind one
 * <details> whose summary names its destinations, so the click is a decision
 * rather than mystery meat.
 *
 * COLLAPSED IS NOT REMOVED. The content stays in the DOM, so crawlers and
 * answer engines see exactly what they saw before. On this site the organic
 * footprint IS the acquisition channel, so that property is the whole reason
 * this is a <details> and not a conditional render — and
 * app/__tests__/reading-path.test.ts asserts the word count to keep it true.
 *
 * Never drive `open` from React state. The prop is reconciled on every
 * re-render, which snaps the panel shut under the visitor's finger; the anchors
 * script opens it through the DOM node for the same reason.
 */
export function KeepReading({
  title,
  destinations,
  id,
  children,
}: {
  /** The promise: what the visitor gets by opening it. */
  title: string;
  /** Where it leads, named. "Keep reading" alone is mystery meat. */
  destinations: string;
  id: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    // A visitor who arrives on a link INTO the collapsed content must find it
    // open. Done through the node, never through a prop.
    const details = ref.current;
    if (!details) return;
    const hash = window.location.hash.slice(1);
    if (hash && details.querySelector(`#${CSS.escape(hash)}`)) details.open = true;
  }, []);

  return (
    <details ref={ref} className="wk-keep-reading" id={id} data-section={id}>
      <summary data-cta={`keep_reading_${id}`}>
        <span>
          <strong>{title}</strong>
          <small>{destinations}</small>
        </span>
      </summary>
      {children}
    </details>
  );
}
