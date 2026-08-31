import { useId } from "react";
import { cn } from "@/lib/utils";
import type { RankDef, RankTier } from "@/data/ranks";

function medalColor(rank: RankDef) {
  return `var(--color-${rank.token})`;
}

export function RankEmblem({
  rank,
  size = 88,
  className,
}: {
  rank: RankDef;
  size?: number;
  className?: string;
}) {
  const raw = useId().replace(/:/g, "");
  const color = medalColor(rank);
  const unranked = rank.id === "unranked";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`g-${raw}`} x1="20" y1="8" x2="62" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="48%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0.88" />
        </linearGradient>
        <radialGradient id={`h-${raw}`} cx="36" cy="28" r="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {unranked ? <UnrankedMark color={color} /> : <MedalBody rank={rank} color={color} gid={`g-${raw}`} hid={`h-${raw}`} />}
    </svg>
  );
}

function MedalBody({
  rank,
  color,
  gid,
  hid,
}: {
  rank: RankDef;
  color: string;
  gid: string;
  hid: string;
}) {
  return (
    <g>
      <Ribbon color={color} />
      <TierShape tier={rank.tier} color={color} gid={gid} hid={hid} />
      <TierMark tier={rank.tier} color={color} />
      {rank.division ? (
        <text
          x="40"
          y="66.5"
          textAnchor="middle"
          fill={color}
          fontSize="11"
          fontWeight="700"
          fontFamily="Barlow Condensed, Noto Sans TC, sans-serif"
          letterSpacing="0.06em"
        >
          {rank.division}
        </text>
      ) : null}
    </g>
  );
}

function Ribbon({ color }: { color: string }) {
  return (
    <g fill={color}>
      <path d="M31 6h18l-2.2 7H33.2Z" opacity="0.95" />
      <path d="M29 13h8.2l-3.4 11-8.2-3.2Z" opacity="0.72" />
      <path d="M42.8 13H51l3.4 7.8-8.2 3.2Z" opacity="0.72" />
    </g>
  );
}

function TierShape({
  tier,
  color,
  gid,
  hid,
}: {
  tier: RankTier;
  color: string;
  gid: string;
  hid: string;
}) {
  const fill = `url(#${gid})`;
  const inner = "color-mix(in oklab, var(--color-elevated) 82%, transparent)";
  if (tier === "iron") {
    return (
      <g>
        <polygon points="40,18 66,32 66,56 40,72 14,56 14,32" fill={fill} stroke={color} strokeWidth="1.8" />
        <polygon points="40,24 60,35 60,53 40,65 20,53 20,35" fill={inner} stroke={color} strokeWidth="1" opacity="0.95" />
        <polygon points="40,18 66,32 66,56 40,72 14,56 14,32" fill={`url(#${hid})`} />
      </g>
    );
  }
  if (tier === "platinum") {
    return (
      <g>
        <path
          d="M40 18 L64 28 L64 50 L40 72 L16 50 L16 28 Z"
          fill={fill}
          stroke={color}
          strokeWidth="1.8"
        />
        <path
          d="M40 24 L58 32 L58 49 L40 66 L22 49 L22 32 Z"
          fill={inner}
          stroke={color}
          strokeWidth="1"
        />
        <path d="M40 18 L64 28 L64 50 L40 72 L16 50 L16 28 Z" fill={`url(#${hid})`} />
      </g>
    );
  }
  if (tier === "diamond") {
    return (
      <g>
        <polygon points="40,16 68,40 40,74 12,40" fill={fill} stroke={color} strokeWidth="1.8" />
        <polygon points="40,24 60,40 40,66 20,40" fill={inner} stroke={color} strokeWidth="1" />
        <polygon points="40,16 68,40 40,74 12,40" fill={`url(#${hid})`} />
      </g>
    );
  }
  if (tier === "master") {
    return (
      <g>
        <path
          d="M18 30 L28 22 L40 28 L52 22 L62 30 L60 54 L40 72 L20 54 Z"
          fill={fill}
          stroke={color}
          strokeWidth="1.8"
        />
        <path
          d="M24 32 L31 26 L40 32 L49 26 L56 32 L54 52 L40 66 L26 52 Z"
          fill={inner}
          stroke={color}
          strokeWidth="1"
        />
        <path d="M18 30 L28 22 L40 28 L52 22 L62 30 L60 54 L40 72 L20 54 Z" fill={`url(#${hid})`} />
      </g>
    );
  }
  if (tier === "grandmaster") {
    return (
      <g>
        <circle cx="40" cy="46" r="26" fill={fill} stroke={color} strokeWidth="1.8" />
        <circle cx="40" cy="46" r="20" fill={inner} stroke={color} strokeWidth="1" />
        <circle cx="40" cy="46" r="26" fill={`url(#${hid})`} />
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="40"
            y1="18"
            x2="40"
            y2="12"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            transform={`rotate(${deg} 40 46)`}
          />
        ))}
      </g>
    );
  }
  return (
    <g>
      <circle cx="40" cy="46" r="26" fill={fill} stroke={color} strokeWidth="1.8" />
      <circle cx="40" cy="46" r="20.5" fill={inner} stroke={color} strokeWidth="1.1" />
      <circle cx="40" cy="46" r="26" fill={`url(#${hid})`} />
    </g>
  );
}

