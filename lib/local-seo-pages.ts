import type { Locale } from "@/i18n/routing";

export type LocalSeoPageSlug =
  | "fort-lauderdale-video-editor"
  | "broward-video-editing"
  | "miami-video-editor";

type LocalSeoPageCopy = {
  slug: LocalSeoPageSlug;
  cityLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
  servicesHeading: string;
  services: readonly string[];
  areasHeading: string;
  areas: readonly string[];
  proofHeading: string;
  proof: string;
  ctaHeading: string;
  ctaBody: string;
};

export const LOCAL_SEO_PAGES: Record<
  Locale,
  Record<LocalSeoPageSlug, LocalSeoPageCopy>
> = {
  en: {
    "fort-lauderdale-video-editor": {
      slug: "fort-lauderdale-video-editor",
      cityLabel: "Fort Lauderdale",
      title: "Fort Lauderdale Video Editor",
      description:
        "Fort Lauderdale video editing, videography, reels, aerial visuals, and supporting photography for local businesses, real estate, events, and creators.",
      eyebrow: "Fort Lauderdale video editor",
      headline: "Video editing and content for Fort Lauderdale businesses.",
      lede: "Esteban Moreno Media helps Fort Lauderdale brands turn footage into sharp edits, short-form reels, promos, event recaps, real estate content, and aerial visuals built for web and social.",
      servicesHeading: "Video-first services in Fort Lauderdale",
      services: [
        "Short-form Reels, TikToks, and YouTube Shorts",
        "Promo videos and business content",
        "Event recap videos and social cutdowns",
        "Real estate, venue, and aerial visuals",
        "Supporting photography and photo editing",
      ],
      areasHeading: "Nearby areas served",
      areas: [
        "Las Olas",
        "Downtown Fort Lauderdale",
        "Victoria Park",
        "Flagler Village",
        "Harbordale",
        "Wilton Manors",
        "Oakland Park",
        "Lauderdale-by-the-Sea",
      ],
      proofHeading: "Built around the edit",
      proof:
        "The strongest local videos are planned backward from the final cut: hook, pacing, format, captions, music, color, and the call to action. Shooting and aerials support that edit instead of creating random footage.",
      ctaHeading: "Need a Fort Lauderdale video edit?",
      ctaBody:
        "Send the footage, date, location, platform, and reference style. We will scope the edit or shoot and reply with next steps.",
    },
    "broward-video-editing": {
      slug: "broward-video-editing",
      cityLabel: "Broward",
      title: "Broward Video Editing",
      description:
        "Broward video editing and videography for restaurants, real estate, events, gyms, salons, med spas, creators, and local businesses.",
      eyebrow: "Broward video editing",
      headline: "Video edits, reels, and shoots for Broward businesses.",
      lede: "From Fort Lauderdale to Hollywood, Pompano, Plantation, Davie, and Pembroke Pines, Esteban Moreno Media creates video-first content for businesses that need clean edits and consistent social assets.",
      servicesHeading: "Broward content services",
      services: [
        "Video editing from phone, camera, or drone footage",
        "Restaurant, salon, gym, and med spa reels",
        "Real estate and property video edits",
        "Event recaps and launch promos",
        "Aerial visuals and supporting stills when needed",
      ],
      areasHeading: "Broward areas served",
      areas: [
        "Fort Lauderdale",
        "Hollywood",
        "Pompano Beach",
        "Plantation",
        "Davie",
        "Pembroke Pines",
        "Miramar",
        "Deerfield Beach",
      ],
      proofHeading: "A practical launch offer",
      proof:
        "For a new business, the first ranking signal is real work: a small portfolio, Google Business Profile photos, client reviews, and pages that match what local clients actually search.",
      ctaHeading: "Start a Broward video project",
      ctaBody:
        "Share the business type, city, footage status, and the platform you want to publish on. We will recommend the simplest video package to start.",
    },
    "miami-video-editor": {
      slug: "miami-video-editor",
      cityLabel: "Miami",
      title: "Miami Video Editor",
      description:
        "Miami video editor for short-form reels, product videos, restaurant content, event recaps, aerial visuals, and social media cutdowns.",
      eyebrow: "Miami video editor",
      headline: "Short-form video edits and content for Miami brands.",
      lede: "Esteban Moreno Media supports Miami restaurants, product brands, creators, events, and small businesses with video editing, reels, promos, and platform-ready social cutdowns.",
      servicesHeading: "Miami video services",
      services: [
        "Instagram Reels, TikTok, and YouTube Shorts",
        "Product videos and ecommerce content",
        "Restaurant and hospitality reels",
        "Creator clips and podcast cutdowns",
        "Aerial visuals and supporting photography",
      ],
      areasHeading: "Miami areas served",
      areas: [
        "Miami",
        "Brickell",
        "Wynwood",
        "Doral",
        "Coral Gables",
        "Miami Beach",
        "Hialeah",
        "Little Havana",
      ],
      proofHeading: "Miami needs a narrower angle",
      proof:
        "Miami is competitive, so the site leads with practical service searches like video editor, reels, product video, and restaurant content instead of trying to win broad agency terms on day one.",
      ctaHeading: "Need a Miami video editor?",
      ctaBody:
        "Send the footage, deadline, platform, and references. We will scope a clean edit or content shoot around what the video needs to do.",
    },
  },
  es: {
    "fort-lauderdale-video-editor": {
      slug: "fort-lauderdale-video-editor",
      cityLabel: "Fort Lauderdale",
      title: "Editor de video en Fort Lauderdale",
      description:
        "Edición de video, videografía, Reels, tomas aéreas y fotografía de apoyo en Fort Lauderdale para negocios, real estate, eventos y creadores.",
      eyebrow: "Editor de video en Fort Lauderdale",
      headline: "Edición de video y contenido para negocios en Fort Lauderdale.",
      lede: "Esteban Moreno Media ayuda a marcas de Fort Lauderdale a convertir material en ediciones claras, Reels, promos, recaps de eventos, contenido de real estate y tomas aéreas listas para web y redes.",
      servicesHeading: "Servicios con video primero en Fort Lauderdale",
      services: [
        "Reels, TikToks y YouTube Shorts",
        "Promos y contenido para negocios",
        "Recaps de eventos y cortes sociales",
        "Real estate, venues y tomas aéreas",
        "Fotografía y edición de fotos de apoyo",
      ],
      areasHeading: "Zonas cercanas",
      areas: [
        "Las Olas",
        "Downtown Fort Lauderdale",
        "Victoria Park",
        "Flagler Village",
        "Harbordale",
        "Wilton Manors",
        "Oakland Park",
        "Lauderdale-by-the-Sea",
      ],
      proofHeading: "Construido alrededor de la edición",
      proof:
        "Los mejores videos locales se planean desde el corte final: hook, ritmo, formato, captions, música, color y llamada a la acción. El rodaje y las tomas aéreas apoyan esa edición.",
      ctaHeading: "¿Necesitas un video en Fort Lauderdale?",
      ctaBody:
        "Envía el material, fecha, locación, plataforma y referencia visual. Definimos el edit o rodaje y respondemos con próximos pasos.",
    },
    "broward-video-editing": {
      slug: "broward-video-editing",
      cityLabel: "Broward",
      title: "Edición de video en Broward",
      description:
        "Edición de video y videografía en Broward para restaurantes, real estate, eventos, gimnasios, salones, med spas, creadores y negocios locales.",
      eyebrow: "Edición de video en Broward",
      headline: "Ediciones, Reels y rodajes para negocios en Broward.",
      lede: "Desde Fort Lauderdale hasta Hollywood, Pompano, Plantation, Davie y Pembroke Pines, Esteban Moreno Media crea contenido con video primero para negocios que necesitan ediciones limpias y assets constantes para redes.",
      servicesHeading: "Servicios de contenido en Broward",
      services: [
        "Edición desde material de celular, cámara o drone",
        "Reels para restaurantes, salones, gimnasios y med spas",
        "Videos para real estate y propiedades",
        "Recaps de eventos y promos de lanzamiento",
        "Tomas aéreas y fotos de apoyo cuando hagan falta",
      ],
      areasHeading: "Zonas de Broward",
      areas: [
        "Fort Lauderdale",
        "Hollywood",
        "Pompano Beach",
        "Plantation",
        "Davie",
        "Pembroke Pines",
        "Miramar",
        "Deerfield Beach",
      ],
      proofHeading: "Una oferta práctica para arrancar",
      proof:
        "Para un negocio nuevo, la primera señal de ranking es trabajo real: portafolio pequeño, fotos en Google Business Profile, reviews y páginas alineadas con búsquedas locales reales.",
      ctaHeading: "Inicia un proyecto de video en Broward",
      ctaBody:
        "Comparte el tipo de negocio, ciudad, estado del material y plataforma final. Recomendamos el paquete de video más simple para empezar.",
    },
    "miami-video-editor": {
      slug: "miami-video-editor",
      cityLabel: "Miami",
      title: "Editor de video en Miami",
      description:
        "Editor de video en Miami para Reels, videos de producto, contenido de restaurantes, recaps de eventos, tomas aéreas y cortes para redes.",
      eyebrow: "Editor de video en Miami",
      headline: "Edición de video corto y contenido para marcas en Miami.",
      lede: "Esteban Moreno Media apoya restaurantes, marcas de producto, creadores, eventos y negocios pequeños en Miami con edición de video, Reels, promos y cortes listos para redes.",
      servicesHeading: "Servicios de video en Miami",
      services: [
        "Instagram Reels, TikTok y YouTube Shorts",
        "Videos de producto y contenido ecommerce",
        "Reels para restaurantes y hospitality",
        "Clips de creadores y cortes de podcast",
        "Tomas aéreas y fotografía de apoyo",
      ],
      areasHeading: "Zonas de Miami",
      areas: [
        "Miami",
        "Brickell",
        "Wynwood",
        "Doral",
        "Coral Gables",
        "Miami Beach",
        "Hialeah",
        "Little Havana",
      ],
      proofHeading: "Miami necesita un ángulo más específico",
      proof:
        "Miami es competitivo, así que la web empieza con búsquedas prácticas como editor de video, Reels, videos de producto y contenido para restaurantes en vez de competir por términos amplios de agencia desde el día uno.",
      ctaHeading: "¿Necesitas un editor de video en Miami?",
      ctaBody:
        "Envía el material, fecha límite, plataforma y referencias. Definimos una edición o rodaje alrededor de lo que el video tiene que lograr.",
    },
  },
} as const;

export const LOCAL_SEO_PAGE_SLUGS = Object.keys(
  LOCAL_SEO_PAGES.en,
) as LocalSeoPageSlug[];

export function getLocalSeoPage(locale: Locale, slug: string) {
  return LOCAL_SEO_PAGES[locale][slug as LocalSeoPageSlug];
}
