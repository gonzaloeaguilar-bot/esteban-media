import Link from "next/link";

import { ClosingCredits, PackagesSection } from "@/components/packages-section";
import { Container } from "@/components/ui/container";
import { entityIds } from "@/lib/entity-schema";
import { packagesJsonLd } from "@/lib/packages";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

const PATH = "/pricing";

export const metadata = buildPageMetadata({
  title: "Pricing & Packages — Video, Photo and Content",
  description:
    "What working with Esteban Moreno Media costs: four packages with starting prices, services you can book on their own, and how a written quote is put together.",
  path: PATH,
  locale: "en",
});

export default function PricingPage() {
  const url = absoluteUrl(PATH);
  const [catalog, faq] = packagesJsonLd("en", url, entityIds.business);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: "Pricing & Packages",
    description:
      "Starting prices for Esteban Moreno Media packages and individual services, plus the three-step quote process.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    breadcrumb: { "@id": `${url}#breadcrumbs` },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Pricing", item: url },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPage, breadcrumbs, catalog, faq]),
        }}
      />

      <section className="pt-12 pb-2 sm:pt-16">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Pricing
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-balance font-serif em-display">
            What it costs to work together
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#40474d] sm:text-lg">
            Every package below shows a starting price so you know the ballpark
            before you write to me. The final number depends on how much video
            you need, whether I film on location, and how fast you need it — so
            you always get a written quote for your own project.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-[#5a6066]">
            Want a number for your specific project right now? Use the{" "}
            <Link href="/calculator" className="underline hover:text-[#9f3c27]">
              budget calculator
            </Link>
            , or see{" "}
            <Link href="/services" className="underline hover:text-[#9f3c27]">
              every service
            </Link>
            .
          </p>
        </Container>
      </section>

      <PackagesSection locale="en" />
      <ClosingCredits locale="en" />
    </main>
  );
}
