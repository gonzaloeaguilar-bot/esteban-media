import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { getPortfolioItemById, getPoster } from "@/lib/portfolio";

export type PublishedProjectProofInput = {
  href: string;
  title: string;
  description: string;
  eyebrow: string;
  linkLabel: string;
};

type ResolvedPublishedProjectProof = PublishedProjectProofInput & {
  id: string;
  poster: string;
};

const portfolioPath = /^\/(?:es\/)?port(?:folio|afolio)\/([a-z0-9-]+)$/;

/**
 * Resolves a proof card only from the site's published, local portfolio source.
 * A service can still use its text proof when it points anywhere else; this
 * prevents a generic image from becoming accidental evidence for a project.
 */
export function resolvePublishedProjectProof(
  proof: PublishedProjectProofInput,
): ResolvedPublishedProjectProof | null {
  const match = proof.href.match(portfolioPath);
  if (!match) return null;

  const item = getPortfolioItemById(match[1]);
  const poster = item ? getPoster(item) : undefined;

  if (!item || item.status !== "live" || !poster || !poster.startsWith("/portfolio/")) {
    return null;
  }

  return { ...proof, id: item.id, poster };
}

export function PublishedProjectProof({
  proof,
  compact = false,
}: {
  proof: PublishedProjectProofInput;
  compact?: boolean;
}) {
  const resolved = resolvePublishedProjectProof(proof);
  if (!resolved) return null;

  return (
    <Link
      href={resolved.href}
      data-section="published-project-proof"
      data-cta={`published_project_proof_${resolved.id}`}
      className={`group grid overflow-hidden rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] transition hover:border-[#c84a2c] ${compact ? "grid-cols-[minmax(7.5rem,.72fr)_minmax(0,1fr)]" : "sm:grid-cols-[minmax(0,1fr)_minmax(12rem,.72fr)]"}`}
    >
      <span className={`flex flex-col justify-between ${compact ? "order-2 p-4" : "order-2 min-h-56 p-6 sm:order-1"}`}>
        <span>
          <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[#9f3c27]">
            {resolved.eyebrow}
          </span>
          <span className={`${compact ? "mt-2" : "mt-4"} block font-serif ${compact ? "text-xl" : "text-3xl"} leading-tight text-[#101214]`}>
            {resolved.title}
          </span>
          <span className={`${compact ? "mt-2 text-xs leading-5" : "mt-3 text-sm leading-6"} block text-[#3f4548]`}>
            {resolved.description}
          </span>
        </span>
        <span className={`${compact ? "mt-3 text-xs" : "mt-6 text-sm"} inline-flex items-center gap-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4`}>
          {resolved.linkLabel}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </span>
      <span className={`relative bg-[#1c1f20] ${compact ? "order-1 min-h-full" : "order-1 min-h-52 sm:order-2 sm:min-h-full"}`}>
        <Image
          src={resolved.poster}
          alt={`Published project: ${resolved.title}`}
          fill
          sizes="(min-width: 640px) 34vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
        <span className={`${compact ? "bottom-2 left-2 px-2 py-1 text-[10px]" : "bottom-4 left-4 px-3 py-2 text-xs"} absolute inline-flex items-center gap-2 rounded-full bg-black/70 font-medium text-white`}>
          <Play className="size-3.5" aria-hidden="true" />
          {resolved.title}
        </span>
      </span>
    </Link>
  );
}
