import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

import {
  PACKAGE_PRICES,
  PRICING_BANDS,
  PRODUCT_PHOTO_MARKET,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  usd,
  type PackageId,
} from "@/lib/pricing";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";

export const GUIDE_IDS = [
  "prepare-footage",
  "video-brief",
  "formats-and-safe-zones",
  "remote-editing-handoff",
  "reels-for-business",
  "restaurant-video-ideas",
  "real-estate-reels",
  "ai-product-photography-guide",
  "product-photography-pricing-guide",
  "ai-vs-traditional-photo-guide",
  "editor-vs-videographer-guide",
  "remote-vs-local-editing-guide",
  "corporate-video-cost-guide",
  "record-with-iphone-guide",
  "reels-vs-tiktok-vs-shorts-guide",
  "ai-vs-human-editor-guide",
  "choose-video-editor-guide",
  "agency-video-editing-guide",
  "repurpose-longform-to-reels-guide",
  "fort-lauderdale-video-cost-guide",
  "script-social-ads-guide",
  "interview-lighting-audio-guide",
  "caption-styles-reels-guide",
  "transfer-large-video-files-guide",
  "bilingual-video-strategy-guide",
  "video-aspect-ratios-guide",
  "color-grading-vs-correction-guide",
  "mix-audio-social-video-guide",
  "select-broll-corporate-guide",
  "ideal-video-length-guide",
  "design-video-thumbnails-guide",
  "improve-video-retention-guide",
  "freelance-vs-post-agency-guide",
  "drone-video-editing-guidelines-guide",
  "b2b-video-funnel-guide",
  "prepare-audio-for-editing-guide",
  "testimonial-script-template-guide",
  "vertical-video-best-practices-guide",
  "raw-video-formats-explained-guide",
  "restaurant-video-cost-guide",
  "real-estate-video-cost-guide",
] as const;

export type GuideId = (typeof GUIDE_IDS)[number];
export type GuideLocale = "en" | "es";

export type GuideSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

type GuideCopy = {
  slug: string;
  metadataTitle: string;
  title: string;
  description: string;
  eyebrow: string;
  answer: string;
  proof: GuideProofLink;
  sections: readonly GuideSection[];
  faqs?: readonly { question: string; answer: string }[];
};

type GuidePair = {
  id: GuideId;
  en: GuideCopy;
  es: GuideCopy;
};

export type Guide = GuideCopy & {
  id: GuideId;
  locale: GuideLocale;
};

export type GuideSupportLink = {
  href: string;
  label: string;
  description: string;
};

export type GuideProofLink = {
  href: string;
  title: string;
  description: string;
};

export const guidePolicyNotes: Record<GuideLocale, string> = {
  en: "This is general project-preparation guidance, not Esteban Moreno Media policy. Packages, process, review terms, timing, file transfer, and deliverables are defined for each project.",
  es: "Esta es una guía general para preparar un proyecto, no una política de Esteban Moreno Media. Los paquetes, el proceso, las revisiones, los plazos, la transferencia de archivos y los entregables se definen para cada proyecto.",
};

// Fail at build time if a cited starting price becomes custom-only. A guide
// must then be rewritten, rather than quietly publishing a stale figure.
function packageGuidePrice(id: PackageId): string {
  const price = PACKAGE_PRICES[id];
  if (price.kind !== "from") throw new Error(`Guide requires a starting price for ${id}`);
  return usd(price.amount);
}

const listingVideo = REAL_ESTATE_MEDIA.addOns.find(({ id }) => id === "premium-listing-video")!;
const listingTour = REAL_ESTATE_MEDIA.addOns.find(({ id }) => id === "zillow-3d-tour")!;
const listingTravel = REAL_ESTATE_MEDIA.fees.find(({ id }) => id === "out-of-area")!;
const listingReshoot = REAL_ESTATE_MEDIA.fees.find(({ id }) => id === "reshoot")!;
const listingPhotoStart = REAL_ESTATE_MEDIA.photography[0];
if (listingPhotoStart.amount === null || !listingTour.note) {
  throw new Error("Cost guides require a published first photo tier and tour price conditions");
}
const listingPhotoStartingPrice = usd(listingPhotoStart.amount);

