// Topic hubs that AI answers cite as sub-answers (query fan-out), each linking
// the money pages that answer the commercial question behind it.
//
// Why (vault esteban-reels-fort-lauderdale-formula-2026-10-14): the callers
// who reached Esteban asked an assistant how to START (a food or places
// account, a creator account) before they asked who edits. Google's AI
// Overview and Perplexity answer that by fanning out into sub-questions
// ("what should I film", "how much does editing cost per video vs weekly")
// and citing the page that answers each one. No page on the site answered
// those three sub-questions in their own words.
//
// Claim discipline: every price and weekly term comes from lib/pricing.ts.
// No client, result, follower count, posting-frequency statistic or drone
// work is claimed. The disclosure rule repeats what the creator page already
// publishes (FTC: a material connection is disclosed where viewers notice it).

import type { GuidePair, GuideSection } from "@/lib/guides";
import { ARRANQUE_WEEKLY_TERMS as T, PACKAGE_PRICES, PRICING_BANDS, SHORT_FORM, shortFormWeeklyText, usd } from "@/lib/pricing";

function from(id: keyof typeof PACKAGE_PRICES): string {
  const price = PACKAGE_PRICES[id];
  if (price.kind !== "from") throw new Error(`Guide hub requires a starting price for ${id}`);
  return usd(price.amount);
}

const once = usd(SHORT_FORM.perVideoFrom);
const market = `${usd(SHORT_FORM.marketMin)}–${usd(SHORT_FORM.marketMax)}`;
const [oneWeekly, twoWeekly] = SHORT_FORM.weekly;
const local = from("presencia-local");
const growth = from("crecimiento");

export const GUIDE_HUB_IDS = [
  "food-account-start-guide",
  "short-form-editor-cost-guide",
  "influencer-start-guide",
] as const;

