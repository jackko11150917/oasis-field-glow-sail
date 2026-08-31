import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RankEmblem } from "@/components/rank-badge";
import { SHOWCASE_RANK } from "@/data/ranks";
import { useGymStore } from "@/lib/store";
import type { Sex } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Onboarding() {
  const setProfile = useGymStore((s) => s.setProfile);
  const [name, setName] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [bw, setBw] = useState("70");

  function submit() {
    const bodyweight = Math.max(30, Math.min(250, Number(bw) || 70));
    setProfile({
      name: name.trim() || "鍛造者",
      sex,
      bodyweight,
      onboarded: true,
    });
  }

  return (
    <div className="flex min-h-dvh w-full justify-center bg-background">
      <div className="flex w-full max-w-md flex-col justify-center gap-8 px-6 py-10">
        <div className="stagger-in flex flex-col items-center text-center">
          <RankEmblem rank={SHOWCASE_RANK} size={96} />
          <p className="mt-6 font-display text-sm tracking-widest text-muted-foreground">
            IRON RANK
          </p>
          <h1 className="mt-1 font-display text-5xl tracking-wide">鐵階</h1>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            每次訓練換經驗、升等級。動作有指導，重量有段位。
          </p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">稱呼</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如 浩然"
              autoComplete="nickname"
            />
          </label>

          <div className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">性別（影響段位標準）</span>
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
                    "h-11 rounded-md border text-sm transition-colors duration-150",
                    sex === id
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-elevated text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted-foreground">體重（kg）</span>
            <Input
              inputMode="decimal"
              value={bw}
              onChange={(e) => setBw(e.target.value)}
            />
          </label>

          <Button type="submit" size="lg" className="mt-1 w-full">
            開始鍛造
          </Button>
          <p className="text-center text-xs text-subtle">
            段位按體重比例估算全球百分位。登入後資料會存到你嘅帳號。
          </p>
        </form>
      </div>
    </div>
  );
}
