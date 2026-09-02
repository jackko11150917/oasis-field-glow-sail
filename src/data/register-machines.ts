import { EXERCISES, EXERCISE_MAP, type Exercise } from "./exercises";
import { MACHINE_EXERCISES } from "./machine-exercises";

/** 合併額外器械動作進 EXERCISES / EXERCISE_MAP */
export function ensureMachinesRegistered(): void {
  for (const e of MACHINE_EXERCISES as unknown as Exercise[]) {
    if (EXERCISE_MAP[e.id]) continue;
    EXERCISES.push(e);
    EXERCISE_MAP[e.id] = e;
  }
}

// 模組一 load 就註冊，避免 tree-shake 掉 side-effect
ensureMachinesRegistered();
