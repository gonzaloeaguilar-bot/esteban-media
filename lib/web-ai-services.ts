/**
 * Chatbot and landing-page service pages (EN + ES), 2026-10-14.
 *
 * Owner decision: web, landing pages and chatbots stay in the portfolio AND are
 * marketed as a service line (vault: esteban-owner-facts-2026-10-14). Demand
 * and gap evidence: esteban-web-chatbot-seo-geo-2026-10-14.
 *
 * FACT RULES for every string in this file:
 * - Project facts come only from what the portfolio and the FLAS case study
 *   already publish (messages/*.json Portfolio.items, lib/case-studies.ts).
 * - The bots that have shipped run on websites (FLAS, Front Line Auto) and on
 *   Instagram DMs (Gains From Geebs, TitanForge). WhatsApp has NOT shipped, so
 *   the page says so instead of claiming it.
 * - Landing pages have an owner price (LANDING_PAGE_PRICE in lib/pricing.ts,
 *   owner fact 2026-10-14), rendered through the {landingPrice} / {landingFrom}
*   placeholders. Chatbots have an owner price too (CHATBOT_PRICE: from $2,000
 *   setup plus a monthly fee whose amount was NOT given), via {chatbotPrice} /
 *   {chatbotFrom}. Full websites have NO published price: they say
 *   "custom quote". No timeline exists. Never type a number here.
 * - Outside facts carry their source in the sentence (Meta's 24-hour window,
 *   Google Ads Quality Score).
 *
 * The visible question sections ARE the FAQPage: the page renders
 * `sections`, and the schema is built from the same array, so the two cannot
 * drift.
 */

import type { DeepDiveSection, RelatedService, ServiceInquiry } from "@/components/service-depth";
import { priceSentence } from "@/lib/packages";
import { CHATBOT_PRICE, LANDING_PAGE_PRICE, chatbotPriceText, landingPagePriceText, usd } from "@/lib/pricing";

export type WebAiLocale = "en" | "es";
export type WebAiPageId = "chatbot" | "landing";

export type WebAiSection = {
  id: string;
  question: string;
  paragraphs: readonly string[];
  links?: readonly { href: string; label: string }[];
};

export type WebAiProject = { href: string; title: string; fact: string };

export type WebAiServicePage = {
  id: WebAiPageId;
  locale: WebAiLocale;
  path: string;
  alternatePath: string;
  servicesHref: string;
  servicesLabel: string;
  crumb: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  answer: string;
  heroNote: string;
  primaryCta: string;
  secondaryCta: string;
  sectionsEyebrow: string;
  sections: readonly WebAiSection[];
  projectsHeading: string;
  projectsLead: string;
  projects: readonly WebAiProject[];
  reviewLabel: string;
  deepDive: { id: string; title: string; destinations: string; sections: readonly DeepDiveSection[] };
  intakeHeading: string;
  intakeLead: string;
  inquiry: ServiceInquiry;
  relatedHeading: string;
  related: readonly RelatedService[];
  service: { name: string; description: string; serviceType: string };
};

const CHATBOT_EN = "/services/ai-chatbot-for-small-business";
const CHATBOT_ES = "/es/chatbot-con-ia-para-negocios";
const LANDING_EN = "/services/landing-page-design";
const LANDING_ES = "/es/landing-page-para-negocios";

export const WEB_AI_PATHS = { chatbot: { en: CHATBOT_EN, es: CHATBOT_ES }, landing: { en: LANDING_EN, es: LANDING_ES } } as const;

