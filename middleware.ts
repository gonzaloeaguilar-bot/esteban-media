import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Next internals (_next/*)
  // - Static files with an extension (e.g. /favicon.ico, /og.png)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
