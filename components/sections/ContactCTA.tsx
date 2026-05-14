import { ArrowRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function ContactCTA() {
  const t = useTranslations("ContactCTA");

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-foreground py-20 text-background sm:py-28"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-background/60 sm:text-sm">
              {t("eyebrow")}
            </p>
            <h2
              id="contact-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              {t("headline")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-background/70 sm:text-lg">
              {t("body")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="mailto:gagui010@icloud.com"
              className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-5 py-3 text-sm font-medium text-background transition hover:border-background/60 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
            >
              <Mail className="size-4" aria-hidden />
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
