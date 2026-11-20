import type { DeepDive } from "@/lib/service-deep-dive-content";
import type { SpanishNicheSection } from "@/lib/spanish-site";
import {
  AI_SERVICES,
  PACKAGE_PRICES,
  PRICING_BANDS,
  SHORT_FORM,
  filmingHourlyText,
  usd,
} from "@/lib/pricing";

/**
 * Event attendee interviews + AI-assisted commercial Reels (2026-11-19).
 *
 * Two new service pages and one events calendar. Claim discipline: every
 * figure is read from lib/pricing.ts, and no client, result, review or
 * turnaround is invented. The only proof named is portfolio work the site
 * already publishes, described exactly as it is.
 */

const localPresenceFrom =
  PACKAGE_PRICES["presencia-local"].kind === "from"
    ? usd(PACKAGE_PRICES["presencia-local"].amount)
    : "a scoped quote";
const onLocationBand = `${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}`;
const corporateBand = `${usd(PRICING_BANDS.corporate.baseMin)}–${usd(PRICING_BANDS.corporate.baseMax)}`;
const shortFormFrom = usd(SHORT_FORM.perVideoFrom);

// ---------------------------------------------------------------------------
// EN: /services/event-attendee-interview-videographer-miami
// ---------------------------------------------------------------------------

export const EVENT_INTERVIEW_DEEP_DIVE: DeepDive = {
  id: "event-interview-details",
  title: "How much do attendee interview videos cost, and how is a recap filmed?",
  destinations:
    "Filming and editing ranges, roving stick-mic technique, sound in a loud hall, and how same-day or next-day recaps are scheduled.",
  sections: [
    {
      heading: "How much does an event attendee interview videographer cost in Miami?",
      paragraphs: [
        `Coverage is quoted from two parts: filming on location, ${filmingHourlyText("en")} with a four-hour minimum call, and the editing that turns the interviews into recap Reels. Social recap editing sits in the corporate editing band of ${corporateBand} per finished piece, and a production day through [Local Presence](/pricing/local-presence) starts from ${localPresenceFrom}.`,
        `Raw capture only, with files handed to your marketing team, is billed on filming hours without editing. Capture-only half-days are quoted in the ${onLocationBand} range. These are different ways to scope the same event, so they are not added together. Send the venue, the run of show and the interviews you need before the date; a starting price cannot confirm coverage for your specific event.`,
      ],
    },
    {
      heading: "What does attendee interview coverage include at a conference or expo?",
      paragraphs: [
        "Coverage is built around the people, not the stage. A single videographer moves through the expo floor, the coffee breaks and the reception with a handheld camera and a directional stick microphone, asking two short questions of attendees, exhibitors and sponsors.",
        "The same day can also cover stage remarks, booth walk-throughs, signage and crowd atmosphere, so the recap has both voices and context. Prompts are agreed with the organizer before the date: what the event is, who it serves and which takeaways matter. Answers are kept under roughly forty-five seconds so they can be cut into vertical Reels without losing the point.",
      ],
    },
    {
      heading: "How is clean audio captured in a crowded hall or boat show dock?",
      paragraphs: [
        "A convention hall, a boat show dock and a food and wine tent share the same problem: an ambient roar that overwhelms a camera microphone. The practical fix is close mic placement. A handheld dynamic microphone with a tight pickup pattern handles quick attendee soundbites, and a wireless lavalier handles a seated interview or a sponsor testimonial.",
        "When remarks come from an amplified stage or a broadcast booth, an audio line out from the venue soundboard is recorded alongside the room microphone and synchronized in editing. That keeps speech clear and still preserves the energy of the crowd. If the venue restricts radio frequencies or requires a media pass, that is confirmed with the organizer in advance.",
      ],
    },
    {
      heading: "When can a same-day or next-day recap Reel be delivered?",
      paragraphs: [
        "Same-day and next-day recaps are scheduled in the written proposal before the event, not promised on arrival. A vertical 30 to 60-second Reel cut from the day's interviews, with captions and the event's own branding, is the piece that usually ships first; a longer horizontal recap follows on a schedule agreed in the proposal.",
        "What makes the fast turnaround possible is decided during filming: a short prioritized shot list, two-question interviews, and footage logged as it is captured. Any editing beyond a single recap Reel, such as multiple sponsor cutdowns or a full highlight film, extends the schedule and is quoted separately.",
      ],
    },
    {
      heading: "Which Miami events and venues does this fit?",
      paragraphs: [
        "It fits conferences, trade expos, boat shows, food and wine events, product launches and association meetings across Miami-Dade and Broward. The published [South Florida events calendar](/events) lists the seasons that draw exhibitors and interview-worthy crowds, with each date marked for confirmation with the organizer.",
        "Published portfolio proof is limited to work that exists. Healthy Smile Miami is a set of social videos Esteban filmed on location with video and sound and then edited; it is a clinic, not an event. It shows how a professional space is presented to camera, and no event client is claimed.",
      ],
    },
  ],
};

