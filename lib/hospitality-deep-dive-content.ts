import type { DeepDive } from "@/lib/service-deep-dive-content";
import type { SpanishNicheSection } from "@/lib/spanish-site";
import {
  EXPRESS_MULTIPLIER,
  PACKAGE_PRICES,
  PRICING_BANDS,
  shortFormWeeklyText,
  usd,
} from "@/lib/pricing";

/**
 * Hospitality, nightlife and event cost answers (2026-10-07), EN + ES.
 *
 * Why these pages: free Google autocomplete returns "how much does event
 * videography cost", "how much do event videographers charge", "event recap
 * video price", "nightclub videographer", "nightclub promo video", "bar promo
 * video" and "luxury hotel video production"; the AI Overview for "how much
 * does event videography cost in miami" cites small-studio cost pages. Search
 * Console showed 0 impressions for these pages in 90 days, so the answer has to
 * be on the page before anything can rank or be cited.
 *
 * Claim discipline: every figure is interpolated from lib/pricing.ts. The only
 * proof named is the portfolio exactly as messages/en.json and es.json describe
 * it — Bar Door Monkey is a Miami RESTAURANT's social promo spot, Diana & Jack
 * is a wedding film shot in Boston. No hotel, nightclub or promoter client is
 * claimed, no turnaround is promised, nothing offers to fly a drone.
 */

const starter = PACKAGE_PRICES.arranque;
const growth = PACKAGE_PRICES.crecimiento;
const localPresence = PACKAGE_PRICES["presencia-local"];
// Owner-set "from" prices; a "custom" package has no figure to print.
const fromOr = (p: typeof starter, fallback: string) => (p.kind === "from" ? usd(p.amount) : fallback);

const weeklyEn = shortFormWeeklyText("en");
const weeklyEs = shortFormWeeklyText("es");
const corporate = `${usd(PRICING_BANDS.corporate.baseMin)}–${usd(PRICING_BANDS.corporate.baseMax)}`;
const onLocation = `${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}`;

const starterEn = fromOr(starter, "a custom quote");
const growthEn = fromOr(growth, "a custom quote");
const localPresenceEn = fromOr(localPresence, "a custom quote");
const starterEs = fromOr(starter, "una cotización a medida");
const growthEs = fromOr(growth, "una cotización a medida");
const localPresenceEs = fromOr(localPresence, "una cotización a medida");

export const NIGHTLIFE_DEEP_DIVE: DeepDive = {
  id: "nightlife-cost-details",
  title: "How much does a nightclub or bar promo video cost in Miami?",
  destinations: "Editing and filming ranges, what a quote should list, and the published venue spot to compare.",
  sections: [
    {
      heading: "How much does a nightclub or bar promo video cost in Miami?",
      paragraphs: [
        `If you already have the footage, the [Starter](/pricing/starter) package is remote editing from ${starterEn} per video, with one round of revisions and a format for Reels, TikTok, YouTube or the web. If you post every week, the calculator prices short-form at ${weeklyEn}.`,
        "Neither figure is a quote. The price moves with how much footage there is, how many versions you need (a vertical reel and a horizontal cut are two edits), and whether the music you want can legally be used on the platform. Send a link to the raw files and one sentence on where the video will run, and the estimate becomes a scoped price.",
      ],
    },
    {
      heading: "What does it cost to have the night filmed, not just edited?",
      paragraphs: [
        `[Local Presence](/pricing/local-presence) starts from ${localPresenceEn} per production day: pre-production, on-location capture, editing after the shoot, and deliverables in the formats you need. It covers Fort Lauderdale and Broward, and selected projects in Miami-Dade, so a Miami Beach or Wynwood date is confirmed case by case.`,
        `The separate half-day capture add-on has an indicative range of ${onLocation} on the same discounted freelancer basis. Do not add the two together; they are different ways of scoping the same need. Tell Esteban the venue, the hours, whether the room is dark or lit, and which moments matter: the DJ, the crowd, the bar, the bottle service, the arrival. A venue with house rules on filming guests should say so before the date is set.`,
      ],
    },
    {
      heading: "How should a venue or promoter budget for weekly content?",
      paragraphs: [
        `A one-off spot and a weekly rhythm are priced differently. [Growth](/pricing/growth) is a monthly social plan from ${growthEn} a month: a content plan, a publishing calendar, the editing, and a monthly report. It suits a bar or lounge that already films its own nights and needs one person to turn them into a steady feed.`,
        "Before asking for a monthly price, count what you actually produce. How many nights a week are worth posting, who on staff can record a usable clip, and does a promoter or DJ need their own cut of the same night? Those three answers decide whether a monthly plan, a few separate edits, or a filmed day is the cheaper route. A plan priced on an imagined volume tends to stall in the second month.",
      ],
    },
    {
      heading: "What published venue video can you compare against?",
      paragraphs: [
        "The closest published example is [Bar Door Monkey Miami](/portfolio/bar-door-monkey): a social-media promo spot for a Miami restaurant, produced on location during filming of the Soccer y Más show and delivered for the venue's Instagram. Esteban handled the videography and the editing. It is a restaurant spot, not a nightclub night, so judge it on pacing, framing in a working room and how the venue is introduced in the first seconds.",
        `For a filmed event from start to finish, the [Diana & Jack](/portfolio/diana-jack) wedding film shows a full 20-minute film of the day plus a highlight trailer of about a minute and a half. If you need a fast edit after the night, the calculator applies an express multiplier of ${EXPRESS_MULTIPLIER}; that is a budget adjustment, not a promised delivery time.`,
      ],
    },
  ],
};

export const HOTEL_DEEP_DIVE: DeepDive = {
  id: "hotel-cost-details",
  title: "How much does hotel video production cost in Miami?",
  destinations: "Property film and reel ranges, a filmed day, what to send, and what the portfolio does and does not show.",
  sections: [
    {
      heading: "How much does hotel video production cost in Miami?",
      paragraphs: [
        `For a property film built from existing material, the calculator's corporate band is ${corporate} per project, and reels and stories are priced like Starter, from ${starterEn} per video or ${weeklyEn}. The corporate band is an indicative editing-led freelancer range with an introductory discount applied, checked against published market rates; these are not full-crew production-company prices, which run on a different model.`,
        "What moves the number is the scope, not the star rating: how many spaces are shown (rooms, pool, restaurant, lobby, events space), how many versions are needed (a horizontal film for the website and vertical cuts for Instagram are separate edits), and whether staff or guests appear on camera. A scoped quote lists each deliverable, so you can drop one before you approve it.",
      ],
    },
    {
      heading: "What does a filmed day at a hotel or resort cost?",
      paragraphs: [
        `[Local Presence](/pricing/local-presence) starts from ${localPresenceEn} per production day: pre-production, capture on location, editing after the shoot, and deliverables in the formats you need. It covers Fort Lauderdale and Broward and selected projects in Miami-Dade, so a Miami Beach or Brickell property is confirmed case by case. The half-day capture add-on is ${onLocation} on the same discounted basis.`,
        "A hotel day goes further when the property plans it around light and occupancy. Rooms photograph best when they are made up and empty; the pool and terrace change completely between mid-morning and late afternoon; restaurant service is easiest to film at a quiet hour with a staged table. Send the list of spaces in priority order and the hours each one is available.",
      ],
    },
    {
      heading: "What should a hotel or rental host send before asking for a quote?",
      paragraphs: [
        "Four things make a quote exact. First, where the video will live: the booking page, Instagram, a listing on a rental platform, or a sales deck for events. Second, the spaces, in order of importance, with any that are off limits. Third, whether you already hold footage or photos, as original files rather than copies saved from a messaging app, which have already lost detail.",
        `Fourth, who must approve the final cut and how many rounds of changes that usually takes; Starter includes one round of revisions on remote edits from ${starterEn} per video. A boutique hotel or short-term rental with a phone full of clips can often start there, and only book a filmed day once it knows which spaces actually earn bookings.`,
      ],
    },
    {
      heading: "What hospitality work can you see in the portfolio?",
      paragraphs: [
        "The published example closest to hospitality is [Bar Door Monkey Miami](/portfolio/bar-door-monkey), a social promo spot for a Miami restaurant, filmed on location and edited by Esteban for the venue's Instagram. There is no published hotel project yet, and this page does not pretend otherwise. The spot shows how a working room, food and people are framed for a short vertical format, which is most of what a hotel's social feed needs.",
        "For restaurant and bar outlets inside a hotel, the [restaurant video cost guide](/guides/how-much-does-restaurant-video-cost-miami) covers that scope in more detail. For a property on the water, see [yacht and hospitality video in Fort Lauderdale](/services/yacht-hospitality-video-fort-lauderdale). Ask for a call before committing to a filmed day; the first conversation is about scope, not a sales pitch.",
      ],
    },
  ],
};

export const NIGHTLIFE_ES_DISCLOSURE = "¿Cuánto cuesta un video para una discoteca o un bar en Miami?";
export const NIGHTLIFE_ES_DESTINATIONS = "Rangos de edición y grabación, qué pedir en la cotización y el spot publicado para comparar.";

