-- Apply through the existing Supabase migration lane before enabling
-- ESTEBAN_LEAD_OUTCOME_SCHEMA_V1=1 in the deployment environment.
--
-- `esteban_leads` is the immutable inquiry/source record. Lifecycle changes
-- append here instead of overwriting it, so the eventual source -> qualified
-- -> booked -> won/lost report has an auditable join and no public write path.

alter table public.esteban_leads
  add column if not exists found_via text;

alter table public.esteban_leads
  drop constraint if exists esteban_leads_found_via_check;

alter table public.esteban_leads
  add constraint esteban_leads_found_via_check
  check (found_via is null or found_via in (
    'chatgpt', 'other_ai', 'google_search', 'google_maps', 'instagram', 'referral', 'other'
  ));

create table if not exists public.esteban_lead_outcomes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.esteban_leads(id) on delete restrict,
  stage text not null check (stage in ('qualified', 'booked', 'won', 'lost')),
  value_cents bigint check (value_cents is null or value_cents >= 0),
  currency char(3),
  recorded_at timestamptz not null default now(),
  check ((value_cents is null and currency is null) or (value_cents is not null and currency ~ '^[A-Z]{3}$')),
  check (stage = 'won' or value_cents is null)
);

create index if not exists esteban_lead_outcomes_lead_recorded_idx
  on public.esteban_lead_outcomes (lead_id, recorded_at desc);

alter table public.esteban_lead_outcomes enable row level security;

-- No public policies: only the existing server-side service-role path may
-- record or read outcomes. Service roles bypass RLS without broadening anon.
