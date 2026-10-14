// Two explainers that AI answers cite as sub-answers before a buyer picks an
// editor (2026-10-14, video-schema-tools brief):
//   - "Local editor vs Fiverr vs an agency in Miami: which fits?"
//   - "How many Reels should a restaurant post per week?"
//
// Claim discipline. Every market statement names its source in the sentence
// and was read live on 2026-10-14:
//   - Fiverr Help Center, "Paying for orders, extras, or custom offers":
//     "The standard service fee is 5.5% of your purchase amount, and we add a
//     $3.50 fee to orders under $200."
//   - Fiverr Help Center, "How Fiverr works": payment is released when the
//     buyer accepts the delivery; with no action the order completes
//     automatically 72 hours after delivery.
//   - Clutch, "Video Production Pricing Guide" (updated 2026-09-21): "Most
//     agencies charge between $100–$149 per hour" and "Video production
//     projects on Clutch typically cost less than $10,000."
//   - Buffer, "How Often Should You Post on Instagram" (Kirsti Lang,
//     2025-08-13): 2.1 million feed posts (photos, Reels, carousels; Stories
//     excluded) from 102K accounts; monthly follower growth +0.12% at 1-2
//     posts a week, +0.26% at 3-5, +0.44% at 6-9, +0.66% at 10+; about 12%
//     more reach per post moving from 1-2 to 3-5.
// Esteban's own prices come from lib/pricing.ts. No client, result or
// restaurant-specific statistic is claimed: Buffer's data covers all account
// types, and the page says so.

import type { GuidePair } from "@/lib/guides";
import {
  ARRANQUE_WEEKLY_OPTIONS,
  ARRANQUE_WEEKLY_TERMS as T,
  PACKAGE_PRICES,
  RESTAURANT_PROMO,
  usd,
} from "@/lib/pricing";

function from(id: keyof typeof PACKAGE_PRICES): string {
  const price = PACKAGE_PRICES[id];
  if (price.kind !== "from") throw new Error(`Comparison guide requires a starting price for ${id}`);
  return usd(price.amount);
}

const once = from("arranque");
const local = from("presencia-local");
const [oneWeekly, twoWeekly] = ARRANQUE_WEEKLY_OPTIONS;
const promo = usd(RESTAURANT_PROMO.from);

const FIVERR_PAYING = "https://help.fiverr.com/hc/en-us/articles/360050216133-Paying-for-orders-extras-or-custom-offers";
const FIVERR_HOW = "https://help.fiverr.com/hc/en-us/articles/360010558038-How-Fiverr-works";
const CLUTCH = "https://clutch.co/agencies/video-production/pricing";
const BUFFER = "https://buffer.com/resources/how-often-to-post-on-instagram/";

export const GUIDE_COMPARISON_IDS = [
  "local-vs-fiverr-vs-agency-guide",
  "restaurant-reels-per-week-guide",
] as const;

