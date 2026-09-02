import { createFileRoute, Link } from "@tanstack/react-router";
import { RankEmblem } from "@/components/rank-badge";
import { ExerciseIcon } from "@/components/exercise-icon";
import { Progress } from "@/components/ui/progress";
import { EXERCISES, MUSCLE_LABELS } from "@/data/exercises";
import { TIER_GROUPS, UNRANKED } from "@/data/ranks";
import { bestSets, overallRank, rankExercise } from "@/lib/stats";
import { useGymStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rank")({ component: RankPage });

function RankPage() {
  return <RankInner />;
}

function RankInner() {
  const profile = useGymStore((s) => s.profile);
  const workouts = useGymStore((s) => s.workouts);
  const overall = overallRank(workouts, profile);
  const best = bestSets(workouts);

  const rows = EXERCISES.map((ex) => rankExercise(ex, best[ex.id] ?? null, profile)).sort((a, b) => {
    if (!!a.best !== !!b.best) return a.best ? -1 : 1;
    return b.percentile - a.percentile;
  });

  return (
    <div className="px-5 pt-6 pb-8">
      <p className="text-xs tracking-widest text-muted-foreground">RANKED</p>
      <h1 className="mt-1 font-display text-4xl tracking-wide">段位</h1>

      <div className="mt-5 rounded-xl border border-border bg-card p-5 text-center">
        <RankEmblem rank={overall.rank} size={120} className="mx-auto" editable />
        <p className="mt-3 font-display text-4xl tracking-wide">{overall.rank.nameZh}</p>
        <p className="text-xs tracking-widest text-muted-foreground">{overall.rank.nameEn}</p>
        {overall.counted ? (
          <>
            <p className="mt-3 font-display text-2xl tabular-nums">
              超過 {Math.round(overall.percentile)}%
            </p>
            <p className="text-sm text-muted-foreground">
              估計全球百分位 · 以 {overall.counted} 項動作加權
            </p>
            {overall.next ? (
              <div className="mt-4 text-left">
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>距 {overall.next.nameZh}</span>
                  <span className="tabular-nums">{Math.round(overall.progress * 100)}%</span>
                </div>
                <Progress value={overall.progress * 100} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-accent">已達最高段位</p>
            )}
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">完成訓練並記錄重量後會定段。</p>
        )}
      </div>

      <section className="mt-6">
        <h2 className="text-sm font-medium">段位一覽</h2>
        <p className="mt-1 text-xs text-subtle">
          黑鐵至鑽石各分 3、2、1，1 為該階最高。大師同宗師無分段。撳徽章可上傳自己嘅段位 logo。
        </p>
        <ul className="mt-3 space-y-2">
          {TIER_GROUPS.map((g) => {
            const active = overall.rank.id !== UNRANKED.id && overall.rank.tier === g.tier;
            return (
              <li
                key={g.tier}
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5",
                  active ? "border-accent/40" : "border-border",
                )}
              >
                <RankEmblem rank={g.emblem} size={48} editable />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{g.nameZh}</p>
                  <p className="text-xs tracking-widest text-subtle">{g.nameEn}</p>
                </div>
                {g.ranks.length > 1 ? (
                  <div className="flex gap-1">
                    {g.ranks.map((r) => {
                      const on = overall.rank.id === r.id;
                      return (
                        <span
                          key={r.id}
                          className={cn(
                            "flex size-8 items-center justify-center rounded-md text-xs tabular-nums",
                            on
                              ? "bg-accent text-accent-foreground"
                              : "bg-elevated text-muted-foreground",
                          )}
                          title={r.nameZh}
                        >
                          {r.division}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-xs text-subtle">超過 {g.min}%</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium">各動作段位</h2>
        <p className="mt-1 text-xs text-subtle">
          以估計 1RM 對體重比例，對照休閒至進階訓練者分布。70kg 體重臥推約 60kg
          會落喺白金附近。
        </p>
        <ul className="mt-3 space-y-2">
          {rows.map((row) => (
            <li key={row.exercise.id}>
              <Link
                to="/guide/$id"
                params={{ id: row.exercise.id }}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-3 py-3"
              >
                <ExerciseIcon id={row.exercise.id} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{row.exercise.nameZh}</p>
                  <p className="text-xs text-muted-foreground">
                    {MUSCLE_LABELS[row.exercise.muscle]}
                    {row.best ? ` · ${row.best.weight} kg × ${row.best.reps}` : " · 未有紀錄"}
                  </p>
                  {row.best && row.next && row.kgToNext != null && row.kgToNext > 0 ? (
                    <p className="text-xs text-subtle">
                      估計 1RM 再加 {row.kgToNext} kg 可挑戰 {row.next.nameZh}
                    </p>
                  ) : null}
                </div>
                {row.best ? (
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <RankEmblem rank={row.rank} size={40} />
                    <span
                      className="text-xs font-medium"
                      style={{ color: `var(--color-${row.rank.token})` }}
                    >
                      {row.rank.nameZh}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-subtle">未定級</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
