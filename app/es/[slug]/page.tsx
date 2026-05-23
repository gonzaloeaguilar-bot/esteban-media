import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  getSpanishNichePage,
  spanishNichePages,
  spanishServices,
} from "@/lib/spanish-site";
import { absoluteUrl, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return spanishNichePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSpanishNichePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metadataTitle,
    description: page.description,
    alternates: {
      canonical: `/es/${page.slug}`,
      languages: {
        "es-US": `/es/${page.slug}`,
      },
    },
    openGraph: {
      title: page.metadataTitle,
      description: page.description,
      url: absoluteUrl(`/es/${page.slug}`),
      locale: "es_US",
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function SpanishNichePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSpanishNichePage(slug);

  if (!page) {
    notFound();
  }

  const Icon = page.icon;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/es/${page.slug}#service`),
    name: page.title,
    description: page.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": absoluteUrl("/#business"),
      name: site.name,
      url: absoluteUrl("/"),
      email: site.email,
    },
    areaServed: page.location,
    availableLanguage: ["Spanish", "English"],
    serviceType: page.keyword,
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                {page.lead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
                >
                  Cotizar en español
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/servicios"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver servicios
                </Link>
              </div>
            </div>

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Icon className="size-7 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Intent de búsqueda</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                {page.searchIntent}
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">
                    Keyword principal
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{page.keyword}</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Zona</dt>
                  <dd className="mt-1 font-serif text-xl">{page.location}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <ContentList title="Ideal para" items={page.bestFor} />
            <ContentList title="Entregables posibles" items={page.deliverables} />
          </div>
        </Container>
      </section>

      <section className="border-y border-[#ddd4c8] bg-[#101214] py-12 text-[#f6f1ea] sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#ffb49e]">
            Servicios relacionados
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
            Combina la pagina de nicho con una entrega concreta.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {spanishServices.map((service) => (
              <Link
                key={service.id}
                href={`/es/servicios#${service.id}`}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08]"
              >
                <h3 className="font-serif text-xl">{service.name}</h3>
                <p className="mt-3 text-xs leading-5 text-[#c9c1b8]">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Respuestas rápidas antes de cotizar.
              </h2>
            </div>
            <div className="grid gap-3">
              {page.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <h3 className="font-serif text-2xl">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Siguiente paso
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Manda fecha, ciudad y referencias.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  No hace falta un deck. Con el objetivo, ubicación, deadline y
                  ejemplos visuales se puede definir un scope claro.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-5 text-sm font-medium text-white hover:bg-[#c84a2c]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.instagram}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ContentList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
      <h2 className="font-serif text-3xl">{title}</h2>
      <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2
              className="mt-0.5 size-5 shrink-0 text-[#e85d3e]"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
