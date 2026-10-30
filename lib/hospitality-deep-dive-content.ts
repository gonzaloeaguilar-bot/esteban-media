import type { DeepDive } from "@/lib/service-deep-dive-content";
import type { SpanishNicheSection } from "@/lib/spanish-site";
import {
  EXPRESS_MULTIPLIER,
  PACKAGE_PRICES,
  PRICING_BANDS,
  shortFormWeeklyText,
  usd,
  CREW_RECORDING_RATES,
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
      `Para eventos corporativos, conferencias y convenciones en Fort Lauderdale o el Centro de Convenciones del Condado de Broward, la tarifa se estructura en dos partes: el tiempo de rodaje en sitio, desde ${usd(CREW_RECORDING_RATES.solo.hourly)} por hora, y la edición posterior. La banda corporativa de edición de la calculadora se sitúa entre ${usd(PRICING_BANDS["on-location"].baseMin)} y ${usd(PRICING_BANDS["on-location"].baseMax)} por proyecto, representando una tarifa de profesional independiente con descuento de introducción en lugar de una cotización cerrada. Si tu equipo interno ya grabó el evento y solo necesitas postproducción, comparte el metraje para cotizar únicamente el montaje.`,
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
      `La videografía para encuentros de networking, mixers empresariales y reuniones de negocios en Miami se cotiza en función de dos elementos: las horas de rodaje presencial, desde ${usd(CREW_RECORDING_RATES.solo.hourly)} por hora, y la edición del resumen en video. La banda corporativa de edición se sitúa entre ${usd(PRICING_BANDS["on-location"].baseMin)} y ${usd(PRICING_BANDS["on-location"].baseMax)} por proyecto para entregar un aftermovie dinámico con corrección de color y mezcla de audio. Si la empresa cuenta con editores internos y solo requiere la filmación y entrega de archivos brutos, el servicio se limita a las horas de cobertura.`,
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
      `El sonido permanece limpio incluso en entornos concurrido gracias a la microfonía directa. El servicio se puede contratar por horas a ${usd(CREW_RECORDING_RATES.solo.hourly)} la hora o en jornadas completas de grabación, proporcionando semanas de contenido listo para publicar.`,
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
      "Las herramientas de transcripción automática cometen fallos frecuentes con términos técnicos, modismos regionales y nombres propios, generando errores que restan credibilidad a videos corporativos. El subtitulado bilingüe profesional requiere a una persona que comprenda el contexto y la intención de cada frase: Esteban trabaja en español primero, con inglés intermedio, y revisa cada línea en los dos idiomas contra el audio original. Esteban transcribe el diálogo original con precisión, traduce el significado de manera natural y ajusta la sincronización al ritmo de la voz. En videos de capacitación corporativa, entrevistas con clientes y conferencias, una traducción exacta evita malentendidos y garantiza que audiencias internacionales sigan la información sin esfuerzo. Los subtítulos se diseñan con tipografía de alto contraste legible en pantallas móviles. Para recomendaciones de diseño de texto, mira [mejores estilos de subtítulos para Instagram Reels](/es/guias/mejores-estilos-de-subtitulos-para-instagram-reels); para montaje de conversaciones, revisa [edición de entrevistas](/services/interview-video-editing-service).",
    ],
  },
  {
    heading: "¿Cómo se entregan los subtítulos bilingües para diferentes plataformas?",
    paragraphs: [
      "Los subtítulos bilingües se entregan incrustados directamente en el video final o como archivos independientes en formato SRT compatibles con YouTube, LinkedIn y reproductores web. En videos verticales para Reels y TikTok, los textos se sitúan dentro de las zonas seguras de pantalla para evitar que nombres de usuario, descripciones o botones de interacción tapen las líneas de lectura. Se organizan en bloques de dos líneas breves para facilitar una lectura ágil sin pausar la reproducción. Cuando una campaña requiere versiones separadas en inglés y español del mismo metraje, Esteban entrega cortes adaptados para cada idioma con llamadas a la acción acordes a cada público. Para reutilizar conferencias y capacitaciones con subtítulos, mira [servicio para webinars](/services/webinar-clip-editing-service); para opciones de paquetes, mira [precios](/es/precios).",
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

export const PRIVATE_AVIATION_VIDEO_ES_DISCLOSURE = "¿Cómo se produce video para aviación privada y vuelos chárter en Miami?";
export const PRIVATE_AVIATION_VIDEO_ES_DESTINATIONS = "Hangares ejecutivos, cabinas de jets privados, cabinas de mando y piezas de video para reservas chárter.";

export const PRIVATE_AVIATION_VIDEO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo impulsa el video cinematográfico las reservas y venta de jets privados en Miami?",
    paragraphs: [
      "Los operadores de vuelos chárter, empresas de gestión de aeronaves y brókeres de aviación ejecutiva en los aeropuertos de Miami Executive, Miami-Opa Locka y Fort Lauderdale utilizan producciones audiovisuales de alto nivel para exhibir sus flotas y captar pasajeros de negocios. Los viajeros corporativos y familias de alto patrimonio evalúan minuciosamente el espacio de cabina, la ergonomía de los asientos, la capacidad de equipaje y el confort a bordo antes de contratar un vuelo privado. Esteban filma aeronaves en hangares y terminales FBO privadas utilizando cámaras de sensor completo estabilizadas, ópticas angulares que realzan la amplitud interior sin deformaciones y esquemas de iluminación suave que destacan tapicerías de cuero, ebanistería pulida y suites ejecutivas sin reflejos molestos. Tomas de gran nitidez documentan cocinas de a bordo, zonas de descanso y sistemas avanzados de aviónica con rigor técnico. Para producciones afines en transporte de lujo, consulte [video para agencias de carros exóticos en Miami](/es/video-para-agencias-de-carros-exoticos-miami); para conocer tarifas, explore [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué entregables audiovisuales aceleran la contratación de vuelos chárter y corretaje de aviones?",
    paragraphs: [
      "Los directores comerciales de aviación y corredores de aeronaves precisan piezas audiovisuales ágiles adaptadas a plataformas de reservas, catálogos internacionales de venta y redes profesionales como LinkedIn. Esteban coordina filmaciones fluidas adaptadas a las ventanas de mantenimiento en tierra y a los protocolos de seguridad aeroportuaria. Los entregables comprenden un video principal de dos minutos centrado en autonomía de vuelo, distribución interior y comodidades a bordo, junto con cuatro cápsulas verticales optimizadas para Instagram Reels y LinkedIn que muestran la experiencia de embarque exclusivo y servicios ejecutivos. En posproducción, una gradación de color precisa realza las texturas nobles de la cabina y el fuselaje exterior, mientras un tratamiento acústico limpio suprime el zumbido de turbinas. Estas piezas diferencian a los operadores locales y aceleran las decisiones de reserva y compraventa. Para evaluar trabajos cinematográficos verificados, examine el [anuncio de Bar Door Monkey](/es/portafolio/bar-door-monkey); para coordinar una grabación en hangar, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const EQUESTRIAN_POLO_VIDEO_ES_DISCLOSURE = "¿Cómo se realiza la videografía ecuestre y de torneos de polo en Wellington?";
export const EQUESTRIAN_POLO_VIDEO_ES_DESTINATIONS = "Partidos de polo de alto hándicap, pistas de salto ecuestre, fincas hípicas y videos de venta de caballos de deporte.";

export const EQUESTRIAN_POLO_VIDEO_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo documenta el video cinematográfico la alta competición de polo y salto en Wellington?",
    paragraphs: [
      "Los clubes de polo, criaderos de caballos deportivos, cuadras de salto y fincas ecuestres exclusivas en Wellington y el condado de Palm Beach requieren una producción audiovisual experta que refleje la intensidad deportiva y el valor de los ejemplares de competición. El polo de alto hándicap y la hípica internacional combinan velocidad atlética, nobleza equina y una arraigada tradición social donde el conocimiento del comportamiento animal y la precisión en los tiempos de cámara resultan cruciales. Esteban filma eventos hípicos empleando cámaras de alta velocidad de fotogramas, teleobjetivos con seguimiento continuo y estabilizadores que acompañan el ritmo de los chukkers y los recorridos de salto sin perturbar a los caballos. Planos dinámicos registran el movimiento de tacos, la pisada sobre el césped y la destreza del jinete frente a las gradas de Wellington. Para producciones de eventos y deportes de prestigio, consulte [videógrafo de pesca deportiva en Miami](/es/videografo-de-pesca-deportiva-miami); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales facilitan la venta internacional de caballos de deporte y fincas hípicas?",
    paragraphs: [
      "Los preparadores ecuestres, yeguadas y consultores inmobiliarios especializados en fincas hípicas precisan recursos visuales completos para mostrar la morfología, el tranco y las instalaciones a compradores internacionales. Esteban colabora con los responsables de cuadra para coordinar sesiones seguras que registran la inspección veterinaria en pista, sesiones de entrenamiento sobre obstáculos y la arquitectura de boxes y guadarneses. Los entregables comprenden un video de presentación de tres minutos para la comercialización del ejemplar, junto con cápsulas verticales con rótulos claros sobre genealogía, palmarés deportivo e historial sanitario para distribución por WhatsApp e Instagram. Para propiedades ecuestres, recorridos fluidos muestran pistas cubiertas, caminadores y viviendas para mozos. Estos materiales permiten a compradores de Europa y Latinoamérica tomar decisiones informadas con plena confianza. Para comprobar nuestra sensibilidad visual en celebraciones y deportes, vea la [película de Diana y Jack](/es/portafolio/diana-jack); para organizar una filmación ecuestre en Wellington, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const YACHT_REFIT_BOATYARD_ES_DISCLOSURE = "¿Cómo apoya el video técnico a los astilleros y empresas de reparación de yates en Fort Lauderdale?";
export const YACHT_REFIT_BOATYARD_ES_DESTINATIONS = "Varaderos y diques secos, pintura de cascos, ebanistería marina en teca y documentación de reformas navales.";

export const YACHT_REFIT_BOATYARD_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo respalda el video de astilleros la reputación técnica de las empresas navales en Fort Lauderdale?",
    paragraphs: [
      "Los astilleros de refit, varaderos, talleres de carpintería naval y empresas de ingeniería marina situados junto al New River, Marina Mile y Dania Cut-Off Canal en Fort Lauderdale dependen de la documentación audiovisual para demostrar su capacidad técnica, capacidad de izada y destreza artesanal. Los armadores de superyates, capitanes y directores de flota encomiendan reformas de gran presupuesto únicamente tras comprobar los estándares de seguridad de las instalaciones, la pericia de los oficios y el rigor en los plazos de entrega. Esteban registra proyectos de refit utilizando cámaras de lapso de tiempo, equipos estabilizados resistentes a la intemperie y lentes macro que capturan la soldadura de precisión, el calafateo de cubiertas de teca y el alisado de cascos. Las filmaciones siguen la varada en pórticos automotores, la remotorización y la transformación de interiores con solvencia documental. Para producciones afines en superyates, examine [marketing de video para superyates en Fort Lauderdale](/es/marketing-de-video-para-superyates-fort-lauderdale); para planes de producción, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos en video permiten a los varaderos captar contratos de gran eslora?",
    paragraphs: [
      "Los directores comerciales de astilleros y coordinadores de proyectos navales precisan memorias audiovisuales para acreditar sus intervenciones ante armadores, gabinetes de peritaje y firmas de gestión de yates de todo el mundo. Esteban diseña planes de grabación continuos que cubren desde la entrada en dique seco hasta las pruebas finales de mar. Los entregables incluyen un video corporativo de tres minutos sobre la infraestructura del astillero, talleres de mecanizado y gremios especializados, respaldado por informes audiovisuales periódicos y piezas verticales para redes que muestran el antes y después de salas de máquinas, cubiertas y puentes de mando. Gráficos en pantalla detallan arqueo, eslora y normativas de clasificación naval. Este material ofrece a los capitanes la seguridad de un trabajo minucioso y puntual. Para examinar nuestra experiencia en rodajes marítimos, explore la [película de Diana y Jack](/es/portafolio/diana-jack); para planificar una producción en astillero en Fort Lauderdale, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const COUNTRY_CLUB_GOLF_COMMUNITY_ES_DISCLOSURE = "¿Cómo ayuda el video cinematográfico a los clubes de golf y comunidades privadas en Palm Beach?";
export const COUNTRY_CLUB_GOLF_COMMUNITY_ES_DESTINATIONS = "Recorridos de campos de golf de campeonato, casas club, instalaciones de tenis y pádel, y membresías sociales.";

export const COUNTRY_CLUB_GOLF_COMMUNITY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayuda el video de estilo de vida a captar nuevos socios en los clubes de golf de Palm Beach?",
    paragraphs: [
      "Los clubes de golf privados, urbanizaciones campestres y clubes deportivos exclusivos en Palm Beach, Boca Raton y Jupiter emplean videos de producción cuidada para atraer nuevos miembros, poner en valor reformas del campo y consolidar la vida social comunitaria. Las familias y jugadores de alto nivel valoran el diseño del trazado, el ambiente de la casa club, las instalaciones de bienestar y las actividades familiares antes de solicitar su admisión o abonar cuotas de entrada. Esteban realiza películas institucionales empleando cámaras de cine sobre soportes estabilizados y puntos de vista elevados que muestran calles, greenes ondulados y lagos con la luz del amanecer. Las filmaciones presentan terrazas gastronómicas, pistas de raqueta, gimnasios modernos y torneos sociales con sobriedad y distinción. Estas piezas audiovisuales transmiten un sentimiento auténtico de pertenencia. Para explorar servicios en hospitalidad de lujo, consulte [video para hospitalidad en yates en Fort Lauderdale](/es/video-para-hospitalidad-en-yates-fort-lauderdale); para detalles de inversión, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué contenidos audiovisuales impulsan la incorporación de miembros y la venta de residencias?",
    paragraphs: [
      "Los directores generales de clubes, responsables de admisión y promotores inmobiliarios precisan recursos de video orientados a zonas privadas de miembros, campañas selectas de invitación y presentación de villas en el entorno del campo. Esteban colabora con la gerencia para filmar durante el horario habitual sin interferir en el juego ni comprometer la privacidad de los socios. Los entregables comprenden una película principal de cuatro minutos sobre el estilo de vida del club, recorridos detallados hoyo por hoyo y piezas breves para redes enfocadas en cenas de maridaje, escuelas juveniles y bienestar. Un etalonaje sutil realza el verdor del paisaje y la calidez de los salones interiores manteniendo un audio ambiental sereno. Estos videos duraderos atraen solicitudes de socios cualificados y revalorizan las propiedades residenciales del complejo. Para ver nuestro trabajo visual en eventos distinguidos, examine la [película de Diana y Jack](/es/portafolio/diana-jack); para solicitar una producción en Palm Beach, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const LUXURY_POOL_BUILDER_ES_DISCLOSURE = "¿Cómo impulsa el video la contratación de piscinas de lujo y áreas exteriores en South Florida?";
export const LUXURY_POOL_BUILDER_ES_DESTINATIONS = "Piscinas desbordantes con borde infinito, cocinas de verano, seguimiento de obra y efectos nocturnos de fuego y agua.";

export const LUXURY_POOL_BUILDER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayuda el video a los constructores de piscinas de lujo a cerrar proyectos a medida en South Florida?",
    paragraphs: [
      "Los constructores de piscinas a medida, paisajistas y contratistas de zonas exteriores en Miami, Fort Lauderdale y Boca Raton utilizan videos de obra acabada para demostrar solvencia constructiva, acabados artesanales e innovación técnica a propietarios exigentes. Un espacio exterior de alta gama representa una inversión patrimonial relevante que exige cálculos hidráulicos precisos, bordes infinitos, spas integrados y cocinas al aire libre. Esteban filma proyectos exteriores empleando cámaras cinematográficas de amplio rango dinámico, soportes a ras de agua y estabilizadores que capturan los reflejos del agua, el mármol travertino y los revestimientos vítreos con fidelidad fotográfica. El rodaje documenta los pasos de la obra —desde el armado de acero y proyección de hormigón hasta el revestimiento y la iluminación crepuscular con pebeteros de fuego—. Estas filmaciones justifican presupuestos elevados frente a competidores con simples fotografías fijas. Para proyectos constructivos afines, consulte [video marketing para contratistas en Florida](/es/video-marketing-para-contratistas-florida); para conocer planes de tarifa, examine [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos audiovisuales generan mayores solicitudes de diseño para estudios de piscinas?",
    paragraphs: [
      "Los directores comerciales y estudios de arquitectura exterior precisan materiales visuales que convenzan tanto en redes sociales como en presentaciones privadas de presupuestos. Esteban graba los proyectos en la hora dorada y en el crepúsculo para apreciar el juego de luces acuáticas, fuentes y cascadas sobre el cielo nocturno de South Florida. Los entregables comprenden un caso de estudio de dos minutos con explicaciones del constructor y testimonios del propietario, complementado con ocho piezas verticales que destacan sonidos de agua, barras sumergidas y domótica para Instagram Reels y TikTok. Rótulos en pantalla indican dimensiones, calidades de materiales y plazos de ejecución. Estas piezas convierten el interés de los visitantes web en reuniones formales de diseño. Para revisar nuestra experiencia en rodajes comerciales en exteriores, examine el [anuncio de Bar Door Monkey](/es/portafolio/bar-door-monkey); para reservar una producción de piscinas de diseño, contáctenos mediante [contacto](/es/contacto).",
    ],
  },
];

export const REGENERATIVE_MEDICINE_STEM_CELL_ES_DISCLOSURE = "¿Cómo divulga el video clínico los tratamientos de medicina regenerativa en Miami?";
export const REGENERATIVE_MEDICINE_STEM_CELL_ES_DESTINATIONS = "Explicaciones médicas, preparación en laboratorio biológico, tratamientos ecoguiados y testimonios de movilidad.";

export const REGENERATIVE_MEDICINE_STEM_CELL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo educa el video profesional a los pacientes sobre terapias celulares y regenerativas en Miami?",
    paragraphs: [
      "Los médicos especialistas en medicina regenerativa, biológicos ortopédicos y clínicas de longevidad en Miami, Coral Gables y Doral emplean videos rigurosos para explicar tratamientos innovadores y protocolos científicos a pacientes de todo el país. Quienes valoran terapias celulares avanzadas o plasma rico en plaquetas investigan exhaustivamente antes de acudir a consulta, demandando claridad médica, credenciales acreditadas y descripciones serias del procedimiento para disipar dudas. Esteban colabora con centros médicos bajo estrictas pautas de confidencialidad y consentimiento del paciente, utilizando ópticas macro, iluminación clínica difusa y soportes estables para documentar consultas, aislamiento celular en laboratorio esterilizado y aplicaciones articulares ecoguiadas. Las grabaciones resaltan el instrumental técnico, la asepsia del entorno y el diálogo profesional sin recurrir a promesas sensacionalistas. Estos contenidos consolidan la confianza del paciente y aumentan las solicitudes de valoración médica. Para producciones en salud estética afines, explore [video para spas médicos y cirujanos plásticos en Miami](/es/video-para-med-spas-y-cirujanos-plasticos-miami); para conocer opciones, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales cumplen con las normativas sanitarias y generan consultas cualificadas?",
    paragraphs: [
      "Los directores de clínicas y responsables de comunicación médica precisan contenidos audiovisuales que respeten los códigos deontológicos, eviten afirmaciones curativas no contrastadas y pongan en valor la experiencia científica del equipo facultativo. Esteban planifica las sesiones durante el horario de consulta para registrar explicaciones pedagógicas de los procesos biológicos y testimonios sinceros de recuperación con autorizaciones formales firmadas. Los entregables comprenden un video institucional de tres minutos sobre la filosofía clínica y la tecnología del laboratorio, acompañado de seis a ocho piezas verticales que resuelven dudas frecuentes sobre selección de candidatos, fases del tratamiento y cuidados posteriores. Rótulos tipográficos nítidos facilitan la asimilación de conceptos médicos y orientan hacia la reserva de citas. Estas piezas elevan la reputación del centro médico ante pacientes nacionales e internacionales. Para comprobar trabajos clínicos documentales, vea el [caso de estudio de Healthy Smile Miami](/es/portafolio/healthy-smile); para coordinar una grabación médica en Miami, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const B2B_CLIENT_CASE_STUDY_ES_DISCLOSURE = "¿Cómo reducen los ciclos comerciales los videos de casos de estudio B2B en Miami?";
export const B2B_CLIENT_CASE_STUDY_ES_DESTINATIONS = "Entrevistas a clientes empresariales, imágenes de operaciones en oficina, métricas de retorno y testimonios corporativos.";

export const B2B_CLIENT_CASE_STUDY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo agilizan la venta compleja los videos de casos de éxito y testimonios empresariales en Miami?",
    paragraphs: [
      "Las empresas de software corporativo, firmas de servicios financieros, consultoras estratégicas y operadores logísticos en Miami, Brickell y Coral Gables confían en casos de estudio en video para respaldar su propuesta de valor, demostrar retornos de inversión medibles y acortar los procesos de venta con clientes corporativos. Los comités de compras y directores de tecnología demandan pruebas verificables de implantaciones exitosas, satisfacción de usuarios y ahorros de costes antes de firmar acuerdos de envergadura. Esteban produce casos de éxito empresariales en sedes corporativas o salas de juntas utilizando cámaras de cine de alta resolución, iluminación suave de entrevista y microfonía profesional. La grabación combina diálogos sinceros de directivos con imágenes ágiles de equipos trabajando con el software, cuadros de mandos analíticos y operativas diarias. Estos testimonios aportan una validación indiscutible entre pares que despeja objeciones en presentaciones comerciales. Para servicios corporativos complementarios, consulte [producción de video corporativo en Brickell](/es/produccion-de-video-corporativo-brickell); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos audiovisuales ayudan a los equipos de ventas B2B a cerrar acuerdos más rápido?",
    paragraphs: [
      "Los directores de marketing B2B y responsables de habilitación de ventas necesitan recursos visuales modulares que puedan integrarse en presentaciones comerciales, secuencias de correo electrónico y campañas en LinkedIn. Esteban trabaja con los equipos de producto para estructurar guiones de entrevista que resalten métricas concretas, el reto operativo inicial y los beneficios cuantitativos obtenidos. Los entregables comprenden un caso de estudio principal de tres minutos con la historia completa de colaboración, dos cortes específicos de un minuto centrados en la faceta técnica y el impacto estratégico, y tres piezas verticales con subtítulos animados para redes profesionales. Una corrección cromática limpia y rótulos acordes a la identidad corporativa garantizan coherencia institucional. Estos activos audiovisuales otorgan a los representantes comerciales herramientas convincentes para cerrar contratos anuales. Para evaluar nuestro trabajo documental corporativo, examine la [película documental de Homeowners](/es/portafolio/homeowners); para producir casos de estudio en video para empresas, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const INTERIOR_DESIGN_MILLWORK_ES_DISCLOSURE = "¿Cómo retrata el video la ebanistería a medida y el diseño de interiores en Miami?";
export const INTERIOR_DESIGN_MILLWORK_ES_DESTINATIONS = "Carpintería arquitectónica, cocinas de alta gama, recorridos con diseñadores y exposiciones en el Distrito de Diseño.";

export const INTERIOR_DESIGN_MILLWORK_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo resalta el video cinematográfico el detalle y la espacialidad en proyectos de interiorismo en Miami?",
    paragraphs: [
      "Los estudios de diseño de interiores, talleres de ebanistería arquitectónica, carpinteros artesanos y salas de exposición exclusivas en el Distrito de Diseño de Miami, Coral Gables y Coconut Grove emplean videos cuidados para documentar instalaciones residenciales a medida y la textura de materiales nobles. Los clientes de residencias de lujo y los arquitectos valoran especialmente la precisión de las juntas, el calado de maderas selectas, los herrajes ocultos y la iluminación integrada que definen la excelencia en la obra. Esteban filma espacios interiores utilizando deslizadores de cámara estabilizados, objetivos arquitectónicos libres de distorsión y calibración lumínica que respeta la luz natural diurna. La cámara recorre transiciones entre estancias, detalles táctiles de chapas de madera y mármoles estriados, junto a explicaciones del diseñador sobre la coherencia conceptual del espacio. Estas películas transmiten el virtuosismo del diseño interior. Para producciones residenciales afines, explore [recorrido en video de penthouses de lujo en Miami](/es/recorrido-en-video-de-penthouses-de-lujo-miami); para tarifas, visite [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué entregables en video ayudan a los interioristas a conseguir encargos residenciales de alto nivel?",
    paragraphs: [
      "Los interioristas principales, maestros ebanistas y gerentes de salas de exposición precisan piezas visuales sobresalientes para candidaturas a premios de diseño, catálogos web y difusión en redes sociales. Esteban organiza las grabaciones tras la fase de montaje final para filmar las viviendas y ambientes decorados en su estado más impecable. Los entregables incluyen un recorrido cinematográfico de tres minutos con comentarios del diseñador sobre proporciones y soluciones a medida, respaldado por cuatro a seis cápsulas verticales centradas en tiradores singulares, puertas enrasadas y cambios lumínicos del día a la noche. Un etalonaje de alta definición reproduce con exactitud los tonos de tapicerías, pinturas y barnices sin saturaciones artificiales. Estas piezas sitúan al estudio como referencia indiscutible y atraen propietarios de alto patrimonio. Para examinar nuestra iluminación en rodajes comerciales, vea el [anuncio de Bar Door Monkey](/es/portafolio/bar-door-monkey); para reservar una producción de diseño interior en Miami, contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const ESTATE_PLANNING_ATTORNEY_ES_DISCLOSURE = "¿Cómo construye confianza el video sereno para abogados de planificación patrimonial en Boca Raton?";
export const ESTATE_PLANNING_ATTORNEY_ES_DESTINATIONS = "Perfiles de abogados de patrimonios, explicación de fideicomisos familiares, traslados de domicilio a Florida y ética legal.";

export const ESTATE_PLANNING_ATTORNEY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo ayuda el video institucional y cercano a los abogados de sucesiones y patrimonios en Boca Raton?",
    paragraphs: [
      "Los despachos de abogados especializados en planificación patrimonial, gestión de fideicomisos y derecho sucesorio en Boca Raton y el condado de Palm Beach recurren a producciones audiovisuales sobrias para comunicar experiencia jurídica, empatía y protección del legado familiar. Las familias de alto patrimonio y jubilados que trasladan su residencia a la Florida necesitan una profunda confianza antes de compartir sus acuerdos patrimoniales y planes de sucesión con un letrado. Esteban produce videos institucionales y piezas divulgativas en despachos privados, bibliotecas jurídicas y salas de reuniones empleando iluminación cuidada de retrato y sonido nítido sin reverberaciones. Las grabaciones muestran conversaciones claras del abogado explicando fideicomisos revocables, protección de activos y ventajas del domicilio fiscal en Florida sin recurrir a lenguajes comerciales agresivos. Planos de apoyo discretos presentan el análisis de documentos y la consulta profesional con distinción. Para producciones afines en el ámbito legal, explore [video para abogados de lesiones personales en Miami](/es/video-para-abogados-de-lesiones-personales-miami); para conocer opciones de contratación, consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué formatos audiovisuales permiten a los letrados educar a familias y consolidar alianzas profesionales?",
    paragraphs: [
      "Los socios directores de bufetes y encargados de marketing legal precisan videos cuidados que respeten las normas del Colegio de Abogados de Florida, aporten claridad a los clientes y refuercen la colaboración con gestores patrimoniales y asesores fiscales. Esteban estructura las filmaciones para registrar explicaciones pedagógicas sobre cómo evitar procedimientos sucesorios largos, planificar la sucesión generacional y gestionar voluntades anticipadas. Los entregables comprenden un video corporativo de dos minutos centrado en la trayectoria del bufete y el trato humano, apoyado por una serie de explicaciones de un minuto con subtítulos para el portal del despacho, LinkedIn y boletines informativos. Una posproducción refinada transmite estabilidad institucional y cercanía personal. Estos recursos facilitan la comprensión de temas jurídicos complejos y convierten lectores web en consultas iniciales. Para revisar nuestra experiencia en entrevistas documentales corporativas, vea la [película documental de Homeowners](/es/portafolio/homeowners); para coordinar una grabación de planificación patrimonial en Boca Raton, escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const BOUTIQUE_HOTEL_RESORT_ES_DISCLOSURE = "¿Cómo fomenta las reservas directas el video marketing para hoteles boutique en Miami Beach?";
export const BOUTIQUE_HOTEL_RESORT_ES_DESTINATIONS = "Suites frente al mar, piscinas en azotea, arquitectura Art Decó y piezas de video orientadas a la reserva directa.";

export const BOUTIQUE_HOTEL_RESORT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo cautiva a los viajeros el video cinematográfico para hoteles boutique en Miami Beach?",
    paragraphs: [
      "Los hoteles boutique, establecimientos con encanto y complejos independientes en Miami Beach y South Beach emplean el video cinematográfico para reflejar su personalidad estética, su gastronomía y las ventajas de reservar directamente frente a los grandes buscadores hoteleros. Los huéspedes de ocio y ejecutivos eligen estos hoteles por su arquitectura singular, sus terrazas con piscina en azotea y una atención personalizada que huye de las cadenas estandarizadas. Esteban filma propiedades boutique utilizando cámaras de gran formato, estabilizadores de mano e iluminación natural al atardecer para captar suites con vistas al océano, cócteles de autor junto a la piscina y el ambiente nocturno en salones y patios. El rodaje resalta la lencería de cama, los detalles de diseño en baños y las fachadas históricas Art Decó que definen la esencia de Miami Beach. Estos videos sumergen al viajero en la estancia y aumentan las reservas directas. Para proyectos en hostelería de alto nivel, explore [videógrafo para restaurantes de alta cocina en Miami](/es/videografo-para-restaurantes-de-alta-cocina-miami); para tarifas, revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas en video convierten visitas web en reservas hoteleras confirmadas?",
    paragraphs: [
      "Los directores generales de hoteles, directores de marketing y grupos de hostelería independiente precisan contenidos dinámicos para encabezados de página web, motores de reserva y campañas en redes sociales. Esteban planifica los rodajes para registrar el ambiente matinal, las horas de piscina y la vida nocturna en la coctelería sin incomodar a los huéspedes alojados. Los entregables comprenden un video principal de noventa segundos sobre la experiencia global del hotel, recorridos breves por categorías de habitación y ocho piezas verticales con música atractiva y rótulos que destacan beneficios de la reserva directa como desayuno incluido o salida tardía. Una gradación de color profesional ensalza los tonos pastel característicos de la arquitectura local y los azules del mar. Estos materiales motivan a los viajeros a reservar directamente en la web del hotel. Para comprobar nuestra labor en rodajes de hospitalidad, vea el [anuncio de Bar Door Monkey](/es/portafolio/bar-door-monkey); para planificar una producción en un hotel de Miami Beach, contáctenos en [contacto](/es/contacto).",
    ],
  },
];



export const MULTICAM_PANEL_ES_DISCLOSURE = "¿Cómo garantiza el sistema multicámara un registro dinámico en paneles corporativos de Miami?";
export const MULTICAM_PANEL_ES_DESTINATIONS = "Sincronización de cámaras, toma directa de audio de consola, microfonía de preguntas y edición de cápsulas.";

export const MULTICAM_PANEL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se coordinan dos cámaras sincronizadas durante una mesa redonda en Miami?",
    paragraphs: [
      "La grabación de paneles corporativos y mesas redondas exige una disposición de cámaras que capture con naturalidad tanto las exposiciones individuales como las reacciones espontáneas de los participantes. Esteban instala una cámara principal con óptica de retrato sobre trípode firme en el pasillo central para seguir al ponente en turno con encuadres limpios. La segunda cámara cubre un tiro angular más abierto desde un lateral para registrar la totalidad del estrado, las interacciones entre ponentes y la atención del público asistente. Ambas unidades operan con perfiles de color idénticos y códigos de tiempo coincidentes, facilitando una edición ágil sin saltos cromáticos molestos. Toda la instalación ocupa un espacio discreto que no obstaculiza el tránsito de los asistentes ni la visibilidad del auditorio. Para explorar opciones en congresos completos, revise [videógrafo para conferencias en Fort Lauderdale](/es/videografo-para-conferencias-fort-lauderdale); para conocer tarifas, consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué medidas de sonido aseguran un audio perfecto sin ruidos ni reverberaciones de sala?",
    paragraphs: [
      "El sonido profesional constituye la base de cualquier grabación de conferencia destinada a bibliotecas formativas o difusión institucional. En lugar de utilizar micrófonos ambientales que captan el zumbido de la climatización o el eco de grandes salas, conectamos grabadoras independientes directamente a la salida XLR de la mesa de sonido principal del recinto. Adicionalmente, instalamos transmisores de solapa inalámbricos con cápsulas omnidireccionales en el moderador y oradores destacados para disponer de pistas de seguridad ante posibles cortes en la megafonía local. Un micrófono direccional registra con nitidez las intervenciones y preguntas de los asistentes desde el patio de butacas. En la fase de mezcla procesamos cada canal por separado para eliminar siseos y equilibrar los volúmenes de conversación con precisión de estudio. Para revisar nuestra experiencia corporativa, explore [videógrafo para entrevistas ejecutivas en Miami](/es/videografo-para-entrevistas-ejecutivas-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const CORPORATE_TOWN_HALL_ES_DISCLOSURE = "¿Cómo se filman las asambleas corporativas asegurando discreción y calidad en South Florida?";
export const CORPORATE_TOWN_HALL_ES_DESTINATIONS = "Custodia confidencial, encuadres institucionales, sincronización de gráficos y formatos de intranet.";

export const CORPORATE_TOWN_HALL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se protege la información estratégica de la empresa durante la grabación de asambleas?",
    paragraphs: [
      "El registro de balances financieros, juntas de accionistas y anuncios corporativos reservados requiere una rigurosa disciplina de confidencialidad en cada fase del rodaje. Esteban opera bajo acuerdos de confidencialidad estrictos y almacena los brutos en discos duros cifrados sin subidas a servidores públicos no autorizados. En las salas de juntas se instala un equipo cinematográfico compacto que no distrae a los miembros del consejo ni interfiere con las deliberaciones oficiales. La iluminación suave resalta la presencia del equipo directivo con un tono institucional cálido y convincente. La doble grabación simultánea en tarjetas de memoria garantiza la conservación de cada palabra pronunciada sin margen para incidencias técnicas. La entrega final se efectúa mediante transferencias privadas protegidas con clave exclusiva para el departamento de comunicación interna. Para producciones similares, vea [producción de casos de estudio en video para empresas en Miami](/es/produccion-de-casos-de-estudio-en-video-para-empresas-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales facilitan la comunicación de los directivos con su plantilla?",
    paragraphs: [
      "Las direcciones de recursos humanos y relaciones con inversores precisan formatos visuales que transmitan los mensajes con agilidad a empleados remotos y delegaciones internacionales. Además de la grabación completa dividida en capítulos temáticos, entregamos una versión ejecutiva condensada de tres minutos que resalta los acuerdos principales, objetivos cumplidos e incentivos futuros. Las pantallas de presentación se integran con nitidez junto a la imagen del orador para facilitar la lectura de tablas financieras y diagramas operativos. Incorporamos subtítulos bilingües revisados para favorecer la accesibilidad en entornos de trabajo sin audio activo. El tratamiento de color unifica la apariencia estética eliminando dominantes frías de tubos fluorescentes en salas de conferencias. Para producciones de eventos institucionales, revise [videógrafo para conferencias en Fort Lauderdale](/es/videografo-para-conferencias-fort-lauderdale); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const EXECUTIVE_RETREAT_ES_DISCLOSURE = "¿Cómo se documenta un retiro de liderazgo ejecutivo en Florida Keys con estilo cinematográfico?";
export const EXECUTIVE_RETREAT_ES_DESTINATIONS = "Sesiones de estrategia, dinámicas costeras al aire libre, cenas de gala y piezas de cultura empresarial.";

export const EXECUTIVE_RETREAT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se combina la filmación de reuniones estratégicas con dinámicas de ocio costero?",
    paragraphs: [
      "Los retiros de liderazgo en los Cayos de Florida exigen una cobertura flexible que capture con la misma sensibilidad las sesiones de planificación en salas privadas y los momentos de desconexión junto al mar. Esteban utiliza cámaras ligeras montadas en estabilizadores manuales que permiten pasar de una sala de juntas climatizada a un muelle soleado sin retrasos de configuración técnica. Durante las presentaciones matinales, la presencia de la cámara es silenciosa y respetuosa con los debates del equipo directivo. En las actividades náuticas, cenas informales y paseos al atardecer, el empleo de filtros ópticos específicos atenúa la intensa luz solar tropical para mantener tonos de piel agradables y fondos costeros nítidos. Este equilibrio visual refleja la complicidad sincera entre los líderes y la visión compartida de la compañía. Para eventos corporativos en salones, consulte [videógrafo para galas corporativas en Miami](/es/videografo-para-galas-corporativas-miami); revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué productos en video permiten conservar el entusiasmo y los acuerdos del retiro?",
    paragraphs: [
      "Las organizaciones necesitan que la motivación y los acuerdos alcanzados durante el viaje se mantengan vivos en el día a día de sus oficinas. Esteban produce una película resumen de tres minutos con ritmo inspirador que entrelaza testimonios espontáneos de los participantes con paisajes marítimos de los Cayos y momentos significativos de la convivencia. Asimismo, se proporciona un archivo ordenado con las exposiciones completas y su material gráfico asociado para consulta de los miembros ausentes. Para la comunicación externa, editamos píldoras verticales para LinkedIn que muestran el atractivo de la cultura interna de la compañía ante perfiles profesionales exigentes. El etalonaje resalta la luminosidad de las aguas esmeralda y el cielo caribeño con elegancia atemporal. Para revisar eventos de networking empresarial, vea [videógrafo para eventos de networking en Miami](/es/videografo-para-eventos-de-networking-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const BRAND_ACTIVATION_ES_DISCLOSURE = "¿Cómo se filma una activación de marca experiencial para lograr máxima repercusión en Miami?";
export const BRAND_ACTIVATION_ES_DESTINATIONS = "Instalaciones interactivas, energía de los asistentes, contenidos para influencers y edición vertical rápida.";

export const BRAND_ACTIVATION_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se capta el entusiasmo del público y la interacción con el producto en eventos efímeros?",
    paragraphs: [
      "Las activaciones de marca y tiendas pop-up en distritos artísticos como Wynwood o el Design District de Miami basan su éxito en la experiencia sensorial y la conexión con el público. Esteban filma estos eventos mediante movimientos de cámara continuos y estabilizados que se deslizan entre los asistentes sin alterar la fluidez del espacio comercial. Grabamos a frecuencias elevadas para obtener cámaras lentas elegantes de personas probando productos, participando en actividades inmersivas o interactuando con personalidades de redes sociales. Los planos cortos captan expresiones espontáneas, detalles de la ambientación e iluminación de marca que demuestran la calidez del evento. El manejo de la iluminación portátil refuerza la paleta corporativa sin romper la atmósfera escénica del local. Para producciones con enfoque de moda, explore [video para marcas de moda en Miami](/es/video-para-marcas-de-moda-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué tipos de video ayudan a las agencias a multiplicar la visibilidad en redes sociales?",
    paragraphs: [
      "Las agencias de comunicación necesitan material audiovisual inmediato para aprovechar la conversación digital mientras la activación sigue abierta al público. Entregamos cápsulas verticales con cortes dinámicos, efectos de sonido y títulos tipográficos que siguen el manual de identidad de la marca con total fidelidad. Junto a los reels de impacto diario, elaboramos un resumen comercial de dos minutos que documenta el montaje del espacio, la afluencia de visitantes y el retorno de la inversión para los informes internos de dirección. Empleamos música con licencia comercial garantizada para evitar bloqueos en plataformas sociales. La corrección de color asegura que los logotipos y colores corporativos luzcan exactos bajo luces de neón o focos de espectáculo. Para coberturas en locales y coctelería, visite [videógrafo de coctelería para bares en Miami](/es/videografo-de-cocteleria-para-bares-miami); reserve fechas en [contacto](/es/contacto).",
    ],
  },
];

export const PRE_CONSTRUCTION_SALES_ES_DISCLOSURE = "¿Cómo impulsa las ventas sobre plano el video de salas de exhibición y maquetas en Miami?";
export const PRE_CONSTRUCTION_SALES_ES_DESTINATIONS = "Detalles de maquetas a escala, muestras de materiales nobles, explicaciones de agentes y presentaciones internacionales.";

export const PRE_CONSTRUCTION_SALES_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filman las maquetas arquitectónicas para transmitir escala y lujo real?",
    paragraphs: [
      "La comercialización de torres de condominios en preventa dirigida a compradores locales e internacionales requiere proyectar la vida en un edificio que aún está en fase de proyecto. Esteban registra las salas de ventas utilizando lentes macro y deslizadores motorizados de precisión milimétrica que recorren las maquetas arquitectónicas. Los movimientos lentos y controlados destacan las terrazas con vistas, las piscinas en azotea y los accesos privados con una sensación tridimensional auténtica. Aplicamos técnicas de iluminación indirecta que suprimen brillos sobre vitrinas y maquetas, resaltando la textura de los materiales. La grabación abarca también las zonas de exposición de acabados, como mármoles importados, carpintería de diseño y griferías de alta gama. Este tratamiento visual convierte los bocetos en una certeza tangible de lujo. Para recorridos de propiedades terminadas, explore [recorrido en video de penthouses de lujo en Miami](/es/recorrido-en-video-de-penthouses-de-lujo-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué recursos en video aceleran las firmas de contratos de preventa residencial?",
    paragraphs: [
      "Las agencias inmobiliarias especializadas en promociones inmobiliarias precisan herramientas audiovisuales persuasivas para convencer a inversores durante las primeras fases de reserva. Producimos un video principal de tres minutos con intervenciones del equipo de ventas que explica los servicios del edificio, la distribución de plantas y la revalorización de la zona. Se elaboran además cápsulas verticales con rótulos elegantes que muestran detalles de la maqueta y los materiales exclusivos para campañas en mercados extranjeros. La inclusión de subtítulos en español e inglés garantiza una comunicación fluida con clientes de América Latina y otros países que deciden sus inversiones a distancia. La gradación de color aporta calidez y distinción sin alterar los tonos reales de las muestras de diseño. Para proyectos de inmuebles comerciales, visite [video para bienes raíces comerciales en Miami](/es/video-para-bienes-raices-comerciales-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const COMMERCIAL_OFFICE_LEASING_ES_DISCLOSURE = "¿Cómo agiliza el video profesional el alquiler de oficinas y naves comerciales en South Florida?";
export const COMMERCIAL_OFFICE_LEASING_ES_DESTINATIONS = "Plantas corporativas abiertas, iluminación natural de despachos, muelles de carga y rótulos con superficies.";

export const COMMERCIAL_OFFICE_LEASING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se muestran los espacios corporativos y las comodidades del edificio con rigor técnico?",
    paragraphs: [
      "La comercialización de oficinas para empresas que trasladan su sede a South Florida exige presentar espacios funcionales, luminosidad diurna y servicios de valor añadido con total transparencia. Esteban graba inmuebles corporativos utilizando ópticas ultra gran angular diseñadas para corregir deformaciones ópticas y mantener las líneas arquitectónicas verticales perfectamente rectas. Mediante recorridos continuos con estabilizadores de precisión, la cámara guía al futuro inquilino desde el vestíbulo principal hasta plantas diáfanas modulables y despachos directivos con amplias cristaleras. Ajustamos la exposición lumínica para equilibrar la luz suave del interior con las vistas urbanas o paisajísticas que rodean el inmueble. Asimismo, se documentan con detalle zonas comunes como salas de conferencias equipadas, comedores corporativos y accesos de aparcamiento subterráneo. Para producciones similares, revise [video para bienes raíces comerciales en Miami](/es/video-para-bienes-raices-comerciales-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué gráficos y formatos en video facilitan el cierre de contratos a los agentes inmobiliarios?",
    paragraphs: [
      "Los consultores inmobiliarios comerciales precisan piezas que aporten respuestas inmediatas sobre superficie y operativa a los directores de operaciones. Incorporamos títulos animados que indican metros cuadrados disponibles, alturas libres de techo, capacidad eléctrica y distribución modular superpuestos sobre las propias estancias del edificio. En parques logísticos y naves industriales, los planos generales fluidos evidencian la amplitud de los patios de maniobra para camiones, la distribución de muelles de carga y la robustez de los suelos de hormigón pulido. Entregamos un video principal de tres minutos idóneo para portales especializados como LoopNet, complementado por cápsulas breves de un minuto para publicaciones directas en perfiles corporativos de LinkedIn. Un etalonaje limpio refleja la solidez y luminosidad del espacio. Para ver filmaciones de directivos, visite [videógrafo para entrevistas ejecutivas en Miami](/es/videografo-para-entrevistas-ejecutivas-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const COSMETIC_DENTISTRY_ES_DISCLOSURE = "¿Cómo genera confianza el video de transformaciones de sonrisa en clínicas dentales de Miami?";
export const COSMETIC_DENTISTRY_ES_DESTINATIONS = "Reacciones ante el espejo, detalles macro de carillas cerámicas, emoción del paciente y prestigio clínico.";

export const COSMETIC_DENTISTRY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filma el emotivo momento en que el paciente descubre su nueva sonrisa?",
    paragraphs: [
      "Los pacientes que deciden realizarse un tratamiento de carillas de porcelana o diseño de sonrisa buscan mucho más que un cambio estético: anhelan recuperar la seguridad en sí mismos al hablar y sonreír. Esteban registra estos instantes filmando la revelación genuina frente al espejo cuando el paciente contempla por primera vez el resultado definitivo de su tratamiento. Con paneles de luz difusa que embellecen los tonos del rostro sin destellos molestos, la cámara capta la sonrisa espontánea, la emoción en los ojos y el agradecimiento sincero hacia el odontólogo. A través de entrevistas cercanas y pausadas, los pacientes comparten cómo sus antiguos complejos dentales condicionaban su vida diaria y la plenitud que sienten con su nueva imagen. Este relato humano genera una identificación inmediata en quienes buscan un cambio dental. Vea nuestro trabajo real para [Healthy Smile en Miami](/es/portafolio/healthy-smile); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué detalles técnicos y planos de aproximación demuestran la maestría en carillas cerámicas?",
    paragraphs: [
      "Los pacientes exigentes reconocen la calidad odontológica por la naturalidad, transparencia y ajuste perfecto de las piezas cerámicas. Empleamos lentes macro de alta precisión que enfocan las carillas a milímetros de distancia, mostrando la textura del esmalte, la armonía del contorno gingival y la luminosidad de la porcelana sin sombras duras. Las tomas de apoyo documentan la destreza del doctor durante el escaneo digital intraoral, la selección de tonalidades y el protocolo de adhesión con pulcritud médica. Entregamos un video principal para la portada web que consolida la autoridad del doctor, junto a ocho piezas verticales de impacto centradas en el antes y después para captar nuevos pacientes en Instagram y TikTok. El tratamiento cromático mantiene los tonos dentales fidedignos, evitando blanqueamientos artificiales que restan credibilidad médica. Para tratamientos de medicina estética, visite [video para med spas en Miami](/es/video-para-med-spas-y-cirujanos-plasticos-miami); reserve fechas en [contacto](/es/contacto).",
    ],
  },
];

export const CONCIERGE_DOCTOR_ES_DISCLOSURE = "¿Cómo transmite distinción y cercanía el video para médicos concierge en Palm Beach?";
export const CONCIERGE_DOCTOR_ES_DESTINATIONS = "Atención médica personalizada, espacios clínicos elegantes, explicaciones de longevidad y captación de miembros.";

export const CONCIERGE_DOCTOR_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se refleja la exclusividad y dedicación de la medicina personalizada en video?",
    paragraphs: [
      "Los pacientes de alto patrimonio que eligen la medicina concierge y la atención médica personalizada buscan un trato directo, sin prisas y enfocado en la prevención integral de su salud. Esteban filma las consultas privadas y centros de bienestar en Palm Beach y Boca Raton con un lenguaje visual sobrio y elegante que transmite serenidad y confianza médica. Las entrevistas se desarrollan en despachos y bibliotecas privadas, iluminadas con fuentes suaves que destacan la autoridad y empatía del doctor. El facultativo explica los motivos por los que decidió reducir el número de pacientes para ofrecer disponibilidad continua y consultas exhaustivas de una hora. Los planos de apoyo muestran la revisión atenta de historiales, pruebas diagnósticas avanzadas y espacios médicos diseñados con exquisito gusto. Esta estética conecta de inmediato con familias que valoran su salud por encima de todo. Para revisar proyectos en salud, vea [Healthy Smile en Miami](/es/portafolio/healthy-smile); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales consolidan la reputación de una consulta médica exclusiva?",
    paragraphs: [
      "Los doctores y directores de centros de medicina preventiva precisan contenidos de alta gama que refuercen su prestigio científico sin recurrir a formatos comerciales estridentes. Realizamos una película principal de tres minutos para la web de la consulta donde el médico comparte su trayectoria hospitalaria, sus investigaciones y su visión de la medicina proactiva. Complementamos este recurso con cuatro piezas divulgativas de dos minutos sobre optimización metabólica, cribado cardiovascular y protocolos de envejecimiento saludable para boletines privados y canales digitales. Subtítulos elegantes facilitan la lectura en teléfonos móviles sin necesidad de audio activo. El etalonaje equilibra los blancos clínicos con la calidez de los interiores nobles de Palm Beach. Para producciones afines en clínicas avanzadas, visite [video para clínicas de medicina regenerativa en Miami](/es/video-para-clinicas-de-medicina-regenerativa-miami); escríbanos en [contacto](/es/contacto).",
    ],
  },
];

export const BAR_BAT_MITZVAH_ES_DISCLOSURE = "¿Cómo inmortaliza el video cinematográfico una celebración de Bar y Bat Mitzvah en Boca Raton?";
export const BAR_BAT_MITZVAH_ES_DESTINATIONS = "Ensayos con la Torá, bendiciones de abuelos, baile de la Hora y películas de recuerdo familiar.";

export const BAR_BAT_MITZVAH_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filman las tradiciones solemnes en la sinagoga y la posterior fiesta de gala?",
    paragraphs: [
      "La celebración de un Bar o Bat Mitzvah marca un rito de madurez espiritual de inmenso valor familiar combinado con una fiesta festiva de gran magnitud. Esteban asume este compromiso con máximo respeto durante los ensayos en la sinagoga o servicios matinales permitidos. Empleamos ópticas fijas luminosas que capturan la lectura de la Torá, las miradas cómplices de los padres y las bendiciones de los abuelos sin emplear focos agresivos ni alterar la solemnidad del templo. Al caer la noche, el dispositivo técnico se transforma para registrar la fiesta en salones de gala de Boca Raton y Aventura. Los estabilizadores de mano se adentran en la pista para filmar la emoción del levantamiento de la silla en el baile de la Hora, los juegos y el encendido de velas con dinamismo. Registramos el sonido directo de los micrófonos para que cada brindis familiar se conserve impecable. Para celebraciones juveniles, explore [videógrafo de quinceañeras en Miami](/es/videografo-de-quinceaneras-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué películas de recuerdo familiar perduran a través de las generaciones?",
    paragraphs: [
      "Las familias buscan una obra audiovisual que sus hijos y futuros nietos puedan contemplar con el paso de los años con la misma emoción que el primer día. Editamos una película cinematográfica de cinco minutos que acompasa las palabras más emotivas de los padres con la explosión de alegría de los jóvenes en la fiesta. Junto a este cortometraje principal, entregamos el registro íntegro de los discursos, bendiciones y presentaciones en una galería digital interactiva de fácil acceso para familiares en el extranjero. Producimos también tres cápsulas verticales rítmicas para que los jóvenes compartan su celebración con sus amigos en redes sociales. El tratamiento de color unifica la calidez de la madera del santuario con los efectos lumínicos del salón de baile. Para ver producciones de bodas y aniversarios, visite [videógrafo de bodas en Miami](/es/videografo-de-bodas-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const DESTINATION_WEDDING_ES_DISCLOSURE = "¿Cómo inmortaliza una boda de destino de fin de semana en Palm Beach la cinematografía de autor?";
export const DESTINATION_WEDDING_ES_DESTINATIONS = "Cóctel de bienvenida, ceremonias junto al océano, votos matrimoniales sinceros y bailes de medianoche.";

export const DESTINATION_WEDDING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se filma un fin de semana nupcial completo sin sobrecargar a los novios?",
    paragraphs: [
      "Las parejas que viajan a Palm Beach para casarse en hoteles emblemáticos como The Breakers o The Colony desean disfrutar de cada instante con sus familias sin que la cámara condicione su celebración. Esteban aplica un método documental silencioso que prioriza la espontaneidad y los sentimientos sinceros. Durante el cóctel de bienvenida del viernes, la cámara registra los abrazos de reencuentro de invitados llegados de distintas ciudades, los brindis informales y la luz dorada del atardecer costero sin forzar poses artificiales. El sábado nupcial, los preparativos en las suites, el primer encuentro entre los novios bajo palmeras centenarias y los votos nupciales se graban con ópticas de retrato y microfonía invisible en el prendedor del novio. Los novios viven su día con plenitud mientras la cámara captura cada mirada de complicidad. Vea nuestra película de boda publicada [Diana & Jack](/es/portafolio/diana-jack); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué películas de autor atesoran la magia y distinción de una boda en Palm Beach?",
    paragraphs: [
      "Una boda de destino reúne a las personas más importantes en la vida de una pareja y merece una obra audiovisual que refleje la sofisticación de Palm Beach. Entregamos una película cinematográfica de ocho a diez minutos con una banda sonora selecta que entrelaza los votos nupciales, las palabras más emotivas de los padrinos y la belleza arquitectónica del enclave. Facilitamos además una versión documental íntegra con la ceremonia completa y los discursos de banquete con sonido directo de alta fidelidad. Para el viaje de novios, editamos avances verticales para que la pareja comparta la emoción en sus redes sociales. La gradación de color respeta la luz característica de Florida: tonos pastel suaves, vegetación tropical viva y destellos dorados en la piel. Para cenas prenupciales, visite [videógrafo para cena de ensayo en Miami](/es/videografo-para-cena-de-ensayo-miami); coordine fechas en [contacto](/es/contacto).",
    ],
  },
];

export const ONLINE_COURSE_ES_DISCLOSURE = "¿Cómo se graban cursos digitales de alta retención para plataformas educativas en Miami?";
export const ONLINE_COURSE_ES_DESTINATIONS = "Uso de teleprónter, sistema de dos cámaras, integración de diapositivas y entrega de módulos.";

export const ONLINE_COURSE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo facilita el teleprónter profesional una explicación fluida y natural frente a la cámara?",
    paragraphs: [
      "Muchos formadores y directivos dominan su materia pero pierden espontaneidad cuando deben memorizar extensos contenidos técnicos ante un objetivo. Esteban implementa un sistema de teleprónter con cristal óptico montado frente a la cámara principal, lo que permite al instructor mirar fijamente a sus alumnos virtuales mientras repasa su temario sin titubeos. Durante las primeras pruebas ajustamos la velocidad del texto para acompasarla con la respiración y los énfasis naturales del ponente, evitando un tono mecánico o apresurado. La iluminación de estudio con fuentes difusas previene el cansancio ocular a lo largo de jornadas completas de grabación. El ponente proyecta seguridad pedagógica desde la primera lección, transmitiendo la autoridad necesaria para cursos de suscripción premium. Para entrevistas corporativas, consulte [videógrafo para entrevistas ejecutivas en Miami](/es/videografo-para-entrevistas-ejecutivas-miami); revise tarifas en [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué estructura de dos cámaras y grafismo favorece la finalización de los módulos formativos?",
    paragraphs: [
      "Los videos educativos de plano fijo prolongado provocan desinterés y aumentan las tasas de abandono en las plataformas de formación digital. Grabamos cada lección con dos cámaras cinematográficas sincronizadas: un encuadre amplio de presentación y un plano medio cerrado que se alterna en los conceptos clave y resúmenes prácticos. En la fase de montaje incorporamos diapositivas sincronizadas, gráficos explicativos y destacados de texto que refuerzan los aprendizajes visuales. El tratamiento sonoro elimina ecos de sala para lograr una locución nítida que se escucha con comodidad en auriculares durante horas. Todos los archivos se entregan etiquetados por módulos y lecciones con subtítulos precisos listos para subir a cualquier gestor de aprendizaje. Para producciones educativas institucionales, vea [videos de admisiones para colegios privados en Miami](/es/videos-de-admisiones-para-colegios-privados-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const VSL_DIRECT_RESPONSE_ES_DISCLOSURE = "¿Qué técnicas de edición consiguen mayor retención y ventas en cartas de venta en video?";
export const VSL_DIRECT_RESPONSE_ES_DESTINATIONS = "Tipografía cinética sincronizada, cortes de patrón rítmicos, diseño de sonido y llamadas a la acción.";

export const VSL_DIRECT_RESPONSE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Por qué la tipografía cinética y el ritmo de corte determinan el éxito de un VSL?",
    paragraphs: [
      "En el marketing de respuesta directa, una carta de venta audiovisual compite contra distracciones constantes en navegadores y teléfonos móviles. Esteban estructura el montaje de VSL empleando tipografía cinética calibrada palabra por palabra con la voz en off, asegurando que la mirada del espectador permanezca anclada en el mensaje. Cada pocos segundos introducimos interrupciones visuales de patrón calculadas, como cambios sutiles de escala, contrastes cromáticos y secuencias de apoyo que renuevan el interés mental. Los textos destacan datos numéricos, testimonios y garantías con animaciones sobrias y contundentes. Esta cadencia visual acompaña al cliente potencial a través de las fases emocionales del guion, desde la exposición del problema hasta la presentación de la oferta. Para proyectos de podcasts y entrevistas, explore [producción de video para podcasts con multicámaras en Miami](/es/produccion-de-video-para-podcasts-con-multicamaras-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Cómo potencia el diseño de sonido la autoridad de la oferta y la conversión final?",
    paragraphs: [
      "Los estímulos acústicos sutiles refuerzan de manera decisiva la credibilidad y el impacto de los argumentos de venta en video. Esteban incorpora capas de diseño sonoro personalizadas con transiciones cinemáticas, impactos suaves y efectos auditivos que subrayan las objeciones clave y los beneficios principales. La música de fondo se modula con precisión, subiendo de intensidad en los momentos de mayor entusiasmo y reduciéndose al silencio absoluto en el instante en que se revela el precio y la llamada a la acción. La locución se ecualiza con calidez y compresión profesional para garantizar nitidez impecable en altavoces de teléfonos móviles. Entregamos archivos optimizados para carga ultrarrápida en plataformas de alojamiento de páginas de aterrizaje. Para producción legal persuasiva, revise [videos para abogados de lesiones personales en Miami](/es/videos-para-abogados-de-lesiones-personales-miami); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const VIDEO_REPURPOSING_ES_DISCLOSURE = "¿Cómo multiplica el impacto de marca un retenedor mensual de reutilización de video?";
export const VIDEO_REPURPOSING_ES_DESTINATIONS = "Extracción de fragmentos de impacto, subtitulado dinámico, encuadre vertical y calendario mensual.";

export const VIDEO_REPURPOSING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se transforman conferencias y grabaciones largas en clips atractivos para redes?",
    paragraphs: [
      "Muchos directivos y creadores graban seminarios web, podcasts o ponencias de gran valor que quedan archivados sin generar interacción recurrente. En Esteban establecemos un sistema mensual que analiza el material audiovisual existente para seleccionar los momentos más persuasivos, reflexiones contundentes y respuestas brillantes. Cada fragmento seleccionado se adapta a formato vertical mediante reencuadres dinámicos que mantienen enfocado al orador con naturalidad. Integramos títulos de apertura con ganchos verbales diseñados para frenar el desplazamiento en redes sociales desde el primer instante. Añadimos subtítulos sincronizados con palabras destacadas en color que garantizan la comprensión del mensaje incluso con el sonido desactivado. Este proceso exprime el valor de cada hora filmada. Para servicios de grabación de podcasts, visite [producción de video para podcasts con multicámaras en Miami](/es/produccion-de-video-para-podcasts-con-multicamaras-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué calendario de entregas garantiza una presencia constante ante las audiencias digitales?",
    paragraphs: [
      "Los algoritmos de plataformas sociales favorecen a las marcas que publican con regularidad y penalizan las semanas de inactividad. Nuestros acuerdos mensuales entregan lotes programados de cápsulas verticales y fragmentos horizontales listos para nutrir los calendarios de publicación de su equipo de comunicación. Mantenemos una coherencia visual estricta aplicando las tipografías corporativas, paletas de color y rótulos identificativos de su empresa en cada entrega. Además de las piezas verticales, preparamos cortes en formato panorámico pensados para publicaciones en LinkedIn y boletines de correo electrónico. Cada mes analizamos las métricas de respuesta para ajustar los temas y el estilo de edición según las preferencias de su audiencia. Para marketing automotriz, explore [videos para concesionarios de autos en el sur de la Florida](/es/videos-para-concesionarios-de-autos-sur-de-la-florida); inicie su servicio en [contacto](/es/contacto).",
    ],
  },
];

export const B2B_SAAS_EXPLAINER_ES_DISCLOSURE = "¿Cómo aceleran las ventas de software empresarial los videos explicativos SaaS en Miami?";
export const B2B_SAAS_EXPLAINER_ES_DESTINATIONS = "Captura nítida de pantallas, animación gráfica de interfaz, narrativa orientada a beneficios y piezas comerciales.";

export const B2B_SAAS_EXPLAINER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo simplifica la animación de interfaz los flujos de trabajo de software empresarial?",
    paragraphs: [
      "Los directores de tecnología y responsables de compras evalúan herramientas digitales priorizando la claridad operativa sobre los eslóganes comerciales abstractos. Esteban convierte plataformas complejas de software en narrativas visuales dinámicas combinando capturas de pantalla de alta definición con animaciones fluidas de interfaz. En lugar de mostrar grabaciones estáticas de navegador donde el usuario pierde de vista el cursor, aplicamos ampliaciones de plano cinematográficas, movimientos de ratón suavizados y resaltados gráficos que orientan la mirada hacia las funciones esenciales. Paneles de datos, integraciones automáticas y flujos de trabajo complejos se presentan con una estética depurada que respeta la identidad corporativa. Rótulos informativos sobreimpresionan resultados cuantificables, como la reducción de errores manuales o el ahorro de tiempo para el equipo. Esta estructura transmite la propuesta técnica desde el primer minuto. Para proyectos de nuevas empresas, explore [producción de videos para pitch de startups en Miami](/es/produccion-de-videos-para-pitch-de-startups-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué piezas audiovisuales facilitan el cierre de acuerdos comerciales en ventas B2B?",
    paragraphs: [
      "Los equipos de ventas de software empresarial requieren materiales en video diseñados para cada fase del proceso comercial. Producimos un video principal de noventa segundos concebido para la portada de la web y prospección ejecutiva que sintetiza el problema de negocio y la solución del software. Complementamos esta pieza con tres cápsulas demostrativas de cuarenta segundos que profundizan en módulos clave, tales como paneles de control, analítica avanzada o gestión de permisos, pensadas para secuencias de seguimiento comercial. La locución profesional se combina con un diseño de sonido moderno y discreto que refuerza cada clic y transición de pantalla. Los videos se entregan con subtítulos completos en inglés o español para su visualización fluida en correos electrónicos corporativos o reuniones de ventas. Para comprobar nuestra labor documental y comercial, vea la [película documental de Homeowners](/es/portafolio/homeowners); planifique la producción de su software en [contacto](/es/contacto).",
    ],
  },
];

export const EXECUTIVE_LINKEDIN_ES_DISCLOSURE = "¿Cómo consolida la reputación directiva una serie de video planificada para LinkedIn?";
export const EXECUTIVE_LINKEDIN_ES_DESTINATIONS = "Grabaciones trimestrales concentradas, preguntas estratégicas de negocio, microfonía oculta y subtítulos.";

export const EXECUTIVE_LINKEDIN_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo genera una sesión trimestral contenido continuo de liderazgo sin saturar la agenda del directivo?",
    paragraphs: [
      "Los directores generales y socios directores de firmas profesionales disponen de agendas apretadas que dificultan la creación habitual de contenidos digitales. Esteban resuelve esta limitación mediante jornadas de grabación trimestrales de media jornada realizadas en las propias oficinas o salas de juntas de la empresa. Conducimos una entrevista conversacional estructurada a partir de preguntas estratégicas sobre el sector, facilitando que el directivo exponga sus puntos de vista sin necesidad de memorizar guiones. De una única sesión de tres horas extraemos entre doce y veinte cápsulas de video individuales optimizadas para redes profesionales. Cada pieza sintetiza un concepto empresarial clave en un minuto de duración. Este método garantiza presencia continua sin restar tiempo a la gestión ejecutiva. Para eventos directivos, explore [videógrafo para retiros ejecutivos en Florida Keys](/es/videografo-para-retiros-ejecutivos-florida-keys); revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué estética audiovisual transmite seriedad institucional en plataformas corporativas?",
    paragraphs: [
      "El contenido en video para LinkedIn debe reflejar la categoría y solvencia de la empresa que representa el ejecutivo. Diseñamos montajes de iluminación suave que aportan distinción a los rostros integrando con elegancia la arquitectura de la oficina de fondo. Empleamos micrófonos de solapa de tamaño reducido ocultos en la vestimenta para lograr un audio nítido sin elementos técnicos visibles. En la edición preparamos formatos verticales y cuadrados con subtítulos completos de lectura clara, facilitando la visualización en silencio desde teléfonos móviles de otros profesionales del sector. Rótulos sobrios con el nombre y cargo directivo refuerzan la imagen de marca de la organización. Para paneles corporativos, vea [video para paneles y conferencias con multicámara en Miami](/es/video-para-paneles-y-conferencias-multicamara-miami); agende una sesión en [contacto](/es/contacto).",
    ],
  },
];

export const YOUTUBE_LONG_FORM_ES_DISCLOSURE = "¿Cómo previene la edición profesional la caída de audiencia en videos de YouTube?";
export const YOUTUBE_LONG_FORM_ES_DESTINATIONS = "Ganchos iniciales de retención, ritmo de corte constante, diseño de sonido y capítulos estructurados.";

export const YOUTUBE_LONG_FORM_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo protege el ritmo de corte la curva de retención durante los primeros minutos?",
    paragraphs: [
      "Las estadísticas de YouTube demuestran que la mayor pérdida de espectadores se produce en el primer minuto de reproducción. Esteban diseña el montaje de videos largos comenzando con un gancho ágil que valida de inmediato la promesa de la miniatura y el título, eliminando introducciones lentas o logotipos corporativos prolongados. Insertamos planos de recurso, transiciones suaves y ampliaciones digitales cada pocos segundos para renovar el foco visual del espectador sin saturarlo. Las explicaciones técnicas complejas se apoyan en diagramas y esquemas animados que facilitan la comprensión inmediata. Este ritmo mantiene constante el tiempo medio de visualización, indicando al algoritmo de YouTube que recomiende el contenido a audiencias más amplias. Para proyectos de podcasts, consulte [producción de video para podcasts con multicámaras en Miami](/es/produccion-de-video-para-podcasts-con-multicamaras-miami); revise [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué elementos de sonido y grafismo diferencian un canal profesional de uno amateur?",
    paragraphs: [
      "La diferencia entre un canal de éxito y uno estancado reside en el cuidado del diseño sonoro y la coherencia gráfica. Esteban aplica efectos acústicos sutiles en cada cambio de capítulo, reforzando las transiciones de ideas con texturas sonoras discretas. La pista vocal se somete a reducción de ruidos, compresión equilibrada y enriquecimiento tímbrico para que suene con presencia nítida en teléfonos móviles o televisores inteligentes. Realizamos una gradación de color profesional con tonos de piel naturales y contraste cinematográfico. Los proyectos se entregan con marcas de tiempo para los capítulos de YouTube y propuestas para el diseño de miniaturas. Para edición de ventas, explore [edición de video para cartas de venta VSL](/es/edicion-de-video-para-cartas-de-venta-vsl); coordine su calendario de edición en [contacto](/es/contacto).",
    ],
  },
];

export const PRODUCT_UNBOXING_ES_DISCLOSURE = "¿Cómo incrementa el video cinematográfico de unboxing las ventas de productos en línea?";
export const PRODUCT_UNBOXING_ES_DESTINATIONS = "Tomas macro de texturas, bases giratorias motorizadas, sonido táctil foley y adaptaciones para tiendas online.";

export const PRODUCT_UNBOXING_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo revelan las lentes macro y bases giratorias la calidad real de los materiales?",
    paragraphs: [
      "Los compradores de tiendas en línea no pueden tocar ni examinar físicamente un producto antes de pedirlo, por lo que la fidelidad visual es el factor decisivo de compra. Esteban filma videos de unboxing y demostración empleando lentes macro de cine y bases motorizadas de giro suave que capturan los detalles más finos, costuras, acabados metálicos y texturas de empaque. Aplicamos iluminación de estudio difusa que resalta los relieves y el diseño sin crear reflejos incómodos sobre plásticos o cristales. La cámara acompaña el gesto de abrir precintos y retirar solapas con una fluidez que recrea la emoción de recibir un paquete exclusivo. Planos más amplios muestran el producto en situaciones prácticas de uso diario. Esta presentación reduce devoluciones y aumenta la confianza de los clientes en la tienda virtual. Para producciones comerciales, revise [video para bienes raíces comerciales en Miami](/es/video-para-bienes-raices-comerciales-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué importancia tiene el sonido táctil en la percepción de calidad y la decisión de compra?",
    paragraphs: [
      "La imagen por sí sola resulta insuficiente para transmitir la solidez de un producto físico; el audio táctil aporta la sensación de autenticidad. Grabamos efectos de sonido foley de alta resolución durante la manipulación del producto: el chasquido de cierres magnéticos, el movimiento suave de botones o el despegue de láminas protectoras. Estos sonidos se mezclan en la edición final para generar una respuesta sensorial positiva que el público asocia de inmediato con fabricación de primera categoría. Producimos versiones horizontales para fichas de producto en plataformas de venta y montajes verticales dinámicos para redes sociales comerciales. Rótulos limpios destacan dimensiones, materiales y garantías. Para videos de automoción, visite [videos para concesionarios de autos en el sur de la Florida](/es/videos-para-concesionarios-de-autos-sur-de-la-florida); solicite rodaje en [contacto](/es/contacto).",
    ],
  },
];

export const AIRBNB_LUXE_ES_DISCLOSURE = "¿Cómo incrementa el video de calidad las reservas y el precio por noche de villas en Miami Beach?";
export const AIRBNB_LUXE_ES_DESTINATIONS = "Rodaje al atardecer, recorridos fluidos con estabilizador, detalles de hospitalidad y atracción de reservas.";

export const AIRBNB_LUXE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo capta la luz del atardecer la experiencia de alojarse en una villa frente al agua?",
    paragraphs: [
      "Los viajeros que reservan residencias vacacionales exclusivas en Miami Beach toman su decisión atraídos por la experiencia de descanso y ocio más que por una simple lista de metros cuadrados. Esteban programa las grabaciones durante el atardecer, cuando la luz dorada costera baña las terrazas exteriores, las piscinas iluminadas y los muelles privados. Movimientos suaves con estabilizador de tres ejes conducen al espectador desde el recibidor principal hasta las zonas de estar abiertas y los miradores frente al mar. Empleamos ópticas gran angular con corrección geométrica para mostrar los espacios con amplitud sin deformar las líneas arquitectónicas. El equilibrio de exposición entre interior y exterior resalta las vistas marítimas a través de los ventanales. Esta atmósfera visual posiciona la propiedad en las categorías más cotizadas. Para condominios de altura, explore [recorrido en video de penthouses de lujo en Miami](/es/recorrido-en-video-de-penthouses-de-lujo-miami); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué detalles de confort y hospitalidad justifican tarifas nocturnas elevadas?",
    paragraphs: [
      "Además del diseño arquitectónico, los huéspedes de alto poder adquisitivo valoran los detalles refinados de hospitalidad. Esteban filma planos detalle de cortesía como copas preparadas junto al jacuzzi, dormitorios con ropa de cama de lino, cocinas de chef equipadas y chimeneas exteriores al anochecer. Rótulos discretos informan sobre comodidades como amarre para yates, sistemas de sonido domóticos y cargadores para vehículos eléctricos. Entregamos un video principal de dos minutos para plataformas como Airbnb Luxe o VRBO y adaptaciones verticales para captar reservas directas a través de redes sociales. Esta combinación de piezas facilita a propietarios y empresas gestoras aumentar sus ingresos por noche. Para servicios de embarcaciones, visite [video promocional para alquiler de botes en Miami](/es/video-promocional-para-alquiler-de-botes-miami); solicite fecha de rodaje en [contacto](/es/contacto).",
    ],
  },
];

export const WATERFRONT_RESTAURANT_ES_DISCLOSURE = "¿Cómo impulsa las reservas de mesa el video gastronómico en restaurantes de Fort Lauderdale?";
export const WATERFRONT_RESTAURANT_ES_DESTINATIONS = "Emplatados gourmet en primer plano, coctelería en barra, atraque de embarcaciones y ambiente al atardecer.";

export const WATERFRONT_RESTAURANT_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo consiguen los primeros planos culinarios y la coctelería despertar el deseo del comensal?",
    paragraphs: [
      "Los restaurantes frente al agua en Fort Lauderdale compiten por una clientela local y navegantes que eligen mesa seducidos por la vivacidad visual de la carta. Esteban filma la gastronomía con ópticas macro de alta definición que destacan los brillos de pescados frescos, el vapor de platos recién cocinados y el detalle de los emplatados. En la barra grabamos la preparación de cócteles a cámara lenta: el tallado de hielo, infusiones ahumadas y vertidos espumosos que atrapan la luz cálida de la barra. Empleamos iluminación suave que realza los colores de los alimentos manteniendo la calidez del comedor. Estas tomas despiertan el apetito y motivan reservas anticipadas para el fin de semana. Para servicios de hospitalidad, vea [marketing de video para hospitalidad en Fort Lauderdale](/es/marketing-de-video-para-hospitalidad-fort-lauderdale); consulte [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Cómo se retrata el estilo de vida náutico y el ambiente al atardecer en las terrazas de los canales?",
    paragraphs: [
      "El gran atractivo de Fort Lauderdale reside en sus vistas a los canales y la posibilidad de llegar en embarcación para almorzar o cenar junto al agua. Programamos las filmaciones durante la puesta de sol cuando las terrazas de madera se llenan de comensales que contemplan el paso de yates. Capturamos la llegada de lanchas al muelle del restaurante, brindis al aire libre bajo guirnaldas de luces y la animación del servicio en sala. Combinamos planos generales del canal con encuadres íntimos de comensales disfrutando de la velada. Entregamos cápsulas verticales para redes sociales y montajes en bucle de alta calidad para la portada del sitio web. Para cobertura de ferias náuticas, explore [videos para expositores del boat show de Fort Lauderdale](/es/videos-para-expositores-del-boat-show-de-fort-lauderdale); contáctenos en [contacto](/es/contacto).",
    ],
  },
];

export const MARINA_FACILITY_ES_DISCLOSURE = "¿Cómo atrae clientes e inquilinos de amarre el video comercial de marinas en Fort Lauderdale?";
export const MARINA_FACILITY_ES_DESTINATIONS = "Infraestructura de pantalanes profundos, hangares y elevadores, comodidades para tripulaciones y seguridad portuaria.";

export const MARINA_FACILITY_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cómo se muestran los servicios técnicos y la seguridad de amarres de gran calado?",
    paragraphs: [
      "Los capitanes y armadores eligen su puerto base priorizando la seguridad operativa, el suministro eléctrico fiable y la facilidad de atraque. Esteban documenta instalaciones portuarias mediante recorridos sobre pantalán que demuestran la amplitud de las dársenas, la robustez de las cornamusas de amarre y las torretas de conexión eléctrica. Utilizamos filtros polarizadores que eliminan el brillo solar sobre el agua, facilitando apreciar el calado limpio de las áreas de maniobra. Filmamos la operativa de varada con grúas travelift, carretillas elevadoras de almacenamiento en seco, estaciones de combustible y controles de acceso restringido. Esta rigurosidad técnica genera confianza en los propietarios de embarcaciones respecto al cuidado de sus yates. Para eventos náuticos, consulte [videos para expositores del boat show de Fort Lauderdale](/es/videos-para-expositores-del-boat-show-de-fort-lauderdale); vea tarifas en [precios](/es/precios).",
    ],
  },
  {
    heading: "¿Qué comodidades deciden a capitanes y tripulaciones a elegir una marina como puerto base?",
    paragraphs: [
      "La ocupación continuada de una marina depende de la satisfacción de los capitanes que recomiendan el amarre a los dueños de los barcos. Esteban recorre las comodidades pensadas para la tripulación: salas de descanso climatizadas, gimnasios privados, vestuarios impecables y tiendas de efectos navales. Tomas fluidas muestran las terrazas del club náutico con vistas al puerto durante el atardecer, transmitiendo la calidad de vida entre travesías. Rótulos informativos sobreimpresionan datos náuticos clave como el calado en bajamar, la eslora máxima admitida y la cercanía a la bocana del puerto sin puentes fijos. Entregamos versiones panorámicas para ferias navales y formatos verticales para campañas de comercialización de amarres. Para alquiler de embarcaciones, visite [video promocional para alquiler de botes en Miami](/es/video-promocional-para-alquiler-de-botes-miami); coordine su rodaje en [contacto](/es/contacto).",
    ],
  },
];

