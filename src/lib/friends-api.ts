import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { ensureFriendCode } from "@/lib/ensure-friend-code";
import { normalizeFriendCode } from "@/lib/friend-code";
import { isoWeekKey, uid } from "@/lib/utils";

export type FriendCard = {
  friendCode: string;
  name: string;
  avatarId: string;
  avatarUrl?: string | null;
  level: number;
  rankId: string;
  rankPercentile: number;
  streak: number;
  weekDays: number;
  weekXp: number;
  workoutCount: number;
  lastTrainedAt: string | null;
  trainingNow: boolean;
  cheersThisWeek: number;
  isSelf: boolean;
};

export type FriendRequestCard = {
  id: string;
  friendCode: string;
  name: string;
  avatarId: string;
  avatarUrl?: string | null;
  level: number;
  rankId: string;
  direction: "in" | "out";
};

export type FriendsHome = {
  me: FriendCard | null;
  friends: FriendCard[];
  incoming: FriendRequestCard[];
  outgoing: FriendRequestCard[];
  cheersReceived: number;
  cheeredCodes: string[];
};

export type FriendActionResult =
  | { ok: true; message: string; autoAccepted?: boolean }
  | { ok: false; message: string };

type ProfileRow = {
  user_id: string;
  name: string;
  avatar_id: string;
  avatar_url: string | null;
  friend_code: string | null;
  level: number;
  rank_id: string;
  rank_percentile: number;
  streak: number;
  week_days: number;
  week_xp: number;
  workout_count: number;
  last_trained_at: string | null;
  training_now: boolean;
};

function toIso(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.toISOString();
}

function toCard(
  row: ProfileRow,
  cheers: number,
  isSelf: boolean,
): FriendCard | null {
  if (!row.friend_code) return null;
  return {
    friendCode: row.friend_code,
    name: row.name || "鍛造者",
    avatarId: row.avatar_id || "anvil",
    avatarUrl: row.avatar_url || null,
    level: Number(row.level) || 1,
    rankId: row.rank_id || "unranked",
    rankPercentile: Number(row.rank_percentile) || 0,
    streak: Number(row.streak) || 0,
    weekDays: Number(row.week_days) || 0,
    weekXp: Number(row.week_xp) || 0,
    workoutCount: Number(row.workout_count) || 0,
    lastTrainedAt: toIso(row.last_trained_at),
    trainingNow: Boolean(row.training_now),
    cheersThisWeek: cheers,
    isSelf,
  };
}

async function cheersByUsers(
  sql: Sql,
  userIds: string[],
  weekKey: string,
): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  if (!userIds.length) return map;
  const placeholders = userIds.map((_, i) => `$${i + 2}`).join(", ");
  const rows = await sql.query<{ to_user_id: string; n: number }>(
    `select to_user_id, count(*)::int as n
     from gym_cheers
     where week_key = $1 and to_user_id in (${placeholders})
     group by to_user_id`,
    [weekKey, ...userIds],
  );
  for (const row of rows) map.set(row.to_user_id, Number(row.n) || 0);
  return map;
}

