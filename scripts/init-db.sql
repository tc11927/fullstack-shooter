-- Robotron PostgreSQL schema
-- Run with:
--   psql "$DATABASE_URL" -f scripts/init-db.sql

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  username text not null,
  score int not null check (score >= 0),
  wave int not null default 1 check (wave >= 1),
  created_at timestamptz not null default now()
);

create index if not exists scores_score_idx on scores(score desc);
create index if not exists scores_user_idx on scores(user_id, score desc);
create index if not exists scores_created_idx on scores(created_at desc);

