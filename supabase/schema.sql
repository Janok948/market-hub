-- Market Hub — Supabase schema
-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

-- ---------------------------------------------------------------- subscribers
-- Stores newsletter signups collected by /api/subscribe.
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  created_at  timestamptz not null default now(),
  source      text default 'website'
);

-- Row-Level Security: ON, with NO public policies.
-- The /api/subscribe function uses the SERVICE ROLE key, which bypasses RLS,
-- so inserts work from the server while the table stays locked to the public
-- anon key (no one can read your list from the browser).
alter table public.subscribers enable row level security;

-- ------------------------------------------------------------------- (later)
-- When you add accounts + a Pro tier (see MONETIZATION.md), you'll add tables
-- like the ones sketched below. Left commented until you need them.
--
-- create table public.profiles (
--   id          uuid primary key references auth.users on delete cascade,
--   is_pro      boolean not null default false,
--   stripe_customer_id text,
--   updated_at  timestamptz default now()
-- );
-- alter table public.profiles enable row level security;
-- create policy "own profile" on public.profiles
--   for select using (auth.uid() = id);
--
-- create table public.user_links (
--   id          uuid primary key default gen_random_uuid(),
--   user_id     uuid not null references auth.users on delete cascade,
--   name        text not null,
--   url         text not null,
--   description text,
--   section     text,
--   created_at  timestamptz default now()
-- );
-- alter table public.user_links enable row level security;
-- create policy "own links" on public.user_links
--   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
