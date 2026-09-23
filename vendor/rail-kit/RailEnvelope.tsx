"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RailEnvelopeProps = {
  /**
   * Las palabras impresas en el sobre cerrado. Es lo unico que se lee antes de
   * abrirlo, asi que tiene que decir de quien viene y para quien es.
   *
   * `hint` es la instruccion — "pulsa el lacre" —, y es obligatoria: un lacre
   * de 64 px sin una linea que diga que hay que tocarlo es un adorno, y quien
   * llega se queda mirando un sobre cerrado.
   */
  front: { to: ReactNode; from?: ReactNode; hint: string };
  /**
   * El lacre. `letters` son las dos o tres letras grabadas —iniciales de la
   * marca—, y `label` es el nombre accesible del boton: "Abrir el sobre".
   *
   * Separadas a proposito. Unas iniciales no son una instruccion, y un lector
   * de pantalla que anuncia "DZ, boton" no ha dicho nada.
   */
  seal: { letters: ReactNode; label: string };
  /** La frase escrita en el pliego que asoma al abrirse. Opcional. */
  note?: ReactNode;
  /** Lo que habia dentro. Se revela al abrir. */
  children: ReactNode;
  /**
   * Abierto de salida. Existe para una sola cosa: cuando la pagina ya sabe que
   * quien mira tiene derecho a ver el contenido, el sobre no se cierra para
   * que lo vuelva a abrir.
   */
  defaultOpen?: boolean;
  onOpen?: (info: { source: string }) => void;
  source: string;
  className?: string;
};

/**
 * Un sobre lacrado que se abre y deja una carta.
 *
 * PARA QUE SIRVE, que no es para decorar. Es el unico componente del kit que
 * da algo ANTES de pedir algo: el visitante rompe un lacre y recibe contenido,
 * y solo despues aparece el formulario —si es que aparece—. Salio de la
 * portada de danielzea-site, donde las tarifas viven detras de un sobre, y de
 * ahi sale tambien su limite.
 *
 * EL KIT NO GUARDA EL SECRETO. Lo que le pasas como `children` esta en el HTML
 * desde el primer cuadro: cualquiera con el inspector abierto lo lee sin tocar
 * el lacre. Si lo de dentro es un precio real, una clave o cualquier cosa que
 * NO deba viajar antes de tiempo, la marca la pide a su propio servidor cuando
 * este componente avisa con `onOpen`, y hasta entonces pasa un marcador. El
 * kit no tiene transporte, y fingir que lo tiene seria la peor clase de puerta:
 * la que parece cerrada.
 *
 * LA CARTA NO EXISTE PARA EL TECLADO MIENTRAS ESTA DENTRO. Se aplica `inert`
 * por ref y no como prop —React no lo renderiza de forma fiable— porque
 * `aria-hidden` solo la saca del arbol de accesibilidad: sin `inert` el primer
 * Tab despues del lacre se va a un enlace que esta dentro de un sobre cerrado.
 *
 * SIN MOVIMIENTO SIGUE FUNCIONANDO. Toda la animacion —la solapa que gira, las
 * dos mitades del lacre que se rompen y caen, el pliego que sale— vive dentro
 * de `prefers-reduced-motion: no-preference`. Con movimiento reducido el sobre
 * desaparece y la carta esta ahi, que es el mismo resultado sin el teatro.
 */
export default function RailEnvelope({
  front,
  seal,
  note,
  children,
  defaultOpen = false,
  onOpen,
  source,
  className,
}: RailEnvelopeProps) {
  const [open, setOpen] = useState(defaultOpen);
  const letter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = letter.current;
    if (!node) return;
    // `inert` va por el nodo: como prop de React no llega al DOM de forma
    // fiable, y un atributo que a veces esta es un atributo que no esta.
    if (open) node.removeAttribute("inert");
    else node.setAttribute("inert", "");
  }, [open]);

  const abrir = () => {
    if (open) return;
    setOpen(true);
    onOpen?.({ source });
  };

  return (
    <div
      className={["rail-envelope", className].filter(Boolean).join(" ")}
      data-rail-envelope={source}
      data-open={open ? "si" : "no"}
    >
      <div className="rail-envelope__scene" aria-hidden={open ? "true" : undefined}>
        <div className="rail-envelope__piece">
          <span className="rail-envelope__back" />
          <div className="rail-envelope__sheet">
            {note ? <p className="rail-envelope__note">{note}</p> : null}
          </div>
          {/* Los dos hombros son el dorso del sobre asomando por los angulos
              que deja libres el triangulo de la solapa. Sin ellos se ve el
              pliego crema por dos picos y parecen colmillos. */}
          <span className="rail-envelope__shoulder" data-side="left" />
          <span className="rail-envelope__shoulder" data-side="right" />
          <div className="rail-envelope__front">
            <p className="rail-envelope__to">{front.to}</p>
            {front.from ? <p className="rail-envelope__from">{front.from}</p> : null}
          </div>
          <span className="rail-envelope__flap" />
          <button
            type="button"
            className="rail-envelope__seal"
            onClick={abrir}
            aria-label={seal.label}
            aria-expanded={open}
          >
            {/* El lacre lleva su propio fondo de acento, no `transparent`: con
                el fondo heredado, una puerta de contraste sube por los padres,
                encuentra el fondo oscuro de la pagina y mide un texto que en
                pantalla se lee perfectamente. El arbol tiene que decir la
                verdad sobre donde esta ese texto. */}
            <span className="rail-envelope__wax" data-half="left" aria-hidden="true" />
            <span className="rail-envelope__wax" data-half="right" aria-hidden="true" />
            <span className="rail-envelope__letters" aria-hidden="true">
              {seal.letters}
            </span>
          </button>
        </div>
        <p className="rail-envelope__hint">{front.hint}</p>
      </div>

      <div className="rail-envelope__letter" ref={letter}>
        {children}
      </div>
    </div>
  );
}
