import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Laptop, Mail, Phone, Bot, Sparkles, Layout } from "lucide-react";

import { Container } from "@/components/ui/container";
import { WebsiteProjectIntake } from "@/components/website-project-intake";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Diseño Web Fort Lauderdale & Chatbots con IA",
  description:
    "Diseño de páginas web de alta conversión, aplicaciones web personalizadas e integración de chatbots con IA en Fort Lauderdale, Miami y South Florida.",
  path: "/es/diseno-web-fort-lauderdale",
  locale: "es",
});

export default function DisenoWebFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/es/diseno-web-fort-lauderdale#service"),
        name: "Diseño Web Fort Lauderdale & Chatbots con IA",
        description:
          "Diseño de sitios web personalizados de alta conversión, aplicaciones web y chatbots de atención 24/7 con IA para empresas en Fort Lauderdale y South Florida.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/es"),
          telephone: site.phone.e164,
        },
        areaServed: "Fort Lauderdale / Broward / Miami-Dade / South Florida",
        serviceType: "Diseño Web e Integración de Chatbots con IA",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl("/es/diseno-web-fort-lauderdale#breadcrumbs"),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: absoluteUrl("/es"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: absoluteUrl("/es/servicios"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Diseño Web Fort Lauderdale",
            item: absoluteUrl("/es/diseno-web-fort-lauderdale"),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/es/diseno-web-fort-lauderdale#faq"),
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Qué diferencia el diseño web de Esteban Media?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Creamos motores digitales completos de conversión. En lugar de páginas estáticas simples, integramos arquitectura web veloz, medios audiovisuales de impacto y chatbots con IA 24/7 para capturar clientes.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cómo funciona el chatbot con IA en el sitio web?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nuestros chatbots conversacionales con IA se integran en tu sitio web para responder preguntas frecuentes, calificar clientes potenciales y agendar citas automáticamente las 24 horas.",
            },
          },
          {
            "@type": "Question",
            name: "¿Desarrollan sitios web para concesionarios, marcas de fitness y negocios de servicios?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí. Nuestro portafolio incluye sistemas para concesionarios de autos (Frontline Auto, FLAS), marcas de fitness (TitanForge, Gains From Geebs), restaurantes y empresas locales.",
            },
          },
          {
            "@type": "Question",
            name: "¿Los sitios web están adaptados para móviles y son bilingües (inglés/español)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cada sitio está optimizado para móviles (mobile-first) para garantizar máxima velocidad y puede configurarse bilingüe en inglés y español para atender el mercado diverso de South Florida.",
            },
          },
          {
            "@type": "Question",
            name: "¿Cuánto tiempo toma el desarrollo de un sitio web con chatbot de IA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "La mayoría de proyectos de diseño web e integración de chatbots con IA se entregan entre 2 y 3 semanas según el alcance y la preparación del contenido.",
            },
          },
          {
            "@type": "Question",
            name: "¿Ofrecen mantenimiento y hosting para los sitios web?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Proveemos despliegue web llave en mano, monitoreo de rendimiento y optimizaciones continuas para los chatbots y la plataforma.",
            },
          },
        ],
      },
    ],
  };

  const showcaseProjects = [
    {
      id: "titanforge",
      title: "TitanForge Platform & AI Bot",
      category: "Plataforma de Fitness & Alto Rendimiento",
      description:
        "Arquitectura web de alta conversión, registro interactivo de clientes y bot de IA integrado para calificación automática de prospectos.",
      tags: ["App Web Next.js", "Bot de IA", "Intake de Clientes"],
      href: "/es/portafolio/titanforge",
    },
    {
      id: "gains-from-geebs",
      title: "Gains From Geebs Web App y Bot de IA",
      category: "Plataforma de Salud & Bot de IA",
      description:
        "Plataforma web interactiva de fitness y bot conversacional de IA diseñado para atender consultas sobre planes de entrenamiento, nutrición y calificación de prospectos 24/7.",
      tags: ["Bot de IA Fitness", "Calculadoras", "Calificación 24/7"],
      href: "/es/portafolio/gains-from-geebs",
    },
    {
      id: "front-line-auto",
      title: "Frontline Auto Repair & Concierge IA de Servicio",
      category: "Motor Web para Taller de Reparaciones",
      description:
        "Plataforma web para taller de reparación automotriz equipada con un bot concierge de IA 24/7 para cotizaciones de reparación y agendamiento instantáneo de servicio.",
      tags: ["Taller Automotriz", "Concierge de Servicio con IA", "Atención Bilingüe"],
      href: "/es/portafolio/front-line-auto",
    },
    {
      id: "flas-concierge",
      title: "Fort Lauderdale Auto Sale (Concierge IA FLAS)",
      category: "Concesionario & Financiamiento BHPH",
      description:
        "Sistema web para concesionario y bot concierge de IA creado para precalificación de financiamiento Buy-Here-Pay-Here, inventarios y captura de clientes en tiempo real.",
      tags: ["Bot BHPH con IA", "Calculadora Financiera", "Captura SMS"],
      href: "/es/portafolio/flas-concierge",
    },
    {
      id: "ai-lead-automation",
      title: "Chatbots de IA Conversacionales (Casos Geebs y FLAS)",
      category: "IA Conversacional & Automatización",
      description:
        "Chatbots de IA conversacional 24/7 desarrollados a la medida para Geebs y Fort Lauderdale Auto Sale (FLAS) para automatizar atención al cliente, calificar prospectos y agendar citas automáticamente.",
      tags: ["Bot Coaching Geebs", "Bot Financiero FLAS", "Captura IA 24/7"],
      href: "/es/portafolio/ai-lead-automation",
    },
  ];

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Navegación" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/es" className="hover:text-[#9f3c27]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/es/servicios" className="hover:text-[#9f3c27]">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Diseño Web Fort Lauderdale
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
                Vertical de Diseño Web e Integraciones con IA
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Diseño Web y Chatbots con IA en Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Desarrollamos sitios web modernos de alta conversión, aplicaciones web interactivas y chatbots conversacionales con IA para negocios en Fort Lauderdale, Miami y South Florida. Transforma visitantes en clientes agendados automáticamente.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Iniciar Proyecto Web
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/portafolio"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver Portafolio Web
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm">
              <Laptop className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Más que Sitios Web Estáticos</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                El crecimiento de tu negocio requiere un sistema digital completo: páginas ultrarrápidas, contenido audiovisual de impacto y chatbots con IA que atienden clientes las 24 horas.
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Vertical de Servicio</dt>
                  <dd className="mt-1 font-serif text-xl">Diseño Web y Chatbots con IA</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Área de Cobertura</dt>
                  <dd className="mt-1 font-serif text-xl">Fort Lauderdale / Miami-Dade / Broward</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Capacidades */}
      <section className="border-b border-[#ddd4c8] py-14 sm:py-20">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Arquitectura y Capacidades Web</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Sistemas Web de Alta Conversión para Negocios Locales
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Layout className="size-8 text-[#e85d3e]" />
              <h3 className="mt-4 font-serif text-2xl">Arquitectura Web Personalizada</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Sitios web limpios, rápidos y adaptados a tu marca. Carga instantánea, diseño móvil prioritario y alta velocidad.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Bot className="size-8 text-[#e85d3e]" />
              <h3 className="mt-4 font-serif text-2xl">Chatbots Conversacionales con IA</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Chatbots inteligentes entrenados con la información de tu negocio. Califican prospectos, responden dudas y capturan contactos 24/7.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Sparkles className="size-8 text-[#e85d3e]" />
              <h3 className="mt-4 font-serif text-2xl">Integración Audiovisual</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Integración fluida de videos promocionales, diseño gráfico e imágenes de marca dentro de tu sitio web para máxima conversión.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Proyectos Destacados */}
      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-14 sm:py-20">
        <Container size="xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Portafolio Comprobado</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Proyectos Web y de IA Destacados
              </h2>
            </div>
            <Link
              href="/es/portafolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#101214] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#7f2f20]"
            >
              Ver Todo el Portafolio
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showcaseProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] transition hover:-translate-y-0.5 hover:border-[#e85d3e] hover:shadow-md"
              >
                <Link href={project.href} className="relative aspect-video overflow-hidden bg-[#101214]">
                  <Image
                    src={`/portfolio/${project.id}.jpg`}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-[#c84a2c] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {project.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl leading-tight text-[#101214]">
                    <Link href={project.href} className="hover:text-[#c84a2c]">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#3f4548]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#ebe3d7] px-2 py-0.5 text-xs text-[#5a6066]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-4 text-sm font-medium text-white transition hover:bg-[#a93e29]"
                  >
                    Ver Caso de Estudio & Resultados
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Target Industries & FAQs */}
      <section className="py-14 sm:py-20">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
              <h2 className="font-serif text-3xl">Nicho e Industrias que Atendemos</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Concesionarios de Autos y BHPH:</strong> Muestra de inventario, herramientas de financiamiento y bots concierge con IA para agendamiento.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Fitness, Coaching y Plataformas de Salud:</strong> Sistemas de registro de clientes, calculadoras interactivas y bots automatizados para DM.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Restaurantes y Locales de Hospitalidad:</strong> Menús digitales, integración de videos promocionales y formularios de eventos.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Contratistas y Servicios Profesionales:</strong> Páginas de alta confianza, muestra de reseñas y calificación de prospectos.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
              <h2 className="font-serif text-3xl">Preguntas Frecuentes</h2>
              <dl className="mt-6 space-y-6 text-sm text-[#252a2d]">
                <div>
                  <dt className="font-medium text-base text-[#101214]">¿Qué diferencia el diseño web de Esteban Media?</dt>
                  <dd className="mt-2 leading-6">Creamos motores digitales completos de conversión. En lugar de páginas estáticas simples, integramos arquitectura web veloz, medios audiovisuales de impacto y chatbots con IA 24/7 para capturar clientes.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">¿Cómo funciona el chatbot con IA en el sitio web?</dt>
                  <dd className="mt-2 leading-6">Nuestros chatbots conversacionales con IA se integran en tu sitio web para responder preguntas frecuentes, calificar clientes potenciales y agendar citas automáticamente las 24 horas.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">¿Desarrollan sitios web para concesionarios, marcas de fitness y negocios de servicios?</dt>
                  <dd className="mt-2 leading-6">Sí. Nuestro portafolio incluye sistemas para concesionarios de autos (Frontline Auto, FLAS), marcas de fitness (TitanForge, Gains From Geebs), restaurantes y empresas locales.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">¿Los sitios web están adaptados para móviles y son bilingües (inglés/español)?</dt>
                  <dd className="mt-2 leading-6">Cada sitio está optimizado para móviles (mobile-first) para garantizar máxima velocidad y puede configurarse bilingüe en inglés y español para atender el mercado diverso de South Florida.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">¿Cuánto tiempo toma el desarrollo de un sitio web con chatbot de IA?</dt>
                  <dd className="mt-2 leading-6">La mayoría de proyectos de diseño web e integración de chatbots con IA se entregan entre 2 y 3 semanas según el alcance y la preparación del contenido.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">¿Ofrecen mantenimiento y hosting para los sitios web?</dt>
                  <dd className="mt-2 leading-6">Proveemos despliegue web llave en mano, monitoreo de rendimiento y optimizaciones continuas para los chatbots y la plataforma.</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Footer */}
      <section className="pb-16 sm:pb-20 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-8 sm:p-12 text-center">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Comienza Hoy Mismo</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              ¿Listo para Potenciar tu Sitio Web y Captura de Clientes con IA?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-[#252a2d]">
              Contacta a Esteban Media para una consulta sobre diseño web personalizado y chatbots con IA en Fort Lauderdale y South Florida.
            </p>
            <WebsiteProjectIntake locale="es" />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/es/contacto"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-8 text-base font-medium text-white hover:bg-[#a93e29]"
              >
                Agendar Consulta de Alcance
                <ArrowRight className="size-5" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-base font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                <Mail className="size-5" />
                {site.email}
              </a>
              <a
                href={site.phone.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-base font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                <Phone className="size-5" />
                {site.phone.display}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
