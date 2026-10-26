import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { OwnerFactAnswers } from "@/components/owner-fact-answers";
import { PageUpdated } from "@/components/page-updated";
import { Container } from "@/components/ui/container";
import { withPageDate } from "@/lib/page-lastmod";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { PRODUCT_PHOTO_SESSION } from "@/lib/pricing";

const path = "/es/fotografia-de-producto-miami";

export const metadata = buildPageMetadata({
  title: "Fotografía de producto en Miami | Fotos reales",
  description:
    "Fotografía de producto real para vendedores de Amazon, marcas Shopify y negocios locales en Miami y Broward. Sesiones desde $280 según el alcance.",
  path,
  locale: "es",
});

export default function FotografiaDeProductoMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Fotografía de producto en Miami",
        description:
          "Fotografía de productos reales para vendedores de Amazon, marcas Shopify y negocios locales en Miami y Broward, con alcance definido según el producto, la locación y el uso previsto.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: ["Miami-Dade County", "Broward County"],
        serviceType: "Fotografía de producto",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/es") },
          { "@type": "ListItem", position: 2, name: "Servicios", item: absoluteUrl("/es/servicios") },
          { "@type": "ListItem", position: 3, name: "Fotografía de producto", item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withPageDate(path, jsonLd, absoluteUrl(path))) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Migas de pan" className="mb-8 text-sm text-[#5a6066]">
            <Link href="/es" className="underline underline-offset-4">Inicio</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link href="/es/servicios" className="underline underline-offset-4">Servicios</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">Fotografía de producto</span>
          </nav>
          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Fotos reales de producto / Miami y Broward</p>
            <h1 className="mt-4 font-serif em-display">Fotografía de producto en Miami para mostrar lo que realmente vendes.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
              Esteban fotografía productos reales para vendedores de Amazon, marcas Shopify, sitios de negocios y redes sociales. Las sesiones comienzan desde ${PRODUCT_PHOTO_SESSION.from} USD; cuéntale qué vendes y dónde usarás las imágenes para planear la sesión adecuada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/es/contacto" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]">
                Consultar por una sesión <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/es/fotografia-de-producto-con-ia-miami" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]">
                ¿Ya tienes fotos? Mira la opción con IA
              </Link>
            </div>
            <PageUpdated path={path} locale="es" />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl" className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">¿Qué debes enviar antes de una sesión de producto?</h2>
            <p className="mt-5 text-base leading-7 text-[#252a2d]">
              Envía el tipo de producto, la cantidad de artículos, dónde están y ejemplos de las imágenes que necesitas. Indica si las fotos son para fichas de Amazon, páginas de producto de Shopify, un sitio web, anuncios o redes sociales. Con eso, Esteban puede conversar contigo sobre fondo blanco de catálogo, fotos de estilo de vida, el lugar de la sesión y los archivos que recibirás antes de cotizar. Si también necesitas videos cortos, menciónalo para definir qué incluirá cada trabajo. Una sesión real parte del producto físico; los fondos asistidos por IA parten de fotos de referencia existentes. Ninguna opción debe cambiar la etiqueta, el color o las características del producto de forma que confunda a tus clientes. Usa la página de contacto o envía esos detalles por correo.
            </p>
          </section>
          <section className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">¿Necesitas fotos nuevas o imágenes a partir de fotos existentes?</h2>
            <p className="mt-5 text-base leading-7 text-[#252a2d]">
              Elige una sesión real cuando necesites imágenes nuevas del producto: su empaque, textura, escala o detalles que el comprador debe ver con claridad. Si ya tienes fotos fieles al producto y buscas otros escenarios o conceptos para una campaña, Esteban puede conversar sobre imágenes asistidas por IA usando esas referencias. Puedes consultar por ambas opciones en un mismo mensaje. La sesión empieza desde $${PRODUCT_PHOTO_SESSION.from}; el lugar, el manejo de los artículos, el uso de las imágenes y la cantidad de fotos finales determinan la cotización. Puede haber entrega urgente en 24 horas cuando la cantidad de productos, el retoque y el calendario lo permitan. El trabajo visual publicado por Esteban incluye montajes de producto, pero aquí no se presentan como prueba de una sesión fotográfica de producto.
            </p>
            <Link href="/es/fotografia-de-producto-con-ia-miami" className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline underline-offset-4">
              Ver la opción asistida por IA <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </Container>
      </section>

      <OwnerFactAnswers path="/es/fotografia-de-producto-miami" />

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Trabajo visual publicado</p>
            <h2 className="mt-3 font-serif text-3xl">Mira el trabajo visual de producto antes de definir una sesión.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#252a2d]">El proyecto publicado <Link href="/es/portafolio/my-dler" className="underline underline-offset-4 hover:text-[#9f3c27]">My D&apos;ler</Link> documenta el rol de Esteban creando montajes de producto y movimiento para la presentación de una app de entregas. Es trabajo visual pertinente, pero no se presenta como una sesión de fotografía de producto físico. Para una sesión real, describe el producto y el uso previsto para que la prueba y el alcance correspondan a tu solicitud.</p>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <h2 className="font-serif text-3xl">Describe tu proyecto de fotografía de producto.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#252a2d]">Indica el producto, dónde necesitas las fotos y una muestra del estilo que buscas. Esteban podrá explicarte qué puede incluir la sesión.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}?subject=Consulta%20fotografia%20de%20producto`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"><Mail className="size-4" aria-hidden="true" />Enviar correo a Esteban</a>
              <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"><Phone className="size-4" aria-hidden="true" />Llamar a Esteban</a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
