import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/site-metadata";
import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl } from "@/lib/site";
import { getPortfolioItemById, isYouTubeSource } from "@/lib/portfolio";

export const CASE_STUDY_IDS = [
  "banacol",
  "homeowners",
  "flas-concierge",
  "healthy-smile",
  "my-dler",
  "gains-from-geebs",
  "caro-sells-miami",
  "dupont-realty-international",
  "great-reviewer-website",
  "gains-from-geebs-shorts",
  "exatlon",
  "juanchis-burguer",
  "portosole",
  "punto-de-giro",
] as const;

export type CaseStudyId = (typeof CASE_STUDY_IDS)[number];
export type CaseStudyLocale = "en" | "es";

export type CaseStudySection = {
  heading: string;
  subheading?: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  callout?: {
    title: string;
    text: string;
  };
};

export type CaseStudyMetaField = {
  label: string;
  value: string;
};

export type CaseStudy = {
  id: CaseStudyId;
  locale: CaseStudyLocale;
  slug: CaseStudyId;
  title: string;
  metadataTitle: string;
  client: string;
  summary: string;
  /** Search snippet when the visible summary runs past ~160 characters (loop row 27). */
  metaDescription?: string;
  eyebrow: string;
  role: string;
  year?: number;
  location?: string;
  deliverables: string;
  agencyContext?: string;
  /** Answer-first section under the hero (loop row 68): facts already stated on the page, 100-180 words. */
  answer: {
    question: string;
    text: string;
  };
  mediaUrl: string;
  posterUrl: string;
  websiteUrl?: string;
  reviewUrl?: string;
  reviewNote?: string;
  serviceLink: {
    href: string;
    label: string;
    description: string;
  };
  contactLink: {
    href: string;
    label: string;
  };
  portfolioLink: {
    href: string;
    label: string;
  };
  keyFacts: readonly CaseStudyMetaField[];
  scopingQuestions: readonly string[];
  sections: readonly CaseStudySection[];
};

type CaseStudyPair = {
  id: CaseStudyId;
  en: Omit<CaseStudy, "id" | "locale" | "slug">;
  es: Omit<CaseStudy, "id" | "locale" | "slug">;
};

type PublicMediaCase = {
  id: CaseStudyId;
  client: string;
  title: string;
  titleEs: string;
  summary: string;
  summaryEs: string;
  source: string;
  sourceEs: string;
  service: string;
  serviceEs: string;
  serviceHref: string;
  serviceHrefEs: string;
};

type WebsiteCase = {
  id: CaseStudyId;
  client: string;
  clientEs: string;
  title: string;
  titleEs: string;
  summary: string;
  summaryEs: string;
  liveSite: string;
  role: string;
  roleEs: string;
  deliverables: string;
  deliverablesEs: string;
  facts: readonly CaseStudyMetaField[];
  factsEs: readonly CaseStudyMetaField[];
  capabilities: readonly string[];
  capabilitiesEs: readonly string[];
};

function websiteCasePair(item: WebsiteCase): CaseStudyPair {
  const portfolioItem = getPortfolioItemById(item.id);
  const poster = portfolioItem?.media.kind === "image" ? portfolioItem.media.src : "";
  const sourceBoundary = `The live website at ${item.liveSite} is the public source for this case. It confirms a currently reachable product surface and the visitor-facing capabilities named below. It does not, by itself, prove traffic, leads, revenue, rankings, citations, conversion rate, or a customer outcome.`;
  const sourceBoundaryEs = `El sitio activo ${item.liveSite} es la fuente pública de este caso. Confirma una superficie de producto actualmente accesible y las capacidades para visitantes que se nombran abajo. Por sí solo no prueba tráfico, prospectos, ingresos, posiciones, citas, tasa de conversión ni un resultado comercial.`;
  const answer = `In 2026, ${item.summary} The live site at ${item.liveSite} confirms a public website with the visitor-facing capabilities named on this page. A person can inspect the information hierarchy, choose a relevant path, and continue through the site's available contact or inquiry route. Esteban Moreno Media records the delivered website system and ${item.role.toLowerCase()}, not a forecast of business performance. The public source does not establish traffic, leads, revenue, search positions, AI citations, conversion rate, or customer outcome. This case therefore separates the visible product from later measurement: it is a concrete reference for discussing a comparable website, while any new project needs its own facts, owner, contact handoff, and dated success measure.`;
  const answerEs = `En 2026, ${item.summaryEs} El sitio activo ${item.liveSite} confirma un sitio web público con las capacidades para visitantes nombradas en esta página. Una persona puede revisar la jerarquía de información, elegir una ruta relevante y continuar por el contacto o la consulta disponible. Esteban Moreno Media documenta el sistema web entregado y ${item.roleEs.toLowerCase()}, no una predicción del desempeño comercial. La fuente pública no establece tráfico, prospectos, ingresos, posiciones de búsqueda, citas de IA, tasa de conversión ni resultado para clientes. Por eso este caso separa el producto visible de la medición posterior: es una referencia concreta para hablar de un sitio comparable, mientras que cada proyecto nuevo necesita sus propios hechos, responsable, entrega de consultas y medida de éxito con fecha.`;
  return {
    id: item.id,
    en: {
      title: item.title,
      metadataTitle: `${item.client} Website Case Study | Esteban Moreno Media`,
      client: item.client,
      summary: item.summary,
      eyebrow: "Website Design & Information System",
      role: item.role,
      year: 2026,
      deliverables: item.deliverables,
      answer: { question: `What is confirmed about the ${item.client} website?`, text: answer },
      mediaUrl: item.liveSite,
      posterUrl: poster,
      websiteUrl: item.liveSite,
      serviceLink: { href: "/services/website-design-fort-lauderdale", label: "Website Design & AI Chatbots Service", description: "Explore a scoped website and customer-inquiry system for a South Florida business." },
      contactLink: { href: "/contact", label: "Discuss a Website Project" },
      portfolioLink: { href: `/portfolio/${item.id}`, label: "View the Website Project" },
      keyFacts: item.facts,
      scopingQuestions: ["Who needs to recognize themselves in the first screen?", "What information must a visitor find before they contact the business?", "Which current data, listings, articles, or tools need a reliable owner and update path?", "What must happen after a visitor asks a question?", "Which business outcome will be measured after release?"],
      sections: [
        { heading: "What was built", paragraphs: [`${item.summary} The work is presented as a live website example, not as a generic web-design mockup. Its public surface gives a prospective client a way to inspect the tone, information hierarchy and next-step choices in a real context. ${sourceBoundary}`, `The role for this case is ${item.role.toLowerCase()}. The deliverable is ${item.deliverables.toLowerCase()}. That description is intentionally narrower than an outcome claim: it says what a visitor can see and use today, while leaving commercial performance to a separate dated measurement.`], bullets: item.capabilities },
        { heading: "Information and visitor path", paragraphs: ["A useful website does not ask a visitor to decode an internal process before finding the point of the page. The first screen must say what the business offers and what a person can do next. From there, the site should let a visitor go deeper only when it is relevant: compare an option, inspect a category, understand a service or start a direct conversation.", "That is the pattern documented in this example. The public path is evidence of a designed interface and content system, not evidence that every visitor completes the next step. Any future project needs its own visitor, offer, content source, data owner and contact handoff before it can be judged against this work."] },
        { heading: "What can be verified now", paragraphs: [`The current public page is reachable at ${item.liveSite}. The facts listed on this page stay limited to what was observed on that live surface and to the delivered website system. They are sufficient to show the shape of the work: a named site, a readable journey and a direct way to continue.`, "This page deliberately does not import dashboard numbers, client testimonials, search performance or commercial claims without a dated source. A live page and a live interaction are stronger evidence than an old presentation, but they are still not a business result. Keeping that distinction visible makes this case study useful for an honest project conversation."] },
        { heading: "How a comparable website starts", paragraphs: ["A comparable project begins by naming the visitor and the decision they need to make. Then the business confirms the facts, images, listings, products, articles or service details that belong on the page, who updates them and where an inquiry should go. The visual direction follows the business identity instead of copying this project's look.", "Before launch, the important checks are mobile reading, visible actions, keyboard access, raw HTML for the facts that must be crawlable, and the real boundary behind a contact or application action. After launch, a dated measurement plan can determine whether the site creates qualified inquiries. That later measurement is not substituted with a design claim here."] },
        { heading: "What remains unmeasured", paragraphs: ["This case does not claim that the website caused a ranking change, an AI citation, a lead, a booking, a sale or a revenue result. Those are separate outcomes and require their own source, date, denominator and comparison window. A visitor can inspect the public work now; the performance question remains open until it is measured.", "For a new project, that boundary is practical rather than defensive. It keeps the conversation on the system that needs to be built, the information that needs to stay accurate and the measurable next action. Esteban can then scope the website around the actual business workflow instead of promising that one existing example guarantees an identical result."] }
      ]
    },
    es: {
      title: item.titleEs,
      metadataTitle: `Caso web: ${item.clientEs} | Esteban Moreno Media`,
      client: item.clientEs,
      summary: item.summaryEs,
      eyebrow: "Diseño web y sistema de información",
      role: item.roleEs,
      year: 2026,
      deliverables: item.deliverablesEs,
      answer: { question: `¿Qué se confirma del sitio de ${item.clientEs}?`, text: answerEs },
      mediaUrl: item.liveSite,
      posterUrl: poster,
      websiteUrl: item.liveSite,
      serviceLink: { href: "/es/diseno-web-fort-lauderdale", label: "Servicio de diseño web y chatbots con IA", description: "Conoce un sitio web y sistema de consultas definido para un negocio del sur de Florida." },
      contactLink: { href: "/es/contacto", label: "Hablar de un proyecto web" },
      portfolioLink: { href: `/es/portafolio/${item.id}`, label: "Ver el proyecto web" },
      keyFacts: item.factsEs,
      scopingQuestions: ["¿Quién debe reconocerse en la primera pantalla?", "¿Qué información necesita encontrar una persona antes de contactar al negocio?", "¿Qué datos, anuncios, artículos o herramientas necesitan una fuente y una actualización clara?", "¿Qué debe pasar después de que una persona haga una consulta?", "¿Qué resultado de negocio se medirá después de publicar?"],
      sections: [
        { heading: "Qué se construyó", paragraphs: [`${item.summaryEs} El trabajo se presenta como un ejemplo de sitio web activo, no como un mockup genérico. Su superficie pública permite revisar tono, jerarquía de información y opciones para continuar en un contexto real. ${sourceBoundaryEs}`, `El rol de este caso es ${item.roleEs.toLowerCase()}. El entregable es ${item.deliverablesEs.toLowerCase()}. Esa descripción es más limitada que una afirmación de resultado: dice qué se puede ver y usar hoy, y deja el desempeño comercial para una medición fechada aparte.`], bullets: item.capabilitiesEs },
        { heading: "Información y camino de la persona", paragraphs: ["Un sitio útil no obliga a descifrar un proceso interno antes de encontrar el punto de la página. La primera pantalla debe decir qué ofrece el negocio y qué puede hacer una persona después. Desde ahí, el sitio permite profundizar cuando importa: comparar una opción, explorar una categoría, entender un servicio o empezar una conversación directa.", "Ese es el patrón documentado en este ejemplo. La ruta pública prueba una interfaz y un sistema de contenido diseñados, no que cada visitante complete el siguiente paso. Todo proyecto nuevo necesita su propia audiencia, oferta, fuente de contenido, responsable de datos y entrega de consultas antes de compararse con este trabajo."] },
        { heading: "Qué se puede verificar hoy", paragraphs: [`La página pública actual está disponible en ${item.liveSite}. Los hechos de esta página se limitan a lo observado en esa superficie activa y al sistema web entregado. Alcanzan para mostrar la forma del trabajo: un sitio nombrado, un recorrido legible y una forma directa de continuar.`, "Esta página no importa cifras de analítica, testimonios, desempeño de búsqueda ni afirmaciones comerciales sin una fuente fechada. Una página y una interacción activas son mejor evidencia que una presentación vieja, pero todavía no son un resultado de negocio. Mantener esa diferencia visible hace que este caso sirva para una conversación honesta."] },
        { heading: "Cómo empieza un sitio comparable", paragraphs: ["Un proyecto comparable empieza por nombrar a la persona visitante y la decisión que necesita tomar. Luego el negocio confirma los hechos, imágenes, anuncios, productos, artículos o detalles de servicio que van en la página, quién los actualiza y adónde llega una consulta. La dirección visual sigue la identidad del negocio, sin copiar la apariencia de este proyecto.", "Antes de publicar, las comprobaciones importantes son lectura en celular, acciones visibles, acceso por teclado, HTML inicial para los hechos que deben ser rastreables y el límite real detrás de una consulta o aplicación. Después de publicar, un plan con fecha puede determinar si el sitio crea consultas calificadas. Esta página no sustituye esa medición con una afirmación de diseño."] },
        { heading: "Qué sigue sin medirse", paragraphs: ["Este caso no afirma que el sitio haya causado una posición, una cita de IA, un prospecto, una reserva, una venta ni un ingreso. Son resultados separados y requieren su propia fuente, fecha, denominador y ventana de comparación. Una persona puede revisar el trabajo público ahora; la pregunta de desempeño queda abierta hasta que se mida.", "Para un proyecto nuevo, ese límite es práctico. Mantiene la conversación en el sistema que hay que construir, la información que debe mantenerse correcta y la siguiente acción que se puede medir. Esteban puede entonces definir el sitio alrededor del flujo real del negocio, sin prometer que un ejemplo existente garantice un resultado idéntico."] }
      ]
    }
  };
}

