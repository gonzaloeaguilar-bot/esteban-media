"use client";

import Image from "next/image";
import { ExternalLink, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PortfolioVideoProps {
  videoId: string;
  url: string;
  poster: string;
  title: string;
  locale: "en" | "es";
}

export function PortfolioVideo({
  videoId,
  url,
  poster,
  title,
  locale,
}: PortfolioVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const restorePlayFocus = useRef(false);
  const playLabel = locale === "es" ? `Reproducir ${title}` : `Play ${title}`;
  const watchLabel = locale === "es" ? "Ver en YouTube" : "Watch on YouTube";
  const loadedLabel =
    locale === "es" ? `Reproductor cargado: ${title}` : `Player loaded: ${title}`;

  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.focus();
    } else if (restorePlayFocus.current) {
      restorePlayFocus.current = false;
      playButtonRef.current?.focus();
    }
  }, [isPlaying]);

  function closePlayer() {
    restorePlayFocus.current = true;
    setIsPlaying(false);
  }

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-t-xl bg-[#101214]">
        <iframe
          ref={playerRef}
          tabIndex={-1}
          loading="lazy"
          className={`absolute inset-0 size-full border-0 transition-opacity ${
            isPlaying ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?playsinline=1&rel=0${
            isPlaying ? "&autoplay=1" : ""
          }`}
          title={title}
          aria-hidden={!isPlaying}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        {!isPlaying ? (
          <button
            ref={playButtonRef}
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 size-full cursor-pointer overflow-hidden text-left focus-visible:outline-white"
            aria-label={playLabel}
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10 transition group-hover:from-black/65"
              aria-hidden="true"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#101214] shadow-xl transition group-hover:scale-105 group-hover:bg-white sm:size-18">
                <Play className="ml-1 size-6 fill-current" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {playLabel}
            </span>
          </button>
        ) : null}
        {isPlaying ? (
          <button
            type="button"
            onClick={closePlayer}
            className="absolute right-3 top-3 z-10 inline-flex min-h-10 items-center gap-2 rounded-full bg-black/75 px-3 text-xs font-medium text-white backdrop-blur-sm hover:bg-black"
            aria-label={locale === "es" ? `Cerrar ${title}` : `Close ${title}`}
          >
            <X className="size-4" aria-hidden="true" />
            {locale === "es" ? "Cerrar" : "Close"}
          </button>
        ) : null}
      </div>

      <p className="sr-only" role="status">
        {isPlaying ? loadedLabel : ""}
      </p>

      <div className="px-5 sm:px-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e]/40 underline-offset-4 transition hover:text-[#e85d3e]"
        >
          {watchLabel}
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
