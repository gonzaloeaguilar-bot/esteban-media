# Outbound email: what has to be true before the first message goes out

Measured live on 2026-10-06. Re-measure before trusting any line here —
`node scripts/outreach-preflight.mjs` does exactly that and exits 1 with the
reasons when something is missing.

## What the preflight found on 2026-10-06

```
domain          estebanmorenomedia.com
postal address  MISSING (ESTEBAN_POSTAL_ADDRESS)
reply/opt-out   NOT HONOURED — no reply-processor state
drafts          57

PREFLIGHT BLOCKED — 5 distinct reasons:
  x 40  no physical postal address: commercial email requires one
  x 40  reply-based opt-out is not being processed
  x  1  replies to this outreach would bounce
  x  1  estebanmorenomedia.com has no SPF record
  x  1  estebanmorenomedia.com has no DMARC record
```

The gate is not decoration: pointed at `fortlauderdaleautosales.com`, which has
MX, SPF and DMARC, with an address configured and the reply consumer fresh, the
same 40 drafts return `PREFLIGHT PASS` and exit 0.

## The DNS state, verified with dig

| record | apex `estebanmorenomedia.com` | `send.estebanmorenomedia.com` |
|---|---|---|
| MX | **none** | `feedback-smtp.us-east-1.amazonses.com` |
| SPF | **none** | `v=spf1 include:amazonses.com ~all` |
| DMARC | **none** | n/a |
| DKIM | `resend._domainkey` present | — |

Two consequences, and they are the whole problem:

1. **Resend was verified on the `send.` subdomain, but the code sends `From:
   contact@estebanmorenomedia.com` — the apex.** The apex has no SPF and no
   DKIM selector, so the From domain cannot be authenticated. Receivers see a
   message claiming to be from a domain that publishes no sending policy.
2. **The apex has no MX at all.** Nobody can email `contact@estebanmorenomedia.com`
   and nobody can reply to outreach sent from it. A reply-based opt-out is only
   a valid opt-out if the reply arrives. Today it would bounce.

Nameservers are Namecheap (`dns1.registrar-servers.com`), so these records are
changed in the Namecheap DNS panel. There is no Namecheap API credential on
this machine.

## The records to add

Pick one mailbox provider first; the MX and SPF lines depend on it.

### If Google Workspace (recommended, paid)

| type | host | value | TTL |
|---|---|---|---|
| MX | `@` | `1 smtp.google.com` | auto |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | auto |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:esmolopez@gmail.com` | auto |
| TXT | `google._domainkey` | the DKIM value Workspace generates (Apps > Gmail > Authenticate email) | auto |

### If Zoho Mail (free tier, one domain)

| type | host | value |
|---|---|---|
| MX | `@` | `10 mx.zoho.com` |
| MX | `@` | `20 mx2.zoho.com` |
| MX | `@` | `50 mx3.zoho.com` |
| TXT | `@` | `v=spf1 include:zoho.com ~all` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:esmolopez@gmail.com` |
| TXT | `zmail._domainkey` | the DKIM value Zoho generates |

Start DMARC at `p=none` and read the reports for two weeks before moving to
`p=quarantine`. Going straight to a strict policy on a domain with no sending
history breaks mail you did not know you were sending.

**Do not keep the Resend `send.` subdomain and the apex both live as sending
identities.** One domain sends; the other is dead weight that splits reputation.

## Why the message format is what it is

A styled HTML template with a logo, a button and a bulk unsubscribe footer is
the shape of a marketing campaign, and Gmail files campaigns under Promotions.
That is correct behaviour on Gmail's part — the problem is that 1:1 B2B
outreach was being written in campaign format in the first place.

`lib/plain-outreach-email.mjs` writes what a person actually sends: text/plain,
40–160 words, one ask, at most one raw link, a lowercase specific subject, a
real signature, and a detail observed about that specific business. The gate in
`lib/outreach-send-gate.mjs` refuses anything else, including two messages in
one batch sharing an identical body — if the message is genuinely written for
that business, two of them cannot be byte-identical.

Nothing about compliance is traded for this. Every message still carries a real
physical postal address and a working opt-out, because the mail is commercial.

### The opt-out is a reply, and that is load-bearing

The footer says "reply and I won't write again" rather than carrying a
`List-Unsubscribe` header. That is a legitimate CAN-SPAM opt-out mechanism
**only if we honour it**. The gate therefore refuses to send unless a reply
processor has run in the last 48 hours and written
`~/.claude/state/esteban-outreach/reply-processor-last-run.json`. Until that
consumer exists and runs, the lane stays blocked by design.

## Volume

The default cap is 40 messages a day and the gate enforces it. A new sending
identity that opens at 500/day gets classified as bulk on day one and never
recovers. Ramp: ~20/day for the first week, then 40.

## Open decisions that are not ours to make

- **Which mailbox.** Google Workspace is ~$7.20/user/month; Zoho's free tier is
  $0. Both fix the DNS state. This is a spend decision.
- **The physical postal address.** CAN-SPAM requires a real mailing address and
  it will be visible in every message. It must not be Esteban's home address —
  a P.O. box or CMRA. Nobody can invent this.
- **Which identity sends.** A brand-new domain has no sending reputation.
  Esteban's existing personal Gmail has years of it, and for cold 1:1 outreach
  at 20–40/day it is the more likely Primary placement. The brand address is
  better for the long run but worse for the first month.
