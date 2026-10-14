import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import { packagesFor, packagesCopy, whatsappHref, packageFaqFor, packageDirectAnswer, packageDetailJsonLd, priceSentence, type Locale } from "@/lib/packages";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import { entityIds } from "@/lib/entity-schema";
import { absoluteUrl } from "@/lib/site";
import { PACKAGE_PRICES, type PackageId } from "@/lib/pricing";
import { packageRoutes } from "@/lib/package-routes";
import { site } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { PricingTrail } from "@/components/pricing-trail";
import { PageUpdated } from "@/components/page-updated";

export function packageMetadata(id: PackageId, locale: Locale) {
  const pkg = packagesFor(locale).find((item) => item.id === id)!;
  // Answer-first snippet (overnight loop row 27): the price from lib/pricing.ts,
  // then who the package is for, instead of the tagline + "ideal for" line.
  const price = priceSentence(locale, id).toLowerCase();
  const lead = locale === "es" ? `El paquete ${pkg.name} es ${price}.` : `The ${pkg.name} package is ${price}.`;
  return buildPageMetadata({ title: `${pkg.name} — ${pkg.subtitle}`, description: packageMetaDescription(lead, pkg.idealFor, pkg.includes), path: packageRoutes[id][locale], locale });
}

/**
 * Price sentence first, then who it is for; when that runs past 160 characters,
 * the first "includes" lines instead. Round 7 (2026-10-14): the fallback was the
 * bare price sentence, so /pricing/local-presence (2 impressions at 5.5 this
 * week) and /es/precios/todo-incluido showed 53-63 character snippets that said
 * nothing about what is included.
 */
export function packageMetaDescription(lead: string, idealFor: string, includes: readonly string[]): string {
  const withIdeal = `${lead} ${idealFor}`;
  if (withIdeal.length <= 160) return withIdeal;
  let out = lead;
  for (const line of includes) {
    const sentence = /[.!?]$/.test(line.trim()) ? line.trim() : `${line.trim()}.`;
    const next = `${out} ${sentence}`;
    if (next.length > 160) break;
    out = next;
  }
  return out;
}

export function PackageDetail({ id, locale }: { id: PackageId; locale: Locale }) {
  const pkg = packagesFor(locale).find((item) => item.id === id)!;
  const copy = packagesCopy(locale);
  const price = PACKAGE_PRICES[id];
  const es = locale === "es";
  const direct = packageDirectAnswer(id, locale);
  const faq = packageFaqFor(id, locale);
  const [serviceLd, faqLd] = packageDetailJsonLd(id, locale, absoluteUrl(packageRoutes[id][locale]), entityIds.business);
  const factors = es ? [
    ["Ritmo de publicación", "La cantidad de piezas y la frecuencia de publicación cambian el trabajo de edición y planificación."],
    ["Material y grabación", "Indica si envías material grabado o necesitas producción en tu negocio. La grabación en locación se cotiza según el alcance."],
    ["Entrega express", "Si tienes una fecha cercana, compártela antes de confirmar. La entrega express cambia el presupuesto y depende de disponibilidad."],
  ] : [
    ["Publishing cadence", "The number of pieces and how often you publish change the editing and planning required."],
    ["Footage and filming", "Tell me whether you supply footage or need filming at your business. On-location production is quoted for your scope."],
    ["Express delivery", "Share any tight deadline before confirming. Express delivery changes the quote and depends on availability."],
  ];
  return <main className="em-package-detail bg-[#f6f1ea] py-10 text-[#101214] sm:py-16" data-section={`package_detail_${id}`}>
    <Container size="xl">
      <PricingTrail locale={locale} path={packageRoutes[id][locale]} name={pkg.name} />
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm text-[#5a6066]">{pkg.subtitle}</p>
          <h1 className="mt-2 font-serif em-display">{pkg.name}</h1>
          <p className="mt-5 max-w-xl text-xl">{pkg.headline.join(" ")}</p>
          <div className="my-6">
            {price.kind === "from" ? <RailPrice now={price.amount.toLocaleString("en-US")} prefix={copy.price.from} unit={copy.price.units[price.unit]} source={`package_${id}`} size="lg" /> : <p className="font-serif text-3xl">{copy.price.custom}</p>}
          </div>
          <p className="max-w-xl leading-relaxed">{pkg.idealFor}</p>
          <PageUpdated path={packageRoutes[id][locale]} locale={locale} className="mt-3 text-xs text-[#5a6066]" />
          <a className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[var(--em-accent-ink)] px-5 py-3 text-white" href={whatsappHref(site.phone.e164, es ? `Hola Esteban, quiero cotizar el paquete ${pkg.name}.` : `Hi Esteban, I'd like a quote for ${pkg.name}.`)} target="_blank" rel="noopener noreferrer" data-cta={`package_${id}_whatsapp`}>{copy.packages.quote(pkg.name)}</a>
        </div>
        <Image src={pkg.image.src} alt={pkg.image.alt} width={1200} height={800} className="h-auto w-full rounded-xl" />
      </div>
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-3xl">{copy.packages.includesLabel}</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">{pkg.includes.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>
      {/* The citable unit. A question-shaped heading and ONE sentence that
          answers it with no preamble, because an answer engine quotes a
          sentence, not a page. It adds no words to the includes-list above. */}
      <section className="mt-12 max-w-3xl" data-section={`package_answer_${id}`}>
        <h2 className="font-serif text-3xl">{direct.question}</h2>
        <p className="mt-4 text-lg leading-relaxed">{direct.answer}</p>
      </section>
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-3xl">{es ? "Qué cambia el precio" : "What moves the price"}</h2>
        {id === "crecimiento" && <p className="mt-4 leading-relaxed">{es ? "El precio mensual es un punto de partida. Antes de confirmar, acordamos el calendario, las piezas y los formatos que necesita tu marca." : "The monthly price is a starting point. Before confirming, we agree on the calendar, pieces and formats your brand needs."}</p>}
        {id === "todo-incluido" && <p className="mt-4 leading-relaxed">{es ? "Este paquete se cotiza a medida. Primero definimos qué necesitas de web, contenido, IA y presencia local. La calculadora orienta la parte de video; el conjunto requiere una cotización escrita." : "This package is quoted individually. First we define your website, content, AI and local presence needs. The calculator estimates the video portion; the full package needs a written quote."}</p>}
        <div className="mt-5 divide-y divide-[#ddd4c8]">{factors.map(([title, body]) => <details key={title} className="py-4"><summary className="cursor-pointer font-medium">{title}</summary><p className="mt-3 leading-relaxed text-[#40474d]">{body}</p></details>)}</div>
        <p className="mt-5 leading-relaxed">{es ? "Usa la calculadora para orientar tu presupuesto de video. Comparte el resultado, el material disponible y tu fecha ideal por WhatsApp para recibir una cotización escrita." : "Use the calculator to estimate your video budget. Share the result, available footage and ideal date on WhatsApp for a written quote."}</p>
        <Link href={es ? "/es/calculadora" : "/calculator"} className="em-package-detail-link" data-cta={`package_${id}_calculator`}>{es ? "Calcular presupuesto de video" : "Estimate video budget"}</Link>
      </section>
      {/* Only THIS package's questions. The hub carries all four, so repeating
          them here would be duplicate structured data on nine URLs. */}
      <section className="mt-12 max-w-3xl" data-section={`package_faq_${id}`}>
        <RailFaq
          heading={es ? "Preguntas sobre este paquete" : "Questions about this package"}
          source={`package_faq_${id}`}
          items={faq.map((q) => ({ id: q.id, question: q.question, answer: q.answer }))}
        />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </Container>
  </main>;
}
