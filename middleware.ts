import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Locale-routing middleware.
 *
 * - Negotiates the request locale from the URL path first, then
 *   `Accept-Language`, falling back to the default (`en`).
 * - Redirects bare `/` → `/en` (308) so every visitor lands on a
 *   canonical, locale-prefixed URL.
 * - Sets the locale cookie so subsequent loads bypass the negotiation cost.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  //   - API routes (handled per-locale at the route level if needed)
  //   - Next.js internals (`_next/*`, `_vercel/*`)
  //   - Static assets at the root (e.g. `/favicon.ico`, `/robots.txt`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
