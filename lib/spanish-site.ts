import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarRange,
  Camera,
  Home,
  Languages,
  Laptop,
  MapPin,
  Scissors,
  UtensilsCrossed,
  Video,
  WandSparkles,
} from "lucide-react";

export const spanishSite = {
  title: "Esteban Moreno Media en Español",
  description:
    "Edición de video, contenido con IA, planificación para redes y producción por proyecto desde Fort Lauderdale para Broward, Miami-Dade, Palm Beach County y clientes remotos.",
  contactLead:
    "Cuéntame la meta, fecha, ciudad, entregables y dónde se publicará el contenido. La atención es principalmente en español y también hay comunicación disponible en inglés.",
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
    id: "edicion",
    name: "Edición de video y reels",
    shortName: "Edición",
    description:
      "Edición remota para emprendedores, negocios, agencias y equipos que ya tienen material grabado.",
    detail:
      "Ritmo, captions, color, música y exportes se definen según la pieza y el canal.",
    icon: Scissors,
    tags: ["Remoto", "Reels", "Postproducción"],
  },
  {
    id: "contenido-ia",
    name: "Contenido con IA",
    shortName: "Contenido IA",
    description:
      "Imágenes, movimiento y variaciones creativas asistidas por IA para contenido social y productos.",
    detail:
      "El proceso y el nivel de generación se explican antes de comenzar, con revisión humana.",
    icon: WandSparkles,
    tags: ["Imágenes", "Animación", "Variaciones"],
  },
  {
    id: "planificacion-social",
    name: "Planificación para redes",
    shortName: "Plan social",
    description:
      "Un plan práctico para marcas que necesitan publicar con consistencia y una intención clara.",
    detail:
      "Temas, formatos, frecuencia y necesidades de producción se pueden organizar por mes.",
    icon: CalendarRange,
    tags: ["Estrategia", "Frecuencia", "Mensual"],
  },
  {
    id: "videografia",
    name: "Contenido en locación",
    shortName: "Grabación",
    description:
      "Producción ligera para restaurantes, real estate, productos, emprendedores y marcas locales.",
    detail:
      "La cotización define locación, método de captura, entregables, traslado y plazo.",
    icon: Video,
    tags: ["South Florida", "Social", "Real estate"],
  },
  {
    id: "fotografia",
    name: "Producto y opciones aéreas",
    shortName: "Foto + aéreo",
    description:
      "Fotografía de producto y, cuando el proyecto lo permite, tomas aéreas para dar contexto a una propiedad o marca.",
    detail:
      "El drone se ofrece solo al confirmar espacio aéreo, clima, permiso de la propiedad y disponibilidad de piloto acreditado.",
    icon: Camera,
    tags: ["Producto", "Propiedad", "Aéreo cotizado"],
  },
];