const chatbotEn: WebAiServicePage = {
  id: "chatbot",
  locale: "en",
  path: CHATBOT_EN,
  alternatePath: CHATBOT_ES,
  servicesHref: "/services",
  servicesLabel: "Services",
  crumb: "AI Chatbot for Small Business",
  metaTitle: "AI Chatbot for Fort Lauderdale Small Businesses",
  metaDescription:
    "AI chatbots for Fort Lauderdale small businesses on your website and Instagram DMs: answer questions, qualify leads, hand them to you. From {chatbotFrom} setup plus a monthly fee.",
  eyebrow: "Website chat / Instagram DM / English and Spanish",
  h1: "AI chatbot for Fort Lauderdale small businesses.",
  answer:
    "Esteban Moreno Media builds AI chatbots for Fort Lauderdale small businesses that answer the questions customers repeat every day, ask the few questions that tell you whether an inquiry is serious, and pass that inquiry to a person with the details already collected. The bots shipped so far run on websites and in Instagram DMs, in English and Spanish, for an auto dealership, an auto repair shop and two fitness coaching brands. {chatbotPrice}",
  heroNote:
    "Based in Fort Lauderdale and working remotely, including with businesses in Latin America; every project gets a written quote.",
  primaryCta: "Ask for a chatbot quote",
  secondaryCta: "See the chatbots already built",
  sectionsEyebrow: "What business owners ask first",
  sections: [
    {
      id: "what-it-does",
      question: "What does an AI chatbot for a small business actually do?",
      paragraphs: [
        "It does three jobs. First, it answers the questions your team answers all day: hours, location, prices you already publish, what to bring, how financing or booking works. Second, it asks a few qualifying questions, so a serious inquiry arrives with a name, a contact and what the person needs. Third, it hands that inquiry to a person instead of pretending to close it.",
        "On the Fort Lauderdale Auto Sale project, the website concierge answers questions about inventory, Buy-Here-Pay-Here eligibility, the documents a buyer needs and lot hours. It is written to never promise a vehicle hold or quote a financing rate the dealership has not approved, and when a buyer is ready it collects their contact details and sends the inquiry to the sales team.",
      ],
      links: [{ href: "/case-studies/flas-concierge", label: "Read the FLAS concierge case study" }],
    },
    {
      id: "who-it-is-for",
      question: "Who is a chatbot like this for?",
      paragraphs: [
        "It fits a business that gets the same messages again and again and loses some of them because nobody answered in time. A restaurant answering hours, menu and reservation questions. A real estate agent sorting which listing someone means, their budget and when they can see it, before the agent calls back. A coach or creator whose Instagram DMs fill with the same questions after every post. A Latino-owned business whose customers write in Spanish one day and English the next.",
        "To be clear about the record: the chatbots published in the portfolio were built for an auto dealership (FLAS), an auto repair shop (Front Line Auto) and two fitness coaching brands (Gains From Geebs and TitanForge). Restaurants and real estate are use cases the same build applies to, not past clients.",
      ],
    },
    {
      id: "cost",
      question: "How much does an AI chatbot for a small business cost?",
      paragraphs: [
        "{chatbotPrice} Where a project lands above that starting price depends on four things you can see in advance: how many channels it runs on (your website, Instagram DMs, or both), how many languages it answers in, how many different questions and paths it has to handle, and where the finished inquiry has to go (an email, a text message, a booking link or the tool your team already uses).",
        "Esteban reviews the channels and accounts you already use first, then agrees with you what to connect and who will answer each inquiry. The written quote after that review sets the build price and the monthly fee. If you also need a website, content and your Google Business Profile handled together, the All-In package covers the conversion website, the AI chatbot and lead capture, the local profile and the content in one quote.",
      ],
      links: [{ href: "/pricing/all-in", label: "See what the All-In package includes" }],
    },
    {
      id: "timeline",
      question: "How long does it take to set up a chatbot?",
      paragraphs: [
        "There is no fixed timeline published, because the launch date depends on the confirmed scope, the material you provide, account access and how fast each review round comes back. A website chat that answers ten questions is a smaller job than an Instagram DM flow that qualifies leads, books calls and alerts your team by text.",
        "What speeds it up is the same in every project. Write down the questions customers actually send you, in their words, and the answer you give each one. Decide who on your side receives a qualified inquiry and how they want to be told. Have admin access ready for the website and for the Instagram professional account. Text messages need the customer's consent and the right platform account before they can be switched on, so that is checked at the start, not at the end.",
      ],
    },
    {
      id: "spanish",
      question: "Can the chatbot answer in Spanish?",
      paragraphs: [
        "Yes. Bilingual intake is already in the published work: the Fort Lauderdale Auto Sale concierge handles English and Spanish shoppers, and the Front Line Auto concierge was built for bilingual service intake. The bot answers in the language the customer writes in, and the inquiry your team receives is organized the same way either way.",
        "Esteban works Spanish-first, so a Spanish-speaking business can run the whole project, from the first call to the review of every answer the bot gives, in Spanish. He also works remotely with businesses in Latin America. If your customers write in both languages, the review covers both versions of every answer, so the Spanish one is written for your customers and not translated word for word.",
      ],
      links: [{ href: CHATBOT_ES, label: "Leer esta página en español" }],
    },
    {
      id: "built-before",
      question: "What chatbots has Esteban Moreno Media built before?",
      paragraphs: [
        "Four published projects, each with its own portfolio page. Fort Lauderdale Auto Sale: a dealership website with an AI concierge for Buy-Here-Pay-Here pre-qualification, inventory questions and lead capture. Front Line Auto: an auto repair website with an AI service concierge for repair scheduling, service quotes and bilingual intake. Gains From Geebs: an interactive fitness site with an Instagram DM AI bot that answers coaching inquiries, helps people choose a workout plan and qualifies leads around the clock. TitanForge: a web platform with an AI DM bot for lead qualification, instant booking and client intake.",
        "Fort Lauderdale Auto Sales also left a public review on Esteban's Google Business Profile, quoted below exactly as it was written.",
      ],
      links: [{ href: "/portfolio/ai-lead-automation", label: "See the conversational AI chatbot work" }],
    },
  ],
  projectsHeading: "Chatbots already built",
  projectsLead: "Each card opens the portfolio page with what that project included.",
  projects: [
    { href: "/portfolio/flas-concierge", title: "Fort Lauderdale Auto Sale (FLAS AI Concierge)", fact: "Website concierge for Buy-Here-Pay-Here pre-qualification, inventory questions and lead capture." },
    { href: "/portfolio/front-line-auto", title: "Frontline Auto Repair & AI Service Concierge", fact: "Repair scheduling, service quotes, maintenance questions and bilingual intake on the website." },
    { href: "/portfolio/gains-from-geebs", title: "Gains From Geebs Instagram DM AI Bot", fact: "Instagram DM bot for coaching inquiries, workout plan selection and lead qualification." },
    { href: "/portfolio/titanforge", title: "TitanForge Platform & AI Bot", fact: "AI DM bot for lead qualification, instant booking and client intake." },
    { href: "/portfolio/ai-lead-automation", title: "Conversational AI Lead Chatbots", fact: "The Geebs Instagram DM bot and the FLAS concierge, side by side." },
  ],
  reviewLabel: "Public Google review from Fort Lauderdale Auto Sales",
  deepDive: {
    id: "chatbot-keep-reading",
    title: "Before you ask for a quote",
    destinations: "Instagram DM bots, WhatsApp, what the bot will not do, what to prepare",
    sections: [
      {
        heading: "Why put a bot in Instagram DMs and not only on the website?",
        paragraphs: [
          "Because that is where a lot of small-business customers write first, often right after seeing a post or a Reel. Meta's messaging policy for Instagram gives a business 24 hours after a customer's last message to reply with standard messages, so a question that waits until the next morning can fall outside that window. A DM bot answers inside it.",
          "The Gains From Geebs and TitanForge bots are DM bots of this kind. The setup can use ManyChat and social DM funnels, and follow-up by email or text message where the customer has agreed to receive it.",
        ],
      },
      {
        heading: "Can I get an AI chatbot for WhatsApp?",
        paragraphs: [
          "The chatbots published so far run on websites and in Instagram DMs; none of them is a WhatsApp bot yet. If WhatsApp is where your customers write, say so in your first message and it is checked during the review of your accounts, before anything is quoted, instead of being promised up front.",
        ],
      },
      {
        heading: "What will the chatbot not do?",
        paragraphs: [
          "It does not make decisions your team should make. Every bot is scoped with a hand-off to a person, it only answers from the information you approve, and it is written not to promise prices, availability or terms you have not published. That rule is visible on the FLAS concierge, which never promises a vehicle hold or quotes an unapproved financing rate.",
          "Results are measured, not guaranteed: what the bot changes is tracked after launch, and the answers are adjusted from what customers actually ask.",
        ],
      },
    ],
  },
  intakeHeading: "Tell Esteban what your customers ask",
  intakeLead: "One email and one line about the questions you answer every day is enough to start.",
  inquiry: {
    serviceId: "ai_chatbot",
    serviceName: "an AI chatbot",
    goalPrompt: "answer our common customer questions and pass serious inquiries to us",
    assetPrompt: "a list of the questions customers ask and access to our website or Instagram",
    proofHref: "/portfolio/ai-lead-automation",
    proofLabel: "See the chatbots already built",
  },
  relatedHeading: "Related services",
  related: [
    { title: "Landing page design", detail: "One page built for one offer and one action, for ads, QR codes and your Instagram bio.", href: LANDING_EN },
    { title: "Website design in Fort Lauderdale", detail: "Full websites with the chatbot built in, mobile-first and bilingual when you need it.", href: "/services/website-design-fort-lauderdale" },
    { title: "AI lead capture and automation", detail: "Email and text follow-up, routing and the hand-off rules around the bot.", href: "/services/ai-lead-capture-automation" },
  ],
  service: {
    name: "AI Chatbot for Small Business",
    description:
      "Custom AI chatbots for Fort Lauderdale small businesses on websites and Instagram DMs that answer common questions, qualify inquiries and hand them to a person, in English and Spanish. From {chatbotFrom} to set up, plus a monthly fee.",
    serviceType: "AI chatbot development",
  },
};

