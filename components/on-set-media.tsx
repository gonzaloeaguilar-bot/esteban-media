import Image from "next/image";

/**
 * Real approved photos of Esteban at work, shown on the About page.
 * Replaces the earlier illustrated `ReelPreview` placeholder. Alt text and
 * captions are passed per locale so the copy stays translated.
 */
export function OnSetMedia({
  primaryAlt,
  primaryCaption,
  secondaryAlt,
  secondaryCaption,
}: {
  primaryAlt: string;
  primaryCaption: string;
  secondaryAlt: string;
  secondaryCaption: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[25rem] space-y-4">
      <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#2d140d] shadow-2xl shadow-black/15">
        {/* Short, muted, looping clip of Esteban shooting; the studio still is
            the poster so it paints instantly and is the reduced-motion/no-JS
            fallback. */}
        <video
          className="absolute inset-0 size-full object-cover object-[center_34%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/about/esteban-on-set.jpg"
          aria-label={primaryAlt}
        >
          <source src="/about/esteban-on-set.mp4" type="video/mp4" />
        </video>
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 text-xs font-medium uppercase tracking-wide text-[#f6f1ea]">
          {primaryCaption}
        </figcaption>
      </figure>
      <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#ddd4c8]">
        <Image
          src="/about/esteban-on-location.jpg"
          alt={secondaryAlt}
          fill
          sizes="(min-width: 1024px) 400px, calc(100vw - 32px)"
          className="object-cover"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3 text-[0.68rem] font-medium uppercase tracking-wide text-[#f6f1ea]">
          {secondaryCaption}
        </figcaption>
      </figure>
    </div>
  );
}