export const NIGHTLIFE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta un video promocional para una discoteca o un bar en Miami?",
    paragraphs: [
      `Si ya tienes el material grabado, el paquete [Arranque](/es/precios/arranque) es edición remota desde ${starterEs} por video, con una ronda de revisión y formato para Reels, TikTok, YouTube o web. Si publicas cada semana, la calculadora pone el video corto en ${weeklyEs}.`,
      "Ninguna de las dos cifras es una cotización. El precio cambia según cuánto material hay, cuántas versiones necesitas (un reel vertical y un corte horizontal son dos ediciones) y si la música que quieres se puede usar legalmente en la plataforma. Manda el enlace a los archivos originales y una frase sobre dónde se va a publicar el video, y el estimado se convierte en un precio con alcance definido.",
    ],
  },
  {
    heading: "¿Cuánto cuesta que graben la noche, no solo que la editen?",
    paragraphs: [
      `[Presencia Local](/es/precios/presencia-local) parte desde ${localPresenceEs} por día de producción: preproducción, captura en locación, edición posterior y entregables en los formatos que necesites. Cubre Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade, así que una fecha en Miami Beach o Wynwood se confirma caso por caso.`,
      `La captura de medio día como complemento tiene un rango indicativo de ${onLocation} con la misma base de descuento. No se suman: son dos maneras distintas de definir la misma necesidad. Cuéntale a Esteban el local, el horario, si el espacio es oscuro o iluminado y qué momentos importan: el DJ, el público, la barra, el servicio de botellas, la llegada. Si el local tiene reglas sobre grabar a los clientes, dilo antes de fijar la fecha.`,
    ],
  },
  {
    heading: "¿Cómo presupuesta un local o un promotor el contenido semanal?",
    paragraphs: [
      `Un spot único y un ritmo semanal se cotizan distinto. [Crecimiento](/es/precios/crecimiento) es un plan social mensual desde ${growthEs} al mes: plan de contenido, calendario de publicación, edición y reporte mensual. Sirve a un bar o lounge que ya graba sus noches y necesita a una sola persona que las convierta en un feed constante.`,
      "Antes de pedir un precio mensual, cuenta lo que de verdad produces. ¿Cuántas noches por semana vale la pena publicar, quién del equipo puede grabar un clip usable y el promotor o el DJ necesita su propio corte de la misma noche? Esas tres respuestas deciden si conviene un plan mensual, algunas ediciones sueltas o un día de grabación. Un plan calculado sobre un volumen imaginado suele frenarse en el segundo mes.",
    ],
  },
  {
    heading: "¿Qué video publicado de un local puedes comparar?",
    paragraphs: [
      "El ejemplo publicado más cercano es [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey): un spot promocional para redes de un restaurante de Miami, producido en locación durante la grabación del programa Soccer y Más y entregado para el Instagram del lugar. Esteban hizo la videografía y la edición. Es un spot de restaurante, no una noche de discoteca, así que júzgalo por el ritmo, el encuadre en un local en funcionamiento y cómo presenta el lugar en los primeros segundos.",
      `Para un evento grabado de principio a fin, la película de boda [Diana & Jack](/es/portafolio/diana-jack) muestra una película completa de 20 minutos más un tráiler de minuto y medio. Si necesitas una edición rápida después de la noche, la calculadora aplica un multiplicador exprés de ${EXPRESS_MULTIPLIER}; es un ajuste de presupuesto, no un plazo de entrega prometido.`,
    ],
  },
];

export const HOTEL_ES_DISCLOSURE = "¿Cuánto cuesta un video para un hotel en Miami?";
export const HOTEL_ES_DESTINATIONS = "Rangos para la película de la propiedad y los reels, un día de grabación, qué enviar y qué muestra el portafolio.";

export const HOTEL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta la producción de video para un hotel en Miami?",
    paragraphs: [
      `Para una película de la propiedad hecha con material existente, la banda corporativa de la calculadora es ${corporate} por proyecto, y los reels e historias se cotizan como el Arranque, desde ${starterEs} por video o ${weeklyEs}. La banda corporativa es un rango indicativo de editor independiente con un descuento de introducción aplicado, contrastado con tarifas de mercado publicadas; no son precios de una productora con equipo completo, que trabaja con otro modelo.`,
      "Lo que mueve el número es el alcance, no las estrellas del hotel: cuántos espacios se muestran (habitaciones, piscina, restaurante, lobby, salón de eventos), cuántas versiones se necesitan (una película horizontal para la web y cortes verticales para Instagram son ediciones separadas) y si aparecen empleados o huéspedes. Una cotización con alcance lista cada entregable, para que puedas quitar uno antes de aprobarla.",
    ],
  },
  {
    heading: "¿Cuánto cuesta un día de grabación en un hotel o resort?",
    paragraphs: [
      `[Presencia Local](/es/precios/presencia-local) parte desde ${localPresenceEs} por día de producción: preproducción, captura en locación, edición posterior y entregables en los formatos que necesites. Cubre Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade, así que una propiedad en Miami Beach o Brickell se confirma caso por caso. La captura de medio día como complemento es ${onLocation} con la misma base.`,
      "Un día en un hotel rinde más cuando la propiedad lo planifica según la luz y la ocupación. Las habitaciones se ven mejor arregladas y vacías; la piscina y la terraza cambian por completo entre media mañana y la tarde; el servicio del restaurante es más fácil de grabar en una hora tranquila con una mesa montada. Envía la lista de espacios por prioridad y el horario en que cada uno está disponible.",
    ],
  },
  {
    heading: "¿Qué debe enviar un hotel o un anfitrión de alquiler antes de pedir cotización?",
    paragraphs: [
      "Cuatro cosas hacen exacta una cotización. Primero, dónde va a vivir el video: la página de reservas, Instagram, un anuncio en una plataforma de alquiler o una presentación de ventas para eventos. Segundo, los espacios por orden de importancia, con los que no se pueden grabar. Tercero, si ya tienes videos o fotos, como archivos originales y no copias guardadas desde una app de mensajería, que ya perdieron detalle.",
      `Cuarto, quién aprueba el corte final y cuántas rondas de cambios suele tomar; Arranque incluye una ronda de revisión en ediciones remotas desde ${starterEs} por video. Un hotel boutique o un alquiler de corta estancia con el teléfono lleno de clips puede empezar ahí, y reservar un día de grabación solo cuando sepa qué espacios de verdad generan reservas.`,
    ],
  },
  {
    heading: "¿Qué trabajo de hospitalidad se puede ver en el portafolio?",
    paragraphs: [
      "El ejemplo publicado más cercano a la hospitalidad es [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey), un spot promocional para redes de un restaurante de Miami, grabado en locación y editado por Esteban para el Instagram del lugar. Todavía no hay un proyecto de hotel publicado, y esta página no finge lo contrario. El spot muestra cómo se encuadran un local en funcionamiento, la comida y la gente en un formato vertical corto, que es casi todo lo que necesita el feed de un hotel.",
      "Para los restaurantes y bares dentro de un hotel, la [guía de costos de video para restaurantes](/es/guias/cuanto-cuesta-un-video-para-restaurante-miami) cubre ese alcance con más detalle. Para una propiedad frente al agua, mira [video para yates y hospitalidad en Fort Lauderdale](/es/video-para-yates-y-hospitalidad-fort-lauderdale). Pide una llamada antes de comprometerte con un día de grabación; la primera conversación es sobre el alcance, no una venta.",
    ],
  },
];

export const CORPORATE_EVENT_ES_DISCLOSURE = "¿Cuánto cuesta un videógrafo de eventos en Miami?";
export const CORPORATE_EVENT_ES_DESTINATIONS = "Rangos de edición y de grabación en sitio, entregas urgentes y una película de evento publicada para comparar.";

export const CORPORATE_EVENT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta la videografía de un evento en Miami?",
    paragraphs: [
      `Para material corporativo o de eventos, la banda corporativa de edición de la calculadora es ${corporate} por proyecto. Es un rango indicativo de editor independiente con un descuento de introducción aplicado, no una promesa de cobertura completa del evento. Si otro videógrafo o tu equipo ya grabó el evento, comparte el material original y explica la pieza final que quieres antes de tomar ese rango como cotización.`,
      "Un resumen corto, la presentación de un ponente y una película larga del evento piden decisiones de edición distintas. Indica qué momentos importan, si los discursos deben quedar completos y dónde se publicará el video. También hay que revisar cuánto material hay y en qué estado está. La grabación y la edición se pueden hablar juntas, con los entregables reales acordados para tu evento.",
    ],
  },
  {
    heading: "¿Cómo se presupuesta la grabación en el lugar del evento?",
    paragraphs: [
      `[Presencia Local](/es/precios/presencia-local) parte desde ${localPresenceEs} por día de producción. La captura de medio día como complemento tiene un rango indicativo de ${onLocation} con la misma base de descuento. Son maneras distintas de definir el trabajo: no se suman ni se debe asumir que alguna cubre el evento completo sin revisar la propuesta. Las productoras con equipo completo trabajan con otro modelo.`,
      "Envía el lugar, el horario, el acceso y las partes del evento que sí o sí deben grabarse. Explica si la prioridad son los discursos, las reacciones del público, entrevistas o detalles del lugar. Si hay actividades al mismo tiempo, dilo antes de acordar la cobertura. Pide que la cotización separe grabación, requisitos de sonido, edición, versiones finales y cualquier necesidad que se cobre aparte.",
    ],
  },
  {
    heading: "¿Cómo cambia el estimado si necesitas el video con urgencia?",
    paragraphs: [
      `La calculadora aplica un multiplicador exprés de ${EXPRESS_MULTIPLIER} a su estimado cuando eliges entrega rápida. Es un ajuste de presupuesto, no un plazo de entrega garantizado ni la confirmación de que se puede aceptar un pedido urgente. Dile a Esteban la fecha en que necesitas el video terminado y por qué esa fecha importa antes de hacer planes alrededor de una edición rápida.`,
      "Separa la fecha del evento de la fecha de publicación que pides. Indica si necesitas primero un resumen corto y después una versión más larga, o una sola pieza final. Manda un ejemplo del estilo que quieres y aclara quién aprueba la edición. Con eso, la conversación sobre plazos parte de lo que de verdad se puede entregar, no de una suposición.",
    ],
  },
  {
    heading: "¿Qué evento grabado puedes ver en el portafolio?",
    paragraphs: [
      "El evento grabado y publicado es [Diana & Jack](/es/portafolio/diana-jack): una película de boda en Boston, Massachusetts, donde Esteban fue el videógrafo y el editor. Entregó una película completa de 20 minutos del día y un tráiler de resumen de alrededor de minuto y medio. No es un evento corporativo, pero muestra cómo se cubre un día completo y cómo se condensa en una pieza corta.",
      "Para material de marca grabado en locación en Miami, mira [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey), un spot promocional para redes de un restaurante, con videografía y edición de Esteban. Si tu evento es una conferencia o un lanzamiento, pide una llamada para revisar el programa del día antes de cerrar el alcance; esa conversación define qué se graba y qué no.",
    ],
  },
  {
    heading: "¿Cómo se graban entrevistas dinámicas y testimonios de asistentes en eventos de networking?",
    paragraphs: [
      "Capturar testimonios de asistentes durante un evento corporativo de networking requiere moverse con naturalidad entre la gente sin interrumpir las conversaciones. Se utiliza una cámara ligera en mano con micrófono direccional tipo bastón o transmisor inalámbrico discreto, permitiendo acercarse a participantes dispuestos a compartir sus impresiones sin armar un set invasivo.",
      "Las preguntas se limitan a dos preguntas puntuales sobre las conclusiones de la jornada o aprendizajes clave, logrando respuestas de treinta a cuarenta segundos ideales para reels en redes sociales. El murmullo del salón aporta energía positiva en lugar de estorbar cuando el micrófono se coloca a corta distancia y los niveles se controlan de forma continua. La organización puede facilitar una lista de asistentes prioritarios o patrocinadores, pero el material más espontáneo suele surgir en las áreas de interacción abierta.",
    ],
  },
  {
    heading: "¿Qué logística requiere una jornada de grabación continua de 8 a 10 horas en conferencias?",
    paragraphs: [
      "La cobertura continua durante toda una jornada exige una gestión estricta de energía, tarjetas de memoria y temperatura para no perder momentos clave. En una jornada corporativa de nueve horas se graban respaldos simultáneos en tarjetas de alta velocidad, rotando baterías recargables en estaciones de carga seguras para mantener la cámara lista en cada sesión.",
      "La logística también prevé los cambios de iluminación cuando las conferencias de día pasan a cócteles de networking al atardecer o cenas en embarcaciones y yates. Los lentes luminosos permiten registrar salones con poca luz sin instalar trípodes voluminosos que obstaculicen el paso de los asistentes. La agenda prioriza las presentaciones principales y premiaciones, reservando bloques para entrevistas itinerantes, tomas de ambiente y presencia de marca. Coordinar los momentos clave con el equipo organizador asegura estar en el punto exacto antes de cada intervención.",
    ],
  },
];

