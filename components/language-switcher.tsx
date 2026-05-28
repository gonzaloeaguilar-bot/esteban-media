"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { routing, usePathname, useRouter } from "@/i18n/routing";

/**
 * Header language switcher.
 *
 * Swaps the active locale prefix while keeping the user on the same path
 * (e.g. `/en/services` → `/es/services`). Uses the next-intl-aware router
 * so a) the locale cookie updates and b) the URL is type-safe.
 *
 * Rendered as a native <select> so it works without JS hydration as a
 * pretty good fallback (the form would still POST, just not navigate
 * via client transition).
 */
export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as (typeof routing.locales)[number];
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="flex items-center gap-2 text-sm text-neutral-300">
      <span className="sr-only">{t("languageLabel")}</span>
      <select
        value={locale}
        onChange={onChange}
        disabled={isPending}
        className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-neutral-100 focus:border-neutral-500 focus:outline-none disabled:opacity-50"
        aria-label={t("languageLabel")}
      >
        <option value="en">{t("switchToEnglish")}</option>
        <option value="es">{t("switchToSpanish")}</option>
      </select>
    </label>
  );
}
