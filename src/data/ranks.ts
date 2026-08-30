export type RankId =
  | "unranked"
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "master"
  | "grandmaster";

export type RankDef = {
  id: RankId;
  nameZh: string;
  nameEn: string;
  min: number;
  token: string;
};

export const RANKS: RankDef[] = [
  { id: "iron", nameZh: "黑鐵", nameEn: "IRON", min: 0, token: "rank-iron" },
  { id: "bronze", nameZh: "青銅", nameEn: "BRONZE", min: 15, token: "rank-bronze" },
  { id: "silver", nameZh: "白銀", nameEn: "SILVER", min: 30, token: "rank-silver" },
  { id: "gold", nameZh: "黃金", nameEn: "GOLD", min: 45, token: "rank-gold" },
  { id: "platinum", nameZh: "白金", nameEn: "PLATINUM", min: 60, token: "rank-platinum" },
  { id: "diamond", nameZh: "鑽石", nameEn: "DIAMOND", min: 75, token: "rank-diamond" },
  { id: "master", nameZh: "大師", nameEn: "MASTER", min: 88, token: "rank-master" },
  {
    id: "grandmaster",
    nameZh: "宗師",
    nameEn: "GRANDMASTER",
    min: 96,
    token: "rank-grandmaster",
  },
];

export const UNRANKED: RankDef = {
  id: "unranked",
  nameZh: "未定級",
  nameEn: "UNRANKED",
  min: 0,
  token: "rank-iron",
};

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
