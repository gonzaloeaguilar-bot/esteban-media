# CTO review spec: Esteban conversion and citation helpers

Review the current branch for regressions and missing proof. The implementation adds:

- A shared `ServiceInquiryRail` in `components/service-depth.tsx`.
- Service-specific quote/contact rails on eight English priority service pages.
- Buyer quote-question cards on `/guides`.
- Updated `public/llms.txt` discovery prompts.
- Google Business Profile and neutral-index follow-up docs in `.ai/`.
- Test coverage for service pages, guide routes, llms.txt, analytics events, and Spanish raw text parity.

Acceptance:

- The shared inquiry rail must expose WhatsApp, email, phone, and proof links with service-specific `data-cta` attributes.
- The eight priority service pages must use the shared component rather than one-off markup.
- The guides page must expose high-intent quote questions without disrupting the protected Spanish route outline.
- `llms.txt` must contain only visible, truthful service prompts and current contact details.
- No fake reviews, fake prices, fake guarantees, or unsupported service claims should be introduced.
- Verification evidence should include `pnpm check` and the rendered local server checks for `/services/short-form-video-editor-miami`, `/guides`, and `/llms.txt`.
