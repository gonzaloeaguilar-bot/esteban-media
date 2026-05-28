import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

function isSupportedLocale(value: string | undefined): value is Locale {
  return !!value && (routing.locales as readonly string[]).includes(value);
}

/**
 * Resolves the active locale + message bundle for every server request.
 *
 * Falls back to the default locale (EN) if the URL segment is missing or
 * unrecognized — matches the "always-prefixed" routing policy in routing.ts.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isSupportedLocale(requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
