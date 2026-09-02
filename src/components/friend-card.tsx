import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import type { ReactNode } from "react";
import { PlayerAvatar } from "@/components/player-avatar";
import { RankEmblem } from "@/components/rank-badge";
import { rankById } from "@/data/ranks";
import type { FriendCard } from "@/lib/friends-api";
import { cn, relativeTrainLabel } from "@/lib/utils";
import { titleForLevel } from "@/lib/xp";

export function FriendRow({
  card,
  trailing,
}: {
  card: FriendCard;
  trailing?: ReactNode;
}) {
  const rank = rankById(card.rankId);
  return (
    <Link
      to="/friends/$code"
      params={{ code: card.friendCode }}
      className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 transition-colors duration-150 hover:bg-elevated"
    >
      <PlayerAvatar avatarId={card.avatarId} avatarUrl={card.avatarUrl} size={48} trainingNow={card.trainingNow} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{card.name}</p>
        <p className="font-mono text-xs tracking-wide text-subtle">{card.friendCode}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          LV.{card.level} {titleForLevel(card.level)}
          {" · "}
          {card.trainingNow ? "訓練中" : relativeTrainLabel(card.lastTrainedAt)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <RankEmblem rank={rank} size={36} />
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Flame className="size-3 text-accent" />
          <span className="tabular-nums">{card.streak}</span>
        </span>
      </div>
      {trailing}
    </Link>
  );
}

export function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center rounded-lg bg-elevated px-2 py-2",
        accent && "ring-1 ring-accent/40",
      )}
    >
      <span className="font-display text-xl tabular-nums leading-none">{value}</span>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
