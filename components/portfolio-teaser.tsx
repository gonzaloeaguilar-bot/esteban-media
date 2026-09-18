import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFeaturedPortfolioItems, type PortfolioItem } from "@/lib/portfolio";
import { HomePortfolioRail } from "@/components/home-portfolio-rail";

type PortfolioTeaserProps = {
  locale: "en" | "es";
};

const categoryLabels = {
  en: {
    animation: "Animation",
    "business-promos": "Business promos",
    "social-content": "Social content",
    events: "Events",
    editing: "Editing",
    narrative: "Narrative",
    "web-design": "Web Design & AI",
  },
  es: {
    animation: "Animación",
    "business-promos": "Promoción de negocios",
    "social-content": "Contenido social",
    events: "Eventos",
    editing: "Edición",
    narrative: "Narrativa",
    "web-design": "Diseño Web e IA",
  },
} as const;

function getPoster(item: PortfolioItem) {
  if ("poster" in item.media) {
    return item.media.poster;
  }

  if (item.media.kind === "image") {
    return item.media.src;
  }

  return undefined;
}

export function PortfolioTeaser({ locale }: PortfolioTeaserProps) {
  const items = getFeaturedPortfolioItems(6).filter(
    (item) => item.status === "live",
  );
  const isSpanish = locale === "es";
  const href = isSpanish ? "/es/portafolio" : "/portfolio";

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-y border-[#ddd4c8] bg-[#101214] py-10 text-[#f6f1ea] sm:py-14"
      aria-labelledby={`selected-work-${locale}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase text-[#ffb49e]">
              {isSpanish ? "Primero, el trabajo" : "First, the work"}
            </p>
            <h2
              id={`selected-work-${locale}`}
              className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
            >
              {isSpanish
                ? "Proyectos reales, fáciles de ver."
                : "Real projects, easy to watch."}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c9c1b8]">
              {isSpanish
                ? "Una muestra rápida del trabajo publicado de Esteban: videos, sitios web y chatbots con IA para evaluar estilo, ritmo y calidad desde el inicio."
                : "A fast look at Esteban's published work: videos, custom websites, and AI chatbots so people can judge style, pace, and quality right away."}
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium transition-colors hover:bg-white hover:text-[#101214]"
          >
            {isSpanish ? "Ver portafolio" : "View portfolio"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {/* The picture IS the product here, so this is the catalogue
            language rather than a static grid: one strip you push sideways,
            the way a streaming service shows a library. Same six items, same
            words, same links — a horizontal rail instead of a 3-up grid that
            already ran out of room at two rows on a phone.

            next/image is preserved through the kit's `media` slot, which
            exists precisely so a consumer keeps its framework's optimised
            image. Swapping to a bare <img> here would have traded LCP on the
            most-visited page of the site for a tidier diff. */}
        <div className="em-on-dark em-cartel mt-8">
          <HomePortfolioRail
            locale={locale}
            items={items.map((item) => {
              const poster = getPoster(item);
              const targetHref =
                item.category === "web-design"
                  ? isSpanish
                    ? "/es/diseno-web-fort-lauderdale"
                    : "/services/website-design-fort-lauderdale"
                  : `${href}/${item.id}`;
              return {
                id: item.id,
                href: targetHref,
                title: item.title,
                eyebrow: categoryLabels[locale][item.category],
                location: item.location,
                poster,
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}
