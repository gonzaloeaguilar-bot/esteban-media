import Link from "next/link";
import {
  Plane,
  Camera,
  Video,
  Film,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

type Service = {
  slug: string;
  name: string;
  blurb: string;
  Icon: LucideIcon;
};

// Order matches Esteban's positioning: drone is *one* tool in a deep toolkit,
// not the lead. Photography → Videography → Aerial → Edit → Edit.
const SERVICES: Service[] = [
  {
    slug: "aerial",
    name: "Aerial / Drone",
    blurb: "Licensed drone capture for venues, properties, and brand films.",
    Icon: Plane,
  },
  {
    slug: "photography",
    name: "Photography",
    blurb: "Portraits, events, commercial, and lifestyle — studio or on-location.",
    Icon: Camera,
  },
  {
    slug: "videography",
    name: "Videography",
    blurb: "Brand films, promos, and social cutdowns scoped to your shoot.",
    Icon: Video,
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    blurb: "Story-first editing with professional color grading.",
    Icon: Film,
  },
  {
    slug: "photo-editing",
    name: "Photo Editing",
    blurb: "Retouching, color, and culling — bring your RAWs.",
    Icon: ImageIcon,
  },
];

export function ServicesStrip() {
  return (
    <section
      aria-labelledby="services-heading"
      className="border-y border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            What we do
          </p>
          <h2
            id="services-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            One studio. Capture and post, end to end.
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map(({ slug, name, blurb, Icon }) => (
            <li key={slug}>
              <Link
                href={`/services/${slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Icon
                  className="size-7 text-foreground/80 transition group-hover:text-foreground"
                  aria-hidden
                />
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
