import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Camera,
  Film,
  Home,
  MapPin,
  Plane,
  Scissors,
  Store,
  UtensilsCrossed,
  Video,
} from "lucide-react";

export const spanishSite = {
  title: "Esteban Moreno Media en Español",
  description:
    "Fotografía, video, drone, reels y edición para negocios, restaurantes, propiedades, eventos y creadores en Fort Lauderdale, Broward y Miami.",
  contactLead:
    "Cuéntame la fecha, ciudad, tipo de proyecto y dónde se van a usar los videos o fotos. Esteban responde en español o inglés.",
};

export type SpanishService = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  tags: string[];
};

export const spanishServices: SpanishService[] = [
  {
    id: "reels",
    name: "Reels y videos cortos",
    shortName: "Reels",
    description:
      "Videos verticales para Instagram, TikTok, YouTube Shorts, anuncios y contenido orgánico.",
    detail:
      "Grabación, ritmo, captions, música, color y exportes listos para publicar.",
    icon: Scissors,
    tags: ["Instagram", "TikTok", "Captions"],
  },
  {
    id: "videografia",
    name: "Videografía",
    shortName: "Video",
    description:
      "Cobertura en locación para negocios, restaurantes, eventos, propiedades, productos y marcas locales.",
    detail:
      "Tomas principales, b-roll, audio cuando aplica y edición limpia para web o redes.",
    icon: Video,
    tags: ["B-roll", "Eventos", "Marcas"],
  },
  {
    id: "fotografia",
    name: "Fotografía",
    shortName: "Foto",
    description:
      "Fotos para perfiles, equipos, productos, comida, espacios, eventos, listings y campañas.",
    detail:
      "Sets útiles para Google Business, menús, websites, redes sociales y materiales de venta.",
    icon: Camera,
    tags: ["Producto", "Retrato", "Eventos"],
  },
  {
    id: "drone",
    name: "Drone y tomas aéreas",
    shortName: "Drone",
    description:
      "Tomas aéreas para propiedades, negocios, eventos, botes y contexto de marca cuando clima y reglas lo permitan.",
    detail:
      "Planificación de locación, clima, restricciones y tomas pensadas para vender el espacio.",
    icon: Plane,
    tags: ["Real estate", "Aereo", "Contexto"],
  },
  {
    id: "edicion",
    name: "Edición y color",
    shortName: "Edición",
    description:
      "Edición de video, selección de fotos, color, retoque y formatos finales para piezas grabadas por Esteban o por tu equipo.",
    detail:
      "Ideal si ya tienes material grabado y necesitas convertirlo en contenido publicable.",
    icon: Film,
    tags: ["Color", "Retoque", "Entrega"],
  },
];

export const spanishAreas = [
  {
    name: "Fort Lauderdale",
    county: "Broward County",
    description:
      "Base principal para negocios locales, restaurantes, eventos, propiedades, creadores y contenido de marca.",
    neighborhoods: [
      "Las Olas",
      "Flagler Village",
      "Victoria Park",
      "Wilton Manors",
      "Rio Vista",
    ],
  },
  {
    name: "Broward County",
    county: "Broward County",
    description:
      "Cobertura en Hollywood, Pompano Beach, Davie, Plantation, Sunrise, Weston, Coral Springs y áreas cercanas.",
    neighborhoods: [
      "Hollywood",
      "Pompano Beach",
      "Davie",
      "Plantation",
      "Sunrise",
    ],
  },
  {
    name: "Miami-Dade",
    county: "Miami-Dade County",
    description:
      "Proyectos seleccionados en Miami, Brickell, Wynwood, Doral, Coral Gables, Miami Beach y zonas comerciales.",
    neighborhoods: ["Miami", "Brickell", "Wynwood", "Doral", "Coral Gables"],
  },
];

export type SpanishNichePage = {
  slug: string;
  title: string;
  metadataTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  keyword: string;
  location: string;
  icon: LucideIcon;
  bestFor: string[];
  deliverables: string[];
  searchIntent: string;
  faqs: { question: string; answer: string }[];
};

