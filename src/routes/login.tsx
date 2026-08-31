import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { RankEmblem } from "@/components/rank-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SHOWCASE_RANK } from "@/data/ranks";
import { APP_VERSION_LABEL } from "@/lib/version";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    return <Navigate to="/" />;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.split("@")[0],
        });
        if (err) throw new Error(err.message || "註冊失敗");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (err) throw new Error(err.message || "登入失敗");
      }
      await authClient.getSession();
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登入失敗，請再試");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col justify-center px-6 py-8">
      <div className="flex flex-col items-center text-center">
        <RankEmblem rank={SHOWCASE_RANK} size={72} />
        <p className="mt-4 font-display text-sm tracking-widest text-muted-foreground">
          IRON RANK
        </p>
        <h1 className="mt-1 font-display text-4xl tracking-wide">鐵階</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          用電郵登入，訓練紀錄同段位會跟住你，換機都唔會唔見。
        </p>
      </div>

      {authEnabled ? (
        <form className="mt-8 flex flex-col gap-3" onSubmit={submit}>
          {mode === "up" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">稱呼</span>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="nickname"
                placeholder="例如 浩然"
              />
            </label>
          ) : null}
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">電郵</span>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">密碼</span>
            <Input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "up" ? "new-password" : "current-password"}
              placeholder="至少 8 個字"
            />
          </label>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" size="lg" className="mt-1 w-full" disabled={busy}>
            {busy ? "處理中…" : mode === "up" ? "建立帳號" : "電郵登入"}
          </Button>
          <button
            type="button"
            className="h-11 text-sm text-muted-foreground"
            onClick={() => {
              setMode(mode === "up" ? "in" : "up");
              setError(null);
            }}
          >
            {mode === "up" ? "已有帳號？改為登入" : "未有帳號？建立一個"}
          </button>
        </form>
      ) : (
        <p className="mt-8 text-center text-sm text-muted-foreground">登入未開啟</p>
      )}

      {authEnabled ? (
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-center text-xs tracking-widest text-subtle">或用其他方式</p>
          {GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => void signIn(p.providerId, { callbackURL: "/" })}
            >
              繼續用 {p.label}
            </Button>
          ))}
        </div>
      ) : null}
      <p className="mt-8 text-center text-xs text-subtle">{APP_VERSION_LABEL}</p>
    </main>
  );
}
