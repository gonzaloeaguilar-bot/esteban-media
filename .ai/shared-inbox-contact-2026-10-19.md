# Shared inbox public-contact migration — 2026-10-19

## Scope

Replace only the public business email with `info@estebanmorenomedia.com`.

## Evidence

- `curl -fsSL https://estebanmorenomedia.com/contact | rg -o 'mailto:[^"[:space:]]+'` returns personal-Gmail `mailto:` links today.
- `dig @dns1.registrar-servers.com +short MX estebanmorenomedia.com` returns the five Namecheap `eforward` MX hosts after the new `info` redirect was saved.
- `lib/site.ts` is the canonical public business identity source; its email feeds visible mail links and LocalBusiness/ContactPoint JSON-LD.

## Acceptance

- All public source-generated contact links, JSON-LD email values, `/llms.txt`, and the form-notification fallback use `info@estebanmorenomedia.com`.
- Business name, phone, Fort Lauderdale base, service areas, URLs, canonicals, and hreflang remain unchanged.
- `pnpm check` passes, followed by a production raw-HTML check of `/contact` after release.

## Boundary

The forwarding alias receives mail but cannot send as `info@…`; no automated reply or daily-report sender is enabled by this source change.
