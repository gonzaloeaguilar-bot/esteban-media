import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import { packagesFor, packagesCopy, whatsappHref, type Locale } from "@/lib/packages";
import { PACKAGE_PRICES, type PackageId } from "@/lib/pricing";
import { packageRoutes } from "@/lib/package-routes";
import { site } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export function packageMetadata(id: PackageId, locale: Locale) {
  const pkg = packagesFor(locale).find((item) => item.id === id)!;
  return buildPageMetadata({ title: `${pkg.name} — ${pkg.subtitle}`, description: `${pkg.headline.join(" ")} ${pkg.idealFor}`, path: packageRoutes[id][locale], locale });
}

export function PackageDetail({ id, locale }: { id: PackageId; locale: Locale }) {
  const pkg = packagesFor(locale).find((item) => item.id === id)!;
  const copy = packagesCopy(locale);
  const price = PACKAGE_PRICES[id];
  const es = locale === "es";
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
      <Link href={es ? "/es/precios" : "/pricing"} className="text-sm underline">{es ? "Todos los paquetes" : "All packages"}</Link>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
        <div>
          <p className="text-sm text-[#5a6066]">{pkg.subtitle}</p>
          <h1 className="mt-2 font-serif em-display">{pkg.name}</h1>
          <p className="mt-5 max-w-xl text-xl">{pkg.headline.join(" ")}</p>
          <div className="my-6">
            {price.kind === "from" ? <RailPrice now={price.amount.toLocaleString("en-US")} prefix={copy.price.from} unit={copy.price.units[price.unit]} source={`package_${id}`} size="lg" /> : <p className="font-serif text-3xl">{copy.price.custom}</p>}
          </div>
          <p className="max-w-xl leading-relaxed">{pkg.idealFor}</p>
          <a className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#c84a2c] px-5 py-3 text-white" href={whatsappHref(site.phone.e164, es ? `Hola Esteban, quiero cotizar el paquete ${pkg.name}.` : `Hi Esteban, I'd like a quote for ${pkg.name}.`)} target="_blank" rel="noopener noreferrer" data-cta={`package_${id}_whatsapp`}>{copy.packages.quote(pkg.name)}</a>
        </div>
        <Image src={pkg.image.src} alt={pkg.image.alt} width={1200} height={800} className="h-auto w-full rounded-xl" />
      </div>
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-3xl">{copy.packages.includesLabel}</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">{pkg.includes.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-3xl">{es ? "Qué cambia el precio" : "What moves the price"}</h2>
        {id === "crecimiento" && <p className="mt-4 leading-relaxed">{es ? "El precio mensual es un punto de partida. Antes de confirmar, acordamos el calendario, las piezas y los formatos que necesita tu marca." : "The monthly price is a starting point. Before confirming, we agree on the calendar, pieces and formats your brand needs."}</p>}
        {id === "todo-incluido" && <p className="mt-4 leading-relaxed">{es ? "Este paquete se cotiza a medida. Primero definimos qué necesitas de web, contenido, IA y presencia local. La calculadora orienta la parte de video; el conjunto requiere una cotización escrita." : "This package is quoted individually. First we define your website, content, AI and local presence needs. The calculator estimates the video portion; the full package needs a written quote."}</p>}
        <div className="mt-5 divide-y divide-[#ddd4c8]">{factors.map(([title, body]) => <details key={title} className="py-4"><summary className="cursor-pointer font-medium">{title}</summary><p className="mt-3 leading-relaxed text-[#40474d]">{body}</p></details>)}</div>
        <p className="mt-5 leading-relaxed">{es ? "Usa la calculadora para orientar tu presupuesto de video. Comparte el resultado, el material disponible y tu fecha ideal por WhatsApp para recibir una cotización escrita." : "Use the calculator to estimate your video budget. Share the result, available footage and ideal date on WhatsApp for a written quote."}</p>
        <Link href={es ? "/es/calculadora" : "/calculator"} className="em-package-detail-link" data-cta={`package_${id}_calculator`}>{es ? "Calcular presupuesto de video" : "Estimate video budget"}</Link>
      </section>
    </Container>
  </main>;
}
