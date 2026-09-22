"use client";

import { useRef } from "react";

import RailStage from "./RailStage";

export type RailTerrainProps = {
  /** Separacion entre puntos en el eje del suelo, en px de canvas. */
  step?: number;
  /** Altura de la ola. 0 lo deja plano, que es otro efecto y mas pobre. */
  amplitude?: number;
  /** Segundos que tarda la ola en recorrer el suelo entero. */
  period?: number;
  /**
   * Que hay ahi, en palabras. Obligatorio: un canvas es un agujero en la
   * pagina para un lector de pantalla — lo pintado existe solo como pixeles.
   */
  label: string;
  ratio?: string;
  source: string;
  className?: string;
};

/**
 * Un suelo de puntos que ondula y se aleja hasta un horizonte.
 *
 * SE LLAMABA RailField Y ESE NOMBRE ESTABA MAL. En una libreria de
 * componentes "field" es un campo de formulario, y el nombre bueno tiene que
 * quedar libre para cuando llegue. Aqui es un terreno.
 *
 * Y LA PRIMERA VERSION PINTABA OTRA COSA. Era un plano LISO con una banda de
 * acento cruzandolo, construido mirando cuadros sueltos donde la ola queda
 * congelada y parece una franja de color. Con los cuadros seguidos se ve lo
 * que es: la superficie SUBE Y BAJA, los puntos se desplazan en altura y el
 * verde sigue la cresta. Un degradado enmascarado no puede hacer eso, por muy
 * parecida que salga la captura.
 *
 * POR ESO ES CANVAS Y NO CSS. Desplazar mil puntos por una senoidal no se
 * puede con dos gradientes repetidos, y hacerlo con mil divs es mil divs en
 * el hilo principal. `RailStage` ya resuelve las cuatro cosas que un canvas
 * necesita y que se han hecho mal alguna vez: pixeles de dispositivo, parar
 * cuando nadie mira, UN fotograma legible con movimiento reducido, y una
 * etiqueta obligatoria. No se reconstruye nada de eso aqui.
 *
 * Es un telon: no tiene estado y no responde a nada.
 */