const guidePairs: readonly GuidePair[] = [
  {
    id: "prepare-footage",
    en: {
      slug: "prepare-footage-for-video-editing",
      metadataTitle: "Prepare Footage for Editing",
      title: "How to prepare footage for a video editor",
      description:
        "Organize original footage, project context, references, and required assets so a remote video edit can begin with fewer open questions.",
      eyebrow: "Before editing begins",
      answer:
        "Send the original footage in a clear folder structure, then add a short note with the goal, intended platform, deadline, references, and any clips or messages that must appear.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "The approved portfolio lists script and video editing for this project. It is linked as relevant published work, not as evidence of a specific file-handoff process.",
      },
      sections: [
        {
          heading: "How should the source material be organised before editing?",
          paragraphs: [
            "Keep the original video and audio files available. Group files by shoot, scene, date, or camera when that distinction will help someone understand what belongs together.",
            "Use short folder and file labels that describe the content. A simple structure is more useful than renaming every clip or building a complicated archive. See how supplied clips were structured and edited in the [Homeowners real estate editing project](/portfolio/homeowners) (and the [Homeowners case study](/case-studies/homeowners)).",
          ],
          bullets: [
            "Original video files, grouped by shoot or scene",
            "Separate audio files, if the project has them",
            "Logos, approved graphics, and exact on-screen wording",
            "References in their own folder or link list",
          ],
        },
        {
          heading: "What should you explain about the result you need?",
          paragraphs: [
            "The footage does not explain the business goal by itself. Include the main message, where the video will be published, the requested format, and the deadline that matters to the project.",
            "Flag must-use moments and anything that should not be used. If there are several deliverables, name each one instead of assuming a single edit can cover every placement.",
            "Say who will watch it and what they should do afterwards: book, call, visit, buy, or simply recognise the brand next time. An editor chooses the opening, the pacing and the ending around that action, so naming it changes the cut more than any style reference does.",
          ],
          bullets: [
            "Goal and intended audience",
            "Primary platform or placement",
            "Vertical, horizontal, or both",
            "Must-use clips, names, offers, or calls to action",
            "Known audio, continuity, or permission concerns",
          ],
        },
        {
          heading: "What goes in the final handoff note?",
          paragraphs: [
            "Put the essential context in one message or document: what is included, what is missing, who will consolidate feedback, and which date or launch matters to the request.",
            "Treat the note as preparation, not as an assumed production policy. Scope, timing, review method, file transfer, and deliverables still need to be agreed for the individual project.",
          ],
        },
      ],
    },
    es: {
      slug: "preparar-material-para-edicion-de-video",
      metadataTitle: "Preparar Material para Edición",
      title: "Cómo preparar el material para un editor de video",
      description:
        "Organiza videos originales, contexto, referencias y archivos necesarios para iniciar una edición remota con menos dudas abiertas.",
      eyebrow: "Antes de empezar la edición",
      answer:
        "Envía el material original en una estructura clara de carpetas y añade una nota breve con el objetivo, el canal, la fecha, las referencias y los clips o mensajes obligatorios.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "El portafolio aprobado registra guion y edición de video para este proyecto. Se enlaza como trabajo publicado relacionado, no como prueba de un proceso específico de entrega de archivos.",
      },
      sections: [
        {
          heading: "¿Cómo se organiza el material original antes de editar?",
          paragraphs: [
            "Conserva los archivos originales de video y audio. Agrúpalos por grabación, escena, fecha o cámara cuando esa separación ayude a entender qué material pertenece al mismo momento.",
            "Usa nombres cortos que describan el contenido. Una estructura sencilla sirve más que renombrar cada clip o crear un archivo complicado. Revisa cómo se organizó y editó el material entregado en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
            "Envía los archivos tal como salieron de la cámara o del teléfono, no copias guardadas desde una aplicación de mensajes, que llegan comprimidas.",
          ],
          bullets: [
            "Videos originales agrupados por grabación o escena",
            "Archivos de audio separados, si existen",
            "Logos, gráficos aprobados y texto exacto en pantalla",
            "Referencias en una carpeta o lista de enlaces aparte",
          ],
        },
        {
          heading: "¿Qué debes explicar sobre el resultado que necesitas?",
          paragraphs: [
            "El material por sí solo no explica la meta del negocio. Indica el mensaje principal, dónde se publicará el video, el formato solicitado y la fecha relevante para el proyecto.",
            "Marca los momentos obligatorios y lo que no debe usarse. Si necesitas varias piezas, nombra cada entrega en lugar de asumir que un solo corte funcionará en todos los canales.",
            "Di quién lo verá y qué debería hacer después: reservar, llamar, visitar, comprar o recordar la marca. El editor elige la apertura, el ritmo y el cierre alrededor de esa acción.",
          ],
          bullets: [
            "Meta y audiencia principal",
            "Canal o ubicación donde se publicará",
            "Formato vertical, horizontal o ambos",
            "Clips, nombres, ofertas o llamados a la acción obligatorios",
            "Problemas conocidos de audio, continuidad o permisos",
          ],
        },
        {
          heading: "¿Qué incluye la nota final de entrega?",
          paragraphs: [
            "Reúne el contexto esencial en un mensaje o documento: qué está incluido, qué falta, quién consolidará los comentarios y qué fecha o lanzamiento importa para la solicitud.",
            "Usa la nota como preparación, no como una política de producción asumida. El alcance, los plazos, el método de revisión, la transferencia de archivos y los entregables todavía deben acordarse para cada proyecto.",
          ],
        },
      ],
    },
  },
  {
    id: "video-brief",
    en: {
      slug: "write-a-useful-video-brief",
      metadataTitle: "Write a Useful Video Brief",
      title: "How to write a video brief an editor can use",
      description:
        "Build a concise video brief around the goal, audience, source material, deliverables, references, review contact, and deadline.",
      eyebrow: "Define the project",
      answer:
        "A useful video brief states the goal, audience, publishing destination, available material, requested deliverables, references, reviewer, and deadline in one place.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved credits list pre-production, models, location, videography, and editing. Those documented elements make the project a useful scope example, but its private brief and process are not published.",
      },
      sections: [
        {
          heading: "What decision should the video support?",
          paragraphs: [
            "Describe what the viewer should understand or do after watching. That answer is more actionable than asking for a video that is simply polished, dynamic, or engaging.",
            "Add the audience and publishing destination because pacing, framing, captions, and the call to action depend on how the piece will be used.",
            "Write that answer in one sentence at the top of the brief. If two people on your side would write a different sentence, settle it before the edit starts, because the editor can only build toward one decision at a time and the disagreement will otherwise surface in the review.",
          ],
          bullets: [
            "Goal: what should change after someone watches?",
            "Audience: who needs to understand the message?",
            "Placement: website, social feed, short-form channel, presentation, or archive",
          ],
        },
        {
          heading: "Which materials and deliverables should the brief name?",
          paragraphs: [
            "List what already exists: footage, voice-over, music direction, logos, copy, product details, and references. Then list the requested pieces separately, including their orientation when it is known. For an example of how on-location requirements and deliverable definitions come together in a local business shoot, review the [Healthy Smile Miami dental video project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
            "If an item is undecided, label it as an open question. That is more useful than hiding uncertainty inside a vague request.",
          ],
          bullets: [
            "Source files and approved brand assets",
            "Number and type of requested pieces",
            "Vertical or horizontal orientation",
            "Required words, names, captions, or calls to action",
          ],
        },
        {
          heading: "How do you make review and timing explicit?",
          paragraphs: [
            "Include the deadline, the date the video will be used, and the person responsible for collecting feedback. These can be different facts, so write each one clearly.",
            "Use the brief to surface open questions instead of turning assumptions into promises. The eventual scope can define deliverables, timing, and review responsibilities for the individual project.",
            "Say also how feedback will be sent — one consolidated list or a shared document — so the first round does not arrive in pieces from several people.",
          ],
          bullets: [
            "Project deadline and any fixed publish date",
            "One person responsible for consolidated feedback",
            "References with a note explaining what is useful about each one",
          ],
        },
      ],
    },
    es: {
      slug: "como-escribir-un-brief-util-de-video",
      metadataTitle: "Escribir un Brief de Video",
      title: "Cómo escribir un brief de video que sí se puede usar",
      description:
        "Prepara un resumen claro con meta, audiencia, material disponible, entregables, referencias, persona encargada de revisar y fecha.",
      eyebrow: "Define el proyecto",
      answer:
        "Un brief, o resumen del proyecto, reúne en un solo lugar la meta, la audiencia, dónde se publicará, el material disponible, las piezas solicitadas, las referencias, quién revisa y la fecha.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados registran preproducción, modelos, locación, videografía y edición. Esos elementos documentados sirven como ejemplo de alcance, pero el brief y el proceso privado del proyecto no están publicados.",
      },
      sections: [
        {
          heading: "¿Qué decisión debe apoyar el video?",
          paragraphs: [
            "Explica qué debe entender o hacer la persona después de ver la pieza. Esa respuesta orienta mejor que pedir un video solamente dinámico, profesional o atractivo.",
            "Agrega la audiencia y el lugar de publicación porque el ritmo, el encuadre, los subtítulos y el llamado a la acción dependen del uso final.",
            "Escribe esa respuesta en una sola oración al inicio del brief. Si dos personas de tu equipo escribirían una oración distinta, resuélvanlo antes de editar, porque el editor solo puede construir hacia una decisión a la vez.",
          ],
          bullets: [
            "Meta: ¿qué debería cambiar después de ver el video?",
            "Audiencia: ¿quién necesita entender el mensaje?",
            "Uso: sitio web, red social, canal de video corto, presentación o archivo",
          ],
        },
        {
          heading: "¿Qué materiales y entregables debe nombrar el brief?",
          paragraphs: [
            "Enumera lo que ya existe: videos, voz en off, dirección musical, logos, textos, datos del producto y referencias. Después enumera cada pieza solicitada e indica su orientación cuando ya esté definida. Como ejemplo de estructuración de entregables para un negocio local, revisa el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)).",
            "Si algo todavía no está decidido, márcalo como pregunta pendiente. Es más útil que esconder la duda dentro de una solicitud general.",
          ],
          bullets: [
            "Archivos originales y recursos de marca aprobados",
            "Cantidad y tipo de piezas solicitadas",
            "Orientación vertical u horizontal",
            "Palabras, nombres, subtítulos o llamados a la acción obligatorios",
          ],
        },
        {
          heading: "¿Cómo se aclaran la revisión y las fechas?",
          paragraphs: [
            "Incluye la fecha límite, la fecha en que se usará el video y la persona responsable de reunir los comentarios. Pueden ser datos diferentes, por eso conviene escribir cada uno.",
            "Usa el brief para mostrar las preguntas pendientes en vez de convertir supuestos en promesas. El alcance de cada proyecto puede definir los entregables, los plazos y la responsabilidad de revisión.",
            "Indica también cómo se enviarán los comentarios — una lista consolidada o un documento compartido — para que la primera ronda no llegue a pedazos.",
          ],
          bullets: [
            "Fecha límite y cualquier día fijo de publicación",
            "Una persona responsable de consolidar los comentarios",
            "Referencias con una nota sobre lo que sirve de cada una",
          ],
        },
      ],
    },
  },
  {
    id: "formats-and-safe-zones",
    en: {
      slug: "vertical-horizontal-video-exports-and-safe-zones",
      metadataTitle: "Video Formats and Safe Zones",
      title: "Vertical and horizontal video exports: a safe-zone guide",
      description:
        "Choose a primary video orientation, plan intentional reframes, and keep essential text and action clear of interface and crop areas.",
      eyebrow: "Plan the final formats",
      answer:
        "Choose the primary placement before editing, request a separate reframe when you need both vertical and horizontal versions, and keep essential faces, products, text, and calls to action away from the edges.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved credits list brand key visuals, social designs, a 3D video, and product mockups. That mix is relevant to format planning, but the portfolio does not publish this project's export specifications.",
      },
      sections: [
        {
          heading: "Which placement should choose the first format?",
          paragraphs: [
            "A 9:16 vertical frame and a 16:9 horizontal frame show different parts of the same shot. Decide which placement matters most before choosing the primary edit.",
            "Vertical video is commonly used in full-screen short-form feeds. Horizontal video is commonly used on YouTube, websites, presentations, and wider displays. Confirm the actual destination instead of exporting by habit.",
          ],
        },
        {
          heading: "Why is each reframe a composition decision?",
          paragraphs: [
            "A horizontal cut cannot always be cropped into a useful vertical piece. People, products, captions, and movement may need a different position or a different shot.",
            "When both orientations are requested, identify the priority version and list the secondary version separately. Do not assume one automatic crop will work; framing, text placement, and requested outputs still need to be defined for that project.",
            "When the vertical version matters most, say so before filming, so the subject is framed with room to crop rather than rescued later.",
          ],
          bullets: [
            "Keep the main subject readable in the narrower frame",
            "Check whether captions cover faces, products, or demonstrations",
            "Use a separate text layout when the crop changes",
            "Preview each export in the placement where it will appear",
          ],
        },
        {
          heading: "How do you use safe zones without one permanent template?",
          paragraphs: [
            "Platform controls, captions, account labels, and crop behavior can cover the outer parts of a frame. Keep essential information comfortably inside the composition and check the current platform preview before publishing.",
            "Avoid relying on one set of pixel measurements for every channel because interfaces can change. Save the exact wording and graphics separately so they can be repositioned when needed.",
            "A draft post or the platform's own preview shows the overlays as they are today, which no saved template can promise.",
          ],
          bullets: [
            "Keep names and calls to action away from the top and bottom edges",
            "Leave breathing room around faces, logos, and product details",
            "Check auto-captions and manually placed captions together",
            "Review the thumbnail or cover crop separately from the video",
          ],
        },
      ],
    },
    es: {
      slug: "video-vertical-horizontal-y-zonas-seguras",
      metadataTitle: "Video y Zonas Seguras",
      title: "Video vertical, horizontal y zonas seguras para exportar",
      description:
        "Elige una orientación principal, planifica cada reencuadre y mantén textos y acciones importantes fuera de las áreas de interfaz o recorte.",
      eyebrow: "Planifica los formatos finales",
      answer:
        "Define primero dónde se publicará, solicita un reencuadre separado si necesitas versiones verticales y horizontales, y mantén rostros, productos, textos y llamados importantes lejos de los bordes.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados registran piezas visuales de marca, diseños sociales, un video 3D y mockups de producto. Esa mezcla es relevante para planificar formatos, pero el portafolio no publica las especificaciones de exportación del proyecto.",
      },
      sections: [
        {
          heading: "¿Qué uso final debe definir el primer formato?",
          paragraphs: [
            "Un cuadro vertical 9:16 y uno horizontal 16:9 muestran partes diferentes de la misma toma. Decide qué canal es prioritario antes de elegir la edición principal.",
            "El video vertical se usa con frecuencia en canales de video corto a pantalla completa como [reels para negocios en Miami](/es/reels-para-negocios-miami) y [video para restaurantes en Miami](/es/video-para-restaurantes-miami). Para empresas y marcas que evalúan estos formatos, el encuadre 9:16 asegura máxima visibilidad en feeds móviles. El horizontal es común en YouTube, sitios web, presentaciones y pantallas anchas. Confirma el destino real en vez de exportar por costumbre.",
          ],
        },
        {
          heading: "¿Por qué cada reencuadre es una nueva composición?",
          paragraphs: [
            "Un corte horizontal no siempre se puede recortar y convertir en una pieza vertical útil. Personas, productos, subtítulos y movimientos pueden necesitar otra posición o una toma diferente.",
            "Cuando solicites ambas orientaciones, identifica la versión prioritaria y anota la secundaria por separado. No asumas que un recorte automático funcionará; el encuadre, la posición del texto y los exportes solicitados todavía deben definirse para ese proyecto.",
          ],
          bullets: [
            "Mantén el sujeto principal legible en el cuadro más estrecho",
            "Revisa si los subtítulos cubren rostros, productos o demostraciones",
            "Usa otra distribución de texto cuando cambia el recorte",
            "Prueba cada exporte en el lugar donde se publicará",
          ],
        },
        {
          heading: "¿Cómo se usan las zonas seguras sin una plantilla permanente?",
          paragraphs: [
            "Los controles, subtítulos, nombres de cuenta y recortes de cada plataforma pueden cubrir las partes exteriores. Mantén la información esencial dentro de la composición y revisa la vista previa actual antes de publicar.",
            "No dependas de una sola medida en píxeles para todos los canales porque las interfaces pueden cambiar. Guarda textos y gráficos por separado para poder moverlos cuando sea necesario.",
          ],
          bullets: [
            "Aleja nombres y llamados a la acción de los bordes superior e inferior",
            "Deja espacio alrededor de rostros, logos y detalles de producto",
            "Revisa juntos los subtítulos automáticos y los colocados durante la edición",
            "Comprueba por separado el recorte de la portada o miniatura",
          ],
        },
      ],
    },
  },
  {
    id: "remote-editing-handoff",
    en: {
      slug: "remote-video-editing-handoff",
      metadataTitle: "Remote Editing Handoff",
      title: "A practical handoff for remote video editing",
      description:
        "Organize source files, project context, feedback, and requested output formats for a clearer remote video-editing conversation.",
      eyebrow: "Work clearly from a distance",
      answer:
        "A useful remote-editing handoff groups source files, one project brief, clearly labeled feedback, and a list of requested output formats. The actual process and deliverables still need to be agreed for that project.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "The approved portfolio credits this project with script and video editing. It is a related editing example; nothing published confirms that it used the handoff described in this general guide.",
      },
      sections: [
        {
          heading: "How do you package files and context together?",
          paragraphs: [
            "Place the original footage, audio, approved graphics, copy, and references in a structure that another person can follow. Add one brief that explains the goal, intended use, deadline, and requested deliverables. For a real-world example of remote video post-production from supplied footage, explore the [Homeowners real estate editing project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)).",
            "Keep assumptions separate from confirmed facts. This preparation does not decide which files an editor will accept or what the eventual scope, transfer method, schedule, or deliverables will include.",
            "Send the original files through a transfer link or a shared drive rather than a messaging app, which recompresses video, and keep the folder structure from each camera card so clips stay matched to their audio and their day.",
          ],
        },
        {
          heading: "How do you make feedback easy to locate?",
          paragraphs: [
            "When reviewing any shared draft, identify the exact moment or element that needs attention. Write what should change and, when useful, why it matters to the message or placement.",
            "A timestamp can help when the chosen review method supports one, but no tool, number of review rounds, or feedback process is assumed here. Collecting comments before sending them can still reduce conflicting requests.",
            "Note which version you reviewed, such as v1 or v2, so a comment on an older export is not applied to the newer one by mistake.",
          ],
          bullets: [
            "Name the exact moment or element",
            "Describe the requested change",
            "Include replacement wording when text must change",
            "Resolve conflicting feedback before sending it",
          ],
        },
        {
          heading: "Which output needs should the handoff list?",
          paragraphs: [
            "List the versions requested for web, social, or archive. Orientation, captions, text placement, and file naming may differ across those uses.",
            "Treat that list as an input to the conversation, not a promise of delivery. File transfer, schedule, accepted deliverables, and review points remain open until they are agreed for the individual project.",
          ],
          bullets: [
            "List each requested orientation and placement",
            "State whether text or captions should appear in the image",
            "Keep source material, review versions, and any approved files in separate folders",
          ],
        },
      ],
    },
    es: {
      slug: "entrega-para-edicion-remota-de-video",
      metadataTitle: "Entrega para Edición Remota",
      title: "Una entrega práctica para edición remota de video",
      description:
        "Organiza archivos, contexto, comentarios y formatos solicitados para conversar con más claridad sobre una edición de video a distancia.",
      eyebrow: "Trabaja con claridad a distancia",
      answer:
        "Una entrega útil para edición remota reúne archivos originales, un resumen del proyecto, comentarios claros y una lista de formatos solicitados. El proceso y los entregables reales todavía deben acordarse para ese proyecto.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "El portafolio aprobado registra guion y edición de video para este proyecto. Es un ejemplo relacionado de edición; nada publicado confirma que haya usado la entrega descrita en esta guía general.",
      },
      sections: [
        {
          heading: "¿Cómo se entregan juntos los archivos y el contexto?",
          paragraphs: [
            "Organiza videos originales, audio, gráficos aprobados, textos y referencias de una forma que otra persona pueda seguir. Agrega un brief con la meta, el uso final, la fecha y los entregables solicitados. Como ejemplo práctico de postproducción remota con material externo, explora el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
            "Separa los supuestos de los datos confirmados. Esta preparación no decide qué archivos aceptará un editor ni qué incluirán el alcance, la transferencia, el calendario o los entregables finales.",
            "Envía los archivos originales por un enlace de transferencia o una carpeta compartida, no por una aplicación de mensajes, que vuelve a comprimir el video, y conserva la estructura de cada tarjeta de cámara.",
          ],
        },
        {
          heading: "¿Cómo se hacen comentarios fáciles de ubicar?",
          paragraphs: [
            "Al revisar cualquier versión compartida, identifica el momento o elemento exacto que necesita atención. Escribe qué debe cambiar y, cuando ayude, por qué importa para el mensaje o el canal.",
            "Una marca de tiempo puede ayudar cuando el método de revisión elegido la permite, pero esta guía no supone una herramienta, cantidad de rondas ni proceso de comentarios. Reunir las observaciones antes de enviarlas puede reducir solicitudes contradictorias.",
            "Anota qué versión revisaste, como v1 o v2, para que un comentario sobre una exportación anterior no se aplique por error a la nueva.",
          ],
          bullets: [
            "Nombra el momento o elemento exacto",
            "Describe el cambio solicitado",
            "Incluye el texto nuevo cuando debe cambiar una frase",
            "Resuelve comentarios contradictorios antes de enviarlos",
          ],
        },
        {
          heading: "¿Qué formatos solicitados debe enumerar la entrega?",
          paragraphs: [
            "Enumera las versiones solicitadas para el sitio web, las redes o el archivo. La orientación, los subtítulos, la posición del texto y los nombres de archivo pueden cambiar según el uso.",
            "Trata esa lista como información para la conversación, no como una promesa de entrega. La transferencia, el calendario, los entregables aceptados y los puntos de revisión siguen pendientes hasta acordarlos para cada proyecto.",
          ],
          bullets: [
            "Enumera cada orientación y lugar de publicación solicitado",
            "Indica si el texto o los subtítulos deberían quedar integrados en la imagen",
            "Separa el material original, las versiones de revisión y cualquier archivo aprobado",
          ],
        },
      ],
    },
  },
  {
    id: "reels-for-business",
    en: {
      slug: "how-to-use-instagram-reels-for-business",
      metadataTitle: "Instagram Reels for Business",
      title: "How to use Instagram Reels for business",
      description:
        "A practical guide for business owners to plan, format, and edit short-form Instagram Reels that attract customers without wasting hours on trends.",
      eyebrow: "Short-form strategy",
      answer:
        "Focus each Reel on one clear business message, record clear audio and video, use vertical 9:16 framing, add readable captions, and close with a direct call to action.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include pre-production, videography, and editing for this project. It is linked as a related short-form video example; nothing published confirms a specific production process.",
      },
      sections: [
        {
          heading: "Why should each Reel carry one clear message?",
          paragraphs: [
            "Short-form video works best when each piece answers a single question, shows a single feature or makes a single offer. A viewer gives a Reel a few seconds before deciding whether to keep watching, and a video that tries to cover the whole company in thirty seconds gives them nothing to hold on to.",
            "Start with a strong opening: show the product in action, name the customer's problem, or ask a direct question. For restaurants and other places people visit, the [restaurant promo video editing page](/services/restaurant-promo-video-editing-miami) shows how a dish or a room can carry that first moment on its own.",
          ],
          bullets: [
            "One core point or offer per video",
            "A strong opening in the first seconds",
            "Vertical 9:16 framing",
            "On-screen text or captions for viewers watching without sound",
          ],
        },
        {
          heading: "How do you record clean audio and purposeful visuals for Reels?",
          paragraphs: [
            "Good light and clear sound matter more than an expensive camera. Stand facing a window or another soft light source rather than with it behind you, and use a lapel or directional microphone whenever someone speaks, because the phone's own microphone at a distance records the room as loudly as the voice.",
            "Plan the shots before pressing record. A short list — the opening image, two or three supporting shots, the closing frame — keeps the filming quick and gives the editor material that fits together. Change the angle or distance every few seconds in the edit so the pace holds, but let any shot that explains something stay on screen long enough to be understood.",
          ],
        },
        {
          heading: "What makes a call to action work at the end of a Reel?",
          paragraphs: [
            "Being specific and singular. Tell the viewer exactly one next step — visit the location, tap the link in the profile, send a message with a keyword, or book through the website — and both say it and show it as text, so sound-off viewers see it too. Several requests at once usually produce none.",
            "Match the request to how warm the viewer is. Someone who has never heard of the business is more likely to follow or save than to book; someone watching a video about a specific service may be ready to ask a price. Make sure the step works before you publish: the link opens, the keyword is answered, the booking page loads on a phone. Then the views a Reel earns have somewhere to go.",
          ],
        },
      ],
    },
    es: {
      slug: "como-usar-instagram-reels-para-tu-negocio",
      metadataTitle: "Instagram Reels para Negocios",
      title: "Cómo usar Instagram Reels para tu negocio",
      description:
        "Guía práctica para planificar, formatear y editar Reels de Instagram en video corto que atraigan clientes sin perder tiempo en tendencias.",
      eyebrow: "Estrategia de video corto",
      answer:
        "Enfoca cada Reel en un mensaje comercial claro, graba audio y video nítidos, usa formato vertical 9:16, agrega subtítulos legibles y cierra con un llamado a la acción directo.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen preproducción, videografía y edición para este proyecto. Se enlaza como un ejemplo relacionado de video corto; nada publicado confirma un proceso específico.",
      },
      sections: [
        {
          heading: "¿Por qué cada Reel debe llevar un solo mensaje claro?",
          paragraphs: [
            "El video corto funciona mejor cuando cada pieza responde una sola duda, muestra una sola función o hace una sola oferta. La persona le da a un Reel unos segundos antes de decidir si sigue mirando, y un video que intenta resumir toda la empresa en treinta segundos no le deja nada a qué aferrarse. Para negocios locales, la página de [reels para negocios en Miami](/es/reels-para-negocios-miami) explica cómo se plantea una serie.",
            "Empieza con una apertura fuerte: muestra el producto en acción, nombra el problema del cliente o haz una pregunta directa. En gastronomía, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) muestra cómo un plato o un salón sostienen ese primer momento.",
          ],
          bullets: [
            "Un solo punto u oferta por video",
            "Una apertura fuerte en los primeros segundos",
            "Formato vertical 9:16",
            "Texto en pantalla o subtítulos para ver sin sonido",
          ],
        },
        {
          heading: "¿Cómo se graban audio limpio y tomas con intención para Reels?",
          paragraphs: [
            "La buena luz y el sonido claro importan más que una cámara costosa. Ponte de frente a una ventana u otra luz suave, no de espaldas a ella, y usa un micrófono de solapa o direccional siempre que alguien hable, porque el micrófono del teléfono a distancia graba el cuarto tan fuerte como la voz. En gastronomía, la página de [video para restaurantes en Miami](/es/video-para-restaurantes-miami) aplica esto a la cocina.",
            "Planea las tomas antes de grabar. Una lista corta — la imagen inicial, dos o tres tomas de apoyo y el cuadro final — hace la grabación rápida y le da al editor material que encaja. En la edición, cambia el ángulo o la distancia cada pocos segundos para sostener el ritmo, pero deja que una toma que explica algo dure lo suficiente para entenderse.",
          ],
        },
        {
          heading: "¿Qué hace funcionar el llamado a la acción al final de un Reel?",
          paragraphs: [
            "Ser concreto y único. Dile a la persona un solo paso siguiente — visitar el local, tocar el enlace del perfil, enviar un mensaje con una palabra clave o reservar en el sitio web — y dilo y muéstralo como texto, para que también lo vea quien mira sin sonido. Varias peticiones a la vez suelen terminar en ninguna.",
            "Ajusta la petición a qué tan cerca está la persona de decidir. Alguien que nunca ha oído del negocio es más probable que lo siga o lo guarde que reservar; alguien que mira un video sobre un servicio concreto quizá ya quiera preguntar un precio. Comprueba que el paso funcione antes de publicar: el enlace abre, la palabra clave recibe respuesta, la página de reservas carga en el teléfono.",
          ],
        },
      ],
    },
  },
  {
    id: "restaurant-video-ideas",
    en: {
      slug: "video-content-ideas-for-restaurants",
      metadataTitle: "Video Content Ideas for Restaurants",
      title: "Video content ideas that bring customers to your restaurant",
      description:
        "Simple, high-impact video ideas for restaurants, bars, and food brands in South Florida to showcase dishes, atmosphere, and behind-the-scenes preparation.",
      eyebrow: "Restaurant video marketing",
      answer:
        "Show high-quality close-ups of signature dishes, capture peak atmosphere, introduce your culinary team, and highlight seasonal specials or customer favorites.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved credits list promotional video and social content for this restaurant project. It is linked as a related industry example; the portfolio does not publish private client briefs.",
      },
      sections: [
        {
          heading: "How should a restaurant film its signature dishes?",
          paragraphs: [
            "Close, in good light, and while something is happening. Steam rising, a sauce being poured, a crust being cut, a garnish placed by hand: movement and texture are what make food read on a phone screen, and they disappear in a wide shot of a finished plate. Film near a window or under the kitchen's brightest even light, and keep the background simple so the dish is the only thing the eye looks for.",
            "Shoot the same dish from two or three distances — the full plate, a close detail, the moment of serving — so the editor can build a short sequence instead of one still image. Record a few seconds of natural sound too; a sizzle or a pour says more than music alone. The [restaurant promo video editing page](/services/restaurant-promo-video-editing-miami) shows how kitchen clips like these are cut into short pieces.",
          ],
          bullets: [
            "Signature dish close-ups and plating",
            "The story behind a house speciality",
            "Cocktail preparation and pouring",
            "Guests at the table, with their permission",
          ],
        },
        {
          heading: "How do you capture a restaurant's atmosphere without disturbing guests?",
          paragraphs: [
            "Plan the timing and keep the camera discreet. A busy evening or a weekend brunch shows what visiting actually feels like, but guests did not come to be filmed, so favour wide shots where no one is recognisable, hands and plates rather than faces, and the room from the bar or a corner. Anyone who will appear clearly should be asked first.",
            "Film the room both empty and full: the empty shots, taken before opening with the lights set the way they are at service, give clean views of the space, and the full ones give the energy. Natural light and the room's own sound bring it to life, while a separate short clip of each special or event can be reused for weeks. For editing that material into vertical clips, see [short-form video editing](/services/short-form-video-editor-miami).",
          ],
        },
      ],
    },
    es: {
      slug: "ideas-de-contenido-de-video-para-restaurantes",
      metadataTitle: "Ideas de Video para Restaurantes",
      title: "Ideas de contenido en video para atraer clientes a tu restaurante",
      description:
        "Ideas sencillas y de alto impacto en video para restaurantes, bares y marcas gastronómicas en South Florida para destacar platos, ambiente y preparación.",
      eyebrow: "Marketing en video para restaurantes",
      answer:
        "Muestra primeros planos de platos estrella, captura el ambiente en horas concurridas, presenta al equipo de cocina y destaca ofertas o especialidades de la casa.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados registran video promocional y contenido social para este restaurante. Se enlaza como un ejemplo relacionado del sector; el portafolio no publica briefs privados de clientes.",
      },
      sections: [
        {
          heading: "¿Cómo debe grabar un restaurante sus platos estrella?",
          paragraphs: [
            "De cerca, con buena luz y mientras pasa algo. El vapor que sube, una salsa que se sirve, un corte en la costra, una guarnición puesta a mano: el movimiento y la textura son lo que hace que la comida se vea bien en un teléfono, y desaparecen en un plano general de un plato ya servido. Graba cerca de una ventana, con un fondo sencillo.",
            "Graba el mismo plato a dos o tres distancias — el plato completo, un detalle cercano, el momento de servir — para que el editor arme una secuencia corta y no una sola imagen. Para ver cómo se edita este material, revisa la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) y el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
          bullets: [
            "Primeros planos de platos estrella y emplatado",
            "La historia detrás de una especialidad de la casa",
            "Preparación y servicio de cócteles",
            "Comensales en la mesa, con su permiso",
          ],
        },
        {
          heading: "¿Cómo se capta el ambiente de un restaurante sin molestar a los clientes?",
          paragraphs: [
            "Planificando el momento y con una cámara discreta. Una noche concurrida o un brunch de fin de semana muestran cómo se siente visitar el lugar, pero los clientes no vinieron a ser grabados, así que conviene preferir planos abiertos donde nadie sea reconocible, manos y platos en vez de caras, y el salón desde la barra o una esquina. A quien vaya a aparecer con claridad se le pide permiso antes.",
            "Graba el salón vacío y lleno: las tomas vacías, hechas antes de abrir con las luces como están en el servicio, muestran el espacio limpio, y las llenas aportan la energía. La luz natural y el sonido propio del lugar le dan vida, y un clip corto de cada promoción o evento se puede reutilizar durante semanas. Para planear tomas o editar material grabado, revisa la página de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
      ],
    },
  },
  {
    id: "real-estate-reels",
    en: {
      slug: "instagram-reels-ideas-for-real-estate",
      metadataTitle: "Instagram Reels for Real Estate",
      title: "Instagram Reels ideas for real estate agents",
      description:
        "Effective short-form video ideas for real estate agents in South Florida to showcase property walkthroughs, neighborhood highlights, and buyer tips.",
      eyebrow: "Real estate video strategy",
      answer:
        "Highlight top property features in 15–30 second vertical tours, share quick homebuyer tips, and feature local neighborhood highlights to build agent authority.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved editing credits cover real estate video post-production. It is linked as a relevant editing sample; nothing published confirms a specific file handoff or template.",
      },
      sections: [
        {
          heading: "How do you film a property walkthrough that holds attention?",
          paragraphs: [
            "Open with the single best feature of the property (e.g., waterfront view, chef's kitchen, or master suite) rather than the front door. Keep clips under 3 seconds per room, as demonstrated in the [Homeowners real estate editing project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)), where balanced pacing and neutral lighting highlight residential spaces.",
          ],
          bullets: [
            "Feature-first property tours (15-30s)",
            "Local neighborhood spotlights and amenities",
            "First-time buyer tip of the week",
            "Market stats presented simply",
          ],
        },
        {
          heading: "Which buyer and seller advice works as a Reel?",
          paragraphs: [
            "Answer one common buyer or seller question per video (e.g., closing cost surprises, inspection tips, or staging mistakes). Position yourself as the trusted local expert.",
          ],
        },
        {
          heading: "Why feature local neighbourhood guides?",
          paragraphs: [
            "Showcase local coffee shops, parks, and dining spots near your active listings. Buyers invest in the lifestyle, not just the square footage.",
          ],
        },
        {
          heading: "What two things stop a South Florida listing shoot?",
          paragraphs: [
            "Most South Florida inventory is in a building somebody else controls, and most of it sits under controlled airspace. A condo or HOA generally has to approve filming in common areas, and some buildings ask for a certificate of insurance before a camera comes through the lobby — a question worth asking when the listing appointment is booked, not on shoot day. Separately, Fort Lauderdale, Miami and Opa-locka put a lot of the county under controlled airspace, where a drone flight needs FAA authorisation (LAANC) rather than just a licensed pilot. Both are scheduling facts, and both are why an aerial shot that was promised sometimes cannot be flown.",
          ],
          bullets: [
            "Ask about filming permission and any COI when the listing is signed",
            "Check airspace before promising an aerial",
            "Have a ground-level opening shot that works if the drone is grounded",
          ],
        },
        {
          heading: "Why cut it twice when many buyers read Spanish?",
          paragraphs: [
            "South Florida is a bilingual market, and a reel captioned only in English asks a large share of the audience to work harder than they will. The cheapest version of this is not a second shoot: it is the same footage with a second caption track and a Spanish-first hook, because the first line is what decides whether anyone watches the rest. Where an agent speaks Spanish, a short piece to camera in Spanish tends to outperform a translated caption over English audio — the language of the voice is itself the signal that this agent can represent that buyer.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need permission to film inside a condo listing?",
          answer:
            "Usually yes for anything outside the unit itself. The association controls the lobby, pool deck, gym and grounds, and plenty of South Florida buildings require advance notice, a scheduled window, or a certificate of insurance before a camera crew comes through. The unit interior is normally the seller's call. The practical move is asking at the listing appointment, because the amenities are often the strongest footage in the building and finding out on shoot day means either losing them or rescheduling.",
        },
        {
          question: "Can I use drone footage for any South Florida listing?",
          answer:
            "Not automatically. Much of Broward and Miami-Dade sits in controlled airspace around Fort Lauderdale, Miami and Opa-locka, and flying there needs FAA authorisation through LAANC in addition to a licensed remote pilot. Some areas are restricted outright. That is worth checking against the address before an aerial is promised in a listing presentation, and it is the reason a ground-level opening shot is a better default than an aerial — the opener has to exist whether or not the drone flies.",
        },
        {
          question: "Should a real estate reel be in English or Spanish?",
          answer:
            "In South Florida the honest answer is both, from one shoot. A second caption track and a Spanish-first hook cost a fraction of a second production, and the hook matters more than the captions because it decides whether the rest gets watched. If the agent speaks Spanish, a short piece to camera in Spanish usually does better than Spanish captions over English audio — buyers read the language of the voice as a signal about who this agent represents, which a translated caption does not carry.",
        },
        {
          question: "Can I put my branding on a listing video?",
          answer:
            "On your own social accounts, yes. Inside media syndicated through the MLS the rules vary by MLS and several restrict agent branding, contact details, or calls to action in listing media — so it is worth checking your own MLS rules rather than assuming. The usual answer is two exports from one edit: an unbranded cut for the listing feed and a branded cut for social. Deciding that before the edit is cheaper than re-exporting a set of videos afterwards.",
        },
        {
          question: "What makes neighborhood content risky for an agent?",
          answer:
            "Real estate advertising is subject to fair housing rules, and neighborhood content is where marketing most easily drifts into implying who a community is for. Describing amenities, distances, and what is physically there is different from characterising the people who live there, and the second can read as steering even when nothing of the kind was meant. Keeping the copy on the place rather than the population is both the safer edit and the more useful one for a buyer.",
        },
      ],
    },
    es: {
      slug: "ideas-de-reels-para-agentes-de-bienes-raices",
      metadataTitle: "Reels de Instagram para Real Estate",
      title: "Ideas de Reels de Instagram para agentes de bienes raíces",
      description:
        "Ideas de video corto efectivas para agentes inmobiliarios en South Florida para mostrar recorridos de propiedades, vecindarios y consejos de compra.",
      eyebrow: "Estrategia de video para real estate",
      answer:
        "Muestra lo mejor de cada propiedad en recorridos verticales de 15 a 30 segundos, comparte consejos rápidos para compradores y resalta atractivos del vecindario.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "Los créditos aprobados de edición cubren postproducción de video para real estate. Se enlaza como una muestra de edición relacionada; nada publicado confirma una plantilla específica.",
      },
      sections: [
        {
          heading: "¿Cómo se graba un recorrido de propiedad que retenga la atención?",
          paragraphs: [
            "Abre con la mejor característica de la propiedad (vista al agua, cocina equipada o suite principal) en lugar de la puerta de entrada. Mantén clips de menos de 3 segundos por espacio, tal como se implementó en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)), logrando un ritmo dinámico y equilibrado.",
          ],
          bullets: [
            "Recorridos enfocados en lo mejor del inmueble (15-30s)",
            "Destacados del vecindario y comercios cercanos",
            "Consejo semanal para compradores primerizos",
            "Datos del mercado explicados de forma simple",
          ],
        },
        {
          heading: "¿Qué consejos para compradores y vendedores funcionan como Reel?",
          paragraphs: [
            "Responde una duda frecuente por video (gastos de cierre, inspecciones o errores de preparación). Posiciónate como el experto local de confianza.",
          ],
        },
        {
          heading: "¿Por qué publicar guías del vecindario?",
          paragraphs: [
            "Muestra cafeterías, parques y restaurantes cerca de tus propiedades activas. Los compradores eligen el estilo de vida, no solo los metros cuadrados.",
          ],        },
        {
          heading: "¿Qué dos cosas detienen una grabación en South Florida?",
          paragraphs: [
            "Casi todo el inventario de South Florida está en un edificio que controla alguien más, y buena parte queda bajo espacio aéreo controlado. Un condominio o HOA normalmente tiene que aprobar la grabación en áreas comunes, y varios edificios piden un certificado de seguro antes de que una cámara entre al lobby: conviene preguntarlo al firmar el listing, no el día de la grabación. Aparte, Fort Lauderdale, Miami y Opa-locka dejan gran parte del condado en espacio aéreo controlado, donde volar un dron exige autorización de la FAA (LAANC) y no solo un piloto con licencia. Las dos cosas son de agenda, y son la razón por la que a veces la toma aérea prometida no se puede volar.",
          ],
          bullets: [
            "Pregunta por el permiso de grabación y el COI al firmar el listing",
            "Revisa el espacio aéreo antes de prometer una toma aérea",
            "Ten una toma de apertura a nivel de piso que funcione sin dron",
          ],
        },
        {
          heading: "¿Por qué cortarlo dos veces cuando muchos compradores leen en español?",
          paragraphs: [
            "South Florida es un mercado bilingüe, y un reel subtitulado solo en inglés le pide a una parte grande de la audiencia más esfuerzo del que va a hacer. La versión más económica de esto no es una segunda grabación: es el mismo material con una segunda pista de subtítulos y un gancho pensado en español, porque la primera línea es la que decide si alguien ve el resto. Cuando el agente habla español, un fragmento corto a cámara en español suele rendir más que un subtítulo traducido sobre audio en inglés — el idioma de la voz es en sí la señal de que ese agente puede representar a ese comprador.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Necesito permiso para grabar dentro de un condominio?",
          answer:
            "Por lo general sí para todo lo que esté fuera de la unidad. La asociación controla el lobby, la piscina, el gimnasio y los jardines, y muchos edificios de South Florida piden aviso previo, una ventana agendada o un certificado de seguro antes de que entre una cámara. El interior de la unidad normalmente lo decide el propietario. Lo práctico es preguntarlo en la cita del listing, porque las amenidades suelen ser el mejor material del edificio y enterarse el día de la grabación significa perderlas o reagendar.",
        },
        {
          question: "¿Puedo usar dron en cualquier propiedad de South Florida?",
          answer:
            "No de forma automática. Buena parte de Broward y Miami-Dade está en espacio aéreo controlado alrededor de Fort Lauderdale, Miami y Opa-locka, y volar ahí requiere autorización de la FAA por LAANC además de un piloto remoto con licencia. Algunas zonas están restringidas del todo. Conviene revisarlo contra la dirección antes de prometer una toma aérea en una presentación de listing, y es la razón por la que una apertura a nivel de piso es mejor opción por defecto: la apertura tiene que existir vuele o no el dron.",
        },
        {
          question: "¿El reel debe ir en inglés o en español?",
          answer:
            "En South Florida la respuesta honesta es en los dos, con una sola grabación. Una segunda pista de subtítulos y un gancho pensado en español cuestan una fracción de una segunda producción, y el gancho pesa más que los subtítulos porque decide si se ve el resto. Si el agente habla español, un fragmento corto a cámara en español suele rendir mejor que subtítulos en español sobre audio en inglés: el comprador lee el idioma de la voz como una señal de a quién representa ese agente, y un subtítulo traducido no carga con eso.",
        },
        {
          question: "¿Puedo poner mi marca en el video de un listing?",
          answer:
            "En tus propias redes, sí. Dentro del material que se sindica por el MLS las reglas cambian según el MLS y varios restringen la marca del agente, sus datos de contacto o llamados a la acción en el material del listing, así que conviene revisar las reglas de tu MLS en vez de suponer. La salida habitual son dos exportaciones de una misma edición: un corte sin marca para el listing y un corte con marca para redes. Decidirlo antes de editar es más barato que reexportar una tanda de videos después.",
        },
        {
          question: "¿Qué hace riesgoso el contenido sobre el vecindario?",
          answer:
            "La publicidad inmobiliaria está sujeta a las reglas de vivienda justa, y el contenido de vecindario es donde el marketing más fácilmente empieza a insinuar para quién es una comunidad. Describir amenidades, distancias y lo que físicamente hay es distinto de caracterizar a la gente que vive ahí, y lo segundo puede leerse como direccionamiento aunque no fuera la intención. Mantener el texto sobre el lugar y no sobre la población es a la vez la edición más segura y la más útil para un comprador.",
        },
      ],
    },
  },
  {
    id: "ai-product-photography-guide",
    en: {
      slug: "how-to-use-ai-for-product-photography",
      metadataTitle: "AI Product Photography Guide",
      title: "How to use AI for product photography and e-commerce images",
      description:
        "Learn how AI-assisted image creation helps e-commerce brands, restaurants, and small businesses create high-quality product visuals faster without replacing real photography.",
      eyebrow: "AI image creation",
      answer:
        "Combine clean reference photos with AI-assisted background generation and scene rendering to produce high-impact product visuals while maintaining real product accuracy.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include brand key visuals, social designs, 3D video, and product mockups. It is linked as a related visual design example; nothing published confirms a specific AI software workflow.",
      },
      sections: [
        {
          heading: "Why should AI product images start from real product photos?",
          paragraphs: [
            "Because the product a customer receives has to match the picture they bought from. AI image tools are good at inventing surroundings and unreliable at reproducing exact details: a logo can come out misspelled, a colour shifted, a proportion changed, a button moved. Starting from clean, well-lit photos of the actual product, taken from the angles you need, anchors those details so the AI only changes what it is allowed to change.",
            "For physical goods, avoid generating the product itself from a text prompt. Small differences between the image and the item tend to surface as questions, complaints and returns. Use the real photo for the product and let AI handle the background, the setting and the light.",
          ],
          bullets: [
            "Start with high-resolution reference photos",
            "Keep true product proportions and colours",
            "Use AI mainly for backgrounds, lighting and environments",
          ],
        },
        {
          heading: "How do AI tools create backgrounds and lighting around a real product?",
          paragraphs: [
            "They place a clean cut-out of the product into a generated setting — a marble counter, outdoor sunlight, a kitchen, a seasonal scene — instead of building a physical set for each one. The quality depends on how well the light in the new setting matches the light in the original photo, so it helps to photograph the product with soft, even light and to describe in the prompt where the light should come from.",
            "Check every result at full size before using it: shadows should fall in one direction, reflections should belong to the scene, and the product's edges should not blur into the background. Keep a short written description of your brand's look so that images made weeks apart still feel like one set. For restaurants pairing menu images with video, see [restaurant promo video editing](/services/restaurant-promo-video-editing-miami).",
          ],
        },
        {
          heading: "How do you keep AI-assisted brand images honest?",
          paragraphs: [
            "Be clear about what the image is. A generated lifestyle background around a real product photo is a presentation choice; an image that implies a product looks, works or is sized differently from reality is a misleading one. Keep the product itself accurate and say when an image is a mockup or a concept.",
            "Where people appear, prefer real photography or clearly illustrative imagery over invented faces presented as customers. Check the terms of the AI tool you use for commercial rights, and keep the original reference photos with the generated files, so it is always possible to show what the real product looks like. Customers forgive a styled setting; they do not forgive receiving something different from what they saw.",
          ],
        },
      ],
    },
    es: {
      slug: "como-usar-inteligencia-artificial-para-fotografia-de-producto",
      metadataTitle: "Guía de Fotografía con IA",
      title: "Cómo usar IA para fotografía de producto e imágenes de e-commerce",
      description:
        "Aprende cómo la creación de imágenes asistida por IA ayuda a marcas de e-commerce, restaurantes y pequeños negocios a crear piezas visuales sin reemplazar la fotografía real.",
      eyebrow: "Creación de imágenes con IA",
      answer:
        "Combina fotos de referencia limpias con generación de fondos y entornos asistidos por IA para producir imágenes de producto de alto impacto manteniendo la precisión del producto real.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen piezas visuales de marca, diseños sociales, video 3D y mockups de producto. Se enlaza como un ejemplo de diseño visual relacionado; nada publicado confirma un flujo de software de IA específico.",
      },
      sections: [
        {
          heading: "¿Por qué las imágenes de producto con IA deben partir de fotos reales?",
          paragraphs: [
            "Porque el producto que recibe el cliente tiene que coincidir con la imagen con la que lo compró. Las herramientas de IA son buenas inventando entornos y poco confiables reproduciendo detalles exactos: un logo puede salir mal escrito, un color cambiado, una proporción distinta, un botón movido. Partir de fotos limpias y bien iluminadas del producto real, tomadas desde los ángulos que necesitas, fija esos detalles para que la IA solo cambie lo que se le permite.",
            "Para productos físicos, evita generar el producto mismo a partir de un texto. Las pequeñas diferencias entre la imagen y el artículo suelen aparecer después como preguntas, quejas y devoluciones. Usa la foto real para el producto y deja a la IA el fondo, el entorno y la luz.",
          ],
          bullets: [
            "Comienza con fotos de referencia en alta resolución",
            "Conserva proporciones y colores reales del producto",
            "Usa la IA principalmente para fondos, iluminación y entornos",
          ],
        },
        {
          heading: "¿Cómo crean las herramientas de IA fondos e iluminación alrededor de un producto real?",
          paragraphs: [
            "Colocan un recorte limpio del producto dentro de un entorno generado — una encimera de mármol, luz de sol al aire libre, una cocina, una escena de temporada — en lugar de armar un set físico para cada uno. La calidad depende de qué tan bien coincida la luz del nuevo entorno con la de la foto original, así que ayuda fotografiar el producto con luz suave y pareja, y describir en las instrucciones de dónde debe venir la luz.",
            "Revisa cada resultado a tamaño completo antes de usarlo: las sombras deben caer hacia un mismo lado, los reflejos deben pertenecer a la escena y los bordes del producto no deben confundirse con el fondo. Para restaurantes que combinan imágenes de menú con video, revisa el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami) y la [edición de video promocional para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami).",
          ],
        },
        {
          heading: "¿Cómo se mantienen honestas las imágenes de marca hechas con ayuda de IA?",
          paragraphs: [
            "Siendo claros sobre qué es la imagen. Un fondo de estilo de vida generado alrededor de una foto real del producto es una decisión de presentación; una imagen que da a entender que el producto se ve, funciona o mide distinto de la realidad es engañosa. Mantén el producto exacto y di cuándo una imagen es un mockup o un concepto.",
            "Cuando aparecen personas, prefiere fotografía real o imágenes claramente ilustrativas antes que caras inventadas presentadas como clientes. Revisa las condiciones de uso comercial de la herramienta de IA y guarda las fotos de referencia originales junto a los archivos generados, para poder mostrar siempre cómo es el producto real. Los clientes perdonan un entorno estilizado; no perdonan recibir algo distinto de lo que vieron.",
          ],
        },
      ],
    },
  },
  {
    id: "product-photography-pricing-guide",
    en: {
      slug: "how-much-does-product-photography-cost",
      metadataTitle: "Product Photography Pricing",
      title: "How much does product photography cost? Rates & pricing guide",
      description:
        "Understand product photography pricing models (per image, per day, or project scope) for e-commerce brands and local South Florida businesses.",
      eyebrow: "Product pricing guide",
      answer:
        "Product photography rates depend on SKU volume, required angles per product, staging complexity (clean catalog vs lifestyle setting), retouching depth, and usage rights. There is no responsible single price before scope is defined.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include brand key visuals, social designs, 3D video, and product mockups. It is linked as a related visual design example; nothing published confirms a specific pricing tier or rate sheet.",
      },
      sections: [
        {
          heading: "Which variables shape product photography costs?",
          paragraphs: [
            "Commercial product visual pricing depends directly on operational scope. In professional visual production, projects are quoted by evaluating specific scope parameters before establishing a final estimate. You can estimate an indicative reference based on your project parameters using the [budget calculator](/calculator).",
            "Critical cost variables include total SKU volume, number of retouched angles per product, and set staging complexity.",
          ],
          bullets: [
            "Total SKU count and number of final retouched angles (standard catalog vs hero composites).",
            "Catalog photography (clean white/neutral backdrop) vs lifestyle photography (contextual props and staging).",
            "Use of physical props, talent, or AI-assisted background environments.",
            "Retouching depth (basic dust/reflection cleanup vs high-end commercial composite retouching).",
            "Usage licensing scope (e-commerce & social media vs paid global advertising campaigns).",
          ],
        },
        {
          heading: "Which pricing models and market context apply?",
          paragraphs: [
            "Commercial creators and studios typically use three pricing models: per-image rates, day rates, or complete project package pricing. Standard e-commerce catalog photos are usually billed per photo for larger volumes, while custom lifestyle launches are quoted on a project scope basis.",
            `As general South Florida market context, simple white-background catalog images are commonly quoted around ${usd(PRODUCT_PHOTO_MARKET.perImageMin)} to ${usd(PRODUCT_PHOTO_MARKET.perImageMax)} USD each, with Miami studios advertising entry rates near ${usd(PRODUCT_PHOTO_MARKET.miamiEntryPerImage)} per image; styled lifestyle work with props or models is quoted far higher per image, and half-day sessions in Miami commonly run ${usd(PRODUCT_PHOTO_MARKET.halfDayMin)} to ${usd(PRODUCT_PHOTO_MARKET.halfDayMax)} USD plus production expenses. These figures are published market rates for the area, not a price commitment from Esteban Moreno Media, and the ranges move with volume, retouching depth and usage rights. For a figure tied to your actual scope use the [budget estimator](/calculator), and for a written quote reach out via [contact](/contact).`,
          ],
        },
        {
          heading: "How do you define scope for an accurate quote?",
          paragraphs: [
            "There is no responsible single price before project scope is defined. To receive an accurate quote without surprises, specify technical requirements before production begins.",
            "Define your exact SKU count, required angles (such as packaging or 45-degree detail shots), publishing channels, and visual reference examples. You can calculate an instant estimate with our [budget calculator](/calculator) or send a message via [contact](/contact) to discuss your brand's requirements.",
          ],
        },
      ],
      faqs: [
        {
          question: "What details are needed to quote product photography?",
          answer:
            "Share your total SKU count, angles per product, whether you need clean catalog or lifestyle shots, retouching expectations, and intended distribution channels.",
        },
        {
          question: "What is the difference between catalog and lifestyle product photos?",
          answer:
            "Catalog photos present products on clean white or neutral backdrops for e-commerce stores. Lifestyle photos feature styled environments, props, or usage contexts to build emotional brand connection.",
        },
        {
          question: "How does AI assistance impact product visual costs?",
          answer:
            "AI assistance can generate photorealistic backgrounds using real product reference photos, reducing physical set builds and location travel costs.",
        },
        {
          question: "Is retouching included in product photography pricing?",
          answer:
            "Yes, delivered files include standard color correction and basic cleanup. Advanced composite retouching or beauty cleanup is specified within the initial project scope.",
        },
        {
          question: "Where can I calculate an initial budget estimate?",
          answer:
            "Use our budget calculator at /calculator for an instant estimated range based on project volume, or message us via /contact for a tailored proposal.",
        },
      ],
    },
    es: {
      slug: "cuanto-cuesta-la-fotografia-de-producto",
      metadataTitle: "Guía Precios Fotos de Producto",
      title: "¿Cuánto cuesta la fotografía de producto? Guía de tarifas y costos",
      description:
        "Entiende los modelos de precios de fotografía de producto (por imagen, por jornada o por proyecto) para marcas de e-commerce y negocios en South Florida.",
      eyebrow: "Guía de tarifas de producto",
      answer:
        "Las sesiones de fotografía de producto de Esteban Moreno Media parten desde $280 por sesión. El presupuesto final depende del volumen de SKUs, los ángulos por producto, la complejidad del entorno (catálogo vs estilo de vida), el retoque y los derechos de uso; no existe una tarifa única cerrada sin definir el alcance técnico del proyecto.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen piezas visuales de marca, diseños sociales, video 3D y mockups de producto. Se enlaza como un ejemplo de diseño visual relacionado; nada publicado confirma una tarifa o tabla de precios específica.",
      },
      sections: [
        {
          heading: "¿Qué variables técnicas determinan el precio por fotografía de producto?",
          paragraphs: [
            "El precio por fotografía de producto depende directamente del alcance operativo y la complejidad técnica del proyecto. En la producción comercial para e-commerce y catálogos de marca, el presupuesto final no se calcula con una cifra fija arbitraria, sino evaluando parámetros concretos antes de encender la primera luz en el estudio. Para marcas que buscan integrar tecnologías modernas de visualización, opciones como la [fotografía de producto con IA en Miami](/es/fotografia-de-producto-con-ia-miami) permiten generar entornos contextuales hiperrealistas sin los sobrecostos de construir escenografías físicas complejas.",
            "La primera variable determinante es el volumen total de productos o SKUs (Stock Keeping Units) y la cantidad de ángulos necesarios por artículo. No requiere el mismo tiempo de preparación fotografiar un lote uniforme de 50 suplementos alimenticios sobre fondo blanco estándar que capturar 10 piezas de joyería fina con superficies reflectantes que exigen difusores polarizados, macrofotografía milimétrica y apilamiento de enfoque (focus stacking) para mantener nitidez de borde a borde.",
          ],
        },
        {
          heading: "¿Cómo cambian el precio el tipo de imagen, el retoque y las licencias?",
          paragraphs: [
            "El segundo factor esencial es la tipología visual: fotografía de catálogo puro frente a fotografía de estilo de vida (lifestyle). Las tomas de catálogo sobre fondo blanco puro (RGB 255, 255, 255) o gris neutro están estandarizadas para marketplaces como Amazon, Shopify o Walmart. En contraste, las imágenes lifestyle requieren composición escénica, atrezzo temático, coordinación de iluminación ambiental y, en ocasiones, contratación de modelos de manos o locaciones específicas.",
            "Finalmente, la profundidad del retoque digital y la cesión de licencias de uso comercial completan la estructura de costo. Mientras que un revelado digital básico incluye corrección de color neutro, balance de blancos y eliminación de motas menores, el retoque comercial avanzado abarca trazados de recorte vectorial (clipping paths), reconstrucción de texturas de producto, sombras proyectadas naturales o flotantes y entrega en perfiles de color específicos (sRGB para web y Adobe RGB o CMYK para catálogos impresos).",
          ],
          bullets: [
            "Volumen total de SKUs y cantidad de ángulos por producto (vista frontal, 45°, trasera, detalle de textura y empaque)",
            "Tipo de fondo y ambientación (fondo blanco puro para e-commerce vs composiciones lifestyle con utilería)",
            "Dificultad de los materiales (vidrio, metales pulidos, joyería y cosmética reflectante exigen esquemas de luz avanzados)",
            "Profundidad de postproducción (limpieza básica vs retoque publicitario de alta gama y focus stacking)",
            "Derechos de uso comercial y formatos de entrega calibrados para web y medios impresos",
          ],
        },
        {
          heading: "¿Qué modelos de cotización se usan en fotografía de producto?",
          paragraphs: [
            "En la industria audiovisual y fotográfica comercial existen tres modelos habituales para estructurar los presupuestos de fotografía de producto: costo por imagen unitaria, tarifa por jornada de producción (day rate o half-day rate) y tarifa por paquete de proyecto cerrado.",
            "El modelo de costo por imagen unitaria es el estándar preferido en proyectos de catálogo e-commerce de mediano y alto volumen. Permite a las marcas calcular con exactitud su costo de adquisición visual por producto. En producciones donde los requisitos de iluminación y set cambian constantemente entre artículos, los fotógrafos y estudios suelen optar por tarifas de jornada, donde se reserva el estudio, el equipamiento de iluminación y el equipo humano por bloques de tiempo.",
          ],
        },
        {
          heading: "¿Qué referencias de tarifas hay en South Florida?",
          paragraphs: [
            `Como contexto general del mercado de South Florida, las fotos simples de catálogo con fondo blanco se cotizan por lo común entre ${usd(PRODUCT_PHOTO_MARKET.perImageMin)} y ${usd(PRODUCT_PHOTO_MARKET.perImageMax)} USD por imagen, y hay estudios de Miami que publican tarifas de entrada cercanas a ${usd(PRODUCT_PHOTO_MARKET.miamiEntryPerImage)} por imagen; el trabajo de estilo de vida con ambientación o modelos se cotiza bastante más alto por imagen, y las sesiones de medio día en Miami suelen ubicarse entre ${usd(PRODUCT_PHOTO_MARKET.halfDayMin)} y ${usd(PRODUCT_PHOTO_MARKET.halfDayMax)} USD más costos de producción. Son tarifas publicadas del mercado local y los rangos se mueven según volumen, nivel de retoque y derechos de uso.`,
            "Como referencia directa de Esteban Moreno Media: las sesiones de fotografía de producto parten desde $280 por sesión. Es un precio inicial, nunca una cifra cerrada — el presupuesto final depende de la cantidad de productos y ángulos, del estilo requerido (catálogo sobre fondo limpio vs estilo de vida) y del formato de entrega acordado para tus canales. Para una cifra atada a tu alcance real usa la [calculadora de presupuesto](/es/calculadora), y para una cotización escrita escríbenos por [contacto](/es/contacto) o llama al (305) 497-4478.",
          ],
          bullets: [
            "Tarifa por imagen (cost per image): ideal para catalogación masiva con iluminación constante",
            "Tarifa por jornada (half-day / full-day rate): recomendada para sesiones conceptuales y lanzamientos de marca",
            "Paquetes por proyecto: combinan fotografía de catálogo, tomas de detalle y fondos generados para campañas integrales",
          ],
        },
        {
          heading: "¿Qué incluye la preproducción en un presupuesto de fotografía?",
          paragraphs: [
            "Un presupuesto profesional y transparente desglosa el costo del proyecto a través de sus fases operativas para que el cliente comprenda con total claridad el valor entregado y no enfrente sorpresas financieras durante la producción.",
            "La fase de preproducción incluye la revisión del brief técnico, la creación de la lista de tomas prioritaria (shot list), el armado de moodboards visuales y la planificación de las directrices de iluminación. Esta etapa garantiza que tanto el fotógrafo como la marca compartan la misma expectativa antes de manipular cualquier producto físico.",
          ],
        },
        {
          heading: "¿Qué incluyen la captura y la postproducción en un presupuesto?",
          paragraphs: [
            "La fase de captura y produccion cubre el tiempo de sesion, el uso de opticas de producto y esquemas de iluminacion tecnica pensados para resaltar los materiales y las texturas sin reflejos no deseados.",
            "La fase de postproducción y entrega abarca el revelado RAW en software profesional (como Capture One o Lightroom), la alineación de perspectiva, la corrección cromática exacta contra muestras físicas de producto, la limpieza de micro-imperfecciones de fábrica y la exportación en resoluciones optimizadas para carga rápida en tiendas online y visualización en pantallas Retina y 4K.",
          ],
          bullets: [
            "Preproducción: shot list detallado, moodboards estéticos y preparación de muestras",
            "Producción: tiempo de estudio, iluminación técnica, ópticas macro y monitoreo calibrado en tiempo real",
            "Postproducción: revelado RAW, calibración de color, limpieza digital y perfiles sRGB",
            "Entrega y licencias: archivos maestros en alta resolución y formatos web optimizados con cesión de derechos",
          ],
        },
        {
          heading: "¿Cómo se prepara un brief técnico para recibir una cotización precisa?",
          paragraphs: [
            "Dado que no existe una tarifa única responsable antes de definir el brief técnico, la mejor forma de asegurar una cotización ajustada a tus necesidades reales es proporcionar especificaciones claras desde el primer contacto. Las [guías prácticas de video](/es/guias) ayudan a definir y revisar las decisiones de contenido antes de preparar ese brief.",
            "Te recomendamos preparar un inventario con el número exacto de SKUs clasificados por tipo de material (mate, reflectante, translúcido o textil), los ángulos obligatorios por artículo, los canales donde se publicarán las imágenes y ejemplos visuales de referencia que reflejen el tono estético deseado.",
            "Aclarar también las posibles exclusiones habituales —como la compra de utilería perecedera, modelos de manos o los costos de envío y devolución de las muestras físicas— permite estructurar una propuesta sin ambigüedades. Puedes explorar alternativas de producción visual y consultar nuestra [calculadora de presupuesto](/es/calculadora) o escribirnos directamente a través de [contacto](/es/contacto) para evaluar el alcance específico de tu catálogo comercial.",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Qué factores hacen que la relación de foto producto precio varíe entre artículos?",
          answer:
            "La variación en la foto producto precio depende de la dificultad de iluminación que exige cada material (vidrio, metal pulido, joyería o cosmética reflectante), de la necesidad de atrezzo o escenografía, y del tiempo de postproducción dedicado a eliminar reflejos e imperfecciones en cada imagen.",
        },
        {
          question: "¿Cuándo conviene contratar por jornada en vez de por foto individual?",
          answer:
            "La tarifa por jornada conviene cuando se fotografían lotes grandes de artículos con requisitos de iluminación uniformes, o en sesiones de estilo de vida donde se capturan múltiples combinaciones de productos y ambientes en un mismo bloque de tiempo de estudio.",
        },
        {
          question: "¿Qué conceptos suelen quedar excluidos en una cotización estándar?",
          answer:
            "Suelen excluirse la compra de atrezzo perecedero o decorativo específico, la contratación de modelos de manos o estilistas externos, los costes de envío y devolución de las muestras del producto, y las solicitudes de retoque que excedan el alcance pactado inicialmente.",
        },
        {
          question: "¿Qué información se necesita para cotizar fotografía de producto?",
          answer:
            "Se requiere la cantidad total de SKUs, el número de ángulos por producto, si las fotos son sobre fondo limpio o estilo de vida (lifestyle), el nivel de retoque deseado y los canales de uso.",
        },
        {
          question: "¿Qué diferencia hay entre fotos de catálogo y fotos de estilo de vida?",
          answer:
            "Las fotos de catálogo muestran el producto sobre fondo blanco o neutro para e-commerce (Amazon, Shopify). Las fotos de estilo de vida incluyen ambientación, utilería o contexto de uso para conectar emocionalmente con el comprador.",
        },
        {
          question: "¿Cómo influye la Inteligencia Artificial en los costos de imagen de producto?",
          answer:
            "La IA permite generar fondos y entornos fotorrealistas a partir de fotos base del producto real, reduciendo la necesidad de construir sets físicos costosos o viajar a locaciones.",
        },
        {
          question: "¿Se incluye el retoque digital en la cotización?",
          answer:
            "Sí, cada entregable incluye corrección de color y limpieza digital básica. Retoque complejo de imperfecciones o montaje avanzado se define en el alcance del proyecto.",
        },
        {
          question: "¿Dónde puedo calcular una estimación inicial de presupuesto?",
          answer:
            "Puedes usar nuestra calculadora de presupuesto en /es/calculadora para obtener un rango estimado según el volumen y tipo de proyecto, o escribirnos en /es/contacto para una propuesta a la medida.",
        },
      ],
    },
  },
  {
    id: "ai-vs-traditional-photo-guide",
    en: {
      slug: "ai-product-photography-vs-traditional-studio",
      metadataTitle: "AI vs Studio Product Photography",
      title: "AI product photography vs traditional studio photography",
      description:
        "Compare cost, turnaround, lifestyle flexibility, and product accuracy between AI-assisted image creation and traditional studio photoshoots.",
      eyebrow: "AI vs Studio comparison",
      answer:
        "AI product photography excels at fast, cost-effective lifestyle background generation using real reference photos, while traditional studio shoots remain ideal for complex physical props and hands-on staging.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include brand key visuals, social designs, 3D video, and product mockups. It is linked as a related visual design example; nothing published confirms a specific AI software workflow.",
      },
      sections: [
        {
          heading: "How do AI-assisted visuals and studio shoots compare on time and effort?",
          paragraphs: [
            "A studio shoot puts the whole cost up front: building or renting a set, lighting it, scheduling people and props, sometimes securing a location, then editing the results. Every new environment means another setup. AI-assisted visuals move most of that effort to after a single, simpler shoot of the product itself, because new backgrounds and settings are generated around the real photos rather than built.",
            "That makes AI assistance useful when a brand needs many variations of the same product — seasonal scenes, several colours of backdrop, versions for different campaigns — and comparatively less useful when it needs one definitive image. Either way, the starting point is the same: accurate photos of the real product, without which neither approach produces images a customer can trust.",
          ],
          bullets: [
            "Faster iteration on campaign visuals",
            "Environment variations without building a set",
            "Product accuracy only when anchored to real photos",
          ],
        },
        {
          heading: "When is traditional studio photography the better choice?",
          paragraphs: [
            "When the image depends on something physically happening. Hands using the product, a liquid splashing, fabric draping, food being cut, a texture that has to be felt through the screen: these interactions are where generated images most often look wrong, and where a camera simply records what is real. The same goes for products whose value is in fine detail, such as jewellery, where any invented reflection or edge is noticeable.",
            "A hybrid approach combines both. Photograph the product carefully in a studio, including the shots that need real interaction, then use AI tools to place those clean photos into additional settings for advertising and social media. Keep the studio images for the product page, where accuracy matters most, and use the AI-assisted variations where atmosphere matters more than exactness. Label which is which in your files.",
          ],
        },
      ],
    },
    es: {
      slug: "fotografia-de-producto-con-ia-vs-estudio-tradicional",
      metadataTitle: "IA vs Estudio de Fotografía",
      title: "Fotografía de producto con IA vs estudio tradicional",
      description:
        "Compara costo, tiempos de entrega, flexibilidad de entorno y precisión entre creación de imágenes asistida por IA y sesiones de estudio tradicionales.",
      eyebrow: "Comparación IA vs Estudio",
      answer:
        "La fotografía con IA destaca en generación rápida y rentable de entornos de estilo de vida con fotos reales de referencia, mientras que el estudio tradicional conviene para utilería física compleja.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen piezas visuales de marca, diseños sociales, video 3D y mockups de producto. Se enlaza como un ejemplo de diseño visual relacionado; nada publicado confirma un flujo de software de IA específico.",
      },
      sections: [
        {
          heading: "¿Cómo se comparan en tiempo y esfuerzo las imágenes con IA y una sesión de estudio?",
          paragraphs: [
            "Una sesión de estudio concentra todo el costo al principio: armar o alquilar un set, iluminarlo, coordinar personas y utilería, a veces conseguir una locación, y luego editar los resultados. Cada ambiente nuevo implica otro montaje. Las imágenes con ayuda de IA trasladan la mayor parte de ese esfuerzo a después de una sola sesión más sencilla del producto, porque los fondos y entornos nuevos se generan alrededor de las fotos reales en lugar de construirse.",
            "Eso hace útil la IA cuando una marca necesita muchas variaciones del mismo producto — escenas de temporada, varios fondos, versiones para distintas campañas — y menos útil cuando necesita una sola imagen definitiva. En ambos casos el punto de partida es el mismo: fotos exactas del producto real.",
          ],
          bullets: [
            "Iteración más rápida de imágenes de campaña",
            "Variaciones de entorno sin construir un set",
            "Precisión del producto solo cuando parte de fotos reales",
          ],
        },
        {
          heading: "¿Cuándo conviene más la fotografía tradicional de estudio?",
          paragraphs: [
            "Cuando la imagen depende de algo que ocurre físicamente. Manos usando el producto, un líquido que salpica, una tela que cae, comida que se corta, una textura que debe sentirse a través de la pantalla: en esas interacciones es donde las imágenes generadas suelen verse mal, y donde la cámara simplemente registra lo real. Lo mismo pasa con productos cuyo valor está en el detalle fino, como la joyería, donde cualquier reflejo o borde inventado se nota.",
            "El enfoque híbrido combina ambos. Fotografía el producto con cuidado en estudio, incluidas las tomas que necesitan interacción real, y luego usa la IA para colocar esas fotos limpias en otros entornos para publicidad y redes. Reserva las imágenes de estudio para la página del producto, donde la exactitud importa más, y marca en tus archivos cuál es cuál.",
          ],
        },
      ],
    },
  },
  {
    id: "editor-vs-videographer-guide",
    en: {
      slug: "video-editor-vs-videographer",
      metadataTitle: "Video Editor vs Videographer",
      title: "Video editor vs videographer: which role do you need?",
      description:
        "Understand the difference between hiring a video editor for existing footage versus hiring a videographer for on-location camera capture.",
      eyebrow: "Role & Workflow Comparison",
      answer:
        "Hire a videographer when you need physical camera operation, lighting, audio capture, and on-location direction. Hire a video editor when you already have recorded raw footage and need narrative pacing, sound design, color grading, motion graphics, and platform-specific formatting.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include location camera capture and full video editing. It is linked as a proof example; nothing published confirms dual-role scope on all projects.",
      },
      sections: [
        {
          heading: "What does a videographer do on location?",
          paragraphs: [
            "Choosing between a video editor and a videographer begins with identifying where your project currently stands in the production lifecycle. While both roles are essential to professional video production, they require distinct skill sets, hardware environments, and technical disciplines.",
            "A videographer is an on-location production specialist. Their responsibility centers on the physical environment: scouting locations, configuring camera sensors, selecting optical focal lengths, rigging three-point lighting setups, positioning wireless lavaliers or boom microphones to control room acoustics, and directing on-camera talent. A videographer solves physical challenges in real time, capturing high-quality raw footage that provides the necessary creative coverage for the story.",
          ],
        },
        {
          heading: "What does a video editor do in post-production?",
          paragraphs: [
            "A video editor is a post-production narrative architect. Working in a specialized studio workstation environment, an editor ingests raw footage, synchronizes multi-camera audio tracks, selects the most compelling takes, establishes narrative flow, cuts out hesitation, cleans background noise, balances dialogue levels to web standards (-14 to -16 LUFS), applies color grading transforms, animates on-screen typography, and formats deliverables for vertical feeds (9:16) and widescreen platforms (16:9).",
            "Tooling highlights the operational divide. A videographer deploys cinema cameras, prime lenses, gimbals, C-stands, softboxes, field monitors, and audio recorders. An editor utilizes high-performance editing systems, color-accurate displays, DaVinci Resolve Studio, Adobe Premiere Pro, After Effects, sound design libraries, and digital audio workstations.",
          ],
          bullets: [
            "Videographer: on-site physical camera capture, scene lighting, microphone rigging, and visual composition",
            "Video editor: post-production narrative structure, pacing, audio leveling, color grading, and motion graphics",
            "Production tools: cinema camera bodies, gimbals, LED panels vs color-calibrated monitors, NLE software, and DAWs",
            "Outcome focus: raw footage capture on set vs polished, platform-ready master videos",
          ],
        },
        {
          heading: "How do videographers price their time?",
          paragraphs: [
            "Understanding how each professional prices their services helps marketing teams and business owners allocate their production budgets efficiently without paying premium on-set rates for desk-based post-production tasks.",
            "Videographers typically bill using half-day (4 to 5 hours) or full-day (8 to 10 hours) day rates. These rates cover not only their time on set, but also capital depreciation on expensive camera packages, lighting gear, transport, and insurance. Adding extra shoot days or specialized crew members immediately scales on-location expenses.",
          ],
        },
        {
          heading: "How do video editors price their work?",
          paragraphs: [
            "Video editors generally price their work on a per-project basis, per-deliverable package (such as monthly social media retainers or batch packs), or hourly post-production rates. Because remote editing eliminates travel time and on-location crew overhead, it allows creative budgets to go directly into editing quality, sound design, and rapid revision turnarounds.",
            "For businesses that already record internal video using high-end smartphones (such as iPhone ProRes/Log) or in-house studio cameras, hiring a dedicated remote editor is significantly more cost-effective than hiring a full production crew. Review how supplied agency footage was shaped into a refined real estate cut in the [Homeowners portfolio project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)). To explore dedicated post-production packages, view our [short-form video editing services](/services/short-form-video-editor-miami), or check our [corporate event videographer in Miami](/services/corporate-event-videographer-miami) if you require selective local camera capture.",
          ],
          bullets: [
            "Day rates: videography budgets reflect shoot days, crew size, camera kits, and travel logistics",
            "Project packages: editing budgets reflect deliverable quantity, narrative complexity, and turnaround speed",
            "Remote efficiency: sending internally recorded footage to an editor eliminates recurring on-site filming fees",
          ],
        },
        {
          heading: "When should you hire an editor, a videographer, or both?",
          paragraphs: [
            "Evaluating your available assets and production goals clarifies the exact hiring path for your business.",
            "Hire ONLY a Video Editor when: You already possess recorded footage from previous events, interviews, webinars, customer testimonials, or smartphone recordings; you want to repurpose long-form videos into high-retention short-form clips; or you need animated graphics, captions, and professional color grading applied to existing assets.",
            "Hire ONLY a Videographer when: You have an internal video editor or creative agency team that needs high-quality raw footage captured at a conference, product launch, or executive interview in South Florida, but already handles post-production internally.",
            "Hire a Combined / Full Production Team when: You are launching a major commercial campaign, brand documentary, or high-stakes corporate explainer where script development, studio lighting, multi-mic audio capture, and post-production polish must be executed under a single unified creative direction. Learn more about our complete service offerings on our [services](/services) overview page.",
          ],
          bullets: [
            "Hire an editor: you have footage and need engaging, finished videos ready for distribution",
            "Hire a videographer: you have an editing pipeline and need on-location camera capture",
            "Hire full production: you need end-to-end concept development, filming, and post-production",
          ],
        },
        {
          heading: "What decision brief should you write before requesting a quote?",
          paragraphs: [
            "Before asking for pricing, write down what already exists and what still needs to be created. If the footage already exists, the conversation can focus on editing style, deliverables, pacing, captions, sound, color, and the platform where the video will appear. If the footage does not exist, the conversation needs to cover location access, people on camera, schedule, lighting, audio capture, and whether local production is realistic for the project.",
            "A useful brief does not need to be long. It should separate editing inputs from filming inputs so the person reviewing the request can tell whether you need post-production, on-location capture, or both. That prevents a vague request like \"we need a video\" from turning into a quote that includes the wrong role.",
          ],
        },
        {
          heading: "What should an editing-first or filming-first request include?",
          paragraphs: [
            "For an editing-first request, send the current footage, the desired output length, target platform, reference style, required words or graphics, and one person responsible for feedback. For a filming request, add the location, date range, people or products involved, access limits, and whether your team already has a separate editor.",
          ],
          bullets: [
            "Editing-first: existing footage, target platform, aspect ratio, captions, graphics, music direction, and review contact",
            "Filming-first: location, schedule, access, people on camera, audio needs, shot list, and post-production plan",
            "Combined scope: creative direction, capture plan, editing deliverables, approval path, and any open questions",
          ],
        },
        {
          heading: "How does the state of your raw footage change the role you should hire?",
          paragraphs: [
            "The strongest signal is whether your raw footage is already usable. If you have clear audio, stable framing, enough angles, and footage that covers the story from beginning to end, a video editor can usually turn those assets into a finished piece without sending a camera team back into the field.",
            "If the available footage is missing essential moments, has unusable audio, lacks close-ups or establishing shots, or does not include the people and products the video needs to show, an editor can improve the material but cannot create true coverage that was never captured. That is when a videographer, or a combined production plan, becomes the more honest choice.",
          ],
        },
        {
          heading: "Why do partial assets make this boundary matter for business content?",
          paragraphs: [
            "For business content, this boundary matters because many projects start with partial assets: a phone recording from an event, a webinar replay, a few customer clips, or footage from a previous contractor. An editor-first workflow can work well when those assets need structure, captions, cleanup, and platform formatting. A videographer-first workflow fits when the business needs new images, controlled lighting, interviews, and intentional sound captured on location.",
          ],
          bullets: [
            "Good editor handoff: clear speech, stable shots, multiple angles, brand references, and enough footage to tell the story",
            "Weak editor handoff: distorted audio, missing scenes, unclear subject, no establishing shots, or footage that does not match the desired message",
            "Videographer need: new interviews, product demonstrations, venue coverage, controlled lighting, or on-camera direction",
          ],
        },
        {
          heading: "Which production pitfalls should you avoid, and how do you brief each role?",
          paragraphs: [
            "A frequent and expensive mistake in video marketing is relying on the assumption that filming flaws can easily be fixed in post-production. While modern digital tools can improve imperfect footage, severe audio reverberation, clipped microphone distortion, or out-of-focus subjects cannot be magically restored without sacrificing quality. Capturing clean source media on set protects the entire project.",
            "To get the best results from a videographer, prepare a detailed shot list, schedule timeline, location access permits, and lighting expectations. To get the best results from a video editor, provide brand guidelines, typography preferences, target aspect ratios, platform delivery deadlines, and reference links demonstrating the desired pacing and aesthetic style.",
            "Clarifying project deliverables and review points upfront ensures every party stays aligned. If you are planning an upcoming video project or need guidance on whether your existing footage is ready for post-production, reach out directly through our [contact](/contact) page.",
          ],
        },
      ],
      faqs: [
        {
          question: "Can a videographer also handle video editing?",
          answer:
            "Many solo videographers offer basic editing as part of a package, but specialized video editors typically provide deeper expertise in pacing, sound design, advanced color grading, and social retention optimization.",
        },
        {
          question: "Why is hiring a remote video editor often more cost-effective?",
          answer:
            "If your team can record footage internally with smartphones or cameras, hiring a remote editor eliminates recurring camera crew fees, travel costs, and on-location studio overhead.",
        },
        {
          question: "What equipment does a videographer bring compared to an editor's workstation?",
          answer:
            "A videographer brings cinema camera bodies, prime lenses, gimbals, lighting softboxes, and wireless microphone systems. An editor works on a high-performance computer with color-calibrated monitors and professional NLE software.",
        },
        {
          question: "How do I know if my existing footage is enough for editing?",
          answer:
            "Existing footage is usually enough when the speech is clear, the key moments are captured, the framing is stable, and there is enough coverage to tell the story. If important scenes, interviews, products, or clean audio are missing, you may need new videography before editing.",
        },
        {
          question: "Can a video editor fix poor audio or bad lighting from raw footage?",
          answer:
            "Editors can apply noise suppression, equalization, and basic exposure correction, but heavily distorted audio, muffled room echo, and severely underexposed footage cannot be fully repaired without visible quality loss.",
        },
        {
          question: "How do I decide between budgeting for a day rate or per-video editing?",
          answer:
            "Budget for a day rate when you need physical filming presence on location. Budget for per-video or monthly package pricing when you already have footage and need finished edits.",
        },
        {
          question: "What information should be included in a video editing brief?",
          answer:
            "Include your project goal, target audience, primary platform (vertical 9:16 or horizontal 16:9), must-include messages, brand assets (logos, fonts), and pacing reference examples.",
        },
      ],
    },
    es: {
      slug: "editor-de-video-vs-videografo",
      metadataTitle: "Editor de Video vs Videógrafo",
      title: "Editor de video vs videógrafo: ¿cuál rol necesitas?",
      description:
        "Entiende la diferencia entre contratar un editor de video para material existente versus un videógrafo para grabación en locación.",
      eyebrow: "Comparación de Roles y Flujo",
      answer:
        "Contrata un videógrafo cuando requieras presencia física, operación de cámaras, iluminación y captura de audio en locación. Contrata un editor de video cuando ya dispongas de material grabado y necesites estructurar la narrativa, corrección de color, mezcla de sonido, ritmo dinámico y adaptación a formatos verticales u horizontales.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen producción en locación y edición de video. Se enlaza como ejemplo publicado; nada publicado confirma alcance dual en todos los proyectos.",
      },
      sections: [
        {
          heading: "¿Qué hace un videógrafo en el set de grabación?",
          paragraphs: [
            "Elegir con precisión entre un editor de video y un videógrafo comienza por identificar en qué etapa del proceso audiovisual se encuentra tu proyecto. Aunque ambas disciplinas se complementan para crear piezas de alto nivel, operan en entornos técnicos, con herramientas y habilidades totalmente diferenciadas.",
            "Un videógrafo es el especialista técnico y creativo en el set de grabación. Su labor se concentra en el mundo físico: evaluar la acústica del espacio, diseñar esquemas de iluminación de tres puntos, seleccionar distancias focales y lentes adecuados, calibrar la exposición y perfiles de color del sensor, colocar micrófonos de solapa o direccionales y dirigir a las personas frente a cámara. El videógrafo resuelve contingencias en tiempo real para garantizar tomas nítidas, estables y bien iluminadas.",
          ],
        },
        {
          heading: "¿Qué hace un editor de video en la postproducción?",
          paragraphs: [
            "Un editor de video es el arquitecto narrativo en la fase de postproducción. Desde una estación de trabajo optimizada, el editor organiza el material en bruto, sincroniza pistas de audio multipista, selecciona las mejores tomas, define el ritmo de corte, limpia ruidos de fondo, nivela el audio a estándares de distribución (-14 a -16 LUFS para redes sociales), realiza el etalonaje de color para dar coherencia visual, añade subtítulos dinámicos y anima gráficos en pantalla.",
            "El equipamiento define la diferencia operativa: el videógrafo utiliza cámaras de cine o mirrorless, estabilizadores (gimbals), trípodes pesados, paneles LED, grabadoras portátiles y modificadores de luz. El editor trabaja con procesadores de alto rendimiento, monitores calibrados con precisión de color, software como DaVinci Resolve Studio, Adobe Premiere Pro, After Effects y librerías de diseño sonoro.",
          ],
          bullets: [
            "Videógrafo: captura en locación, encuadre, iluminación, microfonía y composición visual en set",
            "Editor de video: montaje narrativo, ritmo, mezcla de audio, corrección de color y subtitulado dinámico",
            "Herramientas de rodaje: cuerpos de cámara, gimbals, ópticas y luces vs monitores calibrados y suites NLE",
            "Entregable: material bruto de alta calidad en set vs videos terminados y listos para publicar",
          ],
        },
        {
          heading: "¿Cómo cobran los videógrafos su tiempo?",
          paragraphs: [
            "Comprender los modelos de tarificación de cada profesional permite a negocios y marcas distribuir su inversión audiovisual con máxima eficiencia, evitando pagar costos de producción en locación para tareas que corresponden a postproducción.",
            "Los videógrafos suelen cobrar mediante tarifas por media jornada (half-day, 4 a 5 horas) o jornada completa (full-day, 8 a 10 horas). Estas tarifas amortizan la inversión en equipos de cámara, iluminación, transporte, seguros y tiempo en set. Añadir días adicionales de rodaje o asistentes técnicos incrementa directamente el presupuesto del proyecto.",
          ],
        },
        {
          heading: "¿Cómo cobran los editores de video su trabajo?",
          paragraphs: [
            "Los editores de video, en cambio, estructuran sus honorarios por proyecto cerrado, por paquete de piezas (como planes mensuales de contenido para redes sociales) o por horas de postproducción. Al no requerir traslados ni despliegue físico de equipo, la edición remota permite que el presupuesto se destine íntegramente al perfeccionamiento narrativo, la animación gráfica y entregas ágiles.",
            "Para empresas que ya capturan contenido con teléfonos de última generación (como iPhone en formato ProRes/Log) o cámaras propias, contratar un editor remoto especializado resulta considerablemente más rentable que coordinar grabaciones presenciales continuas. Revisa cómo se transformó el material suministrado por agencia en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)). Si buscas un servicio de edición continua, consulta nuestro [editor de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami), o explora opciones de captura presencial con nuestro [videógrafo en Miami](/es/videografo-en-miami).",
          ],
          bullets: [
            "Tarifas de videografía: basadas en días de rodaje, volumen de equipo técnico, asistentes y traslados",
            "Tarifas de edición: basadas en cantidad de entregables, complejidad de postproducción y tiempos de entrega",
            "Eficiencia remota: delegar la postproducción de material propio reduce drásticamente el costo recurrente",
          ],
        },
        {
          heading: "¿Cuándo contratar solo videógrafo, solo editor o producción integral?",
          paragraphs: [
            "Para elegir el perfil adecuado según las necesidades de tu empresa, evalúa los siguientes escenarios prácticos:",
            "Contrata SOLO a un Editor de Video cuando: Ya tienes grabaciones de conferencias, webinars, entrevistas de podcast, eventos pasados o videos grabados internamente con smartphone; necesitas transformar videos largos en clips verticales de alto impacto; o buscas mejorar la calidad de piezas existentes con subtítulos, música licenciada y color.",
            "Contrata SOLO a un Videógrafo cuando: Tu empresa o agencia ya cuenta con un equipo interno de edición y solo requiere la cobertura técnica de un evento corporativo, convención en Miami o Fort Lauderdale, recorrido arquitectónico o lanzamiento de producto.",
            "Contrata una Producción Integral cuando: Deseas desarrollar un comercial de marca, video institucional o campaña publicitaria desde cero, donde el guion, la iluminación escénica, el audio profesional y el acabado final de postproducción deben responder a una dirección creativa unificada. Conoce todas nuestras áreas de trabajo en la página general de [servicios](/es/servicios).",
          ],
          bullets: [
            "Solo editor: dispones de material grabado y requieres piezas terminadas con alto ritmo y acabado profesional",
            "Solo videógrafo: tienes capacidad de postproducción interna y requieres captura en sitio en South Florida",
            "Producción integral: requieres conceptualización, grabación profesional en locación y postproducción completa",
          ],
        },
        {
          heading: "¿Qué brief sencillo conviene escribir antes de pedir una cotización?",
          paragraphs: [
            "Antes de pedir precio, escribe qué material ya existe y qué falta crear. Si el material ya está grabado, la conversación puede concentrarse en estilo de edición, entregables, ritmo, subtítulos, sonido, color y plataforma de publicación. Si el material no existe, la conversación debe cubrir acceso a la locación, personas en cámara, fechas, iluminación, captura de audio y si la producción local es realista para ese proyecto.",
            "Un brief útil no tiene que ser largo. Debe separar los insumos de edición de los insumos de grabación para que quien revise la solicitud entienda si necesitas postproducción, captura en locación o ambas cosas. Así una petición general como \"necesitamos un video\" no termina en una cotización basada en el rol equivocado.",
          ],
        },
        {
          heading: "¿Qué debe incluir una solicitud de edición o de grabación?",
          paragraphs: [
            "Para una solicitud de edición, envía el material actual, duración deseada, plataforma, estilo de referencia, textos o gráficos obligatorios y una persona responsable de consolidar comentarios. Para una solicitud de grabación, agrega locación, rango de fechas, personas o productos involucrados, límites de acceso y si tu equipo ya cuenta con editor aparte.",
          ],
          bullets: [
            "Primero edición: material existente, plataforma, formato, subtítulos, gráficos, música y contacto de revisión",
            "Primero grabación: locación, agenda, acceso, personas en cámara, audio, lista de tomas y plan de postproducción",
            "Alcance combinado: dirección creativa, plan de captura, entregables de edición, ruta de aprobación y preguntas abiertas",
          ],
        },
        {
          heading: "¿Qué errores de planificación evitar y cómo preparar el brief para cada profesional?",
          paragraphs: [
            "Uno de los errores más costosos en la producción audiovisual es confiar en que cualquier fallo en la grabación se puede corregir durante la postproducción. Aunque las herramientas digitales permiten estabilizar tomas o atenuar ruidos menores, un audio con distorsión severa, exceso de reverberación o un rostro desenfocado no pueden repararse sin una pérdida evidente de calidad.",
            "Para trabajar eficazmente con un videógrafo, prepara una lista de tomas requeridas (shot list), el cronograma del día, la locación confirmada y referencias visuales del estilo de encuadre. Para un editor de video, proporciona las fuentes tipográficas de marca, logotipos en vector, especificaciones de formato y ejemplos de ritmo que reflejen el tono deseado.",
            "Establecer con claridad el alcance técnico y las fases de revisión desde el inicio garantiza una colaboración productiva. Si estás planificando una producción o deseas evaluar si tu material actual está listo para postproducción, escríbenos directamente a través de nuestra página de [contacto](/es/contacto).",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Puede un videógrafo encargarse también de la edición del video?",
          answer:
            "Muchos videógrafos ofrecen edición básica en sus paquetes, pero un editor de video dedicado aporta mayor profundidad en ritmo narrativo, mezcla de audio, etalonaje de color avanzado y optimización para retención en redes sociales.",
        },
        {
          question: "¿Por qué resulta más rentable contratar un editor remoto si ya grabamos nuestro material?",
          answer:
            "Si tu equipo puede grabar internamente con smartphones o cámaras propias, contratar un editor remoto elimina los costos recurrentes de despliegue de equipo técnico en set, traslados y jornadas de rodaje.",
        },
        {
          question: "¿Qué herramientas y equipos utiliza cada profesional?",
          answer:
            "El videógrafo utiliza cámaras de cine o mirrorless, ópticas, estabilizadores, luces y microfonía en set. El editor trabaja en estaciones de alto rendimiento con monitores calibrados y software profesional de edición y postproducción.",
        },
        {
          question: "¿Puede un editor de video corregir problemas de iluminación o audio deficiente grabados con smartphone?",
          answer:
            "El editor puede realizar ajustes de exposición y reducción de ruido, pero audios con distorsión grave o tomas desenfocadas en origen no pueden corregirse completamente sin comprometer la calidad visual.",
        },
        {
          question: "¿Cómo decidir si presupuestar por jornada de grabación o por pieza editada?",
          answer:
            "Presupuesta por jornada cuando requieras presencia física y captura técnica en locación. Presupuesta por paquete o pieza editada cuando ya dispongas de material y necesites entregables finales listos para publicar.",
        },
        {
          question: "¿Qué datos debe contener el brief para un editor de video?",
          answer:
            "Debe incluir la meta del video, la plataforma de publicación (formato 9:16 o 16:9), los mensajes o llamados a la acción obligatorios, recursos de marca (logos, fuentes) y enlaces de referencia con el estilo y ritmo deseados.",
        },
      ],
    },
  },
  {
    id: "remote-vs-local-editing-guide",
    en: {
      slug: "remote-vs-local-video-editing",
      metadataTitle: "Remote vs Local Video Editing",
      title: "Remote video editing vs local production studio",
      description:
        "Compare remote video post-production turnaround, pricing flexibility, and collaboration workflows against local production agencies.",
      eyebrow: "Production Model Comparison",
      answer:
        "Remote video editing provides faster turnaround and global flexibility using cloud asset transfer, while local studios offer physical presence and local set builds.",
      proof: {
        href: "/portfolio/ml-colombia",
        title: "ML Colombia",
        description:
          "Approved portfolio credits include remote video post-production for social content. It is linked as a proof example; nothing published confirms identical turnarounds for every scope.",
      },
      sections: [
        {
          heading: "Why can remote editing remove studio overhead?",
          paragraphs: [
            "Modern post-production no longer requires booking time in an expensive edit suite. By using high-speed cloud storage links and collaborative asset transfer tools (such as Dropbox, Frame.io, Google Drive, or MASV), footage handoff happens asynchronously without physical media transit delays.",
            "Eliminating the physical edit suite removes overhead costs associated with commercial studio real estate and equipment maintenance. This allows creative budgets to focus directly on narrative craft, audio mastering, color grading, and rapid revision turnarounds. Explore how remote workflows support dynamic content on our [short-form video editing services](/services/short-form-video-editor-miami) page, or learn how to transfer raw files efficiently in our guide on [how to send large video files to an editor](/guides/fastest-way-to-send-large-video-files-to-editor).",
          ],
          bullets: [
            "Asynchronous handoff: footage transfers directly via cloud platforms without shipping physical drives",
            "Lower overhead: project budgets focus on editing craft rather than facility rental fees",
            "Rapid revision rounds: version stacking and timecode notes reduce feedback cycles",
          ],
        },
        {
          heading: "How do project-based post-production and studio day rates compare?",
          paragraphs: [
            "Understanding how local production facilities bill compared to dedicated remote editors helps marketing teams allocate creative spend predictably.",
            "Local production houses typically quote full-service day rates or half-day studio minimums to cover studio floor space, lighting grids, camera packages, and on-site engineering staff. These costs are essential when building physical sets or filming multi-camera live segments, but add unnecessary overhead when working purely with existing footage.",
            "Remote post-production is structured around per-deliverable packages, batch content retainers, or scoped project milestones. For businesses with in-house recorded assets or smartphone footage, remote editing delivers maximum cost efficiency. See how supplied agency assets were structured into a clean real estate edit in the [Homeowners portfolio project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)), or review our full range of [video production and editing services](/services).",
          ],
          bullets: [
            "Studio day rates: cover camera packages, physical sets, lighting grids, and on-site crew",
            "Remote project packages: focused exclusively on editing assembly, sound design, and color grading",
            "Flexible scaling: expand or contract editing volume month-to-month without facility commitments",
          ],
        },
        {
          heading: "Which collaboration tools and review workflows suit remote teams?",
          paragraphs: [
            "Effective remote post-production relies on standardized project handoff protocols and precision review platforms.",
            "Using timecode-accurate review tools (like Frame.io or Vimeo Review), marketing managers and creative directors can pause at any frame, draw annotations, and leave contextual notes directly on the timeline. This eliminates ambiguous email chains and ensures revision requests are addressed accurately in the next cut.",
            "For teams capturing high-resolution 4K or 6K footage, an offline proxy pipeline allows editors to cut lightweight files smoothly while raw masters stay secure. To align project scope before starting, consult our guide on [how to write a video brief](/guides/write-a-useful-video-brief) or review the distinction between camera capture and post-production in [video editor vs videographer](/guides/video-editor-vs-videographer).",
          ],
          bullets: [
            "Timecode-linked feedback: leave precise frame-by-frame annotations directly on video drafts",
            "Proxy editing pipelines: edit high-resolution camera media remotely without playback lag",
            "Centralized asset management: maintain organized project bins, graphic assets, and audio stems in shared cloud storage",
          ],
        },
        {
          heading: "When is a local studio required, and when does remote editing fit?",
          paragraphs: [
            "Choosing between a local production studio and a remote editor depends on whether your project requires on-location filming or post-production assembly.",
            "Choose a Local Production Studio when: You need to film on a physical soundstage, require custom lighting sets or cyclorama walls, or need in-person directing for multi-talent commercial shoots in South Florida.",
            "Choose Remote Video Editing when: You already have recorded footage from past events, webinars, customer interviews, or smartphone video; you need consistent social media content repurposing; or your team needs rapid turnaround on motion graphics, captions, and color grading. If you are assessing project requirements, start with our [video strategy assessment](/assessment) or reach out directly through our [contact](/contact) page.",
          ],
          bullets: [
            "Local studio: physical filming, custom set builds, in-person talent directing, and on-location camera crew",
            "Remote editor: post-production assembly, footage repurposing, sound design, color balancing, and motion graphics",
            "Hybrid model: local camera capture combined with remote post-production for maximum agility",
          ],
        },
      ],
      faqs: [
        {
          question: "How does remote video editing compare in quality to an in-person studio session?",
          answer:
            "Remote editing uses the same professional non-linear editors (DaVinci Resolve, Premiere Pro), color grading tools, and audio mixing workflows as traditional post houses. Timecode-accurate review tools ensure direct creative control without requiring physical studio attendance.",
        },
        {
          question: "What is the best way to send large camera files to a remote editor?",
          answer:
            "For files under 100 GB, accelerated cloud platforms like MASV, Google Drive, or Frame.io provide fast transfers. For multi-terabyte raw camera archives, generating lightweight 1080p ProRes or DNxHR proxies allows immediate remote editing while raw files remain local.",
        },
        {
          question: "Can a remote video editor handle color correction and audio mastering?",
          answer:
            "Yes. Professional remote post-production includes multi-node color balancing, scene-to-scene matching, vocal equalization, ambient noise reduction, and loudness compliance for web and broadcast specifications.",
        },
        {
          question: "When does a business need a local production crew instead of remote editing?",
          answer:
            "A local production crew or studio is necessary when new camera footage must be recorded on location, requiring specialized cinema equipment, set lighting, or on-camera talent direction. Once footage is captured, editing can be performed remotely.",
        },
      ],
    },
    es: {
      slug: "edicion-remota-vs-estudio-local",
      metadataTitle: "Edición Remota vs Estudio Local",
      title: "Edición remota de video vs estudio de producción local",
      description:
        "Compara tiempos de entrega, flexibilidad de precios y colaboración de postproducción remota frente a agencias locales de producción.",
      eyebrow: "Comparación de Modelos",
      answer:
        "La edición remota de video ofrece entregas más rápidas y flexibilidad mediante transferencia en la nube, mientras que el estudio local ofrece presencia física en set.",
      proof: {
        href: "/es/portafolio/ml-colombia",
        title: "ML Colombia",
        description:
          "Los créditos aprobados del portafolio incluyen postproducción remota de video para redes. Se enlaza como ejemplo publicado; nada publicado confirma tiempos idénticos para todo alcance.",
      },
      sections: [
        {
          heading: "¿Por qué la edición remota puede reducir costos fijos?",
          paragraphs: [
            "La postproducción moderna no requiere reservar horas en una sala de edición física. Mediante enlaces de almacenamiento en la nube y herramientas de transferencia colaborativa (como Dropbox, Frame.io, Google Drive o MASV), la entrega del material se realiza de forma asíncrona y sin demoras de traslado de discos.",
            "Prescindir de un estudio físico elimina costos fijos de instalaciones y mantenimiento de equipos. Esto permite canalizar el presupuesto directamente hacia la calidad narrativa, la masterización de audio, la corrección de color y revisiones ágiles. Explora nuestros [servicios de edición de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami) o aprende a enviar archivos pesados en nuestra guía sobre [cómo enviar archivos pesados de video para edición](/es/guias/como-enviar-archivos-pesados-de-video-para-edicion).",
          ],
          bullets: [
            "Entrega asíncrona: el material se transfiere en la nube sin envíos físicos de discos",
            "Menor costo fijo: el presupuesto se invierte en edición y acabado en lugar de alquiler de instalaciones",
            "Rondas de revisión ágiles: control de versiones y notas con código de tiempo reducen los ciclos de retroalimentación",
          ],
        },
        {
          heading: "¿Cómo se comparan los paquetes de edición y las tarifas por jornada de estudio?",
          paragraphs: [
            "Conocer la diferencia entre la facturación de una productora tradicional y un servicio de edición remota permite optimizar los recursos creativos de tu empresa.",
            "Los estudios locales suelen cobrar tarifas por jornada completa o media jornada para cubrir el espacio físico, los esquemas de iluminación en set, las cámaras de cine y el personal técnico en locación. Estos costos son indispensables para rodajes complejos, pero resultan redundantes cuando solo se requiere editar material ya grabado.",
            "La postproducción remota se estructura en paquetes por entregable, planes mensuales o proyectos con alcance definido. Para empresas que generan grabaciones internas o contenido con smartphone, la edición remota maximiza el rendimiento del presupuesto. Conoce cómo transformamos material de agencia en una pieza inmobiliaria dinámica en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)), o consulta nuestra visión general de [servicios](/es/servicios).",
          ],
          bullets: [
            "Jornada de estudio local: cubre equipos de filmación, escenografía, iluminación y personal en set",
            "Paquetes de edición remota: enfocados exclusivamente en montaje narrativo, diseño sonoro y colorimetría",
            "Escalabilidad flexible: ajusta el volumen de edición mes a mes sin compromisos de espacio físico",
          ],
        },
        {
          heading: "¿Qué herramientas y flujos de revisión sirven a equipos remotos?",
          paragraphs: [
            "Una postproducción remota eficiente depende de protocolos claros de entrega de archivos y plataformas de revisión precisa.",
            "A través de plataformas de revisión con código de tiempo (como Frame.io o Vimeo Review), directores creativos y responsables de marketing pueden pausar en cualquier fotograma, dibujar anotaciones y dejar comentarios exactos sobre la línea de tiempo. Esto evita cadenas interminables de correos y asegura que cada ajuste se aplique con exactitud en la siguiente versión.",
            "Para proyectos filmados en 4K o 6K, el flujo de trabajo con proxies permite editar archivos ligeros con total fluidez mientras los archivos originales se conservan intactos. Para definir el alcance de tu proyecto, consulta nuestra guía sobre [cómo escribir un brief de video](/es/guias/como-escribir-un-brief-util-de-video) o revisa las diferencias de roles en [editor de video vs videógrafo](/es/guias/editor-de-video-vs-videografo).",
          ],
          bullets: [
            "Comentarios con código de tiempo: anotaciones exactas fotograma a fotograma sobre el borrador de video",
            "Flujo de trabajo con proxies: edición fluida de tomas en alta resolución sin sobrecargar el almacenamiento",
            "Gestión centralizada de recursos: carpetas compartidas con logotipos, elementos gráficos y pistas de audio",
          ],
        },
        {
          heading: "¿Cuándo se necesita un estudio local y cuándo conviene la edición remota?",
          paragraphs: [
            "La elección entre contratar un estudio local o un editor remoto depende de si tu proyecto requiere filmación presencial o trabajo de postproducción sobre material existente.",
            "Contrata un Estudio Local cuando: Necesitas rodar en un set insonorizado o ciclorama, requieres iluminación compleja de estudio o precisas dirección presencial de actores o ponentes en el sur de Florida.",
            "Contrata Edición Remota cuando: Ya dispones de grabaciones de eventos, webinars, entrevistas o videos grabados con smartphone; necesitas transformar videos largos en clips para redes sociales; o buscas agilidad en subtitulado, ritmo y balance de color. Si deseas evaluar las necesidades de tu proyecto, completa nuestra [evaluación de estrategia de video](/es/evaluacion) o escríbenos a través de nuestra página de [contacto](/es/contacto).",
          ],
          bullets: [
            "Estudio local: rodaje en set, escenografía física, dirección presencial y equipo de cámara en locación",
            "Editor remoto: montaje de postproducción, reutilización de grabaciones, diseño de sonido y motion graphics",
            "Modelo híbrido: filmación local combinada con postproducción remota para máxima agilidad operativa",
          ],
        },
      ],
      faqs: [
        {
          question: "¿La calidad de la edición remota de video es equivalente a la de un estudio presencial?",
          answer:
            "Sí. La postproducción remota utiliza los mismos programas profesionales (DaVinci Resolve, Premiere Pro), monitores calibrados y herramientas de masterización de audio que un estudio físico. Las plataformas de revisión con código de tiempo permiten ajustar cada corte con total precisión.",
        },
        {
          question: "¿Cuál es la forma más rápida de transferir material pesado a un editor remoto?",
          answer:
            "Para carpetas de hasta 100 GB, plataformas de transferencia acelerada en la nube como MASV, Google Drive o Frame.io son ideales. Para proyectos multiterabyte, generar proxies ligeros en 1080p ProRes o DNxHR permite editar de inmediato sin demoras de subida.",
        },
        {
          question: "¿Un editor de video remoto incluye corrección de color y mezcla de sonido?",
          answer:
            "Sí. El servicio de postproducción remota abarca balance de color, concordancia entre tomas, ecualización de voces, reducción de ruido de fondo y ajuste de niveles de volumen para plataformas digitales.",
        },
        {
          question: "¿Cuándo es indispensable contratar una productora local en lugar de edición remota?",
          answer:
            "Es indispensable cuando se necesita filmar material nuevo en una locación específica con equipos de iluminación, cámaras de cine o dirección presencial de personas. Una vez grabado el material, la postproducción puede realizarse de forma remota.",
        },
      ],
    },
  },
  {
    id: "corporate-video-cost-guide",
    en: {
      slug: "corporate-video-production-cost-miami",
      metadataTitle: "Miami Video Production Cost Guide",
      title: "How much does corporate video production cost in Miami?",
      description:
        "Plan a Miami video production budget: compare scope, filming, editing, deliverables, and quote inputs before choosing a production path.",
      eyebrow: "Video Pricing Guide",
      answer:
        "There is no responsible one-price answer before the scope is defined. A useful quote separates pre-production, capture, post-production, deliverables, review terms, and usage so you can compare like with like.",
      proof: {
        href: "/portfolio/healthy-smile",
        title: "Healthy Smile Miami",
        description:
          "The published project credits Esteban with on-location video, sound, editing, and delivery for a Miami dental clinic on assignment with 300 Bees. Nothing published confirms an identical price, process, or crew for another project.",
      },
      sections: [
        {
          heading: "Which corporate video and production approach do you need?",
          paragraphs: [
            "A recruiting film, customer story, service explainer, event recap, and batch of short social edits solve different problems. Define the audience, desired action, distribution channels, and useful shelf life before discussing cameras or edit length.",
            "Esteban Moreno Media does not publish a universal fixed package for corporate video. The written quote should define the project-specific scope, deliverables, timing, review terms, and responsibilities.",
            "If your team already has usable footage, remote editing may be the cleanest scope. If the message depends on interviews, controlled sound, or consistent visual coverage, on-location production may be appropriate. A hybrid scope can combine a focused shoot with multiple edits for different channels.",
            "The right choice depends on the footage and business goal—not on a generic promise that one workflow is always cheaper or faster.",
          ],
          bullets: [
            "Who needs to watch, and what should they understand or do next?",
            "Where will the video live: website, sales deck, YouTube, paid media, or social?",
            "Is this one flagship asset, a reusable content library, or both?",
          ],
        },
        {
          heading: "Which scope details should you send for a comparable quote?",
          paragraphs: [
            "The largest differences usually come from what must happen before the edit begins and how many finished versions the project needs. A quote is easier to evaluate when every assumption is written down.",
            "A short, concrete brief reduces assumptions and makes competing estimates easier to compare. Include what is known and label what still needs recommendation.",
          ],
          bullets: [
            "Pre-production: brief, concept, script, interview prompts, schedule, and location planning.",
            "Capture: shoot time, locations, camera and audio needs, talent, travel, and any permits supplied by the client or production team.",
            "Post-production: footage volume, story edit, sound cleanup, color work, graphics, captions, licensed assets, and review rounds.",
            "Delivery: master length, cutdowns, aspect ratios, languages, file formats, deadlines, and usage requirements.",
            "Business goal, audience, intended call to action, and target channels.",
            "Existing footage or assets, filming location, people on camera, and preferred dates.",
            "Requested master video, cutdowns, captions, language versions, and file formats.",
            "Reference links, approval owner, deadline, and any must-use brand or legal language.",
          ],
        },
        {
          heading: "How can you compare exclusions and published work?",
          paragraphs: [
            "Check whether each proposal includes pre-production, capture, editing, audio, graphics, captions, revisions, travel, licensed assets, and final versions. Ask what triggers a change order and who owns each input.",
            "Then review published work whose credited scope resembles yours. For example, the [Healthy Smile Miami dental clinic project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)) proves on-location video, audio, and editing execution in South Florida. A portfolio page can prove the kind of work performed; it cannot prove an unpublished price, result, or identical process for your project.",
          ],
        },
      ],
      faqs: [
        { question: "Does Esteban Moreno Media publish fixed corporate video packages?", answer: "No universal package is published. Scope, deliverables, timing, review terms, and responsibilities are defined for each project in the quote." },
        { question: "Can I hire Esteban only to edit footage my team recorded?", answer: "Remote editing can be scoped when you already have usable footage. Share the original files, goal, references, required versions, and deadline so the material can be assessed." },
        { question: "What makes a corporate video quote increase?", answer: "Additional locations or capture needs, larger footage volumes, complex story or graphics work, multiple languages or formats, licensed assets, tight timing, and more review cycles can all change scope." },
        { question: "What should I send before asking for a quote?", answer: "Send the business goal, audience, channels, existing assets, location, desired deliverables, references, approval owner, and target date. Unknowns can be marked for recommendation." },
      ],
    },
    es: {
      slug: "cuanto-cuesta-la-produccion-de-video-corporativo-miami",
      metadataTitle: "Video Corporativo Costo Miami Guía",
      title: "¿Cuánto cuesta la producción de video corporativo en Miami?",
      description:
        "Guía de costos, presupuestos y factores de alcance para la producción y edición de video corporativo en Miami.",
      eyebrow: "Guía de Precios",
      answer:
        "No existe una respuesta responsable de precio único antes de definir el alcance. Una cotización útil separa preproducción, grabación, postproducción, entregables, revisiones y uso.",
      proof: {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        description:
          "El proyecto publicado acredita a Esteban por video y sonido en locación, edición y entrega para un consultorio dental de Miami por encargo de 300 Bees. Nada publicado confirma un precio, proceso o equipo idéntico para otro proyecto.",
      },
      sections: [
        {
          heading: "¿Qué video corporativo y tipo de producción necesitas?",
          paragraphs: [
            "Un video de reclutamiento, testimonio, explicación de servicio, resumen de evento y lote de piezas sociales resuelven problemas distintos. Define audiencia, acción deseada, canales y vida útil antes de hablar de cámaras o duración.",
            "Esteban Moreno Media no publica un paquete fijo universal. La cotización escrita debe definir alcance, entregables, plazos, revisiones y responsabilidades para ese proyecto.",
            "Si tu equipo ya tiene material usable, la edición remota puede ser el alcance más claro. Si el mensaje depende de entrevistas, sonido controlado o cobertura visual consistente, puede convenir producción en locación. Un alcance híbrido combina una grabación enfocada con varias ediciones.",
            "La elección depende del material y la meta; no de una promesa genérica de que un flujo siempre será más barato o rápido.",
          ],
          bullets: [
            "Quién verá el video y qué debe entender o hacer.",
            "Dónde se publicará: web, ventas, YouTube, pauta o redes.",
            "Si necesitas una pieza principal, una biblioteca reutilizable o ambas.",
          ],
        },
        {
          heading: "¿Qué detalles debes enviar para comparar cotizaciones?",
          paragraphs: [
            "Las diferencias principales suelen venir de lo que debe ocurrir antes de editar y de cuántas versiones finales necesita el proyecto. Cada supuesto debe quedar por escrito.",
            "Un brief corto y concreto reduce supuestos. Incluye lo conocido y marca lo que todavía necesita recomendación.",
          ],
          bullets: [
            "Preproducción: brief, concepto, guion, preguntas, agenda y locación.",
            "Grabación: tiempo, locaciones, cámara, sonido, talento, traslados y permisos.",
            "Postproducción: volumen de material, narrativa, audio, color, gráficos, subtítulos, licencias y revisiones.",
            "Entrega: duración, recortes, formatos, idiomas, archivos, fechas y uso.",
            "Meta, audiencia, llamada a la acción y canales.",
            "Material existente, locación, personas en cámara y fechas preferidas.",
            "Video principal, recortes, subtítulos, idiomas y formatos.",
            "Referencias, responsable de aprobación, fecha objetivo y lenguaje obligatorio.",
          ],
        },
        { heading: "¿Cómo comparas lo que no está incluido y los trabajos publicados?", paragraphs: ["Revisa si cada propuesta incluye preproducción, grabación, edición, audio, gráficos, subtítulos, revisiones, traslados, licencias y versiones finales. Pregunta qué genera un cambio de alcance.", "Después revisa trabajos publicados con créditos similares. Por ejemplo, el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)) acredita grabación en locación, captura de sonido y edición en South Florida. El portafolio demuestra el tipo de trabajo realizado; no un precio o resultado no publicado."] },
      ],
      faqs: [
        { question: "¿Esteban Moreno Media publica paquetes fijos de video corporativo?", answer: "No hay un paquete universal publicado. El alcance, los entregables, los plazos, las revisiones y las responsabilidades se definen en cada cotización." },
        { question: "¿Puedo contratar solamente la edición del material de mi equipo?", answer: "La edición remota puede cotizarse si ya existe material usable. Comparte archivos originales, meta, referencias, versiones necesarias y fecha objetivo." },
        { question: "¿Qué puede aumentar el alcance de una cotización?", answer: "Más locaciones o necesidades de grabación, mayor volumen de material, narrativa o gráficos complejos, varios idiomas o formatos, licencias, plazos ajustados y más ciclos de revisión." },
        { question: "¿Qué debo enviar para pedir una cotización?", answer: "Envía meta, audiencia, canales, activos existentes, locación, entregables, referencias, responsable de aprobación y fecha objetivo. Marca los datos todavía desconocidos." },
      ],
    },
  },
  {
    id: "record-with-iphone-guide",
    en: {
      slug: "record-video-with-iphone-for-professional-editing",
      metadataTitle: "iPhone Video Pro Editing Guide",
      title: "How to record video content with an iPhone for professional editing",
      description:
        "Best practices for lighting, audio, frame rate settings, and file transfer when recording on smartphone for pro video editors.",
      eyebrow: "Footage Preparation",
      answer:
        "Lock focus/exposure, record in 4K 24fps or 60fps, use an external lapel microphone, and upload uncompressed files to Google Drive or Dropbox.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include promotional video editing from client footage. Linked as a published example; nothing published confirms identical settings for every project.",
      },
      sections: [
        {
          heading: "Which iPhone camera settings give an editor clean footage?",
          paragraphs: [
            "Set the video format to 4K at 24 or 30 frames per second and leave it there for the whole shoot, because mixing frame rates in one project forces conversions that show up as stutter. Turn on the grid so the horizon and the speaker's eyes sit on the same lines from clip to clip. Lock focus and exposure by pressing and holding on the subject; otherwise the phone keeps re-measuring as people move and the brightness pulses through the take.",
            "Use the main lens rather than the ultra-wide for anyone speaking to camera, since the wide lens stretches faces near the edges. Wipe the lens before every session: a thumbprint softens the whole image in a way no edit can sharpen. Finally, record a few seconds before and after each line so the editor has room to cut without clipping the first or last word.",
          ],
        },
        {
          heading: "How should you handle sound and light before uploading?",
          paragraphs: [
            "Face the speaker toward the main light — a window or a lamp in front of them, never behind — so the face is brighter than the background. A wireless lapel microphone clipped to clothing about a hand's width below the chin captures far cleaner speech than the phone's own microphone across the room, which also records echo from bare walls and floors.",
            "Before you upload, check one clip with headphones; hum from a refrigerator or air conditioner is easy to miss in the room and hard to remove later. Send the original files from the phone through a file-transfer link or cable rather than through a messaging app, because messaging apps recompress video and throw away detail. Name the clips in the order they should appear, and add a short note on which takes you liked best.",
          ],
        },
      ],
    },
    es: {
      slug: "grabar-video-con-iphone-para-edicion-profesional",
      metadataTitle: "Grabar Video iPhone Edición Pro",
      title: "Cómo grabar video con iPhone para edición profesional",
      description:
        "Recomendaciones de iluminación, audio, resolución y transferencia de archivos para grabar con smartphone y editar como profesional.",
      eyebrow: "Guía de Grabación",
      answer:
        "Bloquea el enfoque y la exposición, graba en 4K a 24fps o 60fps, usa un micrófono de solapa y sube archivos sin comprimir.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen edición promocional de material de cliente. Se enlaza como ejemplo publicado; nada publicado confirma configuraciones idénticas en todo caso.",
      },
      sections: [
        {
          heading: "¿Qué ajustes del iPhone le dan al editor un material limpio?",
          paragraphs: [
            "Configura el formato de video en 4K a 24 o 30 cuadros por segundo y no lo cambies durante toda la grabación, porque mezclar velocidades en un mismo proyecto obliga a conversiones que se notan como saltos. Activa la cuadrícula para que el horizonte y los ojos de quien habla queden en las mismas líneas de un clip a otro. Fija el enfoque y la exposición manteniendo el dedo sobre el sujeto; si no, el teléfono vuelve a medir cada vez que alguien se mueve y el brillo late durante la toma.",
            "Usa el lente principal y no el gran angular para quien habla a cámara, porque el gran angular estira las caras cerca de los bordes. Limpia el lente antes de cada sesión y graba unos segundos antes y después de cada frase para que el editor pueda cortar sin comerse la primera o la última palabra.",
          ],
        },
        {
          heading: "¿Cómo se cuidan el sonido y la luz antes de enviar los archivos?",
          paragraphs: [
            "Pon a la persona de frente a la luz principal — una ventana o una lámpara delante, nunca detrás — para que la cara quede más iluminada que el fondo. Un micrófono de solapa inalámbrico, sujeto a la ropa más o menos a una mano por debajo de la barbilla, capta la voz mucho más limpia que el micrófono del teléfono al otro lado del cuarto, que además graba el eco de paredes y pisos.",
            "Antes de enviar, revisa un clip con audífonos: el zumbido de una nevera o del aire acondicionado pasa desapercibido en el lugar y es difícil de quitar después. Envía los archivos originales del teléfono por un enlace de transferencia o por cable, no por una aplicación de mensajes, que vuelve a comprimir el video. Nombra los clips en el orden en que deben ir.",
          ],
        },
      ],
    },
  },
  {
    id: "reels-vs-tiktok-vs-shorts-guide",
    en: {
      slug: "reels-vs-tiktok-vs-shorts-for-local-business",
      metadataTitle: "Reels TikTok Shorts Guide",
      title: "Instagram Reels vs TikTok vs YouTube Shorts for local business",
      description:
        "Compare audience demographics, aspect ratios, caption strategies, and video formatting across vertical video platforms.",
      eyebrow: "Platform Strategy",
      answer:
        "Instagram Reels targets local community buyers, TikTok drives organic virality, and YouTube Shorts builds long-term search authority.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved portfolio credits include vertical social video formatting. Linked as a published example; nothing published confirms identical distribution metrics across platforms.",
      },
      sections: [
        {
          heading: "Do Reels, TikTok and Shorts need different video files?",
          paragraphs: [
            "Usually not. All three are vertical platforms built around a 9:16 frame, commonly exported at 1080x1920, so one well-made master can serve all of them. What differs is the interface laid over the video: each app places its caption, profile name and buttons in slightly different spots near the bottom and right edge, and those overlays move as the apps update.",
            "The practical answer is to design for the overlap rather than for one app. Keep faces, product shots and on-screen text inside the central area of the frame, away from the bottom strip and the right-hand column, and the same file will read cleanly wherever it is posted. If one platform matters far more to your business than the others, check the final cut on that app's own preview before publishing, since a preview is the only reliable test of what a viewer will actually see.",
          ],
        },
        {
          heading: "How can a local business cross-post one video without it looking recycled?",
          paragraphs: [
            "Edit one master with clean audio and captions burned into the safe area, then export it without any platform's watermark. Uploading a file downloaded from one app to another carries that app's logo across, which looks second-hand and gives viewers a reason to scroll past.",
            "Write the caption separately for each platform even when the video is identical. A TikTok caption tends to be short and conversational, an Instagram caption can carry the address and the booking line, and a YouTube Shorts title is searched, so it should name the thing people would type. Add the location and the business name in each one; a local viewer deciding where to eat or whom to call needs both. Keep a simple sheet of what was posted where and when, so that a video that does well on one app can be scheduled for the others.",
          ],
        },
      ],
    },
    es: {
      slug: "reels-vs-tiktok-vs-shorts-para-negocios-locales",
      metadataTitle: "Reels TikTok Shorts Guía",
      title: "Instagram Reels vs TikTok vs YouTube Shorts para negocios locales",
      description:
        "Comparativa de audiencias, formatos, zonas seguras y estrategias de contenido en video vertical para comercios locales.",
      eyebrow: "Estrategia de Plataformas",
      answer:
        "Instagram Reels conecta con clientes locales directos, TikTok impulsa alcance viral y YouTube Shorts genera posicionamiento en búsquedas a largo plazo.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "Los créditos aprobados del portafolio incluyen formato de video vertical para redes. Se enlaza como ejemplo publicado; nada publicado confirma métricas idénticas entre plataformas.",
      },
      sections: [
        {
          heading: "¿Reels, TikTok y Shorts necesitan archivos de video distintos?",
          paragraphs: [
            "Por lo general, no. Las tres son plataformas verticales pensadas para un cuadro 9:16, normalmente exportado en 1080x1920, así que un buen archivo maestro puede servir para todas. Lo que cambia es la interfaz que se superpone al video: cada aplicación pone el texto, el nombre del perfil y los botones en lugares un poco distintos cerca del borde inferior y del lado derecho, y esas capas se mueven cuando las aplicaciones se actualizan.",
            "La respuesta práctica es diseñar para la zona que comparten y no para una sola. Mantén caras, productos y textos en el centro del cuadro, lejos de la franja de abajo y de la columna derecha, y el mismo archivo se verá bien en cualquier lado. Si una plataforma pesa mucho más que las otras para tu negocio, revisa el corte final en la vista previa de esa aplicación antes de publicar.",
            "Para negocios locales, la página de [reels para negocios en Miami](/es/reels-para-negocios-miami) explica cómo se plantea una serie.",
          ],
        },
        {
          heading: "¿Cómo publica un negocio local el mismo video en varias redes sin que parezca reciclado?",
          paragraphs: [
            "Edita un solo maestro con audio limpio y subtítulos dentro de la zona segura, y expórtalo sin la marca de agua de ninguna plataforma. Subir a una red un archivo descargado de otra arrastra el logo de esa aplicación, se ve de segunda mano y le da al público una razón para seguir de largo.",
            "Escribe el texto de cada publicación por separado aunque el video sea idéntico. En TikTok suele funcionar un texto corto y conversacional, en Instagram cabe la dirección y la forma de reservar, y el título de un Short de YouTube se busca, así que debe nombrar lo que la gente escribiría. Incluye la ubicación y el nombre del negocio en cada una: quien decide dónde comer o a quién llamar necesita ambos datos. Lleva una hoja sencilla de qué se publicó, dónde y cuándo.",
            "Para locales de comida, revisa el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
      ],
    },
  },
  {
    id: "ai-vs-human-editor-guide",
    en: {
      slug: "ai-video-editing-vs-human-editor",
      metadataTitle: "AI Video Editing vs Human Editor",
      title: "AI video editing tools vs hiring a professional video editor",
      description:
        "Compare automated AI video tools with human video post-production for pacing, storytelling, audio mastering, and brand consistency.",
      eyebrow: "Tool Comparison",
      answer:
        "Automated AI tools accelerate initial transcription, silence removal, and basic formatting, while professional human video editors provide narrative structure, rhythm, custom sound design, color grading, and brand positioning tailored to audience retention.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include human video editing and brand post-production. Linked as a published example; nothing published confirms identical workflows across all projects.",
      },
      sections: [
        {
          heading: "Where do automated AI video tools save time in post-production?",
          paragraphs: [
            "Automated video editing software has advanced significantly in handling repetitive, time-intensive utility tasks. Algorithms can ingest raw interview footage, transcribe speech to text, flag silent pauses, and generate timestamped subtitle files in minutes.",
            "For content creators and businesses managing high volumes of raw footage, AI tools provide practical speed for preliminary rough assemblies. Automated transcript searching allows creators to locate specific spoken phrases across multiple takes without manually scrubbing through hours of footage.",
          ],
          bullets: [
            "Automated subtitle generation and timing synchronization across multi-platform exports",
            "Silence and filler-word detection to create initial conversational rough assemblies",
            "Keyword-based transcript searching across large volumes of raw recorded interviews",
            "Automated aspect ratio reframing from widescreen master clips to vertical social snippets",
          ],
        },
        {
          heading: "Where do automated tools struggle with pacing, emotion and context?",
          paragraphs: [
            "While AI tools can follow mechanical rules like deleting silence, they lack creative judgment. Effective video editing is built on rhythm, comedic timing, emotional tension, and intentional pauses that allow important points to resonate with viewers.",
            "Algorithmic tools often insert generic stock B-roll based on literal keyword matches rather than contextual narrative meaning. In contrast, experienced human editors craft narrative momentum, shape character arcs, and design multi-layered sound environments that keep audiences engaged throughout the video.",
            "Refining published creative work such as the [My D'ler portfolio project](/portfolio/my-dler) requires deliberate human judgment to balance brand identity, pacing, and visual style. For high-converting social video campaigns, exploring specialized [short-form video editing services](/services/short-form-video-editor-miami) and dedicated [TikTok ad video editor services in Miami](/services/tiktok-ad-video-editor-miami) ensures your creative assets match platform audience expectations.",
          ],
          bullets: [
            "Nuanced comedic and dramatic pacing that algorithms cannot replicate",
            "Contextual B-roll curation that reinforces narrative meaning rather than literal word matches",
            "Multi-track audio cleanup, voice equalization, and broadcast loudness leveling (-14 to -16 LUFS)",
            "Cohesive color grading and visual consistency aligned with brand guidelines",
          ],
        },
        {
          heading: "How do professional editors use AI in a hybrid workflow?",
          paragraphs: [
            "The most effective approach is not choosing between human creativity and AI efficiency, but combining both. Professional editors use AI utilities as accelerator tools within established editing workstations (such as DaVinci Resolve Studio and Premiere Pro).",
            "By offloading speech transcription, automated rotoscoping, voice isolation, and initial scene detection to AI assistants, editors gain more focused time to dedicate toward narrative pacing, bespoke sound design, custom motion graphics, and strategic storytelling. A similar balance applies to visual assets, where [AI product photography in Miami](/services/ai-product-photography-miami) combines computational enhancement with professional creative direction.",
          ],
          bullets: [
            "AI-assisted vocal isolation and background noise reduction for clean audio tracks",
            "Smart rotoscoping and depth masking for precise color adjustments and graphics layering",
            "Transcript-based assembly cuts refined through manual editorial judgment",
            "Automated closed captions paired with custom typography and brand styling",
          ],
        },
        {
          heading: "How do you choose between AI software and a professional editor?",
          paragraphs: [
            "Selecting the appropriate editing approach depends on the business stakes, audience, and distribution goals of your video assets.",
            "Low-stakes content—such as internal team updates, raw webinar replays, or simple personal vlog drafts—often benefits from the speed and low cost of automated AI apps. In these cases, functional clarity outweighs cinematic polish.",
            "High-stakes commercial assets—including brand documentaries, client testimonial videos, paid advertising campaigns, and flagship service explainers—require professional post-production. To explore criteria for evaluating external partners, consult our guide on [how to choose a video editor in Miami](/guides/how-to-choose-a-video-editor-in-miami) or review the distinction between camera capture and post-production in [video editor vs videographer](/guides/video-editor-vs-videographer).",
          ],
          bullets: [
            "Internal updates and webinar recaps: automated AI apps deliver quick, budget-friendly baseline trims",
            "Client testimonials and brand films: professional human editing ensures narrative cohesion and high viewer trust",
            "Paid social ad campaigns: expert hook pacing and custom audio mastering directly affect conversion performance",
          ],
        },
        {
          heading: "How should you prepare a footage brief for human or hybrid editing?",
          paragraphs: [
            "Whether you work with an automated editing tool or hire a dedicated post-production specialist, organizing your source footage and project brief upfront prevents costly revisions.",
            "Ensure raw camera files and separate microphone audio are compiled in structured cloud folders. Outline target platforms, desired video length, aspect ratios, and reference links demonstrating the style and energy you want to achieve. If you are evaluating strategic video options for your business, complete our [video strategy assessment](/assessment) or connect directly through our [contact](/contact) page.",
          ],
          bullets: [
            "Source video and audio files organized in uncompressed cloud storage folders",
            "Reference video links illustrating desired pacing, typography, and graphic style",
            "Clear platform specifications and required deliverable formats (9:16, 16:9, 1:1)",
            "Designated project owner responsible for providing consolidated feedback rounds",
          ],
        },
      ],
      faqs: [
        {
          question: "Can AI tools completely replace a professional video editor?",
          answer:
            "Automated AI tools cannot replace human creative direction, comedic timing, emotional storytelling, or brand-specific nuance. They serve as efficiency utilities within an editor's workflow rather than autonomous replacements.",
        },
        {
          question: "When is it suitable to use automated AI video editing apps?",
          answer:
            "Automated apps work well for low-stakes internal recordings, rough webinar cuts, and quick prototype drafts where production polish and brand consistency are not primary requirements.",
        },
        {
          question: "How do professional video editors use AI in their workflow?",
          answer:
            "Editors use AI for automated speech-to-text transcription, background noise isolation, rotoscoping masks, and scene detection, allowing more focused time on narrative pacing and sound design.",
        },
        {
          question: "What should I prepare before hiring an editor for existing footage?",
          answer:
            "Provide organized raw video files, audio tracks, brand guidelines, reference links for editing style, target platforms, and a summary of the core message you want viewers to retain.",
        },
      ],
    },
    es: {
      slug: "edicion-de-video-con-ia-vs-editor-profesional",
      metadataTitle: "Edición Video IA vs Editor Humano",
      title: "Herramientas de edición con IA vs contratar un editor profesional",
      description:
        "Comparación entre software automatizado de IA y postproducción humana en narrativa, ritmo, masterización de audio y coherencia de marca.",
      eyebrow: "Comparación de Herramientas",
      answer:
        "Las herramientas automatizadas de IA aceleran transcripciones, cortes de silencios y formatos iniciales, mientras que un editor profesional aporta estructura narrativa, ritmo visual, diseño de audio, colorimetría y posicionamiento de marca.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen postproducción y edición de marca humana. Se enlaza como ejemplo publicado; nada publicado confirma flujos idénticos en todo caso.",
      },
      sections: [
        {
          heading: "¿Dónde ahorran tiempo las herramientas automatizadas de IA?",
          paragraphs: [
            "El software de edición automatizada ha progresado notablemente en la resolución de tareas mecánicas y repetitivas. Los algoritmos actuales pueden procesar grabaciones en bruto, transcribir diálogos a texto, detectar pausas de silencio y generar subtítulos sincronizados en cuestión de minutos.",
            "Para creadores de contenido y empresas con grandes volúmenes de material grabado, las herramientas de IA ofrecen velocidad práctica para ensamblajes preliminares. La búsqueda en transcripciones permite ubicar declaraciones específicas entre múltiples tomas sin revisar manualmente horas de grabación.",
          ],
          bullets: [
            "Generación y sincronización automática de subtítulos para exportaciones en múltiples plataformas",
            "Detección y corte automático de pausas silenciosas para armar cortes preliminares de diálogo",
            "Búsqueda por palabras clave en transcripciones dentro de archivos extensos de entrevistas",
            "Reencuadre automatizado de tomas horizontales a formatos verticales para redes sociales",
          ],
        },
        {
          heading: "¿Dónde falla el software automatizado en narrativa, emoción y contexto?",
          paragraphs: [
            "Aunque las herramientas de IA ejecutan reglas mecánicas como recortar silencios, carecen de criterio creativo. La edición de video efectiva se fundamenta en el ritmo, la intención dramática o cómica y las pausas deliberadas que permiten al espectador asimilar mensajes clave.",
            "Los programas automatizados suelen insertar planos de apoyo (B-roll) genéricos basados en coincidencias literales de palabras sin entender el contexto del relato. En cambio, un editor profesional estructura la progresión narrativa, define el arco emocional y diseña una atmósfera sonora que mantiene la atención del público.",
            "El desarrollo de proyectos creativos como el [portafolio de My D'ler](/es/portafolio/my-dler) requiere criterio humano para equilibrar identidad de marca, ritmo visual y estética. Para campañas de alto impacto en redes, consultar [servicios de editor de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami) y [editor de video para anuncios de TikTok en Miami](/es/editor-de-video-para-anuncios-de-tiktok-miami) asegura que las piezas cumplan con las exigencias de cada plataforma.",
          ],
          bullets: [
            "Ritmo narrativo y pausas con intención emocional que los algoritmos no pueden replicar",
            "Selección de planos de apoyo contextualmente relevantes en lugar de inserciones literales incoherentes",
            "Limpieza de audio multipista, ecualización de voces y balance de volumen según estándares web (-14 a -16 LUFS)",
            "Corrección de color y etalonaje coherente con la identidad visual de la marca",
          ],
        },
        {
          heading: "¿Cómo integran la IA los editores profesionales en un flujo híbrido?",
          paragraphs: [
            "El enfoque más eficaz no consiste en elegir entre creatividad humana o automatización de IA, sino en integrar ambas. Los editores profesionales utilizan herramientas de IA como aceleradores dentro de suites de postproducción consolidadas (como DaVinci Resolve Studio y Premiere Pro).",
            "Al delegar la transcripción de diálogos, la rotoscopía automática, el aislamiento de voces y la detección de cambios de plano en asistentes de IA, el editor dispone de más tiempo para la narrativa, el diseño sonoro y los gráficos en movimiento. Un balance similar ocurre en fotografía comercial, donde la [fotografía de producto con IA en Miami](/es/fotografia-de-producto-con-ia-miami) combina asistencia computacional con dirección creativa humana.",
          ],
          bullets: [
            "Aislamiento de voz y reducción de ruido asistidos por IA para pistas de audio limpias",
            "Rotoscopía inteligente y máscaras de profundidad para ajustes de color y capas gráficas precisas",
            "Armado inicial basado en transcripciones refinado mediante criterio editorial humano",
            "Subtítulos generados automáticamente con tipografía y diseño gráfico personalizados",
          ],
        },
        {
          heading: "¿Cómo elegir entre software automatizado y un editor profesional?",
          paragraphs: [
            "La decisión sobre qué método utilizar depende de la visibilidad, los objetivos comerciales y la audiencia de cada video.",
            "El contenido de bajo compromiso—como actualizaciones internas de equipo, grabaciones de seminarios web o borradores informales—aprovecha la rapidez y bajo costo de las aplicaciones de IA. En estos casos, la claridad funcional prima sobre el acabado cinemático.",
            "Los videos comerciales de alta relevancia—como testimoniales de clientes, campañas publicitarias pagadas y videos de marca—requieren postproducción profesional. Para conocer criterios de selección de especialistas, revisa nuestra guía sobre [cómo elegir un editor de video en Miami](/es/guias/como-elegir-un-editor-de-video-en-miami) o consulta la diferencia entre grabación y postproducción en [editor de video vs videógrafo](/es/guias/editor-de-video-vs-videografo).",
          ],
          bullets: [
            "Actualizaciones internas y grabaciones de llamadas: las aplicaciones de IA ofrecen soluciones rápidas y económicas",
            "Testimoniales de clientes y videos de marca: la edición profesional humana garantiza coherencia y credibilidad",
            "Anuncios pagados en redes sociales: el montaje de ganchos iniciales y el diseño de sonido influyen directamente en la conversión",
          ],
        },
        {
          heading: "¿Cómo se prepara el material antes de iniciar la edición?",
          paragraphs: [
            "Tanto si utilizas herramientas automatizadas como si contratas a un editor profesional, estructurar los archivos originales y definir el brief previene revisiones innecesarias.",
            "Organiza los archivos de video y las pistas de audio independientes en carpetas en la nube sin compresión. Detalla las plataformas de destino, la duración esperada, las proporciones de aspecto y enlaces de referencia con el estilo visual deseado. Para evaluar la estrategia audiovisual de tu negocio, realiza nuestra [evaluación de estrategia de video](/es/evaluacion) o ponte en contacto mediante nuestra página de [contacto](/es/contacto).",
          ],
          bullets: [
            "Archivos de video y audio organizados en almacenamiento en la nube sin compresión adicional",
            "Enlaces de referencia con ejemplos del ritmo, estilo gráfico y estética deseada",
            "Especificaciones claras de plataformas de destino y formatos requeridos (9:16, 16:9, 1:1)",
            "Responsable asignado para centralizar y coordinar las rondas de retroalimentación",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Pueden las herramientas de IA reemplazar por completo a un editor de video profesional?",
          answer:
            "Las herramientas automatizadas no reemplazan la dirección creativa, el ritmo narrativo ni la intención emocional de una historia. Funcionan como asistentes de productividad dentro del flujo de trabajo de un editor profesional.",
        },
        {
          question: "¿Cuándo es conveniente utilizar software automatizado de edición con IA?",
          answer:
            "Es adecuado para grabaciones internas, resúmenes preliminares de llamadas y pruebas rápidas donde el pulido visual y la identidad de marca no son prioritarios.",
        },
        {
          question: "¿Cómo aprovecha un editor profesional la inteligencia artificial?",
          answer:
            "Se utiliza para acelerar la transcripción, el aislamiento de frecuencias de voz, la rotoscopía y la detección de cambios de plano, dedicando más tiempo a la narrativa y al diseño sonoro.",
        },
        {
          question: "¿Qué se debe preparar antes de contratar la edición de material existente?",
          answer:
            "Reúne los archivos originales de video y audio, guías visuales de marca, enlaces de referencia del estilo deseado, canales de publicación y la idea central que el espectador debe recordar.",
        },
      ],
    },
  },
  {
    id: "choose-video-editor-guide",
    en: {
      slug: "how-to-choose-a-video-editor-in-miami",
      metadataTitle: "How to Choose a Video Editor Miami",
      title: "How to choose a professional video editor in Miami",
      description:
        "Essential criteria for evaluating portfolio proof, communication clarity, turnaround expectations, and scoping questions.",
      eyebrow: "Hiring Guide",
      answer:
        "Evaluate real published portfolio credits, demand clear scoping questions, confirm English/Spanish communication, and avoid agencies with unverified claims.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved portfolio credits include published client post-production. Linked as a published example; nothing published confirms identical turnaround times across all projects.",
      },
      sections: [
        {
          heading: "How do you verify an editor's portfolio credits?",
          paragraphs: [
            "Look for named projects with a stated role, not a reel of unlabeled clips. A reel can mix stock footage, other people's shots and the editor's own work in a way nobody can untangle; a project page that names the client, the year and exactly what the editor did can be checked. The [Homeowners project](/portfolio/homeowners) is an example of that format: a social video Esteban edited from footage supplied by the agency 300 Bees, and its [case study](/case-studies/homeowners) says so rather than implying he filmed it.",
            "When you review any editor, ask which parts of a piece were theirs — filming, editing, colour, sound, motion graphics — and whether the footage was supplied. Then ask for one project close to yours in format and length. A strong portfolio is one where the credits are specific enough that you could contact the client to confirm them.",
          ],
        },
        {
          heading: "What should communication with an editor look like before you hire?",
          paragraphs: [
            "Good scoping questions arrive before any price does: what the video is for, where it will be published, how long it should run, what footage exists, who approves it and when it is needed. An editor who quotes without asking those is guessing, and the guess usually shows up later as extra rounds or a surprise invoice.",
            "Language matters in South Florida, so confirm it plainly instead of assuming. Esteban works Spanish-first with intermediate English: briefs, calls and notes in Spanish are his strongest channel, and English-language projects are handled in writing where it helps precision. For a published example of on-location work, see [Healthy Smile Miami](/portfolio/healthy-smile), a dental clinic's social videos filmed and edited on assignment with 300 Bees, and its [case study](/case-studies/healthy-smile). Agree in writing on the number of revision rounds and how feedback will be sent.",
          ],
        },
      ],
    },
    es: {
      slug: "como-elegir-un-editor-de-video-en-miami",
      metadataTitle: "Cómo Elegir Editor de Video Miami",
      title: "Cómo elegir un editor de video profesional en Miami",
      description:
        "Criterios esenciales para evaluar portafolios, claridad de comunicación, expectativas de entrega y alcance en Miami.",
      eyebrow: "Guía de Contratación",
      answer:
        "Evalúa trabajos reales publicados, exige preguntas claras de alcance y confirma comunicación fluida bilingüe.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "Los créditos aprobados del portafolio incluyen postproducción publicada. Se enlaza como ejemplo publicado; nada publicado confirma tiempos idénticos para todo alcance.",
      },
      sections: [
        {
          heading: "¿Cómo se verifican los créditos del portafolio de un editor?",
          paragraphs: [
            "Busca proyectos con nombre y con el rol indicado, no un reel de clips sin etiqueta. Un reel puede mezclar material de stock, tomas de otras personas y trabajo propio sin que nadie pueda separarlos; una página de proyecto que nombra al cliente, el año y lo que hizo exactamente el editor se puede comprobar. El [proyecto Homeowners](/es/portafolio/homeowners) es un ejemplo: un video social que Esteban editó con material de la agencia 300 Bees, y su [caso de estudio](/es/casos-de-estudio/homeowners) lo dice en lugar de dar a entender que él lo grabó.",
            "Con cualquier editor, pregunta qué partes de una pieza fueron suyas — grabación, edición, color, sonido, gráficos — y si el material le fue entregado. Luego pide un proyecto parecido al tuyo en formato y duración. Un buen portafolio es aquel cuyos créditos son tan concretos que podrías confirmarlos con el cliente.",
          ],
        },
        {
          heading: "¿Cómo debería ser la comunicación con un editor antes de contratarlo?",
          paragraphs: [
            "Las buenas preguntas de alcance llegan antes que el precio: para qué es el video, dónde se publicará, cuánto debe durar, qué material existe, quién lo aprueba y para cuándo se necesita. Un editor que cotiza sin preguntar eso está adivinando, y la adivinanza suele aparecer después como rondas extra o una factura inesperada.",
            "En South Florida el idioma importa, así que confírmalo sin suponer. Esteban trabaja primero en español y tiene un inglés intermedio: los briefs, las llamadas y las notas en español son su canal más fuerte, y los proyectos en inglés se apoyan en lo escrito para ganar precisión. Como ejemplo de trabajo en locación, mira [Healthy Smile Miami](/es/portafolio/healthy-smile), videos para redes de una clínica dental grabados y editados por encargo de 300 Bees, y su [caso de estudio](/es/casos-de-estudio/healthy-smile). Para edición remota en español, revisa el servicio de [editor de video en Miami](/es/editor-de-video-miami).",
          ],
        },
      ],
    },
  },
  {
    id: "agency-video-editing-guide",
    en: {
      slug: "video-editing-workflow-for-agencies-miami",
      metadataTitle: "Agency Video Editing Workflow Guide",
      title: "White-label video editing workflow for marketing agencies in Miami",
      description:
        "How marketing agencies outsource high-volume video editing with standardized asset handoff, master timelines, and review cycles.",
      eyebrow: "Agency Workflow",
      answer:
        "Establish standardized folder structures, shared drive sync, clear video briefs, and dedicated Slack/email feedback rounds.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include agency-level white-label post-production. Linked as a published example; nothing published confirms identical agency retainer terms.",
      },
      sections: [
        {
          heading: "How should an agency structure folders for an editing handoff?",
          paragraphs: [
            "One top folder per project, with the same sub-folders every time: camera files by camera or angle, separate audio, brand assets, music, references, and a brief. Keep the original folder structure from each card instead of flattening everything into one list, because the file names and metadata are how an editor matches a clip to the right audio and the right day.",
            "Brand assets should be vectors or layered files, not a logo copied from a website, and the brief should name each deliverable with its aspect ratio, length, destination and file name. If the footage was shot in a log profile or with a set look, include the camera model and any LUT. For an example of editing agency-supplied material, see the [Homeowners project](/portfolio/homeowners), edited from footage the agency 300 Bees provided, and the [Homeowners case study](/case-studies/homeowners).",
          ],
        },
        {
          heading: "How do you keep revision rounds under control on client campaigns?",
          paragraphs: [
            "Consolidate. Every round should be one list of notes, gathered from everyone who has a say, with timecodes and a clear instruction per note. Feedback that arrives in pieces from several people tends to contradict itself, and each contradiction costs another pass over the timeline.",
            "Agree before the edit starts how many rounds are included and who gives final approval; on agency work that person is usually on the agency side, so the end client's comments travel through one named contact. A review tool that pins comments to a frame removes the guesswork of notes like \"the part near the end\". Mark each round as a version — v1, v2, v3 — and keep the previous exports, so a change can be undone without rebuilding it. When a note asks for something outside the brief, say so then, not at delivery.",
          ],
        },
      ],
    },
    es: {
      slug: "flujo-de-edicion-de-video-para-agencias-miami",
      metadataTitle: "Edición Video para Agencias Guía",
      title: "Flujo de edición de video marca blanca para agencias en Miami",
      description:
        "Cómo las agencias de marketing externalizan la edición de video masiva con entregas estandarizadas y rondas de revisión.",
      eyebrow: "Flujo para Agencias",
      answer:
        "Establece carpetas organizadas en la nube, briefs detallados y rondas de retroalimentación estructuradas por correo o Slack.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen postproducción para agencias. Se enlaza como ejemplo publicado; nada publicado confirma términos idénticos para todo cliente.",
      },
      sections: [
        {
          heading: "¿Cómo debe organizar sus carpetas una agencia para entregar material a edición?",
          paragraphs: [
            "Una carpeta principal por proyecto, con las mismas subcarpetas siempre: archivos de cámara por cámara o ángulo, audio separado, recursos de marca, música, referencias y un brief. Conserva la estructura original de cada tarjeta en vez de aplanar todo en una sola lista, porque los nombres y los metadatos son los que permiten unir cada clip con su audio y su día de grabación.",
            "Los recursos de marca deben ir en vector o en archivos por capas, no como un logo copiado de un sitio web, y el brief debe nombrar cada entregable con su formato, duración, destino y nombre de archivo. Si se grabó en perfil log o con un look definido, incluye el modelo de cámara y la LUT. Como ejemplo de edición con material de agencia, mira el [proyecto Homeowners](/es/portafolio/homeowners), editado con material de 300 Bees, y su [caso de estudio](/es/casos-de-estudio/homeowners).",
          ],
        },
        {
          heading: "¿Cómo se mantienen bajo control las rondas de revisión en campañas de clientes?",
          paragraphs: [
            "Consolidando. Cada ronda debe ser una sola lista de notas, reunida entre todas las personas que opinan, con códigos de tiempo y una instrucción clara por nota. Los comentarios que llegan a pedazos desde varias personas suelen contradecirse, y cada contradicción cuesta otra pasada por la línea de tiempo.",
            "Acuerda antes de empezar cuántas rondas incluye el trabajo y quién da la aprobación final; en trabajos de agencia esa persona suele estar del lado de la agencia, así que los comentarios del cliente final pasan por un solo contacto. Una herramienta de revisión que fija cada comentario en un cuadro elimina notas como \"la parte cerca del final\". Marca cada ronda como versión — v1, v2, v3 — y guarda las exportaciones anteriores. Si una nota pide algo fuera del brief, dilo en ese momento.",
          ],
        },
      ],
    },
  },
  {
    id: "repurpose-longform-to-reels-guide",
    en: {
      slug: "how-to-repurpose-long-form-video-into-reels",
      metadataTitle: "Repurpose Video into Reels Guide",
      title: "How to repurpose long-form video podcasts into social Reels",
      description:
        "Step-by-step strategy for extracting high-hook moments from podcasts, webinars, and keynotes for Instagram Reels and Shorts.",
      eyebrow: "Content Repurposing",
      answer:
        "Identify emotional or high-value 30-60 second segments, reframe to 9:16 vertical, add animated captions, and craft a strong hook.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include vertical social video repurposing. Linked as a published example; nothing published confirms identical view counts across channels.",
      },
      sections: [
        {
          heading: "Which moments in a long video or podcast make good Reels?",
          paragraphs: [
            "Moments that make sense to someone who has not heard the rest of the episode. A clip works as a Reel when it holds one complete thought: a clear opinion, a surprising answer, a short story with its own ending, or a practical tip that can be used immediately. Anything that depends on \"as I said earlier\" will confuse a viewer arriving from a feed.",
            "The quickest way to find them is a transcript. Read it with a highlighter and mark every passage under about a minute that starts strong and ends cleanly, then watch only those. A strong opening line matters most, because the first seconds decide whether the viewer stays; sometimes the best clip starts in the middle of an answer. For food and hospitality shows, the [restaurant promo video editing page](/services/restaurant-promo-video-editing-miami) shows how kitchen moments and chef interviews become short pieces.",
          ],
        },
        {
          heading: "How is horizontal podcast footage reformatted for vertical screens?",
          paragraphs: [
            "Reframe each shot to 9:16 around the person speaking, with the face in the upper-middle of the frame and the eyes roughly a third of the way down. On a two-person conversation, cut between speakers rather than shrinking both into one tiny frame, which is unreadable on a phone. If the original was filmed wide enough, each speaker can be cropped from the same camera.",
            "Captions carry most of the message, since many people watch with the sound off. Place them in the central safe area, above the strip where the app shows its own text, and keep each line short enough to read at a glance. Add the episode or show name at the start or the end so the clip leads somewhere. Export at 1080x1920 from the original files, not from a compressed upload of the full episode, so the crop stays sharp.",
          ],
        },
      ],
    },
    es: {
      slug: "como-reutilizar-video-largo-en-reels",
      metadataTitle: "Reutilizar Video en Reels Guía",
      title: "Cómo reutilizar videos largos y podcasts en Reels y Shorts",
      description:
        "Estrategia paso a paso para extraer ganchos de valor en podcasts y seminarios web para publicar en Instagram Reels y Shorts.",
      eyebrow: "Reutilización de Contenido",
      answer:
        "Identifica momentos clave de 30 a 60 segundos, adapta el encuadre a 9:16 vertical, añade subtítulos dinámicos y un gancho inicial.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen adaptación de video vertical para redes. Se enlaza como ejemplo publicado; nada publicado confirma reproducciones idénticas en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué momentos de un video largo o un podcast sirven para Reels?",
          paragraphs: [
            "Los que se entienden sin haber escuchado el resto del episodio. Un clip funciona como Reel cuando contiene una idea completa: una opinión clara, una respuesta sorprendente, una historia corta con su propio final o un consejo práctico que se puede usar de inmediato. Todo lo que dependa de \"como dije antes\" confunde a quien llega desde el feed.",
            "La forma más rápida de encontrarlos es una transcripción. Léela con un resaltador y marca cada pasaje de menos de un minuto que empiece fuerte y termine limpio; después mira solo esos. La primera frase es lo que más pesa, porque los primeros segundos deciden si la persona se queda, y a veces el mejor clip empieza a mitad de una respuesta. Para programas de comida y hospitalidad, la página de [edición de video promocional para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami) muestra cómo una cocina y una entrevista se vuelven piezas cortas.",
            "Para restaurantes, también está el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
        {
          heading: "¿Cómo se adapta el material horizontal de un podcast a pantallas verticales?",
          paragraphs: [
            "Reencuadra cada toma a 9:16 alrededor de quien habla, con la cara en la parte media alta del cuadro y los ojos más o menos a un tercio desde arriba. En una conversación de dos personas, corta entre ellas en lugar de meter a ambas en un cuadro diminuto, que en el teléfono no se lee. Si el original se grabó lo bastante abierto, cada persona puede recortarse de la misma cámara.",
            "Los subtítulos llevan buena parte del mensaje, porque mucha gente mira sin sonido. Colócalos en la zona segura central, por encima de la franja donde la aplicación muestra su propio texto, con líneas cortas que se lean de un vistazo. Agrega el nombre del programa al inicio o al final para que el clip lleve a algún lado, y exporta en 1080x1920 desde los archivos originales.",
            "Para negocios que publican seguido, revisa [reels para negocios en Miami](/es/reels-para-negocios-miami).",
          ],
        },
      ],
    },
  },
  {
    id: "fort-lauderdale-video-cost-guide",
    en: {
      slug: "video-production-cost-fort-lauderdale",
      metadataTitle: "Fort Lauderdale Video Editing Costs",
      title: "How much does video editing cost in Fort Lauderdale for small business reels?",
      description:
        "Compare Fort Lauderdale video editors and production studios for social media reels. Review published rates, deliverables, footage requirements, and workflows.",
      eyebrow: "Budgeting / Fort Lauderdale",
      answer:
        "For small businesses in Fort Lauderdale hiring video editors for social media videos and Instagram Reels, dedicated remote editing packages start from $100 per project or $640 monthly, whereas full on-location commercial production days start from $800 to $2,500.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published brand animation and commercial video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How should Fort Lauderdale businesses evaluate editors for reels?",
          paragraphs: [
            "Hiring a video editor for Instagram Reels, TikTok, and YouTube Shorts in Fort Lauderdale depends on whether your company already records internal footage or requires full on-location camera capture. For local restaurants, dealerships, retail shops, and professional firms that record video on smartphones or in-house cameras, hiring an editing-first specialist avoids the substantial overhead of commercial studio space.",
            "A qualified short-form video editor transforms raw footage into high-retention 9:16 vertical assets by crafting 3-second visual hooks, synchronizing rhythm to audio micro-beats, applying dynamic styled captions in safe zones, color grading footage, and adding sound design. Review how supplied agency assets were structured into finished client media in the [Homeowners real estate editing project](/portfolio/homeowners) (and the [Homeowners case study](/case-studies/homeowners)).",
          ],
          bullets: [
            "Editing-first workflow: You record raw clips on smartphone or camera; the editor handles pacing, hooks, captions, color, and audio mastering",
            "On-location production: The videographer brings cinema cameras, lighting, and audio gear to your physical business in Fort Lauderdale or Broward",
            "Monthly social cadence: Predictable batch turnaround of 4 to 16 reels per month with structured revision cycles",
          ],
        },
        {
          heading: "How do freelance editors and production agencies compare?",
          paragraphs: [
            "When small businesses compare local video editing and production providers in Fort Lauderdale, options range between freelance marketplaces, specialized boutique editors, and full-service commercial production agencies.",
            "Freelance platforms (like Thumbtack, Upwork, or Bark) provide wide directory listings of individual freelancers charging $50 to $150 per hour or per-clip rates, though quality consistency, turnaround discipline, and bilingual fluency vary widely. Traditional full-service video production companies in Broward County focus primarily on multi-person commercial film crews with day rates spanning $2,000 to $10,000+, which can be excessive when a business only needs consistent weekly social reels.",
          ],
          bullets: [
            "Freelance marketplaces: Variable quality and communication; useful for one-off tasks with low strategic requirements",
            "Full-service production agencies: Built for high-budget broadcast commercials ($2,500-$10,000+ per shoot day)",
          ],
        },
        {
          heading: "What are Esteban’s package starting prices?",
          paragraphs: [
            "Esteban Moreno Media provides a focused, editing-led model based in Fort Lauderdale. With remote editing packages starting from $100 per project ([Starter package](/pricing/starter)) and ongoing monthly content management starting from $640/month ([Growth package](/pricing/growth)), small businesses get dedicated bilingual editing, sound design, and vertical formatting without studio markups. When physical filming is required, local production days start from $800 ([Local Presence package](/pricing/local-presence)).",
            "Compare the named package with the work you actually need. Ask the written proposal to distinguish supplied footage, filming, editing, and final versions so that the starting price and the complete scope stay connected.",
          ],
          bullets: [
            "Editing-led boutique studio (Esteban Moreno Media): Clear starting packages ($100 project / $640 month), rapid turnaround, and bilingual English/Spanish delivery",
          ],
        },
        {
          heading: "What footage and assets should you send your editor for social reels?",
          paragraphs: [
            "To keep editing turnaround fast and avoid billing disputes, Fort Lauderdale business owners should prepare a simple handoff folder before post-production begins.",
            "Upload uncompressed raw video files (4K 24fps or 30fps recorded on iPhone ProRes or mirrorless cameras) via Google Drive, Dropbox, or MASV. Include separate audio tracks if recorded with wireless lavaliers, brand logo files with transparent backgrounds, font names or brand guidelines, and 1 to 2 reference links showing the pacing or editing style you desire. For detailed handoff preparation, explore our guide on [how to prepare footage for video editing](/guides/prepare-footage-for-video-editing) or check our [fastest way to send large video files guide](/guides/fastest-way-to-send-large-video-files-to-editor).",
          ],
          bullets: [
            "Raw uncompressed footage: 4K 24/30/60fps files without in-app filters or heavy compression",
            "Visual assets: Vector logos (.PNG or .SVG), brand color codes, and approved typography",
            "Clear creative brief: Target audience, main benefit, must-include dialogue, and call-to-action",
            "Platform destinations: Vertical 9:16 for Reels/TikTok/Shorts, or 16:9 widescreen for YouTube/Web",
          ],
        },
        {
          heading: "Which deliverables, revisions, and timing should you agree on?",
          paragraphs: [
            "A dependable editing engagement defines exact deliverable formats, aspect ratios, and revision parameters upfront so there are no unexpected surcharges.",
            "Standard social reel deliverables include full-resolution 1080x1920 MP4 files optimized for Instagram and TikTok compression, burned-in styled subtitles placed above platform UI safe zones, and master audio mixed to web standards (-14 LUFS). Package scopes include one consolidated round of timeline revisions to fine-tune pacing, text callouts, and music selection. For businesses ready to plan their next video project, get started through our [contact](/contact) page, browse our full [video services](/services), or review our dedicated [short-form video editing services](/services/short-form-video-editor-miami).",
          ],
          bullets: [
            "Clean export files: 1080x1920 H.264/MP4 files color-graded and ready for direct mobile publishing",
            "Safe-zone compliance: Captions and graphics positioned away from Instagram and TikTok interface overlays",
            "Structured revisions: Frame-accurate feedback incorporated in one comprehensive review cycle",
          ],
        },
      ],
      faqs: [
        {
          question: "How much does it cost to hire a video editor in Fort Lauderdale for social media reels?",
          answer:
            "Remote editing for single social media reels starts from $100 per project (Starter package), while ongoing monthly editing packages start from $640 per month (Growth package). On-location filming with post-production starts from $800 per production day.",
        },
        {
          question: "What is the difference between hiring a freelance editor and a full video production company?",
          answer:
            "Freelance marketplaces offer low-cost individual editors but require you to manage quality and workflow directly. Full production companies provide multi-person filming crews with day rates from $2,000 to $10,000+. Esteban Moreno Media offers an agile middle tier: direct, bilingual editing and social planning starting from $100 to $640, with selective on-location capture available in Fort Lauderdale.",
        },
        {
          question: "What files should a Fort Lauderdale business send to an editor for social media reels?",
          answer:
            "Send raw uncompressed video files, separate audio tracks if recorded, high-resolution logos, approved brand fonts/colors, a brief explaining the goal, and reference links of desired editing styles.",
        },
        {
          question: "Can Esteban edit video in both English and Spanish for South Florida audiences?",
          answer:
            "Yes. Esteban Moreno Media provides bilingual editing support, crafting dynamic captions and pacing in both English and Spanish to engage South Florida's diverse demographic.",
        },
      ],
    },
    es: {
      slug: "cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
      metadataTitle: "Edición Video Ft Lauderdale Costos",
      title: "¿Cuánto cuesta la edición de video en Fort Lauderdale para reels de pequeños negocios?",
      description:
        "Compara opciones de edición de video y productoras en Fort Lauderdale para reels de Instagram y TikTok. Conoce tarifas publicadas, entregables y flujos de trabajo.",
      eyebrow: "Presupuesto / Fort Lauderdale",
      answer:
        "Para pequeños negocios en Fort Lauderdale que buscan editores de video para redes sociales y reels de Instagram, los paquetes de edición remota parten desde $100 por proyecto o $640 al mes, mientras que las jornadas de producción en locación parten desde $800 a $2,500.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen edición y postproducción corporativa de marca. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo eliges un editor de reels en Fort Lauderdale?",
          paragraphs: [
            "Contratar un editor de video para Reels, TikTok y Shorts en Fort Lauderdale depende de si tu negocio ya graba material interno o necesita rodaje en locación. Para negocios locales que registran video con teléfono o cámaras propias, contratar un especialista en edición elimina altos costos de estudio.",
            "Un editor profesional transforma tomas en bruto en videos verticales 9:16 de alta retención con ganchos en los primeros 3 segundos, subtítulos en zonas seguras, color y sonido. Revisa cómo editamos tomas de agencia en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)). Para consultar el alcance directo con material existente, revisa nuestra página de [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale).",
          ],
          bullets: [
            "Flujo centrado en edición: Tú grabas los videos; el editor se encarga del ritmo, ganchos, subtítulos, color y audio",
            "Producción en locación: El videógrafo acude con equipo de cámara, iluminación y sonido a tu local en Fort Lauderdale o Broward",
            "Plan social mensual: Entregas constantes de 4 a 16 reels al mes con revisiones organizadas",
          ],
        },
        {
          heading: "¿Cómo se comparan los editores independientes y las productoras?",
          paragraphs: [
            "Al comparar proveedores de video en Fort Lauderdale, las opciones abarcan plataformas freelance, estudios boutique de edición y productoras tradicionales de cine publicitario.",
            "Las plataformas freelance (como Thumbtack, Upwork o Bark) ofrecen listados de editores independientes con tarifas de $50 a $150 por hora, aunque la consistencia de calidad y la comunicación bilingüe varían considerablemente. Las productoras tradicionales en Broward County cobran tarifas diarias de $2,000 a $10,000+ enfocadas en rodajes de gran escala, lo cual resulta innecesario para publicaciones semanales en redes.",
          ],
          bullets: [
            "Directorios freelance: Calidad variable y gestión directa requerida por el cliente al comparar propuestas y seleccionar al profesional",
            "Productoras comerciales tradicionales: Enfocadas en spots publicitarios de gran presupuesto ($2,500-$10,000+ por jornada)",
          ],
        },
        {
          heading: "¿Desde cuánto cuestan los paquetes de Esteban?",
          paragraphs: [
            "Esteban Moreno Media ofrece un modelo directo y ágil desde Fort Lauderdale. Con paquetes de edición remota desde $100 por proyecto ([paquete Arranque](/es/precios/arranque)) y planes mensuales desde $640 al mes ([paquete Crecimiento](/es/precios/crecimiento)), los negocios obtienen postproducción profesional, diseño sonoro y entregas bilingües sin costos de agencia. Para rodajes presenciales, las jornadas de producción parten desde $800 ([paquete Presencia Local](/es/precios/presencia-local)).",
            "Compara el paquete con el trabajo que realmente necesitas para tu negocio. Pide que la propuesta escrita distinga el material que ya tienes, la grabación, la edición y las versiones finales. Así puedes relacionar el precio inicial con el pedido completo antes de contratar.",
          ],
          bullets: [
            "Estudio de edición especializado (Esteban Moreno Media): Paquetes claros ($100 proyecto / $640 mes), entregas rápidas y atención bilingüe en español e inglés",
          ],
        },
        {
          heading: "¿Qué material debes entregar a tu editor para los reels?",
          paragraphs: [
            "Para asegurar entregas ágiles y evitar retrasos, los dueños de negocios en Fort Lauderdale deben organizar los archivos antes de iniciar la postproducción.",
            "Sube los videos originales sin compresión (grabados en 4K 24fps o 30fps) en carpetas de Google Drive, Dropbox o MASV. Incluye archivos de audio independientes si usaste micrófonos inalámbricos, logotipos con fondo transparente (.PNG o .SVG), tipografías de marca y 1 o 2 enlaces de referencia del estilo deseado. Para preparar tu entrega en detalle, consulta nuestra guía sobre [cómo preparar el material para un editor de video](/es/guias/preparar-material-para-edicion-de-video) o la guía de [cómo enviar archivos pesados de video para edición](/es/guias/como-enviar-archivos-pesados-de-video-para-edicion).",
          ],
          bullets: [
            "Videos en bruto sin compresión adicional: Archivos 4K a 24/30fps sin filtros aplicados",
            "Elementos visuales: Logotipos vectoriales, códigos de color y fuentes aprobadas",
            "Brief de objetivos claro: Audiencia objetivo, mensaje principal y llamado a la acción",
            "Formatos de destino: Vertical 9:16 para Reels/TikTok/Shorts u horizontal 16:9 para web y YouTube",
          ],
        },
        {
          heading: "¿Qué entregables, revisiones y fechas debes acordar?",
          paragraphs: [
            "Un servicio de edición confiable define los entregables, formatos de archivo y rondas de revisión desde el inicio para garantizar transparencia total.",
            "Los entregables estándar para redes sociales incluyen archivos MP4 en 1080x1920 optimizados para compresión de Instagram y TikTok, subtítulos estilizados dentro de las zonas seguras de la interfaz y audio masterizado a estándares web (-14 LUFS). Los paquetes incluyen una ronda consolidada de revisiones para ajustar ritmo, textos y música. Para planificar tu próximo proyecto, contáctanos a través de nuestra página de [contacto](/es/contacto), explora la visión general de [servicios](/es/servicios) o revisa nuestros [servicios de edición de video corto para redes en Miami](/es/editor-de-video-corto-para-redes-miami).",
          ],
          bullets: [
            "Archivos finales listos para publicar: Formato 1080x1920 MP4 con color corregido",
            "Respeto a zonas seguras: Subtítulos y gráficos situados fuera de los botones de la interfaz móvil",
            "Ronda de revisión estructurada: Comentarios sobre la línea de tiempo consolidados en una sola entrega",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Cuánto cuesta contratar un editor de video en Fort Lauderdale para reels y redes sociales?",
          answer:
            "La edición remota de videos individuales para redes sociales parte desde $100 por proyecto (paquete Arranque), mientras que los planes mensuales de contenido parten desde $640 al mes (paquete Crecimiento). Las grabaciones en locación con edición incluida parten desde $800 por día de producción.",
        },
        {
          question: "¿Cuál es la diferencia entre contratar un freelancer y una productora de video?",
          answer:
            "Las plataformas freelance ofrecen editores independientes pero exigen supervisar la calidad directamente. Las productoras tradicionales proveen equipos de filmación completos con costos de $2,000 a $10,000+. Esteban Moreno Media ofrece un punto medio ágil: edición directa, profesional y bilingüe desde $100 a $640, con opción de grabación selectiva en Fort Lauderdale.",
        },
        {
          question: "¿Qué archivos debe enviar un negocio de Fort Lauderdale a su editor de video?",
          answer:
            "Envía videos originales sin compresión, pistas de audio separadas, logotipos en alta resolución, fuentes y colores de marca, un brief con el objetivo del video y enlaces de referencia.",
        },
        {
          question: "¿Esteban realiza edición de video en español e inglés?",
          answer:
            "Sí. Esteban Moreno Media ofrece atención y edición bilingüe completa, estructurando subtítulos, narrativa y ritmo tanto en español como en inglés para el mercado de South Florida.",
        },
      ],
    },
  },
  {
    id: "script-social-ads-guide",
    en: {
      slug: "how-to-script-social-video-ads",
      metadataTitle: "How to Script Social Video Ads",
      title: "How to script high-converting social video ads",
      description:
        "Learn how to structure 15-to-30-second vertical video scripts with visual hooks, problem-solving, and strong calls to action.",
      eyebrow: "Scriptwriting / Social Ads",
      answer:
        "Start with a 3-second visual or verbal hook, state the core value proposition, demonstrate proof, and end with a clear CTA.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include published brand video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "What makes the first three seconds of a social ad work?",
          paragraphs: [
            "The first seconds have one job: give the viewer a reason not to scroll. That reason can be movement, a surprising image, or a sentence that names a problem the viewer already has. What it cannot be is a logo, a slow fade-in, or a greeting, because none of those tells the viewer why this video is for them.",
            "Write the opening line before the rest of the script and test it out loud: if it only makes sense after the second sentence, it is not an opening. Show the product or the result in the same moment the line is spoken, so sound-off viewers get the point from the picture. For hospitality, the [restaurant promo video editing page](/services/restaurant-promo-video-editing-miami) shows how dish and kitchen shots carry an opening without narration. Keep a few alternative first lines; swapping only the hook is the cheapest test an ad can run.",
          ],
        },
        {
          heading: "How should the rest of a short ad script be structured?",
          paragraphs: [
            "After the hook, a short ad usually needs three beats: what the offer is, why it is believable, and what to do next. Each beat should be one or two sentences, written the way people speak, and matched to a shot that shows it. A script that describes things the camera never shows leaves the editor filling the gap with generic footage.",
            "The believable part is where most scripts go wrong. A real detail — a named dish, the actual room, the person who does the work — persuades more than a superlative, and it does not promise anything the business cannot back up. End with one action stated plainly, such as booking, calling or visiting, and put it on screen as text as well as in the voice. Read the full script against a timer: if it runs long, cut a beat rather than speeding up the delivery. For on-location example work, see [Healthy Smile Miami](/portfolio/healthy-smile).",
          ],
        },
      ],
    },
    es: {
      slug: "como-escribir-guiones-para-anuncios-de-video",
      metadataTitle: "Guiones Anuncios Video Social",
      title: "Cómo escribir guiones de anuncios en video para redes sociales",
      description:
        "Aprende a estructurar guiones de video vertical de 15 a 30 segundos con ganchos iniciales y llamadas a la acción.",
      eyebrow: "Guiones / Anuncios Sociales",
      answer:
        "Comienza con un gancho de 3 segundos, presenta el beneficio principal, muestra prueba visual y concluye con un llamado claro.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen edición publicitaria. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué hace que funcionen los primeros tres segundos de un anuncio en redes?",
          paragraphs: [
            "Los primeros segundos tienen una sola tarea: darle a la persona una razón para no seguir de largo. Esa razón puede ser movimiento, una imagen sorprendente o una frase que nombre un problema que ya tiene. Lo que no puede ser es un logo, un fundido lento o un saludo, porque nada de eso le dice por qué el video es para ella.",
            "Escribe la frase inicial antes que el resto del guion y pruébala en voz alta: si solo se entiende después de la segunda oración, no es una apertura. Muestra el producto o el resultado en el mismo momento en que se dice la frase, para que quien mira sin sonido entienda por la imagen. Para hospitalidad, la página de [edición de video promocional para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami) muestra cómo los platos y la cocina sostienen una apertura sin narración. Ten varias primeras frases alternativas: cambiar solo el gancho es la prueba más barata.",
            "Para locales de comida, revisa también el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
        {
          heading: "¿Cómo se estructura el resto del guion de un anuncio corto?",
          paragraphs: [
            "Después del gancho, un anuncio corto suele necesitar tres momentos: cuál es la oferta, por qué es creíble y qué hacer después. Cada momento debe ser una o dos oraciones, escritas como habla la gente, y unidas a una toma que lo muestre. Un guion que describe cosas que la cámara nunca enseña obliga al editor a rellenar con material genérico.",
            "La parte creíble es donde más fallan los guiones. Un detalle real — un plato con nombre, el lugar de verdad, la persona que hace el trabajo — convence más que un superlativo y no promete nada que el negocio no pueda respaldar. Cierra con una sola acción dicha con claridad, como reservar, llamar o visitar, y ponla también en pantalla como texto. Lee el guion completo con cronómetro: si se pasa, quita un momento en vez de hablar más rápido. Como ejemplo de trabajo en locación, mira [Healthy Smile Miami](/es/portafolio/healthy-smile).",
          ],
        },
      ],
    },
  },
  {
    id: "interview-lighting-audio-guide",
    en: {
      slug: "lighting-setup-for-video-interviews-at-home",
      metadataTitle: "Home Video Interview Setup",
      title: "Lighting and microphone setup for home video interviews",
      description:
        "Practical guide to positioning soft key lights, clip-on lavalier mics, and background depth for executive home video interviews.",
      eyebrow: "Production / Home Interviews",
      answer:
        "Position key light 45 degrees to one side, place lavalier mic 6 inches from chin, and sit 5 feet away from the back wall.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published interview video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Where should the microphone go for clear interview dialogue?",
          paragraphs: [
            "Close to the mouth and away from anything that moves. A lavalier clipped to the shirt or jacket about a hand's width below the chin picks up the voice strongly and the room weakly, which is exactly the balance an editor needs. Run the cable under the clothing and tape a small loop near the clip so the microphone does not tug or rub when the person shifts; rustle is the most common lavalier problem and it cannot be filtered out cleanly.",
            "If a lavalier is not available, a directional microphone just outside the frame and pointed at the mouth is the next best option, far better than the camera's own microphone across the room. Record a test sentence at the level the person will actually speak, play it back on headphones, and check for hum, rustle and echo before the real interview starts. On location, see how a clinic setting was handled in [Healthy Smile Miami](/portfolio/healthy-smile), filmed with video and sound by Esteban.",
          ],
        },
        {
          heading: "How do you light an interview at home without special equipment?",
          paragraphs: [
            "Use the biggest soft light you have, which is usually a window. Place the person so the window is in front of them and slightly to one side, never behind them, and turn off overhead lights that put shadows under the eyes and mix colours. A plain lamp on the other side, bounced off a white wall, can fill in the darker half of the face.",
            "Keep the background simple and a little darker than the face, so the eye goes to the speaker. Avoid mixing daylight with warm bulbs in the same shot, because no single colour setting can make both look right. Sit the camera at eye level, a little above if anything, and frame with some space above the head. Record a few seconds of the empty room with nobody speaking; that room tone lets the editor smooth over cuts without a sudden change in background sound.",
          ],
        },
      ],
    },
    es: {
      slug: "iluminacion-y-configuracion-para-entrevistas-de-video",
      metadataTitle: "Iluminación Entrevistas Video",
      title: "Configuración de iluminación y audio para entrevistas virtuales",
      description:
        "Guía práctica de iluminación suave, micrófonos de solapa y fondo para entrevistas ejecutivas grabadas en oficina.",
      eyebrow: "Producción / Entrevistas en Casa",
      answer:
        "Ubica la luz principal a 45 grados, coloca el micrófono a 15 cm de la barbilla y mantén distancia con la pared trasera.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen edición de entrevistas. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Dónde se coloca el micrófono para un diálogo claro en una entrevista?",
          paragraphs: [
            "Cerca de la boca y lejos de todo lo que se mueve. Un micrófono de solapa sujeto a la camisa o la chaqueta, más o menos a una mano por debajo de la barbilla, capta la voz con fuerza y el cuarto con poca, que es justo el equilibrio que necesita un editor. Pasa el cable por debajo de la ropa y deja un pequeño bucle con cinta cerca del clip para que el micrófono no se jale ni roce cuando la persona se mueve; el roce es el problema más común y no se limpia bien después.",
            "Si no hay micrófono de solapa, uno direccional justo fuera del cuadro y apuntando a la boca es la siguiente opción, muy superior al micrófono de la cámara al otro lado del cuarto. Graba una frase de prueba al volumen real, escúchala con audífonos y revisa zumbidos, roces y eco antes de empezar. Como ejemplo en locación, mira [Healthy Smile Miami](/es/portafolio/healthy-smile), con video y sonido grabados por Esteban.",
          ],
        },
        {
          heading: "¿Cómo se ilumina una entrevista en casa sin equipo especial?",
          paragraphs: [
            "Con la luz suave más grande que tengas, que normalmente es una ventana. Ubica a la persona con la ventana delante y un poco a un lado, nunca detrás, y apaga las luces del techo que dejan sombras bajo los ojos y mezclan colores. Una lámpara sencilla al otro lado, rebotada en una pared blanca, puede aclarar la mitad más oscura de la cara.",
            "Mantén el fondo simple y un poco más oscuro que la cara, para que la mirada vaya a quien habla. Evita mezclar luz de día con bombillas cálidas en la misma toma, porque ningún ajuste de color hace que ambas se vean bien. Pon la cámara a la altura de los ojos, si acaso un poco más arriba, y deja algo de aire sobre la cabeza. Graba unos segundos del cuarto vacío y en silencio: ese tono de sala le permite al editor suavizar los cortes.",
          ],
        },
      ],
    },
  },
  {
    id: "caption-styles-reels-guide",
    en: {
      slug: "best-caption-styles-for-instagram-reels",
      metadataTitle: "Best Subtitle Styles for Reels",
      title: "Best caption styles and subtitle strategies for Reels",
      description:
        "Explore word-by-word highlighted captions, safe zone margins, and typographic styles for maximum social video engagement.",
      eyebrow: "Subtitles / Social Reels",
      answer:
        "Use high-contrast bold fonts centered in the safe zone with active word highlighting to keep viewers watching on mute.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include published caption video formatting. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How do you keep captions inside the safe zone?",
          paragraphs: [
            "Keep subtitles away from bottom Instagram UI buttons and top account headers to ensure full legibility. When formatting dynamic text for dining reels, [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) balances animated captions with mouth-watering food visuals.",
          ],
        },
        {
          heading: "How do you choose a caption style for the viewing context?",
          paragraphs: [
            "Reels, Shorts, and TikTok clips are often watched without sound, but the right subtitle treatment depends on how much the viewer needs to understand. Talking-head clips usually need clean sentence captions; food, product, and event reels often work better with short emphasis words that support the visuals instead of repeating every frame.",
            "For a business account, keep one recognizable type style for recurring content, then adjust weight, placement, and animation speed by format. A menu reel, founder tip, customer walkthrough, and service explanation can share a brand look without using the same caption rhythm.",
          ],
          bullets: [
            "Use full sentence captions when spoken information carries the message",
            "Use short emphasis captions when visuals already explain the action",
            "Keep type weight heavy enough to read on a bright phone screen",
            "Avoid placing animated words over faces, products, or food texture",
          ],
        },
        {
          heading: "How do you balance word highlighting with readability?",
          paragraphs: [
            "Word-by-word highlighting can help pacing, but too much movement makes a useful video feel noisy. Highlight only the word or phrase that changes the meaning, and keep the rest of the line stable enough for a muted viewer to follow.",
            "Before publishing, preview the captioned cut at phone size and check the first three seconds, the strongest visual moment, and the final action line. Those moments decide whether the caption style supports the video or competes with it.",
          ],
          bullets: [
            "Limit active highlighting to one short phrase at a time",
            "Keep line breaks natural so viewers do not reread the same idea",
            "Check contrast against both light and dark shots",
            "Save editable text layers when versions need different platforms",
          ],
        },
      ],
      faqs: [
        {
          question: "What caption style works best for Instagram Reels?",
          answer:
            "The best caption style is high contrast, easy to read at phone size, and matched to the video type. Talking-head clips usually need full sentence subtitles, while product, food, and event reels can use shorter emphasis captions.",
        },
        {
          question: "Should every word be highlighted in a Reel caption?",
          answer:
            "No. Highlight only the word or phrase that helps the viewer follow the idea. Constant movement can reduce readability, especially when the video already has fast motion or detailed visuals.",
        },
        {
          question: "Where should captions be placed on vertical video?",
          answer:
            "Keep captions inside the central safe area so platform buttons, account labels, and crop behavior do not cover important words. Always preview the edit on the platform or phone layout before publishing.",
        },
      ],
    },
    es: {
      slug: "mejores-estilos-de-subtitulos-para-reels",
      metadataTitle: "Mejores Subtítulos para Reels",
      title: "Mejores estilos de subtítulos y textos para Reels y Shorts",
      description:
        "Descubre tipografías de alto contraste, zonas seguras y resaltado de palabras clave para videos verticales en redes.",
      eyebrow: "Subtítulos / Reels Sociales",
      answer:
        "Utiliza fuentes en negrita de alto contraste dentro de la zona segura con resaltado de palabras clave para reproducción sin sonido.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen edición de subtítulos. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo se mantienen los subtítulos dentro de la zona segura?",
          paragraphs: [
            "Evita colocar texto sobre los botones inferiores de Instagram o el encabezado superior para garantizar lectura completa. Mantener los textos en la zona central es indispensable en [reels para negocios en Miami](/es/reels-para-negocios-miami) y [video para restaurantes en Miami](/es/video-para-restaurantes-miami) donde la mayoría de reproducciones ocurre en silencio. En reels gastronómicos, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) mantiene subtítulos limpios que no tapan los platos.",
          ],
        },
        {
          heading: "¿Cómo se elige el estilo según cómo se verá el video?",
          paragraphs: [
            "Reels, Shorts y TikToks muchas veces se ven sin sonido, pero el subtítulo correcto depende de cuánto necesita entender la persona. Un video hablado suele necesitar frases completas; un reel de comida, producto o evento puede funcionar mejor con palabras cortas de énfasis que acompañan la imagen.",
            "Para una cuenta de negocio, conviene mantener una línea visual reconocible y ajustar peso, ubicación y velocidad según el formato. Un plato, un consejo del fundador, un recorrido y una explicación de servicio pueden compartir estilo sin tener el mismo ritmo de texto.",
          ],
          bullets: [
            "Usa frases completas cuando la voz lleva el mensaje principal",
            "Usa textos cortos cuando la imagen ya explica la acción",
            "Mantén una tipografía suficientemente gruesa para leer en celular",
            "No pongas palabras animadas sobre rostros, productos o textura de comida",
          ],
        },
        {
          heading: "¿Cómo se resalta sin perder legibilidad?",
          paragraphs: [
            "El resaltado palabra por palabra puede ayudar al ritmo, pero demasiado movimiento vuelve confuso un video útil. Resalta solo la palabra o frase que cambia el sentido y deja el resto de la línea estable para que se pueda seguir sin sonido.",
            "Antes de publicar, revisa el corte con subtítulos en tamaño de celular: los primeros tres segundos, el momento visual más fuerte y la línea final de acción. Esos puntos muestran si el texto ayuda al video o compite con él.",
          ],
          bullets: [
            "Limita el resaltado activo a una frase corta por vez",
            "Corta las líneas de forma natural para no repetir la misma idea",
            "Prueba contraste sobre tomas claras y oscuras",
            "Guarda capas de texto editables cuando necesites versiones por plataforma",
          ],
        },
      ],
      faqs: [
        {
          question: "¿Qué estilo de subtítulos funciona mejor para Reels?",
          answer:
            "El mejor estilo es de alto contraste, legible en tamaño de celular y acorde al tipo de video. Los videos hablados suelen necesitar frases completas; los de producto, comida o evento pueden usar textos cortos de énfasis.",
        },
        {
          question: "¿Conviene resaltar cada palabra del subtítulo?",
          answer:
            "No. Resalta solo la palabra o frase que ayuda a seguir la idea. El movimiento constante puede reducir la lectura, sobre todo cuando el video ya tiene acción rápida o muchos detalles visuales.",
        },
        {
          question: "¿Dónde se colocan los subtítulos en video vertical?",
          answer:
            "Colócalos dentro de la zona central segura para que botones, nombres de cuenta y recortes de cada plataforma no cubran palabras importantes. Revisa siempre la vista en celular antes de publicar.",
        },
      ],
    },
  },
  {
    id: "transfer-large-video-files-guide",
    en: {
      slug: "fastest-way-to-send-large-video-files-to-editor",
      metadataTitle: "Fastest Way to Send Large Video Files",
      title: "Fastest ways to transfer raw 4K video files to remote editors",
      description:
        "Learn the fastest ways to transfer raw 4K video footage and multi-gigabyte project archives to a remote video editor using cloud tools, proxies, and checksum verification.",
      eyebrow: "Workflow / File Transfer",
      answer:
        "The fastest way to send large video files to an editor depends on total volume: use high-speed cloud sync (MASV, Google Drive, Dropbox, or Frame.io) for folders under 100 GB, generate lightweight editing proxies (1080p ProRes Proxy or DNxHR) for multi-camera 4K shoots, and ship an encrypted NVMe SSD for multi-terabyte production archives.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved portfolio credits include published remote video post-production. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Why is upload speed the real limit when sending large video files?",
          paragraphs: [
            "Transferring large video files to a remote video editor without multi-day upload delays requires matching your transfer method to total project data volume and actual internet connection speeds. Modern digital cinema and mirrorless cameras capture substantial bitrates: standard 4K 10-bit Apple ProRes 422 HQ generates approximately 110 GB per hour of recorded footage, Sony XAVC-I reaches 240 to 600 Mbps, and raw formats like Canon Cinema RAW Light or REDCODE RAW can easily generate 500 GB to over 1 TB across a single multi-camera commercial shoot.",
            "Internet speed bottlenecks usually occur on the upload side. While commercial facilities may have symmetrical 1 Gbps fiber connections (capable of transferring 100 GB in roughly 15 to 20 minutes), typical office and residential broadband operates on asymmetric cable connections offering 300 to 500 Mbps download but only 20 to 35 Mbps upload. At 30 Mbps upload, a 150 GB raw footage folder requires over 11 hours of uninterrupted bandwidth, making unoptimized uploads a common project bottleneck.",
          ],
        },
        {
          heading: "Which transfer method fits each project size?",
          paragraphs: [
            "For packages under 100 GB, dedicated cloud transfer platforms like MASV offer browser-based accelerated UDP protocols that utilize your full available bandwidth without requiring complex client software installations. For ongoing collaborative post-production, established shared folders in Google Drive or Dropbox Business allow background folder synchronization. For an example of a streamlined remote post-production workflow handling supplied agency assets, review the [Homeowners real estate editing project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)). When working on fast-paced social edits, explore our [short-form video editing services](/services/short-form-video-editor-miami) and general [post-production services](/services), or get in touch through our [contact](/contact) page to discuss project scope.",
            "When total raw project archives run to hundreds of gigabytes or more on a connection with slow upload speed, handing over a physical drive is often faster than any online transfer. Copying to an external SSD and shipping the encrypted drive by overnight courier gives a more predictable arrival time than an upload that can stall for hours.",
          ],
          bullets: [
            "MASV: browser-based accelerated UDP transfer with no file size limits, ideal for one-off large footage drops",
            "Google Drive / Dropbox: reliable background desktop sync for folders under 100 GB across recurring teams",
            "Frame.io: seamless proxy upload, version comparison, and direct timeline integration in DaVinci Resolve and Premiere Pro",
            "Physical NVMe SSD courier: the fastest and most dependable method for multi-terabyte raw cinema camera archives",
          ],
        },
        {
          heading: "What is a proxy file and why does it help remote editing?",
          paragraphs: [
            "The industry-standard solution for editing high-resolution 4K and 6K productions remotely without moving hundreds of gigabytes across the internet is the offline/online proxy workflow. Instead of uploading bulky raw camera masters, the on-set production team generates lightweight, edit-friendly proxy files locally before uploading.",
            "A proxy file is a low-bitrate duplicate of the raw footage encoded in an efficient intra-frame codec, such as Apple ProRes Proxy on macOS or Avid DNxHR LB cross-platform. Generating 1080p proxies produces a far lighter set of files that transfers in a fraction of the time, while strictly preserving original camera timecode, frame rate, reel names, clip file names, and multi-channel audio tracks, so the edit relinks cleanly to the originals at the end.",
          ],
        },
        {
          heading: "How does a proxy workflow move from offline edit to final master?",
          paragraphs: [
            "Under this workflow, a 200 GB raw camera shoot compresses to approximately 15 to 25 GB of clean proxy media, which uploads in minutes rather than hours. The remote video editor performs all narrative assembly, multi-camera audio sync, pacing cuts, title animations, and sound design using the proxies. Once the edit is approved and picture locked, the editor sends back a lightweight project file (such as a DaVinci Resolve Project DRP, Adobe Premiere Pro PRPROJ, or standard XML/EDL). The local producer then relinks the timeline back to the original raw 4K masters on their local drive for final color grading and high-resolution master export.",
          ],
          bullets: [
            "ProRes Proxy / DNxHR LB: lightweight intra-frame codecs that playback smoothly on any editing laptop or workstation",
            "Preserve exact metadata: maintain identical file names, start/end timecode, and audio channel configurations",
            "Offline edit: editor cuts the story rapidly on lightweight proxies without dropped frames or storage bloat",
            "Online relink: reconnect project XML/DRP to local camera raw masters for color grading and final 4K master delivery",
          ],
        },
        {
          heading: "Which folder hierarchy should footage follow before upload?",
          paragraphs: [
            "Organizing assets into an unambiguous folder structure before uploading eliminates missing file errors, relinking failures, and confusion over which takes are current. Never dump loose video clips, voice memos, and graphics into a single root folder.",
            "A professional folder architecture organizes source material logically from day one: `01_Footage` (subdivided by camera angle `Cam_A`, `Cam_B`, or date/card number), `02_Audio` (separate 24-bit 48kHz WAV multi-track microphone stems, boom recordings, and lavaliers), `03_Assets` (vector SVG/AI logos, brand guideline PDFs, approved graphics, and fonts), and `04_Briefs` (project summary, platform specifications, and target delivery dates).",
          ],
        },
        {
          heading: "Why avoid one giant zip file, and how do checksums help?",
          paragraphs: [
            "Avoid archiving large multi-gigabyte folder trees into a single massive .zip file. If a single byte drops or connection drops during download of a 50 GB .zip file, the entire archive often fails extraction and corrupts. Instead, upload structured folders directly using desktop sync applications or specialized transfer tools. Before clearing camera memory cards, verify transfers using checksum utilities (such as ShotPut Pro, Silverstack, or command-line `shasum -a 256`) to ensure the copied files match the source media byte for byte.",
          ],
          bullets: [
            "01_Footage: organized strictly by camera card or shooting date without renaming source clip file extensions",
            "02_Audio: dedicated folder for synced sound, field recorder WAV files, and external microphone tracks",
            "03_Assets: brand vectors, typography fonts, static reference visuals, and approved logo lockups",
            "04_Briefs: scope document, platform delivery requirements, and must-use timestamp references",
            "Checksum verification: generate MD5 or xxHash manifests before reformatting camera cards",
          ],
        },
        {
          heading: "Which technical metadata belongs in the handoff document?",
          paragraphs: [
            "Alongside the media files, include a concise project handoff document summarizing key technical metadata. Note the recorded frame rates (e.g., 23.976 fps base dialogue vs 59.94 fps high-frame-rate b-roll intended for smooth slow motion) and camera color science profiles (such as Sony S-Log3, Canon C-Log3, Apple Log, or standard Rec.709).",
            "This technical clarity enables the editor to establish accurate color management color spaces (such as DaVinci Wide Gamut or ACEScc) from the beginning of the project, avoiding unwanted color shifts during grading. Clear preparation ensures a seamless remote collaboration and keeps the focus entirely on storytelling, pacing, and visual impact.",
            "Whether you need recurring social media batch editing, YouTube post-production, or commercial video cutting, clear file handoff is the foundation of high-velocity creative production. Reach out via our [contact](/contact) page to review file transfer requirements for your upcoming production.",
          ],
        },
      ],
      faqs: [
        {
          question: "What is the fastest cloud service for sending large 4K video files?",
          answer:
            "MASV and Frame.io offer the fastest upload speeds for multi-gigabyte video packages using accelerated transfer protocols that maximize available internet bandwidth without file size caps.",
        },
        {
          question: "How do editing proxies speed up remote video file transfers?",
          answer:
            "Proxies compress bulky raw camera files into lightweight editing formats, cutting upload size substantially while preserving original timecodes and audio channels so the finished edit relinks to the originals.",
        },
        {
          question: "Should video files be zipped before uploading to cloud storage?",
          answer:
            "No, large monolithic zip files frequently corrupt during network interruptions. Upload structured folder directories directly using dedicated cloud desktop apps or accelerated transfer platforms.",
        },
        {
          question: "When is shipping a physical hard drive faster than uploading online?",
          answer:
            "When raw camera footage exceeds 500 GB to 1 TB on standard asymmetric internet connections (with upload speeds below 40 Mbps), copying to a fast NVMe SSD and overnight shipping is faster and more reliable than days of cloud uploading.",
        },
        {
          question: "How does internet upload speed impact video handoff turnaround?",
          answer:
            "Asymmetric cable connections often provide only 20–35 Mbps upload, meaning a 100 GB file can take 8 to 12 hours to upload. Symmetrical gigabit fiber connections complete the same transfer in under 20 minutes.",
        },
        {
          question: "What folder structure do professional video editors prefer for raw footage?",
          answer:
            "Editors prefer organized directories separated into 01_Footage (by camera card/date), 02_Audio (separate WAV mic tracks), 03_Assets (logos, fonts, brand guidelines), and 04_Briefs (project scope and references).",
        },
      ],
    },
    es: {
      slug: "como-enviar-archivos-pesados-de-video-para-edicion",
      metadataTitle: "Cómo Enviar Archivos Grandes de Video",
      title: "Cómo enviar archivos de video pesados en 4K para edición remota",
      description:
        "Guía para transferir carpetas de video 4K mediante plataformas en la nube y archivos proxy para tu editor de video.",
      eyebrow: "Flujo / Transferencia de Archivos",
      answer:
        "Utiliza Google Drive, Frame.io o WeTransfer Pro con nombres de carpeta estructurados y proxies para una entrega fluida.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "Los créditos aprobados del portafolio incluyen posproducción remota. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo se organiza el material antes de subirlo?",
          paragraphs: [
            "Con una carpeta principal por proyecto y las mismas subcarpetas siempre: video por cámara o por día de grabación, audio aparte, recursos de marca y un brief. Conserva la estructura y los nombres originales de cada tarjeta de cámara; esos nombres y sus códigos de tiempo son los que permiten unir cada clip con su audio. Renombrar todo a mano o mezclar tarjetas en una sola carpeta es la causa más común de archivos que no se vuelven a enlazar.",
            "Antes de borrar o reformatear una tarjeta, comprueba que la copia esté completa. Un programa que genera sumas de verificación (checksums) compara cada archivo copiado con el original y avisa si alguno llegó dañado. Para revisar cómo se trabaja con material entregado por una agencia, consulta el [proyecto Homeowners](/es/portafolio/homeowners) y su [caso de estudio](/es/casos-de-estudio/homeowners).",
          ],
        },
        {
          heading: "¿Cuál es la forma más rápida de enviar archivos de video pesados a un editor?",
          paragraphs: [
            "Depende del volumen total y de tu velocidad de subida, que en muchas conexiones domésticas es bastante menor que la de bajada. Para carpetas moderadas, un servicio de transferencia en la nube o una carpeta compartida (Google Drive, Dropbox, Frame.io o WeTransfer Pro) funciona bien: sube las carpetas tal como están, no un único archivo .zip gigante, porque si la conexión se corta a mitad hay que volver a empezar todo el envío.",
            "Cuando el material es muy pesado y la subida es lenta, dos opciones ahorran tiempo. La primera son los archivos proxy: copias livianas del material que permiten editar la historia y, al final, volver a enlazar con los originales para el color y la exportación final. La segunda es enviar un disco físico. En ambos casos, avisa al editor qué enviaste y por qué medio.",
          ],
        },
      ],
    },
  },
  {
    id: "bilingual-video-strategy-guide",
    en: {
      slug: "bilingual-video-marketing-strategy-south-florida",
      metadataTitle: "Bilingual Video Strategy SoFlo",
      title: "Why bilingual English & Spanish video content wins in South Florida",
      description:
        "Discover how dual-language captioning and mirrored video campaigns expand market reach across Miami, Broward, and Palm Beach.",
      eyebrow: "Strategy / Bilingual Marketing",
      answer:
        "Create mirrored English and Spanish landing pages and dual-captioned social reels to capture South Florida's diverse commercial market.",
      proof: {
        href: "/portfolio/banacol",
        title: "Banacol",
        description:
          "Approved portfolio credits include published international bilingual video production. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Why publish separate English and Spanish videos in South Florida?",
          paragraphs: [
            "Because people search, read captions and decide in the language they are most comfortable in, and in South Florida that is often Spanish. A Spanish-speaking customer who types a question in Spanish is matched to pages and videos in Spanish; an English-only video with Spanish subtitles added as an afterthought rarely reaches that search at all.",
            "Separate versions also let each audience get its own opening line, its own examples and its own call to action, instead of a compromise that fits neither. The practical rule is to publish each version as its own asset: its own title, description and captions in that language, and on a website its own page linked to the other. That is how search engines understand that two pages are translations of each other rather than duplicates, and how a viewer lands on the right one. Esteban works Spanish-first, so Spanish versions are written natively rather than translated word for word.",
          ],
        },
        {
          heading: "How do you produce two language versions without doubling the work?",
          paragraphs: [
            "Plan both at the shoot. If the speaker can deliver the key lines in each language, record both back to back with the same framing and light; if not, record in one language and build the other version with captions or a separate voice-over, decided before filming rather than after.",
            "Keep the visuals language-neutral where possible: product shots, the space, people at work, and on-screen text added in the edit rather than written on signs or slides. Then the same picture edit can carry two sets of captions and two end cards. Have someone fluent in each language read the captions before publishing, because automatic translation often gets local terms, prices and names wrong. Finally, track the two versions separately; whichever language responds better is information about your customers, not a reason to drop the other.",
          ],
        },
      ],
    },
    es: {
      slug: "estrategia-de-video-bilingue-south-florida",
      metadataTitle: "Estrategia Video Bilingüe Florida",
      title: "Por qué la estrategia de video bilingüe domina el mercado de South Florida",
      description:
        "Descubre cómo los subtítulos dobles y las campañas de video espejadas amplían el alcance comercial en South Florida.",
      eyebrow: "Estrategia / Marketing Bilingüe",
      answer:
        "Crea páginas de aterrizaje y reels de video en inglés y español para captar todo el mercado comercial de South Florida.",
      proof: {
        href: "/es/portafolio/banacol",
        title: "Banacol",
        description:
          "Los créditos aprobados del portafolio incluyen producción bilingüe internacional. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Por qué publicar videos separados en inglés y en español en South Florida?",
          paragraphs: [
            "Porque la gente busca, lee subtítulos y decide en el idioma en que se siente más cómoda, y en South Florida muchas veces ese idioma es el español. Quien escribe una pregunta en español recibe páginas y videos en español; un video solo en inglés con subtítulos agregados al final rara vez llega a esa búsqueda.",
            "Las versiones separadas también permiten que cada público tenga su propia frase inicial, sus propios ejemplos y su propia llamada a la acción, en vez de un punto medio que no le sirve a ninguno. La regla práctica es publicar cada versión como un recurso propio: título, descripción y subtítulos en ese idioma y, en un sitio web, su propia página enlazada con la otra. Así los buscadores entienden que son traducciones y no duplicados, y cada persona llega a la suya. Esteban trabaja primero en español, así que las versiones en español se escriben de origen y no se traducen palabra por palabra.",
          ],
        },
        {
          heading: "¿Cómo se hacen dos versiones de idioma sin duplicar el trabajo?",
          paragraphs: [
            "Planificándolas desde la grabación. Si quien habla puede decir las frases clave en ambos idiomas, grábalas una tras otra con el mismo encuadre y la misma luz; si no, graba en un idioma y arma la otra versión con subtítulos o una voz en off aparte, decidido antes de grabar y no después.",
            "Mantén las imágenes neutras en cuanto a idioma siempre que puedas: productos, el lugar, personas trabajando y textos agregados en la edición en lugar de escritos en carteles o diapositivas. Así un mismo montaje sirve para dos juegos de subtítulos y dos cierres. Pide que alguien con dominio de cada idioma lea los subtítulos antes de publicar, porque la traducción automática suele equivocarse con términos locales, precios y nombres. Y mide cada versión por separado: el idioma que mejor responde te dice algo de tus clientes.",
            "Para restaurantes con clientela en ambos idiomas, revisa el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
      ],
    },
  },
  {
    id: "video-aspect-ratios-guide",
    en: {
      slug: "video-aspect-ratios-cheat-sheet",
      metadataTitle: "Video Aspect Ratio Cheat Sheet",
      title: "Video aspect ratios and safe zones cheat sheet for social media",
      description:
        "Complete guide to 16:9 widescreen, 9:16 vertical, 1:1 square, and 4:5 vertical video dimensions for all platforms.",
      eyebrow: "Formatting / Aspect Ratios",
      answer:
        "Export 9:16 (1080x1920) for Reels/TikTok, 16:9 (1920x1080) for YouTube/Web, and 4:5 (1080x1350) for Instagram Feed posts.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include published multi-format video exports. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Which aspect ratio should each destination get?",
          paragraphs: [
            "Start from where the video will be watched. Full-screen vertical feeds — Reels, TikTok, YouTube Shorts and Stories — use 9:16, commonly exported at 1080x1920. A YouTube video, a website header or a presentation uses horizontal 16:9, commonly 1920x1080. Feed posts that sit between other posts often work better at 4:5, which takes up more of a phone screen than a square without being cropped.",
            "Exporting to the native shape matters because the platform otherwise decides for you: it crops a horizontal video into a vertical frame, or surrounds it with black or blurred bars, and either way the composition you approved is not what people see. If one shoot has to serve several destinations, list them before filming so the camera operator leaves room around the subject, and name each export with its ratio so the right file goes to the right place.",
          ],
        },
        {
          heading: "What is a safe zone, and how much of the frame should stay clear?",
          paragraphs: [
            "A safe zone is the part of the frame no app interface will cover. On vertical platforms the account name, caption, music line and buttons sit over the bottom of the video and along the right edge, so text placed there gets hidden behind them. Those overlays differ between apps and change with updates, which is why there is no single exact measurement that holds everywhere.",
            "The workable approach is to keep anything that must be read or seen — faces, product, prices, captions, a phone number — in the central part of the frame, with generous margins at the bottom and on the right. Check the final export in each app's own preview or a draft post before publishing; that is the only reliable test of what a viewer will actually see. On horizontal video, keep titles away from the very edges, where some players place controls.",
          ],
        },
      ],
    },
    es: {
      slug: "guia-de-relaciones-de-aspecto-de-video",
      metadataTitle: "Guía Relaciones Aspecto Video",
      title: "Guía de relaciones de aspecto y zonas seguras para redes sociales",
      description:
        "Guía completa de dimensiones de video 16:9 horizontal, 9:16 vertical, 1:1 cuadrado y 4:5 para todas las plataformas.",
      eyebrow: "Formato / Relaciones de Aspecto",
      answer:
        "Exporta 9:16 (1080x1920) para Reels/TikTok, 16:9 (1920x1080) para YouTube/Web y 4:5 (1080x1350) para publicaciones en feed.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen exportación multiformato. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué relación de aspecto conviene para cada destino?",
          paragraphs: [
            "Empieza por dónde se va a ver el video. Los feeds verticales a pantalla completa — Reels, TikTok, YouTube Shorts e Historias — usan 9:16, normalmente exportado en 1080x1920. Un video de YouTube, el encabezado de un sitio web o una presentación usan 16:9 horizontal, normalmente 1920x1080. Las publicaciones que aparecen entre otras en el feed suelen funcionar mejor en 4:5, que ocupa más pantalla que un cuadrado sin recortarse.",
            "Exportar en la forma nativa importa porque, si no, la plataforma decide por ti: recorta un video horizontal dentro de un cuadro vertical o lo rodea de barras negras o borrosas, y en ambos casos lo que aprobaste no es lo que la gente ve. Si una sola grabación debe servir a varios destinos, haz la lista antes de grabar para que quien filma deje espacio alrededor del sujeto, y nombra cada archivo con su formato.",
          ],
        },
        {
          heading: "¿Qué es una zona segura y cuánto del cuadro conviene dejar libre?",
          paragraphs: [
            "La zona segura es la parte del cuadro que ninguna interfaz va a tapar. En las plataformas verticales, el nombre de la cuenta, el texto, la línea de música y los botones van encima de la parte de abajo del video y a lo largo del borde derecho, así que un texto puesto ahí queda oculto. Esas capas cambian entre aplicaciones y con cada actualización, por eso no existe una medida exacta que sirva en todos lados.",
            "Lo práctico es mantener todo lo que se debe leer o ver — caras, producto, precios, subtítulos, un teléfono — en la parte central del cuadro, con márgenes amplios abajo y a la derecha. Revisa la exportación final en la vista previa de cada aplicación o en un borrador antes de publicar; es la única prueba confiable de lo que verá la gente. En video horizontal, aleja los títulos de los bordes, donde algunos reproductores ponen controles.",
          ],
        },
      ],
    },
  },
  {
    id: "color-grading-vs-correction-guide",
    en: {
      slug: "color-grading-vs-color-correction-guide",
      metadataTitle: "Color Grading vs Correction",
      title: "Color grading vs color correction: What is the difference?",
      description:
        "Understand technical color correction (white balance, exposure) vs creative color grading (stylized looks, LUTs, mood).",
      eyebrow: "Post-Production / Color",
      answer:
        "Color correction fixes exposure and white balance; color grading applies stylistic creative looks and emotional tones.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published color grading and post-production. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "What is the difference between color correction and color grading?",
          paragraphs: [
            "Correction makes the footage accurate; grading makes it look a particular way. Correction comes first and is technical: setting white balance so white things look white, bringing exposure to a sensible level, recovering detail in highlights and shadows, and matching clips from different cameras or different times of day so they cut together without a jump.",
            "Grading comes second and is a creative decision: warmer or cooler, more or less contrast, a muted or saturated palette, a look that suits the brand. Doing them in that order matters. A creative look or LUT applied to uncorrected footage amplifies whatever was wrong underneath — a blue cast becomes a stronger blue cast — and every clip ends up needing its own fix. Footage shot in a LOG or RAW profile looks flat on purpose and always needs the correction step before it resembles the scene.",
          ],
        },
        {
          heading: "What can you do during filming to make colour work easier?",
          paragraphs: [
            "Set white balance manually instead of leaving it on automatic, which shifts as the camera moves between windows and lamps and leaves the editor matching drifting colour clip by clip. Avoid mixing light sources of different colours on the same face; daylight from a window and warm bulbs overhead pull skin in two directions at once, and no setting fixes both.",
            "Expose for the skin and protect the brightest areas. A white shirt, a sky or a polished surface that is blown out to pure white has no detail left to recover. If you have several cameras, set them to the same profile, frame rate and white balance before the shoot, and film a few seconds of the same scene on all of them for reference. Tell the editor which profile was used and send any LUT supplied by the camera maker, so the correction starts from the right place.",
          ],
        },
      ],
    },
    es: {
      slug: "correccion-de-color-vs-colorimetria-guia",
      metadataTitle: "Colorimetría vs Corrección Color",
      title: "Corrección de color vs colorimetría creativa: ¿Cuál es la diferencia?",
      description:
        "Comprende la diferencia entre corrección de color técnica (balance de blancos) y colorimetría estilizada creativa.",
      eyebrow: "Posproducción / Color",
      answer:
        "La corrección de color ajusta exposición y balance; la colorimetría aporta estilo creativo y personalidad visual.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen corrección de color y posproducción. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cuál es la diferencia entre corrección de color y colorimetría?",
          paragraphs: [
            "La corrección hace que el material sea fiel; la colorimetría le da un aspecto concreto. La corrección va primero y es técnica: ajustar el balance de blancos para que lo blanco se vea blanco, llevar la exposición a un nivel razonable, recuperar detalle en luces y sombras, y igualar clips de distintas cámaras o distintas horas para que se corten sin saltos.",
            "La colorimetría va después y es una decisión creativa: más cálido o más frío, más o menos contraste, una paleta apagada o saturada, un aspecto que vaya con la marca. El orden importa. Un look o una LUT aplicados sobre material sin corregir amplifican lo que estaba mal debajo — un tono azul se vuelve más azul — y cada clip termina necesitando su propio arreglo. El material grabado en perfil LOG o RAW se ve plano a propósito y siempre necesita la corrección antes de parecerse a la escena.",
          ],
        },
        {
          heading: "¿Qué se puede hacer al grabar para facilitar el trabajo de color?",
          paragraphs: [
            "Ajusta el balance de blancos de forma manual en vez de dejarlo en automático, que cambia cuando la cámara pasa de una ventana a una lámpara y obliga al editor a igualar un color que se mueve clip por clip. Evita mezclar fuentes de luz de colores distintos sobre una misma cara: la luz de día de una ventana y las bombillas cálidas del techo tiran de la piel en dos direcciones y ningún ajuste corrige ambas.",
            "Expón para la piel y protege las zonas más brillantes. Una camisa blanca, un cielo o una superficie pulida que queda en blanco puro ya no tiene detalle que recuperar. Si hay varias cámaras, configúralas con el mismo perfil, la misma velocidad y el mismo balance antes de grabar, y filma unos segundos de la misma escena con todas como referencia. Dile al editor qué perfil usaste y envía la LUT del fabricante si la hay.",
          ],
        },
      ],
    },
  },
  {
    id: "mix-audio-social-video-guide",
    en: {
      slug: "how-to-mix-audio-for-social-video",
      metadataTitle: "How to Mix Audio for Social Video",
      title: "How to mix speech, music, and sound effects for social video",
      description:
        "Learn essential audio mixing techniques: ducking background music, mastering dialogue levels (-14 LUFS), and adding impact SFX.",
      eyebrow: "Audio / Post-Production",
      answer:
        "Set dialogue at -12dB to -6dB, duck music to -22dB under speech, and master final audio output to -14 LUFS for social platforms.",
      proof: {
        href: "/portfolio/healthy-smile",
        title: "Healthy Smile",
        description:
          "Approved portfolio credits include published audio dialogue mastering. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How do you keep music from burying speech in a social video?",
          paragraphs: [
            "By ducking: lowering the music every time someone speaks and letting it rise again in the pauses. Editing software can do this automatically from the dialogue track, but it is worth checking by ear, because automatic ducking can pump up and down awkwardly between short phrases. The goal is that every word is understood on a phone speaker, which is where most social video is heard and where low voices disappear first.",
            "Choose music that leaves room for a voice. Tracks with prominent vocals or busy melodies in the same range as speech compete with it no matter how far they are lowered, while instrumental tracks with a steady rhythm sit underneath more easily. Make sure the track is licensed for the platform and the use; music that is fine for a personal post can be blocked or muted on a business account. Listen to the final mix once on headphones and once on a phone before publishing.",
          ],
        },
        {
          heading: "Where do sound effects and natural sound fit in the mix?",
          paragraphs: [
            "Use them to support what the picture already shows, and sparingly. A sizzle on a grill, a door, a pour, the click of a product closing: short natural sounds make a cut feel real and help sound-on viewers notice the moment. Added effects such as whooshes on every transition quickly turn into noise and pull attention away from the message.",
            "Keep a clear order of importance in the mix. Speech comes first, then the sounds that carry meaning, then music as the bed underneath. Levels should be consistent from clip to clip, so a viewer is not reaching for the volume when the scene changes. Record a few seconds of room tone on location; it lets the editor fill gaps between cuts with the same background sound instead of silence. On location, see the clinic example in [Healthy Smile Miami](/portfolio/healthy-smile), recorded with video and sound by Esteban.",
          ],
        },
      ],
    },
    es: {
      slug: "como-mezclar-audio-para-videos-en-redes",
      metadataTitle: "Mezcla de Audio para Video Social",
      title: "Cómo mezclar voz, música y efectos de sonido para videos en redes",
      description:
        "Aprende técnicas esenciales de mezcla: atenuación de música de fondo (ducking), niveles de diálogo (-14 LUFS) y efectos SFX.",
      eyebrow: "Audio / Posproducción",
      answer:
        "Ajusta voces entre -12dB y -6dB, atenúa la música a -22dB bajo la voz y masteriza el resultado final a -14 LUFS para redes.",
      proof: {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile",
        description:
          "Los créditos aprobados del portafolio incluyen mezcla de audio. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo se evita que la música tape la voz en un video para redes?",
          paragraphs: [
            "Con ducking: bajando la música cada vez que alguien habla y dejándola subir en las pausas. Los programas de edición pueden hacerlo de forma automática a partir de la pista de diálogo, pero conviene revisarlo de oído, porque el ducking automático puede subir y bajar de forma torpe entre frases cortas. La meta es que cada palabra se entienda en el altavoz de un teléfono, que es donde se escucha la mayoría del video para redes y donde las voces bajas desaparecen primero.",
            "Elige música que deje espacio a la voz. Las canciones con letra o con melodías muy cargadas en el mismo rango que el habla compiten con ella aunque las bajes mucho; las instrumentales con ritmo constante se acomodan mejor debajo. Asegúrate de que la música tenga licencia para esa plataforma y ese uso, y escucha la mezcla final una vez con audífonos y otra en un teléfono.",
          ],
        },
        {
          heading: "¿Dónde encajan los efectos y el sonido natural en la mezcla?",
          paragraphs: [
            "Úsalos para reforzar lo que la imagen ya muestra, y con moderación. El chisporroteo de una parrilla, una puerta, algo que se sirve, el clic de un producto al cerrarse: los sonidos naturales cortos hacen que un corte se sienta real y ayudan a que quien tiene el sonido activado note el momento. Los efectos agregados, como un silbido en cada transición, se vuelven ruido rápidamente y distraen del mensaje.",
            "Mantén un orden claro en la mezcla. Primero la voz, luego los sonidos que llevan significado y después la música como base. Los niveles deben ser parejos de un clip a otro para que nadie tenga que tocar el volumen cuando cambia la escena. Graba unos segundos de tono de sala en el lugar; así el editor llena los huecos entre cortes con el mismo fondo y no con silencio. Como ejemplo en locación, mira [Healthy Smile Miami](/es/portafolio/healthy-smile).",
          ],
        },
      ],
    },
  },
  {
    id: "select-broll-corporate-guide",
    en: {
      slug: "how-to-select-broll-for-corporate-video",
      metadataTitle: "How to Select Corporate B-Roll",
      title: "How to select supporting B-roll footage for corporate videos",
      description:
        "Learn how to pair spoken interview points with context-relevant B-roll, movement shots, and workplace interactions.",
      eyebrow: "Editing / B-Roll Selection",
      answer:
        "Select B-roll that visually demonstrates what the speaker describes, alternating wide establishing shots with tight action cutaways.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published corporate B-roll integration. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How do you choose B-roll that supports what the speaker is saying?",
          paragraphs: [
            "Match each cutaway to a specific sentence. B-roll works when it shows the thing being described at the moment it is described: the warehouse when the speaker mentions shipping, the team at a whiteboard when they talk about planning, a customer at the counter when they talk about service. Generic shots of hands on keyboards or city skylines fill time without adding information, and viewers learn to ignore them.",
            "Cut to B-roll on a natural pause or the start of a phrase, and come back to the speaker for the sentence that carries the main point, so the audience sees who is making the claim. Build a shot list from the script before filming: underline every noun and action the speaker mentions and plan one or two shots for each. That list is what turns a talking-head recording into a corporate video that explains rather than simply records.",
          ],
        },
        {
          heading: "What B-roll should a company film so the editor has enough to work with?",
          paragraphs: [
            "More variety than seems necessary, in short, steady clips. For each location, film a wide shot that shows the whole space, a medium shot of people working, and several close details — hands, products, screens, tools, signage. Hold each shot still for around ten seconds; short clips with movement in the first and last second are difficult to use.",
            "Film people doing their real work rather than posing, and get permission from anyone who will be recognisable. Avoid screens showing confidential information and whiteboards with client names. Capture a few moments with movement through the space, such as a slow walk down a corridor or someone opening a door, which help the editor move between ideas. Label the folders by location and send a short note naming any shot that must not be used, so nothing sensitive reaches the final cut.",
          ],
        },
      ],
    },
    es: {
      slug: "como-seleccionar-broll-para-video-corporativo",
      metadataTitle: "Selección B-Roll Video Corporativo",
      title: "Cómo seleccionar tomas de apoyo B-roll para videos corporativos",
      description:
        "Aprende a combinar relatos de entrevistas con tomas de apoyo relevantes, movimiento e interacciones de equipo.",
      eyebrow: "Edición / Selección B-Roll",
      answer:
        "Elige tomas de apoyo que ilustren exactamente lo que relata el hablante, alternando planos generales con detalles de acción.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen integración de tomas de apoyo B-roll. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo se elige el material de apoyo que refuerza lo que dice quien habla?",
          paragraphs: [
            "Uniendo cada toma de apoyo a una frase concreta. El B-roll funciona cuando muestra lo que se describe en el momento en que se describe: el almacén cuando se habla de envíos, el equipo frente a una pizarra cuando se habla de planificación, un cliente en el mostrador cuando se habla de servicio. Las tomas genéricas de manos en un teclado o de edificios llenan tiempo sin aportar nada, y el público aprende a ignorarlas.",
            "Corta al material de apoyo en una pausa natural o al inicio de una frase, y vuelve a la persona para la oración que lleva la idea principal, así el público ve quién lo afirma. Arma una lista de tomas a partir del guion antes de grabar: subraya cada sustantivo y cada acción que menciona quien habla y planea una o dos tomas para cada uno. Esa lista convierte una cabeza parlante en un video corporativo que explica en vez de solo registrar.",
          ],
        },
        {
          heading: "¿Qué material de apoyo debe grabar una empresa para que el editor tenga suficiente?",
          paragraphs: [
            "Más variedad de la que parece necesaria, en clips cortos y estables. En cada lugar, graba un plano general que muestre todo el espacio, un plano medio de personas trabajando y varios detalles cercanos: manos, productos, pantallas, herramientas, letreros. Sostén cada toma quieta unos diez segundos; los clips cortos con movimiento al principio y al final son difíciles de usar.",
            "Graba a las personas haciendo su trabajo real en lugar de posar, y pide permiso a cualquiera que vaya a ser reconocible. Evita pantallas con información confidencial y pizarras con nombres de clientes. Captura algunos momentos con movimiento por el espacio, como caminar despacio por un pasillo o abrir una puerta, que ayudan al editor a pasar de una idea a otra. Nombra las carpetas por lugar y avisa qué tomas no se deben usar.",
            "Para cocinas y salones, mira el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
      ],
    },
  },
  {
    id: "ideal-video-length-guide",
    en: {
      slug: "ideal-video-length-for-social-platforms",
      metadataTitle: "Ideal Video Length by Platform",
      title: "Ideal video length best practices across social platforms",
      description:
        "Recommended duration benchmarks for Instagram Reels (15-30s), TikTok (20-45s), YouTube Shorts (<60s), and YouTube (8-15 mins).",
      eyebrow: "Strategy / Video Length",
      answer:
        "Keep paid social ads under 30 seconds, organic Reels/TikToks between 20 to 45 seconds, and YouTube content between 8 to 12 minutes.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include published short-form video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How long should a social video be?",
          paragraphs: [
            "As long as the idea needs and not a second longer. There is no single ideal length that holds across platforms or topics; what holds is that viewers on a mobile feed decide in the first few seconds and leave the moment a video stops giving them something new. A fifteen-second clip that drags loses people faster than a ninety-second clip where every few seconds something changes or a new point lands.",
            "A practical way to set length is to write the message as a list of beats — the hook, each point, the call to action — and give each beat only the time it needs to be understood. If a beat can be cut without the viewer missing anything, cut it. Short vertical feeds reward single ideas; a longer explanation usually belongs on YouTube or a website, with a short clip pointing to it rather than trying to contain it.",
          ],
        },
        {
          heading: "How can you tell whether a video is too long?",
          paragraphs: [
            "Check where people stop watching. Instagram, TikTok and YouTube all show a retention graph for each video in their analytics, and the shape is more useful than the average: a steep drop in the first seconds means the opening did not earn attention, while a sudden fall later points to the exact moment the video lost its way.",
            "Compare a few of your own videos rather than an industry rule. If people consistently leave at the same kind of moment — a long introduction, a pause while the speaker thinks, a repeated point — that is what to cut next time. Before publishing, watch the edit once on a phone at normal speed without skipping; anything you are tempted to skip, a viewer will skip too, usually by leaving. Keep the important information early, so even viewers who leave before the end have the main point.",
          ],
        },
      ],
    },
    es: {
      slug: "duracion-ideal-de-video-para-redes-sociales",
      metadataTitle: "Duración Ideal Video en Redes",
      title: "Duración ideal de video recomendada según cada plataforma social",
      description:
        "Duraciones recomendadas para Instagram Reels (15-30s), TikTok (20-45s), Shorts (<60s) y YouTube (8-15 min).",
      eyebrow: "Estrategia / Duración de Video",
      answer:
        "Mantén anuncios pagados por debajo de 30 segundos, Reels/TikToks orgánicos entre 20 y 45 segundos y YouTube entre 8 y 12 minutos.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen edición en formato corto. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cuánto debe durar un video para redes?",
          paragraphs: [
            "Lo que la idea necesite y ni un segundo más. No hay una duración ideal única que sirva para todas las plataformas o temas; lo que sí se cumple es que en un feed móvil la gente decide en los primeros segundos y se va en cuanto el video deja de darle algo nuevo.",
            "Una forma práctica de fijar la duración es escribir el mensaje como una lista de momentos — el gancho, cada punto, la llamada a la acción — y darle a cada uno solo el tiempo que necesita para entenderse. Si un momento se puede quitar sin que la persona se pierda nada, quítalo. Los feeds verticales premian una sola idea; una explicación larga suele ir en YouTube o en un sitio web, con un clip corto que lleve hacia allí.",
            "Para locales de comida, revisa el servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
        {
          heading: "¿Cómo saber si un video es demasiado largo?",
          paragraphs: [
            "Mirando dónde deja de verlo la gente. Instagram, TikTok y YouTube muestran en sus estadísticas una gráfica de retención para cada video, y su forma dice más que el promedio: una caída fuerte en los primeros segundos indica que la apertura no ganó atención, y una caída repentina más adelante señala el momento exacto en que el video perdió el rumbo.",
            "Compara varios de tus propios videos en lugar de seguir una regla general. Si la gente se va siempre en el mismo tipo de momento — una introducción larga, una pausa mientras alguien piensa, una idea repetida — eso es lo que hay que cortar la próxima vez. Antes de publicar, mira la edición una vez en el teléfono, a velocidad normal y sin adelantar: lo que tengas ganas de saltar, el público también lo saltará, normalmente yéndose. Pon la información importante al principio.",
          ],
        },
      ],
    },
  },
  {
    id: "design-video-thumbnails-guide",
    en: {
      slug: "how-to-design-clickable-video-thumbnails",
      metadataTitle: "Designing Clickable Thumbnails",
      title: "How to design high-CTR clickable video thumbnails",
      description:
        "Principles of high-click-through-rate video thumbnails: expressive faces, high-contrast text, 3-element composition, and mobile preview scaling.",
      eyebrow: "Visual Design / Thumbnails",
      answer:
        "Combine an expressive close-up facial crop, a 3-word bold title hook, and a high-contrast background element at 1280x720 resolution.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published thumbnail visual design. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "What makes a video thumbnail clear on a small screen?",
          paragraphs: [
            "Few elements and strong contrast. Most thumbnails are seen at the size of a fingertip in a feed or a search result, so anything beyond about three focal points — usually a face, an object and a few words — turns into clutter. Pick one main subject, make it large, and separate it from the background with light, colour or a clean edge.",
            "Text should be short enough to read at a glance and say something the title does not; repeating the title wastes the space. Use a heavy, simple font and keep letters away from the bottom-right corner on YouTube, where the video length is displayed. A face showing a clear expression draws attention, but only if it relates to the video's subject. Design at full resolution, then check the thumbnail shrunk down to phone size next to other videos before you decide.",
          ],
        },
        {
          heading: "How do you make a thumbnail that matches the video and gets clicked for the right reasons?",
          paragraphs: [
            "Build it from a real frame or a photo taken during the shoot, not a promise the video does not keep. A thumbnail that shows something the viewer never sees produces the click and then the immediate exit, which tells the platform the video disappointed people. Planning a thumbnail shot during filming — the product held up to camera, the finished result, the speaker reacting — gives you a sharp, well-lit image instead of a blurry still pulled from motion.",
            "Keep a consistent layout across a series, such as the same position for text and the same brand colour, so returning viewers recognise your videos in a crowded feed. On YouTube you can test alternatives over time; on Instagram and TikTok, choose the cover frame deliberately rather than accepting whatever the app picks. Save the layered design file so the next thumbnail starts from it.",
          ],
        },
      ],
    },
    es: {
      slug: "como-disenar-miniaturas-de-video-atractivas",
      metadataTitle: "Diseño Miniaturas de Video",
      title: "Cómo diseñar miniaturas de video atractivas y de alto clic (CTR)",
      description:
        "Principios de diseño para miniaturas con alto porcentaje de clics: expresiones faciales, contraste y regla de 3 elementos.",
      eyebrow: "Diseño Visual / Miniaturas",
      answer:
        "Combina una expresión facial cercana, un texto en negrita de 3 palabras y un fondo de alto contraste en resolución 1280x720.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen diseño de miniaturas. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué hace que una miniatura de video se vea clara en una pantalla pequeña?",
          paragraphs: [
            "Pocos elementos y mucho contraste. La mayoría de las miniaturas se ven del tamaño de la yema de un dedo en un feed o en un resultado de búsqueda, así que más de unos tres puntos de atención — normalmente una cara, un objeto y pocas palabras — se convierte en desorden. Elige un sujeto principal, hazlo grande y sepáralo del fondo con luz, color o un borde limpio.",
            "El texto debe ser lo bastante corto para leerse de un vistazo y decir algo que el título no dice; repetir el título desperdicia el espacio. Usa una letra gruesa y sencilla, y en YouTube aleja el texto de la esquina inferior derecha, donde aparece la duración. Una cara con una expresión clara llama la atención, pero solo si tiene que ver con el tema. Diseña a resolución completa y luego revisa la miniatura reducida al tamaño de un teléfono junto a otros videos.",
          ],
        },
        {
          heading: "¿Cómo se hace una miniatura que coincida con el video y reciba clics por las razones correctas?",
          paragraphs: [
            "Partiendo de un cuadro real o de una foto tomada en la grabación, no de una promesa que el video no cumple. Una miniatura que muestra algo que la persona nunca ve consigue el clic y luego la salida inmediata, y eso le indica a la plataforma que el video decepcionó. Planear una toma para la miniatura durante la grabación — el producto frente a la cámara, el resultado terminado, la reacción de quien habla — te da una imagen nítida y bien iluminada en vez de un cuadro borroso sacado de un movimiento.",
            "Mantén un diseño constante en una serie, con el texto en el mismo lugar y el mismo color de marca, para que quien vuelve reconozca tus videos. En Instagram y TikTok, elige la portada a propósito en lugar de aceptar la que propone la aplicación, y guarda el archivo de diseño por capas para la siguiente.",
          ],
        },
      ],
    },
  },
  {
    id: "improve-video-retention-guide",
    en: {
      slug: "how-to-improve-video-retention-rate",
      metadataTitle: "Improving Video Retention Rates",
      title: "How to improve audience retention rates in video editing",
      description:
        "Editing techniques to fix viewer drop-off: pattern interrupts, sound effects, speed ramping, and removing verbal fluff.",
      eyebrow: "Post-Production / Retention",
      answer:
        "Insert visual pattern interrupts every 4 to 6 seconds, cut dead air pauses, and use subtle sound effects to signal scene shifts.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include published fast-paced video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "What are pattern interrupts, and how do they keep people watching?",
          paragraphs: [
            "A pattern interrupt is a small visual or audio change that resets attention: a cut to a closer angle, a gentle zoom on a key word, a text label appearing, a cutaway to what the speaker is describing, a short sound accent. Attention fades when a shot stays the same for too long, especially on a phone, and a change every few seconds gives the eye a new reason to stay.",
            "The change should mean something. Zooming in on the sentence that matters, or cutting to the product as it is named, keeps viewers and helps them follow; random effects on every line feel restless and make the message harder to absorb. Filming with this in mind helps the editor a great deal: two camera angles, a few close-ups and some B-roll of the subject give natural interrupts that do not have to be manufactured with digital zooms.",
          ],
        },
        {
          heading: "Which editing choices raise retention more than effects do?",
          paragraphs: [
            "Cutting dead air and getting to the point. The largest gains usually come from removing the slow start, the repeated sentence and the pause while someone searches for a word, not from adding motion graphics. Start on the most interesting moment, then explain; viewers forgive a fast opening far more readily than a slow one.",
            "Captions keep sound-off viewers following along, and a clear structure helps everyone: say what the video will cover, deliver it in order, and signal when a new point begins. Avoid announcing the ending too early, since a viewer who thinks the video is finished leaves. After publishing, check the retention graph in the platform's analytics and look for the exact second people drop; the next edit can fix that kind of moment. Small, repeated improvements to openings and pacing outlast any single trick.",
          ],
        },
      ],
    },
    es: {
      slug: "como-mejorar-la-retencion-de-audiencia-en-video",
      metadataTitle: "Retención Audiencia en Video",
      title: "Cómo mejorar la retención de audiencia en la edición de video",
      description:
        "Técnicas de edición para evitar la caída de espectadores: interrupción de patrones, efectos de sonido y eliminación de pausas.",
      eyebrow: "Posproducción / Retención",
      answer:
        "Aplica interrupciones visuales cada 4 a 6 segundos, elimina pausas muertas y utiliza efectos de sonido para marcar cambios.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen edición rítmica. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué son las interrupciones de patrón y cómo hacen que la gente siga mirando?",
          paragraphs: [
            "Una interrupción de patrón es un pequeño cambio visual o de sonido que reinicia la atención: un corte a un ángulo más cercano, un zoom suave en una palabra clave, un texto que aparece, una toma de apoyo de lo que se describe, un acento sonoro breve. La atención baja cuando una toma se mantiene igual demasiado tiempo, sobre todo en el teléfono, y un cambio cada pocos segundos le da a la mirada una nueva razón para quedarse.",
            "El cambio debe significar algo. Acercarse en la frase que importa, o cortar al producto cuando se nombra, retiene y ayuda a seguir el hilo; los efectos al azar en cada línea se sienten inquietos y dificultan entender el mensaje. Grabar pensando en esto ayuda mucho al editor: dos ángulos de cámara, algunos primeros planos y material de apoyo dan interrupciones naturales que no hay que fabricar con zooms digitales.",
          ],
        },
        {
          heading: "¿Qué decisiones de edición suben la retención más que los efectos?",
          paragraphs: [
            "Quitar los tiempos muertos e ir al grano. Las mayores mejoras suelen venir de eliminar el inicio lento, la frase repetida y la pausa mientras alguien busca una palabra, no de agregar gráficos animados. Empieza por el momento más interesante y luego explica: el público perdona mucho más una apertura rápida que una lenta.",
            "Los subtítulos permiten seguir el video sin sonido, y una estructura clara ayuda a todos: di qué se va a ver, entrégalo en orden y marca cuándo empieza un punto nuevo. Evita anunciar el final demasiado pronto, porque quien cree que el video terminó se va. Después de publicar, revisa la gráfica de retención en las estadísticas de la plataforma y busca el segundo exacto en que la gente se va; la próxima edición puede corregir ese tipo de momento. Las mejoras pequeñas y repetidas duran más que cualquier truco.",
          ],
        },
      ],
    },
  },
  {
    id: "freelance-vs-post-agency-guide",
    en: {
      slug: "freelance-video-editor-vs-post-agency",
      metadataTitle: "Freelance Editor vs Post Agency",
      title: "Freelance video editor vs post-production agency: Which fits?",
      description:
        "Compare working directly with a specialized remote editor vs hiring a full-service post-production agency for video projects.",
      eyebrow: "Hiring / Decision Guide",
      answer:
        "Hire a specialized remote editor for direct communication, fast turnaround, and lower overhead; hire an agency for multi-team projects.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published specialized video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "When does a freelance editor fit better than a post-production agency?",
          paragraphs: [
            "When the project needs one consistent hand and direct conversation more than it needs a large team. With a freelancer, the person who reads your notes is the person who makes the change, so nothing is lost passing between an account manager, a producer and an editor. That suits recurring social content, a single brand film, or a business that wants the same eye on every video month after month.",
            "The trade-off is capacity. One editor has a finite calendar, so very large volumes, simultaneous projects or a sudden deadline can stretch further than a team would. Ask any freelancer how they schedule work, what happens if they are unavailable, and how files are stored and backed up. The direct relationship is the advantage, but only if those practical answers are clear before the first project starts.",
          ],
        },
        {
          heading: "When is a post-production agency the better choice?",
          paragraphs: [
            "When the work needs several specialists at once or a volume one person cannot carry. An agency can put a colourist, a sound mixer, a motion designer and several editors on the same campaign, run them in parallel and absorb holidays and sick days without the client noticing. Broadcast deliverables, large multi-language campaigns and projects with strict technical specifications often benefit from that structure.",
            "The cost of the structure is distance and overhead. Notes usually travel through a producer, so it helps to agree how feedback is collected and how many rounds are included. When you compare quotes, compare what each one includes — editing, colour, sound, graphics, revisions, file formats — rather than the total alone. A freelancer and an agency can both be right; the deciding question is how many different skills the project needs at the same time.",
          ],
        },
      ],
    },
    es: {
      slug: "editor-de-video-freelance-vs-agencia-de-postproduccion",
      metadataTitle: "Editor Freelance vs Agencia Video",
      title: "Editor de video freelance vs agencia de posproducción: ¿Cuál conviene?",
      description:
        "Compara trabajar directamente con un editor remoto especializado frente a contratar una agencia de posproducción integral.",
      eyebrow: "Contratación / Guía de Decisión",
      answer:
        "Elige un editor remoto especializado para trato directo y entregas rápidas; contrata agencia para proyectos con múltiples equipos.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen edición remota especializada. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cuándo conviene más un editor independiente que una agencia de postproducción?",
          paragraphs: [
            "Cuando el proyecto necesita una mano constante y conversación directa más que un equipo grande. Con un editor independiente, quien lee tus notas es quien hace el cambio, así que nada se pierde entre un ejecutivo de cuenta, un productor y un editor. Eso encaja con contenido recurrente para redes, un video de marca puntual o un negocio que quiere la misma mirada en cada video, mes tras mes.",
            "La contrapartida es la capacidad. Un solo editor tiene un calendario limitado, así que volúmenes muy grandes, varios proyectos simultáneos o una fecha límite repentina pueden tardar más de lo que tardaría un equipo. Pregúntale a cualquier editor independiente cómo organiza su agenda, qué pasa si no está disponible y cómo guarda y respalda los archivos. La relación directa es la ventaja, siempre que esas respuestas prácticas estén claras antes del primer proyecto.",
          ],
        },
        {
          heading: "¿Cuándo es mejor opción una agencia de postproducción?",
          paragraphs: [
            "Cuando el trabajo necesita varios especialistas a la vez o un volumen que una sola persona no puede llevar. Una agencia puede poner a un colorista, un mezclador de sonido, un diseñador de animación y varios editores en la misma campaña, trabajar en paralelo y cubrir vacaciones o ausencias sin que el cliente lo note. Las entregas para televisión, las campañas grandes en varios idiomas y los proyectos con especificaciones técnicas estrictas suelen aprovechar esa estructura.",
            "El costo de esa estructura es la distancia y los gastos generales. Las notas suelen pasar por un productor, así que conviene acordar cómo se reúnen los comentarios y cuántas rondas se incluyen. Al comparar cotizaciones, compara lo que incluye cada una — edición, color, sonido, gráficos, revisiones, formatos — y no solo el total. La pregunta decisiva es cuántas habilidades distintas necesita el proyecto al mismo tiempo.",
          ],
        },
      ],
    },
  },
  {
    id: "drone-video-editing-guidelines-guide",
    en: {
      slug: "drone-video-editing-guidelines-florida",
      metadataTitle: "Drone Video Editing Guidelines",
      title: "Drone & aerial video editing best practices and guidelines",
      description:
        "Learn how to color grade 4K aerial shots, stabilize flight motion, add property boundary graphics, and sync aerial cuts to music.",
      eyebrow: "Aerial / Drone Post-Production",
      answer:
        "Apply digital stabilization, balance sky-to-water color exposure, and add clean graphics overlays to highlight property boundaries.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved portfolio credits include published aerial real estate video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How is wobbly drone footage stabilised in post-production?",
          paragraphs: [
            "With software stabilisation applied clip by clip, and with restraint. Wind and quick stick movements leave small shakes and jolts in aerial footage; a warp stabiliser analyses the motion and smooths it, which can turn a nervous pass into a calm glide. It works by cropping slightly into the frame, so it needs some spare resolution around the subject, and pushed too far it bends straight lines and makes buildings or horizons wobble like jelly.",
            "This guide is about editing aerial footage that the client or their licensed pilot supplies. The flight itself, and the licence it requires, are the pilot's responsibility; the editor works only with the files. The best results come from original files straight from the drone rather than copies downloaded from social media, which are compressed and carry less detail in sky and water. For an example of editing supplied footage, see [Homeowners](/portfolio/homeowners) and its [case study](/case-studies/homeowners).",
          ],
        },
        {
          heading: "What else does an editor check before using aerial clips?",
          paragraphs: [
            "The horizon, the colour and the cut points. A tilted horizon is the first thing viewers notice, so each clip is levelled before anything else, which again uses some of the frame. Aerial footage is often filmed in a flat profile and with the sky much brighter than the ground, so colour correction balances the two and matches the aerials to the ground-level shots in the same video.",
            "Aerial clips work best as openers, transitions and reveals rather than long sequences; a few seconds of a smooth move usually says more than a minute of circling. The editor also looks for problems that should not be published, such as recognisable people on private property or a propeller in the frame. Send the clips with a note of where and when each was filmed and who flew them, so any question about the footage can go to the person responsible for the flight.",
          ],
        },
      ],
    },
    es: {
      slug: "guias-de-edicion-de-video-con-dron-florida",
      metadataTitle: "Guía Edición Video con Dron",
      title: "Mejores prácticas y guías para edición de video aéreo con dron",
      description:
        "Aprende a realizar corrección de color en tomas aéreas 4K, estabilizar movimientos de vuelo e integrar líneas de propiedad.",
      eyebrow: "Aéreo / Posproducción con Dron",
      answer:
        "Aplica estabilización digital, equilibra el tono entre cielo y agua e integra gráficos limpios para señalar límites de terrenos.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "Los créditos aprobados del portafolio incluyen edición de video aéreo. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo se estabiliza en postproducción un video de dron con temblores?",
          paragraphs: [
            "Con estabilización por software aplicada clip por clip, y con moderación. El viento y los movimientos bruscos de los controles dejan pequeños temblores y sacudidas en las tomas aéreas; un estabilizador analiza el movimiento y lo suaviza, y puede convertir una pasada nerviosa en un deslizamiento tranquilo. Funciona recortando un poco el cuadro, así que necesita algo de resolución de sobra alrededor del sujeto, y si se fuerza demasiado dobla las líneas rectas y hace que edificios y horizontes se vean de gelatina.",
            "Esta guía trata de editar material aéreo que entrega el cliente o su piloto con licencia. El vuelo, y la licencia que exige, son responsabilidad del piloto; el editor trabaja solo con los archivos. Los mejores resultados salen de los archivos originales del dron, no de copias descargadas de redes. Como ejemplo de edición con material entregado, mira [Homeowners](/es/portafolio/homeowners) y su [caso de estudio](/es/casos-de-estudio/homeowners).",
          ],
        },
        {
          heading: "¿Qué más revisa un editor antes de usar tomas aéreas?",
          paragraphs: [
            "El horizonte, el color y los puntos de corte. Un horizonte torcido es lo primero que nota el público, así que cada clip se nivela antes que nada, lo que también consume parte del cuadro. Las tomas aéreas suelen grabarse en un perfil plano y con el cielo mucho más brillante que el suelo, de modo que la corrección de color equilibra ambos y las iguala con las tomas a nivel de suelo del mismo video.",
            "Las tomas aéreas funcionan mejor como aperturas, transiciones y revelaciones que como secuencias largas; unos segundos de un movimiento suave suelen decir más que un minuto dando vueltas. El editor también busca problemas que no deben publicarse, como personas reconocibles en una propiedad privada o una hélice dentro del cuadro. Envía los clips con una nota de dónde y cuándo se grabó cada uno y quién los voló.",
          ],
        },
      ],
    },
  },
  {
    id: "b2b-video-funnel-guide",
    en: {
      slug: "b2b-video-marketing-funnel-strategy",
      metadataTitle: "B2B Video Marketing Funnel",
      title: "How to build a B2B video marketing conversion funnel",
      description:
        "Structure top-of-funnel educational videos, middle-of-funnel case studies, and bottom-of-funnel product walkthroughs.",
      eyebrow: "B2B / Video Strategy",
      answer:
        "Align video formats to buyer awareness: educational reels for cold reach, case story edits for consideration, and demo reels for closing.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published B2B video marketing editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Which videos belong at each stage of a B2B funnel?",
          paragraphs: [
            "Short, problem-first videos at the top; proof and detail lower down. At the awareness stage a buyer does not yet know your company, so the video should name a problem they recognise in the first seconds and offer one useful idea, usually as a short clip on LinkedIn, YouTube or Instagram. At the consideration stage the buyer is comparing options, so explainers, demonstrations and a walk through how the work is done carry more weight.",
            "At the decision stage the buyer wants evidence and a next step: a customer story told in the customer's own words, a clear outline of what working together involves, and a page where the call can be booked. Map the videos you already have to these stages before making new ones; most companies find several pieces at the top and nothing to help a buyer who is nearly ready to decide.",
          ],
        },
        {
          heading: "How do you connect funnel videos so viewers move to the next step?",
          paragraphs: [
            "Give every video one next step and make it match the stage. A short awareness clip should point to a longer explainer or an article, not straight to a sales call; a detailed demonstration can point to a booking page. When a video asks for too much too early, viewers simply leave.",
            "Host the deeper videos on your own website pages, next to the text that explains the offer, so the person who arrives from a social clip finds the full answer in one place. Use the same names, colours and opening style across the series, so a viewer recognises your company from one video to the next. Then measure each stage separately: views and watch time at the top, clicks to the next piece in the middle, and enquiries at the end. A gap in that chain shows exactly which video to make next.",
          ],
        },
      ],
    },
    es: {
      slug: "estrategia-de-embudo-de-video-marketing-b2b",
      metadataTitle: "Embudo Video Marketing B2B",
      title: "Cómo construir un embudo de conversión con video marketing B2B",
      description:
        "Estructura videos educativos para atracción, casos de éxito para evaluación y demostraciones de producto para cierre.",
      eyebrow: "B2B / Estrategia de Video",
      answer:
        "Adapta el contenido a cada etapa del cliente: reels educativos para alcance, historias de éxito para evaluación y demos para venta.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen edición de video B2B. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué videos corresponden a cada etapa de un embudo B2B?",
          paragraphs: [
            "Videos cortos que empiezan por el problema arriba, y prueba y detalle más abajo. En la etapa de descubrimiento el comprador todavía no conoce tu empresa, así que el video debe nombrar en los primeros segundos un problema que reconozca y ofrecer una idea útil, normalmente como clip corto en LinkedIn, YouTube o Instagram. En la etapa de evaluación el comprador compara opciones, y ahí pesan más las explicaciones, las demostraciones y un recorrido por cómo se hace el trabajo.",
            "En la etapa de decisión el comprador quiere evidencia y un siguiente paso: la historia de un cliente contada con sus propias palabras, un resumen claro de lo que implica trabajar juntos y una página donde reservar la llamada. Ubica los videos que ya tienes en estas etapas antes de hacer nuevos; muchas empresas tienen varias piezas arriba y nada para quien está a punto de decidir.",
          ],
        },
        {
          heading: "¿Cómo se conectan los videos del embudo para que la gente avance al siguiente paso?",
          paragraphs: [
            "Dándole a cada video un solo siguiente paso, acorde con su etapa. Un clip corto de descubrimiento debe llevar a una explicación más larga o a un artículo, no directo a una llamada de ventas; una demostración detallada sí puede llevar a una página de reservas. Cuando un video pide demasiado demasiado pronto, la gente simplemente se va.",
            "Publica los videos más profundos en páginas de tu propio sitio, junto al texto que explica la oferta, para que quien llega desde un clip en redes encuentre la respuesta completa en un solo lugar. Usa los mismos nombres, colores y estilo de apertura en toda la serie, para que se reconozca tu empresa de un video a otro. Luego mide cada etapa por separado: reproducciones y tiempo de visualización arriba, clics a la siguiente pieza en el medio y solicitudes al final. Un hueco en esa cadena indica qué video hacer después.",
          ],
        },
      ],
    },
  },
  {
    id: "prepare-audio-for-editing-guide",
    en: {
      slug: "how-to-prepare-audio-for-video-editing",
      metadataTitle: "How to Prepare Audio for Editing",
      title: "How to prepare and organize audio files for video editing",
      description:
        "Best practices for exporting 24-bit WAV audio stems, syncing external lavalier tracks, and eliminating ambient room noise.",
      eyebrow: "Audio / Preparation",
      answer:
        "Export uncompressed 24-bit 48kHz WAV audio files, record a reference clap for visual sync, and record 10 seconds of room tone.",
      proof: {
        href: "/portfolio/healthy-smile",
        title: "Healthy Smile",
        description:
          "Approved portfolio credits include published audio track restoration. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Why should you record room tone on location?",
          paragraphs: [
            "Because every room has its own background sound, and the editor needs a clean sample of it. Before or after the interview, ask everyone to stay still and silent and record about ten seconds of the empty room with the same microphones in the same positions. That recording lets the editor fill gaps between cuts with matching background sound instead of dead silence, which the ear notices immediately as a jump.",
            "Room tone also gives noise-reduction tools a reference: they can learn the hum of an air conditioner or a refrigerator and remove it from the dialogue more cleanly than when they have to guess. Record a fresh sample whenever something in the room changes, such as a fan switched on or a window opened. On location, see the clinic example in [Healthy Smile Miami](/portfolio/healthy-smile), where Esteban recorded video and sound, and the [Healthy Smile case study](/case-studies/healthy-smile).",
          ],
        },
        {
          heading: "How should audio files be organised before they go to the editor?",
          paragraphs: [
            "Keep every audio file exactly as the recorder made it, in a folder per recorder or per microphone, and never rename them in a way that removes the original name; that name and its timestamp are how an editor syncs sound to picture. If the recorder writes a separate file per channel, send all of them, even the ones that seem silent.",
            "Add a simple note: which microphone was on which person, which recorder matches which camera, and any take where something went wrong, such as a dropped signal or a loud noise. A clap at the start of each take, visible on camera and audible on every recorder, makes syncing fast and reliable. Send music and voice-over as separate files rather than mixed into the video, at the highest quality you have, so the editor can balance levels instead of working around them.",
          ],
        },
      ],
    },
    es: {
      slug: "como-preparar-audio-para-edicion-de-video",
      metadataTitle: "Preparar Audio para Edición",
      title: "Cómo preparar y organizar archivos de audio para edición de video",
      description:
        "Buenas prácticas para exportar archivos WAV a 24 bits, sincronizar micrófonos de solapa y eliminar ruido ambiental.",
      eyebrow: "Audio / Preparación",
      answer:
        "Exporta audio WAV a 48kHz sin compresión, graba una palmada de sincronización y registra 10 segundos de tono de sala.",
      proof: {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile",
        description:
          "Los créditos aprobados del portafolio incluyen restauración de pistas de audio. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Por qué conviene grabar el tono de sala en el lugar?",
          paragraphs: [
            "Porque cada espacio tiene su propio sonido de fondo y el editor necesita una muestra limpia. Antes o después de la entrevista, pide a todos que se queden quietos y en silencio, y graba unos diez segundos del cuarto vacío con los mismos micrófonos en las mismas posiciones. Esa grabación permite rellenar los huecos entre cortes con el mismo fondo en lugar de con silencio total, que el oído nota de inmediato como un salto.",
            "El tono de sala también sirve de referencia a las herramientas de reducción de ruido: aprenden el zumbido del aire acondicionado o de una nevera y lo quitan del diálogo con más limpieza que si tuvieran que adivinar. Graba una muestra nueva cada vez que cambie algo en el cuarto. Como ejemplo en locación, mira [Healthy Smile Miami](/es/portafolio/healthy-smile), donde Esteban grabó video y sonido, y su [caso de estudio](/es/casos-de-estudio/healthy-smile).",
          ],
        },
        {
          heading: "¿Cómo se organizan los archivos de audio antes de enviarlos al editor?",
          paragraphs: [
            "Conserva cada archivo de audio tal como lo creó la grabadora, en una carpeta por grabadora o por micrófono, y nunca lo renombres de forma que se pierda el nombre original: ese nombre y su marca de tiempo son los que permiten sincronizar el sonido con la imagen. Si la grabadora crea un archivo por canal, envíalos todos, incluso los que parezcan vacíos.",
            "Agrega una nota sencilla: qué micrófono llevaba cada persona, qué grabadora corresponde a qué cámara y en qué toma algo salió mal, como una señal que se cortó o un ruido fuerte. Una palmada al inicio de cada toma, visible en cámara y audible en todas las grabadoras, hace la sincronización rápida y confiable. Envía la música y la voz en off como archivos separados y no mezclados en el video, con la mayor calidad que tengas, para que el editor pueda equilibrar los niveles.",
          ],
        },
      ],
    },
  },
  {
    id: "testimonial-script-template-guide",
    en: {
      slug: "customer-testimonial-video-script-template",
      metadataTitle: "Testimonial Video Script Template",
      title: "Customer testimonial video question framework & script template",
      description:
        "Effective 5-question interview framework to elicit authentic, story-driven customer video testimonials.",
      eyebrow: "Testimonials / Script Template",
      answer:
        "Ask client about their situation before working with you, their hesitation, the turning point, and specific measurable results achieved.",
      proof: {
        href: "/portfolio/healthy-smile",
        title: "Healthy Smile Miami",
        description:
          "Social-media videos for a Miami dental clinic, made on assignment with the agency 300 Bees: filmed on location with video and sound, then edited. Not a testimonial: linked as a public sample of on-location filming with sound, not as evidence of testimonial work.",
      },
      sections: [
        {
          heading: "How much does a customer testimonial video cost in Miami?",
          paragraphs: [
            `If the interview is already recorded, the editing is priced on the calculator's corporate band: ${usd(PRICING_BANDS.corporate.baseMin)}–${usd(PRICING_BANDS.corporate.baseMax)} per project, an editing-led freelancer range with a 10% introductory discount, checked against a published market of ${usd(PRICING_BANDS.corporate.marketMin)}–${usd(PRICING_BANDS.corporate.marketMax)}. If it still has to be filmed, the half-day on-location add-on is ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)} on the same basis, or the [Local Presence](/pricing/local-presence) package starts from ${packageGuidePrice("presencia-local")} per production day, covering pre-production, capture and editing.`,
            "These are budgeting starting points, not a quote. The price moves with how many customers are interviewed, how many short cut-downs are needed for social, and whether captions or a second language are part of the delivery. Full-crew Miami production companies quote on a different model, with a larger crew on set, so their ranges are not directly comparable.",
          ],
        },
        {
          heading: "What questions should a testimonial interview ask?",
          paragraphs: [
            "Five, asked in the order the story happened. What was the situation before you started working with the business? What almost stopped you from going ahead? What was the moment you decided, and why? What changed afterwards, in numbers if the customer has them and in plain words if not? And who would you tell to do the same?",
            "The order matters because a testimonial is cut as a short before-and-after, and answers recorded in sequence fall into that shape with fewer jumps. Ask each question open-ended and ask the customer to answer in a full sentence that repeats the question, so the clip makes sense without your voice in it. Never hand the customer a script to read: a recited line sounds recited.",
          ],
        },
        {
          heading: "How long should a video testimonial be?",
          paragraphs: [
            "Plan two lengths from the same interview. The full version, usually one to three minutes, belongs on the website or a sales page, where the viewer chose to watch. The short versions, one answer each, go to Reels, TikTok and Shorts, where the first seconds decide whether anyone stays.",
            `Planning both before the shoot changes the questions: each answer has to stand alone, so the customer should name the business and the problem inside the sentence. On the calculator, short social cuts sit in the short-form band, ${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)} per project. List them in the brief so the quote covers them from the start instead of after the main cut is approved.`,
          ],
        },
        {
          heading: "What should you send before a testimonial is filmed or edited?",
          paragraphs: [
            "For an edit only: the original camera files, the separately recorded audio if a lavalier or recorder was used, the customer's name and title spelled correctly, the logo as a vector file, and the customer's signed permission to publish their face and words. For a shoot as well: the location, a quiet room, and a time slot long enough to set up light and sound before the customer arrives.",
            "Sound decides a testimonial more than picture does; a soft image is forgiven before an echo is. For the agency 300 Bees, Esteban filmed social videos at a Miami dental clinic on location, recording video and sound, then edited and delivered them ([Healthy Smile Miami](/portfolio/healthy-smile)). It is not a testimonial, but it is the published example of the same on-location conditions.",
          ],
        },
      ],
    },
    es: {
      slug: "plantilla-de-guion-para-video-testimonial",
      metadataTitle: "Guión Video Testimonial Template",
      title: "Plantilla de guión y estructura de preguntas para video testimonial",
      description:
        "Estructura efectiva de 5 preguntas para obtener testimoniales de clientes auténticos y orientados a la conversión.",
      eyebrow: "Testimoniales / Plantilla",
      answer:
        "Pregunta sobre la situación previa, la duda inicial, el momento de cambio y los resultados específicos y medibles obtenidos.",
      proof: {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        description:
          "Videos para redes de un consultorio odontológico en Miami, por encargo de la agencia 300 Bees: grabados en locación con video y sonido, y luego editados. No es un testimonial: se enlaza como ejemplo de grabación en locación con sonido, no como prueba de trabajo testimonial.",
      },
      sections: [
        {
          heading: "¿Cuánto cuesta un video testimonial en Miami?",
          paragraphs: [
            `Si la entrevista ya está grabada, la edición se calcula con la banda corporativa de la calculadora: ${usd(PRICING_BANDS.corporate.baseMin)}–${usd(PRICING_BANDS.corporate.baseMax)} por proyecto, un rango de editor independiente con un descuento introductorio del 10 %, comparado con un mercado publicado de ${usd(PRICING_BANDS.corporate.marketMin)}–${usd(PRICING_BANDS.corporate.marketMax)}. Si todavía hay que grabarla, el complemento de grabación en locación por media jornada va de ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)} con la misma base, o el paquete [Presencia Local](/es/precios/presencia-local) parte desde ${packageGuidePrice("presencia-local")} por jornada de producción, con preproducción, grabación y edición.`,
            "Son puntos de partida para presupuestar, no una cotización. El precio cambia según cuántos clientes se entrevisten, cuántos cortes breves se necesiten para redes y si la entrega incluye subtítulos o un segundo idioma. Las productoras de Miami con equipo completo cotizan con otro modelo, con más personas en el set, así que sus rangos no se comparan directamente.",
          ],
        },
        {
          heading: "¿Qué preguntas debe tener una entrevista testimonial?",
          paragraphs: [
            "Cinco, en el orden en que pasó la historia. ¿Cuál era la situación antes de trabajar con el negocio? ¿Qué casi te detuvo? ¿En qué momento decidiste y por qué? ¿Qué cambió después, con cifras si el cliente las tiene y con palabras sencillas si no? ¿Y a quién le dirías que haga lo mismo?",
            "El orden importa porque un testimonial se monta como un antes y después breve, y las respuestas grabadas en secuencia caen en esa forma con menos saltos. Haz preguntas abiertas y pide al cliente que responda con una frase completa que repita la pregunta, para que el clip se entienda sin tu voz. Nunca le des un guion para leer: una frase recitada suena recitada.",
          ],
        },
        {
          heading: "¿Cuánto debe durar un video testimonial?",
          paragraphs: [
            "Planea dos duraciones a partir de la misma entrevista. La versión completa, normalmente de uno a tres minutos, va en la web o en una página de ventas, donde quien la ve eligió verla. Las versiones cortas, una respuesta cada una, van a Reels, TikTok y Shorts, donde los primeros segundos deciden si alguien se queda.",
            `Planear ambas antes de grabar cambia las preguntas: cada respuesta tiene que sostenerse sola, así que el cliente debe nombrar el negocio y el problema dentro de la frase. En la calculadora, los cortes breves para redes están en la banda de video corto, ${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)} por proyecto. Inclúyelos en el brief para que la cotización los cubra desde el inicio y no después de aprobar el corte principal.`,
          ],
        },
        {
          heading: "¿Qué debes enviar antes de grabar o editar un testimonial?",
          paragraphs: [
            "Solo para edición: los archivos originales de cámara, el audio grabado por separado si se usó corbatero o grabadora, el nombre y cargo del cliente bien escritos, el logo en vector y el permiso firmado del cliente para publicar su imagen y sus palabras. Si también hay grabación: el lugar, una sala silenciosa y un horario con tiempo para preparar luz y sonido antes de que llegue el cliente.",
            "En un testimonial el sonido pesa más que la imagen: se perdona una imagen suave antes que un eco. Para la agencia 300 Bees, Esteban grabó videos para redes en un consultorio odontológico de Miami, en locación y con sonido, y luego los editó y entregó ([Healthy Smile Miami](/es/portafolio/healthy-smile)). No es un testimonial, pero es el ejemplo publicado de las mismas condiciones de grabación en locación.",
          ],
        },
      ],
    },
  },
  {
    id: "vertical-video-best-practices-guide",
    en: {
      slug: "vertical-video-editing-best-practices",
      metadataTitle: "Vertical Video Editing Best Practices",
      title: "Vertical video editing best practices for Reels, Shorts & TikTok",
      description:
        "Master 9:16 vertical editing: mobile framing, text positioning, fast-cut pacing, and background blur fills.",
      eyebrow: "Vertical Video / Best Practices",
      answer:
        "Frame subjects in the vertical center third, place text in safe margins, and edit at a crisp 1.5x pacing speed for mobile feeds.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include published vertical video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "How do you turn widescreen footage into a vertical video?",
          paragraphs: [
            "Reframe it shot by shot rather than applying one crop to everything. A 16:9 frame contains roughly three vertical frames side by side, so each shot needs a decision about which part matters: the speaker's face, the product, the action. When the subject moves across the frame, the crop can follow it with a slow pan so it never drifts out of view.",
            "When a shot cannot be cropped without losing what matters — a wide group, a room, a landscape — place the full horizontal image in the middle of the vertical frame and fill the space above and below with a blurred or styled version of the same image, or with titles. Use that sparingly, because a small picture in the middle of a phone screen is harder to watch. If you know before filming that the video will be vertical, frame wider than usual and keep the subject near the centre.",
          ],
        },
        {
          heading: "What separates a good vertical edit from a cropped horizontal one?",
          paragraphs: [
            "Closeness, pace and text that belongs to the frame. Vertical video is watched at arm's length on a small screen, so closer shots read better than wide ones, and faces should fill more of the frame than they would on a television. Cuts tend to come more often, because each shot holds less information.",
            "On-screen text and captions should be designed for the vertical frame: large enough to read on a phone, placed in the central safe area above the strip where the app shows its own caption and buttons, and short enough to read before the cut. Keep the important information in the upper two-thirds of the frame. Export at 1080x1920 from the original files rather than from a compressed horizontal export, and watch the finished video on a phone before publishing, since a desktop preview hides most vertical problems.",
          ],
        },
      ],
    },
    es: {
      slug: "mejores-practicas-de-edicion-de-video-vertical",
      metadataTitle: "Prácticas Edición Video Vertical",
      title: "Mejores prácticas de edición de video vertical para Reels y TikTok",
      description:
        "Domina la edición en 9:16: encuadre móvil, ubicación de subtítulos, ritmo rápido y rellenos de desenfoque de fondo.",
      eyebrow: "Video Vertical / Mejores Prácticas",
      answer:
        "Encuadra al sujeto en el tercio central vertical, coloca textos dentro de márgenes seguros y edita a ritmo ágil para móviles.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen edición de video vertical. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Cómo se convierte material horizontal en un video vertical?",
          paragraphs: [
            "Reencuadrando toma por toma en lugar de aplicar el mismo recorte a todo. Un cuadro 16:9 contiene más o menos tres cuadros verticales uno al lado del otro, así que cada toma necesita una decisión sobre qué parte importa: la cara de quien habla, el producto, la acción. Cuando el sujeto cruza el cuadro, el recorte puede seguirlo con un paneo lento para que nunca salga de la vista.",
            "Cuando una toma no se puede recortar sin perder lo importante — un grupo amplio, un espacio, un paisaje — coloca la imagen horizontal completa en el centro del cuadro vertical y llena el espacio de arriba y de abajo con una versión desenfocada de la misma imagen o con títulos. Úsalo con moderación, porque una imagen pequeña en medio del teléfono cuesta más verla. Si sabes antes de grabar que el video será vertical, encuadra más abierto de lo normal y mantén al sujeto cerca del centro.",
          ],
        },
        {
          heading: "¿Qué distingue una buena edición vertical de un video horizontal recortado?",
          paragraphs: [
            "La cercanía, el ritmo y un texto pensado para el cuadro. El video vertical se mira a la distancia del brazo en una pantalla pequeña, así que los planos cercanos se leen mejor que los generales, y las caras deben ocupar más cuadro que en un televisor. Los cortes suelen llegar más seguido, porque cada toma contiene menos información.",
            "Los textos y subtítulos deben diseñarse para el formato vertical: lo bastante grandes para leerse en el teléfono, ubicados en la zona segura central por encima de la franja donde la aplicación muestra su propio texto y sus botones, y lo bastante cortos para leerse antes del corte. Mantén la información importante en los dos tercios superiores del cuadro. Exporta en 1080x1920 desde los archivos originales y mira el video terminado en un teléfono antes de publicar.",
          ],
        },
      ],
    },
  },
  {
    id: "raw-video-formats-explained-guide",
    en: {
      slug: "raw-video-file-formats-explained",
      metadataTitle: "RAW Video Formats Explained",
      title: "RAW video file formats, LOG profiles, and codecs explained",
      description:
        "Demystifying ProRes, H.264/H.265, Sony S-Log3, Canon C-Log, and REDCODE RAW for non-technical clients and creators.",
      eyebrow: "Technical / Video Codecs",
      answer:
        "LOG profiles capture maximum dynamic range for color grading, ProRes retains quality for editing, and H.264 delivers final web exports.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved portfolio credits include published multi-codec video post-production. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "What is the difference between RAW, LOG and standard video?",
          paragraphs: [
            "They differ in how much decision the camera makes for you. Standard video bakes in contrast, colour and sharpening at the moment of recording, so it looks finished straight away but has little room for adjustment. LOG profiles record a flat, low-contrast image that keeps more detail in highlights and shadows, leaving the final look to colour correction. RAW keeps even more of the sensor data, so white balance and exposure can be changed afterwards with fewer side effects.",
            "More flexibility comes with larger files and more work. LOG and RAW footage must be corrected before anyone can judge it, and RAW files can fill drives quickly. For quick social content shot in good light, a standard profile is often the sensible choice; for a brand film, mixed lighting or footage that must match other cameras, LOG or RAW gives the editor room to make everything consistent.",
          ],
        },
        {
          heading: "Which export codec should each destination receive?",
          paragraphs: [
            "Two kinds of file serve most projects. A high-quality master, such as Apple ProRes 422, keeps the finished edit with very little loss and is the file to archive and to re-export from later. A delivery file, typically H.264 or H.265 in an MP4 with AAC audio, is small enough to upload and plays everywhere, which is what websites and social platforms expect.",
            "Platforms recompress whatever you upload, so sending them a clean, well-made MP4 at the right resolution gives better results than sending a huge master and letting them shrink it. Keep the frame rate the same as the original footage, and name exports with the destination and the ratio so the right version reaches the right place. When footage from different cameras is combined into one graded master, as in the [Homeowners project](/portfolio/homeowners) edited from agency-supplied files, that master is the file worth keeping.",
          ],
        },
      ],
    },
    es: {
      slug: "formatos-de-archivo-de-video-raw-explicados",
      metadataTitle: "Formatos Video RAW Explicados",
      title: "Formatos de archivo de video RAW, perfiles LOG y códecs explicados",
      description:
        "Entiende ProRes, H.264/H.265, Sony S-Log3, Canon C-Log y REDCODE RAW de forma sencilla para tus proyectos de video.",
      eyebrow: "Técnico / Códecs de Video",
      answer:
        "Los perfiles LOG conservan el rango dinámico para color; ProRes mantiene calidad para edición y H.264 optimiza el archivo web.",
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description:
          "Los créditos aprobados del portafolio incluyen posproducción multi-códec. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "¿Qué diferencia hay entre RAW, LOG y el video estándar?",
          paragraphs: [
            "Se diferencian en cuántas decisiones toma la cámara por ti. El video estándar fija el contraste, el color y la nitidez en el momento de grabar, así que se ve terminado de inmediato pero deja poco margen para ajustes. Los perfiles LOG graban una imagen plana y de bajo contraste que conserva más detalle en luces y sombras, y dejan el aspecto final a la corrección de color. El RAW guarda aún más información del sensor, de modo que el balance de blancos y la exposición se pueden cambiar después con menos efectos secundarios.",
            "Más flexibilidad implica archivos más pesados y más trabajo. El material LOG y RAW debe corregirse antes de poder juzgarlo, y los archivos RAW llenan los discos rápido. Para contenido rápido en buena luz, un perfil estándar suele ser lo sensato; para un video de marca, luz mezclada o material que debe igualarse con otras cámaras, LOG o RAW dan margen al editor.",
          ],
        },
        {
          heading: "¿Qué códec de exportación necesita cada destino?",
          paragraphs: [
            "La mayoría de los proyectos se resuelven con dos tipos de archivo. Un maestro de alta calidad, como Apple ProRes 422, guarda la edición terminada casi sin pérdida y es el archivo para archivar y volver a exportar más adelante. Un archivo de entrega, normalmente H.264 o H.265 en MP4 con audio AAC, es lo bastante liviano para subirlo y se reproduce en todos lados, que es lo que esperan los sitios web y las redes.",
            "Las plataformas vuelven a comprimir lo que subes, así que enviarles un MP4 limpio y bien hecho a la resolución correcta da mejor resultado que subir un maestro enorme y dejar que lo reduzcan. Mantén la misma velocidad de cuadro del material original y nombra cada exportación con su destino y su formato. Cuando se combina material de varias cámaras en un maestro corregido, como en el [proyecto Homeowners](/es/portafolio/homeowners), ese maestro es el archivo que vale la pena guardar.",
          ],
        },
      ],
    },
  },
  {
    id: "restaurant-video-cost-guide",
    en: {
      slug: "how-much-does-restaurant-video-cost-miami",
      metadataTitle: "Restaurant Video Cost in Miami",
      title: "How much does a restaurant video cost in Miami?",
      description: "Compare Esteban's restaurant editing starting prices, indicative filming ranges, and monthly options before requesting a Miami restaurant video quote.",
      eyebrow: "Restaurant video costs",
      answer: `Esteban Moreno Media's Starter editing package starts from ${packageGuidePrice("arranque")} per project; restaurant filming can be scoped through Local Presence from ${packageGuidePrice("presencia-local")} per production day. Existing footage, filming needs, finished versions, and publishing frequency change the quote.`,
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description: "A social-media promo spot for a Miami restaurant, with on-location videography and editing for the venue's Instagram. Nothing published confirms a price for this project.",
      },
      sections: [
        {
          heading: "What does restaurant video editing start from?",
          paragraphs: [
            `The [Starter package](/pricing/starter) starts from ${packageGuidePrice("arranque")} per project, while [Growth](/pricing/growth) starts from ${packageGuidePrice("crecimiento")} per month. These are Esteban's package starting points. They are useful when you already record your food, team, or dining room and need help turning that material into finished posts. A package name alone does not confirm the number of videos, filming, or every requested version.`,
            `For a separately scoped short-form edit, the calculator's indicative band is ${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}. It reflects an editing-led freelancer model with an introductory discount already applied, rather than a binding quote. Do not add that range to a package automatically: ask which approach fits your footage and intended posts. Full-crew Miami production companies quote a different model, so their proposals should be compared by included work.`,
          ],
        },
        {
          heading: "How does filming at the restaurant change the budget?",
          paragraphs: [
            `The indicative half-day on-location capture add-on is ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}. The [Local Presence package](/pricing/local-presence) separately starts from ${packageGuidePrice("presencia-local")} per production day. The capture add-on and package describe different scopes; neither should be treated as an all-inclusive restaurant campaign or combined without reviewing what is included. The indicative capture range uses the same editing-led freelancer basis and introductory discount.`,
            "Explain whether the camera needs to cover food preparation, plated dishes, staff speaking, or the dining room. Share the location, access arrangements, proposed filming window, and any restrictions during service. Those details help separate time spent filming from editing afterward. Review the [restaurant promo video service](/services/restaurant-promo-video-editing-miami), then ask for a written breakdown of capture, editing, final versions, and any additional expenses before agreeing to the shoot.",
          ],
        },
        {
          heading: "What can a published restaurant video help you compare?",
          paragraphs: [
            "The [Bar Door Monkey Miami project](/portfolio/bar-door-monkey) is a social-media promo spot for a Miami restaurant. Its published credits identify on-location videography and editing for the venue's Instagram. That makes it a relevant example when you want to discuss a restaurant social video. It does not establish what the restaurant paid, how long another shoot will take, or what results your own post will produce.",
            "Use the example to explain what you want viewers to notice about your venue. Point to the atmosphere, food, or overall presentation that matters to you, without assuming that every visual choice belongs in your project. Bring examples of your existing posts too. Comparing the desired finished piece with footage you already have helps identify whether you need editing alone or additional filming before a price is confirmed.",
          ],
        },
        {
          heading: "What should you send for a restaurant video quote?",
          paragraphs: [
            `Start with your restaurant's location, the dishes or experience you want to feature, and where you plan to publish. State whether you have original footage or need filming. The ${packageGuidePrice("arranque")} Starter price is a starting point for an editing project, so include samples of the material instead of assuming that a menu description is enough to price the work.`,
            "List the finished videos you need, language and caption preferences, requested delivery date, and who will approve the edit. If the content is intended for advertising, say so when discussing music and other assets. Use the [budget calculator](/calculator) for an indicative range, then send the information through [contact](/contact). The useful outcome is a written quote that identifies the work, versions, review terms, and agreed timing; a calculator result alone does not book production.",
          ],
        },
      ],
      faqs: [
        { question: "What is Esteban's starting price for an editing project?", answer: `Starter begins from ${packageGuidePrice("arranque")} per project. The short-form calculator band is separately ${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}. The quote identifies which scope applies.` },
        { question: "Is restaurant filming included in the editing price?", answer: `Do not assume it is included. The half-day capture add-on is an indicative ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}, while Local Presence starts from ${packageGuidePrice("presencia-local")} per production day.` },
        { question: "Is there a monthly option?", answer: `Growth starts from ${packageGuidePrice("crecimiento")} per month. Confirm the content scope and whether filming is required before comparing it with a standalone edit.` },
        { question: "Can I see a restaurant example?", answer: "See the [Bar Door Monkey project](/portfolio/bar-door-monkey), a Miami restaurant promo with videography and editing for Instagram. Its published credits do not establish your project's price." },
      ],
    },
    es: {
      slug: "cuanto-cuesta-un-video-para-restaurante-miami",
      metadataTitle: "Video para Restaurantes: Costos",
      title: "¿Cuánto cuesta un video para restaurante en Miami?",
      description: "Revisa los precios iniciales de edición de Esteban, los rangos orientativos de grabación y las opciones mensuales para tu restaurante en Miami.",
      eyebrow: "Precios para restaurantes",
      answer: `El paquete Arranque de Esteban Moreno Media parte desde ${packageGuidePrice("arranque")} por proyecto de edición; para grabar en tu restaurante, Presencia Local parte desde ${packageGuidePrice("presencia-local")} por jornada de producción. El material disponible, la grabación, las versiones y la frecuencia de publicación cambian la cotización.`,
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description: "Video promocional para las redes de un restaurante de Miami, con grabación en locación y edición para su Instagram. Nada publicado confirma el precio de ese proyecto.",
      },
      sections: [
        {
          heading: "¿Cuánto cuesta editar material que ya tienes?",
          paragraphs: [
            `[Arranque](/es/precios/arranque) parte desde ${packageGuidePrice("arranque")} por proyecto y [Crecimiento](/es/precios/crecimiento) desde ${packageGuidePrice("crecimiento")} al mes. Son precios iniciales de los paquetes de Esteban. Si ya grabas platos, al equipo o el ambiente del local, sirven para empezar a conversar sobre la edición. El nombre del paquete no confirma por sí solo cuántos videos recibirás ni si incluye grabación.`,
            `Para una edición de formato corto cotizada por separado, la calculadora muestra un rango orientativo de ${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}. Corresponde a un profesional independiente enfocado en edición, con el descuento introductorio aplicado; no es una cotización cerrada. No lo sumes automáticamente a un paquete. Las productoras de Miami con equipos completos trabajan con otro modelo: compara lo que incluye cada propuesta antes de comparar sus totales.`,
          ],
        },
        {
          heading: "¿Qué cambia si necesitas grabar en el restaurante?",
          paragraphs: [
            `El complemento de grabación en locación por media jornada tiene un rango orientativo de ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}. Por separado, [Presencia Local](/es/precios/presencia-local) parte desde ${packageGuidePrice("presencia-local")} por jornada de producción. No son servicios idénticos ni cantidades que debas sumar sin revisar lo incluido. El rango de grabación mantiene la misma base de profesional independiente y descuento introductorio.`,
            "Explica si quieres mostrar la preparación de los platos, conversar con el equipo o recorrer el comedor. Comparte la dirección, el acceso disponible, el horario propuesto y las limitaciones durante el servicio. Así puedes separar la grabación de la edición posterior. Revisa el servicio de [video promocional para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami) y pide que la propuesta detalle grabación, edición, versiones finales y gastos adicionales antes de acordar la sesión.",
          ],
        },
        {
          heading: "¿Qué puedes comparar con el video de Bar Door Monkey?",
          paragraphs: [
            "El [proyecto Bar Door Monkey Miami](/es/portafolio/bar-door-monkey) es un video promocional para las redes de un restaurante de Miami. Los créditos publicados incluyen grabación en locación y edición para el Instagram del establecimiento. Puedes usarlo como referencia del tipo de trabajo realizado, sin asumir cuánto pagó el restaurante ni qué resultados tendrá tu publicación.",
            "Al compartirlo, explica qué quieres que se vea de tu negocio: la comida, el ambiente o la presentación del lugar. Señala qué te interesa del ejemplo y qué harías diferente para tu restaurante. Incluye también publicaciones tuyas y muestras del material que ya tienes. Esa comparación ayuda a conversar sobre la pieza final y a decidir si basta con editar o si hace falta grabar. El ejemplo orienta la conversación; la propuesta escrita define el trabajo que vas a contratar.",
          ],
        },
        {
          heading: "¿Qué necesitas enviar para recibir una cotización?",
          paragraphs: [
            `Comparte la ubicación del restaurante, los platos o la experiencia que quieres destacar y los canales donde publicarás. Aclara si tienes archivos originales o necesitas grabación. Arranque parte desde ${packageGuidePrice("arranque")} por proyecto de edición, pero ese precio inicial no sustituye revisar el material y acordar las piezas que necesitas. Adjunta muestras que permitan entender tu punto de partida.`,
            "Indica las versiones finales, el idioma, los subtítulos, la fecha solicitada y quién aprobará los cambios. Si vas a pautar el video, menciónalo al conversar sobre música y otros recursos. Puedes usar la [calculadora de presupuesto](/es/calculadora) como orientación y enviar la información por [contacto](/es/contacto). Al terminar esta conversación, debes tener una cotización escrita con el trabajo incluido, las revisiones y las fechas acordadas. El resultado de la calculadora por sí solo no reserva una grabación.",
          ],
        },
      ],
      faqs: [
        { question: "¿Cuál es el precio inicial de edición?", answer: `Arranque parte desde ${packageGuidePrice("arranque")} por proyecto. El rango de formato corto de la calculadora es, por separado, ${usd(PRICING_BANDS.social.baseMin)}–${usd(PRICING_BANDS.social.baseMax)}. La cotización indica cuál corresponde a tu pedido.` },
        { question: "¿La edición incluye grabar en mi restaurante?", answer: `Debes confirmarlo. El complemento de media jornada tiene un rango orientativo de ${usd(PRICING_BANDS["on-location"].baseMin)}–${usd(PRICING_BANDS["on-location"].baseMax)}; Presencia Local parte desde ${packageGuidePrice("presencia-local")} por jornada de producción.` },
        { question: "¿Hay una opción mensual?", answer: `Crecimiento parte desde ${packageGuidePrice("crecimiento")} al mes. Confirma las piezas incluidas y si necesitas grabación antes de compararlo con un proyecto de edición individual.` },
        { question: "¿Dónde puedo ver un ejemplo para restaurantes?", answer: "Mira el [proyecto Bar Door Monkey](/es/portafolio/bar-door-monkey), con grabación y edición para el Instagram de un restaurante de Miami. Sus créditos no establecen el precio de tu proyecto." },
      ],
    },
  },
  {
    id: "real-estate-video-cost-guide",
    en: {
      slug: "how-much-does-real-estate-video-cost-miami",
      metadataTitle: "Miami Real Estate Photo/Video Cost",
      title: "How much does real estate photo and video cost in Miami?",
      description: "Read Esteban's property photography tiers, listing video rate, Zillow tour starting price, travel fees, and monthly plans before booking Miami listing media.",
      eyebrow: "Listing photo and video costs",
      answer: `Esteban's listing photography starts at ${listingPhotoStartingPrice} for ${REAL_ESTATE_MEDIA.photography[0].label.en.toLowerCase()}, and premium listing video is ${usd(listingVideo.amount)} per minute. Property size, selected services, travel, and repeat visits determine the applicable charges.`,
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description: "A social-media video edited by Esteban from agency-supplied footage. Nothing published confirms a listing shoot or price for that project.",
      },
      sections: [
        {
          heading: "What are the photography prices by property size?",
          paragraphs: [
            "Esteban's published listing photography card prices a shoot by the property's square footage. These are exact rates for the stated size tiers, rather than the broader calculator's indicative video-editing ranges. Confirm the property's size before selecting a tier and explain which spaces you need photographed. The largest tier requires a conversation rather than an assumed price.",
            "Use the [real-estate rate card](/pricing/real-estate) to discuss photography as a separate line from video or a tour. A low photography figure should not be read as the price of every listing service together. Share the address and access arrangements with your request so the applicable travel charge can also be checked.",
          ],
          bullets: REAL_ESTATE_MEDIA.photography.map((tier) => `${tier.label.en}: ${tier.amount === null ? "call to discuss" : usd(tier.amount)}.`),
        },
        {
          heading: "What do video, tours, and additional visits cost?",
          paragraphs: [
            `${listingVideo.name.en} is ${usd(listingVideo.amount)} per minute. A ${listingTour.name.en} starts from ${usd(listingTour.amount)}; ${listingTour.note.en.toLowerCase()} These are separate services, so specify whether you want photographs, a listing video, a tour, or a combination. Confirm the intended video length and finished files before treating a per-minute rate as a total project price.`,
            `The out-of-area fee is ${usd(listingTravel.amount)}. ${listingTravel.note.en} That stated boundary matters for a Miami address: ask how it applies to your location before booking. A reshoot costs ${usd(listingReshoot.amount)}. ${listingReshoot.note.en} Make sure the property is ready and that access is arranged for the agreed visit. If conditions change, discuss the next visit rather than assuming that weather or a preparation issue creates a free replacement session.`,
          ],
        },
        {
          heading: "How do the monthly property plans compare?",
          paragraphs: [
            "Monthly property plans are a separate offer from the per-shoot photography card. Choose between them by the properties you expect to market and the work you need each month. Do not read a monthly fee as a discount automatically applied to every standalone service, or assume that unused work carries forward without an agreement.",
            `The published minimum is ${REAL_ESTATE_PLAN_TERMS.minimumMonths} months. Review the [real-estate plans and prices](/pricing/real-estate) and confirm property eligibility, scheduled work, and any separately quoted services before choosing a plan. Share your likely listing schedule so the conversation starts with actual needs rather than the highest package. A written scope should make clear which monthly plan you selected and how additional requests will be handled.`,
          ],
          bullets: REAL_ESTATE_PLANS.map((plan) => `${plan.id.charAt(0).toUpperCase() + plan.id.slice(1)}: ${usd(plan.price)} per month; ${plan.properties} ${plan.properties === 1 ? "property" : "properties"} per month.`),
        },
        {
          heading: "Which terms should you read before booking?",
          paragraphs: [
            `${REAL_ESTATE_MEDIA.terms.en} These are the terms printed with the rate card, and they should be considered alongside the prices rather than after selecting a service. The reshoot fee is ${usd(listingReshoot.amount)}, with the stated exceptions and limits described above. Clarify preparation, access, and the requested services before agreeing to the visit.`,
            "Send the property size, address, requested photography or video services, and preferred date through [contact](/contact). Ask for the applicable rate, any travel charge, and the finished files to be confirmed together. The general [budget calculator](/calculator) can help with a separately scoped editing project, but it does not replace this property-size rate card. Your confirmed booking details should identify the service and conditions, without assuming that every package elsewhere on the site has the same pricing basis.",
          ],
        },
      ],
      faqs: [
        { question: "What is the first photography tier?", answer: `${REAL_ESTATE_MEDIA.photography[0].label.en}: ${listingPhotoStartingPrice}. Larger properties use the remaining published size tiers; the largest tier says call to discuss.` },
        { question: "Is listing video priced per minute?", answer: `Yes. ${listingVideo.name.en} is ${usd(listingVideo.amount)} per minute. Confirm the requested length and scope before calculating the total.` },
        { question: "Is the Zillow tour a fixed price?", answer: `The ${listingTour.name.en} starts from ${usd(listingTour.amount)}. ${listingTour.note.en}` },
        { question: "What commitment do monthly plans require?", answer: `The published minimum is ${REAL_ESTATE_PLAN_TERMS.minimumMonths} months. Confirm the selected plan and monthly work before booking. ${REAL_ESTATE_MEDIA.terms.en}` },
      ],
    },
    es: {
      slug: "cuanto-cuesta-video-inmobiliario-miami",
      metadataTitle: "Foto y Video Inmobiliario: Costos",
      title: "¿Cuánto cuesta el video y la foto inmobiliaria en Miami?",
      description: "Consulta las tarifas de fotos por tamaño, video por minuto, recorridos Zillow, traslados y planes mensuales de Esteban para propiedades en Miami.",
      eyebrow: "Precios de foto y video inmobiliario",
      answer: `La fotografía inmobiliaria de Esteban empieza en ${listingPhotoStartingPrice} para propiedades de ${REAL_ESTATE_MEDIA.photography[0].label.es.toLowerCase()}, y el video premium cuesta ${usd(listingVideo.amount)} por minuto. El tamaño, los servicios elegidos, el traslado y las visitas adicionales determinan los cargos aplicables.`,
      proof: {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        description: "Video para redes editado por Esteban con material entregado por la agencia. Nada publicado confirma una sesión inmobiliaria ni un precio para ese proyecto.",
      },
      sections: [
        {
          heading: "¿Cuánto cuestan las fotos según el tamaño de la propiedad?",
          paragraphs: [
            "La tarifa publicada de fotografía inmobiliaria depende del tamaño de la propiedad en pies cuadrados, indicado como SF. Son precios exactos para cada rango de tamaño, distintos de los estimados generales de edición de video. Confirma la superficie antes de elegir una tarifa y explica qué espacios necesitas fotografiar. Para la categoría más grande hay que conversar sobre el trabajo.",
            "Revisa la [lista de precios inmobiliarios](/es/precios/inmobiliaria) separando las fotos del video y del recorrido virtual. El precio de fotografía no representa todos los servicios juntos. Comparte también la dirección y las condiciones de acceso: así puedes confirmar el traslado aplicable y preparar la propiedad para la visita acordada.",
          ],
          bullets: REAL_ESTATE_MEDIA.photography.map((tier) => `${tier.label.es}: ${tier.amount === null ? "llama para conversar" : usd(tier.amount)}.`),
        },
        {
          heading: "¿Cuánto cuestan el video, el recorrido y las visitas adicionales?",
          paragraphs: [
            `El ${listingVideo.name.es.toLowerCase()} cuesta ${usd(listingVideo.amount)} por minuto. El ${listingTour.name.es.toLowerCase()} parte desde ${usd(listingTour.amount)}. ${listingTour.note.es} Son servicios separados: indica si necesitas fotos, video, recorrido o una combinación. Acuerda la duración del video y los archivos que recibirás antes de interpretar la tarifa por minuto como el total del trabajo.`,
            `El cargo fuera del área es de ${usd(listingTravel.amount)}. ${listingTravel.note.es} Esa condición importa para una dirección en Miami; confirma cómo aplica a tu propiedad. Repetir la sesión cuesta ${usd(listingReshoot.amount)}. ${listingReshoot.note.es} Organiza el acceso y prepara los espacios antes de la visita. Si cambia el clima o la propiedad no está lista, conversa sobre la nueva sesión sin asumir que quedará incluida gratuitamente.`,
          ],
        },
        {
          heading: "¿Cómo se comparan los planes inmobiliarios mensuales?",
          paragraphs: [
            "Los planes mensuales son una oferta diferente de la tarifa de fotografía por sesión. Compáralos según las propiedades que esperas publicar y el trabajo que necesitas durante el mes. No supongas que el pago mensual reduce automáticamente cada servicio individual ni que el trabajo no utilizado se acumula sin un acuerdo.",
            `El mínimo publicado es de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Revisa los [planes y precios inmobiliarios](/es/precios/inmobiliaria) y confirma qué propiedades aplican, qué trabajo se programa y qué se cotiza aparte. Comparte tu calendario previsto de propiedades para escoger según necesidades concretas. La propuesta debe indicar el plan elegido y cómo se atenderán los pedidos adicionales, de modo que puedas comparar el compromiso mensual con contratar sesiones individuales.`,
          ],
          bullets: REAL_ESTATE_PLANS.map((plan) => `${({ essential: "Esencial", plus: "Plus", premium: "Premium" })[plan.id]}: ${usd(plan.price)} al mes; ${plan.properties} ${plan.properties === 1 ? "propiedad" : "propiedades"} al mes.`),
        },
        {
          heading: "¿Qué condiciones debes revisar antes de reservar?",
          paragraphs: [
            `${REAL_ESTATE_MEDIA.terms.es} Son las condiciones impresas con las tarifas; conviene leerlas al elegir el servicio. Repetir una sesión cuesta ${usd(listingReshoot.amount)}, con las excepciones y los límites descritos arriba. Antes de acordar la visita, aclara la preparación de la propiedad, el acceso y los servicios solicitados para evitar supuestos sobre lo incluido.`,
            "Envía el tamaño, la dirección, las fotos o el video que necesitas y tu fecha preferida por [contacto](/es/contacto). Pide confirmar juntos la tarifa aplicable, el traslado y los archivos finales. La [calculadora de presupuesto](/es/calculadora) sirve para orientar un proyecto de edición cotizado por separado; no reemplaza esta lista por tamaño de propiedad. Al reservar, debes tener claro qué servicio contratas y bajo qué condiciones, sin trasladar automáticamente los precios de otros paquetes a una sesión inmobiliaria.",
          ],
        },
      ],
      faqs: [
        { question: "¿Cuál es la primera tarifa de fotografía?", answer: `${REAL_ESTATE_MEDIA.photography[0].label.es}: ${listingPhotoStartingPrice}. Para propiedades mayores aplican los demás rangos publicados; en la categoría más grande debes llamar para conversar.` },
        { question: "¿El video inmobiliario se cobra por minuto?", answer: `Sí. El ${listingVideo.name.es.toLowerCase()} cuesta ${usd(listingVideo.amount)} por minuto. Confirma la duración y el trabajo incluido antes de calcular el total.` },
        { question: "¿El recorrido de Zillow tiene un precio fijo?", answer: `El ${listingTour.name.es.toLowerCase()} parte desde ${usd(listingTour.amount)}. ${listingTour.note.es}` },
        { question: "¿Cuál es el compromiso de los planes mensuales?", answer: `El mínimo publicado es de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Confirma el plan y el trabajo mensual antes de reservar. ${REAL_ESTATE_MEDIA.terms.es}` },
      ],
    },
  },
];

