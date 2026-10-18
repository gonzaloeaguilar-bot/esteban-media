import type { Locale } from "@/lib/packages";

/** Concept art and preparation guidance; service names, prices and URLs remain in packages.ts. */
const scenes = {
  ia: {
    image: "ai-content", kind: "create",
    en: "Send a visual reference, where you want to publish, and what you want the content to communicate.",
    es: "Envíame una referencia visual, dónde quieres publicar y qué quieres comunicar con el contenido.",
  },
  foto: {
    image: "photography", kind: "capture",
    en: "Tell me what I’ll be photographing, the location, and where you’ll use the photos. Share a reference if you have one.",
    es: "Cuéntame qué voy a fotografiar, la ubicación y dónde usarás las fotos. Comparte una referencia si tienes una.",
  },
  grabacion: {
    image: "photography", kind: "capture",
    en: "Tell me what we’re filming, the location, schedule, and how you want the raw 4K files delivered (Drive, Dropbox or hard drive).",
    es: "Cuéntame qué vamos a grabar, la locación, el horario y cómo quieres recibir los archivos 4K en bruto (Drive, Dropbox o disco).",
  },
  multicam: {
    image: "photography", kind: "capture",
    en: "Tell me the event scope, venue, schedule, number of angles required, and audio sources to record.",
    es: "Cuéntame el alcance del evento, el lugar, el horario, el número de ángulos y las fuentes de audio a grabar.",
  },
  yate: {
    image: "photography", kind: "capture",
    en: "Share the marina, charter hours, vessel size, cruising plan, and whether you need drone footage or lifestyle talent.",
    es: "Comparte la marina, horas de navegación, tamaño de la embarcación, ruta y si requieres tomas con dron o modelos.",
  },
  kickstarter: {
    image: "ai-content", kind: "create",
    en: "Share your prototype or product, campaign launch date, core target audience, and any script or storyboard ideas.",
    es: "Comparte tu prototipo o producto, fecha de lanzamiento, público objetivo e ideas de guión o storyboard.",
  },
  mejora: {
    image: "enhancement", kind: "enhance",
    en: "Send the original photo and point out what you want to improve. Tell me where you’ll use the finished image.",
    es: "Envíame la foto original y señala qué quieres mejorar. Dime dónde usarás la imagen final.",
  },
  seo: {
    image: "local-search", kind: "locate",
    en: "Share your website, business profile and the areas you serve. Tell me which service you want people to find.",
    es: "Comparte tu web, perfil del negocio y las zonas que atiendes. Dime qué servicio quieres que encuentren.",
  },
  auditoria: {
    image: "website-audit", kind: "inspect",
    en: "Share your website and the action you want visitors to take. Include any competitor sites you want to compare.",
    es: "Comparte tu web y qué quieres que hagan quienes la visitan. Incluye las webs de competidores que quieres comparar.",
  },
  automatizacion: {
    image: "automation", kind: "connect",
    en: "Describe the task you repeat, the tools you use, and what should happen when it’s finished. Leave out passwords and private customer data.",
    es: "Describe la tarea que repites, las herramientas que usas y qué debería pasar al terminar. No incluyas contraseñas ni datos privados de clientes.",
  },
} as const;

export function aLaCarteVisual(id: string, locale: Locale) {
  const scene = scenes[id as keyof typeof scenes];
  if (!scene) throw new Error(`Missing à la carte scene: ${id}`);
  return { image: `/illustrations/carte-${scene.image}.webp`, kind: scene.kind, preparation: scene[locale] };
}
