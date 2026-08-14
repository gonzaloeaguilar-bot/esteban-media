import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

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
            "Use short folder and file labels that describe the content. A simple structure is more useful than renaming every clip or building a complicated archive.",
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
      title: "Cómo preparar material para un editor de video",
      description:
        "Organiza videos originales, contexto, referencias y recursos necesarios para comenzar una edición remota con menos preguntas pendientes.",
      eyebrow: "Antes de comenzar la edición",
      answer:
        "Envía los videos originales en carpetas claras y agrega una nota breve con la meta, el canal de publicación, la fecha, las referencias y los clips o mensajes que deben aparecer.",
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
            "Usa nombres cortos que describan el contenido. Una estructura sencilla sirve más que renombrar cada clip o crear un archivo complicado.",
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
            "List what already exists: footage, voice-over, music direction, logos, copy, product details, and references. Then list the requested pieces separately, including their orientation when it is known.",
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
            "Enumera lo que ya existe: videos, voz en off, dirección musical, logos, textos, datos del producto y referencias. Después enumera cada pieza solicitada e indica su orientación cuando ya esté definida.",
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
            "El video vertical se usa con frecuencia en canales de video corto a pantalla completa. El horizontal es común en YouTube, sitios web, presentaciones y pantallas anchas. Confirma el destino real en vez de exportar por costumbre.",
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
            "Place the original footage, audio, approved graphics, copy, and references in a structure that another person can follow. Add one brief that explains the goal, intended use, deadline, and requested deliverables.",
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
            "Organiza videos originales, audio, gráficos aprobados, textos y referencias de una forma que otra persona pueda seguir. Agrega un brief con la meta, el uso final, la fecha y los entregables solicitados.",
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
            "Start with a strong hook in the first two seconds: show the product in action, state the customer problem, or ask a direct question.",
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
            "El video corto funciona mejor cuando cada pieza responde a una sola duda, decisión o función. Evita resumir toda la empresa en 30 segundos.",
            "Comienza con un gancho fuerte en los primeros dos segundos: muestra el producto en acción, menciona la necesidad del cliente o plantea una pregunta directa.",
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
            "La buena iluminación y el audio claro importan más que equipos costosos. Ubícate cerca de luz natural y usa un micrófono lavalier o direccional cuando grabes voz.",
            "Mantén el ritmo con cortes cada 2 a 4 segundos para sostener la atención sin saturar el mensaje.",
          ],
        },
        {
          heading: "Incluye un llamado a la acción directo",
          paragraphs: [
            "Indica al espectador qué paso dar después: visitar la locación, revisar el enlace en la biografía o comentar para más detalles. Un llamado claro conecta vistas con consultas reales.",
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
            "Close-up video of sizzling food, plating, and fresh ingredients performs exceptionally well on Instagram and TikTok. Focus on sensory details like steam, crunch, and sauce pours.",
          ],
          bullets: [
            "Signature dish close-ups and plating",
            "Chef's special or house creation backstory",
            "Cocktail preparation and pouring",
            "Customer reaction and table atmosphere",
          ],
        },
        {
          heading: "Capture peak dining atmosphere",
          paragraphs: [
            "Show prospective diners what it feels like to visit during busy evening service or weekend brunch. Natural lighting and ambient sound bring the space to life.",
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
            "Los videos en primer plano de comida recién servida, el emplatado y los ingredientes frescos funcionan muy bien en Instagram y TikTok. Enfócate en detalles sensoriales como vapor, texturas y salsas.",
          ],
          bullets: [
            "Primeros planos de platos estrella y emplatado",
            "Historia detrás del plato del chef o especialidad",
            "Preparación de cocteles y servicio de bebidas",
            "Reacciones de clientes y ambiente en mesa",
          ],
        },
        {
          heading: "Captura el ambiente real en horas concurridas",
          paragraphs: [
            "Muestra a los futuros comensales cómo se siente visitar el restaurante durante la cena o el brunch del fin de semana. La luz adecuada y el ambiente real dan vida al espacio.",
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
            "Open with the single best feature of the property (e.g., waterfront view, chef's kitchen, or master suite) rather than the front door. Keep clips under 3 seconds per room.",
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
            "Abre con la mejor característica de la propiedad (vista al agua, cocina equipada o suite principal) en lugar de la puerta de entrada. Mantén clips de menos de 3 segundos por espacio.",
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
          ],
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
            "Rather than staging an expensive studio set for every lifestyle environment, AI image tools can place clean product cutouts into marble countertops, outdoor sunlight, or cozy kitchen settings.",
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
            "En lugar de armar un set de estudio costoso para cada ambiente, las herramientas de IA pueden ubicar el producto en superficies de mármol, luz natural de exterior o ambientes cálidos.",
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
            "As general South Florida market context, simple white-background catalog images are commonly quoted around $25 to $50 USD each, with Miami studios advertising entry rates near $35 per image; styled lifestyle work with props or models is quoted far higher per image, and half-day sessions in Miami commonly run $300 to $1,000 USD plus production expenses. These figures are published market rates for the area, not a price commitment from Esteban Moreno Media, and the ranges move with volume, retouching depth and usage rights. For a figure tied to your actual scope use the [budget estimator](/calculator), and for a written quote reach out via [contact](/contact).",
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
        "Las tarifas de fotografía de producto dependen del volumen de SKUs, los ángulos por producto, la complejidad del entorno (catálogo vs estilo de vida), el retoque y los derechos de uso. No existe una tarifa única responsable sin definir el alcance.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen piezas visuales de marca, diseños sociales, video 3D y mockups de producto. Se enlaza como un ejemplo de diseño visual relacionado; nada publicado confirma una tarifa o tabla de precios específica.",
      },
      sections: [
        {
          heading: "Variables que determinan el precio por fotografía de producto",
          paragraphs: [
            "El precio por fotografía de producto depende directamente del alcance operativo del proyecto. En el mercado audiovisual, los proyectos se estructuran evaluando factores clave antes de definir el presupuesto final. Para estimar una referencia orientativa basada en tus parámetros, puedes usar la [calculadora de presupuesto](/es/calculadora).",
            "Entre las variables determinantes se destacan el volumen total de productos (SKUs), la cantidad de ángulos requeridos por producto y el nivel de complejidad en la preparación del set.",
          ],
          bullets: [
            "Volumen de SKUs y ángulos finales editados (catalogación simple vs tomas compuestas).",
            "Fotografía de catálogo (fondo blanco/neutro) vs fotografías de estilo de vida (lifestyle con ambientación).",
            "Uso de utilería física, modelos o fondos generados/asistidos por IA.",
            "Profundidad de retoque digital (limpieza de imperfecciones vs retoque comercial de alta gama).",
            "Licencias de uso (uso exclusivo para e-commerce/redes vs campañas publicitarias globales).",
          ],
        },
        {
          heading: "Modelos de cotización en el mercado y referencia orientativa",
          paragraphs: [
            "En la industria comercial, los creadores y estudios suelen aplicar tres modelos de tarificación: costo por imagen individual, tarifa por jornada de producción (day rate) o presupuesto por paquete de proyecto. Las fotos de catálogo estándar suelen cotizarse por unidad cuando el volumen es alto, mientras que las producciones conceptuales de marca se evalúan por proyecto integral.",
            "Como contexto general del mercado de South Florida, las fotos simples de catálogo con fondo blanco se cotizan por lo común entre $25 y $50 USD por imagen, y hay estudios de Miami que publican tarifas de entrada cercanas a $35 por imagen; el trabajo de estilo de vida con ambientación o modelos se cotiza bastante más alto por imagen, y las sesiones de medio día en Miami suelen ubicarse entre $300 y $1,000 USD más costos de producción. Son tarifas publicadas del mercado local, no una oferta de Esteban Moreno Media, y los rangos se mueven según volumen, nivel de retoque y derechos de uso. Para una cifra atada a tu alcance real usa la [calculadora de presupuesto](/es/calculadora), y para una cotización escrita escríbenos por [contacto](/es/contacto).",
          ],
        },
        {
          heading: "Cómo definir el alcance para solicitar una cotización exacta",
          paragraphs: [
            "No existe una tarifa única responsable antes de definir el brief técnico. Para recibir una cotización precisa y sin sorpresas, es indispensable detallar las especificaciones antes de iniciar la producción.",
            "Te recomendamos definir el listado exacto de SKUs, si requerirás tomas de empaque o detalles en 45°, los canales donde publicarás las imágenes y ejemplos visuales de referencia. Puedes calcular una estimación transparente en nuestra [calculadora de presupuesto](/es/calculadora) o escribirnos directamente en [contacto](/es/contacto) para evaluar los requerimientos de tu marca.",
          ],
        },
        {
          heading: "Estructura típica de un presupuesto fotografía producto",
          paragraphs: [
            "Un presupuesto fotografía producto detallado desglosa el precio por fotografía de producto en las fases operativas del proyecto para que la marca sepa con exactitud qué conceptos están incluidos antes de iniciar la producción.",
            "La preproducción contempla la planificación visual, el moodboard y la lista de tomas (shot list) con los ángulos prioritarios. La sesión de captura cubre tiempos de estudio, equipamiento de cámaras y ópticas macro, e iluminación técnica. La postproducción y entrega abarca el procesado RAW, el retoque acordado, la exportación en los formatos y resoluciones que exigen marketplaces y plataformas web, y la cesión de derechos correspondiente.",
          ],
          bullets: [
            "Preproducción: lista de tomas (shot list) y definición de referencias estéticas",
            "Producción: tiempo de estudio, iluminación, ópticas de producto y captura calibrada",
            "Postproducción: revelado digital, corrección de color, limpieza y exportación optimizada",
            "Entregables y licencias: cesión de derechos de uso comercial y archivos en alta resolución",
          ],
        },
        {
          heading: "Cómo comparar cotizaciones y qué suele quedar excluido",
          paragraphs: [
            "Al comparar propuestas conviene analizar los entregables netos y las condiciones de servicio, no únicamente el monto global.",
            "Verifica si el retoque digital, los recortes de fondo con transparencia y las sombras realistas vienen incluidos en la tarifa base o se facturan como suplementos por imagen. Confirma también las rondas de revisión permitidas y la entrega en los perfiles de color adecuados (sRGB para web, Adobe RGB o CMYK para impresión).",
            "Las propuestas estándar no suelen incluir la compra de atrezzo perecedero, honorarios de modelos externos, transporte y seguro de las muestras físicas, ni retoques que excedan el brief original. Aclarar estos puntos por escrito antes de la producción ayuda a evitar desviaciones de presupuesto.",
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
        "Hire a videographer when you need physical camera operation on-site, and hire a video editor when you already have recorded footage and need narrative pacing, color, motion, and captions.",
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Approved portfolio credits include location camera capture and full video editing. It is linked as a proof example; nothing published confirms dual-role scope on all projects.",
      },
      sections: [
        {
          heading: "Core differences in responsibilities",
          paragraphs: [
            "A videographer operates physical camera equipment, lighting, and audio gear on location to capture raw footage.",
            "A video editor works in post-production, organizing raw assets into a cohesive story with color grading, sound design, and text graphics.",
          ],
        },
        {
          heading: "When you only need a remote video editor",
          paragraphs: [
            "If your team already records raw footage on smartphones or camera equipment, hiring a remote video editor is the most efficient and cost-effective route to produce social content.",
          ],
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
        "Contrata un videógrafo cuando requieras operación de cámara en sitio, y un editor de video cuando ya dispongas de tomas y necesites narrativa, color, ritmo y subtítulos.",
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description:
          "Los créditos aprobados del portafolio incluyen producción en locación y edición de video. Se enlaza como ejemplo publicado; nada publicado confirma alcance dual en todos los proyectos.",
      },
      sections: [
        {
          heading: "Diferencias centrales en responsabilidades",
          paragraphs: [
            "Un videógrafo opera equipos de cámara, iluminación y audio en el sitio de grabación para capturar tomas originales.",
            "Un editor de video trabaja en postproducción organizando material bruto en una historia cohesiva con color, sonido y gráficos.",
          ],
        },
        {
          heading: "Cuándo solo necesitas un editor de video remoto",
          paragraphs: [
            "Si tu equipo ya graba tomas con smartphones o cámaras, contratar un editor remoto es la ruta más eficiente para mantener presencia en redes.",
          ],
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
          heading: "Why remote editing accelerates turnaround",
          paragraphs: [
            "By using cloud storage links (Dropbox, Frame.io, Google Drive), footage handoff happens instantly, eliminating physical drive shipping delays.",
          ],
        },
        {
          heading: "Cost efficiency of remote post-production",
          paragraphs: [
            "Remote video editing removes physical studio overhead, allowing project budgets to go directly toward creative editing quality and quick revisions.",
          ],
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
          heading: "Por qué la edición remota acelera las entregas",
          paragraphs: [
            "Mediante enlaces de almacenamiento en la nube (Dropbox, Frame.io), la transferencia de archivos ocurre al instante sin envíos físicos de discos.",
          ],
        },
        {
          heading: "Eficiencia de costos en postproducción remota",
          paragraphs: [
            "La edición remota elimina costos de mantenimiento de estudio físico, canalizando el presupuesto directamente a la calidad narrativa y de edición.",
          ],
        },
      ],
    },
  },
  {
    id: "corporate-video-cost-guide",
    en: {
      slug: "corporate-video-production-cost-miami",
      metadataTitle: "Corporate Video Cost Miami Guide",
      title: "How much does corporate video production cost in Miami?",
      description:
        "Understand pricing drivers, scope factors, and budget considerations for corporate video editing and production in South Florida.",
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
            "Then review published work whose credited scope resembles yours. A portfolio page can prove the kind of work performed; it cannot prove an unpublished price, result, or identical process for your project.",
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
        { heading: "Compara exclusiones y prueba publicada", paragraphs: ["Revisa si cada propuesta incluye preproducción, grabación, edición, audio, gráficos, subtítulos, revisiones, traslados, licencias y versiones finales. Pregunta qué genera un cambio de alcance.", "Después revisa trabajos publicados con créditos similares. Un portafolio prueba el trabajo realizado; no prueba un precio, resultado o proceso no publicado para tu proyecto."] },
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
            "Cada plataforma usa formato 9:16 (1080x1920), pero las áreas de botones y texto varían según la interfaz.",
          ],
        },
        {
          heading: "Flujo de publicación multiplataforma",
          paragraphs: [
            "Editar un video vertical maestro permite distribuir el contenido simultáneamente en Instagram, TikTok y YouTube Shorts.",
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
        "Compare automated AI video tools with human video post-production for pacing, storytelling, and brand consistency.",
      eyebrow: "Tool Comparison",
      answer:
        "AI tools accelerate basic captions and silence removal, while human editors provide narrative pacing, color correction, and brand positioning.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include human video editing and brand post-production. Linked as a published example; nothing published confirms identical workflows across all projects.",
      },
      sections: [
        {
          heading: "Where AI video tools excel",
          paragraphs: [
            "AI software quickly generates subtitle SRT files, cuts silent pauses, and suggests automated B-roll clips.",
          ],
        },
        {
          heading: "Why human editors drive higher engagement",
          paragraphs: [
            "Human editors craft narrative structure, select subtle audio cues, and refine color balance to hold viewer attention.",
          ],
        },
      ],
    },
    es: {
      slug: "edicion-de-video-con-ia-vs-editor-profesional",
      metadataTitle: "Edición Video IA vs Editor Humano",
      title: "Herramientas de edición con IA vs contratar un editor profesional",
      description:
        "Comparación entre software automatizado de IA y postproducción humana en narrativa, ritmo y coherencia visual de marca.",
      eyebrow: "Comparación de Herramientas",
      answer:
        "Las herramientas de IA aceleran subtítulos y cortes básicos, mientras que un editor profesional aporta ritmo narrativo y colorimetría.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen postproducción y edición de marca humana. Se enlaza como ejemplo publicado; nada publicado confirma flujos idénticos en todo caso.",
      },
      sections: [
        {
          heading: "Ventajas de las herramientas de IA",
          paragraphs: [
            "Los programas de IA generan subtítulos automáticos y eliminan pausas de silencio con rapidez.",
          ],
        },
        {
          heading: "El valor insustituible de la edición humana",
          paragraphs: [
            "Un editor humano estructura la narrativa visual, ajusta el ritmo musical y cuida la estética de la marca.",
          ],
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
            "Look for named client credits and published project links rather than generic stock footage reels.",
          ],
        },
        {
          heading: "Communication & bilingual workflow",
          paragraphs: [
            "Choose an editor who provides clear scoping questions and fluent communication in both English and Spanish for South Florida campaigns.",
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
            "Revisa proyectos públicos aprobados con nombres de clientes reales en lugar de resúmenes genéricos con material de stock.",
          ],
        },
        {
          heading: "Flujo de trabajo bilingüe claro",
          paragraphs: [
            "Elige un editor que comunique los requerimientos con precisión tanto en español como en inglés para el mercado de South Florida.",
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
            "Organize raw footage by camera angle, audio tracks, logos, and brand guidelines before sharing cloud folders.",
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
            "Clasifica los clips por cámara, fuentes de audio y logotipos antes de compartir la carpeta en la nube.",
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
            "Look for standalone insights, strong opinions, or story climaxes in podcast recordings that make viewers pause.",
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
            "Selecciona fragmentos con ideas potentes o respuestas directas que funcionen de forma independiente.",
          ],
        },
        {
          heading: "Adaptación al formato 9:16 vertical",
          paragraphs: [
            "Ajusta el encuadre móvil, centra la imagen del hablante y añade subtítulos llamativos en la zona segura.",
          ],
        },
      ],
    },
  },
  {
    id: "fort-lauderdale-video-cost-guide",
    en: {
      slug: "video-production-cost-fort-lauderdale",
      metadataTitle: "Fort Lauderdale Video Costs",
      title: "How much does video production cost in Fort Lauderdale?",
      description:
        "Understand video production costs, editing retainers, and budget factors in Fort Lauderdale and Broward County.",
      eyebrow: "Budgeting / Fort Lauderdale",
      answer:
        "Costs depend on shoot days vs remote editing, motion graphics complexity, and final vertical/horizontal export deliverables.",
      proof: {
        href: "/portfolio/my-dler",
        title: "My D'ler",
        description:
          "Approved portfolio credits include published corporate video editing. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Evaluating Remote Editing vs Full Filming",
          paragraphs: [
            "If you already possess raw footage, remote post-production significantly lowers project costs compared to hiring on-site crews.",
          ],
        },
      ],
    },
    es: {
      slug: "cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
      metadataTitle: "Costo Producción Video Ft Lauderdale",
      title: "¿Cuánto cuesta la producción de video en Fort Lauderdale?",
      description:
        "Guía de costos de producción y edición de video para empresas en Fort Lauderdale y el condado de Broward.",
      eyebrow: "Presupuesto / Fort Lauderdale",
      answer:
        "El costo depende de si es edición remota o filmación presencial, la complejidad de animaciones y las entregas requeridas.",
      proof: {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        description:
          "Los créditos aprobados del portafolio incluyen edición corporativa. Se enlaza como ejemplo publicado; nada publicado confirma entregables idénticos en cada caso.",
      },
      sections: [
        {
          heading: "Edición remota frente a producción presencial",
          paragraphs: [
            "Si ya cuentas con tomas grabadas, la posproducción remota reduce drásticamente los costos en comparación con equipos de rodaje.",
          ],
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
            "Capture immediate scroll attention with high-energy movement or an intriguing statement in the opening 3 seconds.",
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
            "Detén el desplazamiento en redes con movimiento enérgico o una frase impactante durante los primeros 3 segundos.",
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
            "Attach lavalier mics firmly to clothing to eliminate rustle and isolate speech from room echo.",
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
            "Fija los micrófonos de solapa firmemente en la ropa para evitar roces y aislar el habla del eco ambiental.",
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
            "Keep subtitles away from bottom Instagram UI buttons and top account headers to ensure full legibility.",
          ],
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
            "Evita colocar texto sobre los botones inferiores de Instagram o el encabezado superior para garantizar lectura completa.",
          ],
        },
      ],
    },
  },
  {
    id: "transfer-large-video-files-guide",
    en: {
      slug: "fastest-way-to-send-large-video-files-to-editor",
      metadataTitle: "Send Large Video Files to Editor",
      title: "Fastest ways to transfer raw 4K video files to remote editors",
      description:
        "Learn how to use cloud transfer platforms, zip archives, and proxy workflows when handing off raw footage to an editor.",
      eyebrow: "Workflow / File Transfer",
      answer:
        "Use Google Drive, Frame.io, or WeTransfer Pro with structured folder names and proxy files for seamless remote editor handoff.",
      proof: {
        href: "/portfolio/homeowners",
        title: "Homeowners",
        description:
          "Approved portfolio credits include published remote video post-production. Linked as a public sample; not published as evidence of identical deliverables in every engagement.",
      },
      sections: [
        {
          heading: "Organizing Raw Footage Folders",
          paragraphs: [
            "Group files by date, camera angle, and audio stems before uploading to prevent missing asset delays.",
          ],
        },
      ],
    },
    es: {
      slug: "como-enviar-archivos-pesados-de-video-para-edicion",
      metadataTitle: "Enviar Archivos Pesados Video",
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
            "Agrupa archivos por fecha, ángulo de cámara y pistas de audio antes de subir para evitar retrasos por activos faltantes.",
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
            "Publishing dedicated Spanish and English video assets allows brands to rank in both language search indexes simultaneously.",
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
            "Publicar activos de video dedicados en español e inglés permite posicionarse en ambos índices de búsqueda de forma simultánea.",
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
            "Automatically lower background music volume whenever dialogue is spoken to maintain 100% vocal clarity.",
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
            "Reduce automáticamente el volumen de la pista musical cada vez que el hablante interviene para garantizar la máxima nitidez.",
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
            "Inserta tomas de apoyo en las pausas naturales de las frases para respaldar las ideas del portavoz de forma fluida.",
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
            "La audiencia en dispositivos móviles decae tras los 30 segundos si el video no introduce nuevos estímulos visuales.",
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
            "Use post-production warp stabilization to remove wind wobble and create silky-smooth cinematic aerial moves.",
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
            "Aplica estabilización de posproducción para corregir ráfagas de viento y lograr desplazamientos aéreos ultra-fluidos.",
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
            "Deliver bite-sized social videos for awareness while keeping in-depth case study edits on high-converting landing pages.",
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
            "Publica cápsulas cortas en redes para generar interés y reserva los videos detallados de casos para páginas de venta.",
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
            "Record 10 seconds of silent room tone on location so your editor can sample background noise for clean audio subtraction.",
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
            "Graba 10 segundos de silencio ambiental en el lugar de rodaje para facilitar la eliminación digital de ruido de fondo.",
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
            "Ask open-ended questions focused on problem-solving rather than scripted product praise to ensure genuine audience trust.",
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
            "Formula preguntas abiertas enfocadas en la resolución de problemas para lograr un testimonio cercano y creíble.",
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
            "Use Apple ProRes 422 for editing master archives and H.264 MP4 with AAC audio for web and social uploads.",
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
            "Utiliza Apple ProRes 422 para archivos de edición master y H.264 MP4 con audio AAC para subir a sitios web y redes sociales.",
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
      "These guides offer general preparation steps, not Esteban Moreno Media policies. They do not assume a package, price, turnaround, review method, transfer method, or set of deliverables.",
    readLabel: "Read the guide",
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
      "Estas guías ofrecen pasos generales de preparación, no políticas de Esteban Moreno Media. No asumen paquetes, precios, plazos, método de revisión, transferencia ni entregables definidos.",
    readLabel: "Leer la guía",
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
