import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "./routing";

/**
 * Per-request i18n config consumed by `next-intl/plugin`. Loads the
 * messages bundle that matches the current locale, falling back to the
 * default locale when an unknown / missing locale slips through (e.g. a
 * direct hit on a static segment without a locale prefix).
 *
 * Messages are JSON modules so they're tree-shaken into the route bundle
 * and don't require any runtime fetching.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
