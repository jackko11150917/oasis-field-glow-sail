import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, Plus, UserPlus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FriendRow } from "@/components/friend-card";
import { PlayerAvatar } from "@/components/player-avatar";
import { RankEmblem } from "@/components/rank-badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { rankById } from "@/data/ranks";
import {
  loadFriendsHome,
  respondFriendRequest,
  sendFriendRequest,
  type FriendCard,
  type FriendsHome,
} from "@/lib/friends-api";
import { useGymStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/friends")({ component: FriendsPage });

function FriendsPage() {
  return <FriendsInner />;
}

function FriendsInner() {
  const localCode = useGymStore((s) => s.friendCode);
  const myAvatarUrl = useGymStore((s) => s.profile.avatarUrl);
  const [home, setHome] = useState<FriendsHome | null>(null);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    try {
      const data = await loadFriendsHome();
      setHome(data);
      if (data.me?.friendCode) {
        useGymStore.getState().setFriendCode(data.me.friendCode);
      }
    } catch {
      toast.error("載入好友失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const me = home?.me;
  const myCode = me?.friendCode ?? localCode;
  const squad = useMemo(() => {
    const list: FriendCard[] = [];
    if (me) list.push(me);
    if (home?.friends) list.push(...home.friends);
    return [...list].sort((a, b) => b.weekDays - a.weekDays || b.weekXp - a.weekXp);
  }, [me, home?.friends]);

  async function copyCode() {
    if (!myCode) return;
    try {
      await navigator.clipboard.writeText(myCode);
      toast.success("已複製好友 ID");
    } catch {
      toast.error("複製失敗");
    }
  }

  async function addFriend() {
    setBusy(true);
    try {
      const result = await sendFriendRequest({ data: codeInput });
      toast[result.ok ? "success" : "error"](result.message);
      if (result.ok) {
        setCodeInput("");
        setAddOpen(false);
        await reload();
      }
    } catch {
      toast.error("送出失敗，請再試");
    } finally {
      setBusy(false);
    }
  }

  async function respond(id: string, accept: boolean) {
    setBusy(true);
    try {
      const result = await respondFriendRequest({ data: { id, accept } });
      toast[result.ok ? "success" : "error"](result.message);
      await reload();
    } catch {
      toast.error("處理失敗");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="px-5 pt-5 pb-8">
      <Link to="/" className="inline-flex h-11 items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" />
        主頁
      </Link>
      <div className="mt-1 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground">SQUAD</p>
          <h1 className="font-display text-4xl tracking-wide">好友</h1>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="size-4" />
          加入
        </Button>
      </div>

      <section className="mt-5 rounded-xl border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground">你嘅好友 ID</p>
        <div className="mt-2 flex items-center gap-3">
          {me ? (
            <PlayerAvatar avatarId={me.avatarId} avatarUrl={myAvatarUrl} size={52} trainingNow={me.trainingNow} />
          ) : (
            <div className="size-12 rounded-full bg-elevated" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{me?.name ?? "同步中…"}</p>
            <p className="font-mono text-lg tracking-wide">{myCode ?? "——"}</p>
          </div>
          <Button variant="secondary" size="icon" onClick={() => void copyCode()} disabled={!myCode}>
            <Copy className="size-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-subtle">
          把呢組 ID 傳俾朋友，對方輸入之後就可以互相睇到連續日數、本週訓練同段位。
        </p>
      </section>

      {home && home.cheersReceived > 0 ? (
        <p className="mt-4 rounded-lg border border-border bg-elevated px-3 py-2 text-sm">
          本週有 {home.cheersReceived} 位戰友為你打氣
        </p>
      ) : null}

      {loading ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">載入中…</p>
      ) : (
        <>
          {home && home.incoming.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-sm font-medium">收到嘅邀請</h2>
              <ul className="mt-2 space-y-2">
                {home.incoming.map((req) => (
                  <li key={req.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
                    <PlayerAvatar avatarId={req.avatarId} size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{req.name}</p>
                      <p className="font-mono text-xs text-subtle">{req.friendCode}</p>
                    </div>
                    <Button size="icon" variant="secondary" disabled={busy} onClick={() => void respond(req.id, false)} aria-label="拒絕">
                      <X className="size-4" />
                    </Button>
                    <Button size="icon" disabled={busy} onClick={() => void respond(req.id, true)} aria-label="接受">
                      <Check className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {home && home.outgoing.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-sm font-medium">等待確認</h2>
              <ul className="mt-2 space-y-2">
                {home.outgoing.map((req) => (
                  <li key={req.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
                    <PlayerAvatar avatarId={req.avatarId} size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{req.name}</p>
                      <p className="text-xs text-muted-foreground">已送出邀請</p>
                    </div>
                    <RankEmblem rank={rankById(req.rankId)} size={32} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {squad.length > 1 ? (
            <section className="mt-6">
              <h2 className="text-sm font-medium">本週戰隊</h2>
              <p className="mt-1 text-xs text-subtle">按本週訓練日數排，日數相同再比經驗。</p>
              <ol className="mt-3 space-y-2">
                {squad.map((card, i) => (
                  <li key={card.friendCode}>
                    <Link
                      to="/friends/$code"
                      params={{ code: card.friendCode }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border bg-card px-3 py-3",
                        card.isSelf ? "border-accent/40" : "border-border",
                      )}
                    >
                      <span className="w-6 text-center font-display text-lg tabular-nums text-muted-foreground">{i + 1}</span>
                      <PlayerAvatar
                        avatarId={card.avatarId}
                        avatarUrl={card.isSelf ? myAvatarUrl : undefined}
                        size={40}
                        trainingNow={card.trainingNow}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {card.name}
                          {card.isSelf ? "（你）" : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          本週 {card.weekDays} 日 · +{card.weekXp} XP
                        </p>
                      </div>
                      <RankEmblem rank={rankById(card.rankId)} size={32} />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section className="mt-6">
            <h2 className="text-sm font-medium">
              好友名單
              {home?.friends.length ? (
                <span className="ml-2 text-xs font-normal text-subtle">{home.friends.length}</span>
              ) : null}
            </h2>
            {home && home.friends.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {home.friends.map((card) => (
                  <li key={card.friendCode}>
                    <FriendRow card={card} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center">
                <UserPlus className="mx-auto size-8 text-subtle" />
                <p className="mt-3 text-sm">未有戰友</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  把你嘅好友 ID 傳俾朋友，或者輸入佢嘅 ID 一齊練。
                </p>
                <Button className="mt-4" onClick={() => setAddOpen(true)}>
                  加入好友
                </Button>
              </div>
            )}
          </section>
        </>
      )}

      <Drawer open={addOpen} onOpenChange={setAddOpen}>
        <DrawerContent title="加入好友">
          <form
            className="flex flex-col gap-3 px-5 pb-8 pt-4"
            onSubmit={(e) => {
              e.preventDefault();
              void addFriend();
            }}
          >
            <p className="text-sm text-muted-foreground">輸入對方嘅好友 ID，例如 IR-A3F9K2。</p>
            <Input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="IR-XXXXXX"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
            />
            <Button type="submit" disabled={busy || !codeInput.trim()}>
              {busy ? "送出中…" : "送出邀請"}
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