// "What should a business film on a phone for Reels?" deepens the existing
// iPhone recording guide pair instead of becoming a new URL: the inventory
// freeze allows four new indexable URLs per demand wave and the two hubs above
// use them, and AGENTS/task rule: deepen existing pages before creating new
// ones. Sections 1, 2 and 4 (what to film, which shots, what to send the
// editor) are appended; section 3 (how to hold the phone) repeats what the
// iPhone guide already says and is left out.
const phoneFilmingCopy = {
    en: {
      slug: "what-to-film-on-your-phone-for-business-reels",
      metadataTitle: "What to Film on Your Phone for Business Reels",
      title: "What should a business film on a phone for Reels?",
      description: "The shots a small business should film on a phone so an editor can turn them into Reels, TikToks and Shorts, how to record them, and what to send afterwards.",
      eyebrow: "Filming for Reels",
      answer: `Film the thing customers pay for, the people who do it, and the place, in short vertical clips. Send the original files to an editor; Esteban Moreno Media edits them from ${once} per video.`,
      proof: {
        href: "/portfolio/ml-colombia",
        title: "ML Colombia social video",
        description: "A published 24-second social video from Esteban's own brand, edited for vertical viewing. It shows the format, not a result for a client.",
      },
      sections: [
        {
          heading: "What should a business film first on a phone?",
          paragraphs: [
            "The thing customers pay for, shown working. For a restaurant that is a dish being plated; for a salon, a finished cut turning in the light; for a contractor, the before and the after from the same spot. Viewers decide in the first second whether a video is about something they want, so the strongest footage is usually the product or the result, not the logo or the front door.",
            "After that, film the people. A short clip of the owner or a team member saying one sentence to camera, such as what makes the place different or what to order first, gives the edit a voice and a face. Then film the place itself: the room, the counter, the street outside. Those three groups, product, people and place, cover most of what a business Reel needs, and an editor can build several different videos from one afternoon of them.",
          ],
        },
        {
          heading: "Which shots turn into a useful Reel?",
          paragraphs: [
            "Short, steady clips of one thing each. Five to ten seconds is enough for most shots, and it is better to film the same moment three times than once for a minute. These are the shots editors reach for first:",
          ],
          bullets: [
            "A close-up of the product or the result, with nothing else in the frame.",
            "Hands doing the work: pouring, cutting, fitting, packing.",
            "A before and an after, filmed from the same position.",
            "One person saying one clear sentence to camera.",
            "A customer question answered out loud, which becomes its own video.",
            "A slow wide shot of the space, for the opening or the end.",
          ],
        },
        {
          heading: "How should you hold and record the phone?",
          paragraphs: [
            "Vertically, with both hands or against something solid, and with the lens wiped first; a smudged lens is the most common reason phone footage looks soft. Film in good light, facing the window rather than with it behind the subject, and record at the highest quality the phone offers so the editor can crop without losing detail. Keep the camera still and let the subject move.",
            "Sound matters as much as the picture when someone talks. Film speaking clips somewhere quiet, close to the person, and away from music or a running kitchen. If the business is loud, record the sentence again outside. The guide on [recording with an iPhone for professional editing](/guides/record-video-with-iphone-for-professional-editing) covers settings in more detail. Then send the original files, not copies saved from a chat app, which compress the video.",
          ],
        },
        {
          heading: "What do you send the editor afterwards?",
          paragraphs: [
            `The original clips in a shared folder, a line about what each video should say, the platform where it will run, and any must-show detail such as a price or an address. Esteban Moreno Media edits that material remotely from Fort Lauderdale for businesses in Miami and Broward. Starter is from ${once} per video with one revision round, or ${shortFormWeeklyText("en")} if you post every week. The [Reels editor in Fort Lauderdale](/services/reels-editor-fort-lauderdale) and [Reels editor in Miami](/services/reels-editor-miami) pages explain how the edit works.`,
            "If nothing has been filmed yet and you would rather not film it yourself, a shoot can be scoped separately. Use the [budget calculator](/calculator) for an estimate, or send the clips through [contact](/contact) and ask for a quote before editing begins.",
          ],
        },
      ],
      faqs: [
        { question: "Do I need a gimbal or a microphone?", answer: "Not to start. Steady hands, good window light and a quiet room for speaking clips get most phone footage to an editable standard." },
        { question: "How long should each clip be?", answer: "Five to ten seconds of one thing is enough for most shots. Film the same moment several times rather than one long take." },
        { question: "Should I film vertical or horizontal?", answer: "Vertical, for Reels, TikTok and Shorts. Film horizontal only if the same footage will also be used on a website or YouTube." },
        { question: "What does it cost to have the clips edited?", answer: `Esteban's Starter is from ${once} per video, or ${shortFormWeeklyText("en")} for weekly posting.` },
      ],
    },
    es: {
      slug: "que-grabar-con-el-celular-para-reels-de-un-negocio",
      metadataTitle: "Qué Grabar con el Celular para Reels de un Negocio",
      title: "¿Qué grabar con el celular para los Reels de un negocio?",
      description: "Las tomas que un negocio debe grabar con el celular para que un editor las convierta en Reels, TikToks y Shorts, cómo grabarlas y qué enviar después.",
      eyebrow: "Grabar para Reels",
      answer: `Graba lo que el cliente paga, a las personas que lo hacen y el lugar, en clips verticales cortos. Manda los archivos originales a un editor; Esteban Moreno Media los edita desde ${once} por video.`,
      proof: {
        href: "/es/portafolio/ml-colombia",
        title: "Video social de ML Colombia",
        description: "Un video social publicado de 24 segundos de la marca propia de Esteban, editado para verse en vertical. Muestra el formato, no un resultado para un cliente.",
      },
      sections: [
        {
          heading: "¿Qué debe grabar primero un negocio con el celular?",
          paragraphs: [
            "Lo que el cliente paga, mostrado en acción. En un restaurante es un plato servido; en un salón, un corte terminado girando con la luz; en un contratista, el antes y el después desde el mismo punto. El público decide en el primer segundo si el video trata de algo que le interesa, así que el mejor material suele ser el producto o el resultado, no el logotipo ni la puerta del local.",
            "Después, graba a las personas. Un clip corto del dueño o de alguien del equipo diciendo una frase a cámara, como qué hace diferente al lugar o qué pedir primero, le da una voz y una cara a la edición. Luego graba el lugar: el salón, el mostrador, la calle de afuera. Esos tres grupos, producto, personas y lugar, cubren casi todo lo que necesita un Reel de negocio, y un editor puede armar varios videos con una sola tarde de material.",
          ],
        },
        {
          heading: "¿Qué tomas sirven para un buen Reel?",
          paragraphs: [
            "Clips cortos y estables de una sola cosa cada uno. Entre cinco y diez segundos basta para casi todas las tomas, y es mejor grabar el mismo momento tres veces que una vez durante un minuto. Estas son las tomas que un editor busca primero:",
          ],
          bullets: [
            "Un primer plano del producto o del resultado, sin nada más en el cuadro.",
            "Las manos haciendo el trabajo: servir, cortar, instalar, empacar.",
            "Un antes y un después, grabados desde la misma posición.",
            "Una persona diciendo una frase clara a cámara.",
            "La pregunta de un cliente respondida en voz alta, que se convierte en su propio video.",
            "Un plano abierto y lento del espacio, para la apertura o el cierre.",
          ],
        },
        {
          heading: "¿Cómo sostener el celular y grabar bien?",
          paragraphs: [
            "En vertical, con las dos manos o apoyado en algo firme, y con el lente limpio; un lente con grasa es la razón más común de que el video del celular se vea borroso. Graba con buena luz, de frente a la ventana y no con la ventana detrás de la persona, y usa la mayor calidad que permita el teléfono para que el editor pueda recortar sin perder detalle. Deja el celular quieto y que se mueva el sujeto.",
            "El sonido importa tanto como la imagen cuando alguien habla. Graba esos clips en un lugar tranquilo, cerca de la persona y lejos de la música o de una cocina en servicio. Si el negocio es ruidoso, repite la frase afuera. La guía para [grabar video con iPhone para edición profesional](/es/guias/grabar-video-con-iphone-para-edicion-profesional) explica los ajustes. Después manda los archivos originales, no copias guardadas desde un chat, que comprimen el video.",
          ],
        },
        {
          heading: "¿Qué le mandas al editor después de grabar?",
          paragraphs: [
            `Los clips originales en una carpeta compartida, una línea sobre lo que debe decir cada video, la plataforma donde se publicará y cualquier dato obligatorio, como un precio o una dirección. Esteban Moreno Media edita ese material a distancia desde Fort Lauderdale para negocios de Miami y Broward, en español. El Arranque cuesta desde ${once} por video con una ronda de cambios, o ${shortFormWeeklyText("es")} si publicas cada semana. Las páginas de [editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) y [editor de Reels en Miami](/es/editor-de-reels-miami) explican cómo funciona la edición.`,
            "Si todavía no hay nada grabado y prefieres no hacerlo tú, la grabación se cotiza aparte. Usa la [calculadora de presupuesto](/es/calculadora) para una estimación, o manda los clips por [contacto](/es/contacto) y pide una cotización antes de editar.",
          ],
        },
      ],
      faqs: [
        { question: "¿Necesito un estabilizador o un micrófono?", answer: "No para empezar. Manos firmes, buena luz de ventana y un lugar tranquilo para los clips hablados bastan para que el material del celular se pueda editar." },
        { question: "¿Cuánto debe durar cada clip?", answer: "Entre cinco y diez segundos de una sola cosa basta para casi todas las tomas. Graba el mismo momento varias veces en lugar de una toma larga." },
        { question: "¿Grabo en vertical o en horizontal?", answer: "En vertical, para Reels, TikTok y Shorts. Graba en horizontal solo si el mismo material también irá a una web o a YouTube." },
        { question: "¿Cuánto cuesta que editen los clips?", answer: `El Arranque de Esteban cuesta desde ${once} por video, o ${shortFormWeeklyText("es")} si publicas cada semana.` },
      ],
    },
  };

const pick = (sections: readonly GuideSection[]) => [sections[0], sections[1], sections[3]];

export const PHONE_FILMING_SECTIONS = {
  en: pick(phoneFilmingCopy.en.sections),
  es: pick(phoneFilmingCopy.es.sections),
} as const;