export const guidesIndexCopy = {
  en: {
    path: "/guides",
    metadataTitle: "Practical Video Production Guides",
    description:
      "Practical guides for preparing footage, writing a video brief, choosing export formats, social Reels, restaurant marketing, and real estate video strategy.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Guides",
    breadcrumbLabel: "Breadcrumb",
    eyebrow: "Practical video guides",
    title: "Make the next video project easier to define and review.",
    answerLabel: "Quick answer:",
    answer:
      "Start with the guide that matches your next decision: organize footage, write the brief, choose final formats, or prepare a remote-editing handoff.",
    intro:
      "These guides offer general preparation steps, not Esteban Moreno Media policies. They do not assume a package, price, turnaround, review method, transfer method, or set of deliverables. If you want to audit your video approach first, try the [video strategy diagnostic](/assessment).",
    readLabel: "Read the guide",
    listFoldSummary: "See every guide",
    listFoldHint:
      "The other {count} guides: formats, pricing, audio, delivery, social, real estate and restaurants.",
    languageLabel: "Leer las guías en español",
    relatedEyebrow: "From planning to proof",
    relatedTitle: "Use the guides with real services and published work.",
  },
  es: {
    path: "/es/guias",
    metadataTitle: "Guías Prácticas de Video",
    description:
      "Cuatro guías prácticas para preparar material, escribir un brief, elegir formatos y organizar una edición remota de video.",
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Guías",
    breadcrumbLabel: "Migas de pan",
    eyebrow: "Guías prácticas de video",
    title: "Define y revisa tu próximo proyecto de video con más claridad.",
    answerLabel: "Respuesta rápida:",
    answer:
      "Empieza por la decisión que tienes pendiente: organizar el material, escribir el brief, elegir los formatos finales o preparar una edición remota.",
    intro:
      "Estas guías ofrecen pasos generales de preparación, no políticas de Esteban Moreno Media. No asumen paquetes, precios, plazos, método de revisión, transferencia ni entregables definidos. Si prefieres revisar primero el enfoque de tu contenido, puedes usar el [diagnóstico de estrategia de video](/es/evaluacion).",
    readLabel: "Leer la guía",
    listFoldSummary: "Ver todas las guías",
    listFoldHint:
      "Las otras {count} guías: formatos, precios, audio, entrega, redes, inmobiliaria y restaurantes.",
    languageLabel: "Read the guides in English",
    relatedEyebrow: "De la planificación a la prueba",
    relatedTitle: "Conecta las guías con servicios reales y trabajos publicados.",
  },
} as const;