export const CORPORATE_EVENT_FTL_ES_DISCLOSURE = "¿Cuánto cuesta un videógrafo de eventos en Fort Lauderdale?";
export const CORPORATE_EVENT_FTL_ES_DESTINATIONS = "Tarifas de filmación en Broward, resúmenes corporativos y logística para jornadas completas.";

export const CORPORATE_EVENT_FTL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta la videografía para eventos corporativos en Fort Lauderdale?",
    paragraphs: [
      `Para eventos corporativos, conferencias y convenciones en Fort Lauderdale o el Centro de Convenciones del Condado de Broward, la tarifa se estructura en dos partes: el tiempo de rodaje en sitio, desde $80 por hora, y la edición posterior. La banda corporativa de edición de la calculadora se sitúa entre $400 y $750 por proyecto, representando una tarifa de profesional independiente con descuento de introducción en lugar de una cotización cerrada. Si tu equipo interno ya grabó el evento y solo necesitas postproducción, comparte el metraje para cotizar únicamente el montaje.`,
      "La edición varía según los entregables requeridos: un video resumen ágil para LinkedIn, grabaciones íntegras de conferencias magistrales o cápsulas verticales de testimonios. Especifica qué ponencias son prioritarias, los requisitos de audio y las fechas límite de entrega. La grabación presencial y la postproducción se coordinan de forma integral según el cronograma de tu evento en Fort Lauderdale.",
    ],
  },
  CORPORATE_EVENT_ES_SECTIONS[1],
  CORPORATE_EVENT_ES_SECTIONS[2],
  {
    heading: "¿Qué evento grabado en video puedes ver en el portafolio?",
    paragraphs: [
      "El evento grabado y publicado es [Diana & Jack](/es/portafolio/diana-jack): una película de boda en Boston, Massachusetts, donde Esteban fue el videógrafo y el editor. Entregó una película completa de 20 minutos del día y un tráiler de resumen de alrededor de minuto y medio. No es un evento corporativo en Broward, pero muestra cómo se cubre un día completo y cómo se condensa en una pieza corta.",
      "Para material de marca grabado en locación, mira [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey), un spot promocional para redes de un restaurante, con videografía y edición de Esteban. Si tu evento es una conferencia o un lanzamiento en Fort Lauderdale, pide una llamada para revisar el programa del día antes de cerrar el alcance; esa conversación define qué se graba y qué no.",
    ],
  },
  CORPORATE_EVENT_ES_SECTIONS[4],
  CORPORATE_EVENT_ES_SECTIONS[5],
];

export const NETWORKING_EVENT_ES_DISCLOSURE = "¿Cuánto cuesta la videografía para eventos de networking en Miami?";
export const NETWORKING_EVENT_ES_DESTINATIONS = "Tarifas de grabación, entrevistas breves con asistentes y video resumen para redes.";

export const NETWORKING_EVENT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta la videografía para eventos de networking y cócteles en Miami?",
    paragraphs: [
      `La videografía para encuentros de networking, mixers empresariales y reuniones de negocios en Miami se cotiza en función de dos elementos: las horas de rodaje presencial, desde $80 por hora, y la edición del resumen en video. La banda corporativa de edición se sitúa entre $400 y $750 por proyecto para entregar un aftermovie dinámico con corrección de color y mezcla de audio. Si la empresa cuenta con editores internos y solo requiere la filmación y entrega de archivos brutos, el servicio se limita a las horas de cobertura.`,
      "Los eventos de networking suelen demandar una pieza principal de sesenta a noventa segundos en formato horizontal y clips cortos verticales con entrevistas espontáneas a los asistentes. Definir si se priorizan los patrocinadores, los discursos de bienvenida o las interacciones entre invitados permite optimizar el tiempo de cámara durante el evento.",
    ],
  },
  CORPORATE_EVENT_ES_SECTIONS[1],
  CORPORATE_EVENT_ES_SECTIONS[4],
  {
    heading: "¿Qué equipo de sonido se utiliza en salones concurridos y cócteles de networking?",
    paragraphs: [
      "El murmullo constante y la música de fondo en salones de hotel o terrazas dificultan el registro con micrófonos integrados en cámara. Para obtener testimonios nítidos se utiliza un micrófono de mano dinámico tipo bastón o transmisores inalámbricos de solapa colocados a corta distancia del ponente, aislando la voz mientras se conserva la energía del entorno.",
      "El operador utiliza auriculares cerrados para verificar la ganancia de audio en tiempo real y evitar saturaciones inesperadas durante los brindis o intervenciones espontáneas. Este control técnico asegura que las declaraciones de los asistentes queden limpias y listas para clips de redes sociales sin requerir complejas restauraciones en postproducción.",
    ],
  },
  CORPORATE_EVENT_ES_SECTIONS[5],
];

export const WEDDING_MIAMI_ES_DISCLOSURE = "¿Cuánto cuesta la videografía de bodas en Miami?";
export const WEDDING_MIAMI_ES_DESTINATIONS = "Cotización detallada, logística de sedes en Miami y momentos esenciales del día.";

export const WEDDING_MIAMI_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Qué detalles debe enviar una pareja para cotizar un video de bodas en Miami?",
    paragraphs: [
      "Las parejas deben enviar cuatro detalles esenciales: la fecha del evento, los lugares de la celebración, las horas de cobertura necesarias y los formatos de entrega deseados. La fecha confirma la disponibilidad de Esteban en el calendario. Especificar si la ceremonia y la recepción se realizan en el mismo lugar o en ubicaciones separadas permite planificar los tiempos de traslado y la logística entre sedes.",
      "Indicar si buscan una película cinematográfica de ocho a diez minutos, un avance corto para redes sociales o la grabación completa de la ceremonia define el alcance del proyecto. Con estos datos, Esteban prepara una cotización detallada por escrito sin costos imprevistos antes de reservar la fecha.",
    ],
  },
  {
    heading: "¿Cuáles momentos de la boda deben incluirse en la lista de tomas?",
    paragraphs: [
      "Una lista de tomas completa incluye tanto los momentos centrales del itinerario como las interacciones familiares espontáneas. Los instantes clave abarcan la preparación, el primer vistazo, la entrada del cortejo, los votos y el intercambio de anillos, el primer beso y la salida de los novios. En la recepción, la prioridad se enfoca en el primer baile, las tradiciones familiares, los brindis y la fiesta.",
      "Compartir el cronograma del organizador y los nombres de las personas más cercanas garantiza filmar a los familiares clave. Para otras celebraciones familiares, visite [video para quinceañeras en Miami](/es/video-para-quinceaneras-miami); para cortes breves para redes, explore [edición de videos cortos](/es/edicion-de-videos-cortos).",
    ],
  },
];

export const VLOG_VIDEOGRAPHER_ES_DISCLOSURE = "¿Cómo se filman y editan vlogs profesionales en Miami?";
export const VLOG_VIDEOGRAPHER_ES_DESTINATIONS = "Rodaje en exteriores, estabilización para creadores y estructura de episodios.";

export const VLOG_VIDEOGRAPHER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo funciona el rodaje de vlogs en exteriores en Miami?",
    paragraphs: [
      "La filmación de vlogs en exteriores asigna al creador un camarógrafo dedicado que registra tomas en movimiento, segmentos de diálogo y material de apoyo por toda la ciudad. Esteban utiliza una cámara Sony Alpha 7 IV sobre estabilizador con micrófonos inalámbricos de alta calidad. Esta configuración ligera permite desplazarse con fluidez por restaurantes, eventos y zonas concurridas como Wynwood o Brickell sin cargar trípodes pesados.",
      "El sonido permanece limpio incluso en entornos concurrido gracias a la microfonía directa. El servicio se puede contratar por horas a $80 la hora o en jornadas completas de grabación, proporcionando semanas de contenido listo para publicar.",
    ],
  },
  {
    heading: "¿Qué estructura de edición transforma grabaciones de vlog en episodios atractivos?",
    paragraphs: [
      "La edición de vlogs se basa en el ritmo narrativo más que en una secuencia cronológica pasiva. Cada episodio comienza con un gancho dinámico extraído del momento más interesante del día durante los primeros segundos para captar la atención de la audiencia. Se eliminan pausas innecesarias, vacilaciones y movimientos bruscos de cámara para mantener la agilidad del video.",
      "Se incorpora música licenciada y textos informativos que resaltan ubicaciones clave. Esteban entrega episodios en formato horizontal para YouTube y adaptaciones verticales para Instagram Reels y TikTok. Para creadores que graban su propio material, consulte [edición de video para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami).",
    ],
  },
];

