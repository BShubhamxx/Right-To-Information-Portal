-- RTI independent hackathon prototype: synthetic demo data only.
-- Apply with the Supabase CLI or SQL Editor before enabling the data-backed routes.

create extension if not exists pgcrypto;

create type public.rti_status as enum (
  'DRAFT', 'PAYMENT_PENDING', 'SUBMITTED', 'RECEIVED', 'UNDER_REVIEW',
  'SUPPORTING_DOCUMENT_REQUIRED', 'ADDITIONAL_FEE_REQUIRED', 'TRANSFERRED',
  'RESPONSE_RECEIVED', 'RESPONSE_OVERDUE', 'APPEAL_AVAILABLE',
  'APPEAL_SUBMITTED', 'CLOSED', 'RETURNED'
);
create type public.payment_status as enum ('PENDING', 'SUCCESS', 'FAILED', 'RECONCILIATION_REQUIRED');
create type public.appeal_status as enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'DECIDED', 'CLOSED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Citizen', email text, phone text, avatar_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.authorities (
  id uuid primary key default gen_random_uuid(), name text not null, ministry text not null,
  department text, description text not null, category text not null, active boolean not null default true,
  created_at timestamptz not null default now(), unique(name)
);

create table public.rti_applications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  registration_number text not null unique, title text not null, original_question text not null,
  polished_question text not null check (char_length(polished_question) <= 3000),
  authority_id uuid not null references public.authorities(id), status public.rti_status not null default 'DRAFT',
  submitted_at timestamptz, response_due_at timestamptz, fee numeric(10,2) not null default 10,
  payment_status public.payment_status not null default 'PENDING', created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.timeline_events (
  id uuid primary key default gen_random_uuid(), rti_id uuid not null references public.rti_applications(id) on delete cascade,
  status public.rti_status not null, title text not null, description text not null, event_date timestamptz not null default now(),
  action_required boolean not null default false, action_label text, created_at timestamptz not null default now()
);

create table public.appeals (
  id uuid primary key default gen_random_uuid(), rti_id uuid not null references public.rti_applications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade, reason text not null, description text not null,
  status public.appeal_status not null default 'DRAFT', submitted_at timestamptz, created_at timestamptz not null default now()
);

create table public.responses (
  id uuid primary key default gen_random_uuid(), rti_id uuid not null unique references public.rti_applications(id) on delete cascade,
  summary text not null, content text not null, document_path text, received_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, description text not null, read boolean not null default false, action_url text,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(), rti_id uuid not null references public.rti_applications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade, amount numeric(10,2) not null check (amount >= 0),
  method text not null check (method in ('UPI', 'CARD', 'NET_BANKING', 'RUPAY')), status public.payment_status not null,
  transaction_reference text not null unique, created_at timestamptz not null default now()
);

create table public.public_information (
  id uuid primary key default gen_random_uuid(), title text not null, category text not null,
  authority_id uuid references public.authorities(id) on delete set null, summary text not null, content text not null,
  source_label text not null default 'Illustrative demo data', created_at timestamptz not null default now()
);

create table public.attachments (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  rti_id uuid references public.rti_applications(id) on delete cascade, file_name text not null, storage_path text not null unique,
  file_type text not null, file_size bigint not null check (file_size > 0 and file_size <= 10485760), created_at timestamptz not null default now()
);

create index rti_applications_user_created_idx on public.rti_applications(user_id, created_at desc);
create index rti_applications_status_idx on public.rti_applications(status);
create index timeline_events_rti_date_idx on public.timeline_events(rti_id, event_date);
create index notifications_user_created_idx on public.notifications(user_id, created_at desc);
create index authorities_search_idx on public.authorities using gin (to_tsvector('english', name || ' ' || ministry || ' ' || coalesce(department, '')));

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email, phone)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', 'Citizen'), new.email, new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger rti_updated_at before update on public.rti_applications for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.authorities enable row level security;
alter table public.rti_applications enable row level security;
alter table public.timeline_events enable row level security;
alter table public.appeals enable row level security;
alter table public.responses enable row level security;
alter table public.notifications enable row level security;
alter table public.payments enable row level security;
alter table public.public_information enable row level security;
alter table public.attachments enable row level security;

create policy "public read authorities" on public.authorities for select using (active);
create policy "public read public information" on public.public_information for select using (true);
create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "users read own rti" on public.rti_applications for select using (auth.uid() = user_id);
create policy "users create own rti" on public.rti_applications for insert with check (auth.uid() = user_id);
create policy "users update own rti" on public.rti_applications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users read own timeline" on public.timeline_events for select using (exists (select 1 from public.rti_applications r where r.id = rti_id and r.user_id = auth.uid()));
create policy "users read own appeals" on public.appeals for select using (auth.uid() = user_id);
create policy "users create own appeals" on public.appeals for insert with check (auth.uid() = user_id);
create policy "users read own responses" on public.responses for select using (exists (select 1 from public.rti_applications r where r.id = rti_id and r.user_id = auth.uid()));
create policy "users read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "users update own notifications" on public.notifications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users read own payments" on public.payments for select using (auth.uid() = user_id);
create policy "users read own attachments" on public.attachments for select using (auth.uid() = user_id);
create policy "users create own attachments" on public.attachments for insert with check (auth.uid() = user_id);
create policy "users delete own attachments" on public.attachments for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public) values ('rti-attachments', 'rti-attachments', false), ('rti-responses', 'rti-responses', false), ('appeal-attachments', 'appeal-attachments', false) on conflict (id) do nothing;
create policy "users manage own attachment objects" on storage.objects for all using (bucket_id in ('rti-attachments', 'appeal-attachments') and auth.uid()::text = (storage.foldername(name))[1]) with check (bucket_id in ('rti-attachments', 'appeal-attachments') and auth.uid()::text = (storage.foldername(name))[1]);
create policy "users read response objects" on storage.objects for select using (bucket_id = 'rti-responses' and auth.role() = 'authenticated');
