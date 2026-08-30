export type Sex = "male" | "female";

export type SetLog = {
  id: string;
  weight: number;
  reps: number;
  done: boolean;
};

export type WorkoutExercise = {
  exerciseId: string;
  sets: SetLog[];
};

export type Workout = {
  id: string;
  name: string;
  startedAt: string;
  finishedAt: string;
  exercises: WorkoutExercise[];
  xpEarned: number;
  breakdown: { label: string; amount: number }[];
  prs: string[];
};

export type ActiveSession = {
  name: string;
  startedAt: string;
  exercises: WorkoutExercise[];
};

export type Profile = {
  name: string;
  sex: Sex;
  bodyweight: number;
  onboarded: boolean;
};

export type WorkoutSummary = {
  workoutId: string;
  xp: number;
  breakdown: { label: string; amount: number }[];
  prs: string[];
  leveledUpTo: number | null;
  streak: number;
};