const chatbotEs: WebAiServicePage = {
  id: "chatbot",
  locale: "es",
  path: CHATBOT_ES,
  alternatePath: CHATBOT_EN,
  servicesHref: "/es/servicios",
  servicesLabel: "Servicios",
  crumb: "Chatbot con IA para negocios",
  metaTitle: "Chatbot con IA para negocios en Miami",
  metaDescription:
    "Chatbots con IA para negocios en Miami en tu web y en los DM de Instagram: responden, califican la consulta y la pasan a una persona. Desde {chatbotFrom} más una cuota mensual.",
  eyebrow: "Chat en tu web / DM de Instagram / Español e inglés",
  h1: "Chatbot con IA para negocios en Miami.",
  answer:
    "Esteban Moreno Media construye chatbots con IA para negocios en Miami que responden las preguntas que los clientes repiten todos los días, hacen las pocas preguntas que te dicen si una consulta va en serio y pasan esa consulta a una persona con los datos ya reunidos. Los bots publicados funcionan en sitios web y en los DM de Instagram, en español e inglés, para un concesionario, un taller mecánico y dos marcas de entrenamiento físico. {chatbotPrice}",
  heroNote:
    "Con base en Fort Lauderdale y trabajo remoto, también con negocios en Latinoamérica; cada proyecto recibe una cotización por escrito.",
  primaryCta: "Pedir cotización de un chatbot",
  secondaryCta: "Ver los chatbots ya construidos",
  sectionsEyebrow: "Lo primero que preguntan los dueños de negocio",
  sections: [
    {
      id: "que-hace",
      question: "¿Qué hace un chatbot con IA para un negocio pequeño?",
      paragraphs: [
        "Hace tres trabajos. Primero, responde lo que tu equipo responde todo el día: horario, ubicación, los precios que ya publicas, qué traer, cómo funciona el financiamiento o la reserva. Segundo, hace unas pocas preguntas para calificar, así una consulta seria llega con nombre, contacto y lo que la persona necesita. Tercero, pasa esa consulta a una persona en vez de fingir que la cierra.",
        "En el proyecto de Fort Lauderdale Auto Sale, el concierge del sitio web responde preguntas sobre inventario, requisitos de Buy-Here-Pay-Here, los documentos que necesita el comprador y el horario del lote. Está escrito para nunca prometer que aparta un carro ni dar una tasa de financiamiento que el concesionario no haya aprobado, y cuando el comprador está listo toma sus datos y envía la consulta al equipo de ventas.",
      ],
      links: [{ href: "/es/casos-de-estudio/flas-concierge", label: "Leer el caso de estudio del concierge de FLAS" }],
    },
    {
      id: "para-quien",
      question: "¿Para quién es un chatbot así?",
      paragraphs: [
        "Sirve a un negocio que recibe los mismos mensajes una y otra vez y pierde algunos porque nadie contestó a tiempo. Un restaurante que responde horario, menú y reservas. Un agente inmobiliario que necesita saber de qué propiedad le hablan, el presupuesto y cuándo pueden verla, antes de devolver la llamada. Un coach o creador de contenido cuyos DM de Instagram se llenan de las mismas preguntas después de cada publicación. Un negocio latino cuyos clientes escriben en español un día y en inglés al siguiente.",
        "Para ser claros con el historial: los chatbots publicados en el portafolio se hicieron para un concesionario (FLAS), un taller mecánico (Front Line Auto) y dos marcas de entrenamiento (Gains From Geebs y TitanForge). Restaurantes e inmobiliarias son casos donde aplica la misma construcción, no clientes anteriores.",
      ],
    },
    {
      id: "costo",
      question: "¿Cuánto cuesta un chatbot con IA para un negocio?",
      paragraphs: [
        "{chatbotPrice} Cuánto más arriba de ese precio inicial queda un proyecto depende de cuatro cosas que puedes ver desde antes: en cuántos canales funciona (tu sitio web, los DM de Instagram o ambos), en cuántos idiomas responde, cuántas preguntas y caminos distintos tiene que manejar, y a dónde tiene que llegar la consulta terminada (un correo, un mensaje de texto, un enlace para agendar o la herramienta que tu equipo ya usa).",
        "Primero Esteban revisa los canales y cuentas que ya usas, y luego acuerdan qué se conecta y quién responde cada consulta. La cotización por escrito después de esa revisión fija el precio de la construcción y la cuota mensual. Si además necesitas el sitio web, el contenido y tu perfil de Google Business en un solo proveedor, el paquete Todo Incluido reúne el sitio web de conversión, el chatbot y captura de clientes con IA, el perfil local y el contenido en una sola cotización.",
      ],
      links: [{ href: "/es/precios/todo-incluido", label: "Ver qué incluye el paquete Todo Incluido" }],
    },
    {
      id: "tiempo",
      question: "¿Cuánto tiempo toma tener un chatbot funcionando?",
      paragraphs: [
        "No hay un plazo fijo publicado, porque la fecha de lanzamiento depende del alcance confirmado, del material que entregues, de los accesos y de qué tan rápido vuelve cada ronda de revisión. Un chat en el sitio web que responde diez preguntas es un trabajo más pequeño que un flujo de DM en Instagram que califica clientes, agenda llamadas y avisa a tu equipo por mensaje de texto.",
        "Lo que acelera el proyecto es igual en todos los casos. Escribe las preguntas que tus clientes te mandan de verdad, con sus palabras, y la respuesta que das a cada una. Decide quién de tu lado recibe una consulta calificada y cómo quiere enterarse. Ten listo el acceso de administrador del sitio web y de la cuenta profesional de Instagram. Los mensajes de texto necesitan el consentimiento del cliente y la cuenta de plataforma correcta antes de activarse, así que eso se revisa al principio y no al final.",
      ],
    },
    {
      id: "espanol",
      question: "¿El chatbot puede responder en español?",
      paragraphs: [
        "Sí. La atención bilingüe ya está en el trabajo publicado: el concierge de Fort Lauderdale Auto Sale atiende a compradores en inglés y en español, y el de Front Line Auto se construyó para recibir clientes de servicio en los dos idiomas. El bot responde en el idioma en que escribe el cliente, y la consulta que recibe tu equipo llega organizada igual en ambos casos.",
        "Esteban trabaja primero en español, así que un negocio que trabaja en español puede llevar todo el proyecto en español, desde la primera llamada hasta la revisión de cada respuesta del bot. También trabaja de forma remota con negocios en Latinoamérica. Si tus clientes escriben en los dos idiomas, la revisión cubre las dos versiones de cada respuesta, para que la de español esté escrita para tus clientes y no traducida palabra por palabra.",
      ],
      links: [{ href: CHATBOT_EN, label: "Read this page in English" }],
    },
    {
      id: "trabajos-anteriores",
      question: "¿Qué chatbots ha desarrollado Esteban Moreno Media?",
      paragraphs: [
        "Como desarrollador de chatbots, Esteban Moreno Media tiene cuatro proyectos publicados, cada uno con su página en el portafolio. Fort Lauderdale Auto Sale: el sitio web de un concesionario con un concierge de IA para precalificar Buy-Here-Pay-Here, responder sobre inventario y captar clientes. Front Line Auto: el sitio web de un taller mecánico con un concierge de IA para agendar reparaciones, cotizar servicios y atender en dos idiomas. Gains From Geebs: un sitio interactivo de fitness con un bot de IA en los DM de Instagram que responde consultas de entrenamiento, ayuda a elegir un plan y califica clientes a toda hora. TitanForge: una plataforma web con un bot de IA en DM para calificar clientes, agendar al instante y registrar a cada cliente nuevo.",
        "Fort Lauderdale Auto Sales también dejó una reseña pública en el perfil de Google Business de Esteban, citada abajo tal como fue escrita, en inglés.",
      ],
      links: [{ href: "/es/portafolio/ai-lead-automation", label: "Ver el trabajo de chatbots con IA" }],
    },
  ],
  projectsHeading: "Chatbots ya construidos",
  projectsLead: "Cada tarjeta abre la página del portafolio con lo que incluyó ese proyecto.",
  projects: [
    { href: "/es/portafolio/flas-concierge", title: "Fort Lauderdale Auto Sale (Concierge IA FLAS)", fact: "Concierge en el sitio web para precalificar Buy-Here-Pay-Here, responder sobre inventario y captar clientes." },
    { href: "/es/portafolio/front-line-auto", title: "Frontline Auto Repair y Concierge IA de Servicio", fact: "Agenda de reparaciones, cotizaciones de servicio y atención bilingüe en el sitio web." },
    { href: "/es/portafolio/gains-from-geebs", title: "Bot de IA de Gains From Geebs para Instagram DM", fact: "Bot en los DM de Instagram para consultas de entrenamiento, elección de plan y calificación de clientes." },
    { href: "/es/portafolio/titanforge", title: "Plataforma TitanForge y bot de IA", fact: "Bot de IA en DM para calificar clientes, agendar al instante y registrar clientes." },
    { href: "/es/portafolio/ai-lead-automation", title: "Chatbots de IA conversacionales", fact: "El bot de Instagram de Geebs y el concierge de FLAS, lado a lado." },
  ],
  reviewLabel: "Reseña pública de Google de Fort Lauderdale Auto Sales",
  deepDive: {
    id: "chatbot-sigue-leyendo",
    title: "Antes de pedir la cotización",
    destinations: "Bots para DM de Instagram, WhatsApp, lo que el bot no hace, qué preparar",
    sections: [
      {
        heading: "¿Por qué poner un bot en los DM de Instagram y no solo en la web?",
        paragraphs: [
          "Porque ahí escriben primero muchos clientes de negocios pequeños, muchas veces justo después de ver una publicación o un Reel. La política de mensajes de Meta para Instagram le da a un negocio 24 horas desde el último mensaje del cliente para responder con mensajes estándar, así que una pregunta que espera hasta la mañana siguiente puede quedar fuera de esa ventana. Un bot en DM responde dentro de ella.",
          "Los bots de Gains From Geebs y TitanForge son de este tipo. La configuración puede usar ManyChat y flujos de DM, y seguimiento por correo o mensaje de texto cuando el cliente aceptó recibirlo.",
        ],
      },
      {
        heading: "¿Puedo tener un chatbot con IA para WhatsApp?",
        paragraphs: [
          "Los chatbots publicados hasta ahora funcionan en sitios web y en los DM de Instagram; ninguno es todavía un bot de WhatsApp. Si tus clientes te escriben por WhatsApp, dilo en tu primer mensaje y se revisa junto con tus cuentas, antes de cotizar, en vez de prometerlo de entrada.",
        ],
      },
      {
        heading: "¿Qué no hace el chatbot?",
        paragraphs: [
          "No toma decisiones que le tocan a tu equipo. Cada bot se define con un paso a una persona, solo responde con la información que tú apruebas y está escrito para no prometer precios, disponibilidad ni condiciones que no hayas publicado. Esa regla se ve en el concierge de FLAS, que nunca promete apartar un carro ni da una tasa de financiamiento no aprobada.",
          "Los resultados se miden, no se garantizan: lo que cambia el bot se sigue después del lanzamiento y las respuestas se ajustan según lo que los clientes preguntan de verdad.",
        ],
      },
    ],
  },
  intakeHeading: "Cuéntale a Esteban qué te preguntan tus clientes",
  intakeLead: "Con un correo y una línea sobre las preguntas que respondes todos los días es suficiente para empezar.",
  inquiry: {
    serviceId: "ai_chatbot",
    serviceName: "un chatbot con IA",
    goalPrompt: "responder las preguntas frecuentes de mis clientes y pasarme las consultas serias",
    assetPrompt: "la lista de preguntas que hacen mis clientes y acceso a mi sitio web o Instagram",
    proofHref: "/es/portafolio/ai-lead-automation",
    proofLabel: "Ver los chatbots ya construidos",
  },
  relatedHeading: "Servicios relacionados",
  related: [
    { title: "Landing page para negocios", detail: "Una página hecha para una oferta y una acción, para anuncios, códigos QR y la bio de Instagram.", href: LANDING_ES },
    { title: "Diseño web en Fort Lauderdale", detail: "Sitios web completos con el chatbot integrado, pensados primero para el celular y bilingües si los necesitas.", href: "/es/diseno-web-fort-lauderdale" },
    { title: "Captura y automatización de clientes con IA", detail: "Seguimiento por correo y mensaje de texto, rutas y las reglas para pasar la consulta a una persona.", href: "/es/captura-y-automatizacion-de-clientes-con-ia" },
  ],
  service: {
    name: "Chatbot con IA para negocios",
    description:
      "Chatbots con IA a medida para negocios en Miami en sitios web y DM de Instagram que responden preguntas frecuentes, califican consultas y las pasan a una persona, en español e inglés. Desde {chatbotFrom} de configuración, más una cuota mensual.",
    serviceType: "Desarrollo de chatbots con IA",
  },
};

