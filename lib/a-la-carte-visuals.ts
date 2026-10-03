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
    en: "Tell me what we’re photographing, the location, and where you’ll use the photos. Share a reference if you have one.",
    es: "Cuéntame qué vamos a fotografiar, la ubicación y dónde usarás las fotos. Comparte una referencia si tienes una.",
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
