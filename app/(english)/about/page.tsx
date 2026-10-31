import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  PlaySquare,
  Send,
  ShieldCheck,
} from "lucide-react";

import { AboutWhoIs } from "@/components/about-who-is";
import { ClientReviews } from "@/components/client-reviews";
import { OnSetMedia } from "@/components/on-set-media";
import { Container } from "@/components/ui/container";
import { buildProfilePageJsonLd } from "@/lib/entity-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";

const aboutDescription =
  "Meet Esteban Moreno, founder of Esteban Moreno Media in Fort Lauderdale. Spanish-first video editing, AI-assisted content, social planning, and scoped projects.";

export const metadata = buildPageMetadata({
  title: "About Esteban Moreno | Media Producer",
  description: "Esteban Moreno media production services in Miami, Florida.",
  path: "/about",
  locale: "en",
  type: "profile",
});

const principles = [
  "Personal, direct communication in Spanish, with intermediate English available.",
  "Real proof only. No invented logos, testimonials, or view-count promises.",
  "Published portfolio credits stay limited to the work that can be verified.",
];

const profilePageJsonLd = buildProfilePageJsonLd({
  path: "/about",
  name: "About Esteban Moreno",
  description: aboutDescription,
  language: "en-US",
});

export default function AboutPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageJsonLd),
        }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                About
              </p>
              <h1 className="mt-4 max-w-3xl font-serif em-display">
                Esteban Moreno: <span className="whitespace-nowrap">edit-led</span>, business-minded, personal by design.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban Moreno López is a Spanish-first video editor in Fort
                Lauderdale and the founder of{" "}
                <Link href="/" className="underline underline-offset-4 hover:text-[#9f3c27]">
                  Esteban Moreno Media
                </Link>
                . He edits Reels, TikToks, Shorts and longer videos for
                businesses and creators across South Florida, plans the
                content around them, and films on location when a project
                needs it. Most work is remote and personal: you talk to the
                person who edits your video.
              </p>
              <div className="mt-8 grid gap-3">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="flex gap-3 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4"
                  >
                    <ShieldCheck
                      className="mt-0.5 size-5 shrink-0 text-[#1a9fa3]"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-[#252a2d]">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={site.instagram}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
                <a
                  href={site.youtube}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <PlaySquare className="size-4" aria-hidden="true" />
                  YouTube
                </a>
                <a
                  href={site.linkedin}
                  rel="me"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <BriefcaseBusiness className="size-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
            <OnSetMedia
              primaryAlt="Esteban Moreno shooting with a Canon DSLR in a lit studio setup"
              primaryCaption="Behind the camera · Fort Lauderdale"
              secondaryAlt="Esteban Moreno working with the crew on a video production set"
              secondaryCaption="On set"
            />
          </div>
        </Container>
      </section>
      <ClientReviews locale="en" />
      <AboutWhoIs locale="en" path="/about" />
      {/* The directory and Spanish-hub links that used to open this page, kept
          for the internal-link graph and for readers who want them, in the
          footer area where they no longer push the person down the page. */}
      <section className="border-t border-[#ddd4c8] py-10">
        <Container size="xl">
          <h2 className="font-serif text-2xl">Directories, Spanish pages and guides</h2>
          <div className="mt-4 max-w-3xl space-y-4 text-sm leading-6 text-[#3f4548]">
            <p>
              Local coverage is detailed in the{" "}
              <Link href="/areas" className="underline underline-offset-4 hover:text-[#9f3c27]">
                service areas
              </Link>{" "}
              directory. Spanish-first visitors can review the{" "}
              <Link href="/es/servicios" className="underline underline-offset-4 hover:text-[#9f3c27]">
                video, website, and inquiry services overview
              </Link>{" "}
              before sharing a project. If the content plan is still taking shape, the Spanish{" "}
              <Link href="/es/evaluacion" className="underline underline-offset-4 hover:text-[#9f3c27]">
                Diagnóstico de Estrategia de Video
              </Link>{" "}
              can help clarify what to discuss first.
            </p>
            <p>
              His{" "}
              <Link href="/es/portafolio" className="underline underline-offset-4 hover:text-[#9f3c27]">
                selected work
              </Link>{" "}
              connects each selected project to its available credits and original video source. His Spanish{" "}
              <Link href="/es/guias" className="underline underline-offset-4 hover:text-[#9f3c27]">
                practical video guides
              </Link>{" "}
              cover project preparation, published starting rates are outlined under{" "}
              <Link href="/es/precios" className="underline underline-offset-4 hover:text-[#9f3c27]">
                precios y paquetes
              </Link>
              , and regional businesses can plan seasonal campaigns around major South Florida dates through his Spanish{" "}
              <Link href="/es/eventos" className="underline underline-offset-4 hover:text-[#9f3c27]">
                eventos del año
              </Link>{" "}
              hub.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