const landingEn: WebAiServicePage = {
  id: "landing",
  locale: "en",
  path: LANDING_EN,
  alternatePath: LANDING_ES,
  servicesHref: "/services",
  servicesLabel: "Services",
  crumb: "Landing Page Design",
  metaTitle: "Landing Page Design for Small Businesses and Ads",
  metaDescription:
    "Landing pages for small businesses: one offer, one action, for Google and Meta ads, QR codes and your Instagram bio, with conversion tracking. From {landingFrom}.",
  eyebrow: "Ads / QR codes / Instagram bio / English and Spanish",
  h1: "One page, one offer, one thing for the visitor to do.",
  answer:
    "Esteban Moreno Media designs landing pages for small businesses: a single page built around one offer and one action (a form, a call or a message), mobile-first, in English, Spanish or both, with the conversion events set up so you can see what each visit led to. It is the page you send ad clicks, a QR code or your Instagram bio link to, instead of your home page. {landingPrice}",
  heroNote:
    "Based in Fort Lauderdale and working remotely, including with businesses in Latin America; every project gets a written quote.",
  primaryCta: "Ask for a landing page quote",
  secondaryCta: "See the websites already built",
  sectionsEyebrow: "What business owners ask first",
  sections: [
    {
      id: "what-it-is",
      question: "What is a landing page, and how is it different from a website?",
      paragraphs: [
        "A website explains the whole business and lets people wander: services, about, contact, blog. A landing page is built for one visitor who arrived for one reason, usually from an ad, a QR code, an email or a link in your bio. It says one offer, shows the proof for it, and asks for one action. There is no menu to get lost in.",
        "That is why the work is mostly decisions, not decoration: which offer, which proof, which single action, and what happens after someone takes it. The published scope for Esteban's conversion websites covers exactly those parts: the offer, the call to action and the form, the analytics and conversion events, and photo or video direction when it helps the page make its case.",
      ],
      links: [{ href: "/services/conversion-websites", label: "See the conversion website scope" }],
    },
    {
      id: "ads",
      question: "Do I need a landing page for Google Ads or Meta ads?",
      paragraphs: [
        "If you pay for clicks, it usually pays to send them somewhere built for the ad. Google Ads scores every keyword with a Quality Score from 1 to 10 that combines expected click-through rate, ad relevance and landing page experience, so the page you send people to is part of how Google rates the ad itself. A page that repeats the ad's promise, loads fast on a phone and makes the next step obvious is what that score rewards.",
        "For Meta ads (Instagram and Facebook) the reasoning is the same from the visitor's side: someone who tapped an ad about one offer should land on that offer, not on a home page that makes them look for it. Each ad campaign can have its own landing page, or one page can serve several ads that make the same promise.",
      ],
    },
    {
      id: "who-for",
      question: "Who is a landing page for?",
      paragraphs: [
        "It fits any business that is about to spend money or attention sending people to one place. A restaurant launching a holiday menu or a catering offer. A real estate agent with one new listing, an open house or a home-valuation offer. A creator or coach selling one program. A Latino-owned business running ads in Spanish that need a page in Spanish to land on.",
        "The published projects behind this service are full web systems that contain the same building blocks: Fort Lauderdale Auto Sale (inventory, financing calculators and lead capture), Gains From Geebs (interactive fitness calculators and coaching inquiries), TitanForge (client intake and booking) and Front Line Auto (repair booking). A landing page uses one of those blocks on its own.",
      ],
    },
    {
      id: "cost",
      question: "How much does a landing page cost?",
      paragraphs: [
        "{landingPrice} Where a page lands in that range is visible before you ask: whether the copy and photos exist or have to be written and produced, whether you need one language or two, what the form has to do (just send an email, or also reach a booking link, a text message or a chatbot), and how many versions you want for different ads.",
        "If the page needs video, editing is published separately: remote editing of your footage is {editPrice}, and on-location filming is quoted on top. If you want the page as part of a whole system, the All-In package covers the conversion website, the AI chatbot and lead capture, the local profile and the content in one quote.",
      ],
      links: [{ href: "/pricing/all-in", label: "See what the All-In package includes" }],
    },
    {
      id: "timeline",
      question: "How long does it take to build a landing page?",
      paragraphs: [
        "A basic landing page is built in 3–5 business days. A bilingual page with new video or a booking flow can take longer, because the scope, material you provide, account access and each review affect the build.",
        "You can shorten it before the first call. Write the offer in one sentence, as you would say it to a customer. Collect the proof you already have: reviews, photos of real work, numbers you are allowed to publish. Decide what the visitor should do and who receives the inquiry. Have access ready to your domain, your analytics and the ad account the page is for. If you do not have analytics yet, setting up the conversion events is part of the build.",
      ],
    },
    {
      id: "spanish",
      question: "Can the landing page be in Spanish?",
      paragraphs: [
        "Yes: in Spanish, in English, or both with each version written for its own reader. Bilingual pages are part of the published work: the Fort Lauderdale Auto Sale site has bilingual interface elements for English and Spanish buyers in Broward, and this website publishes its service pages in English and Spanish, each linked to its pair.",
        "Esteban works Spanish-first, so a Spanish-speaking owner can run the whole project in Spanish. He also works remotely with businesses in Latin America. For ads in Spanish, the landing page has to be in Spanish too: a Spanish ad that lands on an English page breaks the promise the ad just made.",
      ],
      links: [{ href: LANDING_ES, label: "Leer esta página en español" }],
    },
  ],
  projectsHeading: "Web work already built",
  projectsLead: "Each card opens the portfolio page with what that project included.",
  projects: [
    { href: "/portfolio/flas-concierge", title: "Fort Lauderdale Auto Sale (FLAS AI Concierge)", fact: "Dealership website with a financing calculator suite, inventory filtering and lead capture." },
    { href: "/portfolio/gains-from-geebs", title: "Gains From Geebs Web App & Instagram DM AI Bot", fact: "Interactive fitness platform with calculators and coaching inquiries." },
    { href: "/portfolio/titanforge", title: "TitanForge Platform & AI Bot", fact: "Custom web platform with client intake and instant booking." },
    { href: "/portfolio/front-line-auto", title: "Frontline Auto Repair & AI Service Concierge", fact: "Auto repair website with service booking and bilingual intake." },
  ],
  reviewLabel: "Public Google review from Fort Lauderdale Auto Sales",
  deepDive: {
    id: "landing-keep-reading",
    title: "Before you ask for a quote",
    destinations: "What goes on the page, tracking, a chatbot on the page, one page or several",
    sections: [
      {
        heading: "What goes on a landing page that works?",
        paragraphs: [
          "The offer in the first screen, in the words the ad or the post used. The proof right under it: a real review, a photo of the real work, a number you are allowed to publish. One action, repeated where it makes sense, and nothing that competes with it. On a phone, the action has to be reachable with a thumb without scrolling back up.",
          "Video earns its place when it shows something words cannot: the dish, the property, the service being done. That is where Esteban's main work, filming and editing, plugs straight into the page.",
        ],
      },
      {
        heading: "How do I know if the landing page is working?",
        paragraphs: [
          "By measuring it from the first day. The build sets up conversion events for the actions that matter (a form sent, a call tapped, a message started), so each visit can be traced to what it led to and each ad can be compared on what it produced, not only on clicks. Conversion is measured and improved; it is not guaranteed.",
        ],
      },
      {
        heading: "Can the landing page have a chatbot?",
        paragraphs: [
          "Yes. The same chatbot work that runs on the FLAS and Front Line Auto websites can sit on a landing page, answering the questions that would otherwise stop someone from sending the form, and passing the serious ones to a person.",
        ],
      },
    ],
  },
  intakeHeading: "Tell Esteban what the page has to sell",
  intakeLead: "One email and one line about the offer and where the traffic comes from is enough to start.",
  inquiry: {
    serviceId: "landing_page",
    serviceName: "a landing page",
    goalPrompt: "a page for one offer that turns ad clicks or bio visits into inquiries",
    assetPrompt: "the offer, the photos or reviews I already have, and where the traffic will come from",
    proofHref: "/portfolio/flas-concierge",
    proofLabel: "See a website already built",
  },
  relatedHeading: "Related services",
  related: [
    { title: "AI chatbot for small business", detail: "A bot on the page or in Instagram DMs that answers common questions and passes serious inquiries to you.", href: CHATBOT_EN },
    { title: "Website design in Fort Lauderdale", detail: "When you need the whole site, not one page: mobile-first and bilingual when you need it.", href: "/services/website-design-fort-lauderdale" },
    { title: "Reels editor in Fort Lauderdale", detail: "The short videos that send people to the page in the first place.", href: "/services/reels-editor-fort-lauderdale" },
  ],
  service: {
    name: "Landing Page Design",
    description:
      "Single-offer landing pages for small businesses, built for ads, QR codes and Instagram bio links, mobile-first, in English and Spanish, with conversion tracking. From {landingFrom} for a basic page.",
    serviceType: "Landing page design",
  },
};

