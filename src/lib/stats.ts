import { curveFor, getExercise, type Exercise, type LoadKind } from "@/data/exercises";
import {
  nextRank,
  percentileToRatio,
  rankForPercentile,
  rankProgress,
  ratioToPercentile,
  UNRANKED,
  type RankDef,
} from "@/data/ranks";
import type { Profile, SetLog, Workout } from "@/lib/types";
import { e1rm } from "@/lib/xp";
import { localISODate } from "@/lib/utils";

export type BestSet = {
  exerciseId: string;
  weight: number;
  reps: number;
  e1rm: number;
  date: string;
};

export function setLoad(weight: number, reps: number): number {
  return e1rm(weight, reps);
}

export function comparableLoad(
  exercise: Exercise,
  e1rmKg: number,
  bodyweight: number,
): number {
  if (exercise.loadKind === "bodyweight") return bodyweight + e1rmKg;
  if (exercise.loadKind === "dumbbell") return e1rmKg;
  return e1rmKg;
}

export function loadToRatio(
  exercise: Exercise,
  e1rmKg: number,
  bodyweight: number,
): number {
  if (bodyweight <= 0) return 0;
  if (exercise.loadKind === "bodyweight") return (bodyweight + e1rmKg) / bodyweight;
  if (exercise.loadKind === "dumbbell") return e1rmKg / bodyweight;
  return e1rmKg / bodyweight;
}

export function bestSets(workouts: Workout[]): Record<string, BestSet> {
  const best: Record<string, BestSet> = {};
  for (const w of workouts) {
    for (const ex of w.exercises) {
      for (const s of ex.sets) {
        if (!s.done || s.weight < 0 || s.reps <= 0) continue;
        const est = e1rm(s.weight, s.reps);
        const prev = best[ex.exerciseId];
        if (!prev || est > prev.e1rm) {
          best[ex.exerciseId] = {
            exerciseId: ex.exerciseId,
            weight: s.weight,
            reps: s.reps,
            e1rm: est,
            date: w.finishedAt,
          };
        }
      }
    }
  }
  return best;
}

export function lastSetsFor(
  workouts: Workout[],
  exerciseId: string,
): SetLog[] | null {
  for (let i = workouts.length - 1; i >= 0; i--) {
    const found = workouts[i].exercises.find((e) => e.exerciseId === exerciseId);
    if (found && found.sets.length) return found.sets;
  }
  return null;
}

export type ExerciseRank = {
  exercise: Exercise;
  best: BestSet | null;
  percentile: number;
  rank: RankDef;
  next: RankDef | null;
  progress: number;
  kgToNext: number | null;
};

export function rankExercise(
  exercise: Exercise,
  best: BestSet | null,
  profile: Profile,
): ExerciseRank {
  if (!best) {
    return {
      exercise,
      best: null,
      percentile: 0,
      rank: UNRANKED,
      next: null,
      progress: 0,
      kgToNext: null,
    };
  }
  const curve = curveFor(exercise, profile.sex);
  const ratio = loadToRatio(exercise, best.e1rm, profile.bodyweight);
  const percentile = ratioToPercentile(ratio, curve);
  const { rank, next, t } = rankProgress(percentile);
  let kgToNext: number | null = null;
  if (next) {
    const needRatio = percentileToRatio(next.min, curve);
    const needE1rm = ratioToE1rm(exercise, needRatio, profile.bodyweight);
    kgToNext = Math.round((needE1rm - best.e1rm) * 10) / 10;
  }
  return { exercise, best, percentile, rank, next, progress: t, kgToNext };
}

function ratioToE1rm(exercise: Exercise, ratio: number, bw: number): number {
  if (exercise.loadKind === "bodyweight") return Math.max(0, ratio * bw - bw);
  return ratio * bw;
}

export function overallRank(
  workouts: Workout[],
  profile: Profile,
): {
  percentile: number;
  rank: RankDef;
  next: RankDef | null;
  progress: number;
  counted: number;
} {
  const best = bestSets(workouts);
  const entries = Object.values(best)
    .map((b) => {
      const ex = getExercise(b.exerciseId);
      if (!ex) return null;
      const r = rankExercise(ex, b, profile);
      const w = ex.compound ? 1.6 : 1;
      return { pct: r.percentile, w };
    })
    .filter((x): x is { pct: number; w: number } => x !== null);

  if (!entries.length) {
    return { percentile: 0, rank: UNRANKED, next: null, progress: 0, counted: 0 };
  }
  const sumW = entries.reduce((a, b) => a + b.w, 0);
  const percentile =
    Math.round((entries.reduce((a, b) => a + b.pct * b.w, 0) / sumW) * 10) / 10;
  const { rank, next, t } = rankProgress(percentile);
  return { percentile, rank, next, progress: t, counted: entries.length };
}

export function workoutVolume(exercises: { sets: SetLog[]; exerciseId: string }[]): number {
  let vol = 0;
  for (const ex of exercises) {
    const meta = getExercise(ex.exerciseId);
    const factor: LoadKind | undefined = meta?.loadKind;
    for (const s of ex.sets) {
      if (!s.done) continue;
      const w = factor === "dumbbell" ? s.weight * 2 : s.weight;
      vol += w * s.reps;
    }
  }
  return Math.round(vol);
}

export function completedSetCount(exercises: { sets: SetLog[] }[]): number {
  return exercises.reduce((n, e) => n + e.sets.filter((s) => s.done).length, 0);
}

export function computeStreak(workouts: Workout[], today = localISODate()): number {
  const days = new Set(workouts.map((w) => localISODate(new Date(w.finishedAt))));
  let cursor = today;
  if (!days.has(cursor)) cursor = shiftBack(cursor, 1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = shiftBack(cursor, 1);
  }
  return streak;
}

function shiftBack(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, (d ?? 1) - days);
  return localISODate(date);
}

export function trainedDays(workouts: Workout[]): Set<string> {
  return new Set(workouts.map((w) => localISODate(new Date(w.finishedAt))));
}

export function lastNDates(n: number, from = localISODate()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(shiftBack(from, i));
  return out;
}

export function historyForExercise(
  workouts: Workout[],
  exerciseId: string,
): { date: string; weight: number; reps: number; e1rm: number; volume: number }[] {
  const rows: { date: string; weight: number; reps: number; e1rm: number; volume: number }[] = [];
  for (const w of workouts) {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    if (!ex) continue;
    const done = ex.sets.filter((s) => s.done && s.reps > 0);
    if (!done.length) continue;
    const top = done.reduce((a, b) => (setLoad(b.weight, b.reps) > setLoad(a.weight, a.reps) ? b : a));
    const volume = done.reduce((n, s) => n + s.weight * s.reps, 0);
    rows.push({
      date: w.finishedAt,
      weight: top.weight,
      reps: top.reps,
      e1rm: e1rm(top.weight, top.reps),
      volume,
    });
  }
  return rows;
}

export function loadKindHint(kind: LoadKind): string {
  if (kind === "dumbbell") return "每隻手";
  if (kind === "bodyweight") return "額外負重，徒手填 0";
  if (kind === "stack") return "配重片標示";
  return "槓鈴含槓";
}
