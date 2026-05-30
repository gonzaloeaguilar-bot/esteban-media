// Single source of truth for homepage copy.
// EN-first. ES siblings flagged for native-speaker review (Gonzalo) before i18n
// wiring (see P1 next-intl task in backlog.md). Structure is intentionally
// shape-stable so moving to app/[locale]/page.tsx is mechanical.

export type ServiceSlug =
  | "aerial"
  | "photography"
  | "videography"
  | "video-editing"
  | "photo-editing";

export interface ServiceEntry {
  slug: ServiceSlug;
  icon:
    | "drone"
    | "camera"
    | "video"
    | "film"
    | "image";
  title: string;
  blurb: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  services: {
    eyebrow: string;
    heading: string;
    items: ServiceEntry[];
  };
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: { label: string; href: string };
  };
  contactCta: {
    heading: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Esteban Media · South Florida",
    headline: "We make things feel like a film.",
    sub: "Aerial, photography, videography, and post — full-service visual storytelling for brands, events, and properties across South Florida.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "See the work", href: "/services" },
  },
  services: {
    eyebrow: "What we shoot",
    heading: "Five disciplines, one visual language.",
    items: [
      {
        slug: "aerial",
        icon: "drone",
        title: "Aerial & drone",
        blurb:
          "FAA Part 107 aerial cinematography — properties, events, and reveals from the sky.",
      },
      {
        slug: "photography",
        icon: "camera",
        title: "Photography",
        blurb:
          "Portraits, events, commercial, and lifestyle — light shaped, moments held.",
      },
      {
        slug: "videography",
        icon: "video",
        title: "Videography",
        blurb:
          "Brand films, event coverage, and short-form social — shot to feel cinematic.",
      },
      {
        slug: "video-editing",
        icon: "film",
        title: "Video editing",
        blurb:
          "Edit, color, and sound design that turns raw footage into something that lands.",
      },
      {
        slug: "photo-editing",
        icon: "image",
        title: "Photo editing",
        blurb:
          "Retouching, color, and finish work — clean, consistent, print-ready.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    heading: "One storyteller. The full visual toolkit.",
    body: "Esteban is a South Florida visual storyteller working across drone, photo, video, and post. The drone is one tool — the work is in the eye, the edit, and the room the image creates for the story to land.",
    cta: { label: "More about Esteban", href: "/about" },
  },
  contactCta: {
    heading: "Got something to shoot?",
    body: "Tell us about the project — venue, dates, what you need delivered. We'll come back with a plan and a number.",
    primary: { label: "Start a project", href: "/contact" },
    secondary: { label: "Browse services", href: "/services" },
  },
};

/*
<!-- TRANSLATION REVIEW NEEDED — ES sibling pending native-speaker pass (Gonzalo).
     Do not AI-translate. Will be wired alongside P1 next-intl task. -->

export const homeContentEs: HomeContent = {
  hero: {
    eyebrow: "Esteban Media · Sur de Florida",
    headline: "Hacemos que se sienta como una película.",
    sub: "Aéreo, fotografía, video y postproducción — narrativa visual integral para marcas, eventos y propiedades en el sur de Florida.",
    primaryCta: { label: "Comenzar un proyecto", href: "/es/contacto" },
    secondaryCta: { label: "Ver el trabajo", href: "/es/servicios" },
  },
  // ...services / about / contactCta translations pending review.
};
*/