const landingEs: WebAiServicePage = {
  id: "landing",
  locale: "es",
  path: LANDING_ES,
  alternatePath: LANDING_EN,
  servicesHref: "/es/servicios",
  servicesLabel: "Servicios",
  crumb: "Landing page para negocios",
  metaTitle: "Landing page para negocios y anuncios",
  metaDescription:
    "Landing pages para negocios: una oferta y una acción, para anuncios de Google y Meta, códigos QR y tu bio de Instagram, con medición. Desde {landingFrom}.",
  eyebrow: "Anuncios / Códigos QR / Bio de Instagram / Español e inglés",
  h1: "Una página, una oferta, una sola cosa que hacer.",
  answer:
    "Esteban Moreno Media diseña landing pages (páginas de aterrizaje) para negocios: una sola página construida alrededor de una oferta y una acción (un formulario, una llamada o un mensaje), pensada primero para el celular, en español, inglés o ambos, con los eventos de conversión configurados para que veas a qué llevó cada visita. Es la página a la que mandas los clics de un anuncio, un código QR o el enlace de tu bio de Instagram, en vez de tu página de inicio. {landingPrice}",
  heroNote:
    "Con base en Fort Lauderdale y trabajo remoto, también con negocios en Latinoamérica; cada proyecto recibe una cotización por escrito.",
  primaryCta: "Pedir cotización de una landing page",
  secondaryCta: "Ver los sitios web ya construidos",
  sectionsEyebrow: "Lo primero que preguntan los dueños de negocio",
  sections: [
    {
      id: "que-es",
      question: "¿Qué es una landing page y en qué se diferencia de un sitio web?",
      paragraphs: [
        "Un sitio web explica todo el negocio y deja que la gente recorra: servicios, quiénes somos, contacto, blog. Una landing page se hace para un visitante que llegó por una sola razón, casi siempre desde un anuncio, un código QR, un correo o el enlace de tu bio. Presenta una oferta, muestra la prueba y pide una acción. No hay menú donde perderse.",
        "Por eso el trabajo es sobre todo de decisiones, no de decoración: qué oferta, qué prueba, qué acción única y qué pasa después de que alguien la toma. El alcance publicado de los sitios web de conversión de Esteban cubre justo esas partes: la oferta, el llamado a la acción y el formulario, la analítica y los eventos de conversión, y la dirección de foto o video cuando ayuda a que la página convenza.",
      ],
      links: [{ href: "/es/sitios-web-de-conversion", label: "Ver el alcance de los sitios web de conversión" }],
    },
    {
      id: "anuncios",
      question: "¿Necesito una landing page para mis anuncios de Google o Meta?",
      paragraphs: [
        "Si pagas por clic, normalmente conviene mandarlos a una página hecha para ese anuncio. Google Ads califica cada palabra clave con un Nivel de calidad del 1 al 10 que combina la tasa de clics esperada, la relevancia del anuncio y la experiencia en la página de destino, así que la página a la que mandas a la gente es parte de cómo Google evalúa el anuncio. Una página que repite la promesa del anuncio, carga rápido en el celular y deja claro el siguiente paso es lo que ese puntaje premia.",
        "Para los anuncios de Meta (Instagram y Facebook) la lógica es la misma desde el lado del visitante: quien tocó un anuncio sobre una oferta tiene que caer en esa oferta, no en una página de inicio donde tiene que buscarla. Cada campaña puede tener su propia landing page, o una página puede servir a varios anuncios que hacen la misma promesa.",
      ],
    },
    {
      id: "para-quien",
      question: "¿Para quién es una landing page?",
      paragraphs: [
        "Sirve a cualquier negocio que está por gastar dinero o atención en mandar gente a un solo lugar. Un restaurante que lanza un menú de temporada o un servicio de catering. Un agente inmobiliario con una propiedad nueva, una casa abierta o una oferta de valoración de vivienda. Un creador de contenido o coach que vende un solo programa. Un negocio latino que corre anuncios en español y necesita una página en español donde caigan.",
        "Los proyectos publicados detrás de este servicio son sistemas web completos que contienen las mismas piezas: Fort Lauderdale Auto Sale (inventario, calculadoras de financiamiento y captura de clientes), Gains From Geebs (calculadoras de fitness interactivas y consultas de entrenamiento), TitanForge (registro de clientes y reservas) y Front Line Auto (reservas de servicio). Una landing page usa una de esas piezas por sí sola.",
      ],
    },
    {
      id: "costo",
      question: "¿Cuánto cuesta una landing page?",
      paragraphs: [
        "{landingPrice} Dónde cae tu página en ese rango se ve antes de preguntar: si los textos y las fotos ya existen o hay que escribirlos y producirlos, si necesitas uno o dos idiomas, qué tiene que hacer el formulario (solo enviar un correo, o también llevar a un enlace para agendar, un mensaje de texto o un chatbot) y cuántas versiones quieres para distintos anuncios.",
        "Si la página necesita video, la edición está publicada aparte: la edición remota de tu material es {editPrice}, y la grabación en locación se cotiza adicional. Si quieres la página como parte de un sistema completo, el paquete Todo Incluido reúne el sitio web de conversión, el chatbot y captura de clientes con IA, el perfil local y el contenido en una sola cotización.",
      ],
      links: [{ href: "/es/precios/todo-incluido", label: "Ver qué incluye el paquete Todo Incluido" }],
    },
    {
      id: "tiempo",
      question: "¿Cuánto tiempo toma hacer una landing page?",
      paragraphs: [
        "No hay un plazo fijo publicado: la fecha de lanzamiento depende del alcance confirmado, del material que entregues, de los accesos y de qué tan rápido vuelve cada revisión. Una sola página con tus fotos y un formulario sencillo es un trabajo corto; una página bilingüe con video nuevo y una reserva detrás del formulario toma más.",
        "Puedes acortarlo antes de la primera llamada. Escribe la oferta en una frase, como se la dirías a un cliente. Reúne la prueba que ya tienes: reseñas, fotos de trabajo real, cifras que puedas publicar. Decide qué tiene que hacer el visitante y quién recibe la consulta. Ten listo el acceso a tu dominio, a tu analítica y a la cuenta de anuncios para la que es la página. Si todavía no tienes analítica, configurar los eventos de conversión es parte de la construcción.",
      ],
    },
    {
      id: "espanol",
      question: "¿La landing page puede estar en español?",
      paragraphs: [
        "Sí: en español, en inglés o en ambos, con cada versión escrita para su propio lector. Las páginas bilingües son parte del trabajo publicado: el sitio de Fort Lauderdale Auto Sale tiene elementos en inglés y español para los compradores de Broward, y este mismo sitio publica sus páginas de servicio en inglés y en español, cada una enlazada con su par.",
        "Esteban trabaja primero en español, así que un dueño de negocio que habla español puede llevar todo el proyecto en español. También trabaja de forma remota con negocios en Latinoamérica. Para anuncios en español, la landing page también tiene que estar en español: un anuncio en español que cae en una página en inglés rompe la promesa que el anuncio acaba de hacer.",
      ],
      links: [{ href: LANDING_EN, label: "Read this page in English" }],
    },
  ],
  projectsHeading: "Trabajo web ya construido",
  projectsLead: "Cada tarjeta abre la página del portafolio con lo que incluyó ese proyecto.",
  projects: [
    { href: "/es/portafolio/flas-concierge", title: "Fort Lauderdale Auto Sale (Concierge IA FLAS)", fact: "Sitio web de concesionario con calculadoras de financiamiento, filtro de inventario y captura de clientes." },
    { href: "/es/portafolio/gains-from-geebs", title: "Gains From Geebs Web App y bot de IA para Instagram DM", fact: "Plataforma de fitness interactiva con calculadoras y consultas de entrenamiento." },
    { href: "/es/portafolio/titanforge", title: "Plataforma TitanForge y bot de IA", fact: "Plataforma web a medida con registro de clientes y reservas al instante." },
    { href: "/es/portafolio/front-line-auto", title: "Frontline Auto Repair y Concierge IA de Servicio", fact: "Sitio web de taller mecánico con reservas de servicio y atención bilingüe." },
  ],
  reviewLabel: "Reseña pública de Google de Fort Lauderdale Auto Sales",
  deepDive: {
    id: "landing-sigue-leyendo",
    title: "Antes de pedir la cotización",
    destinations: "Qué lleva la página, medición, un chatbot en la página, una página o varias",
    sections: [
      {
        heading: "¿Qué lleva una landing page que funciona?",
        paragraphs: [
          "La oferta en la primera pantalla, con las palabras que usó el anuncio o la publicación. La prueba justo debajo: una reseña real, una foto del trabajo real, una cifra que puedas publicar. Una sola acción, repetida donde tenga sentido, y nada que compita con ella. En el celular, la acción tiene que quedar al alcance del pulgar sin volver a subir.",
          "El video se gana su lugar cuando muestra lo que las palabras no pueden: el plato, la propiedad, el servicio mientras se hace. Ahí es donde el trabajo principal de Esteban, grabar y editar, entra directo en la página.",
        ],
      },
      {
        heading: "¿Cómo sé si la landing page está funcionando?",
        paragraphs: [
          "Midiéndola desde el primer día. La construcción configura eventos de conversión para las acciones que importan (un formulario enviado, una llamada, un mensaje iniciado), así cada visita se puede seguir hasta lo que produjo y cada anuncio se compara por lo que trajo, no solo por los clics. La conversión se mide y se mejora; no se garantiza.",
        ],
      },
      {
        heading: "¿La landing page puede tener un chatbot?",
        paragraphs: [
          "Sí. El mismo trabajo de chatbots que funciona en los sitios de FLAS y Front Line Auto puede ir en una landing page, respondiendo las preguntas que de otro modo frenarían a alguien antes de enviar el formulario, y pasando las consultas serias a una persona.",
        ],
      },
    ],
  },
  intakeHeading: "Cuéntale a Esteban qué tiene que vender la página",
  intakeLead: "Con un correo y una línea sobre la oferta y de dónde viene el tráfico es suficiente para empezar.",
  inquiry: {
    serviceId: "landing_page",
    serviceName: "una landing page",
    goalPrompt: "una página para una oferta que convierta los clics de anuncios o de la bio en consultas",
    assetPrompt: "la oferta, las fotos o reseñas que ya tengo y de dónde va a venir el tráfico",
    proofHref: "/es/portafolio/flas-concierge",
    proofLabel: "Ver un sitio web ya construido",
  },
  relatedHeading: "Servicios relacionados",
  related: [
    { title: "Chatbot con IA para negocios", detail: "Un bot en la página o en los DM de Instagram que responde preguntas frecuentes y te pasa las consultas serias.", href: CHATBOT_ES },
    { title: "Diseño web en Fort Lauderdale", detail: "Cuando necesitas el sitio completo y no una sola página: pensado para el celular y bilingüe si lo necesitas.", href: "/es/diseno-web-fort-lauderdale" },
    { title: "Editor de Reels en Fort Lauderdale", detail: "Los videos cortos que llevan a la gente a la página en primer lugar.", href: "/es/editor-de-reels-fort-lauderdale" },
  ],
  service: {
    name: "Landing page para negocios",
    description:
      "Landing pages de una sola oferta para negocios, hechas para anuncios, códigos QR y enlaces de bio de Instagram, pensadas para el celular, en español e inglés, con medición de conversiones. Desde {landingFrom} una página básica.",
    serviceType: "Diseño de landing pages",
  },
};

