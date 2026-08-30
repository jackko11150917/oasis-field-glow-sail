import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EXERCISES, getExercise, MUSCLE_LABELS } from "@/data/exercises";
import { historyForExercise, workoutVolume } from "@/lib/stats";
import { useGymStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { e1rm } from "@/lib/xp";

const LiftChart = lazy(() =>
  import("@/components/lift-chart").then((m) => ({ default: m.LiftChart })),
);

export const Route = createFileRoute("/log")({ component: LogPage });

function LogPage() {
  return <LogInner />;
}

function LogInner() {
  const workouts = useGymStore((s) => s.workouts);
  const [tab, setTab] = useState<"sessions" | "lifts">("sessions");
  const [openId, setOpenId] = useState<string | null>(null);
  const [liftId, setLiftId] = useState(EXERCISES[0].id);

  const reversed = useMemo(() => [...workouts].reverse(), [workouts]);
  const history = useMemo(() => historyForExercise(workouts, liftId), [workouts, liftId]);
  const lift = getExercise(liftId);

  return (
    <div className="px-5 pt-6 pb-8">
      <p className="text-xs tracking-widest text-muted-foreground">LOG</p>
      <h1 className="mt-1 font-display text-4xl tracking-wide">訓練紀錄</h1>

      <div className="mt-4 grid grid-cols-2 rounded-lg bg-elevated p-1">
        {(
          [
            ["sessions", "場次"],
            ["lifts", "動作進度"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-10 rounded-md text-sm transition-colors duration-150",
              tab === id ? "bg-card text-foreground" : "text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "sessions" ? (
        reversed.length === 0 ? (
          <EmptyLog />
        ) : (
          <ul className="mt-4 space-y-2">
            {reversed.map((w) => {
              const open = openId === w.id;
              const vol = workoutVolume(w.exercises);
              return (
                <li key={w.id} className="rounded-xl border border-border bg-card">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                    onClick={() => setOpenId(open ? null : w.id)}
                  >
                    <span>
                      <span className="block font-medium">{w.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(w.finishedAt).toLocaleString("zh-HK", {
                          month: "short",
                          day: "numeric",
                          weekday: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block font-display text-lg tabular-nums">+{w.xpEarned}</span>
                      <span className="text-xs text-subtle">{vol} kg</span>
                    </span>
                  </button>
                  {open ? (
                    <div className="border-t border-border px-4 py-3">
                      {w.exercises.map((ex) => {
                        const meta = getExercise(ex.exerciseId);
                        return (
                          <div key={ex.exerciseId} className="mb-3 last:mb-0">
                            <p className="text-sm font-medium">{meta?.nameZh ?? ex.exerciseId}</p>
                            <table className="mt-1 w-full text-sm">
                              <thead>
                                <tr className="text-left text-xs text-subtle">
                                  <th className="py-1 font-medium">組</th>
                                  <th className="py-1 font-medium">重量</th>
                                  <th className="py-1 font-medium">次數</th>
                                  <th className="py-1 font-medium">估計 1RM</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ex.sets.map((s, i) => (
                                  <tr key={s.id} className="tabular-nums text-muted-foreground">
                                    <td className="py-0.5">{i + 1}</td>
                                    <td>{s.weight}</td>
                                    <td>{s.reps}</td>
                                    <td>{e1rm(s.weight, s.reps)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                      {w.prs.length ? (
                        <p className="mt-2 text-xs text-accent">
                          新紀錄：
                          {w.prs.map((id) => getExercise(id)?.nameZh ?? id).join("、")}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )
      ) : (
        <div className="mt-4">
          <label className="text-sm text-muted-foreground">選擇動作</label>
          <select
            className="mt-1 h-11 w-full rounded-md border border-input bg-elevated px-3 text-base"
            value={liftId}
            onChange={(e) => setLiftId(e.target.value)}
          >
            {EXERCISES.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nameZh} · {MUSCLE_LABELS[e.muscle]}
              </option>
            ))}
          </select>

          {history.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              呢個動作未有紀錄。去訓練頁加一組先。
            </p>
          ) : (
            <>
              <div className="mt-4 h-44 min-w-0 rounded-xl border border-border bg-card p-2">
                <Suspense fallback={<div className="h-full rounded-md bg-elevated" />}>
                  <LiftChart data={history.map((h) => ({ ...h, label: shortDate(h.date) }))} />
                </Suspense>
              </div>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="table-min w-full text-sm">
                  <thead className="bg-elevated text-left text-xs text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">日期</th>
                      <th className="px-3 py-2 font-medium">重量</th>
                      <th className="px-3 py-2 font-medium">次數</th>
                      <th className="px-3 py-2 font-medium">1RM</th>
                      <th className="px-3 py-2 font-medium">容量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...history].reverse().map((row) => (
                      <tr key={row.date + row.weight + row.reps} className="border-t border-border tabular-nums">
                        <td className="px-3 py-2">{shortDate(row.date)}</td>
                        <td className="px-3 py-2">{row.weight}</td>
                        <td className="px-3 py-2">{row.reps}</td>
                        <td className="px-3 py-2">{row.e1rm}</td>
                        <td className="px-3 py-2">{row.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {lift ? (
                <p className="mt-3 text-xs text-subtle">
                  {lift.loadKind === "dumbbell" ? "重量為單手。" : null}
                  {lift.loadKind === "bodyweight" ? "重量為額外負重。" : null}
                  估計 1RM 用 Epley 公式。
                </p>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyLog() {
  return (
    <div className="mt-16 text-center">
      <p className="text-sm text-muted-foreground">未有訓練紀錄。</p>
      <Button asChild className="mt-4">
        <Link to="/train">開始第一場</Link>
      </Button>
    </div>
  );
}

function shortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
