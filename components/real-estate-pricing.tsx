import Link from "next/link";

import { Container } from "@/components/ui/container";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Real estate listing media",
    question: "How much does real estate photography cost in Fort Lauderdale and Miami?",
    photography: "Listing photography, by home size",
    addOns: "Add-ons",
    fees: "Additional fees",
    quoted: "Call to discuss",
    from: "Starting at",
    perMinute: "/ min",
    cta: "Ask about a listing",
    ctaText: "Hi Esteban, I'd like listing photos for a property.",
    terms: "Terms",
    referral: "Referral",
    sizeHelp:
      "The price depends only on the size of the home. Tell me the square footage and the address and you have the figure before we book.",
  },
  es: {
    eyebrow: "Media para propiedades en venta",
    question: "¿Cuánto cuesta la fotografía inmobiliaria en Fort Lauderdale y Miami?",
    photography: "Fotografía de la propiedad, por tamaño",
    addOns: "Complementos",
    fees: "Cargos adicionales",
    quoted: "A convenir",
    from: "Desde",
    perMinute: "/ min",
    cta: "Consultar por una propiedad",
    ctaText: "Hola Esteban, quiero fotos para una propiedad.",
    terms: "Condiciones",
    referral: "Recomendación",
    sizeHelp:
      "El precio depende sólo del tamaño de la casa. Dime los pies cuadrados y la dirección y tienes la cifra antes de agendar.",
  },
} as const;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * The one sentence an answer engine can quote, built from the config so the
 * figures can never drift from the rate card.
 */
export function realEstateDirectAnswer(locale: Locale): string {
  const tiers = REAL_ESTATE_MEDIA.photography.filter((t) => t.amount !== null);
  const low = usd(Math.min(...tiers.map((t) => t.amount as number)));
  const high = usd(Math.max(...tiers.map((t) => t.amount as number)));
  // Read, never typed. A figure written into this sentence would drift from the
  // rate card the first time Esteban changes a price.
  const addOn = (id: string) => {
    const item = REAL_ESTATE_MEDIA.addOns.find((a) => a.id === id);
    if (!item?.amount) throw new Error(`the direct answer needs add-on "${id}"`);
    return usd(item.amount);
  };
  const drone = addOn("drone-photography");
  const video = addOn("premium-listing-video");
  return locale === "es"
    ? `La fotografía de una propiedad cuesta entre ${low} y ${high}, según el tamaño de la casa: ${low} hasta 1,500 pies cuadrados y ${high} entre 6,001 y 8,000. El dron son ${drone} aparte y el video premium ${video} por minuto. Las casas de más de 8,000 pies cuadrados se cotizan aparte.`
    : `Listing photography costs between ${low} and ${high} depending on the size of the home: ${low} up to 1,500 square feet and ${high} from 6,001 to 8,000. Drone photography is ${drone} on top, and premium listing video is ${video} per minute. Homes above 8,000 square feet are quoted individually.`;
}

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[#ddd4c8] py-4 last:border-0">
      <span className="font-serif text-xl">{label}</span>
      <span className="font-serif text-2xl text-[var(--em-accent-ink,#a8381d)]">{value}</span>
      {note ? <span className="w-full text-sm leading-6 text-[#5a6066]">{note}</span> : null}
    </li>
  );
}

export function RealEstatePricing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const es = locale === "es";
  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16" data-section="real_estate_pricing">
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--em-accent-ink,#a8381d)]">
          {t.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          {t.question}
        </h1>
        {/* The citable sentence, straight from the rate card. */}
        <p className="mt-6 max-w-3xl text-lg leading-8">{realEstateDirectAnswer(locale)}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">{t.sizeHelp}</p>

        <section className="mt-12 max-w-3xl" data-section="re_photography">
          <h2 className="font-serif text-3xl">{t.photography}</h2>
          <ul className="mt-4">
            {REAL_ESTATE_MEDIA.photography.map((tier) => (
              <Row
                key={tier.label.en}
                label={tier.label[locale]}
                value={tier.amount === null ? t.quoted : usd(tier.amount)}
              />
            ))}
          </ul>
        </section>

        <section className="mt-12 max-w-3xl" data-section="re_addons">
          <h2 className="font-serif text-3xl">{t.addOns}</h2>
          <ul className="mt-4">
            {REAL_ESTATE_MEDIA.addOns.map((item) => (
              <Row
                key={item.id}
                label={item.name[locale]}
                value={`${item.from ? `${t.from} ` : ""}${usd(item.amount as number)}${
                  item.unit === "per-minute" ? ` ${t.perMinute}` : ""
                }`}
                note={item.note?.[locale]}
              />
            ))}
          </ul>
        </section>

        <section className="mt-12 max-w-3xl" data-section="re_fees">
          <h2 className="font-serif text-3xl">{t.fees}</h2>
          <ul className="mt-4">
            {REAL_ESTATE_MEDIA.fees.map((item) => (
              <Row
                key={item.id}
                label={item.name[locale]}
                value={usd(item.amount as number)}
                note={item.note?.[locale]}
              />
            ))}
          </ul>
        </section>

        <div className="mt-12 max-w-3xl rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#e8b98a]">
            {t.referral}
          </p>
          <p className="mt-3 font-serif text-2xl leading-snug">{REAL_ESTATE_MEDIA.referral[locale]}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={whatsappHref(site.phone.e164, t.ctaText)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="real_estate_whatsapp"
            className="inline-flex min-h-12 items-center rounded-full bg-[var(--em-accent-ink,#a8381d)] px-6 text-sm font-medium text-white"
          >
            {t.cta}
          </a>
          <Link href={es ? "/es/precios" : "/pricing"} className="text-sm underline underline-offset-4">
            {es ? "Ver todos los paquetes" : "See all packages"}
          </Link>
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-[var(--em-accent-ink,#a8381d)] pl-4 text-sm leading-6 text-[#3f4548]">
          <strong>{t.terms}.</strong> {REAL_ESTATE_MEDIA.terms[locale]}
        </p>
      </Container>
    </main>
  );
}
