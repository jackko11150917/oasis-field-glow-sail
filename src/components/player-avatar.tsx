import { getAvatar } from "@/data/avatars";
import { cn } from "@/lib/utils";

export function PlayerAvatar({
  avatarId,
  size = 48,
  trainingNow = false,
  className,
}: {
  avatarId: string;
  size?: number;
  trainingNow?: boolean;
  className?: string;
}) {
  const avatar = getAvatar(avatarId);
  const color = `var(--color-${avatar.token})`;
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full",
        trainingNow && "avatar-live",
        className,
      )}
      style={{ width: size, height: size }}
      title={avatar.nameZh}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r="30" fill="var(--color-elevated)" stroke={color} strokeWidth="2.2" />
        <circle cx="32" cy="32" r="26" fill="var(--color-card)" />
        <g fill={color} stroke={color} strokeLinecap="round" strokeLinejoin="round">
          <AvatarMark id={avatar.id} />
        </g>
      </svg>
      {trainingNow ? (
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-success" />
      ) : null}
    </span>
  );
}

function AvatarMark({ id }: { id: string }) {
  switch (id) {
    case "flame":
      return (
        <path
          d="M32 16c4 8-2 10 2 16 3 5 8 7 8 14 0 8-6 12-10 12s-10-4-10-12c0-7 5-10 6-16 1-5-1-10 4-14Z"
          fillOpacity="0.95"
          strokeWidth="0"
        />
      );
    case "sword":
      return (
        <g fill="none" strokeWidth="2.4">
          <path d="M32 14v28" />
          <path d="M24 30h16" />
          <path d="M28 46h8" />
        </g>
      );
    case "shield":
      return (
        <path d="M32 14 48 20v14c0 10-7 18-16 22-9-4-16-12-16-22V20Z" fillOpacity="0.18" strokeWidth="2.2" />
      );
    case "bolt":
      return <polygon points="36,14 22,34 31,34 28,50 44,28 34,28" fillOpacity="0.95" strokeWidth="0" />;
    case "gem":
      return <polygon points="32,14 48,28 32,50 16,28" fillOpacity="0.2" strokeWidth="2.2" />;
    case "crown":
      return <path d="M16 40 22 24l10 10 10-10 6 16H16Zm2 4h28v4H18Z" fillOpacity="0.95" strokeWidth="0" />;
    case "fist":
      return <rect x="20" y="22" width="24" height="22" rx="8" fillOpacity="0.2" strokeWidth="2.2" />;
    case "wolf":
      return (
        <g fillOpacity="0.95" strokeWidth="0">
          <polygon points="18,22 26,18 28,30" />
          <polygon points="46,22 38,18 36,30" />
          <circle cx="32" cy="36" r="12" fillOpacity="0.2" strokeWidth="2.2" stroke="currentColor" />
        </g>
      );
    case "hawk":
      return (
        <path d="M12 34c10-2 16-12 20-20 4 8 10 18 20 20-8 2-14 10-20 18-6-8-12-16-20-18Z" fillOpacity="0.9" strokeWidth="0" />
      );
    case "bull":
      return (
        <g fill="none" strokeWidth="2.2">
          <path d="M18 22c-4 2-6 8-2 10" />
          <path d="M46 22c4 2 6 8 2 10" />
          <circle cx="32" cy="36" r="11" fillOpacity="0.15" />
        </g>
      );
    case "mountain":
      return (
        <g fillOpacity="0.9" strokeWidth="0">
          <polygon points="14,46 28,22 42,46" />
          <polygon points="30,46 42,26 54,46" fillOpacity="0.55" />
        </g>
      );
    case "helm":
      return (
        <g fillOpacity="0.2" strokeWidth="2.2">
          <path d="M18 38c0-10 6-18 14-18s14 8 14 18v6H18Z" />
          <path d="M20 40h24" />
        </g>
      );
    case "spear":
      return (
        <g fill="none" strokeWidth="2.2">
          <path d="M32 14v34" />
          <polygon points="32,12 38,22 26,22" fill="currentColor" stroke="none" />
        </g>
      );
    case "chain":
      return (
        <g fill="none" strokeWidth="2.4">
          <rect x="14" y="24" width="18" height="16" rx="8" />
          <rect x="32" y="24" width="18" height="16" rx="8" />
        </g>
      );
    case "sun":
      return (
        <g fill="none" strokeWidth="2">
          <circle cx="32" cy="32" r="8" fillOpacity="0.9" fill="currentColor" stroke="none" />
          {[0, 45, 90, 135].map((deg) => (
            <line key={deg} x1="32" y1="14" x2="32" y2="18" transform={`rotate(${deg} 32 32)`} />
          ))}
        </g>
      );
    default:
      return <path d="M20 42h24l-4-16H24Z" fillOpacity="0.2" strokeWidth="2.2" />;
  }
}
