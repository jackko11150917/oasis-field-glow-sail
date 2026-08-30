import { createFileRoute, Link } from "@tanstack/react-router";
import { RankChip, RankEmblem } from "@/components/rank-badge";
import { Progress } from "@/components/ui/progress";
import { EXERCISES, MUSCLE_LABELS } from "@/data/exercises";
import { RANKS, UNRANKED } from "@/data/ranks";
import { bestSets, overallRank, rankExercise } from "@/lib/stats";
import { useGymStore } from "@/lib/store";

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
        <RankEmblem rank={overall.rank} size={120} className="mx-auto" />
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
        <ul className="mt-2 grid grid-cols-2 gap-2">
          {RANKS.map((r) => (
            <li
              key={r.id}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"
            >
              <RankEmblem rank={r} size={36} />
              <div>
                <p className="text-sm">{r.nameZh}</p>
                <p className="text-xs text-subtle">
                  {r.min === 0 ? "起步" : `超過 ${r.min}% 起`}
                </p>
              </div>
            </li>
          ))}
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
                <RankEmblem rank={row.rank.id === UNRANKED.id ? RANKS[0] : row.rank} size={44} />
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
                  <RankChip rank={row.rank} percentile={row.percentile} />
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