export const CONFERENCE_VIDEOGRAPHER_ES_DISCLOSURE = "¿Cómo se planifica la videografía de conferencias en Fort Lauderdale?";
export const CONFERENCE_VIDEOGRAPHER_ES_DESTINATIONS = "Grabación continua de sesiones, respaldo de audio y entregables para patrocinadores.";

export const CONFERENCE_VIDEOGRAPHER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filman conferencias de múltiples sesiones sin interrupciones de audio o batería?",
    paragraphs: [
      "Las conferencias de varias sesiones en Fort Lauderdale requieren redundancia técnica y una gestión rigurosa de energía. Esteban cubre convenciones en centros como el Greater Fort Lauderdale / Broward County Convention Center utilizando cámaras Sony Alpha que graban simultáneamente en dos tarjetas de memoria para respaldar cada toma. El audio se conecta directamente a la consola principal del auditorio y se complementa con micrófonos de solapa inalámbricos en el podio.",
      "Un sistema de carga continua garantiza baterías frescas durante los recesos sin interrumpir ninguna presentación. Para eventos corporativos de todo el día, consulte [videógrafo para eventos corporativos en Fort Lauderdale](/es/videografo-para-eventos-corporativos-fort-lauderdale).",
    ],
  },
  {
    heading: "¿Cuáles entregas de video son las más útiles para asistentes y patrocinadores?",
    paragraphs: [
      "Los organizadores de conferencias suelen necesitar tres formatos principales tras finalizar el evento. En primer lugar, un video resumen de sesenta a noventa segundos que muestre conferencistas, el público interactuando y los logotipos de los patrocinadores, ideal para promocionar la próxima edición. En segundo lugar, grabaciones completas de paneles y conferencias magistrales para plataformas educativas o miembros que no asistieron presencialmente.",
      "En tercer lugar, fragmentos verticales con declaraciones destacadas de los expositores para publicar en LinkedIn y redes sociales. Para reuniones y cócteles de networking, revise [videógrafo para eventos de networking en Miami](/es/videografo-para-eventos-de-networking-miami); para jornadas completas, consulte el [plan Presencia Local](/es/precios/presencia-local).",
    ],
  },
];

export const EXECUTIVE_INTERVIEW_ES_DISCLOSURE = "¿Cómo se organiza la filmación de entrevistas ejecutivas en Miami?";
export const EXECUTIVE_INTERVIEW_ES_DESTINATIONS = "Preparación de portavoces, iluminación en oficinas y montaje corporativo.";

export const EXECUTIVE_INTERVIEW_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo debe preparar una empresa a un ejecutivo para una entrevista en video en Miami?",
    paragraphs: [
      "La preparación de un ejecutivo para una entrevista filmada comienza con la selección del espacio y la claridad de los mensajes. Es recomendable elegir una oficina o sala de conferencias tranquila con poco ruido ambiental e iluminación natural indirecta, evitando salas acristaladas que generen eco acústico. En lugar de memorizar un guion rígido, conviene estructurar de tres a cinco ideas clave para que las respuestas suenen naturales y seguras.",
      "Esteban instala iluminación suave y micrófonos inalámbricos de solapa para asegurar una calidad de voz impecable. Las preguntas se formulan fuera de cámara para que el directivo converse de manera fluida. Para testimonios de clientes, consulte [guía de guiones testimoniales](/es/guias/guion-de-video-testimonial-para-clientes).",
    ],
  },
  {
    heading: "¿Qué proceso de edición convierte declaraciones ejecutivas en piezas de marca?",
    paragraphs: [
      "La edición depura las grabaciones sin alterar el mensaje ni la naturalidad del expositor. Esteban recorta titubeos, silencios prolongados y repeticiones involuntarias manteniendo el ritmo profesional de la conversación. Se insertan tomas de apoyo del entorno laboral, demostraciones de producto o diapositivas para dinamizar los cortes visuales.",
      "El ajuste de color equilibra tonos de piel bajo luces de oficina, mientras gráficos limpios muestran el nombre y cargo del ejecutivo. Las entregas incluyen videos horizontales para páginas web y versiones verticales para perfiles profesionales en LinkedIn. Para edición de grabaciones existentes, consulte [servicio de edición de entrevistas](/services/interview-video-editing-service); para tarifas, visite [precios](/es/precios).",
    ],
  },
];

export const YACHT_EVENT_ES_DISCLOSURE = "¿Cómo se cotiza y graba un evento en yate en Miami?";
export const YACHT_EVENT_ES_DESTINATIONS = "Celebraciones privadas, paseos al atardecer, estabilización a bordo y sonido frente al viento.";

export const YACHT_EVENT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se graba video profesional a bordo de yates y barcos en Miami?",
    paragraphs: [
      "La filmación a bordo de embarcaciones en la Bahía de Biscayne o los canales de Fort Lauderdale requiere equipo ligero y estabilización especializada. Esteban utiliza cámaras Sony Alpha de cuadro completo montadas en gimbals motorizados de tres ejes que neutralizan el balanceo de la cubierta y la vibración del motor. El operador se desplaza con agilidad por pasillos estrechos y cubiertas exteriores sin interrumpir a los invitados ni a la tripulación. Los filtros polarizados controlan los reflejos intensos del agua bajo el sol de Florida, mientras lentes luminosos permiten capturar cenas y fiestas nocturnas al atardecer con nitidez. Para eventos de marca en agua, consulte [video para eventos corporativos en Fort Lauderdale](/es/videografo-para-eventos-corporativos-fort-lauderdale); para embarcaciones comerciales, revise [marketing de video para alquiler de yates](/services/yacht-charter-video-marketing-miami).",
    ],
  },
  {
    heading: "¿Cómo se registra audio claro durante fiestas y eventos sobre el agua?",
    paragraphs: [
      "Grabar discursos o testimonios comprensibles en una embarcación en movimiento presenta desafíos acústicos por el viento y el sonido de los motores. Se emplean micrófonos direccionales con protectores antiviento de alta densidad que aíslan las voces de los anfitriones e invitados. En brindis formales o palabras de bienvenida, micrófonos inalámbricos discretos bajo el cuello protegen la conversación de ráfagas de aire. El sonido ambiente del agua y la música se registra en pistas independientes para enriquecer la atmósfera sin tapar las palabras durante la mezcla final. El resultado es un video equilibrado donde los brindis y la celebración se escuchan con total claridad. Para opciones de rodaje presencial, consulte [precios](/es/precios); para filmación de eventos sociales, visite [videógrafo de bodas en Miami](/es/videografo-de-bodas-miami).",
    ],
  },
];

export const CONTENT_DAY_ES_DISCLOSURE = "¿Cómo funciona una jornada de grabación de contenido en Miami?";
export const CONTENT_DAY_ES_DESTINATIONS = "Jornadas de medio día, acumulación de videos cortos, dirección frente a cámara y edición vertical.";

export const CONTENT_DAY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿En qué consiste una jornada dedicada de grabación de contenido en Miami?",
    paragraphs: [
      "Una jornada de filmación de contenido permite a dueños de negocios, asesores y marcas personales en el sur de Florida producir un mes de videos para redes en una sola sesión planificada. En lugar de improvisar publicaciones cada semana con un teléfono, el cliente trabaja con un plan de tomas preparado que abarca preguntas frecuentes de clientes, demostraciones de servicio y llamadas a la acción. Esteban traslada iluminación profesional, audio inalámbrico y cámaras 4K directamente a su oficina, local comercial o locación acordada en Miami. La filmación se organiza en bloques: primero se graban los mensajes directos a cámara mientras la energía es óptima, seguidos de planos de apoyo y detalles del negocio. Para edición de marca personal, consulte [editor de video para fundadores](/es/servicios); para videos verticales, revise [reels para negocios en Miami](/es/reels-para-negocios-miami).",
    ],
  },
  {
    heading: "¿Cuántos videos cortos terminados se obtienen de una jornada de medio día?",
    paragraphs: [
      "Una jornada estructurada de medio día suele generar entre ocho y dieciséis videos verticales editados y listos para publicar en Instagram Reels, TikTok y YouTube Shorts. La cantidad final depende de la preparación de los guiones y la soltura de los portavoces; contar con ideas claras permite avanzar rápidamente entre temas. Esteban orienta el ritmo en el set, ayuda a corregir posturas y graba aperturas alternativas para evaluar qué gancho funciona mejor en redes. La postproducción posterior incluye selección de mejores tomas, subtítulos dinámicos sincronizados, corrección de color y música con derechos comerciales. Esta metodología ahorra semanas de esfuerzo disperso. Para preparar temas antes de la sesión, consulte [planificador de ganchos de video](/es/planificador-de-ganchos-de-video); para tarifas de rodaje, consulte [precios](/es/precios).",
    ],
  },
];

export const REMOTE_EDITING_COLOMBIA_ES_DISCLOSURE = "¿Cómo funciona la edición de video remota para empresas en Colombia?";
export const REMOTE_EDITING_COLOMBIA_ES_DESTINATIONS = "Envío de material en la nube, comunicación directa en español, calidad comercial y facturación clara en dólares.";

