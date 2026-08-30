create table if not exists gym_profiles (
  user_id text primary key,
  name text not null default '',
  sex text not null default 'male',
  bodyweight double precision not null default 70,
  onboarded boolean not null default false,
  xp integer not null default 0,
  session_json text,
  updated_at timestamptz not null default now()
);

create table if not exists gym_workouts (
  id text primary key,
  user_id text not null,
  name text not null,
  started_at timestamptz not null,
  finished_at timestamptz not null,
  exercises_json text not null,
  xp_earned integer not null default 0,
  breakdown_json text not null default '[]',
  prs_json text not null default '[]'
);

create index if not exists gym_workouts_user_finished_idx
  on gym_workouts (user_id, finished_at);
