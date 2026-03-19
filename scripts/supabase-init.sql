-- Robotron Supabase schema
-- Run in Supabase Dashboard → SQL Editor
-- Creates users and scores tables for the app

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  username text not null,
  score int not null check (score >= 0),
  wave int not null default 1 check (wave >= 1),
  created_at timestamptz not null default now()
);

create index if not exists scores_score_idx on public.scores(score desc);
create index if not exists scores_user_idx on public.scores(user_id, score desc);
create index if not exists scores_created_idx on public.scores(created_at desc);

-- Note: SUPABASE_SERVICE_ROLE_KEY bypasses RLS, so no policies needed.
