import {
  clearGymCloud,
  loadGymState,
  replaceGymWorkouts,
  saveGymSnapshot,
  saveGymWorkout,
} from "@/lib/gym-api";
import { buildPublicStats } from "@/lib/stats";
import { useGymStore } from "@/lib/store";
import type { Workout } from "@/lib/types";

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let syncing = false;

export async function pullCloudState(): Promise<void> {
  if (syncing) return;
  syncing = true;
  try {
    const remote = await loadGymState();
    const local = useGymStore.getState();
    if (remote.friendCode) {
      useGymStore.getState().setFriendCode(remote.friendCode);
    }
    if (remote.profile?.onboarded) {
      useGymStore.setState({
        profile: {
          ...remote.profile,
          avatarId: remote.profile.avatarId || local.profile.avatarId || "anvil",
        },
        xp: remote.xp,
        workouts: remote.workouts,
        session: remote.session ?? local.session,
        friendCode: remote.friendCode ?? local.friendCode,
      });
      return;
    }
    if (local.profile.onboarded) {
      await saveGymSnapshot({
        data: {
          profile: local.profile,
          xp: local.xp,
          session: local.session,
          publicStats: buildPublicStats(
            local.workouts,
            local.profile,
            local.xp,
            local.session,
          ),
        },
      });
      if (local.workouts.length) {
        await replaceGymWorkouts({ data: local.workouts });
      }
      const again = await loadGymState();
      if (again.friendCode) useGymStore.getState().setFriendCode(again.friendCode);
    }
  } finally {
    syncing = false;
  }
}

export function scheduleCloudSave(): void {
  if (typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    void flushCloudSave();
  }, 450);
}

export async function flushCloudSave(): Promise<void> {
  const { profile, xp, session, workouts } = useGymStore.getState();
  if (!profile.onboarded) return;
  try {
    const res = await saveGymSnapshot({
      data: {
        profile,
        xp,
        session,
        publicStats: buildPublicStats(workouts, profile, xp, session),
      },
    });
    if (res?.friendCode) useGymStore.getState().setFriendCode(res.friendCode);
  } catch {
    /* keep local copy if offline */
  }
}

export async function persistWorkout(workout: Workout): Promise<void> {
  try {
    await saveGymWorkout({ data: workout });
    await flushCloudSave();
  } catch {
    /* local persist still holds */
  }
}

export async function wipeCloud(): Promise<void> {
  try {
    await clearGymCloud();
  } catch {
    /* ignore */
  }
}
