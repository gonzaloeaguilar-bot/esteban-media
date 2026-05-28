import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-neutral-950"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="font-semibold tracking-tight">
          Esteban
        </Link>
        <nav
          aria-label={t("home")}
          className="hidden items-center gap-6 text-sm text-neutral-300 sm:flex"
        >
          <Link href="/" className="hover:text-white">
            {t("home")}
          </Link>
          <Link href="/services" className="hover:text-white">
            {t("services")}
          </Link>
          <Link href="/about" className="hover:text-white">
            {t("about")}
          </Link>
          <Link href="/contact" className="hover:text-white">
            {t("contact")}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
