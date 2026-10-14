/**
 * "Where to go next" links from pages Google already indexes into money pages
 * it has not indexed yet.
 *
 * Evidence (2026-10-14): GSC URL Inspection read on the sitemap reported
 * /pricing and most Spanish Miami editor pages as "URL is unknown to Google"
 * or "Discovered – currently not indexed", while the source pages below are
 * "Submitted and indexed" and earn impressions (GSC 28d: the caption-styles
 * guides 42 and 35, the large-files guide 36, the ES pacing calculator 26,
 * Fort Lauderdale Reels 15). Crawlers find new pages through links from pages
 * they already crawl, so each source gets a short, plainly described list.
 * Spanish pages link Spanish targets only. A test keeps every target in the
 * sitemap and every source distinct from its targets.
 *
 * Re-inspect the targets on 2026-10-21 and 2026-10-28 (insp.py).
 */
export type PriorityLink = { href: string; label: string; description: string };

const EN: Record<string, PriorityLink> = {
  pricing: { href: "/pricing", label: "Pricing and packages", description: "Starting prices for every package, from one edited video to a full month." },
  reelsCost: { href: "/reels-editing-cost-calculator", label: "Reels editing cost calculator", description: "Per video or weekly: see what your number of Reels costs." },
  reelsMiami: { href: "/services/reels-editor-miami", label: "Reels editor in Miami", description: "Reels edited from your own clips for Miami businesses and creators." },
  repurposing: { href: "/services/content-repurposing-service-miami", label: "Content repurposing in Miami", description: "One long video turned into short clips for Reels, TikTok and Shorts." },
  podcast: { href: "/services/podcast-clipping-service-miami", label: "Podcast clipping in Miami", description: "A podcast episode cut into vertical clips with captions." },
  founders: { href: "/services/personal-brand-video-editor-founders-miami", label: "Personal brand video editing", description: "Founders and experts on camera, edited into videos people finish." },
  ugc: { href: "/services/ugc-video-editor-ecommerce", label: "UGC video editing for e-commerce", description: "Creator and customer clips edited into product ads." },
  westPalm: { href: "/services/video-editing-west-palm-beach", label: "Reels and video editing in West Palm Beach", description: "Remote editing for Palm Beach County businesses, project by project." },
};

const ES: Record<string, PriorityLink> = {
  precios: { href: "/es/precios", label: "Precios y paquetes", description: "Precios de partida de cada paquete, desde un video editado hasta un mes completo." },
  reelsCosto: { href: "/es/calculadora-de-costo-de-edicion-de-reels", label: "Calculadora de costo de edición de Reels", description: "Por video o por semana: cuánto cuestan tus Reels." },
  reelsMiami: { href: "/es/editor-de-reels-miami", label: "Editor de Reels en Miami", description: "Reels editados con tus propios clips, con atención en español." },
  videoMiami: { href: "/es/editor-de-video-miami", label: "Editor de video en Miami en español", description: "Edición para negocios, marcas y creadores de Miami." },
  comida: { href: "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami", label: "Videos para creadores de comida y lugares", description: "Tú descubres el lugar; Esteban edita la historia." },
  restaurantes: { href: "/es/edicion-de-video-promocional-para-restaurantes-miami", label: "Video promocional para restaurantes en Miami", description: "Promociones para redes editadas con las tomas de tu local." },
  podcast: { href: "/es/edicion-de-clips-de-podcast-miami", label: "Clips de podcast para redes en Miami", description: "Un episodio convertido en clips verticales con subtítulos." },
  miamiBeach: { href: "/es/edicion-de-video-miami-beach", label: "Edición de video en Miami Beach", description: "Proyectos de Miami Beach editados en remoto." },
};

export const PRIORITY_LINKS: Record<string, readonly PriorityLink[]> = {
  "/services/reels-editor-fort-lauderdale": [EN.reelsMiami, EN.reelsCost, EN.pricing, EN.westPalm, EN.ugc],
  "/services/short-form-video-editor-miami": [EN.reelsCost, EN.pricing, EN.repurposing, EN.podcast, EN.founders],
  "/guides/best-caption-styles-for-instagram-reels": [EN.reelsMiami, EN.reelsCost, EN.pricing, EN.repurposing],
  "/guides/fastest-way-to-send-large-video-files-to-editor": [EN.pricing, EN.reelsCost, EN.podcast, EN.ugc],
  "/guides/video-editor-vs-videographer": [EN.pricing, EN.reelsMiami, EN.founders],
  "/es/editor-de-reels-fort-lauderdale": [ES.reelsMiami, ES.videoMiami, ES.reelsCosto, ES.precios],
  "/es/guias/mejores-estilos-de-subtitulos-para-reels": [ES.reelsMiami, ES.reelsCosto, ES.precios, ES.comida],
  "/es/guias/editor-de-video-vs-videografo": [ES.videoMiami, ES.precios, ES.reelsMiami, ES.restaurantes],
  "/es/calculadora-de-ritmo-de-video": [ES.reelsCosto, ES.precios, ES.reelsMiami, ES.podcast],
  "/es/video-para-restaurantes-miami": [ES.restaurantes, ES.comida, ES.reelsMiami, ES.precios],
  "/es/editor-de-video-corto-para-redes-miami": [ES.reelsMiami, ES.videoMiami, ES.reelsCosto, ES.miamiBeach],
};

export function priorityLinksFor(path: string): readonly PriorityLink[] {
  return PRIORITY_LINKS[path] ?? [];
}
