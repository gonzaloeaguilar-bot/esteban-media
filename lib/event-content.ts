/**
 * Copy for the annual-events section (/events, /es/eventos and one page per
 * event). Dates never appear here as literals: anything date-shaped is built
 * from lib/events.ts so there is exactly one place to refresh each year.
 *
 * Claim rules this copy follows:
 *   - Esteban has not filmed these events; each page says so and cites only
 *     real portfolio items, described as what they are.
 *   - No affiliation or endorsement is implied; names are descriptive only.
 *   - On-location filming is a paid add-on scoped per project. The core offer
 *     is planning, editing the client's own footage and recap edits.
 *   - Prices come from lib/pricing.ts through priceSentence(); no turnaround
 *     or availability is promised.
 */
import type { CraftCard, RelatedService, ServiceFaq } from "@/components/service-depth";
import {
  affiliationLabel,
  displayEdition,
  formatDateRange,
  formatIsoDate,
  getEvent,
  type AnnualEvent,
  type EventId,
  type EventLocale,
} from "@/lib/events";
import { priceSentence } from "@/lib/packages";
import { RAW_FILMING_RATES, SHORT_FORM, usd } from "@/lib/pricing";
const RAW_HALF_DAY = usd(RAW_FILMING_RATES.halfDay);
const RAW_FULL_DAY = usd(RAW_FILMING_RATES.fullDay);

/**
 * Meta descriptions, answer-first snippet test (overnight SEO/GEO loop, round 2;
 * the dated record is in the vault loop log, row 26). The old ones ran 150-199
 * characters and 8 of 16 were cut by Google or by clampDescription. Each now
 * says who, what and the starting price in under 160 characters. None of the
 * 16 URLs was indexed when this shipped (0 GSC rows in 90 days), so judge on
 * impressions and CTR 28 days after indexing, and revert after six weeks if the
 * event pages earn impressions and still 0 clicks. No date literals here:
 * lib/__tests__/events.test.ts keeps them out of the page copy.
 */
const FROM = usd(SHORT_FORM.perVideoFrom);

export type EventProof = { text: string; href: string; label: string };

export type EventPageCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  answer: { question: string; paragraphs: readonly string[] };
  audience: { heading: string; intro: string; items: readonly string[]; closing: string };
  plan: { heading: string; cards: readonly CraftCard[] };
  send: { heading: string; intro: string; items: readonly string[] };
  proof: EventProof;
  faqs: readonly ServiceFaq[];
  related: readonly RelatedService[];
  inquiry: { serviceName: string; goalPrompt: string; assetPrompt: string };
  /** Short description reused verbatim in Service JSON-LD (it is the visible lead). */
  serviceName: string;
};

const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);
// A venue that is a proper name ("Miami Beach Convention Center": every word
// capitalised) keeps its capital; a description ("Several Fort Lauderdale
// marinas…") reads mid-sentence in lower case. lowerFirst on every venue
// printed "at miami Beach Convention Center" on 4 event pages (loop round 4).
const venueMidSentence = (value: string) =>
  value.split(/\s+/).every((word) => !/^\p{Ll}/u.test(word)) ? value : lowerFirst(value);

/** The pricing paragraph every event page shares, built from the package prices. */
export function eventScopeSection(locale: EventLocale): { heading: string; paragraphs: string[] } {
  const starter = lowerFirst(priceSentence(locale, "arranque"));
  const growth = lowerFirst(priceSentence(locale, "crecimiento"));
  const onSite = lowerFirst(priceSentence(locale, "presencia-local"));
  if (locale === "es") {
    return {
      heading: "¿Cuánto cuesta el contenido para un evento y la grabación está incluida?",
      paragraphs: [
        `Los precios parten de los paquetes publicados. La edición de tu propio material es el paquete Arranque, ${starter}. Un calendario de contenido antes del evento, con edición durante el mes, es el plan Crecimiento, ${growth}. La grabación en locación es un servicio adicional pagado que se define por proyecto: el paquete Presencia Local empieza ${onSite}, y la cotización depende de los días, los lugares, el acceso y los entregables.`,
        "Cada proyecto recibe una cotización por escrito antes del evento, porque el alcance tiene que estar claro antes de grabar el primer clip. Esteban trabaja primero en español, con inglés intermedio, desde Fort Lauderdale; la edición y la planificación son remotas, así que tu equipo puede enviar los archivos desde el mismo evento.",
      ],
    };
  }
  return {
    heading: "What does event content cost, and is filming included?",
    paragraphs: [
      `Prices start from the published packages. Editing your own footage is the Starter package, ${starter}. A pre-event content calendar with editing across the month is the Growth plan, ${growth}. On-location filming is a paid add-on scoped per project: the Local Presence package starts ${onSite}, and the quote depends on the days, locations, access and deliverables.`,
      "Every project gets a written quote before the event, because the scope has to be clear before anyone records a clip. Esteban works Spanish-first, with intermediate English, from Fort Lauderdale; editing and planning are remote, so your team can send files straight from the event.",
    ],
  };
}

/**
 * A short, honest handoff decision card shared by the hub and event pages.
 * It helps an exhibitor decide what to include in the first message without
 * implying a transfer method, delivery time, or on-site access that has not
 * been confirmed in a written quote.
 */
export function eventFootageHandoffSection(locale: EventLocale): {
  heading: string;
  paragraphs: string[];
  items: readonly string[];
} {
  if (locale === "es") {
    return {
      heading: "¿Necesitas conservar material original del evento?",
      paragraphs: [
        "Dilo antes de pedir la cotización. Así Esteban puede separar lo que tu equipo necesita conservar como material original de las piezas que quieres editar para redes. El método de entrega, el acceso y cualquier edición se confirman por escrito según el alcance.",
      ],
      items: [
        "El evento, la ciudad y la fecha",
        "Las tomas o momentos que deben quedar como material original",
        "Una persona de contacto para recibir los archivos",
        "Si necesitas material original, videos editados o ambos",
      ],
    };
  }
  return {
    heading: "Need to keep original footage from the event?",
    paragraphs: [
      "Say so before you ask for a quote. It lets Esteban separate the moments your team needs to keep as original footage from the pieces you want edited for social. The delivery method, access and any editing are confirmed in writing for the actual scope.",
    ],
    items: [
      "The event, city and date",
      "The shots or moments that must remain as original footage",
      "One delivery contact for the files",
      "Whether you need original footage, edited videos, or both",
    ],
  };
}

/** Typical window, then the listed edition (if one is current), as one sentence. */
export function eventDatesSentence(event: AnnualEvent, locale: EventLocale, now?: Date): string {
  const edition = displayEdition(event, now);
  const typical = lowerFirst(event.typicalWindow[locale]);
  if (locale === "es") {
    if (!edition) {
      return `${event.name} normalmente ocurre ${typical.replace(/^normalmente /, "")}. Las guías de eventos todavía no publican la próxima edición, así que revisa las fechas en el sitio oficial.`;
    }
    const where = edition.where ? `, en ${venueMidSentence(edition.where.es)}` : "";
    const windows = edition.windows?.length
      ? ` (${edition.windows.map((w) => `${w.label.es}: ${formatDateRange(w.start, w.end, "es")}`).join("; ")})`
      : "";
    return `${event.name} normalmente ocurre ${typical.replace(/^normalmente /, "")}. Las guías de eventos publican la próxima edición ${formatDateRange(edition.start, edition.end, "es")}${where}${windows}. Esas fechas vienen de guías revisadas el ${formatIsoDate(edition.lastChecked, "es")}, no del organizador, así que confírmalas en el sitio oficial antes de planear alrededor de ellas.`;
  }
  if (!edition) {
    return `${event.name} is ${typical}. Event guides have not listed the next edition yet, so check the dates on the official site.`;
  }
  const where = edition.where ? `, at ${venueMidSentence(edition.where.en)}` : "";
  const windows = edition.windows?.length
    ? ` (${edition.windows.map((w) => `${w.label.en}: ${formatDateRange(w.start, w.end, "en")}`).join("; ")})`
    : "";
  return `${event.name} is ${typical}. Event guides list the next edition for ${formatDateRange(edition.start, edition.end, "en")}${where}${windows}. Those dates come from guide listings checked on ${formatIsoDate(edition.lastChecked, "en")}, not from the organizer, so confirm them on the official site before you plan around them.`;
}

function sharedFaqs(event: AnnualEvent, locale: EventLocale): ServiceFaq[] {
  if (locale === "es") {
    return [
      {
        question: `¿Esteban Moreno Media está afiliado a ${event.name}?`,
        answer: `No. Esteban Moreno Media no está afiliado, patrocinado ni respaldado por ${affiliationLabel(event, "es")} ni por sus organizadores. El nombre del evento se usa solo para describir cuándo ocurre el trabajo. Las reglas para expositores y participantes, los permisos de grabación y las credenciales dependen del evento y de tu propia reserva, así que confírmalos con el organizador antes de planear cualquier grabación en el lugar.`,
      },
      {
        question: "¿Esteban va a grabar en el evento?",
        answer:
          "Solo si lo contratas. El servicio principal es planificar y editar el material que graba tu equipo. La grabación en locación es un servicio adicional pagado, que se define por proyecto y se cotiza por escrito antes del evento, y depende del acceso que permita tu participación.",
      },
      { question: `¿Cuándo es ${event.name}?`, answer: eventDatesSentence(event, "es") },
    ];
  }
  return [
    {
      question: `Is Esteban Moreno Media affiliated with ${event.name}?`,
      answer: `No. Esteban Moreno Media is not affiliated with, sponsored by or endorsed by ${affiliationLabel(event, "en")}, or by the organizers. The event's name is used only to describe the timing of the work. Exhibitor and participant rules, filming permissions and credentials come from the event and from your own booking, so confirm them with the organizer before planning any on-site recording.`,
    },
    {
      question: "Will Esteban film at the event?",
      answer:
        "Only if you book it. The core service is planning and editing the footage your team records. On-location filming is a paid add-on, scoped per project and quoted in writing before the event, and it depends on the access your participation allows.",
    },
    { question: `When is ${event.name}?`, answer: eventDatesSentence(event, "en") },
  ];
}

type EventCopyBuilder = (event: AnnualEvent) => Record<EventLocale, EventPageCopy>;

const hubLink = (locale: EventLocale): RelatedService =>
  locale === "es"
    ? { title: "Todos los eventos del año", detail: "El calendario de eventos recurrentes del sur de Florida, por temporada.", href: "/es/eventos" }
    : { title: "All annual events", detail: "The recurring South Florida event calendar, by season.", href: "/events" };

