"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type RailScrubProps = {
  /**
   * The clip. It must be encoded with EVERY FRAME A KEYFRAME or the scrub
   * judders, because seeking lands on the nearest keyframe and a normal encode
   * puts those two seconds apart:
   *
   *   ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 out.mp4
   *
   * That file is several times larger than the same clip encoded normally.
   * Keep it short. This is a five-second scene, not a film.
   */
  src: string;
  /**
   * What the scene shows, in words. The video is decoration to a screen reader
   * and content to everyone else; without this it is content to nobody.
   */
  label: string;
  /** Shown before the video can be seeked, and wherever it cannot play. */
  poster?: string;
  /** Anything laid over the scene: the headline, the gloss, the stamps. */
  children?: ReactNode;
  source: string;
  className?: string;
};

/**
 * A scene that moves as the page is scrolled through it — sunrise, an assembly,
 * a camera arriving — and moves no other way.
 *
 * IT NEVER PLAYS. There is no autoplay and no control: `currentTime` is driven
 * by how far the section has travelled through the viewport and by nothing
 * else. A background that plays on its own is a video the visitor is watching
 * instead of reading, and on a phone it is a download they did not ask for.
 *
 * SEEKING BEFORE IT CAN SEEK LOOKS LIKE A BUG. Until `canplaythrough` the clip
 * is pinned to frame 0 and the poster holds the box. Scrubbing a video that
 * has not buffered produces a frozen first frame that lurches when the data
 * lands, and the visitor reads that as a broken page rather than a slow one.
 *
 * THE SEEK IS RATE-LIMITED TO THE FRAME LOOP. Scroll fires far more often than
 * a video can decode, and setting `currentTime` on every event queues seeks
 * the decoder abandons — the picture stalls while the bar keeps moving. The
 * handler records the target; one `requestAnimationFrame` applies the latest.
 *
 * MOTION OFF MEANS ONE FRAME, NOT NO PICTURE. With reduced motion the scene
 * holds its midpoint — the frame where the thing being shown is most legible —
 * and never seeks again. A blank box is not an accessible animation (E08).
 *
 * IT CLEANS UP AFTER ITSELF. The frame is cancelled, the observer is
 * disconnected and the listeners are removed on unmount. A scroll handler that
 * outlives its section is a leak that only shows up on the fourth navigation.
 */
export default function RailScrub({
  src,
  label,
  poster,
  children,
  source,
  className,
}: RailScrubProps) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = box.current;
    const clip = video.current;
    if (!frame || !clip) return;

    const still =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ready = false;
    let onScreen = true;
    let raf = 0;
    let target = 0;

    const duration = () => (Number.isFinite(clip.duration) ? clip.duration : 0);

    const progress = () => {
      const rect = frame.getBoundingClientRect();
      const travel = rect.height + window.innerHeight;
      if (travel <= 0) return 0;
      // 0 cuando el borde superior entra por abajo, 1 cuando el inferior sale
      // por arriba: la escena recorre el clip entero al cruzar la ventana.
      return Math.min(Math.max((window.innerHeight - rect.top) / travel, 0), 1);
    };

    const apply = () => {
      raf = 0;
      if (!ready) return;
      const span = duration();
      if (!span) return;
      const at = Math.min(target * span, span - 0.001);
      if (Math.abs(clip.currentTime - at) > 0.01) clip.currentTime = at;
    };

    const request = () => {
      if (still || !onScreen) return;
      target = progress();
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const ok = () => {
      ready = true;
      frame.dataset.railReady = "true";
      if (still) {
        const span = duration();
        // Un fotograma legible: el medio de la escena, no el negro del principio.
        if (span) clip.currentTime = span / 2;
        return;
      }
      request();
    };

    const watcher = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      if (onScreen) request();
    });
    watcher.observe(frame);

    clip.addEventListener("canplaythrough", ok);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });

    clip.load();
    // Forzar la decodificacion de fotogramas sin reproducir: esta permitido
    // porque va en silencio, y sin ello Safari no bufferiza nada hasta el
    // primer play — asi que el primer seek cae en un video vacio.
    void clip.play().then(() => clip.pause()).catch(() => {});
    clip.currentTime = 0;
    if (clip.readyState >= 4) ok();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      watcher.disconnect();
      clip.removeEventListener("canplaythrough", ok);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div
      className={["rail-scrub", className].filter(Boolean).join(" ")}
      data-rail-scrub={source}
      ref={box}
    >
      <video
        aria-label={label}
        className="rail-scrub__clip"
        disableRemotePlayback
        muted
        playsInline
        poster={poster}
        preload="auto"
        ref={video}
        src={src}
      />
      {children ? <div className="rail-scrub__over">{children}</div> : null}
    </div>
  );
}
