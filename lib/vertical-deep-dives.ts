import type { DeepDive } from "@/lib/service-deep-dive-content";
import type { SpanishNicheSection } from "@/lib/spanish-site";
import { EXPRESS_MULTIPLIER, PACKAGE_PRICES, PRICING_BANDS, usd, type PackageId } from "@/lib/pricing";

/**
 * Citable second reading for the four vertical pages that failed the
 * dual-audience gate in round 1 (automotive, dental, med spa, yacht charter),
 * in English and Spanish.
 *
 * Claim discipline, stricter than usual because a previous draft for these
 * pages was rejected for inventing capture techniques and compliance claims:
 *
 * - every price is interpolated from lib/pricing.ts, never typed;
 * - every project fact is the portfolio summary or credits in
 *   messages/en.json / messages/es.json, and where the portfolio holds no
 *   project for a vertical the section says so;
 * - no turnaround, result, statistic, review, licence or compliance promise;
 * - nothing offers to fly a drone (no Part 107 on file): aerial material is
 *   only ever footage the client supplies.
 */

function from(id: PackageId): string {
  const price = PACKAGE_PRICES[id];
  if (price.kind !== "from") throw new Error(`Deep dive requires a starting price for ${id}`);
  return usd(price.amount);
}

const starter = from("arranque");
const growth = from("crecimiento");
const local = from("presencia-local");
const social = `${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}`;
const youtube = `${usd(PRICING_BANDS.youtube.baseMin)}–${usd(PRICING_BANDS.youtube.baseMax)}`;
const onLocation = `${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}`;
const express = String(EXPRESS_MULTIPLIER);
const expressEs = express.replace(".", ",");

// ---------------------------------------------------------------- English

export const AUTOMOTIVE_DEEP_DIVE: DeepDive = {
  id: "automotive-cost-and-proof",
  title: "How much does dealership video cost, and what is already published?",
  destinations: "Published price ranges, the automotive work in the portfolio, and what to send for a quote.",
  sections: [
    {
      heading: "How much does car dealership video cost in Miami?",
      paragraphs: [
        `Esteban publishes his ranges instead of hiding them. Editing a short vertical video falls in the calculator's social band of ${social} per project, and a longer walkaround edited for YouTube sits in the ${youtube} band. If the dealership already records its own inventory clips, the [Starter package](/pricing/starter) starts from ${starter} per project: you send the footage and get it back formatted for Reels, TikTok, YouTube or web, with one revision round.`,
        `Filming at the lot is scoped separately. [Local Presence](/pricing/local-presence) starts from ${local} per production day and covers pre-production, filming at your business and the editing afterwards, across Fort Lauderdale, Broward and selected Miami-Dade projects. Every figure is an indicative starting point: the [budget calculator](/calculator) shows the range for your mix, and a written quote confirms it.`,
      ],
    },
    {
      heading: "What automotive work has Esteban already published?",
      paragraphs: [
        "Website and lead-capture work rather than a car commercial, and the difference matters when you compare proposals. For [Fort Lauderdale Auto Sale](/portfolio/flas-concierge), a Buy-Here-Pay-Here dealership, he built the dealership web system, a financing calculator suite and an AI concierge that handles financing pre-qualification and inventory questions. For [Frontline Auto Repair](/portfolio/front-line-auto) he built the shop's web platform, the service-booking screens and a concierge bot for repair scheduling and bilingual intake. Both are 2026 projects.",
        "The portfolio does not yet hold a published vehicle video, so judge the editing on projects such as [Homeowners](/portfolio/homeowners), a social video he edited from footage supplied by the agency 300 Bees. If your dealership needs both the videos and the page they land on, the two halves can be scoped together.",
      ],
    },
    {
      heading: "What should a dealership send before asking for a quote?",
      paragraphs: [
        "Enough to price the work without a call. Say how many vehicles a month need a video and whether each one gets a vertical clip, a longer walkaround, or both. Name where the videos will run — the inventory page, Instagram, TikTok, YouTube or a paid ad — because each destination changes the length and the framing. If your team films the cars, send two or three original files straight off the phone, not copies saved from a messaging app, which arrive compressed.",
        `If you want Esteban on the lot, give the address, the days the inventory is ready to film and who moves the cars. Flag any deadline: the calculator applies a ${express} multiplier when express delivery is selected, and a fast turnaround is confirmed in writing, never assumed. Then [send the details](/contact) and ask for a scoped quote.`,
      ],
    },
  ],
};

