import type { DeepDive } from "@/lib/service-deep-dive-content";
import type { SpanishNicheSection } from "@/lib/spanish-site";
import {
  EXPRESS_MULTIPLIER,
  PACKAGE_PRICES,
  PRICING_BANDS,
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

const social = `${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}`;
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
        `If you already have the footage, the [Starter](/pricing/starter) package is remote editing from ${starterEn} per video, with one round of revisions and a format for Reels, TikTok, YouTube or the web. The calculator's short-form social band is ${social} per project, an indicative editing-led freelancer range with an introductory discount applied.`,
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
        `For a property film built from existing material, the calculator's corporate band is ${corporate} per project, and its short-form social band is ${social} per project for reels and stories. Both are indicative editing-led freelancer ranges with an introductory discount applied, checked against published market rates; they are not full-crew production-company prices, which run on a different model.`,
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
      `Si ya tienes el material grabado, el paquete [Arranque](/es/precios/arranque) es edición remota desde ${starterEs} por video, con una ronda de revisión y formato para Reels, TikTok, YouTube o web. La banda de video corto para redes de la calculadora es ${social} por proyecto: un rango indicativo de editor independiente, con un descuento de introducción ya aplicado.`,
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
      `Para una película de la propiedad hecha con material existente, la banda corporativa de la calculadora es ${corporate} por proyecto, y la banda de video corto para redes es ${social} por proyecto para reels e historias. Las dos son rangos indicativos de editor independiente con un descuento de introducción aplicado, contrastados con tarifas de mercado publicadas; no son precios de una productora con equipo completo, que trabaja con otro modelo.`,
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
];