export const spanishNichePages: SpanishNichePage[] = [
  {
    slug: "videografo-en-miami",
    title: "Videógrafo en Miami",
    metadataTitle: "Videógrafo en Miami | Video, Reels y Drone en Español",
    description:
      "Videógrafo en Miami para negocios, restaurantes, eventos, propiedades y creadores que necesitan video profesional en español o inglés.",
    eyebrow: "Miami / Doral / Brickell / Wynwood",
    h1: "Videógrafo en Miami para contenido que se siente local.",
    lead:
      "Si buscas un videógrafo en Miami que pueda hablar español, entender el negocio y entregar piezas listas para redes, Esteban cubre proyectos pequeños y medianos sin convertirlo en una producción pesada.",
    keyword: "videógrafo en Miami",
    location: "Miami-Dade",
    icon: Video,
    bestFor: [
      "Restaurantes que necesitan reels, menú visual o contenido mensual.",
      "Agentes de real estate que quieren video, drone y cortes verticales.",
      "Marcas locales que necesitan contenido bilingüe para Instagram.",
      "Eventos privados o comerciales con entrega rápida para redes.",
    ],
    deliverables: [
      "Video vertical para Reels/TikTok/Shorts.",
      "Edición con captions, color y música.",
      "B-roll para reutilizar en futuras publicaciones.",
      "Versiones para website, anuncios o Google Business cuando aplica.",
    ],
    searchIntent:
      "Captura búsquedas transaccionales en español de clientes que ya saben que necesitan video local, pero no quieren una agencia grande.",
    faqs: [
      {
        question: "¿Esteban trabaja en español?",
        answer:
          "Sí. La conversación, el brief y los cambios pueden manejarse en español o inglés.",
      },
      {
        question: "¿Cubre todo Miami-Dade?",
        answer:
          "Cubre proyectos seleccionados en Miami, Doral, Brickell, Wynwood, Coral Gables, Miami Beach y zonas cercanas.",
      },
    ],
  },
  {
    slug: "videografo-en-fort-lauderdale",
    title: "Videógrafo en Fort Lauderdale",
    metadataTitle:
      "Videógrafo en Fort Lauderdale | Video y Reels en Español",
    description:
      "Videógrafo en Fort Lauderdale para negocios, eventos, restaurantes, propiedades y contenido social en Broward County.",
    eyebrow: "Fort Lauderdale / Broward County",
    h1: "Videógrafo en Fort Lauderdale para negocios que necesitan contenido claro.",
    lead:
      "Esteban está basado en Fort Lauderdale y trabaja con negocios locales que necesitan grabación, edición y piezas listas para publicar sin un proceso complicado.",
    keyword: "videógrafo en Fort Lauderdale",
    location: "Fort Lauderdale",
    icon: MapPin,
    bestFor: [
      "Negocios cerca de Las Olas, Flagler Village y Wilton Manors.",
      "Eventos y activaciones que necesitan recap rápido.",
      "Propiedades, botes, restaurantes y espacios comerciales.",
      "Creadores o profesionales que necesitan contenido constante.",
    ],
    deliverables: [
      "Shoot corto en locación.",
      "Reel principal y cortes secundarios.",
      "Fotos o clips adicionales cuando el scope lo incluye.",
      "Entrega en formatos verticales y horizontales.",
    ],
    searchIntent:
      "Apunta a compradores hispanos en Broward que buscan un profesional local, no una lista genérica de agencias de Miami.",
    faqs: [
      {
        question: "¿Fort Lauderdale es la base principal?",
        answer:
          "Sí. Fort Lauderdale y Broward son la base principal, con cobertura adicional hacia Miami-Dade.",
      },
      {
        question: "¿Se puede hacer un shoot pequeño?",
        answer:
          "Sí. Muchos proyectos empiezan con un shoot enfocado de 60 a 90 minutos y una entrega clara.",
      },
    ],
  },
  {
    slug: "fotografo-en-fort-lauderdale",
    title: "Fotógrafo en Fort Lauderdale",
    metadataTitle:
      "Fotógrafo en Fort Lauderdale | Fotos Comerciales y Contenido",
    description:
      "Fotógrafo en Fort Lauderdale para retratos, restaurantes, productos, eventos, propiedades y contenido de marca.",
    eyebrow: "Foto comercial / retratos / espacios",
    h1: "Fotógrafo en Fort Lauderdale para fotos que tu negocio sí puede usar.",
    lead:
      "Fotos limpias para perfiles, websites, menús, Google Business, listings y publicaciones. Esteban también puede combinar foto y video en el mismo proyecto.",
    keyword: "fotógrafo en Fort Lauderdale",
    location: "Fort Lauderdale",
    icon: Camera,
    bestFor: [
      "Negocios que necesitan actualizar Google Business o su website.",
      "Restaurantes con fotos de platos, equipo y ambiente.",
      "Profesionales que necesitan retratos naturales.",
      "Propiedades o espacios que necesitan verse mejor en línea.",
    ],
    deliverables: [
      "Galería seleccionada y editada.",
      "Fotos verticales y horizontales.",
      "Uso para web, redes, menús y anuncios.",
      "Opción de combinar con reels o clips cortos.",
    ],
    searchIntent:
      "Captura búsquedas locales de fotografía en español donde el resultado actual suele ser bodas, directorios o turismo.",
    faqs: [
      {
        question: "¿Hace solo fotografía?",
        answer:
          "Sí. También se puede combinar fotografía con video si necesitas una entrega completa.",
      },
      {
        question: "¿Sirve para negocios pequeños?",
        answer:
          "Sí. La idea es producir imágenes útiles sin sobredimensionar el proyecto.",
      },
    ],
  },
  {
    slug: "reels-para-negocios-miami",
    title: "Reels para negocios en Miami",
    metadataTitle: "Reels para Negocios en Miami | Video Corto en Español",
    description:
      "Grabación y edición de reels para negocios en Miami, restaurantes, marcas locales, tiendas, profesionales y creadores.",
    eyebrow: "Instagram / TikTok / Shorts",
    h1: "Reels para negocios en Miami sin perder tiempo en producciones enormes.",
    lead:
      "Un buen reel necesita una idea clara, tomas útiles y edición con ritmo. Esteban ayuda a convertir un local, producto o servicio en contenido vertical que se puede publicar rápido.",
    keyword: "reels para negocios Miami",
    location: "Miami",
    icon: Scissors,
    bestFor: [
      "Restaurantes y cafeterías que necesitan mostrar platos y ambiente.",
      "Tiendas, salones, entrenadores y marcas personales.",
      "Negocios latinos que quieren contenido en español e inglés.",
      "Campañas pequenas para Meta Ads o contenido organico.",
    ],
    deliverables: [
      "Reel principal de 15 a 45 segundos.",
      "Hooks y cortes alternos según el material.",
      "Captions, musica y formato vertical.",
      "Banco de clips para reutilizar.",
    ],
    searchIntent:
      "Ataca un intent comercial emergente: dueños que no buscan 'productora audiovisual', sino alguien que haga reels concretos para vender o mostrar el negocio.",
    faqs: [
      {
        question: "¿Puedo pedir solo edición de reels?",
        answer:
          "Sí. Si ya tienes videos grabados, Esteban puede editar, ordenar y preparar versiones listas para publicar.",
      },
      {
        question: "¿Los reels pueden ser bilingues?",
        answer:
          "Sí. Se pueden preparar captions o versiones en español e inglés según la audiencia.",
      },
    ],
  },
  {
    slug: "video-para-restaurantes-miami",
    title: "Video para restaurantes en Miami",
    metadataTitle:
      "Video y Fotografía para Restaurantes en Miami | Reels y Menú Visual",
    description:
      "Video y fotografía para restaurantes en Miami: reels, platos, ambiente, menú visual, equipo, delivery y contenido para redes.",
    eyebrow: "Restaurantes / comida / hospitality",
    h1: "Video para restaurantes en Miami que abre el apetito antes de la visita.",
    lead:
      "La primera decisión muchas veces pasa en Instagram, Google o el menú digital. Esteban crea fotos, clips y reels para que el plato, el ambiente y la experiencia se entiendan rápido.",
    keyword: "video para restaurantes Miami",
    location: "Miami",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes latinos, cafes, bares y conceptos nuevos.",
      "Lanzamientos de menu, brunch, happy hour o eventos especiales.",
      "Contenido para Google Business, Instagram y delivery apps.",
      "Dueños que necesitan foto y video en una sola visita.",
    ],
    deliverables: [
      "Fotos de platos, bebidas y ambiente.",
      "Reels verticales con ritmo social.",
      "Clips del equipo, cocina o proceso.",
      "Entrega organizada por uso: menu, web, redes y anuncios.",
    ],
    searchIntent:
      "Construye una página de nicho para dueños hispanos de restaurantes que buscan resultados prácticos, no lenguaje de agencia.",
    faqs: [
      {
        question: "¿Se puede grabar durante servicio?",
        answer:
          "Sí, pero lo ideal es planificar horas de menor ruido para controlar luz, platos y flujo del equipo.",
      },
      {
        question: "¿Incluye fotos y video?",
        answer:
          "Puede incluir ambos. El scope se ajusta según menú, cantidad de platos y entregables.",
      },
    ],
  },
  {
    slug: "drone-real-estate-miami",
    title: "Drone para real estate en Miami",
    metadataTitle:
      "Drone para Real Estate en Miami | Foto, Video y Tomas Aéreas",
    description:
      "Drone para real estate en Miami y Broward: tomas aéreas, video de propiedad, contenido para agentes, listings y desarrollos.",
    eyebrow: "Real estate / propiedades / listings",
    h1: "Drone para real estate en Miami cuando la propiedad necesita contexto.",
    lead:
      "Las tomas aéreas ayudan a explicar ubicación, escala, exterior, acceso y estilo de vida. Esteban combina drone, video en tierra y cortes verticales para agentes y propiedades.",
    keyword: "drone real estate Miami",
    location: "Miami / Broward",
    icon: Home,
    bestFor: [
      "Agentes con listings residenciales o comerciales.",
      "Propiedades cerca de agua, avenidas principales o zonas reconocibles.",
      "Airbnb, alquileres, espacios comerciales y desarrollos pequeños.",
      "Contenido para Instagram, YouTube Shorts, websites y anuncios.",
    ],
    deliverables: [
      "Tomas aéreas exteriores cuando clima y reglas lo permitan.",
      "Video de recorrido con tomas en tierra.",
      "Fotos o stills seleccionados.",
      "Versiones para listing, redes y presentacion.",
    ],
    searchIntent:
      "Captura el cruce entre búsqueda hispana, real estate visual y necesidad concreta de drone/video en South Florida.",
    faqs: [
      {
        question: "¿Siempre se puede volar drone?",
        answer:
          "No siempre. Depende de clima, locación, restricciones de espacio aéreo y seguridad del área.",
      },
      {
        question: "¿Sirve para agentes bilingues?",
        answer:
          "Sí. La planificación y entrega pueden considerar audiencias en español e inglés.",
      },
    ],
  },
];

