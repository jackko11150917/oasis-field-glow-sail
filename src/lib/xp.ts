export function xpToNext(level: number): number {
  return Math.round(100 * Math.pow(level, 1.22));
}

export function progressFromXp(xp: number): {
  level: number;
  into: number;
  need: number;
} {
  let level = 1;
  let remaining = Math.max(0, xp);
  for (let i = 0; i < 99; i++) {
    const need = xpToNext(level);
    if (remaining < need) return { level, into: remaining, need };
    remaining -= need;
    level += 1;
  }
  return { level: 99, into: 0, need: 1 };
}

export function titleForLevel(level: number): string {
  if (level >= 30) return "傳奇";
  if (level >= 20) return "冠軍";
  if (level >= 15) return "精英";
  if (level >= 10) return "戰士";
  if (level >= 5) return "訓練者";
  return "新兵";
}

export function e1rm(weight: number, reps: number): number {
  if (weight <= 0 || reps <= 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}