function TierMark({ tier, color }: { tier: RankTier; color: string }) {
  if (tier === "iron") {
    return (
      <g fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
        <polyline points="28,40 40,34 52,40" />
        <polyline points="28,48 40,42 52,48" />
      </g>
    );
  }
  if (tier === "bronze") {
    return (
      <g fill="none" stroke={color} strokeWidth="1.8">
        <circle cx="40" cy="44" r="7.5" />
        <circle cx="40" cy="44" r="3.2" fill={color} stroke="none" />
      </g>
    );
  }
  if (tier === "silver") {
    return (
      <polygon
        points="40,32 43.2,40.2 52,41 45.4,46.6 47.2,55 40,50.4 32.8,55 34.6,46.6 28,41 36.8,40.2"
        fill={color}
        opacity="0.92"
      />
    );
  }
  if (tier === "gold") {
    return (
      <g>
        <path
          d="M22 48c4-10 10-16 18-18 8 2 14 8 18 18"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          opacity="0.85"
        />
        <polygon
          points="40,31 42.8,38.6 51,39.2 44.6,44.2 46.4,52 40,47.8 33.6,52 35.4,44.2 29,39.2 37.2,38.6"
          fill={color}
        />
      </g>
    );
  }
  if (tier === "platinum") {
    return (
      <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round">
        <path d="M40 34 L48 38 L48 48 L40 56 L32 48 L32 38 Z" />
        <path d="M40 38 L44 40 L44 47 L40 52 L36 47 L36 40 Z" fill={color} stroke="none" opacity="0.85" />
      </g>
    );
  }
  if (tier === "diamond") {
    return (
      <g fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round">
        <polygon points="40,32 50,40 40,54 30,40" fill="none" />
        <polygon points="40,32 44,40 40,36 36,40" opacity="0.9" />
      </g>
    );
  }
  if (tier === "master") {
    return (
      <g fill={color}>
        <path d="M28 42 L34 34 L40 40 L46 34 L52 42 L49 48 H31 Z" />
        <rect x="31" y="48" width="18" height="3.2" rx="0.6" />
      </g>
    );
  }
  return (
    <g fill={color}>
      <polygon points="40,32 42.6,39.4 50.5,39.8 44.2,44.4 46,51.8 40,47.6 34,51.8 35.8,44.4 29.5,39.8 37.4,39.4" />
      <circle cx="40" cy="44" r="2.2" fill="var(--color-elevated)" />
    </g>
  );
}

function UnrankedMark({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="1.6" opacity="0.55">
      <circle cx="40" cy="40" r="24" strokeDasharray="3 4" />
      <circle cx="40" cy="40" r="16" strokeDasharray="2 3" />
    </g>
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
        <span className="tabular-nums text-muted-foreground">超過 {Math.round(percentile)}%</span>
      ) : null}
    </span>
  );
}