export const loadFriendsHome = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<FriendsHome> => {
    const sql = await getSql();
    const meId = context.userId;
    const weekKey = isoWeekKey();
    await ensureFriendCode(sql, meId);

    const meRows = await sql<ProfileRow>`
      select user_id, name, avatar_id, avatar_url, friend_code, level, rank_id, rank_percentile,
             streak, week_days, week_xp, workout_count, last_trained_at, training_now
      from gym_profiles
      where user_id = ${meId}
    `;

    const friendRows = await sql<ProfileRow>`
      select p.user_id, p.name, p.avatar_id, p.avatar_url, p.friend_code, p.level, p.rank_id, p.rank_percentile,
             p.streak, p.week_days, p.week_xp, p.workout_count, p.last_trained_at, p.training_now
      from gym_friendships f
      join gym_profiles p on p.user_id = f.friend_user_id
      where f.user_id = ${meId}
      order by p.training_now desc, p.week_days desc, p.week_xp desc, p.xp desc
    `;

    const incomingRows = await sql<ProfileRow & { request_id: string }>`
      select r.id as request_id, p.user_id, p.name, p.avatar_id, p.avatar_url, p.friend_code, p.level, p.rank_id,
             p.rank_percentile, p.streak, p.week_days, p.week_xp, p.workout_count,
             p.last_trained_at, p.training_now
      from gym_friend_requests r
      join gym_profiles p on p.user_id = r.from_user_id
      where r.to_user_id = ${meId} and r.status = 'pending'
      order by r.created_at desc
    `;

    const outgoingRows = await sql<ProfileRow & { request_id: string }>`
      select r.id as request_id, p.user_id, p.name, p.avatar_id, p.avatar_url, p.friend_code, p.level, p.rank_id,
             p.rank_percentile, p.streak, p.week_days, p.week_xp, p.workout_count,
             p.last_trained_at, p.training_now
      from gym_friend_requests r
      join gym_profiles p on p.user_id = r.to_user_id
      where r.from_user_id = ${meId} and r.status = 'pending'
      order by r.created_at desc
    `;

    const cheerIds = [meId, ...friendRows.map((r) => r.user_id)];
    const cheerMap = await cheersByUsers(sql, cheerIds, weekKey);

    const cheered = await sql<{ friend_code: string }>`
      select p.friend_code
      from gym_cheers c
      join gym_profiles p on p.user_id = c.to_user_id
      where c.from_user_id = ${meId} and c.week_key = ${weekKey} and p.friend_code is not null
    `;

    const me = meRows[0]
      ? toCard(meRows[0], cheerMap.get(meId) ?? 0, true)
      : null;

    return {
      me,
      friends: friendRows
        .map((row) => toCard(row, cheerMap.get(row.user_id) ?? 0, false))
        .filter((x): x is FriendCard => x !== null),
      incoming: incomingRows
        .filter((r) => r.friend_code)
        .map((r) => ({
          id: r.request_id,
          friendCode: r.friend_code as string,
          name: r.name || "鍛造者",
          avatarId: r.avatar_id || "anvil",
          avatarUrl: r.avatar_url || null,
          level: Number(r.level) || 1,
          rankId: r.rank_id || "unranked",
          direction: "in" as const,
        })),
      outgoing: outgoingRows
        .filter((r) => r.friend_code)
        .map((r) => ({
          id: r.request_id,
          friendCode: r.friend_code as string,
          name: r.name || "鍛造者",
          avatarId: r.avatar_id || "anvil",
          avatarUrl: r.avatar_url || null,
          level: Number(r.level) || 1,
          rankId: r.rank_id || "unranked",
          direction: "out" as const,
        })),
      cheersReceived: cheerMap.get(meId) ?? 0,
      cheeredCodes: cheered.map((r) => r.friend_code),
    };
  });

async function findByCode(sql: Sql, code: string): Promise<ProfileRow | null> {
  const rows = await sql<ProfileRow>`
    select user_id, name, avatar_id, avatar_url, friend_code, level, rank_id, rank_percentile,
           streak, week_days, week_xp, workout_count, last_trained_at, training_now
    from gym_profiles
    where friend_code = ${code}
    limit 1
  `;
  return rows[0] ?? null;
}

async function areFriends(sql: Sql, a: string, b: string): Promise<boolean> {
  const rows = await sql<{ user_id: string }>`
    select user_id from gym_friendships
    where user_id = ${a} and friend_user_id = ${b}
    limit 1
  `;
  return rows.length > 0;
}

async function becomeFriends(sql: Sql, a: string, b: string): Promise<void> {
  await sql`
    insert into gym_friendships (user_id, friend_user_id)
    values (${a}, ${b})
    on conflict do nothing
  `;
  await sql`
    insert into gym_friendships (user_id, friend_user_id)
    values (${b}, ${a})
    on conflict do nothing
  `;
  await sql`
    update gym_friend_requests
    set status = 'accepted'
    where status = 'pending'
      and (
        (from_user_id = ${a} and to_user_id = ${b})
        or (from_user_id = ${b} and to_user_id = ${a})
      )
  `;
}

export const sendFriendRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: string) => d)
  .handler(async ({ context, data }): Promise<FriendActionResult> => {
    const code = normalizeFriendCode(data);
    if (!code) return { ok: false, message: "好友 ID 格式唔啱，例如 IR-A3F9K2" };

    const sql = await getSql();
    const target = await findByCode(sql, code);
    if (!target) return { ok: false, message: "搵唔到呢個好友 ID" };
    if (target.user_id === context.userId) {
      return { ok: false, message: "唔可以加自己做好友" };
    }
    if (await areFriends(sql, context.userId, target.user_id)) {
      return { ok: false, message: "你哋已經係好友" };
    }

    const reverse = await sql<{ id: string }>`
      select id from gym_friend_requests
      where from_user_id = ${target.user_id}
        and to_user_id = ${context.userId}
        and status = 'pending'
      limit 1
    `;
    if (reverse[0]) {
      await becomeFriends(sql, context.userId, target.user_id);
      return { ok: true, message: `已同 ${target.name || "對方"} 成為好友`, autoAccepted: true };
    }

    const existing = await sql<{ id: string }>`
      select id from gym_friend_requests
      where from_user_id = ${context.userId}
        and to_user_id = ${target.user_id}
        and status = 'pending'
      limit 1
    `;
    if (existing[0]) return { ok: false, message: "已送出邀請，等對方確認" };

    await sql`
      delete from gym_friend_requests
      where from_user_id = ${context.userId} and to_user_id = ${target.user_id}
    `;
    await sql`
      insert into gym_friend_requests (id, from_user_id, to_user_id, status)
      values (${uid()}, ${context.userId}, ${target.user_id}, 'pending')
    `;
    return { ok: true, message: `已向 ${target.name || "對方"} 送出好友邀請` };
  });

