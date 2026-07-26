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
