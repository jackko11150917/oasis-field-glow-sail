import { cn } from "@/lib/utils";
import type { RankDef } from "@/data/ranks";

const CHEVRONS: Record<string, number> = {
  unranked: 0,
  iron: 1,
  bronze: 1,
  silver: 2,
  gold: 2,
  platinum: 3,
  diamond: 3,
  master: 4,
  grandmaster: 4,
};

export function RankEmblem({
  rank,
  size = 88,
  className,
}: {
  rank: RankDef;
  size?: number;
  className?: string;
}) {
  const n = CHEVRONS[rank.id] ?? 1;
  const color = `var(--color-${rank.token})`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
    >
      <polygon
        points="40,6 70,22 70,50 40,74 10,50 10,22"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
      />
      <polygon
        points="40,14 62,26 62,48 40,64 18,48 18,26"
        fill="color-mix(in oklab, var(--color-elevated) 80%, transparent)"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.9"
      />
      {Array.from({ length: n }).map((_, i) => {
        const y = 30 + i * 7;
        return (
          <polyline
            key={i}
            points={`28,${y + 6} 40,${y} 52,${y + 6}`}
            fill="none"
            stroke={color}
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function RankChip({
  rank,
  percentile,
  className,
}: {
  rank: RankDef;
  percentile?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        className,
      )}
      style={{
        color: `var(--color-${rank.token})`,
        borderColor: `color-mix(in oklab, var(--color-${rank.token}) 45%, transparent)`,
        background: `color-mix(in oklab, var(--color-${rank.token}) 12%, transparent)`,
      }}
    >
      {rank.nameZh}
      {percentile != null && rank.id !== "unranked" ? (
        <span className="tabular-nums text-muted-foreground">
          超過 {Math.round(percentile)}%
        </span>
      ) : null}
    </span>
  );
}
