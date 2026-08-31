import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Flame, Swords } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { StatChip } from "@/components/friend-card";
import { PlayerAvatar } from "@/components/player-avatar";
import { RankEmblem } from "@/components/rank-badge";
import { Button } from "@/components/ui/button";
import { rankById } from "@/data/ranks";
import {
  cheerFriend,
  loadFriendDetail,
  removeFriend,
  type FriendCard,
} from "@/lib/friends-api";
import { relativeTrainLabel } from "@/lib/utils";
import { titleForLevel } from "@/lib/xp";

export const Route = createFileRoute("/friends/$code")({ component: FriendDetailPage });

function FriendDetailPage() {
  const { code } = Route.useParams();
  return <FriendDetailInner code={code} />;
}

function FriendDetailInner({ code }: { code: string }) {
  const navigate = useNavigate();
  const [me, setMe] = useState<FriendCard | null>(null);
  const [friend, setFriend] = useState<FriendCard | null>(null);
  const [cheered, setCheered] = useState(false);
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    try {
      const data = await loadFriendDetail({ data: code });
      if (!data?.friend) {
        setMissing(true);
        return;
      }
      setMe(data.me);
      setFriend(data.friend);
      setCheered(data.cheered);
    } catch {
      setMissing(true);
    }
  }, [code]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function cheer() {
    if (!friend) return;
    setBusy(true);
    try {
      const result = await cheerFriend({ data: friend.friendCode });
      toast[result.ok ? "success" : "error"](result.message);
      if (result.ok) {
        setCheered(true);
        await reload();
      }
    } catch {
      toast.error("打氣失敗");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!friend) return;
    if (!window.confirm(`移除 ${friend.name}？之後要重新邀請先睇到對方進度。`)) return;
    setBusy(true);
    try {
      const result = await removeFriend({ data: friend.friendCode });
      toast[result.ok ? "success" : "error"](result.message);
      if (result.ok) void navigate({ to: "/friends" });
    } catch {
      toast.error("移除失敗");
    } finally {
      setBusy(false);
    }
  }

  if (missing) {
    return (
      <div className="px-5 pt-5">
        <Link to="/friends" className="inline-flex h-11 items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" />
          好友
        </Link>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          搵唔到呢位好友，或者你哋已經唔係好友。
        </p>
      </div>
    );
  }

  if (!friend) {
    return <div className="px-5 pt-10 text-center text-sm text-muted-foreground">載入中…</div>;
  }

  const rank = rankById(friend.rankId);
  const self = friend.isSelf;

  return (
    <div className="px-5 pt-5 pb-8">
      <Link to="/friends" className="inline-flex h-11 items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" />
        好友
      </Link>

      <div className="mt-2 flex flex-col items-center text-center">
        <PlayerAvatar avatarId={friend.avatarId} size={88} trainingNow={friend.trainingNow} />
        <h1 className="mt-3 text-2xl font-medium">{friend.name}</h1>
        <p className="font-mono text-sm tracking-wide text-subtle">{friend.friendCode}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {friend.trainingNow ? "而家訓練中" : relativeTrainLabel(friend.lastTrainedAt)}
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-card p-4 text-center">
        <RankEmblem rank={rank} size={88} className="mx-auto" />
        <p className="mt-2 font-display text-3xl tracking-wide">{rank.nameZh}</p>
        <p className="text-xs tracking-widest text-muted-foreground">{rank.nameEn}</p>
        {rank.id !== "unranked" ? (
          <p className="mt-2 text-sm text-muted-foreground">
            估計超過全球 {Math.round(friend.rankPercentile)}%
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">尚未定段</p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <StatChip label="等級" value={`LV.${friend.level}`} />
        <StatChip label="稱號" value={titleForLevel(friend.level)} />
      </div>
      <div className="mt-2 flex gap-2">
        <StatChip label="連續日數" value={friend.streak} accent={friend.streak > 0} />
        <StatChip label="本週日數" value={friend.weekDays} />
        <StatChip label="本週 XP" value={friend.weekXp} />
      </div>
      <p className="mt-2 text-center text-xs text-subtle">累積 {friend.workoutCount} 場訓練</p>

      {friend.cheersThisWeek > 0 ? (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          本週收到 {friend.cheersThisWeek} 次打氣
        </p>
      ) : null}

      {me && !self ? (
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs tracking-widest text-muted-foreground">
            <Swords className="size-3.5" />
            COMPARE
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
              <div>
                <PlayerAvatar avatarId={me.avatarId} size={44} className="mx-auto" />
                <p className="mt-1 truncate text-xs text-muted-foreground">你</p>
              </div>
              <p className="font-display text-lg text-subtle">VS</p>
              <div>
                <PlayerAvatar avatarId={friend.avatarId} size={44} className="mx-auto" />
                <p className="mt-1 truncate text-xs text-muted-foreground">{friend.name}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <CompareRow label="等級" a={me.level} b={friend.level} />
              <CompareRow label="連續" a={me.streak} b={friend.streak} suffix=" 日" />
              <CompareRow label="本週" a={me.weekDays} b={friend.weekDays} suffix=" 日" />
              <CompareRow label="本週 XP" a={me.weekXp} b={friend.weekXp} />
              <CompareRow
                label="段位"
                a={Math.round(me.rankPercentile)}
                b={Math.round(friend.rankPercentile)}
                suffix="%"
              />
            </ul>
          </div>
        </section>
      ) : null}

      {!self ? (
        <div className="mt-6 flex flex-col gap-2">
          <Button onClick={() => void cheer()} disabled={busy || cheered}>
            <Flame className="size-4" />
            {cheered ? "本週已打氣" : "打氣"}
          </Button>
          <Button variant="ghost" className="text-destructive" onClick={() => void remove()} disabled={busy}>
            移除好友
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function CompareRow({
  label,
  a,
  b,
  suffix = "",
}: {
  label: string;
  a: number;
  b: number;
  suffix?: string;
}) {
  const lead = a === b ? 0 : a > b ? -1 : 1;
  return (
    <li className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <span className={`tabular-nums ${lead < 0 ? "text-accent" : "text-muted-foreground"}`}>
        {a}
        {suffix}
      </span>
      <span className="text-xs text-subtle">{label}</span>
      <span className={`tabular-nums ${lead > 0 ? "text-accent" : "text-muted-foreground"}`}>
        {b}
        {suffix}
      </span>
    </li>
  );
}