export const spanishCoreRoutes = [
  "/es",
  "/es/servicios",
  "/es/areas",
  "/es/sobre-esteban",
  "/es/contacto",
];

export const languageAlternates: Record<string, Record<string, string>> = {
  "/": {
    "en-US": "/",
    "es-US": "/es",
  },
  "/services": {
    "en-US": "/services",
    "es-US": "/es/servicios",
  },
  "/areas": {
    "en-US": "/areas",
    "es-US": "/es/areas",
  },
  "/about": {
    "en-US": "/about",
    "es-US": "/es/sobre-esteban",
  },
  "/contact": {
    "en-US": "/contact",
    "es-US": "/es/contacto",
  },
  "/es": {
    "en-US": "/",
    "es-US": "/es",
  },
  "/es/servicios": {
    "en-US": "/services",
    "es-US": "/es/servicios",
  },
  "/es/areas": {
    "en-US": "/areas",
    "es-US": "/es/areas",
  },
  "/es/sobre-esteban": {
    "en-US": "/about",
    "es-US": "/es/sobre-esteban",
  },
  "/es/contacto": {
    "en-US": "/contact",
    "es-US": "/es/contacto",
  },
};

export const spanishProofPrinciples = [
  "Esteban trabaja en español o inglés, desde el brief hasta los cambios finales.",
  "La página publica solo prueba real: trabajos reales, enlaces reales y testimonios reales cuando existan.",
  "Foto, video, drone y edición se planean como un solo sistema visual, no como piezas sueltas.",
  "El scope queda claro antes de grabar: entregables, formatos, fecha y uso final.",
];

