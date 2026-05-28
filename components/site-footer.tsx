import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 px-6 py-10 text-sm text-neutral-400 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>{t("tagline")}</p>
        <p>
          © {year} Esteban Media. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
