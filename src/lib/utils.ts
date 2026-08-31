import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function localISODate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function shiftISODate(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() + days);
  return localISODate(date);
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function isoWeekKey(date = new Date()): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - day);
  const year = d.getFullYear();
  const yearStart = new Date(year, 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

export function relativeTrainLabel(iso: string | null, now = new Date()): string {
  if (!iso) return "尚未訓練";
  const then = new Date(iso);
  const today = localISODate(now);
  const day = localISODate(then);
  if (day === today) return "今日已練";
  const yest = shiftISODate(today, -1);
  if (day === yest) return "昨日已練";
  const diff = Math.round((new Date(today).getTime() - new Date(day).getTime()) / 86400000);
  if (diff > 0 && diff < 14) return `${diff} 日前`;
  return then.toLocaleDateString("zh-HK", { month: "short", day: "numeric" });
}
