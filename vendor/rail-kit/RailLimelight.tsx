"use client";

import type { ReactNode } from "react";

export type RailLimelightProps = {
  /** Quien esta debajo de la luz. */
  children: ReactNode;
  /**
   * Donde esta, de -50 a 50, siendo 0 el centro. La luz Y el charco siguen
   * este numero; el sujeto lo sigue tambien, asi que se mueven juntos sin
   * compartir transform — un cono que escala con su actor deja de ser un cono.
   */
  at?: number;
  /**
   * Que hay ahi, en palabras. Obligatorio: un foco sobre un avatar es una
   * afirmacion ("este eres tu", "vas por aqui") y quien no ve la luz tiene
   * que poder leerla.
   */
  label: string;
  source: string;
  className?: string;
};

/**
 * Un cono de luz cenital sobre lo que este debajo, con su charco en el suelo.
 *
 * NO es `data-rail-spotlight`. Aquel es una luz que recorre el BORDE de una
 * tarjeta para decir cual esta en foco. Este cae sobre un SUJETO desde arriba
 * para decir que hay algo en un escenario. Estuvieron a punto de llamarse
 * igual, lo que habria dejado al kit con una palabra para dos efectos y sin
 * forma de pedir ninguno de los dos.
 *
 * El charco no es adorno: sin la elipse en el suelo el cono se desvanece y el
 * sujeto flota en niebla. Es lo que lo pone de pie.
 */
export default function RailLimelight({
  children,
  at = 0,
  label,
  source,
  className,
}: RailLimelightProps) {
  const x = Math.min(50, Math.max(-50, at));
  return (
    <div
      className={["rail-limelight", className].filter(Boolean).join(" ")}
      data-rail-limelight={source}
      style={{ "--rail-limelight-x": `${x}%` } as React.CSSProperties}
    >
      <div
        className="rail-limelight__subject"
        style={{ "--rail-limelight-x": `${x}%` } as React.CSSProperties}
      >
        {children}
        <span className="rail-sr-only">{label}</span>
      </div>
    </div>
  );
}
