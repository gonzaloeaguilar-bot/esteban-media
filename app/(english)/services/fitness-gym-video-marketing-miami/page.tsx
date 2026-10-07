import Link from "next/link";
import { ArrowRight, Video, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceDeepDive } from "@/components/service-depth";
import { GYM_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { PACKAGE_PRICES, usd } from "@/lib/pricing";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Fitness Gym Video Marketing Miami",
  description:
    "Gym, trainer and pilates studio video in Miami: what editing, on-site filming and a monthly plan cost, with prices from the published rate card.",
  path: "/services/fitness-gym-video-marketing-miami",
  locale: "en",
});

const starter = PACKAGE_PRICES.arranque;
const starterFrom = starter.kind === "from" ? usd(starter.amount) : "a custom quote";

export default function FitnessGymVideoMarketingMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/fitness-gym-video-marketing-miami#service"),
        name: "Fitness Gym Video Marketing Miami",
        description:
          "Dynamic gym video editing, fitness trainer Reels, and ad cuts for Miami health clubs and studios.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward",
        serviceType: "Fitness video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-[#9f3c27]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Fitness Gym Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Fitness & Gyms
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Fitness & Gym Video Marketing in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Video for gyms, personal trainers and yoga or pilates studios in
                Miami and Fort Lauderdale. Send phone clips and get vertical posts
                and short ads back, or book on-site filming. Editing starts from{" "}
                {starterFrom} per project; the prices below come from the published
                rate card.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Fitness Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What published work can a gym review?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                The fitness projects in the portfolio, <Link href="/portfolio/gains-from-geebs" className="underline decoration-[#e85d3e] underline-offset-4">Gains From Geebs</Link> and <Link href="/portfolio/titanforge" className="underline decoration-[#e85d3e] underline-offset-4">TitanForge</Link>, are web platforms and AI DM bots for coaching brands, not video. The closest filmed work is <strong>Healthy Smile Miami</strong>: social-media videos for a Miami dental clinic, filmed on location (video and sound) and edited by Esteban.
              </p>
              <Link
                href="/portfolio/healthy-smile"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review Healthy Smile Miami (dental clinic)
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceDeepDive
        id={GYM_DEEP_DIVE.id}
        title={GYM_DEEP_DIVE.title}
        destinations={GYM_DEEP_DIVE.destinations}
        sections={GYM_DEEP_DIVE.sections}
      />

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Want to drive new gym sign-ups?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw workout clips for editing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
