import type { Sql } from "@/lib/db";
import { generateFriendCode } from "@/lib/friend-code";

export async function ensureFriendCode(sql: Sql, userId: string): Promise<string | null> {
  const existing = await sql<{ friend_code: string | null }>`
    select friend_code from gym_profiles where user_id = ${userId}
  `;
  if (!existing[0]) return null;
  if (existing[0].friend_code) return existing[0].friend_code;

  for (let i = 0; i < 10; i++) {
    const code = generateFriendCode();
    try {
      await sql`
        update gym_profiles
        set friend_code = ${code}
        where user_id = ${userId} and friend_code is null
      `;
      const check = await sql<{ friend_code: string | null }>`
        select friend_code from gym_profiles where user_id = ${userId}
      `;
      if (check[0]?.friend_code) return check[0].friend_code;
    } catch {
      /* unique clash — retry */
    }
  }
  return null;
}
