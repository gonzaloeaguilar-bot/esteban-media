"use client";

import type { ReactNode } from "react";

export type RailNowPlayingProps = {
  /** What is playing, first line. */
  title: string;
  /** Who it is by, or what it belongs to. */
  by?: string;
  art?: { src: string; alt: string };
  /**
   * Where the sound is actually going — "soundcore P40i", "Kitchen speaker".
   * Spotify draws this because somebody who has just walked away from a
   * speaker needs to know the audio went with them. It is a fact about the
   * world, not decoration.
   */
  device?: { label: string; glyph?: ReactNode };
  /** Seconds elapsed and total. Both, or neither: a bar with no numbers is a feeling. */
  progress?: { seconds: number; of: number };
  /**
   * The transport control. `playing` decides which of the two labels is read,
   * and BOTH are required: "Pause" and "Play" are not universal, and a button
   * whose name does not change when its function does is a button a screen
   * reader describes wrongly half the time.
   */
  transport: {
    playing: boolean;
    playLabel: string;
    pauseLabel: string;
    onToggle: () => void;
  };
  /** Up to two more controls — save, add, a device picker. */
  actions?: { id: string; label: string; glyph: ReactNode; pressed?: boolean; onClick: () => void }[];
  /** Opens the full player. The bar itself is a summary, not the whole screen. */
  expand?: { label: string; href?: string; onClick?: () => void };
  /** Height in px of a bar pinned below this one, so they do not overlap. */
  liftBy?: number;
  source: string;
  className?: string;
};

function clock(total: number): string {
  const s = Math.max(0, Math.round(total));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * The bar that says what is playing, and keeps saying it on every screen.
 *
 * WHY IT IS NOT RailStickyBar: that one reserves space for an arbitrary strip
 * a site pins to the bottom. This is a specific object with specific parts —
 * what is playing, where it is going, how far in it is, and the one control
 * that stops it — and every one of those parts has a way of being got wrong.
 *
 * THE TRANSPORT BUTTON RENAMES ITSELF. `playLabel` and `pauseLabel` are both
 * required because a control whose accessible name does not change when its
 * function does is a control a screen reader describes wrongly half the time.
 * The same applies to the pressed state on the extra actions.
 *
 * THE PROGRESS BAR IS A NATIVE <progress> with both numbers stated beside it.
 * A hairline with no figures cannot be checked, and the browser gives the
 * value, the maximum and the role for free.
 *
 * It does NOT autoplay, it does not start audio, and it has no prop that
 * could: it renders the state of something the site is already playing.
 */
export default function RailNowPlaying({
  title,
  by,
  art,
  device,
  progress,
  transport,
  actions,
  expand,
  liftBy = 0,
  source,
  className,
}: RailNowPlayingProps) {
  const summary = (
    <>
      {art && (
        <img className="rail-nowplaying__art" src={art.src} alt={art.alt} loading="lazy" />
      )}
      <span className="rail-nowplaying__text">
        <span className="rail-nowplaying__title">
          {title}
          {by && <span className="rail-nowplaying__by"> &middot; {by}</span>}
        </span>
        {device && (
          <span className="rail-nowplaying__device">
            {device.glyph && <span aria-hidden="true">{device.glyph}</span>}
            {device.label}
          </span>
        )}
      </span>
    </>
  );

  return (
    <div
      className={["rail-nowplaying", className].filter(Boolean).join(" ")}
      data-rail-nowplaying={source}
      style={liftBy ? { bottom: `${liftBy}px` } : undefined}
    >
      <div className="rail-nowplaying__row">
        {expand?.href ? (
          <a className="rail-nowplaying__summary" href={expand.href} aria-label={expand.label}>
            {summary}
          </a>
        ) : expand ? (
          <button
            type="button"
            className="rail-nowplaying__summary"
            onClick={expand.onClick}
            aria-label={expand.label}
          >
            {summary}
          </button>
        ) : (
          <div className="rail-nowplaying__summary">{summary}</div>
        )}

        <div className="rail-nowplaying__controls">
          {actions?.slice(0, 2).map((action) => (
            <button
              type="button"
              key={action.id}
              className="rail-nowplaying__action"
              aria-pressed={action.pressed}
              onClick={action.onClick}
            >
              <span aria-hidden="true">{action.glyph}</span>
              <span className="rail-sr-only">{action.label}</span>
            </button>
          ))}
          <button
            type="button"
            className="rail-nowplaying__transport"
            onClick={transport.onToggle}
          >
            <span aria-hidden="true">{transport.playing ? "⏸" : "▶"}</span>
            <span className="rail-sr-only">
              {transport.playing ? transport.pauseLabel : transport.playLabel}
            </span>
          </button>
        </div>
      </div>

      {progress && (
        <div className="rail-nowplaying__progress">
          <progress value={progress.seconds} max={progress.of || 1} />
          <span className="rail-nowplaying__clock">
            {clock(progress.seconds)} / {clock(progress.of)}
          </span>
        </div>
      )}
    </div>
  );
}
