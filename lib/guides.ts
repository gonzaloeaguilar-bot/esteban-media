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
      buildBreadcrumbList(breadcrumbsId, [
        {
          name: copy.breadcrumbHome,
          path: guide.locale === "es" ? "/es" : "/",
        },
        { name: copy.breadcrumbCurrent, path: copy.path },
        { name: guide.title, path },
      ]),
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
