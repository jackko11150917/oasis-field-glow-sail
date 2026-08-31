import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Minus, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { RankEmblem } from "@/components/rank-badge";
import { ExerciseIcon } from "@/components/exercise-icon";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  EQUIPMENT_LABELS,
  EXERCISES,
  MUSCLE_LABELS,
  TEMPLATES,
  getExercise,
  type MuscleGroup,
} from "@/data/exercises";
import { rankForLevel, SHOWCASE_RANK } from "@/data/ranks";
import { completedSetCount, loadKindHint, workoutVolume } from "@/lib/stats";
import { useGymStore } from "@/lib/store";
import type { WorkoutSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/train")({ component: TrainPage });

function TrainPage() {
  return <TrainInner />;
}

function TrainInner() {
  const session = useGymStore((s) => s.session);
  const lastSummary = useGymStore((s) => s.lastSummary);
  const clearSummary = useGymStore((s) => s.clearSummary);
  const navigate = useNavigate();

  if (lastSummary) {
    return (
      <SummaryView
        summary={lastSummary}
        onDone={() => {
          clearSummary();
          void navigate({ to: "/" });
        }}
      />
    );
  }

  if (!session) return <TemplatePicker />;
  return <Logger />;
}

function TemplatePicker() {
  const startTemplate = useGymStore((s) => s.startTemplate);
  const startSession = useGymStore((s) => s.startSession);

  return (
    <div className="px-5 pt-6 pb-8">
      <p className="text-xs tracking-widest text-muted-foreground">SESSION</p>
      <h1 className="mt-1 font-display text-4xl tracking-wide">開場訓練</h1>
      <p className="mt-2 text-sm text-muted-foreground">揀課表，或者由空白開始加動作。</p>

      <div className="mt-6 grid gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => startTemplate(t.id)}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 text-left transition-colors duration-150 hover:bg-elevated"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex -space-x-2">
                {t.exerciseIds.slice(0, 3).map((id) => (
                  <ExerciseIcon key={id} id={id} size={32} className="ring-2 ring-card" />
                ))}
              </div>
              <div className="min-w-0">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <span className="text-xs tabular-nums text-subtle">{t.exerciseIds.length} 項</span>
          </button>
        ))}
        <Button variant="secondary" className="mt-2 w-full" onClick={() => startSession("自訂訓練")}>
          空白訓練
        </Button>
      </div>
    </div>
  );
}

