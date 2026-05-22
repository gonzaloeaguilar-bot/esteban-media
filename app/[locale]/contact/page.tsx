import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

import { ContactForm } from "./contact-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });
  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        aria-labelledby="contact-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("eyebrow")}
            </p>
            <h1
              id="contact-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              {t("headline")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("lede")}
            </p>

            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="font-medium text-foreground">
                  {t("details.emailLabel")}
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  <a
                    href="mailto:gagui010@icloud.com"
                    className="underline underline-offset-4 transition hover:opacity-80"
                  >
                    gagui010@icloud.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">
                  {t("details.basedInLabel")}
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  {t("details.basedInValue")}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">
                  {t("details.instagramLabel")}
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  <a
                    href="https://www.instagram.com/steeban1/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 transition hover:opacity-80"
                  >
                    @steeban1
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">
                  {t("details.notSureLabel")}
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  {t("details.notSureBefore")}
                  <Link
                    href="/services"
                    className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
                  >
                    {t("details.notSureLink")}
                  </Link>
                  {t("details.notSureAfter")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
