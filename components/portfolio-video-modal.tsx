"use client";

import { useEffect } from "react";
import { ArrowRight, Send, X } from "lucide-react";
import { site } from "@/lib/site";

interface PortfolioVideoModalProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  locale?: "en" | "es";
}

export function PortfolioVideoModal({
  videoId,
  title,
  isOpen,
  onClose,
  locale = "en",
}: PortfolioVideoModalProps) {
  const isEs = locale === "es";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#101214] text-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="font-serif text-lg font-semibold text-white truncate max-w-xl">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEs ? "Cerrar video" : "Close video player"}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* IFRAME EMBED PLAYER */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>

        {/* FOOTER CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4 bg-[#181a1d]">
          <p className="text-xs text-[#d8d0c7]">
            {isEs
              ? "Trabajo publicado del portafolio verificado de Esteban Moreno."
              : "Published work from Esteban Moreno's verified portfolio."}
          </p>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              isEs
                ? `Consulta sobre proyecto similar a: ${title}`
                : `Inquiry regarding project similar to: ${title}`
            )}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-xs font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
          >
            <Send className="size-3.5" aria-hidden="true" />
            {isEs ? "Cotizar Proyecto Similar" : "Scope Similar Project"}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
