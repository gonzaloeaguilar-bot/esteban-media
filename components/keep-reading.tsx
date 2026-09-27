"use client";

import Script from "next/script";
import type { ReactNode } from "react";

/**
 * The web-kit fold-out (vendor/web-kit/reading-path), as ONE definition.
 * Everything inside stays in the DOM — crawlers and answer engines read what
 * they read before; only the visitor's scroll gets shorter. The summary names
 * what is inside, so opening it is a decision, not a mystery.
 */
export function KeepReading({ id, title, destinations, children }: { id: string; title: string; destinations: string; children: ReactNode }) {
  return (
    <>
      <details className="wk-keep-reading em-fold" id={id} data-section="keep_reading">
        <summary data-cta={`keep_reading_${id}`}>
          <span>
            <strong>{title}</strong>
            <small>{destinations}</small>
          </span>
        </summary>
        {children}
      </details>
      <Script id="wk-reading-path" src="/web-kit/reading-path-anchors.js" strategy="afterInteractive" onLoad={() => (window as unknown as { wkReadingPathAnchors?: () => void }).wkReadingPathAnchors?.()} />
    </>
  );
}