const supportLinks: Record<GuideLocale, readonly GuideSupportLink[]> = {
  en: [
    {
      href: "/services#editing",
      label: "Explore video editing services",
      description:
        "Review the published video-editing service, which prioritizes remote editing for clients who already have footage.",
    },
    {
      href: "/services/short-form-video-editor-miami",
      label: "Short-form editing help",
      description:
        "Go straight to Reels, TikTok, and Shorts editing when the guide points to social video output.",
    },
    {
      href: "/services/ai-product-photography-miami",
      label: "AI product photo help",
      description:
        "Use the AI product photography page when the project is about ecommerce visuals, lifestyle product images, or ad concepts.",
    },
    {
      href: "/pricing",
      label: "Check starting prices",
      description:
        "Use the pricing page when a guide raises budget, quote, package, or cost questions.",
    },
    {
      href: "/portfolio",
      label: "Review selected video work",
      description:
        "Browse approved public projects with the descriptions and credits currently available.",
    },
    {
      href: "/contact",
      label: "Share a project brief",
      description:
        "Ask about a video-editing project and what information is needed to evaluate it.",
    },
  ],
  es: [
    {
      href: "/es/servicios#edicion",
      label: "Explorar servicios de edición",
      description:
        "Consulta el servicio publicado de edición, enfocado en trabajo remoto para clientes que ya tienen material.",
    },
    {
      href: "/es/editor-de-video-corto-para-redes-miami",
      label: "Ayuda con reels y shorts",
      description:
        "Ve directo a la página de edición vertical cuando la guía habla de Reels, TikTok o Shorts.",
    },
    {
      href: "/es/fotografia-de-producto-con-ia-miami",
      label: "Ayuda con fotos de producto con IA",
      description:
        "Usa la página de fotografía de producto con IA para imágenes de ecommerce, lifestyle o conceptos de anuncios.",
    },
    {
      href: "/es/precios",
      label: "Ver precios iniciales",
      description:
        "Consulta precios cuando una guía hable de presupuesto, cotización, paquetes o costos.",
    },
    {
      href: "/es/portafolio",
      label: "Ver trabajos de video publicados",
      description:
        "Explora proyectos públicos aprobados con las descripciones y los créditos disponibles.",
    },
    {
      href: "/es/contacto",
      label: "Compartir el brief de un proyecto",
      description:
        "Pregunta por un proyecto de edición y qué información se necesita para evaluarlo en español.",
    },
  ],
};

