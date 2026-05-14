"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * Two-button language toggle (EN / ES) rendered in the site header.
 *
 * - Reads the current locale from `next-intl` so the active state stays in
 *   sync with the URL on every navigation.
 * - Swaps locales by re-pushing the current pathname through the locale-aware
 *   router — preserves the deep link instead of dumping the visitor on `/`.
 * - Wraps the navigation in `useTransition` so the click feels instant
 *   (React keeps the previous UI mounted while the new locale loads).
 *
 * No client-side translation memo trickery — the header re-renders against
 * the new locale's messages on each push.
 */
export function LanguageSwitcher() {
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav.languageSwitcher");
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("ariaLabel")}
      className="ml-1 flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5 text-xs font-medium sm:ml-2"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === current;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-current={isActive ? "true" : undefined}
            aria-label={t(`${locale}Long` as "enLong" | "esLong")}
            disabled={isActive || isPending}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, { locale });
              });
            }}
            className={`rounded-sm px-2 py-1 uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(locale as "en" | "es")}
          </button>
        );
      })}
    </div>
  );
}
