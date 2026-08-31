export type AvatarDef = {
  id: string;
  nameZh: string;
  token: string;
};

export const AVATARS: AvatarDef[] = [
  { id: "anvil", nameZh: "鐵砧", token: "rank-iron" },
  { id: "flame", nameZh: "火焰", token: "rank-gold" },
  { id: "sword", nameZh: "長劍", token: "rank-silver" },
  { id: "shield", nameZh: "盾牌", token: "rank-bronze" },
  { id: "bolt", nameZh: "雷電", token: "rank-platinum" },
  { id: "gem", nameZh: "結晶", token: "rank-diamond" },
  { id: "crown", nameZh: "王冠", token: "rank-gold" },
  { id: "fist", nameZh: "鐵拳", token: "rank-iron" },
  { id: "wolf", nameZh: "狼首", token: "muted-foreground" },
  { id: "hawk", nameZh: "鷹眼", token: "rank-master" },
  { id: "bull", nameZh: "蠻牛", token: "rank-bronze" },
  { id: "mountain", nameZh: "山岳", token: "rank-platinum" },
  { id: "helm", nameZh: "戰盔", token: "rank-silver" },
  { id: "spear", nameZh: "長槍", token: "rank-diamond" },
  { id: "chain", nameZh: "鎖鏈", token: "rank-iron" },
  { id: "sun", nameZh: "烈日", token: "rank-grandmaster" },
];

export const DEFAULT_AVATAR_ID = "anvil";

export function getAvatar(id: string | null | undefined): AvatarDef {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
