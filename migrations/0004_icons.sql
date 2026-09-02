alter table gym_profiles
  add column if not exists icons_json text not null default '{}';
alter table gym_profiles
  add column if not exists avatar_url text;