export const DENTAL_DEEP_DIVE: DeepDive = {
  id: "dental-cost-and-proof",
  title: "How much does dental video cost, and what has been filmed for a clinic?",
  destinations: "Published price ranges, the Healthy Smile Miami project, and three decisions before filming day.",
  sections: [
    {
      heading: "How much does dental video marketing cost in Miami?",
      paragraphs: [
        `For a clinic that films on its own phones, the [Starter package](/pricing/starter) starts from ${starter} per project: you send the footage and receive it edited and formatted for Reels, TikTok, YouTube or web, with one revision round. A fuller short-form edit sits in the calculator's social band of ${social} per project, and a longer treatment explainer for YouTube or the clinic website in the ${youtube} band.`,
        `When the practice wants Esteban to film on site, [Local Presence](/pricing/local-presence) starts from ${local} per production day and covers pre-production, filming at the clinic and the editing afterwards. A clinic that wants a steady monthly rhythm can look at [Growth](/pricing/growth), from ${growth} a month with a content plan, a publishing calendar, editing and a monthly report. These are published starting points; the quote states the actual scope.`,
      ],
    },
    {
      heading: "What dental work has Esteban already filmed?",
      paragraphs: [
        "[Healthy Smile Miami](/portfolio/healthy-smile), a Miami dental clinic, in 2021. He was on assignment with the agency 300 Bees: he filmed on location, recording both video and sound, then edited and delivered the finished social-media videos for the clinic to publish. The published piece in the portfolio runs 18 seconds, the length a vertical clinic video usually has to work in.",
        "That project is the reason this page exists, and it is also its limit. It is one clinic and one agency engagement, not a long record of dental campaigns, and the portfolio publishes no patient numbers or results from it. Use it to judge the framing, the sound and the pacing, then ask how the same approach would fit your treatments, your team and the rooms you can film in.",
      ],
    },
    {
      heading: "What should a dental practice decide before filming day?",
      paragraphs: [
        "Three things, and none of them is about cameras. Who appears: a dentist, a hygienist, the front desk or a patient — and anyone recognisable gives permission before the clip is used. Which room: the quietest one with the most even light usually beats the most impressive one, because equipment running under a voice is the most common reason a take cannot be used.",
        "And what each video is for: one treatment explained, a tour that lowers first-visit nerves, or the answer to a question the front desk hears every day. Write those choices into the request, together with the platforms you post on and any date the videos must be ready. With that list the [budget calculator](/calculator) gives a range, and a scoped quote can follow without a round of questions.",
      ],
    },
  ],
};