function Logger() {
  const session = useGymStore((s) => s.session)!;
  const addExercise = useGymStore((s) => s.addExercise);
  const removeExercise = useGymStore((s) => s.removeExercise);
  const addSet = useGymStore((s) => s.addSet);
  const removeSet = useGymStore((s) => s.removeSet);
  const updateSet = useGymStore((s) => s.updateSet);
  const finishSession = useGymStore((s) => s.finishSession);
  const discardSession = useGymStore((s) => s.discardSession);
  const [picker, setPicker] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const sets = completedSetCount(session.exercises);
  const volume = workoutVolume(
    session.exercises.map((e) => ({
      ...e,
      sets: e.sets.map((s) => ({ ...s, done: true })),
    })),
  );
  const doneVolume = workoutVolume(session.exercises);
  const canFinish = sets > 0;

  const elapsed = useMemo(() => {
    const ms = Date.now() - new Date(session.startedAt).getTime();
    const m = Math.max(0, Math.floor(ms / 60000));
    return m;
  }, [session.startedAt]);

  return (
    <div className="px-5 pt-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tabular-nums text-muted-foreground">{elapsed} 分鐘</p>
          <h1 className="max-w-[14rem] truncate font-display text-3xl tracking-wide">{session.name}</h1>
        </div>
        <button
          type="button"
          onClick={() => setConfirmDiscard(true)}
          className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated"
          aria-label="放棄"
        >
          <X className="size-5" />
        </button>
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        已完成 {sets} 組 · {doneVolume} kg
      </p>

      <div className="mt-4 space-y-4">
        {session.exercises.map((block) => {
          const ex = getExercise(block.exerciseId);
          if (!ex) return null;
          return (
            <section key={block.exerciseId} className="min-w-0 rounded-xl border border-border bg-card p-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2.5">
                  <ExerciseIcon id={ex.id} size={36} />
                  <div>
                    <p className="font-medium">{ex.nameZh}</p>
                    <p className="text-xs text-muted-foreground">
                      {loadKindHint(ex.loadKind)} · {MUSCLE_LABELS[ex.muscle]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    to="/guide/$id"
                    params={{ id: ex.id }}
                    className="px-2 py-1 text-xs text-accent"
                  >
                    指導
                  </Link>
                  <button
                    type="button"
                    className="flex size-9 items-center justify-center rounded-sm text-subtle hover:text-destructive"
                    onClick={() => removeExercise(ex.id)}
                    aria-label="移除動作"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="set-grid px-1 pb-1 text-xs text-subtle">
                <span>組</span>
                <span>重量</span>
                <span>次數</span>
                <span className="text-center">完成</span>
              </div>
              {block.sets.map((s, i) => (
                <div
                  key={s.id}
                  className={cn(
                    "mb-1 set-grid items-center rounded-md px-1 py-0.5",
                    s.done && "bg-elevated",
                  )}
                >
                  <span className="text-center text-xs tabular-nums text-muted-foreground">{i + 1}</span>
                  <Stepper
                    value={s.weight}
                    step={ex.loadKind === "dumbbell" || ex.loadKind === "bodyweight" ? 1 : 2.5}
                    min={0}
                    onChange={(weight) => updateSet(ex.id, s.id, { weight })}
                  />
                  <Stepper
                    value={s.reps}
                    step={1}
                    min={0}
                    onChange={(reps) => updateSet(ex.id, s.id, { reps })}
                  />
                  <button
                    type="button"
                    onClick={() => updateSet(ex.id, s.id, { done: !s.done })}
                    className={cn(
                      "mx-auto flex size-9 items-center justify-center rounded-sm border transition-colors duration-150",
                      s.done
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border text-subtle",
                    )}
                    aria-label={s.done ? "取消完成" : "標記完成"}
                  >
                    <Check className="size-4" />
                  </button>
                </div>
              ))}
              <div className="mt-1 flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => addSet(ex.id)}>
                  <Plus className="size-3.5" />
                  加一組
                </Button>
                {block.sets.length > 1 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSet(ex.id, block.sets[block.sets.length - 1].id)}
                  >
                    刪末組
                  </Button>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-2 pb-6">
        <Button variant="secondary" className="w-full" onClick={() => setPicker(true)}>
          新增動作
        </Button>
        <Button className="w-full" size="lg" disabled={!canFinish} onClick={() => finishSession()}>
          完成訓練
        </Button>
        <p className="text-center text-xs text-subtle">預計訓練量 {volume} kg（以已填重量計）</p>
      </div>

      <ExercisePicker
        open={picker}
        onOpenChange={setPicker}
        exclude={session.exercises.map((e) => e.exerciseId)}
        onPick={(id) => {
          addExercise(id);
          setPicker(false);
        }}
      />

      <Drawer open={confirmDiscard} onOpenChange={setConfirmDiscard}>
        <DrawerContent title="放棄呢場？">
          <p className="px-5 pt-2 text-sm text-muted-foreground">未完成嘅組數唔會存檔。</p>
          <div className="flex flex-col gap-2 p-5 pb-8">
            <Button
              variant="destructive"
              onClick={() => {
                discardSession();
                setConfirmDiscard(false);
              }}
            >
              放棄
            </Button>
            <Button variant="secondary" onClick={() => setConfirmDiscard(false)}>
              繼續練
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  step,
  min,
}: {
  value: number;
  onChange: (n: number) => void;
  step: number;
  min: number;
}) {
  return (
    <div className="flex h-10 min-w-0 items-center rounded-sm border border-border bg-elevated">
      <button
        type="button"
        className="flex size-8 shrink-0 items-center justify-center text-muted-foreground"
        onClick={() => onChange(Math.max(min, roundStep(value - step, step)))}
        aria-label="減少"
      >
        <Minus className="size-3.5" />
      </button>
      <input
        className="h-full min-w-0 flex-1 bg-transparent text-center text-sm tabular-nums outline-none"
        inputMode="decimal"
        value={String(value)}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(Math.max(min, n));
          if (e.target.value === "") onChange(min);
        }}
      />
      <button
        type="button"
        className="flex size-8 shrink-0 items-center justify-center text-muted-foreground"
        onClick={() => onChange(roundStep(value + step, step))}
        aria-label="增加"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

function roundStep(n: number, step: number) {
  const r = Math.round(n / step) * step;
  return Math.round(r * 10) / 10;
}

function ExercisePicker({
  open,
  onOpenChange,
  onPick,
  exclude,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPick: (id: string) => void;
  exclude: string[];
}) {
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState<MuscleGroup | "all">("all");
  const list = EXERCISES.filter((e) => {
    if (exclude.includes(e.id)) return false;
    if (muscle !== "all" && e.muscle !== muscle) return false;
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return e.nameZh.includes(q.trim()) || e.nameEn.toLowerCase().includes(s);
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent title="加入動作">
        <div className="px-5 pt-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-3 left-3 size-4 text-subtle" />
            <Input
              className="pl-9"
              placeholder="搜尋動作或英文名"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            <Chip active={muscle === "all"} onClick={() => setMuscle("all")}>
              全部
            </Chip>
            {(Object.keys(MUSCLE_LABELS) as MuscleGroup[]).map((m) => (
              <Chip key={m} active={muscle === m} onClick={() => setMuscle(m)}>
                {MUSCLE_LABELS[m]}
              </Chip>
            ))}
          </div>
        </div>
        <div className="mt-2 overflow-y-auto px-5 pb-8">
          {list.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => onPick(e.id)}
              className="flex w-full items-center gap-3 border-b border-border py-3 text-left last:border-0"
            >
              <ExerciseIcon id={e.id} size={36} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{e.nameZh}</span>
                <span className="text-xs text-muted-foreground">
                  {MUSCLE_LABELS[e.muscle]} · {EQUIPMENT_LABELS[e.equipment]}
                </span>
              </span>
              <Plus className="size-4 text-subtle" />
            </button>
          ))}
          {list.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">冇搵到動作</p>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 shrink-0 rounded-full px-3 text-xs",
        active ? "bg-accent text-accent-foreground" : "bg-elevated text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}

function SummaryView({
  summary,
  onDone,
}: {
  summary: WorkoutSummary;
  onDone: () => void;
}) {
  const rank = summary.leveledUpTo ? rankForLevel(summary.leveledUpTo) : SHOWCASE_RANK;

  return (
    <div className="summary-screen flex flex-col items-center justify-center px-6 text-center">
      <RankEmblem rank={rank} size={108} />
      {summary.leveledUpTo ? (
        <p className="mt-5 font-display text-4xl tracking-wide">升級 LV.{summary.leveledUpTo}</p>
      ) : (
        <p className="mt-5 font-display text-4xl tracking-wide">訓練完成</p>
      )}
      <p className="mt-2 font-display text-3xl tabular-nums text-accent">+{summary.xp} XP</p>
      <p className="mt-1 text-sm text-muted-foreground">連續 {summary.streak} 日</p>
      <ul className="mt-6 w-full max-w-xs space-y-1.5 text-sm">
        {summary.breakdown.map((b) => (
          <li key={b.label} className="flex justify-between text-muted-foreground">
            <span>{b.label}</span>
            <span className="tabular-nums text-foreground">+{b.amount}</span>
          </li>
        ))}
      </ul>
      {summary.prs.length ? (
        <p className="mt-4 text-sm text-accent">
          新紀錄 {summary.prs.map((id) => getExercise(id)?.nameZh ?? id).join("、")}
        </p>
      ) : null}
      <Button className="mt-8 w-full max-w-xs" size="lg" onClick={onDone}>
        回到主頁
      </Button>
    </div>
  );
}
