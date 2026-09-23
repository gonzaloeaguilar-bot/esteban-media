"use client";

import { useId, useMemo, useRef, useState } from "react";

export type RailMailHintProps = {
  /** Lo que hay escrito en el campo. El campo es controlado por la marca. */
  value: string;
  onChange: (value: string) => void;
  /**
   * Los dominios que se ofrecen, en orden. Obligatorio y sin defecto.
   *
   * NO HAY LISTA UNIVERSAL. La de un sitio en Espana no es la de uno en
   * Colombia ni la de uno que vende a empresas, y una lista por defecto
   * significa que la mitad de las marcas ensenan sugerencias que nadie va a
   * pulsar. Es un dato del negocio, no del kit.
   */
  domains: string[];
  /** El nombre del campo. Sin el no hay campo: hay una caja sin etiqueta. */
  label: string;
  placeholder?: string;
  /** Texto de ayuda bajo el campo. */
  hint?: string;
  /** Mensaje de error. Su presencia pone el campo en estado invalido. */
  error?: string;
  name?: string;
  required?: boolean;
  onPick?: (info: { source: string; value: string }) => void;
  source: string;
  className?: string;
};

/**
 * El campo de correo que adivina la casa.
 *
 * Treinta y nueve lineas en la marca de la que salio, y aun asi es de lo mas
 * reutilizable que tiene: cualquier formulario con un correo lo quiere. Quien
 * escribe "ana@g" recibe "ana@gmail.com" de un toque, en un movil, que es
 * donde escribir una arroba y un dominio cuesta de verdad.
 *
 * LA REGLA QUE LO HACE UTIL Y NO MOLESTO: si ya hay un dominio entero escrito
 * y NO esta en la lista, la sugerencia se cierra. Es el correo de su empresa,
 * y ofrecerle gmail encima de lo que acaba de escribir es pelearse con quien
 * esta rellenando el formulario.
 *
 * ES UN `combobox` DE VERDAD, no una lista bonita debajo de un `input`:
 * `role="combobox"`, `aria-expanded`, `aria-activedescendant` y las flechas
 * arriba/abajo mas Enter y Escape. Sin `aria-activedescendant` un lector de
 * pantalla no anuncia la opcion marcada, y entonces el teclado mueve algo que
 * solo existe para quien lo ve.
 *
 * EL FOCO NO SE VA DE LA CAJA. Las opciones se eligen con `onMouseDown`, no
 * con `onClick`: `click` llega despues de `blur`, asi que la lista ya se ha
 * cerrado y el toque cae en el vacio. Es el defecto clasico de este patron.
 */
export default function RailMailHint({
  value,
  onChange,
  domains,
  label,
  placeholder,
  hint,
  error,
  name,
  required,
  onPick,
  source,
  className,
}: RailMailHintProps) {
  const id = useId();
  const listId = `${id}-list`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const [focused, setFocused] = useState(false);
  const [marked, setMarked] = useState(-1);
  const input = useRef<HTMLInputElement>(null);

  const options = useMemo(() => {
    const v = value.trim();
    const at = v.indexOf("@");
    // Una arroba en la primera posicion no es un correo a medias, es basura.
    if (v.length < 2 || at === 0) return [];
    const user = at === -1 ? v : v.slice(0, at);
    const typed = at === -1 ? "" : v.slice(at + 1).toLowerCase();
    // Dominio entero y ajeno: es su empresa. Fuera.
    if (typed.includes(".") && !domains.includes(typed)) return [];
    const houses = domains.filter((d) => !typed || d.startsWith(typed)).slice(0, 5);
    // Ya escribio exactamente el unico que quedaba: no hay nada que sugerir.
    if (houses.length === 0 || (houses.length === 1 && houses[0] === typed)) return [];
    return houses.map((d) => `${user}@${d}`);
  }, [value, domains]);

  const open = focused && options.length > 0;
  const safeMark = open && marked >= 0 && marked < options.length ? marked : -1;

  const choose = (v: string) => {
    onChange(v);
    setMarked(-1);
    onPick?.({ source, value: v });
    input.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setMarked((n) => (n + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setMarked((n) => (n <= 0 ? options.length - 1 : n - 1));
    } else if (e.key === "Enter" && safeMark >= 0) {
      e.preventDefault();
      choose(options[safeMark]);
    } else if (e.key === "Escape") {
      setMarked(-1);
      setFocused(false);
    }
  };

  const described = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div
      className={["rail-mailhint", className].filter(Boolean).join(" ")}
      data-rail-mailhint={source}
      data-open={open ? "si" : "no"}
    >
      <label className="rail-mailhint__label" htmlFor={id}>
        {label}
      </label>
      <div className="rail-mailhint__box">
        <input
          id={id}
          ref={input}
          className="rail-mailhint__input"
          type="email"
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          autoComplete="email"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={safeMark >= 0 ? `${listId}-${safeMark}` : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={described || undefined}
          onChange={(e) => {
            onChange(e.target.value);
            setMarked(-1);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
        />
        <ul className="rail-mailhint__list" id={listId} role="listbox" hidden={!open}>
          {options.map((o, n) => (
            <li
              key={o}
              id={`${listId}-${n}`}
              role="option"
              aria-selected={n === safeMark}
              className="rail-mailhint__option"
              data-marked={n === safeMark ? "si" : "no"}
              // `mousedown` y no `click`: el click llega despues del blur y
              // para entonces la lista ya no esta.
              onMouseDown={(e) => {
                e.preventDefault();
                choose(o);
              }}
            >
              {o}
            </li>
          ))}
        </ul>
      </div>
      {hint ? (
        <p className="rail-mailhint__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="rail-mailhint__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
