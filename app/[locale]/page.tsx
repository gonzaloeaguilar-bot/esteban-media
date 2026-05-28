import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const SERVICE_KEYS = [
  "aerial",
  "photography",
  "videography",
  "videoEditing",
  "photoEditing",
] as const;

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const tHome = await getTranslations("Home");
  const tServices = await getTranslations("Services");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 py-32 sm:py-40 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
            {tHome("heroEyebrow")}
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            {tHome("heroTitle")}
          </h1>
          <p className="mt-6 text-lg text-neutral-300 sm:text-xl">
            {tHome("heroSubtitle")}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              {tHome("heroCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-t border-neutral-800 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {tHome("servicesTitle")}
          </h2>
          <p className="mt-2 text-neutral-400">{tHome("servicesSubtitle")}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6"
              >
                <h3 className="text-lg font-medium">
                  {tServices(`${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {tServices(`${key}.tagline`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-neutral-800 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {tHome("aboutTeaserTitle")}
          </h2>
          <p className="mt-4 text-neutral-300">{tHome("aboutTeaserBody")}</p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-neutral-800 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {tHome("contactCtaTitle")}
          </h2>
          <p className="mt-4 text-neutral-300">{tHome("contactCtaBody")}</p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-100 transition hover:bg-neutral-900"
            >
              {tHome("contactCtaButton")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