export const REMOTE_EDITING_COLOMBIA_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo envían empresas y creadores en Colombia sus archivos para edición remota?",
    paragraphs: [
      "La postproducción remota entre Colombia y Estados Unidos opera mediante carpetas organizadas en la nube y entregas ordenadas de metraje. Empresas, agencias digitales y creadores en Bogotá, Medellín, Cali y Barranquilla suben sus grabaciones en alta resolución a Google Drive, Dropbox o Frame.io. Los archivos se estructuran en carpetas con audio limpio, logotipos de marca, tomas principales y notas breves con el objetivo de cada video. Esteban se encarga de la descarga, sincronización de cámaras y montaje completo desde Florida. La comunicación directa en español nativo facilita que los comentarios creativos, revisiones y referencias de estilo se comprendan sin retrasos ni barreras idiomáticas. Para pautas de entrega de archivos, consulte [guía de entrega para edición remota](/es/guias/entrega-para-edicion-remota); para ver la experiencia empresarial de Esteban en Colombia, revise el [proyecto de portafolio ML Colombia](/es/portafolio/ml-colombia).",
    ],
  },
  {
    heading: "¿Qué formatos de video y paquetes se entregan para clientes en Colombia?",
    paragraphs: [
      "Las marcas colombianas contratan edición remota para campañas publicitarias, capacitaciones corporativas, videos para YouTube y contenido diario para redes sociales. Esteban transforma el metraje bruto en videos horizontales de alto impacto para sitios web y presentaciones, así como cortes verticales 9:16 optimizados para Instagram Reels y TikTok. Cada entrega incluye limpieza de audio para eliminar ruido ambiente, ajuste de color profesional, gráficos dinámicos y subtítulos bilingües opcionales si la empresa busca proyección internacional. Los avances se comparten mediante enlaces de revisión interactivos para recibir comentarios con marcas de tiempo. La facturación se gestiona en dólares estadounidenses mediante paquetes mensuales predecibles o proyectos individuales. Para clips de entrevistas y podcast, consulte [edición de podcast en Miami](/es/servicios); para ver planes, visite [precios](/es/precios).",
    ],
  },
];

export const BILINGUAL_SUBTITLING_ES_DISCLOSURE = "¿Cómo se realiza el subtitulado bilingüe en inglés y español para video?";
export const BILINGUAL_SUBTITLING_ES_DESTINATIONS = "Traducción precisa de ideas, subtítulos dinámicos legibles, zonas seguras en redes y archivos SRT.";

export const BILINGUAL_SUBTITLING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Por qué los subtítulos automáticos no sustituyen a la traducción profesional bilingüe?",
    paragraphs: [
      "Las herramientas de transcripción automática cometen fallos frecuentes con términos técnicos, modismos regionales y nombres propios, generando errores que restan credibilidad a videos corporativos. El subtitulado bilingüe profesional requiere un editor con dominio nativo de inglés y español que comprenda el contexto y la intención de cada frase. Esteban transcribe el diálogo original con precisión, traduce el significado de manera natural y ajusta la sincronización al ritmo de la voz. En videos de capacitación corporativa, entrevistas con clientes y conferencias, una traducción exacta evita malentendidos y garantiza que audiencias internacionales sigan la información sin esfuerzo. Los subtítulos se diseñan con tipografía de alto contraste legible en pantallas móviles. Para recomendaciones de diseño de texto, consulte [mejores estilos de subtítulos para Instagram Reels](/es/guias/mejores-estilos-de-subtitulos-para-instagram-reels); para montaje de conversaciones, visite [edición de entrevistas](/services/interview-video-editing-service).",
    ],
  },
  {
    heading: "¿Cómo se entregan los subtítulos bilingües para diferentes plataformas?",
    paragraphs: [
      "Los subtítulos bilingües se entregan incrustados directamente en el video final o como archivos independientes en formato SRT compatibles con YouTube, LinkedIn y reproductores web. En videos verticales para Reels y TikTok, los textos se sitúan dentro de las zonas seguras de pantalla para evitar que nombres de usuario, descripciones o botones de interacción tapen las líneas de lectura. Se organizan en bloques de dos líneas breves para facilitar una lectura ágil sin pausar la reproducción. Cuando una campaña requiere versiones separadas en inglés y español del mismo metraje, Esteban entrega cortes adaptados para cada idioma con llamadas a la acción acordes a cada público. Para reutilizar conferencias y capacitaciones con subtítulos, consulte [servicio para webinars](/services/webinar-clip-editing-service); para opciones de paquetes, revise [precios](/es/precios).",
    ],
  },
];

export const TRADE_SHOW_BOOTH_ES_DISCLOSURE = "¿Cómo se graba en stands y convenciones en Fort Lauderdale y Miami?";
export const TRADE_SHOW_BOOTH_ES_DESTINATIONS = "Demostraciones en directo, pasillos concurridos, equipo estabilizado y clips B2B para LinkedIn.";

export const TRADE_SHOW_BOOTH_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filma video profesional en stands y pabellones de ferias comerciales?",
    paragraphs: [
      "Registrar la actividad comercial en el Centro de Convenciones del Condado de Broward en Fort Lauderdale o en el Centro de Convenciones de Miami Beach exige agilidad técnica y un equipo compacto. Los pabellones feriales presentan pasillos concurridos, iluminación artificial variable y un flujo constante de visitantes entre expositores. Esteban utiliza cámaras de cuadro completo sobre estabilizadores motorizados de tres ejes, desplazándose con fluidez por áreas reducidas sin incomodar a los asistentes ni interrumpir las explicaciones comerciales en los stands. La grabación documenta demostraciones de productos en vivo, interacciones en pantallas interactivas y presentaciones de ejecutivos, destacando la señalética de la marca y el interés genuino de los clientes potenciales. Los sensores de alto rango dinámico equilibran las pantallas LED brillantes con la luz ambiental del recinto ferial. Para cobertura de conferencias magistrales, consulte [videógrafo para conferencias en Fort Lauderdale](/es/videografo-para-conferencias-fort-lauderdale); para convenciones completas, revise [videógrafo para eventos corporativos en Fort Lauderdale](/es/videografo-para-eventos-corporativos-fort-lauderdale).",
    ],
  },
  {
    heading: "¿Qué tomas se capturan para convertir la presencia en ferias en material de marketing B2B?",
    paragraphs: [
      "Participar como expositor en convenciones de negocios representa una inversión importante en diseño de stands, traslados y personal. Rentabilizar esa inversión implica convertir varios días de exposición en un banco versátil de material audiovisual para marketing B2B durante todo el año. Esteban graba tomas planificadas para diferentes objetivos de comunicación: resúmenes dinámicos de treinta segundos para publicación rápida en LinkedIn, demostraciones explicativas de producto para seguimiento de ventas y testimonios breves de clientes frente al stand. Se emplean micrófonos direccionales y de solapa inalámbricos que aíslan las voces del ruido ambiental del pabellón ferial. Cada entrega se edita con corrección de color profesional acorde a la guía de marca y se adapta tanto a formato horizontal como vertical para redes sociales corporativas. Los directores comerciales reciben contenido estructurado para justificar la rentabilidad del evento ante la dirección. Para conocer tarifas de filmación, consulte [precios](/es/precios); para solicitar una cotización personalizada, visite nuestra página de [contacto](/es/contacto).",
    ],
  },
];

export const CORPORATE_GALA_ES_DISCLOSURE = "¿Cómo se graba una gala corporativa o benéfica en Miami y Palm Beach?";
export const CORPORATE_GALA_ES_DESTINATIONS = "Salones de etiqueta, iluminación tenue, sonido de discursos y recaps para captación de donantes.";

export const CORPORATE_GALA_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filman galas corporativas y cenas benéficas en salones con iluminación tenue?",
    paragraphs: [
      "La filmación de galas benéficas anuales, cenas de recaudación de fondos y eventos corporativos de etiqueta en salones exclusivos de Miami, Coral Gables y Palm Beach exige una presencia discreta en entornos de iluminación suave y decorativa. Los grandes salones de banquetes suelen utilizar iluminación tenue con velas y focos puntuales en los centros de mesa, lo que dificulta la captura con cámaras estándar. Esteban utiliza cámaras cinematográficas de cuadro completo equipadas con ópticas de gran apertura, capaces de registrar la elegancia del salón, los detalles de mesa y la emoción de los asistentes sin necesidad de focos frontales deslumbrantes. La cobertura abarca la recepción en la alfombra roja, la exhibición de subastas silenciosas, las intervenciones en el escenario y el ambiente musical en la pista de baile mediante estabilización continua. Las tomas reflejan con fidelidad la sofisticación del evento social. Para entrevistas a directivos, consulte [videógrafo para entrevistas ejecutivas en Miami](/es/videografo-para-entrevistas-ejecutivas-miami); para encuentros empresariales, revise [videógrafo para eventos de networking en Miami](/es/videografo-para-eventos-de-networking-miami).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales ayudan a fundaciones y organizaciones a captar donantes?",
    paragraphs: [
      "Para fundaciones sin fines de lucro y comités benéficos, el video de una gala constituye el recurso principal para agradecer a los donantes y comprometer nuevos patrocinios en ediciones futuras. Más allá de un resumen festivo, Esteban produce piezas audiovisuales enfocadas en el impacto social de la organización y la motivación de los benefactores. El sonido de los discursos y de la subasta en vivo se graba directamente desde la consola principal de sonido del salón, garantizando que cada testimonio y cifra alcanzada se escuche con absoluta nitidez. La postproducción entrega una película resumen de dos minutos de alta calidad cinematográfica, complementada con cápsulas verticales para redes sociales que destacan el respaldo de los patrocinadores principales y los momentos más emotivos de la noche. Este material permite a los equipos de desarrollo institucional fidelizar a su comunidad donante. Para consultar opciones de cobertura presencial, visite nuestra sección de [precios](/es/precios); para solicitar fechas disponibles, escríbanos mediante [contacto](/es/contacto).",
    ],
  },
];

export const SUPERYACHT_CHARTER_ES_DISCLOSURE = "¿Cómo se produce un video publicitario de superyates en Fort Lauderdale?";
export const SUPERYACHT_CHARTER_ES_DESTINATIONS = "Interiores de lujo, camarotes, navegación en alta mar y piezas cinematográficas para brokers náuticos.";

