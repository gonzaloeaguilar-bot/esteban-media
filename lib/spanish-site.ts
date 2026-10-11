import { priceSentence } from "@/lib/packages";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { isConsolidatedPath } from "@/lib/consolidation";
import { packageRoutes } from "@/lib/package-routes";
import type { LucideIcon } from "lucide-react";
import { PACKAGE_PRICES, PRICING_BANDS, usd } from "@/lib/pricing";
import {
  Anchor,
  Building2,
  CalendarRange,
  Camera,
  Car,
  Handshake,
  Home,
  Languages,
  Laptop,
  MapPin,
  Megaphone,
  Scissors,
  Stethoscope,
  UtensilsCrossed,
  Video,
  WandSparkles,
} from "lucide-react";

import { absoluteUrl, site } from "@/lib/site";
import {
  CORPORATE_EVENT_ES_DESTINATIONS,
  CORPORATE_EVENT_ES_DISCLOSURE,
  CORPORATE_EVENT_ES_SECTIONS,
  HOTEL_ES_DESTINATIONS,
  HOTEL_ES_DISCLOSURE,
  HOTEL_ES_SECTIONS,
  NIGHTLIFE_ES_DESTINATIONS,
  NIGHTLIFE_ES_DISCLOSURE,
  NIGHTLIFE_ES_SECTIONS,
} from "@/lib/hospitality-deep-dive-content";

export const spanishSite = {
  title: "Esteban Moreno Media | Sistemas de Growth y Producción Creativa",
  description:
    "Esteban Moreno Media: edición de video, contenido con IA y producción para redes en South Florida. Bilingüe Español/English. Fort Lauderdale — cotiza rápido.",
  /** The Spanish HOME only: anchored on the published starting price (lib/pricing.ts). */
  homeDescription: `Esteban Moreno Media: edición de video, contenido con IA y producción para redes en Fort Lauderdale y Miami. Paquetes desde ${usd(PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : 0)}. Cotiza por WhatsApp.`,
  contactLead:
    "Comparte la meta, el condado, el material disponible, las referencias y el uso previsto. La atención es principalmente en español y también hay comunicación disponible en inglés intermedio.",
};

export type SpanishService = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  tags: string[];
  /** Precio inicial autorizado por el owner (2026-08-28) — siempre "Desde", nunca precio cerrado. */
  startingPrice?: string;
};

export const spanishServices: SpanishService[] = [
  {
    id: "edicion",
    name: "Edición de video",
    shortName: "Edición",
    description:
      "Edición remota para emprendedores, negocios, agencias y equipos que ya tienen material grabado.",
    detail:
      "El alcance parte del material disponible, la meta de publicación y las necesidades de formato.",
    icon: Scissors,
    tags: ["Remoto", "Material existente", "Postproducción"],
    startingPrice: `Desde ${usd(PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : 0)}`,
  },
  {
    id: "contenido-ia",
    name: "Contenido con IA",
    shortName: "Contenido IA",
    description:
      "Apoyo creativo con métodos asistidos por IA, definido alrededor de una meta de contenido confirmada.",
    detail:
      "Las preguntas de alcance aclaran dónde puede encajar la IA, qué referencias guían la dirección y cómo se usará el contenido.",
    icon: WandSparkles,
    tags: ["Asistido por IA", "Dirección creativa", "Según proyecto"],
  },
  {
    id: "planificacion-social",
    name: "Planificación para redes",
    shortName: "Plan social",
    description:
      "Un plan práctico para marcas que necesitan publicar con consistencia y una intención clara.",
    detail:
      "Las preguntas de alcance cubren la audiencia, la meta, los canales y las necesidades de contenido.",
    icon: CalendarRange,
    tags: ["Estrategia", "Frecuencia", "Plan de contenido"],
    startingPrice: "Paquetes mensuales desde $640/mes",
  },
  {
    id: "videografia",
    name: "Contenido en locación",
    shortName: "Grabación",
    description:
      "Producción local de video, definida de forma selectiva para emprendedores, negocios y marcas.",
    detail:
      "La disponibilidad y el alcance se consideran proyecto por proyecto después de conocer la locación, la meta y las necesidades de captura.",
    icon: Video,
    tags: ["South Florida", "En locación", "Según proyecto"],
    startingPrice: "Jornadas de producción desde $800",
  },
  {
    id: "diseno-web",
    name: "Diseño Web y Chatbots con IA",
    shortName: "Diseño Web e IA",
    description:
      "Sitios web personalizados de alta conversión, aplicaciones web interactivas y chatbots de IA para captura de clientes 24/7.",
    detail:
      "El diseño y desarrollo combina arquitectura web moderna, bots conversacionales de IA e integración visual de marca.",
    icon: Laptop,
    tags: ["Diseño Web", "Chatbots IA", "Sistemas de Conversión"],
  },
];

export const spanishAreas = [
  {
    name: "Fort Lauderdale",
    county: "Broward County",
    href: "/es/areas",
    description:
      "Base principal para emprendedores, restaurantes, real estate y contenido para negocios locales.",
  },
  {
    name: "Broward County",
    county: "Broward County",
    href: "/es/areas",
    description:
      "Broward County forma parte del mercado local habitual para proyectos definidos de forma selectiva.",
  },
  {
    name: "Miami-Dade",
    county: "Miami-Dade County",
    href: "/es/areas",
    description:
      "Proyectos seleccionados para emprendedores, restaurantes, marcas y real estate en Miami-Dade.",
  },
  {
    name: "Palm Beach County",
    county: "Palm Beach County",
    href: "/es/areas/palm-beach-county",
    description:
      "Palm Beach County es un área de expansión considerada proyecto por proyecto; todavía no se publica cobertura por ciudad.",
  },
];

export type SpanishNicheSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

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
  availability: "confirmed" | "pending-confirmation";
  icon: LucideIcon;
  bestFor: string[];
  scopingQuestions: string[];
  projectFit: string;
  sections?: readonly SpanishNicheSection[];
  sectionsDisclosure?: string;
  /** Summary line under the disclosure title; names what is inside the fold. */
  sectionsDestinations?: string;
  updated?: string;
  heroMedia?: { src: string; alt: string; caption: string };
  faqs: { question: string; answer: string }[];
};

// Precios de las páginas de gimnasios, salones y spas (2026-10-07): todos salen
// de lib/pricing.ts, así que un cambio de tarifa se propaga solo.
const esFrom = (price: (typeof PACKAGE_PRICES)[keyof typeof PACKAGE_PRICES]) =>
  price.kind === "from" ? usd(price.amount) : "una cotización a medida";
const esStarterFrom = esFrom(PACKAGE_PRICES.arranque);
const esGrowthFrom = esFrom(PACKAGE_PRICES.crecimiento);
const esLocalFrom = esFrom(PACKAGE_PRICES["presencia-local"]);
const esSocialBand = `${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}`;
const esHalfDayBand = `${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}`;

