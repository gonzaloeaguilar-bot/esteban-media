import Image from "next/image";
import Link from "next/link";
import { EventSeasonLinks } from "@/components/event-content-page";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChartLine,
  ClipboardCheck,
  Laptop,
  MapPin,
  Workflow,
} from "lucide-react";

import { ClientReviews } from "@/components/client-reviews";
import { KeepReading } from "@/components/keep-reading";
import { serviceImages } from "@/lib/service-images";
import { ServicesScene } from "@/components/services-scene";
import { Container } from "@/components/ui/container";
import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import { VideoBriefBuilder } from "@/components/video-brief-builder";
import { entityIds } from "@/lib/entity-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  absoluteUrl,
  scopingQuestions,
  serviceAreas,
  services,
} from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Video Editing, Production & Websites for South Florida Businesses",
  description:
    "Choose video editing, South Florida production, or a website and follow-up system based on the footage, business goal, and next inquiry you need.",
  path: "/services",
  locale: "en",
});

const serviceProof: Record<
  string,
  { href: string; label: string; detail: string }
> = {
  editing: {
    href: "/portfolio/homeowners",
    label: "Homeowners",
    detail: "Published script and video-editing work.",
  },
  "ai-content": {
    href: "/portfolio/my-dler",
    label: "My D'ler",
    detail: "Related brand visuals, social designs, 3D video, and product mockups.",
  },
  "social-planning": {
    href: "/portfolio/ml-colombia",
    label: "ML Colombia",
    detail: "A published social-media video from Esteban's portfolio.",
  },
  "on-location": {
    href: "/portfolio/bar-door-monkey",
    label: "Bar Door Monkey Miami",
    detail: "Pre-production, location, videography, and editing in one project.",
  },
  "website-design": {
    href: "/portfolio/flas-concierge",
    label: "FLAS AI Concierge & Web System",
    detail: "Custom web platform and 24/7 AI lead capture concierge for an auto dealership.",
  },
};

