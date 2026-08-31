import { PlayerAvatar } from "@/components/player-avatar";
import { AVATARS } from "@/data/avatars";
import { cn } from "@/lib/utils";

export function AvatarPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {AVATARS.map((a) => {
        const on = value === a.id;
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => onChange(a.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-colors duration-150",
              on ? "border-accent bg-elevated" : "border-border bg-card",
            )}
            aria-label={a.nameZh}
            aria-pressed={on}
          >
            <PlayerAvatar avatarId={a.id} size={44} />
            <span className="text-xs text-muted-foreground">{a.nameZh}</span>
          </button>
        );
      })}
    </div>
  );
}
