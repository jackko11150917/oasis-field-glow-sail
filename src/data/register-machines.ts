import { EXERCISES, EXERCISE_MAP, type Exercise } from "./exercises";
import { MACHINE_EXERCISES } from "./machine-exercises";

let registered = false;

/** 合併額外器械動作進 EXERCISES / EXERCISE_MAP（模組載入時呼叫一次） */
export function ensureMachinesRegistered(): void {
  if (registered) return;
  registered = true;
  for (const e of MACHINE_EXERCISES as unknown as Exercise[]) {
    if (EXERCISE_MAP[e.id]) continue;
    EXERCISES.push(e);
    EXERCISE_MAP[e.id] = e;
  }
}

ensureMachinesRegistered();
