import type { CaseStudyPair, CaseStudyVideo } from "@/lib/case-studies";

/**
 * Case studies built on self-hosted vertical Reels (2026-11-26 batch).
 *
 * Sources, all recorded in the vault page esteban-case-studies-batch-2026-11-26:
 * - The three real-estate Reels are the files already on the real-estate shelf
 *   (PR #830, lib/real-estate-reels.ts). The owner cleared them for public use
 *   in chat on 2026-11-25. Durations come from ffprobe on the shipped files and
 *   every line of copy describing them comes from a Whisper transcript plus
 *   sampled frames. The agents are not named: no written release names them.
 * - The AI edit-planning Reel is Esteban's own brand piece (Drive "AI Portfolio"
 *   folder, so it is labelled as made with AI tools). Its Instagram numbers were
 *   read live from Metricool's reels endpoint on 2026-11-26 (reel DgBoB_wtrj5).
 *
 * The copy carries no price: case-study text is guarded against currency
 * figures. The starting price shown beside the contact step is read from
 * lib/pricing.ts at render time through `priceKind`.
 */

const DAVIE_TOUR: CaseStudyVideo = {
  id: "davie-two-story-home-tour",
  name: "Two-story home tour in Davie, FL",
  description:
    "A 52-second Spanish-captioned walk-through of a two-story Davie home, edited by Esteban Moreno Media, ending on an invitation to book a visit.",
  src: "/real-estate-reels/reel-08.mp4",
  poster: "/real-estate-reels/reel-08.jpg",
  durationSeconds: 52,
  uploadDate: "2026-11-01T12:00:00-05:00",
  width: 720,
  height: 1280,
  inLanguage: "es",
};

const FIX_BEFORE_SELLING: CaseStudyVideo = {
  id: "fix-before-selling-tip",
  name: "Do I have to fix everything before I sell?",
  description:
    "A 23-second talking-head Reel in which a South Florida agent answers what to fix before listing, edited by Esteban Moreno Media with on-screen captions.",
  src: "/real-estate-reels/reel-09.mp4",
  poster: "/real-estate-reels/reel-09.jpg",
  durationSeconds: 23,
  uploadDate: "2026-10-21T12:00:00-05:00",
  width: 720,
  height: 1280,
  inLanguage: "en",
};

const SELLING_FROM_ABROAD: CaseStudyVideo = {
  id: "selling-from-abroad",
  name: "Selling your Florida property while being in Canada",
  description:
    "A 22-second talking-head Reel in which a South Florida agent explains how a seller abroad can list and close, edited by Esteban Moreno Media with on-screen captions.",
  src: "/real-estate-reels/reel-10.mp4",
  poster: "/real-estate-reels/reel-10.jpg",
  durationSeconds: 22,
  uploadDate: "2026-10-29T12:00:00-05:00",
  width: 720,
  height: 1280,
  inLanguage: "en",
};

const AI_PREP_REEL: CaseStudyVideo = {
  id: "ai-edit-prep-reel",
  name: "Antes de abrir CapCut: 3 minutos con mi IA",
  description:
    "A 33-second Spanish Reel by Esteban Moreno Media showing the three questions Esteban asks an AI assistant before he edits: which takes and in what order, which hook, and which cut plan.",
  src: "/case-studies/ai-edit-prep-reel.mp4",
  poster: "/case-studies/ai-edit-prep-reel.jpg",
  durationSeconds: 33,
  uploadDate: "2026-11-22T02:30:46+01:00",
  width: 720,
  height: 1280,
  inLanguage: "es",
};

/** The Spanish page describes the same files in Spanish. */
function inSpanish(video: CaseStudyVideo, name: string, description: string): CaseStudyVideo {
  return { ...video, name, description };
}

