import Link from "next/link";
import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageUpdated } from "@/components/page-updated";
import {
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { WEDDING_PACKAGES } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

export type WeddingLocale = "en" | "es";

export const WEDDING_PACKAGES_PATH: Record<WeddingLocale, string> = {
  en: "/services/wedding-packages",
  es: "/es/paquetes-de-boda",
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const FLOOR = usd(
  Math.min(
    WEDDING_PACKAGES.halfDayFrom,
    WEDDING_PACKAGES.contentCreationFrom,
    WEDDING_PACKAGES.fullDayFrom,
  ),
);
const DEPOSIT = `${WEDDING_PACKAGES.depositPercent}%`;
const REST = `${100 - WEDDING_PACKAGES.depositPercent}%`;
const HALF = usd(WEDDING_PACKAGES.halfDayFrom);
const FULL = usd(WEDDING_PACKAGES.fullDayFrom);
const CONTENT = usd(WEDDING_PACKAGES.contentCreationFrom);

type Pkg = { name: string; from: string; coverage: string; best: string; gets: string[]; cta: string };
type City = { name: string; href: string; other: string; line: string; link: string };

type Copy = {
  home: string; homeHref: string; services: string; servicesHref: string; crumb: string;
  eyebrow: string; h1: string; lead: string;
  checkDate: string; watch: string; watchHref: string; contactHref: string;
  packagesH2: string; packages: Pkg[];
  depositH2: string; steps: string[]; depositNote: string;
  citiesH2: string; cities: City[]; otherLang: string;
  openH2: string; openBody: string; email: string; call: string;
  faqHeading: string; faqEyebrow: string; faqs: { question: string; answer: string }[];
  serviceName: string; serviceDesc: string; inLanguage: string;
};

const COPY: Record<WeddingLocale, Copy> = {
  en: {
    home: "Home", homeHref: "/", services: "Services", servicesHref: "/services", crumb: "Wedding Packages",
    eyebrow: "Miami / Fort Lauderdale / Palm Beach",
    h1: `Wedding video packages from ${FLOOR}.`,
    lead: `Pick a Half Day, a Full Day or wedding content for social. Pay ${DEPOSIT} to hold your date and the other ${REST} before delivery. Filmed and edited by Esteban Moreno.`,
    checkDate: "Check My Date", watch: "Watch a Wedding Film", watchHref: "/portfolio/diana-jack", contactHref: "/contact",
    packagesH2: "Which package fits your wedding?",
    packages: [
      {
        name: "Half Day", from: HALF, coverage: "Up to 5 hours of filming",
        best: "Ceremony plus the first hour of the reception, or a smaller wedding.",
        gets: ["Ceremony and key moments filmed", "A 3 to 5 minute highlight film", "A 60 to 90 second trailer for Instagram", "Delivered as a download link"],
        cta: "Ask About Half Day",
      },
      {
        name: "Full Day", from: FULL, coverage: "Up to 10 hours of filming",
        best: "Getting ready through the last dance.",
        gets: ["Getting ready, ceremony, toasts and reception", "A 5 to 8 minute wedding film", "A 60 to 90 second trailer", "Vertical clips cut for Instagram and TikTok"],
        cta: "Ask About Full Day",
      },
      {
        name: "Wedding Content Creation", from: CONTENT, coverage: "Up to 5 hours, built for social",
        best: "Couples and guests who want to post the day, not watch a long film.",
        gets: ["Short vertical videos filmed through the day", "10 to 15 edited reels and clips", "Captions and a posting order", "Delivered within a week of the wedding"],
        cta: "Ask About Content Creation",
      },
    ],
    depositH2: `How does the ${DEPOSIT} deposit work?`,
    steps: [
      "Send your date, venue and hours. You get a written quote.",
      `Pay ${DEPOSIT} of the quote. Your date is held for you.`,
      `Pay the other ${REST} before your film is delivered.`,
    ],
    depositNote: `Packages start at ${FLOOR}. Your final price depends on hours, venue and what you want delivered.`,
    citiesH2: "Where do you film weddings?",
    cities: [
      { name: "Miami", href: "/services/wedding-videographer-miami", other: "/es/videografo-de-bodas-miami", line: "Miami, Coral Gables, Coconut Grove and Brickell.", link: "Wedding videographer in Miami" },
      { name: "Fort Lauderdale", href: "/services/wedding-videographer-fort-lauderdale", other: "/es/videografo-de-bodas-fort-lauderdale", line: "Fort Lauderdale, Las Olas, Pompano and Broward County.", link: "Wedding videographer in Fort Lauderdale" },
      { name: "Palm Beach", href: "/services/destination-wedding-videographer-palm-beach", other: "/es/videografo-para-bodas-de-destino-palm-beach", line: "Palm Beach, West Palm Beach and destination weddings.", link: "Wedding videographer in Palm Beach" },
    ],
    otherLang: "En español",
    openH2: "Is your date still open?",
    openBody: "Send your date, venue and the hours you want covered. Esteban replies with a written quote.",
    email: "Email", call: "Call",
    faqHeading: "Wedding package questions.", faqEyebrow: "Before you book",
    faqs: [
      { question: "How much do wedding packages cost?", answer: `Wedding packages start at ${FLOOR}. Half Day and Wedding Content Creation start at ${HALF}, and Full Day starts at ${FULL} because it covers more hours. Your final quote depends on your date, venue, hours and what you want delivered.` },
      { question: "How much is the deposit?", answer: `The deposit is ${DEPOSIT} of your quote. It holds your date. The other ${REST} is due before we deliver your film.` },
      { question: "Do you travel for weddings in Miami, Fort Lauderdale and Palm Beach?", answer: "Yes. Esteban films across Miami-Dade, Broward and Palm Beach counties. Tell us the venue and we include any travel in your quote." },
      { question: "What is the difference between a wedding film and wedding content?", answer: "A wedding film is a polished story of the day to watch and keep. Wedding content is a set of short vertical videos made to post on Instagram and TikTok, delivered fast." },
      { question: "Can I combine a film and social content?", answer: "Yes. The Full Day package already includes vertical clips. Ask for the Content Creation package on top of a Half Day or Full Day and we price the two together." },
    ],
    serviceName: "Wedding Packages",
    serviceDesc: `Wedding video packages in Miami, Fort Lauderdale and Palm Beach, starting at ${FLOOR}.`,
    inLanguage: "en-US",
  },
  es: {
    home: "Inicio", homeHref: "/es", services: "Servicios", servicesHref: "/es/servicios", crumb: "Paquetes de boda",
    eyebrow: "Miami / Fort Lauderdale / Palm Beach",
    h1: `Paquetes de video de boda desde ${FLOOR}.`,
    lead: `Elige medio día, día completo o contenido de boda para redes. Pagas ${DEPOSIT} para reservar tu fecha y el otro ${REST} antes de la entrega. Filmado y editado por Esteban Moreno.`,
    checkDate: "Consultar mi fecha", watch: "Ver una película de boda", watchHref: "/es/portafolio/diana-jack", contactHref: "/es/contacto",
    packagesH2: "¿Qué paquete va con tu boda?",
    packages: [
      {
        name: "Medio día", from: HALF, coverage: "Hasta 5 horas de filmación",
        best: "Ceremonia más la primera hora de la recepción, o una boda más pequeña.",
        gets: ["Ceremonia y momentos clave filmados", "Un video resumen de 3 a 5 minutos", "Un tráiler de 60 a 90 segundos para Instagram", "Entrega con enlace de descarga"],
        cta: "Preguntar por medio día",
      },
      {
        name: "Día completo", from: FULL, coverage: "Hasta 10 horas de filmación",
        best: "Desde los preparativos hasta el último baile.",
        gets: ["Preparativos, ceremonia, brindis y recepción", "Una película de boda de 5 a 8 minutos", "Un tráiler de 60 a 90 segundos", "Clips verticales para Instagram y TikTok"],
        cta: "Preguntar por día completo",
      },
      {
        name: "Contenido de boda", from: CONTENT, coverage: "Hasta 5 horas, pensado para redes",
        best: "Parejas e invitados que quieren publicar el día, no ver una película larga.",
        gets: ["Videos verticales cortos filmados durante el día", "De 10 a 15 reels y clips editados", "Textos para cada publicación y orden para publicarlos", "Entrega dentro de la semana siguiente a la boda"],
        cta: "Preguntar por contenido de boda",
      },
    ],
    depositH2: `¿Cómo funciona el depósito de ${DEPOSIT}?`,
    steps: [
      "Envía tu fecha, el lugar y las horas. Recibes una cotización por escrito.",
      `Pagas ${DEPOSIT} de la cotización. Tu fecha queda reservada.`,
      `Pagas el otro ${REST} antes de recibir tu video.`,
    ],
    depositNote: `Los paquetes empiezan en ${FLOOR}. El precio final depende de las horas, el lugar y lo que quieras recibir.`,
    citiesH2: "¿Dónde filman bodas?",
    cities: [
      { name: "Miami", href: "/es/videografo-de-bodas-miami", other: "/services/wedding-videographer-miami", line: "Miami, Coral Gables, Coconut Grove y Brickell.", link: "Vide\u00f3grafo de bodas en Miami" },
      { name: "Fort Lauderdale", href: "/es/videografo-de-bodas-fort-lauderdale", other: "/services/wedding-videographer-fort-lauderdale", line: "Fort Lauderdale, Las Olas, Pompano y el condado de Broward.", link: "Vide\u00f3grafo de bodas en Fort Lauderdale" },
      { name: "Palm Beach", href: "/es/videografo-para-bodas-de-destino-palm-beach", other: "/services/destination-wedding-videographer-palm-beach", line: "Palm Beach, West Palm Beach y bodas de destino.", link: "Vide\u00f3grafo de bodas en Palm Beach" },
    ],
    otherLang: "In English",
    openH2: "¿Tu fecha sigue libre?",
    openBody: "Envía tu fecha, el lugar y las horas que quieres cubrir. Esteban te responde con una cotización por escrito.",
    email: "Correo", call: "Llamar",
    faqHeading: "Preguntas sobre los paquetes de boda.", faqEyebrow: "Antes de reservar",
    faqs: [
      { question: "¿Cuánto cuestan los paquetes de boda?", answer: `Los paquetes de boda empiezan en ${FLOOR}. Medio día y Contenido de boda empiezan en ${HALF}, y Día completo empieza en ${FULL} porque cubre más horas. Tu cotización final depende de la fecha, el lugar, las horas y lo que quieras recibir.` },
      { question: "¿De cuánto es el depósito?", answer: `El depósito es ${DEPOSIT} de tu cotización. Reserva tu fecha. El otro ${REST} se paga antes de entregarte tu video.` },
      { question: "¿Viajan para bodas en Miami, Fort Lauderdale y Palm Beach?", answer: "Sí. Esteban filma en los condados de Miami-Dade, Broward y Palm Beach. Dínos el lugar y sumamos el traslado a tu cotización." },
      { question: "¿Qué diferencia hay entre una película de boda y contenido de boda?", answer: "Una película de boda es la historia pulida del día, para ver y guardar. El contenido de boda es un conjunto de videos verticales cortos para publicar en Instagram y TikTok, entregados rápido." },
      { question: "¿Puedo combinar película y contenido para redes?", answer: "Sí. El paquete de día completo ya incluye clips verticales. Pide Contenido de boda junto con Medio día o Día completo y te cotizamos los dos juntos." },
    ],
    serviceName: "Paquetes de boda",
    serviceDesc: `Paquetes de video de boda en Miami, Fort Lauderdale y Palm Beach, desde ${FLOOR}.`,
    inLanguage: "es-US",
  },
};

export function weddingPackagesFaqs(locale: WeddingLocale) {
  return COPY[locale].faqs;
}

export function weddingPackagesNodeArgs(locale: WeddingLocale) {
  const c = COPY[locale];
  return {
    path: WEDDING_PACKAGES_PATH[locale],
    name: c.serviceName,
    description: c.serviceDesc,
    crumb: c.crumb,
  };
}

export function WeddingPackagesPage({
  locale,
  nodes: rawNodes,
}: {
  locale: WeddingLocale;
  nodes: ReturnType<typeof buildServicePageNodes>;
}) {
  const c = COPY[locale];
  const path = WEDDING_PACKAGES_PATH[locale];
  const url = absoluteUrl(path);
  const nodes = rawNodes.map((n) => (n["@type"] === "WebPage" ? { ...n, inLanguage: c.inLanguage } : n));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(url, c.faqs),
      ...nodes,
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: c.serviceName,
        description: c.serviceDesc,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Miami", "Fort Lauderdale", "Palm Beach"],
        serviceType: "Wedding videography",
        offers: c.packages.map((p) => ({
          "@type": "Offer",
          name: p.name,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            minPrice: Number(p.from.replace(/[^0-9]/g, "")),
          },
        })),
      },
    ],
  };
  const from = locale === "en" ? "From" : "Desde";

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={c.homeHref} className="hover:text-[#9f3c27]">{c.home}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={c.servicesHref} className="hover:text-[#9f3c27]">{c.services}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">{c.crumb}</li>
            </ol>
          </nav>
          <p className="text-xs font-medium uppercase text-[#5a6066]">{c.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">{c.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">{c.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={c.contactHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
              {c.checkDate}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={c.watchHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
              {c.watch}
            </Link>
          </div>
          <PageUpdated path={path} locale={locale} />
        </Container>
      </section>

      <section className="py-12 sm:py-16" id="packages">
        <Container size="xl">
          <h2 className="font-serif text-4xl">{c.packagesH2}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {c.packages.map((p) => (
              <article key={p.name} className="flex flex-col rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <h3 className="font-serif text-3xl">{p.name}</h3>
                <p className="mt-2 text-2xl font-medium text-[#9f3c27]">{from} {p.from}</p>
                <p className="mt-1 text-sm text-[#5a6066]">{p.coverage}</p>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">{p.best}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#252a2d]">
                  {p.gets.map((g) => (
                    <li key={g} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#e85d3e]">&bull;</span>
                      {g}
                    </li>
                  ))}
                </ul>
                <Link href={c.contactHref} className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
                  {p.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16" id="deposit">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
            <CalendarCheck className="size-10 text-[#e85d3e]" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-4xl">{c.depositH2}</h2>
              <ol className="mt-5 max-w-2xl list-decimal space-y-3 pl-5 text-base leading-7 text-[#252a2d]">
                {c.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">{c.depositNote}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" id="cities">
        <Container size="xl">
          <h2 className="font-serif text-4xl">{c.citiesH2}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {c.cities.map((city) => (
              <div key={city.name} className="rounded-lg border border-[#ddd4c8] p-6">
                <h3 className="font-serif text-2xl">{city.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">{city.line}</p>
                <Link href={city.href} className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                  {city.link}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <p className="mt-2 text-sm">
                  <Link href={city.other} className="text-[#5a6066] underline underline-offset-4">{c.otherLang}</Link>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-serif text-4xl">{c.openH2}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">{c.openBody}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
                  <Mail className="size-4" aria-hidden="true" />
                  {c.email}
                </a>
                <a href={site.phone.href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
                  <Phone className="size-4" aria-hidden="true" />
                  {c.call}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServiceFaqs heading={c.faqHeading} faqs={c.faqs} sectionId="wedding-packages-faq" eyebrow={c.faqEyebrow} />
    </main>
  );
}
