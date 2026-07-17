import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { getFeaturedPortfolioItems, type PortfolioItem } from "@/lib/portfolio";

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
  },
  es: {
    animation: "Animación",
    "business-promos": "Promoción de negocios",
    "social-content": "Contenido social",
    events: "Eventos",
    editing: "Edición",
    narrative: "Narrativa",
  },
} as const;

function getPoster(item: PortfolioItem) {
  if ("poster" in item.media) {
    return { src: item.media.poster, alt: item.title };
  }

  if (item.media.kind === "image") {
    return { src: item.media.src, alt: item.media.alt };
  }

  return undefined;
}

export function PortfolioTeaser({ locale }: PortfolioTeaserProps) {
  const items = getFeaturedPortfolioItems(3).filter(
    (item) => item.status === "live",
  );
  const isSpanish = locale === "es";
  const href = isSpanish ? "/es/portafolio" : "/portfolio";

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-y border-[#ddd4c8] bg-[#101214] py-12 text-[#f6f1ea] sm:py-16"
      aria-labelledby={`selected-work-${locale}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase text-[#ffb49e]">
              {isSpanish ? "Trabajo seleccionado" : "Selected work"}
            </p>
            <h2
              id={`selected-work-${locale}`}
              className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
            >
              {isSpanish
                ? "Proyectos reales, disponibles para ver."
                : "Real projects, ready to watch."}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c9c1b8]">
              {isSpanish
                ? "Una selección del trabajo publicado de Esteban. Abre el portafolio para ver los videos y los créditos disponibles."
                : "A selection of Esteban's published work. Open the portfolio to watch the videos and review available credits."}
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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => {
            const poster = getPoster(item);

            return (
              <Link
                key={item.id}
                href={`${href}#${item.id}`}
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
                aria-label={`${isSpanish ? "Ver" : "View"} ${item.title}`}
              >
                <div className="relative aspect-video overflow-hidden bg-[#252a2d]">
                  {poster ? (
                    <Image
                      src={poster.src}
                      alt={poster.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : null}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#e85d3e] text-white">
                    <Play className="size-4 fill-current" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase text-[#ffb49e]">
                    {categoryLabels[locale][item.category]}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">
                    {item.title}
                  </h3>
                  {item.location ? (
                    <p className="mt-2 text-sm text-[#c9c1b8]">
                      {item.location}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
