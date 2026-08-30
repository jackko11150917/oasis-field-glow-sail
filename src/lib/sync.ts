import {
  clearGymCloud,
  loadGymState,
  replaceGymWorkouts,
  saveGymSnapshot,
  saveGymWorkout,
} from "@/lib/gym-api";
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
    if (remote.profile?.onboarded) {
      useGymStore.setState({
        profile: remote.profile,
        xp: remote.xp,
        workouts: remote.workouts,
        session: remote.session ?? local.session,
      });
      return;
    }
    if (local.profile.onboarded) {
      await saveGymSnapshot({
        data: {
          profile: local.profile,
          xp: local.xp,
          session: local.session,
        },
      });
      if (local.workouts.length) {
        await replaceGymWorkouts({ data: local.workouts });
      }
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
  const { profile, xp, session } = useGymStore.getState();
  if (!profile.onboarded) return;
  try {
    await saveGymSnapshot({ data: { profile, xp, session } });
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
