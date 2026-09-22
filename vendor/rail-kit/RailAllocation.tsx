"use client";

export type RailAllocationSlice = {
  id: string;
  /** Como se llama esto en la leyenda. */
  label: string;
  /** Su parte. Cualquier unidad: se normaliza contra la suma. */
  value: number;
  /** Una linea debajo del nombre: un detalle, una fecha, un vencimiento. */
  detail?: string;
  /** Su color. Sin esto va tomando tonos del acento de la marca. */
  color?: string;
};

export type RailAllocationProps = {
  slices: RailAllocationSlice[];
  /** De que es este reparto: "Tu cartera", "El presupuesto". Obligatorio. */
  label: string;
  /**
   * Como se escribe cada porcentaje. Recibe la fraccion 0-1.
   *
   * OBLIGATORIO, y por la misma razon que `label` lo es en RailSteps: el
   * defecto que tenia antes redondeaba a entero y pegaba un "%", que son dos
   * decisiones de idioma y de precision tomadas por el kit en nombre de una
   * marca que no las eligio. "32,7 %" y "33%" no son el mismo dato.
   */
  format: (share: number) => string;
  /** Cuantas filas de leyenda antes de parar. El resto se agrupa en "otros". */
  max?: number;
  restLabel?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * Como se reparte un todo: una barra de tramos proporcionales y la leyenda
 * que dice cual es cual.
 *
 * LA BARRA SOLA NO ES INFORMACION. Ocho tramos de ocho tonos del mismo color
 * no se distinguen, y para quien no ve el color no existen en absoluto. Por
 * eso la leyenda es obligatoria y no opcional: es donde vive el dato, y la
 * barra solo dice de un vistazo cual manda.
 *
 * Se anuncia como una lista con su porcentaje en el texto, no como una
 * imagen. Un `role="img"` con un alt largo obliga a oir el reparto entero de
 * corrido, sin poder recorrerlo ni pararse en una fila.
 *
 * No es `RailProgress`, que mide UNA cosa contra su meta. Aqui no hay meta:
 * hay un todo ya repartido.
 */
export default function RailAllocation({
  slices,
  label,
  format,
  max,
  restLabel = "Resto",
  source,
  onSelect,
  className,
}: RailAllocationProps) {
  const positive = slices.filter((s) => s.value > 0);
  if (positive.length === 0) return null;

  const total = positive.reduce((n, s) => n + s.value, 0);
  const sorted = [...positive].sort((a, b) => b.value - a.value);

  let shown = sorted;
  if (max && sorted.length > max) {
    const rest = sorted.slice(max - 1);
    shown = [
      ...sorted.slice(0, max - 1),
      {
        id: "rail-rest",
        label: restLabel,
        value: rest.reduce((n, s) => n + s.value, 0),
      },
    ];
  }

  return (
    <div
      className={["rail-allocation", className].filter(Boolean).join(" ")}
      data-rail-allocation={source}
    >
      <div className="rail-allocation__bar" aria-hidden="true">
        {shown.map((s, i) => (
          <span
            className="rail-allocation__slice"
            key={s.id}
            style={{
              width: `${(s.value / total) * 100}%`,
              background: s.color,
              // Sin color propio, cada tramo se aclara un escalon. Es una
              // escala, no un arcoiris: tonos del mismo acento se leen como
              // partes de un todo, y ocho matices distintos no.
              opacity: s.color ? undefined : 1 - Math.min(i, 6) * 0.12,
            }}
          />
        ))}
      </div>

      <ul className="rail-allocation__legend" aria-label={label}>
        {shown.map((s, i) => (
          <li className="rail-allocation__row" key={s.id}>
            <span
              className="rail-allocation__dot"
              aria-hidden="true"
              style={{
                background: s.color,
                opacity: s.color ? undefined : 1 - Math.min(i, 6) * 0.12,
              }}
            />
            <span className="rail-allocation__text">
              {onSelect ? (
                <button
                  type="button"
                  className="rail-allocation__name"
                  onClick={() => onSelect({ source, id: s.id })}
                >
                  {s.label}
                </button>
              ) : (
                <span className="rail-allocation__name">{s.label}</span>
              )}
              {s.detail && (
                <span className="rail-allocation__detail">{s.detail}</span>
              )}
            </span>
            <span className="rail-allocation__share">
              {format(s.value / total)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
