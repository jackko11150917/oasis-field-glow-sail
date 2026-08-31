import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureFriendCode } from "@/lib/ensure-friend-code";
import { generateFriendCode } from "@/lib/friend-code";
import type { ActiveSession, Profile, PublicStats, Workout } from "@/lib/types";

export type CloudGymState = {
  profile: Profile | null;
  xp: number;
  workouts: Workout[];
  session: ActiveSession | null;
  friendCode: string | null;
};

type ProfileRow = {
  name: string;
  sex: string;
  bodyweight: number;
  onboarded: boolean;
  xp: number;
  session_json: string | null;
  avatar_id: string | null;
  friend_code: string | null;
};

type WorkoutRow = {
  id: string;
  name: string;
  started_at: string;
  finished_at: string;
  exercises_json: string;
  xp_earned: number;
  breakdown_json: string;
  prs_json: string;
};

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function toProfile(row: ProfileRow): Profile {
  return {
    name: row.name,
    sex: row.sex === "female" ? "female" : "male",
    bodyweight: Number(row.bodyweight) || 70,
    onboarded: Boolean(row.onboarded),
    avatarId: row.avatar_id || "anvil",
  };
}

function toWorkout(row: WorkoutRow): Workout {
  return {
    id: row.id,
    name: row.name,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    exercises: parseJson(row.exercises_json, []),
    xpEarned: Number(row.xp_earned) || 0,
    breakdown: parseJson(row.breakdown_json, []),
    prs: parseJson(row.prs_json, []),
  };
}

export const loadGymState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<CloudGymState> => {
    const sql = await getSql();
    const profiles = await sql<ProfileRow>`
      select name, sex, bodyweight, onboarded, xp, session_json, avatar_id, friend_code
      from gym_profiles
      where user_id = ${context.userId}
    `;
    const workouts = await sql<WorkoutRow>`
      select id, name, started_at, finished_at, exercises_json, xp_earned, breakdown_json, prs_json
      from gym_workouts
      where user_id = ${context.userId}
      order by finished_at asc
    `;
    const row = profiles[0];
    const friendCode = row?.onboarded
      ? await ensureFriendCode(sql, context.userId)
      : (row?.friend_code ?? null);
    return {
      profile: row ? toProfile(row) : null,
      xp: row ? Number(row.xp) || 0 : 0,
      workouts: workouts.map(toWorkout),
      session: row ? parseJson<ActiveSession | null>(row.session_json, null) : null,
      friendCode: friendCode ?? row?.friend_code ?? null,
    };
  });

export const saveGymSnapshot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (d: {
      profile: Profile;
      xp: number;
      session: ActiveSession | null;
      publicStats: PublicStats;
    }) => d,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const sessionJson = data.session ? JSON.stringify(data.session) : null;
    const existingCode = await ensureFriendCode(sql, context.userId);
    const friendCode = existingCode ?? generateFriendCode();
    const stats = data.publicStats;
    const avatarId = data.profile.avatarId || "anvil";
    await sql`
      insert into gym_profiles (
        user_id, name, sex, bodyweight, onboarded, xp, session_json,
        avatar_id, friend_code, level, rank_id, rank_percentile,
        streak, week_days, week_xp, workout_count, last_trained_at, training_now, updated_at
      )
      values (
        ${context.userId},
        ${data.profile.name},
        ${data.profile.sex},
        ${data.profile.bodyweight},
        ${data.profile.onboarded},
        ${data.xp},
        ${sessionJson},
        ${avatarId},
        ${friendCode},
        ${stats.level},
        ${stats.rankId},
        ${stats.rankPercentile},
        ${stats.streak},
        ${stats.weekDays},
        ${stats.weekXp},
        ${stats.workoutCount},
        ${stats.lastTrainedAt},
        ${stats.trainingNow},
        now()
      )
      on conflict (user_id) do update set
        name = excluded.name,
        sex = excluded.sex,
        bodyweight = excluded.bodyweight,
        onboarded = excluded.onboarded,
        xp = excluded.xp,
        session_json = excluded.session_json,
        avatar_id = excluded.avatar_id,
        friend_code = coalesce(gym_profiles.friend_code, excluded.friend_code),
        level = excluded.level,
        rank_id = excluded.rank_id,
        rank_percentile = excluded.rank_percentile,
        streak = excluded.streak,
        week_days = excluded.week_days,
        week_xp = excluded.week_xp,
        workout_count = excluded.workout_count,
        last_trained_at = excluded.last_trained_at,
        training_now = excluded.training_now,
        updated_at = now()
    `;
    if (!friendCode) {
      await ensureFriendCode(sql, context.userId);
    }
    const finalCode = await sql<{ friend_code: string | null }>`
      select friend_code from gym_profiles where user_id = ${context.userId}
    `;
    return { friendCode: finalCode[0]?.friend_code ?? friendCode };
  });

export const saveGymWorkout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: Workout) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into gym_workouts (
        id, user_id, name, started_at, finished_at, exercises_json, xp_earned, breakdown_json, prs_json
      )
      values (
        ${data.id},
        ${context.userId},
        ${data.name},
        ${data.startedAt},
        ${data.finishedAt},
        ${JSON.stringify(data.exercises)},
        ${data.xpEarned},
        ${JSON.stringify(data.breakdown)},
        ${JSON.stringify(data.prs)}
      )
      on conflict (id) do nothing
    `;
  });

export const replaceGymWorkouts = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: Workout[]) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`delete from gym_workouts where user_id = ${context.userId}`;
    for (const w of data) {
      await sql`
        insert into gym_workouts (
          id, user_id, name, started_at, finished_at, exercises_json, xp_earned, breakdown_json, prs_json
        )
        values (
          ${w.id},
          ${context.userId},
          ${w.name},
          ${w.startedAt},
          ${w.finishedAt},
          ${JSON.stringify(w.exercises)},
          ${w.xpEarned},
          ${JSON.stringify(w.breakdown)},
          ${JSON.stringify(w.prs)}
        )
      `;
    }
  });

export const clearGymCloud = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`delete from gym_cheers where from_user_id = ${context.userId} or to_user_id = ${context.userId}`;
    await sql`delete from gym_friendships where user_id = ${context.userId} or friend_user_id = ${context.userId}`;
    await sql`delete from gym_friend_requests where from_user_id = ${context.userId} or to_user_id = ${context.userId}`;
    await sql`delete from gym_workouts where user_id = ${context.userId}`;
    await sql`delete from gym_profiles where user_id = ${context.userId}`;
  });