function publicMediaCasePair(item: PublicMediaCase): CaseStudyPair {
  const media = getPortfolioItemById(item.id)?.media as { url: string; poster: string } | undefined;
  const common = `The published source is ${item.source}. It identifies this work as ${item.summary.toLowerCase()} Esteban Moreno Media presents the project as a public example of produced video, and this page keeps that boundary intact. A visitor can inspect the published work, its framing, pacing, and the visible creative choices before deciding whether the reference is relevant to a new brief. The available source does not establish a customer result, price, campaign reach, number of deliverables, timeline, audience response, or a role more specific than producing the video. This case study therefore records the public source and the limited confirmed role. A comparable project still needs its own viewer, platform, source material, deliverables, review process, and written measurement plan before anyone can judge its outcome.`;
  const commonEs = `La fuente publicada es ${item.sourceEs}. Identifica este trabajo como ${item.summaryEs.toLowerCase()} Esteban Moreno Media presenta el proyecto como un ejemplo público de video producido y esta página conserva ese límite. Una persona puede revisar el trabajo publicado, su encuadre, ritmo y decisiones creativas visibles antes de decidir si la referencia sirve para un nuevo pedido. La fuente disponible no establece resultado del cliente, precio, alcance de campaña, número de entregables, cronograma, respuesta de audiencia ni un rol más específico que producir el video. Por eso este caso registra la fuente pública y el rol confirmado limitado. Un proyecto comparable todavía necesita su propia audiencia, plataforma, material, entregables, revisión y plan de medición por escrito antes de juzgar su resultado.`;
  return {
    id: item.id,
    en: {
      title: item.title,
      metadataTitle: `${item.title} Case Study | Esteban Moreno Media`,
      client: item.client,
      summary: item.summary,
      eyebrow: "Published media project",
      role: "Produced video",
      deliverables: "Published video work shown through its original public source",
      answer: { question: `What is confirmed about ${item.client}?`, text: common },
      mediaUrl: media?.url ?? "",
      posterUrl: media?.poster ?? "",
      serviceLink: { href: item.serviceHref, label: item.service, description: "See the existing service page for a scoped project conversation." },
      contactLink: { href: "/contact", label: "Discuss a Video Project" },
      portfolioLink: { href: `/portfolio/${item.id}`, label: "View the Published Project" },
      keyFacts: [
        { label: "Confirmed role", value: "Produced video" },
        { label: "Evidence", value: item.source },
        { label: "Project record", value: "Publicly published source and portfolio page" },
        { label: "Not claimed", value: "Performance, sales, views, price, or unconfirmed scope" },
        { label: "Next step", value: "Review the matching service for a project-specific scope" },
      ],
      scopingQuestions: ["What video needs to be produced?", "Where will it be published?", "What public work can be used as the reference?"],
      sections: [
        { heading: "What the public record confirms", paragraphs: [common, "The linked portfolio page keeps the original source available so a visitor can inspect the published work directly. The case study does not turn a social post or video title into a result claim. It records the identity of the example, the public source, and the limited role confirmed for this site: produced video. That is enough to make the example useful without filling gaps with assumptions."] },
        { heading: "How to read this example", paragraphs: ["A finished public video can help a prospective client judge tone, pacing, framing, and whether the type of work resembles their own need. It cannot by itself show the whole brief, production schedule, revision process, budget, audience response, or commercial result. Those details are decided for each project. This page therefore links the visible work to the existing service that explains how a new request is scoped.", "The source remains the reference point. If a visitor needs something similar, the useful next conversation is about their footage, intended platform, message, deliverables, and approval process—not a promise that a new project will reproduce an unknown outcome."] },
        { heading: "A source-bounded case study", paragraphs: ["This case study is deliberately narrower than a retrospective written from private project files. It uses the material a visitor can verify: the published title or caption, the named public account or channel, and the work itself. No testimonial, analytics figure, customer quote, or business metric has been added. That makes the page a durable reference rather than an advertisement built from unsupported detail.", "The portfolio and case-study pages serve different jobs. The portfolio is the direct visual record; this page gives the record context, states what is and is not known, and provides an appropriate next step for a new inquiry."] },
        { heading: "Starting a comparable project", paragraphs: ["A comparable project starts by naming the intended viewer, the final platform, the source material available, and the deliverables needed. The matching service page explains the current offer; a project conversation determines the actual scope. Esteban can then confirm what is included before work begins.", "The safest way to use this example is as creative reference, not as a forecast. Bring a link to the part of the work that is relevant and describe what must be different for your own audience, brand, or publishing plan."] },
        { heading: "What remains project-specific", paragraphs: ["Every published example leaves important decisions open. A new project may need a different length, aspect ratio, source footage, location, review process, rights arrangement, accessibility treatment, or publishing plan. Those choices should be documented in the request instead of inferred from a public post. The work shown here provides a concrete starting point for a creative discussion, while the actual agreement defines what will be made and what will be delivered.", "This distinction also protects the person evaluating the work. A restaurant, creator, fitness business, or documentary team should be able to recognize relevant craft without being told that its audience, assets, or commercial situation is the same as someone else’s. The public source is evidence of one completed example. It is not a template for price, timing, or outcome. Clear inputs and a written scope are the way to make a new project comparable in the ways that matter."] },
      ],
    },
    es: {
      title: item.titleEs,
      metadataTitle: `Caso: ${item.titleEs} | Esteban Moreno Media`,
      client: item.client,
      summary: item.summaryEs,
      eyebrow: "Proyecto de medios publicado",
      role: "Video producido",
      deliverables: "Trabajo de video publicado y mostrado desde su fuente pública original",
      answer: { question: `¿Qué se confirma sobre ${item.client}?`, text: commonEs },
      mediaUrl: media?.url ?? "",
      posterUrl: media?.poster ?? "",
      serviceLink: { href: item.serviceHrefEs, label: item.serviceEs, description: "Consulta el servicio existente para hablar de un alcance específico." },
      contactLink: { href: "/es/contacto", label: "Hablar de un proyecto de video" },
      portfolioLink: { href: `/es/portafolio/${item.id}`, label: "Ver el proyecto publicado" },
      keyFacts: [{ label: "Rol confirmado", value: "Video producido" }, { label: "Evidencia", value: item.sourceEs }, { label: "Registro", value: "Fuente pública y página de portafolio" }, { label: "No se afirma", value: "Rendimiento, ventas, vistas, precio o alcance no confirmado" }, { label: "Siguiente paso", value: "Revisar el servicio correspondiente" }],
      scopingQuestions: ["¿Qué video necesitas producir?", "¿Dónde se publicará?", "¿Qué trabajo público sirve como referencia?"],
      sections: [
        { heading: "Lo que confirma el registro público", paragraphs: [commonEs, "La página de portafolio enlazada mantiene disponible la fuente original para que la persona vea el trabajo publicado directamente. Este caso no convierte un post o un título en una afirmación de resultados. Registra la identidad del ejemplo, la fuente pública y el rol limitado confirmado para este sitio: video producido."] },
        { heading: "Cómo leer este ejemplo", paragraphs: ["Un video público terminado permite evaluar tono, ritmo, encuadre y si el tipo de trabajo se parece a la necesidad propia. No demuestra por sí solo el brief completo, calendario, revisiones, presupuesto, respuesta de audiencia ni resultado comercial. Esos detalles se definen en cada proyecto. Por eso esta página enlaza al servicio existente que explica cómo se cotiza un nuevo trabajo.", "La fuente sigue siendo el punto de referencia. Si necesitas algo parecido, la conversación útil es sobre tu material, plataforma, mensaje, entregables y proceso de aprobación, no una promesa de repetir un resultado desconocido."] },
        { heading: "Un caso limitado a su fuente", paragraphs: ["Este caso es más limitado que una retrospectiva escrita con archivos privados del proyecto. Usa lo que cualquier visitante puede verificar: título o texto publicado, cuenta o canal público nombrado y el trabajo mismo. No agrega testimonios, analítica, citas de clientes ni métricas comerciales. Así funciona como referencia duradera sin inventar detalles.", "El portafolio es el registro visual directo; este caso aporta contexto, explica qué se sabe y qué no, y deja una siguiente acción adecuada para una consulta nueva."] },
        { heading: "Empezar un proyecto comparable", paragraphs: ["Un proyecto comparable comienza definiendo audiencia, plataforma final, material disponible y entregables. El servicio correspondiente explica la oferta actual; la conversación define el alcance real. Esteban puede confirmar lo incluido antes de empezar.", "Usa este ejemplo como referencia creativa, no como pronóstico. Comparte el enlace o momento relevante y explica qué debe cambiar para tu marca, audiencia o plan de publicación."] },
        { heading: "Lo que sigue siendo específico de cada proyecto", paragraphs: ["Cada ejemplo público deja decisiones importantes abiertas. Un proyecto nuevo puede necesitar otra duración, proporción, material, locación, proceso de revisión, acuerdo de derechos, tratamiento de accesibilidad o plan de publicación. Esas decisiones se documentan en la solicitud, no se infieren de una publicación pública. El trabajo mostrado sirve como punto de partida concreto para una conversación creativa; el acuerdo real define qué se hará y qué se entregará.", "Esta diferencia también protege a quien evalúa el trabajo. Un restaurante, creador, negocio fitness o equipo documental puede reconocer una ejecución relevante sin que se le diga que su audiencia, activos o situación comercial son iguales a los de otra persona. La fuente pública prueba un ejemplo terminado. No es una plantilla de precio, tiempo ni resultado. Los insumos claros y un alcance por escrito hacen comparable un proyecto nuevo en lo que sí importa."] },
      ],
    },
  };
}

const publicMediaCasePairs: readonly CaseStudyPair[] = [
  publicMediaCasePair({ id: "gains-from-geebs-shorts", client: "Gains From Geebs", title: "Gains From Geebs Short-Form Videos", titleEs: "Videos cortos de Gains From Geebs", summary: "Two short-form videos publicly published by Kris Oddo | Geebs Method.", summaryEs: "Dos videos cortos publicados públicamente por Kris Oddo | Geebs Method.", source: "Kris Oddo | Geebs Method YouTube channel", sourceEs: "canal de YouTube Kris Oddo | Geebs Method", service: "Short-Form Video Editing", serviceEs: "Edición de video corto", serviceHref: "/services/short-form-video-editor-miami", serviceHrefEs: "/es/editor-de-video-corto-miami" }),
  publicMediaCasePair({ id: "exatlon", client: "Exatlón", title: "Exatlón Intro Video", titleEs: "Video de introducción de Exatlón", summary: "An Exatlón intro video publicly published by Esteban Moreno Media.", summaryEs: "Un video de introducción de Exatlón publicado públicamente por Esteban Moreno Media.", source: "Esteban Moreno Media Instagram post", sourceEs: "publicación de Instagram de Esteban Moreno Media", service: "Fitness Trainer Video Production", serviceEs: "Producción de video para entrenadores fitness", serviceHref: "/services/fitness-trainer-video-production-miami", serviceHrefEs: "/es/produccion-de-video-para-entrenadores-fitness-miami" }),
  publicMediaCasePair({ id: "juanchis-burguer", client: "Juanchis Burguer", title: "Juanchis Burguer Social Media Campaign", titleEs: "Campaña de redes sociales de Juanchis Burguer", summary: "A social media campaign with Juanchis Burguer, Miami, publicly published by Esteban Moreno Media.", summaryEs: "Una campaña de redes sociales con Juanchis Burguer, Miami, publicada públicamente por Esteban Moreno Media.", source: "Esteban Moreno Media Instagram post", sourceEs: "publicación de Instagram de Esteban Moreno Media", service: "Restaurant Promo Video Editing", serviceEs: "Edición de video promocional para restaurantes", serviceHref: "/services/restaurant-promo-video-editing-miami", serviceHrefEs: "/es/edicion-de-video-promocional-para-restaurantes-miami" }),
  publicMediaCasePair({ id: "portosole", client: "Portosole", title: "Portosole Social Media Campaign", titleEs: "Campaña de redes sociales de Portosole", summary: "A social media campaign with Portosole, Miami, publicly published by Esteban Moreno Media.", summaryEs: "Una campaña de redes sociales con Portosole, Miami, publicada públicamente por Esteban Moreno Media.", source: "Esteban Moreno Media Instagram post", sourceEs: "publicación de Instagram de Esteban Moreno Media", service: "Restaurant Promo Video Editing", serviceEs: "Edición de video promocional para restaurantes", serviceHref: "/services/restaurant-promo-video-editing-miami", serviceHrefEs: "/es/edicion-de-video-promocional-para-restaurantes-miami" }),
  publicMediaCasePair({ id: "punto-de-giro", client: "Punto de Giro", title: "Punto de Giro Documentary", titleEs: "Documental Punto de Giro", summary: "The public Punto de Giro documentary trailer and behind-the-scenes video on Esteban Moreno López's YouTube channel.", summaryEs: "El tráiler y el video detrás de cámaras publicados públicamente del documental Punto de Giro en el canal de YouTube de Esteban Moreno López.", source: "Esteban Moreno López YouTube channel", sourceEs: "canal de YouTube de Esteban Moreno López", service: "Video Production", serviceEs: "Producción de video", serviceHref: "/services/video-production-fort-lauderdale", serviceHrefEs: "/es/produccion-de-video-fort-lauderdale" }),
];

const websiteCasePairs: readonly CaseStudyPair[] = [
  websiteCasePair({
    id: "gains-from-geebs", client: "Gains From Geebs", clientEs: "Gains From Geebs",
    title: "Gains From Geebs: Current 1:1 Fitness Coaching Website", titleEs: "Gains From Geebs: Sitio actual de coaching fitness 1:1",
    summary: "A current 1:1 online fitness coaching website for Kris Oddo, with a direct start path, method, packages, results and free learning resources.", summaryEs: "Sitio actual de coaching fitness online 1:1 de Kris Oddo, con una ruta directa para empezar, método, paquetes, resultados y recursos gratuitos.",
    liveSite: "https://gainsfromgeebs.com/", role: "Website designer and information-systems integrator", roleEs: "Diseñador web e integrador de sistemas de información", deliverables: "Responsive coaching website, direct-start route, method and package discovery, results and learning-resource navigation", deliverablesEs: "Sitio de coaching responsivo, ruta directa para empezar, descubrimiento de método y paquetes, resultados y navegación de recursos",
    facts: [{ label: "Business", value: "1:1 online fitness coaching by Kris Oddo" }, { label: "Visible path", value: "Start, method, packages, results and learning hub" }, { label: "Coaching flow", value: "Application begins from the public website" }, { label: "Website status", value: "Live public site" }, { label: "Not claimed", value: "Coaching, lead or revenue outcome" }],
    factsEs: [{ label: "Negocio", value: "Coaching fitness online 1:1 de Kris Oddo" }, { label: "Ruta visible", value: "Empezar, método, paquetes, resultados y centro de aprendizaje" }, { label: "Flujo de coaching", value: "La aplicación empieza desde el sitio público" }, { label: "Estado del sitio", value: "Sitio público activo" }, { label: "No se afirma", value: "Resultado de coaching, prospectos o ingresos" }],
    capabilities: ["A clear 1:1 coaching introduction with a direct start route", "Navigation for the method, packages, results and learning resources", "A public application path for prospective coaching clients"], capabilitiesEs: ["Introducción clara al coaching 1:1 con ruta directa para empezar", "Navegación de método, paquetes, resultados y recursos", "Ruta pública de aplicación para personas interesadas en coaching"]
  }),
  websiteCasePair({
    id: "caro-sells-miami", client: "Caro Sells Miami", clientEs: "Caro Sells Miami",
    title: "Caro Sells Miami: Bilingual Real-Estate Discovery Website", titleEs: "Caro Sells Miami: Sitio inmobiliario bilingüe para descubrir propiedades",
    summary: "A bilingual real-estate website that guides Miami buyers through current listing links, building discovery, rental routes and direct contact with Carolina.", summaryEs: "Sitio inmobiliario bilingüe que guía a compradores de Miami hacia enlaces de anuncios actuales, edificios, alquileres y contacto directo con Carolina.",
    liveSite: "https://carosellsmiami.com/", role: "Website designer and real-estate information-systems integrator", roleEs: "Diseñador web e integrador de sistemas de información inmobiliaria", deliverables: "Bilingual buyer journey, building-discovery system, live listing links and lead-capture experience", deliverablesEs: "Ruta bilingüe para compradores, sistema de descubrimiento de edificios, enlaces a anuncios actuales y experiencia de captura de consultas",
    facts: [{ label: "Languages", value: "English and Spanish" }, { label: "Visible path", value: "Current listings, rentals, buildings and buyer guides" }, { label: "Building discovery", value: "Building pages and area directories" }, { label: "Contact", value: "Direct agent contact and web inquiry form" }, { label: "Not claimed", value: "Listing, lead or transaction outcome" }],
    factsEs: [{ label: "Idiomas", value: "Inglés y español" }, { label: "Ruta visible", value: "Anuncios actuales, alquileres, edificios y guías" }, { label: "Descubrimiento de edificios", value: "Páginas de edificios y directorios de zonas" }, { label: "Contacto", value: "Contacto directo con la agente y formulario web" }, { label: "No se afirma", value: "Resultado de anuncio, prospecto o transacción" }],
    capabilities: ["Bilingual buyer routes for sales, rentals and building research", "Links into current listing search with availability confirmed by the agent", "Direct WhatsApp and web-form contact paths"], capabilitiesEs: ["Rutas bilingües para compra, alquiler e investigación de edificios", "Enlaces a búsqueda de anuncios actuales con disponibilidad confirmada por la agente", "Contacto directo por WhatsApp y formulario web"]
  }),
  websiteCasePair({
    id: "dupont-realty-international", client: "DuPont International Realty Florida", clientEs: "DuPont International Realty Florida",
    title: "DuPont International Realty Florida: South Florida Broker Website", titleEs: "DuPont International Realty Florida: Sitio de corretaje inmobiliario del sur de Florida",
    summary: "A real-estate broker website that gives buyers and sellers a direct starting point for Broward, Palm Beach and Miami-Dade guidance.", summaryEs: "Sitio de corretaje inmobiliario que ofrece a compradores y vendedores un punto de partida directo para Broward, Palm Beach y Miami-Dade.",
    liveSite: "https://dupontrealtysouthflorida.com/", role: "Website designer and real-estate information architect", roleEs: "Diseñador web y arquitecto de información inmobiliaria", deliverables: "Broker website, buyer and seller guidance paths, market-area entry points and direct inquiry flow", deliverablesEs: "Sitio de corretaje, rutas de orientación para compradores y vendedores, entradas por mercado y flujo de consulta directo",
    facts: [{ label: "Service area", value: "Broward, Palm Beach and Miami-Dade" }, { label: "Audience", value: "Buyers and sellers" }, { label: "Visible path", value: "Broker guidance and direct inquiry" }, { label: "Website status", value: "Live public site" }, { label: "Not claimed", value: "Lead, transaction or ranking outcome" }],
    factsEs: [{ label: "Área de servicio", value: "Broward, Palm Beach y Miami-Dade" }, { label: "Audiencia", value: "Compradores y vendedores" }, { label: "Ruta visible", value: "Orientación de corretaje y consulta directa" }, { label: "Estado del sitio", value: "Sitio público activo" }, { label: "No se afirma", value: "Resultado de prospectos, transacciones o posiciones" }],
    capabilities: ["Market-area entry points for three South Florida counties", "A buyer and seller information path", "Direct broker contact for a next real-estate conversation"], capabilitiesEs: ["Entradas por mercado para tres condados del sur de Florida", "Ruta de información para compradores y vendedores", "Contacto directo con la corredora para una siguiente conversación inmobiliaria"]
  }),
  websiteCasePair({
    id: "great-reviewer-website", client: "The Great Reviewer", clientEs: "The Great Reviewer",
    title: "The Great Reviewer: Product Review & Travel Guide Website", titleEs: "The Great Reviewer: Sitio de reseñas de productos y guías de viaje",
    summary: "A product-review and travel-guide website that helps everyday shoppers compare options, read practical buying guidance and decide what is worth buying.", summaryEs: "Sitio de reseñas de productos y guías de viaje que ayuda a comparar opciones, leer orientación práctica y decidir qué vale la pena comprar.",
    liveSite: "https://thegreatreviewer.com/", role: "Website designer and editorial-system architect", roleEs: "Diseñador web y arquitecto de sistema editorial", deliverables: "Product-review library, answer-first article templates, comparison paths and travel-guide content system", deliverablesEs: "Biblioteca de reseñas de productos, plantillas de artículos con respuesta directa, rutas de comparación y sistema de guías de viaje",
    facts: [{ label: "Content type", value: "Product reviews and travel guides" }, { label: "Visible path", value: "Browse guides and evaluate a purchase" }, { label: "Information pattern", value: "Practical answers and comparison-oriented pages" }, { label: "Website status", value: "Live public site" }, { label: "Not claimed", value: "Affiliate, audience or revenue outcome" }],
    factsEs: [{ label: "Tipo de contenido", value: "Reseñas de productos y guías de viaje" }, { label: "Ruta visible", value: "Explorar guías y evaluar una compra" }, { label: "Patrón de información", value: "Respuestas prácticas y páginas orientadas a comparar" }, { label: "Estado del sitio", value: "Sitio público activo" }, { label: "No se afirma", value: "Resultado de afiliados, audiencia o ingresos" }],
    capabilities: ["A browsable product-review and travel-guide library", "Answer-first pages that help a shopper compare options", "Editorial paths from a question to a practical buying decision"], capabilitiesEs: ["Biblioteca navegable de reseñas de productos y guías de viaje", "Páginas con respuesta directa para comparar opciones", "Rutas editoriales desde una pregunta hasta una decisión práctica de compra"]
  })
];