export function getGuides(locale: GuideLocale): Guide[] {
  return guidePairs.map((pair) => ({
    id: pair.id,
    locale,
    ...pair[locale],
  }));
}

export function getGuideBySlug(locale: GuideLocale, slug: string) {
  return getGuides(locale).find((guide) => guide.slug === slug);
}

export function getGuideById(locale: GuideLocale, id: GuideId) {
  return getGuides(locale).find((guide) => guide.id === id);
}

export function getGuidePath(guide: Guide) {
  return guide.locale === "es"
    ? `/es/guias/${guide.slug}`
    : `/guides/${guide.slug}`;
}

export function getGuideCompanion(guide: Guide) {
  return getGuideById(guide.locale === "en" ? "es" : "en", guide.id);
}

export function getGuideAlternates(guide: Guide) {
  const englishGuide = getGuideById("en", guide.id);
  const spanishGuide = getGuideById("es", guide.id);

  if (!englishGuide || !spanishGuide) {
    throw new Error(`Missing localized guide pair for ${guide.id}`);
  }

  const englishPath = getGuidePath(englishGuide);
  const spanishPath = getGuidePath(spanishGuide);

  return {
    "en-US": englishPath,
    "es-US": spanishPath,
    "x-default": englishPath,
  };
}

export function getGuideSupportLinks(locale: GuideLocale) {
  return supportLinks[locale];
}

