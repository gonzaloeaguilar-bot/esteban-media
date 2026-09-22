"use client";

export type RailStepsProps = {
  /** En cual estas, empezando por 1. */
  at: number;
  total: number;
  /**
   * Como se dice en palabras. Recibe los dos numeros, asi que quien llama
   * decide el orden y el idioma.
   *
   * Obligatorio, y es la razon de existir del componente: una barra partida en
   * tres trozos de dos colores no le dice NADA a quien no la ve, y "por donde
   * voy" es justo lo que un formulario largo tiene que contestar.
   */
  label: (at: number, total: number) => string;
  /** Muestra tambien el texto, no solo para el lector de pantalla. */
  showLabel?: boolean;
  /**
   * De QUE es esta barra: "Alta de la oferta", "Solicitud".
   *
   * Obligatorio. `aria-valuetext` dice donde estas; el nombre dice de que. axe
   * lo caza como `aria-progressbar-name` si falta, y con razon: "paso 2 de 3"
   * sin decir de que flujo es la mitad de una frase.
   */
  name: string;
  source: string;
  className?: string;
};

/**
 * Por donde vas en un flujo de varios pasos.
 *
 * Es un `<progress>`... no: es una lista de tramos con `role="progressbar"` y
 * sus valores, porque un paso o esta hecho o no, y un `<progress>` sugiere una
 * medida continua que aqui no existe.
 *
 * No es `RailStory`, que pinta una barra parecida para una secuencia que avanza
 * SOLA. Aqui avanzas tu, y el numero importa: "paso 2 de 3" es una promesa
 * sobre cuanto queda.
 */
export default function RailSteps({
  at,
  total,
  label,
  showLabel = false,
  name,
  source,
  className,
}: RailStepsProps) {
  const safeTotal = Math.max(1, total);
  const safeAt = Math.min(Math.max(1, at), safeTotal);
  const words = label(safeAt, safeTotal);

  return (
    <div
      className={["rail-steps", className].filter(Boolean).join(" ")}
      data-rail-steps={source}
    >
      <div
        className="rail-steps__track"
        role="progressbar"
        aria-label={name}
        aria-valuenow={safeAt}
        aria-valuemin={1}
        aria-valuemax={safeTotal}
        aria-valuetext={words}
      >
        {Array.from({ length: safeTotal }, (_, i) => (
          <span
            className="rail-steps__seg"
            key={i}
            data-done={i < safeAt ? "" : undefined}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className={showLabel ? "rail-steps__label" : "rail-sr-only"}>{words}</p>
    </div>
  );
}
