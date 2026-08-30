import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as authMiddleware } from "./middleware-DMTYZixe.mjs";
import { n as auth } from "./server-SNx8R0ev.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { c as ScrollText, d as House, h as BookOpen, n as Trophy, p as Dumbbell, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BUhPgKPF.js
var RANKS = [
	{
		id: "iron",
		nameZh: "黑鐵",
		nameEn: "IRON",
		min: 0,
		token: "rank-iron"
	},
	{
		id: "bronze",
		nameZh: "青銅",
		nameEn: "BRONZE",
		min: 15,
		token: "rank-bronze"
	},
	{
		id: "silver",
		nameZh: "白銀",
		nameEn: "SILVER",
		min: 30,
		token: "rank-silver"
	},
	{
		id: "gold",
		nameZh: "黃金",
		nameEn: "GOLD",
		min: 45,
		token: "rank-gold"
	},
	{
		id: "platinum",
		nameZh: "白金",
		nameEn: "PLATINUM",
		min: 60,
		token: "rank-platinum"
	},
	{
		id: "diamond",
		nameZh: "鑽石",
		nameEn: "DIAMOND",
		min: 75,
		token: "rank-diamond"
	},
	{
		id: "master",
		nameZh: "大師",
		nameEn: "MASTER",
		min: 88,
		token: "rank-master"
	},
	{
		id: "grandmaster",
		nameZh: "宗師",
		nameEn: "GRANDMASTER",
		min: 96,
		token: "rank-grandmaster"
	}
];
var UNRANKED = {
	id: "unranked",
	nameZh: "未定級",
	nameEn: "UNRANKED",
	min: 0,
	token: "rank-iron"
};
function curveFromP60(p60) {
	return {
		p15: p60 * .4,
		p30: p60 * .58,
		p45: p60 * .78,
		p60,
		p75: p60 * 1.28,
		p88: p60 * 1.62,
		p96: p60 * 2
	};
}
function pointsOf(curve) {
	return [
		[curve.p15 * .3, 0],
		[curve.p15, 15],
		[curve.p30, 30],
		[curve.p45, 45],
		[curve.p60, 60],
		[curve.p75, 75],
		[curve.p88, 88],
		[curve.p96, 96],
		[curve.p96 * 1.22, 99.4]
	];
}
function ratioToPercentile(ratio, curve) {
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
function percentileToRatio(pct, curve) {
	const pts = pointsOf(curve);
	if (pct <= pts[0][1]) return pts[0][0];
	const last = pts[pts.length - 1];
	if (pct >= last[1]) return last[0];
	for (let i = 0; i < pts.length - 1; i++) {
		const [x0, y0] = pts[i];
		const [x1, y1] = pts[i + 1];
		if (pct >= y0 && pct <= y1) return x0 + (pct - y0) / (y1 - y0) * (x1 - x0);
	}
	return 0;
}
function rankForPercentile(pct) {
	let current = RANKS[0];
	for (const rank of RANKS) if (pct >= rank.min) current = rank;
	return current;
}
function nextRank(rank) {
	const i = RANKS.findIndex((r) => r.id === rank.id);
	if (i < 0 || i >= RANKS.length - 1) return null;
	return RANKS[i + 1];
}
function rankProgress(pct) {
	const rank = rankForPercentile(pct);
	const next = nextRank(rank);
	if (!next) return {
		rank,
		next: null,
		t: 1
	};
	const span = next.min - rank.min;
	return {
		rank,
		next,
		t: span <= 0 ? 1 : Math.min(1, Math.max(0, (pct - rank.min) / span))
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function localISODate(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/exercises-R-su-UZj.js
var MUSCLE_LABELS = {
	chest: "胸",
	back: "背",
	shoulders: "肩",
	legs: "腿",
	glutes: "臀",
	arms: "手臂",
	core: "核心"
};
var EQUIPMENT_LABELS = {
	barbell: "槓鈴",
	dumbbell: "啞鈴",
	machine: "器械",
	cable: "繩索",
	bodyweight: "自重"
};
var EXERCISES = [
	{
		id: "barbell-bench",
		nameZh: "槓鈴臥推",
		nameEn: "Barbell Bench Press",
		muscle: "chest",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "練胸的王牌動作。先把肩胛固定，胸才能真正發力。",
		setup: [
			"眼垂直對住槓鈴，躺穩先再揭槓",
			"腳掌全掌踩實地面，肩胛後收並下壓（沉肩）",
			"五點着地：頭、上背、臀、左腳、右腳",
			"握距大約令前臂喺底點垂直地面"
		],
		cues: [
			"沉肩",
			"挺胸",
			"夾緊肩胛",
			"手腕垂直",
			"槓下放乳頭線",
			"腳踩實"
		],
		mistakes: [
			"肩向前捲，變成用前束推而唔係胸",
			"用槓彈胸口借力",
			"臀部離凳，變成橋式作弊",
			"手腕後折，壓力全去關節"
		],
		breathing: "下放吸氣，推起呼氣。重重量可以喺底點短暫閉氣再推。",
		maleP60: .85,
		femaleP60: .5
	},
	{
		id: "incline-bench",
		nameZh: "斜板臥推",
		nameEn: "Incline Bench Press",
		muscle: "chest",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "凳面 15–30 度，針對上胸。斜得太斜就會變成肩推。",
		setup: [
			"調斜板至 15–30 度，超過 45 度肩會搶功",
			"同樣沉肩、夾背，上背貼實凳",
			"槓路徑略斜，由鎖骨下方推至手臂伸直"
		],
		cues: [
			"沉肩",
			"挺胸",
			"斜板唔好太斜",
			"手肘唔好過度打開",
			"頂點唔鎖死肩"
		],
		mistakes: [
			"斜板調到 45 度以上，前束好易受傷",
			"肩聳起離開凳面",
			"下放太快失去張力"
		],
		breathing: "下放吸，推起呼。保持肋骨向下，唔好過度挺腰。",
		maleP60: .72,
		femaleP60: .42
	},
	{
		id: "dumbbell-bench",
		nameZh: "啞鈴臥推",
		nameEn: "Dumbbell Bench Press",
		muscle: "chest",
		equipment: "dumbbell",
		loadKind: "dumbbell",
		summary: "活動幅度比槓鈴大，左右可以獨立發力，適合修正左右不平衡。",
		setup: [
			"坐喺凳邊，啞鈴放大腿，再一齊躺低踢起",
			"肩胛後收下壓，啞鈴喺胸口兩側",
			"掌心相對或微微內旋都可以"
		],
		cues: [
			"沉肩",
			"挺胸",
			"底部有控制",
			"頂點夾胸",
			"手腕同手肘成一直線"
		],
		mistakes: [
			"底部掉得太低令肩過度伸展",
			"推到頂變成肩向前捲",
			"左右節奏唔同步"
		],
		breathing: "下放吸，推起呼。重量大就請人睇住。",
		maleP60: .38,
		femaleP60: .22
	},
	{
		id: "chest-press-machine",
		nameZh: "坐姿推胸機",
		nameEn: "Chest Press Machine",
		muscle: "chest",
		equipment: "machine",
		loadKind: "stack",
		summary: "軌道固定，適合學軌跡同力竭。座位同手柄高度決定你用胸定用肩。",
		setup: [
			"調座位：手柄大約喺乳頭至胸口中間",
			"背貼實靠墊，雙腳踩實",
			"握手柄時肩已經沉低，唔好先聳肩再推"
		],
		cues: [
			"沉肩",
			"挺胸",
			"背貼墊",
			"推出時夾胸",
			"回程有控制"
		],
		mistakes: [
			"座位太高變成肩推",
			"推到盡用慣性撞機",
			"離座借力"
		],
		breathing: "推出呼，收回吸。",
		machineTip: "手柄太高會變成練肩。先調座再選重量。安全扣／快拆插銷要插實。",
		maleP60: .9,
		femaleP60: .52
	},
	{
		id: "pec-deck",
		nameZh: "蝴蝶機夾胸",
		nameEn: "Pec Deck",
		muscle: "chest",
		equipment: "machine",
		loadKind: "stack",
		summary: "孤立胸肌。肩關節要穩，唔好靠手甩。",
		setup: [
			"座位調到上臂同地面平行，或者微微向下",
			"前臂貼實墊，肩胛向後貼靠背",
			"先沉肩，再開始夾"
		],
		cues: [
			"沉肩",
			"用胸夾唔係用手甩",
			"頂峰收縮停一拍",
			"開去時保持張力"
		],
		mistakes: [
			"打開過後令肩向前脫位感",
			"聳肩",
			"用慣性彈返嚟"
		],
		breathing: "夾攏呼氣，打開吸氣。",
		machineTip: "活動幅度以後面肩關節舒服為準，唔好硬開到盡。",
		maleP60: .55,
		femaleP60: .32
	},
	{
		id: "cable-fly",
		nameZh: "繩索夾胸",
		nameEn: "Cable Fly",
		muscle: "chest",
		equipment: "cable",
		loadKind: "stack",
		summary: "全程有張力。高位夾偏下胸，平位夾中胸，低位夾上胸。",
		setup: [
			"雙滑輪調到所需高度，向前踏一步成弓步",
			"微微屈肘固定個角度，當佢係固定槓桿",
			"肩胛後收，胸向前送"
		],
		cues: [
			"沉肩",
			"肘角度固定",
			"用胸帶臂",
			"夾到中線",
			"回程慢"
		],
		mistakes: [
			"手伸直鎖死肘",
			"身體前後晃借力",
			"肩過耳"
		],
		breathing: "夾攏呼，打開吸。",
		machineTip: "每邊配重要對稱。手柄用 D-handle。",
		maleP60: .22,
		femaleP60: .12
	},
	{
		id: "barbell-squat",
		nameZh: "槓鈴深蹲",
		nameEn: "Barbell Squat",
		muscle: "legs",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "全身力量基礎。髖同膝一齊屈曲，脊柱保持中立。",
		setup: [
			"槓放上斜方肌（高槓）或後三角（低槓），唔好壓住頸椎",
			"雙手握實，上背收緊，肘向下",
			"腳距大約肩寬，腳尖微向外",
			"先挺胸、收核心，再離架"
		],
		cues: [
			"挺胸",
			"核心收緊",
			"膝跟腳尖方向",
			"髖向後坐",
			"全腳掌落地",
			"起身時地面往下踩"
		],
		mistakes: [
			"膝蓋內扣",
			"腰圓背（屁股眨眼）",
			"腳跟離地",
			"低頭令胸塌"
		],
		breathing: "落去前吸飽氣入腹，頂住核心；站返起再呼。",
		maleP60: 1.15,
		femaleP60: .85
	},
	{
		id: "smith-squat",
		nameZh: "史密斯機深蹲",
		nameEn: "Smith Machine Squat",
		muscle: "legs",
		equipment: "machine",
		loadKind: "bar",
		compound: true,
		summary: "軌道固定，較易學深度。唔好完全放空核心，軌道唔會幫你護腰。",
		setup: [
			"腳站得比自由槓稍前，令膝同軌道協調",
			"先轉開安全鈎，確認兩邊安全擋位置高過你最低點",
			"同樣挺胸、收核心"
		],
		cues: [
			"挺胸",
			"核心仍然要收",
			"腳稍向前",
			"蹲到大腿至少平行",
			"頂點再轉鈎"
		],
		mistakes: [
			"腳太後令膝過度前推",
			"完全靠軌道放空腰",
			"唔設安全擋"
		],
		breathing: "同自由深蹲：落去前閉氣支撐，起身再呼。",
		machineTip: "用史密斯前一定要調兩邊安全擋。轉鈎方向先空槓試一次。",
		maleP60: 1.2,
		femaleP60: .9
	},
	{
		id: "leg-press",
		nameZh: "腿舉機",
		nameEn: "Leg Press",
		muscle: "legs",
		equipment: "machine",
		loadKind: "stack",
		compound: true,
		summary: "可以推大重量，但腰要貼實。腳位決定練邊度。",
		setup: [
			"坐穩，腰背全程貼墊，唔好捲尾龍骨",
			"腳放踏板中間；高位偏臀腿後側，低位偏股四",
			"解鎖安全鈎前先用腳頂實"
		],
		cues: [
			"腰貼墊",
			"膝跟腳尖方向",
			"唔鎖死膝",
			"下放至大腿接近胸口但腰唔離墊",
			"用腳跟推"
		],
		mistakes: [
			"底部腰離開靠墊",
			"膝內扣",
			"頂點彈膝鎖死",
			"手幫忙推膝"
		],
		breathing: "推起呼，下放吸。重重量同樣用腹壓。",
		machineTip: "解鎖／上鎖要兩邊一齊。配重片要全部推入到底。",
		maleP60: 2.4,
		femaleP60: 1.7
	},
	{
		id: "hack-squat",
		nameZh: "哈克深蹲",
		nameEn: "Hack Squat",
		muscle: "legs",
		equipment: "machine",
		loadKind: "stack",
		summary: "軌道承住上背，股四刺激強。肩墊同腳位要調好。",
		setup: [
			"肩緊貼肩墊，背貼板",
			"腳距肩寬，踏板中間或略低",
			"解鎖前先伸直但唔鎖膝"
		],
		cues: [
			"背貼板",
			"膝向外打開",
			"蹲到舒適深度",
			"腳跟唔離板"
		],
		mistakes: [
			"只做半程",
			"膝內扣",
			"腰離開靠板"
		],
		breathing: "落去吸，推起呼。",
		machineTip: "肩墊太鬆會令頸受力。安全鈎行程要試過。",
		maleP60: 1.35,
		femaleP60: .95
	},
	{
		id: "leg-extension",
		nameZh: "腿伸展機",
		nameEn: "Leg Extension",
		muscle: "legs",
		equipment: "machine",
		loadKind: "stack",
		summary: "孤立股四頭。滾筒位置同座位深度好重要。",
		setup: [
			"座位調到膝關節對準機器轉軸",
			"腳踝滾筒壓喺腳背下方，唔好壓住腳趾",
			"背靠實，扶好手柄"
		],
		cues: [
			"膝對準轉軸",
			"頂點夾實股四",
			"下放慢",
			"唔借擺動"
		],
		mistakes: [
			"轉軸唔對齊膝，髕骨會痛",
			"重量太大甩上去",
			"臀部離座"
		],
		breathing: "伸直呼，放下吸。",
		machineTip: "膝痛就縮小頂點角度，唔好硬鎖死。",
		maleP60: .7,
		femaleP60: .5
	},
	{
		id: "leg-curl",
		nameZh: "腿彎舉機",
		nameEn: "Leg Curl",
		muscle: "legs",
		equipment: "machine",
		loadKind: "stack",
		summary: "練腿後側。髖保持穩定，用腘繩肌彎膝。",
		setup: [
			"臥姿：髖貼墊，滾筒放喺阿基里斯腱上方",
			"坐姿：背墊調到膝對準轉軸",
			"腳尖保持中立或微微勾起"
		],
		cues: [
			"髖唔離墊",
			"頂點擠實腿後",
			"下放有控制",
			"腳趾唔用力代工"
		],
		mistakes: [
			"借腰借擺",
			"滾筒滑去小腿肚",
			"只做半程"
		],
		breathing: "彎起呼，放下吸。",
		machineTip: "坐姿同臥姿都要對準轉軸，否則膝會扯。",
		maleP60: .55,
		femaleP60: .4
	},
	{
		id: "calf-raise",
		nameZh: "提踵",
		nameEn: "Calf Raise",
		muscle: "legs",
		equipment: "machine",
		loadKind: "stack",
		summary: "小腿要做滿行程：底部拉長、頂點停頓。",
		setup: [
			"前腳掌踏喺踏板邊，腳跟懸空",
			"膝保持微屈固定，唔好每下彈膝",
			"肩墊或槓位置坐實"
		],
		cues: [
			"底部放低拉長",
			"頂點停一拍",
			"行程要滿",
			"唔彈震"
		],
		mistakes: [
			"只做半程",
			"用慣性彈",
			"腳掌外翻內翻過度"
		],
		breathing: "提起呼，放下吸。",
		machineTip: "站姿提踵偏腓腸肌，坐姿屈膝偏比目魚肌。",
		maleP60: 1.5,
		femaleP60: 1.1
	},
	{
		id: "deadlift",
		nameZh: "傳統硬拉",
		nameEn: "Conventional Deadlift",
		muscle: "back",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "由地面拉起最大重量。背要中立，髖主導。",
		setup: [
			"槓喺腳中間上方，腳距髖寬",
			"握槓後先拉緊（pre-tension），背先平",
			"肩略微超過槓，髖高過膝、低過肩",
			"視線前方地面，頸中立"
		],
		cues: [
			"背中立",
			"拉緊背闊",
			"用腳踩地",
			"槓貼脛骨",
			"髖膝一齊伸",
			"頂點夾臀唔後仰"
		],
		mistakes: [
			"圓背起槓",
			"槓離開身體",
			"先抬臀變成直腿硬拉",
			"頂點過度後仰壓腰"
		],
		breathing: "拉起前吸氣入腹，鎖核心；過膝後再呼。",
		maleP60: 1.35,
		femaleP60: 1
	},
	{
		id: "rdl",
		nameZh: "羅馬尼亞硬拉",
		nameEn: "Romanian Deadlift",
		muscle: "glutes",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "髖鉸鏈動作，練臀同腿後。膝只微屈，重點係髖向後。",
		setup: [
			"由站立開始，而唔係由地面拉",
			"微屈膝後鎖定個角度",
			"槓貼住大腿下滑"
		],
		cues: [
			"髖向後推",
			"背打直",
			"槓貼身",
			"感到腿後拉長",
			"用臀帶回"
		],
		mistakes: [
			"膝向前屈變成深蹲",
			"圓背",
			"槓離開大腿",
			"下放太低失去中立"
		],
		breathing: "下放吸，站起呼。全程腹壓。",
		maleP60: 1.05,
		femaleP60: .8
	},
	{
		id: "hip-thrust",
		nameZh: "臀推",
		nameEn: "Hip Thrust",
		muscle: "glutes",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "最直接練臀。頂點要夾臀，唔好用腰代工。",
		setup: [
			"上背靠凳，凳邊大約喺肩胛位置",
			"槓放髖摺，用墊保護",
			"腳掌全掌着地，小腿喺頂點接近垂直"
		],
		cues: [
			"下巴微收",
			"頂點夾臀",
			"肋骨向下",
			"腳跟發力",
			"頂點身體成一直線"
		],
		mistakes: [
			"用腰過度後伸",
			"腳太前或太后",
			"頂點冇停頓",
			"膝內扣"
		],
		breathing: "推起呼，放下吸。",
		maleP60: 1.4,
		femaleP60: 1.2
	},
	{
		id: "pull-up",
		nameZh: "引體上升",
		nameEn: "Pull-up",
		muscle: "back",
		equipment: "bodyweight",
		loadKind: "bodyweight",
		compound: true,
		summary: "背闊同上背的試金石。記錄重量係額外負重，徒手就填 0。",
		setup: [
			"正手握（掌心向前），略寬於肩",
			"先沉肩，再屈肘拉",
			"核心收，避免大幅擺動"
		],
		cues: [
			"先沉肩",
			"胸向上槓",
			"肘向後下方拉",
			"頂點鎖骨近槓",
			"下放至手臂接近伸直"
		],
		mistakes: [
			"只聳肩唔郁背",
			"用身體大幅擺動借力",
			"下放突然掉低",
			"頭向前伸"
		],
		breathing: "拉上呼，放下吸。",
		machineTip: "助力機／彈力帶可以減負重。負重用腰帶掛片，填額外公斤。",
		maleP60: 1.08,
		femaleP60: .85
	},
	{
		id: "lat-pulldown",
		nameZh: "高位下拉",
		nameEn: "Lat Pulldown",
		muscle: "back",
		equipment: "machine",
		loadKind: "stack",
		compound: true,
		summary: "引體上升的器械版。軌跡同沉肩一樣重要。",
		setup: [
			"調大腿擋墊，坐穩唔好被拉起",
			"握距略寬於肩，身體微微後傾 10–15 度",
			"先沉肩，再拉桿到鎖骨"
		],
		cues: [
			"沉肩",
			"拉到鎖骨",
			"肘向後下方",
			"夾背",
			"回程控制"
		],
		mistakes: [
			"拉到胸以下用慣性",
			"前後大幅搖",
			"只屈肘當二頭做",
			"拉去頸後（多數人肩會不適）"
		],
		breathing: "下拉呼，回升吸。",
		machineTip: "大腿擋要壓實。寬桿、窄握、反手會偏唔同肌群。",
		maleP60: .85,
		femaleP60: .55
	},
	{
		id: "seated-row",
		nameZh: "坐姿划船",
		nameEn: "Seated Row",
		muscle: "back",
		equipment: "machine",
		loadKind: "stack",
		compound: true,
		summary: "練中背同背闊。先夾肩胛，再屈肘。",
		setup: [
			"坐墊同胸墊（如有）調到手柄大約肚臍至胸口",
			"膝微屈，脊柱中立",
			"先伸直手臂但肩已經沉低"
		],
		cues: [
			"沉肩",
			"先夾背再拉",
			"肘貼身",
			"胸挺",
			"唔縮成圓背"
		],
		mistakes: [
			"用腰前後搖",
			"聳肩拉到耳仔",
			"只屈臂當二頭",
			"回程肩被重量拉向前"
		],
		breathing: "拉回呼，伸出去吸。",
		machineTip: "胸墊太近會限制夾背；太遠就會用腰借力。",
		maleP60: .85,
		femaleP60: .55
	},
	{
		id: "barbell-row",
		nameZh: "槓鈴划船",
		nameEn: "Barbell Row",
		muscle: "back",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "自由重量划船。髖鉸鏈維持，背保持平坦。",
		setup: [
			"髖鉸到上身約 30–45 度",
			"握距略寬於肩，槓由膝下開始",
			"核心收緊，頸中立"
		],
		cues: [
			"背打直",
			"拉向肚臍",
			"夾肩胛",
			"肘向後",
			"軀幹角度固定"
		],
		mistakes: [
			"借下背甩",
			"變成直立划船",
			"圓背",
			"只用手臂拉"
		],
		breathing: "拉起呼，放下吸。重重量可以每下重新吸氣支撐。",
		maleP60: .8,
		femaleP60: .52
	},
	{
		id: "face-pull",
		nameZh: "面拉",
		nameEn: "Face Pull",
		muscle: "shoulders",
		equipment: "cable",
		loadKind: "stack",
		summary: "外旋同後束，護肩必備。重量要輕，軌跡要準。",
		setup: [
			"繩索調到面或額頭高度",
			"握繩兩端，掌心向下再外旋",
			"先沉肩，拉向面／額頭"
		],
		cues: [
			"沉肩",
			"肘高過手",
			"外旋（拳指向後）",
			"夾後束",
			"停一拍"
		],
		mistakes: [
			"重量太重變成划船",
			"聳肩",
			"冇外旋",
			"用下背借力"
		],
		breathing: "拉近呼，放回吸。",
		machineTip: "用繩（rope），唔好用直桿。輕重量高質量。",
		maleP60: .28,
		femaleP60: .18
	},
	{
		id: "ohp",
		nameZh: "槓鈴肩推",
		nameEn: "Overhead Press",
		muscle: "shoulders",
		equipment: "barbell",
		loadKind: "bar",
		compound: true,
		summary: "站姿推過頭。核心同臀要鎖死，先沉肩再推。",
		setup: [
			"槓喺鎖骨上，握距略寬於肩",
			"肘略微在槓前方，手腕垂直",
			"臀夾、腹收，膝唔好預先屈（除非做 push press）"
		],
		cues: [
			"沉肩",
			"夾臀",
			"核心鎖死",
			"推過頭至耳側",
			"頭微微穿過"
		],
		mistakes: [
			"腰過度後仰",
			"用腿借力（除非指定）",
			"手腕後折",
			"頂點肩冇外旋打開"
		],
		breathing: "推起前吸氣支撐，過頭頂再呼。",
		maleP60: .55,
		femaleP60: .35
	},
	{
		id: "db-shoulder-press",
		nameZh: "啞鈴肩推",
		nameEn: "Dumbbell Shoulder Press",
		muscle: "shoulders",
		equipment: "dumbbell",
		loadKind: "dumbbell",
		summary: "坐姿較穩。沉肩，唔好把啞鈴在底部撞。",
		setup: [
			"椅背 70–90 度，腰貼實",
			"啞鈴起始喺耳側，肘略向前",
			"掌心向前或微斜"
		],
		cues: [
			"沉肩",
			"核心收",
			"頂點唔撞鈴",
			"手腕垂直",
			"下放至耳側"
		],
		mistakes: [
			"底部撞鈴借力",
			"腰離椅",
			"聳肩推"
		],
		breathing: "推起呼，下放吸。",
		maleP60: .28,
		femaleP60: .16
	},
	{
		id: "machine-shoulder-press",
		nameZh: "肩推機",
		nameEn: "Shoulder Press Machine",
		muscle: "shoulders",
		equipment: "machine",
		loadKind: "stack",
		summary: "軌道固定，適合力竭。座位高度決定推軌跡。",
		setup: [
			"調座位：手柄大約耳側或略低",
			"背貼墊，腳踩實",
			"先沉肩再推"
		],
		cues: [
			"沉肩",
			"背貼墊",
			"唔聳肩",
			"頂點控制",
			"回程慢"
		],
		mistakes: [
			"座位太低令肩過度伸展",
			"離座借力",
			"鎖死彈震"
		],
		breathing: "推起呼，回落吸。",
		machineTip: "手柄起步太低會夾肩。先空下試行程。",
		maleP60: .6,
		femaleP60: .38
	},
	{
		id: "lateral-raise",
		nameZh: "側平舉",
		nameEn: "Lateral Raise",
		muscle: "shoulders",
		equipment: "dumbbell",
		loadKind: "dumbbell",
		summary: "中束塑形。重量要輕，帶領的是肘而唔係手。",
		setup: [
			"站直或微前傾，啞鈴喺身側",
			"肘微屈並固定",
			"沉肩，想像倒水"
		],
		cues: [
			"沉肩",
			"肘帶領",
			"舉到肩高",
			"小指略高",
			"下放慢"
		],
		mistakes: [
			"甩上去用慣性",
			"聳肩變上斜方",
			"舉過過頭",
			"重量太大變成前推"
		],
		breathing: "舉起呼，放下吸。",
		maleP60: .12,
		femaleP60: .08
	},
	{
		id: "bicep-curl",
		nameZh: "二頭彎舉",
		nameEn: "Bicep Curl",
		muscle: "arms",
		equipment: "dumbbell",
		loadKind: "dumbbell",
		summary: "肘固定在身側。頂點外旋可以多一點二頭短頭。",
		setup: [
			"站直，肩沉，肘貼住軀幹",
			"掌心向前（或槌式中立）",
			"核心收，唔好前後晃"
		],
		cues: [
			"肘固定",
			"頂點擠實",
			"下放伸直但仍有張力",
			"唔借腰"
		],
		mistakes: [
			"擺動借力",
			"肘向前移",
			"只做上半程"
		],
		breathing: "彎起呼，放下吸。",
		maleP60: .22,
		femaleP60: .12
	},
	{
		id: "tricep-pushdown",
		nameZh: "三頭下壓",
		nameEn: "Tricep Pushdown",
		muscle: "arms",
		equipment: "cable",
		loadKind: "stack",
		summary: "肘鎖在身側，只郁前臂。繩或直桿都可以。",
		setup: [
			"滑輪調到高位，站近機",
			"上臂貼身，肩沉",
			"微微前傾但腰中立"
		],
		cues: [
			"肘貼身",
			"只伸前臂",
			"頂點夾實三頭",
			"回程停在前臂平行"
		],
		mistakes: [
			"肘向外飛",
			"用肩下壓",
			"重量太大壓成前傾甩"
		],
		breathing: "下壓呼，回升吸。",
		machineTip: "繩索可以喺底部分開，多一點內側頭。",
		maleP60: .35,
		femaleP60: .2
	},
	{
		id: "cable-crunch",
		nameZh: "繩索捲腹",
		nameEn: "Cable Crunch",
		muscle: "core",
		equipment: "cable",
		loadKind: "stack",
		summary: "用腹肌屈曲脊柱，而唔係用髖屈。",
		setup: [
			"高位繩，跪地，繩放喺肩上",
			"髖位置固定，想像把肋骨拉向骨盆",
			"頸放鬆，唔好用力收下巴扯繩"
		],
		cues: [
			"肋骨向骨盆",
			"髖唔坐後",
			"頂點擠腹",
			"慢回"
		],
		mistakes: [
			"變成髖屈（坐向腳跟）",
			"用手臂拉繩",
			"頸過度屈曲"
		],
		breathing: "捲下呼氣吐盡，回程吸。",
		machineTip: "重量適中先有擠壓感，太重會用髖借力。",
		maleP60: .45,
		femaleP60: .32
	}
];
var EXERCISE_MAP = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));
function getExercise(id) {
	return EXERCISE_MAP[id];
}
function curveFor(exercise, sex) {
	return curveFromP60(sex === "male" ? exercise.maleP60 : exercise.femaleP60);
}
var TEMPLATES = [
	{
		id: "push",
		name: "推日",
		subtitle: "胸 · 肩 · 三頭",
		exerciseIds: [
			"barbell-bench",
			"incline-bench",
			"ohp",
			"lateral-raise",
			"tricep-pushdown"
		]
	},
	{
		id: "pull",
		name: "拉日",
		subtitle: "背 · 二頭",
		exerciseIds: [
			"lat-pulldown",
			"seated-row",
			"barbell-row",
			"face-pull",
			"bicep-curl"
		]
	},
	{
		id: "legs",
		name: "腿日",
		subtitle: "股四 · 臀 · 腿後",
		exerciseIds: [
			"barbell-squat",
			"rdl",
			"leg-press",
			"leg-curl",
			"calf-raise"
		]
	},
	{
		id: "full",
		name: "全身",
		subtitle: "四大項",
		exerciseIds: [
			"barbell-squat",
			"barbell-bench",
			"seated-row",
			"ohp"
		]
	},
	{
		id: "upper",
		name: "上肢",
		subtitle: "推拉平衡",
		exerciseIds: [
			"barbell-bench",
			"seated-row",
			"ohp",
			"lat-pulldown"
		]
	},
	{
		id: "machines",
		name: "器械日",
		subtitle: "機房路線",
		exerciseIds: [
			"chest-press-machine",
			"lat-pulldown",
			"seated-row",
			"leg-press",
			"leg-extension",
			"machine-shoulder-press"
		]
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-DG6UNzh9.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DHcSck8z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadGymState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7f412f288bf0a2e0417681ebaaafe6beebb1340c3e88aec635b5b27fa02824ef"));
var saveGymSnapshot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("b469b218e3c353098fe0dae6f0a73591b14831637c6dc6cf3d5240e6f74e5fa1"));
var saveGymWorkout = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("da984a8634cb520cd0b24217da22206d870048ac148887dd8bda51c4f10d6f94"));
var replaceGymWorkouts = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("1ab9367f35fe0ab1ba913e3d349bfbefeec7d6701101a6affa3f1e42cde95052"));
var clearGymCloud = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("6ed4ca5135cece7019af9c92b97351e160410a1f832b01b7c8cd2b89b9e4c3e4"));
function xpToNext(level) {
	return Math.round(100 * Math.pow(level, 1.22));
}
function progressFromXp(xp) {
	let level = 1;
	let remaining = Math.max(0, xp);
	for (let i = 0; i < 99; i++) {
		const need = xpToNext(level);
		if (remaining < need) return {
			level,
			into: remaining,
			need
		};
		remaining -= need;
		level += 1;
	}
	return {
		level: 99,
		into: 0,
		need: 1
	};
}
function titleForLevel(level) {
	if (level >= 30) return "傳奇";
	if (level >= 20) return "冠軍";
	if (level >= 15) return "精英";
	if (level >= 10) return "戰士";
	if (level >= 5) return "訓練者";
	return "新兵";
}
function e1rm(weight, reps) {
	if (weight <= 0 || reps <= 0) return 0;
	if (reps === 1) return weight;
	return Math.round(weight * (1 + reps / 30) * 10) / 10;
}
function setLoad(weight, reps) {
	return e1rm(weight, reps);
}
function loadToRatio(exercise, e1rmKg, bodyweight) {
	if (bodyweight <= 0) return 0;
	if (exercise.loadKind === "bodyweight") return (bodyweight + e1rmKg) / bodyweight;
	if (exercise.loadKind === "dumbbell") return e1rmKg / bodyweight;
	return e1rmKg / bodyweight;
}
function bestSets(workouts) {
	const best = {};
	for (const w of workouts) for (const ex of w.exercises) for (const s of ex.sets) {
		if (!s.done || s.weight < 0 || s.reps <= 0) continue;
		const est = e1rm(s.weight, s.reps);
		const prev = best[ex.exerciseId];
		if (!prev || est > prev.e1rm) best[ex.exerciseId] = {
			exerciseId: ex.exerciseId,
			weight: s.weight,
			reps: s.reps,
			e1rm: est,
			date: w.finishedAt
		};
	}
	return best;
}
function lastSetsFor(workouts, exerciseId) {
	for (let i = workouts.length - 1; i >= 0; i--) {
		const found = workouts[i].exercises.find((e) => e.exerciseId === exerciseId);
		if (found && found.sets.length) return found.sets;
	}
	return null;
}
function rankExercise(exercise, best, profile) {
	if (!best) return {
		exercise,
		best: null,
		percentile: 0,
		rank: UNRANKED,
		next: null,
		progress: 0,
		kgToNext: null
	};
	const curve = curveFor(exercise, profile.sex);
	const percentile = ratioToPercentile(loadToRatio(exercise, best.e1rm, profile.bodyweight), curve);
	const { rank, next, t } = rankProgress(percentile);
	let kgToNext = null;
	if (next) {
		const needE1rm = ratioToE1rm(exercise, percentileToRatio(next.min, curve), profile.bodyweight);
		kgToNext = Math.round((needE1rm - best.e1rm) * 10) / 10;
	}
	return {
		exercise,
		best,
		percentile,
		rank,
		next,
		progress: t,
		kgToNext
	};
}
function ratioToE1rm(exercise, ratio, bw) {
	if (exercise.loadKind === "bodyweight") return Math.max(0, ratio * bw - bw);
	return ratio * bw;
}
function overallRank(workouts, profile) {
	const best = bestSets(workouts);
	const entries = Object.values(best).map((b) => {
		const ex = getExercise(b.exerciseId);
		if (!ex) return null;
		const r = rankExercise(ex, b, profile);
		const w = ex.compound ? 1.6 : 1;
		return {
			pct: r.percentile,
			w
		};
	}).filter((x) => x !== null);
	if (!entries.length) return {
		percentile: 0,
		rank: UNRANKED,
		next: null,
		progress: 0,
		counted: 0
	};
	const sumW = entries.reduce((a, b) => a + b.w, 0);
	const percentile = Math.round(entries.reduce((a, b) => a + b.pct * b.w, 0) / sumW * 10) / 10;
	const { rank, next, t } = rankProgress(percentile);
	return {
		percentile,
		rank,
		next,
		progress: t,
		counted: entries.length
	};
}
function workoutVolume(exercises) {
	let vol = 0;
	for (const ex of exercises) {
		const factor = getExercise(ex.exerciseId)?.loadKind;
		for (const s of ex.sets) {
			if (!s.done) continue;
			const w = factor === "dumbbell" ? s.weight * 2 : s.weight;
			vol += w * s.reps;
		}
	}
	return Math.round(vol);
}
function completedSetCount(exercises) {
	return exercises.reduce((n, e) => n + e.sets.filter((s) => s.done).length, 0);
}
function computeStreak(workouts, today = localISODate()) {
	const days = new Set(workouts.map((w) => localISODate(new Date(w.finishedAt))));
	let cursor = today;
	if (!days.has(cursor)) cursor = shiftBack(cursor, 1);
	let streak = 0;
	while (days.has(cursor)) {
		streak += 1;
		cursor = shiftBack(cursor, 1);
	}
	return streak;
}
function shiftBack(iso, days) {
	const [y, m, d] = iso.split("-").map(Number);
	return localISODate(new Date(y, (m ?? 1) - 1, (d ?? 1) - days));
}
function trainedDays(workouts) {
	return new Set(workouts.map((w) => localISODate(new Date(w.finishedAt))));
}
function lastNDates(n, from = localISODate()) {
	const out = [];
	for (let i = n - 1; i >= 0; i--) out.push(shiftBack(from, i));
	return out;
}
function historyForExercise(workouts, exerciseId) {
	const rows = [];
	for (const w of workouts) {
		const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
		if (!ex) continue;
		const done = ex.sets.filter((s) => s.done && s.reps > 0);
		if (!done.length) continue;
		const top = done.reduce((a, b) => setLoad(b.weight, b.reps) > setLoad(a.weight, a.reps) ? b : a);
		const volume = done.reduce((n, s) => n + s.weight * s.reps, 0);
		rows.push({
			date: w.finishedAt,
			weight: top.weight,
			reps: top.reps,
			e1rm: e1rm(top.weight, top.reps),
			volume
		});
	}
	return rows;
}
function loadKindHint(kind) {
	if (kind === "dumbbell") return "每隻手";
	if (kind === "bodyweight") return "額外負重，徒手填 0";
	if (kind === "stack") return "配重片標示";
	return "槓鈴含槓";
}
var defaultProfile = {
	name: "",
	sex: "male",
	bodyweight: 70,
	onboarded: false
};
function emptySet(weight = 20, reps = 8) {
	return {
		id: uid(),
		weight,
		reps,
		done: false
	};
}
function seedSets(exerciseId, workouts) {
	const last = lastSetsFor(workouts, exerciseId);
	if (last?.length) return last.slice(0, 5).map((s) => ({
		id: uid(),
		weight: s.weight,
		reps: s.reps,
		done: false
	}));
	const ex = getExercise(exerciseId);
	const w = ex?.loadKind === "dumbbell" ? 12 : ex?.loadKind === "bodyweight" ? 0 : 20;
	return [
		emptySet(w, 8),
		emptySet(w, 8),
		emptySet(w, 8)
	];
}
function findPrs(prev, session) {
	const best = {};
	for (const w of prev) for (const ex of w.exercises) for (const s of ex.sets) {
		if (!s.done) continue;
		const est = e1rm(s.weight, s.reps);
		best[ex.exerciseId] = Math.max(best[ex.exerciseId] ?? 0, est);
	}
	const prs = [];
	for (const ex of session.exercises) {
		let top = 0;
		for (const s of ex.sets) {
			if (!s.done) continue;
			top = Math.max(top, e1rm(s.weight, s.reps));
		}
		if (top > 0 && top > (best[ex.exerciseId] ?? 0) + .05) prs.push(ex.exerciseId);
	}
	return prs;
}
function xpForSession(session, prs, isFirstToday, streak) {
	const sets = completedSetCount(session.exercises);
	const volume = workoutVolume(session.exercises);
	const breakdown = [];
	breakdown.push({
		label: "完成訓練",
		amount: 80
	});
	breakdown.push({
		label: `${sets} 組`,
		amount: sets * 10
	});
	const volXp = Math.floor(volume / 60);
	if (volXp) breakdown.push({
		label: "訓練量",
		amount: volXp
	});
	if (prs.length) breakdown.push({
		label: `${prs.length} 項新紀錄`,
		amount: prs.length * 60
	});
	if (isFirstToday) breakdown.push({
		label: "今日首次",
		amount: 40
	});
	const streakXp = Math.min(streak, 10) * 8;
	if (streakXp) breakdown.push({
		label: `連續 ${streak} 日`,
		amount: streakXp
	});
	return {
		xp: breakdown.reduce((n, b) => n + b.amount, 0),
		breakdown
	};
}
function streakAfter(workouts, finishedAt) {
	const days = new Set(workouts.map((w) => localISODate(new Date(w.finishedAt))));
	days.add(localISODate(new Date(finishedAt)));
	let cursor = localISODate(new Date(finishedAt));
	let n = 0;
	while (days.has(cursor)) {
		n += 1;
		const [y, m, d] = cursor.split("-").map(Number);
		cursor = localISODate(new Date(y, (m ?? 1) - 1, (d ?? 1) - 1));
	}
	return n;
}
function bumpCloud() {
	import("./sync-D2AN-r-P.mjs").then((m) => m.scheduleCloudSave());
}
var useGymStore = create()(persist((set, get) => ({
	profile: defaultProfile,
	xp: 0,
	workouts: [],
	session: null,
	lastSummary: null,
	setProfile: (patch) => {
		set((s) => ({ profile: {
			...s.profile,
			...patch
		} }));
		bumpCloud();
	},
	startSession: (name, exerciseIds = []) => {
		const workouts = get().workouts;
		const exercises = exerciseIds.map((id) => ({
			exerciseId: id,
			sets: seedSets(id, workouts)
		}));
		set({
			session: {
				name,
				startedAt: (/* @__PURE__ */ new Date()).toISOString(),
				exercises
			},
			lastSummary: null
		});
		bumpCloud();
	},
	startTemplate: (templateId) => {
		const t = TEMPLATES.find((x) => x.id === templateId);
		get().startSession(t?.name ?? "訓練", t?.exerciseIds ?? []);
	},
	discardSession: () => {
		set({ session: null });
		bumpCloud();
	},
	addExercise: (exerciseId) => {
		set((s) => {
			if (!s.session) return s;
			if (s.session.exercises.some((e) => e.exerciseId === exerciseId)) return s;
			return { session: {
				...s.session,
				exercises: [...s.session.exercises, {
					exerciseId,
					sets: seedSets(exerciseId, s.workouts)
				}]
			} };
		});
		bumpCloud();
	},
	removeExercise: (exerciseId) => {
		set((s) => {
			if (!s.session) return s;
			return { session: {
				...s.session,
				exercises: s.session.exercises.filter((e) => e.exerciseId !== exerciseId)
			} };
		});
		bumpCloud();
	},
	addSet: (exerciseId) => {
		set((s) => {
			if (!s.session) return s;
			return { session: {
				...s.session,
				exercises: s.session.exercises.map((e) => {
					if (e.exerciseId !== exerciseId) return e;
					const last = e.sets[e.sets.length - 1];
					return {
						...e,
						sets: [...e.sets, {
							id: uid(),
							weight: last?.weight ?? 20,
							reps: last?.reps ?? 8,
							done: false
						}]
					};
				})
			} };
		});
		bumpCloud();
	},
	removeSet: (exerciseId, setId) => {
		set((s) => {
			if (!s.session) return s;
			return { session: {
				...s.session,
				exercises: s.session.exercises.map((e) => e.exerciseId === exerciseId ? {
					...e,
					sets: e.sets.filter((x) => x.id !== setId)
				} : e)
			} };
		});
		bumpCloud();
	},
	updateSet: (exerciseId, setId, patch) => {
		set((s) => {
			if (!s.session) return s;
			return { session: {
				...s.session,
				exercises: s.session.exercises.map((e) => e.exerciseId === exerciseId ? {
					...e,
					sets: e.sets.map((x) => x.id === setId ? {
						...x,
						...patch
					} : x)
				} : e)
			} };
		});
		bumpCloud();
	},
	finishSession: () => {
		const { session, workouts, xp } = get();
		if (!session) return null;
		const cleaned = session.exercises.map((e) => ({
			...e,
			sets: e.sets.filter((s) => s.done && s.reps > 0)
		})).filter((e) => e.sets.length);
		if (!cleaned.length) return null;
		const finishedAt = (/* @__PURE__ */ new Date()).toISOString();
		const today = localISODate();
		const isFirstToday = !workouts.some((w) => localISODate(new Date(w.finishedAt)) === today);
		const prs = findPrs(workouts, {
			...session,
			exercises: cleaned
		});
		const streak = streakAfter(workouts, finishedAt);
		const { xp: gained, breakdown } = xpForSession({
			...session,
			exercises: cleaned
		}, prs, isFirstToday, streak);
		const before = progressFromXp(xp).level;
		const after = progressFromXp(xp + gained).level;
		const workout = {
			id: uid(),
			name: session.name,
			startedAt: session.startedAt,
			finishedAt,
			exercises: cleaned,
			xpEarned: gained,
			breakdown,
			prs
		};
		const summary = {
			workoutId: workout.id,
			xp: gained,
			breakdown,
			prs,
			leveledUpTo: after > before ? after : null,
			streak
		};
		set({
			session: null,
			workouts: [...workouts, workout],
			xp: xp + gained,
			lastSummary: summary
		});
		import("./sync-D2AN-r-P.mjs").then((m) => m.persistWorkout(workout));
		return summary;
	},
	clearSummary: () => set({ lastSummary: null }),
	resetAll: () => {
		set({
			profile: defaultProfile,
			xp: 0,
			workouts: [],
			session: null,
			lastSummary: null
		});
		import("./sync-D2AN-r-P.mjs").then((m) => m.wipeCloud());
	}
}), {
	name: "iron-rank-v1",
	skipHydration: true
}));
function rehydrateGym() {
	return useGymStore.persist.rehydrate();
}
var saveTimer = null;
var syncing = false;
async function pullCloudState() {
	if (syncing) return;
	syncing = true;
	try {
		const remote = await loadGymState();
		const local = useGymStore.getState();
		if (remote.profile?.onboarded) {
			useGymStore.setState({
				profile: remote.profile,
				xp: remote.xp,
				workouts: remote.workouts,
				session: remote.session ?? local.session
			});
			return;
		}
		if (local.profile.onboarded) {
			await saveGymSnapshot({ data: {
				profile: local.profile,
				xp: local.xp,
				session: local.session
			} });
			if (local.workouts.length) await replaceGymWorkouts({ data: local.workouts });
		}
	} finally {
		syncing = false;
	}
}
function scheduleCloudSave() {
	if (typeof window === "undefined") return;
	if (saveTimer) clearTimeout(saveTimer);
	saveTimer = setTimeout(() => {
		flushCloudSave();
	}, 450);
}
async function flushCloudSave() {
	const { profile, xp, session } = useGymStore.getState();
	if (!profile.onboarded) return;
	try {
		await saveGymSnapshot({ data: {
			profile,
			xp,
			session
		} });
	} catch {}
}
async function persistWorkout(workout) {
	try {
		await saveGymWorkout({ data: workout });
		await flushCloudSave();
	} catch {}
}
async function wipeCloud() {
	try {
		await clearGymCloud();
	} catch {}
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-elevated text-foreground border border-border hover:bg-card",
			ghost: "text-foreground hover:bg-elevated",
			outline: "border border-border bg-transparent hover:bg-elevated",
			destructive: "bg-destructive text-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11 rounded-md",
			pill: "h-9 rounded-full px-3 text-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		suppressHydrationWarning: true,
		className: cn("flex h-11 w-full rounded-md border border-input bg-elevated px-3 text-base text-foreground", "placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-150", "focus-visible:ring-2 focus-visible:ring-ring", "disabled:opacity-40", className)
	});
}
var CHEVRONS = {
	unranked: 0,
	iron: 1,
	bronze: 1,
	silver: 2,
	gold: 2,
	platinum: 3,
	diamond: 3,
	master: 4,
	grandmaster: 4
};
function RankEmblem({ rank, size = 88, className }) {
	const n = CHEVRONS[rank.id] ?? 1;
	const color = `var(--color-${rank.token})`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 80 80",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "40,6 70,22 70,50 40,74 10,50 10,22",
				fill: "none",
				stroke: color,
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "40,14 62,26 62,48 40,64 18,48 18,26",
				fill: "color-mix(in oklab, var(--color-elevated) 80%, transparent)",
				stroke: color,
				strokeWidth: "1.2",
				opacity: "0.9"
			}),
			Array.from({ length: n }).map((_, i) => {
				const y = 30 + i * 7;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: `28,${y + 6} 40,${y} 52,${y + 6}`,
					fill: "none",
					stroke: color,
					strokeWidth: "2.4",
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}, i);
			})
		]
	});
}
function RankChip({ rank, percentile, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", className),
		style: {
			color: `var(--color-${rank.token})`,
			borderColor: `color-mix(in oklab, var(--color-${rank.token}) 45%, transparent)`,
			background: `color-mix(in oklab, var(--color-${rank.token}) 12%, transparent)`
		},
		children: [rank.nameZh, percentile != null && rank.id !== "unranked" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular-nums text-muted-foreground",
			children: [
				"超過 ",
				Math.round(percentile),
				"%"
			]
		}) : null]
	});
}
function Onboarding() {
	const setProfile = useGymStore((s) => s.setProfile);
	const [name, setName] = (0, import_react.useState)("");
	const [sex, setSex] = (0, import_react.useState)("male");
	const [bw, setBw] = (0, import_react.useState)("70");
	function submit() {
		const bodyweight = Math.max(30, Math.min(250, Number(bw) || 70));
		setProfile({
			name: name.trim() || "鍛造者",
			sex,
			bodyweight,
			onboarded: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh w-full justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-md flex-col justify-center gap-8 px-6 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
						rank: RANKS[4],
						size: 96
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-sm tracking-widest text-muted-foreground",
						children: "IRON RANK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-5xl tracking-wide",
						children: "鐵階"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-sm text-muted-foreground",
						children: "每次訓練換經驗、升等級。動作有指導，重量有段位。"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-5",
				onSubmit: (e) => {
					e.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "稱呼"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "例如 浩然",
							autoComplete: "nickname"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "性別（影響段位標準）"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [["male", "男性"], ["female", "女性"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSex(id),
								className: cn("h-11 rounded-md border text-sm transition-colors duration-150", sex === id ? "border-accent bg-accent text-accent-foreground" : "border-border bg-elevated text-foreground"),
								children: label
							}, id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "體重（kg）"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: bw,
							onChange: (e) => setBw(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "mt-1 w-full",
						children: "開始鍛造"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-subtle",
						children: "段位按體重比例估算全球百分位。登入後資料會存到你嘅帳號。"
					})
				]
			})]
		})
	});
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var TABS = [
	{
		to: "/",
		label: "主頁",
		icon: House
	},
	{
		to: "/train",
		label: "訓練",
		icon: Dumbbell
	},
	{
		to: "/log",
		label: "紀錄",
		icon: ScrollText
	},
	{
		to: "/guide",
		label: "指導",
		icon: BookOpen
	},
	{
		to: "/rank",
		label: "段位",
		icon: Trophy
	}
];
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl tracking-widest text-muted-foreground",
			children: "IRON RANK"
		})
	});
}
function AppShell({ children }) {
	const { user, isPending } = useCurrentUserState();
	const onboarded = useGymStore((s) => s.profile.onboarded);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [ready, setReady] = (0, import_react.useState)(false);
	const isLogin = pathname === "/login";
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			await Promise.resolve(rehydrateGym());
			if (cancelled) return;
			if (user) try {
				await pullCloudState();
			} catch {}
			if (!cancelled) setReady(true);
		})();
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	if (isLogin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "phone-frame mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background",
		children
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (!onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-frame mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center",
				toastOptions: { style: {
					background: "var(--color-elevated)",
					border: "1px solid var(--color-border)",
					color: "var(--color-foreground)"
				} }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "main-with-tabbar min-w-0 flex-1 overflow-x-hidden",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "tabbar-safe fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t border-border bg-background/95",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: TABS.map((tab) => {
						const active = tab.to === "/" ? pathname === "/" : pathname === tab.to || pathname.startsWith(`${tab.to}/`);
						const Icon = tab.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: tab.to,
							preload: "intent",
							className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] leading-none", active ? "text-accent" : "text-subtle"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.2 : 1.8
							}), tab.label]
						}) }, tab.to);
					})
				})
			})
		]
	});
}
var styles_default = "/assets/styles-C1LH43EL.css";
var APP_NAME = "鐵階 IRON RANK";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0b0b0c"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "description",
				content: "遊戲化健身：升級、訓練紀錄、動作指導、段位排名。"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-Hant",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-GfxFRvtY.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./guide-DT3jCC0y.mjs");