export function getGuideStaticParams(locale: GuideLocale) {
  return getGuides(locale).map(({ slug }) => ({ slug }));
}

export function buildGuideMetadata(guide: Guide): Metadata {
  return buildPageMetadata({
    title: guide.metadataTitle,
    description: guide.description,
    path: getGuidePath(guide),
    locale: guide.locale,
    languages: getGuideAlternates(guide),
  });
}

export function buildGuidesIndexMetadata(locale: GuideLocale): Metadata {
  const copy = guidesIndexCopy[locale];
  return buildPageMetadata({
    title: copy.metadataTitle,
    description: copy.description,
    path: copy.path,
    locale,
    languages: {
      "en-US": guidesIndexCopy.en.path,
      "es-US": guidesIndexCopy.es.path,
      "x-default": guidesIndexCopy.en.path,
    },
  });
}

function buildBreadcrumbList(
  id: string,
  items: readonly { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildGuideStructuredData(guide: Guide) {
  const copy = guidesIndexCopy[guide.locale];
  const path = getGuidePath(guide);
  const pageUrl = absoluteUrl(path);
  const breadcrumbsId = `${pageUrl}#breadcrumbs`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: guide.title,
        description: guide.description,
        inLanguage: guide.locale === "es" ? "es-US" : "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        breadcrumb: { "@id": breadcrumbsId },
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: guide.title,
        description: guide.description,
        inLanguage: guide.locale === "es" ? "es-US" : "en-US",
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        author: {
          "@type": "Person",
          name: "Esteban Moreno",
          url: absoluteUrl(guide.locale === "es" ? "/es/sobre-esteban" : "/about"),
        },
        publisher: {
          "@type": "Organization",
          name: "Esteban Moreno Media",
          url: absoluteUrl(guide.locale === "es" ? "/es" : "/"),
        },
      },
      buildBreadcrumbList(breadcrumbsId, [
        {
          name: copy.breadcrumbHome,
          path: guide.locale === "es" ? "/es" : "/",
        },
        { name: copy.breadcrumbCurrent, path: copy.path },
        { name: guide.title, path },
      ]),
      ...(guide.faqs?.length
        ? [{
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: guide.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }]
        : []),
    ],
  };
}

export function buildGuidesIndexStructuredData(locale: GuideLocale) {
  const copy = guidesIndexCopy[locale];
  const pageUrl = absoluteUrl(copy.path);
  const breadcrumbsId = `${pageUrl}#breadcrumbs`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.metadataTitle,
        description: copy.description,
        inLanguage: locale === "es" ? "es-US" : "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        breadcrumb: { "@id": breadcrumbsId },
        hasPart: getGuides(locale).map((guide) => ({
          "@type": "WebPage",
          "@id": `${absoluteUrl(getGuidePath(guide))}#webpage`,
          url: absoluteUrl(getGuidePath(guide)),
          name: guide.title,
        })),
      },
      buildBreadcrumbList(breadcrumbsId, [
        {
          name: copy.breadcrumbHome,
          path: locale === "es" ? "/es" : "/",
        },
        { name: copy.breadcrumbCurrent, path: copy.path },
      ]),
    ],
  };
}