export default function RailTerrain({
  step = 12,
  amplitude = 22,
  period = 7,
  label,
  ratio = "3 / 4",
  source,
  className,
}: RailTerrainProps) {
  // El estado de la animacion vive en un ref, no en variables del cuerpo del
  // componente. Un `let` aqui se reinicia en cada render —la ola daria un
  // salto cada vez que el padre pinta— y ademas el compilador de React lo
  // rechaza: escribir una local despues del render es exactamente el error
  // que esto evitaba por accidente y ahora evita a proposito.
  const anim = useRef({ t: 0, tint: [74, 222, 128] as [number, number, number], tintReadAt: -1 });

  return (
    // El envoltorio existe por la telemetria: `RailStage` pinta su propio
    // `data-rail-stage`, y un terreno medido como "un escenario" no se puede
    // separar despues de los juegos que tambien son escenarios. Son dos
    // superficies distintas y reportan como dos.
    <div
      className={["rail-terrain", className].filter(Boolean).join(" ")}
      data-rail-terrain={source}
      // El div es una caja y nada mas: la semantica la lleva el canvas de
      // dentro, que ya exige `label`. Decirlo explicitamente evita que un
      // lector anuncie un contenedor vacio antes de llegar a la descripcion.
      role="presentation"
    >
    <RailStage
      source={source}
      label={label}
      ratio={ratio}
      draw={({ ctx, dt, width, height, still }) => {
        // `still` no es un fotograma en blanco: es la ola parada en una fase
        // que se lee. Congelarla en t=0 la deja recta, que es justo la forma
        // que no cuenta que esto es una ola.
        anim.current.t = still ? period * 0.18 : anim.current.t + dt;

        // EL CANVAS NO LEE VARIABLES CSS. `fillStyle = "var(--x)"` no falla:
        // se descarta en silencio y el punto se pinta del color anterior, asi
        // que un kit de marca blanca acabaria pintando el acento de otra
        // marca sin que nada avisara. Hay que resolverla contra el elemento y
        // convertirla a numeros. Se relee una vez por segundo, no por punto:
        // getComputedStyle mil veces por fotograma es el bucle caro clasico.
        const { t } = anim.current;
        if (t - anim.current.tintReadAt > 1 || anim.current.tintReadAt < 0) {
          anim.current.tintReadAt = t;
          const raw = getComputedStyle(ctx.canvas)
            .getPropertyValue("--rail-terrain-dot")
            .trim();
          if (raw) {
            const probe = document.createElement("canvas").getContext("2d");
            if (probe) {
              probe.fillStyle = "#000";
              probe.fillStyle = raw;
              const hex = probe.fillStyle;
              if (typeof hex === "string" && hex.startsWith("#") && hex.length === 7) {
                anim.current.tint = [
                  parseInt(hex.slice(1, 3), 16),
                  parseInt(hex.slice(3, 5), 16),
                  parseInt(hex.slice(5, 7), 16),
                ];
              }
            }
          }
        }

        ctx.clearRect(0, 0, width, height);

        // PROYECCION DE VERDAD: rejilla CUADRADA en el mundo (x, z) y una
        // division por z. Dos versiones anteriores fallaron justo aqui y las
        // dos se veian como un abanico de rayos en vez de un suelo:
        //   1. escalar x por un factor que crecia con la cercania. Eso no es
        //      perspectiva, es un abanico.
        //   2. repartir z geometricamente. Amontona las filas CERCA, asi que
        //      cada columna se vuelve una linea continua y las filas
        //      desaparecen — y un suelo necesita las DOS familias de lineas.
        // El paso es el mismo en x y en z; la perspectiva ya comprime sola.
        const horizonY = height * 0.26;
        const eye = height * 0.17;
        const focal = height * 0.95;
        const zNear = (focal * eye) / (height - horizonY);
        const rows = 200;
        const halfCols = 34;

        for (let r = rows; r >= 0; r--) {
          const z = zNear + r * step;
          const persp = focal / z;

          for (let c = -halfCols; c <= halfCols; c++) {
            // Media celda de desplazamiento: sin esto la columna c=0 cae
            // exactamente sobre el eje de fuga y deja una costura vertical
            // brillante por todo el campo lejano. Se ve, y solo se ve
            // servido en un navegador.
            const wx = (c + 0.5) * step;
            const sx = width / 2 + wx * persp;
            if (sx < -6 || sx > width + 6) continue;

            // La ola vive en el MUNDO, no en pantalla: por eso sus crestas se
            // comprimen con la distancia igual que la rejilla, que es lo que
            // la hace suelo y no un filtro por encima del suelo. Dos
            // frecuencias cruzadas, porque una sola da crestas rectas y
            // paralelas — un fondo de pantalla de los noventa.
            const wave =
              Math.sin(z * 0.022 - t * ((Math.PI * 2) / period)) * 0.68 +
              Math.sin(
                wx * 0.03 + z * 0.011 - t * ((Math.PI * 2) / period) * 0.55,
              ) * 0.32;

            const sy = horizonY + (eye + wave * amplitude) * persp;
            if (sy < horizonY - 2 || sy > height + 6) continue;

            const radius = Math.max(0.3, step * persp * 0.09);
            const lift = (wave + 1) / 2;
            const depth = Math.min(1, persp / (focal / zNear));
            const alpha = Math.min(1, (0.1 + depth * 0.85) * (0.32 + lift * 0.85));

            ctx.beginPath();
            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${anim.current.tint[0]}, ${anim.current.tint[1]}, ${anim.current.tint[2]}, ${alpha.toFixed(3)})`;
            ctx.fill();
          }
        }
      }}
    />
    </div>
  );
}