const growthPillars = [
  {
    title: "Conversion websites",
    detail:
      "Mobile-first websites and focused landing pages designed around a clear offer, measured inquiry path, and the content your team needs to publish.",
    icon: Laptop,
    href: "/services/conversion-websites",
  },
  {
    title: "AI lead capture & lifecycle",
    detail:
      "Scoped chatbots, DM flows, email and SMS follow-up that route a new inquiry into the right human or next step. Consent and platform access are confirmed before launch.",
    icon: Bot,
    href: "/services/ai-lead-capture-automation",
  },
  {
    title: "Local presence",
    detail:
      "A practical plan for Google Business Profile, Maps, Apple, Yelp, industry marketplaces, and the pages that explain a local service clearly.",
    icon: MapPin,
    href: "/services/local-presence-seo",
  },
  {
    title: "Data & measurement audit",
    detail:
      "Audit the current journey, measurement, handoffs, and manual work before deciding which system should be built first.",
    icon: ChartLine,
    href: "/services/growth-funnel-audit",
  },
  {
    title: "Custom operations automation",
    detail:
      "Project-scoped integrations, reporting workflows, and AI-assisted operations that connect approved tools and keep a human escalation path.",
    icon: Workflow,
    href: "/services/custom-operations-automation",
  },
  {
    title: "Creative production",
    detail:
      "Video, photography, editing, and social assets that give the website, campaigns, and follow-up system something worth converting around.",
    icon: ClipboardCheck,
    href: "/services/creative-production",
  },
];

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/services#services"),
    name: "Growth systems and creative production services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(`/services#${service.id}`),
        provider: {
          "@id": entityIds.business,
        },
        areaServed: serviceAreas.map((area) => area.name),
      },
    })),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="xl:grid xl:grid-cols-2 xl:items-center xl:gap-10">
          <div>
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl font-serif em-display">
            Video editing, local production, and websites for clearer next steps.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Start with what is missing: finished video from footage you already
            have, a South Florida shoot to capture it, or a website that gives
            a new inquiry a clear next step.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#252a2d]">
            Need a local shoot in Broward? Read how{" "}
            <Link
              href="/services/video-production-fort-lauderdale"
              className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#7f2f20]"
            >
              video production in Fort Lauderdale
            </Link>{" "}
            separates filming from the editing that follows. Esteban can scope
            the work around the business goal, location, existing assets, and
            where the final piece will be used.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214]/30 px-6 text-sm font-medium text-[#101214] hover:bg-[#101214] hover:text-white"
            >
              See starting prices
            </Link>
          </div>
          </div>
          {serviceImages["on-location"] ? (
            <Image
              src={serviceImages["on-location"].src}
              alt={serviceImages["on-location"].alt}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 960px, 100vw"
              className="mt-8 aspect-[16/9] w-full rounded-lg object-cover xl:mt-0"
              style={{ objectPosition: serviceImages["on-location"].focal }}
            />
          ) : null}
          </div>

          <nav className="mt-10 grid gap-3 md:grid-cols-3" aria-label="Choose what you need">
            {[
              { href: "#editing", title: "I have footage to edit", detail: "Turn existing clips into videos ready to publish." },
              { href: "#on-location", title: "I need something filmed", detail: "Plan a local shoot for a property, business, or event." },
              { href: "/services/website-design-fort-lauderdale", title: "I need a website or follow-up help", detail: "Explore a site and a clearer path for new inquiries." },
            ].map((choice) => (
              <Link key={choice.title} href={choice.href} className="group flex min-h-36 flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]">
                <span className="font-serif text-2xl leading-tight">{choice.title}</span>
                <span className="mt-3 text-sm leading-6 text-[#252a2d]">{choice.detail}</span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">See how it works <ArrowRight className="size-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </nav>

          <section className="mt-10" aria-labelledby="starting-point-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Choose a starting point
            </p>
            <h2
              id="starting-point-heading"
              className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl"
            >
              Do you need an editor, a videographer, or a website?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                <h3 className="font-serif text-2xl">You already have footage</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  Start with editing when the clips exist but still need a clear
                  story, captions, pacing, sound, or versions sized for where
                  you plan to publish them.
                </p>
                <Link
                  href="/services/short-form-video-editor-miami"
                  className="mt-4 inline-flex text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#7f2f20]"
                >
                  Explore short-form editing
                </Link>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                <h3 className="font-serif text-2xl">The footage does not exist yet</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  Start with production when the business, product, property, or
                  event needs to be captured on location. The quote can separate
                  filming from the edits that follow.
                </p>
                <Link
                  href="/services/video-production-fort-lauderdale"
                  className="mt-4 inline-flex text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#7f2f20]"
                >
                  Explore local video production
                </Link>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                <h3 className="font-serif text-2xl">The inquiry path is unclear</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  Start with a website when people need a clearer explanation of
                  the offer and a simple way to take the next step after they
                  find your business.
                </p>
                <Link
                  href="/services/website-design-fort-lauderdale"
                  className="mt-4 inline-flex text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#7f2f20]"
                >
                  Explore website services
                </Link>
              </article>
            </div>
          </section>

          <details id="specific-service-pages" className="mt-8 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
            <summary className="cursor-pointer font-serif text-2xl">Looking for a specific type of video or photo?</summary>
            <p className="mt-2 text-sm leading-6 text-[#252a2d]">Reels, real estate, local production, product visuals, and other focused service pages.</p>
          <section className="mt-10" aria-labelledby="quick-service-paths-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Fast paths
            </p>
            <h2
              id="quick-service-paths-heading"
              className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl"
            >
              Already know what you need?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/services/video-production-fort-lauderdale",
                  title: "Plan video in Fort Lauderdale",
                  detail:
                    "Local business video, Reels, website clips, and production planning around Broward projects.",
                },
                {
                  href: "/services/reels-editor-fort-lauderdale",
                  title: "Edit Fort Lauderdale Reels",
                  detail:
                    "Short-form editing for local business footage, captions, safe zones, and clear next steps.",
                },
                {
                  href: "/services/reels-editor-miami",
                  title: "Edit Miami Reels",
                  detail:
                    "Vertical social videos for Miami business clips, products, restaurants, and ad variations.",
                },
                {
                  href: "/services/real-estate-reels-video-editor-south-florida",
                  title: "Edit listing Reels",
                  detail:
                    "Property walkthroughs, agent clips, drone footage, and listing-safe short videos.",
                },
                {
                  href: "/services/short-form-video-editor-miami",
                  title: "Edit reels, TikToks, or Shorts",
                  detail:
                    "Remote short-form editing for supplied footage, captions, pacing, and platform-safe crops.",
                },
                {
                  href: "/services/ai-product-photography-miami",
                  title: "Create AI product visuals",
                  detail:
                    "Ecommerce product images and lifestyle concepts built from accurate product references.",
                },
                {
                  href: "/services/product-photography-miami",
                  title: "Photograph real products",
                  detail:
                    "Plan a product shoot for ecommerce, website, and social images in Miami or Broward.",
                },
                {
                  href: "/services/ai-real-estate-photo-enhancement",
                  title: "Enhance real estate photos",
                  detail:
                    "Remote listing photo improvement that keeps property details truthful and readable.",
                },
              ].map((path) => (
                <Link
                  key={path.href}
                  href={path.href}
                  className="group rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]"
                >
                  <h3 className="font-serif text-2xl">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {path.detail}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                    Open service page
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>
          </details>

          <details id="business-systems" className="mt-8 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
            <summary className="cursor-pointer font-serif text-2xl">Need a wider business system?</summary>
            <p className="mt-2 text-sm leading-6 text-[#252a2d]">Explore websites, inquiry follow-up, local presence, measurement, and automation.</p>
          <section className="mt-12" aria-labelledby="growth-systems-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Websites, chatbots and systems
            </p>
            <h2
              id="growth-systems-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              What else can Esteban build for a business?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Start with what you need the work to do: more inquiries you can
              actually answer, a clearer local presence, less manual follow-up,
              or a simple way to see what is working. I build the website, the
              lead capture, the follow-up automation and the video content
              around them, each piece scoped in writing before it starts.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-[#252a2d]" data-section="web-line-proof">
              Websites, landing pages and AI chatbots are a published part of the work:{" "}
              <Link href="/portfolio/titanforge" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">TitanForge</Link>, <Link href="/portfolio/gains-from-geebs" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Gains From Geebs</Link>, <Link href="/portfolio/front-line-auto" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Frontline Auto</Link>, <Link href="/portfolio/flas-concierge" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">Fort Lauderdale Auto Sale</Link> and the{" "}
              <Link href="/portfolio/ai-lead-automation" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">two AI lead chatbots</Link>. The{" "}
              <Link href="/services/website-design-fort-lauderdale" data-cta="services_web_line" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">website and chatbot design page</Link>{" "}
              explains what each project includes. For one piece on its own, see the{" "}
              <Link href="/services/ai-chatbot-for-small-business" data-cta="services_web_chatbot" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">AI chatbot for small business</Link>{" "}
              or{" "}
              <Link href="/services/landing-page-design" data-cta="services_web_landing" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">landing page design</Link>.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-[#252a2d]">
              {growthPillars.length} building blocks, each scoped on its own.
              Most businesses need one or two of them, not all of them, and the
              timing depends on the scope we confirm in writing, the material
              you already have, and your review rounds.
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-[#252a2d]">
              If you are still deciding what to ask for, start with the{" "}
              <Link
                href="/assessment"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                video strategy diagnostic
              </Link>{" "}
              before sending the project brief.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {growthPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    href={pillar.href}
                    key={pillar.title}
                    className="rounded-lg border border-[#ddd4c8] bg-white/50 p-5 transition hover:-translate-y-0.5 hover:border-[#e85d3e] hover:shadow-sm"
                  >
                    <Icon className="size-6 text-[var(--em-accent-ink)]" aria-hidden="true" />
                    <h3 className="mt-4 font-serif text-2xl">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                      {pillar.detail}
                    </p>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/services/website-design-fort-lauderdale"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4"
            >
              Explore the current website and AI lead-capture work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <p className="mt-5 max-w-3xl leading-7 text-[#252a2d]">
              Running a creative agency or production studio that needs another
              editing bench?{" "}
              <Link
                href="/services/white-label-video-editing-for-agencies"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                White-label video editing for agencies
              </Link>{" "}
              explains how overflow production is scoped, priced, and handed
              back under your brand.
            </p>
          </section>
          </details>

          <section className="mt-14" aria-labelledby="creative-production-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Creative production
            </p>
            <h2 id="creative-production-heading" className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
              What does creative production include?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Short video editing and photography remain the creative fuel for
              the system. Each service below shows its starting price; every
              project still gets a scoped quote. Looking for what it costs as a
              bundle? The{" "}
              <Link
                href="/pricing"
                className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
              >
                pricing and packages page
              </Link>{" "}
              shows the starting price for each package.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              const proof = serviceProof[service.id];
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-3xl leading-tight">
                        {service.name}
                      </h2>
                      <p className="mt-3 leading-7 text-[#252a2d]">
                        {service.description}
                      </p>
                      {service.startingPrice ? (
                        <p className="em-price">
                          {service.startingPrice} — every project gets a scoped
                          quote.
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {serviceImages[service.id] ? (
                    /* A real frame from his own work. Services with no honest
                       frame get none — a decorative mismatch costs more than a
                       missing image. */
                    <Image
                      src={serviceImages[service.id].src}
                      alt={serviceImages[service.id].alt}
                      width={1200}
                      height={675}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="mt-5 h-44 w-full rounded-lg object-cover"
                      style={{ objectPosition: serviceImages[service.id].focal }}
                    />
                  ) : null}
                  <ul className="mt-6 space-y-3 text-sm text-[#252a2d]">
                    <li className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                        aria-hidden="true"
                      />
                      <span>{service.detail}</span>
                    </li>
                  </ul>
                  {service.id === "website-design" ? (
                    <Link
                      href="/services/website-design-fort-lauderdale"
                      className="group mt-6 block rounded-md border border-[#ddd4c8] bg-white/50 p-4 hover:border-[#e85d3e]"
                    >
                      <span className="text-xs font-medium uppercase text-[#5a6066]">
                        Website services
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl">
                        See websites and chatbots
                        <ArrowRight
                          className="size-4 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  ) : proof ? (
                    <Link
                      href={proof.href}
                      className="group mt-6 block rounded-md border border-[#ddd4c8] bg-white/50 p-4 hover:border-[#e85d3e]"
                    >
                      <span className="text-xs font-medium uppercase text-[#5a6066]">
                        Related published work
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl">
                        {proof.label}
                        <ArrowRight
                          className="size-4 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#5a6066]">
                        {proof.detail}
                      </span>
                    </Link>
                  ) : null}
                </article>
              );
            })}
            </div>
          </section>

          <details id="guided-video-brief" className="mt-12 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
            <summary className="cursor-pointer font-serif text-2xl">Want help describing your video project?</summary>
            <p className="mt-2 text-sm leading-6 text-[#252a2d]">Answer four questions about your footage, format, and contact details.</p>
          <div className="mt-6">
            <VideoBriefBuilder locale="en" />
          </div>
          </details>
          {/* Un respiro entre dos tramos largos de texto. Queda FUERA del
              plegado: es la parte que se mira, no la que se lee. */}
          <ServicesScene locale="en" />
          {/* Everything below only supports READING: how remote and local work
              compare, the scoping questions, and the page directory. One
              fold-out, destinations named. Collapsed is not removed — the
              words stay in the served HTML for every crawler. The JSON-LD
              service anchors (#editing, #ai-content…) stay OUTSIDE, above. */}
          <KeepReading
            id="how-we-work"
            title="How does working with Esteban work?"
            destinations="Remote or on location, the four scoping questions, and every page by project type and South Florida area."
          >
          <section className="mt-10" aria-labelledby="delivery-model-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Remote or on location
            </p>
            <h2
              id="delivery-model-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Do you need to be in South Florida?
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <Laptop className="size-7 text-[#1a9fa3]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Remote-first work</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Editing, AI-assisted creative, and social planning can begin
                  with existing footage, references, and the publishing goal.
                  The client does not need to be in South Florida for those
                  services.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#editing">
                    Video editing
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#ai-content">
                    AI-assisted content
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#social-planning">
                    Social planning
                  </Link>
                </div>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-7 text-[#e85d3e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">South Florida capture</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Fort Lauderdale and Broward are the local base. Selected
                  Miami-Dade projects are available, while Palm Beach County
                  remains an expansion area considered by project.
                </p>
                <Link
                  href="/areas"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Compare service areas
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="process-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Scoping questions
            </p>
            <h2
              id="process-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              What defines the scope of a project?
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {scopingQuestions.map((question, index) => (
                <li
                  key={question.name}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <span className="text-xs font-medium uppercase text-[#9f3c27]">
                    Question {index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl">{question.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {question.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10" aria-labelledby="pages-by-project-type-heading">
            <h2
              id="pages-by-project-type-heading"
              className="max-w-3xl font-serif text-4xl leading-tight"
            >
              Which page covers your project type and area?
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
              Editing, drone and real estate, restaurants, clinics, events,
              e-commerce and more, by South Florida city and county.
            </p>
            <ServiceLandingDirectory />
          </section>
          </KeepReading>

          <div className="-mx-4 mt-14 sm:-mx-6 lg:-mx-8">
            <ClientReviews locale="en" />
          </div>

          <div className="mt-14 rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">Not sure which service fits?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Send the project goal, location, date, and where the final asset
              will be used. Esteban can shape the scope from there.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/assessment"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Try the diagnostic
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                View published work
              </Link>
              <Link
                href="/guides"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Read practical video guides
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <EventSeasonLinks locale="en" path="/services" />
    </main>
  );
}
