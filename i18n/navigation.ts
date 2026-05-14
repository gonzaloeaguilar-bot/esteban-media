import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware wrappers around `next/link`, `next/navigation`, etc.
 *
 * Always import `Link`, `redirect`, `usePathname`, `useRouter` from here
 * (not from `next/link` / `next/navigation`) when rendering inside the
 * `[locale]` segment, so that hrefs and navigations preserve the current
 * locale prefix automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