export const reelCaseStudyPairs: readonly CaseStudyPair[] = [
  {
    id: "real-estate-reels-davie",
    en: {
      title: "Real-Estate Reels: a Davie Home Tour and Two Seller Explainers",
      metadataTitle: "Davie Home Tour and Seller Reels Case Study",
      client: "South Florida real-estate agents",
      summary:
        "Esteban Moreno Media edited three vertical Reels for South Florida real-estate agents: a 52-second Spanish home tour of a two-story house in Davie, FL, and two English seller explainers of 23 and 22 seconds, each ending on one clear next step.",
      metaDescription:
        "Three real-estate Reels edited by Esteban Moreno Media: a 52-second Spanish home tour in Davie, FL and two English seller explainers. Watch all three.",
      eyebrow: "Real-Estate Reel Editing",
      role: "Video editor (cut, on-screen captions, pacing)",
      year: 2026,
      location: "Davie and South Florida",
      deliverables:
        "Three 9:16 Reels: a 52-second Spanish home tour and two English talking-head explainers of 23 and 22 seconds, captioned on screen",
      answer: {
        question: "What did Esteban edit for these real-estate agents?",
        text:
          "In 2026 Esteban Moreno Media edited three vertical Reels for South Florida real-estate agents. The first is a 52-second Spanish home tour of a two-story house in Davie, FL. It opens on the agent at the front door under the caption \"¿Estás buscando casa en Davie, FL?\", moves through an aerial view of the neighborhood, the renovated kitchen, the updated bathrooms and the private patio, and closes by inviting the viewer to write and book a visit. The other two are English talking-head explainers: \"Do I have to fix everything before I sell?\" runs 23 seconds and \"selling your Florida property while being in Canada\" runs 22 seconds. Each answers one seller question in plain words and ends on a keyword the viewer can comment or send. Esteban's confirmed part is the edit: the cut, the on-screen captions and the pacing. The owner cleared all three for public use in November 2026, and no views, leads or sale results are claimed.",
      },
      mediaUrl: "/real-estate-reels/reel-08.mp4",
      posterUrl: "/real-estate-reels/reel-08.jpg",
      serviceLink: {
        href: "/services/real-estate-reels-video-editor-south-florida",
        label: "Real Estate Reels Editing Service",
        description:
          "See the full reel shelf, the editing scope and the monthly real-estate plans for South Florida agents.",
      },
      contactLink: { href: "/contact", label: "Discuss a Listing Reel" },
      portfolioLink: { href: "/portfolio", label: "See all portfolio work" },
      keyFacts: [
        { label: "Format", value: "Three 9:16 vertical Reels, published here as 720 x 1280 web copies" },
        { label: "Lengths", value: "52 seconds (Spanish tour), 23 and 22 seconds (English explainers)" },
        { label: "Languages", value: "Spanish captions on the tour; English captions on the two explainers" },
        { label: "Role", value: "Editing; who filmed the footage is not claimed on this page" },
        { label: "Permission", value: "Cleared for public use by the owner in November 2026" },
      ],
      scopingQuestions: [
        "Is the Reel a tour of one listing, or an answer to one question sellers or buyers keep asking?",
        "Which listing facts has the agent confirmed for the captions, and which must stay off screen?",
        "Should the captions be in Spanish, English, or a version of each?",
        "What single next step ends the Reel: book a visit, send a message, or comment a keyword?",
        "Which clips already exist, and are any of them aerial shots that came from a licensed pilot?",
      ],
      sections: [
        {
          heading: "How does the Davie tour fit a whole house into 52 seconds?",
          paragraphs: [
            "The tour follows the order a buyer would walk the house. It starts with the agent at the front door and the question a Spanish-speaking buyer is already asking, \"¿Estás buscando casa en Davie, FL?\". An aerial shot then places the house in its neighborhood before the camera goes inside. From there each room gets one beat: the kitchen, presented as fully renovated and ready to move into, the updated bathrooms, the impact windows, and finally the private patio, framed as a place for family and friends.",
            "The captions carry the facts the agent states in her voice-over: two stories, three bedrooms, two and a half bathrooms and an extra lot. The last line asks the viewer to write and book a visit. Nothing in the edit adds an address, a price or a sale status, and this page does not add them either. A listing Reel is proof of the video, not proof that the house sold.",
          ],
        },
        {
          heading: "How are the two seller explainers built?",
          paragraphs: [
            "Both explainers put the question on screen in the first second, in large type, because the question is the hook. \"Do I have to fix everything before I sell?\" answers with three checks the agent recommends before spending money: the condition of the home, similar homes in the same community or building, and the seller's budget. Only then does she prioritize what to fix. The Reel closes by asking the viewer to send the word SELL.",
            "The second explainer speaks to an owner who lives in Canada and wants to sell a Florida property. It walks the plan in one breath: start the marketing, arrange access to the property, sign the listing agreement, take the pictures and reach the closing table. It ends by asking viewers to comment the word REMOTE. In both, the captions follow the agent's speech word by word, so the Reel still makes sense with the sound off.",
          ],
          bullets: [
            "Question on screen in the first second",
            "One answer per Reel, in the agent's own words",
            "Captions synced to speech for sound-off viewing",
            "One keyword as the only call to action",
          ],
        },
        {
          heading: "What did the edit decide, and what does this page not claim?",
          paragraphs: [
            "The edit decides order, length and legibility: which shot opens, where each sentence is cut, how long a room stays on screen, and where captions sit so the agent's face and the platform buttons never cover them. Those are the choices Esteban's role covers, and they are visible in the three files on this page.",
            "This page does not name the agents, because no written release names them. It does not claim who filmed the footage or flew the aerial shot, and it gives no view count, lead count or sale result, because none was measured for these Reels. Music licensing for the original posts was not reviewed here.",
          ],
        },
        {
          heading: "How does a comparable real-estate Reel start?",
          paragraphs: [
            "Send the clips you already have, the listing facts you have confirmed, the language your buyers or sellers speak, and the one action the viewer should take at the end. If the Reel answers a question rather than tours a house, write the question down exactly as clients ask it; that sentence usually becomes the opening caption.",
            "For agents who post every week, the monthly real-estate plans bundle filming days, editing and posting; the starting price is shown beside the contact step below and on the pricing page.",
          ],
        },
      ],
      videos: [DAVIE_TOUR, FIX_BEFORE_SELLING, SELLING_FROM_ABROAD],
      priceKind: "real-estate",
    },
    es: {
      title: "Reels inmobiliarios: un recorrido en Davie y dos explicaciones para vendedores",
      metadataTitle: "Caso: recorrido en Davie y Reels para vendedores",
      client: "Agentes inmobiliarios del sur de Florida",
      summary:
        "Esteban Moreno Media editó tres Reels verticales para agentes inmobiliarios del sur de Florida: un recorrido en español de 52 segundos por una casa de dos pisos en Davie, FL, y dos explicaciones en inglés para vendedores, de 23 y 22 segundos, cada uno con un solo siguiente paso.",
      metaDescription:
        "Tres Reels inmobiliarios editados por Esteban Moreno Media: un recorrido en español de 52 segundos en Davie, FL y dos explicaciones para vendedores.",
      eyebrow: "Edición de Reels inmobiliarios",
      role: "Editor de video (corte, subtítulos en pantalla y ritmo)",
      year: 2026,
      location: "Davie y el sur de Florida",
      deliverables:
        "Tres Reels 9:16: un recorrido en español de 52 segundos y dos explicaciones a cámara en inglés de 23 y 22 segundos, con subtítulos en pantalla",
      answer: {
        question: "¿Qué editó Esteban para estos agentes inmobiliarios?",
        text:
          "En 2026 Esteban Moreno Media editó tres Reels verticales para agentes inmobiliarios del sur de Florida. El primero es un recorrido en español de 52 segundos por una casa de dos pisos en Davie, FL. Abre con la agente en la puerta bajo el texto \"¿Estás buscando casa en Davie, FL?\", pasa por una vista aérea del vecindario, la cocina renovada, los baños actualizados y el patio privado, y cierra invitando a escribir y agendar una visita. Los otros dos son explicaciones a cámara en inglés: \"Do I have to fix everything before I sell?\" dura 23 segundos y la de vender una propiedad en Florida desde Canadá dura 22 segundos. Cada uno responde una sola pregunta de vendedores en palabras simples y termina con una palabra clave para comentar o enviar. La parte confirmada de Esteban es la edición: el corte, los subtítulos en pantalla y el ritmo. El dueño autorizó los tres para uso público en noviembre de 2026, y no se afirman vistas, prospectos ni ventas.",
      },
      mediaUrl: "/real-estate-reels/reel-08.mp4",
      posterUrl: "/real-estate-reels/reel-08.jpg",
      serviceLink: {
        href: "/es/editor-de-video-real-estate-miami",
        label: "Editor de video para real estate",
        description:
          "Mira todos los Reels, el alcance de la edición y los planes mensuales para agentes del sur de Florida.",
      },
      contactLink: { href: "/es/contacto", label: "Hablar de un Reel para tu propiedad" },
      portfolioLink: { href: "/es/portafolio", label: "Ver todo el portafolio" },
      keyFacts: [
        { label: "Formato", value: "Tres Reels verticales 9:16, publicados aquí como copias web de 720 x 1280" },
        { label: "Duración", value: "52 segundos (recorrido en español), 23 y 22 segundos (explicaciones en inglés)" },
        { label: "Idiomas", value: "Subtítulos en español en el recorrido; en inglés en las dos explicaciones" },
        { label: "Rol", value: "Edición; esta página no afirma quién grabó el material" },
        { label: "Permiso", value: "Autorizados por el dueño para uso público en noviembre de 2026" },
      ],
      scopingQuestions: [
        "¿El Reel es el recorrido de una propiedad o la respuesta a una pregunta que repiten compradores o vendedores?",
        "¿Qué datos de la propiedad confirmó el agente para los subtítulos y cuáles no deben salir en pantalla?",
        "¿Los subtítulos van en español, en inglés o en una versión de cada idioma?",
        "¿Con qué único paso termina el Reel: agendar una visita, enviar un mensaje o comentar una palabra?",
        "¿Qué clips ya existen y alguno es una toma aérea hecha por un piloto con licencia?",
      ],
      sections: [
        {
          heading: "¿Cómo cabe una casa completa en un recorrido de 52 segundos?",
          paragraphs: [
            "El recorrido sigue el orden en que un comprador caminaría la casa. Empieza con la agente en la puerta y la pregunta que ya se hace quien busca casa en español: \"¿Estás buscando casa en Davie, FL?\". Una toma aérea ubica la casa en su vecindario antes de entrar. Desde ahí cada espacio tiene un solo momento: la cocina, presentada como totalmente renovada y lista para estrenar, los baños actualizados, las ventanas de impacto y, al final, el patio privado, pensado para la familia y los amigos.",
            "Los subtítulos llevan los datos que la agente dice en su voz: dos pisos, tres dormitorios, dos baños y medio y un lote extra. La última línea invita a escribir y agendar una visita. La edición no agrega dirección, precio ni estado de venta, y esta página tampoco. Un Reel de una propiedad prueba el video, no que la casa se haya vendido.",
          ],
        },
        {
          heading: "¿Cómo se construyen las dos explicaciones para vendedores?",
          paragraphs: [
            "Las dos explicaciones ponen la pregunta en pantalla en el primer segundo, con letra grande, porque la pregunta es el gancho. \"Do I have to fix everything before I sell?\" responde con tres revisiones que la agente recomienda antes de gastar: el estado de la casa, las casas parecidas en la misma comunidad o edificio y el presupuesto del vendedor. Solo después prioriza qué arreglar. El Reel cierra pidiendo enviar la palabra SELL.",
            "La segunda explicación le habla a un dueño que vive en Canadá y quiere vender una propiedad en Florida. Recorre el plan de una vez: arrancar el mercadeo, coordinar el acceso a la propiedad, firmar el acuerdo de venta, tomar las fotos y llegar al cierre. Termina pidiendo comentar la palabra REMOTE. En ambas, los subtítulos siguen la voz de la agente palabra por palabra, así que el Reel se entiende sin sonido.",
          ],
          bullets: [
            "La pregunta en pantalla desde el primer segundo",
            "Una sola respuesta por Reel, con las palabras de la agente",
            "Subtítulos sincronizados para ver sin sonido",
            "Una palabra clave como única llamada a la acción",
          ],
        },
        {
          heading: "¿Qué decidió la edición y qué no afirma esta página?",
          paragraphs: [
            "La edición decide el orden, la duración y la lectura: qué toma abre, dónde se corta cada frase, cuánto dura cada espacio en pantalla y dónde van los subtítulos para que ni la cara de la agente ni los botones de la plataforma los tapen. Esas son las decisiones que cubre el rol de Esteban, y se ven en los tres archivos de esta página.",
            "Esta página no nombra a las agentes, porque ninguna autorización escrita las nombra. No afirma quién grabó el material ni quién voló la toma aérea, y no da vistas, prospectos ni ventas, porque no se midieron para estos Reels. Tampoco se revisó aquí la licencia de la música de las publicaciones originales.",
          ],
        },
        {
          heading: "¿Cómo empieza un Reel inmobiliario parecido?",
          paragraphs: [
            "Envía los clips que ya tienes, los datos de la propiedad que confirmaste, el idioma de tus compradores o vendedores y la única acción que debe tomar quien mira al final. Si el Reel responde una pregunta en lugar de mostrar una casa, escribe la pregunta tal como la hacen tus clientes; esa frase suele convertirse en el primer texto en pantalla.",
            "Para agentes que publican cada semana, los planes mensuales para inmobiliarias reúnen días de grabación, edición y publicación; el precio inicial aparece junto al paso de contacto, más abajo, y en la página de precios.",
          ],
        },
      ],
      videos: [
        inSpanish(
          DAVIE_TOUR,
          "Recorrido de casa de dos pisos en Davie, FL",
          "Un recorrido de 52 segundos con subtítulos en español por una casa de dos pisos en Davie, editado por Esteban Moreno Media, que termina con una invitación a agendar una visita.",
        ),
        inSpanish(
          FIX_BEFORE_SELLING,
          "¿Hay que arreglar todo antes de vender?",
          "Un Reel a cámara de 23 segundos en el que una agente del sur de Florida explica qué arreglar antes de publicar la propiedad, editado por Esteban Moreno Media con subtítulos en pantalla.",
        ),
        inSpanish(
          SELLING_FROM_ABROAD,
          "Vender tu propiedad en Florida desde Canadá",
          "Un Reel a cámara de 22 segundos en el que una agente del sur de Florida explica cómo vender y cerrar desde el exterior, editado por Esteban Moreno Media con subtítulos en pantalla.",
        ),
      ],
      priceKind: "real-estate",
    },
  },
  {
    id: "ai-edit-prep-reel",
    en: {
      title: "Before CapCut: How Esteban Uses AI to Plan an Edit",
      metadataTitle: "Before CapCut: AI Edit-Planning Case Study",
      client: "Esteban Moreno Media (own brand)",
      summary:
        "Before opening CapCut, Esteban spends about three minutes with an AI assistant to sort his takes, choose a hook and plan the cuts, and the 33-second Spanish Reel that shows the method reached 1,202 Instagram views (read in Metricool on November 26, 2026).",
      metaDescription:
        "How Esteban plans an edit with AI before opening CapCut: takes in order, one hook, a timed cut plan. His 33-second Reel on it reached 1,202 Instagram views.",
      eyebrow: "AI-Assisted Editing Process",
      role: "Own-brand Reel: script, AI-assisted planning and edit",
      year: 2026,
      deliverables:
        "One 33-second 9:16 Spanish Reel with animated explainer graphics, made with AI tools, and word-by-word captions",
      answer: {
        question: "What does Esteban ask an AI before he edits?",
        text:
          "In 2026 Esteban Moreno Media published a 33-second Spanish Reel on its own Instagram showing the three requests Esteban gives an AI assistant before he opens CapCut. First, he hands over his takes and asks which ones work and in what order to tell them, so he no longer watches all the material. Second, he asks for three hooks for the first two seconds, picks one, and lets the rest of the video follow it. Third, he asks for a cut plan with timings: what goes in, what comes out and where the music sits. On screen the plan splits the Reel into a hook, a development and a close. The Reel ends by inviting viewers to comment the word EDITAR to receive his prompt list. Instagram counted 1,202 views, 29 saves and 8 comments, read in Metricool on November 26, 2026. It is his own brand piece, made with AI tools, so it has no client and claims no client result.",
      },
      mediaUrl: "/case-studies/ai-edit-prep-reel.mp4",
      posterUrl: "/case-studies/ai-edit-prep-reel.jpg",
      serviceLink: {
        href: "/services/reels-editor-fort-lauderdale",
        label: "Reels Editor in Fort Lauderdale",
        description:
          "Send the clips you already have and get Reels, TikToks or Shorts cut with the same planning step.",
      },
      contactLink: { href: "/contact", label: "Send Your Clips for an Edit" },
      portfolioLink: { href: "/portfolio", label: "See all portfolio work" },
      keyFacts: [
        { label: "Format", value: "One 33-second 9:16 Reel in Spanish, published on Instagram on November 22, 2026" },
        { label: "Instagram views", value: "1,202 (Metricool, read November 26, 2026)" },
        { label: "Saves and comments", value: "29 saves and 8 comments in the same read" },
        { label: "Method", value: "Three AI requests: order the takes, choose a hook, plan the cuts with timings" },
        { label: "Label", value: "Own brand, made with AI tools; no client and no client result" },
      ],
      scopingQuestions: [
        "Which raw takes exist, and which ones would you cut first if you had to?",
        "What should a viewer feel or decide in the first two seconds?",
        "Which of three possible hooks matches how your customers actually talk?",
        "How long should the hook, the middle and the close each run?",
        "Where does the music enter, and where should it stay out of the voice?",
      ],
      sections: [
        {
          heading: "What are the three steps in the Reel?",
          paragraphs: [
            "Step one is ordering the takes. Esteban gives the assistant his clips and asks which are usable and in what order the story should run. In the Reel he describes the gain plainly: he no longer loses time watching all of the material. Step two is the hook. He asks for three options for the first two seconds, chooses one, and lets the whole video arrange itself around it. The on-screen example shows three candidate openers with one marked as chosen.",
            "Step three is a cut plan with timings: what enters, what leaves and where the music goes. The animated plan on screen divides the Reel into a hook of about three seconds, a development up to about twelve, and a close up to about twenty, with the music track drawn beneath. His summary line is that when he opens CapCut he no longer thinks, he only executes.",
          ],
          bullets: [
            "Order the takes before watching every clip",
            "Choose one hook out of three for the first two seconds",
            "Write a timed cut plan with the music placed",
            "Open the editor only once the plan exists",
          ],
        },
        {
          heading: "What did the Reel get, and what does that number mean?",
          paragraphs: [
            "Read live from Metricool's Instagram reels report on November 26, 2026, the Reel had 1,202 views, a reach of 1,008 accounts, 43 likes, 29 saves, 8 comments and 7 shares. In the same read, the next Reel on the account, posted later that day, had 214 views. The comments are the ones the call to action asked for: viewers writing EDITAR to receive the prompt list.",
            "Those figures describe one post on one account four days after publishing. They are not a forecast for a client's account and not a measure of editing quality. In the Reel Esteban says the three minutes save him about an hour of editing; that is his own estimate, not a timed measurement.",
          ],
        },
        {
          heading: "Why is AI used before the edit, not instead of it?",
          paragraphs: [
            "The assistant answers questions about structure: order, hook and timing. The cut itself, the caption styling and the final pacing still happen in the editor, by a person, against the actual footage. That keeps the speed gain where it is real, in deciding, while the parts a viewer notices stay under human control.",
            "The Reel's graphics were made with AI tools and are labelled that way here. No client footage appears in it, so it shows a working method rather than a client result.",
          ],
        },
        {
          heading: "How does a comparable edit start?",
          paragraphs: [
            "Send your raw takes, the platform, the length you want and one sentence on what the viewer should do at the end. The same three planning requests run before the edit, so the first draft arrives with a reasoned order, a chosen hook and a timed structure you can comment on. The starting price for one edited video is shown beside the contact step below.",
          ],
        },
      ],
      videos: [AI_PREP_REEL],
      priceKind: "short-form",
    },
    es: {
      title: "Antes de CapCut: cómo Esteban usa la IA para planear una edición",
      metadataTitle: "Antes de CapCut: caso de planeación con IA",
      client: "Esteban Moreno Media (marca propia)",
      summary:
        "Antes de abrir CapCut, Esteban dedica unos tres minutos a un asistente de IA para ordenar sus tomas, elegir un gancho y planear los cortes, y el Reel en español de 33 segundos que muestra el método alcanzó 1,202 vistas en Instagram (leídas en Metricool el 26 de noviembre de 2026).",
      metaDescription:
        "Cómo Esteban planea una edición con IA antes de abrir CapCut: tomas en orden, un gancho y cortes con tiempos. Su Reel de 33 segundos tuvo 1,202 vistas.",
      eyebrow: "Proceso de edición con IA",
      role: "Reel de marca propia: guion, planeación con IA y edición",
      year: 2026,
      deliverables:
        "Un Reel 9:16 en español de 33 segundos con gráficos animados, hechos con herramientas de IA, y subtítulos palabra por palabra",
      answer: {
        question: "¿Qué le pide Esteban a la IA antes de editar?",
        text:
          "En 2026 Esteban Moreno Media publicó en su propio Instagram un Reel en español de 33 segundos que muestra las tres peticiones que Esteban le hace a un asistente de IA antes de abrir CapCut. Primero, le pasa sus tomas y le pide que diga cuáles sirven y en qué orden contarlas, así ya no pierde tiempo viendo todo el material. Segundo, le pide tres ganchos para los primeros dos segundos, elige uno y deja que todo el video se acomode alrededor. Tercero, le pide un plan de cortes con tiempos: qué entra, qué sale y dónde va la música. En pantalla el plan divide el Reel en gancho, desarrollo y cierre. El Reel termina invitando a comentar la palabra EDITAR para recibir su lista de prompts. Instagram registró 1,202 vistas, 29 guardados y 8 comentarios, leídos en Metricool el 26 de noviembre de 2026. Es una pieza de su propia marca, hecha con herramientas de IA, así que no tiene cliente ni afirma resultados de clientes.",
      },
      mediaUrl: "/case-studies/ai-edit-prep-reel.mp4",
      posterUrl: "/case-studies/ai-edit-prep-reel.jpg",
      serviceLink: {
        href: "/es/editor-de-reels-fort-lauderdale",
        label: "Editor de Reels en Fort Lauderdale",
        description:
          "Envía los clips que ya tienes y recibe Reels, TikToks o Shorts editados con el mismo paso de planeación.",
      },
      contactLink: { href: "/es/contacto", label: "Enviar tus clips para editar" },
      portfolioLink: { href: "/es/portafolio", label: "Ver todo el portafolio" },
      keyFacts: [
        { label: "Formato", value: "Un Reel 9:16 en español de 33 segundos, publicado en Instagram el 22 de noviembre de 2026" },
        { label: "Vistas en Instagram", value: "1,202 (Metricool, leídas el 26 de noviembre de 2026)" },
        { label: "Guardados y comentarios", value: "29 guardados y 8 comentarios en la misma lectura" },
        { label: "Método", value: "Tres peticiones a la IA: ordenar tomas, elegir gancho y planear cortes con tiempos" },
        { label: "Etiqueta", value: "Marca propia, hecho con herramientas de IA; sin cliente ni resultado de cliente" },
      ],
      scopingQuestions: [
        "¿Qué tomas en bruto existen y cuáles cortarías primero si tuvieras que hacerlo?",
        "¿Qué debe sentir o decidir quien mira en los primeros dos segundos?",
        "¿Cuál de tres ganchos posibles suena como hablan tus clientes de verdad?",
        "¿Cuánto debe durar el gancho, el desarrollo y el cierre?",
        "¿Dónde entra la música y dónde debe quedar fuera de la voz?",
      ],
      sections: [
        {
          heading: "¿Cuáles son los tres pasos del Reel?",
          paragraphs: [
            "El primer paso es ordenar las tomas. Esteban le pasa sus clips al asistente y le pregunta cuáles sirven y en qué orden debe ir la historia. En el Reel describe la ganancia sin rodeos: ya no pierde tiempo viendo todo el material. El segundo paso es el gancho. Pide tres opciones para los primeros dos segundos, elige una y deja que todo el video se acomode alrededor. El ejemplo en pantalla muestra tres aperturas posibles con una marcada como elegida.",
            "El tercer paso es un plan de cortes con tiempos: qué entra, qué sale y dónde va la música. El plan animado en pantalla divide el Reel en un gancho de unos tres segundos, un desarrollo hasta cerca de los doce y un cierre hasta cerca de los veinte, con la pista de música dibujada debajo. Su frase de resumen es que, cuando abre CapCut, ya no piensa: solo ejecuta.",
          ],
          bullets: [
            "Ordenar las tomas antes de ver cada clip",
            "Elegir un gancho entre tres para los primeros dos segundos",
            "Escribir un plan de cortes con tiempos y la música ubicada",
            "Abrir el editor solo cuando el plan ya existe",
          ],
        },
        {
          heading: "¿Qué logró el Reel y qué significa esa cifra?",
          paragraphs: [
            "Según la lectura en vivo del reporte de Reels de Instagram en Metricool del 26 de noviembre de 2026, el Reel tenía 1,202 vistas, un alcance de 1,008 cuentas, 43 me gusta, 29 guardados, 8 comentarios y 7 compartidos. En la misma lectura, el Reel siguiente de la cuenta, publicado más tarde ese día, tenía 214 vistas. Los comentarios son los que pedía la llamada a la acción: personas que escribieron EDITAR para recibir la lista de prompts.",
            "Esas cifras describen una publicación de una cuenta cuatro días después de publicarse. No son una predicción para la cuenta de un cliente ni una medida de la calidad de la edición. En el Reel, Esteban dice que esos tres minutos le ahorran cerca de una hora de edición; es su propia estimación, no una medición cronometrada.",
          ],
        },
        {
          heading: "¿Por qué la IA se usa antes de editar y no en lugar de editar?",
          paragraphs: [
            "El asistente responde preguntas de estructura: orden, gancho y tiempos. El corte, el estilo de los subtítulos y el ritmo final siguen ocurriendo en el editor, a cargo de una persona y frente al material real. Así la ganancia de velocidad queda donde es real, en decidir, mientras lo que nota quien mira sigue bajo control humano.",
            "Los gráficos del Reel se hicieron con herramientas de IA y aquí se identifican así. No aparece material de clientes, por lo que muestra un método de trabajo y no un resultado de un cliente.",
          ],
        },
        {
          heading: "¿Cómo empieza una edición parecida?",
          paragraphs: [
            "Envía tus tomas en bruto, la plataforma, la duración que quieres y una frase sobre lo que debe hacer quien mira al final. Las mismas tres peticiones de planeación se hacen antes de editar, así que el primer borrador llega con un orden pensado, un gancho elegido y una estructura con tiempos que puedes comentar. El precio inicial de un video editado aparece junto al paso de contacto, más abajo.",
          ],
        },
      ],
      videos: [AI_PREP_REEL],
      priceKind: "short-form",
    },
  },
];
