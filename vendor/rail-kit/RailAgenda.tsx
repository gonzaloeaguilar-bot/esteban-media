"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

export type RailAgendaItem = {
  id: string;
  /** Cuando: "viernes 18 sep · 10:00". El kit no formatea fechas. */
  when: string;
  title: ReactNode;
  /** Donde ocurre. Una linea. */
  where?: ReactNode;
  /** Enlace a la fuente. Si falta, el titulo no es un enlace. */
  href?: string;
};

export type RailAgendaGroup = {
  id: string;
  /** El rotulo del lomo: "18 al 20 de septiembre". */
  label: ReactNode;
  /** Una linea bajo el rotulo mientras esta cerrado: "14 planes". */
  hint?: ReactNode;
  items: RailAgendaItem[];
};

export type RailAgendaProps = {
  groups: RailAgendaGroup[];
  /**
   * Nombre accesible del boton de cada lomo, construido con su rotulo.
   *
   * Es una funcion y no un texto fijo porque "Abrir" repetido ocho veces deja
   * a quien navega por lista de botones con ocho botones identicos.
   */
  openLabel: (group: RailAgendaGroup) => string;
  /**
   * Activa el elegir. Sin esto la agenda solo se lee, que es un uso legitimo.
   *
   * `label` y `pickedLabel` son las palabras del boton en sus dos estados, y
   * `count` convierte el numero en la frase que se lee arriba — "3 elegidos".
   * Van juntos en un objeto a proposito: el numero sin sus palabras deja el
   * contador en manos de un idioma que el kit no conoce.
   */
  pick?: {
    picked: string[];
    onPick: (info: { source: string; id: string; picked: boolean }) => void;
    label: string;
    pickedLabel: string;
    count: (n: number) => string;
  };
  /** Cual empieza abierto. El defecto es el primero. */
  defaultOpenId?: string;
  /** Deja abrir varios a la vez. El defecto es uno. */
  multiple?: boolean;
  onOpen?: (info: { source: string; id: string }) => void;
  source: string;
  className?: string;
};

/**
 * Una agenda por tramos, cada tramo con su cubierta, y se eligen cosas.
 *
 * POR QUE NO ES `RailShelf`. La estanteria es para LEER: lomos con un nombre y
 * un recuento, uno abierto cada vez, y una busqueda encima. Esto es para
 * ELEGIR: la unidad es una fecha, las fichas se marcan, y arriba corre un
 * contador de lo que llevas. Un componente que hace las dos cosas acaba con la
 * busqueda de la estanteria filtrando cosas ya elegidas y sacandolas de la
 * cuenta, que es el defecto que separa a los dos.
 *
 * LAS FICHAS ESTAN VISIBLES DE SALIDA. Los grupos se cierran cuando el
 * componente monta, no en el servidor: sin JavaScript la agenda se lee entera.
 * Es la regla del telon —lo que se esconde con un guion tiene que existir sin
 * el—, y en la marca de la que salio ya se rompio una vez: la agenda entera
 * aparecia en blanco con el JavaScript desactivado.
 *
 * EL CONTADOR VIVE EN LA CABECERA Y ES `aria-live`. Elegir una ficha que esta
 * a mitad de pagina no mueve nada visible arriba para quien no ve la pantalla:
 * sin el anuncio, el boton dice "elegido" y no ha pasado nada mas.
 */
export default function RailAgenda({
  groups,
  openLabel,
  pick,
  defaultOpenId,
  multiple = false,
  onOpen,
  source,
  className,
}: RailAgendaProps) {
  const id = useId();
  // ABIERTOS DE SALIDA, y se cierran al montar. El primer render —el que
  // viaja como HTML— ensena la agenda entera, asi que sin JavaScript se lee
  // todo. Cerrar en `useState` habria mandado los paneles ya ocultos por el
  // cable, y entonces un `hidden` que nadie puede quitar es contenido perdido.
  const [open, setOpen] = useState<string[]>(() => groups.map((g) => g.id));

  useEffect(() => {
    const first = defaultOpenId ?? groups[0]?.id;
    // En el cuadro SIGUIENTE, no dentro del efecto. Cerrar de forma sincrona
    // encadena un render dentro de otro —el compilador de React lo rechaza—,
    // y ademas se ve: el navegador ya habia pintado la agenda abierta y la
    // cerraria en el mismo cuadro, que es un parpadeo.
    const t = requestAnimationFrame(() => setOpen(first ? [first] : []));
    return () => cancelAnimationFrame(t);
    // Solo al montar: reabrir porque cambio una prop cerraria en la cara del
    // visitante el grupo que estaba mirando.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (groups.length === 0) return null;

  const toggle = (gid: string) => {
    setOpen((prev) => {
      const esta = prev.includes(gid);
      if (esta) return prev.filter((x) => x !== gid);
      if (!esta) onOpen?.({ source, id: gid });
      return multiple ? [...prev, gid] : [gid];
    });
  };

  const picked = pick?.picked ?? [];

  return (
    <section
      className={["rail-agenda", className].filter(Boolean).join(" ")}
      data-rail-agenda={source}
    >
      {pick ? (
        <p className="rail-agenda__count" aria-live="polite">
          {pick.count(picked.length)}
        </p>
      ) : null}

      <div className="rail-agenda__stack">
        {groups.map((g) => {
          const abierta = open.includes(g.id);
          const panelId = `${id}-${g.id}`;
          return (
            <div className="rail-agenda__group" key={g.id} data-open={abierta ? "si" : "no"}>
              <h3 className="rail-agenda__heading">
                <button
                  type="button"
                  className="rail-agenda__spine"
                  aria-expanded={abierta}
                  aria-controls={panelId}
                  aria-label={openLabel(g)}
                  onClick={() => toggle(g.id)}
                >
                  <span className="rail-agenda__spine-text">
                    <span className="rail-agenda__label">{g.label}</span>
                    {g.hint ? <span className="rail-agenda__hint">{g.hint}</span> : null}
                  </span>
                  <span className="rail-agenda__ribbon" aria-hidden="true" />
                </button>
              </h3>

              <ul className="rail-agenda__items" id={panelId} hidden={!abierta}>
                {g.items.map((it) => {
                  const elegida = picked.includes(it.id);
                  return (
                    <li
                      className="rail-agenda__item"
                      key={it.id}
                      data-picked={elegida ? "si" : "no"}
                    >
                      <div className="rail-agenda__card">
                        <p className="rail-agenda__when">{it.when}</p>
                        <p className="rail-agenda__title">
                          {it.href ? (
                            <a className="rail-agenda__link" href={it.href}>
                              {it.title}
                            </a>
                          ) : (
                            it.title
                          )}
                        </p>
                        {it.where ? <p className="rail-agenda__where">{it.where}</p> : null}
                        {pick ? (
                          <button
                            type="button"
                            className="rail-agenda__pick"
                            aria-pressed={elegida}
                            onClick={() =>
                              pick.onPick({ source, id: it.id, picked: !elegida })
                            }
                          >
                            {elegida ? pick.pickedLabel : pick.label}
                          </button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