export const MED_SPA_DEEP_DIVE: DeepDive = {
  id: "med-spa-cost-and-proof",
  title: "How much does med spa video cost, and what experience is behind it?",
  destinations: "Published price ranges, the closest published projects, and what makes a treatment video safe to post.",
  sections: [
    {
      heading: "How much does med spa video marketing cost in South Florida?",
      paragraphs: [
        `Most med spas start with footage they already film between appointments. Editing it is the cheapest route: the [Starter package](/pricing/starter) starts from ${starter} per project and returns your clips formatted for Reels, TikTok, YouTube or web, with one revision round, while a fuller short-form edit falls in the calculator's social band of ${social} per project.`,
        `A spa that wants a planned month rather than one-off edits can compare [Growth](/pricing/growth), from ${growth} a month with a content plan, a publishing calendar, editing and a monthly report. Filming in the treatment rooms is scoped on its own: [Local Presence](/pricing/local-presence) starts from ${local} per production day, with pre-production, filming at your business and editing, and a half-day capture add-on has an indicative range of ${onLocation}. Use the [budget calculator](/calculator) for your mix; the written quote is what confirms it.`,
      ],
    },
    {
      heading: "Has Esteban worked with beauty and clinic brands before?",
      paragraphs: [
        "Yes, though not with a med spa, and this page says so. For about six years he founded and ran Miracle Leaf ([ML Colombia](/portfolio/ml-colombia)), his own CBD-cosmetics e-commerce brand, leading its digital content, its strategy and two successive websites as CEO. That is the closest published experience to selling a skin or wellness treatment online: making a product look real on a small screen without overselling it.",
        "On the clinic side, he filmed and edited social-media videos for [Healthy Smile Miami](/portfolio/healthy-smile), a dental clinic, on assignment with the agency 300 Bees, recording video and sound on location. Neither project publishes before-and-after results or client numbers, so this page does not either. Ask about the work closest to your treatments when you talk.",
      ],
    },
    {
      heading: "What makes a med spa video safe to publish?",
      paragraphs: [
        "Matching shots, and words the clinic can stand behind. A before and after is only a comparison when the camera position, distance and light are the same in both frames; film the after in a brighter room and part of the difference on screen belongs to the lamp. Mark the spot on the floor and keep the setup fixed between the two.",
        "The words need the same care. Results, durations and safety statements are the provider's claims, so they come from the clinic, in the clinic's wording, rather than from an editor writing captions. Before filming, decide who appears, collect written permission from any client who is recognisable, and note which clips are cleared when you send them. The edit is then built only from material you can actually post.",
      ],
    },
  ],
};

export const YACHT_CHARTER_DEEP_DIVE: DeepDive = {
  id: "yacht-charter-cost-and-proof",
  title: "How much does yacht charter video cost, and what should you send?",
  destinations: "Editing and filming ranges, the closest published work, and the folder a charter company sends.",
  sections: [
    {
      heading: "How much does yacht charter video cost in Miami?",
      paragraphs: [
        `It depends mostly on whether someone has already filmed the boat. If the charter company or broker has footage — cruising, cabins, guests boarding — the edit is priced on its own: the calculator's social band runs ${social} for a short-form project and the YouTube band ${youtube} for a longer walkthrough. The [Starter package](/pricing/starter) starts from ${starter} per project for remote editing of footage you send, formatted for Reels, TikTok, YouTube or web, with one revision round.`,
        `Filming is separate. A half-day of on-location capture has an indicative range of ${onLocation}, and [Local Presence](/pricing/local-presence) starts from ${local} per production day with pre-production, filming and editing, across Fort Lauderdale, Broward and selected Miami-Dade projects. Aerial shots are edited from files you supply. The written quote confirms the scope.`,
      ],
    },
    {
      heading: "What published work is closest to a charter promo?",
      paragraphs: [
        "No yacht project is in the portfolio yet, so the honest comparison is with two kinds of work that are. [Bar Door Monkey Miami](/portfolio/bar-door-monkey) is a 55-second social promo for a Miami venue, filmed on location during the Soccer y Más show and delivered for the venue's Instagram: hospitality filmed while the place was working, which is the situation on a charter day.",
        "[Homeowners](/portfolio/homeowners) is the other half — a social video he edited from footage the agency 300 Bees supplied, the way most charter operators work when a crew or broker has already filmed. Watch both for pacing and for how much the edit tells you about the place. For marine-specific questions such as wind noise and multi-format cuts, the [yacht hospitality page](/services/yacht-hospitality-video-fort-lauderdale) has the detail.",
      ],
    },
    {
      heading: "What should a charter company send with its footage?",
      paragraphs: [
        "A folder and a short list. The folder holds the original files, not clips reposted from Instagram, because a social download has already lost the detail in a white hull and the water highlights. The list names the vessel, the specifications that are safe to publish, the departure marina, the booking contact and any shot that must not be used.",
        `Then say where each video goes: a calm horizontal edit for a broker listing or website, vertical cuts for Reels and TikTok, or both from the same footage. Add the date the listing or season goes live; the calculator applies a ${express} multiplier when express delivery is selected, and a fast delivery is confirmed in writing first. Pricing, availability and capacity stay the operator's to state.`,
      ],
    },
  ],
};