export const EVENT_INTERVIEW_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta un videógrafo de entrevistas a asistentes en Miami?",
    paragraphs: [
      `La cobertura se cotiza en dos partes: grabación en locación, desde ${usd(125)} por hora con un mínimo de cuatro horas, y la edición que convierte las entrevistas en reels resumen. La edición de resumen social se mueve en la banda corporativa de ${corporateBand} por pieza terminada, y un día de producción con [Presencia Local](/es/precios/presencia-local) parte de ${localPresenceFrom}.`,
      `Si solo necesitas la captura, con los archivos entregados a tu equipo de marketing, se cobra por horas de grabación sin edición. La captura de medio día se cotiza en el rango de ${onLocationBand}. Son dos maneras distintas de definir el mismo evento y no se suman. Envía la sede, el programa y las entrevistas que necesitas antes de la fecha: un precio inicial no confirma la cobertura de tu evento.`,
    ],
  },
  {
    heading: "¿Qué incluye la cobertura de entrevistas en una conferencia o expo?",
    paragraphs: [
      "La cobertura se arma alrededor de las personas, no del escenario. Un solo videógrafo se mueve por el piso de exposición, los recesos y la recepción con una cámara en mano y un micrófono direccional tipo bastón, y hace dos preguntas cortas a asistentes, expositores y patrocinadores.",
      "En la misma jornada también se graban las intervenciones del escenario, los recorridos por los stands, la señalización y el ambiente, para que el resumen tenga voces y contexto. Las preguntas se acuerdan con la organización antes de la fecha: qué es el evento, a quién sirve y qué aprendizajes importan. Las respuestas se mantienen por debajo de unos cuarenta y cinco segundos para que se puedan cortar en reels verticales sin perder la idea.",
    ],
  },
  {
    heading: "¿Cómo se logra un audio limpio en un salón lleno o en el muelle de un boat show?",
    paragraphs: [
      "Un salón de convenciones, el muelle de un boat show y una carpa de comida y vino comparten el mismo problema: un murmullo ambiental que satura el micrófono de la cámara. La solución práctica es acercar el micrófono. Un micrófono dinámico de mano con patrón de captación cerrado resuelve las entrevistas rápidas, y un micrófono de solapa inalámbrico sirve para una entrevista sentada o el testimonio de un patrocinador.",
      "Cuando las intervenciones salen de un escenario amplificado o de una cabina de transmisión, se graba una salida de audio de la consola del recinto junto al micrófono de ambiente y se sincroniza en la edición. Así la voz queda clara y se conserva la energía del público. Si el recinto limita frecuencias de radio o exige un pase de prensa, se confirma con la organización antes del evento.",
    ],
  },
  {
    heading: "¿Cuándo se puede entregar un reel resumen el mismo día o al día siguiente?",
    paragraphs: [
      "El resumen para el mismo día o para el día siguiente se agenda en la propuesta escrita antes del evento; no se promete al llegar. Lo que suele salir primero es un reel vertical de 30 a 60 segundos armado con las entrevistas del día, con subtítulos y la marca del evento. Un resumen horizontal más largo se entrega en la fecha acordada en la propuesta.",
      "Lo que hace posible la entrega rápida se decide durante la grabación: una lista corta de tomas prioritarias, entrevistas de dos preguntas y material registrado mientras se captura. Cualquier edición adicional, como varios cortes para patrocinadores o una película completa del evento, amplía el calendario y se cotiza aparte.",
    ],
  },
  {
    heading: "¿Para qué eventos y sedes de Miami encaja este servicio?",
    paragraphs: [
      "Encaja en conferencias, expos comerciales, boat shows, eventos de comida y vino, lanzamientos de producto y reuniones de asociaciones en Miami-Dade y Broward. El [calendario de eventos del sur de Florida](/es/eventos) publicado reúne las temporadas que atraen expositores y público, con cada fecha marcada para confirmar con el organizador.",
      "La prueba publicada se limita a trabajos que existen. Healthy Smile Miami son videos para redes que Esteban grabó en locación con video y sonido y luego editó; es una clínica, no un evento. Muestra cómo se presenta un espacio profesional ante la cámara, y no se atribuye ningún cliente de eventos.",
    ],
  },
];

