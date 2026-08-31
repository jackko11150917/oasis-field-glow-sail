export type RankTier =
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "master"
  | "grandmaster";

export type RankId = string;

export type RankDef = {
  id: RankId;
  tier: RankTier;
  division: 1 | 2 | 3 | null;
  nameZh: string;
  nameEn: string;
  tierZh: string;
  tierEn: string;
  min: number;
  token: string;
};

type TierMeta = {
  tier: RankTier;
  nameZh: string;
  nameEn: string;
  token: string;
  min: number;
  divisions: 0 | 3;
};

export const TIER_META: TierMeta[] = [
  { tier: "iron", nameZh: "黑鐵", nameEn: "IRON", token: "rank-iron", min: 0, divisions: 3 },
  { tier: "bronze", nameZh: "青銅", nameEn: "BRONZE", token: "rank-bronze", min: 15, divisions: 3 },
  { tier: "silver", nameZh: "白銀", nameEn: "SILVER", token: "rank-silver", min: 30, divisions: 3 },
  { tier: "gold", nameZh: "黃金", nameEn: "GOLD", token: "rank-gold", min: 45, divisions: 3 },
  { tier: "platinum", nameZh: "白金", nameEn: "PLATINUM", token: "rank-platinum", min: 60, divisions: 3 },
  { tier: "diamond", nameZh: "鑽石", nameEn: "DIAMOND", token: "rank-diamond", min: 75, divisions: 3 },
  { tier: "master", nameZh: "大師", nameEn: "MASTER", token: "rank-master", min: 88, divisions: 0 },
  {
    tier: "grandmaster",
    nameZh: "宗師",
    nameEn: "GRANDMASTER",
    token: "rank-grandmaster",
    min: 96,
    divisions: 0,
  },
];

const TIER_CEILING: Record<RankTier, number> = {
  iron: 15,
  bronze: 30,
  silver: 45,
  gold: 60,
  platinum: 75,
  diamond: 88,
  master: 96,
  grandmaster: 100,
};

function buildRanks(): RankDef[] {
  const out: RankDef[] = [];
  for (const t of TIER_META) {
    if (t.divisions === 0) {
      out.push({
        id: t.tier,
        tier: t.tier,
        division: null,
        nameZh: t.nameZh,
        nameEn: t.nameEn,
        tierZh: t.nameZh,
        tierEn: t.nameEn,
        min: t.min,
        token: t.token,
      });
      continue;
    }
    const top = TIER_CEILING[t.tier];
    const span = (top - t.min) / 3;
    for (let d = 3; d >= 1; d--) {
      const min = Math.round((t.min + (3 - d) * span) * 10) / 10;
      out.push({
        id: `${t.tier}-${d}`,
        tier: t.tier,
        division: d as 1 | 2 | 3,
        nameZh: `${t.nameZh} ${d}`,
        nameEn: `${t.nameEn} ${d}`,
        tierZh: t.nameZh,
        tierEn: t.nameEn,
        min,
        token: t.token,
      });
    }
  }
  return out;
}

export const RANKS: RankDef[] = buildRanks();

export const SHOWCASE_RANK: RankDef = RANKS.find((r) => r.id === "gold-1") ?? RANKS[9];

export const UNRANKED: RankDef = {
  id: "unranked",
  tier: "iron",
  division: null,
  nameZh: "未定級",
  nameEn: "UNRANKED",
  tierZh: "未定級",
  tierEn: "UNRANKED",
  min: 0,
  token: "rank-iron",
};

export type TierGroup = {
  tier: RankTier;
  nameZh: string;
  nameEn: string;
  token: string;
  min: number;
  ranks: RankDef[];
  emblem: RankDef;
};

export const TIER_GROUPS: TierGroup[] = TIER_META.map((t) => {
  const ranks = RANKS.filter((r) => r.tier === t.tier);
  const emblem = ranks.find((r) => r.division === 1) ?? ranks[0];
  return {
    tier: t.tier,
    nameZh: t.nameZh,
    nameEn: t.nameEn,
    token: t.token,
    min: t.min,
    ranks,
    emblem,
  };
});

export type StrengthCurve = {
  p15: number;
  p30: number;
  p45: number;
  p60: number;
  p75: number;
  p88: number;
  p96: number;
};

export function curveFromP60(p60: number): StrengthCurve {
  return {
    p15: p60 * 0.4,
    p30: p60 * 0.58,
    p45: p60 * 0.78,
    p60,
    p75: p60 * 1.28,
    p88: p60 * 1.62,
    p96: p60 * 2.0,
  };
}

function pointsOf(curve: StrengthCurve): [number, number][] {
  return [
    [curve.p15 * 0.3, 0],
    [curve.p15, 15],
    [curve.p30, 30],
    [curve.p45, 45],
    [curve.p60, 60],
    [curve.p75, 75],
    [curve.p88, 88],
    [curve.p96, 96],
    [curve.p96 * 1.22, 99.4],
  ];
}

export function ratioToPercentile(ratio: number, curve: StrengthCurve): number {
  const pts = pointsOf(curve);
  if (ratio <= pts[0][0]) return pts[0][1];
  const last = pts[pts.length - 1];
  if (ratio >= last[0]) return last[1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (ratio >= x0 && ratio <= x1) {
      const t = (ratio - x0) / (x1 - x0);
      return Math.round((y0 + t * (y1 - y0)) * 10) / 10;
    }
  }
  return 0;
}

export function percentileToRatio(pct: number, curve: StrengthCurve): number {
  const pts = pointsOf(curve);
  if (pct <= pts[0][1]) return pts[0][0];
  const last = pts[pts.length - 1];
  if (pct >= last[1]) return last[0];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (pct >= y0 && pct <= y1) {
      const t = (pct - y0) / (y1 - y0);
      return x0 + t * (x1 - x0);
    }
  }
  return 0;
}

export function rankForPercentile(pct: number): RankDef {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (pct >= rank.min) current = rank;
  }
  return current;
}

export function nextRank(rank: RankDef): RankDef | null {
  const i = RANKS.findIndex((r) => r.id === rank.id);
  if (i < 0 || i >= RANKS.length - 1) return null;
  return RANKS[i + 1];
}

export function rankProgress(pct: number): { rank: RankDef; next: RankDef | null; t: number } {
  const rank = rankForPercentile(pct);
  const next = nextRank(rank);
  if (!next) return { rank, next: null, t: 1 };
  const span = next.min - rank.min;
  const t = span <= 0 ? 1 : Math.min(1, Math.max(0, (pct - rank.min) / span));
  return { rank, next, t };
}

export function rankForLevel(level: number): RankDef {
  const i = Math.min(RANKS.length - 1, Math.max(0, Math.floor(Math.max(1, level) / 3)));
  return RANKS[i];
}
