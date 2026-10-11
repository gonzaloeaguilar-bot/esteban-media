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
  displayEdition,
  formatDateRange,
  formatIsoDate,
  getEvent,
  type AnnualEvent,
  type EventId,
  type EventLocale,
} from "@/lib/events";
import { priceSentence } from "@/lib/packages";

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

/** Typical window, then the listed edition (if one is current), as one sentence. */
export function eventDatesSentence(event: AnnualEvent, locale: EventLocale, now?: Date): string {
  const edition = displayEdition(event, now);
  const typical = lowerFirst(event.typicalWindow[locale]);
  if (locale === "es") {
    if (!edition) {
      return `${event.name} normalmente ocurre ${typical.replace(/^normalmente /, "")}. Las guías de eventos todavía no publican la próxima edición, así que revisa las fechas en el sitio oficial.`;
    }
    const where = edition.where ? `, en ${lowerFirst(edition.where.es)}` : "";
    const windows = edition.windows?.length
      ? ` (${edition.windows.map((w) => `${w.label.es}: ${formatDateRange(w.start, w.end, "es")}`).join("; ")})`
      : "";
    return `${event.name} normalmente ocurre ${typical.replace(/^normalmente /, "")}. Las guías de eventos publican la próxima edición ${formatDateRange(edition.start, edition.end, "es")}${where}${windows}. Esas fechas vienen de guías revisadas el ${formatIsoDate(edition.lastChecked, "es")}, no del organizador, así que confírmalas en el sitio oficial antes de planear alrededor de ellas.`;
  }
  if (!edition) {
    return `${event.name} is ${typical}. Event guides have not listed the next edition yet, so check the dates on the official site.`;
  }
  const where = edition.where ? `, at ${lowerFirst(edition.where.en)}` : "";
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
        answer: `No. Esteban Moreno Media no está afiliado, patrocinado ni respaldado por ${event.name} ni por sus organizadores. El nombre del evento se usa solo para describir cuándo ocurre el trabajo. Las reglas para expositores y participantes, los permisos de grabación y las credenciales dependen del evento y de tu propia reserva, así que confírmalos con el organizador antes de planear cualquier grabación en el lugar.`,
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
      answer: `No. Esteban Moreno Media is not affiliated with, sponsored by or endorsed by ${event.name} or its organizers. The event's name is used only to describe the timing of the work. Exhibitor and participant rules, filming permissions and credentials come from the event and from your own booking, so confirm them with the organizer before planning any on-site recording.`,
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
    metaTitle: "Fort Lauderdale Boat Show Content for Exhibitors",
    metaDescription:
      "Pre-show content calendars, editing of your own dock footage and post-show recaps for yacht brokers, charters and marine brands at the Fort Lauderdale boat show.",
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
    metaTitle: "Contenido para expositores del boat show de Fort Lauderdale",
    metaDescription:
      "Calendario de contenido previo, edición de tu propio material en los muelles y videos resumen para brokers de yates, chárter y marcas náuticas en el boat show de Fort Lauderdale.",
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
      "Art Week content calendars, editing of your own footage and recap videos for galleries, brand activations, pop-ups, restaurants and venues around Art Basel Miami Beach.",
    breadcrumb: "Art Basel Miami Beach",
    eyebrow: "Fall · Miami Beach and Miami",
    h1: "Art Week content for galleries, pop-ups and venues, planned before the fair opens.",
    lead: "Social content planning and editing for galleries, brand activations, pop-ups, restaurants and venues working during Art Basel Miami Beach and Miami Art Week. Send your own footage; on-location filming is a paid add-on scoped per project.",
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
      "Calendario de contenido de Art Week, edición de tu propio material y videos resumen para galerías, activaciones de marca, pop-ups, restaurantes y locales alrededor de Art Basel Miami Beach.",
    breadcrumb: "Art Basel Miami Beach",
    eyebrow: "Otoño · Miami Beach y Miami",
    h1: "Contenido de Art Week para galerías, pop-ups y locales, planificado antes de que abra la feria.",
    lead: "Planificación y edición de contenido para redes para galerías, activaciones de marca, pop-ups, restaurantes y locales que trabajan durante Art Basel Miami Beach y la Miami Art Week. Envía tu propio material; la grabación en locación es un servicio adicional pagado que se cotiza por proyecto.",
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

const BUILDERS: Partial<Record<EventId, EventCopyBuilder>> = {
  flibs,
  "art-basel": artBasel,
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
      "Content planning and editing for small businesses that exhibit at, sponsor or sell around recurring South Florida events, listed by season. Not affiliated with any event.",
    breadcrumb: "Events",
    eyebrow: "Annual events · Broward and Miami-Dade",
    h1: "South Florida's annual events, planned as content before they happen.",
    lead: "For small businesses that exhibit at, sponsor or sell around the region's recurring events. Each page lists the usual window, the next listed dates and a before, during and after content plan.",
    answer: {
      question: "How should a small business plan content around a South Florida event?",
      paragraphs: [
        "Start from the calendar, not from the week of the event. The big recurring events (boat shows, Art Week, food festivals, conferences, music week) land in roughly the same window every year, so the content can be planned weeks ahead: a posting calendar, a shot list your own team can follow, and an agreed plan for recap edits afterwards.",
        "Esteban Moreno Media plans that calendar and edits the footage your team records into Reels, TikTok and Shorts with English or Spanish captions. He works from Fort Lauderdale, Spanish-first with intermediate English, and the editing is remote. On-location filming is a paid add-on scoped per project. None of these events is organized by or affiliated with Esteban Moreno Media; the pages use event names only to describe timing.",
      ],
    },
    seasons: {
      fall: "Fall: October to December",
      winter: "Winter: January to February",
      spring: "Spring: March to May",
      summer: "Summer: June to September",
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
      "Planificación y edición de contenido para pequeños negocios que exponen, patrocinan o venden alrededor de eventos recurrentes del sur de Florida, por temporada. Sin afiliación con ningún evento.",
    breadcrumb: "Eventos",
    eyebrow: "Eventos del año · Broward y Miami-Dade",
    h1: "Los eventos del año en el sur de Florida, planificados como contenido antes de que ocurran.",
    lead: "Para pequeños negocios que exponen, patrocinan o venden alrededor de los eventos recurrentes de la región. Cada página muestra la temporada habitual, las próximas fechas publicadas y un plan de contenido para antes, durante y después.",
    answer: {
      question: "¿Cómo debe planificar un pequeño negocio su contenido alrededor de un evento del sur de Florida?",
      paragraphs: [
        "Empieza por el calendario, no por la semana del evento. Los grandes eventos recurrentes (boat shows, Art Week, festivales gastronómicos, conferencias, la semana de la música) caen más o menos en la misma época cada año, así que el contenido se puede planificar con semanas de anticipación: un calendario de publicaciones, una lista de tomas que tu propio equipo puede seguir y un plan acordado para los videos resumen.",
        "Esteban Moreno Media arma ese calendario y edita el material que graba tu equipo para Reels, TikTok y Shorts, con subtítulos en español o inglés. Trabaja desde Fort Lauderdale, primero en español y con inglés intermedio, y la edición es remota. La grabación en locación es un servicio adicional pagado que se define por proyecto. Ninguno de estos eventos lo organiza Esteban Moreno Media ni está afiliado a él; las páginas usan los nombres solo para describir las fechas.",
      ],
    },
    seasons: {
      fall: "Otoño: de octubre a diciembre",
      winter: "Invierno: de enero a febrero",
      spring: "Primavera: de marzo a mayo",
      summer: "Verano: de junio a septiembre",
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
