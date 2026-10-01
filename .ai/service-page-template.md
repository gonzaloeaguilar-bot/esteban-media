# Esteban Service Page Template For AI Contributors

Use this template whenever Esteban or an AI assistant adds or expands a public
service page.

## Required Pattern

1. Put page-specific depth content in `lib/service-depth-content.ts`.
2. Render the page with the shared components from `components/service-depth.tsx`:
   - `ServiceCraft`
   - `ServiceFaqs`
   - `ServiceRelated`
   - `buildServiceFaqSchema`
3. Build FAQPage JSON-LD from the same `faqs` array that the page visibly
   renders. Do not keep a separate schema-only FAQ copy.
4. Keep major interactive or conversion sections attributable:
   - shared service-depth sections already include `data-section`
   - related service cards already include `data-cta`
   - new buttons or cards need either a Rail component or explicit `data-cta`
5. Use Rail/common components before hand-writing card grids, FAQ blocks,
   pricing cards, lists, tabs, sheets, CTAs, or repeated page sections.

## Copy Rules

- Do not invent prices, review counts, turnaround promises, rankings, client
  outcomes, certifications, or guarantees.
- Say what the client should send, what happens next, and what finished looks
  like in plain language.
- Keep the public copy client-facing. Do not use internal words such as lane,
  guardrail, proof, activation, readiness, UAT, or task-board labels.
- If a needed section does not fit existing Rail/common components, add the
  missing component to the shared library first, sync it into this repo, and use
  it here.

## Minimal Page Skeleton

```tsx
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { EXAMPLE_DEPTH } from "@/lib/service-depth-content";

const path = "/services/example-service";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildServiceFaqSchema(absoluteUrl(path), EXAMPLE_DEPTH.faqs),
    {
      "@type": "Service",
      "@id": absoluteUrl(`${path}#service`),
      name: "Example service",
      provider: { "@id": absoluteUrl("/#business") },
    },
  ],
};

export default function Page() {
  return (
    <main>
      {/* Hero and primary contact actions. */}
      <ServiceCraft
        heading={EXAMPLE_DEPTH.craftHeading}
        cards={EXAMPLE_DEPTH.craft}
        sectionId="example-craft"
      />
      <ServiceFaqs heading={EXAMPLE_DEPTH.faqHeading} faqs={EXAMPLE_DEPTH.faqs} />
      <ServiceRelated
        heading={EXAMPLE_DEPTH.relatedHeading}
        services={EXAMPLE_DEPTH.related}
      />
    </main>
  );
}
```

## Required Checks

Run at least:

```bash
pnpm exec vitest run app/__tests__/rail-adoption.test.ts app/__tests__/service-depth.test.ts
pnpm typecheck
```

