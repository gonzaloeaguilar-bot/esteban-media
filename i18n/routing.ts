import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for the site's locale configuration.
 *
 * `localePrefix: "always"` means canonical URLs are `/en/*` and `/es/*` —
 * bare `/` is redirected to `/en` by the middleware. This keeps every
 * shipped page bilingual-safe and avoids ambiguous "default-locale-no-prefix"
 * behaviour that complicates SEO, sitemaps, and hreflang.
 */
export const routing = defineRouting({
  locales: ["en", "es"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

/** Narrow union for locale strings ("en" | "es"). */
export type Locale = (typeof routing.locales)[number];
