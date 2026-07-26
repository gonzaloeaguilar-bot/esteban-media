import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Laptop, Mail, Phone, Bot, Sparkles, Layout, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Website Design Fort Lauderdale & Custom AI Chatbots",
  description:
    "High-converting custom website design, interactive web applications, and AI lead-capture chatbots for businesses in Fort Lauderdale, Miami, and South Florida.",
  path: "/services/website-design-fort-lauderdale",
  locale: "en",
});

export default function WebsiteDesignFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/website-design-fort-lauderdale#service"),
        name: "Website Design Fort Lauderdale & Custom AI Chatbots",
        description:
          "High-converting custom website design, web applications, and 24/7 AI lead capture chatbots for Fort Lauderdale and South Florida businesses.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Fort Lauderdale / Broward County / Miami-Dade / South Florida",
        serviceType: "Website Design & AI Chatbot Integration",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl("/services/website-design-fort-lauderdale#breadcrumbs"),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: absoluteUrl("/services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Website Design Fort Lauderdale",
            item: absoluteUrl("/services/website-design-fort-lauderdale"),
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/services/website-design-fort-lauderdale#faq"),
        mainEntity: [
          {
            "@type": "Question",
            name: "What makes Esteban Media's website design different?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We build complete high-converting digital engines. Instead of just static brochure websites, we integrate custom web design, mobile-first performance, video media assets, and 24/7 conversational AI lead capture chatbots.",
            },
          },
          {
            "@type": "Question",
            name: "How does the AI lead chatbot integration work on the website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our custom AI chatbots embed directly into your website or social messaging channels to answer customer questions 24/7, qualify incoming leads, capture contact info, and schedule appointments automatically.",
            },
          },
          {
            "@type": "Question",
            name: "Do you design websites for dealerships, fitness brands, and service businesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Our portfolio includes specialized platforms for auto dealerships (Frontline Auto, FLAS), high-performance fitness brands (TitanForge, Gains From Geebs), restaurants, and local service providers.",
            },
          },
          {
            "@type": "Question",
            name: "Are the websites mobile-friendly and bilingual (English/Spanish)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every site is engineered mobile-first for fast load times and can be built fully bilingual in English and Spanish to target South Florida's diverse audience.",
            },
          },
        ],
      },
    ],
  };

  const showcaseProjects = [
    {
      id: "titanforge",
      title: "TitanForge Platform & AI Bot",
      category: "Fitness & High-Performance Brand",
      description:
        "High-converting custom web architecture, interactive client intake, and integrated AI DM bot for automated lead qualification and client booking.",
      tags: ["Next.js Web App", "AI Lead Bot", "Client Intake"],
      href: "/portfolio/titanforge",
    },
    {
      id: "gains-from-geebs",
      title: "Gains From Geebs Web App & AI Bot",
      category: "Interactive Health Platform & AI Bot",
      description:
        "Interactive fitness platform and conversational AI DM bot designed for instant fitness coaching inquiries, workout plan guidance, and 24/7 lead qualification.",
      tags: ["Fitness AI Bot", "Custom Calculators", "Lead Qualification"],
      href: "/portfolio/gains-from-geebs",
    },
    {
      id: "front-line-auto",
      title: "Frontline Auto & AI Concierge",
      category: "Automotive Dealership Web Engine",
      description:
        "Full-service dealership web platform equipped with an intelligent 24/7 AI auto concierge bot for inventory inquiries and instant test drive scheduling.",
      tags: ["Dealership Inventory", "AI Auto Concierge", "Bilingual Support"],
      href: "/portfolio/front-line-auto",
    },
    {
      id: "flas-concierge",
      title: "Fort Lauderdale Auto Sale (FLAS AI Concierge)",
      category: "Car Dealership & AI BHPH Financing",
      description:
        "Dealership web platform and intelligent AI concierge bot built for Buy-Here-Pay-Here financing pre-qualification, vehicle inventory lookup, and instant lead capture.",
      tags: ["AI BHPH Bot", "Financing Calculators", "SMS Lead Engine"],
      href: "/portfolio/flas-concierge",
    },
    {
      id: "gonzalo-tech-chatbots",
      title: "Conversational AI Lead Chatbots (Geebs & FLAS)",
      category: "Conversational AI & Lead Automation",
      description:
        "Bespoke 24/7 conversational AI chatbots engineered for Geebs and Fort Lauderdale Auto Sale (FLAS) to automate customer inquiries, pre-qualify leads, and drive instant booked appointments.",
      tags: ["Geebs Coaching Bot", "FLAS Financing Bot", "24/7 AI Lead Capture"],
      href: "/portfolio/gonzalo-tech-chatbots",
    },
  ];

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
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
                Website Design Fort Lauderdale
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
                Web Design & AI Automation Vertical
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                Website Design & AI Lead Chatbots in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                We build high-converting custom websites, interactive web applications, and intelligent 24/7 AI lead capture chatbots for businesses in Fort Lauderdale, Miami, and South Florida. Turn site visitors into booked clients automatically.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Start Your Web Project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Proven Web Portfolio
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 shadow-sm">
              <Laptop className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">More Than Static Websites</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Modern business growth requires a complete digital engine: ultra-fast web pages, rich visual media, and intelligent AI lead chatbots that converse with customers 24/7.
              </p>
              <dl className="mt-6 grid gap-3">
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Service Vertical</dt>
                  <dd className="mt-1 font-serif text-xl">Website Design & AI Chatbots</dd>
                </div>
                <div className="rounded-md border border-[#ddd4c8] p-3">
                  <dt className="text-xs uppercase text-[#5a6066]">Service Area</dt>
                  <dd className="mt-1 font-serif text-xl">Fort Lauderdale / Miami-Dade / Broward</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Feature Pillar Breakdown */}
      <section className="border-b border-[#ddd4c8] py-14 sm:py-20">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Our Web Stack & Capabilities</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              High-Converting Web Systems Engineered For Local Business
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Layout className="size-8 text-[#e85d3e]" />
              <h3 className="mt-4 font-serif text-2xl">Custom Web Architecture</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Custom, clean, mobile-first websites tailored to your brand identity. Fast loading, responsive layouts, and zero bloat.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Bot className="size-8 text-[#e85d3e]" />
              <h3 className="mt-4 font-serif text-2xl">AI Conversational Lead Chatbots</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Intelligent AI chatbots trained on your business offerings. They qualify leads, answer FAQs, and collect contact info around the clock.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Sparkles className="size-8 text-[#e85d3e]" />
              <h3 className="mt-4 font-serif text-2xl">Media & Content Integration</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Seamless integration of promotional videos, visual graphics, and content strategy into your website for maximum conversion.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Showcase Grid */}
      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-14 sm:py-20">
        <Container size="xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Proven Portfolio Showcase</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Featured Web & AI Projects
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#101214] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#7f2f20]"
            >
              See All Portfolio Projects
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showcaseProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] transition hover:-translate-y-0.5 hover:border-[#e85d3e] hover:shadow-md"
              >
                <Link href={project.href} className="relative aspect-video overflow-hidden bg-[#101214]">
                  <Image
                    src={`/portfolio/${project.id}.jpg`}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-[#c84a2c] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {project.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl leading-tight text-[#101214]">
                    <Link href={project.href} className="hover:text-[#c84a2c]">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#3f4548]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#ebe3d7] px-2 py-0.5 text-xs text-[#5a6066]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-4 text-sm font-medium text-white transition hover:bg-[#a93e29]"
                  >
                    Explore Case Study & Results
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Target Industries */}
      <section className="py-14 sm:py-20">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
              <h2 className="font-serif text-3xl">Niche Industries We Serve</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Automotive Dealerships & BHPH:</strong> Inventory display, financing tools, and automated AI concierge booking.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Fitness, Coaching & Health Platforms:</strong> Client onboarding systems, custom calculators, and automated DM lead bots.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Restaurants & Hospitality Venues:</strong> Menu showcases, event promo integrations, and instant inquiry forms.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" />
                  <span><strong>Local Contractors & Professional Services:</strong> High-trust landing pages, client review showcases, and lead qualification.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
              <h2 className="font-serif text-3xl">Frequently Asked Questions</h2>
              <dl className="mt-6 space-y-6 text-sm text-[#252a2d]">
                <div>
                  <dt className="font-medium text-base text-[#101214]">How fast can a new website and AI chatbot launch?</dt>
                  <dd className="mt-2 leading-6">Most custom web design and AI chatbot implementations are delivered within 2 to 3 weeks depending on project scope and content readiness.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">Can the AI chatbot work in both English and Spanish?</dt>
                  <dd className="mt-2 leading-6">Yes! Our chatbots are fluent in both English and Spanish, allowing you to serve South Florida&apos;s bilingual customer base seamlessly.</dd>
                </div>
                <div>
                  <dt className="font-medium text-base text-[#101214]">Do you manage hosting and updates?</dt>
                  <dd className="mt-2 leading-6">We provide turn-key web deployment, ongoing performance monitoring, and chatbot updates as your business evolves.</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Footer */}
      <section className="pb-16 sm:pb-20">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-8 sm:p-12 text-center">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Get Started Today</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
              Ready to Upgrade Your Business Website & AI Lead Capture?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-[#252a2d]">
              Contact Esteban Media today for a scoping consultation on custom website design and AI chatbot automation in Fort Lauderdale and South Florida.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-8 text-base font-medium text-white hover:bg-[#a93e29]"
              >
                Schedule Scoping Call
                <ArrowRight className="size-5" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-base font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                <Mail className="size-5" />
                {site.email}
              </a>
              <a
                href={site.phone.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#101214] px-6 text-base font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                <Phone className="size-5" />
                {site.phone.display}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