// ---------------------------------------------------------------- Spanish

export const AUTOMOTIVE_ES_DISCLOSURE = "¿Cuánto cuesta el video para concesionarios y qué hay publicado?";
export const AUTOMOTIVE_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta un video para un concesionario de autos en Miami?",
    paragraphs: [
      `Esteban publica sus rangos en lugar de esconderlos. Editar un video vertical corto cae en la banda social de la calculadora, de ${social} por proyecto, y un recorrido más largo editado para YouTube está en la banda de ${youtube}. Si el concesionario ya graba sus propios clips del inventario, el [paquete Arranque](/es/precios/arranque) parte de ${starter} por proyecto: envías el material y lo recibes con formato para Reels, TikTok, YouTube o web, con una ronda de revisión.`,
      `Grabar en el lote se cotiza aparte. [Presencia Local](/es/precios/presencia-local) parte de ${local} por día de producción e incluye la preproducción, la captura en tu negocio y la edición posterior, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. Cada cifra es un punto de partida indicativo: la [calculadora](/es/calculadora) muestra el rango de tu combinación y la cotización escrita lo confirma.`,
    ],
  },
  {
    heading: "¿Qué trabajo automotriz tiene Esteban publicado?",
    paragraphs: [
      "Trabajo de sitio web y captación de clientes, no un comercial de autos, y la diferencia importa al comparar propuestas. Para [Fort Lauderdale Auto Sale](/es/portafolio/flas-concierge), un concesionario Buy-Here-Pay-Here, construyó el sistema web del concesionario, un conjunto de calculadoras de financiamiento y un conserje con IA que atiende la precalificación de financiamiento y las preguntas de inventario. Para [Frontline Auto Repair](/es/portafolio/front-line-auto) construyó la plataforma web del taller, las pantallas de reserva y un bot para agendar reparaciones con atención bilingüe. Ambos son proyectos de 2026.",
      "El portafolio todavía no tiene un video de vehículos publicado, así que juzga la edición con proyectos como [Homeowners](/es/portafolio/homeowners), un video social que editó con material de la agencia 300 Bees. Si tu concesionario necesita los videos y también la página donde llegan, ambas partes se pueden cotizar juntas.",
    ],
  },
  {
    heading: "¿Qué debe enviar un concesionario antes de pedir una cotización?",
    paragraphs: [
      "Lo suficiente para cotizar sin una llamada. Di cuántos vehículos al mes necesitan video y si cada uno lleva un clip vertical, un recorrido largo o ambos. Indica dónde se publicarán — la página de inventario, Instagram, TikTok, YouTube o un anuncio pagado — porque cada destino cambia la duración y el encuadre. Si tu equipo graba los autos, envía dos o tres archivos originales directamente del teléfono, no copias guardadas desde una aplicación de mensajes, que llegan comprimidas.",
      `Si quieres a Esteban en el lote, da la dirección, los días en que el inventario está listo y quién mueve los autos. Señala cualquier fecha límite: la calculadora aplica un multiplicador de ${expressEs} cuando eliges entrega exprés, y una entrega rápida se confirma por escrito, nunca se da por hecha. Luego [envía los detalles](/es/contacto).`,
    ],
  },
];

