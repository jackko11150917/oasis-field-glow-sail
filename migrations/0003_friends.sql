alter table gym_profiles add column if not exists friend_code text;
alter table gym_profiles add column if not exists avatar_id text not null default 'anvil';
alter table gym_profiles add column if not exists level integer not null default 1;
alter table gym_profiles add column if not exists rank_id text not null default 'unranked';
alter table gym_profiles add column if not exists rank_percentile double precision not null default 0;
alter table gym_profiles add column if not exists streak integer not null default 0;
alter table gym_profiles add column if not exists week_days integer not null default 0;
alter table gym_profiles add column if not exists week_xp integer not null default 0;
alter table gym_profiles add column if not exists workout_count integer not null default 0;
alter table gym_profiles add column if not exists last_trained_at timestamptz;
alter table gym_profiles add column if not exists training_now boolean not null default false;

create unique index if not exists gym_profiles_friend_code_idx
  on gym_profiles (friend_code)
  where friend_code is not null;

create table if not exists gym_friend_requests (
  id text primary key,
  from_user_id text not null,
  to_user_id text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create unique index if not exists gym_friend_requests_pair_pending_idx
  on gym_friend_requests (from_user_id, to_user_id)
  where status = 'pending';

create index if not exists gym_friend_requests_to_idx
  on gym_friend_requests (to_user_id, status);

create table if not exists gym_friendships (
  user_id text not null,
  friend_user_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_user_id)
);

create index if not exists gym_friendships_friend_idx
  on gym_friendships (friend_user_id);

create table if not exists gym_cheers (
  from_user_id text not null,
  to_user_id text not null,
  week_key text not null,
  created_at timestamptz not null default now(),
  primary key (from_user_id, to_user_id, week_key)
);

create index if not exists gym_cheers_to_week_idx
  on gym_cheers (to_user_id, week_key);
