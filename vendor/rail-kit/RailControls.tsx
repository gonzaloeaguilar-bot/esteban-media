"use client";

import { useRef, type ReactNode } from "react";

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
 *
 * CON `exclusive`, EL ROL CAMBIA Y LAS TECLAS TAMBIEN. `radiogroup` promete
 * que el grupo se entra una vez con el tabulador y se recorre con las flechas;
 * `group` no promete nada de eso y cada boton se tabula por separado. Asi que
 * el tabindex rotatorio y las flechas SOLO existen en el modo exclusivo — poner
 * las teclas en los dos seria quitarle al modo normal el recorrido que tiene.
 * Medido antes: `tabindex=[,,,]` con cuatro radios y el foco quieto.
 */
export default function RailControls({
  controls,
  label,
  exclusive = false,
  onPress,
  source,
  className,
}: RailControlsProps) {
  const botones = useRef<(HTMLButtonElement | null)[]>([]);

  const habilitados = controls.map((c, i) => (c.disabled ? -1 : i)).filter((i) => i >= 0);
  const marcado = controls.findIndex((c) => c.pressed && !c.disabled);
  const entrada = marcado >= 0 ? marcado : habilitados[0] ?? -1;

  const mover = (desde: number, paso: number) => {
    if (habilitados.length === 0) return;
    const donde = habilitados.indexOf(desde);
    const siguiente = habilitados[(donde + paso + habilitados.length) % habilitados.length];
    botones.current[siguiente]?.focus();
    onPress({ source, id: controls[siguiente].id });
  };

  const teclas = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!exclusive) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      mover(index, 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      mover(index, -1);
    }
  };

  return (
    <div
      className={["rail-controls", className].filter(Boolean).join(" ")}
      data-rail-controls={source}
      role={exclusive ? "radiogroup" : "group"}
      aria-label={label}
    >
      {controls.map((control, index) => (
        <button
          key={control.id}
          type="button"
          className="rail-controls__button"
          data-control={control.id}
          data-pressed={control.pressed ? "" : undefined}
          disabled={control.disabled}
          ref={(n) => {
            botones.current[index] = n;
          }}
          {...(exclusive
            ? {
                role: "radio",
                "aria-checked": Boolean(control.pressed),
                tabIndex: index === entrada ? 0 : -1,
              }
            : { "aria-pressed": Boolean(control.pressed) })}
          onKeyDown={(e) => teclas(e, index)}
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