export const DENTAL_ES_DISCLOSURE = "¿Cuánto cuesta el video para clínicas dentales y qué se ha grabado?";
export const DENTAL_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta el marketing de video para dentistas en Miami?",
    paragraphs: [
      `Para una clínica que graba con sus propios teléfonos, el [paquete Arranque](/es/precios/arranque) parte de ${starter} por proyecto: envías el material y lo recibes editado con formato para Reels, TikTok, YouTube o web, con una ronda de revisión. Una edición corta más completa está en la banda social de la calculadora, de ${social} por proyecto, y un video explicativo más largo para YouTube o el sitio de la clínica en la banda de ${youtube}.`,
      `Cuando la consulta quiere que Esteban grabe en el lugar, [Presencia Local](/es/precios/presencia-local) parte de ${local} por día de producción e incluye preproducción, captura en la clínica y edición. Para un ritmo mensual estable está [Crecimiento](/es/precios/crecimiento), desde ${growth} al mes, con plan de contenido, calendario de publicación, edición y reporte mensual. Son puntos de partida publicados; la cotización fija el alcance real.`,
    ],
  },
  {
    heading: "¿Qué trabajo dental ha grabado Esteban?",
    paragraphs: [
      "[Healthy Smile Miami](/es/portafolio/healthy-smile), una clínica dental de Miami, en 2021. Trabajó por encargo de la agencia 300 Bees: grabó en locación, video y sonido, y luego editó y entregó los videos terminados para las redes de la clínica. La pieza publicada en el portafolio dura 18 segundos, la duración con la que suele tener que funcionar un video vertical de clínica.",
      "Ese proyecto es la razón de esta página y también su límite. Es una clínica y un encargo de agencia, no un largo historial de campañas dentales, y el portafolio no publica cifras de pacientes ni resultados. Úsalo para juzgar el encuadre, el sonido y el ritmo, y pregunta cómo encajaría el mismo enfoque con tus tratamientos, tu equipo y los espacios donde se puede grabar.",
    ],
  },
  {
    heading: "¿Qué debe decidir una clínica dental antes del día de grabación?",
    paragraphs: [
      "Tres cosas, y ninguna tiene que ver con cámaras. Quién aparece: el dentista, una higienista, la recepción o un paciente — y cualquier persona reconocible da su permiso antes de usar el clip. Qué sala: la más silenciosa y con la luz más pareja suele ganarle a la más vistosa, porque un equipo funcionando debajo de una voz es la razón más común por la que una toma no sirve.",
      "Y para qué es cada video: explicar un tratamiento, un recorrido que baje los nervios de la primera visita o la respuesta a una pregunta que la recepción escucha todos los días. Escribe esas decisiones en tu solicitud, con las plataformas donde publicas y la fecha en que necesitas los videos. Con esa lista, la [calculadora](/es/calculadora) da un rango y la cotización llega sin rondas de preguntas.",
    ],
  },
];

export const MED_SPA_ES_DISCLOSURE = "¿Cuánto cuesta el video para clínicas estéticas y qué experiencia lo respalda?";
export const MED_SPA_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta el marketing de video para una clínica estética en Miami?",
    paragraphs: [
      `La mayoría de las clínicas estéticas empieza con el material que ya graba entre citas. Editarlo es la vía más económica: el [paquete Arranque](/es/precios/arranque) parte de ${starter} por proyecto y devuelve tus clips con formato para Reels, TikTok, YouTube o web, con una ronda de revisión, mientras que una edición corta más completa cae en la banda social de la calculadora, de ${social} por proyecto.`,
      `Si prefieres un mes planificado en vez de ediciones sueltas, compara [Crecimiento](/es/precios/crecimiento), desde ${growth} al mes, con plan de contenido, calendario de publicación, edición y reporte mensual. Grabar en las salas se cotiza aparte: [Presencia Local](/es/precios/presencia-local) parte de ${local} por día de producción, y la captura de medio día tiene un rango indicativo de ${onLocation}. La [calculadora](/es/calculadora) da tu rango; la cotización escrita lo confirma.`,
    ],
  },
  {
    heading: "¿Esteban ha trabajado con marcas de belleza y clínicas?",
    paragraphs: [
      "Sí, aunque no con una clínica estética, y esta página lo dice. Durante unos seis años fundó y dirigió Miracle Leaf ([ML Colombia](/es/portafolio/ml-colombia)), su propia marca de comercio electrónico de cosméticos con CBD, y como CEO lideró el contenido digital, la estrategia y dos sitios web sucesivos. Es la experiencia publicada más cercana a vender un tratamiento de piel o bienestar en línea: hacer que un producto se vea real en una pantalla pequeña sin exagerar.",
      "Del lado clínico, grabó y editó videos para redes de [Healthy Smile Miami](/es/portafolio/healthy-smile), una clínica dental, por encargo de la agencia 300 Bees, con video y sonido en locación. Ninguno de los dos proyectos publica resultados de antes y después ni cifras de clientes, así que esta página tampoco.",
    ],
  },
  {
    heading: "¿Qué hace que un video de clínica estética sea seguro de publicar?",
    paragraphs: [
      "Tomas que coinciden y palabras que la clínica puede respaldar. Un antes y después solo es una comparación cuando la posición de la cámara, la distancia y la luz son las mismas en ambas tomas; si grabas el después en una sala más iluminada, parte de la diferencia en pantalla es de la lámpara. Marca el punto en el piso y mantén la configuración fija.",
      "Las palabras requieren el mismo cuidado. Los resultados, la duración y las afirmaciones de seguridad son del proveedor, así que vienen de la clínica, con su redacción, y no de un editor que escribe subtítulos. Antes de grabar, decide quién aparece, consigue el permiso por escrito de cualquier cliente reconocible e indica qué clips están aprobados al enviarlos.",
    ],
  },
];

