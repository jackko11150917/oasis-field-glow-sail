import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Settings, Swords } from "lucide-react";
import { RankEmblem } from "@/components/rank-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { overallRank, trainedDays, lastNDates, computeStreak } from "@/lib/stats";
import { useGymStore } from "@/lib/store";
import { cn, localISODate } from "@/lib/utils";
import { progressFromXp, titleForLevel } from "@/lib/xp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HomeInner />;
}

function HomeInner() {
  const profile = useGymStore((s) => s.profile);
  const xp = useGymStore((s) => s.xp);
  const workouts = useGymStore((s) => s.workouts);
  const session = useGymStore((s) => s.session);
  const { level, into, need } = progressFromXp(xp);
  const overall = overallRank(workouts, profile);
  const streak = computeStreak(workouts);
  const today = localISODate();
  const trainedToday = workouts.some((w) => localISODate(new Date(w.finishedAt)) === today);
  const days = trainedDays(workouts);
  const grid = lastNDates(28);
  const recent = [...workouts].slice(-3).reverse();

  return (
    <div className="px-5 pt-6">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground">IRON RANK</p>
          <h1 className="mt-1 max-w-[16rem] truncate text-2xl font-medium">{profile.name}</h1>
        </div>
        <Link
          to="/profile"
          className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated"
          aria-label="設定"
        >
          <Settings className="size-5" />
        </Link>
      </header>

      <div className="mt-6 space-y-4">
        <section className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-4xl tabular-nums leading-none tracking-wide">
                LV.{level}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{titleForLevel(level)}</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flame className="size-4 text-accent" />
              <span className="tabular-nums">{streak}</span>
              <span>日連續</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>經驗</span>
              <span className="tabular-nums">
                {into} / {need} XP
              </span>
            </div>
            <Progress value={(into / need) * 100} />
          </div>
        </section>

        <Link
          to="/rank"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors duration-150 hover:bg-elevated"
        >
          <RankEmblem rank={overall.rank} size={72} />
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl tracking-wide">{overall.rank.nameZh}</p>
            <p className="text-xs tracking-widest text-muted-foreground">{overall.rank.nameEn}</p>
            {overall.counted ? (
              <p className="mt-1 text-sm text-muted-foreground">
                估計超過全球 {Math.round(overall.percentile)}%
                {overall.next
                  ? ` · 距 ${overall.next.nameZh} ${Math.round((1 - overall.progress) * 100)}%`
                  : ""}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">完成訓練即可解鎖段位</p>
            )}
          </div>
        </Link>

        <section className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium">今日任務</h2>
            <span className="text-xs text-muted-foreground">{trainedToday ? "已完成" : "未完成"}</span>
          </div>
          <ul className="space-y-2 text-sm">
            <Quest done={trainedToday} label="完成一次訓練" hint="+40 XP 首次獎勵" />
            <Quest
              done={workouts.some(
                (w) => w.prs.length > 0 && localISODate(new Date(w.finishedAt)) === today,
              )}
              label="刷新一項個人紀錄"
              hint="+60 XP"
            />
            <Quest done={streak >= 3} label="連續訓練 3 日" hint="連續獎勵疊加" />
          </ul>
        </section>

        {session ? (
          <Button asChild size="lg" className="w-full">
            <Link to="/train">繼續訓練</Link>
          </Button>
        ) : (
          <Button asChild size="lg" className="w-full">
            <Link to="/train">
              <Swords className="size-4" />
              開始訓練
            </Link>
          </Button>
        )}

        <section>
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">近 28 日</h2>
          <div className="grid grid-cols-7 gap-1.5">
            {grid.map((d) => (
              <div
                key={d}
                title={d}
                className={cn(
                  "aspect-square rounded-xs",
                  days.has(d) ? "bg-accent" : "bg-elevated",
                )}
              />
            ))}
          </div>
        </section>

        {recent.length > 0 ? (
          <section className="pb-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">最近訓練</h2>
              <Link to="/log" className="text-xs text-accent">
                全部
              </Link>
            </div>
            <ul className="space-y-2">
              {recent.map((w) => (
                <li
                  key={w.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{w.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(w.finishedAt).toLocaleDateString("zh-HK", {
                        month: "short",
                        day: "numeric",
                      })}
                      {" · "}
                      {w.exercises.length} 個動作
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg tabular-nums">+{w.xpEarned}</p>
                    <p className="text-xs text-subtle">{w.prs.length ? "新紀錄" : "XP"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="pb-6 text-center text-sm text-muted-foreground">
            尚未有紀錄。去指導頁睇動作，或者直接開一場推日。
          </p>
        )}
      </div>
    </div>
  );
}

function Quest({ done, label, hint }: { done: boolean; label: string; hint: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
          done ? "border-accent bg-accent" : "border-border",
        )}
      >
        {done ? <span className="block size-1.5 rounded-full bg-accent-foreground" /> : null}
      </span>
      <span>
        <span className={cn(done && "text-muted-foreground line-through")}>{label}</span>
        <span className="mt-0.5 block text-xs text-subtle">{hint}</span>
      </span>
    </li>
  );
}
