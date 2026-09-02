import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getExercise, TEMPLATES } from "@/data/exercises";
import { DEFAULT_AVATAR_ID } from "@/data/avatars";
import { completedSetCount, lastSetsFor, workoutVolume } from "@/lib/stats";
import type {
  ActiveSession,
  CustomIcons,
  Profile,
  SetLog,
  Workout,
  WorkoutExercise,
  WorkoutSummary,
} from "@/lib/types";
import { uid } from "@/lib/utils";
import { e1rm, progressFromXp } from "@/lib/xp";
import { localISODate } from "@/lib/utils";

type GymState = {
  profile: Profile;
  xp: number;
  workouts: Workout[];
  session: ActiveSession | null;
  lastSummary: WorkoutSummary | null;
  friendCode: string | null;
  customIcons: CustomIcons;
  setProfile: (patch: Partial<Profile>) => void;
  /** 只支援用戶頭像／動作 icon；段位徽章為系統固定，唔接受上傳 */
  setCustomIcon: (
    kind: "avatar" | "exercises",
    id: string | null,
    dataUrl: string | null,
  ) => void;
  setFriendCode: (code: string | null) => void;
  startSession: (name: string, exerciseIds?: string[]) => void;
  startTemplate: (templateId: string) => void;
  discardSession: () => void;
  addExercise: (exerciseId: string) => void;
  removeExercise: (exerciseId: string) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  updateSet: (exerciseId: string, setId: string, patch: Partial<SetLog>) => void;
  finishSession: () => WorkoutSummary | null;
  clearSummary: () => void;
  resetAll: () => void;
};

const defaultProfile: Profile = {
  name: "",
  sex: "male",
  bodyweight: 70,
  onboarded: false,
  avatarId: DEFAULT_AVATAR_ID,
  avatarUrl: undefined,
};

const emptyIcons: CustomIcons = { ranks: {}, exercises: {} };

function emptySet(weight = 20, reps = 8): SetLog {
  return { id: uid(), weight, reps, done: false };
}

function seedSets(exerciseId: string, workouts: Workout[]): SetLog[] {
  const last = lastSetsFor(workouts, exerciseId);
  if (last?.length) {
    return last.slice(0, 5).map((s) => ({
      id: uid(),
      weight: s.weight,
      reps: s.reps,
      done: false,
    }));
  }
  const ex = getExercise(exerciseId);
  const w = ex?.loadKind === "dumbbell" ? 12 : ex?.loadKind === "bodyweight" ? 0 : 20;
  return [emptySet(w, 8), emptySet(w, 8), emptySet(w, 8)];
}

function findPrs(prev: Workout[], session: ActiveSession): string[] {
  const best: Record<string, number> = {};
  for (const w of prev) {
    for (const ex of w.exercises) {
      for (const s of ex.sets) {
        if (!s.done) continue;
        const est = e1rm(s.weight, s.reps);
        best[ex.exerciseId] = Math.max(best[ex.exerciseId] ?? 0, est);
      }
    }
  }
  const prs: string[] = [];
  for (const ex of session.exercises) {
    let top = 0;
    for (const s of ex.sets) {
      if (!s.done) continue;
      top = Math.max(top, e1rm(s.weight, s.reps));
    }
    if (top > 0 && top > (best[ex.exerciseId] ?? 0) + 0.05) prs.push(ex.exerciseId);
  }
  return prs;
}

function xpForSession(session: ActiveSession, prs: string[], isFirstToday: boolean, streak: number) {
  const sets = completedSetCount(session.exercises);
  const volume = workoutVolume(session.exercises);
  const breakdown: { label: string; amount: number }[] = [];
  breakdown.push({ label: "完成訓練", amount: 80 });
  breakdown.push({ label: `${sets} 組`, amount: sets * 10 });
  const volXp = Math.floor(volume / 60);
  if (volXp) breakdown.push({ label: "訓練量", amount: volXp });
  if (prs.length) breakdown.push({ label: `${prs.length} 項新紀錄`, amount: prs.length * 60 });
  if (isFirstToday) breakdown.push({ label: "今日首次", amount: 40 });
  const streakXp = Math.min(streak, 10) * 8;
  if (streakXp) breakdown.push({ label: `連續 ${streak} 日`, amount: streakXp });
  const xp = breakdown.reduce((n, b) => n + b.amount, 0);
  return { xp, breakdown };
}

function streakAfter(workouts: Workout[], finishedAt: string): number {
  const days = new Set(workouts.map((w) => localISODate(new Date(w.finishedAt))));
  days.add(localISODate(new Date(finishedAt)));
  let cursor = localISODate(new Date(finishedAt));
  let n = 0;
  while (days.has(cursor)) {
    n += 1;
    const [y, m, d] = cursor.split("-").map(Number);
    const dt = new Date(y, (m ?? 1) - 1, (d ?? 1) - 1);
    cursor = localISODate(dt);
  }
  return n;
}

function bumpCloud() {
  void import("@/lib/sync").then((m) => m.scheduleCloudSave());
}

