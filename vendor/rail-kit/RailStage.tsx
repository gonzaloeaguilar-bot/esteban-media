"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type RailStageDraw = (context: {
  ctx: CanvasRenderingContext2D;
  /** Seconds since the last frame. 0 on the first and on a forced redraw. */
  dt: number;
  width: number;
  height: number;
  /** True when motion is off: draw one readable frame, do not animate. */
  still: boolean;
}) => void;

export type RailStageProps = {
  draw: RailStageDraw;
  /**
   * What the canvas shows, for anyone who cannot see it. A canvas is a hole in
   * the page to a screen reader — whatever is painted in it exists only as
   * pixels.
   */
  label: string;
  /** Stops the loop without unmounting: your own pause button. */
  paused?: boolean;
  /** Ratio of the box. */
  ratio?: string;
  /** Score, controls, instructions — rendered outside the canvas. */
  children?: ReactNode;
  source: string;
  className?: string;
};

/**
 * The surface a small game is played on, with the four things every one of
 * them needs and each of which has been got wrong at least once.
 *
 * **Device pixels.** A canvas sized in CSS pixels is blurry on every phone
 * made this decade. It scales by `devicePixelRatio`, capped at 2 — past that
 * you are painting four times the pixels for a difference nobody can see, on
 * the devices least able to afford it.
 *
 * **It stops when nobody is watching.** Off screen, or on a hidden tab, the
 * loop ends. An animation loop that keeps running in a background tab is a
 * battery bug that no test will ever show you.
 *
 * **Reduced motion draws ONE frame.** Not a frozen blank box: `still` is
 * passed to `draw` so the scene can render its readable state. Motion off must
 * not mean content gone.
 *
 * **The canvas is a hole in the page.** `label` is required, and anything a
 * player needs to read — score, instructions — belongs in `children`, as text,
 * outside it.
 */
export default function RailStage({
  draw,
  label,
  paused = false,
  ratio,
  children,
  source,
  className,
}: RailStageProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // Assigned in an effect, not during render: writing a ref while rendering
  // is what React's compiler lint flags, and under Strict Mode the render
  // that wrote it may be thrown away.
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const surface = canvas.current;
    const frame = box.current;
    if (!surface || !frame) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;

    const still =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 1;
    let height = 1;
    let raf = 0;
    let last = 0;
    let onScreen = true;

    const paint = (dt: number) => drawRef.current({ ctx, dt, width, height, still });

    const size = () => {
      const rect = surface.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(0);
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      paint(dt);
      raf = requestAnimationFrame(tick);
    };

    const run = () => {
      const should = onScreen && !paused && !still && !document.hidden;
      if (should && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!should && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        // Un fotograma mas al parar, para que no quede a medio gesto.
        paint(0);
      }
    };

    const ro = new ResizeObserver(size);
    ro.observe(surface);
    size();

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        run();
      },
      { threshold: 0 },
    );
    io.observe(frame);

    document.addEventListener("visibilitychange", run);
    run();

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [paused]);

  return (
    <div
      ref={box}
      className={["rail-stage", className].filter(Boolean).join(" ")}
      data-rail-stage={source}
    >
      <canvas
        ref={canvas}
        className="rail-stage__canvas"
        style={ratio ? { aspectRatio: ratio } : undefined}
        role="img"
        aria-label={label}
      />
      {children && <div className="rail-stage__panel">{children}</div>}
    </div>
  );
}