export const EVENT_INTERVIEW_ES_DISCLOSURE =
  "Detalles de logística, audio y entrega para entrevistas a asistentes en ferias, conferencias y eventos de Miami.";

export const EVENT_INTERVIEW_ES_DESTINATIONS =
  "Rangos de grabación y edición, técnica de micrófono en movimiento, audio en salones ruidosos y cómo se agenda un resumen para el mismo día o el día siguiente.";

// ---------------------------------------------------------------------------
// EN: /services/ai-commercial-video-reels-miami
// ---------------------------------------------------------------------------

export const AI_COMMERCIAL_REELS_DEEP_DIVE: DeepDive = {
  id: "ai-commercial-reels-details",
  title: "How do AI-assisted commercial Reels work, and what has to be disclosed?",
  destinations:
    "What the AI actually does, where a human editor stays in the loop, how disclosure and platform labels apply, and how pricing is built.",
  sections: [
    {
      heading: "What does an AI-assisted commercial Reel include?",
      paragraphs: [
        "An AI-assisted commercial Reel still starts with a real product, a real property or a real dish. The AI helps with the parts a small team cannot produce by hand: voiceover, generated b-roll that does not misrepresent the product, motion graphics, cleanup and fast captioning. The cut, the pacing and the claims are decided by a human editor.",
        `A finished Reel is built as a vertical piece for one offer and one audience, from ${shortFormFrom} per video for a single edit. AI-specific add-ons are priced separately: voiceover at ${usd(AI_SERVICES.voiceoverPerVideo)} per video, generated b-roll at ${usd(AI_SERVICES.bRollPerVideo)} per video, animation from ${usd(AI_SERVICES.animationFrom)} and a short AI-assisted brand film from ${usd(AI_SERVICES.microShortFilmFrom)}.`,
      ],
    },
    {
      heading: "Where does AI help, and where does a human editor stay in control?",
      paragraphs: [
        "AI is used where it saves time without changing what the viewer is promised: transcribing interviews, isolating speech in noisy footage, rough cut assembly from a shot list, caption timing, and simple graphics. Those jobs are mechanical, and they were never the reason a commercial worked.",
        "Editing decisions stay human. That means choosing the hook, deciding what the product actually looks like on screen, keeping prices and offers accurate, and refusing a generated frame that invents a feature, a size, an ingredient or a view. A restaurant shot should show the dish the kitchen serves. A property Reel should show the unit and the view a buyer can visit.",
      ],
    },
    {
      heading: "How is AI use disclosed, and which platform labels apply?",
      paragraphs: [
        "AI use is disclosed in the delivery note for every project, naming what was generated and what was filmed. Nothing pretends to be a camera original when it is not.",
        "Platform rules also apply and are the client's to follow. Meta, TikTok and YouTube each ask creators to label realistic AI-generated or significantly altered content, and the label sits on the platform, not in the caption alone. The AI-assisted Reel is delivered so the client can apply that label honestly. In regulated categories such as real estate listings and food advertising, the client's own compliance review still governs claims.",
      ],
    },
    {
      heading: "How much does an AI-assisted commercial Reel cost, and what changes the price?",
      paragraphs: [
        `Base editing for one vertical commercial Reel starts at ${shortFormFrom} per video, and social ad creative in the ecommerce and real estate bands typically runs ${usd(PRICING_BANDS.ecommerce.baseMin)}–${usd(PRICING_BANDS.realestate.baseMax)} for a scoped short ad. AI add-ons are quoted line by line from lib/pricing.ts, so a voiceover is never bundled into a price that does not include it.`,
        "Four things move the quote: how many products or listings are in scope, whether original footage exists or capture is needed, how far the AI work goes, and how many variations are required for testing. Bulk or rush work is priced by the same rules as every other edit. The final quote follows the scope, and a starting price alone does not confirm availability for your date.",
      ],
    },
    {
      heading: "When is AI-assisted editing the wrong choice?",
      paragraphs: [
        "It is the wrong choice when the buyer needs to inspect the item and a generated image cannot match it, when the claim is regulated, or when the brand's value is the visible presence of real people. A restaurant's signature dish, a property's actual finishes and an ecommerce product's label, texture and size should be filmed, not synthesized.",
        "The honest comparison of AI assistance and human editing is already published in the guide on [AI video editing versus a human editor](/guides/ai-video-editing-vs-human-editor). For ad variation testing built from real creator footage, the [UGC ad variation editing](/services/ugc-ad-variation-video-editing) page covers that workflow.",
      ],
    },
  ],
};

