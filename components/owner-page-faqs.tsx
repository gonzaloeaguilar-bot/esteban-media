import { ServiceFaqs } from "@/components/service-depth";
import { OWNER_PAGE_FAQS, ownerPageFaqs } from "@/lib/owner-page-faqs";

/**
 * The buyer-question FAQs a page owns (lib/owner-page-faqs.ts), rendered with
 * the shared ServiceFaqs/RailFaq block: native <details>, server-rendered, so
 * the answers are in the raw HTML for answer engines and stay folded for
 * people. Telemetry comes from RailFaq's data-rail-faq source.
 *
 * Renders nothing for a path with no entry.
 */
export function OwnerPageFaqs({ path }: { path: string }) {
  const faqs = ownerPageFaqs(path);
  if (faqs.length === 0) return null;
  const es = OWNER_PAGE_FAQS[path]?.locale === "es";
  return (
    <ServiceFaqs
      heading={es ? "¿Qué preguntan antes de contratar?" : "What do buyers ask before booking?"}
      eyebrow={es ? "Precios y alcance" : "Prices and scope"}
      sectionId="owner-page-faqs"
      collapsible
      faqs={faqs.map(({ question, answer }) => ({ question, answer }))}
    />
  );
}
