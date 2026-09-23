"use client";

import { useEffect, useState, type ReactNode } from "react";

export type RailPresenceProps = {
  /** The measured number. */
  count: number;
  /**
   * What is being counted, in the plural: "active players", "people viewing
   * this car", "spots left today". Required, because a bare number beside a
   * pulsing dot is the oldest trick in the book.
   */
  label: string;
  /**
   * When the count was measured. Es la mitad honesta de este componente: un
   * numero vivo sin hora de medicion no se distingue de uno inventado.
   */
  updatedAt?: Date | string | number;
  /**
   * Las palabras de la hora, a partir de los segundos transcurridos.
   * Obligatoria en cuanto pasas `updatedAt`.
   *
   * AQUI HABIA INGLES INCRUSTADO: "just now", "min ago", "hr ago", "d ago",
   * dentro de un kit que existe para no imponerle a una marca ni un color ni
   * una tipografia. Un sitio en espanol renderizaba "2 min ago". Y el redondeo
   * tampoco es nuestro: "hace un cuarto de hora" es una decision de la marca,
   * no una division entre 60.
   */
  relativeTime?: (secondsAgo: number) => string;
  /**
   * La palabra que precede a la hora: "actualizado", "updated". Tambien era
   * inglesa y fija.
   */
  updatedLabel?: string;
  /** Replaces the pulsing dot — a brand glyph, an icon. */
  glyph?: ReactNode;
  /** Hides the pulse. Use when the number is real but not moving. */
  still?: boolean;
  source: string;
  className?: string;
};

const nf = new Intl.NumberFormat();

/**
 * A number of people, measured and shown live — "26,198 active players".
 *
 * READ THIS BEFORE USING IT. This is the exact shape of the oldest dark
 * pattern on the web: a pulsing dot and a number nobody can check, invented to
 * make somebody hurry. The kit refuses countdowns and fake scarcity elsewhere
 * for the same reason, and this component is only allowed to exist because the
 * honest version — a real count from your own backend — is genuinely useful.
 *
 * What the API does about it: `label` is required so the number is never bare,
 * and `updatedAt` renders a measurement time, which is the one thing a made-up
 * number never has. **If you cannot pass a real `updatedAt`, ask whether you
 * can prove the count at all.**
 *
 * Do not wire this to a random number generator, a number that only goes up,
 * or a count seeded from the visitor's own session. If that is what is
 * available, the honest component is no component.
 */
export default function RailPresence({
  count,
  label,
  updatedAt,
  relativeTime,
  updatedLabel,
  glyph,
  still,
  source,
  className,
}: RailPresenceProps) {
  const when = updatedAt ? new Date(updatedAt) : null;
  const valid = Boolean(when && !Number.isNaN(when.getTime()) && relativeTime);

  // `Date.now()` NO PUEDE CORRER EN EL RENDER. Este componente se vendoriza en
  // cuatro sitios de Next: el servidor pinta "hace 3 segundos", el cliente
  // recalcula al hidratar y pinta "hace 5", y React tira un aviso de
  // desajuste y repinta. El reloj arranca en el MOMENTO DE LA MEDICION, que es
  // un dato que llega por props: servidor y cliente coinciden en el primer
  // cuadro porque los dos calculan cero segundos. El efecto lo corrige en
  // cuanto monta y cada minuto despues.
  const [ahora, setAhora] = useState<number | null>(null);

  useEffect(() => {
    if (!valid) return;
    // En el cuadro siguiente, no dentro del efecto: escribir estado de forma
    // sincrona encadena un render dentro de otro y el compilador de React lo
    // rechaza. Un cuadro de retraso aqui no se ve — la hora ya venia del dato.
    const primero = requestAnimationFrame(() => setAhora(Date.now()));
    const id = setInterval(() => setAhora(Date.now()), 60_000);
    return () => {
      cancelAnimationFrame(primero);
      clearInterval(id);
    };
  }, [valid]);

  const segundos =
    when && valid ? Math.max(0, Math.round(((ahora ?? when.getTime()) - when.getTime()) / 1000)) : 0;

  return (
    <p
      className={["rail-presence", className].filter(Boolean).join(" ")}
      data-rail-presence={source}
      data-rail-still={still ? "" : undefined}
    >
      <span className="rail-presence__glyph" aria-hidden="true">
        {glyph ?? <span className="rail-presence__dot" />}
      </span>
      <span className="rail-presence__count">{nf.format(count)}</span>
      <span className="rail-presence__label">{label}</span>
      {valid && when && relativeTime && (
        <span className="rail-presence__when">
          {updatedLabel ? `· ${updatedLabel} ` : "· "}
          <time dateTime={when.toISOString()}>{relativeTime(segundos)}</time>
        </span>
      )}
    </p>
  );
}