export const spanishTrustQuestions = [
  {
    question: "¿Por qué una página en español?",
    answer:
      "Porque muchos dueños, agentes, restaurantes y creadores en Miami y Broward prefieren explicar el proyecto en español. Eso reduce fricción y evita malos entendidos en el scope.",
  },
  {
    question: "¿Hay prueba real publicada?",
    answer:
      "La política del sitio es no inventar logos, reviews ni números. Los placeholders están marcados hasta que se agreguen reels, fotos, enlaces de Instagram o testimonios reales.",
  },
  {
    question: "¿Qué hace diferente a Esteban?",
    answer:
      "No se posiciona solo como operador de drone o fotógrafo. El valor está en conectar captura, edición y entrega para que el negocio tenga contenido útil.",
  },
];

export const spanishRoutes = [
  ...spanishCoreRoutes,
  ...spanishNichePages.map((page) => `/es/${page.slug}`),
];

export const spanishPackages = [
  {
    name: "Edicion de reel",
    price: "Desde $75",
    description:
      "Para material ya grabado que necesita ritmo, captions, color y exporte final.",
  },
  {
    name: "Shoot local",
    price: "Desde $150",
    description:
      "Una visita enfocada para un negocio, restaurante, propiedad o creador local.",
  },
  {
    name: "Dia de contenido",
    price: "Cotizado",
    description:
      "Media jornada o jornada completa para varios entregables de foto, video y redes.",
  },
];

export const spanishOpportunitySignals = [
  {
    label: "Mercado hispano",
    value: "Miami-Dade",
    detail: "Mayor oportunidad para páginas y CTAs en español.",
    icon: Store,
  },
  {
    label: "Base local",
    value: "Broward",
    detail: "Fort Lauderdale es la base operativa y una búsqueda menos saturada.",
    icon: Building2,
  },
  {
    label: "Oferta",
    value: "Foto + video + drone",
    detail: "Mejor que competir solo por fotografía de bodas o directorios.",
    icon: Plane,
  },
];

export function getSpanishNichePage(slug: string) {
  return spanishNichePages.find((page) => page.slug === slug);
}
