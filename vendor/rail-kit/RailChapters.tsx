"use client";

import { useEffect, useRef, useState } from "react";

export type RailChapter = {
  id: string;
  /** What this part is: "Sound quality", "High-voltage battery", "The ascent". */
  title: string;
  /** One line under the title, shown only while the chapter is the active one. */
  note?: string;
};

export type RailChaptersProps = {
  chapters: RailChapter[];
  /**
   * Read on the index itself: "Chapters", "Parts", "What it does". A list of
   * jumps with no name is a set of anonymous buttons to a screen reader.
   */
  label: string;
  /**
   * Called with the chapter id whenever the active one changes. This is how a
   * scene, a viewer or a figure is driven WITHOUT this component owning it —
   * the kit ships no 3D runtime and this is not the place to start.
   */
  onChange?: (id: string) => void;
  /** The scene the index sits beside: a RailScrub, a figure, a table. */
  children?: React.ReactNode;
  source: string;
  className?: string;
};

/**
 * An index of the parts of a long section, pinned beside it, that keeps up with
 * the scroll and can jump to any of them.
 *
 * IT NEVER TAKES THE SCROLL. The page scrolls at its own speed the whole way
 * through; this only READS the position and reflects it. Measured on
 * r/web_design 2026-09-25, `scrolljack` appears 20 times across one pull and
 * every mention is a complaint — "as a user, I hate them, it's an instant turn
 * off". A chaptered section that hijacks the wheel is the defect this format
 * ships with, so the wheel is never touched: no preventDefault, no snap, no
 * scroll listener that moves the page.
 *
 * THE JUMPS ARE REAL BUTTONS. Someone who cannot see the scene still needs the
 * parts, and a list of chapters that only responds to scrolling is a list only
 * a mouse can read. Each one moves the page with `scrollIntoView`, which
 * respects the platform's own reduced-motion setting.
 *
 * IT SHIPS NO MEDIA AND NO RUNTIME. The heaviest thing this format does is the
 * scene, and that belongs to whatever renders it. Apple's AirPods page spends
 * over 80 MB on one — measured by a r/web_design commenter on that exact page —
 * and a brand site on a phone on mobile data is not Apple. This component adds
 * bytes for a list and nothing else.
 *
 * THE ACTIVE CHAPTER IS THE ONE CROSSING THE READING LINE, not the one nearest
 * the top. A section pinned for two screens has its top edge far off-screen for
 * most of its life, so "closest to 0" picks the wrong part for most of the
 * scroll. The line sits at 45% of the viewport — where a person actually reads.
 *
 * MOTION OFF MEANS THE INDEX STILL TRACKS. Reduced motion removes the
 * transition on the marker, never the marker: an index frozen on chapter one is
 * a broken index, not a calm one (E08).
 *
 * IT CLEANS UP AFTER ITSELF. The observer is disconnected and the frame is
 * cancelled on unmount — a scroll handler that outlives its section is a leak
 * that only shows on the fourth navigation.
 */
export default function RailChapters({
  chapters,
  label,
  onChange,
  children,
  source,
  className,
}: RailChaptersProps) {
  const [active, setActive] = useState(0);
  const marks = useRef<(HTMLElement | null)[]>([]);
  const announced = useRef(-1);

  useEffect(() => {
    const nodes = marks.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    let raf = 0;

    const pick = () => {
      raf = 0;
      // La linea de lectura, no el borde: una seccion fijada dos pantallas
      // tiene el borde superior fuera de vista casi todo el recorrido.
      const line = window.innerHeight * 0.45;
      let best = 0;
      let near = Infinity;
      nodes.forEach((node, i) => {
        const rect = node.getBoundingClientRect();
        // Un capitulo cuenta desde que su parte superior cruza la linea.
        const gap = rect.top <= line ? line - rect.top : Infinity;
        if (gap < near) {
          near = gap;
          best = i;
        }
      });
      setActive(best);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };

    const watcher = new IntersectionObserver(request, {
      // Varios umbrales: sin ellos el indice solo despierta al entrar y salir,
      // y se queda quieto durante todo el tramo intermedio, que es el tramo.
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    nodes.forEach((node) => watcher.observe(node));
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    pick();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      watcher.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [chapters.length]);

  useEffect(() => {
    // Avisar una vez por cambio real, nunca en cada fotograma del scroll.
    if (announced.current === active) return;
    announced.current = active;
    const at = chapters[active];
    if (at && onChange) onChange(at.id);
  }, [active, chapters, onChange]);

  return (
    <div
      className={["rail-chapters", className].filter(Boolean).join(" ")}
      data-rail-chapters={source}
    >
      <nav aria-label={label} className="rail-chapters__index">
        <p className="rail-chapters__label">{label}</p>
        <ol className="rail-chapters__list">
          {chapters.map((chapter, i) => (
            <li className="rail-chapters__item" key={chapter.id}>
              <button
                aria-current={i === active ? "true" : undefined}
                className="rail-chapters__jump"
                onClick={() => {
                  marks.current[i]?.scrollIntoView({ block: "start" });
                }}
                type="button"
              >
                <span className="rail-chapters__title">{chapter.title}</span>
                {chapter.note && i === active ? (
                  <span className="rail-chapters__note">{chapter.note}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className="rail-chapters__scene">
        {children}
        {chapters.map((chapter, i) => (
          <div
            aria-hidden="true"
            className="rail-chapters__mark"
            key={chapter.id}
            ref={(node) => {
              marks.current[i] = node;
            }}
          />
        ))}
      </div>
    </div>
  );
}