export const SUPERYACHT_CHARTER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Qué técnicas cinematográficas resaltan las comodidades de un chárter en superyates?",
    paragraphs: [
      "La producción de videos publicitarios para superyates en los canales de Fort Lauderdale y las marinas de South Florida exige técnicas cinematográficas marinas avanzadas y un riguroso cuidado a bordo. Los clientes de chárter de lujo y los corredores náuticos buscan piezas audiovisuales que exhiban las líneas exteriores de la nave, sus amplias cubiertas de sol, áreas de descanso y elegantes salones interiores. Esteban utiliza cámaras de cuadro completo con objetivos ultra gran angular de mínima distorsión sobre estabilizadores motorizados de tres ejes, registrando pasillos, camarotes principales y el puente de mando con movimientos fluidos y proporciones reales. La jornada de rodaje se planifica para aprovechar la luz natural: las horas diurnas destacan la navegación, las lanchas auxiliares y los deportes acuáticos, mientras que el atardecer realza las cenas privadas en cubierta y la iluminación subacuática de la embarcación. Se utilizan filtros polarizados para controlar los reflejos del agua marina. Para eventos privados a bordo, consulte [videógrafo para eventos en yates en Miami](/es/videografo-para-eventos-en-yates-miami); para hospitalidad náutica, revise [video para yates y hospitalidad en Fort Lauderdale](/es/video-para-yates-y-hospitalidad-fort-lauderdale).",
    ],
  },
  {
    heading: "¿Cómo impulsa el video marketing las reservas para agencias de chárter y corretaje náutico?",
    paragraphs: [
      "En el mercado del chárter náutico internacional, los clientes de alto patrimonio y las agencias de corretaje toman decisiones de reserva basándose en videos cinematográficos que transmiten la experiencia real de navegar a bordo. Un video promocional de alta calidad muestra el valor del superyate más allá de una ficha técnica estática. Esteban trabaja en estrecha colaboración con capitanes, agentes de gestión y tripulación para destacar el servicio gastronómico de alta cocina, la hospitalidad en cabina y los itinerarios exclusivos por Florida y las Bahamas. La edición combina tomas dinámicas de navegación con planos detallados de la vajilla, los acabados de madera y el equipamiento recreativo. El paquete final incluye un video horizontal de tres minutos para sitios web de corredores marítimos y portales internacionales, junto con versiones verticales en alta definición para campañas en redes sociales. Este material facilita el cierre de contratos de alquiler durante la temporada alta de invierno. Para consultar tarifas de producción, visite [precios](/es/precios); para planificar una sesión a bordo, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const REHEARSAL_DINNER_ES_DISCLOSURE = "¿Cómo se graba la cena de ensayo y cóctel de bienvenida de una boda en Miami?";
export const REHEARSAL_DINNER_ES_DESTINATIONS = "Discursos familiares espontáneos, cócteles al atardecer, audio claro y recaps para el fin de semana de bodas.";

export const REHEARSAL_DINNER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Por qué conviene contar con un videógrafo dedicado para la cena de ensayo y el cóctel de bienvenida?",
    paragraphs: [
      "La cena de ensayo y el cóctel de bienvenida marcan el inicio emocional de un fin de semana nupcial, reuniendo a las familias más cercanas y a los amigos de toda la vida antes de la formalidad del día de la boda. Mientras que la filmación principal de la boda se concentra en el protocolo de la ceremonia y la fiesta, la velada previa ofrece anécdotas espontáneas, risas compartidas y momentos íntimos que enriquecen el recuerdo familiar. Esteban brinda una cobertura documental discreta para cenas de ensayo en restaurantes frente al mar en Miami, jardines históricos en Coconut Grove y residencias privadas en Coral Gables. Trabajando de forma ágil y sin equipos aparatosos, la cámara registra las conversaciones espontáneas y los abrazos familiares sin interrumpir el ambiente relajado de la celebración. Los sensores de cuadro completo garantizan una imagen nítida bajo velas y luces de terraza. Para la filmación del día de la boda, consulte [videógrafo de bodas en Miami](/es/videografo-de-bodas-miami); para eventos en Broward, revise [videógrafo de bodas en Fort Lauderdale](/es/videografo-de-bodas-fort-lauderdale).",
    ],
  },
  {
    heading: "¿Cómo se graban con claridad los brindis familiares y momentos espontáneos del cóctel?",
    paragraphs: [
      "Muchas de las palabras más emotivas de un enlace se pronuncian durante los brindis espontáneos de la cena de ensayo, donde hermanos y amigos cercanos expresan recuerdos entrañables sin las prisas de la fiesta principal. Grabar esas voces con fidelidad requiere una técnica acústica cuidada en terrazas al aire libre o salones de restaurantes concurridos. Esteban utiliza micrófonos inalámbricos discretos con protectores antiviento de alta densidad que aíslan con claridad las voces de los anfitriones del murmullo del local y la música ambiental. En la edición posterior, el audio se limpia y ecualiza para asegurar una escucha perfecta. Los novios reciben un video completo con todos los discursos íntegros, acompañado de un resumen cinematográfico de un minuto para compartir con sus familiares. Estos testimonios también pueden enriquecer el documental final del fin de semana completo de la boda. Para ver ejemplos de nuestro trabajo en video de bodas, explore el [portafolio de boda de Diana y Jack](/es/portafolio/diana-jack); para consultar tarifas, visite [precios](/es/precios).",
    ],
  },
];

export const MASTERMIND_EVENT_ES_DISCLOSURE = "¿Cómo se graba un retiro o evento mastermind en Miami?";
export const MASTERMIND_EVENT_ES_DESTINATIONS = "Filmación en villas privadas, avances de participantes, grabaciones discretas y marketing para convocatorias.";

export const MASTERMIND_EVENT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Por qué los mentores y anfitriones de masterminds requieren video profesional en Miami?",
    paragraphs: [
      "Miami se ha consolidado como la capital preferida para masterminds empresariales de alta gama, retiros de liderazgo y programas de mentoría exclusiva. Cuando los participantes realizan una inversión significativa para viajar a South Florida y reunirse en villas frente al mar o salones de lujo en Downtown Miami y Miami Beach, documentar la energía y exclusividad del evento resulta decisivo para la venta de futuras convocatorias. Esteban ofrece una cobertura documental discreta que registra ponencias principales, sesiones de consultoría intensiva y dinámicas de grupo sin convertir la sala en un set invasivo. Trabajando con cámaras de cuadro completo y obturadores silenciosos, la grabación capta conversaciones espontáneas, reacciones emocionales y el ambiente refinado de la sede sin interrumpir el ritmo de trabajo. Para eventos corporativos en salones, consulte [videógrafo para conferencias en Fort Lauderdale](/es/videografo-para-conferencias-fort-lauderdale); para tarifas de producción, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas en video ayudan a comercializar las próximas ediciones del mastermind?",
    paragraphs: [
      "Los programas de mentoría de alta inversión necesitan testimonios genuinos que transmitan la transformación vivida por los asistentes. Los anfitriones reciben un paquete estructurado de material audiovisual diseñado para captar solicitudes en futuras ediciones. La pieza central es una película resumen cinematográfica de dos minutos que combina momentos clave de aprendizaje con tomas del entorno exclusivo de la propiedad. Mediante entrevistas ágiles con micrófono de mano, se registran las impresiones de los participantes al concluir las sesiones más inspiradoras, preservando su entusiasmo con claridad de audio. Asimismo, la postproducción entrega cápsulas verticales optimizadas para Instagram Reels y publicaciones profesionales en LinkedIn, permitiendo al mentor difundir casos de éxito antes, durante y después del retiro. Este material audiovisual respalda la autoridad del anfitrión y valida el valor del programa. Para coordinar fechas de grabación en su próximo retiro, escríbanos mediante [contacto](/es/contacto); para jornadas de contenido, revise [videógrafo para día de contenido en Miami](/es/videografo-para-dia-de-contenido-miami).",
    ],
  },
];

export const SURPRISE_PROPOSAL_ES_DISCLOSURE = "¿Cómo se filma una propuesta de matrimonio sorpresa en Miami?";
export const SURPRISE_PROPOSAL_ES_DESTINATIONS = "Cámaras con teleobjetivo, coordinación encubierta, audio nítido de los votos y video para redes.";

export const SURPRISE_PROPOSAL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filma una propuesta de matrimonio sorpresa sin levantar sospechas?",
    paragraphs: [
      "Filmar una propuesta de matrimonio sorpresa exige una planificación encubierta rigurosa, sincronización de tiempos y una ubicación estratégica para que la pareja no sospeche nada hasta que se formula la gran pregunta. Miami ofrece escenarios románticos excepcionales, desde los jardines históricos de Vizcaya y las playas de South Beach hasta cubiertas de yates privados en Biscayne Bay y terrazas panorámicas en Coconut Grove. Esteban coordina con antelación las coordenadas exactas, el ángulo de luz natural y el recorrido a pie con el organizador o la pareja. Operando a distancia prudencial con teleobjetivos cinematográficos, la cámara se mimetiza con turistas o visitantes del parque mientras mantiene a los protagonistas en foco nítido. Al producirse la propuesta, movimientos de seguimiento continuos capturan la emoción genuina, el abrazo y la entrega del anillo sin que equipos aparatosos rompan la intimidad del momento. Para celebraciones de boda, consulte [videógrafo de bodas en Miami](/es/videografo-de-bodas-miami); para cenas previas, revise [videógrafo para cena de ensayo en Miami](/es/videografo-para-cena-de-ensayo-miami).",
    ],
  },
  {
    heading: "¿Qué técnicas de audio y formatos de entrega aseguran un recuerdo inolvidable?",
    paragraphs: [
      "Las palabras entrecortadas, las risas de complicidad y las respuestas emocionadas constituyen el valor sentimental de una propuesta nupcial, pero los entornos costeros al aire libre suelen presentar fuerte brisa marina y murmullo ambiental. Esteban utiliza transmisores inalámbricos en miniatura equipados con protección acústica contra el viento, disimulados discretamente en la vestimenta del organizador o integrados en arreglos florales cercanos. Este sistema registra cada frase con nitidez absoluta. Tras la sorpresa, se realiza una breve sesión fotográfica y de video aprovechando la luz dorada del atardecer para registrar tomas románticas y primeros planos del anillo. En postproducción se entrega un tráiler vertical de sesenta segundos en un plazo breve para compartir la noticia en Instagram Reels y TikTok con acabado cinematográfico, junto con un video narrativo de tres minutos con música licenciada. Para ver proyectos de bodas publicados, revise la [película de boda de Diana y Jack](/es/portafolio/diana-jack); para reservar su fecha, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const SPEAKER_SIZZLE_REEL_ES_DISCLOSURE = "¿Cómo se produce un reel de impacto para conferencistas en Miami?";
export const SPEAKER_SIZZLE_REEL_ES_DESTINATIONS = "Presencia escénica, audio de consola, reacciones del público, títulos cinéticos y material para agencias de conferencias.";

export const SPEAKER_SIZZLE_REEL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Qué elementos hacen que un video reel para conferencistas convenza a organizadores de eventos?",
    paragraphs: [
      "Los directores de congresos, comités de eventos corporativos y agencias de conferencias revisan decenas de presentaciones antes de contratar a un conferencista o ponente magistral. Un video promocional de alto impacto debe demostrar solidez escénica, dominio del tema y una conexión entusiasta con el público desde los primeros treinta segundos de reproducción. Esteban produce reels promocionales que combinan tomas de escenario desde múltiples ángulos, entradas ovacionadas y planos de escucha activa de los asistentes. La toma directa de audio desde la consola de sonido del auditorio garantiza que los discursos y anécdotas se escuchen con total claridad sin el eco de la sala. Textos animados destacan los ejes temáticos, cifras de asistencia a congresos, libros publicados y marcas patrocinadoras. El montaje equilibra momentos enérgicos con fragmentos continuos de exposición para evidenciar profundidad profesional. Para grabaciones en congresos corporativos, consulte [videógrafo para eventos corporativos en Miami](/es/videografo-para-eventos-corporativos-miami); para entrevistas, revise [videógrafo para entrevistas ejecutivas en Miami](/es/videografo-para-entrevistas-ejecutivas-miami).",
    ],
  },
  {
    heading: "¿Cómo se edita el material de varias conferencias en un video promocional cohesionado?",
    paragraphs: [
      "Los conferencistas profesionales suelen contar con grabaciones dispersas procedentes de distintos auditorios, hoteles y congresos, grabadas con diferentes cámaras y calidades de audio variables. Esteban unifica ese archivo visual mediante corrección de color avanzada, estabilización de planos y ecualización de audio para crear una pieza promocional coherente y elegante. El video comienza con una frase gancho potente sobre música motivadora y alterna planos generales de grandes auditorios con primeros planos expresivos del ponente. Entre las intervenciones se intercalan testimonios breves de organizadores de eventos elogiando el impacto de la charla. El paquete final incluye un reel maestro de tres minutos para páginas web y agencias de representación, junto con versiones verticales para LinkedIn e Instagram. Este material posiciona al conferencista para negociar mejores honorarios y cerrar fechas en eventos destacados. Para revisar planes de edición, consulte [precios](/es/precios); para evaluar su material existente, escríbanos en nuestra sección de [contacto](/es/contacto).",
    ],
  },
];

