import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Top-of-page navigation shared across all routes.
 *
 * Kept intentionally minimal for now — a single bar with the wordmark,
 * primary nav, a language toggle, and a contact CTA. Mobile collapses the
 * nav into a wrap; a proper menu can land later (P1+, see backlog
 * "Mobile menu polish").
 *
 * Routes referenced here may not exist yet — Next.js will surface its own
 * 404 for those until the related backlog items land. That's intentional
 * and matches the task description.
 */
const NAV_LINKS = [
  { href: "/services", labelKey: "services" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
        >
          {t("wordmark")}
        </Link>

        <nav
          aria-label={t("primaryAriaLabel")}
          className="flex items-center gap-1 sm:gap-2"
        >
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