export const AI_COMMERCIAL_REELS_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Qué incluye un reel comercial asistido por IA?",
    paragraphs: [
      "Un reel comercial asistido por IA sigue partiendo de un producto, una propiedad o un plato real. La IA ayuda en lo que un equipo pequeño no puede producir a mano: la locución, el b-roll generado que no tergiversa el producto, los gráficos en movimiento, la limpieza y el subtitulado rápido. El corte, el ritmo y las afirmaciones los decide un editor humano.",
      `Un reel terminado se arma en formato vertical para una oferta y una audiencia, desde ${shortFormFrom} por video para una edición individual. Los complementos de IA se cotizan aparte: locución a ${usd(AI_SERVICES.voiceoverPerVideo)} por video, b-roll generado a ${usd(AI_SERVICES.bRollPerVideo)} por video, animación desde ${usd(AI_SERVICES.animationFrom)} y una pieza corta de marca asistida por IA desde ${usd(AI_SERVICES.microShortFilmFrom)}.`,
    ],
  },
  {
    heading: "¿Dónde ayuda la IA y dónde mantiene el control un editor humano?",
    paragraphs: [
      "La IA se usa donde ahorra tiempo sin cambiar lo que se le promete al espectador: transcribir entrevistas, aislar la voz en material con ruido, armar un corte aproximado a partir de una lista de tomas, ajustar subtítulos y resolver gráficos simples. Son tareas mecánicas y nunca fueron la razón por la que un comercial funcionaba.",
      "Las decisiones de edición siguen siendo humanas: elegir el gancho, decidir cómo se ve realmente el producto en pantalla, mantener precios y ofertas correctos y rechazar un cuadro generado que invente una función, una talla, un ingrediente o una vista. Un reel de restaurante debe mostrar el plato que sale de la cocina. Un reel inmobiliario debe mostrar la unidad y la vista que un comprador puede visitar.",
    ],
  },
  {
    heading: "¿Cómo se avisa el uso de IA y qué etiquetas de plataforma aplican?",
    paragraphs: [
      "El uso de IA se avisa en la nota de entrega de cada proyecto, indicando qué se generó y qué se grabó. Nada se presenta como material original de cámara si no lo es.",
      "Las reglas de cada plataforma también aplican y son responsabilidad del cliente. Meta, TikTok y YouTube piden que el creador etiquete el contenido realista generado o alterado de forma significativa, y la etiqueta vive en la plataforma, no solo en el texto del post. El reel se entrega para que el cliente pueda aplicar esa etiqueta con honestidad. En categorías reguladas, como anuncios inmobiliarios y publicidad de alimentos, la revisión de cumplimiento del cliente sigue rigiendo las afirmaciones.",
    ],
  },
  {
    heading: "¿Cuánto cuesta un reel comercial asistido por IA y qué cambia el precio?",
    paragraphs: [
      `La edición base de un reel comercial vertical parte de ${shortFormFrom} por video, y una pieza corta de anuncio en las bandas de ecommerce e inmobiliaria se mueve típicamente entre ${usd(PRICING_BANDS.ecommerce.baseMin)} y ${usd(PRICING_BANDS.realestate.baseMax)}. Los complementos de IA se cotizan línea por línea desde lib/pricing.ts, así que una locución nunca se incluye dentro de un precio que no la contempla.`,
      "Cuatro cosas mueven la cotización: cuántos productos o propiedades entran en el alcance, si existe material original o hace falta grabar, hasta dónde llega el trabajo de IA y cuántas variaciones se necesitan para probar. El trabajo por volumen o urgente se cotiza con las mismas reglas que cualquier otra edición. La cotización final sigue el alcance, y un precio inicial no confirma disponibilidad para tu fecha.",
    ],
  },
  {
    heading: "¿Cuándo la edición con IA es la opción equivocada?",
    paragraphs: [
      "Es la opción equivocada cuando el comprador necesita inspeccionar el artículo y una imagen generada no puede igualarlo, cuando la afirmación es regulada o cuando el valor de la marca es la presencia visible de personas reales. El plato insignia de un restaurante, los acabados reales de una propiedad y la etiqueta, textura y talla de un producto de ecommerce se graban, no se sintetizan.",
      "La comparación honesta entre asistencia de IA y edición humana ya está publicada en la guía de [edición de video con IA frente a un editor profesional](/es/guias/edicion-de-video-con-ia-vs-editor-profesional). Para pruebas de variaciones de anuncios con material real de creadores, la página de [edición de variaciones de anuncios UGC](/es/edicion-de-variaciones-de-anuncios-ugc) cubre ese flujo.",
    ],
  },
];

