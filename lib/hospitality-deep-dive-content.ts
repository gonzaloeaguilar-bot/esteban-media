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

export const CONSTRUCTION_PROGRESS_ES_DISCLOSURE = "¿Cómo documentar el progreso de una obra en video en Miami?";
export const CONSTRUCTION_PROGRESS_ES_DESTINATIONS = "Hitos estructurales, recorridos de cimentación, control de certificaciones bancarias y supervisión para propietarios.";

export const CONSTRUCTION_PROGRESS_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo documenta el video de progreso de construcción el avance de obras en Miami?",
    paragraphs: [
      "Los constructores de viviendas de lujo, contratistas generales y desarrolladores residenciales en Coral Gables, Coconut Grove y Fort Lauderdale emplean documentación audiovisual recurrente para registrar hitos estructurales, supervisar oficios y mantener informados a propietarios e instituciones financieras. La construcción de residencias exclusivas atraviesa etapas clave —pilotaje de cimentación, vaciado de losas, refuerzo de vigas, instalaciones técnicas y carpintería a medida— que quedan cubiertas con rapidez tras paneles y acabados finales. Esteban realiza recorridos periódicos de obra utilizando cámaras de alta resistencia, ópticas gran angulares y luminarias portátiles para captar cada fase constructiva con total precisión dimensional. Estas grabaciones confirman la correcta ejecución de materiales, previenen contingencias técnicas y generan un archivo visual inmutable que protege legalmente a los constructores y brinda tranquilidad a inversionistas que residen fuera de Florida. Para estudios de arquitectura, consulte [video de arquitectura y diseño en Miami](/es/servicios/video-de-arquitectura-y-diseno-miami); para conocer opciones de contratación, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué material audiovisual entregan los constructores a bancos y propietarios remotos?",
    paragraphs: [
      "Las entidades financieras y los propietarios de residencias personalizadas exigen evidencia visual fidedigna antes de autorizar desembolsos de fondos y certificados de avance de obra. Esteban coordina las jornadas de rodaje con los directores de obra y supervisores de campo para grabar sin interferir en los oficios en curso ni retrasar la actividad en la parcela. Los entregables comprenden un informe horizontal de cinco minutos con fecha, identificación de estancias y descripción de fases, acompañado de resúmenes verticales de sesenta segundos optimizados para Instagram y LinkedIn de la constructora. En postproducción se ajusta el color para reflejar la tonalidad real de maderas nobles y revestimientos, incorporando gráficos que señalan los hitos terminados. Este material satisface los estándares bancarios de control de proyectos y nutre el portafolio del constructor para captar nuevos encargos de alta gama. Para ver producciones residenciales publicadas, examine el [documental Homeowners](/es/portafolio/homeowners); para coordinar visitas periódicas a su obra, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const FASHION_LOOKBOOK_ES_DISCLOSURE = "¿Cómo se graba un lookbook de moda y trajes de baño en Miami?";
export const FASHION_LOOKBOOK_ES_DESTINATIONS = "Movimiento de tejidos, luz natural de costa, trailers de lanzamiento y piezas verticales para publicidad.";

export const FASHION_LOOKBOOK_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa la producción de video lookbook a marcas de moda y trajes de baño en Miami?",
    paragraphs: [
      "Las firmas de moda, diseñadores de trajes de baño y marcas de ropa de playa en Miami Beach, Wynwood y Miami Design District utilizan el video de lookbook cinematográfico para mostrar la caída de los tejidos y el movimiento de las prendas con un dinamismo superior a la fotografía fija. La imagen estática enseña una silueta, pero el movimiento de cámara refleja la ligereza de vestidos de seda con la brisa costera, la elasticidad de prendas de baño en el agua y el ajuste de cortes de sastrería sobre modelos en movimiento. Esteban trabaja junto a directores de arte y estilistas empleando cámaras cinematográficas ligeras, ópticas luminosas y reflectores suaves que cuidan el tono natural de la piel bajo la luz de South Florida. Las tomas destacan bordados artesanales, cierres metálicos y la textura de cada tejido. Para producciones de hospitalidad y moda resort, consulte [producción de video para hoteles en Miami](/es/servicios/produccion-de-video-para-hoteles-miami); para conocer opciones de filmación, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales se entregan para lanzamientos de colección y publicidad digital?",
    paragraphs: [
      "La comercialización contemporánea de moda exige formatos versátiles diseñados para presentaciones de temporada, salones de venta mayorista y anuncios de conversión en plataformas digitales. Esteban proporciona un paquete de contenidos encabezado por un tráiler cinematográfico de sesenta segundos con música licenciada de tendencia que define la identidad de la colección. En postproducción se crean cápsulas verticales en proporción 9:16 optimizadas para Instagram Reels, TikTok y campañas de Meta Ads. Los cortes se estructuran con ritmo ágil, transiciones entre conjuntos y títulos sutiles que informan sobre nombres de prendas y composiciones textiles sin restar protagonismo al estilismo. Estas piezas audiovisuales permiten a diseñadores independientes y marcas consolidadas captar la atención de compradores internacionales y dinamizar sus ventas de comercio electrónico. Para ver nuestra narrativa visual en movimiento, examine la [película de evento Diana y Jack](/es/portafolio/diana-jack); para organizar una sesión en estudio o exteriores, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const BOAT_LISTING_ES_DISCLOSURE = "¿Cómo se graba un video para venta de barcos en Fort Lauderdale?";
export const BOAT_LISTING_ES_DESTINATIONS = "Recorridos en atraque, puente de mando, habitabilidad de camarotes y especificaciones para portales de venta.";

export const BOAT_LISTING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo aceleran los videos de recorrido náutico la venta de barcos en Fort Lauderdale?",
    paragraphs: [
      "Las corredurías de yates, distribuidores marinos y agentes de venta de embarcaciones en Fort Lauderdale, Dania Beach y Palm Beach emplean recorridos en video de alta definición para comercializar lanchas de consola central, yates de pesca deportiva y embarcaciones a motor ante compradores nacionales e internacionales. Adquirir una embarcación de recreo o de pesca exige examinar la distribución de cubierta, la instrumentación de navegación y la habitabilidad de camarotes y salones. Las fotografías convencionales suelen deformar espacios reducidos o no explicar la conexión entre áreas de popa y proa. Esteban realiza recorridos estabilizados en muelle con ópticas de ángulo amplio sin distorsión esférica, mostrando pasillos laterales, puente de mando, motorización fueraborda o intraborda y accesos a sala de máquinas. Estas producciones permiten a compradores interesados inspeccionar la embarcación en detalle antes de viajar a pruebas de navegación en mar abierto. Para videos de alquiler vacacional náutico, examine [marketing de video para superyates en Fort Lauderdale](/es/marketing-de-video-para-superyates-fort-lauderdale); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué detalles técnicos y equipamiento náutico se deben incluir en el video de venta?",
    paragraphs: [
      "Los corredores de barcos y especialistas en corretaje náutico requieren videos diseñados para responder a consultas de compradores exigentes y peritos navales. Esteban planifica las grabaciones en marina o atraque privado aprovechando la mejor marea e iluminación natural para resaltar el brillo del gelcoat del casco y el estado de la teca de cubierta. Las tomas cubren pantallas multifunción de navegación, mandos de atraque tipo joystick, hélice de proa y tableros eléctricos. En postproducción se monta un recorrido explicativo de cinco minutos para YouTube con gráficos que especifican eslora, manga, calado, capacidad de combustible y horas de motor, acompañado de cápsulas verticales de treinta segundos para redes sociales. Micrófonos profesionales con protección contra viento aíslan las explicaciones del broker del sonido del oleaje en el muelle. Para revisar proyectos en el entorno náutico de South Florida, consulte [videógrafo de yates en Miami](/es/videografo-para-eventos-en-yates-miami); para agendar la filmación de un barco, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const LUXURY_WATCH_ES_DISCLOSURE = "¿Cómo se filman relojes de lujo y alta relojería en Miami?";
export const LUXURY_WATCH_ES_DESTINATIONS = "Ópticas macro 1:1, iluminación sin reflejos, acústica mecánica y videos de inspección para coleccionistas.";

export const LUXURY_WATCH_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo destaca la cinematografía macro los relojes de lujo y alta relojería en Miami?",
    paragraphs: [
      "Las joyerías de prestigio, comerciantes de relojes de alta gama y casas de compraventa en el Diamond District de Downtown Miami, Coral Gables y Palm Beach utilizan cinematografía macro especializada para acreditar el estado de conservación, autenticidad y factura artesanal de piezas exclusivas ante coleccionistas. La alta relojería suiza —como cronógrafos mecánicos, calendarios perpetuos y mecanismos tourbillon— cuenta con componentes microscópicos que exigen ópticas de precisión. Esteban utiliza lentes macro de escala 1:1, control milimétrico de enfoque e iluminación de estudio difusa para eliminar brillos parásitos sobre cristales de zafiro y biseles de cerámica pulida. Tomas fluidas recorren agujas biseladas, esferas con guilloché y el segundero continuo con nitidez cristalina. Esta fidelidad visual proporciona tranquilidad a clientes que adquieren piezas de colección a distancia, confirmando la pureza de la esfera y el funcionamiento impecable de la caja. Para proyectos de joyería afines, consulte [edición de video de joyería de lujo en Miami](/es/servicios/edicion-de-video-de-joyeria-de-lujo-miami); para ver planes comerciales, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos audiovisuales utilizan las joyerías para comercializar relojes de colección?",
    paragraphs: [
      "La venta de piezas de alta relojería requiere generar confianza inmediata en canales digitales, mensajería privada con clientes VIP y redes de coleccionistas. Esteban elabora un paquete audiovisual pensado para tiendas y corredores de relojes exclusivos. La entrega principal es un video horizontal de noventa segundos con planos macro de la esfera, laterales de la caja, fondo visto con mecanismo oscilante y cierre del brazalete, acompañado de un diseño sonoro que resalta el chasquido del bisel y el latido del escape. Se entregan además piezas verticales de quince segundos para Instagram Reels y YouTube Shorts, con fichas en pantalla que indican número de referencia, diámetro, calibre y año de fabricación. Estos recursos facilitan la venta a distancia y previenen discrepancias sobre el estado del reloj antes del envío asegurado. Para conocer nuestra experiencia en filmación de producto y hospitalidad, revise el [video comercial de Bar Door Monkey](/es/portafolio/bar-door-monkey); para reservar una jornada de grabación de relojes, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const AMAZON_PRODUCT_ES_DISCLOSURE = "¿Cómo se graba un video para productos de Amazon en Miami?";
export const AMAZON_PRODUCT_ES_DESTINATIONS = "Ciclorama blanco, iluminación de estudio de alta fidelidad, videos para Amazon Inspire y cumplimiento de directrices.";

export const AMAZON_PRODUCT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo mejora la producción de video de producto la conversión en Amazon en Miami?",
    paragraphs: [
      "Las marcas de comercio electrónico, distribuidores y vendedores de Amazon FBA en Miami y Doral emplean videos de producto de alta definición para mostrar el funcionamiento real, escala física y durabilidad de sus artículos, reduciendo devoluciones costosas. Los compradores digitales no pueden manipular físicamente el producto, por lo que una demostración audiovisual clara resulta decisiva para cerrar la compra. Esteban produce videos para fichas de Amazon y Brand Stores empleando cámaras cinematográficas, cicloramas neutros e iluminación difusa de alto índice de reproducción cromática que cumple con las directrices de la plataforma. La filmación resalta texturas de materiales, facilidad de montaje y aplicaciones prácticas en resolución nítida. Estas demostraciones sustituyen simulaciones digitales artificiales por evidencia física auténtica, respondiendo a dudas habituales y mejorando el posicionamiento del listado. Para servicios afines de imagen comercial, examine [fotografía de producto en Miami](/es/servicios/fotografia-de-producto-miami); para conocer opciones de contratación, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos y entregables audiovisuales reciben las tiendas de comercio electrónico?",
    paragraphs: [
      "Los responsables de marcas de venta online requieren entregables versátiles adaptados a las fichas de producto de escritorio y a las aplicaciones móviles de compra. Esteban revisa el embalaje, las ventajas competitivas del artículo y las preguntas frecuentes de clientes antes del rodaje. El paquete principal comprende un video horizontal de sesenta segundos con rótulos discretos que destacan medidas, materiales y modos de uso con fondo limpio. En postproducción se elaboran además cápsulas verticales de treinta segundos optimizadas para Amazon Inspire, TikTok Shop y campañas de anuncios en Meta. Los archivos se codifican según los parámetros de compresión y normas sonoras que exige Amazon para evitar demoras en la aprobación del contenido. Este material permite a las marcas elevar su catálogo y acelerar el ritmo de ventas. Para revisar experiencia previa en producción comercial, examine el [video comercial de Bar Door Monkey](/es/portafolio/bar-door-monkey); para cotizar una sesión en estudio, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const COSMETICS_PRODUCT_ES_DISCLOSURE = "¿Cómo se filman cosméticos y productos de belleza en Miami?";
export const COSMETICS_PRODUCT_ES_DESTINATIONS = "Macro de pipetas y texturas, cuidado del tono de piel, iluminación sin reflejos y videos para redes sociales.";

export const COSMETICS_PRODUCT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo resalta la cinematografía macro los productos cosméticos y de cuidado facial en Miami?",
    paragraphs: [
      "Las firmas de cosmética, marcas de belleza limpia y creadores de líneas de cuidado facial en Miami Beach, Wynwood y Downtown Miami emplean cinematografía macro de estudio para transmitir la textura, viscosidad y aplicación de sus fórmulas. La fotografía tradicional no alcanza a reflejar la textura untuosa de una crema hidratante, la caída fluida de un sérum ni los destellos de un iluminador líquido. Esteban utiliza lentes macro de escala 1:1, cajas de luz difusa y plataformas giratorias motorizadas para filmar fórmulas de belleza con iluminación envolvente. Las tomas registran el goteo de pipetas dosificadoras, texturas de emulsión y la absorción sobre piel con absoluta naturalidad. El esquema de iluminación cuida los tonos de piel reales sin producir reflejos sobre envases de vidrio o tipografías metalizadas. Para producciones de alta gama afines, examine [video para relojes de lujo en Miami](/es/servicios/video-para-relojes-de-lujo-miami); para conocer tarifas, consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas de video impulsan el lanzamiento de cosméticos en redes sociales?",
    paragraphs: [
      "Las marcas de cosmética de venta directa necesitan contenidos visuales ágiles que destaquen en los feeds de Instagram Reels, TikTok y YouTube Shorts. Esteban entrega un paquete de video diseñado para captar la atención de inmediato y transmitir la calidad de la formulación. El material incluye una pieza principal de cuarenta y cinco segundos con ambientación cuidada y diseño sonoro sutil, junto con seis cápsulas verticales de quince segundos centradas en texturas, dosificación y desempaque estético. En postproducción se integran textos discretos que identifican principios activos y extractos botánicos sin saturar la composición visual. Estas piezas permiten a firmas de belleza dinamizar sus lanzamientos comerciales, respaldar envíos a creadores de contenido y acelerar pedidos en sus tiendas online. Para ver muestras de narrativa visual, examine la [película de evento Diana y Jack](/es/portafolio/diana-jack); para planificar una sesión de cosmética en estudio, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const PRODUCT_DEMO_ES_DISCLOSURE = "¿Cómo se graba una demostración de producto y desempaque en Miami?";
export const PRODUCT_DEMO_ES_DESTINATIONS = "Planos cenitales de ensamblaje, sonido ASMR de materiales, tutoriales paso a paso y videos para códigos QR.";

export const PRODUCT_DEMO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayudan los videos cenitales de desempaque y demostración a reducir devoluciones en Miami?",
    paragraphs: [
      "Los fabricantes de electrónica, empresas de hardware y marcas de productos físicos en Miami y Fort Lauderdale recurren a videos de desempaque y ensamblaje paso a paso para guiar al comprador en la configuración inicial de su adquisición. Los manuales impresos suelen generar confusión, provocando consultas repetitivas de soporte técnico y reseñas negativas en tiendas digitales. Esteban realiza grabaciones cenitales mediante soportes elevados sobre mesa de trabajo, iluminación difusa de estudio y micrófonos direccionales de alta sensibilidad. La filmación cubre toda la experiencia de apertura: retirada de precintos, inventario de accesorios incluidos, encaje de piezas y encendido inicial. El audio capta los sonidos de materiales y encajes mecánicos, logrando una demostración atractiva y fácil de seguir que tranquiliza al usuario. Para postproducción de marcas afines, examine [edición de video marca blanca para agencias](/es/servicios/edicion-de-video-marca-blanca-para-agencias); para evaluar planes, consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué características técnicas aseguran que una demostración sea clara y fácil de replicar?",
    paragraphs: [
      "Un video instructivo eficaz requiere un ritmo didáctico estructurado y encuadres limpios para que cualquier usuario pueda seguir las instrucciones sin esfuerzo. Esteban analiza junto a los equipos de desarrollo las dudas habituales de montaje antes de encender la cámara. Los entregables comprenden un tutorial horizontal de tres minutos organizado en pasos numerados, con flechas sutiles sobre puertos de conexión y textos breves que previenen errores comunes de instalación. En postproducción se entregan también cápsulas verticales de treinta segundos pensadas para enlaces mediante códigos QR impresos en la caja o respuestas del servicio de atención al cliente. La mezcla de audio garantiza que las explicaciones sonoras se escuchen con absoluta nitidez. Estas piezas audiovisuales reducen la carga de soporte técnico y mejoran la satisfacción del cliente. Para ver trabajos comerciales publicados, examine el [video comercial de Bar Door Monkey](/es/portafolio/bar-door-monkey); para organizar una sesión, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const UGC_AD_VARIATION_ES_DISCLOSURE = "¿Cómo se editan variaciones de anuncios UGC para Meta y TikTok?";
export const UGC_AD_VARIATION_ES_DESTINATIONS = "Ganchos iniciales de impacto, demostraciones modulares, subtítulos en áreas seguras y escalado de campañas pagadas.";

export const UGC_AD_VARIATION_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Por qué las agencias de marketing prueban variaciones de ganchos en anuncios UGC en Miami?",
    paragraphs: [
      "Las agencias de paid media y marcas de comercio electrónico en Miami y Fort Lauderdale saben que los primeros tres segundos de un video vertical determinan si un usuario permanece atento o desliza el feed. Probar distintas variaciones de ganchos visuales y sonoros sobre una oferta central es el método más eficaz para reducir el costo de adquisición de clientes en Meta Ads y TikTok. Esteban ofrece edición sistemática de variaciones creativas a partir del material grabado por creadores y usuarios que entrega la agencia. El proceso combina aperturas con interrupciones de patrón —como textos llamativos, gestos directos a cámara o reacciones en pantalla dividida— con demostraciones modulares del producto y llamadas a la acción al cierre. Esta metodología permite encontrar combinaciones ganadoras de forma ágil sin necesidad de organizar nuevos rodajes completos. Para servicios afines de redes, consulte [editor de anuncios de TikTok en Miami](/es/servicios/editor-de-anuncios-de-tiktok-miami); para conocer opciones, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Cómo organiza un editor el flujo de trabajo para entregar múltiples iteraciones de video UGC?",
    paragraphs: [
      "Los directores de medios pagados necesitan un sistema de postproducción ordenado que entregue lotes de anuncios listos para campañas de testeo sin retrasos en las revisiones. Esteban establece un entorno en la nube donde la agencia deposita el material de creadores, audios limpios y manuales de marca. En el montaje se seleccionan los momentos más convincentes, se elimina cualquier pausa y se insertan subtítulos en zonas seguras de la interfaz móvil. Un lote habitual genera diez ganchos iniciales de tres segundos montados sobre dos desarrollos de producto y dos cierres de compra, produciendo múltiples combinaciones a partir de un único rodaje. Cada video se entrega en proporción vertical 9:16, con niveles sonoros normalizados para evitar penalizaciones en plataformas de pauta. Este sistema permite a las marcas combatir el desgaste publicitario y mantener la rentabilidad del gasto digital. Para ver muestras de ritmo audiovisual, examine la [película Diana y Jack](/es/portafolio/diana-jack); para cotizar un plan mensual, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const CATERING_COMPANY_ES_DISCLOSURE = "¿Cómo se graba un video para empresas de catering en Miami?";
export const CATERING_COMPANY_ES_DESTINATIONS = "Emplatados en vivo, estaciones de trinchado, servicio de sala y videos para licitaciones corporativas.";

export const CATERING_COMPANY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayuda el video gastronómico a las empresas de catering a ganar contratos en Miami?",
    paragraphs: [
      "Las empresas de catering de alta gama, chefs privados y equipos de banquetes en Miami, Fort Lauderdale y Palm Beach utilizan producciones audiovisuales de alta definición para cerrar contratos corporativos de gran presupuesto y banquetes de bodas exclusivas. Los coordinadores de eventos y juntas empresariales que contratan servicios de miles de dólares exigen constancia visual del arte culinario, la puntualidad del servicio y la elegancia del personal de sala. Esteban filma durante celebraciones y eventos en directo con cámaras de cine ligeras, ópticas luminosas e iluminación cuidada que resalta canapés pasados, estaciones de sellado a fuego vivo y buffets sin entorpecer el trabajo de cocina ni el disfrute de los invitados. Las secuencias ilustran la coordinación entre el chef ejecutivo y la brigada de sala bajo la presión del servicio en directo. Para opciones de restaurantes, revise [videógrafo para restaurantes de alta cocina en Miami](/es/videografo-para-restaurantes-de-alta-cocina-miami); para ver precios, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué entregables audiovisuales ayudan a los servicios de catering a mostrar su categoría?",
    paragraphs: [
      "Los directores comerciales de catering y colectivos de chefs privados precisan piezas promocionales pensadas para agencias de eventos, directorios de bodas y redes sociales. Esteban planifica los momentos esenciales del servicio: desde el acabado minucioso de bocados en carpas de montaje hasta el trinchado en sala y los brindis con champaña. El paquete comprende una película promocional de noventa segundos que comunica la categoría del menú y la elegancia de la puesta en escena, acompañada de avances verticales de quince segundos para Instagram Reels y portales de proveedores de lujo. El sonido capta la actividad de la cocina y el ambiente agradable de los comensales sin equipos invasivos. Estas piezas acreditan solvencia técnica y distinción culinaria ante comités de galas benéficas y bodas de destino. Para revisar proyectos en video de hospitalidad, vea el [video comercial de Bar Door Monkey](/es/portafolio/bar-door-monkey); para filmar su servicio de banquetes, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const BREWERY_CRAFT_DISTILLERY_ES_DISCLOSURE = "¿Cómo se graba un video para cervecerías artesanales en Miami?";
export const BREWERY_CRAFT_DISTILLERY_ES_DESTINATIONS = "Tanques de fermentación, líneas de enlatado, proceso del grano a la copa y videos para visitas al taproom.";

export const BREWERY_CRAFT_DISTILLERY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa el video entre bastidores las visitas a taprooms de cervecerías en Miami?",
    paragraphs: [
      "Las cervecerías artesanales independientes, microdestilerías y taprooms en Wynwood, Oakland Park y Doral utilizan el video documental para generar lealtad de marca, ampliar su presencia en comercios y llenar sus salas de degustación los fines de semana. Los amantes de la cerveza artesanal valoran la procedencia de cada elaboración: desde la molienda del grano y el lupulado en tanques de acero inoxidable hasta el añejamiento en barricas y el enlatado automatizado. Esteban filma en salas de cocción y bodegas de barricas con cámaras compactas, ópticas amplias e iluminación LED que penetra la humedad y el vapor de la fábrica. Tomas de seguimiento recorren depósitos brillantes, remolinos de mosto, el sellado de latas y el ambiente distendido de las mesas comunales del taproom. Estos procesos comunican la maestría del maestro cervecero con mayor impacto que una fotografía estática. Para coctelería afín, consulte [videógrafo de coctelería para bares en Miami](/es/videografo-de-cocteleria-para-bares-miami); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué material audiovisual apoya el lanzamiento de latas y visitas guiadas a la fábrica?",
    paragraphs: [
      "Los propietarios y encargados de marketing cervecero necesitan contenidos periódicos para anunciar lotes de edición limitada, novedades de barril y festivales de fin de semana. Esteban coordina las grabaciones durante días activos de cocción y empaquetado sin entorpecer la seguridad de la planta. Los entregables comprenden un video de marca de sesenta segundos sobre la filosofía del maestro cervecero, junto con piezas verticales optimizadas para Instagram Reels, TikTok y redes especializadas como Untappd. El montaje sincroniza cortes al ritmo de sonidos industriales de válvulas de presión, choques de botellines y el servicio de cerveza espumosa en copa. Estas piezas permiten destacar en estanterías de supermercados y atraer visitas a las instalaciones. Para conocer nuestra experiencia en producciones comerciales de bebidas, explore el [video de Bar Door Monkey](/es/portafolio/bar-door-monkey); para organizar una sesión en su fábrica, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const YACHT_PARTY_ES_DISCLOSURE = "¿Cómo se graba una fiesta en yate o despedida en Miami?";
export const YACHT_PARTY_ES_DESTINATIONS = "Paseos hacia Haulover, baile en popa, atardeceres en la bahía y trailers musicales de recuerdo.";

export const YACHT_PARTY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo capta la videografía en yate las fiestas y celebraciones privadas en Miami?",
    paragraphs: [
      "Los cumpleaños señalados, despedidas de soltera y fiestas privadas en barco que parten del Miami River, Coconut Grove y Haulover Inlet requieren videografía dinámica para conservar recuerdos irrepetibles sobre el agua. Disfrutar a bordo de un chárter de día combina risas espontáneas, música en la cubierta de popa con el horizonte de Biscayne Bay de fondo y baños en bancos de arena soleados. Esteban ofrece filmación náutica discreta con un único operador empleando cámaras resistentes al salitre, estabilización de tres ejes y filtros polarizadores que realzan el azul turquesa del Atlántico y el cielo despejado. Desplazándose con agilidad entre soláriums de proa, salones del puente alto y plataformas de baño, la cámara documenta la complicidad del grupo sin restar espacio al evento. Para celebraciones de boda afines, explore [videógrafo para cena de ensayo en Miami](/es/videografo-para-cena-de-ensayo-miami); para ver tarifas, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué entregables reciben los organizadores para revivir la fiesta en el barco?",
    paragraphs: [
      "Los clientes de chárter y coordinadores de eventos privados desean videos de entrega ágil que reflejen la emoción del día para compartir en redes sociales. Esteban planifica junto al responsable del grupo los momentos principales de la travesía: desde los brindis iniciales al zarpar y la navegación frente a la silueta de Downtown Miami hasta los bailes durante la puesta de sol. Se entrega una película horizontal de dos minutos musicalizada con temas licenciados de tendencia, acompañada de avances verticales de sesenta segundos optimizados para Instagram Reels y TikTok. La grabación de audio aísla los brindis y risas del rumor del motor y el viento marino mediante paravientos profesionales. Estas piezas permiten rememorar la fiesta con calidad cinematográfica. Para revisar muestras de celebraciones publicadas, vea la [película de evento Diana y Jack](/es/portafolio/diana-jack); para reservar fecha para su fiesta en barco, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const SPORTFISHING_ES_DISCLOSURE = "¿Cómo se graba un torneo de pesca deportiva en South Florida?";
export const SPORTFISHING_ES_DESTINATIONS = "Navegación a alta velocidad, picadas en popa, suelta de peces de pico y videos para patrocinadores.";

export const SPORTFISHING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo documenta la videografía de pesca deportiva los torneos en South Florida?",
    paragraphs: [
      "Los equipos de torneos marinos, propietarios de embarcaciones de pesca deportiva y capitanes de chárter en Miami Beach, Palm Beach y los Cayos de Florida recurren a cinematografía de alta velocidad para registrar combates con peces de pico, la potencia de sus cascos en mar abierto y entregas de trofeos. La captura de especies pelágicas —como pez vela, marlín azul o atún— exige equipamiento preparado para la navegación rápida en alta mar, salitre y maniobras bruscas en la bañera de popa. Esteban filma jornadas en alta mar con cámaras selladas, protecciones contra agua salada y grabación en 4K a 60 y 120 cuadros por segundo. Registrar carreras de lanchas entre olas, picadas en superficie, el trabajo en la silla de combate y la suelta segura en el espejo de popa requiere destreza náutica y reflejos rápidos. Para venta de embarcaciones, revise [video para venta de barcos en Fort Lauderdale](/es/video-para-venta-de-barcos-fort-lauderdale); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas en video facilitan a capitanes y equipos conseguir patrocinios náuticos?",
    paragraphs: [
      "Los pescadores de competición y operadores de chárter precisan material audiovisual de calidad profesional para mostrar el rendimiento de la embarcación, fiabilidad del aparejo y victorias en torneos. Esteban coordina con el capitán las mejores horas de luz y mareas favorables. Los entregables comprenden un resumen cinematográfico de tres minutos con audio sincronizado de motores y maniobras de cubierta, junto con avances verticales pensados para YouTube Shorts, Instagram Reels y canales de marcas patrocinadoras. En postproducción se potencia el azul cobalto de la corriente del golfo y se añaden gráficos con pesos, horarios de captura y clasificaciones. Estas producciones permiten a capitanes justificar tarifas premium y a tripulaciones atraer patrocinios de marcas marítimas de prestigio. Para ver proyectos náuticos, consulte [marketing de video para superyates en Fort Lauderdale](/es/marketing-de-video-para-superyates-fort-lauderdale); para reservar cobertura en torneo, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const HAIR_RESTORATION_ES_DISCLOSURE = "¿Cómo se filma una clínica de restauración capilar en Miami?";
export const HAIR_RESTORATION_ES_DESTINATIONS = "Diseño de línea frontal, consultas médicas, consentimiento informado y seguimiento del crecimiento folicular.";

export const HAIR_RESTORATION_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo transmite confianza el video clínico de restauración capilar en Miami?",
    paragraphs: [
      "Los cirujanos de trasplante capilar, especialistas médicos y centros de micropigmentación en Miami y Doral emplean producciones audiovisuales educativas para explicar procedimientos y evidenciar transformaciones reales ante pacientes de todo el país. La restauración capilar representa una decisión personal valorada durante meses, donde la claridad médica y la confianza resultan esenciales para concertar una primera visita presencial. Esteban colabora con equipos clínicos aplicando estrictos protocolos de consentimiento y privacidad, utilizando ópticas macro, iluminación difusa suave y cámaras estabilizadas para documentar el diseño de líneas frontales, consultas diagnósticas y fases de recuperación con rigor científico. Tomas macro enseñan la manipulación folicular y la densidad en el cuero cabelludo sin enfoques sensacionalistas. Estas piezas formativas resuelven temores y mejoran las reservas de valoración. Para servicios dentales afines, consulte [video para clínicas dentales en South Florida](/es/servicios/marketing-de-video-dental-south-florida); para opciones, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué contenidos audiovisuales ayudan a las clínicas a informar a nuevos pacientes?",
    paragraphs: [
      "Los directores de centros estéticos y coordinadores de comunicación médica requieren piezas que respeten el entorno sanitario y la comodidad del paciente. Esteban define pautas de rodaje que aseguran áreas estériles y tranquilidad durante la consulta. Los entregables incluyen un video de presentación de noventa segundos sobre el criterio profesional del cirujano, acompañado de avances verticales que documentan evoluciones a los seis y doce meses con autorización expresa de pacientes participantes. Micrófonos direccionales aseguran que las explicaciones médicas se transmitan con calidez, cercanía y perfecta inteligibilidad. Estos recursos permiten a las clínicas de South Florida captar pacientes de otros estados que buscan experiencia médica especializada y consolidar su prestigio en internet. Para revisar nuestra experiencia en testimonios clínicos, examine el [caso de estudio de Healthy Smile Miami](/es/portafolio/healthy-smile); para programar una filmación, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const CHIROPRACTIC_VIDEO_ES_DISCLOSURE = "¿Cómo se graba un video para clínicas de quiropráctica en Miami?";
export const CHIROPRACTIC_VIDEO_ES_DESTINATIONS = "Acústica de ajustes espinales, pruebas de movilidad, ejercicios de rehabilitación y videos educativos para redes.";

export const CHIROPRACTIC_VIDEO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo atrae pacientes el video de quiropráctica y rehabilitación física en Miami?",
    paragraphs: [
      "Los quiroprácticos deportivos, fisioterapeutas y clínicas de rehabilitación activa en Kendall, Doral y Miami utilizan contenidos en video formativos para mostrar técnicas de ajuste, explicar el alivio del dolor musculoesquelético y conectar con personas activas en redes sociales. Muchos pacientes potenciales dudan en solicitar su primera cita por desconocimiento de las maniobras terapéuticas. Esteban produce piezas clínicas dinámicas empleando cámaras estabilizadas, ópticas de ángulo amplio que captan el movimiento corporal en ejercicios biomecánicos y micrófonos de alta fidelidad que registran con claridad el sonido articular de ajustes manuales. Las grabaciones documentan valoraciones posturales, ejercicios funcionales y recuperación de rangos de movimiento con profesionalidad. Estos videos desmitifican la consulta quiropráctica y facilitan la llegada de nuevos pacientes. Para consultas médicas generales, explore [marketing de video para consultorios médicos en Miami](/es/marketing-de-video-para-consultorios-medicos-miami); para tarifas, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos audiovisuales ayudan a las clínicas de fisioterapia a generar confianza?",
    paragraphs: [
      "Los propietarios de consultas quiroprácticas y centros de terapia física precisan metodologías de grabación que no interfieran en los horarios de atención clínica. Esteban planifica las sesiones en franjas específicas utilizando personal del centro o pacientes que han firmado autorizaciones de difusión. El paquete principal comprende una presentación institucional de noventa segundos sobre tratamientos especializados —como descompresión espinal, punción seca o recuperación deportiva— junto con ocho cápsulas verticales de treinta segundos para Instagram y TikTok. En postproducción se insertan gráficos explicativos sobre higiene postural, origen de molestias y estiramientos para el hogar. Este contenido formativo consolida al especialista como referente de salud en su entorno y convierte seguidores en citas confirmadas. Para ver grabaciones previas en centros sanitarios, examine el [video de la clínica Healthy Smile](/es/portafolio/healthy-smile); para agendar una filmación, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const STARTUP_PITCH_ES_DISCLOSURE = "¿Cómo se graba un video de pitch para startups en Miami?";
export const STARTUP_PITCH_ES_DESTINATIONS = "Narrativa de fundadores, capturas de interfaz de software, métricas de tracción y presentaciones para inversores.";

export const STARTUP_PITCH_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayuda un video de pitch cinematográfico a las startups de Miami a levantar capital?",
    paragraphs: [
      "Los fundadores de empresas tecnológicas, startups B2B de software y plataformas digitales en Downtown Miami recurren a videos cinematográficos de pitch para transmitir su visión de negocio, tracción comercial y oportunidad de mercado ante fondos de capital riesgo internacionales. Los analistas de inversión examinan decenas de documentos a la semana; un video conciso de dos minutos comunica la convicción del equipo fundador y la propuesta técnica con mayor fuerza que una presentación estática de diapositivas. Esteban produce videos de nivel corporativo que combinan entrevistas directas al fundador con tomas de trabajo del equipo de desarrollo, sesiones ante pizarra y secuencias dinámicas de la interfaz de la aplicación. La filmación en oficinas o espacios de coworking emplea iluminación suave y micrófonos inalámbricos discretos para garantizar un discurso claro, profesional y seguro. Para videos corporativos afines, consulte [videógrafo corporativo en Miami](/es/videografo-de-eventos-corporativos-miami); para conocer planes, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué estructura narrativa hace eficaz un video de pitch para fondos de inversión?",
    paragraphs: [
      "Los equipos fundadores y aceleradoras de empresas precisan piezas diseñadas para portales de inversión, plataformas como AngelList y presentaciones en Demo Days. Esteban colabora con los fundadores para pulir el guion, simplificando tecnicismos y remarcando la validación del problema, métricas unitarias, velocidad de captación de usuarios y planes de crecimiento. Los entregables comprenden un video maestro de dos minutos acompañado de una síntesis vertical de treinta segundos adaptada para LinkedIn y contactos por correo electrónico con inversores. El tratamiento del color y los gráficos en pantalla otorgan una apariencia consolidada que transmite solidez institucional. Este material permite a las empresas tecnológicas de Florida competir con proyectos de otros centros de innovación y acelerar el cierre de sus rondas de financiación. Para ver entrevistas corporativas publicadas, examine el [documental Homeowners](/es/portafolio/homeowners); para coordinar un rodaje, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const EXECUTIVE_VIDEO_BIO_ES_DISCLOSURE = "¿Cómo se graba una biografía ejecutiva en video en Miami?";
export const EXECUTIVE_VIDEO_BIO_ES_DESTINATIONS = "Iluminación en despachos ejecutivos, entrevistas conversacionales, perfiles corporativos y liderazgo en LinkedIn.";

export const EXECUTIVE_VIDEO_BIO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo potencia la biografía ejecutiva en video la reputación de líderes empresariales en Miami?",
    paragraphs: [
      "Los directores generales, socios de firmas legales, asesores de patrimonio y miembros de consejos de administración en Miami, Fort Lauderdale y Coral Gables utilizan biografías ejecutivas en video para humanizar su perfil, comunicar valores corporativos y generar cercanía con clientes e inversores clave. Quienes toman decisiones buscan evaluar la templanza, claridad expositiva y visión estratégica de un líder antes de iniciar relaciones mercantiles de envergadura. Esteban produce perfiles ejecutivos en las propias sedes o salas de juntas utilizando cámaras silenciosas, iluminación difusa favorecedora y micrófonos inalámbricos de precisión. Una dirección de entrevista cuidada permite reflexionar con naturalidad sobre trayectoria profesional, casos de éxito y compromiso con los clientes sin rigidez ni apariencia forzada. Estas piezas posicionan a los directivos como referentes accesibles y solventes en sus páginas web corporativas. Para producciones afines, consulte [producción de video para firmas de abogados en Miami](/es/servicios/produccion-de-video-para-bufetes-de-abogados-miami); para opciones, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales respaldan la marca personal y la comunicación institucional?",
    paragraphs: [
      "Los directores de comunicación corporativa y responsables de marketing precisan contenidos diseñados para apartados institucionales de liderazgo, memorias anuales y perfiles en LinkedIn. Esteban coordina las jornadas con el equipo de comunicación para ajustarse a las normas de marca y respetar la agenda de los directivos. La entrega incluye una pieza biográfica de sesenta segundos respaldada por tres cápsulas verticales de treinta segundos sobre reflexiones estratégicas del sector para redes profesionales. En el montaje se aplica corrección cromática sutil, títulos corporativos limpios y subtítulos que aseguran la comprensión del mensaje en reproducciones sin audio en dispositivos móviles. Estos recursos refuerzan la notoriedad de la firma, apoyan la captación de talento y consolidan la reputación de sus líderes. Para revisar producciones documentales publicadas, examine el [documental Homeowners](/es/portafolio/homeowners); para agendar una sesión ejecutiva, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const MED_SPA_PLASTIC_SURGEON_ES_DISCLOSURE = "¿Cómo se graba un video para spas médicos y cirujanos plásticos en Miami?";
export const MED_SPA_PLASTIC_SURGEON_ES_DESTINATIONS = "Demostraciones de inyectables estéticos, protocolos de consentimiento, transformaciones reales y captación de consultas.";

export const MED_SPA_PLASTIC_SURGEON_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo atrae pacientes el video marketing clínico para cirujanos plásticos en Miami?",
    paragraphs: [
      "Los cirujanos plásticos certificados, directores de spas médicos y especialistas en estética de Coral Gables y Miami utilizan producciones en video de enfoque clínico y educativo para explicar procedimientos y mostrar resultados auténticos ante pacientes de todo el país. Los tratamientos estéticos como inyectables, rellenos dérmicos y contorno corporal implican decisiones meditadas durante meses donde la transparencia profesional resulta decisiva para concretar citas presenciales. Esteban colabora con clínicas estéticas bajo estrictos protocolos de consentimiento y privacidad médica, utilizando ópticas macro, iluminación difusa suave y cámaras estabilizadas para documentar consultas, higiene clínica y precisión técnica con respeto. Estas piezas audiovisuales formativas resuelven dudas iniciales y elevan la confianza de los pacientes. Para servicios odontológicos, consulte [video para clínicas dentales en South Florida](/es/servicios/marketing-de-video-dental-south-florida); para opciones, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales ayudan a los centros estéticos a convertir seguidores en citas?",
    paragraphs: [
      "Los coordinadores de marketing y propietarios de spas médicos necesitan jornadas de filmación estructuradas que alimenten sus canales digitales sin interrumpir las consultas diarias. Esteban coordina días mensuales de contenido donde se documentan explicaciones médicas del especialista, demostraciones guiadas y testimonios de pacientes con autorizaciones formales de imagen. Los entregables comprenden un video institucional de presentación de noventa segundos y entre ocho y doce cápsulas verticales adaptadas para Instagram Reels y TikTok. La edición incorpora títulos sobrios y subtítulos nítidos que garantizan una comunicación clara en reproducciones sin sonido. Estos recursos posicionan a la clínica como referente de excelencia estética en el sur de la Florida. Para examinar testimonios clínicos publicados, explore el [caso de estudio de Healthy Smile Miami](/es/portafolio/healthy-smile); para programar una filmación, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const CONTRACTOR_VIDEO_MARKETING_ES_DISCLOSURE = "¿Cómo se produce video marketing para contratistas de techos y climatización en Florida?";
export const CONTRACTOR_VIDEO_MARKETING_ES_DESTINATIONS = "Obras de tejados, instalación de paneles solares, mantenimiento de aire acondicionado y testimonios tras tormentas.";

export const CONTRACTOR_VIDEO_MARKETING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayuda el video sobre el terreno a los contratistas de Florida a cerrar contratos de alto valor?",
    paragraphs: [
      "Los contratistas de techos, especialistas en climatización comercial y empresas de energía solar en Florida emplean videos documentales en obra para demostrar solvencia técnica, licencias vigentes y calidad de ejecución ante propietarios particulares y administradores de fincas. Las sustituciones de tejados y las instalaciones fotovoltaicas representan inversiones considerables donde los clientes exigen evidencias reales antes de aprobar presupuestos. Esteban produce videos dinámicos a pie de obra utilizando cámaras estabilizadas, tomas elevadas con mástil y equipos sellados para registrar sustituciones de tejas, impermeabilizaciones, elevación de compresores y montaje de paneles solares. Resaltar las normas de seguridad laboral, certificaciones de fábrica y limpieza final del inmueble genera una sólida confianza comercial. Para ver producciones inmobiliarias comerciales, consulte [video para bienes raíces comerciales en Miami](/es/video-para-bienes-raices-comerciales-miami); para tarifas, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos audiovisuales generan solicitudes cualificadas de reparación y reemplazo?",
    paragraphs: [
      "Los dueños de empresas de reformas y coordinadores comerciales precisan material audiovisual optimizado para campañas de búsqueda local, redes sociales y presupuestos comerciales. Esteban filma el trabajo del equipo técnico, valoraciones directas de daños causados por temporales y testimonios espontáneos de clientes satisfechos tras finalizar la instalación. Los entregables incluyen un video corporativo de dos minutos para la página web, cápsulas verticales de antes y después pensadas para Meta Ads y videos explicativos sobre ahorro energético o garantías estructurales. Rótulos informativos destacan opciones de financiación y certificaciones oficiales para acelerar la toma de decisiones. Para conocer ejemplos comerciales previos, examine el [anuncio de Bar Door Monkey](/es/portafolio/bar-door-monkey); para planificar una sesión audiovisual de obra, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const QUINCEANERA_VIDEOGRAPHER_ES_DISCLOSURE = "¿Cómo se filma una quinceañera cinematográfica en Miami?";
export const QUINCEANERA_VIDEOGRAPHER_ES_DESTINATIONS = "Coreografía del vals, ceremonia religiosa con multicámara, corte de honor y recepción festiva familiar.";

export const QUINCEANERA_VIDEOGRAPHER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo preserva el video cinematográfico la tradición y la emoción de una fiesta de quinceañera en Miami?",
    paragraphs: [
      "Las familias que celebran los quince años de su hija en Miami, Coral Gables y Doral buscan una cobertura cinematográfica completa que honre las tradiciones culturales, las bendiciones religiosas y los momentos compartidos entre generaciones. La fiesta de quinceañera representa una celebración familiar trascendente preparada durante meses con enorme dedicación. Esteban ofrece cobertura integral de la jornada utilizando esquemas multicámara, ópticas de cine luminosas y estabilización sutil para documentar los preparativos matutinos, la misa o bendición eclesiástica, el posado formal con la corte de honor y la gran fiesta en el salón. La sincronización de múltiples cámaras permite registrar el vals con el padre, el baile sorpresa y el emotivo cambio de zapatillas desde distintos ángulos sin entorpecer el desarrollo del evento. Para enlaces nupciales afines, explore [videógrafo de bodas en Miami](/es/videografo-de-bodas-miami); para conocer opciones, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué películas de recuerdo y videos para redes sociales reciben las familias tras el festejo?",
    paragraphs: [
      "Los padres y las quinceañeras desean conservar una película entrañable para revivir el evento a lo largo de los años junto con avances dinámicos en formato vertical para compartir al instante con amistades y parientes en WhatsApp e Instagram. La entrega comprende un documental completo con los discursos y la coreografía íntegra de la corte de honor, acompañado por un tráiler cinematográfico de tres a cuatro minutos editado con música licenciada. Asimismo, se entregan clips verticales que destacan la entrada triunfal, el brindis familiar y la hora loca con diseño sonoro cuidado. El etalonaje resalta el colorido de los vestidos y la iluminación del salón manteniendo tonos de piel naturales. Para apreciar nuestra experiencia en eventos familiares, vea la [película de boda de Diana y Jack](/es/portafolio/diana-jack); para reservar una fecha, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const MULTICAM_PODCAST_VIDEO_ES_DISCLOSURE = "¿Cómo se produce un podcast en video con multicámara en Miami?";
export const MULTICAM_PODCAST_VIDEO_ES_DESTINATIONS = "Grabación multicámara sincronizada, micrófonos de estudio, edición vertical de clips y distribución en YouTube.";

export const MULTICAM_PODCAST_VIDEO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa la producción de video multicámara el alcance de un podcast en Miami?",
    paragraphs: [
      "Los presentadores de podcasts empresariales, entrevistadores corporativos y creadores de contenido en Miami y Fort Lauderdale recurren a la producción audiovisual multicámara para elevar el prestigio de su espacio, atraer invitados de relevancia y multiplicar su impacto en YouTube, Spotify y redes sociales. El video constituye el canal primordial de crecimiento para los programas de entrevistas actuales, donde la audiencia exige dinamismo visual, iluminación equilibrada y sonido impecable. Esteban dirige sesiones de grabación en estudio empleando cámaras de cine 4K sincronizadas, iluminación de tres puntos y micrófonos dinámicos conectados a interfaces digitales profesionales. Los encuadres independientes de anfitrión e invitado facilitan un montaje ágil que acompaña el compás natural de la conversación y las reacciones espontáneas. Para servicios de edición especializada, consulte [edición de video podcast en Miami](/es/edicion-de-video-podcast-miami); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué entregables recurrentes permiten publicar episodios y clips semanales con constancia?",
    paragraphs: [
      "Los productores y directores de programas precisan rutinas mensuales de rodaje que suministren episodios íntegros y cápsulas cortas de gran gancho sin sufrir retrasos en el calendario. Esteban organiza jornadas de grabación en las que se registran de dos a cuatro episodios en una sola sesión de trabajo. Los entregables comprenden el montaje completo en formato horizontal con rótulos de invitados, carátulas y limpieza de ruido acústico, acompañado de seis a ocho extractos verticales por episodio optimizados para TikTok, YouTube Shorts e Instagram Reels con subtítulos dinámicos y portadas atractivas. Esta estructura permite alimentar las plataformas digitales de forma ininterrumpida y captar nueva audiencia semanalmente. Para ver servicios de recorte de clips, examine [edición de clips de podcast en Miami](/es/edicion-de-clips-de-podcast-miami); para coordinar una grabación, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const PERSONAL_INJURY_LAWYER_ES_DISCLOSURE = "¿Cómo se producen videos para abogados de lesiones personales en Miami?";
export const PERSONAL_INJURY_LAWYER_ES_DESTINATIONS = "Perfiles de litigantes, testimonios de recuperación de clientes, preparación judicial y cumplimiento del Florida Bar.";

export const PERSONAL_INJURY_LAWYER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo genera confianza el video testimonial e institucional para bufetes de lesiones personales en Miami?",
    paragraphs: [
      "Los abogados litigantes, bufetes especializados en lesiones personales y firmas de responsabilidad civil en Miami y el sur de la Florida recurren a piezas audiovisuales sobrias para transmitir su trayectoria en sala, solvencia técnica y trato cercano hacia las familias afectadas. Quienes sufren percances graves atraviesan circunstancias de gran vulnerabilidad emocional y buscan una representación legal rigurosa y empática antes de confiar su reclamación. Esteban produce perfiles institucionales de letrados e historias de recuperación de clientes en estricto cumplimiento con la normativa publicitaria del Florida Bar y el secreto profesional. Las grabaciones en despachos, salas de juntas y espacios de simulación judicial emplean iluminación suave y micrófonos discretos para proyectar solidez, rigor procesal y defensa del cliente. Para producciones jurídicas afines, consulte [producción de video para bufetes de abogados en Miami](/es/servicios/produccion-de-video-para-bufetes-de-abogados-miami); para opciones, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos en video reflejan la solvencia jurídica y el respaldo a los afectados?",
    paragraphs: [
      "Los socios directores y gerentes de marketing jurídico necesitan contenidos que proyecten prestigio institucional y generen contactos de casos relevantes a través de páginas web y redes de derivación profesional. Esteban realiza entrevistas cuidadas con los letrados para abordar litigios por accidentes, negligencias y daños graves con serenidad, evitando promesas sensacionalistas o afirmaciones infundadas. Los entregables comprenden un documental corporativo de dos minutos para la portada web, cápsulas explicativas por área de práctica y testimonios comedidos de antiguos representados que valoran la claridad informativa y el acompañamiento recibido. Un tratamiento de color equilibrado y un diseño sonoro impecable confieren a las piezas una presencia incuestionable. Para ver entrevistas corporativas publicadas, examine el [documental Homeowners](/es/portafolio/homeowners); para planificar una sesión audiovisual jurídica, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const PRIVATE_SCHOOL_ADMISSIONS_ES_DISCLOSURE = "¿Cómo se filma un video de admisiones para colegios privados en Miami?";
export const PRIVATE_SCHOOL_ADMISSIONS_ES_DESTINATIONS = "Perspectivas del campus, dinámicas de clase, laboratorios STEM y testimonios de familias y docentes.";

export const PRIVATE_SCHOOL_ADMISSIONS_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa el video de admisiones las matriculaciones en colegios privados de Miami?",
    paragraphs: [
      "Los colegios privados independientes, academias preparatorias y centros educativos bilingües en Miami, Coral Gables y Coconut Grove utilizan videos de admisiones para reflejar su rigor formativo, valores comunitarios y vida escolar ante familias interesadas. La elección del centro educativo supone un compromiso personal y financiero decisivo, donde los padres necesitan conocer de cerca la cercanía del claustro docente, la metodología de aprendizaje y las instalaciones antes de acudir a las jornadas de puertas abiertas. Esteban colabora con los equipos de admisiones aplicando estrictos protocolos de autorización de imagen de menores, empleando cámaras estabilizadas, tomas de ángulo amplio con mástil e iluminación natural para registrar aulas activas, talleres de robótica, artes escénicas y actividades deportivas con autenticidad. Para producciones afines, consulte [videógrafo de eventos corporativos en Miami](/es/videografo-de-eventos-corporativos-miami); para tarifas, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué recursos audiovisuales respaldan las campañas de captación de alumnos y donaciones?",
    paragraphs: [
      "Los directores escolares, responsables de admisiones y comités de desarrollo precisan contenidos polivalentes diseñados para portales de matriculación, visitas virtuales y actos benéficos. Esteban programa los rodajes integrándose en la rutina escolar sin interrumpir la docencia, captando la participación activa de los alumnos y la dedicación del profesorado. Los entregables incluyen un video maestro de admisiones de tres minutos, breves piezas temáticas dedicadas a ciencias y humanidades, y entrevistas con padres y antiguos alumnos que relatan la formación integral recibida. En montaje se incorporan gráficos limpios respetuosos con la identidad institucional y una paleta de color cálida que transmite serenidad y prestigio académico. Para apreciar ejemplos documentales, explore el [documental Homeowners](/es/portafolio/homeowners); para coordinar un rodaje en su centro, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const EXOTIC_CAR_RENTAL_ES_DISCLOSURE = "¿Cómo se produce video marketing para flotas de autos exóticos en Miami?";
export const EXOTIC_CAR_RENTAL_ES_DESTINATIONS = "Planos detalle de superdeportivos, sonido de escape deportivo, recorridos en Miami Beach y reservas online.";

export const EXOTIC_CAR_RENTAL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo atrae clientes de alto poder adquisitivo el video para alquiler de autos exóticos en Miami?",
    paragraphs: [
      "Las agencias de alquiler de vehículos exóticos, servicios de conserjería de lujo y empresas de superdeportivos en Miami y Miami Beach dependen de contenidos audiovisuales de estética publicitaria para lucir sus vehículos de gama alta y captar reservas directas. El sur de la Florida representa uno de los mercados de vehículos de alta gama más dinámicos del mundo, donde los usuarios eligen un automóvil guiados por su impacto estético, impecable estado y exclusividad. Esteban filma superdeportivos utilizando estabilizadores de suelo, filtros polarizadores que suprimen reflejos molestos en lunas y carrocerías, y micrófonos de alta fidelidad que registran con contundencia la acústica de los motores V8 y V12. Las tomas muestran acabados interiores de fibra de carbono y cuero, y recorridos por enclaves emblemáticos como Ocean Drive. Para producciones de lujo afines, consulte [video para relojes de lujo en Miami](/es/video-para-relojes-de-lujo-miami); para ver opciones, examine [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos verticales convierten a los aficionados al motor en reservas confirmadas?",
    paragraphs: [
      "Los propietarios de flotas y gestores de redes sociales precisan un flujo continuo de videos en formato vertical para atraer a viajeros de negocios, vacacionistas de lujo y producciones musicales que demandan autos de prestigio. Esteban planifica sesiones de rodaje eficientes donde se registra material de varios vehículos en una misma jornada por diversas localizaciones de Miami. La entrega comprende clips verticales de quince a treinta segundos con transiciones ágiles y sonido sincronizado para Instagram y TikTok, junto con presentaciones horizontales detalladas para los catálogos web. Rótulos sobrios informan sobre potencia, condiciones de fianza y facilidades de entrega para incentivar consultas directas por teléfono o mensajería. Para ver trabajos comerciales publicados, examine el [anuncio de Bar Door Monkey](/es/portafolio/bar-door-monkey); para planificar una sesión de flota, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const CAR_DEALERSHIP_VIDEO_ES_DISCLOSURE = "¿Cómo se produce video marketing para concesionarios de automóviles en South Florida?";
export const CAR_DEALERSHIP_VIDEO_ES_DESTINATIONS = "Presentación de vehículos en inventario, departamento de taller, entregas a clientes y videos para concesionarios.";

export const CAR_DEALERSHIP_VIDEO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo agiliza la venta de vehículos el video mensual para concesionarios en South Florida?",
    paragraphs: [
      "Los concesionarios de marcas oficiales, compraventas de vehículos seminuevos de alta gama y centros de vehículos comerciales en South Florida emplean producciones audiovisuales periódicas para otorgar visibilidad a su flota y acortar el tiempo de estancia de los vehículos en campa. Los compradores comparan opciones por internet antes de acudir a la exposición física, valorando especialmente las empresas que ofrecen videos detallados del estado real del coche y presentan a su equipo de ventas y posventa. Esteban colabora con concesionarios automotrices —apoyándose en la experiencia demostrada con clientes del sector como Frontline Auto— para producir revisiones de producto, celebraciones de entrega a clientes y recorridos por las instalaciones. Tomas estabilizadas y de gran nitidez muestran carrocerías, equipamiento tecnológico interior y comportamiento dinámico en carretera. Para revisar nuestro trabajo automotriz, examine el [caso de estudio de Frontline Auto](/es/portafolio/frontline); para conocer planes, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué dinámicas de grabación apoyan a los equipos comerciales para cumplir sus objetivos mensuales?",
    paragraphs: [
      "Los directores comerciales y responsables de marketing automotriz requieren una metodología de producción predecible que entregue piezas listas para fichas de producto, perfiles de Google y campañas locales de video. Esteban establece visitas quincenales al concesionario para registrar los vehículos recién incorporados, destacar promociones y filmar consejos prácticos del taller que consolidan la retención de clientes en postventa. Los entregables incluyen videos verticales de treinta segundos adaptados a Meta Ads, recorridos completos en horizontal para YouTube respondiendo a dudas habituales y grabaciones de entregas de llaves que aportan prueba social auténtica. Estas piezas generan un tráfico constante de llamadas y visitas a la sala de ventas. Para explorar otras producciones comerciales, consulte [video para bienes raíces comerciales en Miami](/es/video-para-bienes-raices-comerciales-miami); para programar una filmación, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const BOAT_SHOW_EXHIBITOR_ES_DISCLOSURE = "¿Cómo se produce video para expositores del Boat Show de Fort Lauderdale?";
export const BOAT_SHOW_EXHIBITOR_ES_DESTINATIONS = "Stands de feria náutica, recorridos de embarcaciones en pantalán, demostraciones técnicas y resúmenes diarios.";

export const BOAT_SHOW_EXHIBITOR_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo rentabiliza el video para expositores la inversión en el Salón Náutico de Fort Lauderdale?",
    paragraphs: [
      "Los astilleros, fabricantes de equipamiento náutico, corredurías de yates y firmas marítimas que exponen en el Salón Náutico Internacional de Fort Lauderdale realizan un notable desembolso para exhibir sus embarcaciones ante compradores de todo el mundo. Con más de cien mil asistentes y mil expositores en recintos como Bahia Mar y el Centro de Convenciones de Broward, destacar entre la concurrencia exige piezas audiovisuales dinámicas que capturen la afluencia en el stand, las presentaciones en pantalán y las explicaciones técnicas. Esteban realiza grabaciones de nivel profesional utilizando equipos compactos estabilizados para moverse con soltura por muelles concurridos, filtros polarizadores que controlan el reflejo solar en el agua y microfonía inalámbrica para registrar entrevistas ejecutivas sin interferencias del entorno ferial. Para producciones náuticas afines, consulte [video para venta de barcos en Fort Lauderdale](/es/video-para-venta-de-barcos-fort-lauderdale); para tarifas, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué entregables audiovisuales permiten captar compradores que no pudieron acudir a la feria?",
    paragraphs: [
      "Los directores de comunicación náutica, constructores de barcos y brókeres precisan material ágil durante los días del salón para conectar con clientes cualificados que no pudieron viajar o que desean repasar detalles de las embarcaciones tras su visita. Esteban programa grabaciones durante las jornadas de la feria para cubrir primicias en el agua, cócteles privados y demostraciones de electrónica de navegación y motorizaciones. La entrega incluye un video resumen de tres minutos para el archivo corporativo y seguimiento de clientes, respaldado por avances verticales en la misma semana concebidos para LinkedIn, Instagram y YouTube. Estos contenidos prolongan el valor comercial de la participación ferial mucho más allá de los muelles del evento. Para conocer proyectos en superyates, examine [marketing de video para superyates en Fort Lauderdale](/es/marketing-de-video-para-superyates-fort-lauderdale); para reservar cobertura, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const ART_BASEL_MIAMI_ART_WEEK_ES_DISCLOSURE = "¿Cómo se realiza la cobertura de video para Art Basel y Miami Art Week?";
export const ART_BASEL_MIAMI_ART_WEEK_ES_DESTINATIONS = "Stands en ferias de arte, perfiles de artistas contemporáneos, activaciones de marcas de lujo y eventos en Wynwood.";

export const ART_BASEL_MIAMI_ART_WEEK_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo documenta el video cinematográfico las exposiciones y eventos de Miami Art Week?",
    paragraphs: [
      "Las galerías de arte internacionales, marcas patrocinadoras, firmas de lujo y artistas contemporáneos que se dan cita en Art Basel Miami Beach y en las ferias satélite de Wynwood y Miami Beach precisan una documentación audiovisual esmerada de sus instalaciones y veladas privadas. Miami Art Week constituye un punto de encuentro artístico de repercusión mundial donde piezas efímeras, charlas de creadores y recepciones de coleccionistas requieren una mirada cinematográfica respetuosa con las obras exhibidas. Esteban ofrece una cobertura documental discreta empleando cámaras silenciosas de sensor completo, sensores con calibración cromática fiel para registrar matices en lienzos y esculturas, y objetivos luminosos ideales para espacios expositivos y fiestas nocturnas. Para proyectos visuales afines, explore [video para marcas de moda en Miami](/es/video-para-marcas-de-moda-miami); para conocer opciones, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales ayudan a galerías y patrocinadores a prolongar el impacto de la muestra?",
    paragraphs: [
      "Los comisarios de exposiciones, consultores de arte y agencias de comunicación cultural precisan videos cuidados para documentar el montaje de las obras, dialogar con los artistas y ofrecer a los patrocinadores un balance visual de su presencia. Esteban registra recorridos con coleccionistas, debates de expertos y celebraciones exclusivas con composición rigurosa y sonido nítido. Los entregables comprenden una memoria audiovisual de dos a tres minutos orientada a boletines internacionales para coleccionistas e instituciones culturales, junto con avances verticales dedicados a piezas clave, secuencias aceleradas de instalación y testimonios del artista para Instagram Reels y canales del sector. Este archivo audiovisual respalda la trayectoria de las galerías en el circuito artístico internacional. Para coberturas institucionales, consulte [videógrafo para galas corporativas en Miami](/es/videografo-para-galas-corporativas-miami); para planificar una sesión artística, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