var Route$7 = createFileRoute("/guide")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./log-CdhQ-aeA.mjs");
var Route$6 = createFileRoute("/log")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./login-CFnKMlSZ.mjs");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./profile-Cv0Eczc3.mjs");
var Route$4 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./rank-DComwn9L.mjs");
var Route$3 = createFileRoute("/rank")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./train-uC8gMNjD.mjs");
var Route$2 = createFileRoute("/train")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./guide._id-BwrfXaxd.mjs");
var Route$1 = createFileRoute("/guide/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var GuideRoute = Route$7.update({
	id: "/guide",
	path: "/guide",
	getParentRoute: () => Route$9
});
var LogRoute = Route$6.update({
	id: "/log",
	path: "/log",
	getParentRoute: () => Route$9
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$9
});
var ProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$9
});
var RankRoute = Route$3.update({
	id: "/rank",
	path: "/rank",
	getParentRoute: () => Route$9
});
var TrainRoute = Route$2.update({
	id: "/train",
	path: "/train",
	getParentRoute: () => Route$9
});
var GuideIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => GuideRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$9
});
var GuideRouteChildren = { GuideIdRoute };
var rootRouteChildren = {
	IndexRoute,
	GuideRoute: GuideRoute._addFileChildren(GuideRouteChildren),
	LogRoute,
	LoginRoute,
	ProfileRoute,
	RankRoute,
	TrainRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 3e4,
		defaultPendingMs: 80
	});
}
//#endregion
export { getExercise as A, workoutVolume as C, EXERCISES as D, titleForLevel as E, UNRANKED as M, cn as N, MUSCLE_LABELS as O, localISODate as P, trainedDays as S, progressFromXp as T, historyForExercise as _, RankEmblem as a, overallRank as b, useCurrentUserState as c, scheduleCloudSave as d, wipeCloud as f, computeStreak as g, completedSetCount as h, RankChip as i, RANKS as j, TEMPLATES as k, persistWorkout as l, bestSets as m, Route$1 as n, Input as o, useGymStore as p, UserButton as r, Button as s, router_exports as t, EQUIPMENT_LABELS as u, lastNDates as v, e1rm as w, rankExercise as x, loadKindHint as y };
