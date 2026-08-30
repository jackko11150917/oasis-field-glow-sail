import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@/lib/auth/gates";
import { useGymStore } from "@/lib/store";
import type { Sex } from "@/lib/types";
import { cn } from "@/lib/utils";
import { progressFromXp } from "@/lib/xp";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  return <ProfileInner />;
}

function ProfileInner() {
  const profile = useGymStore((s) => s.profile);
  const setProfile = useGymStore((s) => s.setProfile);
  const resetAll = useGymStore((s) => s.resetAll);
  const xp = useGymStore((s) => s.xp);
  const workouts = useGymStore((s) => s.workouts);
  const [name, setName] = useState(profile.name);
  const [bw, setBw] = useState(String(profile.bodyweight));
  const [sex, setSex] = useState<Sex>(profile.sex);
  const [saved, setSaved] = useState(false);
  const level = progressFromXp(xp).level;

  function save() {
    setProfile({
      name: name.trim() || profile.name,
      bodyweight: Math.max(30, Math.min(250, Number(bw) || profile.bodyweight)),
      sex,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="px-5 pt-5 pb-8">
      <Link
        to="/"
        className="inline-flex h-11 items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        主頁
      </Link>
      <h1 className="mt-2 font-display text-4xl tracking-wide">檔案</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        LV.{level} · {workouts.length} 場訓練 · {xp} XP
      </p>
      <div className="mt-4 min-w-0 overflow-x-auto rounded-xl border border-border bg-card px-3 py-3">
        <p className="mb-2 text-xs text-muted-foreground">雲端帳號</p>
        <UserButton />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted-foreground">稱呼</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-muted-foreground">性別</span>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["male", "男性"],
                ["female", "女性"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSex(id)}
                className={cn(
                  "h-11 rounded-md border text-sm",
                  sex === id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-elevated",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-muted-foreground">體重 kg</span>
          <Input inputMode="decimal" value={bw} onChange={(e) => setBw(e.target.value)} />
        </label>
        <Button onClick={save}>{saved ? "已儲存" : "儲存"}</Button>
      </div>

      <section className="mt-10 rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-medium">關於段位</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          段位唔係即時線上榜，而係用你嘅估計 1RM 同體重比例，對照典型健身人口分布。白金大約係全球前
          40%（Top 40%）。登入後訓練資料會存到雲端，換機都可以繼續。
        </p>
      </section>

      <Button
        variant="destructive"
        className="mt-8 w-full"
        onClick={() => {
          if (window.confirm("清除所有訓練同經驗？呢步還原唔到。")) resetAll();
        }}
      >
        清除所有資料
      </Button>
    </div>
  );
}
