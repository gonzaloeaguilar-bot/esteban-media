import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

import { PRODUCT_PHOTO_MARKET, usd } from "@/lib/pricing";

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
          heading: "Keep the source material clear",
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
          heading: "Explain the result you need",
          paragraphs: [
            "The footage does not explain the business goal by itself. Include the main message, where the video will be published, the requested format, and the deadline that matters to the project.",
            "Flag must-use moments and anything that should not be used. If there are several deliverables, name each one instead of assuming a single edit can cover every placement.",
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
          heading: "Finish with one handoff note",
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
          heading: "Mantén claro el material original",
          paragraphs: [
            "Conserva los archivos originales de video y audio. Agrúpalos por grabación, escena, fecha o cámara cuando esa separación ayude a entender qué material pertenece al mismo momento.",
            "Usa nombres cortos que describan el contenido. Una estructura sencilla sirve más que renombrar cada clip o crear un archivo complicado. Revisa cómo se organizó y editó el material entregado en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
          ],
          bullets: [
            "Videos originales agrupados por grabación o escena",
            "Archivos de audio separados, si existen",
            "Logos, gráficos aprobados y texto exacto en pantalla",
            "Referencias en una carpeta o lista de enlaces aparte",
          ],
        },
        {
          heading: "Explica el resultado que necesitas",
          paragraphs: [
            "El material por sí solo no explica la meta del negocio. Indica el mensaje principal, dónde se publicará el video, el formato solicitado y la fecha relevante para el proyecto.",
            "Marca los momentos obligatorios y lo que no debe usarse. Si necesitas varias piezas, nombra cada entrega en lugar de asumir que un solo corte funcionará en todos los canales.",
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
          heading: "Cierra con una sola nota de entrega",
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
          heading: "Start with the decision the video should support",
          paragraphs: [
            "Describe what the viewer should understand or do after watching. That answer is more actionable than asking for a video that is simply polished, dynamic, or engaging.",
            "Add the audience and publishing destination because pacing, framing, captions, and the call to action depend on how the piece will be used.",
          ],
          bullets: [
            "Goal: what should change after someone watches?",
            "Audience: who needs to understand the message?",
            "Placement: website, social feed, short-form channel, presentation, or archive",
          ],
        },
        {
          heading: "Name the material and deliverables",
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
          heading: "Make review and timing explicit",
          paragraphs: [
            "Include the deadline, the date the video will be used, and the person responsible for collecting feedback. These can be different facts, so write each one clearly.",
            "Use the brief to surface open questions instead of turning assumptions into promises. The eventual scope can define deliverables, timing, and review responsibilities for the individual project.",
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
          heading: "Empieza por la decisión que debe apoyar el video",
          paragraphs: [
            "Explica qué debe entender o hacer la persona después de ver la pieza. Esa respuesta orienta mejor que pedir un video solamente dinámico, profesional o atractivo.",
            "Agrega la audiencia y el lugar de publicación porque el ritmo, el encuadre, los subtítulos y el llamado a la acción dependen del uso final.",
          ],
          bullets: [
            "Meta: ¿qué debería cambiar después de ver el video?",
            "Audiencia: ¿quién necesita entender el mensaje?",
            "Uso: sitio web, red social, canal de video corto, presentación o archivo",
          ],
        },
        {
          heading: "Nombra el material y los entregables",
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
          heading: "Aclara la revisión y las fechas",
          paragraphs: [
            "Incluye la fecha límite, la fecha en que se usará el video y la persona responsable de reunir los comentarios. Pueden ser datos diferentes, por eso conviene escribir cada uno.",
            "Usa el brief para mostrar las preguntas pendientes en vez de convertir supuestos en promesas. El alcance de cada proyecto puede definir los entregables, los plazos y la responsabilidad de revisión.",
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
          heading: "Let the placement choose the first format",
          paragraphs: [
            "A 9:16 vertical frame and a 16:9 horizontal frame show different parts of the same shot. Decide which placement matters most before choosing the primary edit.",
            "Vertical video is commonly used in full-screen short-form feeds. Horizontal video is commonly used on YouTube, websites, presentations, and wider displays. Confirm the actual destination instead of exporting by habit.",
          ],
        },
        {
          heading: "Treat each reframe as a composition decision",
          paragraphs: [
            "A horizontal cut cannot always be cropped into a useful vertical piece. People, products, captions, and movement may need a different position or a different shot.",
            "When both orientations are requested, identify the priority version and list the secondary version separately. Do not assume one automatic crop will work; framing, text placement, and requested outputs still need to be defined for that project.",
          ],
          bullets: [
            "Keep the main subject readable in the narrower frame",
            "Check whether captions cover faces, products, or demonstrations",
            "Use a separate text layout when the crop changes",
            "Preview each export in the placement where it will appear",
          ],
        },
        {
          heading: "Use safe zones without inventing one permanent template",
          paragraphs: [
            "Platform controls, captions, account labels, and crop behavior can cover the outer parts of a frame. Keep essential information comfortably inside the composition and check the current platform preview before publishing.",
            "Avoid relying on one set of pixel measurements for every channel because interfaces can change. Save the exact wording and graphics separately so they can be repositioned when needed.",
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
          heading: "Deja que el uso final defina el primer formato",
          paragraphs: [
            "Un cuadro vertical 9:16 y uno horizontal 16:9 muestran partes diferentes de la misma toma. Decide qué canal es prioritario antes de elegir la edición principal.",
            "El video vertical se usa con frecuencia en canales de video corto a pantalla completa como [reels para negocios en Miami](/es/reels-para-negocios-miami) y [video para restaurantes en Miami](/es/video-para-restaurantes-miami). Para empresas y marcas que evalúan estos formatos, el encuadre 9:16 asegura máxima visibilidad en feeds móviles. El horizontal es común en YouTube, sitios web, presentaciones y pantallas anchas. Confirma el destino real en vez de exportar por costumbre.",
          ],
        },
        {
          heading: "Trata cada reencuadre como una nueva composición",
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
          heading: "Usa zonas seguras sin inventar una plantilla permanente",
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
          heading: "Package files and context together",
          paragraphs: [
            "Place the original footage, audio, approved graphics, copy, and references in a structure that another person can follow. Add one brief that explains the goal, intended use, deadline, and requested deliverables. For a real-world example of remote video post-production from supplied footage, explore the [Homeowners real estate editing project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)).",
            "Keep assumptions separate from confirmed facts. This preparation does not decide which files an editor will accept or what the eventual scope, transfer method, schedule, or deliverables will include.",
          ],
        },
        {
          heading: "Make feedback easy to locate",
          paragraphs: [
            "When reviewing any shared draft, identify the exact moment or element that needs attention. Write what should change and, when useful, why it matters to the message or placement.",
            "A timestamp can help when the chosen review method supports one, but no tool, number of review rounds, or feedback process is assumed here. Collecting comments before sending them can still reduce conflicting requests.",
          ],
          bullets: [
            "Name the exact moment or element",
            "Describe the requested change",
            "Include replacement wording when text must change",
            "Resolve conflicting feedback before sending it",
          ],
        },
        {
          heading: "List the requested output needs",
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
          heading: "Entrega juntos los archivos y el contexto",
          paragraphs: [
            "Organiza videos originales, audio, gráficos aprobados, textos y referencias de una forma que otra persona pueda seguir. Agrega un brief con la meta, el uso final, la fecha y los entregables solicitados. Como ejemplo práctico de postproducción remota con material externo, explora el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
            "Separa los supuestos de los datos confirmados. Esta preparación no decide qué archivos aceptará un editor ni qué incluirán el alcance, la transferencia, el calendario o los entregables finales.",
          ],
        },
        {
          heading: "Haz que los comentarios sean fáciles de ubicar",
          paragraphs: [
            "Al revisar cualquier versión compartida, identifica el momento o elemento exacto que necesita atención. Escribe qué debe cambiar y, cuando ayude, por qué importa para el mensaje o el canal.",
            "Una marca de tiempo puede ayudar cuando el método de revisión elegido la permite, pero esta guía no supone una herramienta, cantidad de rondas ni proceso de comentarios. Reunir las observaciones antes de enviarlas puede reducir solicitudes contradictorias.",
          ],
          bullets: [
            "Nombra el momento o elemento exacto",
            "Describe el cambio solicitado",
            "Incluye el texto nuevo cuando debe cambiar una frase",
            "Resuelve comentarios contradictorios antes de enviarlos",
          ],
        },
        {
          heading: "Enumera los formatos solicitados",
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
          heading: "Focus on one clear message per Reel",
          paragraphs: [
            "Short-form video works best when each piece addresses a single decision, question, or feature. Avoid packing an entire company overview into 30 seconds.",
            "Start with a strong hook in the first two seconds: show the product in action, state the customer problem, or ask a direct question. For culinary concepts and dining spots, specialized [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) showcases signature dishes and lively dining atmosphere within the first seconds.",
          ],
          bullets: [
            "One core point or offer per video",
            "Hook in the first 2 seconds",
            "Clear vertical 9:16 framing",
            "On-screen text or auto-captions for silent viewing",
          ],
        },
        {
          heading: "Record clean audio and intentional visuals",
          paragraphs: [
            "Good lighting and clear audio matter more than expensive camera gear. Position yourself near natural light and use a lapel or directional microphone whenever voice is recorded.",
            "Keep clips moving with quick cuts every 2 to 4 seconds to maintain viewer pacing without overwhelming the message.",
          ],
        },
        {
          heading: "Include a direct call to action",
          paragraphs: [
            "Tell the viewer what step to take next: visit your location, check the link in your bio, or comment for details. A clear call to action connects views to business inquiries.",
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
          heading: "Enfoca un solo mensaje claro por Reel",
          paragraphs: [
            "El video corto funciona mejor cuando cada pieza responde a una sola duda, decisión o función. Evita resumir toda la empresa en 30 segundos y enfócate en un solo beneficio. Para marcas y negocios locales que estructuran campañas de [reels para negocios en Miami](/es/reels-para-negocios-miami), el objetivo inicial es transmitir valor con claridad inmediata.",
            "Comienza con un gancho fuerte en los primeros dos segundos: muestra el producto en acción, menciona la necesidad del cliente o plantea una pregunta directa. En hostelería y gastronomía, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) destaca platos y ambiente desde el primer segundo.",
          ],
          bullets: [
            "Un punto clave u oferta por video",
            "Gancho en los primeros 2 segundos",
            "Encuadre vertical 9:16 claro",
            "Texto en pantalla o subtítulos para reproducción en silencio",
          ],
        },
        {
          heading: "Graba audio limpio y tomas intencionales",
          paragraphs: [
            "La buena iluminación y el audio claro importan más que equipos costosos. Ubícate cerca de luz natural y usa un micrófono lavalier o direccional cuando grabes voz. En gastronomía y hospitalidad, este enfoque se aplica en [video para restaurantes en Miami](/es/video-para-restaurantes-miami) para registrar la preparación de alimentos con luz óptima y sonido nítido.",
            "Mantén el ritmo con cortes cada 2 a 4 segundos para sostener la atención sin saturar el mensaje.",
          ],
        },
        {
          heading: "Incluye un llamado a la acción directo",
          paragraphs: [
            "Indica al espectador qué paso dar después: visitar la locación, revisar el enlace en la biografía o comentar para más detalles. Un llamado claro conecta vistas con consultas reales. Si quieres preparar un proyecto con material propio o captura selectiva, consulta nuestra página de [reels para negocios en Miami](/es/reels-para-negocios-miami).",
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
          heading: "Showcase signature dish preparation",
          paragraphs: [
            "Close-up video of sizzling food, plating, and fresh ingredients performs exceptionally well on Instagram and TikTok. Focus on sensory details like steam, crunch, and sauce pours. For culinary brands looking to elevate their menu marketing, dedicated [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) turns raw kitchen clips into high-converting promotional reels.",
          ],
          bullets: [
            "Signature dish close-ups and plating formatted for [restaurant promo video editing](/services/restaurant-promo-video-editing-miami)",
            "Chef's special or house creation backstory",
            "Cocktail preparation and pouring",
            "Customer reaction and table atmosphere",
          ],
        },
        {
          heading: "Capture peak dining atmosphere",
          paragraphs: [
            "Show prospective diners what it feels like to visit during busy evening service or weekend brunch. Natural lighting and ambient sound bring the space to life. Combining atmospheric venue b-roll with [short-form video editing](/services/short-form-video-editor-miami) drives weekend table bookings.",
          ],
        },
        {
          heading: "Highlight weekly specials and events",
          paragraphs: [
            "Create short, reusable 15-second templates to announce Happy Hour, weekend specials, or private dining availability.",
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
          heading: "Destaca la preparación de tus platos estrella",
          paragraphs: [
            "Los videos en primer plano de comida recién servida, el emplatado y los ingredientes frescos funcionan muy bien en Instagram y TikTok. Enfócate en detalles sensoriales como vapor, texturas y salsas. Si buscas postproducción especializada para tu local, consulta nuestro servicio de [video para restaurantes en Miami](/es/video-para-restaurantes-miami). Para negocios gastronómicos, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) convierte material de cocina en reels comerciales atractivos.",
          ],
          bullets: [
            "Primeros planos de platos estrella y emplatado con [edición de video para restaurantes](/es/edicion-de-video-promocional-para-restaurantes-miami)",
            "Historia detrás del plato del chef o especialidad",
            "Preparación de cocteles y servicio de bebidas",
            "Reacciones de clientes y ambiente en mesa",
          ],
        },
        {
          heading: "Captura el ambiente real en horas concurridas",
          paragraphs: [
            "Muestra a los futuros comensales cómo se siente visitar el restaurante durante la cena o el brunch del fin de semana. La luz adecuada y el ambiente real dan vida al espacio. Para planificar tomas o editar material capturado, revisa nuestra página de [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
          ],
        },
        {
          heading: "Resalta promociones semanales y eventos",
          paragraphs: [
            "Crea plantillas cortas de 15 segundos para anunciar el Happy Hour, platillos de temporada o la disponibilidad de salones privados.",
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
          heading: "Create high-impact property walkthroughs",
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
          heading: "Share educational homebuyer and seller advice",
          paragraphs: [
            "Answer one common buyer or seller question per video (e.g., closing cost surprises, inspection tips, or staging mistakes). Position yourself as the trusted local expert.",
          ],
        },
        {
          heading: "Feature local neighborhood guides",
          paragraphs: [
            "Showcase local coffee shops, parks, and dining spots near your active listings. Buyers invest in the lifestyle, not just the square footage.",
          ],
        },
        {
          heading: "Plan the two things South Florida listings stop you on",
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
          heading: "Cut it twice when half your buyers read Spanish",
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
          heading: "Crea recorridos de propiedades de alto impacto",
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
          heading: "Comparte consejos para compradores y vendedores",
          paragraphs: [
            "Responde una duda frecuente por video (gastos de cierre, inspecciones o errores de preparación). Posiciónate como el experto local de confianza.",
          ],
        },
        {
          heading: "Publica guías del vecindario local",
          paragraphs: [
            "Muestra cafeterías, parques y restaurantes cerca de tus propiedades activas. Los compradores eligen el estilo de vida, no solo los metros cuadrados.",
          ],        },
        {
          heading: "Planea las dos cosas que detienen una grabación en South Florida",
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
          heading: "Córtalo dos veces cuando la mitad de tus compradores lee en español",
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
          heading: "Use real product photos as reference anchors",
          paragraphs: [
            "AI product imagery works best when rooted in clean, original photos of the actual product. Feeding real product angles ensures logos, colors, and key details stay accurate.",
            "Avoid generating 100% synthetic products from scratch when selling physical items, as minor discrepancies can lead to customer returns.",
          ],
          bullets: [
            "Start with high-resolution reference photos",
            "Maintain true product proportions and colors",
            "Use AI primarily for backgrounds, lighting, and environments",
          ],
        },
        {
          heading: "Generate context-rich backgrounds and lighting",
          paragraphs: [
            "Rather than staging an expensive studio set for every lifestyle environment, AI image tools can place clean product cutouts into marble countertops, outdoor sunlight, or cozy kitchen settings. For dining and culinary brands, pairing AI product imagery with dynamic [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) offers a complete visual suite for menus and social feeds.",
            "Refine prompt direction to match your brand aesthetic, ensuring shadows and reflections look natural.",
          ],
        },
        {
          heading: "Maintain honest brand presentation",
          paragraphs: [
            "Be transparent when AI assistance is used for mockups or concepts. Highlighting creative design support builds trust while delivering modern, polished brand imagery.",
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
          heading: "Usa fotos reales del producto como ancla de referencia",
          paragraphs: [
            "Las imágenes de producto con IA funcionan mejor cuando se basan en fotos originales y limpias del producto real. Proveer ángulos reales garantiza que los logos, colores y detalles clave sigan siendo exactos.",
            "Evita generar productos 100% sintéticos desde cero al vender artículos físicos, ya que pequeñas diferencias pueden causar devoluciones de clientes.",
          ],
          bullets: [
            "Comienza con fotos de referencia en alta resolución",
            "Conserva proporciones y colores reales del producto",
            "Usa la IA principalmente para fondos, iluminación y entornos",
          ],
        },
        {
          heading: "Genera fondos y entornos llenos de contexto",
          paragraphs: [
            "En lugar de armar un set de estudio costoso para cada ambiente, las herramientas de IA pueden ubicar el producto en superficies de mármol, luz natural de exterior o ambientes cálidos. En el sector gastronómico, las marcas combinan estas piezas visuales con [video para restaurantes en Miami](/es/video-para-restaurantes-miami) para mostrar platos y ambiente con dinamismo. Combinar imágenes de menú con [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) ofrece una estrategia visual integral.",
            "Ajusta las instrucciones creativas para que coincidan con la estética de tu marca, cuidando que las sombras y reflejos se vean naturales.",
          ],
        },
        {
          heading: "Mantén una presentación de marca honesta",
          paragraphs: [
            "Sé transparente cuando la IA se use para mockups o conceptos. Destacar el apoyo creativo genera confianza mientras entrega piezas modernas y pulidas para la marca.",
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
          heading: "Key variables that shape product photography costs",
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
          heading: "Industry pricing models and market context",
          paragraphs: [
            "Commercial creators and studios typically use three pricing models: per-image rates, day rates, or complete project package pricing. Standard e-commerce catalog photos are usually billed per photo for larger volumes, while custom lifestyle launches are quoted on a project scope basis.",
            `As general South Florida market context, simple white-background catalog images are commonly quoted around ${usd(PRODUCT_PHOTO_MARKET.perImageMin)} to ${usd(PRODUCT_PHOTO_MARKET.perImageMax)} USD each, with Miami studios advertising entry rates near ${usd(PRODUCT_PHOTO_MARKET.miamiEntryPerImage)} per image; styled lifestyle work with props or models is quoted far higher per image, and half-day sessions in Miami commonly run ${usd(PRODUCT_PHOTO_MARKET.halfDayMin)} to ${usd(PRODUCT_PHOTO_MARKET.halfDayMax)} USD plus production expenses. These figures are published market rates for the area, not a price commitment from Esteban Moreno Media, and the ranges move with volume, retouching depth and usage rights. For a figure tied to your actual scope use the [budget estimator](/calculator), and for a written quote reach out via [contact](/contact).`,
          ],
        },
        {
          heading: "How to define scope for an accurate quote",
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
          heading: "Variables técnicas que determinan el costo y precio por fotografía de producto",
          paragraphs: [
            "El precio por fotografía de producto depende directamente del alcance operativo y la complejidad técnica del proyecto. En la producción comercial para e-commerce y catálogos de marca, el presupuesto final no se calcula con una cifra fija arbitraria, sino evaluando parámetros concretos antes de encender la primera luz en el estudio. Para marcas que buscan integrar tecnologías modernas de visualización, opciones como la [fotografía de producto con IA en Miami](/es/fotografia-de-producto-con-ia-miami) permiten generar entornos contextuales hiperrealistas sin los sobrecostos de construir escenografías físicas complejas.",
            "La primera variable determinante es el volumen total de productos o SKUs (Stock Keeping Units) y la cantidad de ángulos necesarios por artículo. No requiere el mismo tiempo de preparación fotografiar un lote uniforme de 50 suplementos alimenticios sobre fondo blanco estándar que capturar 10 piezas de joyería fina con superficies reflectantes que exigen difusores polarizados, macrofotografía milimétrica y apilamiento de enfoque (focus stacking) para mantener nitidez de borde a borde.",
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
          heading: "Modelos de cotización en el mercado y referencias de tarifas en South Florida",
          paragraphs: [
            "En la industria audiovisual y fotográfica comercial existen tres modelos habituales para estructurar los presupuestos de fotografía de producto: costo por imagen unitaria, tarifa por jornada de producción (day rate o half-day rate) y tarifa por paquete de proyecto cerrado.",
            "El modelo de costo por imagen unitaria es el estándar preferido en proyectos de catálogo e-commerce de mediano y alto volumen. Permite a las marcas calcular con exactitud su costo de adquisición visual por producto. En producciones donde los requisitos de iluminación y set cambian constantemente entre artículos, los fotógrafos y estudios suelen optar por tarifas de jornada, donde se reserva el estudio, el equipamiento de iluminación y el equipo humano por bloques de tiempo.",
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
          heading: "Estructura técnica de un presupuesto: qué incluye cada fase operativa",
          paragraphs: [
            "Un presupuesto profesional y transparente desglosa el costo del proyecto a través de sus fases operativas para que el cliente comprenda con total claridad el valor entregado y no enfrente sorpresas financieras durante la producción.",
            "La fase de preproducción incluye la revisión del brief técnico, la creación de la lista de tomas prioritaria (shot list), el armado de moodboards visuales y la planificación de las directrices de iluminación. Esta etapa garantiza que tanto el fotógrafo como la marca compartan la misma expectativa antes de manipular cualquier producto físico.",
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
          heading: "Cómo preparar un brief técnico para recibir una cotización precisa sin sobrecostos",
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
          heading: "Speed and turnaround comparison",
          paragraphs: [
            "Traditional studio shoots require physical set staging, lighting setup, model scheduling, and location permits, often taking weeks from concept to final edit.",
            "AI-assisted product visual creation leverages real reference photos to render lifestyle backgrounds in days, drastically shortening launch timelines.",
          ],
          bullets: [
            "Faster campaign iteration and A/B testing visuals",
            "Unlimited environment variations without set construction costs",
            "Consistent product accuracy when anchored with real product photos",
          ],
        },
        {
          heading: "When to choose traditional studio photography",
          paragraphs: [
            "Opt for traditional studio shoots when intricate physical hands, complex liquid splashes, or strict tactile texture interactions are critical to product demonstration.",
          ],
        },
        {
          heading: "The hybrid approach: best of both worlds",
          paragraphs: [
            "Many modern e-commerce brands take high-resolution studio reference photos of the product and use AI tools to generate seasonal lifestyle environments for advertising campaigns.",
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
          heading: "Comparativa de velocidad y tiempos de entrega",
          paragraphs: [
            "Las sesiones de estudio tradicionales requieren ambientación de sets, iluminación y permisos de locación, lo que suele tomar semanas entre producción y entrega final.",
            "La creación asistida por IA utiliza fotos reales de referencia para generar entornos de estilo de vida en días, reduciendo tiempos de lanzamiento.",
          ],
          bullets: [
            "Iteración rápida de campañas y pruebas visuales A/B",
            "Variaciones de entorno sin costos de construcción de set",
            "Precisión del producto garantizada mediante fotos reales de ancla",
          ],
        },
        {
          heading: "Cuándo elegir la fotografía de estudio tradicional",
          paragraphs: [
            "Elige fotografía tradicional de estudio cuando la interacción física directa con manos o salpicaduras complejas sea indispensable para mostrar el producto.",
          ],
        },
        {
          heading: "El enfoque híbrido: lo mejor de ambos mundos",
          paragraphs: [
            "Muchas marcas de e-commerce toman fotos limpias de estudio y usan IA para generar fondos de temporada y piezas publicitarias para redes sociales.",
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
          heading: "Core differences in responsibilities and physical vs post-production skills",
          paragraphs: [
            "Choosing between a video editor and a videographer begins with identifying where your project currently stands in the production lifecycle. While both roles are essential to professional video production, they require distinct skill sets, hardware environments, and technical disciplines.",
            "A videographer is an on-location production specialist. Their responsibility centers on the physical environment: scouting locations, configuring camera sensors, selecting optical focal lengths, rigging three-point lighting setups, positioning wireless lavaliers or boom microphones to control room acoustics, and directing on-camera talent. A videographer solves physical challenges in real time, capturing high-quality raw footage that provides the necessary creative coverage for the story.",
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
          heading: "Cost structures: On-location day rates vs per-project editing fees",
          paragraphs: [
            "Understanding how each professional prices their services helps marketing teams and business owners allocate their production budgets efficiently without paying premium on-set rates for desk-based post-production tasks.",
            "Videographers typically bill using half-day (4 to 5 hours) or full-day (8 to 10 hours) day rates. These rates cover not only their time on set, but also capital depreciation on expensive camera packages, lighting gear, transport, and insurance. Adding extra shoot days or specialized crew members immediately scales on-location expenses.",
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
          heading: "When to hire an editor, when to hire a videographer, and when you need both",
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
          heading: "Use a simple decision brief before requesting a quote",
          paragraphs: [
            "Before asking for pricing, write down what already exists and what still needs to be created. If the footage already exists, the conversation can focus on editing style, deliverables, pacing, captions, sound, color, and the platform where the video will appear. If the footage does not exist, the conversation needs to cover location access, people on camera, schedule, lighting, audio capture, and whether local production is realistic for the project.",
            "A useful brief does not need to be long. It should separate editing inputs from filming inputs so the person reviewing the request can tell whether you need post-production, on-location capture, or both. That prevents a vague request like \"we need a video\" from turning into a quote that includes the wrong role.",
            "For an editing-first request, send the current footage, the desired output length, target platform, reference style, required words or graphics, and one person responsible for feedback. For a filming request, add the location, date range, people or products involved, access limits, and whether your team already has a separate editor.",
          ],
          bullets: [
            "Editing-first: existing footage, target platform, aspect ratio, captions, graphics, music direction, and review contact",
            "Filming-first: location, schedule, access, people on camera, audio needs, shot list, and post-production plan",
            "Combined scope: creative direction, capture plan, editing deliverables, approval path, and any open questions",
          ],
        },
        {
          heading: "How raw footage handoff changes the role you should hire",
          paragraphs: [
            "The strongest signal is whether your raw footage is already usable. If you have clear audio, stable framing, enough angles, and footage that covers the story from beginning to end, a video editor can usually turn those assets into a finished piece without sending a camera team back into the field.",
            "If the available footage is missing essential moments, has unusable audio, lacks close-ups or establishing shots, or does not include the people and products the video needs to show, an editor can improve the material but cannot create true coverage that was never captured. That is when a videographer, or a combined production plan, becomes the more honest choice.",
            "For business content, this boundary matters because many projects start with partial assets: a phone recording from an event, a webinar replay, a few customer clips, or footage from a previous contractor. An editor-first workflow can work well when those assets need structure, captions, cleanup, and platform formatting. A videographer-first workflow fits when the business needs new images, controlled lighting, interviews, and intentional sound captured on location.",
          ],
          bullets: [
            "Good editor handoff: clear speech, stable shots, multiple angles, brand references, and enough footage to tell the story",
            "Weak editor handoff: distorted audio, missing scenes, unclear subject, no establishing shots, or footage that does not match the desired message",
            "Videographer need: new interviews, product demonstrations, venue coverage, controlled lighting, or on-camera direction",
          ],
        },
        {
          heading: "Common production pitfalls and how to brief each role effectively",
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
          heading: "Diferencias fundamentales de responsabilidades: set de grabación vs estación de postproducción",
          paragraphs: [
            "Elegir con precisión entre un editor de video y un videógrafo comienza por identificar en qué etapa del proceso audiovisual se encuentra tu proyecto. Aunque ambas disciplinas se complementan para crear piezas de alto nivel, operan en entornos técnicos, con herramientas y habilidades totalmente diferenciadas.",
            "Un videógrafo es el especialista técnico y creativo en el set de grabación. Su labor se concentra en el mundo físico: evaluar la acústica del espacio, diseñar esquemas de iluminación de tres puntos, seleccionar distancias focales y lentes adecuados, calibrar la exposición y perfiles de color del sensor, colocar micrófonos de solapa o direccionales y dirigir a las personas frente a cámara. El videógrafo resuelve contingencias en tiempo real para garantizar tomas nítidas, estables y bien iluminadas.",
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
          heading: "Estructura de costos: tarifas por jornada de rodaje vs proyectos de edición",
          paragraphs: [
            "Comprender los modelos de tarificación de cada profesional permite a negocios y marcas distribuir su inversión audiovisual con máxima eficiencia, evitando pagar costos de producción en locación para tareas que corresponden a postproducción.",
            "Los videógrafos suelen cobrar mediante tarifas por media jornada (half-day, 4 a 5 horas) o jornada completa (full-day, 8 a 10 horas). Estas tarifas amortizan la inversión en equipos de cámara, iluminación, transporte, seguros y tiempo en set. Añadir días adicionales de rodaje o asistentes técnicos incrementa directamente el presupuesto del proyecto.",
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
          heading: "Guía de decisión: cuándo contratar solo videógrafo, solo editor o producción integral",
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
          heading: "Usa un brief sencillo antes de pedir una cotización",
          paragraphs: [
            "Antes de pedir precio, escribe qué material ya existe y qué falta crear. Si el material ya está grabado, la conversación puede concentrarse en estilo de edición, entregables, ritmo, subtítulos, sonido, color y plataforma de publicación. Si el material no existe, la conversación debe cubrir acceso a la locación, personas en cámara, fechas, iluminación, captura de audio y si la producción local es realista para ese proyecto.",
            "Un brief útil no tiene que ser largo. Debe separar los insumos de edición de los insumos de grabación para que quien revise la solicitud entienda si necesitas postproducción, captura en locación o ambas cosas. Así una petición general como \"necesitamos un video\" no termina en una cotización basada en el rol equivocado.",
            "Para una solicitud de edición, envía el material actual, duración deseada, plataforma, estilo de referencia, textos o gráficos obligatorios y una persona responsable de consolidar comentarios. Para una solicitud de grabación, agrega locación, rango de fechas, personas o productos involucrados, límites de acceso y si tu equipo ya cuenta con editor aparte.",
          ],
          bullets: [
            "Primero edición: material existente, plataforma, formato, subtítulos, gráficos, música y contacto de revisión",
            "Primero grabación: locación, agenda, acceso, personas en cámara, audio, lista de tomas y plan de postproducción",
            "Alcance combinado: dirección creativa, plan de captura, entregables de edición, ruta de aprobación y preguntas abiertas",
          ],
        },
        {
          heading: "Errores comunes de planificación y cómo preparar el brief para cada profesional",
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
          heading: "Why remote editing accelerates turnaround and removes studio overhead",
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
          heading: "Cost structures: Project-based post-production vs local studio day rates",
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
          heading: "Collaboration tools and review workflows for remote video teams",
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
          heading: "When a local production studio is required vs when remote editing is ideal",
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
          heading: "Por qué la edición remota acelera las entregas y reduce costos fijos",
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
          heading: "Estructura de costos: Paquetes de edición vs tarifas por jornada de estudio local",
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
          heading: "Herramientas de colaboración y flujo de revisión para equipos remotos",
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
          heading: "Cuándo se necesita un estudio local y cuándo conviene la edición remota",
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
          heading: "Start with the business job, not a package name",
          paragraphs: [
            "A recruiting film, customer story, service explainer, event recap, and batch of short social edits solve different problems. Define the audience, desired action, distribution channels, and useful shelf life before discussing cameras or edit length.",
            "Esteban Moreno Media does not publish a universal fixed package for corporate video. The written quote should define the project-specific scope, deliverables, timing, review terms, and responsibilities.",
          ],
          bullets: [
            "Who needs to watch, and what should they understand or do next?",
            "Where will the video live: website, sales deck, YouTube, paid media, or social?",
            "Is this one flagship asset, a reusable content library, or both?",
          ],
        },
        {
          heading: "The scope factors that change a quote",
          paragraphs: [
            "The largest differences usually come from what must happen before the edit begins and how many finished versions the project needs. A quote is easier to evaluate when every assumption is written down.",
          ],
          bullets: [
            "Pre-production: brief, concept, script, interview prompts, schedule, and location planning.",
            "Capture: shoot time, locations, camera and audio needs, talent, travel, and any permits supplied by the client or production team.",
            "Post-production: footage volume, story edit, sound cleanup, color work, graphics, captions, licensed assets, and review rounds.",
            "Delivery: master length, cutdowns, aspect ratios, languages, file formats, deadlines, and usage requirements.",
          ],
        },
        {
          heading: "Choose the production path that matches what you already have",
          paragraphs: [
            "If your team already has usable footage, remote editing may be the cleanest scope. If the message depends on interviews, controlled sound, or consistent visual coverage, on-location production may be appropriate. A hybrid scope can combine a focused shoot with multiple edits for different channels.",
            "The right choice depends on the footage and business goal—not on a generic promise that one workflow is always cheaper or faster.",
          ],
        },
        {
          heading: "Send these facts to receive a comparable quote",
          paragraphs: [
            "A short, concrete brief reduces assumptions and makes competing estimates easier to compare. Include what is known and label what still needs recommendation.",
          ],
          bullets: [
            "Business goal, audience, intended call to action, and target channels.",
            "Existing footage or assets, filming location, people on camera, and preferred dates.",
            "Requested master video, cutdowns, captions, language versions, and file formats.",
            "Reference links, approval owner, deadline, and any must-use brand or legal language.",
          ],
        },
        {
          heading: "Compare quotes by exclusions and proof",
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
          heading: "Empieza por la tarea de negocio, no por el nombre de un paquete",
          paragraphs: [
            "Un video de reclutamiento, testimonio, explicación de servicio, resumen de evento y lote de piezas sociales resuelven problemas distintos. Define audiencia, acción deseada, canales y vida útil antes de hablar de cámaras o duración.",
            "Esteban Moreno Media no publica un paquete fijo universal. La cotización escrita debe definir alcance, entregables, plazos, revisiones y responsabilidades para ese proyecto.",
          ],
          bullets: ["Quién verá el video y qué debe entender o hacer.", "Dónde se publicará: web, ventas, YouTube, pauta o redes.", "Si necesitas una pieza principal, una biblioteca reutilizable o ambas."],
        },
        {
          heading: "Factores de alcance que cambian una cotización",
          paragraphs: [
            "Las diferencias principales suelen venir de lo que debe ocurrir antes de editar y de cuántas versiones finales necesita el proyecto. Cada supuesto debe quedar por escrito.",
          ],
          bullets: ["Preproducción: brief, concepto, guion, preguntas, agenda y locación.", "Grabación: tiempo, locaciones, cámara, sonido, talento, traslados y permisos.", "Postproducción: volumen de material, narrativa, audio, color, gráficos, subtítulos, licencias y revisiones.", "Entrega: duración, recortes, formatos, idiomas, archivos, fechas y uso."],
        },
        { heading: "Elige la ruta según el material que ya tienes", paragraphs: ["Si tu equipo ya tiene material usable, la edición remota puede ser el alcance más claro. Si el mensaje depende de entrevistas, sonido controlado o cobertura visual consistente, puede convenir producción en locación. Un alcance híbrido combina una grabación enfocada con varias ediciones.", "La elección depende del material y la meta; no de una promesa genérica de que un flujo siempre será más barato o rápido."] },
        { heading: "Envía estos datos para recibir una cotización comparable", paragraphs: ["Un brief corto y concreto reduce supuestos. Incluye lo conocido y marca lo que todavía necesita recomendación."], bullets: ["Meta, audiencia, llamada a la acción y canales.", "Material existente, locación, personas en cámara y fechas preferidas.", "Video principal, recortes, subtítulos, idiomas y formatos.", "Referencias, responsable de aprobación, fecha objetivo y lenguaje obligatorio."] },
        { heading: "Compara exclusiones y prueba publicada", paragraphs: ["Revisa si cada propuesta incluye preproducción, grabación, edición, audio, gráficos, subtítulos, revisiones, traslados, licencias y versiones finales. Pregunta qué genera un cambio de alcance.", "Después revisa trabajos publicados con créditos similares. Por ejemplo, el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)) acredita grabación en locación, captura de sonido y edición en South Florida. El portafolio demuestra el tipo de trabajo realizado; no un precio o resultado no publicado."] },
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
          heading: "Camera settings for clean footage",
          paragraphs: [
            "Set iPhone camera video format to 4K at 24fps or 30fps with Grid enabled to maintain steady composition.",
          ],
        },
        {
          heading: "Audio & lighting tips before uploading",
          paragraphs: [
            "Position key light facing the speaker and use a wireless lapel microphone to avoid echo during editing.",
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
          heading: "Configuración recomendada de cámara",
          paragraphs: [
            "Configura la cámara del iPhone en resolución 4K a 24fps o 30fps y activa la retícula para asegurar tomas niveladas.",
          ],
        },
        {
          heading: "Consejos de audio e iluminación",
          paragraphs: [
            "Orienta la luz principal hacia la persona y utiliza un micrófono de solapa inalámbrico para evitar reverberación.",
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
          heading: "Format specs and safe zones",
          paragraphs: [
            "All vertical platforms use 9:16 aspect ratio (1080x1920), but safe zones differ near bottom captions and side buttons.",
          ],
        },
        {
          heading: "Cross-posting workflow for local SMBs",
          paragraphs: [
            "Editing one master vertical video with clean audio allows simultaneous deployment across Instagram, TikTok, and Shorts.",
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
          heading: "Especificaciones y zonas seguras",
          paragraphs: [
            "Cada plataforma usa formato 9:16 (1080x1920), pero las áreas de botones y texto varían según la interfaz. Al planificar campañas de [reels para negocios en Miami](/es/reels-para-negocios-miami), respetar estas medidas previene que elementos clave queden ocultos.",
          ],
        },
        {
          heading: "Flujo de publicación multiplataforma",
          paragraphs: [
            "Editar un video vertical maestro permite distribuir el contenido simultáneamente en Instagram, TikTok y YouTube Shorts. Si buscas optimizar el contenido para audiencias locales en el sur de la Florida, revisa [reels para negocios en Miami](/es/reels-para-negocios-miami). Para locales gastronómicos que promocionan especialidades y eventos, consultar [video para restaurantes en Miami](/es/video-para-restaurantes-miami) permite preparar piezas verticales optimizadas para comensales.",
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
          heading: "Where automated AI video tools save time in post-production",
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
          heading: "Where automated tools struggle: Narrative pacing, emotion, and context",
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
          heading: "The modern hybrid workflow: How professional editors leverage AI",
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
          heading: "Choosing between AI software and a professional editor based on project stakes",
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
          heading: "Preparing your footage brief for human editing or hybrid workflows",
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
          heading: "Áreas donde las herramientas automatizadas de IA ahorran tiempo",
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
          heading: "Límites del software automatizado: Narrativa, emoción y contexto",
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
          heading: "El flujo de trabajo híbrido: Cómo los editores profesionales integran la IA",
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
          heading: "Cómo elegir entre software automatizado y un editor profesional según el proyecto",
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
          heading: "Recomendaciones para preparar el material antes de iniciar la edición",
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
          heading: "Verifying real portfolio credits",
          paragraphs: [
            "Look for named client credits and published project links rather than generic stock footage reels. For instance, the [Homeowners real estate editing project](/portfolio/homeowners) (and [Homeowners case study](/case-studies/homeowners)) provides verifiable proof of client post-production with agency-supplied footage.",
          ],
        },
        {
          heading: "Communication & bilingual workflow",
          paragraphs: [
            "Choose an editor who provides clear scoping questions and fluent communication in both English and Spanish for South Florida campaigns. Real client work like the [Healthy Smile Miami dental project](/portfolio/healthy-smile) (and its [Healthy Smile case study](/case-studies/healthy-smile)) demonstrates end-to-end local production coordination in English and Spanish.",
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
          heading: "Verificación de créditos reales",
          paragraphs: [
            "Revisa proyectos públicos aprobados con nombres de clientes reales en lugar de resúmenes genéricos con material de stock. Por ejemplo, el [proyecto Homeowners](/es/portafolio/homeowners) y su [caso de estudio](/es/casos-de-estudio/homeowners) muestran una postproducción verificada a partir de material suministrado por agencia.",
          ],
        },
        {
          heading: "Flujo de trabajo bilingüe claro",
          paragraphs: [
            "Elige un editor que comunique los requerimientos con precisión tanto en español como en inglés para el mercado de South Florida. Trabajos reales de clientes como el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)) demuestran coordinación bilingüe de producción en locación y edición en Miami.",
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
          heading: "Standardizing folder structures for agency handoff",
          paragraphs: [
            "Organize raw footage by camera angle, audio tracks, logos, and brand guidelines before sharing cloud folders. For an example of working seamlessly with agency-supplied assets, review the [Homeowners real estate editing project](/portfolio/homeowners) (commissioned via 300 Bees and detailed in the [Homeowners case study](/case-studies/homeowners)).",
          ],
        },
        {
          heading: "Managing revision rounds efficiently",
          paragraphs: [
            "Use frame-accurate video review tools and batch feedback to minimize turn-around cycles for client campaigns.",
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
          heading: "Estandarización de carpetas de proyecto",
          paragraphs: [
            "Clasifica los clips por cámara, fuentes de audio y logotipos antes de compartir la carpeta en la nube. Como ejemplo de trabajo con material entregado por agencias, revisa el [proyecto Homeowners](/es/portafolio/homeowners) (gestionado con la agencia 300 Bees y detallado en su [caso de estudio](/es/casos-de-estudio/homeowners)).",
          ],
        },
        {
          heading: "Gestión eficiente de revisiones",
          paragraphs: [
            "Agrupa las observaciones de cambios en listas específicas con marcas de tiempo para agilizar la entrega final.",
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
          heading: "Identifying high-performing clip moments",
          paragraphs: [
            "Look for standalone insights, strong opinions, or story climaxes in podcast recordings that make viewers pause. For food and hospitality shows, our [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) extracts culinary highlights and chef interviews into dynamic short-form reels.",
          ],
        },
        {
          heading: "Formatting for vertical mobile screens",
          paragraphs: [
            "Crop to 9:16 ratio, place speaker face centered, and overlay dynamic subtitles in the lower-third safe zone.",
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
          heading: "Identificación de momentos clave",
          paragraphs: [
            "Selecciona fragmentos con ideas potentes o respuestas directas que funcionen de forma independiente. En restaurantes y negocios de comida, grabaciones de cocina completa o entrevistas con el chef se pueden dividir en múltiples clips promocionales mediante [video para restaurantes en Miami](/es/video-para-restaurantes-miami). En gastronomía, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) transforma grabaciones largas en clips sociales ágiles.",
          ],
        },
        {
          heading: "Adaptación al formato 9:16 vertical",
          paragraphs: [
            "Ajusta el encuadre móvil, centra la imagen del hablante y añade subtítulos llamativos en la zona segura. Para proyectos comerciales locales, consulta nuestra página de [reels para negocios en Miami](/es/reels-para-negocios-miami) para definir ganchos y llamados a la acción efectivos y mantener presencia continua con costos de producción eficientes.",
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
          heading: "How small businesses in Fort Lauderdale should evaluate video editors for reels",
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
          heading: "Comparing video editing options in Fort Lauderdale and South Florida",
          paragraphs: [
            "When small businesses compare local video editing and production providers in Fort Lauderdale, options range between freelance marketplaces, specialized boutique editors, and full-service commercial production agencies.",
            "Freelance platforms (like Thumbtack, Upwork, or Bark) provide wide directory listings of individual freelancers charging $50 to $150 per hour or per-clip rates, though quality consistency, turnaround discipline, and bilingual fluency vary widely. Traditional full-service video production companies in Broward County focus primarily on multi-person commercial film crews with day rates spanning $2,000 to $10,000+, which can be excessive when a business only needs consistent weekly social reels.",
            "Esteban Moreno Media provides a focused, editing-led model based in Fort Lauderdale. With remote editing packages starting from $100 per project ([Starter package](/pricing/starter)) and ongoing monthly content management starting from $640/month ([Growth package](/pricing/growth)), small businesses get dedicated bilingual editing, sound design, and vertical formatting without studio markups. When physical filming is required, local production days start from $800 ([Local Presence package](/pricing/local-presence)).",
          ],
          bullets: [
            "Freelance marketplaces: Variable quality and communication; useful for one-off tasks with low strategic requirements",
            "Full-service production agencies: Built for high-budget broadcast commercials ($2,500-$10,000+ per shoot day)",
            "Editing-led boutique studio (Esteban Moreno Media): Clear starting packages ($100 project / $640 month), rapid turnaround, and bilingual English/Spanish delivery",
          ],
        },
        {
          heading: "What footage and assets to send your editor for high-converting social reels",
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
          heading: "Revision scope, deliverables, and turnaround expectations",
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
          heading: "Cómo evaluar editores de video en Fort Lauderdale para reels y redes sociales",
          paragraphs: [
            "Contratar un editor de video para Instagram Reels, TikTok y YouTube Shorts en Fort Lauderdale depende de si tu negocio ya graba material interno o necesita rodaje en locación. Para restaurantes, concesionarios, clínicas y empresas de servicios locales que registran video con smartphone o cámaras propias, contratar un especialista enfocado en edición elimina los altos costos de alquiler de estudios.",
            "Un editor profesional de formato corto transforma tomas en bruto en videos verticales 9:16 de alta retención mediante ganchos visuales en los primeros 3 segundos, ritmo sincronizado con la pista musical, subtítulos dinámicos en zonas seguras, balance de color y diseño de sonido. Conoce cómo transformamos tomas de agencia en piezas dinámicas en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
          ],
          bullets: [
            "Flujo centrado en edición: Tú grabas los videos; el editor se encarga del ritmo, ganchos, subtítulos, color y audio",
            "Producción en locación: El videógrafo acude con equipo de cámara, iluminación y sonido a tu local en Fort Lauderdale o Broward",
            "Plan social mensual: Entregas constantes de 4 a 16 reels al mes con revisiones organizadas",
          ],
        },
        {
          heading: "Comparativa de opciones de edición de video en Fort Lauderdale y South Florida",
          paragraphs: [
            "Al comparar proveedores de video en Fort Lauderdale, las opciones abarcan plataformas freelance, estudios boutique de edición y productoras tradicionales de cine publicitario.",
            "Las plataformas freelance (como Thumbtack, Upwork o Bark) ofrecen listados de editores independientes con tarifas de $50 a $150 por hora, aunque la consistencia de calidad y la comunicación bilingüe varían considerablemente. Las productoras tradicionales en Broward County cobran tarifas diarias de $2,000 a $10,000+ enfocadas en rodajes de gran escala, lo cual resulta innecesario para publicaciones semanales en redes.",
            "Esteban Moreno Media ofrece un modelo directo y ágil desde Fort Lauderdale. Con paquetes de edición remota desde $100 por proyecto ([paquete Arranque](/es/precios/arranque)) y planes mensuales desde $640 al mes ([paquete Crecimiento](/es/precios/crecimiento)), los negocios obtienen postproducción profesional, diseño sonoro y entregas bilingües sin costos de agencia. Para rodajes presenciales, las jornadas de producción parten desde $800 ([paquete Presencia Local](/es/precios/presencia-local)).",
          ],
          bullets: [
            "Directorios freelance: Calidad variable y gestión directa requerida por el cliente",
            "Productoras comerciales tradicionales: Enfocadas en spots publicitarios de gran presupuesto ($2,500-$10,000+ por jornada)",
            "Estudio de edición especializado (Esteban Moreno Media): Paquetes claros ($100 proyecto / $640 mes), entregas rápidas y atención bilingüe en español e inglés",
          ],
        },
        {
          heading: "Qué material entregar a tu editor para reels de alta conversión",
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
          heading: "Alcance de revisiones, entregables y tiempos de respuesta",
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
          heading: "The 3-Second Hook Rule",
          paragraphs: [
            "Capture immediate scroll attention with high-energy movement or an intriguing statement in the opening 3 seconds, such as the hook-driven patient clinic concept in the [Healthy Smile Miami video project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)). For hospitality campaigns, specialized [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) pairs sensory soundscapes with fast-paced dish reveals to maximize reservation conversion.",
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
          heading: "La regla del gancho de 3 segundos",
          paragraphs: [
            "Detén el desplazamiento en redes con movimiento enérgico o una frase impactante durante los primeros 3 segundos, tal como se estructuró el guion de clínica en el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)). Para anuncios de comida y bebidas, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) utiliza ganchos visuales sensoriales que impulsan visitas al local, y para locales comerciales puedes revisar los formatos aplicados en [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
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
          heading: "Microphone Placement for Clear Dialogue",
          paragraphs: [
            "Attach lavalier mics firmly to clothing to eliminate rustle and isolate speech from room echo. For an example of crisp on-location clinical dialog capture, review the [Healthy Smile Miami dental video project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
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
          heading: "Colocación de micrófono para voz nítida",
          paragraphs: [
            "Fija los micrófonos de solapa firmemente en la ropa para evitar roces y aislar el habla del eco ambiental. Como ejemplo de captura de audio y diálogo en locación clínica, revisa el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)).",
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
          heading: "Maintaining Text Safe Zones",
          paragraphs: [
            "Keep subtitles away from bottom Instagram UI buttons and top account headers to ensure full legibility. When formatting dynamic text for dining reels, [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) balances animated captions with mouth-watering food visuals.",
          ],
        },
        {
          heading: "Choose caption styles by viewing context",
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
          heading: "Balance highlighting with readability",
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
          heading: "Zonas seguras de texto en pantalla",
          paragraphs: [
            "Evita colocar texto sobre los botones inferiores de Instagram o el encabezado superior para garantizar lectura completa. Mantener los textos en la zona central es indispensable en [reels para negocios en Miami](/es/reels-para-negocios-miami) y [video para restaurantes en Miami](/es/video-para-restaurantes-miami) donde la mayoría de reproducciones ocurre en silencio. En reels gastronómicos, la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) mantiene subtítulos limpios que no tapan los platos.",
          ],
        },
        {
          heading: "Elige el estilo según cómo se verá el video",
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
          heading: "Resalta sin perder legibilidad",
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
          heading: "Bandwidth realities and choosing the fastest transfer method",
          paragraphs: [
            "Transferring large video files to a remote video editor without multi-day upload delays requires matching your transfer method to total project data volume and actual internet connection speeds. Modern digital cinema and mirrorless cameras capture substantial bitrates: standard 4K 10-bit Apple ProRes 422 HQ generates approximately 110 GB per hour of recorded footage, Sony XAVC-I reaches 240 to 600 Mbps, and raw formats like Canon Cinema RAW Light or REDCODE RAW can easily generate 500 GB to over 1 TB across a single multi-camera commercial shoot.",
            "Internet speed bottlenecks usually occur on the upload side. While commercial facilities may have symmetrical 1 Gbps fiber connections (capable of transferring 100 GB in roughly 15 to 20 minutes), typical office and residential broadband operates on asymmetric cable connections offering 300 to 500 Mbps download but only 20 to 35 Mbps upload. At 30 Mbps upload, a 150 GB raw footage folder requires over 11 hours of uninterrupted bandwidth, making unoptimized uploads a common project bottleneck.",
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
          heading: "The proxy editing workflow: moving a fraction of the bytes",
          paragraphs: [
            "The industry-standard solution for editing high-resolution 4K and 6K productions remotely without moving hundreds of gigabytes across the internet is the offline/online proxy workflow. Instead of uploading bulky raw camera masters, the on-set production team generates lightweight, edit-friendly proxy files locally before uploading.",
            "A proxy file is a low-bitrate duplicate of the raw footage encoded in an efficient intra-frame codec, such as Apple ProRes Proxy on macOS or Avid DNxHR LB cross-platform. Generating 1080p proxies produces a far lighter set of files that transfers in a fraction of the time, while strictly preserving original camera timecode, frame rate, reel names, clip file names, and multi-channel audio tracks, so the edit relinks cleanly to the originals at the end.",
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
          heading: "Standardized folder hierarchy and checksum verification",
          paragraphs: [
            "Organizing assets into an unambiguous folder structure before uploading eliminates missing file errors, relinking failures, and confusion over which takes are current. Never dump loose video clips, voice memos, and graphics into a single root folder.",
            "A professional folder architecture organizes source material logically from day one: `01_Footage` (subdivided by camera angle `Cam_A`, `Cam_B`, or date/card number), `02_Audio` (separate 24-bit 48kHz WAV multi-track microphone stems, boom recordings, and lavaliers), `03_Assets` (vector SVG/AI logos, brand guideline PDFs, approved graphics, and fonts), and `04_Briefs` (project summary, platform specifications, and target delivery dates).",
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
          heading: "Structuring handoff documentation and technical metadata",
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
          heading: "Organización de carpetas de material",
          paragraphs: [
            "Agrupa archivos por fecha, ángulo de cámara y pistas de audio antes de subir para evitar retrasos por activos faltantes. Para revisar cómo funciona una entrega remota de material de agencia, consulta el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
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
          heading: "Capturing Dual-Language Search Intent",
          paragraphs: [
            "Publishing dedicated Spanish and English video assets allows brands to rank in both language search indexes simultaneously, a strategy exemplified by local business projects like the [Healthy Smile Miami dental campaign](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
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
          heading: "Captación de búsquedas en ambos idiomas",
          paragraphs: [
            "Publicar activos de video dedicados en español e inglés permite posicionarse en ambos índices de búsqueda de forma simultánea, una estrategia respaldada en proyectos locales como la campaña de [Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)). En el mercado restaurantero y gastronómico de Miami, las piezas de [video para restaurantes en Miami](/es/video-para-restaurantes-miami) conectan de manera directa con comensales locales y turistas internacionales.",
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
          heading: "Selecting Dimensions per Destination Platform",
          paragraphs: [
            "Tailor export resolutions to native platform specs to prevent unwanted cropping or letterboxing.",
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
          heading: "Selección de dimensiones por plataforma de destino",
          paragraphs: [
            "Adapta las resoluciones de exportación a las especificaciones nativas de cada plataforma para evitar recortes no deseados.",
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
          heading: "The Two-Step Color Workflow",
          paragraphs: [
            "Always normalize LOG/RAW footage through color correction before applying creative LUTs or color grades.",
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
          heading: "El proceso de color en dos pasos",
          paragraphs: [
            "Normaliza siempre tomas en formato LOG/RAW mediante corrección técnica antes de aplicar estilos creativos finales.",
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
          heading: "Audio Ducking Techniques",
          paragraphs: [
            "Automatically lower background music volume whenever dialogue is spoken to maintain 100% vocal clarity, as demonstrated in the dialogue balancing for the [Healthy Smile Miami video project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
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
          heading: "Técnicas de atenuación de música (ducking)",
          paragraphs: [
            "Reduce automáticamente el volumen de la pista musical cada vez que el hablante interviene para garantizar la máxima nitidez, tal como se aprecia en el balance de diálogos del [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)).",
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
          heading: "Matching Action to Narrative",
          paragraphs: [
            "Cut away to action clips precisely on natural sentence pauses to support the speaker's core points seamlessly.",
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
          heading: "Coincidencia de acción y narrativa",
          paragraphs: [
            "Inserta tomas de apoyo en las pausas naturales de las frases para respaldar las ideas del portavoz de forma fluida. En producciones de hospitalidad y gastronomía, este ritmo de cortes B-roll con planos detalle se aplica ampliamente en [video para restaurantes en Miami](/es/video-para-restaurantes-miami).",
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
          heading: "Platform Retention Curves",
          paragraphs: [
            "Mobile feed viewers drop off rapidly after 30 seconds unless the narrative constantly introduces new visual stimuli.",
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
          heading: "Curvas de retención en móviles",
          paragraphs: [
            "La audiencia en dispositivos móviles decae tras los 30 segundos si el video no introduce nuevos estímulos visuales. En formatos promocionales de comida y bebidas como en [video para restaurantes en Miami](/es/video-para-restaurantes-miami), duraciones de 15 a 25 segundos con ritmo ágil maximizan la tasa de visualización completa.",
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
          heading: "The 3-Element Rule",
          paragraphs: [
            "Limit thumbnail visual clutter to no more than 3 distinct focus elements to maintain instant clarity on small mobile screens.",
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
          heading: "Regla de los 3 elementos visuales",
          paragraphs: [
            "Limita la composición a un máximo de 3 elementos principales para asegurar legibilidad inmediata en dispositivos móviles.",
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
          heading: "Applying Pattern Interrupts",
          paragraphs: [
            "Use subtle zooms, text pop-ups, or angle shifts to re-engage viewer attention throughout the video timeline.",
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
          heading: "Aplicación de interrupciones de patrón",
          paragraphs: [
            "Utiliza zooms sutiles, apariciones de texto o cambios de ángulo para mantener la atención a lo largo de la línea de tiempo.",
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
          heading: "Direct Collaborative Feedback",
          paragraphs: [
            "Working directly with a dedicated editor eliminates agency account manager gatekeeping and speeds up review turnarounds.",
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
          heading: "Comunicación directa sin intermediarios",
          paragraphs: [
            "Tratar directamente con el editor elimina gestores de cuentas e intermediarios, agilizando las revisiones de proyecto.",
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
          heading: "Stabilizing Flight Wobble",
          paragraphs: [
            "Use post-production warp stabilization to remove wind wobble and create silky-smooth cinematic aerial moves, similar to the property walkthrough sequencing in the [Homeowners real estate editing project](/portfolio/homeowners) (detailed in the [Homeowners case study](/case-studies/homeowners)).",
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
          heading: "Estabilización de oscilaciones por viento",
          paragraphs: [
            "Aplica estabilización de posproducción para corregir ráfagas de viento y lograr desplazamientos aéreos ultra-fluidos, como se aprecia en el montaje inmobiliario del [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
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
          heading: "Funnel-Stage Video Mapping",
          paragraphs: [
            "Deliver bite-sized social videos for awareness while keeping in-depth case study edits on high-converting landing pages. For an example of converting local clinic traffic through structured video, review the [Healthy Smile Miami dental project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
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
          heading: "Mapeo de videos según etapa de compra",
          paragraphs: [
            "Publica cápsulas cortas en redes para generar interés y reserva los videos detallados de casos para páginas de venta. Para revisar cómo un video promocional apoya la conversión en consultorios locales, consulta el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)).",
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
          heading: "Importance of Room Tone Recording",
          paragraphs: [
            "Record 10 seconds of silent room tone on location so your editor can sample background noise for clean audio subtraction, as applied to on-location dental clinic audio in the [Healthy Smile Miami video project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
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
          heading: "Importancia del registro de tono de sala",
          paragraphs: [
            "Graba 10 segundos de silencio ambiental en el lugar de rodaje para facilitar la eliminación digital de ruido de fondo, tal como se aplicó en el audio en locación del [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)).",
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
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published testimonial video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Eliciting Authentic Emotional Answers",
          paragraphs: [
            "Ask open-ended questions focused on problem-solving rather than scripted product praise to ensure genuine audience trust. For an example of a patient story approach on location, review the [Healthy Smile Miami dental video project](/portfolio/healthy-smile) (detailed in the [Healthy Smile case study](/case-studies/healthy-smile)).",
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
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen edición de testimoniales. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "Respuestas emotivas y genuinas",
          paragraphs: [
            "Formula preguntas abiertas enfocadas en la resolución de problemas para lograr un testimonio cercano y creíble. Como referencia de narración y producción en locación, revisa el [proyecto Healthy Smile Miami](/es/portafolio/healthy-smile) (y su [caso de estudio](/es/casos-de-estudio/healthy-smile)).",
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
          heading: "Handling Widescreen Footage in Vertical Canvas",
          paragraphs: [
            "Use styled background blur fills or pan-and-scan crops when adapting horizontal 16:9 footage into vertical 9:16 reels.",
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
          heading: "Adaptación de tomas horizontales a canvas vertical",
          paragraphs: [
            "Utiliza rellenos de desenfoque o reencuadres dinámicos al adaptar material horizontal 16:9 a formato vertical 9:16.",
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
          heading: "Choosing Export Codecs per Destination",
          paragraphs: [
            "Use Apple ProRes 422 for editing master archives and H.264 MP4 with AAC audio for web and social uploads, combining disparate camera codecs into a unified color-graded master as illustrated in the [Homeowners real estate editing project](/portfolio/homeowners) (detailed in the [Homeowners case study](/case-studies/homeowners)).",
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
          heading: "Elección de códecs según el destino final",
          paragraphs: [
            "Utiliza Apple ProRes 422 para archivos de edición master y H.264 MP4 con audio AAC para subir a sitios web y redes sociales, unificando tomas de múltiples cámaras en un master calibrado como en el [proyecto Homeowners](/es/portafolio/homeowners) (y su [caso de estudio](/es/casos-de-estudio/homeowners)).",
          ],
        },
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
