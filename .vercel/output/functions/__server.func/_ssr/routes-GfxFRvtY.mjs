import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Swords, f as Flame, o as Settings } from "../_libs/lucide-react.mjs";
import { E as titleForLevel, N as cn, P as localISODate, S as trainedDays, T as progressFromXp, a as RankEmblem, b as overallRank, g as computeStreak, p as useGymStore, s as Button, v as lastNDates } from "./router-DHcSck8z.mjs";
import { t as Progress } from "./progress-CxW4EnTo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-GfxFRvtY.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeInner, {});
}
function HomeInner() {
	const profile = useGymStore((s) => s.profile);
	const xp = useGymStore((s) => s.xp);
	const workouts = useGymStore((s) => s.workouts);
	const session = useGymStore((s) => s.session);
	const { level, into, need } = progressFromXp(xp);
	const overall = overallRank(workouts, profile);
	const streak = computeStreak(workouts);
	const today = localISODate();
	const trainedToday = workouts.some((w) => localISODate(new Date(w.finishedAt)) === today);
	const days = trainedDays(workouts);
	const grid = lastNDates(28);
	const recent = [...workouts].slice(-3).reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground",
				children: "IRON RANK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 max-w-[16rem] truncate text-2xl font-medium",
				children: profile.name
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/profile",
				className: "flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated",
				"aria-label": "設定",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-4xl tabular-nums leading-none tracking-wide",
							children: ["LV.", level]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: titleForLevel(level)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: streak
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "日連續" })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "經驗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									into,
									" / ",
									need,
									" XP"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: into / need * 100 })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/rank",
					className: "flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors duration-150 hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
						rank: overall.rank,
						size: 72
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tracking-wide",
								children: overall.rank.nameZh
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted-foreground",
								children: overall.rank.nameEn
							}),
							overall.counted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"估計超過全球 ",
									Math.round(overall.percentile),
									"%",
									overall.next ? ` · 距 ${overall.next.nameZh} ${Math.round((1 - overall.progress) * 100)}%` : ""
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "完成訓練即可解鎖段位"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "今日任務"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: trainedToday ? "已完成" : "未完成"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quest, {
								done: trainedToday,
								label: "完成一次訓練",
								hint: "+40 XP 首次獎勵"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quest, {
								done: workouts.some((w) => w.prs.length > 0 && localISODate(new Date(w.finishedAt)) === today),
								label: "刷新一項個人紀錄",
								hint: "+60 XP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quest, {
								done: streak >= 3,
								label: "連續訓練 3 日",
								hint: "連續獎勵疊加"
							})
						]
					})]
				}),
				session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/train",
						children: "繼續訓練"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/train",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }), "開始訓練"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-medium text-muted-foreground",
					children: "近 28 日"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1.5",
					children: grid.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						title: d,
						className: cn("aspect-square rounded-xs", days.has(d) ? "bg-accent" : "bg-elevated")
					}, d))
				})] }),
				recent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted-foreground",
							children: "最近訓練"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/log",
							className: "text-xs text-accent",
							children: "全部"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: recent.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-lg border border-border bg-card px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: w.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									new Date(w.finishedAt).toLocaleDateString("zh-HK", {
										month: "short",
										day: "numeric"
									}),
									" · ",
									w.exercises.length,
									" 個動作"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-lg tabular-nums",
									children: ["+", w.xpEarned]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-subtle",
									children: w.prs.length ? "新紀錄" : "XP"
								})]
							})]
						}, w.id))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-6 text-center text-sm text-muted-foreground",
					children: "尚未有紀錄。去指導頁睇動作，或者直接開一場推日。"
				})
			]
		})]
	});
}
function Quest({ done, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border", done ? "border-accent bg-accent" : "border-border"),
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-1.5 rounded-full bg-accent-foreground" }) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn(done && "text-muted-foreground line-through"),
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block text-xs text-subtle",
			children: hint
		})] })]
	});
}
//#endregion
export { Home as component };