export const AI_COMMERCIAL_REELS_ES_DISCLOSURE =
  "Cómo se usa la IA en un reel comercial, qué se avisa en la entrega y qué etiquetas pide cada plataforma.";

export const AI_COMMERCIAL_REELS_ES_DESTINATIONS =
  "Qué hace la IA, dónde decide un editor humano, cómo se avisa el uso de IA y cómo se arma el precio de un reel comercial.";


export const EVENT_INTERVIEW_FAQS = [
  {
    question: "What is the typical turnaround for attendee interview recap Reels?",
    answer:
      "A vertical 30 to 60-second recap Reel with on-screen captions is typically scheduled for same-day or next-day delivery when scoped in advance. Full event recap films or multi-camera keynote edits follow standard project delivery timelines.",
  },
  {
    question: "How do you capture crisp attendee audio on a noisy trade show floor?",
    answer:
      "We use close-mic technique: a directional handheld dynamic stick microphone isolates voices from loud ambient noise on expo floors, while wireless clip-on lavaliers are used for seated sponsor testimonials.",
  },
  {
    question: "Are questions scripted in advance with conference organizers?",
    answer:
      "Yes. We agree on two to three focused prompt questions with the event director prior to the show, ensuring interviews remain concise (under 45 seconds) and highlight key takeaways.",
  },
  {
    question: "Does coverage include B-roll of sponsor booths, stages, and venue energy?",
    answer:
      "Yes. The videographer captures booth interactions, crowd reactions, stage lighting, and sponsor branding between interview blocks to give the final recap full context.",
  },
] as const;

export const AI_COMMERCIAL_REELS_FAQS = [
  {
    question: "How does Esteban Moreno Media disclose the use of AI in commercial Reels?",
    answer:
      "Every project delivery includes a transparent disclosure note specifying which elements utilized AI assistance (such as voiceover, generated atmospheric b-roll, or automated transcription) and which were captured on camera.",
  },
  {
    question: "Do clients have to follow platform AI labeling requirements?",
    answer:
      "Yes. Platforms including Meta (Instagram/Facebook), TikTok, and YouTube require creators to apply appropriate realistic AI or altered media labels upon publishing. We deliver assets compliant for accurate platform tagging.",
  },
  {
    question: "What parts of video post-production are kept under human editorial control?",
    answer:
      "Human editors supervise storytelling, narrative pacing, commercial hook selection, factual offer verification, color grading, sound design, and brand accuracy. AI never replaces truthful product representation.",
  },
  {
    question: "Can AI generate dishes for restaurants or finishes for real estate properties?",
    answer:
      "No. Authentic dishes served by restaurant kitchens and real architectural finishes of properties must be filmed accurately, not synthesized. AI assistance is reserved for background accents, pacing, clean voiceovers, and motion titles.",
  },
] as const;
