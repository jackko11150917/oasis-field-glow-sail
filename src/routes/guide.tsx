import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ExerciseIcon } from "@/components/exercise-icon";
import { Input } from "@/components/ui/input";
import {
  EQUIPMENT_LABELS,
  EXERCISES as BASE_EXERCISES,
  MUSCLE_LABELS,
  type Exercise,
  type MuscleGroup,
} from "@/data/exercises";
import { MACHINE_EXERCISES } from "@/data/machine-exercises";
import { cn } from "@/lib/utils";

const EXERCISES: Exercise[] = [
  ...BASE_EXERCISES,
  ...(MACHINE_EXERCISES as unknown as Exercise[]),
];

export const Route = createFileRoute("/guide")({ component: GuidePage });

function GuidePage() {
  return <GuideInner />;
}

function GuideInner() {
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState<MuscleGroup | "all">("all");
  const list = useMemo(() => {
    return EXERCISES.filter((e) => {
      if (muscle !== "all" && e.muscle !== muscle) return false;
      if (!q.trim()) return true;
      const s = q.trim().toLowerCase();
      return (
        e.nameZh.includes(q.trim()) ||
        e.nameEn.toLowerCase().includes(s) ||
        e.cues.some((c) => c.includes(q.trim()))
      );
    });
  }, [q, muscle]);

  return (
    <div className="px-5 pt-6 pb-8">
      <p className="text-xs tracking-widest text-muted-foreground">COACHING</p>
      <h1 className="mt-1 font-display text-4xl tracking-wide">動作指導</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        沉肩、挺胸、夾背——每部機、每個動作嘅關鍵提示。
      </p>

      <div className="relative mt-5">
        <Search className="pointer-events-none absolute top-3 left-3 size-4 text-subtle" />
        <Input
          className="pl-9"
          placeholder="搜尋動作、器械或提示"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        <FilterChip active={muscle === "all"} onClick={() => setMuscle("all")}>
          全部
        </FilterChip>
        {(Object.keys(MUSCLE_LABELS) as MuscleGroup[]).map((m) => (
          <FilterChip key={m} active={muscle === m} onClick={() => setMuscle(m)}>
            {MUSCLE_LABELS[m]}
          </FilterChip>
        ))}
      </div>

      <p className="mt-3 text-xs text-subtle">{list.length} 個動作</p>

      <ul className="mt-3 space-y-2">
        {list.map((e) => (
          <li key={e.id}>
            <Link
              to="/guide/$id"
              params={{ id: e.id }}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-colors duration-150 hover:bg-elevated"
            >
              <ExerciseIcon id={e.id} size={48} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-baseline justify-between gap-2">
                  <p className="min-w-0 truncate font-medium">{e.nameZh}</p>
                  <p className="shrink-0 text-xs text-subtle">
                    {MUSCLE_LABELS[e.muscle]} · {EQUIPMENT_LABELS[e.equipment]}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.cues.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-accent"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">冇搵到相關動作</p>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
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
