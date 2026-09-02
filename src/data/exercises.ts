import { curveFromP60, type StrengthCurve } from "@/data/ranks";
import { EXERCISES_P1 } from "./exercises-p1";
import { EXERCISES_P2 } from "./exercises-p2";
import { EXERCISES_P3 } from "./exercises-p3";
import { MACHINE_EXERCISES } from "./machine-exercises";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "legs"
  | "glutes"
  | "arms"
  | "core";

export type Equipment = "barbell" | "dumbbell" | "machine" | "cable" | "bodyweight";
export type LoadKind = "bar" | "dumbbell" | "stack" | "bodyweight";

export type Exercise = {
  id: string;
  nameZh: string;
  nameEn: string;
  muscle: MuscleGroup;
  equipment: Equipment;
  loadKind: LoadKind;
  summary: string;
  setup: string[];
  cues: string[];
  mistakes: string[];
  breathing: string;
  machineTip?: string;
  maleP60: number;
  femaleP60: number;
  compound?: boolean;
};

export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: "胸",
  back: "背",
  shoulders: "肩",
  legs: "腿",
  glutes: "臀",
  arms: "手臂",
  core: "核心",
};

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  barbell: "槓鈴",
  dumbbell: "啞鈴",
  machine: "器械",
  cable: "繩索",
  bodyweight: "自重",
};

export const EXERCISES: Exercise[] = [
  ...(EXERCISES_P1 as unknown as Exercise[]),
  ...(EXERCISES_P2 as unknown as Exercise[]),
  ...(EXERCISES_P3 as unknown as Exercise[]),
];

for (const _me of MACHINE_EXERCISES as unknown as Exercise[]) {
  if (!EXERCISES.some((e) => e.id === _me.id)) EXERCISES.push(_me);
}

export const EXERCISE_MAP: Record<string, Exercise> = Object.fromEntries(
  EXERCISES.map((e) => [e.id, e]),
);

export function getExercise(id: string): Exercise | undefined {
  return EXERCISE_MAP[id];
}

export function curveFor(exercise: Exercise, sex: "male" | "female"): StrengthCurve {
  return curveFromP60(sex === "male" ? exercise.maleP60 : exercise.femaleP60);
}

export const TEMPLATES: { id: string; name: string; subtitle: string; exerciseIds: string[] }[] = [
  {
    id: "push",
    name: "推日",
    subtitle: "胸 · 肩 · 三頭",
    exerciseIds: ["barbell-bench", "incline-bench", "ohp", "lateral-raise", "tricep-pushdown"],
  },
  {
    id: "pull",
    name: "拉日",
    subtitle: "背 · 二頭",
    exerciseIds: ["lat-pulldown", "seated-row", "barbell-row", "face-pull", "bicep-curl"],
  },
  {
    id: "legs",
    name: "腿日",
    subtitle: "股四 · 臀 · 腿後",
    exerciseIds: ["barbell-squat", "rdl", "leg-press", "leg-curl", "calf-raise"],
  },
  {
    id: "full",
    name: "全身",
    subtitle: "四大項",
    exerciseIds: ["barbell-squat", "barbell-bench", "seated-row", "ohp"],
  },
  {
    id: "upper",
    name: "上肢",
    subtitle: "推拉平衡",
    exerciseIds: ["barbell-bench", "seated-row", "ohp", "lat-pulldown"],
  },
  {
    id: "machines",
    name: "器械日",
    subtitle: "機房路線",
    exerciseIds: [
      "converging-chest-press",
      "circular-lat-pulldown",
      "low-row-machine",
      "pendulum-squat",
      "seated-leg-curl",
      "converging-shoulder-press",
    ],
  },
  {
    id: "machines-plus",
    name: "器械進階",
    subtitle: "獨立臂 · 圓弧機",
    exerciseIds: [
      "iso-chest-press",
      "upper-chest-fly",
      "vertical-traction",
      "high-row-machine",
      "machine-lateral-raise",
      "glute-kickback-machine",
    ],
  },
  {
    id: "glutes",
    name: "臀腿日",
    subtitle: "臀 · 腿後 · 外展",
    exerciseIds: ["hip-thrust", "rdl", "bulgarian-split", "cable-kickback", "hip-abduction"],
  },
  {
    id: "arms",
    name: "手臂日",
    subtitle: "二頭 · 三頭",
    exerciseIds: ["bicep-curl", "hammer-curl", "preacher-curl", "tricep-pushdown", "skull-crusher"],
  },
  {
    id: "core",
    name: "核心日",
    subtitle: "腹 · 抗旋轉",
    exerciseIds: ["cable-crunch", "hanging-leg-raise", "plank", "woodchop", "pallof-press"],
  },
  {
    id: "bodyweight",
    name: "徒手日",
    subtitle: "自重基礎",
    exerciseIds: ["push-up", "pull-up", "walking-lunge", "plank", "chin-up"],
  },
  {
    id: "beginner",
    name: "新手課",
    subtitle: "器械入門",
    exerciseIds: ["goblet-squat", "chest-press-machine", "lat-pulldown", "hip-thrust", "cable-crunch"],
  },
];