export const WEB_AI_PAGES: Record<WebAiPageId, Record<WebAiLocale, WebAiServicePage>> = {
  chatbot: { en: chatbotEn, es: chatbotEs },
  landing: { en: landingEn, es: landingEs },
};

/**
 * Fill the price placeholders from lib/pricing.ts so no figure is typed in this
 * file: {editPrice} (remote editing), {landingPrice} (the full landing-page
 * price line) and {landingFrom} (the landing-page starting price).
 */
export function fillPrices(text: string, locale: WebAiLocale): string {
  return text
    .replaceAll("{editPrice}", priceSentence(locale, "arranque").toLowerCase())
    .replaceAll("{landingPrice}", landingPagePriceText(locale))
    .replaceAll("{landingFrom}", usd(LANDING_PAGE_PRICE.from))
    .replaceAll("{chatbotPrice}", chatbotPriceText(locale))
    .replaceAll("{chatbotFrom}", usd(CHATBOT_PRICE.from));
}

function fillDeep<T>(value: T, locale: WebAiLocale): T {
  if (typeof value === "string") return fillPrices(value, locale) as T;
  if (Array.isArray(value)) return value.map((v) => fillDeep(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillDeep(v, locale)])) as T;
  }
  return value;
}

export function getWebAiPage(id: WebAiPageId, locale: WebAiLocale): WebAiServicePage {
  return fillDeep(WEB_AI_PAGES[id][locale], locale);
}
