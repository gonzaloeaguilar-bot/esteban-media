# Esteban Moreno Media: personal craft experience

## Brief

**Visitor:** a South Florida small-business owner, creator or event host who needs help turning an idea, occasion or existing footage into useful video and does not want to be passed through an agency process.

**Promise:** Esteban is the person who listens, helps shape the idea, and stays directly involved from the first conversation through the finished work. The page must make this personal, local-studio feeling clear without claiming unverified free extras, turnarounds, outcomes or prices.

**Primary action:** choose the relevant project path, then contact Esteban directly by WhatsApp, email or the existing project form.

**Friction:** visitors can currently see services and price context, but the homepage does not plainly explain why one direct creative partner can help connect a shoot, edit, social content and a custom website to a coherent business goal.

**Concept:** a quiet "one project, one creative partner" interlude between the portfolio proof and project chooser. It reads like a conversation with a small gallery's specialist: begin with the purpose, choose the right craft, leave with a practical next step. It is editorial and tactile, not a corporate-process graphic.

**Scope:** preserve the approved hero. Add one bilingual server-rendered homepage section, link only to existing services/portfolio/contact paths, reuse the existing typography, Container and button conventions, and retain existing review proof rather than manufacturing testimonials. Include a small native details disclosure for the wider set of services; the first visible screen has the direct promise and three short commitments.

**Acceptance:**

1. English and Spanish homepages render the section between portfolio proof and the chooser with no invented claims.
2. Initial HTML contains the promise, three commitments, relevant links and the native details copy in both languages.
3. The section is readable at 375x600, 390x844 and desktop; keyboard focus and native disclosure work; it contains no motion dependency.
4. Focused tests, lint, typecheck and build pass; page lastmod is refreshed if repository policy requires it.
5. Independent visual review and production verification remain separate release checks.

## Evidence gathered before build

- `curl -sSIL https://estebanmorenomedia.com` returned `HTTP/2 200` on 2026-10-28.
- `components/about-teaser.tsx` already states the verified direct-relationship scope: editing, AI-assisted creative, social planning and scoped production.
- `components/client-reviews.tsx` already renders source-linked public Google reviews; preserve that source instead of composing a new testimonial.
- `components/hero-video.tsx` has an approved, existing three-step process and must not be altered.

## Measurement

The intended outcome is a qualified project inquiry. Baseline is `UNKNOWN` in this task because no comparable current homepage-section exposure to submitted-lead cohort was read. After release, compare `home_contact_whatsapp`, `home_contact_email` and `lead_submit` by homepage path over comparable 14-day windows; retain only if inquiry quality does not regress. This implementation does not claim a conversion result.
