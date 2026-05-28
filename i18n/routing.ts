import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Supported UI locales for esteban-media.
 *
 * South Florida market => bilingual EN/ES from day one.
 * EN is the default; locale prefix is "always" so URLs are unambiguous
 * (`/en/about`, `/es/about`) and the language switcher just swaps the prefix.
 */
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around next/link, useRouter, redirect, etc. that are
// locale-aware. Import from here instead of "next/link" anywhere we link
// between localized routes.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
