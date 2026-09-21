"use client";

import type { ReactNode } from "react";

export type RailControl = {
  /**
   * Stable name for this control. Asked for by name, never by position.
   *
   * Measured in production on gonzalo.tech: the pause button was found with
   * `.play-field__bar button`, which returns the FIRST button in the bar. The
   * day the speed presets moved into that bar, "Calma" became the first one —
   * so tapping Calma paused the ball and renamed itself "Reanudar pelota", and
   * the real pause control never appeared at all.
   */
  id: string;
  /** The words on it. Required: "Pause" is not universal. */
  label: string;
  glyph?: ReactNode;
  /** A control that is on: a chosen speed, motion paused. */
  pressed?: boolean;
  disabled?: boolean;
};

export type RailControlsProps = {
  controls: RailControl[];
  /** What this set of controls does, for a screen reader. */
  label: string;
  /**
   * Controls that pick ONE of several — the speed presets. Rendered as a
   * radio group so a keyboard moves through them with arrows, and only the
   * chosen one is announced as selected.
   */
  exclusive?: boolean;
  onPress: (info: { source: string; id: string }) => void;
  source: string;
  className?: string;
};

/**
 * The bar of buttons under a small game: pause, speed, style.
 *
 * Each control is addressed by `id`. That is the whole point: a bar whose
 * buttons are found by position breaks silently the day somebody adds one in
 * front, and the failure looks like a different button misbehaving rather than
 * like a selector being wrong.
 */
export default function RailControls({
  controls,
  label,
  exclusive = false,
  onPress,
  source,
  className,
}: RailControlsProps) {
  return (
    <div
      className={["rail-controls", className].filter(Boolean).join(" ")}
      data-rail-controls={source}
      role={exclusive ? "radiogroup" : "group"}
      aria-label={label}
    >
      {controls.map((control) => (
        <button
          key={control.id}
          type="button"
          className="rail-controls__button"
          data-control={control.id}
          data-pressed={control.pressed ? "" : undefined}
          disabled={control.disabled}
          {...(exclusive
            ? { role: "radio", "aria-checked": Boolean(control.pressed) }
            : { "aria-pressed": Boolean(control.pressed) })}
          onClick={() => onPress({ source, id: control.id })}
        >
          {control.glyph && (
            <span className="rail-controls__glyph" aria-hidden="true">
              {control.glyph}
            </span>
          )}
          <span className="rail-controls__label">{control.label}</span>
        </button>
      ))}
    </div>
  );
}