export const BAR_MITZVAH_ES_DISCLOSURE = "¿Cómo se filma una celebración de Bar o Bat Mitzvah en South Florida?";
export const BAR_MITZVAH_ES_DESTINATIONS = "Servicios en sinagoga, fiestas en salones, ópticas para baja luz y películas de legado familiar.";

export const BAR_MITZVAH_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se combinan las tradiciones ceremoniales con la energía de la fiesta de un Bar Mitzvah?",
    paragraphs: [
      "Un Bar o Bat Mitzvah representa a la vez un hito religioso trascendental y una animada celebración familiar. Filmar este acontecimiento exige sensibilidad cultural, un profundo respeto por los rituales de la sinagoga y destreza técnica para registrar el dinamismo de la fiesta posterior en salones de Boca Raton, Aventura o Miami. Durante los ensayos o momentos autorizados en el santuario, Esteban trabaja con discreción absoluta, utilizando teleobjetivos y obturación silenciosa desde ubicaciones acordadas sin obstaculizar la bimá ni distraer a los presentes. Al pasar a la recepción nocturna, el estilo de filmación se vuelve dinámico y participativo. La cámara acompaña el baile de la hora, el levantamiento de las sillas y las bendiciones familiares con movimientos fluidos. Las ópticas de gran apertura captan los centros de mesa y la iluminación de fiesta sin necesidad de focos deslumbrantes. Para cenas de bienvenida, consulte [videógrafo para cena de ensayo en Miami](/es/videografo-para-cena-de-ensayo-miami); para enlaces nupciales, revise [videógrafo de bodas en Fort Lauderdale](/es/videografo-de-bodas-fort-lauderdale).",
    ],
  },
  {
    heading: "¿Qué hace que los videos de celebraciones familiares de Bar Mitzvah sean cinematográficos y duraderos?",
    paragraphs: [
      "Las familias de South Florida dedican meses de preparación para celebrar el paso a la madurez de sus hijos, congregando a varias generaciones en reuniones únicas. Preservar este acontecimiento requiere un enfoque documental atento a los momentos protocolares y a la intimidad familiar. Esteban registra el audio de la lectura de la Torá, los discursos de los padres y el encendido de velas mediante micrófonos de solapa discretos y conexión directa a la consola del salón. En la postproducción, se elabora una película cinematográfica completa que narra cronológicamente la jornada, acompañada de un video resumen de tres minutos con música licenciada para compartir fácilmente con familiares y amigos en redes sociales. El material se preserva en alta definición como un legado familiar invaluable para las próximas generaciones. Para conocer nuestro estilo en celebraciones familiares, explore la [película de boda de Diana y Jack](/es/portafolio/diana-jack); para consultar fechas y opciones de cobertura, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const FINE_DINING_DEEP_DIVE: DeepDive = {
  id: "fine-dining-videography",
  title: "How does fine dining tasting menu cinematography drive restaurant reservations in Miami?",
  destinations: "Tableside preparations, searing plancha heat, macro sauce glazes, and candlelit room atmosphere.",
  sections: [
    {
      heading: "How does fine dining and tasting menu cinematography drive restaurant reservations in Miami?",
      paragraphs: [
        "Upscale culinary establishments, Michelin-starred destinations, and chef-driven dining rooms in the Miami Design District, Coconut Grove, and Downtown Miami rely on captivating food cinematography to turn digital viewers into booked table reservations. Static food photography can display an arranged dish, but cinematic video captures the kinetic craftsmanship of the kitchen: the hiss of dry-aged steaks searing on white-hot planchas, delicate tableside reductions being poured, and vibrant herb oils breaking over velvety sauces. Esteban captures these multi-sensory culinary moments utilizing fast macro cinema lenses and calibrated directional lighting that accentuates glistening glazes, micro-greens, and artisanal ceramics without disrupting dining room guests. Footage highlights both the focused intensity of the culinary brigade and the warm, candlelit ambience of the dining room. For casual dining and bar promotions, see [restaurant promo video editing Miami](/services/restaurant-promo-video-editing-miami); to review commercial production rates, visit our [pricing overview](/pricing).",
      ],
    },
    {
      heading: "What video assets showcase culinary craftsmanship and dining room hospitality?",
      paragraphs: [
        "Luxury hospitality marketing requires a versatile library of video assets tailored for seasonal menu launches, holiday dining campaigns, and digital prestige. Restaurant owners and hospitality groups receive an integrated suite of promotional content centered around an evocative ninety-second brand film highlighting the executive chef's philosophy, signature multi-course tasting items, and curated wine pairings. Roving table-level footage captures white-glove hospitality, sommelier service, and guest toasts, conveying an unforgettable gastronomic experience. In post-production, editors assemble bite-sized vertical video cutdowns optimized for Instagram Reels and TikTok, focusing on high-retention food preparation hooks that drive viral engagement and weekend reservations. Esteban's direct food cinematography expertise is published in the portfolio, including our commercial restaurant showcase for [Bar Door Monkey Miami](/portfolio/bar-door-monkey). To discuss filming your culinary menu or dining room, connect with us through our [contact page](/contact); for weekly restaurant social management, see [Growth package](/pricing/growth).",
      ],
    },
  ],
};

export const MIXOLOGY_COCKTAIL_DEEP_DIVE: DeepDive = {
  id: "mixology-cocktail-videography",
  title: "Why do craft cocktail lounges and speakeasies need high-speed mixology video in Miami?",
  destinations: "Slow-motion liquid pours, ice carving acoustics, smoke infusions, and kinetic nightlife reels.",
  sections: [
    {
      heading: "Why do craft cocktail lounges and speakeasies need high-speed mixology video in Miami?",
      paragraphs: [
        "South Florida's vibrant nightlife and craft cocktail corridors across Wynwood, South Beach, and Downtown Fort Lauderdale thrive on sensory spectacle and visual cocktail culture. Discerning cocktail enthusiasts and nightlife patrons choose cocktail lounges based on inventive drink aesthetics, dramatic bar backdrops, and intimate speakeasy ambience seen on social media. Esteban captures artisanal beverage craftsmanship using high-frame-rate 4K capture at 60 and 120 frames per second, transforming rapid bar techniques into mesmerizing slow-motion visual stories. The camera frames crystal-clear hand-carved ice cubes clinking in vintage crystal glassware, fiery citrus oil flairs, aromatic herbal smoke infusions beneath glass cloches, and velvety foam layers poured from shakers. Directional rim lighting isolates amber spirits and vibrant garnishes from dark lounge backgrounds, preserving the moody venue atmosphere without muddy shadows. For full venue coverage, review [nightlife videographer Miami](/services/hotel-hospitality-video-production-miami); to check filming packages, view our [pricing plans](/pricing).",
      ],
    },
    {
      heading: "How are artisanal liquid pours and kinetic bar techniques edited into viral social reels?",
      paragraphs: [
        "Craft beverage videos achieve exceptional retention and shareability on Instagram Reels and TikTok when visual rhythm is paired with crisp, kinetic sound design. Esteban records isolated bar audio with high-sensitivity directional microphones, capturing the satisfying crack of hand-carved ice, the energetic cadence of stainless steel cocktail shakers, and the gentle pop of carbonated mixers. In post-production, editors sync each pour, shake, and garnish to atmospheric music beats, crafting ten-to-fifteen-second vertical video reels engineered to stop scrollers in their feeds. Deliverables include seasonal menu cocktail highlights, behind-the-scenes bartender profiles, and quick visual recipes with clean typography displaying artisanal spirits and botanicals. These dynamic video assets elevate bar prestige, attract spirit brand sponsorship activations, and drive packed weekend bar stools. To review verified hospitality video work, watch our [Bar Door Monkey restaurant promo film](/portfolio/bar-door-monkey); to reserve a cocktail video filming session, reach out through our [contact page](/contact).",
      ],
    },
  ],
};

export const COMMERCIAL_REAL_ESTATE_ES_DISCLOSURE = "¿Cómo se filman inmuebles comerciales y oficinas en Miami?";
export const COMMERCIAL_REAL_ESTATE_ES_DESTINATIONS = "Pisos corporativos de oficinas, naves industriales, corrección de perspectiva y recorridos para arrendamiento.";

export const COMMERCIAL_REAL_ESTATE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa la producción de video el arrendamiento de bienes raíces comerciales en Miami?",
    paragraphs: [
      "Los corredores de arrendamiento comercial, administradores de fondos inmobiliarios y desarrolladores corporativos en Miami, Doral y Downtown Miami recurren a recorridos en video de alta definición para cualificar a corporaciones interesadas antes de coordinar visitas presenciales. Ya sea promocionando pisos completos de oficinas corporativas en Downtown Miami, espacios creativos en Wynwood o naves logísticas industriales junto al Aeropuerto Internacional de Miami, el video arquitectónico transmite la escala real, altura libre de techos y luminosidad natural con mayor eficacia que planos estáticos en dos dimensiones. Esteban produce recorridos comerciales con estabilización motorizada y ópticas gran angular con corrección de perspectiva, evitando distorsiones ópticas en pasillos y oficinas ejecutivas. La producción registra la secuencia completa de acceso desde el vestíbulo principal y ascensores hasta las áreas diáfanas de trabajo y zonas de carga y descarga. Para proyectos residenciales en preventa, consulte [video para preventa de condominios en Miami](/es/video-para-preventa-de-condominios-miami); para conocer las opciones y tarifas de producción, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué especificaciones técnicas y formatos requieren los corredores comerciales?",
    paragraphs: [
      "Los comités corporativos y empresas en procesos de reubicación requieren información visual precisa en los videos de comercialización de propiedades. Esteban coordina con la administración del inmueble para filmar en horarios de iluminación óptima, captando la entrada de luz natural en los espacios sin reflejos excesivos. Los entregables comprenden un video horizontal de tres minutos con textos gráficos que indican metraje utilizable, altura de techos, capacidad eléctrica y estacionamientos asignados, acompañado de versiones verticales de treinta segundos optimizadas para campañas en LinkedIn y redes comerciales. La postproducción incorpora sonido ambiente nítido y musicalización empresarial licenciada. Este material permite a las inmobiliarias presentar sus inmuebles a empresas fuera de Florida y acelerar la firma de contratos de arrendamiento. Para revisar proyectos corporativos publicados, explore el [documental Homeowners](/es/portafolio/homeowners); para coordinar la filmación de un edificio de oficinas o nave industrial, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const LUXURY_PENTHOUSE_ES_DISCLOSURE = "¿Cómo se filman penthouses de lujo en Miami?";
export const LUXURY_PENTHOUSE_ES_DESTINATIONS = "Ventanales de piso a techo, vistas al océano, tomas estabilizadas y recorridos para compradores internacionales.";

export const LUXURY_PENTHOUSE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filman penthouses de gran lujo equilibrando la luz interior y las vistas al mar en Miami?",
    paragraphs: [
      "Comercializar penthouses multimillonarios y residencias de lujo frente al océano en Sunny Isles Beach, Miami Beach y Downtown Miami exige técnicas avanzadas de exposición para registrar simultáneamente los acabados interiores y el horizonte marino. Los ventanales de piso a techo generan un contraste lumínico extremo que suele sobreexponer el cielo en cámaras convencionales. Esteban utiliza sensores cinematográficos de cuadro completo con amplio rango dinámico, perfiles de color específicos y filtros polarizadores para capturar el azul del Atlántico junto con pisos de mármol, maderas nobles y cocinas de diseño italiano en una misma toma armónica. Con estabilizador motorizado de tres ejes, la cámara recorre con fluidez salones de doble altura, vestíbulos con ascensor privado y terrazas con piscinas infinitas, transmitiendo la experiencia de la vida costera de alta gama. Para propiedades residenciales unifamiliares, consulte [video de bienes raíces en Coral Gables](/es/video-de-bienes-raices-coral-gables); para tarifas de rodaje, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales facilitan la venta de propiedades exclusivas a compradores internacionales?",
    paragraphs: [
      "Los compradores de alto patrimonio e inversionistas extranjeros adquieren residencias exclusivas en South Florida sin desplazarse a visitas presenciales preliminares. Los agentes inmobiliarios que comercializan propiedades singulares requieren un paquete audiovisual que comunique la categoría arquitectónica y el estilo de vida frente al agua. Esteban produce un recorrido cinematográfico de tres minutos que combina tomas de terrazas al atardecer, vistas panorámicas nocturnas de la bahía y secuencias fluidas de suites principales, baños de mármol y áreas sociales. Las entregas incluyen una pieza horizontal para portales inmobiliarios y presentaciones privadas, junto con avances verticales de formato 9:16 para redes sociales. Textos discretos en pantalla pueden destacar amarres privados de embarcaciones, servicios de conserjería y comodidades exclusivas del edificio. Para ver muestras de nuestro trabajo audiovisual, explore la [película de evento de Diana y Jack](/es/portafolio/diana-jack); para programar la filmación de un penthouse exclusivo, contáctenos mediante [contacto](/es/contacto).",
    ],
  },
];

export const FINE_DINING_ES_DISCLOSURE = "¿Cómo se filma un restaurante de alta cocina en Miami?";
export const FINE_DINING_ES_DESTINATIONS = "Emplatados minuciosos, servicio de mesa, tomas macro de cocina y ambientación del salón.";

export const FINE_DINING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa la cinematografía gastronómica de alta cocina las reservas de restaurantes en Miami?",
    paragraphs: [
      "Los restaurantes de alta cocina, salones gastronómicos y propuestas de autor en Miami Design District, Coconut Grove y Downtown Miami recurren a la cinematografía de alimentos para convertir a los usuarios digitales en comensales en sala. La fotografía estática muestra un plato terminado, pero el video transmite la destreza del equipo culinario: el sellado a fuego vivo, reducciones de salsas vertidas en mesa y emplatados minuciosos con pinzas de precisión. Esteban filma estos momentos sensoriales utilizando ópticas macro luminosas e iluminación direccional cuidada que resalta texturas, brillos y vapor sin alterar el servicio ni incomodar a los comensales presentes. Las secuencias capturan tanto la concentración en los fogones como el ambiente elegante y la calidez de las mesas del salón. Para promociones en restaurantes informales y bares, consulte [edición de video para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami); para conocer opciones de producción, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué material audiovisual resalta la maestría culinaria y la hospitalidad en sala?",
    paragraphs: [
      "El marketing gastronómico de nivel superior requiere piezas audiovisuales versátiles para menús de temporada, experiencias de maridaje y posicionamiento digital. Los propietarios y directores de sala reciben un paquete estructurado centrado en una pieza cinematográfica de noventa segundos que transmite la visión del chef ejecutivo, los platos más representativos y el servicio de mesa. Tomas fluidas registran la llegada de comensales, la presentación del sommelier y los brindis, comunicando una experiencia culinaria memorable. En postproducción, se elaboran cápsulas verticales para Instagram Reels y TikTok con ganchos visuales que fomentan la interacción y facilitan la reserva para el fin de semana. La experiencia de Esteban en producción gastronómica se encuentra verificada en nuestro portafolio comercial de [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey). Para coordinar una jornada de filmación en su cocina o salón comedor, escríbanos en nuestra sección de [contacto](/es/contacto); para gestión mensual, consulte el [paquete Crecimiento](/es/precios/crecimiento).",
    ],
  },
];

export const MIXOLOGY_COCKTAIL_ES_DISCLOSURE = "¿Cómo se graba coctelería y servicio de barra en Miami?";
export const MIXOLOGY_COCKTAIL_ES_DESTINATIONS = "Cámara lenta de vertidos, sonido del hielo, destilados artesanales y videos para redes sociales.";

export const MIXOLOGY_COCKTAIL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Por qué los bares de coctelería y speakeasies requieren video en cámara lenta en Miami?",
    paragraphs: [
      "La escena nocturna y los bares de coctelería de autor en Wynwood, South Beach y Downtown Fort Lauderdale destacan por su ambientación singular y la estética visual de sus bebidas. Los clientes eligen dónde reunirse basándose en la originalidad de los cócteles y la atmósfera íntima del local vista en redes sociales. Esteban registra la coctelería artesanal mediante grabación en 4K a 60 y 120 cuadros por segundo, convirtiendo las técnicas de barra en secuencias fluidas en cámara lenta. La cámara enfoca el tallado de hielo cristalino, destellos de piel de cítrico, infusiones ahumadas bajo campana de cristal y el batido enérgico en coctelera. La iluminación lateral destaca los colores de licores y botánicos sin alterar la luz tenue del bar ni generar sombras molestas. Para cobertura completa de locales de hospitalidad, revise [producción de video para hoteles en Miami](/es/servicios/produccion-de-video-para-hoteles-miami); para consultar tarifas, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Cómo se editan las técnicas de coctelería y el servicio de barra en videos de alto impacto?",
    paragraphs: [
      "Los videos de coctelería artesanal alcanzan una excelente interacción en Instagram Reels y TikTok cuando el ritmo visual se sincroniza con un diseño de sonido cuidado. Esteban registra el audio de barra con micrófonos direccionales de alta fidelidad, captando el tintineo del hielo tallado, el sonido del batido en acero y el vertido de burbujas en copa. En la postproducción, los cortes se sincronizan con música contemporánea, creando piezas verticales de diez a quince segundos pensadas para captar la atención de inmediato en el feed. Los entregables incluyen videos de cartas de temporada, presentación de bartenders y recetas en video con tipografía nítida que detalla ingredientes y destilados artesanales. Estas piezas refuerzan la reputación del local, atraen patrocinios de marcas y llenan la barra en noches concurridas. Para ver proyectos de hospitalidad en video, revise el [video de restaurante Bar Door Monkey](/es/portafolio/bar-door-monkey); para reservar una sesión, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

