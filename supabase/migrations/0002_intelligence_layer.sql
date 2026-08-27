-- Deterministic citizen-intelligence layer. All seeded records are fictional.
alter table public.authorities add column if not exists jurisdiction_type text not null default 'Central Government';
alter table public.authorities add column if not exists state text;
alter table public.authorities add column if not exists district text;
alter table public.authorities add column if not exists city text;
alter table public.authorities add column if not exists keywords text[] not null default '{}';
alter table public.authorities add column if not exists demo_only boolean not null default true;
alter table public.public_information add column if not exists topic text;
alter table public.public_information add column if not exists jurisdiction_type text;
alter table public.public_information add column if not exists location text;
alter table public.public_information add column if not exists year text;
alter table public.public_information add column if not exists keywords text[] not null default '{}';
alter table public.public_information add column if not exists demo_only boolean not null default true;

create table if not exists public.knowledge_items (
  id uuid primary key default gen_random_uuid(), title text not null, category text not null, topic text not null,
  information_type text not null, example_question text not null, example_request text not null,
  authority_category text not null, keywords text[] not null default '{}', explanation text not null,
  source_type text not null default 'Illustrative example', demo_only boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.rti_analysis (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade,
  original_question text not null, topic text not null, location text, year text, information_types text[] not null default '{}',
  jurisdiction text not null, recommended_authority_id uuid references public.authorities(id) on delete set null, created_at timestamptz not null default now()
);
create table if not exists public.readiness_checks (
  id uuid primary key default gen_random_uuid(), rti_analysis_id uuid not null references public.rti_analysis(id) on delete cascade,
  check_type text not null, passed boolean not null, message text not null, recommendation text, created_at timestamptz not null default now()
);
alter table public.knowledge_items enable row level security;
alter table public.rti_analysis enable row level security;
alter table public.readiness_checks enable row level security;
create policy "public read knowledge items" on public.knowledge_items for select using (true);
create policy "users read own analysis" on public.rti_analysis for select using (auth.uid() = user_id);
create policy "users create own analysis" on public.rti_analysis for insert with check (auth.uid() = user_id);
create policy "users read own readiness checks" on public.readiness_checks for select using (exists (select 1 from public.rti_analysis a where a.id = rti_analysis_id and a.user_id = auth.uid()));
