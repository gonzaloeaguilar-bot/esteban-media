/**
 * A real frame from Esteban's own work, per service.
 *
 * Measured 2026-09-29: /services renders 1,353 words and ZERO images, and
 * /es/servicios 1,929 words and zero images — the two longest pages on the site.
 * The whole image inventory is 13 project frames plus two photos of Esteban, so
 * this maps the frames that GENUINELY depict a service and leaves the rest
 * alone.
 *
 * `ai-content` is deliberately absent. There is no frame in the library that
 * shows AI-assisted content work, and the art-direction pass already caught the
 * cost of a decorative mismatch — a flambé dessert illustrating remote editing.
 * A service with no honest image gets no image until Esteban supplies one.
 */
export const serviceImages: Record<string, { src: string; alt: string; focal?: string }> = {
  editing: {
    src: "/portfolio/bar-door-monkey.jpg",
    alt: "Frame from a restaurant video Esteban edited: a flambéed dish in close-up",
    focal: "50% 55%",
  },
  "social-planning": {
    src: "/portfolio/ml-colombia.jpg",
    alt: "Vertical frame from a social video Esteban produced for ML Colombia",
    focal: "58% 40%",
  },
  "on-location": {
    src: "/about/esteban-on-location.jpg",
    alt: "Esteban filming on location outdoors with his own camera rig",
    focal: "50% 38%",
  },
  "website-design": {
    src: "/portfolio/front-line-auto.jpg",
    alt: "The Front Line Auto website Esteban Moreno Media built",
    focal: "18% 40%",
  },
};

/** The Spanish service ids are different strings for the same five services. */
export const spanishServiceImages: Record<string, { src: string; alt: string; focal?: string }> = {
  edicion: {
    src: "/portfolio/bar-door-monkey.jpg",
    alt: "Fotograma de un video de restaurante editado por Esteban: un plato flameado en primer plano",
    focal: "50% 55%",
  },
  "planificacion-social": {
    src: "/portfolio/ml-colombia.jpg",
    alt: "Fotograma vertical de un video para redes que Esteban produjo para ML Colombia",
    focal: "58% 40%",
  },
  videografia: {
    src: "/about/esteban-on-location.jpg",
    alt: "Esteban grabando en locación al aire libre con su equipo",
    focal: "50% 38%",
  },
  "diseno-web": {
    src: "/portfolio/front-line-auto.jpg",
    alt: "El sitio web de Front Line Auto construido por Esteban Moreno Media",
    focal: "18% 40%",
  },
};