export const spanishAreas = [
  {
    name: "Fort Lauderdale",
    county: "Broward County",
    href: "/es/areas",
    description:
      "Base principal para emprendedores, restaurantes, real estate y contenido para negocios locales.",
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
    href: "/es/areas",
    description:
      "Disponible por cotización en Hollywood, Pompano Beach, Davie, Plantation, Sunrise, Weston, Coral Springs y áreas cercanas.",
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
    href: "/es/areas",
    description:
      "Proyectos seleccionados para emprendedores, restaurantes, marcas y real estate en Miami-Dade.",
    neighborhoods: ["Miami", "Brickell", "Wynwood", "Doral", "Coral Gables"],
  },
  {
    name: "Palm Beach County",
    county: "Palm Beach County",
    href: "/es/areas/palm-beach-county",
    description:
      "Disponible por cotización para proyectos seleccionados desde Boca Raton y Delray Beach hasta West Palm Beach, Palm Beach Gardens, Jupiter y Wellington.",
    neighborhoods: [
      "Boca Raton",
      "Delray Beach",
      "Boynton Beach",
      "West Palm Beach",
      "Palm Beach Gardens",
      "Jupiter",
      "Wellington",
    ],
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
  projectFit: string;
  faqs: { question: string; answer: string }[];
};

export const spanishNichePages: SpanishNichePage[] = [
  {
    slug: "videografo-en-miami",
    title: "Videógrafo en Miami",
    metadataTitle: "Videógrafo en Miami | Video y Reels en Español",
    description:
      "Edición y producción de video por proyecto en Miami para emprendedores, restaurantes, propiedades y marcas que prefieren trabajar en español.",
    eyebrow: "Miami / Doral / Brickell / Wynwood",
    h1: "Videógrafo en Miami para contenido que se siente local.",
    lead:
      "Si buscas un videógrafo en Miami que pueda hablar español, entender el negocio y entregar piezas listas para redes, Esteban cubre proyectos pequeños y medianos sin convertirlo en una producción pesada.",
    keyword: "videógrafo en Miami",
    location: "Miami-Dade",
    icon: Video,
    bestFor: [
      "Restaurantes que necesitan reels, menú visual o contenido mensual.",
      "Agentes de real estate que quieren video y cortes verticales.",
      "Marcas locales que prefieren planificar el contenido en español.",
      "Emprendedores que necesitan edición o contenido continuo para redes.",
    ],
    deliverables: [
      "Video vertical para Reels/TikTok/Shorts.",
      "Edición con captions, color y música.",
      "B-roll para reutilizar en futuras publicaciones.",
      "Versiones para website, anuncios o Google Business cuando aplica.",
    ],
    projectFit:
      "Una opción directa para negocios, restaurantes y propiedades que necesitan video local sin una producción de agencia innecesariamente grande.",
    faqs: [
      {
        question: "¿Esteban trabaja en español?",
        answer:
          "Sí. El español es su idioma principal. También puede mantener comunicación de trabajo en inglés.",
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
      "Edición y producción de video por proyecto en Fort Lauderdale para negocios, restaurantes, propiedades y contenido social en Broward County.",
    eyebrow: "Fort Lauderdale / Broward County",
    h1: "Videógrafo en Fort Lauderdale para negocios que necesitan contenido claro.",
    lead:
      "Esteban está basado en Fort Lauderdale y trabaja con negocios locales que necesitan grabación, edición y piezas listas para publicar sin un proceso complicado.",
    keyword: "videógrafo en Fort Lauderdale",
    location: "Fort Lauderdale",
    icon: MapPin,
    bestFor: [
      "Negocios cerca de Las Olas, Flagler Village y Wilton Manors.",
      "Emprendedores que necesitan reels o edición continua.",
      "Propiedades, restaurantes y espacios comerciales.",
      "Creadores o profesionales que necesitan contenido constante.",
    ],
    deliverables: [
      "Shoot corto en locación.",
      "Reel principal y cortes secundarios.",
      "Fotos o clips adicionales cuando el scope lo incluye.",
      "Entrega en formatos verticales y horizontales.",
    ],
    projectFit:
      "Ideal para proyectos en Broward que necesitan un profesional basado en Fort Lauderdale, comunicación clara y un alcance definido desde el principio.",
    faqs: [
      {
        question: "¿Fort Lauderdale es la base principal?",
        answer:
          "Sí. Fort Lauderdale y Broward son la base principal, con proyectos seleccionados en Miami-Dade y Palm Beach County.",
      },
      {
        question: "¿Se puede hacer un shoot pequeño?",
        answer:
          "Sí. El alcance, la duración y los entregables se confirman en la cotización antes de reservar.",
      },
    ],
  },
  {
    slug: "fotografo-en-fort-lauderdale",
    title: "Fotógrafo en Fort Lauderdale",
    metadataTitle:
      "Fotógrafo en Fort Lauderdale | Fotos Comerciales y Contenido",
    description:
      "Fotografía de producto y contenido comercial por proyecto en Fort Lauderdale para restaurantes, propiedades y marcas.",
    eyebrow: "Producto / comida / espacios",
    h1: "Fotógrafo en Fort Lauderdale para fotos que tu negocio sí puede usar.",
    lead:
      "Fotos útiles para productos, menús, Google Business, listings y publicaciones. La cotización confirma el método de captura y la cantidad de imágenes finales.",
    keyword: "fotógrafo en Fort Lauderdale",
    location: "Fort Lauderdale",
    icon: Camera,
    bestFor: [
      "Negocios que necesitan actualizar Google Business o su website.",
      "Restaurantes con fotos de platos, equipo y ambiente.",
      "Marcas que necesitan fotografía de producto.",
      "Propiedades o espacios que necesitan verse mejor en línea.",
    ],
    deliverables: [
      "Galería seleccionada y editada.",
      "Fotos verticales y horizontales.",
      "Uso para web, redes, menús y anuncios.",
      "Opción de combinar con reels o clips cortos.",
    ],
    projectFit:
      "Una sesión enfocada para negocios, restaurantes, productos o propiedades que necesitan imágenes editadas y listas para usar.",
    faqs: [
      {
        question: "¿Hace solo fotografía?",
        answer:
          "La fotografía de producto puede cotizarse sola o combinarse con video cuando el proyecto lo requiere.",
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
      "Negocios latinos que prefieren planificar el contenido en español.",
      "Campañas pequeñas para Meta Ads o contenido orgánico.",
    ],
    deliverables: [
      "Reel principal de 15 a 45 segundos.",
      "Hooks y cortes alternos según el material.",
      "Captions, musica y formato vertical.",
      "Banco de clips para reutilizar.",
    ],
    projectFit:
      "Pensado para dueños que necesitan reels concretos para explicar, vender o mostrar el negocio con una entrega sencilla y publicable.",
    faqs: [
      {
        question: "¿Puedo pedir solo edición de reels?",
        answer:
          "Sí. Si ya tienes videos grabados, Esteban puede editar, ordenar y preparar versiones listas para publicar.",
      },
      {
        question: "¿Los reels pueden ser bilingues?",
        answer:
          "Se pueden cotizar captions o versiones en español e inglés según la audiencia y el material.",
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
    projectFit:
      "Funciona para restaurantes que necesitan mostrar platos, ambiente y equipo en una misma visita, con piezas organizadas por canal y uso.",
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
      "Las tomas aéreas ayudan a explicar ubicación, escala, exterior y acceso. Se cotizan solo cuando puede confirmarse un piloto acreditado y las condiciones legales y operativas del vuelo.",
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
      "Tomas aéreas exteriores cuando se confirme piloto acreditado, clima, permisos y espacio aéreo.",
      "Video de recorrido con tomas en tierra.",
      "Fotos o stills seleccionados.",
      "Versiones para listing, redes y presentacion.",
    ],
    projectFit:
      "Ayuda a agentes y propietarios a mostrar ubicación, escala y contexto con una mezcla de tomas aéreas y cobertura desde tierra.",
    faqs: [
      {
        question: "¿Siempre se puede volar drone?",
        answer:
          "No. Depende de piloto acreditado disponible, clima, permiso de la propiedad, espacio aéreo y seguridad del área.",
      },
      {
        question: "¿Sirve para agentes bilingues?",
        answer:
          "Sí. La planificación puede hacerse en español y la entrega puede considerar audiencias en español e inglés.",
      },
    ],
  },
];

export const spanishCoreRoutes = [
  "/es",
  "/es/servicios",
  "/es/portafolio",
  "/es/areas",
  "/es/areas/palm-beach-county",
  "/es/sobre-esteban",
  "/es/contacto",
];

export const languageAlternates: Record<string, Record<string, string>> = {
  "/": {
    "en-US": "/",
    "es-US": "/es",
    "x-default": "/",
  },
  "/services": {
    "en-US": "/services",
    "es-US": "/es/servicios",
    "x-default": "/services",
  },
  "/portfolio": {
    "en-US": "/portfolio",
    "es-US": "/es/portafolio",
    "x-default": "/portfolio",
  },
  "/areas": {
    "en-US": "/areas",
    "es-US": "/es/areas",
    "x-default": "/areas",
  },
  "/areas/palm-beach-county": {
    "en-US": "/areas/palm-beach-county",
    "es-US": "/es/areas/palm-beach-county",
    "x-default": "/areas/palm-beach-county",
  },
  "/about": {
    "en-US": "/about",
    "es-US": "/es/sobre-esteban",
    "x-default": "/about",
  },
  "/contact": {
    "en-US": "/contact",
    "es-US": "/es/contacto",
    "x-default": "/contact",
  },
  "/es": {
    "en-US": "/",
    "es-US": "/es",
    "x-default": "/",
  },
  "/es/servicios": {
    "en-US": "/services",
    "es-US": "/es/servicios",
    "x-default": "/services",
  },
  "/es/portafolio": {
    "en-US": "/portfolio",
    "es-US": "/es/portafolio",
    "x-default": "/portfolio",
  },
  "/es/areas": {
    "en-US": "/areas",
    "es-US": "/es/areas",
    "x-default": "/areas",
  },
  "/es/areas/palm-beach-county": {
    "en-US": "/areas/palm-beach-county",
    "es-US": "/es/areas/palm-beach-county",
    "x-default": "/areas/palm-beach-county",
  },
  "/es/sobre-esteban": {
    "en-US": "/about",
    "es-US": "/es/sobre-esteban",
    "x-default": "/about",
  },
  "/es/contacto": {
    "en-US": "/contact",
    "es-US": "/es/contacto",
    "x-default": "/contact",
  },
};

export const spanishProofPrinciples = [
  "El español es el idioma principal de Esteban; también hay comunicación de trabajo disponible en inglés.",
  "La página publica solo prueba real: trabajos reales, enlaces reales y testimonios reales cuando existan.",
  "La edición, el contenido con IA, la planificación y la captura se conectan a una meta comercial.",
  "El scope queda claro antes de grabar: entregables, formatos, fecha y uso final.",
];

export const spanishTrustQuestions = [
  {
    question: "¿Por qué una página en español?",
    answer:
      "Porque muchos dueños, agentes, restaurantes y creadores en Broward, Miami-Dade y Palm Beach prefieren explicar el proyecto en español. Eso reduce fricción y evita malos entendidos en el scope.",
  },
  {
    question: "¿Hay prueba real publicada?",
    answer:
      "Sí. El portafolio publica ocho proyectos reales con videos públicos del canal de YouTube de Esteban y los créditos disponibles. El sitio no inventa logos, reseñas, cifras ni resultados.",
  },
  {
    question: "¿Qué hace diferente a Esteban?",
    answer:
      "Ofrece atención directa y personalizada, hace preguntas antes de producir y aporta la perspectiva de haber administrado su propia marca en línea durante cinco años.",
  },
];

export const spanishRoutes = [
  ...spanishCoreRoutes,
  ...spanishNichePages.map((page) => `/es/${page.slug}`),
];

export const spanishPackages = [
  {
    name: "Edición remota",
    price: "Cotización",
    description:
      "Para material ya grabado que necesita un reel o un lote de piezas con alcance definido.",
  },
  {
    name: "Plan mensual",
    price: "Cotización",
    description:
      "Estrategia, frecuencia y mezcla de formatos definidas según las necesidades del negocio.",
  },
  {
    name: "Proyecto en locación",
    price: "Cotización",
    description:
      "Producción local con traslado, método de captura, entregables y plazo confirmados antes de reservar.",
  },
];

export const spanishOpportunitySignals = [
  {
    label: "Atención",
    value: "Español primero",
    detail: "Brief, preguntas y cambios con comunicación directa.",
    icon: Languages,
  },
  {
    label: "Base local",
    value: "Broward",
    detail: "Fort Lauderdale es la base operativa y una búsqueda menos saturada.",
    icon: Building2,
  },
  {
    label: "Trabajo remoto",
    value: "Edición + estrategia",
    detail: "Proyectos sin depender de una grabación presencial.",
    icon: Laptop,
  },
];

export function getSpanishNichePage(slug: string) {
  return spanishNichePages.find((page) => page.slug === slug);
}
