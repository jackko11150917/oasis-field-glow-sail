import type { ReactNode } from "react";
import { getExercise, type MuscleGroup } from "@/data/exercises";
import { cn } from "@/lib/utils";

const TINT: Record<MuscleGroup, string> = {
  chest: "var(--color-rank-bronze)",
  back: "var(--color-rank-platinum)",
  shoulders: "var(--color-rank-silver)",
  legs: "var(--color-rank-gold)",
  glutes: "var(--color-rank-bronze)",
  arms: "var(--color-rank-diamond)",
  core: "var(--color-success)",
};

type Glyph = () => ReactNode;

const G: Record<string, Glyph> = {
  bench: () => (
    <>
      <path d="M6 20h20" />
      <path d="M10 20v4M22 20v4" />
      <path d="M8 14h16" />
      <circle cx="8" cy="14" r="2.2" />
      <circle cx="24" cy="14" r="2.2" />
    </>
  ),
  incline: () => (
    <>
      <path d="M8 24 L22 12" />
      <path d="M8 24h6M22 12h4" />
      <path d="M10 18 L24 8" />
      <circle cx="10" cy="18" r="2" />
      <circle cx="24" cy="8" r="2" />
    </>
  ),
  decline: () => (
    <>
      <path d="M8 10 L22 22" />
      <path d="M8 10h4M22 22h4" />
      <path d="M10 14 L24 24" />
      <circle cx="10" cy="14" r="2" />
      <circle cx="24" cy="24" r="2" />
    </>
  ),
  fly: () => (
    <>
      <path d="M8 16c4 8 12 8 16 0" />
      <path d="M8 16c2-6 6-8 8-8M24 16c-2-6-6-8-8-8" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="24" cy="16" r="2" />
    </>
  ),
  pecdeck: () => (
    <>
      <path d="M10 8v16M22 8v16" />
      <path d="M10 16h12" />
      <path d="M10 10h4M18 10h4M10 22h4M18 22h4" />
    </>
  ),
  pushup: () => (
    <>
      <path d="M6 20 L14 16 L26 16" />
      <path d="M10 20 L10 24M22 16 L24 24" />
      <circle cx="26" cy="14" r="2" />
    </>
  ),
  dip: () => (
    <>
      <path d="M8 8v16M24 8v16" />
      <path d="M8 14h4M20 14h4" />
      <path d="M12 14 L16 20 L20 14" />
    </>
  ),
  squat: () => (
    <>
      <circle cx="16" cy="7" r="2.2" />
      <path d="M16 9v6" />
      <path d="M10 15 L16 15 L22 15" />
      <path d="M10 15 L8 24M22 15 L24 24" />
      <path d="M12 11h8" />
    </>
  ),
  lunge: () => (
    <>
      <circle cx="14" cy="7" r="2.2" />
      <path d="M14 9v6" />
      <path d="M8 24 L12 16 L16 16 L22 24" />
      <path d="M12 16 L16 24" />
    </>
  ),
  legpress: () => (
    <>
      <path d="M6 22h20" />
      <path d="M8 22 L12 10h8l4 12" />
      <path d="M12 10 L16 6 L20 10" />
    </>
  ),
  hack: () => (
    <>
      <path d="M10 8h12v16H10z" />
      <path d="M10 20h12" />
      <path d="M14 20 L14 26M18 20 L18 26" />
    </>
  ),
  legext: () => (
    <>
      <path d="M8 20h10" />
      <path d="M18 20 L26 10" />
      <circle cx="26" cy="10" r="2" />
      <path d="M8 16h6v8H8z" />
    </>
  ),
  legcurl: () => (
    <>
      <path d="M6 12h12" />
      <path d="M18 12c0 8-6 12-12 12" />
      <circle cx="6" cy="24" r="2" />
    </>
  ),
  calf: () => (
    <>
      <path d="M16 6v14" />
      <path d="M10 20 L16 20 L22 26" />
      <path d="M12 26h12" />
    </>
  ),
  deadlift: () => (
    <>
      <path d="M6 24h20" />
      <circle cx="8" cy="24" r="2.2" />
      <circle cx="24" cy="24" r="2.2" />
      <path d="M16 8v16" />
      <path d="M12 12h8" />
      <circle cx="16" cy="7" r="2" />
    </>
  ),
  hinge: () => (
    <>
      <circle cx="12" cy="8" r="2" />
      <path d="M12 10 L16 16 L26 16" />
      <path d="M16 16 L14 24M16 16 L20 24" />
      <circle cx="26" cy="16" r="2" />
    </>
  ),
  thrust: () => (
    <>
      <path d="M6 22h8" />
      <path d="M14 22 L22 12" />
      <path d="M10 22 L10 16 L22 12" />
      <circle cx="24" cy="10" r="2" />
    </>
  ),
  kickback: () => (
    <>
      <circle cx="10" cy="10" r="2" />
      <path d="M10 12 L12 20 L8 26" />
      <path d="M12 20 L24 12" />
      <circle cx="24" cy="12" r="2" />
    </>
  ),
  pullup: () => (
    <>
      <path d="M6 8h20" />
      <path d="M10 8 L12 18 L16 14 L20 18 L22 8" />
      <circle cx="16" cy="22" r="2" />
    </>
  ),
  pulldown: () => (
    <>
      <path d="M8 6h16" />
      <path d="M16 6v8" />
      <path d="M10 14h12" />
      <path d="M10 14 L8 24M22 14 L24 24" />
    </>
  ),
  row: () => (
    <>
      <path d="M6 16h10" />
      <path d="M16 16 L24 10M16 16 L24 22" />
      <circle cx="24" cy="10" r="2" />
      <circle cx="24" cy="22" r="2" />
      <path d="M8 12v8" />
    </>
  ),
  onearm: () => (
    <>
      <path d="M8 20h10" />
      <path d="M18 20 L24 10" />
      <circle cx="24" cy="10" r="2.2" />
      <circle cx="10" cy="8" r="2" />
      <path d="M10 10v10" />
    </>
  ),
  shrug: () => (
    <>
      <circle cx="16" cy="10" r="2.2" />
      <path d="M8 16h16" />
      <path d="M10 16 L10 12M22 16 L22 12" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="24" cy="16" r="2" />
    </>
  ),
  facepull: () => (
    <>
      <circle cx="16" cy="10" r="2.2" />
      <path d="M16 12v6" />
      <path d="M8 16 L16 18 L24 16" />
      <path d="M8 16 L6 12M24 16 L26 12" />
    </>
  ),
  reversefly: () => (
    <>
      <circle cx="16" cy="12" r="2" />
      <path d="M16 14v6" />
      <path d="M16 16 L6 12M16 16 L26 12" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="26" cy="12" r="2" />
    </>
  ),
  ohp: () => (
    <>
      <path d="M8 10h16" />
      <circle cx="8" cy="10" r="2" />
      <circle cx="24" cy="10" r="2" />
      <path d="M16 10v10" />
      <circle cx="16" cy="22" r="2.2" />
    </>
  ),
  lateral: () => (
    <>
      <circle cx="16" cy="12" r="2.2" />
      <path d="M16 14v8" />
      <path d="M6 16 L16 18 L26 16" />
      <circle cx="6" cy="16" r="2" />
      <circle cx="26" cy="16" r="2" />
    </>
  ),
  frontraise: () => (
    <>
      <circle cx="16" cy="14" r="2.2" />
      <path d="M16 16v8" />
      <path d="M16 18 L16 8" />
      <circle cx="16" cy="8" r="2" />
      <path d="M12 24h8" />
    </>
  ),
  curl: () => (
    <>
      <path d="M10 24 L10 16 L18 10" />
      <circle cx="18" cy="10" r="2.2" />
      <path d="M10 16h6" />
    </>
  ),
  hammer: () => (
    <>
      <path d="M12 24 L12 14 L12 8" />
      <path d="M8 8h8" />
      <circle cx="16" cy="8" r="2" />
    </>
  ),
  preacher: () => (
    <>
      <path d="M6 22 L14 14 L14 8" />
      <path d="M8 18h12" />
      <circle cx="14" cy="8" r="2.2" />
    </>
  ),
  pushdown: () => (
    <>
      <path d="M16 6v8" />
      <path d="M10 14h12" />
      <path d="M16 14 L16 24" />
      <path d="M12 24h8" />
    </>
  ),
  skull: () => (
    <>
      <path d="M8 12h16" />
      <path d="M16 12v10" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="24" cy="12" r="2" />
      <path d="M12 22h8" />
    </>
  ),
  overheadext: () => (
    <>
      <circle cx="16" cy="20" r="2.2" />
      <path d="M16 18 L16 10" />
      <path d="M12 10h8" />
      <circle cx="16" cy="8" r="2" />
    </>
  ),
  crunch: () => (
    <>
      <path d="M6 22 L12 16 L20 14" />
      <circle cx="22" cy="12" r="2" />
      <path d="M12 16 L10 10" />
    </>
  ),
  plank: () => (
    <>
      <path d="M6 18h20" />
      <path d="M8 18v6M24 18v6" />
      <circle cx="26" cy="16" r="2" />
    </>
  ),
  legraise: () => (
    <>
      <path d="M8 8h16" />
      <path d="M16 8v6" />
      <path d="M16 14 L10 24M16 14 L22 24" />
    </>
  ),
  twist: () => (
    <>
      <circle cx="16" cy="10" r="2" />
      <path d="M16 12v8" />
      <path d="M8 16c4 6 12 6 16 0" />
    </>
  ),
  chop: () => (
    <>
      <path d="M8 8 L24 24" />
      <path d="M8 8h6M18 24h6" />
      <circle cx="8" cy="8" r="2" />
    </>
  ),
  abduction: () => (
    <>
      <path d="M16 8v8" />
      <path d="M16 16 L8 24M16 16 L24 24" />
      <path d="M6 24h6M20 24h6" />
    </>
  ),
  stepup: () => (
    <>
      <path d="M6 24h10v-8H6z" />
      <circle cx="20" cy="8" r="2" />
      <path d="M20 10 L18 16 L22 24" />
      <path d="M18 16 L14 16" />
    </>
  ),
  pallof: () => (
    <>
      <circle cx="16" cy="10" r="2" />
      <path d="M16 12v10" />
      <path d="M16 16h10" />
      <path d="M6 16h6" />
    </>
  ),
  machine: () => (
    <>
      <rect x="8" y="8" width="16" height="16" rx="2" />
      <path d="M12 16h8" />
      <path d="M16 12v8" />
    </>
  ),
};