export const spanishNichePages: SpanishNichePage[] = [
  {
    slug: "edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    title: "Creadores de comida y lugares",
    metadataTitle: "Creadores de Comida y Lugares Miami",
    description: "Edición para creadores que recomiendan comida y lugares en Miami y Fort Lauderdale. Envía tus videos o consulta un mes de contenido para lanzar tu cuenta.",
    eyebrow: "Comida / Lugares / Creadores",
    h1: "Tú descubres el lugar. Esteban edita la historia.",
    lead: "Edición para cuentas que recomiendan comida y lugares en Miami y Fort Lauderdale. Envía tus videos o consulta un mes de contenido para lanzar tu cuenta.",
    keyword: "Edición para creadores",
    location: "Broward / Miami-Dade / Remoto",
    availability: "confirmed",
    icon: UtensilsCrossed,
    updated: "2026-10-07",
    heroMedia: { src: "/portfolio/bar-door-monkey.jpg", alt: "Fotograma del video publicado de Bar Door Monkey Miami", caption: "Bar Door Monkey Miami · 2020 · 55 segundos. Promoción de un local con videografía y edición, no una cuenta de recomendaciones." },
    sectionsDisclosure: "Prepara tus primeros videos de comida y lugares",
    bestFor: [
      "Cuentas nuevas con visitas grabadas y ganas de empezar a publicar.",
      "Creadores que recomiendan restaurantes, cafés y otros lugares.",
      "Videos grabados con celular que necesitan edición y subtítulos.",
    ],
    scopingQuestions: [
      "¿Qué material tienes y dónde quieres publicarlo?",
      "¿Qué ritmo de publicación buscas para el primer mes?",
      "¿Qué visitas fueron pagadas o incluyeron comida de cortesía?",
    ],
    projectFit: `Crecimiento: ${priceSentence("es", "crecimiento")}. Incluye plan de contenido, calendario, edición y reporte mensual. El material disponible y el ritmo que buscas definen la cotización. Esteban tiene su base en Fort Lauderdale; la edición puede ser remota y la grabación se acuerda por proyecto.`,
    sections: [
      {
        heading: "¿Qué edita Esteban para una cuenta de recomendaciones?",
        paragraphs: [
          "Esteban convierte tus visitas a restaurantes y otros lugares en videos verticales de 1080x1920, con subtítulos incrustados dentro de la zona segura. El nombre del plato o del local y el barrio aparecen en pantalla para que quien descubre tu cuenta sepa de qué lugar hablas. Las portadas se sacan de tus propias tomas. También se puede acordar una versión horizontal cuando la visita tenga material para un video más largo.",
          "Envía los archivos originales, la cuenta y las plataformas donde vas a publicar. Explica qué quieres recomendar y qué detalles no deben quedar por fuera. El servicio une la [edición para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami) con el cuidado del plato y el ambiente de la [edición promocional para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami), conservando tu manera de contar la experiencia.",
        ],
      },
      {
        heading: "¿Cómo se organiza el primer mes de la cuenta?",
        paragraphs: [
          `El paquete Crecimiento incluye plan de contenido, calendario de publicación, edición y reporte mensual. ${priceSentence("es", "crecimiento")}. Es un precio de partida: el primer mes se define en una llamada según el material que tengas y el ritmo que quieras mantener. Lleva tu cuenta, los lugares que piensas visitar y referencias de estilo. La cantidad de publicaciones y los plazos se acuerdan después de revisar el alcance.`,
          "La conversación separa las visitas que ya grabaste de las ideas que todavía necesitan tomas. También sirve para decidir qué piezas van juntas y qué nombres, observaciones o textos debes enviar. No necesitas tener una cuenta consolidada para consultar. El plan parte de tu material y de lo que quieres comunicar, sin prometer seguidores, visualizaciones ni resultados de crecimiento.",
        ],
      },
      {
        heading: "¿Qué conviene grabar durante una visita al restaurante?",
        paragraphs: [
          "Graba manos, ingredientes, texturas, el salón y el letrero o la fachada. Esas tomas conectan el plato con el lugar y evitan que todo el video dependa de primeros planos de comida. Organiza los originales en carpetas con el nombre del local y la fecha. Incluye la escritura correcta de los platos del menú y una nota breve sobre lo que quieres recomendar, sin dejar que el editor tenga que adivinar tu opinión.",
          "La [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) te ayuda a preparar las tomas; la [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video) explica cómo organizar el envío. Si el contenido es para la cuenta del negocio, consulta también [video para restaurantes en Miami](/es/video-para-restaurantes-miami) y aclara ese uso antes de editar.",
        ],
      },
      {
        heading: "¿Cómo se identifican las visitas pagadas y las comidas de cortesía?",
        paragraphs: [
          "Dile a Esteban qué visitas son colaboraciones pagadas y en cuáles el local te ofreció la comida. La práctica publicada para creadores es incorporar esa información dentro del video, sin depender únicamente de una descripción que el público tenga que desplegar. Envía el contexto junto a los clips correspondientes, el nombre del restaurante y cualquier texto que ya hayas acordado. Así se tiene en cuenta desde el inicio de la edición.",
          "Al revisar el montaje, comprueba que el aviso se lea y acompañe la visita correcta. Revisa también los nombres del local y los platos, los subtítulos y tus comentarios sobre la experiencia. Si una carpeta mezcla visitas pagadas, invitaciones y comidas que pagaste tú, identifica cada una por separado. Esa distinción permite editar con información concreta y conservar lo que realmente quisiste recomendar.",
        ],
      },
      {
        heading: "¿Qué trabajos publicados puedes ver antes de consultar?",
        paragraphs: [
          "[Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) es un video promocional de un restaurante de Miami, realizado en 2020 con videografía y edición. La pieza publicada dura 55 segundos. [ML Colombia](/es/portafolio/ml-colombia) es una pieza de contenido social de 24 segundos. Son una promoción de un local y un video social; no se presentan como una cuenta de recomendaciones de comida ni como resultados de un creador.",
          "Míralos pensando en tu propio material: el orden de las tomas, la relación entre personas y espacios y la información que cabe en una pieza corta. Señala qué partes quieres tomar como referencia y qué cambiarías para que el video se sienta tuyo. La consulta parte de trabajos que puedes ver y de tus grabaciones, sin atribuirles una audiencia o un resultado que no está documentado.",
        ],
      },
    ],
    faqs: [
      { question: "¿Puedes editar a distancia lo que grabé con el celular?", answer: `Sí. Envía los archivos originales, no videos descargados de una aplicación. Arranque cubre la edición remota: ${priceSentence("es", "arranque").toLowerCase()}. El formato, el volumen y los plazos se confirman para tu proyecto.` },
      { question: "¿El plan mensual incluye ir a grabar?", answer: "Crecimiento incluye plan de contenido, calendario, edición y reporte mensual. La grabación en locación se acuerda por separado, proyecto por proyecto, en Broward y Miami-Dade desde la base de Esteban en Fort Lauderdale." },
      { question: "¿Los ejemplos son de una cuenta de recomendaciones?", answer: "No. Bar Door Monkey Miami es una promoción de un local con videografía y edición; ML Colombia es una pieza social. Muestran trabajo publicado, no una cuenta de recomendaciones ni sus resultados." },
    ],
  },

  {
    slug: "diseno-web-fort-lauderdale",
    title: "Diseño Web y Chatbots en Fort Lauderdale",
    metadataTitle: "Diseño Web & Chatbots IA",
    description:
      "Diseño de páginas web de alta conversión, aplicaciones web personalizadas e integración de chatbots con IA en Fort Lauderdale y South Florida.",
    eyebrow: "Fort Lauderdale / Diseño Web e IA",
    h1: "Diseño Web y Chatbots con IA para Negocios en Fort Lauderdale.",
    lead:
      "Desarrollamos sitios web modernos de alta conversión y chatbots conversacionales de IA para empresas locales en Fort Lauderdale, Miami y Broward. Combina presencia web con automatización de clientes 24/7.",
    keyword: "diseño web fort lauderdale",
    location: "Fort Lauderdale / Broward / Miami",
    availability: "confirmed",
    icon: Laptop,
    bestFor: [
      "Negocios locales que buscan reemplazar su sitio web antiguo por un sistema moderno de ventas.",
      "Empresas y concesionarios que desean chatbots de IA para responder clientes 24/7.",
      "Marcas y marcas personales que requieren aplicaciones web interactivas.",
      "Equipos que prefieren atención directa y bilingüe en South Florida.",
    ],
    scopingQuestions: [
      "¿Cuál es el objetivo principal del nuevo sitio web (ventas, agenda, captura de leads)?",
      "¿Requiere un chatbot de IA para responder preguntas frecuentes o calificar prospectos?",
      "¿Dispones de logo, fotos y videos de marca o necesitas apoyo creativo?",
      "¿Qué plazo estimado tienes para el lanzamiento del proyecto?",
    ],
    projectFit:
      "Esta ruta conecta el desarrollo web de alta conversión con chatbots de IA y portafolio real comprobado (TitanForge, Geebs, Frontline Auto, FLAS).",
    faqs: [
      {
        question: "¿El sitio web incluye diseño adaptado a teléfonos móviles?",
        answer:
          "Sí. Todos nuestros sitios web se diseñan primero para dispositivos móviles (mobile-first) garantizando velocidad extrema y excelente experiencia de usuario.",
      },
      {
        question: "¿Cómo funciona el chatbot con IA en la página?",
        answer:
          "Integraciones con IA que responden preguntas frecuentes de tus clientes, califican prospectos y agendan citas automáticamente las 24 horas del día.",
      },
    ],
  },
  {
    slug: "videografo-en-miami",
    title: "Videógrafo en Miami",
    metadataTitle: "Videógrafo en Miami",
    description:
      "Información sobre edición y producción selectiva de video por proyecto en Miami-Dade, con atención principal en español.",
    eyebrow: "Miami-Dade / atención en español",
    h1: "Video en Miami-Dade, definido proyecto por proyecto.",
    lead:
      "Esteban tiene proyectos publicados y verificables realizados en Miami. Para una nueva idea en locación, la disponibilidad y el alcance se conversan de forma individual según nuestras [áreas de servicio](/es/areas); la atención es principalmente en español y su inglés es intermedio.",
    keyword: "videógrafo en Miami",
    location: "Miami-Dade",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Negocios con material existente que quieren conversar sobre edición.",
      "Equipos que evalúan una producción de video en locación definida de forma selectiva.",
      "Marcas que prefieren explicar la meta y las referencias en español.",
      "Personas que quieren revisar prueba publicada de proyectos reales en Miami.",
    ],
    scopingQuestions: [
      "¿Ya existe material grabado o la idea requiere una captura nueva?",
      "¿Qué debe comunicar el contenido y dónde se publicará?",
      "¿La locación está dentro de Miami-Dade?",
      "¿Qué disponibilidad, formatos y alcance deben confirmarse para este proyecto?",
    ],
    projectFit:
      "Esta página conecta las prioridades confirmadas de edición y producción selectiva con prueba publicada en Miami. No promete disponibilidad, formatos ni un alcance universal.",
    faqs: [
      {
        question: "¿Esteban trabaja en español?",
        answer:
          "Sí. El español es su idioma principal y también puede mantener comunicación de trabajo en inglés intermedio.",
      },
      {
        question: "¿Cubre todo Miami-Dade?",
        answer:
          "Miami-Dade es un mercado de proyectos seleccionados. No se publica una lista de ciudades o vecindarios; la disponibilidad de cada locación se confirma al consultar.",
      },
    ],
  },
  {
    slug: "videografo-en-fort-lauderdale",
    title: "Videógrafo en Fort Lauderdale",
    metadataTitle: "Videógrafo en Fort Lauderdale",
    description:
      "Información sobre edición y producción selectiva de video por proyecto desde Fort Lauderdale para Broward County.",
    eyebrow: "Fort Lauderdale / Broward County",
    h1: "Video desde Fort Lauderdale, con alcance definido por proyecto.",
    lead:
      "Fort Lauderdale es la base de Esteban Moreno Media. La edición, la planificación y la producción local de video forman parte de sus prioridades confirmadas; cada idea en locación se considera de forma selectiva dentro de [tres condados como área de servicio](/es/areas).",
    keyword: "videógrafo en Fort Lauderdale",
    location: "Fort Lauderdale",
    availability: "confirmed",
    icon: MapPin,
    bestFor: [
      "Negocios de Broward que quieren explicar una meta de video en español.",
      "Emprendedores con material existente para una posible edición.",
      "Equipos que evalúan si una captura local encaja con el proyecto.",
      "Personas que quieren revisar primero el portafolio publicado.",
    ],
    scopingQuestions: [
      "¿El proyecto parte de archivos existentes o de una idea para grabar?",
      "¿Qué necesita entender la audiencia?",
      "¿Qué tipo de locación estaría involucrada?",
      "¿Qué disponibilidad, uso y necesidades de formato deben confirmarse?",
    ],
    projectFit:
      "Esta ruta explica la base local y ayuda a preparar una consulta sobre edición o producción selectiva. El alcance se confirma para cada proyecto.",
    faqs: [
      {
        question: "¿Fort Lauderdale es la base principal?",
        answer:
          "Sí. Fort Lauderdale y Broward son la base local; Miami-Dade es un mercado seleccionado y Palm Beach County sigue siendo un área de expansión.",
      },
      {
        question: "¿La producción en locación está disponible para cualquier idea?",
        answer:
          "No se publica una disponibilidad universal. La producción local se considera de forma selectiva después de conocer la meta, la locación y las necesidades de captura.",
      },
    ],
  },
  {
    slug: "fotografo-en-fort-lauderdale",
    title: "Fotógrafo en Fort Lauderdale",
    metadataTitle: "Fotógrafo en Fort Lauderdale",
    description:
      "Ruta educativa heredada sobre fotografía en Fort Lauderdale. La fotografía no se publica actualmente como servicio confirmado de Esteban Moreno Media.",
    eyebrow: "Ruta heredada / confirmación pendiente",
    h1: "Fotografía en Fort Lauderdale: disponibilidad pendiente de confirmación.",
    lead:
      "Esta URL se conserva para evitar confusión y explicar el estado real: la disponibilidad de fotografía sigue pendiente de confirmación con Esteban. La página no ofrece una sesión ni promete imágenes, equipo o entregables.",
    keyword: "fotógrafo en Fort Lauderdale",
    location: "Fort Lauderdale / Broward County",
    availability: "pending-confirmation",
    icon: Camera,
    bestFor: [
      "Entender por qué esta ruta heredada continúa publicada.",
      "Distinguir trabajo visual verificado de una sesión fotográfica.",
      "Revisar los servicios que sí están confirmados actualmente.",
      "Preparar preguntas para una futura confirmación de disponibilidad.",
    ],
    scopingQuestions: [
      "¿La fotografía forma parte de los servicios actuales? Aún está pendiente de confirmación.",
      "¿Qué prueba publicada corresponde realmente a fotografía? Ninguna se presenta como sesión confirmada.",
      "¿Qué prioridades sí están publicadas? Edición, contenido con IA, planificación y producción selectiva de video.",
      "¿Cómo consultar sin asumir disponibilidad? Pregunta por los servicios confirmados y describe la meta visual.",
    ],
    projectFit:
      "Es un recurso de transparencia, no una página de reserva. Mantiene la ruta mientras Esteban confirma si la fotografía debe ofrecerse públicamente.",
    faqs: [
      {
        question: "¿Se puede reservar fotografía con Esteban?",
        answer:
          "La fotografía no se publica actualmente como servicio confirmado. Su disponibilidad sigue pendiente de una respuesta directa de Esteban.",
      },
      {
        question: "¿My D'ler demuestra una sesión fotográfica?",
        answer:
          "No. Ese proyecto verifica trabajo visual de marca, diseños sociales, video 3D y mockups; no se presenta como una sesión de fotografía.",
      },
    ],
  },
  {
    slug: "reels-para-negocios-miami",
    title: "Reels para negocios en Miami",
    metadataTitle: "Reels para Negocios en Miami",
    description:
      "Información sobre edición y producción selectiva de video corto para negocios de Miami-Dade, con atención principal en español.",
    eyebrow: "Instagram / TikTok / Shorts",
    h1: "Reels para negocios de Miami-Dade, con alcance por proyecto.",
    lead:
      "La edición de video corto es una prioridad confirmada de Esteban. Si una idea requiere grabación en Miami-Dade, la producción se considera de forma selectiva después de conocer la meta y la locación.",
    keyword: "reels para negocios Miami",
    location: "Miami-Dade",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Negocios con clips existentes que quieren explorar una edición.",
      "Marcas que necesitan pensar qué comunicar en video corto.",
      "Equipos latinos que prefieren una conversación de alcance en español.",
      "Proyectos que podrían requerir una captura local seleccionada.",
    ],
    scopingQuestions: [
      "¿Qué debe entender la audiencia en el video?",
      "¿Qué material ya está disponible?",
      "¿Dónde se publicaría el contenido?",
      "¿Qué formato, disponibilidad y alcance deben confirmarse?",
    ],
    projectFit:
      "Esta ruta ayuda a preparar una conversación sobre edición o captura selectiva de video corto. No fija duración, cantidad, formato ni fecha de entrega.",
    sections: [
      {
        heading: "Estructura de video corto para captar atención en Miami",
        paragraphs: [
          "En el mercado comercial de Miami-Dade, donde la atención en plataformas como Instagram, TikTok y YouTube Shorts es inmediata, un Reel efectivo no intenta resumir toda la historia de una empresa en 30 segundos. Cada video funciona mejor cuando se enfoca en un solo mensaje claro: resolver una duda puntual, demostrar el funcionamiento de un producto o presentar la experiencia que vive un cliente.",
          "Los primeros 2 a 3 segundos determinan si el usuario continúa viendo o desliza hacia la siguiente publicación. Por eso la edición prioriza ganchos visuales y verbales directos: mostrar el resultado final al inicio, formular una pregunta frecuente de clientes locales o iniciar con una acción dinámica que contextualice el negocio de inmediato.",
        ],
        bullets: [
          "Un solo beneficio, servicio o duda clave por cada pieza de video",
          "Gancho visual o verbal directo en los primeros 2 a 3 segundos",
          "Ritmo ágil con cortes y transiciones limpias cada 2 a 4 segundos",
          "Cierre con llamado a la acción concreto (visitar el local, enviar un mensaje o consultar el perfil)",
        ],
      },
      {
        heading: "Criterios técnicos: encuadre 9:16, zonas seguras y subtítulos dinámicos",
        paragraphs: [
          "El formato estándar para Reels y videos verticales es una resolución de 1080×1920 píxeles con una relación de aspecto 9:16. Sin embargo, las interfaces de Instagram y TikTok colocan botones de interacción (me gusta, comentarios, compartir) en el lateral derecho y la descripción con el audio en la franja inferior. Si los elementos clave o los subtítulos se ubican en esas áreas, la interfaz los oculta.",
          "Una postproducción cuidada mantiene los textos principales, logotipos y subtítulos dentro de la zona segura central (Safe Zone). Además, dado que gran parte de los usuarios reproduce videos en dispositivos móviles con el audio silenciado, la inclusión de subtítulos dinámicos y legibles asegura que el mensaje se transmita con claridad en cualquier contexto. Consulta nuestra [guía de formatos y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras) para conocer los márgenes recomendados.",
        ],
        bullets: [
          "Exportación en 1080×1920 (9:16) con compresión optimizada para redes móviles",
          "Respeto estricto de márgenes de seguridad para evitar solapamientos con la interfaz",
          "Subtitulado dinámico con tipografía legible y contraste sobre el fondo",
          "Ecualización y limpieza de voz para una escucha nítida en altavoces de teléfono",
        ],
      },
      {
        heading: "Flujo de postproducción remota y material existente",
        paragraphs: [
          "Muchas empresas de Miami ya cuentan con grabaciones realizadas con teléfonos inteligentes o cámaras propias en sus locales, eventos o demostraciones. A través de un flujo de postproducción remota, ese material se selecciona, recorta y transforma en piezas ágiles listas para publicar en redes sociales.",
          "El proceso inicia reuniendo los archivos de video en una carpeta compartida en la nube junto con una breve nota sobre el objetivo comercial de cada clip. Si quieres preparar tus archivos antes de enviarlos, revisa la [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video).",
        ],
        bullets: [
          "Selección de las mejores tomas y eliminación de silencios o pausas innecesarias",
          "Corrección básica de color para unificar clips grabados en distintos momentos",
          "Integración de identidad visual (paleta de colores, logotipo y estilo tipográfico)",
          "Preparación de versiones adaptadas para Instagram Reels, TikTok y YouTube Shorts",
        ],
      },
      {
        heading: "Producción selectiva en Miami-Dade y enfoque bilingüe",
        paragraphs: [
          "Cuando un proyecto requiere captura de tomas nuevas en locación dentro del condado de Miami-Dade, la producción se evalúa de forma selectiva considerando la locación, el tipo de negocio y la planificación del contenido dentro de las [áreas de servicio](/es/areas).",
          "En un entorno multicultural como el sur de la Florida, la comunicación directa en español facilita definir el tono, los ganchos y el estilo de cada video sin barreras de idioma, adaptando el contenido para audiencias hispanas o bilingües de la región.",
        ],
        bullets: [
          "Planificación de tomas en locación según el tipo de producto, local o servicio",
          "Comunicación fluida y directa en español durante todo el proceso de consulta y revisión",
          "Coordinación de cortes para audiencias hispanohablantes o bilingües en South Florida",
          "Enlace con proyectos reales del portafolio como [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) y [ML Colombia](/es/portafolio/ml-colombia)",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo pedir solo edición de reels si ya tengo los videos grabados?",
        answer:
          "Sí. La edición de video con material existente es una prioridad confirmada de Esteban. Puedes enviar tus grabaciones en vertical u horizontal a través de almacenamiento en la nube, y el alcance de edición, subtítulos y formato se define para cada proyecto.",
      },
      {
        question: "¿Qué formato y resolución se entregan los Reels?",
        answer:
          "Los videos se entregan en formato vertical 9:16 (1080×1920 px en MP4), respetando las zonas seguras de Instagram, TikTok y YouTube Shorts para que ningún texto o subtítulo quede tapado por botones de la plataforma.",
      },
      {
        question: "¿Los reels pueden ser bilingües o incluir subtítulos?",
        answer:
          "El español es el idioma principal de atención de Esteban y cuenta con inglés intermedio. Se pueden incorporar subtítulos dinámicos en español, inglés o versiones adaptadas según las necesidades de la audiencia del negocio en Miami.",
      },
      {
        question: "¿Se realiza grabación en locación para Reels en Miami-Dade?",
        answer:
          "La edición remota con material suministrado es el servicio prioritario confirmado. Si un proyecto en Miami-Dade necesita grabación en locación, la producción se evalúa de manera selectiva analizando el tipo de negocio, la locación y el alcance requerido.",
      },
      {
        question: "¿Qué tipo de videos cortos funcionan mejor para empresas locales en Miami?",
        answer:
          "Los formatos más efectivos para negocios locales son demostraciones breves de servicios o productos, respuestas directas a preguntas frecuentes de clientes, recorridos de instalaciones o locales comerciales, y clips testimoniales enfocados en un solo mensaje claro.",
      },
      {
        question: "¿Cómo se envían los archivos para comenzar un proyecto de edición?",
        answer:
          "Los archivos crudos se comparten mediante enlaces de servicios en la nube (como Google Drive o Dropbox), acompañados de notas sobre el objetivo del video y las referencias deseadas.",
      },
    ],
  },
  {
    slug: "video-para-restaurantes-miami",
    title: "Video para restaurantes en Miami",
    metadataTitle: "Video para Restaurantes en Miami",
    // SNIPPET TEST 2026-10-07 (GSC: video para restaurantes miami, 7 impr, pos 6.9, 0 clicks). Read GSC after 2026-11-10; if still 0 clicks, revert rather than iterate.
    description:
      "Edición de Reels y videos promocionales para restaurantes de Miami-Dade: platos estrella, ambiente del salón y promociones. Atención en español.",
    eyebrow: "Restaurantes / comida / hospitality",
    h1: "Video para restaurantes de Miami-Dade, evaluado proyecto por proyecto.",
    lead:
      "Esta página explica cómo iniciar una consulta de video para un restaurante. La edición está confirmada — los videos promocionales parten desde $240 por proyecto, con cotización a la medida — y una posible captura en locación se considera de forma selectiva; la fotografía no se presenta como servicio disponible.",
    keyword: "video para restaurantes Miami",
    location: "Miami-Dade",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes con material existente que necesita edición profesional.",
      "Dueños que quieren definir la meta antes de producir contenido nuevo.",
      "Equipos que prefieren explicar el proyecto en español.",
      "Ideas que requieren una captura local seleccionada en Miami-Dade.",
    ],
    scopingQuestions: [
      "¿Qué aspecto del restaurante necesita comunicar el video?",
      "¿Ya existe material grabado en cocina o salón?",
      "¿La idea requiere una locación en Miami-Dade?",
      "¿Qué uso, formato y disponibilidad deben confirmarse?",
    ],
    projectFit:
      "Es una guía para preparar una consulta sobre edición o producción selectiva de video para restaurantes. Para ideas de contenido gastronómico, consulta nuestra [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) o nuestra sección de [reels para negocios en Miami](/es/reels-para-negocios-miami).",
    sections: [
      {
        heading: "Estrategia de video gastronómico y dinámicas de restaurantes en Miami",
        paragraphs: [
          "Si publicas recomendaciones desde tu propia cuenta, consulta la [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami).",
          "El sector de restaurantes en Miami-Dade —desde Wynwood hasta Coral Gables, Doral y Miami Beach— compite en un entorno visual sumamente dinámico donde los comensales deciden dónde comer a través de videos cortos en Instagram y TikTok. Un video gastronómico efectivo no busca abarcar todo el menú en 30 segundos, sino despertar el apetito enfocándose en la preparación de platos estrella, la textura de los ingredientes y la atmósfera viva del salón.",
          "Para marcas gastronómicas que evalúan [video para restaurantes en Miami](/es/video-para-restaurantes-miami), estructurar el contenido con ganchos visuales en los primeros 3 segundos (como el corte de una carne jugosa, el vertido de una salsa o el humo saliendo de la parrilla) multiplica la retención de audiencia. Revisa nuestra [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes) para explorar formatos probados.",
        ],
        bullets: [
          "Enfoque en 1 o 2 platos insignia con primeros planos de emplatado y texturas",
          "Gancho sensorial directo en los primeros 2 a 3 segundos (humo, crujido, salsas)",
          "Captura del ambiente real y energía del salón en horas de servicio o brunch",
          "Llamado a la acción claro para reservas, visitas al local o pedidos directos",
        ],
      },
      {
        heading: "Criterios técnicos: planos detalle de cocina, ritmo ágil y zonas seguras 9:16",
        paragraphs: [
          "La postproducción de video gastronómico exige un cuidado meticuloso del color, el ritmo y el audio. Una correcta corrección de color resalta la frescura y calidez natural de los alimentos sin saturaciones artificiales que distorsionen el plato. Asimismo, el diseño sonoro —capturando el sonido del chisporroteo, el brindis de copas y el bullicio acogedor— transforma un clip ordinario en una experiencia sensorial inmersiva.",
          "En el formato vertical 1080×1920 (9:16), es fundamental respetar las zonas seguras centrales para que los textos, nombres de platillos y precios no queden cubiertos por los botones de interacción de Instagram o TikTok. Consulta nuestra [guía de formatos y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras) para detalles técnicos de exportación.",
        ],
        bullets: [
          "Resolución vertical 1080×1920 (9:16) con compresión optimizada para carga rápida móvil",
          "Corrección de color realista que potencia el apetito y la frescura de los ingredientes",
          "Respeto riguroso de zonas seguras evitando solapamiento con botones de redes sociales",
          "Diseño sonoro limpio con ecualización de audio ambiente y efectos de cocina",
        ],
      },
      {
        heading: "Flujo de postproducción remota con material propio del restaurante",
        paragraphs: [
          "Muchos restaurantes y chefs en Miami ya acumulan horas de grabaciones en alta calidad capturadas con teléfonos inteligentes o cámaras durante servicios, catas o eventos. A través de un flujo de edición remota, seleccionamos las mejores tomas, eliminamos partes innecesarias, aplicamos transiciones fluidas y añadimos subtítulos llamativos.",
          "El proceso comienza reuniendo los clips en una carpeta de Google Drive o Dropbox y compartiendo las prioridades del local. Para organizar tus archivos antes de enviarlos, revisa nuestra [guía de entrega para edición remota de video](/es/guias/entrega-para-edicion-remota-de-video).",
        ],
        bullets: [
          "Recepción de archivos crudos organizados por plato, evento o turno de servicio",
          "Edición dinámica y recorte de pausas para maximizar el ritmo y la atención",
          "Integración de logotipo, tipografía de marca y paleta cromática del restaurante",
          "Entrega de versiones listas para publicar en Instagram Reels, TikTok y YouTube Shorts",
        ],
      },
      {
        heading: "Captura selectiva en locación en Miami-Dade y atención directa en español",
        paragraphs: [
          "Cuando un restaurante en Miami requiere tomas nuevas en locación, la producción se evalúa de manera selectiva analizando la disponibilidad, el horario de cocina y el alcance del rodaje dentro de las [áreas de servicio](/es/areas). Grabar durante horas de preparación matutina o justo antes del servicio permite capturar al chef y los ingredientes con iluminación controlada sin interrumpir la operación del restaurante.",
          "Contar con atención directa en español facilita coordinar con el equipo de cocina y gerencia de forma rápida y fluida en el sur de la Florida. Conoce nuestro trabajo publicado en el sector con el proyecto [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) y explora también opciones complementarias como [fotografía de comida asistida por IA](/es/fotografia-de-comida-con-ia-restaurantes).",
        ],
        bullets: [
          "Coordinación de rodaje en cocina y salón adaptada a la dinámica del restaurante",
          "Planificación de lista de tomas (shot list) para optimizar el tiempo del chef y staff",
          "Atención directa y fluida en español para restaurantes del sur de la Florida",
          "Respaldo en proyectos reales verificados como [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey)",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo solicitar solo edición de video si ya grabamos material en la cocina o el salón?",
        answer:
          "Sí. La edición de video con material existente suministrado por el restaurante es un servicio prioritario confirmado. Puedes transferir tus grabaciones verticales u horizontales por la nube y realizamos la selección, ritmo, color, subtítulos y música para entrega en redes sociales.",
      },
      {
        question: "¿Qué tipo de videos funcionan mejor para atraer comensales en redes sociales en Miami?",
        answer:
          "Los formatos con mejor rendimiento en Miami son los clips de 15 a 30 segundos enfocados en el gancho sensorial de un plato estrella (humo, corte, queso derretido), recorridos de ambiente durante cenas o brunch de fin de semana, y videos breves del chef explicando el concepto o la recomendación de la casa.",
      },
      {
        question: "¿Se puede coordinar grabación en locación dentro de Miami-Dade?",
        answer:
          "La grabación en locación se evalúa de forma selectiva según el tipo de restaurante, la locación en Miami-Dade y el cronograma operativo del negocio. Se planifica en horarios convenientes para no interferir con el servicio a clientes.",
      },
      {
        question: "¿Los videos se entregan optimizados con subtítulos y formato vertical 9:16?",
        answer:
          "Sí. Todos los videos se entregan en formato vertical 1080×1920 (9:16) listos para Instagram Reels, TikTok y YouTube Shorts, respetando las zonas seguras para que los textos no queden cubiertos por botones de la interfaz.",
      },
      {
        question: "¿Cómo se coordinan las consultas y revisiones del proyecto?",
        answer:
          "Esteban atiende principalmente en español con nivel intermedio de inglés. Las consultas se inician compartiendo el objetivo del restaurante, el material disponible y la ubicación, lo que permite evaluar el alcance de forma clara y sin demoras.",
      },
      {
        question: "¿Esta página ofrece fotografía de alimentos o sesiones fotográficas?",
        answer:
          "No. La fotografía de alimentos tradicional sigue pendiente de confirmación y no se publica actualmente como servicio disponible. Para alternativas visuales digitales, puedes revisar [fotografía de comida con IA para restaurantes](/es/fotografia-de-comida-con-ia-restaurantes).",
      },
    ],
  },
  {
    slug: "drone-real-estate-miami",
    title: "Drone para real estate en Miami",
    metadataTitle: "Drone para Real Estate en Miami",
    description:
      "Ruta educativa heredada sobre drone para real estate en Miami-Dade. El trabajo aéreo no se publica actualmente como servicio confirmado.",
    eyebrow: "Ruta heredada / confirmación pendiente",
    h1: "Drone para real estate en Miami: disponibilidad pendiente de confirmación.",
    lead:
      "Esta URL se conserva para evitar confusión y explicar el estado real: la disponibilidad de trabajo con drone sigue pendiente de confirmación con Esteban. La página no ofrece vuelo, piloto, equipo ni tomas aéreas.",
    keyword: "drone real estate Miami",
    location: "Miami-Dade",
    availability: "pending-confirmation",
    icon: Home,
    bestFor: [
      "Entender por qué esta ruta heredada continúa publicada.",
      "Distinguir producción de video verificada de una muestra aérea.",
      "Revisar servicios actuales como edición y producción selectiva en tierra.",
      "Preparar preguntas para una futura confirmación de disponibilidad.",
    ],
    scopingQuestions: [
      "¿El trabajo con drone forma parte de los servicios actuales? Aún está pendiente de confirmación.",
      "¿El portafolio publicado incluye una muestra aérea? No se presenta ninguna como tal.",
      "¿Qué alternativas sí están confirmadas? Edición y producción selectiva de video en locación.",
      "¿Cómo consultar sin asumir disponibilidad? Describe la meta y pregunta por los servicios actuales.",
    ],
    projectFit:
      "Es un recurso de transparencia, no una página de reserva. Mantiene la ruta mientras Esteban confirma si el trabajo aéreo debe ofrecerse públicamente.",
    faqs: [
      {
        question: "¿Se puede reservar un vuelo con drone?",
        answer:
          "No se publica actualmente como servicio confirmado. La disponibilidad de trabajo aéreo sigue pendiente de una respuesta directa de Esteban.",
      },
      {
        question: "¿Los proyectos relacionados prueban trabajo aéreo o de real estate?",
        answer:
          "No. Los enlaces relacionados verifican producción y edición; no se presentan como vuelos con drone ni como proyectos de real estate.",
      },
    ],
  },
  {
    slug: "editor-de-video-real-estate-miami",
    title: "Editor de video para real estate en Miami",
    metadataTitle: "Editor de Video Real Estate en Miami",
    description:
      "Información sobre edición remota y producción selectiva de video para agentes inmobiliarios y marcas de real estate en South Florida.",
    eyebrow: "Real Estate / Bienes Raíces",
    h1: "Edición de video y Reels para real estate en South Florida.",
    lead:
      "La edición de video y contenido para redes es una prioridad confirmada de Esteban. Ayudamos a agentes y agencias inmobiliarias a estructurar recorridos y videos de propiedades a partir de su material grabado en nuestras [áreas de servicio](/es/areas).",
    keyword: "editor de video para real estate",
    location: "South Florida / Miami-Dade / Broward",
    availability: "confirmed",
    icon: Home,
    bestFor: [
      "Agentes de bienes raíces con tomas de propiedades listas para editar.",
      "Inmobiliarias que buscan publicar Reels y recorridos verticales con consistencia.",
      "Equipos que prefieren comunicar requerimientos y edición en español.",
      "Proyectos que requieren postproducción remota estructurada.",
    ],
    scopingQuestions: [
      "¿Ya tienes las tomas de la propiedad grabadas?",
      "¿Qué formato y canal de publicación necesitas (Reels 9:16, YouTube 16:9)?",
      "¿Requieres subtítulos, gráficos de marca o música de fondo?",
      "¿Cuál es la fecha límite para la publicación del inmueble?",
    ],
    projectFit:
      "Esta ruta conecta prioridades de edición remota con trabajo publicado de bienes raíces. No garantiza vuelos con drone ni tomas aéreas a menos que se confirmen de forma independiente.",
    sections: [
      {
        heading: "Las dos cosas que detienen una grabación inmobiliaria en South Florida",
        paragraphs: [
          "Casi todo el inventario de South Florida está en un edificio que controla alguien más, y buena parte queda bajo espacio aéreo controlado. Un condominio o HOA normalmente tiene que aprobar la grabación en áreas comunes, y varios edificios piden un certificado de seguro antes de que entre una cámara al lobby. Aparte, Fort Lauderdale, Miami y Opa-locka dejan gran parte del condado en espacio aéreo controlado, donde volar un dron exige autorización de la FAA por LAANC y no solo un piloto con licencia.",
        ],
        bullets: [
          "Pregunta por el permiso de grabación y el certificado de seguro al firmar el listing",
          "Revisa el espacio aéreo contra la dirección antes de prometer una toma aérea",
          "Ten una apertura a nivel de piso que funcione si el dron no vuela",
        ],
      },
      {
        heading: "Dos cortes de una sola grabación, porque el mercado es bilingüe",
        paragraphs: [
          "Un reel subtitulado solo en inglés le pide a una parte grande del comprador de South Florida más esfuerzo del que va a hacer. La versión económica no es una segunda grabación: es el mismo material con una segunda pista de subtítulos y un gancho pensado en español, porque la primera línea decide si se ve el resto. Cuando el agente habla español, un fragmento corto a cámara en español suele rendir más que un subtítulo traducido sobre audio en inglés.",
        ],
      },
      {
        heading: "Un corte para el MLS y otro para redes",
        paragraphs: [
          "Las reglas del material que se sindica por el MLS cambian según el MLS, y varios restringen la marca del agente, sus datos de contacto o llamados a la acción dentro del video del listing. Lo práctico son dos exportaciones de la misma edición: un corte sin marca para el listing y un corte con marca para redes. Decidirlo antes de editar evita reexportar una tanda completa después. Y en el contenido de vecindario conviene describir el lugar — amenidades, distancias, lo que físicamente hay — y no a la gente que vive ahí: la publicidad inmobiliaria está sujeta a las reglas de vivienda justa.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se incluye edición para Instagram Reels y TikTok?",
        answer:
          "Sí. Editamos material en formato vertical 9:16 optimizado para Reels, Shorts y TikTok con subtítulos legibles y cortes dinámicos.",
      },
      {
        question: "¿Esta página incluye tomas con drone?",
        answer:
          "No. El servicio aéreo sigue pendiente de confirmación. Esta página se enfoca en edición remota de video para bienes raíces.",
      },
    ],
  },
  {
    slug: "fotografia-de-producto-con-ia-miami",
    title: "Fotografía de producto con IA en Miami",
    metadataTitle: "Fotos de Producto con IA en Miami",
    description:
      "Creación de imágenes de producto e integraciones visuales asistidas por IA para marcas de e-commerce y negocios en Miami y Fort Lauderdale.",
    eyebrow: "Imágenes con IA / E-Commerce",
    h1: "Fotografía de producto e imágenes de marca asistidas por IA.",
    lead:
      "El desarrollo de contenido con IA es un servicio confirmado de Esteban. Ayudamos a marcas de e-commerce y tiendas locales a generar fondos, entornos y mockups de producto de alto impacto a partir de fotos de referencia reales.",
    keyword: "fotografía de producto con IA",
    location: "Miami-Dade / Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas de e-commerce que necesitan imágenes de catálogo y catálogo de producto.",
      "Emprendedores que buscan fondos de estilo de vida sin alquilar estudios costosos.",
      "Tiendas que prefieren coordinar requerimientos creativos en español.",
      "Proyectos visuales que requieren conceptos publicitarios modernos.",
    ],
    scopingQuestions: [
      "¿Tienes fotos originales del producto con buena resolución?",
      "¿Qué tipo de fondo o ambiente deseas generar con IA?",
      "¿En qué canales se utilizarán las imágenes (sitio web, Amazon, redes)?",
      "¿Qué estilo o paleta de colores representa tu marca?",
    ],
    projectFit:
      "Esta ruta explica el servicio de imágenes con IA combinando fotos reales del producto con generación asistida. No promete sesiones de fotografía tradicional en estudio a menos que se acuerden.",
    faqs: [
      {
        question: "¿Las imágenes con IA parecen reales?",
        answer:
          "Sí. Trabajamos utilizando fotos reales de tu producto como base para asegurar que el logo, los colores y las proporciones se mantengan exactos.",
      },
      {
        question: "¿Sirve para tiendas de Amazon o Shopify?",
        answer:
          "Totalmente. Creamos fondos de estilo de vida y mockups limpios optimizados para listados de e-commerce y publicidad digital.",
      },
    ],
  },
  {
    slug: "imagenes-con-ia-para-ecommerce-miami",
    title: "Imágenes con IA para e-commerce en Miami",
    metadataTitle: "Imágenes con IA para E-Commerce",
    description:
      "Generación de piezas visuales y mockups con IA para tiendas en línea, marcas direct-to-consumer y vendedores en South Florida.",
    eyebrow: "E-Commerce / Branding",
    h1: "Imágenes y gráficos con IA para tiendas en línea en South Florida.",
    lead:
      "Optimizamos la presencia visual de tiendas en línea mediante la edición y composición de imágenes con IA. Transforma tomas simples de producto en fotos de estilo de vida listas para publicar.",
    keyword: "imágenes con IA para e-commerce",
    location: "South Florida / Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Vendedores en línea que necesitan mejorar el aspecto visual de sus listados.",
      "Marcas que lanzan nuevos productos y requieren piezas publicitarias rápidamente.",
      "Equipos que prefieren comunicación directa en español.",
    ],
    scopingQuestions: [
      "¿Cuántos productos o referencias necesitas trabajar?",
      "¿Tienes guía de estilo de marca definida?",
      "¿Qué plataformas de venta utilizas?",
    ],
    projectFit:
      "Orientado a la creación y composición de piezas visuales digitales. My D'ler demuestra trabajo real de diseño de marca y mockups de producto.",
    faqs: [
      {
        question: "¿Se pueden crear fondos de temporada?",
        answer:
          "Sí. Es posible adaptar el entorno del producto para campañas navideñas, verano u ofertas especiales sin volver a fotografiar.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-dentistas-miami",
    title: "Marketing de video para dentistas en Miami",
    metadataTitle: "Video Marketing Dentistas Miami",
    description:
      "Edición de video y producción selectiva para clínicas dentales, odontólogos y centros de estética dental en South Florida.",
    eyebrow: "Salud & Salud Dental",
    h1: "Video marketing y contenido en redes para clínicas dentales.",
    lead:
      "El proyecto Healthy Smile demuestra experiencia real produciendo y editando contenido en video para clínicas dentales en Miami. Creamos videos informativos, testimoniales y contenido para redes que genera confianza.",
    keyword: "marketing de video para dentistas",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Consultorios odontológicos que desean explicar tratamientos en video.",
      "Clínicas dentales con tomas grabadas que necesitan edición profesional.",
      "Doctores que buscan atraer pacientes en el mercado hispano de Miami.",
    ],
    scopingQuestions: [
      "¿El video explicará procedimientos o testimonios de pacientes?",
      "¿Se grabará en la clínica o se editará material existente?",
      "¿Qué canales de difusión principales utilizarás?",
    ],
    projectFit:
      "Resaltado por el proyecto Healthy Smile en nuestro portafolio. Conecta edición de video profesional con comunicación en salud dental.",
    faqs: [
      {
        question: "¿Qué tipo de videos funcionan mejor para dentistas?",
        answer:
          "Los videos educativos cortos (explicación de carillas, alineadores o blanqueamiento) y los sketches breves generan gran interacción y confianza.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-abogados-miami",
    title: "Marketing de video para abogados en Miami",
    metadataTitle: "Video Marketing Abogados Miami",
    description:
      "Edición de video profesional y contenido para firmas legales, abogados y despachos de abogados en Miami y Fort Lauderdale.",
    eyebrow: "Servicios Legales / Firmas",
    h1: "Video marketing y Reels educativos para abogados y firmas legales.",
    lead:
      "Estructuramos y editamos videos educativos para abogados y firmas de abogados en South Florida. Convierte conceptos legales complejos en mensajes claros y profesionales para redes sociales.",
    keyword: "marketing de video para abogados",
    location: "Miami-Dade / Broward County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Abogados que comparten consejos legales y respuestas frecuentes en redes.",
      "Firmas que buscan mantener presencia constante en Instagram, YouTube y LinkedIn.",
      "Despachos que requieren atención y edición bilingüe (español e inglés).",
    ],
    scopingQuestions: [
      "¿Qué especialidad legal abordará el contenido (inmigración, accidentes, corporativo)?",
      "¿Cuentas con guion o temas prioritarios a tratar?",
      "¿Deseas formato vertical para Reels o formato horizontal para sitio web?",
    ],
    projectFit:
      "Enfocado en edición y estructuración de contenido profesional legal. Mantiene la voz seria y transparente que exige la industria.",
    faqs: [
      {
        question: "¿Cómo se mantiene la imagen profesional del despacho?",
        answer:
          "Cuidamos el ritmo, la tipografía de marca y los subtítulos para que el video mantenga la sobriedad y la autoridad que exige el sector legal.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-clinicas-esteticas-miami",
    title: "Marketing de video para clínicas estéticas en Miami",
    metadataTitle: "Video Marketing Estéticas Miami",
    description:
      "Edición de video y Reels para med spas, clínicas estéticas y centros de dermatología cosmética en Miami y Fort Lauderdale.",
    eyebrow: "Med Spa / Estética",
    h1: "Video marketing y Reels para clínicas estéticas y med spas.",
    lead:
      "El contenido en video es clave para generar confianza en procedimientos estéticos. Editamos tomas de tratamientos, instalaciones y antes/después para publicaciones dinámicas en Instagram y TikTok.",
    keyword: "marketing de video para med spas",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Clínicas estéticas y med spas con tomas de instalaciones y procedimientos.",
      "Centros cosméticos que desean explicar tratamientos antiedad e inyectables en video.",
      "Marcas de belleza que buscan interacción constante en el mercado de Miami.",
    ],
    scopingQuestions: [
      "¿Qué tratamientos estéticos principales deseas promocionar?",
      "¿Tienes permisos firmados de pacientes para mostrar tratamientos?",
      "¿Prefieres edición de clips existentes o planificación de grabación?",
    ],
    projectFit:
      "Conecta postproducción de video profesional con comunicación ética en salud estética.",
    faqs: [
      {
        question: "¿Qué formato de video funciona mejor para med spas?",
        answer:
          "Los videos verticales en 9:16 con subtítulos dinámicos que muestran el paso a paso del tratamiento y recomendaciones de cuidado posterior.",
      },
    ],
  },
  {
    slug: "reutilizacion-de-contenido-para-redes-miami",
    title: "Reutilización de contenido de video en Miami",
    metadataTitle: "Repurposing de Video para Redes",
    description:
      "Transforma videos largos, webinars o podcasts en Reels, Shorts y clips para redes sociales con edición profesional.",
    eyebrow: "Repurposing / Edición",
    h1: "Transforma videos largos en decenas de clips para redes sociales.",
    lead:
      "La reutilización de contenido (repurposing) es una prioridad confirmada de Esteban. Convertimos ponencias, podcasts y videos de YouTube en piezas verticales optimizadas para Reels y TikTok.",
    keyword: "reutilización de contenido de video",
    location: "Miami-Dade / Fort Lauderdale / Remote",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Creadores y empresas con webinars, conferencias o podcasts grabados.",
      "Marcas que buscan multiplicar sus publicaciones sin grabar nuevo contenido.",
      "Equipos que necesitan selección de momentos clave y subtítulos dinámicos.",
    ],
    scopingQuestions: [
      "¿De qué duración son tus videos fuente?",
      "¿Cuántos clips cortos por video esperas extraer?",
      "¿Cuentas con elementos de marca (logos, colores, tipografías)?",
    ],
    projectFit:
      "Enfocado en edición remota eficiente sobre material existente grabado por el cliente.",
    faqs: [
      {
        question: "¿Qué tipo de videos largos se pueden transformar?",
        answer:
          "Webinars, entrevistas, conferencias, episodios de podcast y videos largos de YouTube.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-pequenos-negocios-miami",
    title: "Producción de video para pequeños negocios en Miami",
    metadataTitle: "Video para Pequeños Negocios",
    description:
      "Edición de video y producción adaptable para PyMEs, emprendedores y negocios locales en Miami y Fort Lauderdale.",
    eyebrow: "Negocios Locales / PyMEs",
    h1: "Videos promocionales y contenido social para pequeños negocios.",
    lead:
      "Ayudamos a pequeños negocios locales a comunicarse profesionalmente en video. Desde la edición de clips grabados con smartphone hasta videos de presentación de marca.",
    keyword: "video para pequeños negocios",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Emprendedores que lanzan un producto o servicio local.",
      "Negocios familiares que desean aumentar su visibilidad en redes sociales.",
      "Empresas locales que prefieren asesoría directa y bilingüe.",
    ],
    scopingQuestions: [
      "¿Cuál es el objetivo principal del video (ventas, concientización, contratación)?",
      "¿Dispones de material propio o requieres planificación de producción?",
    ],
    projectFit:
      "Edición y postproducción accesible y transparente estructurada por proyecto.",
    faqs: [
      {
        question: "¿Es necesario contar con equipo profesional para grabar?",
        answer:
          "No siempre. Un smartphone moderno con buena iluminación natural puede generar excelentes tomas que nosotros transformamos con edición profesional.",
      },
    ],
  },
  {
    slug: "fotos-con-ia-para-bienes-raices-miami",
    title: "Fotos con IA para bienes raíces en Miami",
    metadataTitle: "Fotos con IA Bienes Raíces Miami",
    description:
      "Mejora visual de imágenes inmobiliarias y ambientación virtual con IA para agentes y propiedades en South Florida.",
    eyebrow: "Real Estate / IA Visual",
    h1: "Fotos e imágenes con IA para inmuebles y bienes raíces.",
    lead:
      "Ayudamos a agentes inmobiliarios a retocar y generar fondos de ambientación limpia para propiedades mediante herramientas visuales asistidas por IA.",
    keyword: "fotos con IA para bienes raíces",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Agentes de bienes raíces que necesitan retocar imágenes de propiedades.",
      "Inmobiliarias que buscan presentar ambientes iluminados y limpios.",
    ],
    scopingQuestions: [
      "¿Las tomas del inmueble están listas para retocar?",
      "¿Qué elementos deseas mejorar (iluminación, cielo, fondos)?",
    ],
    projectFit:
      "Resaltado por el trabajo de guion y edición de [Homeowners](/es/portafolio/homeowners) en el sector inmobiliario.",
    faqs: [
      {
        question: "¿Se altera la estructura real de la propiedad?",
        answer:
          "No. Se optimizan la iluminación, cielos y entornos conservando la distribución exacta de la propiedad.",
      },
    ],
  },
  {
    slug: "fotografia-de-comida-con-ia-restaurantes",
    title: "Fotografía de comida con IA para restaurantes",
    metadataTitle: "Fotos de Comida con IA Restaurantes",
    description:
      "Creación de piezas visuales de platillos y menús asistidas por IA para restaurantes y marcas gastronómicas en Miami.",
    eyebrow: "Gastronomía / IA Visual",
    h1: "Fotografía de comida e imágenes de menú asistidas por IA.",
    lead:
      "El proyecto Bar Door Monkey demuestra trabajo real de producción y contenido gastronómico. Generamos fondos y composiciones visuales de estilo de vida para restaurantes. Para producción y edición en movimiento, consulta nuestro servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    keyword: "fotografía de comida con IA",
    location: "Miami-Dade / Fort Lauderdale",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes que lanzan nuevos platillos o promociones de temporada.",
      "Marcas gastronómicas que necesitan contenido constante para redes sociales.",
    ],
    scopingQuestions: [
      "¿Tienes fotos originales de los platillos?",
      "¿En qué plataformas publicarás el menú o las fotos?",
    ],
    projectFit:
      "Combina fotos reales de platillos con entornos visuales atractivos. Si además cuentas con tomas de cocina o salón, revisa nuestras opciones de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    faqs: [
      {
        question: "¿El platillo se sigue viendo real?",
        answer:
          "Sí. Usamos la foto real del plato preparado como ancla y generamos el entorno de mesa o restaurante.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-contratistas-miami",
    title: "Marketing de video para contratistas en Miami",
    metadataTitle: "Video Marketing Contratistas Miami",
    description:
      "Edición de video y proyectos promocionales para contratistas, remodeladores y servicios del hogar en South Florida.",
    eyebrow: "Servicios del Hogar / Contratistas",
    h1: "Videos de proyectos y transformaciones para contratistas.",
    lead:
      "Muestra la calidad de tu trabajo de remodelación y construcción. Editamos clips de antes y después, testimoniales de clientes y explicaciones de proyectos.",
    keyword: "marketing de video para contratistas",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Contratistas generales, pintores, techadores y remodeladores de cocinas/baños.",
      "Empresas de servicios que desean mostrar proyectos terminados.",
    ],
    scopingQuestions: [
      "¿Tienes videos o fotos del proceso de remodelación (antes y después)?",
      "¿Prefieres edición de clips en teléfono o planificar tomas en sitio?",
    ],
    projectFit:
      "Edición estructurada remota para contratistas locales.",
    faqs: [
      {
        question: "¿Funciona para mostrar proyectos de remodelación?",
        answer:
          "Excelente. Los videos de 'antes y después' son el formato de mayor conversión para contratistas.",
      },
    ],
  },
  {
    slug: "fotografo-de-retratos-y-headshots-miami",
    title: "Fotógrafo de retratos y headshots en Miami",
    metadataTitle: "Retratos y Headshots Miami",
    description:
      "Retratos profesionales y headshots para ejecutivos, abogados, agentes inmobiliarios y marcas personales en Miami.",
    eyebrow: "Retratos / Marca Personal",
    h1: "Headshots profesionales y retratos corporativos.",
    lead:
      "Fotografía y retoque de retratos ejecutivos y headshots profesionales para perfiles de LinkedIn, sitios web corporativos y tarjetas de presentación.",
    keyword: "fotógrafo de headshots en Miami",
    location: "Miami-Dade / Fort Lauderdale",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Ejecutivos y emprendedores que actualizan su perfil profesional.",
      "Agentes de bienes raíces y abogados que necesitan una imagen de confianza.",
    ],
    scopingQuestions: [
      "¿La sesión será en estudio, oficina o locación exterior?",
      "¿Cuántas personas necesitan headshot?",
    ],
    projectFit:
      "Sesiones de retratos agendadas por proyecto en South Florida.",
    faqs: [
      {
        question: "¿Se incluye retoque fotográfico digital?",
        answer:
          "Sí. Cada retrato final seleccionado incluye retoque discreto de piel y color.",
      },
    ],
  },
  {
    slug: "editor-de-video-corto-para-redes-miami",
    title: "Editor de video corto para redes en Miami",
    metadataTitle: "Editor de Video Corto Reels Miami",
    description:
      "Edición especializada en Reels, Shorts y TikTok para creadores, marcas y empresas en South Florida.",
    eyebrow: "Video Corto / Reels",
    h1: "Edición de Reels, TikToks y YouTube Shorts.",
    lead:
      "Editamos videos verticales en formato 9:16 con cortes dinámicos, subtítulos legibles y ritmos que mantienen la retención de audiencia.",
    keyword: "editor de video corto",
    location: "Miami-Dade / Broward / Remote",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Creadores de contenido y empresas que publican Reels y Shorts diariamente.",
      "Marcas que buscan mantener consistencia visual en redes sociales.",
    ],
    scopingQuestions: [
      "¿Cuántos videos cortos al mes planeas publicar?",
      "¿Cuentas con la plantilla o estilo gráfico de tu marca?",
    ],
    projectFit:
      "Servicio central de edición remota de video corto.",
    faqs: [
      {
        question: "¿Incluye subtítulos animados?",
        answer:
          "Sí. Todos los videos cortos incluyen subtítulos legibles optimizados para reproducción sin sonido.",
      },
    ],
  },
  {
    slug: "produccion-de-video-palm-beach-county",
    title: "Producción de video en Palm Beach",
    metadataTitle: "Producción de Video Palm Beach",
    description:
      "Producción de video, comerciales y contenido para marcas y empresas en Palm Beach County.",
    eyebrow: "Palm Beach County",
    h1: "Producción de video y contenido comercial en Palm Beach.",
    lead:
      "Ofrecemos planificación, videografía y postproducción para marcas, empresas inmobiliarias y negocios locales en el condado de Palm Beach.",
    keyword: "producción de video en Palm Beach",
    location: "Palm Beach County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Marcas y empresas en el área de Palm Beach que necesitan comerciales y videos corporativos.",
      "Agentes inmobiliarios y negocios en Palm Beach County.",
    ],
    scopingQuestions: [
      "¿El video se filmará en locación en el condado o requieres edición remota?",
      "¿Cuáles son los entregables finales necesarios?",
    ],
    projectFit:
      "Cobertura directa en Palm Beach County respaldada por portafolio publicado.",
    faqs: [
      {
        question: "¿Tienen cobertura en el condado de Palm Beach?",
        answer:
          "Sí. Ofrecemos producción en sitio y edición remota para proyectos en el condado de Palm Beach.",
      },
    ],
  },
  {
    slug: "edicion-de-video-palm-beach-county",
    title: "Edición de video en Palm Beach County",
    metadataTitle: "Edición de Video Palm Beach",
    description:
      "Servicio de edición remota de video para empresas y creadores en Palm Beach County.",
    eyebrow: "Palm Beach County",
    h1: "Edición de video profesional en Palm Beach County.",
    lead:
      "Edición remota de video para empresas, negocios locales y creadores en el condado de Palm Beach. Optimiza tu material bruto en piezas listas para publicar.",
    keyword: "edición de video en Palm Beach",
    location: "Palm Beach County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Negocios en el área de Palm Beach que cuentan con grabaciones y necesitan edición.",
      "Creadores de contenido y empresas en Palm Beach County.",
    ],
    scopingQuestions: [
      "¿En qué formato tienes el material grabado?",
      "¿Cuál es el calendario de entregas de tu proyecto?",
    ],
    projectFit:
      "Edición remota y eficiente sin requerir desplazamientos.",
    faqs: [
      {
        question: "¿Cómo se envían los archivos pesados desde Palm Beach?",
        answer:
          "Utilizamos enlaces seguros de Dropbox o Frame.io para una transferencia rápida de material.",
      },
    ],
  },
  {
    slug: "produccion-de-video-doral-miami",
    title: "Producción de video en Doral Miami",
    metadataTitle: "Producción de Video Doral Miami",
    description:
      "Producción y edición de video para empresas B2B, distribuidores y marcas comerciales en Doral y Miami.",
    eyebrow: "Doral / B2B Commercial",
    h1: "Producción de video y contenido comercial en Doral.",
    lead:
      "Ofrecemos servicios de producción, videografía corporativa y edición remota para distribuidores, agencias de logística y marcas comerciales en Doral.",
    keyword: "producción de video en Doral",
    location: "Doral / Miami-Dade",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Empresas de logística, importación y distribuidores en Doral.",
      "Marcas B2B que necesitan videos de producto y corporativos.",
    ],
    scopingQuestions: [
      "¿El video se filmará en almacén/oficina en Doral o es edición de material existente?",
      "¿En qué idiomas se distribuirá el video?",
    ],
    projectFit:
      "Atención directa y bilingüe para empresas en la zona comercial de Doral.",
    faqs: [
      {
        question: "¿Atienden proyectos corporativos en Doral?",
        answer:
          "Sí. Contamos con cobertura de grabación en sitio y edición remota para empresas en Doral y el oeste de Miami-Dade.",
      },
    ],
  },
  {
    slug: "video-inmobiliario-coral-gables",
    title: "Video inmobiliario en Coral Gables",
    metadataTitle: "Video Inmobiliario Coral Gables",
    description:
      "Producción y edición de video de lujo para propiedades residenciales y comerciales en Coral Gables.",
    eyebrow: "Coral Gables / Real Estate",
    h1: "Videos de propiedades de lujo en Coral Gables.",
    lead:
      "Editamos y estructuramos recorridos visuales de alta calidad para agentes de bienes raíces y firmas inmobiliarias en Coral Gables.",
    keyword: "video inmobiliario en Coral Gables",
    location: "Coral Gables / Miami-Dade",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Agentes de bienes raíces de lujo en Coral Gables.",
      "Desarrolladores e inmobiliarias en el sur de Miami.",
    ],
    scopingQuestions: [
      "¿Las tomas de la propiedad ya fueron grabadas?",
      "¿Requieres edición para Instagram Reels o formato horizontal de alta resolución?",
    ],
    projectFit:
      "Resaltado por el trabajo de edición publicado en el sector inmobiliario.",
    faqs: [
      {
        question: "¿Incluye edición de música y color de lujo?",
        answer:
          "Sí. Cada video inmobiliario se entrega con corrección de color profesional y diseño sonoro adecuado para propiedades de alto valor.",
      },
    ],
  },
  {
    slug: "video-para-yates-y-hospitalidad-fort-lauderdale",
    title: "Video para yates y hospitalidad en Fort Lauderdale",
    metadataTitle: "Video para Yates y Hospitalidad",
    description:
      "Video para yates y hospitalidad en Fort Lauderdale. Edición promocional para chárteres náuticos, brokers marinos y turismo con material del cliente.",
    eyebrow: "Fort Lauderdale / Náutica",
    h1: "Videos promocionales para yates, marinos y hospitalidad.",
    lead:
      "Fort Lauderdale es la capital náutica de Florida. Editamos y producimos contenido audiovisual para servicios de chárter, brokers marinos, hoteles y marcas náuticas a partir de material suministrado por el cliente. Consulta guías especializadas como [guías de edición de video con dron en Florida](/es/guias/guias-de-edicion-de-video-con-dron-florida) y [entrega para edición remota de video](/es/guias/entrega-para-edicion-remota-de-video).",
    keyword: "video para yates en Fort Lauderdale",
    location: "Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Empresas de chárter de yates y servicios marítimos en Fort Lauderdale.",
      "Hoteles y restaurantes frente al mar en Broward.",
    ],
    scopingQuestions: [
      "¿El material en video se grabó en marina, en navegación o incluye tomas aéreas?",
      "¿Requieres versiones verticales 9:16 para Instagram/TikTok y horizontales 16:9 para web?",
    ],
    projectFit:
      "Postproducción y edición de estilo de vida náutico en Fort Lauderdale y South Florida. Demostrado por el proyecto [Banacol](/es/portafolio/banacol) con cinematografía aérea en mar abierto.",
    faqs: [
      {
        question: "¿Qué tipo de material puede suministrar una empresa de chárter o corretaje náutico?",
        answer:
          "Las empresas náuticas suministran material grabado por el cliente: tomas con dron, recorridos de cabina, navegación en aguas abiertas, deportes acuáticos, momentos de hospitalidad y tomas del capitán. Incluir logotipos y especificaciones de la embarcación ayuda a estructurar la edición.",
      },
      {
        question: "¿Cómo optimizan el audio con ruido de viento, oleaje y motores marinos?",
        answer:
          "Aplicamos reducción de ruido y ecualización para limpiar voces y diálogos, atenuamos el rugido de motores e integramos capas de sonido ambiental marino junto a música con licencia comercial adaptada a marcas de lujo.",
      },
      {
        question: "¿Pueden editar y estabilizar tomas aéreas capturadas desde embarcaciones?",
        answer:
          "Sí. Estabilizamos clips aéreos suministrados por el cliente y aplicamos corrección de color para balancear la luz solar intensa, reflejos sobre el agua y tonos de madera teca en cubierta.",
      },
      {
        question: "¿Se entregan versiones para redes sociales y páginas web de corretaje?",
        answer:
          "Sí. Entregamos versiones 16:9 en alta resolución para sitios web y portales de chárter, además de cortes verticales 9:16 para Instagram Reels, TikTok y anuncios digitales.",
      },
      {
        question: "¿Cómo funciona el proceso de envío de archivos y revisiones?",
        answer:
          "Los archivos de video y tomas aéreas se comparten mediante transferencia segura en la nube. Tras la primera entrega, puedes enviar comentarios consolidados con marcas de tiempo para ajustar ritmo, música y llamadas a la acción.",
      },
    ],
  },
  {
    slug: "video-corporativo-distrito-financiero-miami",
    title: "Video corporativo en el centro financiero de Miami",
    metadataTitle: "Video Corporativo Miami",
    description:
      "Producción de video corporativo, testimoniales y contenido para firmas financieras y empresas en Miami.",
    eyebrow: "Miami / Corporativo",
    h1: "Videos corporativos y de presentación en Miami.",
    lead:
      "Edición de video profesional y testimoniales ejecutivos para firmas financieras, startups tecnológicas y empresas en el centro financiero de Miami.",
    keyword: "video corporativo en Miami",
    location: "Downtown Miami / Financial District",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Firmas de servicios profesionales, legales y financieras en Miami.",
      "Empresas tecnológicas que necesitan videos de presentación ejecutiva.",
    ],
    scopingQuestions: [
      "¿Se grabarán testimoniales de ejecutivos u operaciones en oficina?",
      "¿Requieren subtítulos en inglés y español?",
    ],
    projectFit:
      "Comunicación corporativa bilingüe de alto nivel.",
    faqs: [
      {
        question: "¿Ofrecen servicios de subtitulado bilingüe?",
        answer:
          "Sí. Proporcionamos archivos con subtítulos sincronizados en ambos idiomas para distribución corporativa.",
      },
    ],
  },
  {
    slug: "video-para-pequenos-negocios-pembroke-pines",
    title: "Video para pequeños negocios en Pembroke Pines",
    metadataTitle: "Video Pequeños Negocios Pines",
    description:
      "Edición de video y contenido promocional para pequeños negocios de Pembroke Pines, con atención remota desde Fort Lauderdale.",
    eyebrow: "Pembroke Pines / Broward",
    h1: "Videos promocionales para negocios locales en Pembroke Pines.",
    lead:
      "Esteban Moreno Media atiende consultas de emprendedores y pequeños negocios de Pembroke Pines desde Fort Lauderdale. El alcance puede incluir edición de material del cliente, planificación social y grabación en locación evaluada por proyecto.",
    keyword: "video para pequeños negocios en Pembroke Pines",
    location: "Pembroke Pines / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Comercios, clínicas locales y empresas de servicios en Pembroke Pines.",
      "Negocios familiares que buscan presencia activa en Instagram y Facebook.",
    ],
    scopingQuestions: [
      "¿Dispones de grabaciones cortas grabadas en tu local?",
      "¿Qué oferta o servicio deseas promocionar?",
    ],
    projectFit:
      "Edición de material entregado por el cliente y, según el alcance, planificación social o producción en locación evaluada por proyecto.",
    faqs: [
      {
        question: "¿Cómo funciona el servicio si estoy en Pembroke Pines?",
        answer:
          "Puedes comenzar con un brief y material ya grabado. Esteban trabaja desde Fort Lauderdale; cualquier grabación en locación se evalúa según el alcance del proyecto.",
      },
      {
        question: "¿El portafolio incluye un proyecto hecho en Pembroke Pines?",
        answer:
          "No se presenta un proyecto de Pembroke Pines. Bar Door Monkey es un ejemplo publicado en Miami que verifica videografía y edición para un video promocional de un negocio local, sin afirmar resultados comerciales.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-cirugia-plastica-miami",
    title: "Marketing de video para cirugía plástica en Miami",
    metadataTitle: "Video Cirugía Plástica Miami",
    description:
      "Edición de video confidencial y elegante para clínicas de cirugía plástica y medicina estética en Miami.",
    eyebrow: "Cirugía Plástica / Estética",
    h1: "Marketing de video para cirujanos plásticos en Miami.",
    lead:
      "Editamos videos explicativos, testimoniales de pacientes y contenido educativo para cirujanos plásticos y centros quirúrgicos en Miami.",
    keyword: "video para cirugía plástica en Miami",
    location: "Miami / Coral Gables",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Cirujanos plásticos y clínicas de medicina estética en Miami.",
      "Centros quirúrgicos que buscan educar a pacientes potenciales.",
    ],
    scopingQuestions: [
      "¿El video se enfocará en consultas, explicaciones médicas o instalaciones?",
      "¿Cuentas con consentimiento de pacientes para testimoniales?",
    ],
    projectFit:
      "Edición estética de alta confidencialidad y elegancia visual.",
    faqs: [
      {
        question: "¿Mantienen privacidad estricta en el manejo de grabaciones?",
        answer:
          "Absolutamente. Todo el material clínico se procesa mediante almacenamiento cifrado con total confidencialidad.",
      },
    ],
  },
  {
    slug: "fotografia-de-joyas-y-lujo-miami",
    title: "Fotografía de joyas y productos de lujo en Miami",
    metadataTitle: "Fotografía Joyas Lujo Miami",
    description:
      "Fotografía asistida por IA y retoque comercial para joyería, relojes y artículos de lujo en Miami.",
    eyebrow: "Joyería / Marca de Lujo",
    h1: "Fotografía de productos de lujo y joyería en Miami.",
    lead:
      "Generamos imágenes comerciales hiperrealistas y retoque de alta resolución para marcas de joyas, relojes y lujo en Miami.",
    keyword: "fotografía de joyas en Miami",
    location: "Miami / Doral",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Joyeros, diseñadores y marcas de artículos de lujo.",
      "Tiendas e-commerce de joyería fina en South Florida.",
    ],
    scopingQuestions: [
      "¿Deseas fotografía macro en estudio o generación de escenarios de lujo con IA?",
      "¿En qué resolución e-commerce requieres las imágenes?",
    ],
    projectFit:
      "Imágenes de producto impecables optimizadas con herramientas de IA.",
    faqs: [
      {
        question: "¿Se pueden crear fondos de lujo con IA sin enviar la pieza física?",
        answer:
          "Sí. Con fotografías base nítidas de la joya, podemos componer fondos e iluminación de nivel editorial utilizando IA.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-gimnasios-miami",
    title: "Marketing de video para gimnasios y fitness en Miami",
    metadataTitle: "Video Fitness Gimnasios Miami",
    description:
      "Edición de video dinámico y promocionales para gimnasios, estudios de pilates y entrenadores en Miami.",
    eyebrow: "Fitness / Gimnasios",
    h1: "Videos dinámicos para gimnasios y centros de entrenamiento.",
    lead:
      "Edición de alto impacto y cortes para redes sociales diseñados para captar nuevos miembros en gimnasios y centros fitness de Miami.",
    keyword: "video para gimnasios en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Gimnasios, boxes de CrossFit y estudios de Pilates en Miami.",
      "Entrenadores personales que buscan construir su marca en redes sociales.",
    ],
    scopingQuestions: [
      "¿Deseas promocionar instalaciones, entrenamientos o testimoniales de alumnos?",
      "¿El video irá destinado a Reels de Instagram o anuncios pagados?",
    ],
    projectFit:
      "Edición rítmica con música de alta energía y títulos dinámicos.",
    sectionsDisclosure: "Precios y qué grabar primero",
    updated: "2026-10-07",
    sections: [
      {
        heading: "¿Cuánto cuesta un video promocional para un gimnasio en Miami?",
        paragraphs: [
          `Si tus entrenadores ya graban con el teléfono, la edición empieza desde ${esStarterFrom} por proyecto con el [paquete Arranque](/es/precios/arranque): edición remota, formato para Reels, TikTok, YouTube o web y una ronda de revisión. Para un promocional corto o un anuncio para redes, la banda de edición corta de la calculadora es de ${esSocialBand} por proyecto. Las dos cifras son orientativas: son tarifas de un editor independiente con un descuento de introducción aplicado, y la cotización por escrito fija el alcance real.`,
          "El precio cambia con tres cosas: cuánto material bruto hay, cuántas versiones terminadas necesitas (un anuncio de 30 segundos y tres cortes verticales son cuatro entregables, no uno) y si hay que grabar algo. Un gimnasio que envía clips ordenados y una indicación clara queda en la parte baja de la banda.",
        ],
      },
      {
        heading: "¿Cuánto cuesta grabar en el gimnasio o el estudio?",
        paragraphs: [
          `La grabación en sitio va por [Presencia Local](/es/precios/presencia-local), desde ${esLocalFrom} por día de producción. Incluye preproducción, captura en locación, edición posterior y entregables según formato, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. Existe además un complemento de media jornada de captura con un rango orientativo de ${esHalfDayBand}, con la misma base. No se suman: son dos maneras distintas de cotizar la misma necesidad.`,
          "Una grabación en un gimnasio es más fácil de cotizar cuando el horario está decidido de antemano: qué clase, a qué hora, qué entrenadores y si habrá miembros en cuadro. Las horas tranquilas hacen la grabación más rápida y eliminan casi todas las dudas de permiso. Envía ese horario con la solicitud.",
        ],
      },
      {
        heading: "¿Cuánto cuesta un plan mensual de contenido para un gimnasio?",
        paragraphs: [
          `Para un gimnasio que quiere publicar cada semana y no una sola vez, el [plan Crecimiento](/es/precios/crecimiento) empieza desde ${esGrowthFrom} al mes. Incluye plan de contenido, calendario de publicación, edición y reporte mensual. Encaja con un estudio que ya graba clases y entrenadores pero no tiene a nadie encargado de convertir esos clips en publicaciones constantes.`,
          "Un plan mensual solo funciona si el material sigue llegando. La rutina más simple es un bloque de grabación por semana, reunido en una carpeta compartida, con una línea por clip que diga quién aparece y si dio permiso. Si no sabes qué ruta te conviene, compáralas en la [calculadora](/es/calculadora) y luego pide una cotización por escrito en [contacto](/es/contacto).",
        ],
      },
      {
        heading: "¿Qué debe grabar primero un gimnasio, un entrenador o un estudio de pilates?",
        paragraphs: [
          "Lo que pone nervioso a un miembro nuevo. Para un gimnasio suele ser el espacio a una hora normal y cómo es la primera sesión; para un entrenador personal, cómo transcurre de verdad una sesión; para un estudio de yoga o pilates, el formato de la clase y el equipo. Graba una toma de cada cosa desde una posición fija y estable, sin perseguir momentos a pulso.",
          "Dos reglas ahorran casi todas las correcciones. Primero, pregunta antes de grabar a alguien: quien entrena no aceptó aparecer en una cuenta de negocio por entrar al gimnasio, así que anota quién dijo sí y envía la nota con los clips. Segundo, envía los archivos originales del teléfono o la cámara, no copias guardadas desde una app de mensajería, que ya perdieron detalle.",
        ],
      },
      {
        heading: "¿Qué trabajos de fitness hay en el portafolio de Esteban?",
        paragraphs: [
          "Dos marcas de entrenamiento, y los dos proyectos son web, no son video. [Gains From Geebs](/es/portafolio/gains-from-geebs) es una plataforma web interactiva de fitness con un bot de IA para Instagram DM que atiende consultas sobre planes de entrenamiento y nutrición y califica prospectos. [TitanForge](/es/portafolio/titanforge) es una plataforma web con un bot conversacional para calificar prospectos, agendar y registrar clientes.",
          "El trabajo grabado más cercano es [Healthy Smile Miami](/es/portafolio/healthy-smile): videos para redes de una clínica dental de Miami, donde Esteban grabó en el lugar, video y sonido, y luego editó y entregó las piezas. Una clínica en funcionamiento y un gimnasio abierto comparten las mismas limitaciones: clientes reales, poco tiempo y un espacio que no puede cerrar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Incluyen música libre de derechos para redes sociales?",
        answer:
          "Sí. La música se elige para la plataforma donde se publicará el video, y para anuncios pagados el negocio confirma los derechos de uso antes de publicar.",
      },
    ],
  },
  {
    slug: "videografo-para-eventos-corporativos-miami",
    title: "Videógrafo para eventos corporativos en Miami",
    metadataTitle: "Video Eventos Corporativos Miami",
    description:
      "Grabación en sitio y edición de resumen de eventos corporativos, conferencias y exposiciones en Miami.",
    eyebrow: "Eventos Corporativos",
    h1: "Cobertura en video y resumen de eventos corporativos en Miami.",
    lead:
      "Captura en video y edición rápida de recaps para convenciones, lanzamientos de marca y conferencias en Miami.",
    keyword: "video de eventos corporativos en Miami",
    location: "Miami Convention Center / Downtown Miami",
    availability: "confirmed",
    icon: Camera,
    bestFor: [
      "Empresas que organizan conferencias o convenciones en Miami.",
      "Marcas corporativas que requieren un video resumen (aftermovie) de su evento.",
    ],
    scopingQuestions: [
      "¿El evento es de un solo día o de varios días de duración?",
      "¿Requieres entrega de resumen rápido durante el evento?",
    ],
    projectFit:
      "Cobertura limpia y profesional coordinada con la agenda de tu evento.",
    updated: "2026-10-07",
    sections: CORPORATE_EVENT_ES_SECTIONS,
    sectionsDisclosure: CORPORATE_EVENT_ES_DISCLOSURE,
    sectionsDestinations: CORPORATE_EVENT_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden entregar un teaser el mismo día del evento?",
        answer:
          "No se promete. La calculadora aplica un multiplicador exprés a la entrega rápida, pero el plazo real se confirma antes del evento según el material y la agenda. Indica la fecha de publicación que necesitas al pedir la cotización.",
      },
    ],
  },
  {
    slug: "marketing-de-video-automotriz-miami",
    title: "Marketing de video automotriz en Miami",
    metadataTitle: "Video Automotriz Miami",
    description:
      "Edición de video cinematográfico para concesionarios, talleres de detailing y vehículos de lujo en Miami.",
    eyebrow: "Automotriz / Detailing",
    h1: "Videos de vehículos de alto nivel y servicios automotrices.",
    lead:
      "Resaltamos el diseño y acabado de autos exóticos, servicios de detailing y ventas en concesionarios con ediciones en video de estilo cinematográfico.",
    keyword: "video automotriz en Miami",
    location: "Miami / Fort Lauderdale",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Talleres de auto detailing y protección de pintura (PPF).",
      "Concesionarios de autos exóticos y de lujo en South Florida.",
    ],
    scopingQuestions: [
      "¿Dispones de tomas detalladas de interiores y exteriores del auto?",
      "¿El objetivo es ventas directas o engagement en redes sociales?",
    ],
    projectFit:
      "Corrección de color y diseño de sonido de alta fidelidad automotriz.",
    faqs: [
      {
        question: "¿Se puede agregar diseño de sonido de motores?",
        answer:
          "Sí. Realzamos la experiencia auditiva del video con efectos de sonido de motor y ambiente profesionales.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-hoteles-miami",
    title: "Producción de video para hoteles y hospitalidad en Miami",
    metadataTitle: "Video Hoteles Hospitalidad Miami",
    description:
      "Videos promocionales, recorridos de suites y contenido de experiencia de huésped para hoteles en Miami.",
    eyebrow: "Hoteles / Hospitalidad",
    h1: "Videos promocionales para hoteles y resorts en Miami.",
    lead:
      "Captura visual y edición refinada para mostrar las instalaciones, amenidades y experiencia gastronómica de hoteles en Miami y South Beach. Para contenido gastronómico específico de comedores y bares, consulta [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    keyword: "video para hoteles en Miami",
    location: "Miami Beach / South Florida",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Boutique hoteles, resorts y propiedades de hospitalidad.",
      "Grupos hoteleros que necesitan videos para su sitio web y redes sociales.",
    ],
    scopingQuestions: [
      "¿El video abarcará habitaciones, piscina, restaurante o todo el complejo?",
      "¿En qué plataformas digitales se publicará?",
    ],
    projectFit:
      "Calidad cinematográfica que transmite lujo y hospitalidad.",
    updated: "2026-10-07",
    sections: HOTEL_ES_SECTIONS,
    sectionsDisclosure: HOTEL_ES_DISCLOSURE,
    sectionsDestinations: HOTEL_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Producen versiones optimizadas para Instagram y sitio web?",
        answer:
          "Sí. Entregamos la versión horizontal para el sitio web y adaptaciones verticales para Reels y Stories.",
      },
    ],
  },
  {
    slug: "edicion-de-video-podcast-miami",
    title: "Edición de video podcast en Miami",
    metadataTitle: "Edición Video Podcast Miami",
    description:
      "Servicio de edición de videopodcast, multicámara, clips para redes sociales y eliminación de silencios en Miami.",
    eyebrow: "Video Podcast / Creadores",
    h1: "Edición profesional de video podcasts en Miami.",
    lead:
      "Transformamos grabaciones multicámara de podcast en episodios pulidos y clips cortos verticales optimizados para YouTube, Spotify e Instagram.",
    keyword: "edición de video podcast en Miami",
    location: "Miami-Dade / Remote",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Creadores de video podcasts, consultores y emprendedores en Miami.",
      "Empresas que producen shows de entrevistas o podcasts corporativos.",
    ],
    scopingQuestions: [
      "¿La grabación del podcast es de una o varias cámaras?",
      "¿Requieres clips cortos de momentos destacados para redes sociales?",
    ],
    projectFit:
      "Edición bilingüe y optimización constante de episodios.",
    faqs: [
      {
        question: "¿Incluye diseño de portadas e introducciones animadas?",
        answer:
          "Sí. Podemos agregar animaciones de inicio, zócalos con nombres de invitados y gráficos de marca.",
      },
    ],
  },
  {
    slug: "editor-de-video-ugc-para-ecommerce",
    title: "Editor de video UGC para e-commerce en Miami",
    metadataTitle: "Editor Video UGC E-Commerce",
    description:
      "Edición de video UGC (contenido generado por usuarios) optimizado para anuncios en Meta y TikTok para marcas e-commerce.",
    eyebrow: "UGC / E-Commerce Ads",
    h1: "Edición de anuncios UGC para marcas e-commerce.",
    lead:
      "Convertimos clips de testimoniales de usuarios y unboxings en anuncios de video de alta conversión con ganchos visuales y subtítulos animados.",
    keyword: "editor de video UGC en Miami",
    location: "Miami / Remote E-Commerce",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas e-commerce que utilizan anuncios en TikTok y Meta Ads.",
      "Agencias de marketing digital que necesitan edición ágil de variaciones de anuncios.",
    ],
    scopingQuestions: [
      "¿Envías las tomas UGC de tus creadores para edición?",
      "¿Cuántas variaciones de gancho (hook) necesitas por anuncio?",
    ],
    projectFit:
      "Edición rápida orientada a rendimiento y conversión en redes sociales.",
    faqs: [
      {
        question: "¿Pueden editar múltiples variaciones para pruebas A/B?",
        answer:
          "Sí. Entregamos distintas versiones con diferentes ganchos iniciales y llamadas a la acción para optimizar el retorno de inversión.",
      },
    ],
  },
  {
    slug: "video-para-arquitectura-y-diseno-miami",
    title: "Video para arquitectura y diseño de interiores en Miami",
    metadataTitle: "Video Arquitectura Diseño Miami",
    description:
      "Edición de video cinematográfico y recorridos para firmas de arquitectura y diseñadores de interiores en Miami.",
    eyebrow: "Arquitectura / Diseño",
    h1: "Videos promocionales para estudios de arquitectura y diseño.",
    lead:
      "Resaltamos detalles de diseño, texturas e iluminación en proyectos residenciales y comerciales para arquitectos e interioristas en Miami.",
    keyword: "video de arquitectura en Miami",
    location: "Miami / Coral Gables",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Estudios de arquitectura y firmas de diseño de interiores.",
      "Desarrolladores boutique en Miami y South Florida.",
    ],
    scopingQuestions: [
      "¿Las tomas abarcan fotografía estática animada o clips de video?",
      "¿El video se publicará en portfolio web o Instagram?",
    ],
    projectFit:
      "Edición minimalista y de alto nivel estilístico.",
    faqs: [
      {
        question: "¿Se pueden animar fotos de arquitectura de alta resolución?",
        answer:
          "Sí. Utilizamos técnicas de parallax y movimiento de cámara virtual para dar vida a portafolios fotográficos.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-spas-y-bienestar-miami",
    title: "Marketing de video para spas y bienestar en Miami",
    metadataTitle: "Video Spas Bienestar Miami",
    description:
      "Videos relajantes y contenido promocional para spas de lujo, centros de bienestar y tratamientos holísticos en Miami.",
    eyebrow: "Spas / Bienestar",
    h1: "Videos promocionales para spas y centros de bienestar.",
    lead:
      "Creamos contenido visual envolvente con ritmo sereno y edición estética para atraer clientes a spas y centros holísticos en Miami.",
    keyword: "video para spas en Miami",
    location: "Miami Beach / Distrito Financiero",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Day spas, centros de medicina holística y resorts de bienestar.",
      "Marcas de cuidado personal que buscan transmitir tranquilidad y lujo.",
    ],
    scopingQuestions: [
      "¿Deseas mostrar tratamientos, ambiente del spa o testimoniales?",
      "¿Requieres diseño de sonido relajante personalizado?",
    ],
    projectFit:
      "Estética visual limpia con edición fluida y sonido envolvente.",
    sectionsDisclosure: "Precios y cómo grabar sin mostrar clientes",
    updated: "2026-10-07",
    sections: [
      {
        heading: "¿Cuánto cuesta un video promocional para un spa en Miami?",
        paragraphs: [
          `Editar el material que el spa ya tiene empieza desde ${esStarterFrom} por proyecto con el [paquete Arranque](/es/precios/arranque), con formato para Reels, TikTok, YouTube o web y una ronda de revisión. Una pieza promocional terminada o un anuncio para redes cae en la banda de edición corta de la calculadora, de ${esSocialBand} por proyecto. Las dos cifras son orientativas, de un editor independiente con un descuento de introducción aplicado, y la cotización por escrito fija el alcance.`,
          "Un promocional de spa suele pedir menos material del que se espera y más cuidado en la edición: ritmo pausado, tomas estables de las salas, el agua, las texturas y la luz, y un sonido que no moleste. El número cambia con cuántas versiones necesitas y con si hay que grabar algo.",
        ],
      },
      {
        heading: "¿Cuánto cuesta grabar en el spa?",
        paragraphs: [
          `La grabación en sitio va por [Presencia Local](/es/precios/presencia-local), desde ${esLocalFrom} por día de producción: preproducción, captura en locación, edición posterior y entregables según formato, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. El complemento de media jornada de captura tiene un rango orientativo de ${esHalfDayBand}, con la misma base. Son dos formas de cotizar el trabajo, no cantidades que se suman.`,
          "Casi todos los spas son más fáciles de grabar antes de abrir o en un bloque tranquilo entre reservas, con las salas listas y nadie esperando. Envía las horas disponibles, las salas que quieres mostrar y si alguien del equipo hablará a cámara, para que la propuesta diga qué se graba y qué queda fuera.",
        ],
      },
      {
        heading: "¿Cómo graba un spa sin mostrar a sus clientes?",
        paragraphs: [
          "Grabando el lugar y la preparación en vez de a las personas. Las salas vacías, el agua, las toallas dobladas, los productos en un estante y las manos de una terapeuta preparando la camilla cuentan cómo se siente la visita sin poner a un cliente en una cuenta de negocio. Grabadas desde una posición fija y con luz constante, esas tomas sirven durante meses.",
          "Cuando aparece una persona, debe ser alguien del equipo o alguien que aceptó de antemano, nunca un cliente que pasaba por ahí. Pregunta antes de grabar, anota quién dijo sí y envía la nota con los clips. Envía los archivos originales del teléfono o la cámara, no copias de una app de mensajería, que ya perdieron detalle.",
        ],
      },
      {
        heading: "¿Cuánto cuesta un plan mensual de contenido para un spa?",
        paragraphs: [
          `El [plan Crecimiento](/es/precios/crecimiento) empieza desde ${esGrowthFrom} al mes e incluye plan de contenido, calendario de publicación, edición y reporte mensual. Sirve a un spa o centro de bienestar que quiere publicar con constancia pero no tiene a nadie encargado, y que puede enviar material nuevo cada una o dos semanas.`,
          "Los tratamientos de temporada, una sala renovada o una persona nueva en el equipo le dan al calendario algo nuevo que contar, y las mismas tomas tranquilas de las salas lo sostienen entre una novedad y otra. Compara las rutas en la [calculadora](/es/calculadora) y pide una cotización por escrito en [contacto](/es/contacto) que diga qué se graba, edita y entrega cada mes.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Incluye diseño de sonido ambiente de spa?",
        answer:
          "Sí. Integramos texturas sonoras naturales y música ambiental elegida para la plataforma donde se publicará el video.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-eventos-miami",
    title: "Edición de video para eventos en Miami",
    metadataTitle: "Edición Video Eventos Miami",
    description:
      "Edición remota y postproducción de grabaciones de eventos, fiestas corporativas y galas en Miami.",
    eyebrow: "Edición de Eventos",
    h1: "Edición de video profesional para eventos y galas.",
    lead:
      "Organizamos y editamos grabaciones de eventos en vivo en videos de resumen atractivos y resúmenes para participantes.",
    keyword: "edición de video de eventos en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Organizadores de eventos y agencias de producción en South Florida.",
      "Fotógrafos y videógrafos que necesitan externalizar la postproducción.",
    ],
    scopingQuestions: [
      "¿Cuántas horas de grabación bruta deseas resumir?",
      "¿Cuál es el tiempo de entrega deseado para la primera versión?",
    ],
    projectFit:
      "Postproducción estructurada para videógrafos independientes.",
    faqs: [
      {
        question: "¿Puedo enviar archivos masivos de video?",
        answer:
          "Sí. Recibimos archivos pesados de varias cámaras a través de enlaces directos de nube.",
      },
    ],
  },
  {
    slug: "produccion-de-video-de-marca-miami",
    title: "Producción de video de marca en Miami",
    metadataTitle: "Producción Video Marca Miami",
    description:
      "Videos manifiesto de marca, historias de fundadores y contenido institucional para empresas en Miami.",
    eyebrow: "Branding / Manifiesto",
    h1: "Videos de marca y manifiesto institucional en Miami.",
    lead:
      "Conectamos la visión de tu empresa con su audiencia mediante videos de historia de marca con guion sólido y edición cinematográfica.",
    keyword: "video de marca en Miami",
    location: "Miami / South Florida",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Empresas en crecimiento y startups que relanzan su identidad de marca.",
      "Fundadores que desean contar la historia detrás de su negocio.",
    ],
    scopingQuestions: [
      "¿Cuentas con un guion o narración en voz en off grabada?",
      "¿Qué emociones o valores de marca deseas destacar?",
    ],
    projectFit:
      "Narrativa de marca auténtica y duradera.",
    faqs: [
      {
        question: "¿Ayudan a estructurar la voz en off y la música de fondo?",
        answer:
          "Sí. Seleccionamos la locución comercial bilingüe y la composición musical que mejor represente la personalidad de tu marca.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-entrenadores-personales-miami",
    title: "Producción de video para entrenadores personales en Miami",
    metadataTitle: "Video Entrenadores Personales Miami",
    description:
      "Videos de entrenamiento dinámicos, reels de transformación y contenido promocional para personal trainers y coaches en Miami.",
    eyebrow: "Personal Trainers / Fitness",
    h1: "Videos de alta energía para personal trainers y coaches.",
    lead:
      "Captura la intensidad de tus sesiones de entrenamiento con reels dinámicos, edición de ritmo rápido y testimonios de clientes.",
    keyword: "video para personal trainer en Miami",
    location: "Miami / Distrito Financiero",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Personal trainers independientes y coaches de acondicionamiento físico.",
      "Estudios boutique de entrenamiento funcional y Pilates.",
    ],
    scopingQuestions: [
      "¿El video se enfocará en rutinas de ejercicio o historias de transformación?",
      "¿Tienes música rítmica seleccionada para la edición?",
    ],
    projectFit:
      "Edición motivacional de alto impacto visual.",
    faqs: [
      {
        question: "¿Pueden editar clips grabados en gimnasios con smartphone?",
        answer:
          "Sí. Optimizamos la resolución, estabilizamos las tomas y mejoramos el audio de fondo.",
      },
    ],
  },
  {
    slug: "edicion-de-video-promocional-para-restaurantes-miami",
    title: "Edición de video promocional para restaurantes en Miami",
    metadataTitle: "Edición Video Restaurantes Miami",
    description:
      "Edición de video para restaurantes en Miami: reels de platillos, promociones, subtítulos y cortes sociales desde material del cliente.",
    eyebrow: "Gastronomía / Restaurantes",
    h1: "Edición de video apetitosa para restaurantes en Miami.",
    lead:
      "Destaca detalles culinarios, ambiente de comedor y preparación de bebidas con videos cortos pensados para redes, menú digital o sitio web. Desde $240 por video promocional; cada proyecto recibe una cotización a la medida. Consulta todos los alcances de servicio en [video para restaurantes en Miami](/es/video-para-restaurantes-miami) y las [áreas de servicio](/es/areas) cuando el brief incluya rodaje.",
    keyword: "edición de video para restaurantes en Miami",
    location: "Miami / Wynwood",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Restaurantes, bares gastronómicos y conceptos de comida rápida de lujo.",
      "Agencias de marketing gastronómico en South Florida.",
    ],
    scopingQuestions: [
      "¿Cuentas con tomas en cámara lenta de preparación de alimentos?",
      "¿El video incluirá superposiciones de menú o precios promocionales?",
    ],
    projectFit:
      "Edición sensorial detallada para apetito visual. Para alcances combinados de rodaje y postproducción, visita [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
    sections: [
      {
        heading: "Estructura de un reel de platillo o menú",
        paragraphs: [
          "Si publicas recomendaciones desde tu propia cuenta, consulta la [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami).",
          "Un reel gastronómico puede partir de una sola idea clara: un platillo insignia, una bebida, una preparación, el ambiente del salón o un mensaje breve del equipo. La edición puede abrir con el detalle visual más inmediato —vapor, corte, salsa, emplatado o vertido— y luego ordenar los planos para que el espectador entienda qué se ofrece y cuál es el siguiente paso que el restaurante desea comunicar.",
          "No existe una secuencia única para todos los locales. Los primeros planos de ingredientes, manos y textura pueden alternarse con planos más abiertos del servicio o la sala. El ritmo se define por el material disponible y por el mensaje, sin acelerar una toma hasta que el plato deje de apreciarse. Para planificar material antes de grabar, consulta la [guía de ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes).",
        ],
      },
      {
        heading: "Color y ritmo con textura natural",
        paragraphs: [
          "El tratamiento de color busca que el alimento se vea apetitoso y que conserve su textura natural. Exposición, balance de blancos, contraste y saturación se revisan entre clips para que luz de cocina, luz de mesa, salsas e ingredientes se sientan coherentes dentro de una misma pieza. No se presenta una corrección de color como sustituto de una buena toma ni como una promesa sobre el resultado comercial.",
          "La base de trabajo es el [material suministrado por el cliente](/es/guias/entrega-para-edicion-remota-de-video). Pueden incluirse clips de smartphone o cámara de preparación, emplatado, bebidas, ambiente y mensajes a cámara, junto con los nombres correctos del menú y la intención de cada publicación. Las necesidades de rodaje se conversan por separado; no se presumen dentro de una edición remota.",
          "Cuando el restaurante está en Miami, conviene indicar contexto local, plato, promoción, canal y ubicación antes de editar. Las [áreas de servicio](/es/areas) ayudan a separar una edición remota de una posible conversación de rodaje. Un video de bar, un especial de almuerzo y un reel de comedor pueden necesitar ritmos, textos y primeros planos distintos. La edición mantiene clara esa intención local sin prometer un resultado de reservas.",
        ],
      },
      {
        heading: "Versiones 9:16, 1:1 y texto para ver sin sonido",
        paragraphs: [
          "El alcance puede incluir una versión vertical 9:16 para Instagram Reels y TikTok, además de una versión cuadrada 1:1 cuando una publicación la necesite. Los recortes se revisan para que el plato, el producto y el texto importante se mantengan visibles en cada formato. La [guía de video vertical, horizontal y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras) ofrece contexto para decidir qué formatos solicitar.",
          "Subtítulos o textos breves pueden explicar una frase hablada, un detalle del menú o un llamado a la acción aportado por el restaurante. Esto permite seguir el mensaje cuando el audio está apagado. El texto se coloca evitando tapar el plato y las zonas que suelen ocupar los controles de la plataforma, sin reemplazar la información que el negocio debe confirmar antes de publicar.",
        ],
      },
      {
        heading: "Entrega de material y revisión de la edición",
        paragraphs: [
          "La entrega es más clara cuando las carpetas indican platillo, fecha, orientación de cámara y tomas imprescindibles. Junto al material, el restaurante puede compartir logo, tipografías, ortografía del menú, referencias y los canales donde se publicará. La [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota-de-video) resume una forma práctica de organizar ese envío.",
          "Después de compartir un borrador, el restaurante puede reunir notas con marca de tiempo sobre selección de tomas, ritmo, textos o llamados a la acción. El alcance de revisiones se acuerda en cada proyecto, sin asumir una cantidad fija de rondas ni un plazo de entrega. Este orden ayuda a que el comentario sea específico y que la conversación se mantenga centrada en el material y los objetivos definidos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué material puede entregar un restaurante para editar un video promocional?",
        answer:
          "El restaurante puede compartir material suministrado por el cliente: preparación, emplatado, bebidas, sala, personal, detalles de menú o mensajes a cámara. También ayuda incluir el nombre correcto de cada platillo, referencias, logo y los canales donde se publicará.",
      },
      {
        question: "¿Cómo se estructura un reel corto de comida o menú?",
        answer:
          "La edición puede empezar con el detalle más inmediato y continuar con preparación, textura, emplatado, ambiente o un mensaje del equipo. La secuencia se decide con el material disponible y el objetivo que comparta el restaurante, no con una fórmula fija.",
      },
      {
        question: "¿Pueden preparar versiones verticales y cuadradas?",
        answer:
          "Sí. Se puede definir una versión 9:16 para Reels y TikTok y una versión 1:1 para una publicación cuadrada cuando el alcance lo requiera. Cada recorte se revisa para conservar visibles el platillo y la información esencial.",
      },
      {
        question: "¿Pueden incluir subtítulos para quien ve el video sin sonido?",
        answer:
          "Se pueden añadir subtítulos o textos breves para una frase hablada, contexto de menú o un llamado a la acción proporcionado por el restaurante. El texto se ubica para no cubrir el alimento ni zonas habituales de la interfaz.",
      },
      {
        question: "¿Cómo se comparten comentarios y revisiones?",
        answer:
          "Tras recibir un borrador, el restaurante puede reunir comentarios con marca de tiempo sobre planos, ritmo, textos o llamados a la acción. El alcance de revisiones se conversa por proyecto; no se presupone una cantidad fija de rondas.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-firmas-de-abogados-miami",
    title: "Producción de video para firmas de abogados en Miami",
    metadataTitle: "Video Abogados Firmas Miami",
    description:
      "Videos testimoniales, presentación de socios y contenido institucional para bufetes de abogados en Miami.",
    eyebrow: "Firmas de Abogados / Legal",
    h1: "Videos institucionales y de testimonio para firmas de abogados.",
    lead:
      "Genera confianza y autoridad con historias de casos de éxito, perfiles de socios y videos explicativos legales para tu firma en Miami.",
    keyword: "video para abogados en Miami",
    location: "Downtown Miami / Distrito Financiero",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Firmas de abogados de lesiones personales, corporativo e inmigración.",
      "Bufetes legales que buscan diferenciarse en campañas de video marketing.",
    ],
    scopingQuestions: [
      "¿El video incluirá testimoniales de clientes o perfiles de abogados?",
      "¿Requiere subtítulos en inglés y español para audiencias locales?",
    ],
    projectFit:
      "Postproducción sobria, elegante y de alta credibilidad.",
    faqs: [
      {
        question: "¿Pueden editar entrevistas grabadas en la oficina de la firma?",
        answer:
          "Sí. Limpiamos el audio, nivelamos el color e integramos gráficos con la marca institucional.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-alquiler-de-yates-miami",
    title: "Marketing de video para alquiler de yates en Miami",
    metadataTitle: "Video Alquiler Yates Miami",
    description:
      "Videos cinemáticos de yates, recorridos en mar abierto y contenido promocional para chárters marinos en Miami.",
    eyebrow: "Yates / Chárter Marino",
    h1: "Videos promocionales cinemáticos para chárter de yates en Miami.",
    lead:
      "Destaca el lujo de la cubierta, las experiencias a bordo y las vistas costeras para atraer clientes de chárter de alto nivel.",
    keyword: "video para alquiler de yates en Miami",
    location: "Miami Beach / Fort Lauderdale",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Empresas de chárter de yates y brókeres marinos en Miami y Fort Lauderdale.",
      "Marcas de estilo de vida náutico y experiencias de lujo.",
    ],
    scopingQuestions: [
      "¿Las tomas incluyen video aéreo con dron o recorrido de interiores?",
      "¿El video se publicará en Instagram Reels o sitio web principal?",
    ],
    projectFit:
      "Visuales deslumbrantes con ritmo fluido y sonido marino profesional.",
    faqs: [
      {
        question: "¿Combinan tomas de dron con clips de interior de yates?",
        answer:
          "Sí. Editamos transiciones impecables entre vistas aéreas del mar y detalles de lujo en camarotes.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-odontologia-estetica-miami",
    title: "Marketing de video para odontología estética en Miami",
    metadataTitle: "Video Odontología Estética Miami",
    description:
      "Videos de transformaciones de sonrisa, antes y después y testimonios de pacientes para clínicas dentales estéticas.",
    eyebrow: "Odontología Estética",
    h1: "Videos promocionales para odontología estética en Miami.",
    lead:
      "Demuestra la calidad de tus diseño de sonrisa y carillas dentales con videos emotivos de transformación de pacientes.",
    keyword: "video para odontología estética en Miami",
    location: "Coral Gables / Miami",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Dentistas cosméticos y especialistas en diseño de sonrisa.",
      "Clínicas de implantología y ortodoncia invisible.",
    ],
    scopingQuestions: [
      "¿Cuentas con clips de antes y después de los pacientes?",
      "¿Deseas mostrar explicaciones breves del procedimiento por el especialista?",
    ],
    projectFit:
      "Edición estética impecable que transmite limpieza y confianza.",
    faqs: [
      {
        question: "¿Cómo destacan los resultados de cambio de sonrisa?",
        answer:
          "Utilizamos comparativas en pantalla dividida y zooms de alta definición que resaltan la estética dental.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-discotecas-y-eventos-miami",
    title: "Edición de video para discotecas y eventos en Miami",
    metadataTitle: "Edición Video Discotecas Miami",
    description:
      "Edición de ritmo rápido, efectos visuales y recaps nocturnos para discotecas, clubes y eventos VIP en Miami.",
    eyebrow: "Vida Nocturna / Eventos VIP",
    h1: "Edición de video vibrante para discotecas y eventos nocturnos.",
    lead:
      "Resumen la energía de la fiesta con cortes de ritmo rápido, luces sincronizadas y efectos visuales modernos para redes sociales.",
    keyword: "edición de video para discotecas en Miami",
    location: "Miami Beach / Wynwood",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Discotecas, bares gastronómicos y promotores de eventos VIP.",
      "DJs y artistas que buscan reels promocionales de alto impacto.",
    ],
    scopingQuestions: [
      "¿Tienes música grabada del set en vivo o pista limpia en estudio?",
      "¿Requiere efectos de destello de luz o transiciones rápidas?",
    ],
    projectFit:
      "Postproducción dinámica de alto impacto sensorial.",
    updated: "2026-10-07",
    sections: NIGHTLIFE_ES_SECTIONS,
    sectionsDisclosure: NIGHTLIFE_ES_DISCLOSURE,
    sectionsDestinations: NIGHTLIFE_ES_DESTINATIONS,
    faqs: [
      {
        question: "¿Pueden ajustar los cortes al ritmo exacto de la música?",
        answer:
          "Sí. Sincronizamos cada cambio de toma con los beats de la pista para crear un reel electromagnético.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-contratistas-de-techos-florida",
    title: "Marketing de video para contratistas de techos en Florida",
    metadataTitle: "Video Contratistas Techos Florida",
    description:
      "Videos de procesos de instalación de techos, inspecciones y testimonios para contratistas en South Florida.",
    eyebrow: "Contratistas de Techos",
    h1: "Videos de obras y testimonios para empresas de techado.",
    lead:
      "Demuestra la durabilidad y calidad de tus proyectos de techado residencial y comercial para ganar proyectos de alto valor.",
    keyword: "video para contratistas de techos en Florida",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Empresas de techado residencial y comercial en South Florida.",
      "Contratistas de ventanas de impacto y remodelación exterior.",
    ],
    scopingQuestions: [
      "¿Las tomas muestran el proceso antes, durante y después del trabajo?",
      "¿Deseas resaltar garantías de resistencia a huracanes?",
    ],
    projectFit:
      "Demostración sólida de capacidad técnica y confianza comercial.",
    faqs: [
      {
        question: "¿Soportan tomas grabadas en obra con teléfonos móviles?",
        answer:
          "Sí. Estabilizamos las tomas en techo y mejoramos el contraste visual para mostrar el acabado impecable.",
      },
    ],
  },
  {
    slug: "produccion-de-video-para-asesores-financieros-miami",
    title: "Producción de video para asesores financieros en Miami",
    metadataTitle: "Video Asesores Financieros Miami",
    description:
      "Videos de autoridad, análisis de mercado y contenido educativo para asesores financieros y gestión de patrimonio.",
    eyebrow: "Finanzas / Gestión Patrimonial",
    h1: "Videos de autoridad para asesores financieros y patrimoniales.",
    lead:
      "Comunica conceptos financieros complejos de forma clara y profesional mediante videos institucionales y cápsulas para redes.",
    keyword: "video para asesores financieros en Miami",
    location: "Distrito Financiero / Downtown Miami",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Asesores de inversión independientes y gestores de patrimonio.",
      "Firmas de planificación financiera y fondos boutique.",
    ],
    scopingQuestions: [
      "¿El video incluirá gráficos animados de datos financieros?",
      "¿Se publicará en LinkedIn, YouTube o sitio corporativo?",
    ],
    projectFit:
      "Presentación sobria, ejecutiva y orientada a la confianza.",
    faqs: [
      {
        question: "¿Se pueden integrar diapositivas y gráficos de mercado?",
        answer:
          "Sí. Diseñamos gráficos limpios sobrepuestos en pantalla para acompañar la explicación del asesor.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-hoteles-boutique-miami",
    title: "Edición de video para hoteles boutique en Miami",
    metadataTitle: "Edición Video Hoteles Boutique Miami",
    description:
      "Edición de recorridos de suites, experiencias gastronómicas y áreas comunes para hoteles boutique en Miami.",
    eyebrow: "Hoteles Boutique / Hospitalidad",
    h1: "Videos promocionales para hoteles boutique y resorts en Miami.",
    lead:
      "Resalta la arquitectura distintiva, comodidad de habitaciones y servicios exclusivos para impulsar reservas directas.",
    keyword: "edición de video para hoteles boutique en Miami",
    location: "Miami Beach / South Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Hoteles boutique independientes y resorts de estilo de vida.",
      "Grupos de hospitalidad que relanzan propiedades vacacionales.",
    ],
    scopingQuestions: [
      "¿Las tomas abarcan habitaciones, piscina o restaurante del hotel?",
      "¿Requieres versiones verticales para Instagram y horizontales para web?",
    ],
    projectFit:
      "Edición estética elegante de alta calidad visual.",
    faqs: [
      {
        question: "¿Entregan formatos optimizados para Booking e Instagram?",
        answer:
          "Sí. Entregamos versiones en relación 16:9 para web y 9:16 vertical para redes sociales.",
      },
    ],
  },
  {
    slug: "editor-de-video-de-productos-para-ecommerce",
    title: "Editor de video de productos para e-commerce en Miami",
    metadataTitle: "Editor Video Productos E-Commerce",
    description:
      "Edición de video de producto para tiendas Shopify, Amazon y campañas de conversión e-commerce.",
    eyebrow: "E-Commerce / Video de Producto",
    h1: "Edición de video de productos para tiendas e-commerce.",
    lead:
      "Muestra funciones, empaque y detalles de producto en videos de ritmo optimizado para aumentar la conversión de tu tienda online.",
    keyword: "editor de video de productos para e-commerce",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas directas al consumidor (D2C) en Shopify o Amazon.",
      "Emprendedores que venden productos físicos con campañas de anuncios.",
    ],
    scopingQuestions: [
      "¿Cuentas con demos de producto grabados en estudio o uso real?",
      "¿Requieres textos sobrepuestos resaltando beneficios clave?",
    ],
    projectFit:
      "Edición comercial rápida orientada a la venta directa.",
    faqs: [
      {
        question: "¿Se pueden añadir textos con beneficios e íconos animados?",
        answer:
          "Sí. Diseñamos llamados a la acción y leyendas de características clave alineados con la identidad del producto.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-joyeria-de-lujo-miami",
    title: "Edición de video para joyería de lujo en Miami",
    metadataTitle: "Video Joyería de Lujo Miami",
    description:
      "Edición detallada de piezas de alta joyería, diamantes y relojes de lujo para marcas en Miami.",
    eyebrow: "Joyería / Relojes de Lujo",
    h1: "Edición de video deslumbrante para joyería de lujo.",
    lead:
      "Captura el brillo de diamantes, cortes de gemas y artesanía en metales preciosos con iluminación y colorimetría refinada.",
    keyword: "edición de video para joyería en Miami",
    location: "Distrito de Diseño / Coral Gables",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Joyerías boutique, diseñadores de alta joyería y distribuidores de relojes de lujo.",
      "Marcas de accesorios finos que venden en línea o en boutique.",
    ],
    scopingQuestions: [
      "¿Las tomas son en macro de 360 grados o con modelos luciendo piezas?",
      "¿Requieres música de fondo sutil y elegante?",
    ],
    projectFit:
      "Postproducción hiper-detallada con colorimetría de precisión.",
    faqs: [
      {
        question: "¿Se resalta el brillo real de diamantes y metales?",
        answer:
          "Sí. Aplicamos corrección de color avanzada que acentúa los reflejos y matices reales de las piezas.",
      },
    ],
  },
  {
    slug: "edicion-de-video-aereo-inmobiliario-miami",
    title: "Edición de video aéreo e inmobiliario en Miami",
    metadataTitle: "Video Aéreo Inmobiliario Miami",
    description:
      "Edición de tomas aéreas con dron, vistas panorámicas de mansiones y mapas virtuales para bienes raíces en Miami.",
    eyebrow: "Video Aéreo / Dron Inmobiliario",
    h1: "Edición de video aéreo para propiedades inmobiliarias de lujo.",
    lead:
      "Integra perspectivas aéreas de mansiones, terrenos y entornos costeros en videos inmobiliarios atractivos y fluidos.",
    keyword: "edición de video aéreo inmobiliario en Miami",
    location: "Miami-Dade / Broward / Palm Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Realtors de lujo y firmas inmobiliarias en South Florida.",
      "Videógrafos aéreos que necesitan posproducción profesional.",
    ],
    scopingQuestions: [
      "¿Cuentas con archivos de video 4K grabados con dron?",
      "¿Deseas superposiciones de líneas de propiedad o nombres de áreas?",
    ],
    projectFit:
      "Estabilización y colorimetría de paisaje marino y residencial.",
    faqs: [
      {
        question: "¿Se pueden añadir marcadores de ubicación en el video?",
        answer:
          "Sí. Añadimos gráficos sutiles que señalan puntos de interés cercanos como playas, escuelas o distritos comerciales.",
      },
    ],
  },
  {
    slug: "edicion-de-video-miami-beach",
    title: "Edición de video en Miami Beach",
    metadataTitle: "Edición de Video Miami Beach",
    description:
      "Edición de video para proyectos en Miami Beach: hospitalidad, estilo de vida, eventos y bienes raíces de lujo.",
    eyebrow: "Miami Beach / Hospitalidad y Estilo de Vida",
    h1: "Edición de video profesional para proyectos en Miami Beach.",
    lead:
      "Transforma tomas costeras, eventos nocturnos y propiedades de lujo en videos cinemáticos optimizados para marcas de Miami Beach.",
    keyword: "edición de video en Miami Beach",
    location: "Miami Beach / South Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Hoteles, restaurantes y clubes nocturnos en Miami Beach.",
      "Marcas de moda costera y agentes de bienes raíces de lujo.",
    ],
    scopingQuestions: [
      "¿El video destaca ambientes de playa, nocturnos o interiores?",
      "¿Requiere versiones en formato vertical para Instagram Reels?",
    ],
    projectFit:
      "Ritmo vibrante, colores cálidos y estética de lujo costero.",
    faqs: [
      {
        question: "¿Cómo optimizan el color para tomas en exteriores de Miami Beach?",
        answer:
          "Equilibramos tonos de mar azul turquesa y cielos soleados manteniendo tonos de piel naturales.",
      },
    ],
  },
  {
    slug: "video-inmobiliario-aventura-miami",
    title: "Video inmobiliario en Aventura y Sunny Isles",
    metadataTitle: "Video Inmobiliario Aventura Miami",
    description:
      "Videos de recorridos por condominios de lujo, penthouse y mansiones marítimas en Aventura y Sunny Isles.",
    eyebrow: "Aventura / Sunny Isles",
    h1: "Videos inmobiliarios para propiedades de lujo en Aventura.",
    lead:
      "Muestra vistas intercostales, acabados de alta gama y amenidades de condominios de lujo con videos cinemáticos.",
    keyword: "video inmobiliario en Aventura Miami",
    location: "Aventura / Sunny Isles Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Realtors de lujo y firmas inmobiliarias especializadas en Aventura y Sunny Isles.",
      "Desarrolladores de condominios marítimos de alta gama.",
    ],
    scopingQuestions: [
      "¿Las tomas incluyen vistas intercostales o interiores de penthouse?",
      "¿Se agregarán planos o datos de la propiedad en pantalla?",
    ],
    projectFit:
      "Presentación sobria y refinada de alto estándar visual.",
    faqs: [
      {
        question: "¿Destacan las amenidades del edificio como marina o spa?",
        answer:
          "Sí. Editamos secuencias que integran perfectamente el área residencial con las áreas comunes del condominio.",
      },
    ],
  },
  {
    slug: "video-creativo-wynwood-miami",
    title: "Producción de video creativo en Wynwood",
    metadataTitle: "Video Creativo Wynwood Miami",
    description:
      "Edición y producción de video creativo para marcas de moda, arte, gastronomía y agencias en Wynwood.",
    eyebrow: "Wynwood / Distrito Creativo",
    h1: "Edición de video creativo e innovador para marcas en Wynwood.",
    lead:
      "Combina ritmo urbano, gráficos audaces y estética artística para proyectos creativos en el corazón del distrito de Wynwood.",
    keyword: "video creativo en Wynwood Miami",
    location: "Wynwood / Distrito de Diseño",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas de moda streetwear, galerías de arte y conceptos gastronómicos de Wynwood.",
      "Agencias creativas que buscan posproducción de estilo vanguardista.",
    ],
    scopingQuestions: [
      "¿El video usará música alternativa o efectos de ritmo acelerado?",
      "¿Deseas superposiciones de grafitis o elementos gráficos animados?",
    ],
    projectFit:
      "Visuales audaces, dinámicos e innovadores.",
    faqs: [
      {
        question: "¿Soportan efectos visuales y transiciones de ritmo creativo?",
        answer:
          "Sí. Aplicamos transiciones rápidas, efectos de textura y tipografía urbana ajustados al estilo del cliente.",
      },
    ],
  },
  {
    slug: "edicion-de-video-corporativo-weston",
    title: "Edición de video corporativo en Weston",
    metadataTitle: "Video Corporativo Weston FL",
    description:
      "Edición de video institucional, entrevistas ejecutivas y cápsulas para empresas y clínicas en Weston, Florida.",
    eyebrow: "Weston / Broward County",
    h1: "Edición de video corporativo para empresas en Weston, FL.",
    lead:
      "Produce comunicados institucionales, videos de capacitación y promocionales de alta credibilidad para corporativos en Weston.",
    keyword: "video corporativo en Weston FL",
    location: "Weston / Broward County",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Empresas corporativas, centros médicos y firmas de servicios en Weston y Davie.",
      "Negocios familiares consolidados en el oeste de Broward.",
    ],
    scopingQuestions: [
      "¿El video es para uso interno corporativo o redes externas?",
      "¿Se requiere limpieza de sonido en entrevistas de oficina?",
    ],
    projectFit:
      "Comunicación sobria, profesional y enfocada en confianza.",
    faqs: [
      {
        question: "¿Pueden editar conferencias o presentaciones corporativas grabadas?",
        answer:
          "Sí. Eliminamos pausas, insertamos diapositivas explicativas y mejoramos la nitidez del audio.",
      },
    ],
  },
  {
    slug: "video-de-marca-de-lujo-jupiter",
    title: "Video de marca de lujo en Jupiter y Palm Beach Gardens",
    metadataTitle: "Video Marca de Lujo Jupiter FL",
    description:
      "Videos de marcas de lujo, clubes de golf y servicios de alto patrimonio en Jupiter y Palm Beach Gardens.",
    eyebrow: "Jupiter / Palm Beach Gardens",
    h1: "Videos promocionales para marcas de lujo en Jupiter, FL.",
    lead:
      "Captura la sofisticación de clubes privados, náutica de lujo y propiedades exclusivas en el norte del condado de Palm Beach.",
    keyword: "video de marca de lujo en Jupiter FL",
    location: "Jupiter / Palm Beach Gardens",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Clubes de golf residenciales, marinas y marcas de estilo de vida en Jupiter.",
      "Servicios de alto valor para residentes de Palm Beach Gardens.",
    ],
    scopingQuestions: [
      "¿Las tomas son de campos de golf, yates o residencias privadas?",
      "¿Se busca un tono sereno y elegante con narrativa en voz en off?",
    ],
    projectFit:
      "Colorimetría de alta gama y narrativa pausada de prestigio.",
    faqs: [
      {
        question: "¿Editan videos para clubes residenciales y marinos privados?",
        answer:
          "Sí. Creamos videos de presentación de estilo de vida con música orquestal o acústica de alta distinción.",
      },
    ],
  },
  {
    slug: "video-para-negocios-hollywood-fl",
    title: "Video para pequeños negocios en Hollywood, FL",
    metadataTitle: "Video Negocios Hollywood FL",
    description:
      "Videos promocionales, reels para Instagram y presentaciones comerciales para comercios en Hollywood y Hallandale.",
    eyebrow: "Hollywood / Broward County",
    h1: "Videos promocionales para negocios locales en Hollywood, FL.",
    lead:
      "Aumenta la visibilidad local de tu tienda, restaurante o servicio profesional en Hollywood con contenido en video atractivo.",
    keyword: "video para negocios en Hollywood FL",
    location: "Hollywood / Hallandale Beach",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Comercios locales, restaurantes y profesionales en Hollywood, FL.",
      "Empresas de servicios que atienden el área metropolitana de Broward.",
    ],
    scopingQuestions: [
      "¿El video busca atraer clientes locales en Instagram o Google?",
      "¿Cuentas con ofertas o promociones de temporada?",
    ],
    projectFit:
      "Mensajes directos, claros y orientados a la conversión de clientes.",
    faqs: [
      {
        question: "¿Incluyen llamadas a la acción con teléfono y sitio web?",
        answer:
          "Sí. Diseñamos gráficos finales con botones de contacto, ubicación y datos directos del negocio.",
      },
    ],
  },
  {
    slug: "produccion-de-video-delray-beach",
    title: "Producción de video en Delray Beach",
    metadataTitle: "Producción Video Delray Beach",
    description:
      "Edición y producción de video para boutique, gastronomía y servicios profesionales en Delray Beach, Florida.",
    eyebrow: "Delray Beach / Palm Beach County",
    h1: "Edición de video para negocios en Delray Beach, FL.",
    lead:
      "Resalta la energía costera y la oferta comercial de Atlantic Avenue con videos promocionales de calidad cinematográfica.",
    keyword: "producción de video en Delray Beach",
    location: "Delray Beach / Palm Beach County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Restaurantes, boutiques y galerías en Atlantic Avenue de Delray Beach.",
      "Servicios profesionales en el sur del condado de Palm Beach.",
    ],
    scopingQuestions: [
      "¿Las tomas son en exteriores de playa o interiores de local?",
      "¿Se requiere distribución de contenido para redes sociales?",
    ],
    projectFit:
      "Visuales luminosos con enfoque en estilo de vida local.",
    faqs: [
      {
        question: "¿Adaptan el video para anuncios locales en Instagram y Meta?",
        answer:
          "Sí. Entregamos los cortes requeridos para campañas publicitarias segmentadas en Delray Beach.",
      },
    ],
  },
  {
    slug: "video-inmobiliario-sunny-isles",
    title: "Video inmobiliario en Sunny Isles Beach",
    metadataTitle: "Video Inmobiliario Sunny Isles",
    description:
      "Edición de video inmobiliario en Sunny Isles Beach para agentes y equipos con material suministrado por el cliente.",
    eyebrow: "Sunny Isles Beach",
    h1: "Edición de video inmobiliario para Sunny Isles Beach.",
    lead:
      "Convierte el material ya grabado de una propiedad en un video claro para presentar el inmueble y compartirlo en los canales acordados. Si el proyecto requiere una conversación de ubicación, revisa las [áreas de servicio](/es/areas).",
    keyword: "video inmobiliario en Sunny Isles Beach",
    location: "Sunny Isles Beach / Aventura",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Agentes y equipos inmobiliarios que ya tienen material grabado de una propiedad.",
      "Marcas que necesitan organizar un video inmobiliario para canales acordados.",
    ],
    scopingQuestions: [
      "¿Qué material de la propiedad ya está grabado y quién tiene permiso para usarlo?",
      "¿Dónde se publicará el video y qué información debe aparecer?",
    ],
    projectFit:
      "Edición de material suministrado por el cliente, con alcance y entregables definidos para cada proyecto.",
    faqs: [
      {
        question: "¿Pueden editar material ya grabado de una propiedad en Sunny Isles?",
        answer:
          "Sí. Esteban puede editar material suministrado por el cliente; el alcance, los formatos y el uso previsto se confirman para cada proyecto.",
      },
    ],
  },
  {
    slug: "edicion-de-video-palm-beach-gardens",
    title: "Edición de video en Palm Beach Gardens",
    metadataTitle: "Edición Video Palm Beach Gardens",
    description:
      "Edición de video para servicios ejecutivos, clínicas y residencias de lujo en Palm Beach Gardens.",
    eyebrow: "Palm Beach Gardens",
    h1: "Edición de video para empresas y residencias en Palm Beach Gardens.",
    lead:
      "Comunica la excelencia de tus servicios comerciales o residenciales con videos pulidos de alta distinción visual.",
    keyword: "edición de video en Palm Beach Gardens",
    location: "Palm Beach Gardens / Jupiter",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Clínicas médicas, centros de salud y bufetes en Palm Beach Gardens.",
      "Empresas de arquitectura y paisajismo de lujo.",
    ],
    scopingQuestions: [
      "¿El video se enfocará en instalaciones o entrevistas al equipo?",
      "¿Buscas publicar en YouTube o LinkedIn corporativo?",
    ],
    projectFit:
      "Tono corporativo sofisticado y limpio.",
    faqs: [
      {
        question: "¿Optimizan el contenido para LinkedIn ejecutivo?",
        answer:
          "Sí. Formateamos clips horizontales con subtítulos incrustados ideales para audiencias de LinkedIn.",
      },
    ],
  },
  {
    slug: "produccion-de-video-davie-fl",
    title: "Producción de video en Davie, FL",
    metadataTitle: "Producción Video Davie FL",
    description:
      "Edición de video para centros ecuestres, comercios y servicios educativos en Davie y el suroeste de Broward.",
    eyebrow: "Davie / Broward County",
    h1: "Edición de video para negocios y servicios en Davie, FL.",
    lead:
      "Presenta tus instalaciones, ranchos, comercios o servicios educativos con videos claros y atractivos.",
    keyword: "producción de video en Davie FL",
    location: "Davie / Plantation / Broward",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Comercios locales, centros educativos y propiedades en Davie.",
      "Contratistas y proveedores de servicios comunitarios.",
    ],
    scopingQuestions: [
      "¿Las tomas son en espacios abiertos o aulas/oficinas?",
      "¿Requieres llamados a la acción comerciales directos?",
    ],
    projectFit:
      "Edición auténtica y natural enfocada en la comunidad local.",
    faqs: [
      {
        question: "¿Procesan tomas grabadas en eventos al aire libre?",
        answer:
          "Sí. Estabilizamos movimiento y nivelamos los niveles de iluminación solar directa para tomas exteriores.",
      },
    ],
  },
  {
    slug: "servicio-de-edicion-de-video-para-youtube-miami",
    title: "Servicio de edición de video para YouTube en Miami",
    metadataTitle: "Edición Video YouTube Miami",
    description:
      "Edición de contenido en formato largo para YouTube: ritmo fluido, gráficos explicativos, sonido limpio y miniaturas atractivas.",
    eyebrow: "YouTube / Creadores y Marcas",
    h1: "Edición de video profesional para canales de YouTube.",
    lead:
      "Aumenta la retención de tus espectadores en YouTube con cortes dinámicos, superposiciones gráficas y capítulos marcados.",
    keyword: "servicio de edición de video para YouTube en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Creadores de contenido, educadores y canales de marca en YouTube.",
      "Empresas que producen videopodcasts y entrevistas en formato largo.",
    ],
    scopingQuestions: [
      "¿El video requiere división de capítulos y llamadas a la suscripción?",
      "¿Cuentas con gráficos de miniatura o deseas su diseño?",
    ],
    projectFit:
      "Optimización de ritmo para maximizar el tiempo de visualización.",
    faqs: [
      {
        question: "¿Incluyen diseño de capítulos y pantalla final de YouTube?",
        answer:
          "Sí. Insertamos marcas de tiempo para la descripción de YouTube y animaciones de suscripción.",
      },
    ],
  },
  {
    slug: "editor-de-video-para-anuncios-de-tiktok-miami",
    title: "Editor de video para anuncios de TikTok e Instagram",
    metadataTitle: "Editor Video Anuncios TikTok Miami",
    description:
      "Editor de video para anuncios de TikTok en Miami. Edición direct-response, ganchos de alta retención, subtítulos dinámicos y video ads para marcas.",
    eyebrow: "TikTok Ads / Social Video Ads",
    h1: "Edición de anuncios en video optimizados para TikTok e Instagram.",
    lead:
      "Engancha a tu audiencia en los primeros 3 segundos con anuncios de respuesta directa pulidos para campañas en redes.",
    keyword: "editor de video para anuncios de TikTok en Miami",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Marcas e-commerce, apps y agencias de medios pagados en redes.",
      "Emprendedores que ejecutan campañas publicitarias en Meta y TikTok.",
    ],
    scopingQuestions: [
      "¿Tienes variaciones de ganchos iniciales para pruebas A/B?",
      "¿Requieres subtítulos en tendencia y efectos de voz?",
    ],
    projectFit:
      "Retención ágil orientada al clic y la conversión directa.",
    sections: [
      {
        heading: "Estructura de gancho y retención en los primeros 3 segundos",
        paragraphs: [
          "Un anuncio de video efectivo para TikTok y Meta depende de los primeros segundos para detener el scroll. La edición organiza el material suministrado por el cliente para abrir con el gancho visual o auditivo más convincente: una demostración de producto, un problema reconocible, una pregunta directa o una toma de acción inmediata.",
          "El ritmo editorial mantiene la atención eliminando pausas innecesarias, empleando cortes limpios y acelerando transiciones entre demostraciones de características y beneficios. Para entender la arquitectura técnica de estos formatos, consulta la [guía de Reels vs TikTok vs Shorts para negocios locales](/es/guias/reels-vs-tiktok-vs-shorts-para-negocios-locales).",
        ],
      },
      {
        heading: "Subtítulos dinámicos y zonas seguras para pauta digital",
        paragraphs: [
          "Gran parte del consumo de anuncios móviles ocurre sin audio activado o en entornos ruidosos. La edición incorpora subtítulos dinámicos sincronizados con precisión, destacando palabras clave y manteniendo los textos dentro de las zonas seguras verticales 9:16.",
          "Esto garantiza que la interfaz de TikTok e Instagram (botones de me gusta, comentarios, descripciones y llamadas a la acción) no oculte datos críticos del producto ni la propuesta de valor. Para pautas de diseño y encuadre, revisa la [guía de video vertical, horizontal y zonas seguras](/es/guias/video-vertical-horizontal-y-zonas-seguras).",
        ],
      },
      {
        heading: "Variaciones de ganchos (hooks) y pruebas de creatividad",
        paragraphs: [
          "Las campañas de paid social requieren iteración constante de creatividades. A partir de una misma sesión de grabación o conjunto de tomas de producto, se pueden estructurar múltiples variaciones de inicio (hooks) acopladas a un cuerpo y llamada a la acción consistentes.",
          "Este enfoque modular permite a las marcas probar diferentes ángulos de venta, objeciones y disparadores visuales en el administrador de anuncios sin necesidad de producir videos completamente independientes desde cero.",
        ],
      },
      {
        heading: "Entrega de material y organización del flujo de postproducción",
        paragraphs: [
          "El proceso de trabajo se basa en material suministrado por el cliente: grabaciones de teléfono, tomas de producto con cámara, testimonios en video o metraje UGC. Organizar las tomas por concepto, producto y ángulo facilita una postproducción ágil y estructurada.",
          "Junto con el material grabado, compartir guiones, logotipos vectoriales, lineamientos de marca y la oferta exacta agiliza la integración de gráficos y llamados a la acción. Consulta la [guía de entrega para edición remota de video](/es/guias/entrega-para-edicion-remota-de-video) para preparar tus archivos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué tipo de material debo entregar para la edición de anuncios de TikTok?",
        answer:
          "Trabajamos con material suministrado por el cliente: grabaciones en smartphone o cámara, tomas de uso de producto, testimonios estilo UGC, demostraciones y recursos de marca (logos, fuentes, directrices de oferta).",
      },
      {
        question: "¿Entregan variaciones de ganchos (hooks) para pruebas publicitarias?",
        answer:
          "Sí. Podemos estructurar múltiples inicios de 3 a 5 segundos combinados con un cuerpo común y llamada a la acción para facilitar pruebas A/B en campañas de paid social.",
      },
      {
        question: "¿Cómo aseguran que los subtítulos y gráficos no queden tapados por la interfaz de TikTok?",
        answer:
          "Diseñamos cada pieza respetando las zonas seguras verticales 9:16 de TikTok e Instagram Reels, asegurando que textos, subtítulos dinámicos y logos queden libres de botones y descripciones de la plataforma.",
      },
      {
        question: "¿Los anuncios editados son compatibles con campañas en Instagram Reels y Facebook Ads?",
        answer:
          "Sí. Los anuncios en formato vertical 9:16 y las adaptaciones cuadradas 1:1 o 4:5 se configuran para rendir en los placements de TikTok Ads Manager y Meta Ads Manager.",
      },
      {
        question: "¿Cómo se gestionan las revisiones y ajustes en la edición de anuncios?",
        answer:
          "Tras compartir el primer borrador, se recopilan comentarios específicos con marcas de tiempo sobre ritmo, ganchos, gráficos y textos para aplicar los ajustes dentro del alcance acordado del proyecto.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-cursos-online",
    title: "Edición de video para cursos online y webinars",
    metadataTitle: "Edición Video Cursos Online",
    description:
      "Edición de módulos educativos, lecciones en video, webinars y tutoriales para plataformas de e-learning.",
    eyebrow: "Cursos Online / E-Learning",
    h1: "Edición de video para cursos en línea y programas educativos.",
    lead:
      "Pule tus lecciones educativas con sincronización de diapositivas, audio cristalino y gráficos que facilitan el aprendizaje.",
    keyword: "edición de video para cursos online",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Infoproductores, mentores y creadores de cursos digitales.",
      "Instituciones educativas y plataformas de e-learning.",
    ],
    scopingQuestions: [
      "¿El curso combina grabación de pantalla con cámara del instructor?",
      "¿Deseas resaltar puntos clave con texto animado en pantalla?",
    ],
    projectFit:
      "Estructura clara y sonido nivelado para máxima claridad pedagógica.",
    faqs: [
      {
        question: "¿Limpian ruidos de fondo y titubeos del instructor?",
        answer:
          "Sí. Editamos el audio para eliminar ruidos ambiente y pausas innecesarias, manteniendo la fluidez del habla.",
      },
    ],
  },
  {
    slug: "edicion-de-video-de-capacitacion-corporativa-miami",
    title: "Edición de video de capacitación corporativa en Miami",
    metadataTitle: "Video Capacitación Corporativa Miami",
    description:
      "Edición de videos de inducción, procedimientos SOP y capacitaciones internas para empresas en Miami.",
    eyebrow: "Capacitación Corporativa / SOP",
    h1: "Videos de capacitación e inducción interna para corporativos.",
    lead:
      "Convierte manuales y procesos operativos en videos explicativos breves que aceleran la incorporación de empleados.",
    keyword: "edición de video de capacitación corporativa en Miami",
    location: "Distrito Financiero / Doral / Miami",
    availability: "confirmed",
    icon: Building2,
    bestFor: [
      "Departamentos de recursos humanos y operaciones en empresas corporativas.",
      "Firmas en expansión que necesitan estandarizar su entrenamiento.",
    ],
    scopingQuestions: [
      "¿El video incluirá capturas de pantalla de software o grabaciones presenciales?",
      "¿Requieres resúmenes clave al final de cada módulo?",
    ],
    projectFit:
      "Formato profesional, claro e instructivo.",
    faqs: [
      {
        question: "¿Se pueden añadir cuestionarios o llamados en pantalla?",
        answer:
          "Sí. Agregamos placas de texto y pausas de repaso para reforzar la absorción de contenidos.",
      },
    ],
  },
  {
    slug: "editor-de-video-para-campanas-de-crowdfunding",
    title: "Editor de video para campañas de crowdfunding en Miami",
    metadataTitle: "Video Editor Crowdfunding Miami",
    description:
      "Edición de videos de lanzamiento de producto para campañas en Kickstarter e Indiegogo.",
    eyebrow: "Crowdfunding / Lanzamiento de Producto",
    h1: "Videos emotivos y persuasivos para campañas de crowdfunding.",
    lead:
      "Cuenta la historia detrás de tu innovación con videos persuasivos diseñados para captar patrocinadores e inversores.",
    keyword: "editor de video para campañas de crowdfunding en Miami",
    location: "Wynwood / Miami-Dade",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Startups tecnológicas, creadores de gadgets y emprendedores en Kickstarter.",
      "Marcas innovadoras que buscan financiamiento inicial.",
    ],
    scopingQuestions: [
      "¿Cuentas con animación 3D de prototipo o grabaciones de prototipo real?",
      "¿El video incluye el testimonio del fundador?",
    ],
    projectFit:
      "Narrativa inspiradora enfocada en generar emoción y confianza en el proyecto.",
    faqs: [
      {
        question: "¿Integran llamado a la acción final con metas de financiamiento?",
        answer:
          "Sí. Diseñamos gráficos finales atractivos con los incentivos de la campaña y llamada al patrocinio.",
      },
    ],
  },
  {
    slug: "edicion-de-video-con-dron-miami",
    title: "Servicio de edición de video con dron en Miami",
    metadataTitle: "Servicio Edición Video Dron Miami",
    description:
      "Posproducción y corrección de color de tomas aéreas grabadas con dron para arquitectura, eventos y bienes raíces.",
    eyebrow: "Video Aéreo / Dron",
    h1: "Posproducción y colorimetría profesional para video aéreo con dron.",
    lead:
      "Estabiliza, corrige el color e integra gráficos sobre tus tomas en 4K grabadas con dron para resultados deslumbrantes.",
    keyword: "servicio de edición de video con dron en Miami",
    location: "Miami-Dade / Broward / Palm Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Operadores de dron y videógrafos aéreos que buscan delegar la posproducción.",
      "Empresas de bienes raíces, construcción y eventos al aire libre.",
    ],
    scopingQuestions: [
      "¿El material proviene de tomas horizontales o verticales?",
      "¿Deseas nivelar tonos de cielo y agua en tomas marciales?",
    ],
    projectFit:
      "Tratamiento de color cinemático para tomas panorámicas.",
    faqs: [
      {
        question: "¿Cómo corrigen el parpadeo o movimientos bruscos del dron?",
        answer:
          "Aplicamos algoritmos de estabilización digital de alta precisión para suavizar el recorrido de cámara.",
      },
    ],
  },
  {
    slug: "postproduccion-de-videos-musicales-miami",
    title: "Postproducción de videos musicales en Miami",
    metadataTitle: "Postproducción Videos Musicales Miami",
    description:
      "Montaje, corrección de color cinemática y sincronización de labios para videos musicales de artistas en Miami.",
    eyebrow: "Videos Musicales / Artistas",
    h1: "Postproducción cinemática para videos musicales en Miami.",
    lead:
      "Crea una pieza audiovisual icónica para tu lanzamiento musical con colorimetría de cine y efectos rítmicos adaptados al género.",
    keyword: "postproducción de videos musicales en Miami",
    location: "Wynwood / Miami Beach",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Artistas independientes, bandas y sellos discográficos en Miami.",
      "Directores de videos musicales que buscan posproducción de alto nivel.",
    ],
    scopingQuestions: [
      "¿Cuál es el género musical y el tono visual deseado (urbano, pop, latino)?",
      "¿Cuentas con múltiples tomas de playback de la canción?",
    ],
    projectFit:
      "Sincronización milimétrica y look de cine estilizado.",
    faqs: [
      {
        question: "¿Sincronizan múltiples tomas de interpretación con la pista master?",
        answer:
          "Sí. Realizamos multicámara sincronizada con la pista de audio master para cortar entre diferentes escenarios.",
      },
    ],
  },
  {
    slug: "edicion-de-clips-para-webinars",
    title: "Edición de clips para webinars y eventos virtuales",
    metadataTitle: "Edición Clips Webinars Miami",
    description:
      "Corte y extracción de momentos destacados de webinars largos para convertirlos en cápsulas virales para redes sociales.",
    eyebrow: "Webinars / Clips para Redes",
    h1: "Transforma webinars grabados en clips virales para redes sociales.",
    lead:
      "Extrae los mejores consejos e ideas de tus eventos virtuales y conviertenlos en reels con subtítulos animados de alto impacto.",
    keyword: "edición de clips para webinars",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Conferencistas, consultores y empresas que organizan webinars periódicos.",
      "Agencias de marketing que buscan maximizar el contenido de eventos virtuales.",
    ],
    scopingQuestions: [
      "¿Tienes identificados los minutos de las mejores intervenciones?",
      "¿Deseas formato 9:16 vertical con subtítulos resaltados?",
    ],
    projectFit:
      "Optimización de contenido largo para consumo rápido en redes.",
    faqs: [
      {
        question: "¿Pueden seleccionar ustedes las mejores partes del webinar?",
        answer:
          "Sí. Revisamos la grabación para identificar los momentos con mayor gancho y valor informativo.",
      },
    ],
  },
  {
    slug: "produccion-masiva-de-video-para-redes-miami",
    title: "Producción masiva de video para redes en Miami",
    metadataTitle: "Producción Masiva Video Redes Miami",
    description:
      "Servicio de batching de contenido en video: edición de decenas de reels y shorts a partir de sesiones de grabación concentradas.",
    eyebrow: "Batching / Contenido Masivo",
    h1: "Edición masiva de video para mantener presencia constante en redes.",
    lead:
      "Aprovecha un solo día de grabación para obtener un mes entero de contenido en video perfectamente editado y programable.",
    keyword: "producción masiva de video para redes en Miami",
    location: "Miami-Dade / Broward / Palm Beach",
    availability: "confirmed",
    icon: WandSparkles,
    bestFor: [
      "Creadores de marca personal, ejecutivos y empresas con publicación diaria.",
      "Equipos de marketing que trabajan con calendarios mensuales de contenido.",
    ],
    scopingQuestions: [
      "¿Cuántos videos mensuales planeas publicar (15, 30, 60 clips)?",
      "¿Cuentas con la plantilla gráfica de marca lista?",
    ],
    projectFit:
      "Flujo de trabajo estructurado y entregas organizadas por fecha.",
    faqs: [
      {
        question: "¿Cómo entregan los lotes masivos de video?",
        answer:
          "Organizamos los archivos en carpetas ordenadas por semana y día con nombres descriptivos para su publicación.",
      },
    ],
  },
  {
    slug: "servicio-de-edicion-de-entrevistas-de-video",
    title: "Servicio de edición de entrevistas de video",
    metadataTitle: "Edición Entrevistas Video Miami",
    description:
      "Edición multicámara de entrevistas, limpieza de audio, encuadre dinámico e inserción de b-roll para testimonios.",
    eyebrow: "Entrevistas / Testimoniales Multicámara",
    h1: "Edición profesional de entrevistas de video y conversaciones.",
    lead:
      "Pule conversaciones grabadas a dos o más cámaras, alternando encuadres de forma fluida y agregando material de apoyo visual.",
    keyword: "servicio de edición de entrevistas de video",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Podcasters, periodistas y productores de contenido documental.",
      "Empresas que graban testimonios de clientes o paneles de expertos.",
    ],
    scopingQuestions: [
      "¿La entrevista fue grabada a 1, 2 o 3 cámaras simultáneas?",
      "¿Requiere inserción de b-roll de apoyo durante la narración?",
    ],
    projectFit:
      "Cortes invisibles que priorizan el ritmo natural del testimonio.",
    faqs: [
      {
        question: "¿Sincronizan audio grabado externamente con micrófonos de solapa?",
        answer:
          "Sí. Sincronizamos las pistas de audio independientes con la señal de video de las cámaras de forma perfecta.",
      },
    ],
  },
  {
    slug: "produccion-de-video-fort-lauderdale",
    title: "Produccion de video en Fort Lauderdale",
    metadataTitle: "Produccion de Video Fort Lauderdale",
    description:
      "Produccion y edicion de video para negocios de Fort Lauderdale y Broward, con atencion en espanol y alcance definido por proyecto.",
    eyebrow: "Fort Lauderdale / Broward",
    h1: "Produccion de video en Fort Lauderdale para negocios que necesitan explicar su oferta.",
    lead:
      "Fort Lauderdale es la base de Esteban Moreno Media. Esta pagina ayuda a preparar una consulta de video para negocios de Broward: que se debe grabar, que material ya existe, donde se publicara y si el proyecto requiere captura local o solo edicion remota.",
    keyword: "produccion de video Fort Lauderdale",
    location: "Fort Lauderdale / Broward County",
    availability: "confirmed",
    icon: Video,
    bestFor: [
      "Negocios de Broward que necesitan un video claro para su web, redes o perfil local.",
      "Equipos con clips existentes que quieren convertirlos en piezas listas para publicar.",
      "Marcas que prefieren definir el alcance y revisar el material en espanol.",
      "Proyectos que pueden necesitar captura local selectiva en Fort Lauderdale.",
    ],
    scopingQuestions: [
      "¿El proyecto requiere grabar material nuevo o editar archivos existentes?",
      "¿Que debe entender o hacer la persona despues de ver el video?",
      "¿Donde se publicara: web, Instagram, TikTok, YouTube, presentacion o perfil local?",
      "¿Que fecha, locacion, referencias y formatos deben confirmarse antes de cotizar?",
    ],
    projectFit:
      "Esta ruta conecta la base local en Fort Lauderdale con servicios confirmados de edicion, planificacion social y produccion selectiva. Para una version en ingles, revisa [video production in Fort Lauderdale](/services/video-production-fort-lauderdale).",
    sections: [
      {
        heading: "¿Que tipo de video necesita un negocio de Fort Lauderdale?",
        paragraphs: [
          "Un video local funciona mejor cuando responde una sola pregunta: que ofreces, para quien es y cual es el siguiente paso. Para un restaurante puede ser una pieza de menu o ambiente; para un agente inmobiliario, un recorrido de propiedad; para un servicio profesional, una explicacion corta de la oferta.",
          "Antes de hablar de camaras o edicion, conviene definir el uso principal. Un video para la pagina web necesita contexto y confianza; un Reel necesita ritmo y subtitulos; un video para Google Business Profile debe ser directo y facil de entender en telefono.",
        ],
        bullets: [
          "Una meta principal por video",
          "Material disponible y material que falta",
          "Formato vertical, horizontal o ambos",
          "Un llamado a la accion simple: llamar, escribir o revisar un ejemplo",
        ],
      },
      {
        heading: "¿Cuando conviene editar remoto y cuando grabar en locacion?",
        paragraphs: [
          "Si ya tienes clips del equipo, producto, servicio o local, la edicion remota puede ser suficiente. El trabajo se enfoca en elegir las mejores tomas, ordenar la historia, limpiar el audio cuando aplique, agregar subtitulos y exportar en el formato correcto.",
          "La captura en locacion se evalua proyecto por proyecto. Tiene sentido cuando no existe material util, cuando el negocio necesita mostrar un espacio fisico o cuando la oferta depende de personas, movimiento, producto o ambiente que no se puede explicar solo con texto.",
        ],
      },
      {
        heading: "¿Que se debe enviar para recibir una respuesta clara?",
        paragraphs: [
          "El primer mensaje debe incluir la meta, el condado, el tipo de negocio, los archivos disponibles, una referencia visual y la fecha ideal. Esa informacion evita una conversacion larga y ayuda a saber si el proyecto es de edicion, produccion o ambos.",
          "Si tienes material listo, comparte una carpeta con clips originales y una nota breve. Si todavia no tienes material, describe la locacion, las personas que aparecerian, el uso previsto y los ejemplos de estilo que te gustan.",
        ],
        bullets: [
          "Meta y uso del video",
          "Enlaces a clips o carpeta de archivos",
          "Referencia visual o ejemplo de estilo",
          "Fecha y formato de publicacion",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Esteban trabaja desde Fort Lauderdale?",
        answer:
          "Si. Fort Lauderdale es la base operativa de Esteban Moreno Media dentro de Broward County. La disponibilidad para cada proyecto local se confirma despues de revisar la meta, la locacion y el alcance.",
      },
      {
        question: "¿Puedo pedir solo edicion si ya tengo material?",
        answer:
          "Si. La edicion remota con material existente es una prioridad confirmada. Puedes enviar clips originales, referencias, textos y la plataforma de publicacion para recibir una respuesta mas precisa.",
      },
      {
        question: "¿La produccion local esta disponible para cualquier idea?",
        answer:
          "No se publica una disponibilidad universal. La produccion en locacion se evalua de forma selectiva segun el objetivo, el lugar, las personas involucradas y las necesidades de captura.",
      },
      {
        question: "¿Se puede atender el proyecto en espanol?",
        answer:
          "Si. La atencion principal de Esteban es en espanol, con comunicacion de trabajo disponible en ingles intermedio cuando el proyecto lo necesita.",
      },
    ],
  },
  {
    slug: "editor-de-reels-fort-lauderdale",
    title: "Editor de Reels en Fort Lauderdale",
    metadataTitle: "Editor de Reels Fort Lauderdale",
    description:
      "Edicion de Reels, TikTok y Shorts para negocios de Fort Lauderdale que ya tienen material o necesitan ordenar una idea de video corto.",
    eyebrow: "Reels / TikTok / Shorts",
    h1: "Editor de Reels en Fort Lauderdale para convertir clips en videos claros.",
    lead:
      "Esta pagina es para negocios de Broward que ya tienen videos en el telefono, archivos de una grabacion o ideas para contenido corto. La edicion se puede trabajar remoto cuando los clips, referencias y objetivos estan claros.",
    keyword: "editor de reels Fort Lauderdale",
    location: "Fort Lauderdale / Broward County",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Restaurantes, realtors, gimnasios, med spas y negocios locales con clips sin editar.",
      "Equipos que necesitan subtitulos, ritmo y versiones listas para publicar.",
      "Duenos que prefieren explicar la oferta y revisar el contenido en espanol.",
      "Proyectos de contenido corto que no requieren una grabacion nueva.",
    ],
    scopingQuestions: [
      "¿Cuantos clips tienes y en que formato estan grabados?",
      "¿El Reel debe vender, explicar, educar o mostrar prueba visual?",
      "¿Necesitas subtitulos, portada, musica, voz o version bilingue?",
      "¿En que plataforma se publicara primero?",
    ],
    projectFit:
      "Esta ruta responde la busqueda de editor de Reels en Fort Lauderdale y enlaza con la pagina en ingles [Reels Editor Fort Lauderdale](/services/reels-editor-fort-lauderdale).",
    sections: [
      {
        heading: "¿Que hace util a un Reel de negocio?",
        paragraphs: [
          "Un Reel de negocio no necesita contar toda la historia de la marca. Debe abrir con el problema, resultado o momento visual mas claro, y despues llevar al espectador a una accion sencilla: escribir, llamar, visitar, reservar o revisar mas trabajo.",
          "La edicion decide que se queda fuera. Silencios largos, tomas repetidas, intros lentas y textos pequenos hacen que el video pierda atencion antes de explicar la oferta.",
        ],
      },
      {
        heading: "¿Que debe incluir el material que envias?",
        paragraphs: [
          "Lo ideal es enviar clips originales, una referencia de estilo, el texto o idea principal, logo si aplica y la plataforma de publicacion. Si hay voz o testimonio, el audio debe compartirse en la mejor calidad disponible.",
          "Tambien ayuda indicar que no se debe usar. Un editor puede elegir mejor cuando sabe que escenas son obligatorias, que tomas estan repetidas y que parte del producto, local o persona debe mantenerse visible.",
        ],
        bullets: [
          "Clips originales, no descargas comprimidas de redes",
          "Referencia de un Reel parecido",
          "Mensaje principal y accion final",
          "Logo, colores o subtitulos deseados",
        ],
      },
      {
        heading: "¿Como se adapta a Instagram, TikTok y Shorts?",
        paragraphs: [
          "Las plataformas verticales usan botones, textos y comentarios encima del video. Por eso los subtitulos y elementos importantes deben mantenerse dentro de zonas seguras, sin tapar caras, productos, comida, propiedades o herramientas.",
          "Un mismo video puede necesitar pequenos cambios segun la plataforma: portada, duracion, texto inicial o version sin musica. Es mejor definir el primer canal antes de editar que intentar arreglarlo al final.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo contratar solo la edicion de Reels?",
        answer:
          "Si. Si ya tienes clips, referencias y una meta clara, el proyecto puede enfocarse solo en edicion remota de Reels, TikTok o Shorts.",
      },
      {
        question: "¿Que pasa si mis clips estan grabados con telefono?",
        answer:
          "Se pueden revisar. Muchos proyectos de Reels parten de material grabado con telefono, siempre que los archivos originales tengan suficiente luz, audio util y encuadre aprovechable.",
      },
      {
        question: "¿Puede agregar subtitulos?",
        answer:
          "Si el proyecto lo requiere, se puede trabajar con subtitulos o textos en pantalla. El alcance exacto se confirma segun cantidad de videos, idioma, duracion y estilo.",
      },
      {
        question: "¿Necesito estar en Fort Lauderdale para editar Reels?",
        answer:
          "No. La edicion puede hacerse remoto. Fort Lauderdale importa si el proyecto necesita captura nueva en locacion o una referencia local especifica.",
      },
    ],
  },
  {
    slug: "editor-de-reels-miami",
    title: "Editor de Reels en Miami",
    metadataTitle: "Editor de Reels Miami",
    description:
      "Edicion de Reels, TikTok y Shorts para negocios de Miami-Dade que necesitan piezas claras, subtituladas y listas para publicar.",
    eyebrow: "Miami / video corto",
    h1: "Editor de Reels en Miami para negocios que publican en telefono primero.",
    lead:
      "Para negocios en Miami-Dade, los Reels funcionan mejor cuando el video muestra una oferta concreta, una experiencia real o una respuesta rapida a una duda del cliente. Esteban puede editar con material existente y revisar proyectos de captura local de forma selectiva.",
    keyword: "editor de reels Miami",
    location: "Miami-Dade / Remote",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Restaurantes, tiendas, realtors, creadores y servicios locales con material para redes.",
      "Negocios bilingues que necesitan subtitulos o mensajes claros en espanol.",
      "Equipos que quieren convertir una grabacion larga en varios clips cortos.",
      "Proyectos de Miami que requieren una consulta directa antes de grabar.",
    ],
    scopingQuestions: [
      "¿El contenido se publicara en Instagram, TikTok, Shorts o varias plataformas?",
      "¿El material muestra producto, persona, local, propiedad o testimonio?",
      "¿Necesitas versiones en espanol, ingles o bilingues?",
      "¿Cual es la fecha ideal de publicacion?",
    ],
    projectFit:
      "Esta pagina complementa [Reels para negocios en Miami](/es/reels-para-negocios-miami) y la ruta en ingles [Reels Editor Miami](/services/reels-editor-miami).",
    sections: [
      {
        heading: "¿Que diferencia un Reel de Miami de un video generico?",
        paragraphs: [
          "Miami-Dade tiene negocios muy visuales: restaurantes, wellness, real estate, eventos, productos, servicios profesionales y marcas bilingues. Un Reel generico pierde fuerza cuando no muestra el lugar, la persona, el producto o el contexto que hace creible la oferta.",
          "La edicion debe conservar esos detalles mientras elimina pausas y repeticiones. El objetivo no es llenar segundos, sino hacer que el espectador entienda rapido por que el negocio merece un mensaje, una visita o una llamada.",
        ],
      },
      {
        heading: "¿Como se convierte una grabacion larga en varios Reels?",
        paragraphs: [
          "Una entrevista, visita, evento o demostracion puede dividirse en clips si contiene ideas distintas. Cada Reel debe tener una apertura propia, un punto principal y un cierre sencillo. Cortar una grabacion en pedazos iguales casi nunca produce buenos videos.",
          "Para ayudar al editor, marca los momentos que no pueden faltar y los temas que quieres convertir en clips separados: pregunta frecuente, antes/despues, resultado, objecion, oferta o detalle del producto.",
        ],
      },
      {
        heading: "¿Cuando conviene pedir una version bilingue?",
        paragraphs: [
          "Una version bilingue puede ayudar cuando el negocio atiende tanto a clientes hispanos como angloparlantes. No siempre significa duplicar el video: a veces basta con subtitulos, texto de apoyo o una segunda version corta.",
          "La decision depende de la audiencia, el canal y el mensaje. Para una oferta local, la claridad del texto y la legibilidad en telefono importan mas que mezclar idiomas sin una razon concreta.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Editan Reels para negocios de Miami con material existente?",
        answer:
          "Si. La edicion con material existente es una prioridad confirmada. Comparte clips originales, referencias, plataforma y meta para revisar el alcance.",
      },
      {
        question: "¿Puede un video largo convertirse en varios Reels?",
        answer:
          "Si el material contiene varias ideas claras, se puede dividir en clips. Es mejor crear menos Reels utiles que muchos videos repetidos sin mensaje propio.",
      },
      {
        question: "¿Se puede trabajar en espanol?",
        answer:
          "Si. Esteban atiende principalmente en espanol y tambien puede manejar comunicacion de trabajo en ingles intermedio.",
      },
      {
        question: "¿La grabacion en Miami esta incluida?",
        answer:
          "No se asume automaticamente. La produccion en locacion se evalua proyecto por proyecto despues de revisar la meta, la locacion, el material existente y la disponibilidad.",
      },
    ],
  },
  // ---------------------------------------------------------------------
  // Lote de nichos 2026-10-06. Cinco compradores distintos, no cinco
  // sinonimos: un consultorio medico que no es dental, un creador de
  // contenido que es su propio cliente, una agencia o fotografo que
  // subcontrata la edicion, un salon y un taller de detallado. Cada pagina
  // responde primero, trae secciones con encabezado en forma de pregunta y
  // un dato real por seccion, y no inventa precios, plazos ni resultados.
  // ---------------------------------------------------------------------
  {
    slug: "marketing-de-video-para-consultorios-medicos-miami",
    title: "Marketing de video para consultorios médicos en Miami",
    metadataTitle: "Video para Consultorios Médicos Miami",
    description:
      "Edición de video y producción selectiva para quiroprácticos, fisioterapia, medicina funcional y clínicas de atención sin cita en Miami-Dade y Broward.",
    eyebrow: "Consultorios / Quiropráctica / Fisioterapia",
    h1: "Video para consultorios médicos en Miami y Broward.",
    lead:
      "Esteban edita el material que el propio consultorio graba en sus salas, y considera jornadas en locación de forma selectiva. Envía los clips que ya tienes, indica cuáles cuentan con autorización firmada del paciente y recibes un siguiente paso concreto. La atención es principalmente en español y también hay comunicación en inglés intermedio.",
    keyword: "marketing de video para consultorios médicos",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Stethoscope,
    bestFor: [
      "Quiroprácticos y fisioterapeutas que quieren explicar un dolor concreto en video.",
      "Clínicas de medicina funcional con grabaciones propias listas para editar.",
      "Centros de atención sin cita que necesitan explicar cómo es la primera visita.",
      "Equipos clínicos que prefieren definir el contenido en español.",
    ],
    scopingQuestions: [
      "¿El video explicará un tratamiento, una molestia específica o la experiencia de la primera visita?",
      "¿Aparecerá algún paciente identificable y existe su autorización escrita?",
      "¿El material ya está grabado o la idea requiere una captura en la clínica?",
      "¿Dónde se publicará: redes verticales, sitio web o pauta?",
    ],
    projectFit:
      "Esta ruta conecta la edición remota con contenido clínico que puede publicarse: primero el consentimiento, después el corte. No promete disponibilidad universal ni asesoría legal.",
    sections: [
      {
        heading: "¿Qué define el consultorio antes de grabar?",
        paragraphs: [
          "Tres decisiones, y ninguna es sobre cámaras. La primera es quién aparece: un profesional, alguien del equipo, un paciente o nadie identificable. Solo el caso del paciente exige una autorización escrita de marketing bajo HIPAA, y esa autorización la conserva el consultorio, así que resolverlo primero es lo que hace posible el material con pacientes reales.",
          "La segunda es la sala. Una sala con ventana suele ganarle a una sin luz natural, y la sala más silenciosa le gana a la más impresionante cuando hay alguien hablando. La tercera es para qué sirve el video: explicar una molestia a alguien que todavía no es paciente, mostrar cómo es la primera visita, o demostrar un ejercicio que un paciente actual pueda seguir en casa. Son tres grabaciones distintas, e intentar sacarlas de una hora improvisada es la razón más común por la que un consultorio termina con material que nunca publica.",
        ],
        bullets: [
          "Decidir quién aparece y conseguir la autorización escrita antes de grabar",
          "Elegir la sala por silencio y luz, no por tamaño",
          "Un objetivo por video: explicar, mostrar la visita o demostrar un ejercicio",
          "Dejar el micrófono cerca de quien habla y lejos del equipo que zumba",
        ],
      },
      {
        heading: "¿Qué se envía cuando el material está listo?",
        paragraphs: [
          "Una carpeta, una lista y las autorizaciones. La carpeta lleva los archivos originales tal como salieron del teléfono o la cámara, no clips reenviados por mensajería, porque esa copia ya viene comprimida y el detalle no se recupera. La lista dice, en una línea por clip, qué es y adónde va: publicación vertical, encabezado del sitio o pauta.",
          "Las autorizaciones pesan igual que los archivos. Señalar qué clips muestran a un paciente identificable, y cuáles de esos están autorizados, permite montar el video solo con material publicable. Agrega el logo en vector o en archivo editable en lugar de una captura de pantalla, el nombre y el cargo de quien aparece en cámara, y la frase exacta del siguiente paso que quieres que tome quien lo vea.",
        ],
        bullets: [
          "Archivos originales, no copias reenviadas por mensajería",
          "Una línea por clip: qué es, dónde se publica y en qué formato",
          "Lista de clips con paciente identificable y cuáles están autorizados",
          "Logo en vector y el siguiente paso redactado tal como debe aparecer",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Hace falta autorización escrita antes de enviar material con pacientes?",
        answer:
          "Sí, siempre que el paciente sea reconocible. HIPAA trata el uso de información identificable del paciente con fines de marketing como algo que el paciente debe autorizar por escrito, y esa autorización la conserva el consultorio. El material del equipo, las salas, los equipos o una demostración hecha sobre personal de la clínica no plantea la misma pregunta.",
      },
      {
        question: "¿Qué puede grabar una clínica sin una jornada de producción?",
        answer:
          "Bastante. Un teléfono sobre un trípode a la altura del pecho cubre a un profesional explicando una molestia a cámara, la demostración de un ejercicio con encuadre lo bastante amplio para ver el cuerpo completo, y un recorrido breve de la sala que imagina quien nunca ha venido. Lo que conviene controlar es que la luz caiga sobre la cara y que la parte hablada se grabe en la sala más silenciosa.",
      },
      {
        question: "¿Se puede mostrar el progreso de un paciente en redes?",
        answer:
          "Con su autorización escrita y con cuidado sobre lo que la comparación insinúa. Un progreso presentado como el resultado que cualquier paciente debería esperar es una afirmación que el consultorio tendría que poder respaldar, así que el encuadre más seguro es la experiencia de una persona contada por ella misma. En la parte visual, dos clips solo se comparan si coinciden posición de cámara, distancia e iluminación.",
      },
    ],
  },
  {
    slug: "edicion-de-video-para-creadores-de-contenido-miami",
    title: "Edición de video para creadores de contenido en Miami",
    metadataTitle: "Edición para Creadores de Contenido",
    description:
      "Edición vertical, subtítulos incrustados y ritmo de publicación para creadores e influencers: una sesión de grabación convertida en varias publicaciones.",
    eyebrow: "Creadores / Influencers / Marca personal",
    h1: "Edición y ritmo de publicación para creadores.",
    lead:
      "Tú grabas; Esteban corta las publicaciones verticales, incrusta los subtítulos y convierte una sola sesión en varias piezas con un orden de publicación. Envía los archivos originales y una línea por clip indicando plataforma y cuenta, y recibes las exportaciones listas en los formatos que piden las redes.",
    keyword: "edición de video para creadores de contenido",
    location: "Miami-Dade / Broward / Remoto",
    availability: "confirmed",
    icon: Megaphone,
    bestFor: [
      "Creadores que publican varias veces por semana y no alcanzan a editar.",
      "Influencers con colaboraciones pagadas que deben declararse en el video.",
      "Marcas personales que graban en bloque y necesitan un orden de publicación.",
      "Cuentas que quieren subtítulos legibles sin depender de los automáticos.",
    ],
    scopingQuestions: [
      "¿En qué plataformas se publica y con qué cuenta?",
      "¿Cuántas ideas distintas trae la sesión grabada?",
      "¿Hay clips con colaboración pagada, producto regalado o enlace de afiliado?",
      "¿Tienes referencias de estilo, sonido o tipografía que debamos seguir?",
    ],
    projectFit:
      "Esta ruta parte de material propio y entrega piezas verticales listas para publicar. No fija cantidad de videos, calendario ni fecha de entrega sin antes revisar la sesión.",
    sections: [
      {
        heading: "¿Cómo se planea una sesión que rinda varias publicaciones?",
        paragraphs: [
          "Si publicas recomendaciones desde tu propia cuenta, consulta la [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami).",
          "Escribiendo la lista antes de tomar la cámara. Una sesión que rinde una pila de piezas publicables nace como una lista de ideas separadas, cada una con su propia primera frase, porque cada publicación es el primer contacto de alguien con la cuenta y no puede depender de la anterior.",
          "De ahí en adelante se trata de reiniciar algo visible entre ideas: otra chaqueta, una segunda pared, pasar de sentado a de pie. Cambios pequeños que evitan que cinco piezas se lean como cinco rebanadas del mismo clip. Mantener fija la iluminación durante todo el bloque es la decisión opuesta, y es deliberada: una luz constante permite ordenar los clips después en cualquier secuencia. Lo último que vale la pena grabar son unos segundos de sala en silencio y dos planos de apoyo, que son los que rescatan una toma con un tropiezo en el medio.",
        ],
        bullets: [
          "Una lista de ideas separadas, cada una con su propia primera frase",
          "Un cambio visible entre bloques para que no parezcan el mismo clip",
          "Iluminación fija durante toda la sesión para poder reordenar después",
          "Unos segundos de sala en silencio y planos de apoyo al final",
        ],
      },
      {
        heading: "¿Qué entrega el creador y para qué sirve la declaración de pauta?",
        paragraphs: [
          "La entrega es corta: archivos originales, una línea por clip, la plataforma y la cuenta de destino, y cualquier referencia o audio que ya tengas en mente. Nombrar la plataforma importa porque la zona segura cambia entre una publicación de feed y una vertical a pantalla completa, y el texto colocado para la otra queda tapado por la interfaz.",
          "La declaración es la parte que conviene resolver bien desde el principio. Cuando existe una relación material con una marca (pago, producto regalado, afiliación, un vínculo personal), la FTC espera que se declare de forma clara y visible donde el público realmente la note, es decir dentro del video y en lo que se dice, no solo en una descripción que hay que desplegar. Avisar al editor qué clips son colaboraciones pagadas es lo que mantiene la declaración dentro del corte.",
        ],
        bullets: [
          "Archivos originales, nunca descargas de la propia plataforma",
          "Plataforma y cuenta por clip, para colocar el texto en la zona segura",
          "Aviso de qué clips son pagados, regalados o de afiliado",
          "Subtítulos incrustados, porque gran parte del feed se reproduce sin audio",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué archivos debe enviar un creador para empezar a editar?",
        answer:
          "Los originales de la cámara o del teléfono, no material vuelto a descargar desde una aplicación, porque esa exportación ya está comprimida y no se puede devolver el detalle. Con ellos, una línea por clip con el objetivo de la pieza, la cuenta y la plataforma de destino, cualquier colaboración pagada y la música o referencia que tengas en mente.",
      },
      {
        question: "¿Por qué los subtítulos van en el centro del encuadre?",
        answer:
          "Porque la aplicación dibuja el nombre de usuario, la descripción, la barra de audio y toda la columna de botones encima del video. Un texto que en el editor se ve perfecto puede quedar tapado en el teléfono. Mantener la tipografía dentro de la banda central, con suficiente contraste y peso, es la diferencia entre una pieza legible y una que nadie pudo leer.",
      },
      {
        question: "¿Una sola sesión puede cubrir una semana de publicaciones?",
        answer:
          "Puede, cuando la sesión se planea como una lista de ideas distintas y no como una sola toma larga. Cada idea necesita su propia frase de apertura, porque quien llega a la cuarta publicación no vio las tres anteriores. Cambiar una prenda o moverse a otra pared entre bloques evita que el conjunto se note grabado de una sola vez.",
      },
    ],
  },
  {
    slug: "edicion-de-video-marca-blanca-para-agencias",
    title: "Edición de video en marca blanca para agencias y fotógrafos",
    metadataTitle: "Edición en Marca Blanca para Agencias",
    description:
      "Edición de video sin marca para agencias de marketing y fotógrafos que venden la grabación y subcontratan la postproducción. Tu cliente, tu entrega, tu nombre.",
    eyebrow: "Agencias / Fotógrafos / Estudios",
    h1: "Edición en marca blanca para agencias y fotógrafos.",
    lead:
      "Tú vendiste la grabación y conservas al cliente. Esteban monta el material y devuelve archivos sin marca, nombrados a tu convención, sin logo, sin crédito y sin contacto con el cliente final. Envía los archivos de cámara, los recursos de marca y un brief de una página.",
    keyword: "edición de video en marca blanca",
    location: "South Florida / Remoto",
    availability: "confirmed",
    icon: Handshake,
    bestFor: [
      "Agencias de marketing que venden video y no tienen editor de planta.",
      "Fotógrafos que graban en los mismos trabajos y subcontratan el montaje.",
      "Estudios con picos de trabajo que necesitan capacidad adicional.",
      "Equipos que requieren entregas sin marca listas para su propio cliente.",
    ],
    scopingQuestions: [
      "¿Qué entregables, formatos y relaciones de aspecto necesita el cliente final?",
      "¿Con qué cámara y perfil de imagen se grabó, y existe un LUT o grado aprobado?",
      "¿Quién será el único punto de contacto para las notas de revisión?",
      "¿Qué convención de nombres y estructura de carpetas usan en la entrega?",
    ],
    projectFit:
      "Esta ruta es capacidad de postproducción para estudios: entrega sin marca, comunicación solo con el estudio y nada publicado como referencia sin su permiso.",
    sections: [
      {
        heading: "¿Qué debe incluir el paquete que envía el estudio?",
        paragraphs: [
          "Todo lo necesario para montar sin hacer una sola pregunta, que en la práctica son cinco cosas. Los archivos originales de cámara, incluida la segunda cámara si existe, con su estructura de carpetas intacta en lugar de aplanada. El audio grabado por separado, si se usó grabadora o corbatero, para sincronizarlo en lugar de reconstruirlo desde la pista de la cámara.",
          "Después, los recursos de marca en vector o en archivo por capas, porque un logo tomado de una página web es una fotografía de baja resolución de un logo. Un brief que nombre cada entregable, su relación de aspecto, su destino y su convención de nombres. Y la línea técnica: modelo de cámara, perfil de imagen, cuadros por segundo y cualquier LUT o grado aprobado. Ese último punto es el que más falta y el que decide si el montaje inicial llega con el aspecto del estudio o con una suposición.",
        ],
        bullets: [
          "Archivos originales de todas las cámaras, con sus carpetas intactas",
          "Audio grabado por separado para sincronizar, no reconstruir",
          "Marca en vector o por capas, nunca una captura de pantalla",
          "Cámara, perfil de imagen, cuadros por segundo y el LUT o grado aprobado",
        ],
      },
      {
        heading: "¿Quién habla con quién mientras corre la edición?",
        paragraphs: [
          "El estudio. La relación con el cliente final se queda con quien vendió el trabajo, así que las notas viajan a través de un único contacto designado y no llegan desde varios lados. No es una preferencia de orden: en trabajo subcontratado cada nota ya pasó por el cliente y por el estudio, y dos versiones de la misma instrucción cuestan una pasada completa sobre la línea de tiempo.",
          "La forma práctica es una sola lista consolidada por ronda, con códigos de tiempo, y un acuerdo sobre cuántas rondas incluye el trabajo antes de empezar. En la entrega los archivos van sin marca ni logo, y el trabajo no se publica como referencia pública salvo que el estudio lo autorice. Contarle o no al cliente final que la postproducción está subcontratada es una decisión del estudio, y nada en los archivos la toma por él.",
        ],
        bullets: [
          "Un único punto de contacto en el estudio para todas las notas",
          "Una lista consolidada por ronda, con códigos de tiempo",
          "Número de rondas acordado antes de empezar, no después",
          "Archivos sin marca y cero publicación como referencia sin permiso",
        ],
      },
    ],
    faqs: [
      {
        question: "¿El cliente final se enterará de que hubo un editor externo?",
        answer:
          "No por los archivos. Los entregables llegan sin marca, nombrados como pide el estudio y sin crédito, logo ni datos de contacto. La comunicación se mantiene con el estudio en lugar de ir directo al cliente final, y el trabajo no se muestra como referencia pública sin su autorización. Contarlo o no es una decisión del estudio.",
      },
      {
        question: "¿Se puede igualar un aspecto que la agencia ya tiene establecido?",
        answer:
          "Sí, y el camino más corto es una referencia que la agencia ya posea: una exportación terminada de un trabajo anterior, un LUT o un fotograma ya coloreado. Igualar un aspecto descrito con palabras cuesta más pasadas que igualar uno mostrado. Si el material viene de una cámara o un perfil nuevos para ese cliente, un clip de prueba coloreado antes del montaje completo evita una marcha atrás al final.",
      },
      {
        question: "¿Cómo se manejan las revisiones en un proyecto de marca blanca?",
        answer:
          "Como una lista consolidada por ronda, con códigos de tiempo, enviada desde un único contacto del estudio. Importa más aquí que en el trabajo directo, porque cada nota ya pasó por el cliente final y por la agencia, y dos personas con instrucciones contradictorias cuestan una pasada completa. Acordar de antemano cuántas rondas incluye el trabajo protege el alcance que el estudio cotizó.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-salones-y-barberias-miami",
    title: "Marketing de video para salones y barberías en Miami",
    metadataTitle: "Video para Salones y Barberías Miami",
    description:
      "Edición de video para salones de belleza, barberías y estudios de uñas en Miami y Fort Lauderdale: transformaciones, primeros planos y piezas verticales.",
    eyebrow: "Salones / Barberías / Estudios de uñas",
    h1: "Video para salones, barberías y estudios de uñas.",
    lead:
      "Graba la silla antes de empezar, dos o tres momentos del trabajo y la revelación desde el mismo punto. Esteban convierte esos clips en piezas verticales con el color corregido para que el resultado en pantalla se parezca al del espejo. Envía una semana de material y una nota de qué clientes dieron permiso.",
    keyword: "marketing de video para salones y barberías",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Scissors,
    bestFor: [
      "Salones de belleza que quieren mostrar transformaciones de color.",
      "Barberías que graban entre clientes y no alcanzan a editar.",
      "Estudios de uñas que necesitan primeros planos realmente nítidos.",
      "Locales con agenda que publican para llenar huecos de la semana.",
    ],
    scopingQuestions: [
      "¿Existe ya un punto fijo del local para grabar antes y después?",
      "¿Los clientes que aparecen dieron permiso para publicar?",
      "¿El contenido muestra color, corte, uñas o el ambiente del local?",
      "¿Dónde se publica y con qué frecuencia quieres sostenerlo?",
    ],
    projectFit:
      "Esta ruta parte de material grabado entre clientes y entrega piezas verticales. No promete cantidad de publicaciones ni resultados de agenda.",
    updated: "2026-10-07",
    sections: [
      {
        heading: "¿Cuánto cuesta el video para un salón o una barbería en Miami?",
        paragraphs: [
          `Si el local ya graba transformaciones con el teléfono, la edición empieza desde ${esStarterFrom} por proyecto con el [paquete Arranque](/es/precios/arranque): edición remota, cortes verticales para Reels o TikTok y una ronda de revisión. Un promocional terminado o un anuncio para redes queda en la banda de edición corta de la calculadora, de ${esSocialBand} por proyecto. Son cifras orientativas de un editor independiente con un descuento de introducción aplicado; la cotización por escrito fija el alcance real.`,
          "Lo que mueve el número es el volumen y el orden. Una semana de clips del antes, el trabajo y la revelación, grabados desde el mismo punto marcado, se edita rápido. Clips sin nombre de varias estaciones, con luz mezclada, toman más tiempo porque primero hay que igualar el color.",
        ],
      },
      {
        heading: "¿Cuánto cuesta grabar dentro del salón?",
        paragraphs: [
          `Cuando el local quiere que alguien venga a grabar, [Presencia Local](/es/precios/presencia-local) empieza desde ${esLocalFrom} por día de producción e incluye preproducción, captura en locación, edición posterior y entregables según formato, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. El complemento de media jornada de captura tiene un rango orientativo de ${esHalfDayBand}, con la misma base; son alternativas, no una suma.`,
          "Una grabación en el salón avanza más rápido cuando se agenda junto con las citas y no en contra de ellas. Elige un bloque en que un estilista o barbero tenga un cliente dispuesto, una silla con luz constante y unos minutos libres para decir algo útil a cámara.",
        ],
      },
      {
        heading: "¿Cuánto cuesta un plan mensual de publicaciones para un salón?",
        paragraphs: [
          `El [plan Crecimiento](/es/precios/crecimiento) empieza desde ${esGrowthFrom} al mes e incluye plan de contenido, calendario de publicación, edición y reporte mensual. Encaja con un salón o una barbería que graba cada semana pero no tiene a nadie encargado de convertir los clips en publicaciones constantes, y que prefiere dedicar ese tiempo a los clientes en la silla.`,
          "El plan depende de que el material llegue a tiempo. Una carpeta compartida, un bloque de grabación por semana y una línea por clip que diga qué servicio muestra y quién dio permiso suele bastar. Los estudios de uñas deben enviar aparte los primeros planos, con la mano apoyada para que salgan nítidos. Compara opciones en la [calculadora](/es/calculadora) antes de pedir cotización en [contacto](/es/contacto).",
        ],
      },
      {
        heading: "¿Dónde debe vivir la cámara dentro del local?",
        paragraphs: [
          "En un solo lugar elegido, siempre el mismo. Fijar una estación y una posición de cámara convierte la grabación en un hábito en lugar de una decisión, y es también lo que hace comparables el antes y el después, porque lo único que debería cambiar entre las dos tomas es el cabello.",
          "El lugar que conviene elegir es el de luz más constante. Una estación junto a la ventana da una luz favorecedora pero cambia de color a lo largo del día y pelea con los focos cálidos del techo; una estación iluminada sobre todo por las lámparas del local es menos bonita pero repetible. Cualquiera de las dos funciona, siempre que se elija una y el balance de blancos se fije para ella en lugar de dejar que la cámara adivine. Un teléfono apoyado en un estante o sujeto al espejo a la altura del pecho es más estable que cualquier toma a pulso.",
        ],
        bullets: [
          "Una estación y una posición de cámara marcadas, siempre las mismas",
          "Balance de blancos fijado para la luz dominante, no automático",
          "Teléfono apoyado o sujeto, a la altura del pecho",
          "El antes se graba antes de tocar el cabello, no se recuerda después",
        ],
      },
      {
        heading: "¿Cuáles son las tres formas que vale la pena grabar cada semana?",
        paragraphs: [
          "La transformación, el detalle y la explicación. La transformación son dos tomas desde la misma posición, una antes de empezar y otra en la revelación, con dos o tres momentos breves del trabajo en medio. El detalle es el primer plano cerrado: el acabado de las uñas, la línea del degradado, el patrón del rizo, grabado con la mano apoyada porque a esa distancia la profundidad enfocada es mínima y las manos se mueven.",
          "La explicación es alguien del equipo diciendo algo útil a cámara: por qué se eligió un tono, cómo mantenerlo en casa, qué pedir la próxima vez. Cada forma toma menos de un minuto de la jornada y ninguna exige cerrar el local. Lo único no negociable es el permiso: quien se sienta en la silla no aceptó aparecer en una cuenta de negocio por sentarse, así que conviene preguntar antes de grabar y enviar la nota de quién dijo sí junto con los clips.",
        ],
        bullets: [
          "Transformación: dos tomas desde el mismo punto, con momentos breves en medio",
          "Detalle: primer plano con la mano apoyada para que salga nítido",
          "Explicación: una frase útil del estilista a cámara",
          "Permiso preguntado antes de grabar y anotado junto a los clips",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué debe grabar un salón en un día normal de trabajo?",
        answer:
          "Las piezas de una transformación, en orden: el cliente en la silla antes de empezar, dos o tres momentos breves del trabajo y el resultado final grabado desde la misma posición que la primera toma. Agrega unos segundos del local y una frase del estilista sobre lo que se hizo. Nada de eso exige cerrar el local.",
      },
      {
        question: "¿Hace falta permiso del cliente antes de publicar su corte?",
        answer:
          "Sí, y conviene pedirlo antes de grabar y no después. Alguien sentado con la capa puesta no aceptó aparecer en una cuenta de negocio solo por estar ahí, y un cliente que dice no más tarde deja un montaje construido alrededor de una cara que no se puede mostrar. Una nota de quién dio permiso, enviada con el material, evita esa situación.",
      },
      {
        question: "¿Por qué el color del cabello se ve distinto en cámara?",
        answer:
          "Casi siempre porque la luz está mezclada. La luz de la ventana es azul comparada con los focos cálidos de la estación, y cuando ambas caen sobre la misma cabeza la cámara tiene que elegir una, así que la otra tiñe todo lo que toca. Grabar siempre en el mismo punto, con la silla orientada hacia la luz dominante, se acerca mucho más al resultado real que cualquier corrección posterior.",
      },
    ],
  },
  {
    slug: "marketing-de-video-para-detallado-y-wraps-miami",
    title: "Marketing de video para detallado, polarizado y wraps en Miami",
    metadataTitle: "Video para Detallado y Wraps Miami",
    description:
      "Edición de video para talleres de detallado, polarizado y wrap de vinilo en el sur de Florida: reflejos controlados y comparaciones antes y después honestas.",
    eyebrow: "Detallado / Polarizado / Wrap de vinilo",
    h1: "Video para talleres de detallado, polarizado y wraps.",
    lead:
      "Una lámina corregida se comporta como un espejo, así que la toma trata en realidad de lo que se refleja en ella. Marca un punto fijo en la bahía, graba unos segundos al inicio y al final de cada trabajo, y Esteban monta comparaciones donde lo único que cambió es el trabajo. Envía los clips y el servicio al que corresponde cada uno.",
    keyword: "marketing de video para detallado y wraps",
    location: "Miami-Dade / Broward",
    availability: "confirmed",
    icon: Car,
    bestFor: [
      "Talleres de detallado y corrección de pintura que quieren mostrar el antes y después.",
      "Instaladores de polarizado que necesitan explicar lo que se ve desde dentro.",
      "Talleres de wrap de vinilo que viven de los bordes y los acabados.",
      "Negocios automotrices de servicio, distintos de un concesionario.",
    ],
    scopingQuestions: [
      "¿Ya existe un punto marcado en la bahía para grabar siempre igual?",
      "¿El contenido muestra corrección de pintura, recubrimiento, polarizado o wrap?",
      "¿Hay una fuente de luz dura disponible para levantar los defectos del antes?",
      "¿Qué quieres que haga quien lo vea: pedir cotización, escribir o pasar al taller?",
    ],
    projectFit:
      "Esta ruta parte de material grabado en la bahía y entrega comparaciones y piezas verticales. Las cifras de rechazo de calor o durabilidad quedan con el fabricante de la lámina.",
    sections: [
      {
        heading: "¿Cómo se controla el reflejo dentro de una bahía de trabajo?",
        paragraphs: [
          "Decidiendo qué le permites ver a la pintura. Una lámina terminada es un espejo, así que una toma de un auto en una bahía desordenada es una toma del desorden. Mover el auto a un punto que mire al cielo abierto, a una pared lisa o a una cortina metálica cerrada cambia la imagen más que cualquier ajuste posterior.",
          "El segundo control es la luz. Las luminarias amplias del techo envuelven la lámina de manera uniforme, y por eso las marcas de remolino y los hologramas desaparecen en cámara aunque sean evidentes en persona. Una sola luz dura, o el sol bajo, rasante sobre la superficie, devuelve los defectos para la toma del antes; y la misma técnica después de la corrección es lo que hace que el acabado se vea profundo en lugar de plano. Las dos tomas quieren el mismo tratamiento, porque una comparación donde solo cambió la luz no es una comparación.",
        ],
        bullets: [
          "Elegir qué se refleja: cielo abierto, pared lisa o cortina cerrada",
          "Una luz dura rasante para levantar remolinos en la toma del antes",
          "La misma luz después de la corrección, para que la comparación valga",
          "Revisar la pantalla en las tomas de polarizado antes de mover el auto",
        ],
      },
      {
        heading: "¿Qué se queda fuera de un video de detallado o polarizado?",
        paragraphs: [
          "Las cifras de desempeño que pertenecen a otro. El rechazo de calor, la protección ultravioleta y los años de durabilidad son afirmaciones del fabricante de la lámina o del recubrimiento, y un taller que las repite en su propia voz está respaldando datos que no generó. El camino más seguro y más convincente es mostrar lo que la cámara sí puede registrar: un borde instalado con un corte limpio, la vista desde dentro de un vidrio tratado frente a uno sin tratar, el agua comportándose distinto sobre una lámina recubierta.",
          "La misma disciplina aplica a la comparación. Un antes y después es honesto cuando coinciden posición, altura, distancia y luz, y deja de serlo en silencio cuando el después se graba con mejor luz. Marcar la posición de grabación en el piso es un hábito pequeño que convierte cada auto que pasa por la bahía en material usable y mantiene la afirmación dentro de lo que el video muestra.",
        ],
        bullets: [
          "Las cifras de calor y durabilidad se dejan al fabricante de la lámina",
          "Se muestra el borde instalado, el corte y la vista desde dentro",
          "El después se graba con la misma luz y la misma posición que el antes",
          "Posición de grabación marcada en el piso de la bahía",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo se graba un antes y después en el taller?",
        answer:
          "Mismo punto, misma altura de cámara, misma luz, las dos veces. Una corrección se ve dramática en persona porque cambió el reflejo, y la única forma de mostrarlo en pantalla es dejar que quien mira compare dos tomas que no se diferencian en nada excepto la pintura. Marcar la posición en el piso es la forma más simple de hacerlo repetible.",
      },
      {
        question: "¿Por qué las marcas de remolino desaparecen en cámara?",
        answer:
          "Porque solo se ven bajo una luz dura y única, y la mayoría de los talleres está iluminada por luminarias amplias que envuelven la lámina y esconden justo lo que quieres mostrar. Una luz direccional, o el sol en ángulo bajo, rasante sobre la pintura, devuelve los defectos. La misma técnica después de la corrección es lo que hace que la lámina se vea profunda.",
      },
      {
        question: "¿Se puede grabar sin cerrar la bahía?",
        answer:
          "Sí, siempre que la posición de cámara se decida una vez y se reutilice. Un teléfono en trípode sobre un punto marcado, un fondo limpio detrás del auto y unos segundos capturados al inicio y al final de cada trabajo alcanzan para sostener publicaciones. Lo que arruina el material no es la falta de estudio, sino un reflejo desordenado y un ángulo distinto cada vez.",
      },
    ],
  },
];



export const spanishCoreRoutes = [
  "/es",
  "/es/servicios",
  "/es/precios",
  "/es/portafolio",
  "/es/areas",
  "/es/areas/palm-beach-county",
  "/es/sobre-esteban",
  "/es/contacto",
  "/es/calculadora",
  "/es/recursos/kit-video-social",
  "/es/evaluacion",
];

/**
 * The 2026-10-06 niche batch, paired in both directions.
 *
 * hreflang is discarded unless both documents point at each other, so each new
 * page appears twice here: once under its English path and once under its
 * Spanish one, with identical values.
 */
const nicheBatch20261006 = Object.fromEntries(
  (
    [
      [
        "/services/medical-practice-video-marketing-miami",
        "/es/marketing-de-video-para-consultorios-medicos-miami",
      ],
      [
        "/services/content-creator-video-editing-miami",
        "/es/edicion-de-video-para-creadores-de-contenido-miami",
      ],
      [
        "/services/white-label-video-editing-for-agencies",
        "/es/edicion-de-video-marca-blanca-para-agencias",
      ],
      [
        "/services/salon-barbershop-video-marketing-miami",
        "/es/marketing-de-video-para-salones-y-barberias-miami",
      ],
      [
        "/services/auto-detailing-tint-wrap-video-marketing-miami",
        "/es/marketing-de-video-para-detallado-y-wraps-miami",
      ],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

/**
 * Spanish niche pages that shipped WITHOUT an English counterpart in the
 * hreflang map, and therefore served only a self-referencing `es-US`.
 *
 * Measured 2026-10-06 by probing the served HTML of all 103 static Spanish
 * routes: 63 emitted the correct three alternates, **36 emitted exactly one**
 * (themselves), and 4 emitted none. An unpaired Spanish page tells Google
 * nothing about its English twin, so Google is free to pick the English page
 * for a Spanish query — which is exactly what the Search Console data shows:
 * for "editor de reels fort lauderdale" the Spanish page does not appear at
 * all, while the ENGLISH page ranks 15.0 and /areas and /es outrank it.
 *
 * Each pair below was matched by hand and verified before shipping: both sides
 * return 200, and no English target was already claimed by a different Spanish
 * page. An automated fuzzy match was tried first and rejected — it mapped the
 * lawyer, dentist, gym, medspa and contractor pages all onto the AUTOMOTIVE
 * page, and a wrong hreflang pair is worse than a missing one because it tells
 * Google two unrelated pages are translations of each other. The safety check
 * then caught a real conflict (`real-estate-drone-video-editing-miami` was
 * already paired to `/es/drone-real-estate-miami`) and that pair was dropped.
 *
 * One further pair, for a Miami financial-district sub-city page, was removed
 * after `customer-ranking-pages.test.ts` failed: that neighbourhood is an
 * explicitly gated phrase in public copy and this file is one of the sources
 * that test scans. Sub-city coverage stays gated — including in comments,
 * which is how this was caught the second time.
 *
 * Ten further pairs were removed after the sitemap test failed: every page in
 * them is CONSOLIDATED by the 2026-08-12 cohort decision, i.e. merged or
 * noindexed and deliberately absent from the sitemap. Advertising an hreflang
 * pair for a page we have told Google not to index is a contradictory signal,
 * the same class of mistake the sitemap filter exists to prevent.
 *
 * Pages left unpaired on purpose: those with no unambiguous English twin
 * (videografo-en-miami, fotografo-en-fort-lauderdale, the Palm Beach County
 * pages) or where pairing would double-claim an English page that already has
 * a Spanish counterpart. Note: on 2026-10-07 the served pages were compared and
 * both target financial advisors / wealth managers in Miami, so
 * asesores-financieros is paired now with wealth-management-video-production-miami
 * (along with real-estate-reels-video-editor-south-florida and
 * editor-de-video-real-estate-miami).
 */
const nicheBatch20261006Hreflang = Object.fromEntries(
  (
    [
      ["/services/reels-editor-fort-lauderdale", "/es/editor-de-reels-fort-lauderdale"],
      ["/services/reels-editor-miami", "/es/editor-de-reels-miami"],
      ["/services/real-estate-reels-video-editor-south-florida", "/es/editor-de-video-real-estate-miami"],
      ["/services/wealth-management-video-production-miami", "/es/produccion-de-video-para-asesores-financieros-miami"],
      ["/services/med-spa-video-marketing-south-florida", "/es/marketing-de-video-para-clinicas-esteticas-miami"],
      ["/services/contractor-video-marketing-south-florida", "/es/marketing-de-video-para-contratistas-miami"],
      ["/services/dental-video-marketing-south-florida", "/es/marketing-de-video-para-dentistas-miami"],
      ["/services/fitness-gym-video-marketing-miami", "/es/marketing-de-video-para-gimnasios-miami"],
      ["/services/cosmetic-dentistry-video-marketing-miami", "/es/marketing-de-video-para-odontologia-estetica-miami"],
      ["/services/wellness-spa-video-marketing-miami", "/es/marketing-de-video-para-spas-y-bienestar-miami"],
      ["/services/music-video-post-production-miami", "/es/postproduccion-de-videos-musicales-miami"],
      ["/services/brand-video-production-miami", "/es/produccion-de-video-de-marca-miami"],
      ["/services/video-production-fort-lauderdale", "/es/produccion-de-video-fort-lauderdale"],
      ["/services/hotel-hospitality-video-production-miami", "/es/produccion-de-video-para-hoteles-miami"],
      ["/services/content-repurposing-service-miami", "/es/reutilizacion-de-contenido-para-redes-miami"],
    ] as const
  ).flatMap(([en, es]) =>
    [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }] as const),
  ),
);

const languageAlternatesRaw: Record<string, Record<string, string>> = {
  "/services/food-and-places-creator-video-editing-miami": {
    "en-US": "/services/food-and-places-creator-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    "x-default": "/services/food-and-places-creator-video-editing-miami",
  },
  "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami": {
    "en-US": "/services/food-and-places-creator-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
    "x-default": "/services/food-and-places-creator-video-editing-miami",
  },
  ...nicheBatch20261006,
  ...nicheBatch20261006Hreflang,
  ...Object.fromEntries(Object.values(packageRoutes).flatMap(({ en, es }) => [en, es].map((path) => [path, { "en-US": en, "es-US": es, "x-default": en }]))),
  "/pricing/real-estate": {
    "en-US": "/pricing/real-estate",
    "es-US": "/es/precios/inmobiliaria",
    "x-default": "/pricing/real-estate",
  },
  "/es/precios/inmobiliaria": {
    "en-US": "/pricing/real-estate",
    "es-US": "/es/precios/inmobiliaria",
    "x-default": "/pricing/real-estate",
  },
  "/pricing": {
    "en-US": "/pricing",
    "es-US": "/es/precios",
    "x-default": "/pricing",
  },
  "/es/precios": {
    "en-US": "/pricing",
    "es-US": "/es/precios",
    "x-default": "/pricing",
  },
  "/daily-script-pacing-calculator": {
    "en-US": "/daily-script-pacing-calculator",
    "es-US": "/es/calculadora-de-ritmo-de-video",
    "x-default": "/daily-script-pacing-calculator",
  },
  "/es/calculadora-de-ritmo-de-video": {
    "en-US": "/daily-script-pacing-calculator",
    "es-US": "/es/calculadora-de-ritmo-de-video",
    "x-default": "/daily-script-pacing-calculator",
  },
  // Case Study pairs (2026-08-14): Banacol, Homeowners, FLAS, Healthy Smile, My D'ler
  "/case-studies/banacol": {
    "en-US": "/case-studies/banacol",
    "es-US": "/es/casos-de-estudio/banacol",
    "x-default": "/case-studies/banacol",
  },
  "/es/casos-de-estudio/banacol": {
    "en-US": "/case-studies/banacol",
    "es-US": "/es/casos-de-estudio/banacol",
    "x-default": "/case-studies/banacol",
  },
  "/case-studies/homeowners": {
    "en-US": "/case-studies/homeowners",
    "es-US": "/es/casos-de-estudio/homeowners",
    "x-default": "/case-studies/homeowners",
  },
  "/es/casos-de-estudio/homeowners": {
    "en-US": "/case-studies/homeowners",
    "es-US": "/es/casos-de-estudio/homeowners",
    "x-default": "/case-studies/homeowners",
  },
  "/case-studies/flas-concierge": {
    "en-US": "/case-studies/flas-concierge",
    "es-US": "/es/casos-de-estudio/flas-concierge",
    "x-default": "/case-studies/flas-concierge",
  },
  "/es/casos-de-estudio/flas-concierge": {
    "en-US": "/case-studies/flas-concierge",
    "es-US": "/es/casos-de-estudio/flas-concierge",
    "x-default": "/case-studies/flas-concierge",
  },
  "/case-studies/healthy-smile": {
    "en-US": "/case-studies/healthy-smile",
    "es-US": "/es/casos-de-estudio/healthy-smile",
    "x-default": "/case-studies/healthy-smile",
  },
  "/es/casos-de-estudio/healthy-smile": {
    "en-US": "/case-studies/healthy-smile",
    "es-US": "/es/casos-de-estudio/healthy-smile",
    "x-default": "/case-studies/healthy-smile",
  },
  "/case-studies/my-dler": {
    "en-US": "/case-studies/my-dler",
    "es-US": "/es/casos-de-estudio/my-dler",
    "x-default": "/case-studies/my-dler",
  },
  "/es/casos-de-estudio/my-dler": {
    "en-US": "/case-studies/my-dler",
    "es-US": "/es/casos-de-estudio/my-dler",
    "x-default": "/case-studies/my-dler",
  },
  // pembroke-pines was previously hardcoded inside buildSpanishNicheMetadata.
  // Moved here so every pair lives in one place and both languages read it.
  "/services/small-business-video-pembroke-pines": {
    "en-US": "/services/small-business-video-pembroke-pines",
    "es-US": "/es/video-para-pequenos-negocios-pembroke-pines",
    "x-default": "/services/small-business-video-pembroke-pines",
  },
  "/es/video-para-pequenos-negocios-pembroke-pines": {
    "en-US": "/services/small-business-video-pembroke-pines",
    "es-US": "/es/video-para-pequenos-negocios-pembroke-pines",
    "x-default": "/services/small-business-video-pembroke-pines",
  },
  // Bilingual service/niche pairs (2026-08-14). Both languages stay live —
  // Spanish serves the large bilingual audience, English is the ranking engine
  // for Miami-Dade / Broward / Palm Beach. Before this, only 17 shell pages
  // were paired, so the 62 English service pages and their Spanish
  // equivalents had NO hreflang and no toggle between them.
  // x-default points at English by design: US search intent for these
  // services is English (Semrush 2026-08-13 — "videografo miami" returns no
  // US data at all, while "videographer miami" is 260/mo at KD 26).
  "/services/ai-food-photography-restaurants": {
    "en-US": "/services/ai-food-photography-restaurants",
    "es-US": "/es/fotografia-de-comida-con-ia-restaurantes",
    "x-default": "/services/ai-food-photography-restaurants",
  },
  "/es/fotografia-de-comida-con-ia-restaurantes": {
    "en-US": "/services/ai-food-photography-restaurants",
    "es-US": "/es/fotografia-de-comida-con-ia-restaurantes",
    "x-default": "/services/ai-food-photography-restaurants",
  },
  "/services/ai-product-photography-miami": {
    "en-US": "/services/ai-product-photography-miami",
    "es-US": "/es/fotografia-de-producto-con-ia-miami",
    "x-default": "/services/ai-product-photography-miami",
  },
  "/es/fotografia-de-producto-con-ia-miami": {
    "en-US": "/services/ai-product-photography-miami",
    "es-US": "/es/fotografia-de-producto-con-ia-miami",
    "x-default": "/services/ai-product-photography-miami",
  },
  "/services/ai-real-estate-photo-enhancement": {
    "en-US": "/services/ai-real-estate-photo-enhancement",
    "es-US": "/es/fotos-con-ia-para-bienes-raices-miami",
    "x-default": "/services/ai-real-estate-photo-enhancement",
  },
  "/es/fotos-con-ia-para-bienes-raices-miami": {
    "en-US": "/services/ai-real-estate-photo-enhancement",
    "es-US": "/es/fotos-con-ia-para-bienes-raices-miami",
    "x-default": "/services/ai-real-estate-photo-enhancement",
  },
  "/services/architecture-design-video-miami": {
    "en-US": "/services/architecture-design-video-miami",
    "es-US": "/es/video-para-arquitectura-y-diseno-miami",
    "x-default": "/services/architecture-design-video-miami",
  },
  "/es/video-para-arquitectura-y-diseno-miami": {
    "en-US": "/services/architecture-design-video-miami",
    "es-US": "/es/video-para-arquitectura-y-diseno-miami",
    "x-default": "/services/architecture-design-video-miami",
  },
  "/services/automotive-video-marketing-miami": {
    "en-US": "/services/automotive-video-marketing-miami",
    "es-US": "/es/marketing-de-video-automotriz-miami",
    "x-default": "/services/automotive-video-marketing-miami",
  },
  "/es/marketing-de-video-automotriz-miami": {
    "en-US": "/services/automotive-video-marketing-miami",
    "es-US": "/es/marketing-de-video-automotriz-miami",
    "x-default": "/services/automotive-video-marketing-miami",
  },
  "/services/boutique-hotel-video-editing-miami": {
    "en-US": "/services/boutique-hotel-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-hoteles-boutique-miami",
    "x-default": "/services/boutique-hotel-video-editing-miami",
  },
  "/es/edicion-de-video-para-hoteles-boutique-miami": {
    "en-US": "/services/boutique-hotel-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-hoteles-boutique-miami",
    "x-default": "/services/boutique-hotel-video-editing-miami",
  },
  "/services/corporate-training-video-editing-miami": {
    "en-US": "/services/corporate-training-video-editing-miami",
    "es-US": "/es/edicion-de-video-de-capacitacion-corporativa-miami",
    "x-default": "/services/corporate-training-video-editing-miami",
  },
  "/es/edicion-de-video-de-capacitacion-corporativa-miami": {
    "en-US": "/services/corporate-training-video-editing-miami",
    "es-US": "/es/edicion-de-video-de-capacitacion-corporativa-miami",
    "x-default": "/services/corporate-training-video-editing-miami",
  },
  "/services/corporate-video-editing-weston-fl": {
    "en-US": "/services/corporate-video-editing-weston-fl",
    "es-US": "/es/edicion-de-video-corporativo-weston",
    "x-default": "/services/corporate-video-editing-weston-fl",
  },
  "/es/edicion-de-video-corporativo-weston": {
    "en-US": "/services/corporate-video-editing-weston-fl",
    "es-US": "/es/edicion-de-video-corporativo-weston",
    "x-default": "/services/corporate-video-editing-weston-fl",
  },
  "/services/creative-video-production-wynwood": {
    "en-US": "/services/creative-video-production-wynwood",
    "es-US": "/es/video-creativo-wynwood-miami",
    "x-default": "/services/creative-video-production-wynwood",
  },
  "/es/video-creativo-wynwood-miami": {
    "en-US": "/services/creative-video-production-wynwood",
    "es-US": "/es/video-creativo-wynwood-miami",
    "x-default": "/services/creative-video-production-wynwood",
  },
  "/services/crowdfunding-video-editor-miami": {
    "en-US": "/services/crowdfunding-video-editor-miami",
    "es-US": "/es/editor-de-video-para-campanas-de-crowdfunding",
    "x-default": "/services/crowdfunding-video-editor-miami",
  },
  "/es/editor-de-video-para-campanas-de-crowdfunding": {
    "en-US": "/services/crowdfunding-video-editor-miami",
    "es-US": "/es/editor-de-video-para-campanas-de-crowdfunding",
    "x-default": "/services/crowdfunding-video-editor-miami",
  },
  "/services/drone-video-editing-service-miami": {
    "en-US": "/services/drone-video-editing-service-miami",
    "es-US": "/es/edicion-de-video-con-dron-miami",
    "x-default": "/services/drone-video-editing-service-miami",
  },
  "/es/edicion-de-video-con-dron-miami": {
    "en-US": "/services/drone-video-editing-service-miami",
    "es-US": "/es/edicion-de-video-con-dron-miami",
    "x-default": "/services/drone-video-editing-service-miami",
  },
  "/services/ecommerce-product-video-editor-miami": {
    "en-US": "/services/ecommerce-product-video-editor-miami",
    "es-US": "/es/editor-de-video-de-productos-para-ecommerce",
    "x-default": "/services/ecommerce-product-video-editor-miami",
  },
  "/es/editor-de-video-de-productos-para-ecommerce": {
    "en-US": "/services/ecommerce-product-video-editor-miami",
    "es-US": "/es/editor-de-video-de-productos-para-ecommerce",
    "x-default": "/services/ecommerce-product-video-editor-miami",
  },
  "/services/event-video-editing-miami": {
    "en-US": "/services/event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-eventos-miami",
    "x-default": "/services/event-video-editing-miami",
  },
  "/es/edicion-de-video-para-eventos-miami": {
    "en-US": "/services/event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-eventos-miami",
    "x-default": "/services/event-video-editing-miami",
  },
  "/services/headshot-photographer-miami": {
    "en-US": "/services/headshot-photographer-miami",
    "es-US": "/es/fotografo-de-retratos-y-headshots-miami",
    "x-default": "/services/headshot-photographer-miami",
  },
  "/es/fotografo-de-retratos-y-headshots-miami": {
    "en-US": "/services/headshot-photographer-miami",
    "es-US": "/es/fotografo-de-retratos-y-headshots-miami",
    "x-default": "/services/headshot-photographer-miami",
  },
  "/services/jewelry-product-photography-miami": {
    "en-US": "/services/jewelry-product-photography-miami",
    "es-US": "/es/fotografia-de-joyas-y-lujo-miami",
    "x-default": "/services/jewelry-product-photography-miami",
  },
  "/es/fotografia-de-joyas-y-lujo-miami": {
    "en-US": "/services/jewelry-product-photography-miami",
    "es-US": "/es/fotografia-de-joyas-y-lujo-miami",
    "x-default": "/services/jewelry-product-photography-miami",
  },
  "/services/luxury-jewelry-video-editing-miami": {
    "en-US": "/services/luxury-jewelry-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-joyeria-de-lujo-miami",
    "x-default": "/services/luxury-jewelry-video-editing-miami",
  },
  "/es/edicion-de-video-para-joyeria-de-lujo-miami": {
    "en-US": "/services/luxury-jewelry-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-joyeria-de-lujo-miami",
    "x-default": "/services/luxury-jewelry-video-editing-miami",
  },
  "/services/nightlife-event-video-editing-miami": {
    "en-US": "/services/nightlife-event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-discotecas-y-eventos-miami",
    "x-default": "/services/nightlife-event-video-editing-miami",
  },
  "/es/edicion-de-video-para-discotecas-y-eventos-miami": {
    "en-US": "/services/nightlife-event-video-editing-miami",
    "es-US": "/es/edicion-de-video-para-discotecas-y-eventos-miami",
    "x-default": "/services/nightlife-event-video-editing-miami",
  },
  "/services/online-course-video-editing-service": {
    "en-US": "/services/online-course-video-editing-service",
    "es-US": "/es/edicion-de-video-para-cursos-online",
    "x-default": "/services/online-course-video-editing-service",
  },
  "/es/edicion-de-video-para-cursos-online": {
    "en-US": "/services/online-course-video-editing-service",
    "es-US": "/es/edicion-de-video-para-cursos-online",
    "x-default": "/services/online-course-video-editing-service",
  },
  "/services/plastic-surgery-video-marketing-miami": {
    "en-US": "/services/plastic-surgery-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-cirugia-plastica-miami",
    "x-default": "/services/plastic-surgery-video-marketing-miami",
  },
  "/es/marketing-de-video-para-cirugia-plastica-miami": {
    "en-US": "/services/plastic-surgery-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-cirugia-plastica-miami",
    "x-default": "/services/plastic-surgery-video-marketing-miami",
  },
  "/services/real-estate-drone-video-editing-miami": {
    "en-US": "/services/real-estate-drone-video-editing-miami",
    "es-US": "/es/drone-real-estate-miami",
    "x-default": "/services/real-estate-drone-video-editing-miami",
  },
  "/es/drone-real-estate-miami": {
    "en-US": "/services/real-estate-drone-video-editing-miami",
    "es-US": "/es/drone-real-estate-miami",
    "x-default": "/services/real-estate-drone-video-editing-miami",
  },
  "/services/real-estate-video-aventura-miami": {
    "en-US": "/services/real-estate-video-aventura-miami",
    "es-US": "/es/video-inmobiliario-aventura-miami",
    "x-default": "/services/real-estate-video-aventura-miami",
  },
  "/es/video-inmobiliario-aventura-miami": {
    "en-US": "/services/real-estate-video-aventura-miami",
    "es-US": "/es/video-inmobiliario-aventura-miami",
    "x-default": "/services/real-estate-video-aventura-miami",
  },
  "/services/real-estate-video-coral-gables": {
    "en-US": "/services/real-estate-video-coral-gables",
    "es-US": "/es/video-inmobiliario-coral-gables",
    "x-default": "/services/real-estate-video-coral-gables",
  },
  "/es/video-inmobiliario-coral-gables": {
    "en-US": "/services/real-estate-video-coral-gables",
    "es-US": "/es/video-inmobiliario-coral-gables",
    "x-default": "/services/real-estate-video-coral-gables",
  },
  "/services/real-estate-video-sunny-isles": {
    "en-US": "/services/real-estate-video-sunny-isles",
    "es-US": "/es/video-inmobiliario-sunny-isles",
    "x-default": "/services/real-estate-video-sunny-isles",
  },
  "/es/video-inmobiliario-sunny-isles": {
    "en-US": "/services/real-estate-video-sunny-isles",
    "es-US": "/es/video-inmobiliario-sunny-isles",
    "x-default": "/services/real-estate-video-sunny-isles",
  },
  "/services/restaurant-promo-video-editing-miami": {
    "en-US": "/services/restaurant-promo-video-editing-miami",
    "es-US": "/es/edicion-de-video-promocional-para-restaurantes-miami",
    "x-default": "/services/restaurant-promo-video-editing-miami",
  },
  "/es/edicion-de-video-promocional-para-restaurantes-miami": {
    "en-US": "/services/restaurant-promo-video-editing-miami",
    "es-US": "/es/edicion-de-video-promocional-para-restaurantes-miami",
    "x-default": "/services/restaurant-promo-video-editing-miami",
  },
  "/services/short-form-video-editor-miami": {
    "en-US": "/services/short-form-video-editor-miami",
    "es-US": "/es/editor-de-video-corto-para-redes-miami",
    "x-default": "/services/short-form-video-editor-miami",
  },
  "/es/editor-de-video-corto-para-redes-miami": {
    "en-US": "/services/short-form-video-editor-miami",
    "es-US": "/es/editor-de-video-corto-para-redes-miami",
    "x-default": "/services/short-form-video-editor-miami",
  },
  "/services/tiktok-ad-video-editor-miami": {
    "en-US": "/services/tiktok-ad-video-editor-miami",
    "es-US": "/es/editor-de-video-para-anuncios-de-tiktok-miami",
    "x-default": "/services/tiktok-ad-video-editor-miami",
  },
  "/es/editor-de-video-para-anuncios-de-tiktok-miami": {
    "en-US": "/services/tiktok-ad-video-editor-miami",
    "es-US": "/es/editor-de-video-para-anuncios-de-tiktok-miami",
    "x-default": "/services/tiktok-ad-video-editor-miami",
  },
  "/services/ugc-video-editor-ecommerce": {
    "en-US": "/services/ugc-video-editor-ecommerce",
    "es-US": "/es/editor-de-video-ugc-para-ecommerce",
    "x-default": "/services/ugc-video-editor-ecommerce",
  },
  "/es/editor-de-video-ugc-para-ecommerce": {
    "en-US": "/services/ugc-video-editor-ecommerce",
    "es-US": "/es/editor-de-video-ugc-para-ecommerce",
    "x-default": "/services/ugc-video-editor-ecommerce",
  },
  "/services/video-editing-miami-beach": {
    "en-US": "/services/video-editing-miami-beach",
    "es-US": "/es/edicion-de-video-miami-beach",
    "x-default": "/services/video-editing-miami-beach",
  },
  "/es/edicion-de-video-miami-beach": {
    "en-US": "/services/video-editing-miami-beach",
    "es-US": "/es/edicion-de-video-miami-beach",
    "x-default": "/services/video-editing-miami-beach",
  },
  "/services/video-editing-palm-beach-gardens": {
    "en-US": "/services/video-editing-palm-beach-gardens",
    "es-US": "/es/edicion-de-video-palm-beach-gardens",
    "x-default": "/services/video-editing-palm-beach-gardens",
  },
  "/es/edicion-de-video-palm-beach-gardens": {
    "en-US": "/services/video-editing-palm-beach-gardens",
    "es-US": "/es/edicion-de-video-palm-beach-gardens",
    "x-default": "/services/video-editing-palm-beach-gardens",
  },
  "/services/video-podcast-editing-service-miami": {
    "en-US": "/services/video-podcast-editing-service-miami",
    "es-US": "/es/edicion-de-video-podcast-miami",
    "x-default": "/services/video-podcast-editing-service-miami",
  },
  "/es/edicion-de-video-podcast-miami": {
    "en-US": "/services/video-podcast-editing-service-miami",
    "es-US": "/es/edicion-de-video-podcast-miami",
    "x-default": "/services/video-podcast-editing-service-miami",
  },
  "/services/video-production-davie-fl": {
    "en-US": "/services/video-production-davie-fl",
    "es-US": "/es/produccion-de-video-davie-fl",
    "x-default": "/services/video-production-davie-fl",
  },
  "/es/produccion-de-video-davie-fl": {
    "en-US": "/services/video-production-davie-fl",
    "es-US": "/es/produccion-de-video-davie-fl",
    "x-default": "/services/video-production-davie-fl",
  },
  "/services/video-production-delray-beach": {
    "en-US": "/services/video-production-delray-beach",
    "es-US": "/es/produccion-de-video-delray-beach",
    "x-default": "/services/video-production-delray-beach",
  },
  "/es/produccion-de-video-delray-beach": {
    "en-US": "/services/video-production-delray-beach",
    "es-US": "/es/produccion-de-video-delray-beach",
    "x-default": "/services/video-production-delray-beach",
  },
  "/services/video-production-doral-miami": {
    "en-US": "/services/video-production-doral-miami",
    "es-US": "/es/produccion-de-video-doral-miami",
    "x-default": "/services/video-production-doral-miami",
  },
  "/es/produccion-de-video-doral-miami": {
    "en-US": "/services/video-production-doral-miami",
    "es-US": "/es/produccion-de-video-doral-miami",
    "x-default": "/services/video-production-doral-miami",
  },
  "/services/website-design-fort-lauderdale": {
    "en-US": "/services/website-design-fort-lauderdale",
    "es-US": "/es/diseno-web-fort-lauderdale",
    "x-default": "/services/website-design-fort-lauderdale",
  },
  "/es/diseno-web-fort-lauderdale": {
    "en-US": "/services/website-design-fort-lauderdale",
    "es-US": "/es/diseno-web-fort-lauderdale",
    "x-default": "/services/website-design-fort-lauderdale",
  },
  "/services/yacht-charter-video-marketing-miami": {
    "en-US": "/services/yacht-charter-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-alquiler-de-yates-miami",
    "x-default": "/services/yacht-charter-video-marketing-miami",
  },
  "/es/marketing-de-video-para-alquiler-de-yates-miami": {
    "en-US": "/services/yacht-charter-video-marketing-miami",
    "es-US": "/es/marketing-de-video-para-alquiler-de-yates-miami",
    "x-default": "/services/yacht-charter-video-marketing-miami",
  },
  "/services/yacht-hospitality-video-fort-lauderdale": {
    "en-US": "/services/yacht-hospitality-video-fort-lauderdale",
    "es-US": "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
    "x-default": "/services/yacht-hospitality-video-fort-lauderdale",
  },
  "/es/video-para-yates-y-hospitalidad-fort-lauderdale": {
    "en-US": "/services/yacht-hospitality-video-fort-lauderdale",
    "es-US": "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
    "x-default": "/services/yacht-hospitality-video-fort-lauderdale",
  },
  "/services/youtube-video-editing-service-miami": {
    "en-US": "/services/youtube-video-editing-service-miami",
    "es-US": "/es/servicio-de-edicion-de-video-para-youtube-miami",
    "x-default": "/services/youtube-video-editing-service-miami",
  },
  "/es/servicio-de-edicion-de-video-para-youtube-miami": {
    "en-US": "/services/youtube-video-editing-service-miami",
    "es-US": "/es/servicio-de-edicion-de-video-para-youtube-miami",
    "x-default": "/services/youtube-video-editing-service-miami",
  },
  "/": {
    "en-US": "/",
    "es-US": "/es",
    "x-default": "/",
  },
  "/calculator": {
    "en-US": "/calculator",
    "es-US": "/es/calculadora",
    "x-default": "/calculator",
  },
  "/resources/social-video-kit": {
    "en-US": "/resources/social-video-kit",
    "es-US": "/es/recursos/kit-video-social",
    "x-default": "/resources/social-video-kit",
  },
  "/assessment": {
    "en-US": "/assessment",
    "es-US": "/es/evaluacion",
    "x-default": "/assessment",
  },
  // Spanish-side entries must mirror their English counterparts exactly.
  // hreflang is only honoured when both documents point at each other; a
  // one-directional declaration is discarded by Google.
  "/es/calculadora": {
    "en-US": "/calculator",
    "es-US": "/es/calculadora",
    "x-default": "/calculator",
  },
  "/es/recursos/kit-video-social": {
    "en-US": "/resources/social-video-kit",
    "es-US": "/es/recursos/kit-video-social",
    "x-default": "/resources/social-video-kit",
  },
  "/es/evaluacion": {
    "en-US": "/assessment",
    "es-US": "/es/evaluacion",
    "x-default": "/assessment",
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

/**
 * hreflang is suppressed for any page the 2026-08-12 cohort decision marked
 * noindex or merged.
 *
 * Advertising "this is the Spanish version of that page" while the page itself
 * says "do not index me" is a contradictory signal, and it is the same mistake
 * the sitemap filter at the bottom of app/sitemap.ts already prevents. Measured
 * 2026-10-06: six pairs (ecommerce product video, event video, luxury jewelry,
 * Aventura real estate, Davie production, YouTube editing) were noindexed on
 * BOTH sides and still carried full hreflang annotations.
 *
 * Filtering here rather than hand-deleting rows means a future consolidation
 * stops advertising itself automatically, with no second place to remember.
 */
export const languageAlternates: Record<string, Record<string, string>> =
  Object.fromEntries(
    Object.entries(languageAlternatesRaw).filter(
      ([path, langs]) =>
        !isConsolidatedPath(path) &&
        !isConsolidatedPath(langs["en-US"]) &&
        !isConsolidatedPath(langs["es-US"]),
    ),
  );

export const spanishProofPrinciples = [
  "El español es el idioma principal de Esteban; también hay comunicación de trabajo disponible en inglés.",
  "La página publica solo prueba real: trabajos reales, enlaces reales y testimonios reales cuando existan.",
  "La edición, el contenido con IA, la planificación y la captura se conectan a una meta comercial.",
  "Las consultas parten de la meta, el material disponible, la ubicación y el uso previsto.",
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
      "Ofrece atención directa en español, comunicación disponible en inglés intermedio y un portafolio público limitado a proyectos y créditos verificables.",
  },
];

export const spanishRoutes = [
  "/es/precios/inmobiliaria",
  ...Object.values(packageRoutes).map((route) => route.es),
  ...spanishCoreRoutes,
  ...spanishNichePages.map((page) => `/es/${page.slug}`),
];

export const spanishOpportunitySignals = [
  {
    label: "Atención",
    value: "Español primero",
    detail: "Comunicación directa en español; inglés intermedio disponible.",
    icon: Languages,
  },
  {
    label: "Base local",
    value: "Broward",
    detail: "Fort Lauderdale es la base operativa dentro de Broward County.",
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

/**
 * Builds the JSON-LD `@graph` for a Spanish niche landing page.
 *
 * The graph mirrors the page's already-visible content only: the primary
 * entity (a `Service` for confirmed pages, or a transparent `WebPage`
 * resource for legacy pending-confirmation routes), a `BreadcrumbList`, and a
 * `FAQPage` whose questions/answers are rendered verbatim on the page. No
 * claim is added here that is not already published in the page copy.
 */
export function buildSpanishNicheStructuredData(page: SpanishNichePage) {
  const path = `/es/${page.slug}`;
  const isPendingConfirmation = page.availability === "pending-confirmation";

  const pageEntityJsonLd = isPendingConfirmation
    ? {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#resource`),
        name: page.title,
        description: page.description,
        url: absoluteUrl(path),
        inLanguage: "es-US",
        about: page.keyword,
        isPartOf: { "@id": absoluteUrl("/#website") },
      }
    : {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: page.title,
        description: page.description,
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          email: site.email,
          telephone: site.phone.e164,
        },
        areaServed: page.location,
        availableLanguage: ["Spanish", "English"],
        serviceType: page.keyword,
      };

  return {
    "@context": "https://schema.org",
    "@graph": [
      pageEntityJsonLd,
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: absoluteUrl("/es"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: absoluteUrl("/es/servicios"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: absoluteUrl(path),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl(`${path}#faq`),
        inLanguage: "es-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: buildServiceFaqSchema(absoluteUrl(path), page.faqs).mainEntity,
      },
    ],
  };
}