export const guideComparisonPairs: readonly GuidePair[] = [
  {
    id: "local-vs-fiverr-vs-agency-guide",
    en: {
      slug: "local-editor-vs-fiverr-vs-agency-miami",
      metadataTitle: "Local Editor vs Fiverr vs Agency",
      title: "Local editor vs Fiverr vs an agency in Miami: which fits?",
      description: "How a local video editor, a Fiverr freelancer and a Miami agency differ in price, fees, contact and filming, with each market figure sourced, so you can pick the right one.",
      eyebrow: "Choosing an editor",
      answer: `Fiverr adds a 5.5% service fee to every order (Fiverr Help Center), agencies mostly bill $100–$149 an hour (Clutch), and a local editor such as Esteban Moreno Media edits a Reel from ${once} per video, in Spanish or English, and can film in person.`,
      proof: {
        href: "/portfolio/ml-colombia",
        title: "ML Colombia social video",
        description: "A published 24-second vertical video from Esteban's own brand. It shows the format; nothing published confirms a result for a client.",
      },
      sections: [
        {
          heading: "What is the difference between a local editor, Fiverr and an agency?",
          paragraphs: [
            "Who you talk to, who does the work and who can come to you. On Fiverr you buy a package from a freelancer's listing, often someone in another country, and the platform holds the payment until you accept the delivery. An agency puts a team between you and the edit: an account manager takes your notes to producers, editors and designers, and you pay for that structure. A local editor is one person in your area who edits your footage, answers your messages directly and can meet you or film on location when the project needs it.",
            "None of the three is right for everyone. The useful comparison is not the headline price but what you get for it: how many changes are included, how fast you hear back, who is responsible when something is wrong, and whether anyone can film for you.",
          ],
        },
        {
          heading: "What does Fiverr cost on top of the gig price?",
          paragraphs: [
            `A service fee. Fiverr's Help Center article on paying for orders says the standard fee is 5.5% of the purchase amount, plus $3.50 on orders under $200, and each extra payment in the same order, such as a tip or an extra, carries its own fee. Another Fiverr help article states the small-order charge differently, so check the total at checkout before you pay. ([Fiverr: paying for orders](${FIVERR_PAYING}))`,
            `Payment is released to the freelancer when you accept the delivery, and if you do nothing the order completes automatically 72 hours after delivery, according to Fiverr's [How Fiverr works](${FIVERR_HOW}) page. So review each video as soon as it arrives. Revisions, video length and captions depend on the package each freelancer writes, not on a Fiverr standard, so read the package before you order.`,
          ],
        },
        {
          heading: "When does a Miami agency make sense?",
          paragraphs: [
            `When the job needs a team at once: a campaign with filming crews, colour, sound and motion graphics, several videos in parallel, or strict brand and legal reviews. Clutch, which publishes rates from verified reviews of agencies on its platform, says in its [video production pricing guide](${CLUTCH}) that most agencies charge between $100 and $149 an hour, and that video production projects on Clutch typically cost less than $10,000. Its figures cover full productions, not a single Reel edit.`,
            "That structure is what you pay for. Notes usually travel through a producer, schedules are set by the team, and monthly social content is often sold as a package with strategy and reporting. If you already know what to film and mainly need edited Reels each week, that layer can cost more than it returns. Ask any agency what is included per video, how many rounds of changes, and who edits.",
          ],
        },
        {
          heading: "When is a local editor the better choice?",
          paragraphs: [
            `When you film your own content and want one person who knows your business to edit it every week. Esteban Moreno Media edits Reels, TikToks and Shorts from ${once} per video, or ${usd(oneWeekly.pricePerWeek)} a week for ${oneWeekly.videosPerWeek} video and ${usd(twoWeekly.pricePerWeek)} a week for ${twoWeekly.videosPerWeek}, with a ${T.minimumWeeks}-week minimum and the price shown before you pay. Weekly videos are delivered ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours after the footage arrives.`,
            `Esteban works from South Florida, so if you need filming he can come to you: the [Local Presence package](/pricing/local-presence) starts from ${local} per production day. His working language is Spanish, with intermediate English, which helps Spanish-speaking owners and bilingual audiences. See [Reels editing in Miami](/services/reels-editor-miami), work out a monthly total with the [Reels cost calculator](/reels-editing-cost-calculator), or compare with a [freelancer vs a post-production agency](/guides/freelance-video-editor-vs-post-agency).`,
          ],
        },
      ],
      faqs: [
        { question: "Is Fiverr cheaper than a local editor?", answer: `The gig price can be lower, but Fiverr adds a 5.5% service fee, plus $3.50 on orders under $200. Esteban's single Reel edit is from ${once}, with no platform fee.` },
        { question: "How much do Miami agencies charge?", answer: "Clutch's pricing guide says most video production agencies charge $100 to $149 an hour, and projects on Clutch typically cost under $10,000. Ask for a written scope." },
        { question: "Can a local editor film too?", answer: `Yes. Esteban films on location through the Local Presence package, from ${local} per production day, and edits footage you shoot yourself from ${once} per video.` },
        { question: "Can I work with the editor in Spanish?", answer: "Yes. Esteban's main working language is Spanish, with intermediate English, so notes, voice messages and changes can be in Spanish." },
      ],
    },
    es: {
      slug: "editor-local-vs-fiverr-vs-agencia-miami",
      metadataTitle: "Editor Local vs Fiverr vs Agencia",
      title: "Editor local vs Fiverr vs agencia en Miami: ¿qué te conviene?",
      description: "En qué se diferencian un editor de video local, un freelancer de Fiverr y una agencia en Miami: precio, comisiones, trato y grabación, con cada dato de mercado citado.",
      eyebrow: "Elegir un editor",
      answer: `Fiverr cobra una comisión de servicio del 5.5% en cada pedido (Centro de ayuda de Fiverr), las agencias suelen cobrar entre $100 y $149 por hora (Clutch) y un editor local como Esteban Moreno Media edita un reel desde ${once} por video, en español, y puede grabar en persona.`,
      proof: {
        href: "/es/portafolio/ml-colombia",
        title: "Video social de ML Colombia",
        description: "Un video vertical publicado de 24 segundos de la marca propia de Esteban. Muestra el formato; nada publicado confirma un resultado para un cliente.",
      },
      sections: [
        {
          heading: "¿Qué diferencia hay entre un editor local, Fiverr y una agencia?",
          paragraphs: [
            "Con quién hablas, quién hace el trabajo y quién puede ir a donde estás. En Fiverr compras un paquete de la publicación de un freelancer, muchas veces en otro país, y la plataforma retiene el pago hasta que aceptas la entrega. Una agencia pone un equipo entre tú y la edición: un ejecutivo de cuenta lleva tus notas a productores, editores y diseñadores, y esa estructura se paga. Un editor local es una persona de tu zona que edita tu material, contesta tus mensajes directamente y puede reunirse contigo o grabar en el lugar cuando el proyecto lo pide.",
            "Ninguna de las tres opciones sirve para todos. Lo útil no es comparar el precio de entrada sino lo que incluye: cuántos cambios, qué tan rápido te responden, quién se hace cargo si algo sale mal y si alguien puede grabar por ti.",
          ],
        },
        {
          heading: "¿Cuánto cobra Fiverr además del precio del gig?",
          paragraphs: [
            `Una comisión de servicio. El artículo del Centro de ayuda de Fiverr sobre cómo pagar pedidos dice que la comisión estándar es del 5.5% del monto de la compra, más $3.50 en pedidos de menos de $200, y que cada pago adicional del mismo pedido, como una propina o un extra, lleva su propia comisión. Otro artículo de ayuda de Fiverr describe ese cargo de otra forma, así que revisa el total antes de pagar. ([Fiverr: pago de pedidos](${FIVERR_PAYING}))`,
            `El pago se libera al freelancer cuando aceptas la entrega y, si no haces nada, el pedido se completa solo 72 horas después de la entrega, según la página [Cómo funciona Fiverr](${FIVERR_HOW}). Por eso conviene revisar cada video apenas llega. Los cambios incluidos, la duración y los subtítulos dependen del paquete que escribe cada freelancer, no de una regla de Fiverr, así que léelo antes de pedir.`,
          ],
        },
        {
          heading: "¿Cuándo conviene una agencia en Miami?",
          paragraphs: [
            `Cuando el trabajo necesita un equipo a la vez: una campaña con equipo de grabación, color, sonido y gráficos animados, varios videos en paralelo o revisiones de marca y legales estrictas. Clutch, que publica tarifas a partir de reseñas verificadas de agencias en su plataforma, dice en su [guía de precios de producción de video](${CLUTCH}) que la mayoría de las agencias cobra entre $100 y $149 por hora y que los proyectos de producción de video en Clutch suelen costar menos de $10,000. Esas cifras son de producciones completas, no de editar un reel.`,
            "Esa estructura es lo que pagas. Las notas suelen pasar por un productor, el calendario lo pone el equipo y el contenido mensual para redes muchas veces se vende como paquete con estrategia y reportes. Si ya sabes qué grabar y sobre todo necesitas reels editados cada semana, esa capa puede costar más de lo que aporta. Pregúntale a cualquier agencia qué incluye cada video, cuántas rondas de cambios y quién edita.",
          ],
        },
        {
          heading: "¿Cuándo es mejor un editor local?",
          paragraphs: [
            `Cuando grabas tu propio contenido y quieres que una persona que conoce tu negocio lo edite cada semana. Esteban Moreno Media edita Reels, TikToks y Shorts desde ${once} por video, o ${usd(oneWeekly.pricePerWeek)} por semana por ${oneWeekly.videosPerWeek} video y ${usd(twoWeekly.pricePerWeek)} por semana por ${twoWeekly.videosPerWeek}, con un mínimo de ${T.minimumWeeks} semanas y el precio a la vista antes de pagar. Los videos semanales se entregan ${T.deliveryHoursMin}–${T.deliveryHoursMax} horas después de recibir el material.`,
            `Esteban trabaja desde el sur de Florida, así que si necesitas grabación puede ir a donde estás: el [paquete Presencia Local](/es/precios/presencia-local) cuesta desde ${local} por jornada de producción. Su idioma principal de trabajo es el español, con inglés intermedio. Mira la [edición de reels en Miami](/es/editor-de-reels-miami), calcula un total mensual con la [calculadora de costo de reels](/es/calculadora-de-costo-de-edicion-de-reels) o compara [editor freelance y agencia de posproducción](/es/guias/editor-de-video-freelance-vs-agencia-de-postproduccion).`,
          ],
        },
      ],
      faqs: [
        { question: "¿Fiverr es más barato que un editor local?", answer: `El precio del gig puede ser menor, pero Fiverr suma una comisión del 5.5%, más $3.50 en pedidos de menos de $200. Editar un reel con Esteban cuesta desde ${once}, sin comisión de plataforma.` },
        { question: "¿Cuánto cobran las agencias en Miami?", answer: "La guía de precios de Clutch dice que la mayoría de las agencias de video cobra entre $100 y $149 por hora y que los proyectos en Clutch suelen costar menos de $10,000. Pide un alcance por escrito." },
        { question: "¿Un editor local también puede grabar?", answer: `Sí. Esteban graba en el lugar con el paquete Presencia Local, desde ${local} por jornada de producción, y edita el material que grabas tú desde ${once} por video.` },
        { question: "¿Puedo trabajar con el editor en español?", answer: "Sí. El idioma principal de trabajo de Esteban es el español, así que puedes mandar notas, audios y cambios en español." },
      ],
    },
  },
  {
    id: "restaurant-reels-per-week-guide",
    en: {
      slug: "how-many-reels-should-a-restaurant-post-per-week",
      metadataTitle: "Reels per Week for a Restaurant",
      title: "How many Reels should a restaurant post per week?",
      description: "How often a restaurant should post Reels, what Buffer's study of 2.1 million Instagram posts found about frequency, and what weekly Reels editing costs in South Florida.",
      eyebrow: "Restaurant Reels",
      answer: `Buffer's analysis of 2.1 million Instagram posts found that 3–5 feed posts a week grew followers about twice as fast as 1–2. For a restaurant, start with the number you can film every week, then build toward 3–5; editing costs ${usd(oneWeekly.pricePerWeek)} a week for 1 Reel or ${usd(twoWeekly.pricePerWeek)} for 2 with Esteban Moreno Media.`,
      proof: {
        href: "/portfolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description: "Published hospitality work from Esteban's portfolio. It shows the format of a venue video; nothing published confirms a posting schedule or a result.",
      },
      sections: [
        {
          heading: "How many Reels should a restaurant post per week?",
          paragraphs: [
            "As many as you can keep up every week, with 3 to 5 feed posts a week as the target. That range comes from Buffer's study of Instagram posting frequency, described below: accounts that moved from 1–2 posts a week to 3–5 grew followers faster and reached more people per post. No public data set we found isolates restaurants, so treat the range as a general Instagram benchmark, not a rule for your kitchen.",
            "Consistency matters more than a single busy week. A restaurant that posts two Reels every week for three months gives regulars and new diners something to see each time they open the app; one that posts ten in the opening week and then stops does not. Pick a number your team can film during normal service, such as one dish and one moment in the room, and raise it once the routine holds.",
          ],
        },
        {
          heading: "What does the data say about posting frequency on Instagram?",
          paragraphs: [
            `Buffer, the social media scheduling company, analysed 2.1 million feed posts from 102,000 Instagram accounts and published the results in August 2025. Measured as monthly follower growth, accounts posting 1–2 times a week grew about 0.12%, 3–5 times about 0.26%, 6–9 times about 0.44%, and 10 or more about 0.66%. Moving from 1–2 to 3–5 posts a week also brought about 12% more reach per post. ([Buffer: how often to post on Instagram](${BUFFER}))`,
            "Two limits are worth knowing. The study counted feed posts, which means photos, Reels and carousels together, and left Stories out. And it shows that accounts posting more often tend to grow faster, not that posting more causes growth; Buffer itself describes the gains above 5 a week as diminishing. Good food on camera still does more than volume.",
          ],
        },
        {
          heading: "Does every post have to be a Reel?",
          paragraphs: [
            "No. Buffer's frequency figures count photos, Reels and carousels together, so a restaurant reaching 3 to 5 posts a week can mix formats. A practical week might be two Reels, built from short clips filmed during service, plus a photo of the dish of the week and a carousel with the menu or an event. The Reels carry the movement that photos cannot: steam, a pour, a flame, the room filling up.",
            `What to film for those Reels is covered in the guide to [video content ideas for restaurants](/guides/video-content-ideas-for-restaurants): the dish being plated, hands at work, the owner or chef saying one sentence to camera, and a slow wide shot of the room. Short clips of five to ten seconds each give an editor enough to build a finished Reel from a single afternoon. If you need a one-off promo instead of weekly content, a restaurant promo edit starts from ${promo}.`,
          ],
        },
        {
          heading: "What does it cost to post edited Reels every week?",
          paragraphs: [
            `With Esteban Moreno Media, editing one Reel, TikTok or Short starts from ${once} per video. If you post every week, the weekly plan is ${usd(oneWeekly.pricePerWeek)} a week for ${oneWeekly.videosPerWeek} video or ${usd(twoWeekly.pricePerWeek)} a week for ${twoWeekly.videosPerWeek}, paid weekly with a ${T.minimumWeeks}-week minimum; each video runs up to ${T.maxVideoSeconds} seconds and is delivered ${T.deliveryHoursMin}–${T.deliveryHoursMax} hours after the footage arrives. You film; Esteban edits.`,
            `Two edited Reels a week plus one or two photos you post yourself reaches the 3–5 range above. Work out your own number with the [Reels cost calculator](/reels-editing-cost-calculator), read how [restaurant promo video editing in Miami](/services/restaurant-promo-video-editing-miami) works, or send a sample of your footage through [contact](/contact) for a written quote before any work begins. Esteban's working language is Spanish, so notes can be sent in Spanish.`,
          ],
        },
      ],
      faqs: [
        { question: "How many Reels should a restaurant post a week?", answer: "Aim for 3 to 5 feed posts a week, mixing Reels, photos and carousels, and keep a number you can sustain. That range comes from Buffer's study of 2.1 million Instagram posts." },
        { question: "Is one Reel a week enough?", answer: "It is a fine start if you keep it up. In Buffer's data, accounts posting 1 to 2 times a week grew more slowly than those posting 3 to 5." },
        { question: "Do Stories count?", answer: "Not in Buffer's study, which measured feed posts only: photos, Reels and carousels." },
        { question: "What does weekly Reels editing cost?", answer: `${usd(oneWeekly.pricePerWeek)} a week for 1 video or ${usd(twoWeekly.pricePerWeek)} a week for 2, with a ${T.minimumWeeks}-week minimum, or from ${once} per single video.` },
      ],
    },
    es: {
      slug: "cuantos-reels-debe-publicar-un-restaurante-por-semana",
      metadataTitle: "Reels por Semana para Restaurantes",
      title: "¿Cuántos reels debe publicar un restaurante por semana?",
      description: "Con qué frecuencia debe publicar reels un restaurante, qué encontró el estudio de Buffer sobre 2.1 millones de publicaciones de Instagram y cuánto cuesta editar reels cada semana.",
      eyebrow: "Reels para restaurantes",
      answer: `El análisis de Buffer de 2.1 millones de publicaciones de Instagram encontró que publicar de 3 a 5 veces por semana hizo crecer los seguidores casi el doble que 1 o 2. Para un restaurante, empieza con lo que puedas grabar cada semana y sube hacia 3 a 5; editar cuesta ${usd(oneWeekly.pricePerWeek)} por semana por 1 reel o ${usd(twoWeekly.pricePerWeek)} por 2 con Esteban Moreno Media.`,
      proof: {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        description: "Trabajo publicado de hospitalidad del portafolio de Esteban. Muestra el formato de un video de un local; nada publicado confirma un calendario de publicación ni un resultado.",
      },
      sections: [
        {
          heading: "¿Cuántos reels debe publicar un restaurante por semana?",
          paragraphs: [
            "Los que puedas mantener cada semana, con la meta de 3 a 5 publicaciones en el feed por semana. Ese rango sale del estudio de Buffer sobre frecuencia de publicación en Instagram, que se explica abajo: las cuentas que pasaron de 1 o 2 publicaciones por semana a 3 a 5 ganaron seguidores más rápido y llegaron a más gente por publicación. No encontramos datos públicos solo de restaurantes, así que toma el rango como una referencia general de Instagram, no como una regla para tu cocina.",
            "La constancia pesa más que una semana intensa. Un restaurante que publica dos reels cada semana durante tres meses le da a sus clientes algo nuevo cada vez que abren la aplicación; uno que publica diez en la semana de apertura y luego para, no. Elige un número que tu equipo pueda grabar durante el servicio normal, como un plato y un momento del salón, y súbelo cuando la rutina funcione.",
          ],
        },
        {
          heading: "¿Qué dicen los datos sobre la frecuencia de publicación en Instagram?",
          paragraphs: [
            `Buffer, la empresa de programación de redes sociales, analizó 2.1 millones de publicaciones del feed de 102,000 cuentas de Instagram y publicó los resultados en agosto de 2025. Medido como crecimiento mensual de seguidores, las cuentas que publicaban 1 o 2 veces por semana crecieron cerca de 0.12%, las de 3 a 5 cerca de 0.26%, las de 6 a 9 cerca de 0.44% y las de 10 o más cerca de 0.66%. Pasar de 1 o 2 a 3 a 5 publicaciones por semana también trajo cerca de 12% más alcance por publicación. ([Buffer: con qué frecuencia publicar en Instagram](${BUFFER}))`,
            "Hay dos límites que conviene conocer. El estudio contó publicaciones del feed, es decir fotos, reels y carruseles juntos, y dejó fuera las historias. Y muestra que las cuentas que publican más tienden a crecer más rápido, no que publicar más cause el crecimiento. Buena comida en cámara sigue valiendo más que el volumen.",
          ],
        },
        {
          heading: "¿Todas las publicaciones tienen que ser reels?",
          paragraphs: [
            "No. Las cifras de Buffer cuentan fotos, reels y carruseles juntos, así que un restaurante que llega a 3 a 5 publicaciones por semana puede mezclar formatos. Una semana práctica puede ser dos reels, hechos con clips cortos grabados durante el servicio, más una foto del plato de la semana y un carrusel con el menú o un evento. Los reels llevan el movimiento que una foto no tiene: el vapor, un líquido que se sirve, una llama, el salón que se llena.",
            `Qué grabar para esos reels está en la guía de [ideas de video para restaurantes](/es/guias/ideas-de-contenido-de-video-para-restaurantes): el plato mientras se sirve, manos trabajando, el dueño o el chef diciendo una frase a cámara y una toma amplia y lenta del salón. Clips cortos de cinco a diez segundos le dan al editor suficiente para armar un reel terminado con una sola tarde de grabación. Si necesitas una promoción puntual en vez de contenido semanal, editar un video promocional para restaurante cuesta desde ${promo}.`,
          ],
        },
        {
          heading: "¿Cuánto cuesta publicar reels editados cada semana?",
          paragraphs: [
            `Con Esteban Moreno Media, editar un Reel, TikTok o Short cuesta desde ${once} por video. Si publicas cada semana, el plan semanal es ${usd(oneWeekly.pricePerWeek)} por semana por ${oneWeekly.videosPerWeek} video o ${usd(twoWeekly.pricePerWeek)} por semana por ${twoWeekly.videosPerWeek}, con pago semanal y un mínimo de ${T.minimumWeeks} semanas; cada video dura hasta ${T.maxVideoSeconds} segundos y se entrega ${T.deliveryHoursMin}–${T.deliveryHoursMax} horas después de recibir el material. Tú grabas; Esteban edita.`,
            `Dos reels editados por semana más una o dos fotos que publicas tú llegan al rango de 3 a 5. Calcula tu propio número con la [calculadora de costo de reels](/es/calculadora-de-costo-de-edicion-de-reels), mira cómo funciona la [edición de video promocional para restaurantes en Miami](/es/edicion-de-video-promocional-para-restaurantes-miami) o manda una muestra de tu material por [contacto](/es/contacto) para recibir una cotización escrita antes de empezar. Puedes mandar las notas en español.`,
          ],
        },
      ],
      faqs: [
        { question: "¿Cuántos reels debe publicar un restaurante por semana?", answer: "Apunta a 3 a 5 publicaciones del feed por semana, mezclando reels, fotos y carruseles, con un número que puedas sostener. El rango sale del estudio de Buffer sobre 2.1 millones de publicaciones." },
        { question: "¿Un reel por semana es suficiente?", answer: "Es un buen comienzo si lo mantienes. En los datos de Buffer, las cuentas que publicaban 1 o 2 veces por semana crecieron más lento que las de 3 a 5." },
        { question: "¿Las historias cuentan?", answer: "No en el estudio de Buffer, que midió solo publicaciones del feed: fotos, reels y carruseles." },
        { question: "¿Cuánto cuesta editar reels cada semana?", answer: `${usd(oneWeekly.pricePerWeek)} por semana por 1 video o ${usd(twoWeekly.pricePerWeek)} por semana por 2, con un mínimo de ${T.minimumWeeks} semanas, o desde ${once} por video suelto.` },
      ],
    },
  },
];
