import type { ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { RankChip, RankEmblem } from "@/components/rank-badge";
import { Button } from "@/components/ui/button";
import { EQUIPMENT_LABELS, getExercise, MUSCLE_LABELS } from "@/data/exercises";
import { UNRANKED } from "@/data/ranks";
import { bestSets, loadKindHint, rankExercise } from "@/lib/stats";
import { useGymStore } from "@/lib/store";

export const Route = createFileRoute("/guide/$id")({ component: GuideDetailPage });

function GuideDetailPage() {
  return <GuideDetail />;
}

function GuideDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const exercise = getExercise(id);
  const profile = useGymStore((s) => s.profile);
  const workouts = useGymStore((s) => s.workouts);
  const startSession = useGymStore((s) => s.startSession);
  const session = useGymStore((s) => s.session);
  const addExercise = useGymStore((s) => s.addExercise);

  if (!exercise) {
    return (
      <div className="px-5 pt-10 text-center">
        <p>搵唔到呢個動作。</p>
        <Link to="/guide" className="mt-3 inline-block text-accent">
          返回指導
        </Link>
      </div>
    );
  }

  const best = bestSets(workouts)[exercise.id] ?? null;
  const ranked = rankExercise(exercise, best, profile);

  return (
    <div className="px-5 pt-5 pb-8">
      <Link
        to="/guide"
        className="inline-flex h-11 items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        指導
      </Link>

      <p className="mt-2 text-xs tracking-widest text-muted-foreground">{exercise.nameEn}</p>
      <h1 className="font-display text-4xl tracking-wide">{exercise.nameZh}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {MUSCLE_LABELS[exercise.muscle]} · {EQUIPMENT_LABELS[exercise.equipment]} ·{" "}
        {loadKindHint(exercise.loadKind)}
      </p>
      <p className="mt-3 text-sm">{exercise.summary}</p>

      {ranked.rank.id !== UNRANKED.id ? (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          <RankEmblem rank={ranked.rank} size={56} />
          <div>
            <RankChip rank={ranked.rank} percentile={ranked.percentile} />
            <p className="mt-1 text-xs text-muted-foreground">
              最佳 {ranked.best?.weight} kg × {ranked.best?.reps} · 估計 1RM {ranked.best?.e1rm} kg
            </p>
          </div>
        </div>
      ) : null}

      <Section title="設置">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {exercise.setup.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Section>

      <Section title="關鍵提示">
        <div className="flex flex-wrap gap-2">
          {exercise.cues.map((c) => (
            <span
              key={c}
              className="rounded-full border border-accent/30 bg-elevated px-3 py-1.5 text-sm text-accent"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      {exercise.machineTip ? (
        <Section title="器械要點">
          <p className="text-sm text-muted-foreground">{exercise.machineTip}</p>
        </Section>
      ) : null}

      <Section title="呼吸">
        <p className="text-sm text-muted-foreground">{exercise.breathing}</p>
      </Section>

      <Section title="常見錯誤">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {exercise.mistakes.map((m) => (
            <li key={m} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-destructive" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Button
        className="mt-6 w-full"
        size="lg"
        onClick={() => {
          if (session) addExercise(exercise.id);
          else startSession(exercise.nameZh, [exercise.id]);
          void navigate({ to: "/train" });
        }}
      >
        {session ? "加入今場訓練" : "用呢個動作開場"}
      </Button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-medium">{title}</h2>
      {children}
    </section>
  );
}