export const useGymStore = create<GymState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      xp: 0,
      workouts: [],
      session: null,
      lastSummary: null,
      friendCode: null,
      customIcons: emptyIcons,
      setProfile: (patch) => {
        set((s) => ({ profile: { ...s.profile, ...patch } }));
        bumpCloud();
      },
      setCustomIcon: (kind, id, dataUrl) => {
        set((s) => {
          if (kind === "avatar") {
            const next = { ...s.customIcons };
            if (dataUrl) next.avatar = dataUrl;
            else delete next.avatar;
            return {
              customIcons: next,
              profile: { ...s.profile, avatarUrl: dataUrl ?? undefined },
            };
          }
          // exercises only（段位 ranks 已停用上傳）
          const bag = { ...(s.customIcons.exercises ?? {}) };
          if (dataUrl && id) bag[id] = dataUrl;
          else if (id) delete bag[id];
          return { customIcons: { ...s.customIcons, exercises: bag, ranks: {} } };
        });
        bumpCloud();
      },
      setFriendCode: (code) => set({ friendCode: code }),
      startSession: (name, exerciseIds = []) => {
        const workouts = get().workouts;
        const exercises: WorkoutExercise[] = exerciseIds.map((id) => ({
          exerciseId: id,
          sets: seedSets(id, workouts),
        }));
        set({
          session: { name, startedAt: new Date().toISOString(), exercises },
          lastSummary: null,
        });
        bumpCloud();
      },
      startTemplate: (templateId) => {
        const t = TEMPLATES.find((x) => x.id === templateId);
        get().startSession(t?.name ?? "訓練", t?.exerciseIds ?? []);
      },
      discardSession: () => {
        set({ session: null });
        bumpCloud();
      },
      addExercise: (exerciseId) => {
        set((s) => {
          if (!s.session) return s;
          if (s.session.exercises.some((e) => e.exerciseId === exerciseId)) return s;
          return {
            session: {
              ...s.session,
              exercises: [
                ...s.session.exercises,
                { exerciseId, sets: seedSets(exerciseId, s.workouts) },
              ],
            },
          };
        });
        bumpCloud();
      },
      removeExercise: (exerciseId) => {
        set((s) => {
          if (!s.session) return s;
          return {
            session: {
              ...s.session,
              exercises: s.session.exercises.filter((e) => e.exerciseId !== exerciseId),
            },
          };
        });
        bumpCloud();
      },
      addSet: (exerciseId) => {
        set((s) => {
          if (!s.session) return s;
          return {
            session: {
              ...s.session,
              exercises: s.session.exercises.map((e) => {
                if (e.exerciseId !== exerciseId) return e;
                const last = e.sets[e.sets.length - 1];
                return {
                  ...e,
                  sets: [
                    ...e.sets,
                    {
                      id: uid(),
                      weight: last?.weight ?? 20,
                      reps: last?.reps ?? 8,
                      done: false,
                    },
                  ],
                };
              }),
            },
          };
        });
        bumpCloud();
      },
      removeSet: (exerciseId, setId) => {
        set((s) => {
          if (!s.session) return s;
          return {
            session: {
              ...s.session,
              exercises: s.session.exercises.map((e) =>
                e.exerciseId === exerciseId
                  ? { ...e, sets: e.sets.filter((x) => x.id !== setId) }
                  : e,
              ),
            },
          };
        });
        bumpCloud();
      },
      updateSet: (exerciseId, setId, patch) => {
        set((s) => {
          if (!s.session) return s;
          return {
            session: {
              ...s.session,
              exercises: s.session.exercises.map((e) =>
                e.exerciseId === exerciseId
                  ? {
                      ...e,
                      sets: e.sets.map((x) => (x.id === setId ? { ...x, ...patch } : x)),
                    }
                  : e,
              ),
            },
          };
        });
        bumpCloud();
      },
      finishSession: () => {
        const { session, workouts, xp } = get();
        if (!session) return null;
        const cleaned: WorkoutExercise[] = session.exercises
          .map((e) => ({ ...e, sets: e.sets.filter((s) => s.done && s.reps > 0) }))
          .filter((e) => e.sets.length);
        if (!cleaned.length) return null;
        const finishedAt = new Date().toISOString();
        const today = localISODate();
        const isFirstToday = !workouts.some(
          (w) => localISODate(new Date(w.finishedAt)) === today,
        );
        const prs = findPrs(workouts, { ...session, exercises: cleaned });
        const streak = streakAfter(workouts, finishedAt);
        const { xp: gained, breakdown } = xpForSession(
          { ...session, exercises: cleaned },
          prs,
          isFirstToday,
          streak,
        );
        const before = progressFromXp(xp).level;
        const after = progressFromXp(xp + gained).level;
        const workout: Workout = {
          id: uid(),
          name: session.name,
          startedAt: session.startedAt,
          finishedAt,
          exercises: cleaned,
          xpEarned: gained,
          breakdown,
          prs,
        };
        const summary: WorkoutSummary = {
          workoutId: workout.id,
          xp: gained,
          breakdown,
          prs,
          leveledUpTo: after > before ? after : null,
          streak,
        };
        set({
          session: null,
          workouts: [...workouts, workout],
          xp: xp + gained,
          lastSummary: summary,
        });
        void import("@/lib/sync").then((m) => m.persistWorkout(workout));
        return summary;
      },
      clearSummary: () => set({ lastSummary: null }),
      resetAll: () => {
        set({
          profile: defaultProfile,
          xp: 0,
          workouts: [],
          session: null,
          lastSummary: null,
          friendCode: null,
          customIcons: emptyIcons,
        });
        void import("@/lib/sync").then((m) => m.wipeCloud());
      },
    }),
    {
      name: "gym-nan-v2",
      skipHydration: true,
      merge: (persisted, current) => {
        const p = persisted as Partial<GymState> | undefined;
        if (!p) return current;
        return {
          ...current,
          ...p,
          profile: { ...defaultProfile, ...p.profile },
          friendCode: p.friendCode ?? current.friendCode ?? null,
          customIcons: {
            // 段位 icon 已固定，唔再讀取舊 ranks 上傳
            ranks: {},
            exercises: { ...emptyIcons.exercises, ...(p.customIcons?.exercises ?? {}) },
            avatar: p.customIcons?.avatar ?? p.profile?.avatarUrl ?? current.customIcons?.avatar,
          },
        };
      },
    },
  ),
);

export function rehydrateGym(): void | Promise<void> {
  return useGymStore.persist.rehydrate();
}
