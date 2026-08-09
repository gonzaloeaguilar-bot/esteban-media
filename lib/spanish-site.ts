import type { LucideIcon } from "lucide-react";
import {
  Anchor,
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

import { absoluteUrl, site } from "@/lib/site";

export const spanishSite = {
  title: "Edición de Video en Fort Lauderdale",
  description:
    "Edición de video, contenido con IA, planificación para redes y producción selectiva desde Fort Lauderdale para Broward, Miami-Dade y clientes remotos.",
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
  faqs: { question: string; answer: string }[];
};

export const spanishNichePages: SpanishNichePage[] = [
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
      "Esteban tiene proyectos publicados y verificables realizados en Miami. Para una nueva idea en locación, la disponibilidad y el alcance se conversan de forma individual; la atención es principalmente en español y su inglés es intermedio.",
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
      "Fort Lauderdale es la base de Esteban Moreno Media. La edición, la planificación y la producción local de video forman parte de sus prioridades confirmadas; cada idea en locación se considera de forma selectiva.",
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
    faqs: [
      {
        question: "¿Puedo pedir solo edición de reels?",
        answer:
          "La edición de video con material existente es una prioridad confirmada. El alcance y las necesidades de formato se conversan para cada proyecto.",
      },
      {
        question: "¿Los reels pueden ser bilingües?",
        answer:
          "El español es el idioma principal de Esteban y su inglés es intermedio. Cualquier necesidad de idioma dentro del contenido debe consultarse sin asumir versiones específicas.",
      },
    ],
  },
  {
    slug: "video-para-restaurantes-miami",
    title: "Video para restaurantes en Miami",
    metadataTitle: "Video para Restaurantes en Miami",
    description:
      "Información sobre edición y producción selectiva de video para restaurantes de Miami-Dade, con atención principal en español.",
    eyebrow: "Restaurantes / comida / hospitality",
    h1: "Video para restaurantes de Miami-Dade, evaluado proyecto por proyecto.",
    lead:
      "Esta página explica cómo iniciar una consulta de video para un restaurante. La edición está confirmada y una posible captura en locación se considera de forma selectiva; la fotografía no se presenta como servicio disponible.",
    keyword: "video para restaurantes Miami",
    location: "Miami-Dade",
    availability: "confirmed",
    icon: UtensilsCrossed,
    bestFor: [
      "Restaurantes con material existente que podría necesitar edición.",
      "Dueños que quieren definir la meta antes de producir contenido nuevo.",
      "Equipos que prefieren explicar el proyecto en español.",
      "Ideas que podrían requerir una captura local seleccionada.",
    ],
    scopingQuestions: [
      "¿Qué aspecto del restaurante necesita comunicar el video?",
      "¿Ya existe material grabado?",
      "¿La idea requiere una locación en Miami-Dade?",
      "¿Qué uso, formato y disponibilidad deben confirmarse?",
    ],
    projectFit:
      "Es una guía para preparar una consulta sobre edición o producción selectiva de video. No promete fotografía, una visita, una lista de piezas ni resultados comerciales.",
    faqs: [
      {
        question: "¿Se puede grabar durante servicio?",
        answer:
          "No se publica una regla universal. Si la idea requiere captura, la locación, la disponibilidad y las necesidades operativas deben evaluarse para ese proyecto.",
      },
      {
        question: "¿Esta página ofrece fotografía de alimentos?",
        answer:
          "No. La fotografía sigue pendiente de confirmación y no se presenta actualmente como servicio disponible.",
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
      "La edición de video y contenido para redes es una prioridad confirmada de Esteban. Ayudamos a agentes y agencias inmobiliarias a estructurar recorridos y videos de propiedades a partir de su material grabado.",
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
      "Resaltado por el trabajo de guion y edición de Homeowners en el sector inmobiliario.",
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
      "El proyecto Bar Door Monkey demuestra trabajo real de producción y contenido gastronómico. Generamos fondos y composiciones visuales de estilo de vida para restaurantes.",
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
      "Combina fotos reales de platillos con entornos visuales atractivos.",
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
    metadataTitle: "Video Yates Fort Lauderdale",
    description:
      "Edición de video y producción promocional para la industria náutica, yates y hospitalidad en Fort Lauderdale.",
    eyebrow: "Fort Lauderdale / Náutica",
    h1: "Videos promocionales para yates, marinos y hospitalidad.",
    lead:
      "Fort Lauderdale es la capital náutica de Florida. Creamos y editamos contenido en video para servicios de chárter, marinos y marcas de lujo.",
    keyword: "video para yates en Fort Lauderdale",
    location: "Fort Lauderdale / Broward",
    availability: "confirmed",
    icon: Anchor,
    bestFor: [
      "Empresas de chárter de yates y servicios marítimos en Fort Lauderdale.",
      "Hoteles y restaurantes frente al mar en Broward.",
    ],
    scopingQuestions: [
      "¿El material en video se grabó en marina o en navegación?",
      "¿Cuál es el público objetivo principal del video?",
    ],
    projectFit:
      "Producción y edición de estilo de vida náutico en South Florida.",
    faqs: [
      {
        question: "¿Pueden editar clips grabados en teléfono o dron?",
        answer:
          "Sí. Procesamos tomas aéreas y clips marinos para crear videos promocionales dinámicos para redes sociales.",
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
    faqs: [
      {
        question: "¿Incluyen música libre de derechos para redes sociales?",
        answer:
          "Sí. Seleccionamos pistas musicales comerciales licenciadas sin riesgo de bloqueo en plataformas digitales.",
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
    faqs: [
      {
        question: "¿Pueden entregar un teaser el mismo día del evento?",
        answer:
          "Sí. Ofrecemos servicio de edición rápida el mismo día para publicar actualizaciones inmediatas en redes sociales.",
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
      "Captura visual y edición refinada para mostrar las instalaciones, amenidades y experiencia gastronómica de hoteles en Miami y South Beach.",
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
    faqs: [
      {
        question: "¿Incluye diseño de sonido ambiente de spa?",
        answer:
          "Sí. Integramos texturas sonoras naturales y música ambiental licenciada que transmite relajación.",
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
      "Edición de video gastronómico, reels de platillos insignia y promocionales para restaurantes y bares en Miami.",
    eyebrow: "Gastronomía / Restaurantes",
    h1: "Edición de video apetitosa para restaurantes en Miami.",
    lead:
      "Destaca los detalles culinarios, ambiente de comedor y preparación de bebidas con videos cortos diseñados para generar reservas.",
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
      "Edición sensorial detallada para apetito visual.",
    faqs: [
      {
        question: "¿Incluyen música con derechos comerciales?",
        answer:
          "Sí. Suministramos licencias comerciales completas para uso en redes sociales y sitio web.",
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
      "Edición de video inmobiliario para agentes y equipos en Sunny Isles Beach a partir de material suministrado por el cliente.",
    eyebrow: "Sunny Isles Beach",
    h1: "Edición de video inmobiliario para Sunny Isles Beach.",
    lead:
      "Convierte el material ya grabado de una propiedad en un video claro para presentar el inmueble y compartirlo en los canales acordados.",
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
      "Edición de anuncios de video direct-response para TikTok, Reels y Shorts con ganchos visuales de alta conversión.",
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
    faqs: [
      {
        question: "¿Entregan variaciones de ganchos (hooks) para pruebas publicitarias?",
        answer:
          "Sí. Podemos entregar múltiples inicios de 3 a 5 segundos para optimizar el rendimiento de la campaña.",
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
];



export const spanishCoreRoutes = [
  "/es",
  "/es/servicios",
  "/es/portafolio",
  "/es/areas",
  "/es/areas/palm-beach-county",
  "/es/sobre-esteban",
  "/es/contacto",
  "/es/calculadora",
  "/es/recursos/kit-video-social",
  "/es/evaluacion",
];

export const languageAlternates: Record<string, Record<string, string>> = {
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
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

