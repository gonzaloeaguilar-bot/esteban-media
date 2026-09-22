"use client";

import { useEffect, useRef, useState } from "react";

export type RailTurntableTrack = {
  id: string;
  title: string;
  /** What it is, in a few words. Shown under the title. */
  note?: string;
  /** The audio file. Nothing here fetches it until somebody presses play. */
  src: string;
  /** Seconds, for the list. A duration you print must be the real one. */
  seconds?: number;
};

export type RailTurntableProps = {
  tracks: RailTurntableTrack[];
  /** Printed on the record label — usually two or three characters. */
  mark?: string;
  /** The line under the mark: "EL LADO B / 01", "SIDE B". */
  edition?: string;
  /**
   * Both labels, always. A control whose accessible name does not change when
   * its function does is a control a screen reader describes wrongly half the
   * time — the same rule RailNowPlaying follows.
   */
  playLabel: string;
  pauseLabel: string;
  /** Named so the deck can say what it is without the brand hard-coding it. */
  armLabel: string;
  /** Shown under the deck before anything has played. */
  hint?: string;
  /**
   * Marks the selection as a sample rather than the artist's own catalogue.
   * Present because the first build of this shipped demo audio next to a real
   * person's name, and that is a claim about who made it (E16).
   */
  badge?: string;
  source: string;
  className?: string;
};

function clock(total: number): string {
  const s = Math.max(0, Math.round(total));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * A record, an arm and a list — the sensory object on a magazine-format site.
 *
 * THE DISC TURNS BECAUSE THE AUDIO SAYS SO. Rotation is driven by the `play`,
 * `pause` and `ended` events of the element itself, never by a timer. A
 * setInterval drifts away from the sound inside a minute, and the drift is the
 * thing people notice without being able to name it. `data-spinning` on the
 * root is the only signal; `motion.css` does the rest.
 *
 * THE ARM AND THE DISC ARE BOTH THE CONTROL. Whatever you instinctively reach
 * for is the thing that plays, because on a drawing of a record player there
 * is no correct guess about which part is the button.
 *
 * CHANGING THE SELECTION WHILE PAUSED DOES NOT START IT. It changes what is
 * cued. A player that starts talking because you touched it is a player people
 * mute once and never open again. If it was already playing, the new track
 * plays — that one is a continuation, not an interruption.
 *
 * IT NEVER AUTOPLAYS. There is no prop that could make it, and the audio
 * carries `preload="none"`: a visitor who never presses play pays nothing.
 */
export default function RailTurntable({
  tracks,
  mark = "",
  edition,
  playLabel,
  pauseLabel,
  armLabel,
  hint,
  badge,
  source,
  className,
}: RailTurntableProps) {
  const audio = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = tracks[index];

  // One subscription for the whole lifetime. The element is the source of
  // truth about whether sound is coming out of it — not this component.
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    el.addEventListener("play", on);
    el.addEventListener("pause", off);
    el.addEventListener("ended", off);
    return () => {
      el.removeEventListener("play", on);
      el.removeEventListener("pause", off);
      el.removeEventListener("ended", off);
    };
  }, []);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  const select = (next: number) => {
    const wasPlaying = !audio.current?.paused;
    setIndex(next);
    // Cue it. Only carry on if sound was already coming out.
    requestAnimationFrame(() => {
      const el = audio.current;
      if (el && wasPlaying) void el.play().catch(() => setPlaying(false));
    });
  };

  return (
    <div
      className={["rail-turntable", className].filter(Boolean).join(" ")}
      data-rail-turntable={source}
      {...(playing ? { "data-spinning": "" } : {})}
    >
      <div className="rail-turntable__deck">
        <button
          type="button"
          className="rail-turntable__record"
          onClick={toggle}
          aria-pressed={playing}
        >
          <span className="rail-turntable__grooves rail-vinyl" aria-hidden="true" />
          <span className="rail-turntable__label" aria-hidden="true">
            <b>{mark}</b>
            {edition && <small>{edition}</small>}
            <i />
          </span>
          <span className="rail-sr-only">{playing ? pauseLabel : playLabel}</span>
        </button>

        <button type="button" className="rail-turntable__arm rail-tonearm" onClick={toggle}>
          <span aria-hidden="true" />
          <span className="rail-sr-only">{armLabel}</span>
        </button>
      </div>

      <div className="rail-turntable__side">
        {badge && <span className="rail-turntable__badge">{badge}</span>}

        <ul className="rail-turntable__list">
          {tracks.map((track, i) => (
            <li key={track.id}>
              <button
                type="button"
                className="rail-turntable__track"
                aria-pressed={i === index}
                onClick={() => select(i)}
              >
                <span className="rail-turntable__number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rail-turntable__text">
                  <strong>{track.title}</strong>
                  {track.note && <small>{track.note}</small>}
                </span>
                {track.seconds != null && <time>{clock(track.seconds)}</time>}
              </button>
            </li>
          ))}
        </ul>

        <p className="rail-turntable__state" role="status">
          {playing ? current?.title : hint}
        </p>

        {/* preload="none": a visitor who never presses play pays nothing. */}
        <audio ref={audio} src={current?.src} preload="none" />
      </div>
    </div>
  );
}