export const YACHT_CHARTER_ES_DISCLOSURE = "¿Cuánto cuesta el video para alquiler de yates y qué conviene enviar?";
export const YACHT_CHARTER_ES_SECTIONS: readonly SpanishNicheSection[] = [
  {
    heading: "¿Cuánto cuesta un video para alquiler de yates en Miami?",
    paragraphs: [
      `Depende sobre todo de si alguien ya grabó el barco. Si la empresa de alquiler o el bróker tiene material — navegación, cabinas, invitados abordando — la edición se cotiza sola: la banda social de la calculadora va de ${social} por proyecto corto y la banda de YouTube de ${youtube} para un recorrido más largo. El [paquete Arranque](/es/precios/arranque) parte de ${starter} por proyecto para editar a distancia el material que envías, con formato para Reels, TikTok, YouTube o web y una ronda de revisión.`,
      `La grabación va aparte. Medio día de captura en locación tiene un rango indicativo de ${onLocation}, y [Presencia Local](/es/precios/presencia-local) parte de ${local} por día de producción, con preproducción, captura y edición, en Fort Lauderdale, Broward y proyectos seleccionados en Miami-Dade. Las tomas aéreas se editan a partir de archivos que tú envías.`,
    ],
  },
  {
    heading: "¿Qué trabajo publicado se parece más a una promo de yates?",
    paragraphs: [
      "Todavía no hay un proyecto de yates en el portafolio, así que la comparación honesta es con dos tipos de trabajo que sí están. [Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) es una promo social de 55 segundos para un local de Miami, grabada en locación durante el programa Soccer y Más y entregada para el Instagram del local: hospitalidad grabada mientras el lugar funcionaba, como en un día de alquiler.",
      "[Homeowners](/es/portafolio/homeowners) es la otra mitad: un video social que editó con material suministrado por la agencia 300 Bees, como trabajan la mayoría de los operadores cuando un equipo o un bróker ya grabó. Míralos por el ritmo y por cuánto te dice la edición sobre el lugar. Para dudas náuticas como el viento o los cortes en varios formatos, revisa la [página de yates y hospitalidad](/es/video-para-yates-y-hospitalidad-fort-lauderdale).",
    ],
  },
  {
    heading: "¿Qué debe enviar una empresa de alquiler junto con su material?",
    paragraphs: [
      "Una carpeta y una lista corta. La carpeta lleva los archivos originales, no clips descargados de Instagram, porque una descarga de redes ya perdió el detalle del casco blanco y los brillos del agua. La lista nombra la embarcación, las especificaciones que se pueden publicar, la marina de salida, el contacto de reservas y cualquier toma que no se deba usar.",
      `Luego indica a dónde va cada video: una edición horizontal tranquila para el anuncio del bróker o el sitio web, cortes verticales para Reels y TikTok, o ambos con el mismo material. Agrega la fecha de lanzamiento; la calculadora aplica un multiplicador de ${expressEs} cuando eliges entrega exprés, y una entrega rápida se confirma primero por escrito. Precios y disponibilidad los publica el operador.`,
    ],
  },
];