const ID_GLYPH: Record<string, string> = {
  "barbell-bench": "bench",
  "incline-bench": "incline",
  "dumbbell-bench": "bench",
  "chest-press-machine": "machine",
  "pec-deck": "pecdeck",
  "cable-fly": "fly",
  "decline-bench": "decline",
  "push-up": "pushup",
  "chest-dip": "dip",
  "dumbbell-fly": "fly",
  "barbell-squat": "squat",
  "smith-squat": "squat",
  "leg-press": "legpress",
  "hack-squat": "hack",
  "leg-extension": "legext",
  "leg-curl": "legcurl",
  "calf-raise": "calf",
  "walking-lunge": "lunge",
  "bulgarian-split": "lunge",
  "goblet-squat": "squat",
  "front-squat": "squat",
  "hip-abduction": "abduction",
  "hip-adduction": "abduction",
  deadlift: "deadlift",
  rdl: "hinge",
  "hip-thrust": "thrust",
  "cable-kickback": "kickback",
  "glute-bridge": "thrust",
  "sumo-deadlift": "deadlift",
  "step-up": "stepup",
  "pull-up": "pullup",
  "chin-up": "pullup",
  "lat-pulldown": "pulldown",
  "seated-row": "row",
  "barbell-row": "row",
  "one-arm-row": "onearm",
  "t-bar-row": "row",
  shrug: "shrug",
  "reverse-pec-deck": "reversefly",
  "straight-arm-pulldown": "pulldown",
  "face-pull": "facepull",
  ohp: "ohp",
  "db-shoulder-press": "ohp",
  "machine-shoulder-press": "machine",
  "lateral-raise": "lateral",
  "arnold-press": "ohp",
  "front-raise": "frontraise",
  "rear-delt-fly": "reversefly",
  "cable-lateral": "lateral",
  "bicep-curl": "curl",
  "tricep-pushdown": "pushdown",
  "hammer-curl": "hammer",
  "preacher-curl": "preacher",
  "skull-crusher": "skull",
  "overhead-extension": "overheadext",
  "close-grip-bench": "bench",
  "cable-curl": "curl",
  "cable-crunch": "crunch",
  plank: "plank",
  "hanging-leg-raise": "legraise",
  "hanging-knee-raise": "legraise",
  "ab-wheel": "crunch",
  woodchop: "chop",
  "russian-twist": "twist",
  "pallof-press": "pallof",
};

const EQUIP_FALLBACK: Record<string, string> = {
  barbell: "deadlift",
  dumbbell: "curl",
  machine: "machine",
  cable: "pulldown",
  bodyweight: "pushup",
};

export function ExerciseIcon({
  id,
  size = 40,
  className,
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const ex = getExercise(id);
  const muscle: MuscleGroup = ex?.muscle ?? "core";
  const tint = TINT[muscle];
  const key = ID_GLYPH[id] ?? EQUIP_FALLBACK[ex?.equipment ?? "barbell"] ?? "machine";
  const glyph = G[key] ?? G.machine;
  const icon = Math.round(size * 0.62);
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-lg", className)}
      style={{
        width: size,
        height: size,
        color: tint,
        background: `color-mix(in oklab, ${tint} 16%, var(--color-elevated))`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tint} 38%, transparent)`,
      }}
      aria-hidden
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyph()}
      </svg>
    </span>
  );
}
