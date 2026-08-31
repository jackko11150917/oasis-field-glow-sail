import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as EXERCISES, M as TIER_GROUPS, N as UNRANKED, O as MUSCLE_LABELS, P as cn, a as RankEmblem, b as overallRank, m as bestSets, p as useGymStore, x as rankExercise } from "./router-BFutvdcX.mjs";
import { t as ExerciseIcon } from "./exercise-icon-SylKqOIH.mjs";
import { t as Progress } from "./progress-B2TCjHUJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rank-Dz0aRrLd.js
var import_jsx_runtime = require_jsx_runtime();
function RankPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankInner, {});
}
function RankInner() {
	const profile = useGymStore((s) => s.profile);
	const workouts = useGymStore((s) => s.workouts);
	const overall = overallRank(workouts, profile);
	const best = bestSets(workouts);
	const rows = EXERCISES.map((ex) => rankExercise(ex, best[ex.id] ?? null, profile)).sort((a, b) => {
		if (!!a.best !== !!b.best) return a.best ? -1 : 1;
		return b.percentile - a.percentile;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground",
				children: "RANKED"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl tracking-wide",
				children: "段位"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl border border-border bg-card p-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
						rank: overall.rank,
						size: 120,
						className: "mx-auto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-4xl tracking-wide",
						children: overall.rank.nameZh
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted-foreground",
						children: overall.rank.nameEn
					}),
					overall.counted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-display text-2xl tabular-nums",
							children: [
								"超過 ",
								Math.round(overall.percentile),
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"估計全球百分位 · 以 ",
								overall.counted,
								" 項動作加權"
							]
						}),
						overall.next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["距 ", overall.next.nameZh] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [Math.round(overall.progress * 100), "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: overall.progress * 100 })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-accent",
							children: "已達最高段位"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "完成訓練並記錄重量後會定段。"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "段位一覽"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: "黑鐵至鑽石各分 3、2、1，1 為該階最高。大師同宗師無分段。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: TIER_GROUPS.map((g) => {
							const active = overall.rank.id !== UNRANKED.id && overall.rank.tier === g.tier;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: cn("flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5", active ? "border-accent/40" : "border-border"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
										rank: g.emblem,
										size: 48
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: g.nameZh
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs tracking-widest text-subtle",
											children: g.nameEn
										})]
									}),
									g.ranks.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1",
										children: g.ranks.map((r) => {
											const on = overall.rank.id === r.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("flex size-8 items-center justify-center rounded-md text-xs tabular-nums", on ? "bg-accent text-accent-foreground" : "bg-elevated text-muted-foreground"),
												title: r.nameZh,
												children: r.division
											}, r.id);
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-subtle",
										children: [
											"超過 ",
											g.min,
											"%"
										]
									})
								]
							}, g.tier);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "各動作段位"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: "以估計 1RM 對體重比例，對照休閒至進階訓練者分布。70kg 體重臥推約 60kg 會落喺白金附近。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/guide/$id",
							params: { id: row.exercise.id },
							className: "flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseIcon, {
									id: row.exercise.id,
									size: 40
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: row.exercise.nameZh
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [MUSCLE_LABELS[row.exercise.muscle], row.best ? ` · ${row.best.weight} kg × ${row.best.reps}` : " · 未有紀錄"]
										}),
										row.best && row.next && row.kgToNext != null && row.kgToNext > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-subtle",
											children: [
												"估計 1RM 再加 ",
												row.kgToNext,
												" kg 可挑戰 ",
												row.next.nameZh
											]
										}) : null
									]
								}),
								row.best ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex shrink-0 flex-col items-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
										rank: row.rank,
										size: 40
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium",
										style: { color: `var(--color-${row.rank.token})` },
										children: row.rank.nameZh
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle",
									children: "未定級"
								})
							]
						}) }, row.exercise.id))
					})
				]
			})
		]
	});
}
//#endregion
export { RankPage as component };
