"use client";

import { useEffect, useRef } from "react";

/**
 * The two moving parts of the viewfinder hero, and nothing else.
 *
 * 1. `--p` on the hero: 0 while the hero fills the screen, 1 once it has
 *    scrolled away. CSS turns that into the transition — the title card
 *    lifts and clears while the footage keeps rolling and the letterbox
 *    narrows. Native scroll, no pinning, no scroll-jacking.
 * 2. The timecode: a real running counter at 24 frames per second, so the
 *    viewfinder reads as live instead of as a decoration.
 *
 * Both stop when the hero is off screen or the tab is hidden, and neither runs
 * under reduced motion (the gate script never adds `rail-anim` there), which
 * leaves the still poster, the title and every link exactly where they are.
 */
export function CinemaHeroMotion({ targetId }: { targetId: string }) {
  const timecodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = document.getElementById(targetId);
    if (!hero) return;
    const root = document.documentElement;
    if (!root.classList.contains("rail-anim")) return;

    const video = hero.querySelector("video");
    // The clip fades in over the poster only once frames are actually moving,
    // so a slow network shows the still, never a black box.
    const onPlaying = () => video?.setAttribute("data-playing", "true");
    video?.addEventListener("playing", onPlaying);
    let visible = true;
    let frame = 0;
    const started = performance.now();
    let lastFrame = -1;

    const pad = (n: number) => String(n).padStart(2, "0");

    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;

      // Scroll progress: how far the hero's own height has left the screen.
      const rect = hero.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * 0.8)));
      hero.style.setProperty("--p", p.toFixed(4));

      const el = timecodeRef.current;
      if (el) {
        const totalFrames = Math.floor(((now - started) / 1000) * 24);
        if (totalFrames !== lastFrame) {
          lastFrame = totalFrames;
          const f = totalFrames % 24;
          const s = Math.floor(totalFrames / 24);
          el.textContent = `00:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          start();
          video?.play().catch(() => {});
        } else {
          video?.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(hero);

    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      io.disconnect();
      video?.removeEventListener("playing", onPlaying);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <span ref={timecodeRef} className="em-cine__timecode">
      00:00:00:00
    </span>
  );
}
