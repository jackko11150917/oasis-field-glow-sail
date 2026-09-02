import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Dumbbell, House, ScrollText, Trophy } from "lucide-react";
import { Toaster } from "sonner";
import { Onboarding } from "@/components/onboarding";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { rehydrateGym, useGymStore } from "@/lib/store";
import { pullCloudState } from "@/lib/sync";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "主頁", icon: House },
  { to: "/train", label: "訓練", icon: Dumbbell },
  { to: "/log", label: "紀錄", icon: ScrollText },
  { to: "/guide", label: "指導", icon: BookOpen },
  { to: "/rank", label: "段位", icon: Trophy },
] as const;

function BootScreen() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg items-center justify-center bg-background">
      <p className="font-display text-2xl tracking-widest text-muted-foreground">GYM</p>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const onboarded = useGymStore((s) => s.profile.onboarded);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [ready, setReady] = useState(false);
  const isLogin = pathname === "/login";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.resolve(rehydrateGym());
      if (cancelled) return;
      if (user) {
        try {
          await pullCloudState();
        } catch {
          /* stay on local cache */
        }
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (isLogin) {
    return (
      <div className="phone-frame mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        {children}
      </div>
    );
  }

  if (isPending) return <BootScreen />;
  if (!user) return <RedirectToSignIn />;
  if (!ready) return <BootScreen />;
  if (!onboarded) return <Onboarding />;

  return (
    <div className="phone-frame mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-elevated)",
            border: "1px solid var(--color-border)",
            color: "var(--color-foreground)",
          },
        }}
      />
      <main className="main-with-tabbar min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <nav className="tabbar-safe fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t border-border bg-background/95">
        <ul className="grid grid-cols-5">
          {TABS.map((tab) => {
            const active =
              tab.to === "/"
                ? pathname === "/"
                : pathname === tab.to || pathname.startsWith(`${tab.to}/`);
            const Icon = tab.icon;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  preload="intent"
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] leading-none",
                    active ? "text-accent" : "text-subtle",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