export const respondFriendRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id: string; accept: boolean }) => d)
  .handler(async ({ context, data }): Promise<FriendActionResult> => {
    const sql = await getSql();
    const rows = await sql<{ id: string; from_user_id: string; to_user_id: string }>`
      select id, from_user_id, to_user_id
      from gym_friend_requests
      where id = ${data.id} and to_user_id = ${context.userId} and status = 'pending'
      limit 1
    `;
    const row = rows[0];
    if (!row) return { ok: false, message: "邀請已失效" };

    if (data.accept) {
      await becomeFriends(sql, row.to_user_id, row.from_user_id);
      return { ok: true, message: "已成為好友" };
    }
    await sql`
      update gym_friend_requests
      set status = 'declined'
      where id = ${row.id} and to_user_id = ${context.userId}
    `;
    return { ok: true, message: "已拒絕邀請" };
  });

export const removeFriend = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: string) => d)
  .handler(async ({ context, data }): Promise<FriendActionResult> => {
    const code = normalizeFriendCode(data);
    if (!code) return { ok: false, message: "好友 ID 無效" };
    const sql = await getSql();
    const target = await findByCode(sql, code);
    if (!target) return { ok: false, message: "搵唔到呢個好友" };
    if (!(await areFriends(sql, context.userId, target.user_id))) {
      return { ok: false, message: "你哋而家唔係好友" };
    }
    await sql`
      delete from gym_friendships
      where (user_id = ${context.userId} and friend_user_id = ${target.user_id})
         or (user_id = ${target.user_id} and friend_user_id = ${context.userId})
    `;
    return { ok: true, message: `已移除 ${target.name || "好友"}` };
  });

export const cheerFriend = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: string) => d)
  .handler(async ({ context, data }): Promise<FriendActionResult> => {
    const code = normalizeFriendCode(data);
    if (!code) return { ok: false, message: "好友 ID 無效" };
    const sql = await getSql();
    const target = await findByCode(sql, code);
    if (!target) return { ok: false, message: "搵唔到呢個好友" };
    if (target.user_id === context.userId) {
      return { ok: false, message: "唔可以幫自己打氣" };
    }
    if (!(await areFriends(sql, context.userId, target.user_id))) {
      return { ok: false, message: "只可以同好友打氣" };
    }
    const weekKey = isoWeekKey();
    try {
      await sql`
        insert into gym_cheers (from_user_id, to_user_id, week_key)
        values (${context.userId}, ${target.user_id}, ${weekKey})
      `;
    } catch {
      return { ok: false, message: "本週已經幫佢打過氣" };
    }
    return { ok: true, message: `已向 ${target.name || "對方"} 打氣` };
  });

export const loadFriendDetail = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: string) => d)
  .handler(
    async ({
      context,
      data,
    }): Promise<{ me: FriendCard | null; friend: FriendCard | null; cheered: boolean } | null> => {
      const code = normalizeFriendCode(data);
      if (!code) return null;
      const sql = await getSql();
      const weekKey = isoWeekKey();
      await ensureFriendCode(sql, context.userId);

      const meRows = await sql<ProfileRow>`
        select user_id, name, avatar_id, avatar_url, friend_code, level, rank_id, rank_percentile,
               streak, week_days, week_xp, workout_count, last_trained_at, training_now
        from gym_profiles
        where user_id = ${context.userId}
      `;
      const target = await findByCode(sql, code);
      if (!target) return null;
      if (target.user_id !== context.userId) {
        const ok = await areFriends(sql, context.userId, target.user_id);
        if (!ok) return null;
      }

      const cheerMap = await cheersByUsers(
        sql,
        [context.userId, target.user_id],
        weekKey,
      );
      const cheeredRows = await sql<{ n: number }>`
        select count(*)::int as n from gym_cheers
        where from_user_id = ${context.userId}
          and to_user_id = ${target.user_id}
          and week_key = ${weekKey}
      `;

      return {
        me: meRows[0] ? toCard(meRows[0], cheerMap.get(context.userId) ?? 0, true) : null,
        friend: toCard(target, cheerMap.get(target.user_id) ?? 0, target.user_id === context.userId),
        cheered: (Number(cheeredRows[0]?.n) || 0) > 0,
      };
    },
  );