export const caseStudyPairs: readonly CaseStudyPair[] = [
  {
    id: "banacol",
    en: {
      title: "Banacol: Aerial Cinematography for Maritime & Agro-Industrial Export Operations",
      metadataTitle: "Banacol Case Study | Aerial Drone Cinematography",
      client: "Banacol (Agro-industrial Exporter)",
      summary:
        "A multi-day aerial drone cinematography assignment documenting large-scale banana and plantain export operations in Urabá, Colombia, including challenging offshore boat launches and maritime logistics.",
      metaDescription:
        "Aerial drone cinematography over several days for Banacol, a banana and plantain exporter in Urabá, Colombia, including launches from boats offshore.",
      eyebrow: "Agro-Industrial Video Production",
      role: "Aerial Drone Cinematographer (On assignment with Jungelbox agency)",
      year: 2021,
      location: "Urabá, Antioquia, Colombia",
      deliverables: "4K aerial drone master footage, offshore vessel tracking reels, facility establishing shots",
      agencyContext: "Produced on assignment with the Jungelbox creative agency based in Medellín, Colombia.",
      answer: {
        question: "What did Esteban do on the Banacol project?",
        text:
          "Esteban was the aerial drone cinematographer on a corporate overview that the Jungelbox creative agency in Medellín produced for Banacol, a Colombian exporter of bananas and plantains. The shoot ran three continuous days in 2021 in Urabá, Antioquia, on the Caribbean coast, and covered plantation fields, packing facilities, coastal loading docks and cargo barges offshore. Some flights were launched from, and caught by hand on, moving boats. He delivered 4K aerial master footage, vessel tracking shots and facility establishing shots. His role was aerial capture only: the agency's director and editors handled the edit, sound design and script, and the public cut runs 1 minute 48 seconds. It is shown here as past agency work in Colombia, with the role stated exactly as it was performed.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=DgeKWR8s80M",
      posterUrl: "/portfolio/banacol.jpg",
      serviceLink: {
        href: "/services/brand-video-production-miami",
        label: "Brand Video Production Services",
        description: "Explore commercial brand video production and on-location filming for South Florida businesses.",
      },
      contactLink: {
        href: "/contact",
        label: "Discuss an On-Location Video Project",
      },
      portfolioLink: {
        href: "/portfolio/banacol",
        label: "View Banacol Portfolio Video",
      },
      keyFacts: [
        { label: "Production Duration", value: "Three continuous shoot days on location in Urabá" },
        { label: "Environment", value: "Coastal loading docks, open ocean cargo barges, fruit packing hubs" },
        { label: "Flight Regime", value: "Offshore marine launches and hand-catches from moving skiffs" },
        { label: "Primary Role", value: "Aerial drone cinematography (strictly aerial capture; editing by agency)" },
        { label: "Deliverable Format", value: "16:9 widescreen master video assets (1 minute 48 seconds public cut)" },
      ],
      scopingQuestions: [
        "What specific facility zones, shipping vessels, or agricultural parcels require aerial coverage?",
        "Are there active maritime or port authority security clearances required prior to flight dates?",
        "What contingency protocols exist for high-humidity coastal weather, sudden precipitation, or sea spray?",
        "Will drone takeoff and recovery occur on stable ground or from watercraft and industrial platforms?",
        "What technical specifications (color profile, resolution, frame rates) does the editing team require?",
      ],
      sections: [
        {
          heading: "Project Context & Commercial Background",
          paragraphs: [
            "Banacol is one of Colombia's largest agro-industrial producers and international exporters of bananas and plantains, shipping millions of boxes annually to markets across North America and Europe. To showcase the massive scale, modern logistics infrastructure, and rigorous quality control of their northern export corridors, the Jungelbox creative agency was commissioned to produce an extensive corporate brand overview. Esteban was contracted by Jungelbox specifically as the dedicated aerial drone cinematographer for the production.",
            "The filming took place across three intensive days in the Urabá region of Antioquia, a vital commercial port and agricultural hub on the Caribbean coast of Colombia. Capturing the full scope of Banacol's operations required filming across vast plantation fields, automated packing facilities, overland transport routes, and the active maritime loading zones where cargo barges transfer produce to international container ships anchored offshore.",
            "Because this was an agency-led production with a dedicated director and post-production editorial team, Esteban's role was sharply defined: aerial cinematography only. No ground editing, voice-over casting, or color finishing was claimed. Preserving this boundary ensures an honest portrayal of the collaborative production workflow.",
          ],
          callout: {
            title: "Verified Role Demarcation",
            text: "Esteban performed aerial drone capture across all three production days. Post-production assembly, sound design, and script finishing were executed by the commissioning agency Jungelbox.",
          },
        },
        {
          heading: "Operational Challenges & Maritime Flight Execution",
          paragraphs: [
            "Operating unmanned aerial systems in industrial and maritime settings introduces complex physical constraints that differ fundamentally from standard landscape videography. In Urabá, the primary export mechanism involves loading fruit crates onto shallow-draft barges, which navigate coastal waterways before meeting large ocean-going vessels in open water.",
            "To capture dynamic tracking shots of these vessels in transit, Esteban executed drone flights launched directly from small, moving support boats and skiffs. Launching and recovering a drone from a rocking watercraft in open swell requires manual flight override, precise gimbal handling, and coordination with the boat captain to manage wind shear and engine vibrations.",
            "In addition to open-water flight hazards, coastal tropical conditions in Urabá present rapid weather shifts, sudden equatorial squalls, high humidity, and airborne sea salt. Equipment had to be continuously monitored, calibrated, and protected to ensure zero camera sensor contamination or mechanical failure during flight windows.",
          ],
          bullets: [
            "Manual boat-deck takeoffs and hand recoveries in moderate sea swell without GPS lock assistance",
            "Continuous tracking of industrial conveyor belts, barge transfers, and tug operations from safe standoffs",
            "Management of intense equatorial sun reflections off the water surface using polarizing neutral density filters",
            "Strict adherence to commercial shipping safety buffers and port security perimeters",
          ],
        },
        {
          heading: "Visible Craft Decisions & Cinematographic Technique",
          paragraphs: [
            "The visual strength of the Banacol footage rests on deliberate camera movement and compositional discipline. Rather than relying on static wide views, Esteban employed continuous parabolic arcs and low-altitude sweeping moves that connect the physical workers to the immense industrial machinery surrounding them.",
            "When filming the packing facilities and transport corridors, the camera maintains a steady horizon while tracking perpendicular to the movement of trucks and container cranes. This technique reveals the geometric efficiency of the facility layout while keeping human activity in clear, proportional perspective.",
            "In the maritime sequences, Esteban utilized slow, deliberate descent angles toward the cargo holds. This gradual shift in perspective from wide ocean vistas to tight container alignments provides visual weight and emphasizes the precision required during international transshipment operations.",
          ],
        },
        {
          heading: "Relevance for South Florida Industrial & Maritime Productions",
          paragraphs: [
            "South Florida is home to major commercial shipping channels, luxury yacht manufacturers, marine service hubs, and construction logistics infrastructure across PortMiami, Port Everglades in Fort Lauderdale, and the Palm Beach waterways. Video projects in these environments require crews who understand industrial safety protocols, watercraft dynamics, and rapid setup procedures.",
            "Whether documenting marine hospitality, commercial port operations, or architectural developments in coastal Broward and Miami-Dade counties, the technical principles demonstrated in the Banacol assignment apply directly. Commercial clients require reliable visual execution without disruptive delays to active business operations.",
          ],
        },
        {
          heading: "How Comparable Commercial Projects Are Scoped",
          paragraphs: [
            "Planning a commercial on-location video shoot begins with clear operational scoping rather than generic package pricing. Every industrial and marine location presents distinct access rules, safety requirements, and lighting windows that govern the filming schedule.",
            "Esteban works with clients and creative directors to audit the physical location, establish flight zones, verify permit requirements, and define exact deliverable specifications before production begins. This structured approach prevents unexpected site delays and guarantees clean footage handoff for editorial teams.",
          ],
        },
      ],
    },
    es: {
      title: "Banacol: Cinematografía Aérea en Operaciones de Exportación y Embarque Marítimo",
      metadataTitle: "Caso de Estudio Banacol | Cinematografía Aérea con Dron",
      client: "Banacol (Exportadora Agroindustrial)",
      summary:
        "Producción de cinematografía aérea con dron durante tres días en Urabá, Colombia, documentando operaciones de exportación de banano y plátano, incluyendo vuelos marítimos desde embarcaciones.",
      metaDescription:
        "Cinematografía aérea con dron durante tres días en Urabá, Colombia, para Banacol, exportador de banano y plátano, con vuelos desde embarcaciones.",
      eyebrow: "Producción de Video Agroindustrial",
      role: "Cinematógrafo Aéreo con Dron (Por encargo de la agencia Jungelbox)",
      year: 2021,
      location: "Urabá, Antioquia, Colombia",
      deliverables: "Tomas aéreas master en 4K, secuencias de seguimiento marítimo, planos generales de infraestructura",
      agencyContext: "Proyecto realizado por encargo de la agencia creativa Jungelbox, con sede en Medellín, Colombia.",
      answer: {
        question: "¿Qué hizo Esteban en el proyecto de Banacol?",
        text:
          "Esteban fue el cinematógrafo aéreo con dron de un video corporativo que la agencia creativa Jungelbox, de Medellín, produjo para Banacol, exportadora colombiana de banano y plátano. El rodaje duró tres días continuos en 2021 en Urabá, Antioquia, en la costa del Caribe, y cubrió plantaciones, plantas de empaque, muelles de carga y barcazas en mar abierto. Algunos vuelos despegaron desde lanchas en movimiento y se recuperaron a mano sobre ellas. Entregó tomas aéreas master en 4K, secuencias de seguimiento de embarcaciones y planos generales de las instalaciones. Su rol fue solo la captura aérea: el director y los editores de la agencia hicieron el montaje, el diseño de sonido y el guion, y el corte público dura 1 minuto 48 segundos. Se muestra aquí como trabajo pasado para una agencia en Colombia, con el rol declarado tal como se ejecutó.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=DgeKWR8s80M",
      posterUrl: "/portfolio/banacol.jpg",
      serviceLink: {
        href: "/es/produccion-de-video-de-marca-miami",
        label: "Servicio de Producción de Video de Marca",
        description: "Conoce nuestro servicio de producción audiovisual y grabación en locación para empresas en South Florida.",
      },
      contactLink: {
        href: "/es/contacto",
        label: "Conversar sobre un Proyecto en Locación",
      },
      portfolioLink: {
        href: "/es/portafolio/banacol",
        label: "Ver Proyecto Banacol en el Portafolio",
      },
      keyFacts: [
        { label: "Duración del Rodaje", value: "Tres días continuos de grabación en locación en Urabá" },
        { label: "Entorno Operativo", value: "Muelles de carga, barcazas en mar abierto y plantas de empaque" },
        { label: "Régimen de Vuelo", value: "Despegues y capturas manuales desde lanchas en movimiento" },
        { label: "Rol Verificado", value: "Cinematografía aérea con dron (captura aérea; edición por la agencia)" },
        { label: "Formato de Entrega", value: "Material panorámico 16:9 en alta resolución (corte público de 1 min 48 s)" },
      ],
      scopingQuestions: [
        "¿Qué instalaciones, embarcaciones o terrenos agrícolas específicos requieren cobertura aérea?",
        "¿Existen permisos de seguridad portuaria o autorizaciones marítimas requeridas antes del rodaje?",
        "¿Qué protocolos de contingencia existen para climas costeros con humedad alta o lluvia súbita?",
        "¿El despegue y aterrizaje del dron se realizará sobre tierra firme o desde embarcaciones marítimas?",
        "¿Qué especificaciones técnicas de color y resolución requiere el equipo de postproducción?",
      ],
      sections: [
        {
          heading: "Contexto del Proyecto y Alcance Comercial",
          paragraphs: [
            "Banacol es una de las empresas agroindustriales y exportadoras de banano y plátano más importantes de Colombia, responsable del envío continuo de fruta hacia mercados en Norteamérica y Europa. Con el objetivo de registrar la magnitud de sus operaciones, su infraestructura logística y sus procesos de calidad en el norte del país, la agencia creativa Jungelbox fue contratada para producir una pieza corporativa integral. Para este proyecto, Esteban fue seleccionado por Jungelbox como el cinematógrafo aéreo a cargo de todas las tomas con dron.",
            "La producción se llevó a cabo durante tres jornadas intensivas en la región de Urabá, Antioquia, un enclave estratégico sobre el mar Caribe. La cobertura demandó registrar plantaciones extensas, centros tecnificados de empaque, transporte terrestre y los puntos de transferencia marítima donde las barcazas cargan la fruta en buques de gran calado fondeados en el mar.",
            "Al tratarse de una producción liderada por agencia, el rol de Esteban estuvo delimitado con total precisión a la cinematografía aérea. No se incluyen atribuciones sobre la edición final, la locución ni la colorimetría de la pieza terminada, preservando la veracidad del crédito profesional.",
          ],
          callout: {
            title: "Delimitación Precisa del Rol",
            text: "Esteban ejecutó la captura aérea con dron durante los tres días de rodaje. La edición final, el diseño de sonido y la postproducción fueron realizadas por la agencia Jungelbox.",
          },
        },
        {
          heading: "Desafíos Operativos y Captura Aérea en Mar Abierto",
          paragraphs: [
            "La operación de drones en entornos industriales y marítimos exige una preparación técnica muy distinta a la grabación en espacios abiertos convencionales. En Urabá, parte fundamental del proceso de exportación se realiza trasladando la fruta en barcazas a través de canales fluviales hasta alcanzar los buques mercantes en el mar.",
            "Para lograr tomas dinámicas de estas embarcaciones en movimiento, Esteban tuvo que realizar despegues y recuperaciones del dron directamente desde lanchas rápidas y botes de apoyo. Operar un equipo sobre una cubierta inestable con oleaje moderado requiere vuelo manual, control riguroso del estabilizador de cámara y coordinación constante con el piloto de la lancha para evitar ráfagas de viento y vibraciones.",
            "A estos factores se sumaron las condiciones climáticas del trópico costero: humedad elevada, salitre marino y cambios repentinos en la nubosidad. El cuidado del equipo y la calibración óptica con filtros de densidad neutra fueron indispensables para mantener la nitidez y evitar daños en los sensores durante las ventanas de vuelo.",
          ],
          bullets: [
            "Despegues y recepciones manuales en cubierta de embarcaciones sin asistencia de retorno automático",
            "Seguimiento visual fluido de barcazas, grúas y remolcadores respetando márgenes de seguridad",
            "Manejo de reflejos solares sobre el agua mediante filtros polarizadores de densidad neutra",
            "Cumplimiento de perímetros de seguridad y normativas de navegación portuaria",
          ],
        },
        {
          heading: "Decisiones Visuales y Técnica Cinematográfica",
          paragraphs: [
            "El valor visual del material registrado para Banacol radica en la intencionalidad del movimiento de cámara. En lugar de planos cenitales estáticos, se emplearon trayectorias parabólicas y descensos graduales que integran al equipo de trabajo con la escala de la maquinaria industrial.",
            "Durante las tomas en las plantas de empaque y patios de transferencia, la cámara mantuvo un horizonte perfectamente nivelado mientras acompañaba el desplazamiento de los vehículos de carga. Este recurso visual transmite orden y dinamismo sin recurrir a cortes abruptos ni movimientos artificiales.",
            "En las tomas marítimas, los vuelos a baja altura en dirección a los buques de carga permitieron mostrar la transición entre el paisaje costero y la magnitud del comercio exterior, aportando dramatismo y autoridad a la narrativa visual de la marca.",
          ],
        },
        {
          heading: "Aplicación para Proyectos Marítimos e Industriales en South Florida",
          paragraphs: [
            "El sur de la Florida cuenta con una infraestructura marítima, comercial y turística de primer nivel, desde las terminales de PortMiami y Port Everglades en Fort Lauderdale hasta marinas y astilleros en Broward y Palm Beach. La realización de videos en estos entornos requiere experiencia práctica en dinámicas náuticas, protocolos de seguridad y rapidez de respuesta.",
            "Ya sea para documentar servicios náuticos, construcciones costeras o actividades corporativas frente al mar, los criterios técnicos aplicados en el proyecto de Banacol son directamente trasladables a empresas locales que buscan contenido audiovisual sólido y profesional.",
          ],
        },
        {
          heading: "Cómo se Define el Alcance de una Producción Similar",
          paragraphs: [
            "La planificación de un rodaje en locación no parte de paquetes cerrados con tarifas fijas, sino de una evaluación técnica de los requerimientos del cliente. Factores como el acceso a la locación, las condiciones de luz, los permisos requeridos y los entregables esperados determinan el plan de trabajo.",
            "Esteban colabora con empresas y agencias para definir las rutas de filmación, prever contingencias climáticas y acordar los formatos de entrega requeridos para una postproducción eficiente y sin fricciones.",
          ],
        },
      ],
    },
  },
  {
    id: "homeowners",
    en: {
      title: "Homeowners: Fast-Paced Real Estate Video Post-Production from Supplied Footage",
      metadataTitle: "Homeowners Case Study | Real Estate Video Editing",
      client: "Homeowners (Real Estate Content)",
      summary:
        "An agile, high-retention video editing project for real estate promotional content, assembled entirely from external footage provided by the 300 Bees agency.",
      eyebrow: "Real Estate Video Post-Production",
      role: "Video Editor (Remote post-production from supplied footage)",
      year: 2021,
      deliverables: "Dynamic 16:9 promotional video cut (23 seconds), color-balanced property walkthrough montage",
      agencyContext: "Post-production assignment commissioned by the 300 Bees creative agency.",
      answer: {
        question: "What did Esteban do on the Homeowners project?",
        text:
          "Esteban edited this real estate promo remotely in 2021 for the 300 Bees creative agency, working only from footage the agency supplied: interior, exterior and architectural walkthrough clips. He did no filming. The deliverable was a 16:9 promotional cut of 23 seconds that completes the whole walkthrough in a rapid sequence of cuts, plus a color-balanced montage of the property. The edit covered pacing, matching color across clips from more than one camera, clean transitions, and sound: lowering the music under the voice and cleaning up the natural ambient audio. It is the same kind of job as turning the clips an agent or a property owner already has into a listing video, with nobody from the editing side on location.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=2m3iHq0JrLM",
      posterUrl: "/portfolio/homeowners.jpg",
      serviceLink: {
        href: "/services/real-estate-video-sunny-isles",
        label: "Real Estate Video Services",
        description: "Explore real estate video editing and short-form property showcase solutions across South Florida.",
      },
      contactLink: {
        href: "/contact",
        label: "Request Remote Video Editing",
      },
      portfolioLink: {
        href: "/portfolio/homeowners",
        label: "View Homeowners Project in Portfolio",
      },
      keyFacts: [
        { label: "Production Mode", value: "Remote video editing (zero on-set filming; all clips supplied by agency)" },
        { label: "Source Material", value: "Pre-recorded interior, exterior, and architectural walkthrough clips" },
        { label: "Pacing Structure", value: "Rapid cut sequence completing an entire narrative arc in 23 seconds" },
        { label: "Audio Engineering", value: "Dynamic music-to-voice ducking and natural ambient audio enhancement" },
        { label: "Turnaround Focus", value: "Color uniformity across multi-camera clips and clean visual transitions" },
      ],
      scopingQuestions: [
        "What specific resolution, codec, and folder structure will be used for footage handoff?",
        "Is the video intended for horizontal YouTube / web placement or a 9:16 vertical social cut?",
        "Are voice-over audio stems and brand logo assets fully approved before editing starts?",
        "What are the specific target runtimes and must-feature architectural highlights for the property?",
        "How will revisions be consolidated to ensure efficient project turnaround?",
      ],
      sections: [
        {
          heading: "Project Context & Remote Editing Mandate",
          paragraphs: [
            "Homeowners was a real estate promotional initiative designed to present property features in a clean, contemporary format suited for digital viewers. Esteban was contracted by the 300 Bees creative agency to perform complete video post-production. The project was executed entirely from supplied footage, meaning Esteban did not participate in on-set filming or camera operation.",
            "Editing supplied third-party footage represents a core commercial discipline in modern digital video. Real estate agencies, brokers, and media teams often capture footage on location or work with independent videographers, then rely on a specialized post-production editor to turn disparate raw files into a cohesive, high-retention video asset.",
            "The specific challenge of this assignment was crafting a compelling narrative within a compact 23-second runtime. Every second needed to advance the viewer's understanding of the home's design, lifestyle atmosphere, and premium finishes without visual clutter or unnecessary pauses.",
          ],
          callout: {
            title: "Honest Editing-Only Boundary",
            text: "This project reflects pure video post-production. All source files were provided by the agency 300 Bees. Esteban did not direct on location or capture camera footage.",
          },
        },
        {
          heading: "Visible Craft Decisions & Pacing Architecture",
          paragraphs: [
            "In short-form real estate media, viewer attention must be captured in the opening frames. Esteban structured the cut to open with an immediate wide architectural hook before transitioning into rhythmic interior vignettes. Rather than using slow, lingering pans that risk viewer abandonment, each cut is timed to the micro-beats of the backing track.",
            "Cuts between different rooms are organized logically: exterior arrival, open-concept living spaces, kitchen details, and master suite highlights. Room transitions occur on natural camera motion paths, allowing the eye to track smoothly from left-to-right or push-in movements across successive shots.",
            "To maintain a professional broadcast aesthetic, Esteban avoided artificial transition wipes and exaggerated digital zoom effects. Instead, clean straight cuts paired with subtle speed ramping maintain energy while keeping the focus squarely on the property architecture.",
          ],
          bullets: [
            "Opening hook establishing architectural curb appeal within the first two seconds",
            "Cuts timed to musical downbeats without overpowering voice clarity",
            "Motion-matched visual flow between interior spaces to maintain viewer orientation",
            "Color grade normalization to align different camera exposures and natural daylight temperatures",
          ],
        },
        {
          heading: "Audio Leveling & Color Harmonization",
          paragraphs: [
            "A critical element of the Homeowners edit was unifying footage shot under varying lighting conditions. Interior rooms with warm artificial lighting were balanced against bright exterior sunlit shots to ensure consistent skin tones and clean, neutral architectural whites throughout the piece.",
            "On the audio track, background music was sculpted using parametric equalization and dynamic sidechain ducking. This ensured that musical energy drove the video's pacing without clashing with the dialogue or sounding artificially muted during vocal sections.",
          ],
        },
        {
          heading: "Relevance for South Florida Real Estate & Architecture",
          paragraphs: [
            "The South Florida real estate market across Miami, Fort Lauderdale, Boca Raton, and Palm Beach operates at exceptional speed. Agents and developers routinely produce hours of property footage, drone flyovers, and interior walk-throughs that require rapid, professional distillation for Instagram Reels, YouTube listings, and luxury property landing pages.",
            "The Homeowners project demonstrates how remote video editing transforms existing raw clips into refined commercial assets that respect viewer attention spans and elevate property positioning.",
          ],
        },
        {
          heading: "How Remote Real Estate Editing Is Scoped",
          paragraphs: [
            "Initiating a remote video editing project requires clear alignment on source assets, deliverable aspect ratios, and review workflows. Clear file handoff—grouping raw clips, voice tracks, and approved brand graphics—allows editing to commence immediately without ambiguous revisions.",
            "Esteban works with clients to define technical formats, subtitle requirements, and turn-around milestones before editing begins, ensuring transparent communication and timely delivery.",
          ],
        },
      ],
    },
    es: {
      title: "Homeowners: Postproducción y Edición Rápida de Video Inmobiliario con Material Externo",
      metadataTitle: "Caso de Estudio Homeowners | Edición de Video Inmobiliario",
      client: "Homeowners (Contenido Inmobiliario)",
      summary:
        "Proyecto ágil de edición y postproducción de video para contenido promocional de bienes raíces, estructurado íntegramente a partir de material suministrado por la agencia 300 Bees.",
      metaDescription:
        "Edición y postproducción de video promocional de bienes raíces, armada solo con material entregado por la agencia 300 Bees.",
      eyebrow: "Postproducción de Video para Real Estate",
      role: "Editor de Video (Postproducción remota con material aportado)",
      year: 2021,
      deliverables: "Corte promocional dinámico en formato 16:9 (23 segundos), montaje balanceado de recorrido inmobiliario",
      agencyContext: "Encargo de postproducción realizado para la agencia creativa 300 Bees.",
      answer: {
        question: "¿Qué hizo Esteban en el proyecto de Homeowners?",
        text:
          "Esteban editó este video promocional inmobiliario de forma remota en 2021 para la agencia creativa 300 Bees, usando solo el material que la agencia le entregó: clips de interiores, exteriores y recorridos arquitectónicos. No hizo ninguna grabación. El entregable fue un corte promocional de 23 segundos en formato 16:9 que completa todo el recorrido en una secuencia ágil de cortes, más un montaje de la propiedad con el color balanceado. La edición cubrió el ritmo, la igualación de color entre clips de más de una cámara, transiciones limpias y el sonido: bajar la música debajo de la voz y limpiar el audio ambiente natural. Es el mismo tipo de trabajo que convertir los clips que ya tiene un agente o un propietario en un video para su anuncio, sin que nadie del lado de la edición vaya a la propiedad.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=2m3iHq0JrLM",
      posterUrl: "/portfolio/homeowners.jpg",
      serviceLink: {
        href: "/es/editor-de-video-real-estate-miami",
        label: "Servicio de Edición de Video para Real Estate",
        description: "Descubre nuestro servicio de edición remota de video para propiedades y agentes inmobiliarios en Florida.",
      },
      contactLink: {
        href: "/es/contacto",
        label: "Solicitar Edición Remota de Video",
      },
      portfolioLink: {
        href: "/es/portafolio/homeowners",
        label: "Ver Proyecto Homeowners en el Portafolio",
      },
      keyFacts: [
        { label: "Modalidad de Trabajo", value: "Edición remota (sin rodaje en locación; todo el material fue provisto)" },
        { label: "Material Fuente", value: "Clips pregrabados de interiores, exteriores y arquitectura del inmueble" },
        { label: "Estructura de Ritmo", value: "Secuencia ágil de cortes que completa un arco visual en 23 segundos" },
        { label: "Ingeniería de Sonido", value: "Ajuste dinámico de música de fondo para respetar la claridad de la voz" },
        { label: "Enfoque Técnico", value: "Corrección de color uniforme entre tomas y transiciones limpias" },
      ],
      scopingQuestions: [
        "¿Qué resolución, códec y estructura de carpetas se utilizarán para la entrega del material?",
        "¿El video se publicará en formato horizontal para web/YouTube o en versión vertical 9:16 para redes?",
        "¿Los audios de locución y logos de marca están aprobados antes de iniciar la edición?",
        "¿Cuáles son los espacios arquitectónicos prioritarios que deben aparecer de forma obligatoria?",
        "¿Quién será la persona responsable de consolidar los comentarios durante las revisiones?",
      ],
      sections: [
        {
          heading: "Contexto del Proyecto y Rol de Edición Remota",
          paragraphs: [
            "Homeowners fue una iniciativa de promoción inmobiliaria orientada a presentar los atributos de una propiedad en un formato ágil adaptado al consumo digital. Esteban fue contratado por la agencia creativa 300 Bees para encargarse de toda la postproducción del video. El trabajo se realizó exclusivamente con material suministrado, por lo que Esteban no participó en la filmación en locación ni en la operación de cámaras.",
            "La edición remota a partir de material externo es una de las necesidades más frecuentes en el mercado audiovisual actual. Agencias de bienes raíces, inversionistas y equipos de marketing graban contenido en el lugar o contratan videógrafos locales, y luego requieren un editor especializado que seleccione las mejores tomas y construya una pieza coherente.",
            "El objetivo central de este proyecto fue estructurar un mensaje visual atractivo en solo 23 segundos de duración. Cada corte debía comunicar diseño, amplitud y acabados de calidad sin saturar al espectador ni perder dinamismo.",
          ],
          callout: {
            title: "Crédito Honesto: Solo Edición",
            text: "Este proyecto corresponde estrictamente a postproducción de video. Todo el material fuente fue provisto por la agencia 300 Bees; no hubo grabación presencial de Esteban.",
          },
        },
        {
          heading: "Decisiones de Montaje y Estructura de Ritmo",
          paragraphs: [
            "En el video inmobiliario corto, los primeros segundos determinan si el espectador continúa viendo. Esteban inició la edición con una toma abierta de alto impacto visual antes de dar paso a detalles interiores. En lugar de planos lentos que alargan la duración innecesariamente, los cortes se sincronizaron con el ritmo de la pista musical.",
            "La secuencia visual sigue una lógica intuitiva: fachada exterior, área social integrada, detalles de cocina y áreas privadas. Las transiciones entre habitaciones aprovechan el movimiento natural de la cámara, logrando que el recorrido se sienta fluido.",
            "Se evitaron efectos digitales excesivos o barridos artificiales, apostando por cortes directos y aceleraciones sutiles que mantienen la elegancia visual y destacan la arquitectura real del inmueble.",
          ],
          bullets: [
            "Gancho inicial que presenta la propiedad en los dos primeros segundos",
            "Cortes sincronizados con los acentos musicales sin interferir con la voz",
            "Continuidad de movimiento entre tomas para guiar la atención del espectador",
            "Normalización de color para unificar tomas con distinta temperatura de luz",
          ],
        },
        {
          heading: "Nivelación de Audio y Armonización de Color",
          paragraphs: [
            "Un aspecto clave en la edición de Homeowners fue unificar tomas grabadas en momentos distintos del día. Los ambientes interiores con iluminación cálida se calibraron con las tomas exteriores soleadas para asegurar tonos de pared y maderas naturales y consistentes.",
            "En el plano sonoro, la música de fondo se ecualizó con atenuación dinámica (ducking) para que mantuviera la energía de la pieza sin entorpecer los momentos hablados.",
          ],
        },
        {
          heading: "Relevancia para el Sector Inmobiliario en South Florida",
          paragraphs: [
            "El mercado inmobiliario en Miami, Fort Lauderdale, Sunny Isles y Palm Beach exige velocidad y calidad visual. Los agentes generan horas de material en video que necesitan convertirse rápidamente en piezas listas para Instagram Reels, recorridos en YouTube y páginas de listados.",
            "El caso de Homeowners demuestra cómo una edición remota disciplinada transforma clips dispersos en herramientas de comunicación comercial que respetan el tiempo del cliente.",
          ],
        },
        {
          heading: "Cómo se Define el Alcance de una Edición Inmobiliaria",
          paragraphs: [
            "Iniciar una postproducción remota requiere definir el material disponible, los formatos de salida y los canales de publicación. La entrega organizada de archivos permite que la edición comience de inmediato con metas claras.",
            "Esteban trabaja con agentes y agencias para acordar especificaciones técnicas, requerimientos de subtítulos y plazos de entrega antes de iniciar cada proyecto.",
          ],
        },
      ],
    },
  },
  {
    id: "flas-concierge",
    en: {
      title: "Fort Lauderdale Auto Sale: Dealership Web Architecture & Conversational AI Concierge",
      metadataTitle: "FLAS Case Study | Auto Dealership Web Design & AI Concierge",
      client: "Fort Lauderdale Auto Sale (FLAS)",
      summary:
        "A full-stack web architecture and conversational AI concierge system engineered for an independent Buy-Here-Pay-Here automotive dealership in Fort Lauderdale, Broward County.",
      metaDescription:
        "A conversion website and AI chat concierge built for FLAS, an independent Buy-Here-Pay-Here car dealership in Fort Lauderdale, Broward County.",
      eyebrow: "Automotive Web Design & AI Systems",
      role: "Web Designer & AI Systems Integrator (Full-stack web architecture and AI concierge integration)",
      year: 2026,
      location: "Fort Lauderdale, Broward County, Florida",
      deliverables: "Custom high-performance responsive web system, 24/7 AI financing concierge bot, inventory filtering UI",
      answer: {
        question: "What was built for Fort Lauderdale Auto Sale (FLAS)?",
        text:
          "For Fort Lauderdale Auto Sale (FLAS), an independent buy-here-pay-here dealership in Broward County, the work in 2026 was a full website plus a conversational AI concierge. The site is a mobile-first, responsive Next.js system with a structured vehicle catalog and inventory filtering. The concierge answers inventory and financing questions around the clock, and the intake handles shoppers in English and in Spanish. The role listed for this project is web designer and AI systems integrator, covering the web architecture and the concierge integration. Dealership management published a public Google Business review about the communication and the web work, and that review is the only client verification this page cites. No traffic, lead or sales figures are claimed here.",
      },
      mediaUrl: "https://fortlauderdaleautosale.com",
      posterUrl: "/portfolio/ai-lead-automation.jpg",
      websiteUrl: "https://fortlauderdaleautosale.com",
      reviewUrl: "https://maps.google.com/?cid=17781033282245239999",
      reviewNote: "The dealership has published a verified public Google Business review praising the communication and web implementation.",
      serviceLink: {
        href: "/services/website-design-fort-lauderdale",
        label: "Website Design & AI Chatbots Service",
        description: "Explore custom high-conversion websites and conversational AI chatbots for Fort Lauderdale businesses.",
      },
      contactLink: {
        href: "/contact",
        label: "Discuss Web Design & AI Systems",
      },
      portfolioLink: {
        href: "/portfolio/flas-concierge",
        label: "View FLAS Project in Portfolio",
      },
      keyFacts: [
        { label: "Market Segment", value: "Independent Buy-Here-Pay-Here automotive sales in Broward County" },
        { label: "System Architecture", value: "Mobile-first responsive Next.js frontend with structured vehicle catalog" },
        { label: "AI Integration", value: "24/7 conversational concierge answering inventory and financing inquiries" },
        { label: "Language Support", value: "Bilingual customer intake handling English and Spanish shoppers" },
        { label: "Client Verification", value: "Public Google Business profile review published by dealership management" },
      ],
      scopingQuestions: [
        "What existing inventory management system or DMS feed needs to sync with the website catalog?",
        "What specific financing pre-qualification questions must the AI concierge handle automatically?",
        "What proportion of customer inquiries arrive via mobile devices vs desktop browsers?",
        "Are bilingual (English/Spanish) conversation flows required for the local South Florida audience?",
        "What CRM or email notification endpoints should receive instant lead alerts?",
      ],
      sections: [
        {
          heading: "Client Context & Independent Dealership Workflow",
          paragraphs: [
            "Fort Lauderdale Auto Sale (FLAS) is an established independent automotive dealership operating on South Federal Highway in Fort Lauderdale. The dealership specializes in quality pre-owned vehicles with flexible Buy-Here-Pay-Here (BHPH) financing tailored to local South Florida commuters and families. In competitive local markets, car buyers predominantly browse vehicle inventory on mobile devices outside standard business hours.",
            "Traditional dealership websites often rely on bloated third-party template platforms laden with intrusive popups, slow loading speeds, and complex multi-page financing forms that cause prospective car buyers to abandon their inquiry before submitting. FLAS needed a clean, ultra-responsive web platform that would load instantly on smartphones and provide immediate answers to customer questions about inventory availability, down payment requirements, and financing qualifications.",
            "Esteban designed and built the complete web system, pairing modern web architecture with a custom conversational AI concierge engine to streamline customer intake day and night.",
          ],
          callout: {
            title: "Verified Client Relationship",
            text: "FLAS is an active commercial client in Fort Lauderdale. Management published a public Google review on their Google profile confirming the quality of the web and communication implementation.",
          },
        },
        {
          heading: "Technical Architecture & Mobile-First UX Design",
          paragraphs: [
            "Because local automotive shoppers predominantly browse vehicle inventory on smartphones and mobile browsers, the FLAS platform was designed from the ground up with a mobile-first philosophy. The user interface prioritizes high-contrast inventory cards, clear vehicle specifications, and prominent direct actions for test drive scheduling and phone inquiries.",
            "Page load performance was optimized by eliminating redundant third-party tracking scripts and employing modern image optimization for vehicle photo galleries. Fast navigation ensures car shoppers can filter by vehicle make, body style, and price range without frustrating page reloads.",
          ],
          bullets: [
            "Lightweight responsive interface built for fast mobile rendering on 4G and 5G cellular connections",
            "Clear vehicle inventory grid with prominent financing and down-payment transparency",
            "Direct one-tap calling, Google Maps directions, and appointment scheduling buttons",
            "Bilingual interface elements accommodating both English and Spanish speaking buyers in Broward",
          ],
        },
        {
          heading: "Conversational AI Concierge Engine",
          paragraphs: [
            "The defining feature of the FLAS platform is its integrated 24/7 conversational AI concierge. Rather than presenting visitors with a static, generic contact form, the AI concierge engages shoppers directly to answer common questions regarding available inventory, BHPH eligibility criteria, required documentation (proof of income, driver's license, residency), and lot operating hours.",
            "The assistant is trained on exact dealership guidelines, ensuring it never promises vehicle holds or quotes unauthorized financing rates. When a buyer indicates ready interest, the concierge collects verified contact details and hands the structured inquiry directly to the dealership sales team for follow-up.",
          ],
        },
        {
          heading: "Relevance for Fort Lauderdale & South Florida Businesses",
          paragraphs: [
            "Independent service businesses across Fort Lauderdale, Broward County, and Miami—including auto repair facilities, medical clinics, and specialty retail—face similar challenges capturing customer demand after business hours. A modern website combined with conversational AI removes friction from initial inquiries.",
            "The FLAS project demonstrates how practical technology implementations solve real operational bottlenecks without bloated software subscriptions or fabricated marketing promises.",
          ],
        },
        {
          heading: "How Dealership & Local Business Systems Are Scoped",
          paragraphs: [
            "Scoping a custom website and AI assistant project begins with auditing the client's current inquiry channels, inventory update rhythm, and customer communication workflows. Clarifying these operational details ensures the technical architecture directly supports daily business routines.",
            "Esteban provides structured discovery consultations to define platform requirements, data integrations, and launch timelines for South Florida businesses.",
          ],
        },
      ],
    },
    es: {
      title: "Fort Lauderdale Auto Sale: Arquitectura Web para Concesionario e Integración de Concierge con IA",
      metadataTitle: "Caso de Estudio FLAS | Diseño Web Automotriz y Concierge IA",
      client: "Fort Lauderdale Auto Sale (FLAS)",
      summary:
        "Arquitectura web y sistema de concierge con IA conversacional desarrollado para un concesionario independiente Buy-Here-Pay-Here en Fort Lauderdale, Broward County.",
      metaDescription:
        "Sitio web de conversión y concierge con IA para FLAS, un concesionario independiente Buy-Here-Pay-Here en Fort Lauderdale, Broward County.",
      eyebrow: "Diseño Web Automotriz y Sistemas con IA",
      role: "Diseñador Web e Integrador de Sistemas con IA (Arquitectura web completa y motor de concierge)",
      year: 2026,
      location: "Fort Lauderdale, Broward County, Florida",
      deliverables: "Sistema web responsivo de alto rendimiento, bot concierge de IA para consultas 24/7, catálogo de inventario",
      answer: {
        question: "¿Qué se construyó para Fort Lauderdale Auto Sale (FLAS)?",
        text:
          "Para Fort Lauderdale Auto Sale (FLAS), un concesionario independiente de autos con financiamiento buy-here-pay-here en Broward County, el trabajo en 2026 fue un sitio web completo más un concierge conversacional con IA. El sitio es un sistema responsivo pensado primero para el celular, hecho en Next.js, con un catálogo estructurado de vehículos y filtros de inventario. El concierge responde preguntas sobre inventario y financiamiento a cualquier hora, y la atención recibe a compradores en inglés y en español. El rol de este proyecto es diseñador web e integrador de sistemas con IA, que cubre la arquitectura web y la integración del concierge. La gerencia del concesionario publicó una reseña pública en Google Business sobre la atención y el trabajo web, y esa reseña es la única verificación del cliente que cita esta página. Aquí no se declaran cifras de tráfico, prospectos ni ventas.",
      },
      mediaUrl: "https://fortlauderdaleautosale.com",
      posterUrl: "/portfolio/ai-lead-automation.jpg",
      websiteUrl: "https://fortlauderdaleautosale.com",
      reviewUrl: "https://maps.google.com/?cid=17781033282245239999",
      reviewNote: "El concesionario publicó una reseña pública en su perfil de Google Business destacando la atención y el desarrollo web.",
      serviceLink: {
        href: "/es/diseno-web-fort-lauderdale",
        label: "Servicio de Diseño Web y Chatbots con IA",
        description: "Conoce nuestro servicio de sitios web y chatbots con IA para negocios en Fort Lauderdale y Miami.",
      },
      contactLink: {
        href: "/es/contacto",
        label: "Conversar sobre Diseño Web y Sistemas IA",
      },
      portfolioLink: {
        href: "/es/portafolio/flas-concierge",
        label: "Ver Proyecto FLAS en el Portafolio",
      },
      keyFacts: [
        { label: "Segmento de Mercado", value: "Venta de autos usados y financiamiento Buy-Here-Pay-Here en Broward" },
        { label: "Arquitectura Técnica", value: "Plataforma web móvil rápida en Next.js con catálogo estructurado" },
        { label: "Integración de IA", value: "Concierge conversacional 24/7 para inventario y requisitos de financiamiento" },
        { label: "Atención Bilingüe", value: "Flujos de consulta adaptados para clientes en inglés y español" },
        { label: "Verificación de Cliente", value: "Reseña pública de la gerencia publicada en su perfil de Google" },
      ],
      scopingQuestions: [
        "¿Qué sistema de inventario o catálogo vehicular actual debe sincronizarse con la web?",
        "¿Qué preguntas específicas sobre precalificación financiera debe responder el concierge de IA?",
        "¿Qué porcentaje de clientes visita la página desde dispositivos móviles frente a computadoras?",
        "¿Se requiere atención bilingüe (inglés/español) para el público del sur de la Florida?",
        "¿A qué correo o sistema CRM deben enviarse las alertas de prospectos calificados en tiempo real?",
      ],
      sections: [
        {
          heading: "Contexto del Cliente y Flujo de Trabajo Comercial",
          paragraphs: [
            "Fort Lauderdale Auto Sale (FLAS) es un concesionario de autos usados ubicado en South Federal Highway en Fort Lauderdale. El negocio se especializa en vehículos accesibles con financiamiento directo Buy-Here-Pay-Here (BHPH) para trabajadores y familias en Broward y Miami-Dade. En el sector automotriz local, la gran mayoría de compradores busca inventario desde sus teléfonos inteligentes en horarios no laborables.",
            "Muchas páginas web de concesionarios tradicionales sufren de lentitud, plantillas sobrecargadas y formularios extensos que desaniman al usuario antes de enviar una consulta. FLAS necesitaba una presencia digital limpia, ultrarrápida en móviles y capaz de responder de inmediato dudas sobre vehículos disponibles, pago inicial y requisitos de financiamiento.",
            "Esteban diseñó e implementó la arquitectura web completa, integrando un concierge de IA conversacional para atender consultas de clientes durante el día y la noche.",
          ],
          callout: {
            title: "Relación Comercial Verificada",
            text: "FLAS es un cliente activo en Fort Lauderdale. Su gerencia publicó una reseña en su perfil de Google confirmando la calidad y comunicación en el proyecto web.",
          },
        },
        {
          heading: "Arquitectura Técnica y Experiencia Móvil",
          paragraphs: [
            "Dado que la mayoría de las búsquedas automotrices se realizan desde teléfonos móviles, el sitio web de FLAS se construyó con un enfoque mobile-first. La interfaz prioriza fotos claras de los vehículos, datos técnicos accesibles y botones directos para llamadas, ubicación en mapa y solicitud de citas.",
            "Se optimizó la velocidad de carga eliminando scripts innecesarios y estructurando galerías fotográficas ligeras que facilitan la navegación sin demoras en conexiones móviles.",
          ],
          bullets: [
            "Interfaz responsiva y liviana para navegación rápida en teléfonos inteligentes",
            "Catálogo vehicular claro con información transparente sobre requisitos de compra",
            "Acceso directo con un toque para llamadas telefónicas y direcciones en Google Maps",
            "Atención adaptada al público bilingüe del mercado local en Broward y Miami-Dade",
          ],
        },
        {
          heading: "Motor de Concierge con IA Conversacional",
          paragraphs: [
            "El componente central del sistema es un concierge de IA disponible las 24 horas. En lugar de un formulario frío, el asistente interactúa con el usuario respondiendo preguntas frecuentes sobre inventario, documentación necesaria (comprobante de ingresos, licencia de conducir, residencia) y horarios de atención.",
            "El bot sigue pautas precisas del concesionario sin prometer reservas ni inventar tasas financieras. Cuando el cliente muestra interés concreto, el concierge reúne los datos de contacto y transfiere la solicitud al equipo de ventas para su seguimiento.",
          ],
        },
        {
          heading: "Relevancia para Empresas Locales en South Florida",
          paragraphs: [
            "Negocios locales en Fort Lauderdale y Miami—desde talleres mecánicos hasta clínicas y servicios del hogar—enfrentan el reto de atender clientes fuera de horario. Un sitio web moderno con IA conversacional reduce las barreras de contacto y agiliza la comunicación comercial.",
            "El proyecto de FLAS ilustra cómo la tecnología práctica resuelve necesidades comerciales reales sin costes innecesarios ni promesas irreales.",
          ],
        },
        {
          heading: "Cómo se Define el Alcance de un Sistema Web con IA",
          paragraphs: [
            "La planificación de un sitio web con asistente de IA comienza analizando los canales de consulta actuales, el catálogo de servicios o productos y los flujos de respuesta del equipo.",
            "Esteban ofrece sesiones de alcance estructuradas para definir los requerimientos técnicos, las integraciones necesarias y los plazos de entrega para empresas en South Florida.",
          ],
        },
      ],
    },
  },
  {
    id: "healthy-smile",
    en: {
      title: "Healthy Smile Miami: On-Location Dental Clinic Video Production & Direct Sound",
      metadataTitle: "Healthy Smile Miami Case Study | Dental Video Production",
      client: "Healthy Smile Miami (Dental Practice)",
      summary:
        "On-location commercial videography, direct sound recording, and editing for a dental healthcare clinic in Miami, produced on assignment with the 300 Bees creative agency.",
      metaDescription:
        "On-location video, direct sound and editing for Healthy Smile Miami, a dental clinic, produced on assignment with the 300 Bees creative agency.",
      eyebrow: "Dental Healthcare Video Production",
      role: "On-Location Videographer, Sound Recordist & Editor (On assignment with 300 Bees)",
      year: 2021,
      location: "Miami, Florida",
      deliverables: "16:9 promotional video master (18 seconds), social media clips, on-location audio stems",
      agencyContext: "Produced on assignment with the 300 Bees creative agency for a local Miami dental clinic.",
      answer: {
        question: "What did Esteban do on the Healthy Smile Miami project?",
        text:
          "On assignment with the 300 Bees creative agency in 2021, Esteban filmed, recorded the sound and edited a short promo for Healthy Smile Miami, a dental clinic in Miami. The shoot took place inside the working clinic and its treatment rooms. Two problems shaped it: lighting sterile, reflective clinical surfaces without harsh glare, and recording clear dialogue with directional microphones in rooms that echo. The deliverables were an 18-second 16:9 promotional master made for social ad placement, social media clips, and the on-location audio stems. It is the one case study on this site where he covered the whole chain on location: camera, sound and edit. No patient or business results are claimed here.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=YTJW6zn14S8",
      posterUrl: "/portfolio/healthy-smile.jpg",
      serviceLink: {
        href: "/services/dental-video-marketing-south-florida",
        label: "Dental Video Marketing Services",
        description: "Learn more about video production and social media marketing for dental clinics in South Florida.",
      },
      contactLink: {
        href: "/contact",
        label: "Discuss Healthcare Video Production",
      },
      portfolioLink: {
        href: "/portfolio/healthy-smile",
        label: "View Healthy Smile in Portfolio",
      },
      keyFacts: [
        { label: "Production Scope", value: "Complete on-location videography, direct sound capture, and video editing" },
        { label: "Location Setting", value: "Active clinical dental facility and treatment operatories in Miami" },
        { label: "Asset Runtime", value: "Compact 18-second promotional cut engineered for social ad placement" },
        { label: "Lighting Challenge", value: "Managing sterile reflective clinical surfaces without harsh equipment glare" },
        { label: "Audio Strategy", value: "Direct directional microphone capture in acoustically reflective operatory rooms" },
      ],
      scopingQuestions: [
        "Will filming take place during active clinic hours or during scheduled downtime?",
        "Are patient photo/video consent forms prepared in compliance with healthcare privacy guidelines?",
        "Which specific dental procedures, cosmetic treatments, or technology assets will be showcased?",
        "What are the target platform destinations (e.g. Instagram Reels, website homepage, local ad campaigns)?",
        "Who is the designated clinical contact responsible for approving medical presentation accuracy?",
      ],
      sections: [
        {
          heading: "Project Context & Healthcare Environment",
          paragraphs: [
            "Healthy Smile is a professional dental practice in Miami providing general, restorative, and cosmetic dental treatments to the local bilingual community. The practice required high-quality video content for digital channels to introduce its clinical team, highlight modern treatment equipment, and communicate a welcoming patient experience. Esteban was commissioned by the 300 Bees creative agency to handle the complete end-to-end video production on site.",
            "Unlike corporate office shoots, filming within an active healthcare facility introduces stringent operational constraints. Dental operatories are compact, highly sterile environments equipped with reflective stainless steel, dental chairs, high-intensity operatory lamps, and sensitive medical instruments. Equipment placement must be clean, safe, and non-disruptive to staff.",
            "Esteban's assignment covered the full spectrum of production: on-location lighting and camera operation, clean direct sound recording, and subsequent post-production editing to deliver finished, broadcast-quality video assets.",
            "Working in close collaboration with the agency creative director, Esteban structured the filming plan around the clinic's appointment calendar to avoid patient interference. Every camera position was vetted beforehand to safeguard sterile tray setups and ensure clinical decorum throughout the shoot.",
          ],
          callout: {
            title: "Full-Cycle Production Assignment",
            text: "Esteban executed on-location filming, professional audio recording, and video editing in Miami under assignment from the 300 Bees agency.",
          },
        },
        {
          heading: "On-Location Technical Execution: Lighting & Audio",
          paragraphs: [
            "Clinical lighting often creates unflattering overhead shadows and harsh specular highlights on dental tools. To overcome this, Esteban utilized diffuse, soft key lighting positioned to flatter human skin tones while maintaining a sterile, modern aesthetic throughout the operatory.",
            "Direct sound capture in clinical settings presents acoustic challenges due to hard tiled floors, glass partitions, and background compressor hums. Using specialized directional microphones positioned close to speaking talent, Esteban captured clean, intimate dialogue with minimal environmental noise.",
            "Because operatory spaces restrict large light stands, compact LED panels with magnetic softboxes were mounted on low-profile articulating arms. This mobile footprint allowed seamless transitions between consultation desks and patient chairs without tripping hazards.",
          ],
          bullets: [
            "Compact lighting footprint designed for safe positioning in tight dental treatment rooms",
            "Directional audio capture isolating clinical explanations from ambient background equipment",
            "Careful camera composition highlighting advanced dental tools and patient comfort protocols",
            "Natural color grading preserving accurate tooth enamel shades and warm facial tones",
          ],
        },
        {
          heading: "Micro-Pacing & 18-Second Message Structure",
          paragraphs: [
            "The final video asset was edited into a tightly structured 18-second promotional piece. In short-form social video, clarity and authority must be established immediately. The cut introduces the clinic's welcoming reception, transitions swiftly into an attentive doctor-patient consultation, showcases modern treatment technology, and closes with a clear branding screen.",
            "Every cut occurs on action—a doctor greeting a patient, an instrument adjustment, or a confident smile—keeping visual momentum high without feeling rushed.",
            "Color finishing was calibrated specifically to balance clinical cleanliness with human warmth. Sterile blues were tempered to preserve natural tooth enamel hues, while skin tones received subtle warmth to enhance viewer comfort and approachability.",
          ],
        },
        {
          heading: "Relevance for South Florida Healthcare & Dental Practices",
          paragraphs: [
            "South Florida boasts one of the most competitive healthcare, dental, and medical spa markets in the nation, spanning Brickell, Coral Gables, Doral, and Fort Lauderdale. Prospective patients evaluate clinical professionalism, cleanliness, and bedside manner through video before booking consultations.",
            "The Healthy Smile Miami project illustrates how targeted on-location video production creates tangible trust with prospective patients while maintaining strict medical decorum.",
            "Practices that present their team and facilities with clean cinematography establish clear differentiation against competitors relying on generic stock footage or low-quality mobile phone clips.",
          ],
        },
        {
          heading: "How Medical & Dental Video Shoots Are Scoped",
          paragraphs: [
            "Planning video production for a medical or dental clinic requires coordinating shoot schedules around patient appointments, securing necessary privacy permissions, and identifying primary clinical messages.",
            "Esteban collaborates with clinic managers and agency leads to organize efficient shot lists that maximize production value while minimizing disruption to daily practice operations.",
            "Initial scoping meetings clarify whether filming will occur after-hours or during active treatment days, ensuring complete adherence to patient privacy standards and local healthcare operational protocols.",
          ],
        },
      ],
    },
    es: {
      title: "Healthy Smile Miami: Grabación en Locación, Captura Directa de Audio y Edición para Clínica Dental",
      metadataTitle: "Caso de Estudio Healthy Smile | Video para Clínicas Dentales",
      client: "Healthy Smile Miami (Clínica Odontológica)",
      summary:
        "Producción audiovisual en locación, grabación de sonido directo y edición para una clínica odontológica en Miami, realizada por encargo de la agencia 300 Bees.",
      eyebrow: "Producción de Video en Salud y Odontología",
      role: "Videógrafo en Locación, Sonidista y Editor (Por encargo de la agencia 300 Bees)",
      year: 2021,
      location: "Miami, Florida",
      deliverables: "Master promocional en 16:9 (18 segundos), piezas para redes sociales, pistas de audio en locación",
      agencyContext: "Proyecto realizado por encargo de la agencia creativa 300 Bees para una clínica dental de Miami.",
      answer: {
        question: "¿Qué hizo Esteban en el proyecto de Healthy Smile Miami?",
        text:
          "Por encargo de la agencia creativa 300 Bees, en 2021 Esteban grabó, registró el sonido y editó un video promocional corto para Healthy Smile Miami, una clínica odontológica en Miami. El rodaje fue dentro de la clínica en funcionamiento y sus consultorios. Dos problemas marcaron el trabajo: iluminar superficies clínicas esterilizadas y reflectantes sin brillos fuertes, y grabar diálogo claro con micrófonos direccionales en salas con mucho eco. Los entregables fueron un master promocional de 18 segundos en 16:9 pensado para pauta en redes, piezas para redes sociales y las pistas de audio grabadas en locación. Es el único caso de estudio de este sitio en el que cubrió toda la cadena en el lugar: cámara, sonido y edición. Aquí no se declaran resultados de pacientes ni del negocio.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=YTJW6zn14S8",
      posterUrl: "/portfolio/healthy-smile.jpg",
      serviceLink: {
        href: "/es/marketing-de-video-para-dentistas-miami",
        label: "Servicio de Video para Dentistas en Miami",
        description: "Conoce nuestro servicio de producción y edición de video para clínicas odontológicas en South Florida.",
      },
      contactLink: {
        href: "/es/contacto",
        label: "Consultar Producción en Sector Salud",
      },
      portfolioLink: {
        href: "/es/portafolio/healthy-smile",
        label: "Ver Proyecto Healthy Smile en el Portafolio",
      },
      keyFacts: [
        { label: "Alcance del Proyecto", value: "Grabación presencial completa, captura de audio directo y edición de video" },
        { label: "Entorno del Rodaje", value: "Consultorio e instalaciones clínicas odontológicas activas en Miami" },
        { label: "Duración de la Pieza", value: "Corte promocional de 18 segundos optimizado para pauta digital" },
        { label: "Desafío de Iluminación", value: "Control de reflejos en superficies clínicas esterilizadas y lámparas quirúrgicas" },
        { label: "Captura Sonora", value: "Uso de micrófonos direccionales para aislar el diálogo de ruidos ambientales" },
      ],
      scopingQuestions: [
        "¿La grabación se realizará durante horario de atención o en un día sin pacientes?",
        "¿Se dispone de consentimientos de imagen y privacidad médica para el personal y pacientes?",
        "¿Qué tratamientos específicos (ortodoncia, estética dental, implantes) se van a destacar?",
        "¿Cuáles son los canales prioritarios de difusión (Instagram Reels, sitio web, anuncios locales)?",
        "¿Quién será el profesional médico responsable de revisar la precisión de los procedimientos mostrados?",
      ],
      sections: [
        {
          heading: "Contexto del Proyecto y Entorno Clínico",
          paragraphs: [
            "Healthy Smile es una clínica odontológica en Miami que ofrece servicios de odontología general, estética y restaurativa para la comunidad local. El consultorio requería material audiovisual profesional para plataformas digitales con el fin de presentar a su equipo médico, mostrar su equipamiento moderno y transmitir cercanía a los pacientes. Esteban fue contratado por la agencia 300 Bees para liderar la producción audiovisual completa en el consultorio.",
            "Filmar en un centro médico activo implica exigencias técnicas particulares. Los consultorios dentales son espacios reducidos con superficies metálicas reflectantes, lámparas quirúrgicas de alta intensidad e instrumental esterilizado que no puede manipularse sin autorización. Todo el equipo de grabación debe operar con máxima higiene y sin interferir en la rutina clínica.",
            "El encargo abarcó todas las etapas de la producción: montaje de iluminación, operación de cámaras, registro de sonido directo y la edición final de los videos.",
          ],
          callout: {
            title: "Producción Completa en Locación",
            text: "Esteban realizó la filmación presencial, la captura de audio profesional y la edición de las piezas finales en Miami por encargo de la agencia 300 Bees.",
          },
        },
        {
          heading: "Técnica en Locación: Iluminación y Sonido Directo",
          paragraphs: [
            "La iluminación artificial en clínicas suele generar sombras duras y destellos molestos en los instrumentos metálicos. Para evitarlo, Esteban utilizó fuentes de luz difusa que suavizan los rasgos faciales y resaltan la limpieza del ambiente clínico.",
            "El sonido en consultorios presenta retos por la reverberación de azulejos y el ruido de compresores dentales. Mediante micrófonos direccionales de proximidad, se registraron diálogos claros y naturales con mínimo ruido de fondo.",
          ],
          bullets: [
            "Equipos compactos de iluminación adaptados a consultorios dentales reducidos",
            "Micrófonos direccionales para captar explicaciones médicas con nitidez",
            "Encuadres precisos que destacan la tecnología y la comodidad del paciente",
            "Tratamiento de color que respeta los tonos naturales del esmalte dental y la piel",
          ],
        },
        {
          heading: "Micro-Ritmo y Estructura en 18 Segundos",
          paragraphs: [
            "El video principal se editó en un formato compacto de 18 segundos. En el contenido social para clínicas, la confianza debe transmitirse de inmediato. La secuencia inicia con la bienvenida en recepción, pasa a la consulta personalizada y muestra la aparatología moderna antes de cerrar con la identidad de la marca.",
            "Los cortes se realizaron sobre acciones continuas para que el video mantenga dinamismo y resulte agradable de ver.",
          ],
        },
        {
          heading: "Relevancia para Consultorios y Spas Médicos en South Florida",
          paragraphs: [
            "El sector de salud dental y estética en Miami, Coral Gables, Doral y Fort Lauderdale es altamente competitivo. Los pacientes potenciales investigan en video las instalaciones y el trato médico antes de agendar una primera cita.",
            "El trabajo en Healthy Smile Miami demuestra cómo una producción en locación bien planificada genera confianza y proyecta profesionalismo sin recurrir a recursos artificiales.",
          ],
        },
        {
          heading: "Cómo se Define el Alcance en Producciones de Salud",
          paragraphs: [
            "Organizar un rodaje en un consultorio requiere coordinar los tiempos con el equipo médico, preparar la lista de tomas prioritarias y asegurar los permisos necesarios.",
            "Esteban asesora a clínicas y agencias para estructurar planes de filmación eficientes que aprovechen la jornada sin afectar la atención a los pacientes.",
          ],
        },
      ],
    },
  },
  {
    id: "my-dler",
    en: {
      title: "My D'ler: 3D Motion, Key Visuals, and Pitch Assets for Delivery App Concept",
      metadataTitle: "My D'ler Case Study | 3D Motion Graphics & Pitch Assets",
      client: "My D'ler (Delivery App Concept)",
      summary:
        "A brand visual design and investor pitch package developed through an agency for an Ecuador delivery platform, featuring key visual design, 3D app mockups, and 2D animated videos.",
      metaDescription:
        "Brand visuals and an investor pitch package for My D'ler, a delivery app in Ecuador: key visual, 3D app mockups and 2D animated videos, made through an agency.",
      eyebrow: "3D Animation & Visual Brand Design",
      role: "Visual Designer & 3D Animator (Key visual, social graphics, 3D video, 2D animation, and product mockups)",
      deliverables: "3D animated video (11 seconds), 2D explainer animations, brand key visual suite, high-res device mockups",
      agencyContext: "Produced on assignment with an agency presenting a comprehensive brand and pitch deck to the client.",
      answer: {
        question: "What did Esteban do on the My D'ler project?",
        text:
          "My D'ler is a delivery app concept from Ecuador, and this project was an agency brand presentation and investor pitch package, not a campaign for a launched product. Working on assignment through the agency, Esteban was the visual designer and 3D animator. He produced the key visual identity, a social media graphic kit, 2D explainer animations, high-resolution device mockups, and an 11-second 3D animation of a smartphone that walks through the app's ordering flow with floating interface elements. Because it was a concept and pitch package, no post-launch user data is published, and none is claimed here. It is the reference case for anyone who needs 3D product visuals or motion graphics before the app or the product exists.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=vMvbC5yOzgs",
      posterUrl: "/portfolio/my-dler.jpg",
      serviceLink: {
        href: "/services/content-repurposing-service-miami",
        label: "Content Repurposing & AI Media Services",
        description: "Explore digital design, 3D visual assets, and content adaptation for modern brands.",
      },
      contactLink: {
        href: "/contact",
        label: "Discuss 3D Motion & Visual Design",
      },
      portfolioLink: {
        href: "/portfolio/my-dler",
        label: "View My D'ler in Portfolio",
      },
      keyFacts: [
        { label: "Project Nature", value: "Agency brand presentation and investor pitch deck package" },
        { label: "Visual Scope", value: "Key visual identity, social media graphic kit, 3D video, 2D motion" },
        { label: "3D Deliverable", value: "11-second 3D smartphone mockup animation showcasing app ordering flow" },
        { label: "Design Elements", value: "3D device rendering, floating UI elements, graphic layouts, pitch mockups" },
        { label: "Transparency Note", value: "Concept and pitch package; no public post-launch user data is published" },
      ],
      scopingQuestions: [
        "Are static UI screen designs (Figma/Adobe XD) prepared or will custom interface mockups be created?",
        "What specific 3D animation requirements (e.g. 3D device rotations, floating feature callouts) are needed?",
        "What are the target output formats (widescreen 16:9 for investor decks vs vertical 9:16 for social ads)?",
        "Will the deliverables include editable source graphics or finalized master video exports?",
        "What is the timeline for the agency presentation or investor pitch milestone?",
      ],
      sections: [
        {
          heading: "Project Background & Agency Pitch Brief",
          paragraphs: [
            "My D'ler was a concept for an on-demand food and grocery delivery mobile application targeting urban consumers in Ecuador. A creative agency was tasked with preparing a comprehensive brand presentation and pitch package to win the account and present the product vision to stakeholders and potential investors. Esteban was contracted by the agency to create the entire suite of visual branding assets, including the core key visual, social media graphic templates, 2D animated explainer clips, and a 3D animated promotional video.",
            "Pitch packages require visual clarity and high perceived production value. When software is in conceptual or pre-launch stages, static screenshots often fail to convey the dynamic feel of a modern mobile app. Incorporating three-dimensional device choreography and kinetic typography bridges the gap between software design and customer emotion.",
            "In keeping with our commitment to factual transparency, this case study documents the design and animation deliverables produced for the agency pitch. Because this was a pitch concept, no claims regarding post-launch app downloads, market share, or consumer metrics are made.",
          ],
          callout: {
            title: "Pitch & Visual Identity Scope",
            text: "This project represents design and animation craft for an agency pitch. The deliverables included key visuals, 3D device motion, 2D animations, and social graphic kits.",
          },
        },
        {
          heading: "3D Animation Choreography & Device Modeling",
          paragraphs: [
            "The centerpiece of the video deliverables was an 11-second 3D motion graphic animation. Esteban modeled a sleek smartphone chassis, applying realistic glass reflections, metallic bevels, and subtle environmental lighting to give the device physical presence on screen.",
            "The animation sequence choreographs the phone rotating in 3D space while interface elements—such as category icons, restaurant selection cards, and delivery tracking indicators—emerge fluidly from the screen plane. This layered depth effect emphasizes app functionality without overwhelming the viewer with static UI clutter.",
          ],
          bullets: [
            "3D smartphone modeling with realistic glass, metal, and ambient shadow lighting",
            "Floating UI elements and interactive ordering steps rendered with spatial depth",
            "Synchronized sound effects and audio track reinforcing visual transitions",
            "Consistent brand color palette application across 2D graphics and 3D scenes",
          ],
        },
        {
          heading: "Key Visual Hierarchy & Multi-Format Brand Assets",
          paragraphs: [
            "Beyond the 3D video, Esteban developed the foundational key visual and social media templates for the brand. The design system established bold typography, vibrant food-delivery color accents, and standardized grid layouts for promotional social posts and presentation slides.",
            "Additionally, 2D vector animations were created to illustrate user onboarding, payment options, and courier tracking in a clear, accessible visual language suitable for slide presentations.",
          ],
        },
        {
          heading: "Relevance for Startups, Apps, and Digital Products",
          paragraphs: [
            "Tech startups, software companies, and e-commerce brands in South Florida frequently need high-impact visual assets for fundraising decks, product launches, and social ad campaigns before or alongside software engineering sprints. High-quality 3D mockups and motion graphics communicate product sophistication and credibility.",
            "The My D'ler assignment illustrates how multidisciplinary visual design—combining 3D modeling, graphic identity, and motion animation—elevates digital product concepts into compelling commercial presentations.",
          ],
        },
        {
          heading: "How 3D Motion & App Visual Projects Are Scoped",
          paragraphs: [
            "Scoping a motion graphics or 3D visual project begins by evaluating existing UI design files, desired animation complexity, and final output aspect ratios. Clear storyboard planning ensures efficient 3D rendering and motion iteration.",
            "Esteban provides consultative scoping to help startup founders, agencies, and brands determine the optimal balance of 2D graphics, 3D renders, and motion video for their launch objectives.",
          ],
        },
      ],
    },
    es: {
      title: "My D'ler: Animación 3D, Piezas Visuales de Marca y Material Gráfico para Presentación",
      metadataTitle: "Caso de Estudio My D'ler | Animación 3D y Diseño de Marca",
      client: "My D'ler (Concepto de App de Domicilios)",
      summary:
        "Desarrollo de identidad visual y paquete de presentación comercial para una app de domicilios en Ecuador, incluyendo key visual, mockups en 3D y videos con animación 2D.",
      metaDescription:
        "Identidad visual y presentación comercial para My D'ler, una app de domicilios en Ecuador: key visual, mockups en 3D y videos con animación 2D.",
      eyebrow: "Animación 3D y Diseño Visual de Marca",
      role: "Diseñador Visual y Animador 3D (Key visual, gráficas para redes, video 3D, animación 2D y mockups)",
      deliverables: "Video animado en 3D (11 segundos), animaciones 2D, suite de key visual de marca, mockups en alta resolución",
      agencyContext: "Proyecto realizado por encargo de una agencia para presentar la propuesta de marca al cliente e inversionistas.",
      answer: {
        question: "¿Qué hizo Esteban en el proyecto de My D'ler?",
        text:
          "My D'ler es un concepto de app de domicilios de Ecuador, y este proyecto fue un paquete de presentación de marca y propuesta para inversionistas hecho a través de una agencia, no una campaña de un producto ya lanzado. Por encargo de la agencia, Esteban fue el diseñador visual y animador 3D. Produjo la identidad de key visual, un kit gráfico para redes sociales, animaciones 2D explicativas, mockups de dispositivos en alta resolución y una animación 3D de 11 segundos con un smartphone que recorre el flujo de pedido de la app con elementos de interfaz flotantes. Como fue un paquete conceptual de presentación, no se publican datos de usuarios después de un lanzamiento, y aquí no se declara ninguno. Es el caso de referencia para quien necesita visuales 3D de producto o gráficos en movimiento antes de que exista la app o el producto.",
      },
      mediaUrl: "https://www.youtube.com/watch?v=vMvbC5yOzgs",
      posterUrl: "/portfolio/my-dler.jpg",
      serviceLink: {
        href: "/es/fotografia-de-producto-con-ia-miami",
        label: "Servicio de Imágenes y Contenido con IA",
        description: "Descubre soluciones de diseño visual, mockups de producto y contenido digital para marcas modernas.",
      },
      contactLink: {
        href: "/es/contacto",
        label: "Consultar Diseño Visual y Animación 3D",
      },
      portfolioLink: {
        href: "/es/portafolio/my-dler",
        label: "Ver Proyecto My D'ler en el Portafolio",
      },
      keyFacts: [
        { label: "Naturaleza del Proyecto", value: "Paquete de presentación de marca y propuesta para inversionistas" },
        { label: "Alcance Visual", value: "Identidad key visual, kit gráfico para redes, video 3D y animación 2D" },
        { label: "Entregable 3D", value: "Animación de 11 segundos con mockup de smartphone mostrando la app" },
        { label: "Elementos de Diseño", value: "Renderizado 3D, interfaz flotante, composiciones gráficas y mockups" },
        { label: "Nota de Transparencia", value: "Proyecto de presentación conceptual; no se publican métricas de usuarios" },
      ],
      scopingQuestions: [
        "¿Se dispone de pantallas de interfaz en Figma o se crearán mockups personalizados desde cero?",
        "¿Qué requerimientos específicos de animación 3D (giros de dispositivo, capas flotantes) se necesitan?",
        "¿Cuáles son los formatos de entrega (panorámico 16:9 para presentaciones o vertical 9:16 para redes)?",
        "¿El proyecto requiere archivos editables de diseño o únicamente los videos master terminados?",
        "¿Cuál es la fecha límite para la presentación de la propuesta o reunión con inversionistas?",
      ],
      sections: [
        {
          heading: "Contexto del Proyecto y Propuesta para Agencia",
          paragraphs: [
            "My D'ler fue un concepto de aplicación móvil para entrega de comida y productos a domicilio dirigido al mercado urbano en Ecuador. Una agencia de publicidad requería estructurar una presentación integral de marca para ganar la cuenta y exponer la visión del producto ante el cliente y posibles inversionistas. La agencia contrató a Esteban para crear todo el universo visual de la propuesta: key visual principal, piezas gráficas para redes sociales, animaciones explicativas en 2D y un video promocional en 3D.",
            "En las etapas iniciales de una startup o producto digital, las capturas de pantalla estáticas no logran transmitir la experiencia dinámica de una aplicación. La animación tridimensional de dispositivos móviles y el movimiento de interfaces permiten visualizar el potencial comercial del producto con un alto nivel de acabado profesional.",
            "De acuerdo con nuestras normas de transparencia, este caso de estudio documenta estrictamente el trabajo gráfico y de animación entregado a la agencia. Al tratarse de una propuesta conceptual, no se incluyen afirmaciones sobre descargas de la app, número de usuarios ni métricas posteriores no verificadas.",
          ],
          callout: {
            title: "Alcance de Diseño y Presentación",
            text: "El proyecto se enfocó en el desarrollo gráfico y audiovisual para una propuesta de agencia: key visual, animación 3D de dispositivos, piezas 2D y kit para redes sociales.",
          },
        },
        {
          heading: "Coreografía y Modelado 3D de Dispositivos",
          paragraphs: [
            "La pieza central de video fue una animación en 3D de 11 segundos de duración. Esteban modeló la estructura de un smartphone moderno, aplicando reflejos de vidrio, biseles metálicos y sombreado ambiental para otorgar realismo al dispositivo en pantalla.",
            "Durante la animación, el teléfono gira en el espacio tridimensional mientras elementos de la interfaz—como categorías de comida, selección de restaurantes y confirmación de entrega—emergen con profundidad visual. Este recurso destaca las funciones clave de la aplicación sin sobrecargar la composición.",
          ],
          bullets: [
            "Modelado 3D de smartphone con reflejos realistas en cristal y acabados metálicos",
            "Elementos de interfaz flotantes que muestran el flujo de pedido con sensación de profundidad",
            "Sincronización de efectos de sonido con los movimientos de cámara y transiciones",
            "Paleta cromática coherente aplicada tanto en piezas gráficas 2D como en escenas 3D",
          ],
        },
        {
          heading: "Jerarquía Visual y Kit Gráfico Multiformato",
          paragraphs: [
            "Además del video 3D, Esteban diseñó el key visual base y plantillas gráficas para redes sociales. La propuesta definió tipografías legibles, colores contrastantes inspirados en servicios de delivery y esquemas modulares para publicaciones digitales y diapositivas de presentación.",
            "Se desarrollaron también animaciones vectoriales en 2D para ilustrar el registro de usuarios, métodos de pago y seguimiento de pedidos con un lenguaje visual claro y directo.",
          ],
        },
        {
          heading: "Relevancia para Startups y Productos Digitales",
          paragraphs: [
            "Empresas tecnológicas, aplicaciones móviles y marcas de comercio electrónico en el sur de la Florida necesitan piezas visuales de impacto para rondas de inversión, presentaciones y campañas de lanzamiento. Los mockups en 3D y las animaciones de producto aportan credibilidad y diferencian la propuesta frente a competidores.",
            "El proyecto de My D'ler demuestra cómo el diseño visual integral—que combina modelado 3D, identidad gráfica y animación—convierte conceptos digitales en presentaciones comerciales persuasivas.",
          ],
        },
        {
          heading: "Cómo se Define el Alcance en Proyectos de Animación 3D",
          paragraphs: [
            "La planificación de un proyecto de animación y diseño 3D comienza revisando los diseños de interfaz disponibles, la complejidad de movimiento deseada y los formatos de exportación requeridos.",
            "Esteban trabaja con fundadores de startups, marcas y agencias para definir el balance ideal entre diseño gráfico, modelado 3D y animación según los objetivos de cada presentación.",
          ],
        },
      ],
    },
  },
  ...websiteCasePairs,
  ...publicMediaCasePairs,
];

export function getCaseStudies(locale: CaseStudyLocale): CaseStudy[] {
  return caseStudyPairs.map((pair) => ({
    id: pair.id,
    locale,
    slug: pair.id,
    ...pair[locale],
  }));
}

export function getCaseStudyById(
  locale: CaseStudyLocale,
  id: CaseStudyId,
): CaseStudy | undefined {
  const pair = caseStudyPairs.find((candidate) => candidate.id === id);
  if (!pair) return undefined;
  return {
    id: pair.id,
    locale,
    slug: pair.id,
    ...pair[locale],
  };
}

export function getCaseStudyPath(
  caseStudyOrId: CaseStudy | CaseStudyId,
  locale: CaseStudyLocale = "en",
): string {
  const id = typeof caseStudyOrId === "string" ? caseStudyOrId : caseStudyOrId.id;
  const targetLocale = typeof caseStudyOrId === "object" ? caseStudyOrId.locale : locale;

  return targetLocale === "es"
    ? `/es/casos-de-estudio/${id}`
    : `/case-studies/${id}`;
}

export function getCaseStudyAlternates(
  caseStudyOrId: CaseStudy | CaseStudyId,
): Record<string, string> {
  const id = typeof caseStudyOrId === "string" ? caseStudyOrId : caseStudyOrId.id;
  const englishPath = getCaseStudyPath(id, "en");
  const spanishPath = getCaseStudyPath(id, "es");

  return {
    "en-US": englishPath,
    "es-US": spanishPath,
    "x-default": englishPath,
  };
}

export function buildCaseStudyMetadata(caseStudy: CaseStudy): Metadata {
  const alternates = getCaseStudyAlternates(caseStudy);
  const path = getCaseStudyPath(caseStudy);

  return buildPageMetadata({
    title: caseStudy.metadataTitle,
    description: caseStudy.metaDescription ?? caseStudy.summary,
    path,
    locale: caseStudy.locale,
    languages: alternates,
    images: [
      {
        url: absoluteUrl(caseStudy.posterUrl),
        width: 1280,
        height: 720,
        alt: caseStudy.title,
      },
    ],
  });
}

/**
 * Builds schema.org structured data for a Case Study page.
 *
 * Emits an Article and BreadcrumbList JSON-LD graph.
 * STRICTLY OMITS aggregateRating and review nodes (per AGENTS.md & QA rules).
 */
/**
 * VideoObject for a case study that embeds the project's YouTube video.
 *
 * The page renders the same embed as the portfolio watch page, from the same
 * portfolio item, so the upload date, duration and video id are reused rather
 * than restated (SEO/GEO audit 2026-10-10, fix 8). Case studies without a
 * YouTube source (a website build) get no VideoObject.
 */
function buildCaseStudyVideoObject(caseStudy: CaseStudy, path: string) {
  const item = getPortfolioItemById(caseStudy.id);
  if (!item || !isYouTubeSource(item.media)) return undefined;
  return {
    "@type": "VideoObject",
    "@id": absoluteUrl(`${path}#video`),
    name: `${caseStudy.title} video`,
    description: caseStudy.summary,
    thumbnailUrl: absoluteUrl(caseStudy.posterUrl),
    uploadDate: item.media.uploadDate,
    duration: item.media.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${item.media.videoId}`,
    sameAs: item.media.url,
    inLanguage: caseStudy.locale === "es" ? "es-US" : "en-US",
    publisher: { "@id": absoluteUrl("/#business") },
  };
}

export function buildCaseStudyStructuredData(caseStudy: CaseStudy) {
  const path = getCaseStudyPath(caseStudy);
  const isSpanish = caseStudy.locale === "es";
  const video = buildCaseStudyVideoObject(caseStudy, path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": absoluteUrl(`${path}#article`),
        isPartOf: { "@id": absoluteUrl("/#website") },
        headline: caseStudy.title,
        description: caseStudy.summary,
        url: absoluteUrl(path),
        inLanguage: isSpanish ? "es-US" : "en-US",
        mainEntityOfPage: absoluteUrl(path),
        image: absoluteUrl(caseStudy.posterUrl),
        ...(pageLastModified(path) ? { dateModified: pageLastModified(path) } : {}),
        // author typed the business name as a Person. Every case study names
        // Esteban in its body as the person who did the work, so author is the
        // sitewide #esteban entity and publisher the #business entity
        // (SEO/GEO audit 2026-10-10, fix 7).
        author: { "@id": absoluteUrl("/#esteban") },
        publisher: { "@id": absoluteUrl("/#business") },
        about: {
          "@type": "CreativeWork",
          name: caseStudy.client,
        },
        ...(video ? { video: { "@id": video["@id"] } } : {}),
      },
      ...(video ? [video] : []),
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isSpanish ? "Inicio" : "Home",
            item: absoluteUrl(isSpanish ? "/es" : "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isSpanish ? "Portafolio" : "Portfolio",
            item: absoluteUrl(isSpanish ? "/es/portafolio" : "/portfolio"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: caseStudy.title,
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Case-study index (hub)
//
// The five case-study detail pages shipped in #91 and are listed in the
// sitemap, but `/case-studies` and `/es/casos-de-estudio` returned 404: only
// `[id]/page.tsx` existed under each route segment, with no index page. That
// left every published case study reachable only from a portfolio deep link.
// ---------------------------------------------------------------------------

export type CaseStudyDiscipline = "systems" | "production" | "design";

/**
 * Discipline is derived from the published scope of each case study rather
 * than stored on the localized content blocks, so the grouping cannot drift
 * between the English and Spanish copies of the same project.
 */
export const CASE_STUDY_DISCIPLINES: Record<CaseStudyId, CaseStudyDiscipline> = {
  "flas-concierge": "systems",
  "gains-from-geebs": "systems",
  "caro-sells-miami": "systems",
  "dupont-realty-international": "systems",
  "great-reviewer-website": "systems",
  banacol: "production",
  "healthy-smile": "production",
  homeowners: "production",
  "my-dler": "design",
  "gains-from-geebs-shorts": "production",
  exatlon: "production",
  "juanchis-burguer": "production",
  portosole: "production",
  "punto-de-giro": "production",
};

export function getCaseStudyDiscipline(
  caseStudyOrId: CaseStudy | CaseStudyId,
): CaseStudyDiscipline {
  const id = typeof caseStudyOrId === "string" ? caseStudyOrId : caseStudyOrId.id;
  return CASE_STUDY_DISCIPLINES[id];
}

export const caseStudiesIndexCopy = {
  en: {
    path: "/case-studies",
    metadataTitle: "Case Studies: Web, AI Systems & Video Projects",
    description:
      "Esteban Moreno Media case studies: current website systems, an AI concierge, product-review publishing, aerial drone filming, real-estate editing and 3D motion.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Case Studies",
    breadcrumbLabel: "Breadcrumb",
    eyebrow: "Published project work",
    title: "How each project was scoped, built, and delivered.",
    answerLabel: "Quick answer:",
    answer:
      "Published case studies covering current website systems, web and AI work, on-location and aerial production, remote post-production, and motion design — each with the confirmed role, deliverables, and scoping questions used on the project.",
    intro:
      "Every case study on this page describes work that was actually delivered. Roles are stated exactly as they were performed, and no client name, review, outcome, price, or turnaround appears here without the client's own published confirmation.",
    readLabel: "Read the case study",
    languageLabel: "Ver los casos de estudio en español",
    countLabel: "Focused breakdowns of delivered project work.",
    disciplineHeadings: {
      systems: "Web & AI systems",
      production: "Video production & post",
      design: "Motion & design",
    },
    disciplineIntros: {
      systems:
        "Custom web architecture and conversational AI built for local businesses that need inquiries answered outside office hours.",
      production:
        "On-location capture, aerial cinematography, and remote post-production from supplied or captured footage.",
      design:
        "3D motion, key visuals, and pitch assets produced on assignment.",
    },
    relatedEyebrow: "From proof to project",
    relatedTitle: "Which service and portfolio piece go with each case study?",
    // Answer-first sections under the hero; website-system cases stay source-bounded.
    answers: [
      {
        question: "What is in a case study on this site?",
        text:
          "A case study here is a written breakdown of one delivered project, longer than the portfolio entry for the same video or site. Each one states the client, the role Esteban actually performed, the year and place where known, the deliverables, the problems that shaped the work, and the scoping questions a comparable project would start with. The website cases include Fort Lauderdale Auto Sale, Gains From Geebs, Caro Sells Miami, DuPont International Realty Florida and The Great Reviewer. The production and design cases keep their own role boundaries, including past agency work. Where the role was partial, the page says so; where a site is live but its business result is not measured, the page says that too.",
      },
      {
        question: "Which case study is closest to your project?",
        text:
          "Match the case to the material you already have. If you have clips from a phone or a camera and need them cut into a short promo, read Homeowners: it was edited entirely from supplied footage. If you need someone on site to film, record sound and edit, read Healthy Smile Miami, the only case where Esteban covered all three in one place. If the project is a website, a chatbot or lead intake, compare the website-system cases: FLAS, Gains From Geebs, Caro Sells Miami, DuPont International Realty Florida and The Great Reviewer. If the product does not exist yet and you need 3D or animated visuals for a pitch, read My D'ler. Each case links to its portfolio project and related service page, so you can see the work and scope side by side.",
      },
      {
        question: "What do the case studies not claim?",
        text:
          "They do not claim results the client has not published or measured in a dated source. No page here gives traffic, lead, sales, view or conversion figures as a result of the work, and no testimonial is quoted without its public source. Roles are stated as performed: on Banacol the agency handled the edit, sound and script, and Esteban's part was aerial capture; on Homeowners there was no filming on his side. The current website cases show implemented visitor paths, not rankings, leads or revenue. Prices and turnaround are not quoted on the case studies either, because each project is scoped from its own material; the current prices are on the pricing page.",
      },
    ],
    roleLabel: "Role",
    deliverablesLabel: "Deliverables",
  },
  es: {
    path: "/es/casos-de-estudio",
    metadataTitle: "Casos de Estudio: Web, Sistemas con IA y Video",
    description:
      "Casos de estudio de Esteban Moreno Media: sistemas web actuales, concierge con IA, publicación de reseñas de productos, dron, edición inmobiliaria y animación 3D.",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Casos de Estudio",
    breadcrumbLabel: "Migas de pan",
    eyebrow: "Trabajo publicado",
    title: "Cómo se definió, se construyó y se entregó cada proyecto.",
    answerLabel: "Respuesta rápida:",
    answer:
      "Casos de estudio publicados sobre sistemas web actuales, trabajo web con IA, producción en locación y aérea, postproducción remota y diseño de movimiento, cada uno con el rol confirmado, los entregables y las preguntas de definición usadas en el proyecto.",
    intro:
      "Cada caso de estudio de esta página describe trabajo realmente entregado. Los roles se declaran tal como se ejecutaron, y ningún nombre de cliente, reseña, resultado, precio o tiempo de entrega aparece aquí sin la confirmación pública del propio cliente.",
    readLabel: "Leer el caso de estudio",
    languageLabel: "Read the case studies in English",
    countLabel: "Desgloses concretos de trabajo entregado.",
    disciplineHeadings: {
      systems: "Web y sistemas con IA",
      production: "Producción y postproducción de video",
      design: "Animación y diseño",
    },
    disciplineIntros: {
      systems:
        "Arquitectura web a medida e IA conversacional para negocios locales que necesitan responder consultas fuera del horario de oficina.",
      production:
        "Grabación en locación, cinematografía aérea y postproducción remota con material entregado o capturado.",
      design:
        "Animación 3D, piezas visuales clave y material de presentación producidos por encargo.",
    },
    relatedEyebrow: "De la prueba al proyecto",
    relatedTitle: "¿Qué servicio y qué pieza del portafolio acompañan cada caso de estudio?",
    // Secciones de respuesta directa; los casos web siguen limitados a fuentes verificables.
    answers: [
      {
        question: "¿Qué incluye un caso de estudio en este sitio?",
        text:
          "Un caso de estudio aquí es el desglose escrito de un proyecto entregado, más largo que la ficha del mismo video o sitio en el portafolio. Cada uno indica el cliente, el rol que Esteban realmente cumplió, el año y el lugar cuando se conocen, los entregables, los problemas que marcaron el trabajo y las preguntas de alcance con las que empezaría un proyecto parecido. Los casos web incluyen Fort Lauderdale Auto Sale, Gains From Geebs, Caro Sells Miami, DuPont International Realty Florida y The Great Reviewer. Los casos de producción y diseño conservan sus propios límites de rol, incluido el trabajo previo para agencias. Cuando el rol fue parcial, la página lo dice; cuando un sitio está activo pero no hay resultado comercial medido, también lo dice.",
      },
      {
        question: "¿Qué caso de estudio se parece más a tu proyecto?",
        text:
          "Compara el caso con el material que ya tienes. Si tienes clips del celular o de una cámara y necesitas convertirlos en un video promocional corto, lee Homeowners: se editó por completo con material entregado. Si necesitas a alguien en el lugar para grabar, registrar el sonido y editar, lee Healthy Smile Miami, el único caso en el que Esteban cubrió las tres cosas en un mismo sitio. Si el proyecto es un sitio web, un chatbot o la captura de prospectos, compara los casos de FLAS, Gains From Geebs, Caro Sells Miami, DuPont International Realty Florida y The Great Reviewer. Si el producto todavía no existe y necesitas visuales 3D o animados para una presentación, lee My D'ler. Cada caso enlaza a su proyecto de portafolio y a la página del servicio relacionado, para ver trabajo y alcance juntos.",
      },
      {
        question: "¿Qué no afirman los casos de estudio?",
        text:
          "No afirman resultados que el cliente no haya publicado o medido en una fuente fechada. Ninguna página aquí da cifras de tráfico, prospectos, ventas, vistas ni conversiones como resultado del trabajo, y no se cita un testimonio sin fuente pública. Los roles se declaran tal como se cumplieron: en Banacol la agencia hizo la edición, el sonido y el guion, y la parte de Esteban fue la captura aérea; en Homeowners no hubo grabación de su lado. Los casos web actuales muestran recorridos implementados para visitantes, no posiciones, prospectos ni ingresos. Tampoco se publican precios ni plazos en los casos de estudio, porque cada proyecto se define con su propio material; los precios actuales están en la página de precios.",
      },
    ],
    roleLabel: "Rol",
    deliverablesLabel: "Entregables",
  },
} as const;

export const CASE_STUDY_DISCIPLINE_ORDER: readonly CaseStudyDiscipline[] = [
  "systems",
  "production",
  "design",
];

export function getCaseStudiesIndexPath(locale: CaseStudyLocale): string {
  return caseStudiesIndexCopy[locale].path;
}

export function getCaseStudiesByDiscipline(locale: CaseStudyLocale) {
  const studies = getCaseStudies(locale);

  return CASE_STUDY_DISCIPLINE_ORDER.map((discipline) => ({
    discipline,
    studies: studies.filter(
      (study) => getCaseStudyDiscipline(study) === discipline,
    ),
  })).filter((group) => group.studies.length > 0);
}

export function buildCaseStudiesIndexMetadata(
  locale: CaseStudyLocale,
): Metadata {
  const copy = caseStudiesIndexCopy[locale];

  return buildPageMetadata({
    title: copy.metadataTitle,
    description: copy.description,
    path: copy.path,
    locale,
    languages: {
      "en-US": caseStudiesIndexCopy.en.path,
      "es-US": caseStudiesIndexCopy.es.path,
      "x-default": caseStudiesIndexCopy.en.path,
    },
  });
}

export function buildCaseStudiesIndexStructuredData(locale: CaseStudyLocale) {
  const copy = caseStudiesIndexCopy[locale];
  const pageUrl = absoluteUrl(copy.path);
  const breadcrumbsId = `${pageUrl}#breadcrumbs`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        ...(pageLastModified(copy.path) ? { dateModified: pageLastModified(copy.path) } : {}),
        name: copy.metadataTitle,
        description: copy.description,
        inLanguage: locale === "es" ? "es-US" : "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        breadcrumb: { "@id": breadcrumbsId },
        publisher: { "@id": absoluteUrl("/#business") },
        hasPart: getCaseStudies(locale).map((study) => ({
          "@type": "WebPage",
          "@id": `${absoluteUrl(getCaseStudyPath(study))}#webpage`,
          url: absoluteUrl(getCaseStudyPath(study)),
          name: study.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbsId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumbHome,
            item: absoluteUrl(locale === "es" ? "/es" : "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumbCurrent,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
