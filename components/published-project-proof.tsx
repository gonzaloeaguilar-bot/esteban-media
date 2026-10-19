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

export function PublishedProjectProof({ proof }: { proof: PublishedProjectProofInput }) {
  const resolved = resolvePublishedProjectProof(proof);
  if (!resolved) return null;

  return (
    <Link
      href={resolved.href}
      data-section="published-project-proof"
      data-cta={`published_project_proof_${resolved.id}`}
      className="group grid overflow-hidden rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] transition hover:border-[#c84a2c] sm:grid-cols-[minmax(0,1fr)_minmax(12rem,.72fr)]"
    >
      <span className="order-2 flex min-h-56 flex-col justify-between p-6 sm:order-1">
        <span>
          <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[#9f3c27]">
            {resolved.eyebrow}
          </span>
          <span className="mt-4 block font-serif text-3xl leading-tight text-[#101214]">
            {resolved.title}
          </span>
          <span className="mt-3 block text-sm leading-6 text-[#3f4548]">
            {resolved.description}
          </span>
        </span>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4">
          {resolved.linkLabel}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </span>
      <span className="relative order-1 min-h-52 bg-[#1c1f20] sm:order-2 sm:min-h-full">
        <Image
          src={resolved.poster}
          alt={`Published project: ${resolved.title}`}
          fill
          sizes="(min-width: 640px) 34vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-medium text-white">
          <Play className="size-3.5" aria-hidden="true" />
          {resolved.title}
        </span>
      </span>
    </Link>
  );
}
