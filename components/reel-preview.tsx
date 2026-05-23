import { Play } from "lucide-react";

export function ReelPreview({
  title = "Sample reel",
  location = "Fort Lauderdale",
  label = "Awaiting real media",
}: {
  title?: string;
  location?: string;
  label?: string;
}) {
  return (
    <figure className="relative mx-auto aspect-[9/14] w-full max-w-[25rem] overflow-hidden rounded-lg bg-[#2d140d] text-[#f6f1ea] shadow-2xl shadow-black/15">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,#d06f38_0%,#6e2b18_45%,#130806_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(0deg,transparent_0,transparent_96%,rgba(255,255,255,.25)_100%)] [background-size:100%_28px]" />
      <div className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs uppercase">
        {location}
      </div>
      <div className="absolute right-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs">
        0:38
      </div>

      <div className="absolute left-1/2 top-[42%] grid size-52 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f5e3c8] shadow-[0_0_0_12px_rgba(0,0,0,.55)] sm:size-64">
        <div className="size-28 rounded-full bg-[#cf6a2c] sm:size-36" />
        <div className="absolute right-16 top-24 size-10 rounded-full bg-[#efae4e] sm:right-20 sm:top-32 sm:size-14" />
        <div className="absolute left-24 top-24 size-5 rounded-full bg-[#5c9c46] sm:left-28 sm:top-32" />
        <div className="absolute grid size-14 place-items-center rounded-full bg-[#f6f1ea] text-[#101214] shadow-lg">
          <Play className="size-5 fill-current" aria-hidden="true" />
        </div>
      </div>

      <figcaption className="absolute inset-x-5 bottom-5">
        <div className="text-xs uppercase text-[#f6f1ea]/70">@steeban1</div>
        <div className="mt-2 font-serif text-xl">{title}</div>
        <div className="mt-3 inline-flex rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[0.68rem] uppercase text-[#f6f1ea]/80">
          {label}
        </div>
      </figcaption>
    </figure>
  );
}