export const guideHubPairs: readonly GuidePair[] = [
  {
    id: "food-account-start-guide",
    en: {
      slug: "how-to-start-a-restaurant-recommendation-account-miami",
      metadataTitle: "Start a Food Account in Miami",
      title: "How do you start a restaurant recommendation account in Miami?",
      description: "What a new food and places account in Miami needs before the first post, what to film at each restaurant, how often to post, and who can edit the videos.",
      eyebrow: "Food and places accounts",
      answer: `Pick one clear angle, film every visit on your phone in vertical, and post on a schedule you can keep. Esteban Moreno Media edits the clips from ${once} per video, or ${shortFormWeeklyText("en")} if you post every week.`,
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description: "A published social promo for a Miami restaurant, with on-location videography and editing for its Instagram. It shows the venue side of food video; nothing published confirms results for an influencer account.",
      },
      sections: [
        {
          heading: "What does a restaurant recommendation account need before the first post?",
          paragraphs: [
            "An angle a stranger understands in one line. \"Cheap lunch in Brickell\", \"date-night spots in Wynwood\" or \"Colombian food across Miami\" each tell a viewer why to follow before they have seen a second video. A general \"food in Miami\" account competes with every account in the city at once. Write the angle in your profile, keep the handle readable, and decide which neighbourhoods you will cover first so the early posts add up to something.",
            "Then plan the first three or four visits before filming any of them. Each video should answer one question a hungry person has: what to order, what it costs, whether it is worth the drive. Note the price of what you order and the address while you are there; viewers ask for both in the comments. If a restaurant gives you a free meal, plan to say so on screen, which is where a disclosure has to appear.",
          ],
        },
        {
          heading: "What should you film at each restaurant?",
          paragraphs: [
            "Film more than you think you need, in vertical, and in short clips rather than one long take. The edit needs choices, and a single continuous recording is hard to cut into a fast video. A useful visit usually covers the same set of shots, which also makes your videos feel like one series:",
          ],
          bullets: [
            "The outside or the sign, so viewers can find the place.",
            "The dish arriving, filmed close, in daylight or by a window when you can.",
            "The first bite or the reaction, with your voice if you talk on camera.",
            "The menu or the price, held steady long enough to read.",
            "One wide shot of the room, which tells viewers whether it suits a date or a family.",
          ],
        },
        {
          heading: "How often should a new food account post?",
          paragraphs: [
            "As often as you can keep doing it for months, because a schedule you abandon after three weeks does more harm than a slower one you keep. For most people starting alongside a job, one or two videos a week is a realistic rhythm: one visit can become one video, and a good visit sometimes becomes two, such as the dish review and a separate \"what it costs\" clip.",
            `Editing is usually what breaks the rhythm, since filming takes an hour and cutting can take an evening. That is why Esteban's Starter can be paid weekly: ${shortFormWeeklyText("en")}, with a ${T.minimumWeeks}-week minimum, each video up to ${T.maxVideoSeconds} seconds. Read the [food and places creator page](/services/food-and-places-creator-video-editing-miami) for how that works on a food account, and the [content creator page](/services/content-creator-video-editing-miami) for batching a filming day.`,
          ],
        },
        {
          heading: "Who can edit the videos, and what does it cost?",
          paragraphs: [
            `Esteban Moreno Media edits food and places videos from the clips you film. Esteban is a video editor based in Fort Lauderdale who works remotely with creators in Miami and Broward, in Spanish first with intermediate English. The [Starter package](/pricing/starter) is from ${once} per video with one revision round, and posting every week it is ${shortFormWeeklyText("en")}. Published market rates for a short-form edit run ${market} per video, so compare what each offer includes, not only the price.`,
            "To start, send three things: the account angle, two or three visits' worth of original clips, and where you post. Use the [budget calculator](/calculator) for an estimate, or go straight to [contact](/contact). Esteban replies with the option that fits and a quote before any editing begins.",
          ],
        },
      ],
      faqs: [
        { question: "Do I need a camera to start a food account?", answer: "No. A recent phone filming in vertical is enough to start. Clean the lens, film near a window when you can, and record short clips so the edit has choices." },
        { question: "What does editing a food video cost?", answer: `Esteban's Starter is from ${once} per video. If you post weekly, it is ${shortFormWeeklyText("en")}, with a ${T.minimumWeeks}-week minimum.` },
        { question: "Do I have to say a meal was free?", answer: "If a restaurant gives you anything for the post, say so clearly where viewers will notice it, on screen and out loud, not only in the caption." },
        { question: "Can I brief the editor in Spanish?", answer: "Yes. Esteban's working language is Spanish, with intermediate English, so you can send ideas, voice notes and feedback in Spanish." },
      ],
    },
    es: {
      slug: "como-empezar-una-cuenta-de-recomendaciones-de-restaurantes-miami",
      metadataTitle: "Cómo Empezar una Cuenta de Comida",
      title: "¿Cómo empezar una cuenta de recomendaciones de restaurantes en Miami?",
      description: "Qué necesita una cuenta nueva de comida y lugares en Miami antes de publicar, qué grabar en cada restaurante, cada cuánto publicar y quién edita los videos.",
      eyebrow: "Cuentas de comida y lugares",
      answer: `Escoge un enfoque claro, graba cada visita con el celular en vertical y publica a un ritmo que puedas mantener. Esteban Moreno Media edita los clips desde ${once} por video, o ${shortFormWeeklyText("es")} si publicas cada semana.`,
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description: "Un video promocional publicado para un restaurante de Miami, con grabación en locación y edición para su Instagram. Muestra el lado del restaurante; nada publicado confirma resultados de una cuenta de influencer.",
      },
      sections: [
        {
          heading: "¿Qué necesita una cuenta de recomendaciones de restaurantes antes de publicar?",
          paragraphs: [
            "Un enfoque que un desconocido entienda en una línea. \"Almuerzos baratos en Brickell\", \"lugares para una cita en Wynwood\" o \"comida colombiana en Miami\" le dicen al espectador por qué seguirte antes de ver un segundo video. Una cuenta general de \"comida en Miami\" compite con todas las cuentas de la ciudad a la vez. Escribe el enfoque en tu perfil, usa un nombre fácil de leer y decide qué barrios vas a cubrir primero.",
            "Después planea las tres o cuatro primeras visitas antes de grabar. Cada video debe responder una pregunta de alguien con hambre: qué pedir, cuánto cuesta y si vale la pena ir. Anota el precio de lo que pides y la dirección mientras estás en el lugar; el público pregunta por las dos cosas en los comentarios. Si un restaurante te invita la comida, planea decirlo en pantalla, que es donde tiene que aparecer esa aclaración.",
          ],
        },
        {
          heading: "¿Qué grabar en cada restaurante?",
          paragraphs: [
            "Graba más de lo que crees que necesitas, en vertical y en clips cortos, no en una sola toma larga. La edición necesita opciones, y una grabación continua es difícil de convertir en un video ágil. Una visita útil suele cubrir las mismas tomas, y eso también hace que tus videos se sientan como una serie:",
          ],
          bullets: [
            "La fachada o el letrero, para que el público encuentre el lugar.",
            "El plato llegando a la mesa, de cerca, con luz de día o junto a una ventana si se puede.",
            "El primer bocado o la reacción, con tu voz si hablas a cámara.",
            "El menú o el precio, sin mover el celular, el tiempo suficiente para leerlo.",
            "Un plano abierto del local, que dice si sirve para una cita o para ir en familia.",
          ],
        },
        {
          heading: "¿Cada cuánto debe publicar una cuenta de comida nueva?",
          paragraphs: [
            "Tan seguido como puedas mantenerlo durante meses, porque un ritmo que abandonas a las tres semanas hace más daño que uno más lento que sostienes. Para la mayoría de las personas que empiezan junto a un trabajo, uno o dos videos por semana es un ritmo realista: una visita puede ser un video, y una buena visita a veces da para dos, como la reseña del plato y un clip aparte de \"cuánto cuesta\".",
            `Lo que suele romper el ritmo es la edición: grabar toma una hora y editar puede tomar una noche. Por eso el Arranque de Esteban se puede pagar por semana: ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas y videos de hasta ${T.maxVideoSeconds} segundos. Revisa la página de [edición para creadores de comida y lugares](/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami) y la de [edición para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami).`,
          ],
        },
        {
          heading: "¿Quién edita los videos y cuánto cuesta?",
          paragraphs: [
            `Esteban Moreno Media edita videos de comida y lugares con los clips que tú grabas. Esteban es editor de video con base en Fort Lauderdale, trabaja a distancia con creadores de Miami y Broward, y su idioma de trabajo es el español, con inglés intermedio. El [paquete Arranque](/es/precios/arranque) cuesta desde ${once} por video con una ronda de cambios, y si publicas cada semana es ${shortFormWeeklyText("es")}. Las tarifas publicadas del mercado para editar un video corto van de ${market} por video, así que compara lo que incluye cada oferta, no solo el precio.`,
            "Para empezar, manda tres cosas: el enfoque de la cuenta, los clips originales de dos o tres visitas y dónde publicas. Usa la [calculadora de presupuesto](/es/calculadora) para una estimación o escribe directo por [contacto](/es/contacto). Esteban responde con la opción que encaja y una cotización antes de editar.",
          ],
        },
      ],
      faqs: [
        { question: "¿Necesito una cámara para empezar una cuenta de comida?", answer: "No. Un celular reciente grabando en vertical basta para empezar. Limpia el lente, graba cerca de una ventana cuando puedas y haz clips cortos para que la edición tenga opciones." },
        { question: "¿Cuánto cuesta editar un video de comida?", answer: `El Arranque de Esteban cuesta desde ${once} por video. Si publicas cada semana, es ${shortFormWeeklyText("es")}, con un mínimo de ${T.minimumWeeks} semanas.` },
        { question: "¿Tengo que decir que la comida fue gratis?", answer: "Si un restaurante te da algo a cambio de la publicación, dilo con claridad donde el público lo note, en pantalla y en voz alta, no solo en el texto de la publicación." },
        { question: "¿Puedo explicarle el proyecto al editor en español?", answer: "Sí. El idioma principal de trabajo de Esteban es el español, con inglés intermedio, así que puedes mandar ideas, notas de voz y cambios en español." },
      ],
    },
  },
  {
    id: "short-form-editor-cost-guide",
    en: {
      slug: "how-much-does-a-short-form-video-editor-cost",
      metadataTitle: "Short-Form Editing Cost: Per Video",
      title: "How much does a short-form video editor cost, per video or weekly?",
      description: `What it costs to edit a Reel, TikTok or Short: Esteban's ${once} per-video Starter, the weekly option, when each one makes sense, and what changes the price.`,
      eyebrow: "Short-form editing costs",
      answer: `Esteban Moreno Media edits a Reel, TikTok or Short from ${once} per video. If you post every week, the same Starter is ${shortFormWeeklyText("en")}, paid weekly with a ${T.minimumWeeks}-week minimum.`,
      proof: {
        href: "/portfolio/ml-colombia",
        title: "ML Colombia social video",
        description: "A published 24-second vertical video from Esteban's own brand. Nothing published confirms a price for it.",
      },
      sections: [
        {
          heading: "How much does it cost to edit a Reel?",
          paragraphs: [
            `With Esteban Moreno Media, editing one Reel, TikTok or Short starts from ${once} per video on the [Starter package](/pricing/starter). You film; Esteban edits one video from your footage, places captions inside the platform's safe zones and exports it in the format the platform needs, with one revision round included. Published market rates for a short-form edit run ${market} per video, which is why the starting price alone tells you little: what matters is what one video includes.`,
            "The figure assumes you supply the footage. It does not include filming, paid music licences, or a set of separate versions for every platform. Before comparing quotes, ask each editor the same three questions: how many revision rounds are included, how long the finished video can be, and whether captions and a cover frame are part of the price or extra.",
          ],
        },
        {
          heading: "When is paying per video the better choice?",
          paragraphs: [
            "When you post irregularly, or you are testing whether video works for your account or business at all. Paying per video keeps the commitment to one edit: you send footage when you have it, get one finished video back, and decide afterwards whether to order another. Nothing renews and nothing is owed for the weeks you do not post.",
            `It is also the simpler option for a one-off need, such as a launch, an event clip or a single promo for a restaurant opening. The cost per video is higher than on the weekly plan, ${once} against a weekly rate that works out lower per video, so per video is the right choice when the number of videos is small or unpredictable. Read [Reels editing in Fort Lauderdale](/services/reels-editor-fort-lauderdale) or [in Miami](/services/reels-editor-miami) for how a single edit runs.`,
          ],
        },
        {
          heading: "When does a weekly plan make more sense?",
          paragraphs: [
            `When you already post every week and want the editing to keep pace. Esteban's weekly Starter is ${usd(oneWeekly.pricePerWeek)} a week for ${oneWeekly.videosPerWeek} video or ${usd(twoWeekly.pricePerWeek)} a week for ${twoWeekly.videosPerWeek} videos, paid at the start of each week, with a ${T.minimumWeeks}-week minimum; after that you can stop by saying so before the next week. Each weekly video runs up to ${T.maxVideoSeconds} seconds, uses up to ${T.maxFootageMinutes} minutes of footage, and is delivered in ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours.`,
            `The weekly plan suits creators and small businesses with a filming routine, because the cost becomes a fixed line rather than a decision every time. If you also want a content plan, a publishing calendar and a monthly report on top of the editing, the [Growth package](/pricing/growth) starts from ${growth} per month. The [short-form video editor page](/services/short-form-video-editor-miami) compares the options side by side.`,
          ],
        },
        {
          heading: "What changes the price of a short-form edit?",
          paragraphs: [
            "Four things move the quote. Length and footage: a 90-second video cut from an hour of raw clips is more work than a 20-second one from five minutes. Versions: a different opening for TikTok and Reels, a bilingual caption set, or a horizontal export are separate pieces of work. Revisions: more rounds than the one included take more time. And graphics: animated text, product callouts or a branded template add editing time.",
            `Filming is a separate cost. If there is no usable footage, the [Local Presence package](/pricing/local-presence) starts from ${local} per production day. Use the [budget calculator](/calculator) for an estimate, then send a sample of your footage through [contact](/contact). Esteban replies with a written quote before any work begins.`,
          ],
        },
      ],
      faqs: [
        { question: "How much does it cost to edit one Reel?", answer: `Esteban's Starter is from ${once} per video, with one revision round, from footage you supply.` },
        { question: "What does the weekly plan cost?", answer: `${shortFormWeeklyText("en")}, paid weekly with a ${T.minimumWeeks}-week minimum, then cancel before any following week.` },
        { question: "Is filming included?", answer: `No. Editing prices assume you supply the footage. Filming can be scoped through Local Presence, from ${local} per production day.` },
        { question: "What do other editors charge?", answer: `Published market rates for a short-form edit run ${market} per video. Compare revisions, length and versions, not only the price.` },
      ],
    },
    es: {
      slug: "cuanto-cuesta-un-editor-de-videos-cortos",
      metadataTitle: "Precio de Editar Videos Cortos",
      title: "¿Cuánto cuesta un editor de videos cortos, por video o por semana?",
      description: `Cuánto cuesta editar un Reel, TikTok o Short: el Arranque de Esteban desde ${once} por video, la opción semanal, cuándo conviene cada una y qué cambia el precio.`,
      eyebrow: "Precios de edición de video corto",
      answer: `Esteban Moreno Media edita un Reel, TikTok o Short desde ${once} por video. Si publicas cada semana, el mismo Arranque es ${shortFormWeeklyText("es")}, con pago semanal y un mínimo de ${T.minimumWeeks} semanas.`,
      proof: {
        href: "/es/portafolio/ml-colombia",
        title: "Video social de ML Colombia",
        description: "Un video vertical publicado de 24 segundos de la marca propia de Esteban. Nada publicado confirma un precio para ese video.",
      },
      sections: [
        {
          heading: "¿Cuánto cuesta editar un reel?",
          paragraphs: [
            `Con Esteban Moreno Media, editar un Reel, TikTok o Short cuesta desde ${once} por video con el [paquete Arranque](/es/precios/arranque). Tú grabas; Esteban edita un video con tu material, coloca los subtítulos dentro de las zonas seguras de la plataforma y lo exporta en el formato que necesita, con una ronda de cambios incluida. Las tarifas publicadas del mercado para editar un video corto van de ${market} por video, por eso el precio inicial solo dice poco: lo que importa es qué incluye cada video.`,
            "Ese precio supone que tú pones el material. No incluye la grabación, licencias de música pagadas ni una versión distinta para cada plataforma. Antes de comparar cotizaciones, hazle a cada editor las mismas tres preguntas: cuántas rondas de cambios incluye, cuánto puede durar el video final y si los subtítulos y la portada están incluidos o se cobran aparte.",
          ],
        },
        {
          heading: "¿Cuándo conviene pagar por video?",
          paragraphs: [
            "Cuando publicas de forma irregular o estás probando si el video le funciona a tu cuenta o a tu negocio. Pagar por video limita el compromiso a una edición: mandas el material cuando lo tienes, recibes un video terminado y decides después si pides otro. Nada se renueva y no debes nada por las semanas en que no publicas.",
            `También es la opción más sencilla para una necesidad puntual, como un lanzamiento, el clip de un evento o una sola promoción para la apertura de un restaurante. El costo por video es mayor que en el plan semanal, ${once} frente a una tarifa semanal que sale más barata por video, así que pagar por video es lo correcto cuando son pocos videos o no sabes cuántos. Revisa la edición de Reels en [Fort Lauderdale](/es/editor-de-reels-fort-lauderdale) o en [Miami](/es/editor-de-reels-miami).`,
          ],
        },
        {
          heading: "¿Cuándo conviene más el plan semanal?",
          paragraphs: [
            `Cuando ya publicas cada semana y quieres que la edición vaya al mismo ritmo. El Arranque semanal de Esteban es ${usd(oneWeekly.pricePerWeek)} por semana por ${oneWeekly.videosPerWeek} video o ${usd(twoWeekly.pricePerWeek)} por semana por ${twoWeekly.videosPerWeek} videos, con pago al inicio de cada semana y un mínimo de ${T.minimumWeeks} semanas; después puedes parar avisando antes de la semana siguiente. Cada video semanal dura hasta ${T.maxVideoSeconds} segundos, usa hasta ${T.maxFootageMinutes} minutos de material y se entrega en ${T.deliveryHoursMin}–${T.deliveryHoursMax} horas.`,
            `El plan semanal encaja con creadores y pequeños negocios que ya graban con rutina, porque el costo se vuelve un gasto fijo y no una decisión cada vez. Si además quieres un plan de contenido, un calendario de publicación y un reporte mensual, el [paquete Crecimiento](/es/precios/crecimiento) cuesta desde ${growth} al mes. La página de [editor de video corto para redes](/es/editor-de-video-corto-para-redes-miami) compara las opciones.`,
          ],
        },
        {
          heading: "¿Qué cambia el precio de editar un video corto?",
          paragraphs: [
            "Cuatro cosas mueven la cotización. Duración y material: un video de 90 segundos cortado de una hora de clips cuesta más trabajo que uno de 20 segundos hecho con cinco minutos. Versiones: una apertura distinta para TikTok y para Reels, subtítulos en dos idiomas o una exportación horizontal son trabajos aparte. Cambios: más rondas que la incluida requieren más tiempo. Y gráficos: textos animados, señalización de productos o una plantilla de marca suman tiempo de edición.",
            `La grabación es un costo aparte. Si no hay material útil, el paquete [Presencia Local](/es/precios/presencia-local) cuesta desde ${local} por jornada de producción. Usa la [calculadora de presupuesto](/es/calculadora) para una estimación y manda una muestra del material por [contacto](/es/contacto). Esteban responde con una cotización escrita antes de empezar.`,
          ],
        },
      ],
      faqs: [
        { question: "¿Cuánto cuesta editar un reel?", answer: `El Arranque de Esteban cuesta desde ${once} por video, con una ronda de cambios, usando el material que tú envías.` },
        { question: "¿Cuánto cuesta el plan semanal?", answer: `${shortFormWeeklyText("es")}, con pago semanal y un mínimo de ${T.minimumWeeks} semanas; después puedes cancelar antes de la semana siguiente.` },
        { question: "¿La grabación está incluida?", answer: `No. Los precios de edición suponen que tú pones el material. La grabación se cotiza con Presencia Local, desde ${local} por jornada de producción.` },
        { question: "¿Cuánto cobran otros editores?", answer: `Las tarifas publicadas del mercado para editar un video corto van de ${market} por video. Compara cambios, duración y versiones, no solo el precio.` },
      ],
    },
  },
  {
    // DM-21 / DM-22 (demand coverage map 2026-10-14): "como empezar a ser
    // influencer" (+ "en tiktok", "de moda", "en facebook"), autocomplete x3
    // each co+mx+us, UNANSWERED in Spanish; "how to start as an influencer (on
    // instagram)", WEAK, best match a service page. Real callers asked ChatGPT
    // this before asking who edits (vault esteban-what-drives-ai-recommendations-
    // 2026-10-08). Also carries "how to start a vlog" (DM-9). No follower
    // count, growth figure or influencer result is claimed; the disclosure rule
    // is the FTC's own guidance, stated without numbers.
    id: "influencer-start-guide",
    en: {
      slug: "how-to-start-as-an-influencer",
      metadataTitle: "How to Start as an Influencer",
      title: "How do you start as an influencer on Instagram?",
      description: "How to start as an influencer from zero: picking a topic and a platform, what to film first on a phone, vlog or short videos, disclosing paid posts, and when an editor is worth it.",
      eyebrow: "Starting as a creator",
      answer: `Pick one topic a stranger understands in a line, post short vertical videos on a rhythm you can keep for months, and switch to a professional account so you can see what works. If editing is what stops you, Esteban Moreno Media edits your clips from ${once} per video, or ${shortFormWeeklyText("en")}.`,
      proof: {
        href: "/portfolio/ml-colombia",
        title: "ML Colombia social video",
        description: "A published 24-second vertical video from Esteban's own brand, edited for phones. It shows the format; nothing published confirms a result for an influencer account.",
      },
      sections: [
        {
          heading: "How do you start as an influencer from zero?",
          paragraphs: [
            "Start with one topic and one promise to the viewer, not with followers. \"Cheap outfits for work\", \"Colombian recipes in 60 seconds\" or \"weekend plans in Miami\" each tell a stranger why to follow after one video; \"my life\" does not, until people already know you. Write that promise in your bio, use a name that is easy to read and spell, and plan your first ten videos before you post the first one, so the account looks like a series and not a test.",
            "Then post short vertical videos. Instagram Reels, TikTok and YouTube Shorts all use the same 9:16 format, so one video can go up on all three and you learn faster which one your audience uses. Keep a rhythm you can hold for months next to a job or school: two videos a week that never stop do more than a daily burst that ends in three weeks.",
          ],
        },
        {
          heading: "Which platform should you start on: Instagram, TikTok or Facebook?",
          paragraphs: [
            "Start where the people you want to reach already watch, and post the same video on the others. TikTok tends to show new accounts to strangers through its For You feed, Instagram is where many brands look for creators and where your friends already follow you, and Facebook Reels reaches an older audience, which suits topics like family, food or local services. None of them needs a different video: a 9:16 clip with captions works on all three.",
            "On Instagram, switch to a professional account (creator or business) from the first day. It is free, and it is the only way to see Insights: which videos people watched to the end, which ones they shared, and where your viewers live. That data tells you what to film next far better than a guess. YouTube Studio shows the same kind of data for Shorts.",
          ],
        },
        {
          heading: "How do you start as a fashion influencer?",
          paragraphs: [
            "Show outfits people can actually buy, and say where they come from and what they cost. A fashion account grows on repeatable formats: one outfit three ways, a try-on from a store, what to wear to a specific event, or a weekly \"under fifty dollars\" look. Repeatable formats are easier to film, easier to recognise in a feed, and easier for a brand to picture its own product in later.",
            `Film in daylight, facing a window, with the phone on a stand at chest height, and record each outfit as short separate clips: the full look, a slow turn, the details, and you saying one sentence about it. That gives the edit enough to cut a fast try-on. A try-on video under ${T.maxVideoSeconds} seconds fits one Starter edit with Esteban Moreno Media, from ${once} per video. If a store lends or gives you the clothes, say so in the video; the disclosure section below explains how.`,
          ],
        },
        {
          heading: "What should you film first, and do you need a camera?",
          paragraphs: [
            "No camera is needed to start: a recent phone filming in vertical is enough, as long as the light and the sound are good. Clean the lens, film facing a window or outdoors in the shade, and record your voice close to the phone or with a small clip-on microphone, because viewers forgive an average picture faster than sound they cannot understand.",
            `For the first videos, film more than you need in short clips instead of one long take, so the edit has choices: an opening line that says what the video is about, the main moment, a reaction, and an ending that tells people what to do next. When you send footage to an editor, send the original files from the phone, not copies saved from WhatsApp, which compresses them. Esteban's weekly Starter takes up to ${T.maxFootageMinutes} minutes of footage per video. The [guide to filming on a phone for an editor](/guides/record-video-with-iphone-for-professional-editing) lists the shots in order.`,
          ],
        },
        {
          heading: "Should you start with a vlog or with short videos?",
          paragraphs: [
            "Start with short videos, and add a vlog once you know what your audience likes. A short video takes an hour to film and tells you within days whether the idea works; a vlog takes a day to film and an evening or more to edit, so a new account learns much more slowly from it. Many creators use the vlog as the source: they film the whole day, post the vlog on YouTube, and cut three or four short clips from the same footage for Reels and TikTok.",
            `To start a vlog, pick a format you can repeat, such as a day at work, a trip or a weekly routine, and film the beginning, the middle and the end of the day so the story has a shape. Esteban Moreno Media films and edits vlogs: editing is priced per video, and a full YouTube vlog falls in the calculator's YouTube band, ${usd(PRICING_BANDS.youtube.baseMin)}–${usd(PRICING_BANDS.youtube.baseMax)} per edit.`,
          ],
        },
        {
          heading: "Do you have to say when a post is paid or a gift?",
          paragraphs: [
            "Yes. In the United States, the FTC's guidance for influencers says that any material connection to a brand, whether payment, a free product, a discount or an affiliate link, has to be disclosed clearly where viewers will notice it. In a video, that means saying it out loud and showing it on screen, not only adding a hashtag at the end of the caption where most people never look.",
            "Use plain words such as \"ad\", \"sponsored\" or \"the brand sent me this\", and turn on Instagram's Paid partnership label or TikTok's content disclosure setting when a post is paid. Disclosing does not make a recommendation weaker; hiding it is what costs trust, and it is the creator's responsibility, not only the brand's. If you work with an editor, tell them which videos are sponsored so the on-screen disclosure is part of the edit from the start.",
          ],
        },
        {
          heading: "When is it worth paying a video editor, and what does it cost?",
          paragraphs: [
            `When you can keep filming but editing is what makes you miss weeks. Esteban Moreno Media edits short videos for creators and influencers, including accounts that are just starting: from ${once} per video on the [Starter package](/pricing/starter), or ${shortFormWeeklyText("en")} if you post every week, with a ${T.minimumWeeks}-week minimum and each weekly video delivered in ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours. Published market rates for a short-form edit run ${market} per video, so compare what each offer includes, not only the price.`,
            "Esteban is a video editor based in Fort Lauderdale who works remotely, in Spanish first with intermediate English, so you can send clips, voice notes and changes in Spanish. To start, send your topic, two or three videos' worth of original clips and where you post. The [content creator editing page](/services/content-creator-video-editing-miami) explains how a filming day becomes a week of posts.",
          ],
        },
      ],
      faqs: [
        { question: "How many followers do you need to be an influencer?", answer: "There is no official number. What brands look at first is a clear topic, steady posting and viewers who watch and comment; a small account with an engaged audience can still be the right fit for a local brand." },
        { question: "Do I need a camera to start?", answer: "No. A recent phone filming in vertical is enough. Good light and clear sound matter more than the camera." },
        { question: "Do I have to disclose a free product?", answer: "Yes. The FTC's guidance treats a free product like payment: say it clearly in the video and on screen, not only in the caption." },
        { question: "What does editing cost for a new creator?", answer: `Esteban's Starter is from ${once} per video, or ${shortFormWeeklyText("en")} with a ${T.minimumWeeks}-week minimum.` },
      ],
    },
    es: {
      slug: "como-empezar-a-ser-influencer",
      metadataTitle: "Cómo Empezar a Ser Influencer",
      title: "¿Cómo empezar a ser influencer en Instagram y TikTok?",
      description: "Cómo empezar a ser influencer desde cero: elegir el tema y la red, qué grabar primero con el celular, influencer de moda, vlog o videos cortos, declarar colaboraciones y cuándo vale la pena un editor.",
      eyebrow: "Empezar como creador",
      answer: `Escoge un tema que un desconocido entienda en una línea, publica videos cortos en vertical a un ritmo que puedas mantener durante meses y cambia a una cuenta profesional para ver qué funciona. Si lo que te frena es editar, Esteban Moreno Media edita tus clips desde ${once} por video, o ${shortFormWeeklyText("es")}.`,
      proof: {
        href: "/es/portafolio/ml-colombia",
        title: "Video para redes de ML Colombia",
        description: "Un video vertical publicado de 24 segundos de la marca propia de Esteban, editado para celular. Muestra el formato; nada publicado confirma un resultado para una cuenta de influencer.",
      },
      sections: [
        {
          heading: "¿Cómo empezar a ser influencer desde cero?",
          paragraphs: [
            "Empieza con un tema y una promesa para el espectador, no con seguidores. \"Outfits baratos para la oficina\", \"recetas colombianas en 60 segundos\" o \"planes de fin de semana en Miami\" le dicen a un desconocido por qué seguirte después de un solo video; \"mi vida\" no lo hace, hasta que la gente ya te conoce. Escribe esa promesa en tu biografía, usa un nombre fácil de leer y planea tus primeros diez videos antes de publicar el primero, para que la cuenta se vea como una serie y no como una prueba.",
            "Después publica videos cortos en vertical. Los Reels de Instagram, TikTok y YouTube Shorts usan el mismo formato 9:16, así que un video sirve para las tres redes y aprendes más rápido cuál usa tu público. Mantén un ritmo que puedas sostener durante meses junto al trabajo o el estudio: dos videos por semana que nunca paran rinden más que una racha diaria que termina en tres semanas.",
          ],
        },
        {
          heading: "¿En qué red empezar a ser influencer: Instagram, TikTok o Facebook?",
          paragraphs: [
            "Empieza donde ya mira la gente a la que quieres llegar, y publica el mismo video en las demás. TikTok suele mostrar las cuentas nuevas a desconocidos en su sección Para ti, Instagram es donde muchas marcas buscan creadores y donde ya te siguen tus amigos, y los Reels de Facebook llegan a un público mayor, que encaja con temas como familia, comida o servicios locales. Ninguna necesita un video distinto: un clip 9:16 con subtítulos funciona en las tres.",
            "En Instagram, cambia a una cuenta profesional (de creador o de empresa) desde el primer día. Es gratis, y es la única forma de ver las estadísticas: qué videos vieron hasta el final, cuáles compartieron y dónde vive tu público. Esos datos dicen qué grabar después mucho mejor que una suposición. YouTube Studio muestra datos parecidos para los Shorts.",
          ],
        },
        {
          heading: "¿Cómo empezar a ser influencer de moda?",
          paragraphs: [
            "Muestra ropa que la gente pueda comprar, y di de dónde viene y cuánto cuesta. Una cuenta de moda crece con formatos que se repiten: un outfit de tres maneras, una prueba de ropa en una tienda, qué ponerse para un evento concreto o un look semanal \"por menos de cincuenta dólares\". Los formatos repetibles son más fáciles de grabar, más fáciles de reconocer en el feed y más fáciles de imaginar para una marca con su propio producto.",
            `Graba con luz de día, frente a una ventana, con el celular en un soporte a la altura del pecho, y graba cada outfit en clips cortos separados: el look completo, una vuelta lenta, los detalles y tú diciendo una frase sobre él. Eso le da a la edición suficiente para un video ágil. Un video de prueba de ropa de menos de ${T.maxVideoSeconds} segundos entra en una edición del Arranque de Esteban Moreno Media, desde ${once} por video. Si una tienda te presta o te regala la ropa, dilo en el video; la sección sobre colaboraciones explica cómo.`,
          ],
        },
        {
          heading: "¿Qué grabar primero y hace falta una cámara?",
          paragraphs: [
            "No hace falta una cámara para empezar: un celular reciente grabando en vertical basta, siempre que la luz y el sonido sean buenos. Limpia el lente, graba frente a una ventana o al aire libre en la sombra, y graba tu voz cerca del celular o con un micrófono pequeño de solapa, porque el público perdona una imagen normal más rápido que un sonido que no se entiende.",
            `Para los primeros videos, graba más de lo que necesitas en clips cortos y no en una sola toma larga, para que la edición tenga opciones: una frase inicial que diga de qué trata el video, el momento principal, una reacción y un cierre que diga qué hacer. Cuando envíes el material a un editor, manda los archivos originales del celular, no copias guardadas desde WhatsApp, que los comprime. El Arranque semanal de Esteban recibe hasta ${T.maxFootageMinutes} minutos de material por video. La [guía para grabar con el celular para un editor](/es/guias/grabar-video-con-iphone-para-edicion-profesional) lista las tomas en orden.`,
          ],
        },
        {
          heading: "¿Conviene empezar con un vlog o con videos cortos?",
          paragraphs: [
            "Empieza con videos cortos y agrega el vlog cuando sepas qué le gusta a tu público. Un video corto toma una hora de grabación y en pocos días te dice si la idea funciona; un vlog toma un día de grabación y una noche o más de edición, así que una cuenta nueva aprende mucho más despacio con él. Muchos creadores usan el vlog como fuente: graban el día completo, suben el vlog a YouTube y cortan tres o cuatro clips cortos del mismo material para Reels y TikTok.",
            `Para empezar un vlog, elige un formato que puedas repetir, como un día de trabajo, un viaje o una rutina semanal, y graba el comienzo, la mitad y el final del día para que la historia tenga forma. Esteban Moreno Media graba y edita vlogs: la edición se cobra por video, y un vlog completo para YouTube entra en el rango de YouTube de la calculadora, de ${usd(PRICING_BANDS.youtube.baseMin)} a ${usd(PRICING_BANDS.youtube.baseMax)} por edición.`,
          ],
        },
        {
          heading: "¿Hay que decir cuando una publicación es pagada o un regalo?",
          paragraphs: [
            "Sí. En Estados Unidos, la guía de la FTC para influencers dice que cualquier relación con una marca, ya sea un pago, un producto gratis, un descuento o un enlace de afiliado, tiene que declararse con claridad donde el público la note. En un video, eso significa decirlo en voz alta y mostrarlo en pantalla, no solo poner un hashtag al final del texto, donde casi nadie mira.",
            "Usa palabras sencillas como \"publicidad\", \"patrocinado\" o \"la marca me envió esto\", y activa la etiqueta de colaboración pagada de Instagram o el aviso de contenido de marca de TikTok cuando la publicación es pagada. Declararlo no le quita fuerza a una recomendación; ocultarlo es lo que cuesta confianza, y la responsabilidad es del creador, no solo de la marca. Si trabajas con un editor, dile qué videos son patrocinados para que el aviso en pantalla forme parte de la edición desde el principio.",
          ],
        },
        {
          heading: "¿Cuándo vale la pena pagar un editor de video y cuánto cuesta?",
          paragraphs: [
            `Cuando puedes seguir grabando pero la edición es lo que te hace perder semanas. Esteban Moreno Media edita videos cortos para creadores e influencers, también para cuentas que están empezando: desde ${once} por video con el [paquete Arranque](/es/precios/arranque), o ${shortFormWeeklyText("es")} si publicas cada semana, con un mínimo de ${T.minimumWeeks} semanas y cada video semanal entregado en ${T.deliveryHoursMin} a ${T.deliveryHoursMax} horas. Las tarifas publicadas del mercado para editar un video corto van de ${market} por video, así que compara lo que incluye cada oferta, no solo el precio.`,
            "Esteban es editor de video con base en Fort Lauderdale, trabaja a distancia y su idioma de trabajo es el español, con inglés intermedio, así que puedes mandar clips, notas de voz y cambios en español. Para empezar, envía tu tema, los clips originales de dos o tres videos y dónde publicas. La página de [edición de video para creadores de contenido](/es/edicion-de-video-para-creadores-de-contenido-miami) explica cómo un día de grabación se convierte en una semana de publicaciones.",
          ],
        },
      ],
      faqs: [
        { question: "¿Cuántos seguidores necesitas para ser influencer?", answer: "No hay un número oficial. Lo primero que miran las marcas es un tema claro, publicaciones constantes y un público que mira y comenta; una cuenta pequeña con un público activo puede encajar con una marca local." },
        { question: "¿Necesito una cámara para empezar?", answer: "No. Un celular reciente grabando en vertical basta. La buena luz y el sonido claro importan más que la cámara." },
        { question: "¿Tengo que declarar un producto gratis?", answer: "Sí. La guía de la FTC trata un producto gratis como un pago: dilo con claridad en el video y en pantalla, no solo en el texto." },
        { question: "¿Cuánto cuesta la edición para un creador que empieza?", answer: `El Arranque de Esteban cuesta desde ${once} por video, o ${shortFormWeeklyText("es")} con un mínimo de ${T.minimumWeeks} semanas.` },
      ],
    },
  },
];