const flibs: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Fort Lauderdale Boat Show Video & Content for Exhibitors",
    metaDescription:
      `Fort Lauderdale Boat Show content for yacht brokers, charters and marine brands: a pre-show calendar, your dock footage edited from ${FROM} per video, recaps.`,
    breadcrumb: "Fort Lauderdale boat show",
    eyebrow: "Fall · Fort Lauderdale marinas",
    h1: "Boat show content for Fort Lauderdale exhibitors, planned before the docks open.",
    lead: "Social content planning and editing for yacht brokers, charter companies and marine brands exhibiting at or selling around the Fort Lauderdale International Boat Show. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Boat show social content for Fort Lauderdale exhibitors",
    answer: {
      question: "How can a boat show exhibitor get social content without hiring a full crew?",
      paragraphs: [
        "Plan the content before the show, film what you can with your own team, and send the footage to an editor who turns it into posts while the show is still in people's feeds. Esteban Moreno Media is a Fort Lauderdale-based editor: he builds a pre-show content calendar, edits the clips your staff or captain record on the docks into Reels, TikTok and Shorts, and cuts post-show recap videos with English or Spanish captions.",
        "On-location filming is not included by default. If you want Esteban on the dock, it is a paid add-on scoped per project and quoted in writing before the show. The show usually runs in late October or early November across several marinas, so the useful work starts weeks earlier: listing videos, vessel walkthroughs and a posting plan approved before the gates open.",
      ],
    },
    audience: {
      heading: "Who is this boat show content plan for?",
      intro: "Small marine businesses that have plenty to show and not enough hands to post it during show week:",
      items: [
        "Yacht brokers with listings in the water at the show, or listings they want in front of buyers who are in town for it.",
        "Charter companies that use the week to book the season and need vessel and experience clips ready to send.",
        "Marine brands and exhibitors (electronics, gear, detailing, finance, insurance) with a booth or a demo to record.",
        "Local businesses selling around the show: restaurants, hospitality and services near the marinas that want to post while visitors are in town.",
      ],
      closing:
        "If someone on your team can hold a phone steady and send original files, the editing, captions and posting plan can be handled remotely.",
    },
    plan: {
      heading: "What does a before, during and after boat show content plan look like?",
      cards: [
        {
          title: "Before the show",
          detail:
            "A content calendar approved weeks ahead. It lists which vessels or products get a post, in what order, with which captions, and who records what on the docks. Listing walkthroughs and teasers are edited from footage you already have, so the first posts go out before opening day. Esteban also writes a shot list your team can follow between appointments: the arrival, the helm, the salon, the deck in late-afternoon light and a 20-second broker introduction.",
        },
        {
          title: "During the show",
          detail:
            "Your staff records short clips on the docks and uploads the original files to a shared folder at the end of each day. Esteban edits them into vertical posts that follow the calendar, with burned-in captions in English or Spanish so they work with the sound off on a crowded dock. Delivery timing during the show is agreed in writing beforehand; nothing here promises same-day turnaround. Someone filming on site is the paid on-location add-on.",
        },
        {
          title: "After the show",
          detail:
            "A recap edit of the vessels or products that drew interest, follow-up clips your brokers can send to buyers they met, and a longer cut for your website or listing pages. A recap is often more useful a week after the show, when buyers are comparing options and your video arrives with a clear next step. The plan closes with a list of what to film differently next year.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before the boat show?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "Your booth, slip or dock location as the show publishes it, and the days your team will be there.",
        "The vessels, listings or products to feature, in priority order, with the specs that are safe to publish.",
        "Any footage you already have: original files from phones, drones or a previous shoot, not reposted social clips.",
        "Your logo, brand colors, the accounts you post to, and whether captions should be in English, Spanish or both.",
        "Who on your team will record during the show, and whether you want to add paid on-location filming.",
        "Deadlines: when the first pre-show post should go live and when you want the recap.",
      ],
    },
    proof: {
      text: "Esteban has not filmed the Fort Lauderdale International Boat Show, and this page does not suggest he has. The closest published work is Homeowners, a social video he edited from footage another team supplied (the same handoff exhibitors use), and Bar Door Monkey Miami, a venue promo he filmed on location and edited.",
      href: "/portfolio/homeowners",
      label: "Watch Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Can the same footage work for listings after the show?",
        answer:
          "Usually, yes. Vessel walkthroughs and deck clips recorded during the show can be re-cut into horizontal listing videos and vertical posts later, as long as the files are originals and the vessel is shown accurately. Shots full of show signage or crowds may only make sense for the recap.",
      },
    ],
    related: [
      { title: "Yacht hospitality video", detail: "Editing for yacht charters, marine brokers and hospitality operators in Fort Lauderdale.", href: "/services/yacht-hospitality-video-fort-lauderdale" },
      { title: "Yacht charter video marketing", detail: "Charter promos, deck walkthroughs and open-water edits for Miami and Broward.", href: "/services/yacht-charter-video-marketing-miami" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "boat show content for my marine business",
      goalPrompt: "plan and edit posts before, during and after the Fort Lauderdale boat show",
      assetPrompt: "our booth or dock location, the vessels or products to feature and any footage we already have",
    },
  },
  es: {
    metaTitle: "Video para expositores del boat show de Fort Lauderdale",
    metaDescription:
      `Contenido para el boat show de Fort Lauderdale: calendario previo, edición de tu material en los muelles desde ${FROM} por video y resúmenes para brokers.`,
    breadcrumb: "Boat show de Fort Lauderdale",
    eyebrow: "Otoño · Marinas de Fort Lauderdale",
    h1: "Contenido para expositores del boat show de Fort Lauderdale, planificado antes de que abran los muelles.",
    lead: "Planificación y edición de contenido para redes para brokers de yates, empresas de chárter y marcas náuticas que exponen en el Fort Lauderdale International Boat Show o venden alrededor de él. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido para redes para expositores del boat show de Fort Lauderdale",
    answer: {
      question: "¿Cómo puede un expositor del boat show tener contenido para redes sin contratar un equipo completo?",
      paragraphs: [
        "Planifica el contenido antes del show, graba lo que puedas con tu propio equipo y envía el material a un editor que lo convierta en publicaciones mientras el show sigue en el feed de la gente. Esteban Moreno Media es un editor con base en Fort Lauderdale: arma un calendario de contenido antes del show, edita los clips que tu personal o tu capitán graban en los muelles para Reels, TikTok y Shorts, y prepara videos resumen con subtítulos en español o inglés al terminar.",
        "La grabación en locación no está incluida por defecto. Si quieres a Esteban en el muelle, es un servicio adicional pagado que se define por proyecto y se cotiza por escrito antes del show. El evento suele ser a finales de octubre o principios de noviembre en varias marinas, así que el trabajo útil empieza semanas antes: videos de los listados, recorridos por las embarcaciones y un plan de publicaciones aprobado antes de la apertura.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido del boat show?",
      intro: "Para negocios náuticos pequeños que tienen mucho que mostrar y pocas manos para publicarlo durante la semana del show:",
      items: [
        "Brokers de yates con embarcaciones en el agua durante el show, o con listados que quieren mostrar a compradores que están en la ciudad por el evento.",
        "Empresas de chárter que aprovechan la semana para llenar la temporada y necesitan clips de la embarcación y de la experiencia listos para enviar.",
        "Marcas y expositores náuticos (electrónica, equipos, detallado, financiamiento, seguros) con un stand o una demostración que grabar.",
        "Negocios que venden alrededor del show: restaurantes, hospitalidad y servicios cerca de las marinas que quieren publicar mientras los visitantes están en la ciudad.",
      ],
      closing:
        "Si alguien de tu equipo puede sostener el celular con firmeza y enviar los archivos originales, la edición, los subtítulos y el plan de publicaciones se manejan de forma remota.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después del boat show?",
      cards: [
        {
          title: "Antes del show",
          detail:
            "Un calendario de contenido aprobado con semanas de anticipación. Define qué embarcaciones o productos tienen publicación, en qué orden, con qué textos y quién graba qué en los muelles. Los recorridos y los adelantos se editan con material que ya tienes, para que las primeras publicaciones salgan antes del día de apertura. Esteban también escribe una lista de tomas que tu equipo puede seguir entre citas: la llegada, el puesto de mando, el salón, la cubierta con la luz de la tarde y una presentación de 20 segundos del broker.",
        },
        {
          title: "Durante el show",
          detail:
            "Tu personal graba clips cortos en los muelles y sube los archivos originales a una carpeta compartida al final de cada día. Esteban los edita como publicaciones verticales que siguen el calendario, con subtítulos en español o inglés para que funcionen sin sonido en un muelle lleno de gente. Los tiempos de entrega durante el show se acuerdan por escrito antes; nada de esto promete entregas el mismo día. Tener a alguien grabando en el lugar es el servicio adicional pagado de grabación en locación.",
        },
        {
          title: "Después del show",
          detail:
            "Un video resumen de las embarcaciones o productos que generaron interés, clips de seguimiento que tus brokers pueden enviar a los compradores que conocieron y una versión más larga para tu sitio web o tus listados. Un resumen suele servir más una semana después del show, cuando los compradores comparan opciones y tu video llega con un siguiente paso claro. El plan cierra con una lista de lo que conviene grabar distinto el próximo año.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes del boat show?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "La ubicación de tu stand, slip o muelle tal como la publica el show, y los días en que tu equipo va a estar allí.",
        "Las embarcaciones, listados o productos que quieres destacar, en orden de prioridad, con las especificaciones que se pueden publicar.",
        "El material que ya tengas: archivos originales de celulares, drones o una grabación anterior, no clips descargados de redes.",
        "Tu logo, tus colores de marca, las cuentas donde publicas y si los subtítulos van en español, inglés o ambos.",
        "Quién de tu equipo va a grabar durante el show y si quieres sumar la grabación en locación pagada.",
        "Fechas límite: cuándo debe salir la primera publicación antes del show y cuándo quieres el resumen.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado el Fort Lauderdale International Boat Show, y esta página no lo sugiere. El trabajo publicado más cercano es Homeowners, un video para redes que editó a partir del material que entregó otro equipo (el mismo tipo de entrega que usan los expositores), y Bar Door Monkey Miami, la promoción de un local que grabó en locación y editó.",
      href: "/es/portafolio/homeowners",
      label: "Ver Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿El mismo material sirve para los listados después del show?",
        answer:
          "Normalmente sí. Los recorridos y los clips de cubierta grabados durante el show se pueden reeditar después como videos horizontales para listados y publicaciones verticales, siempre que sean archivos originales y la embarcación se muestre con precisión. Las tomas llenas de letreros del show o de gente quizá solo tengan sentido para el resumen.",
      },
    ],
    related: [
      { title: "Video para yates y hospitalidad", detail: "Edición para chárters, brokers náuticos y hospitalidad en Fort Lauderdale.", href: "/es/video-para-yates-y-hospitalidad-fort-lauderdale" },
      { title: "Marketing de video para alquiler de yates", detail: "Promociones de chárter, recorridos de cubierta y ediciones en el agua.", href: "/es/marketing-de-video-para-alquiler-de-yates-miami" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido del boat show para mi negocio náutico",
      goalPrompt: "planificar y editar publicaciones antes, durante y después del boat show de Fort Lauderdale",
      assetPrompt: "la ubicación de nuestro stand o muelle, las embarcaciones o productos a destacar y el material que ya tenemos",
    },
  },
});

const artBasel: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Art Basel Miami Beach Content for Galleries & Pop-Ups",
    metaDescription:
      `Art Basel Miami Beach content for galleries, pop-ups, restaurants and venues: an Art Week calendar, your footage edited from ${FROM} per video, and recaps.`,
    breadcrumb: "Art Basel Miami Beach",
    eyebrow: "Fall · Miami Beach and Miami",
    h1: "Art Week content for galleries, pop-ups and venues, planned before the fair opens.",
    lead: `Social content planning and editing for galleries, brand activations, pop-ups, restaurants and venues working during Art Basel Miami Beach and Miami Art Week. Esteban films key moments as a paid add-on (raw filming from ${usd(RAW_FILMING_RATES.halfDay)} half-day / ${usd(RAW_FILMING_RATES.fullDay)} full-day) or edits your supplied footage from ${FROM} per video.`,
    serviceName: "Art Week social content for galleries, pop-ups and venues",
    answer: {
      question: "How can a gallery or pop-up get Art Week content without a production crew?",
      paragraphs: [
        "Decide what you will post before the week starts, record short clips with your own team while it happens, and have an editor turn them into posts and a recap. Esteban Moreno Media, based in Fort Lauderdale, plans a pre-week content calendar, edits the footage your staff records at the booth, the installation or the venue into Reels, TikTok and Shorts, and cuts recap videos with English or Spanish captions.",
        "Art Basel Miami Beach usually takes place in the first week of December, inside a wider Miami Art Week of satellite fairs, openings and brand events, so most of the useful work happens before it: teasers of the work or the space, a post that says where to find you, and a posting order agreed in advance. On-location filming is a paid add-on, scoped per project and quoted in writing.",
      ],
    },
    audience: {
      heading: "Who is this Art Week content plan for?",
      intro: "Small teams with a space, a booth or a menu to show during the busiest week on Miami's art calendar:",
      items: [
        "Galleries and artists showing at the fair or at a satellite fair, who need the work documented and posted while collectors are in town.",
        "Brands running an activation, a pop-up shop or a sponsored lounge that has to post daily without a dedicated social team.",
        "Restaurants, bars and hotels near the fairs that build a special menu, event or late opening around the week.",
        "Venues hosting openings, talks or private dinners that want a recap to sell next year's dates.",
      ],
      closing:
        "Artworks and installations need permission to be filmed and posted. Confirm rights with the artist, the gallery and the venue before anything is recorded.",
    },
    plan: {
      heading: "What does a before, during and after Art Week content plan look like?",
      cards: [
        {
          title: "Before the week",
          detail:
            "A posting calendar for the days leading up to it, with teasers of the work, the space or the menu, and one clear post that says where and when to find you. Footage from last year or photos of the pieces become the first edits. Esteban also prepares a simple shot list for whoever will record: the entrance, the room at its quietest, a detail of each piece, a short host introduction and the crowd at its best moment.",
        },
        {
          title: "During the week",
          detail:
            "Your team records short clips and sends original files to a shared folder each day. Esteban edits them into vertical posts with captions in English or Spanish, keeping titles, artist names and credits accurate. Busy rooms and mixed lighting are common, so the edit favors clean, steady moments over long handheld walks. Delivery timing is agreed in writing before the week; no same-day turnaround is promised. On-site filming is the paid on-location add-on.",
        },
        {
          title: "After the week",
          detail:
            "A recap edit of the space, the work or the event, cut for Instagram and for your website or newsletter, plus short clips you can send to the collectors, guests or partners you met. A recap posted the following week keeps the conversation going once attention moves on, and it becomes the reference footage for next December's plan.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before Art Week?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "Where you will be: the fair, satellite fair, venue or address as published, and your hours for the week.",
        "What you are showing: artworks, artists, products or menu items, with the names and credits that must appear correctly.",
        "Permissions: which works and spaces can be filmed and posted, and anything that cannot be shown.",
        "Existing footage or photos as original files, plus your logo, fonts and the accounts you post to.",
        "Caption language: English, Spanish or both, and the tone your accounts use.",
        "Who will record during the week, and whether you want to add paid on-location filming.",
      ],
    },
    proof: {
      text: "Esteban has not filmed Art Basel Miami Beach or Miami Art Week, and this page does not suggest he has. The closest published work is Bar Door Monkey Miami, a promo for a Miami restaurant that he filmed on location and edited for the venue's Instagram, and Diana & Jack, a wedding film shot in Boston where he was the videographer and editor of the full film and a highlight trailer.",
      href: "/portfolio/bar-door-monkey",
      label: "Watch Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Can artwork appear in the videos?",
        answer:
          "Only with permission. Artworks are usually protected by the artist's rights, and fairs and venues have their own filming rules. Send Esteban a list of the pieces and spaces cleared for posting, with the credits that must appear, and the edit will use only those. When in doubt, the video can focus on the space, the guests and the experience instead of the work itself.",
      },
    ],
    related: [
      { title: "Nightlife and event video editing", detail: "Recaps and promo reels for venues, parties and late events in Miami.", href: "/services/nightlife-event-video-editing-miami" },
      { title: "Restaurant promo video editing", detail: "Menu, dish and atmosphere edits for restaurants running a special week.", href: "/services/restaurant-promo-video-editing-miami" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "Art Week content for my gallery, pop-up or venue",
      goalPrompt: "plan and edit posts before, during and after Art Basel Miami Beach week",
      assetPrompt: "where we will be, what we are showing, what we are allowed to film and any footage we already have",
    },
  },
  es: {
    metaTitle: "Contenido de Art Basel Miami Beach para galerías y pop-ups",
    metaDescription:
      `Contenido para Art Basel Miami Beach: calendario de Art Week, edición de tu material desde ${FROM} por video y resúmenes para galerías, pop-ups y restaurantes.`,
    breadcrumb: "Art Basel Miami Beach",
    eyebrow: "Otoño · Miami Beach y Miami",
    h1: "Contenido de Art Week para galerías, pop-ups y locales, planificado antes de que abra la feria.",
    lead: `Planificación y edición de contenido para redes para galerías, activaciones de marca, pop-ups, restaurantes y locales que trabajan durante Art Basel Miami Beach y la Miami Art Week. Esteban graba momentos clave como servicio adicional pagado (grabación en bruto desde ${usd(RAW_FILMING_RATES.halfDay)} media jornada / ${usd(RAW_FILMING_RATES.fullDay)} jornada completa) o edita tu propio material desde ${FROM} por video.`,
    serviceName: "Contenido para redes de Art Week para galerías, pop-ups y locales",
    answer: {
      question: "¿Cómo puede una galería o un pop-up tener contenido de Art Week sin un equipo de producción?",
      paragraphs: [
        "Decide qué vas a publicar antes de que empiece la semana, graba clips cortos con tu propio equipo mientras ocurre y deja que un editor los convierta en publicaciones y en un resumen. Esteban Moreno Media, con base en Fort Lauderdale, arma un calendario de contenido previo, edita el material que tu personal graba en el stand, la instalación o el local para Reels, TikTok y Shorts, y prepara videos resumen con subtítulos en español o inglés.",
        "Art Basel Miami Beach suele ser la primera semana de diciembre, dentro de una Miami Art Week más amplia, con ferias satélite, inauguraciones y eventos de marca, así que la mayor parte del trabajo útil ocurre antes: adelantos de la obra o del espacio, una publicación que diga dónde encontrarte y un orden de publicaciones acordado. La grabación en locación es un servicio adicional pagado, definido por proyecto y cotizado por escrito.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido de Art Week?",
      intro: "Para equipos pequeños con un espacio, un stand o un menú que mostrar durante la semana más intensa del calendario de arte de Miami:",
      items: [
        "Galerías y artistas que exponen en la feria o en una feria satélite y necesitan documentar y publicar la obra mientras los coleccionistas están en la ciudad.",
        "Marcas con una activación, una tienda pop-up o un lounge patrocinado que deben publicar a diario sin un equipo de redes dedicado.",
        "Restaurantes, bares y hoteles cerca de las ferias que preparan un menú especial, un evento o un horario extendido para esa semana.",
        "Locales que reciben inauguraciones, charlas o cenas privadas y quieren un resumen para vender las fechas del próximo año.",
      ],
      closing:
        "Las obras y las instalaciones necesitan permiso para grabarse y publicarse. Confirma los derechos con el artista, la galería y el local antes de grabar.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después de Art Week?",
      cards: [
        {
          title: "Antes de la semana",
          detail:
            "Un calendario de publicaciones para los días previos, con adelantos de la obra, el espacio o el menú, y una publicación clara que diga dónde y cuándo encontrarte. El material del año pasado o las fotos de las piezas se convierten en las primeras ediciones. Esteban también prepara una lista sencilla de tomas para quien vaya a grabar: la entrada, la sala en su momento más tranquilo, un detalle de cada pieza, una presentación corta del anfitrión y el público en su mejor momento.",
        },
        {
          title: "Durante la semana",
          detail:
            "Tu equipo graba clips cortos y envía los archivos originales a una carpeta compartida cada día. Esteban los edita como publicaciones verticales con subtítulos en español o inglés, cuidando que los títulos, los nombres de los artistas y los créditos estén correctos. Las salas llenas y la luz mezclada son comunes, así que la edición prioriza momentos limpios y estables antes que recorridos largos con la cámara en mano. Los tiempos de entrega se acuerdan por escrito antes de la semana; no se promete entrega el mismo día. Grabar en el lugar es el servicio adicional pagado de locación.",
        },
        {
          title: "Después de la semana",
          detail:
            "Un video resumen del espacio, la obra o el evento, adaptado para Instagram y para tu sitio web o newsletter, además de clips cortos que puedes enviar a los coleccionistas, invitados o aliados que conociste. Un resumen publicado la semana siguiente mantiene viva la conversación cuando la atención ya se movió, y se convierte en el material de referencia para el plan del próximo diciembre.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes de Art Week?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "Dónde vas a estar: la feria, la feria satélite, el local o la dirección tal como se publicó, y tus horarios de esa semana.",
        "Qué vas a mostrar: obras, artistas, productos o platos, con los nombres y créditos que deben aparecer correctamente.",
        "Permisos: qué obras y espacios se pueden grabar y publicar, y qué no se puede mostrar.",
        "Material o fotos existentes como archivos originales, además de tu logo, tus tipografías y las cuentas donde publicas.",
        "Idioma de los subtítulos: español, inglés o ambos, y el tono que usas en tus cuentas.",
        "Quién va a grabar durante la semana y si quieres sumar la grabación en locación pagada.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado Art Basel Miami Beach ni la Miami Art Week, y esta página no lo sugiere. El trabajo publicado más cercano es Bar Door Monkey Miami, la promoción de un restaurante de Miami que grabó en locación y editó para el Instagram del lugar, y Diana & Jack, una película de boda grabada en Boston en la que fue videógrafo y editor de la película completa y de un tráiler de resumen.",
      href: "/es/portafolio/bar-door-monkey",
      label: "Ver Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Las obras de arte pueden aparecer en los videos?",
        answer:
          "Solo con permiso. Las obras suelen estar protegidas por los derechos del artista, y las ferias y los locales tienen sus propias reglas de grabación. Envíale a Esteban una lista de las piezas y espacios autorizados para publicar, con los créditos que deben aparecer, y la edición usará solo esos. Si hay dudas, el video puede enfocarse en el espacio, los invitados y la experiencia en lugar de la obra.",
      },
    ],
    related: [
      { title: "Edición de video para discotecas y eventos", detail: "Resúmenes y reels promocionales para locales, fiestas y eventos nocturnos en Miami.", href: "/es/edicion-de-video-para-discotecas-y-eventos-miami" },
      { title: "Edición de video promocional para restaurantes", detail: "Menú, platos y ambiente para restaurantes con una semana especial.", href: "/es/edicion-de-video-promocional-para-restaurantes-miami" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido de Art Week para mi galería, pop-up o local",
      goalPrompt: "planificar y editar publicaciones antes, durante y después de la semana de Art Basel Miami Beach",
      assetPrompt: "dónde vamos a estar, qué vamos a mostrar, qué podemos grabar y el material que ya tenemos",
    },
  },
});

const miamiBoatShow: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Miami Boat Show Video & Content for Marine Exhibitors",
    metaDescription:
      `Miami International Boat Show content for dealers, brokers and charters: a pre-show calendar, your footage edited from ${FROM} per video, and post-show recaps.`,
    breadcrumb: "Miami International Boat Show",
    eyebrow: "Winter · Miami",
    h1: "Miami boat show content for dealers, brokers and marine brands, planned before opening day.",
    lead: "Social content planning and editing for boat dealers, yacht brokers, charter companies and marine brands exhibiting at or selling around the Miami International Boat Show. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Boat show social content for Miami exhibitors",
    answer: {
      question: "How can a Miami boat show exhibitor keep posting without a production crew?",
      paragraphs: [
        "Treat the show as a content calendar with a fixed start date. Approve the posts before February, give your own staff a short shot list, and send the footage to an editor who turns it into Reels, TikTok and Shorts during and after the show. Esteban Moreno Media, based in Fort Lauderdale, plans that calendar, edits the clips your team records at the booth or on the water, and cuts recap and follow-up videos with English or Spanish captions.",
        "Many South Florida marine businesses also exhibit in Fort Lauderdale in the fall, so the Miami show is a second chance to use what worked: the same shot list, better hooks and new models. On-location filming is not included by default; it is a paid add-on scoped per project and quoted in writing before the show.",
      ],
    },
    audience: {
      heading: "Who is this Miami boat show content plan for?",
      intro: "Marine businesses with new models, listings or services to show in a short window:",
      items: [
        "Boat dealers and builders showing models, who need walkarounds and feature clips posted while buyers are comparing.",
        "Yacht brokers and charter companies using the show to meet buyers and guests from out of town.",
        "Engine, electronics, gear and accessory brands with a booth demo that explains the product better on video than in a brochure.",
        "Marine services (financing, insurance, detailing, storage, training) that sell to the people walking the show.",
      ],
      closing:
        "Most of the footage can come from your own team's phones. What matters is original files, steady shots and a plan for which product each clip is about.",
    },
    plan: {
      heading: "What does a before, during and after Miami boat show content plan look like?",
      cards: [
        {
          title: "Before the show",
          detail:
            "A calendar approved before February: which models or services get a post, in what order, with which captions and calls to action. Teasers and walkarounds are edited from footage you already have, including clips from the Fort Lauderdale show if you exhibited there. Esteban writes a shot list for your booth team: the hero angle of each model, the helm and controls, one feature per clip, a short staff introduction and the booth at its busiest.",
        },
        {
          title: "During the show",
          detail:
            "Your team records between conversations and drops original files in a shared folder each evening. Esteban edits them into vertical posts that follow the calendar, with captions in English or Spanish so they work on mute, and keeps model names and specs exactly as you provide them. Delivery timing during the show is agreed in writing beforehand; same-day turnaround is not promised. Filming on site is the paid on-location add-on.",
        },
        {
          title: "After the show",
          detail:
            "A recap of the show for your feed, short follow-up clips your sales team can send to the people they met, and horizontal cuts of each model for your website and listings. Sending a buyer a clip of the exact model they asked about is often the most useful video of the whole show. The plan closes with notes for the fall show in Fort Lauderdale.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before the Miami boat show?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "Your booth or slip location as published, the show days you will staff, and your sales contacts.",
        "The models, listings or products to feature, in priority order, with the specs you are allowed to publish.",
        "Original footage you already have, including any from earlier shows or sea trials.",
        "Your logo, brand guidelines, the accounts you post to and the caption language: English, Spanish or both.",
        "Any manufacturer or show rules about filming, music or branding in the booth.",
        "Who will record during the show, and whether you want to add paid on-location filming.",
      ],
    },
    proof: {
      text: "Esteban has not filmed the Miami International Boat Show, and this page does not suggest he has. The closest published work is Homeowners, a social video he edited from footage another team supplied, which is the handoff this plan relies on, and Bar Door Monkey Miami, a venue promo he filmed on location and edited.",
      href: "/portfolio/homeowners",
      label: "Watch Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Can one plan cover both the Fort Lauderdale and Miami boat shows?",
        answer:
          "Yes. Many marine businesses exhibit at both, a few months apart. One plan can share the shot list, caption style and templates across the two shows, with separate calendars and recaps for each. Footage from the fall show often becomes the teaser material for Miami.",
      },
    ],
    related: [
      { title: "Fort Lauderdale boat show content", detail: "The same before, during and after plan for the fall show.", href: "/events/fort-lauderdale-boat-show-video" },
      { title: "Yacht charter video marketing", detail: "Charter promos, deck walkthroughs and open-water edits for Miami and Broward.", href: "/services/yacht-charter-video-marketing-miami" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "Miami boat show content for my marine business",
      goalPrompt: "plan and edit posts before, during and after the Miami International Boat Show",
      assetPrompt: "our booth location, the models or products to feature and any footage we already have",
    },
  },
  es: {
    metaTitle: "Video para expositores del Miami International Boat Show",
    metaDescription:
      `Contenido para el Miami International Boat Show: calendario previo, edición de tu material desde ${FROM} por video y resúmenes para concesionarios y brokers.`,
    breadcrumb: "Miami International Boat Show",
    eyebrow: "Invierno · Miami",
    h1: "Contenido del boat show de Miami para concesionarios, brokers y marcas náuticas, planificado antes de la apertura.",
    lead: "Planificación y edición de contenido para redes para concesionarios de botes, brokers de yates, empresas de chárter y marcas náuticas que exponen en el Miami International Boat Show o venden alrededor de él. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido para redes para expositores del boat show de Miami",
    answer: {
      question: "¿Cómo puede un expositor del boat show de Miami seguir publicando sin un equipo de producción?",
      paragraphs: [
        "Trata el show como un calendario de contenido con fecha fija. Aprueba las publicaciones antes de febrero, dale a tu personal una lista corta de tomas y envía el material a un editor que lo convierta en Reels, TikTok y Shorts durante y después del show. Esteban Moreno Media, con base en Fort Lauderdale, arma ese calendario, edita los clips que tu equipo graba en el stand o en el agua y prepara videos resumen y de seguimiento con subtítulos en español o inglés.",
        "Muchos negocios náuticos del sur de Florida también exponen en Fort Lauderdale en otoño, así que el show de Miami es una segunda oportunidad para usar lo que funcionó: la misma lista de tomas, mejores ganchos y modelos nuevos. La grabación en locación no está incluida por defecto; es un servicio adicional pagado que se define por proyecto y se cotiza por escrito antes del show.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido del boat show de Miami?",
      intro: "Para negocios náuticos con modelos, listados o servicios nuevos que mostrar en poco tiempo:",
      items: [
        "Concesionarios y fabricantes que exhiben modelos y necesitan recorridos y clips de características publicados mientras los compradores comparan.",
        "Brokers de yates y empresas de chárter que usan el show para conocer compradores e invitados de fuera de la ciudad.",
        "Marcas de motores, electrónica, equipos y accesorios con una demostración en el stand que se explica mejor en video que en un folleto.",
        "Servicios náuticos (financiamiento, seguros, detallado, almacenamiento, capacitación) que le venden a quienes recorren el show.",
      ],
      closing:
        "La mayor parte del material puede salir de los celulares de tu propio equipo. Lo importante es enviar archivos originales, tomas estables y un plan de qué producto muestra cada clip.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después del boat show de Miami?",
      cards: [
        {
          title: "Antes del show",
          detail:
            "Un calendario aprobado antes de febrero: qué modelos o servicios tienen publicación, en qué orden, con qué textos y qué llamada a la acción. Los adelantos y recorridos se editan con material que ya tienes, incluidos clips del show de Fort Lauderdale si expusiste allí. Esteban escribe una lista de tomas para el equipo del stand: el ángulo principal de cada modelo, el puesto de mando y los controles, una característica por clip, una presentación corta del personal y el stand en su momento de más movimiento.",
        },
        {
          title: "Durante el show",
          detail:
            "Tu equipo graba entre conversaciones y deja los archivos originales en una carpeta compartida cada noche. Esteban los edita como publicaciones verticales que siguen el calendario, con subtítulos en español o inglés para que funcionen sin sonido, y respeta los nombres de los modelos y las especificaciones tal como se los envías. Los tiempos de entrega durante el show se acuerdan por escrito antes; no se promete entrega el mismo día. Grabar en el lugar es el servicio adicional pagado de locación.",
        },
        {
          title: "Después del show",
          detail:
            "Un resumen del show para tu feed, clips cortos de seguimiento que tu equipo de ventas puede enviar a las personas que conoció y versiones horizontales de cada modelo para tu sitio web y tus listados. Enviarle a un comprador un clip del modelo exacto por el que preguntó suele ser el video más útil de todo el show. El plan cierra con notas para el show de otoño en Fort Lauderdale.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes del boat show de Miami?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "La ubicación de tu stand o slip tal como se publicó, los días que vas a atender y tus contactos de ventas.",
        "Los modelos, listados o productos a destacar, en orden de prioridad, con las especificaciones que se pueden publicar.",
        "El material original que ya tengas, incluido el de shows anteriores o pruebas en el agua.",
        "Tu logo, tu guía de marca, las cuentas donde publicas y el idioma de los subtítulos: español, inglés o ambos.",
        "Las reglas del fabricante o del show sobre grabación, música o marcas dentro del stand.",
        "Quién va a grabar durante el show y si quieres sumar la grabación en locación pagada.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado el Miami International Boat Show, y esta página no lo sugiere. El trabajo publicado más cercano es Homeowners, un video para redes que editó a partir del material que entregó otro equipo, que es justo la entrega en la que se basa este plan, y Bar Door Monkey Miami, la promoción de un local que grabó en locación y editó.",
      href: "/es/portafolio/homeowners",
      label: "Ver Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Un mismo plan puede cubrir los boat shows de Fort Lauderdale y de Miami?",
        answer:
          "Sí. Muchos negocios náuticos exponen en los dos, con pocos meses de diferencia. Un solo plan puede compartir la lista de tomas, el estilo de subtítulos y las plantillas entre ambos shows, con calendarios y resúmenes separados para cada uno. El material del show de otoño muchas veces se convierte en los adelantos para Miami.",
      },
    ],
    related: [
      { title: "Contenido para el boat show de Fort Lauderdale", detail: "El mismo plan de antes, durante y después para el show de otoño.", href: "/es/eventos/video-para-el-boat-show-de-fort-lauderdale" },
      { title: "Marketing de video para alquiler de yates", detail: "Promociones de chárter, recorridos de cubierta y ediciones en el agua.", href: "/es/marketing-de-video-para-alquiler-de-yates-miami" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido del boat show de Miami para mi negocio náutico",
      goalPrompt: "planificar y editar publicaciones antes, durante y después del Miami International Boat Show",
      assetPrompt: "la ubicación de nuestro stand, los modelos o productos a destacar y el material que ya tenemos",
    },
  },
});

const sobewff: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "South Beach Wine & Food Festival Content for Restaurants",
    metaDescription:
      `South Beach Wine & Food Festival content for restaurants, chefs and drink brands: a pre-festival calendar, your footage edited from ${FROM} per video, recaps.`,
    breadcrumb: "South Beach Wine & Food Festival",
    eyebrow: "Winter · Miami Beach and Miami",
    h1: "Festival content for restaurants, chefs and food brands, planned before the first tasting.",
    lead: "Social content planning and editing for restaurants, chefs, food and beverage brands and venues taking part in or selling around the South Beach Wine & Food Festival. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Festival social content for restaurants, chefs and food brands",
    answer: {
      question: "How can a restaurant or food brand turn the festival into social content?",
      paragraphs: [
        "Plan the posts before festival week, record the dishes, pours and moments with your own team, and have an editor turn the footage into Reels, TikTok and Shorts plus a recap. Esteban Moreno Media, based in Fort Lauderdale, builds the pre-festival calendar, edits the clips your kitchen, bar or booth team records, and cuts recap videos with English or Spanish captions for your restaurant's accounts.",
        "The festival usually takes place in late February. If you are not on the official program, the same plan still works for the week around it: a festival-week menu, a dinner, a tasting or a pop-up promoted to the visitors in town. On-location filming is a paid add-on scoped per project and quoted in writing.",
      ],
    },
    audience: {
      heading: "Who is this festival content plan for?",
      intro: "Food and drink businesses that want festival week on their feed, whether or not they are on the program:",
      items: [
        "Restaurants and chefs taking part in a festival dinner, tasting or demo who want the dish and the moment documented.",
        "Wine, spirits and food brands pouring or sampling at an event, who need short clips for their own accounts and their distributors.",
        "Restaurants and bars not on the program that build a special menu, brunch or happy hour for the festival crowd.",
        "Caterers, bakeries and suppliers working behind the scenes who can show the work with permission from the host.",
      ],
      closing:
        "Festival events have their own rules about filming, logos and music. Confirm them with the organizer or host before anything is recorded on their premises.",
    },
    plan: {
      heading: "What does a before, during and after festival content plan look like?",
      cards: [
        {
          title: "Before the festival",
          detail:
            "A posting calendar for the two or three weeks before the festival, with the dish, the chef or the pour that represents your participation, and one post that says where and when to find you. Existing menu footage and photos become the first edits. Esteban writes a shot list your team can follow during service: plating from above, the pour, the pass, a 15-second chef introduction and the room when it is full.",
        },
        {
          title: "During the festival",
          detail:
            "Your team records short clips between plates and sends original files to a shared folder each night. Esteban edits them into vertical posts with English or Spanish captions, keeping dish names, chefs and wineries spelled exactly as you send them. Kitchens and event tents mean mixed light and noise, so the edit leans on clean close-ups and on-screen text. Delivery timing is agreed in writing beforehand; same-day turnaround is not promised. On-site filming is the paid on-location add-on.",
        },
        {
          title: "After the festival",
          detail:
            "A recap edit for your feed, a version for your website or newsletter, and short clips you can send to partners, distributors or the event host. If the festival dish goes on your regular menu afterwards, the same footage becomes its launch post. The plan closes with notes on what to record differently next February.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before the festival?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "Which festival events, dinners or tastings you are part of, or the menu or event you are running around it, with dates and times as published.",
        "The dishes, drinks or products to feature, with names, chefs and producers spelled as they must appear.",
        "Filming rules from the organizer or host, and anything that cannot be shown, such as other brands' logos.",
        "Existing footage or photos of the dishes and the space, as original files.",
        "Your logo, the accounts you post to and the caption language: English, Spanish or both.",
        "Who will record on the day, and whether you want to add paid on-location filming.",
      ],
    },
    proof: {
      text: "Esteban has not filmed the South Beach Wine & Food Festival, and this page does not suggest he has. The closest published work is Bar Door Monkey Miami, a promo for a Miami restaurant that he filmed on location and edited for the venue's Instagram.",
      href: "/portfolio/bar-door-monkey",
      label: "Watch Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Does my restaurant need to be part of the festival to use this?",
        answer:
          "No. Many restaurants plan a festival-week menu, brunch or event of their own for the visitors in town. The content plan is the same; the posts just promote your own event instead of an official one, without using the festival's logo or implying you are part of the program.",
      },
    ],
    related: [
      { title: "Restaurant promo video editing", detail: "Menu, dish and atmosphere edits for restaurants.", href: "/services/restaurant-promo-video-editing-miami" },
      { title: "Food and places creator editing", detail: "Editing for creators who recommend restaurants and places in Miami.", href: "/services/food-and-places-creator-video-editing-miami" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "festival content for my restaurant or food brand",
      goalPrompt: "plan and edit posts around the South Beach Wine & Food Festival",
      assetPrompt: "the events or menu we are running, the dishes to feature and any footage we already have",
    },
  },
  es: {
    metaTitle: "South Beach Wine & Food Festival: contenido de restaurantes",
    metaDescription:
      `Contenido para el South Beach Wine & Food Festival: calendario previo, edición de tu material desde ${FROM} por video y resúmenes para restaurantes y chefs.`,
    breadcrumb: "South Beach Wine & Food Festival",
    eyebrow: "Invierno · Miami Beach y Miami",
    h1: "Contenido del festival para restaurantes, chefs y marcas de comida, planificado antes de la primera degustación.",
    lead: "Planificación y edición de contenido para redes para restaurantes, chefs, marcas de comida y bebida y locales que participan en el South Beach Wine & Food Festival o venden alrededor de él. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido para redes del festival para restaurantes, chefs y marcas de comida",
    answer: {
      question: "¿Cómo puede un restaurante o una marca de comida convertir el festival en contenido para redes?",
      paragraphs: [
        "Planifica las publicaciones antes de la semana del festival, graba los platos, las copas y los momentos con tu propio equipo y deja que un editor convierta el material en Reels, TikTok y Shorts, además de un resumen. Esteban Moreno Media, con base en Fort Lauderdale, arma el calendario previo, edita los clips que graba tu equipo de cocina, barra o stand, y prepara videos resumen con subtítulos en español o inglés para las cuentas de tu restaurante.",
        "El festival suele ser a finales de febrero. Si no estás en el programa oficial, el mismo plan sirve para la semana alrededor: un menú especial, una cena, una degustación o un pop-up promocionado para los visitantes que están en la ciudad. La grabación en locación es un servicio adicional pagado, definido por proyecto y cotizado por escrito.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido del festival?",
      intro: "Para negocios de comida y bebida que quieren la semana del festival en su feed, estén o no en el programa:",
      items: [
        "Restaurantes y chefs que participan en una cena, degustación o demostración del festival y quieren documentar el plato y el momento.",
        "Marcas de vino, licores y comida que sirven o reparten muestras en un evento y necesitan clips cortos para sus cuentas y sus distribuidores.",
        "Restaurantes y bares fuera del programa que preparan un menú especial, un brunch o un happy hour para el público del festival.",
        "Empresas de catering, panaderías y proveedores que trabajan detrás de escena y pueden mostrar su trabajo con permiso del anfitrión.",
      ],
      closing:
        "Los eventos del festival tienen sus propias reglas sobre grabación, logos y música. Confírmalas con el organizador o el anfitrión antes de grabar en sus espacios.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después del festival?",
      cards: [
        {
          title: "Antes del festival",
          detail:
            "Un calendario de publicaciones para las dos o tres semanas previas, con el plato, el chef o la copa que representa tu participación, y una publicación que diga dónde y cuándo encontrarte. El material y las fotos del menú que ya tienes se convierten en las primeras ediciones. Esteban escribe una lista de tomas que tu equipo puede seguir durante el servicio: el emplatado desde arriba, el servicio de la copa, el pase, una presentación de 15 segundos del chef y el salón lleno.",
        },
        {
          title: "Durante el festival",
          detail:
            "Tu equipo graba clips cortos entre platos y envía los archivos originales a una carpeta compartida cada noche. Esteban los edita como publicaciones verticales con subtítulos en español o inglés, y escribe los nombres de los platos, los chefs y las bodegas exactamente como se los envías. Las cocinas y las carpas de eventos tienen luz mezclada y ruido, así que la edición se apoya en primeros planos limpios y texto en pantalla. Los tiempos de entrega se acuerdan por escrito antes; no se promete entrega el mismo día. Grabar en el lugar es el servicio adicional pagado de locación.",
        },
        {
          title: "Después del festival",
          detail:
            "Un resumen para tu feed, una versión para tu sitio web o newsletter y clips cortos que puedes enviar a aliados, distribuidores o al anfitrión del evento. Si el plato del festival pasa después a tu menú regular, el mismo material se convierte en su publicación de lanzamiento. El plan cierra con notas sobre qué grabar distinto el próximo febrero.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes del festival?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "En qué eventos, cenas o degustaciones del festival participas, o qué menú o evento propio vas a hacer alrededor, con fechas y horarios tal como se publicaron.",
        "Los platos, bebidas o productos a destacar, con los nombres de chefs y productores escritos como deben aparecer.",
        "Las reglas de grabación del organizador o del anfitrión, y lo que no se puede mostrar, como logos de otras marcas.",
        "El material o las fotos que ya tengas de los platos y del espacio, como archivos originales.",
        "Tu logo, las cuentas donde publicas y el idioma de los subtítulos: español, inglés o ambos.",
        "Quién va a grabar ese día y si quieres sumar la grabación en locación pagada.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado el South Beach Wine & Food Festival, y esta página no lo sugiere. El trabajo publicado más cercano es Bar Door Monkey Miami, la promoción de un restaurante de Miami que grabó en locación y editó para el Instagram del lugar.",
      href: "/es/portafolio/bar-door-monkey",
      label: "Ver Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Mi restaurante tiene que estar en el festival para usar este plan?",
        answer:
          "No. Muchos restaurantes preparan un menú, un brunch o un evento propio para los visitantes de esa semana. El plan de contenido es el mismo; las publicaciones promocionan tu evento en lugar de uno oficial, sin usar el logo del festival ni dar a entender que eres parte del programa.",
      },
    ],
    related: [
      { title: "Edición de video promocional para restaurantes", detail: "Menú, platos y ambiente para restaurantes.", href: "/es/edicion-de-video-promocional-para-restaurantes-miami" },
      { title: "Video para restaurantes en Miami", detail: "Contenido para redes de restaurantes en Miami-Dade.", href: "/es/video-para-restaurantes-miami" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido del festival para mi restaurante o marca",
      goalPrompt: "planificar y editar publicaciones alrededor del South Beach Wine & Food Festival",
      assetPrompt: "los eventos o el menú que vamos a hacer, los platos a destacar y el material que ya tenemos",
    },
  },
});

const emergeAmericas: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "eMerge Americas Content for Tech Exhibitors & Startups",
    metaDescription:
      `eMerge Americas content for startups, tech companies and sponsors: a pre-conference calendar, booth and stage footage edited from ${FROM} per video, recaps.`,
    breadcrumb: "eMerge Americas",
    eyebrow: "Spring · Miami Beach Convention Center",
    h1: "Conference content for startups and tech exhibitors, planned before the expo floor opens.",
    lead: "Social content planning and editing for startups, tech companies, sponsors and service providers exhibiting at or hosting events around eMerge Americas. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Conference social content for startups and tech exhibitors",
    answer: {
      question: "How can a startup get usable content out of a tech conference booth?",
      paragraphs: [
        "Decide before the conference what each clip has to prove: the product works, people stopped at the booth, the founder can explain it in thirty seconds. Then record those moments with your own team and send the files to an editor. Esteban Moreno Media, based in Fort Lauderdale, plans the pre-conference calendar, edits the booth demos, panel snippets and interviews your team records into LinkedIn, Instagram and Shorts cuts, and produces recap videos with English or Spanish captions.",
        "eMerge Americas is held at the Miami Beach Convention Center. It has historically taken place in spring, and event guides list the next edition earlier than usual, so check the dates box on this page before you plan. On-location filming is a paid add-on scoped per project and quoted in writing.",
      ],
    },
    audience: {
      heading: "Who is this conference content plan for?",
      intro: "Teams that pay for a booth, a stage slot or a side event and need more out of it than a few photos:",
      items: [
        "Startups exhibiting or pitching, who need a product demo, a founder clip and proof of booth traffic for investors and customers.",
        "Tech companies and sponsors with a booth, a panel or a hosted session that should become LinkedIn and Instagram posts.",
        "Service providers (agencies, law and accounting firms, recruiters) hosting a side event or happy hour during conference week.",
        "Bilingual teams selling into Latin America who want the same clip captioned in English and Spanish.",
      ],
      closing:
        "Stage sessions are usually recorded by the organizer, and that footage has its own rules. Confirm what you are allowed to film and reuse before the conference.",
    },
    plan: {
      heading: "What does a before, during and after conference content plan look like?",
      cards: [
        {
          title: "Before the conference",
          detail:
            "A calendar for the weeks before: an announcement of where to find you, a short product demo, a founder or speaker teaser and a post for any side event. Existing product videos and screen recordings become the first edits. Esteban writes a shot list for the booth team: the demo in one take, a visitor's reaction with permission, the founder's thirty-second pitch, the booth at its busiest and a clean wide of the stand.",
        },
        {
          title: "During the conference",
          detail:
            "Your team records between meetings and sends original files to a shared folder each evening. Esteban edits them into short vertical and square cuts for LinkedIn, Instagram and Shorts, with English or Spanish captions and with names and titles spelled as you send them. Conference halls are loud, so the edit relies on captions and on lapel or close phone audio. Delivery timing is agreed in writing beforehand; same-day turnaround is not promised. On-site filming is the paid on-location add-on.",
        },
        {
          title: "After the conference",
          detail:
            "A recap video of the booth, the talks and the conversations, cut for LinkedIn and your website, plus short follow-up clips your sales or partnerships team can send to the people they met. A demo clip sent the week after a conference meeting usually does more than the badge scan. The plan closes with notes for next year's booth.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before eMerge Americas?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "Your booth number, session or side-event details as published, and the days your team will be there.",
        "What each clip must show: the product, the offer, the speaker or the event, in priority order.",
        "Product screen recordings, existing demos and brand assets as original files.",
        "Names and titles of the people who will appear, with their permission to be posted.",
        "The platforms you post to (LinkedIn, Instagram, YouTube) and the caption language: English, Spanish or both.",
        "Who will record during the conference, and whether you want to add paid on-location filming.",
      ],
    },
    proof: {
      text: "Esteban has not filmed eMerge Americas, and this page does not suggest he has. The closest published work is Homeowners, a social video he edited from footage another team supplied, and ML Colombia, the e-commerce brand he founded and ran, where he led the digital content himself.",
      href: "/portfolio/homeowners",
      label: "Watch Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Can Esteban edit the footage the conference recorded of our talk?",
        answer:
          "Only if your agreement with the organizer lets you reuse it. If it does, send the original file or the highest-quality download available, with the timestamps you care about, and the talk can be cut into short clips with captions. If reuse is not allowed, record your own version of the key points at the booth instead.",
      },
    ],
    related: [
      { title: "Corporate event videography", detail: "Conference, launch and corporate event coverage scoped per project.", href: "/services/corporate-event-videographer-miami" },
      { title: "Webinar clip editing", detail: "Short captioned clips cut from talks, panels and webinars.", href: "/services/webinar-clip-editing-service" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "conference content for my startup or tech company",
      goalPrompt: "plan and edit posts before, during and after eMerge Americas",
      assetPrompt: "our booth or session details, what each clip must show and any footage we already have",
    },
  },
  es: {
    metaTitle: "Contenido de eMerge Americas para startups y tecnológicas",
    metaDescription:
      `Contenido para eMerge Americas: calendario previo, edición del material de tu stand desde ${FROM} por video y resúmenes para startups y patrocinadores.`,
    breadcrumb: "eMerge Americas",
    eyebrow: "Primavera · Miami Beach Convention Center",
    h1: "Contenido de conferencia para startups y expositores de tecnología, planificado antes de que abra la expo.",
    lead: "Planificación y edición de contenido para redes para startups, empresas de tecnología, patrocinadores y proveedores de servicios que exponen en eMerge Americas u organizan eventos alrededor. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido para redes de conferencia para startups y expositores de tecnología",
    answer: {
      question: "¿Cómo puede una startup sacar contenido útil de un stand en una conferencia de tecnología?",
      paragraphs: [
        "Decide antes de la conferencia qué tiene que demostrar cada clip: que el producto funciona, que la gente se detuvo en el stand, que el fundador lo explica en treinta segundos. Luego graba esos momentos con tu propio equipo y envía los archivos a un editor. Esteban Moreno Media, con base en Fort Lauderdale, arma el calendario previo, edita las demostraciones, los fragmentos de paneles y las entrevistas que graba tu equipo en versiones para LinkedIn, Instagram y Shorts, y prepara videos resumen con subtítulos en español o inglés.",
        "eMerge Americas se realiza en el Miami Beach Convention Center. Históricamente ha sido en primavera, y las guías de eventos publican la próxima edición antes de lo habitual, así que revisa las fechas en esta página antes de planear. La grabación en locación es un servicio adicional pagado, definido por proyecto y cotizado por escrito.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido de conferencia?",
      intro: "Para equipos que pagan un stand, un espacio en escenario o un evento paralelo y necesitan más que unas cuantas fotos:",
      items: [
        "Startups que exponen o presentan su pitch y necesitan una demostración del producto, un clip del fundador y prueba del movimiento en el stand para inversionistas y clientes.",
        "Empresas de tecnología y patrocinadores con un stand, un panel o una sesión que debería convertirse en publicaciones de LinkedIn e Instagram.",
        "Proveedores de servicios (agencias, firmas legales y contables, reclutadores) que organizan un evento paralelo o un happy hour durante esa semana.",
        "Equipos bilingües que venden a Latinoamérica y quieren el mismo clip subtitulado en español e inglés.",
      ],
      closing:
        "Las sesiones en escenario normalmente las graba el organizador, y ese material tiene sus propias reglas. Confirma qué puedes grabar y reutilizar antes de la conferencia.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después de una conferencia?",
      cards: [
        {
          title: "Antes de la conferencia",
          detail:
            "Un calendario para las semanas previas: un anuncio de dónde encontrarte, una demostración corta del producto, un adelanto del fundador o del ponente y una publicación para cualquier evento paralelo. Los videos de producto y las grabaciones de pantalla que ya tienes se convierten en las primeras ediciones. Esteban escribe una lista de tomas para el equipo del stand: la demostración en una sola toma, la reacción de un visitante con su permiso, el pitch de treinta segundos del fundador, el stand en su momento de más movimiento y un plano general limpio.",
        },
        {
          title: "Durante la conferencia",
          detail:
            "Tu equipo graba entre reuniones y envía los archivos originales a una carpeta compartida cada noche. Esteban los edita en versiones cortas verticales y cuadradas para LinkedIn, Instagram y Shorts, con subtítulos en español o inglés y con nombres y cargos escritos tal como se los envías. Los salones de conferencias son ruidosos, así que la edición se apoya en subtítulos y en audio de micrófono de solapa o de un celular cercano. Los tiempos de entrega se acuerdan por escrito antes; no se promete entrega el mismo día. Grabar en el lugar es el servicio adicional pagado de locación.",
        },
        {
          title: "Después de la conferencia",
          detail:
            "Un video resumen del stand, las charlas y las conversaciones, adaptado para LinkedIn y tu sitio web, además de clips cortos de seguimiento que tu equipo de ventas o alianzas puede enviar a las personas que conoció. Un clip de demostración enviado la semana después de una reunión suele lograr más que el escaneo del gafete. El plan cierra con notas para el stand del próximo año.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes de eMerge Americas?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "Tu número de stand, los datos de tu sesión o evento paralelo tal como se publicaron, y los días en que tu equipo va a estar allí.",
        "Qué debe mostrar cada clip: el producto, la oferta, el ponente o el evento, en orden de prioridad.",
        "Grabaciones de pantalla del producto, demostraciones existentes y recursos de marca como archivos originales.",
        "Nombres y cargos de las personas que van a aparecer, con su permiso para publicar.",
        "Las plataformas donde publicas (LinkedIn, Instagram, YouTube) y el idioma de los subtítulos: español, inglés o ambos.",
        "Quién va a grabar durante la conferencia y si quieres sumar la grabación en locación pagada.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado eMerge Americas, y esta página no lo sugiere. El trabajo publicado más cercano es Homeowners, un video para redes que editó a partir del material que entregó otro equipo, y ML Colombia, la marca de comercio electrónico que fundó y dirigió, donde lideró él mismo el contenido digital.",
      href: "/es/portafolio/homeowners",
      label: "Ver Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Esteban puede editar el material que grabó la conferencia de nuestra charla?",
        answer:
          "Solo si tu acuerdo con el organizador te permite reutilizarlo. Si es así, envía el archivo original o la descarga de mejor calidad disponible, con los minutos que te interesan, y la charla se puede convertir en clips cortos con subtítulos. Si no se permite reutilizarlo, graba tu propia versión de los puntos clave en el stand.",
      },
    ],
    related: [
      { title: "Videógrafo para eventos corporativos", detail: "Conferencias, lanzamientos y eventos corporativos definidos por proyecto.", href: "/es/videografo-para-eventos-corporativos-miami" },
      { title: "Edición de clips para webinars", detail: "Clips cortos con subtítulos a partir de charlas, paneles y webinars.", href: "/es/edicion-de-clips-para-webinars" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido de conferencia para mi startup o empresa de tecnología",
      goalPrompt: "planificar y editar publicaciones antes, durante y después de eMerge Americas",
      assetPrompt: "los datos de nuestro stand o sesión, qué debe mostrar cada clip y el material que ya tenemos",
    },
  },
});

const miamiMusicWeek: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Miami Music Week Content for Venues, Promoters & Brands",
    metaDescription:
      `Miami Music Week and Ultra content for venues, promoters, DJs and brands: a pre-week calendar, your footage edited from ${FROM} per video, and recaps.`,
    breadcrumb: "Miami Music Week",
    eyebrow: "Spring · Miami and Miami Beach",
    h1: "Music week content for venues, promoters and brands, planned before the first party.",
    lead: "Social content planning and editing for venues, promoters, DJs, brands and restaurants working during Miami Music Week and the Ultra Music Festival weekend. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Music week social content for venues, promoters and brands",
    answer: {
      question: "How can a venue or promoter keep up with content during Miami Music Week?",
      paragraphs: [
        "Plan the week as a sequence of posts before it starts, record each night with your own team, and send the files to an editor who turns them into Reels, TikTok and Shorts and a recap. Esteban Moreno Media, based in Fort Lauderdale, builds the pre-week calendar, edits the clips your team records at the venue, the booth or the party into beat-synced vertical posts, and cuts recap videos with English or Spanish captions.",
        "Miami Music Week usually runs in the second half of March, with the Ultra Music Festival on its closing weekend, and the parties, pool events and showcases spread across Miami and Miami Beach. Most of the work happens before it: line-up announcements, teasers and a posting order agreed in advance. On-location filming is a paid add-on scoped per project and quoted in writing.",
      ],
    },
    audience: {
      heading: "Who is this music week content plan for?",
      intro: "Businesses that run nights, sell to the crowd or put their brand in front of it during the week:",
      items: [
        "Venues, clubs and hotel pools hosting showcases or parties, who need line-up posts and nightly recaps.",
        "Promoters, labels and DJs with events to announce and sell, and footage to turn into posts for the next night.",
        "Brands running activations, sponsored lounges or sampling, who need to show the activation on their own accounts and to partners.",
        "Restaurants and bars near the venues that plan late hours, menus or events for the visitors in town.",
      ],
      closing:
        "Music in recaps needs rights. Use tracks you are licensed to post, or the platform's licensed library, and confirm filming rules with the venue and the artists.",
    },
    plan: {
      heading: "What does a before, during and after music week content plan look like?",
      cards: [
        {
          title: "Before the week",
          detail:
            "A calendar for the weeks before: line-up and date announcements, teasers from last year's footage, artist or host introductions and one post per night that says where and when. Esteban writes a shot list your team can follow in a dark room: the entrance and the line, the booth from the side, the crowd at the drop, a brand detail and a short host or DJ greeting recorded before doors open.",
        },
        {
          title: "During the week",
          detail:
            "Your team records each night and uploads original files before going home. Esteban edits them into vertical posts with captions in English or Spanish, cut to the rhythm of the music you are licensed to use. Club lighting and loud rooms limit what a phone can record, so the edit favors short, bright moments and on-screen text over long clips. Delivery timing is agreed in writing beforehand; same-day turnaround is not promised. On-site filming is the paid on-location add-on.",
        },
        {
          title: "After the week",
          detail:
            "A recap of the week for your feed and website, short clips your artists, partners or sponsors can repost, and a highlight cut that sells next year's dates. A recap posted in the days after the festival weekend lands while people are still sharing their own clips. The plan closes with notes on what to film differently next March.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before Miami Music Week?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "Your events or activations for the week, with dates, venues and line-ups as published.",
        "Footage from last year or earlier events, as original files, to build the teasers.",
        "The music you are licensed to use, or a note to use platform-licensed audio.",
        "Names, handles and permissions for the artists, hosts and brands that appear.",
        "Your logo, the accounts you post to and the caption language: English, Spanish or both.",
        "Who will record each night, and whether you want to add paid on-location filming.",
      ],
    },
    proof: {
      text: "Esteban has not filmed Miami Music Week or Ultra, and this page does not suggest he has. The closest published work is Bar Door Monkey Miami, a venue promo he filmed on location and edited for the venue's Instagram, and Diana & Jack, a wedding film shot in Boston where he was the videographer and editor of the full film and a highlight trailer.",
      href: "/portfolio/bar-door-monkey",
      label: "Watch Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Can recaps use the songs that played at the party?",
        answer:
          "Only if you have the rights to post them. Recorded DJ sets and club audio usually include music you are not licensed to publish, and platforms can mute or remove those posts. The safer route is a track you have licensed, the platform's licensed library, or a recap built on captions and the room's atmosphere.",
      },
    ],
    related: [
      { title: "Nightlife and event video editing", detail: "Recaps and promo reels for venues, parties and late events in Miami.", href: "/services/nightlife-event-video-editing-miami" },
      { title: "Music video post-production", detail: "Editing, color and finishing for artists and labels.", href: "/services/music-video-post-production-miami" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "music week content for my venue, event or brand",
      goalPrompt: "plan and edit posts before, during and after Miami Music Week",
      assetPrompt: "our events and line-ups, the music we can use and any footage we already have",
    },
  },
  es: {
    metaTitle: "Contenido de Miami Music Week para locales, promotores y marcas",
    metaDescription:
      `Contenido para Miami Music Week y Ultra: calendario previo, edición de tu material desde ${FROM} por video y resúmenes para locales, promotores y DJs.`,
    breadcrumb: "Miami Music Week",
    eyebrow: "Primavera · Miami y Miami Beach",
    h1: "Contenido de la semana de la música para locales, promotores y marcas, planificado antes de la primera fiesta.",
    lead: "Planificación y edición de contenido para redes para locales, promotores, DJs, marcas y restaurantes que trabajan durante Miami Music Week y el fin de semana del Ultra Music Festival. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido para redes de la semana de la música para locales, promotores y marcas",
    answer: {
      question: "¿Cómo puede un local o un promotor mantener el ritmo de contenido durante Miami Music Week?",
      paragraphs: [
        "Planifica la semana como una secuencia de publicaciones antes de que empiece, graba cada noche con tu propio equipo y envía los archivos a un editor que los convierta en Reels, TikTok y Shorts y en un resumen. Esteban Moreno Media, con base en Fort Lauderdale, arma el calendario previo, edita los clips que tu equipo graba en el local, la cabina o la fiesta como publicaciones verticales sincronizadas con la música, y prepara videos resumen con subtítulos en español o inglés.",
        "Miami Music Week suele ser en la segunda mitad de marzo, con el Ultra Music Festival en su último fin de semana, y las fiestas, los eventos de piscina y los showcases se reparten entre Miami y Miami Beach. La mayor parte del trabajo ocurre antes: anuncios del line-up, adelantos y un orden de publicaciones acordado. La grabación en locación es un servicio adicional pagado, definido por proyecto y cotizado por escrito.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido de la semana de la música?",
      intro: "Para negocios que organizan noches, le venden al público o ponen su marca frente a él durante esa semana:",
      items: [
        "Locales, clubes y piscinas de hoteles con showcases o fiestas, que necesitan publicaciones del line-up y resúmenes cada noche.",
        "Promotores, sellos y DJs con eventos que anunciar y vender, y material que convertir en publicaciones para la noche siguiente.",
        "Marcas con activaciones, lounges patrocinados o degustaciones, que necesitan mostrar la activación en sus cuentas y ante sus aliados.",
        "Restaurantes y bares cerca de los locales que planean horarios extendidos, menús o eventos para los visitantes.",
      ],
      closing:
        "La música de los resúmenes necesita derechos. Usa canciones que tengas licencia para publicar o la biblioteca con licencia de la plataforma, y confirma las reglas de grabación con el local y los artistas.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después de la semana de la música?",
      cards: [
        {
          title: "Antes de la semana",
          detail:
            "Un calendario para las semanas previas: anuncios del line-up y las fechas, adelantos con material del año pasado, presentaciones de artistas o anfitriones y una publicación por noche que diga dónde y cuándo. Esteban escribe una lista de tomas que tu equipo puede seguir en un lugar oscuro: la entrada y la fila, la cabina de lado, el público en el drop, un detalle de marca y un saludo corto del anfitrión o del DJ grabado antes de abrir.",
        },
        {
          title: "Durante la semana",
          detail:
            "Tu equipo graba cada noche y sube los archivos originales antes de irse a casa. Esteban los edita como publicaciones verticales con subtítulos en español o inglés, al ritmo de la música que tienes licencia para usar. Las luces de club y el ruido limitan lo que un celular puede grabar, así que la edición prioriza momentos cortos y luminosos y texto en pantalla antes que clips largos. Los tiempos de entrega se acuerdan por escrito antes; no se promete entrega el mismo día. Grabar en el lugar es el servicio adicional pagado de locación.",
        },
        {
          title: "Después de la semana",
          detail:
            "Un resumen de la semana para tu feed y tu sitio web, clips cortos que tus artistas, aliados o patrocinadores pueden compartir, y un video de momentos destacados que venda las fechas del próximo año. Un resumen publicado en los días siguientes al fin de semana del festival llega mientras la gente todavía comparte sus propios clips. El plan cierra con notas sobre qué grabar distinto el próximo marzo.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes de Miami Music Week?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "Tus eventos o activaciones de la semana, con fechas, locales y line-ups tal como se publicaron.",
        "Material del año pasado o de eventos anteriores, como archivos originales, para armar los adelantos.",
        "La música que tienes licencia para usar, o una nota para usar audio con licencia de la plataforma.",
        "Nombres, cuentas y permisos de los artistas, anfitriones y marcas que aparecen.",
        "Tu logo, las cuentas donde publicas y el idioma de los subtítulos: español, inglés o ambos.",
        "Quién va a grabar cada noche y si quieres sumar la grabación en locación pagada.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado Miami Music Week ni Ultra, y esta página no lo sugiere. El trabajo publicado más cercano es Bar Door Monkey Miami, la promoción de un local que grabó en locación y editó para su Instagram, y Diana & Jack, una película de boda grabada en Boston en la que fue videógrafo y editor de la película completa y de un tráiler de resumen.",
      href: "/es/portafolio/bar-door-monkey",
      label: "Ver Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Los resúmenes pueden usar las canciones que sonaron en la fiesta?",
        answer:
          "Solo si tienes derechos para publicarlas. Los sets de DJ grabados y el audio del club suelen incluir música que no tienes licencia para publicar, y las plataformas pueden silenciar o eliminar esas publicaciones. Lo más seguro es una canción con licencia, la biblioteca con licencia de la plataforma o un resumen construido con subtítulos y el ambiente del lugar.",
      },
    ],
    related: [
      { title: "Edición de video para discotecas y eventos", detail: "Resúmenes y reels promocionales para locales, fiestas y eventos nocturnos en Miami.", href: "/es/edicion-de-video-para-discotecas-y-eventos-miami" },
      { title: "Postproducción de videos musicales", detail: "Edición, color y acabado para artistas y sellos.", href: "/es/postproduccion-de-videos-musicales-miami" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido de la semana de la música para mi local, evento o marca",
      goalPrompt: "planificar y editar publicaciones antes, durante y después de Miami Music Week",
      assetPrompt: "nuestros eventos y line-ups, la música que podemos usar y el material que ya tenemos",
    },
  },
});

const miamiSpice: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Miami Spice Content for Participating Restaurants",
    metaDescription:
      `Miami Spice content for restaurants: a menu launch calendar, your kitchen and dining-room footage edited from ${FROM} per video, and weekly posts.`,
    breadcrumb: "Miami Spice",
    eyebrow: "Summer · Miami-Dade restaurants",
    h1: "Miami Spice content for restaurants, planned before the prix-fixe menu goes live.",
    lead: "Social content planning and editing for restaurants and bars taking part in Miami Spice, or running their own offer during the same months. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Miami Spice social content for restaurants",
    answer: {
      question: "How should a restaurant promote its Miami Spice menu on social media?",
      paragraphs: [
        "Film the menu before the program starts, launch it with a short series of dish videos, and keep posting through the months it runs instead of announcing it once. Esteban Moreno Media, based in Fort Lauderdale, plans the posting calendar for the season, edits the footage your kitchen and floor team record into Reels, TikTok and Shorts, and refreshes the posts as dishes or nights change, with English or Spanish captions.",
        "Miami Spice usually runs through August and September, and some years it is extended, so check the dates box on this page. Because it lasts weeks rather than days, it suits a monthly plan better than a one-off edit. On-location filming of your dishes or dining room is a paid add-on scoped per project and quoted in writing.",
      ],
    },
    audience: {
      heading: "Who is this Miami Spice content plan for?",
      intro: "Restaurants that want the program to fill tables, not just put them on a list:",
      items: [
        "Participating restaurants launching a prix-fixe lunch, dinner or brunch menu who need each course on video.",
        "Chefs who want to explain the menu in their own words, in Spanish, English or both.",
        "Bars and lounges with a pairing or a cocktail tied to the menu.",
        "Restaurants that are not participating but run their own summer offer and need to be visible in the same weeks.",
      ],
      closing:
        "Use the program's name only to describe your participation, and follow the organizer's rules for how participating restaurants may refer to it.",
    },
    plan: {
      heading: "What does a before, during and after Miami Spice content plan look like?",
      cards: [
        {
          title: "Before the program",
          detail:
            "A short shoot of each course with your own team, or the paid on-location add-on if you want Esteban there, plus a calendar for the launch week and the weeks after. Esteban writes a shot list for the kitchen: plating from above, a close-up of each course, the pour, the dining room before service and a 15-second chef introduction. Existing footage of the room and the team becomes the first edits.",
        },
        {
          title: "During the program",
          detail:
            "A steady rhythm through the season: a launch post, one post per course, a reminder before each weekend and a post when the menu or the offer changes. Your team sends new clips to a shared folder as they record them, and Esteban edits them into vertical posts with captions in English or Spanish. Delivery timing is agreed in writing at the start of the season; nothing here promises same-day turnaround.",
        },
        {
          title: "After the program",
          detail:
            "A recap of the season's dishes, a version of the best clips for your regular menu or website, and notes on which dishes and posts brought questions or reservations, if you track them. The footage of the season becomes the starting point for next year's menu launch.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before Miami Spice?",
      intro: "One message with these items is enough to scope the work and quote it:",
      items: [
        "The menu, course by course, with dish names spelled as they must appear and the days and services it applies to.",
        "Your restaurant's participation details as you are allowed to publish them.",
        "Original footage or photos of the dishes, the room and the team.",
        "Your logo, the accounts you post to and the caption language: English, Spanish or both.",
        "Who on your team will record, and whether you want to add paid on-location filming.",
        "When the first post should go live and how often you want to post during the season.",
      ],
    },
    proof: {
      text: "Esteban has not filmed Miami Spice menus, and this page does not suggest he has. The closest published work is Bar Door Monkey Miami, a promo for a Miami restaurant that he filmed on location and edited for the venue's Instagram.",
      href: "/portfolio/bar-door-monkey",
      label: "Watch Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Is a monthly plan or per-video editing better for Miami Spice?",
        answer:
          "Because the program runs for weeks, most restaurants get more from a monthly plan that keeps posts going through the season than from a single launch video. If you only need the launch clips edited from your own footage, per-video editing works too. Both are quoted from the published packages.",
      },
    ],
    related: [
      { title: "Restaurant promo video editing", detail: "Menu, dish and atmosphere edits for restaurants.", href: "/services/restaurant-promo-video-editing-miami" },
      { title: "AI food photography for restaurants", detail: "AI-assisted menu and dish visuals that stay truthful to the plate.", href: "/services/ai-food-photography-restaurants" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "Miami Spice content for my restaurant",
      goalPrompt: "plan and edit posts for our Miami Spice menu through the season",
      assetPrompt: "the menu course by course, our posting rhythm and any footage we already have",
    },
  },
  es: {
    metaTitle: "Contenido de Miami Spice para restaurantes participantes",
    metaDescription:
      `Contenido para Miami Spice: calendario de lanzamiento del menú, edición de tu material de cocina y salón desde ${FROM} por video y publicaciones semanales.`,
    breadcrumb: "Miami Spice",
    eyebrow: "Verano · Restaurantes de Miami-Dade",
    h1: "Contenido de Miami Spice para restaurantes, planificado antes de que salga el menú de precio fijo.",
    lead: "Planificación y edición de contenido para redes para restaurantes y bares que participan en Miami Spice o que tienen su propia oferta durante esos meses. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido para redes de Miami Spice para restaurantes",
    answer: {
      question: "¿Cómo debe promocionar un restaurante su menú de Miami Spice en redes?",
      paragraphs: [
        "Graba el menú antes de que empiece el programa, lánzalo con una serie corta de videos de los platos y sigue publicando durante los meses que dura en lugar de anunciarlo una sola vez. Esteban Moreno Media, con base en Fort Lauderdale, arma el calendario de publicaciones de la temporada, edita el material que graban tus equipos de cocina y de salón para Reels, TikTok y Shorts, y renueva las publicaciones cuando cambian los platos o las noches, con subtítulos en español o inglés.",
        "Miami Spice suele ser en agosto y septiembre, y algunos años se extiende, así que revisa las fechas en esta página. Como dura semanas y no días, encaja mejor con un plan mensual que con una sola edición. La grabación en locación de tus platos o de tu salón es un servicio adicional pagado, definido por proyecto y cotizado por escrito.",
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido de Miami Spice?",
      intro: "Para restaurantes que quieren que el programa llene mesas, no solo aparecer en una lista:",
      items: [
        "Restaurantes participantes que lanzan un menú de precio fijo de almuerzo, cena o brunch y necesitan cada tiempo en video.",
        "Chefs que quieren explicar el menú con sus propias palabras, en español, inglés o ambos.",
        "Bares y lounges con un maridaje o un cóctel ligado al menú.",
        "Restaurantes que no participan pero tienen su propia oferta de verano y necesitan verse en las mismas semanas.",
      ],
      closing:
        "Usa el nombre del programa solo para describir tu participación y sigue las reglas del organizador sobre cómo pueden mencionarlo los restaurantes participantes.",
    },
    plan: {
      heading: "¿Cómo es un plan de contenido antes, durante y después de Miami Spice?",
      cards: [
        {
          title: "Antes del programa",
          detail:
            "Una grabación corta de cada tiempo del menú con tu propio equipo, o la grabación en locación pagada si quieres a Esteban allí, y un calendario para la semana de lanzamiento y las siguientes. Esteban escribe una lista de tomas para la cocina: el emplatado desde arriba, un primer plano de cada tiempo, el servicio de la bebida, el salón antes del servicio y una presentación de 15 segundos del chef. El material del salón y del equipo que ya tienes se convierte en las primeras ediciones.",
        },
        {
          title: "Durante el programa",
          detail:
            "Un ritmo constante durante la temporada: una publicación de lanzamiento, una por cada tiempo del menú, un recordatorio antes de cada fin de semana y una publicación cuando cambia el menú o la oferta. Tu equipo envía clips nuevos a una carpeta compartida a medida que los graba, y Esteban los edita como publicaciones verticales con subtítulos en español o inglés. Los tiempos de entrega se acuerdan por escrito al inicio de la temporada; nada de esto promete entregas el mismo día.",
        },
        {
          title: "Después del programa",
          detail:
            "Un resumen de los platos de la temporada, una versión de los mejores clips para tu menú regular o tu sitio web y notas sobre qué platos y publicaciones generaron preguntas o reservas, si las mides. El material de la temporada se convierte en el punto de partida para el lanzamiento del menú del próximo año.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviarle a Esteban antes de Miami Spice?",
      intro: "Un solo mensaje con estos puntos basta para definir el trabajo y cotizarlo:",
      items: [
        "El menú, tiempo por tiempo, con los nombres de los platos escritos como deben aparecer y los días y servicios en que aplica.",
        "Los datos de participación de tu restaurante tal como puedes publicarlos.",
        "Material o fotos originales de los platos, el salón y el equipo.",
        "Tu logo, las cuentas donde publicas y el idioma de los subtítulos: español, inglés o ambos.",
        "Quién de tu equipo va a grabar y si quieres sumar la grabación en locación pagada.",
        "Cuándo debe salir la primera publicación y con qué frecuencia quieres publicar durante la temporada.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado menús de Miami Spice, y esta página no lo sugiere. El trabajo publicado más cercano es Bar Door Monkey Miami, la promoción de un restaurante de Miami que grabó en locación y editó para el Instagram del lugar.",
      href: "/es/portafolio/bar-door-monkey",
      label: "Ver Bar Door Monkey Miami",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Para Miami Spice conviene un plan mensual o la edición por video?",
        answer:
          "Como el programa dura semanas, la mayoría de los restaurantes aprovecha más un plan mensual que mantenga las publicaciones durante la temporada que un solo video de lanzamiento. Si solo necesitas editar los clips de lanzamiento con tu propio material, la edición por video también funciona. Ambos se cotizan a partir de los paquetes publicados.",
      },
    ],
    related: [
      { title: "Edición de video promocional para restaurantes", detail: "Menú, platos y ambiente para restaurantes.", href: "/es/edicion-de-video-promocional-para-restaurantes-miami" },
      { title: "Video para restaurantes en Miami", detail: "Contenido para redes de restaurantes en Miami-Dade.", href: "/es/video-para-restaurantes-miami" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "contenido de Miami Spice para mi restaurante",
      goalPrompt: "planificar y editar publicaciones para nuestro menú de Miami Spice durante la temporada",
      assetPrompt: "el menú tiempo por tiempo, nuestro ritmo de publicaciones y el material que ya tenemos",
    },
  },
});


const fitce: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "FITCE Fort Lauderdale Video Content for International Exhibitors",
    metaDescription:
      `FITCE content for global trade delegations, exhibitors and sponsors: pre-expo calendars, booth footage edited from ${FROM} per video, and recaps.`,
    breadcrumb: "FITCE",
    eyebrow: "Fall · Broward County Convention Center",
    h1: "International trade expo video content, planned before the convention doors open.",
    lead: "Social content planning and editing for international delegations, trade agencies, sponsors and corporate exhibitors at FITCE in Fort Lauderdale. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "International trade expo video content for FITCE exhibitors",
    answer: {
      question: "How can international exhibitors capture qualified business leads at FITCE?",
      paragraphs: [
        "Plan your content before arriving in Fort Lauderdale so your presence turns into measurable trade inquiries. The Florida International Trade and Cultural Expo brings together consulates, trade commissioners, export agencies and private enterprises from dozens of nations at the Broward County Convention Center. Instead of letting booth interactions stay on the convention floor, record twenty-second delegate interviews, booth demos and bilateral discussions with a standard smartphone, then send the raw footage to a dedicated editor.",
        `Esteban Moreno Media, based in Fort Lauderdale, structures your pre-event publishing schedule, edits original video into professional vertical clips with bilingual captions, and delivers highlight recaps for government sponsors and commercial partners. Because Esteban works Spanish-first with intermediate English, cross-border Latin American and Caribbean delegations communicate without linguistic friction. On-location raw filming starts from ${RAW_HALF_DAY} for a half-day session or ${RAW_FULL_DAY} for a full day, and post-production editing starts from ${FROM} per video.`,
      ],
    },
    audience: {
      heading: "Who is this FITCE trade expo content plan for?",
      intro: "Delegations, consulates and corporate trade teams investing in South Florida international commerce:",
      items: [
        "International trade commissions, consulates and bilateral chambers showcasing export manufacturing, agriculture, or tech infrastructure.",
        "Import-export operators, customs brokerages, freight logistics firms and supply chain suppliers expanding Americas distribution.",
        "B2B service providers and corporate sponsors hosting VIP breakfast briefings or bilateral matchmaking sessions at the convention center.",
        "Foreign direct investment agencies seeking bilingual English and Spanish executive clips to circulate among commercial partners.",
      ],
      closing:
        "Official floor rules permit filming within your contracted pavilion. Always confirm credential policies for private delegate briefings with event management.",
    },
    plan: {
      heading: "What does a before, during and after FITCE content plan look like?",
      cards: [
        {
          title: "Before the expo",
          detail:
            "A structured schedule for the weeks prior: announcing pavilion booth coordinates, introducing key trade commissioners, and publishing teasers for scheduled panel presentations. Esteban drafts a practical handheld shot list for your delegation staff: one-take product overviews, thirty-second delegate value statements, bilateral signing moments, and clear establishing visuals of your national pavilion.",
        },
        {
          title: "During the expo",
          detail:
            "Your staff captures footage between meetings and uploads original files to a secure shared folder each evening. Esteban edits vertical videos for LinkedIn, Instagram and corporate portals, embedding English or Spanish subtitles so clips play cleanly in noisy exhibition halls. Delivery timelines are locked in advance; on-location raw camera operation is available as a scheduled paid add-on.",
        },
        {
          title: "After the expo",
          detail:
            "A polished recap video highlighting delegation meetings, official protocol handshakes and marketplace negotiations for ministry stakeholders and executive boards. Concise follow-up video messages can be paired with sales outreach to new North American trade contacts while conversations remain fresh.",
        },
      ],
    },
    send: {
      heading: "What should you send Esteban before FITCE?",
      intro: "A single briefing message with these core details is sufficient to scope and price your production:",
      items: [
        "Your country pavilion number or booth location, schedule of formal bilateral signings, and visiting dates.",
        "Prioritized commercial objectives: foreign investment attraction, export distribution partnerships, or regional brand awareness.",
        "Existing institutional assets: national trade branding guidelines, motion graphics, and high-resolution logo vectors.",
        "Accurate spelling of names, diplomatic titles, and company affiliations for on-screen lower thirds.",
        "Primary distribution channels (LinkedIn, corporate web, YouTube, Instagram) and subtitle preferences (English, Spanish, or both).",
        "Designation of who will operate cameras at the booth, or whether you require scheduled on-location filming services.",
      ],
    },
    proof: {
      text: "Esteban has not filmed FITCE, and this page does not suggest he has. The closest published work is Homeowners, an executive video edited from supplied multi-camera recordings, and Banacol, corporate trade footage edited for commercial distribution across Latin America and the United States.",
      href: "/portfolio/homeowners",
      label: "Watch Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "Can Esteban provide on-location raw camera filming at the Broward Convention Center?",
        answer:
          `Yes. On-location raw video filming is available as a scheduled add-on: half-day raw capture starts at ${RAW_HALF_DAY}, and full-day raw capture is ${RAW_FULL_DAY}. If you require post-production, editing starts from ${FROM} per finished video. All credentials and organizer floor approvals must be arranged through your pavilion registration.`,
      },
      {
        question: "How are bilingual English and Spanish interviews handled for international delegates?",
        answer:
          "Esteban operates Spanish-first with intermediate English, making bilingual delegate interviews seamless. Video clips are delivered with burned-in subtitles in either English, Spanish, or dual-language subtitle layouts optimized for LinkedIn and executive distribution.",
      },
    ],
    related: [
      { title: "Corporate event videographer", detail: "Professional conference and corporate expo video recording in Fort Lauderdale and Miami.", href: "/services/corporate-event-videographer-fort-lauderdale" },
      { title: "Trade show booth videographer", detail: "On-site expo booth coverage and product demonstration capture.", href: "/services/trade-show-booth-videographer-fort-lauderdale" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "FITCE trade expo video content",
      goalPrompt: "plan and edit delegate interviews and pavilion content around FITCE",
      assetPrompt: "our pavilion or booth number, visiting dates, and existing brand footage",
    },
  },
  es: {
    metaTitle: "Video para expositores de FITCE en Fort Lauderdale",
    metaDescription:
      `Contenido para FITCE: delegaciones comerciales, pabellones y expositores, edición de material desde ${FROM} por video y resúmenes para ferias internacionales.`,
    breadcrumb: "FITCE",
    eyebrow: "Otoño · Centro de Convenciones de Broward",
    h1: "Contenido audiovisual para ferias de comercio exterior, planificado antes de abrir el pabellón.",
    lead: "Planificación y edición de contenido para redes para delegaciones internacionales, cámaras binacionales y empresas expositoras en FITCE Fort Lauderdale. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Contenido de video para expositores y delegaciones de FITCE",
    answer: {
      question: "¿Cómo pueden las delegaciones comerciales convertir su presencia en FITCE en alianzas reales?",
      paragraphs: [
        "Planifica el contenido antes de llegar a Fort Lauderdale para que tu inversión en la feria genere contactos comerciales verificables. La Expo Internacional de Comercio y Cultura de Florida (FITCE) reúne a consulados, comisionados de comercio, agencias de exportación y empresarios de decenas de países en el Centro de Convenciones de Broward. En lugar de limitar las reuniones al espacio del stand, graba entrevistas de veinte segundos con delegados, demostraciones de producto y firmas de acuerdos con un teléfono móvil y envía el material original a un editor.",
        `Esteban Moreno Media, radicado en Fort Lauderdale, estructura tu cronograma previo, edita el material en videos verticales profesionales con subtítulos bilingües y entrega resúmenes ejecutivos para ministerios y socios comerciales. Al trabajar en español nativo con inglés intermedio, las delegaciones de América Latina y el Caribe colaboran sin barreras idiomáticas. La grabación en locación parte de ${RAW_HALF_DAY} por media jornada o ${RAW_FULL_DAY} por jornada completa, y la edición parte de ${FROM} por video.`,
      ],
    },
    audience: {
      heading: "¿Para quién es este plan de contenido para FITCE?",
      intro: "Delegaciones oficiales, cámaras de comercio y empresas exportadoras que participan en ferias internacionales:",
      items: [
        "Comisiones de comercio exterior y consulados que presentan manufactura, agroindustria o tecnología ante inversionistas del sur de Florida.",
        "Empresas de logística, agencias aduanales y distribuidores que buscan expandir su red comercial en Estados Unidos.",
        "Patrocinadores corporativos que organizan desayunos de trabajo, ruedas de negocios o reuniones bilaterales en el centro de convenciones.",
        "Agencias de promoción de inversiones que requieren clips ejecutivos en inglés y español para distribuir entre socios estratégicos.",
      ],
      closing:
        "Las normas de la feria autorizan grabaciones dentro del pabellón contratado. Confirma los permisos para eventos privados con la gerencia del centro.",
    },
    plan: {
      heading: "¿Cómo es el plan de contenido para antes, durante y después de FITCE?",
      cards: [
        {
          title: "Antes de la feria",
          detail:
            "Un calendario estructurado para las semanas previas: anuncio de ubicación del pabellón, presentación de delegados clave y adelantos de conferencias programadas. Esteban elabora una guía de tomas para tu equipo: demostraciones breves, declaraciones comerciales de treinta segundos y planos generales del pabellón nacional.",
        },
        {
          title: "Durante la feria",
          detail:
            "Tu personal graba entre reuniones y sube los archivos originales a una carpeta compartida al final del día. Esteban edita cortes verticales para LinkedIn, Instagram y canales corporativos, con subtítulos en español o inglés para que funcionen con claridad en un salón ruidoso. La grabación en locación es un servicio adicional pagado.",
        },
        {
          title: "Después de la feria",
          detail:
            "Un video resumen que compila reuniones institucionales, acuerdos formales y actividad en el stand para reportes ministeriales y juntas directivas. Además, clips específicos de seguimiento que tu equipo de ventas puede enviar por mensaje directo a los compradores contactados durante el evento.",
        },
      ],
    },
    send: {
      heading: "¿Qué debes enviar a Esteban antes de FITCE?",
      intro: "Un mensaje con estos datos es suficiente para estructurar y cotizar el trabajo:",
      items: [
        "Número de pabellón o stand, horario de firmas bilaterales y fechas de participación de tu delegación.",
        "Objetivos comerciales centrales: atracción de inversión, alianzas de distribución o posicionamiento de marca.",
        "Material gráfico existente: manuales de marca institucional, tipografías y logotipos en alta resolución.",
        "Nombres exactos y cargos diplomáticos o empresariales de quienes aparecerán en pantalla.",
        "Redes de publicación (LinkedIn, web institucional, YouTube, Instagram) e idioma de subtítulos (español, inglés o ambos).",
        "Responsable de grabación en el stand, o solicitud de grabación en locación si deseas contratar cámara presencial.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado FITCE ni sus actividades oficiales, y esta página no lo insinúa. El trabajo publicado más cercano es Homeowners, un video editado a partir de material entregado por otro equipo, y Banacol, producción corporativa de exportación para mercados de Estados Unidos y América Latina.",
      href: "/es/portafolio/homeowners",
      label: "Ver Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Esteban ofrece servicio de grabación presencial en el Centro de Convenciones de Broward?",
        answer:
          `Sí. La grabación presencial de material en bruto está disponible como servicio adicional: ${RAW_HALF_DAY} por media jornada (half-day) y ${RAW_FULL_DAY} por jornada completa (full-day). Si deseas edición profesional posterior, el servicio parte de ${FROM} por video terminado. Las credenciales de acceso deben ser tramitadas por el expositor.`,
      },
      {
        question: "¿Cómo se gestionan las entrevistas bilingües en español e inglés?",
        answer:
          "Esteban trabaja primero en español y cuenta con inglés intermedio, facilitando la interlocución con delegaciones hispanohablantes e internacionales. Los videos se entregan con subtítulos incrustados en español, inglés o versión doble bilingüe para plataformas profesionales.",
      },
    ],
    related: [
      { title: "Videógrafo para eventos corporativos", detail: "Grabación y edición de convenciones y reuniones de negocios en Fort Lauderdale.", href: "/es/videografo-para-eventos-corporativos-fort-lauderdale" },
      { title: "Video para ferias comerciales", detail: "Cobertura de stands y demostraciones de producto en centros de convenciones.", href: "/es/videografo-para-ferias-comerciales-fort-lauderdale" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "video para expositores de feria FITCE",
      goalPrompt: "planificar y editar entrevistas a delegados y contenido de stand en FITCE",
      assetPrompt: "nuestro número de stand o pabellón, fechas y material de marca que ya tenemos",
    },
  },
});

const bocaRatonEvents: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Boca Raton Event Videographer & Business Festival Content",
    metaDescription:
      `Video production and editing for Boca Raton business conferences, expos, and festivals: calendars, raw capture from ${RAW_HALF_DAY}, edits from ${FROM} per video.`,
    breadcrumb: "Boca Raton Events",
    eyebrow: "Annual events · Boca Raton & Palm Beach County",
    h1: "Boca Raton business expos and cultural festivals, captured with professional clarity.",
    lead: "Social content planning, on-location video capture, and editing for corporate summits, wealth conferences, and cultural festivals across Boca Raton. Send your own footage; on-location filming is a paid add-on scoped per project.",
    serviceName: "Boca Raton event videography and social content",
    answer: {
      question: "How can businesses and organizers document annual events and festivals in Boca Raton?",
      paragraphs: [
        "Secure your content strategy before event dates arrive at premier venues like The Boca Raton resort, Florida Atlantic University, and Mizner Park. Boca Raton hosts significant recurring annual gatherings, including the Festival of the Arts BOCA, major real estate and financial derivatives forums, and Greater Boca Raton Chamber expos. Documenting these sessions requires clear planning: capturing executive soundbites, sponsor activations, and keynote highlights without disrupting guest experiences.",
        `Esteban Moreno Media provides remote video editing starting from ${FROM} per video, as well as on-location raw footage recording starting at ${RAW_HALF_DAY} for a half-day session and ${RAW_FULL_DAY} for a full day. Operating from nearby Fort Lauderdale, Esteban delivers rapid-turnaround vertical social reels and complete keynote archives for Boca Raton corporate brands, private practices, and festival organizers. Every booking includes a clear written quote with zero hidden travel charges.`,
      ],
    },
    audience: {
      heading: "Who is this Boca Raton event video service designed for?",
      intro: "Companies, festival organizers, and executive leadership hosting or exhibiting in Boca Raton:",
      items: [
        "Corporate conference sponsors at The Boca Raton resort needing keynote recap reels and executive soundbites for LinkedIn.",
        "Festival producers and cultural organizers at Mizner Park Amphitheater requiring multi-angle crowd and performance recaps.",
        "Exhibitors at regional trade showcases and Boca Chamber business expos looking to capture booth traffic and customer interactions.",
        "Wealth managers, medical specialists, and boutique law firms hosting private dinner masterminds and client symposiums.",
      ],
      closing:
        "Private resort venues and university auditoriums enforce specific media check-in rules. Coordinate videographer access passes prior to production day.",
    },
    plan: {
      heading: "What does a comprehensive Boca Raton event video workflow include?",
      cards: [
        {
          title: "Pre-event planning",
          detail:
            "We review your speaker lineup, venue floor plan, and sponsor delivery requirements. Esteban establishes a target shot list outlining executive interview questions, stage presentations, sponsor signage recognition, and candid attendee networking moments.",
        },
        {
          title: "On-site capture",
          detail:
            "Equipped with 4K camera gear, wireless lavalier microphones, and discreet handheld stabilization, filming proceeds without intrusive staging. We record keynotes, roving attendee reactions, and sponsor exhibits across conference halls or outdoor pavilions.",
        },
        {
          title: "Post-production delivery",
          detail:
            "Original media files are processed, color-graded, and edited into high-retention vertical reels, horizontal presentation archives, or promotional trailers for subsequent annual ticket launches, formatted cleanly for Instagram, YouTube, and LinkedIn.",
        },
      ],
    },
    send: {
      heading: "What should you provide to book Boca Raton event coverage?",
      intro: "Send a message with these key project details for an immediate quote:",
      items: [
        "Event name, venue address (e.g., Mizner Park or hotel conference hall), and session dates.",
        "Schedule outline highlighting keynotes, award presentations, or VIP networking receptions to record.",
        "Desired deliverables: raw 4K footage archive, vertical social recap reels, or full presentation cuts.",
        "Brand style guide, primary fonts, and high-resolution sponsor vector logos for title cards.",
        "Selection of service model: remote editing of existing footage, or scheduled on-location raw filming.",
        "Required turnaround deadlines for highlight teasers or post-event press releases.",
      ],
    },
    proof: {
      text: "Esteban has not filmed Festival of the Arts BOCA or official resort symposiums, and this page does not claim past representation. The closest published work is Homeowners, edited from supplied footage, and Bar Door Monkey Miami, a hospitality video produced on location in South Florida.",
      href: "/portfolio/homeowners",
      label: "Watch Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "What does event filming in Boca Raton cost?",
        answer:
          `Pricing follows our transparent rate sheet: raw on-location filming starts at ${RAW_HALF_DAY} for a half-day session (up to 4 hours) and ${RAW_FULL_DAY} for a full day (up to 8 hours). Remote video editing starts from ${FROM} per video. For full turnkey monthly production, the Local Presence package starts from ${usd(1600)} per month.`,
      },
      {
        question: "Can Esteban record both indoor keynotes and outdoor evening receptions?",
        answer:
          "Yes. Our camera kit uses high-sensitivity dual-base ISO full-frame sensors and low-profile on-camera lighting, maintaining pristine 4K video quality across bright auditorium stages and low-lit outdoor patio receptions.",
      },
    ],
    related: [
      { title: "Boca Raton video production", detail: "Comprehensive business and commercial video production across Boca Raton.", href: "/services/video-production-boca-raton" },
      { title: "Bar and bat mitzvah videographer", detail: "Family celebrations and formal event filming in Boca Raton synagogues and resorts.", href: "/services/bar-bat-mitzvah-videographer-boca-raton" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "Boca Raton event videography and reels",
      goalPrompt: "plan and film corporate or cultural event coverage in Boca Raton",
      assetPrompt: "the venue name, schedule of sessions, and desired video deliverables",
    },
  },
  es: {
    metaTitle: "Videógrafo para eventos y festivales en Boca Raton",
    metaDescription:
      `Grabación y edición de video para conferencias, ferias y festivales en Boca Raton: captura desde ${RAW_HALF_DAY}, edición desde ${FROM} por video y resúmenes.`,
    breadcrumb: "Eventos en Boca Raton",
    eyebrow: "Eventos anuales · Boca Raton y Palm Beach",
    h1: "Festivales y eventos empresariales en Boca Raton, grabados con criterio profesional.",
    lead: "Planificación de contenido, grabación en locación y edición de video para cumbres corporativas, foros de negocios y festivales culturales en Boca Raton. Envía tu material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Grabación y edición para eventos en Boca Raton",
    answer: {
      question: "¿Cómo pueden empresas y organizadores registrar sus eventos y festivales en Boca Raton?",
      paragraphs: [
        "Diseña una estrategia audiovisual sólida antes de las fechas del evento en recintos como The Boca Raton resort, Florida Atlantic University y Mizner Park. La ciudad alberga citas anuales de gran repercusión, incluyendo el Festival of the Arts BOCA, foros de finanzas e inversión y exposiciones de la Cámara de Comercio de Boca Raton. Documentar estas jornadas exige precisión: registrar testimonios de ponentes, interacción de patrocinadores y ambiente del público sin entorpecer la agenda.",
        `Esteban Moreno Media ofrece servicio de edición remota desde ${FROM} por video, así como grabación en locación de material en bruto desde ${RAW_HALF_DAY} por media jornada y ${RAW_FULL_DAY} por jornada completa. Con base en Fort Lauderdale, Esteban brinda cobertura ágil en video vertical y archivos completos de ponencias para firmas corporativas, clínicas y productores de eventos en Boca Raton. Cada contratación cuenta con cotización previa por escrito.`,
      ],
    },
    audience: {
      heading: "¿A quién se dirige este servicio de video para eventos en Boca Raton?",
      intro: "Empresas expositoras, directivos corporativos y organizadores de encuentros en Boca Raton:",
      items: [
        "Patrocinadores de congresos en The Boca Raton que necesitan clips ejecutivos y declaraciones de ponentes para LinkedIn.",
        "Productores de festivales y entidades culturales en Mizner Park que requieren resúmenes visuales de alta categoría.",
        "Expositores en cumbres comerciales y encuentros de la Cámara de Boca Raton que buscan mostrar interés de clientes en su stand.",
        "Firmas de gestión patrimonial, consultorías y bufetes que realizan cenas ejecutivas o simposios anuales con inversionistas.",
      ],
      closing:
        "Los complejos hoteleros y auditorios privados exigen acreditación previa para equipos de grabación. Gestiona los accesos antes de la jornada.",
    },
    plan: {
      heading: "¿Qué fases contempla la producción de video para eventos en Boca Raton?",
      cards: [
        {
          title: "Planificación inicial",
          detail:
            "Revisión de la agenda, plano del recinto y requerimientos de patrocinadores. Definimos una lista de tomas prioritarias que incluye testimonios de ponentes, dinámicas de público y presencia de marca institucional.",
        },
        {
          title: "Grabación presencial",
          detail:
            "Con cámaras 4K, audio inalámbrico de solapa y estabilización ligera, la grabación se desarrolla con discreción. Cubrimos conferencias magistrales, declaraciones de asistentes y muestras comerciales.",
        },
        {
          title: "Edición y entrega",
          detail:
            "El material se procesa, corrige de color y edita en reels verticales de alto impacto, videos horizontales de conferencias completas o trailers promocionales para la preventa de futuras ediciones.",
        },
      ],
    },
    send: {
      heading: "¿Qué datos enviar para cotizar video de eventos en Boca Raton?",
      intro: "Envía un mensaje con esta información clave para recibir tu propuesta:",
      items: [
        "Nombre del evento, dirección de la sede (Mizner Park, hotel o auditorio) y fechas de actividades.",
        "Programa del encuentro indicando conferencias centrales, paneles o cócteles que deben ser grabados.",
        "Entregables deseados: archivo de tomas en bruto en 4K, reels verticales para redes o discursos completos.",
        "Manual de marca, colores institucionales y logotipos de patrocinadores en formato vectorial.",
        "Modalidad requerida: edición de material grabado por tu equipo o contratación de grabación presencial.",
        "Tiempos de entrega necesarios para publicaciones inmediatas o comunicados posteriores.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado el Festival of the Arts BOCA ni foros oficiales de la ciudad, y esta página no afirma haberlo hecho. El trabajo publicado más cercano es Homeowners, editado con material suministrado, y Bar Door Monkey Miami, producción gastronómica grabada en locación.",
      href: "/es/portafolio/homeowners",
      label: "Ver Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Cuánto cuesta la grabación de un evento en Boca Raton?",
        answer:
          `Nuestros precios son transparentes y se basan en tarifas publicadas: la grabación en locación de material en bruto parte de ${RAW_HALF_DAY} por media jornada (hasta 4 horas) y ${RAW_FULL_DAY} por jornada completa (hasta 8 horas). La edición remota parte de ${FROM} por video. El paquete integral Presencia Local comienza en ${usd(1600)} al mes.`,
      },
      {
        question: "¿Se pueden grabar tanto salones de conferencias como recepciones nocturnas al aire libre?",
        answer:
          "Sí. Nuestro equipo técnico utiliza sensores full-frame de alta sensibilidad y microiluminación portátil, manteniendo nitidez en 4K tanto en escenarios cerrados como en cócteles al atardecer en patios y terrazas.",
      },
    ],
    related: [
      { title: "Producción de video en Boca Raton", detail: "Servicios comerciales de video corporativo y empresarial en Boca Raton.", href: "/es/editor-de-reels-boca-raton" },
      { title: "Video para bar y bat mitzvah", detail: "Grabación cinematográfica de celebraciones familiares y eventos en sinagogas y hoteles.", href: "/es/video-para-bar-y-bat-mitzvah-boca-raton" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "video para eventos y festivales en Boca Raton",
      goalPrompt: "planificar y grabar contenido de conferencias o festivales en Boca Raton",
      assetPrompt: "nombre de la sede, programa de sesiones y entregables de video que necesitas",
    },
  },
});

const pompanoBeachEvents: EventCopyBuilder = (event) => ({
  en: {
    metaTitle: "Pompano Beach Event Videographer & Festival Video Coverage",
    metaDescription:
      `Videography and editing for Pompano Beach annual festivals, nautical expos, and civic celebrations: raw capture from ${RAW_HALF_DAY}, edits from ${FROM} per video.`,
    breadcrumb: "Pompano Beach Events",
    eyebrow: "Annual events · Pompano Beach & Coastal Broward",
    h1: "Pompano Beach festivals and community events, filmed with coastal vibrancy.",
    lead: "Social content planning, on-location video capture, and post-production editing for annual seaside festivals, nautical markets, and cultural celebrations in Pompano Beach. Send your own clips; on-location filming is a paid add-on scoped per project.",
    serviceName: "Pompano Beach festival and civic event videography",
    answer: {
      question: "How can businesses and organizers produce engaging video content around Pompano Beach events?",
      paragraphs: [
        "Coordinate your video capture plan in advance to showcase coastal events along Atlantic Boulevard, the Pompano Beach Fishing Pier, and Community Park. Pompano Beach features prominent annual celebrations such as the annual Nautical Flea Market, Pompano Beach Jazz Fest, seasonal Caribbean cultural showcases, and the historic Holiday Boat Parade on the Intracoastal. Capturing the oceanfront atmosphere, artisan vendors, and community excitement demands efficient camerawork.",
        `Esteban Moreno Media provides remote social video editing from ${FROM} per video and on-location raw footage recording starting at ${RAW_HALF_DAY} for a half-day shoot and ${RAW_FULL_DAY} for a full day. Operating from neighboring Fort Lauderdale, Esteban produces high-energy vertical reels, sponsor recap videos, and promotional teasers for municipal organizers, beachfront restaurants, and festival vendors across Broward County. Quotes are provided in writing prior to filming.`,
      ],
    },
    audience: {
      heading: "Who benefits from Pompano Beach festival video coverage?",
      intro: "Event coordinators, coastal businesses, and exhibitors active during Pompano Beach festivities:",
      items: [
        "Festival sponsors and corporate exhibitors seeking high-energy recap clips to document community engagement.",
        "Beachfront dining establishments, oceanfront hospitality resorts, and bars running seasonal promotions during festival weekends.",
        "Marine product vendors, nautical artisans, and outdoor equipment brands exhibiting at waterfront trade events.",
        "Municipal and civic cultural committees requiring clean, broadcast-ready event recaps for community archives.",
      ],
      closing:
        "Municipal parks and beachfront venues maintain established vendor guidelines. Ensure drone permits or private access passes are cleared before production.",
    },
    plan: {
      heading: "What does an annual festival video production plan include?",
      cards: [
        {
          title: "Pre-festival strategy",
          detail:
            "We review event schedules, performance line-ups, and vendor booth maps. A practical shot list is prepared covering musical performances, artisan displays, food vendor presentations, and attendee interactions.",
        },
        {
          title: "On-location filming",
          detail:
            "Equipped with stabilized 4K cameras and professional outdoor audio gear, we capture live stage energy, artisan craftsmanship, and dynamic crowd reactions without creating bottlenecks in busy pedestrian pathways.",
        },
        {
          title: "Social reel post-production",
          detail:
            "Footage is cut into vibrant vertical clips with synchronized musical pacing, on-screen subtitles, and sponsor branding, delivered quickly to capitalize on active festival engagement across social feeds.",
        },
      ],
    },
    send: {
      heading: "What should you provide to book Pompano Beach event video?",
      intro: "Submit a message with these practical details to structure your project quote:",
      items: [
        "Festival or event name, location (e.g., beachfront Great Lawn, Amp, or marina grounds), and event dates.",
        "Key highlights to record: live headline concerts, vendor demonstrations, or evening fireworks displays.",
        "Deliverable preferences: raw 4K clip delivery, finished vertical social reels, or promotional wrap-up films.",
        "Branding guidelines, sponsor vector logos, and social media handles for caption tagging.",
        "Selected service structure: editing of client-recorded files, or scheduled on-location camera filming.",
        "Publishing deadlines for same-weekend social teasers or post-event sponsor recap decks.",
      ],
    },
    proof: {
      text: "Esteban has not filmed Pompano Beach municipal festivals or civic events, and this page does not claim past representation. The closest published work is Homeowners, edited from supplied footage, and Bar Door Monkey Miami, a hospitality video filmed on location.",
      href: "/portfolio/homeowners",
      label: "Watch Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "en"),
      {
        question: "How much does festival and event videography cost in Pompano Beach?",
        answer:
          `Rates follow our published price structure: raw on-location filming starts at ${RAW_HALF_DAY} for a half-day session (up to 4 hours) and ${RAW_FULL_DAY} for a full day (up to 8 hours). Remote video editing of supplied footage starts from ${FROM} per video. All terms and deliverables are confirmed in a written quote before work begins.`,
      },
      {
        question: "Can Esteban film outdoor waterfront festivals and night events?",
        answer:
          "Yes. Our professional Sony full-frame cinema kits handle bright outdoor beach lighting with neutral density filters, and low-light sensors record clear footage during evening concerts and holiday boat parades along the Intracoastal Waterway.",
      },
    ],
    related: [
      { title: "Waterfront restaurant video", detail: "Culinary video production and outdoor atmosphere capture for coastal dining venues.", href: "/services/waterfront-restaurant-video-fort-lauderdale" },
      { title: "Marina facility video", detail: "Commercial video production for marinas, boatyards, and yacht docking facilities.", href: "/services/marina-facility-video-fort-lauderdale" },
      hubLink("en"),
    ],
    inquiry: {
      serviceName: "Pompano Beach festival and event videography",
      goalPrompt: "plan and capture festival or community event video in Pompano Beach",
      assetPrompt: "the event location, schedule of activities, and required video deliverables",
    },
  },
  es: {
    metaTitle: "Videógrafo para festivales y eventos en Pompano Beach",
    metaDescription:
      `Grabación y edición de video para festivales, ferias náuticas y eventos en Pompano Beach: filmación desde ${RAW_HALF_DAY}, edición desde ${FROM} por video y resúmenes.`,
    breadcrumb: "Eventos en Pompano Beach",
    eyebrow: "Eventos anuales · Pompano Beach y Costa de Broward",
    h1: "Festivales y eventos en Pompano Beach, grabados con dinamismo costero.",
    lead: "Planificación de contenido, filmación presencial y edición de video para festivales frente al mar, mercados náuticos y celebraciones cívicas en Pompano Beach. Envía tus propios clips; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
    serviceName: "Video para festivales y eventos cívicos en Pompano Beach",
    answer: {
      question: "¿Cómo pueden negocios y organizadores generar contenido en video de los eventos en Pompano Beach?",
      paragraphs: [
        "Planifica con antelación el registro audiovisual de los eventos costeros a lo largo de Atlantic Boulevard, el muelle de Pompano Beach y Community Park. La localidad cuenta con celebraciones anuales consolidadas como la Feria Náutica (Nautical Flea Market), el Festival de Jazz de Pompano Beach, muestras culturales caribeñas y el tradicional Desfile Navideño de Embarcaciones en el Intracoastal. Capturar la energía playera y la gastronomía local requiere agilidad técnica.",
        `Esteban Moreno Media brinda servicio de edición remota de videos para redes desde ${FROM} por video y grabación en locación de material en bruto desde ${RAW_HALF_DAY} por media jornada y ${RAW_FULL_DAY} por jornada completa. Con base en la vecina Fort Lauderdale, Esteban elabora reels verticales dinámicos y resúmenes para patrocinadores, restaurantes playeros y comerciantes locales en el condado de Broward. Todos los presupuestos se acuerdan por escrito.`,
      ],
    },
    audience: {
      heading: "¿Quién aprovecha la cobertura en video de festivales en Pompano Beach?",
      intro: "Comités organizadores, comercios costeros y marcas participantes en eventos de Pompano Beach:",
      items: [
        "Patrocinadores de festivales y empresas expositoras que necesitan documentar su impacto y contacto con la comunidad.",
        "Restaurantes frente al mar, locales de ocio nocturno y hoteles que impulsan ofertas especiales durante fines de semana de fiesta.",
        "Marcas náuticas, talleres de pesca y expositores que participan en ferias de equipamiento marítimo.",
        "Comisiones cívicas y entidades culturales que desean preservar un archivo audiovisual de calidad de sus festividades.",
      ],
      closing:
        "Los parques municipales y paseos marítimos aplican normativas para operadores comerciales. Asegura los permisos de acceso antes del rodaje.",
    },
    plan: {
      heading: "¿Cómo se organiza la producción de video para festivales en Pompano Beach?",
      cards: [
        {
          title: "Estrategia previa",
          detail:
            "Revisión de programas de conciertos, planos de puestos y momentos destacados. Diseñamos una lista de tomas que contempla presentaciones en vivo, áreas gastronómicas e interacción del público.",
        },
        {
          title: "Grabación en el recinto",
          detail:
            "Con cámaras 4K estabilizadas y micrófonos profesionales para exteriores, capturamos el ritmo del escenario y las muestras comerciales con total respeto a la circulación de asistentes.",
        },
        {
          title: "Edición para redes",
          detail:
            "El material se transforma en reels verticales con ritmo musical sincronizado, subtítulos llamativos y marcas de patrocinadores, listos para publicar durante el mismo fin de semana.",
        },
      ],
    },
    send: {
      heading: "¿Qué enviar para solicitar video de festivales en Pompano Beach?",
      intro: "Envía un mensaje con estos datos prácticos para recibir una propuesta clara:",
      items: [
        "Nombre del festival, ubicación exacta (playa, parque o auditorio) y fechas de celebración.",
        "Actividades prioritarias para filmar: conciertos principales, concursos o espectáculos pirotécnicos.",
        "Formato de entrega deseado: archivos 4K en bruto, reels verticales editados o video resumen institucional.",
        "Guía de marca, logotipos vectoriales de patrocinadores y cuentas sociales para etiquetado.",
        "Modalidad elegida: edición de material grabado por tu equipo o contratación de grabación presencial.",
        "Plazos requeridos para publicaciones durante el evento o informes comerciales posteriores.",
      ],
    },
    proof: {
      text: "Esteban no ha grabado los festivales municipales de Pompano Beach ni sus eventos cívicos, y esta página no lo afirma. El trabajo publicado más cercano es Homeowners, editado a partir de material entregado, y Bar Door Monkey Miami, producción gastronómica grabada en locación.",
      href: "/es/portafolio/homeowners",
      label: "Ver Homeowners",
    },
    faqs: [
      ...sharedFaqs(event, "es"),
      {
        question: "¿Cuál es el costo de grabar un festival o evento en Pompano Beach?",
        answer:
          `Nos regimos por tarifas públicas: la grabación presencial de material en bruto parte de ${RAW_HALF_DAY} por media jornada (hasta 4 horas) y ${RAW_FULL_DAY} por jornada completa (hasta 8 horas). La edición remota de material entregado parte de ${FROM} por video. Todo el alcance se detalla en una cotización por escrito antes de comenzar.`,
      },
      {
        question: "¿Se pueden filmar eventos costeros al aire libre y desfiles nocturnos?",
        answer:
          "Sí. Nuestros equipos Sony full-frame incorporan filtros de densidad neutra para el sol del mediodía en la playa y sensores de alta sensibilidad para registrar con nitidez conciertos al anochecer y desfiles de barcos iluminados en el Intracoastal.",
      },
    ],
    related: [
      { title: "Video para restaurantes frente al agua", detail: "Producción audiovisual y ambiente gastronómico para locales en zonas costeras.", href: "/es/video-para-restaurantes-frente-al-agua-fort-lauderdale" },
      { title: "Video comercial para marinas", detail: "Grabación comercial de instalaciones portuarias, astilleros y servicios náuticos.", href: "/es/video-comercial-para-marinas-fort-lauderdale" },
      hubLink("es"),
    ],
    inquiry: {
      serviceName: "video para festivales y eventos en Pompano Beach",
      goalPrompt: "planificar y registrar video de festivales o eventos comunitarios en Pompano Beach",
      assetPrompt: "la ubicación del evento, cronograma de actividades y los entregables que necesitas",
    },
  },
});

const BUILDERS: Partial<Record<EventId, EventCopyBuilder>> = {
  flibs,
  "art-basel": artBasel,
  "miami-boat-show": miamiBoatShow,
  sobewff,
  "emerge-americas": emergeAmericas,
  "miami-music-week": miamiMusicWeek,
  "miami-spice": miamiSpice,
  fitce,
  "boca-raton-events": bocaRatonEvents,
  "pompano-beach-events": pompanoBeachEvents,
};

export function getEventPageCopy(id: EventId, locale: EventLocale): EventPageCopy {
  const builder = BUILDERS[id];
  if (!builder) throw new Error(`No page copy for event ${id}`);
  return builder(getEvent(id))[locale];
}

export function hasEventPageCopy(id: EventId): boolean {
  return Boolean(BUILDERS[id]);
}

export const EVENTS_HUB_COPY = {
  en: {
    metaTitle: "South Florida Event Content Calendar",
    metaDescription:
      `Content for small businesses at South Florida events, by season: calendars, your footage edited from ${FROM} per video, recaps. Not affiliated with any event.`,
    breadcrumb: "Events",
    eyebrow: "Annual events · Broward and Miami-Dade",
    h1: "South Florida's annual events, planned as content before they happen.",
    lead: "For small businesses that exhibit at, sponsor or sell around the region's recurring events. Each page lists the usual window, the next listed dates and a before, during and after content plan.",
    answer: {
      question: "How should a small business plan content around a South Florida event?",
      paragraphs: [
        "Start from the calendar, not from the week of the event. The major recurring events across Fort Lauderdale, Broward County, Boca Raton, Pompano Beach and Miami-Dade (trade expos, boat shows, Art Week, food festivals, tech conferences and civic gatherings) land in predictable seasonal windows every year, so the content can be planned weeks ahead: a posting calendar, a practical shot list your team can follow, and an agreed plan for recap edits afterwards.",
        `Esteban Moreno Media plans that calendar, edits footage your team records into Reels, TikTok and Shorts with English or Spanish captions, and provides on-location raw filming starting from ${RAW_HALF_DAY} for a half-day or ${RAW_FULL_DAY} for a full day, with editing starting from ${FROM} per video. He works Spanish-first with intermediate English from Fort Lauderdale. Across Broward County and South Florida, Esteban covers major expo centers including the Broward County Convention Center, Mizner Park, and coastal festival venues with clear written quotes and transparent rates. None of these events is organized by or affiliated with Esteban Moreno Media; event names describe timing and geographic context only.`,
      ],
    },
    seasons: {
      fall: "Which events land in fall, from October to December?",
      winter: "Which events land in winter, in January and February?",
      spring: "Which events land in spring, from March to May?",
      summer: "Which events land in summer, from June to September?",
    },
    cardCta: "See the content plan",
    faqHeading: "Questions about the annual events calendar.",
    faqs: [
      {
        question: "Are these events organized by Esteban Moreno Media?",
        answer:
          "No. Esteban Moreno Media does not organize, sponsor or represent any event on this page and is not endorsed by them. Event names are used only to describe when the work happens. The service is content planning and editing for businesses that take part in or sell around these events.",
      },
      {
        question: "Has Esteban filmed these events before?",
        answer:
          "This site does not claim that. The published portfolio shows what Esteban has actually made, including editing from supplied footage, venue promos filmed on location and event films, and each event page names the closest real example and how it differs.",
      },
      {
        question: "Which Broward County event venues and cities does Esteban cover?",
        answer:
          `Esteban is based in Fort Lauderdale and actively covers events across Broward County, including the Broward County Convention Center, downtown Fort Lauderdale, Pompano Beach coastal venues, and neighboring Boca Raton. On-location raw filming starts at ${RAW_HALF_DAY} for a half-day session (up to 4 hours) and ${RAW_FULL_DAY} for a full day (up to 8 hours), while remote video editing starts from ${FROM} per video.`,
      },
      {
        question: "How far ahead should I get in touch?",
        answer:
          "As early as your plan allows. A pre-event calendar is only useful if it is approved before the first post is due, so the message should leave time to agree the scope, write the shot list and edit the teasers. Send the event, your dates and your footage, and the quote will say what fits.",
      },
      {
        question: "Why do the pages show a typical window and separate dates?",
        answer:
          "Because the typical window rarely changes, while exact dates change every year and are sometimes moved. Each page shows the usual window first and the next listed edition second, with the date it was last checked. Always confirm on the event's official site.",
      },
    ] as ServiceFaq[],
    related: [
      { title: "All services", detail: "Editing, AI-assisted content, social planning and scoped on-location production.", href: "/services" },
      { title: "Wedding videographer", detail: "Weddings filmed and edited in Fort Lauderdale and Miami, each quoted individually.", href: "/services/wedding-videographer-fort-lauderdale" },
      { title: "Yacht hospitality video", detail: "Editing for yacht charters, marine brokers and hospitality operators.", href: "/services/yacht-hospitality-video-fort-lauderdale" },
      { title: "Restaurant promo video editing", detail: "Menu, dish and atmosphere edits for restaurants.", href: "/services/restaurant-promo-video-editing-miami" },
    ] as RelatedService[],
    inquiry: {
      serviceName: "event content for my business",
      goalPrompt: "plan and edit posts around a South Florida event",
      assetPrompt: "the event, our dates, where we will be and any footage we already have",
    },
  },
  es: {
    metaTitle: "Calendario de contenido para eventos del sur de Florida",
    metaDescription:
      `Contenido para negocios en eventos del sur de Florida, por temporada: calendario, edición desde ${FROM} por video y resúmenes. Sin afiliación con ningún evento.`,
    breadcrumb: "Eventos",
    eyebrow: "Eventos del año · Broward y Miami-Dade",
    h1: "Los eventos del año en el sur de Florida, planificados como contenido antes de que ocurran.",
    lead: "Para pequeños negocios que exponen, patrocinan o venden alrededor de los eventos recurrentes de la región. Cada página muestra la temporada habitual, las próximas fechas publicadas y un plan de contenido para antes, durante y después.",
    answer: {
      question: "¿Cómo debe planificar un pequeño negocio su contenido alrededor de un evento del sur de Florida?",
      paragraphs: [
        "Empieza por el calendario, no por la semana del evento. Los grandes eventos del año en Fort Lauderdale, el condado de Broward, Boca Raton, Pompano Beach y Miami-Dade (ferias internacionales, boat shows, Art Week, festivales y encuentros cívicos) caen en periodos estacionales predecibles, así que el contenido puede planificarse con semanas de anticipación: un calendario de publicaciones, una guía de tomas y un plan acordado para los videos resumen.",
        `Esteban Moreno Media estructura ese calendario, edita el material que graba tu equipo para Reels, TikTok y Shorts con subtítulos en español o inglés, y ofrece grabación presencial en bruto desde ${RAW_HALF_DAY} por media jornada o ${RAW_FULL_DAY} por jornada completa, con edición desde ${FROM} por video. Trabaja desde Fort Lauderdale en español nativo con inglés intermedio. En todo el condado de Broward y el sur de Florida, cubre recintos como el Centro de Convenciones de Broward, Mizner Park y áreas costeras de festivales con tarifas transparentes y cotización previa por escrito. Ninguno de estos eventos es organizado por Esteban Moreno Media ni cuenta con su afiliación; los nombres solo describen las fechas y su entorno geográfico.`,
      ],
    },
    seasons: {
      fall: "¿Qué eventos caen en otoño, de octubre a diciembre?",
      winter: "¿Qué eventos caen en invierno, en enero y febrero?",
      spring: "¿Qué eventos caen en primavera, de marzo a mayo?",
      summer: "¿Qué eventos caen en verano, de junio a septiembre?",
    },
    cardCta: "Ver el plan de contenido",
    faqHeading: "Preguntas sobre el calendario de eventos del año.",
    faqs: [
      {
        question: "¿Esteban Moreno Media organiza estos eventos?",
        answer:
          "No. Esteban Moreno Media no organiza, patrocina ni representa ningún evento de esta página, y ninguno lo respalda. Los nombres se usan solo para describir cuándo ocurre el trabajo. El servicio es la planificación y edición de contenido para negocios que participan en estos eventos o venden alrededor de ellos.",
      },
      {
        question: "¿Esteban ya ha grabado estos eventos?",
        answer:
          "Este sitio no lo afirma. El portafolio publicado muestra lo que Esteban realmente ha hecho, como edición a partir de material entregado, promociones de locales grabadas en locación y películas de eventos, y cada página de evento nombra el ejemplo real más cercano y en qué se diferencia.",
      },
      {
        question: "¿Qué recintos y ciudades del condado de Broward cubre Esteban?",
        answer:
          `Esteban tiene su base en Fort Lauderdale y cubre eventos en todo el condado de Broward, incluyendo el Centro de Convenciones de Broward, el centro de Fort Lauderdale, áreas de eventos en Pompano Beach y la vecina Boca Raton. La filmación en locación parte de ${RAW_HALF_DAY} por media jornada (hasta 4 horas) y ${RAW_FULL_DAY} por jornada completa (hasta 8 horas), mientras que la edición parte de ${FROM} por video.`,
      },
      {
        question: "¿Con cuánta anticipación debo escribir?",
        answer:
          "Tan pronto como tu plan lo permita. Un calendario previo solo sirve si se aprueba antes de la primera publicación, así que el mensaje debe dejar tiempo para acordar el alcance, escribir la lista de tomas y editar los adelantos. Envía el evento, tus fechas y tu material, y la cotización dirá qué es viable.",
      },
      {
        question: "¿Por qué las páginas muestran una temporada habitual y fechas aparte?",
        answer:
          "Porque la temporada habitual casi no cambia, mientras que las fechas exactas cambian cada año y a veces se mueven. Cada página muestra primero la época de siempre y después la próxima edición publicada, con la fecha en que se revisó. Confírmalo siempre en el sitio oficial del evento.",
      },
    ] as ServiceFaq[],
    related: [
      { title: "Todos los servicios", detail: "Edición, contenido con IA, planificación de redes y producción en locación definida por proyecto.", href: "/es/servicios" },
      { title: "Videógrafo de bodas", detail: "Bodas grabadas y editadas en Fort Lauderdale y Miami, cada una cotizada por separado.", href: "/es/videografo-de-bodas-fort-lauderdale" },
      { title: "Video para yates y hospitalidad", detail: "Edición para chárters, brokers náuticos y hospitalidad.", href: "/es/video-para-yates-y-hospitalidad-fort-lauderdale" },
      { title: "Video para restaurantes en Miami", detail: "Platos, menú y ambiente para restaurantes.", href: "/es/video-para-restaurantes-miami" },
    ] as RelatedService[],
    inquiry: {
      serviceName: "contenido para un evento de mi negocio",
      goalPrompt: "planificar y editar publicaciones alrededor de un evento del sur de Florida",
      assetPrompt: "el evento, nuestras fechas, dónde vamos a estar y el material que ya tenemos",
    },
  },
} as const;
