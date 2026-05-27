"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Background video element that honors `prefers-reduced-motion`. When the user
 * has reduced-motion enabled (or the media query is unavailable), the video
 * does not autoplay — the poster image stays visible instead.
 */
export function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (allowMotion) {
      el.play().catch(() => {
        // Autoplay can still be blocked by the browser; the poster remains.
      });
    } else {
      el.pause();
    }
  }, [allowMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      loop
      muted
      playsInline
      preload={allowMotion ? "auto" : "metadata"}
      poster={poster}
      src={src}
      aria-hidden
    />
  );
}
