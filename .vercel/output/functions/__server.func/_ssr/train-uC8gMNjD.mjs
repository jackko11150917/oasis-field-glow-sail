import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, l as Plus, m as Check, s as Search, t as X, u as Minus } from "../_libs/lucide-react.mjs";
import { A as getExercise, C as workoutVolume, D as EXERCISES, N as cn, O as MUSCLE_LABELS, a as RankEmblem, h as completedSetCount, j as RANKS, k as TEMPLATES, o as Input, p as useGymStore, s as Button, u as EQUIPMENT_LABELS, y as loadKindHint } from "./router-DHcSck8z.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/train-uC8gMNjD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Drawer$1({ open, onOpenChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: false,
		children
	});
}
function DrawerContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-background/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-xl border border-border bg-card outline-none", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-border" }),
			title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
				className: "px-5 pt-4 font-display text-xl tracking-wide text-foreground",
				children: title
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
				className: "sr-only",
				children: "選單"
			}),
			children
		]
	})] });
}
function TrainPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainInner, {});
}
function TrainInner() {
	const session = useGymStore((s) => s.session);
	const lastSummary = useGymStore((s) => s.lastSummary);
	const clearSummary = useGymStore((s) => s.clearSummary);
	const navigate = useNavigate();
	if (lastSummary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryView, {
		summary: lastSummary,
		onDone: () => {
			clearSummary();
			navigate({ to: "/" });
		}
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatePicker, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logger, {});
}
function TemplatePicker() {
	const startTemplate = useGymStore((s) => s.startTemplate);
	const startSession = useGymStore((s) => s.startSession);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground",
				children: "SESSION"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl tracking-wide",
				children: "開場訓練"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "揀課表，或者由空白開始加動作。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-2",
				children: [TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => startTemplate(t.id),
					className: "flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 text-left transition-colors duration-150 hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t.subtitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs tabular-nums text-subtle",
						children: [t.exerciseIds.length, " 項"]
					})]
				}, t.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "mt-2 w-full",
					onClick: () => startSession("自訂訓練"),
					children: "空白訓練"
				})]
			})
		]
	});
}
function Logger() {
	const session = useGymStore((s) => s.session);
	const addExercise = useGymStore((s) => s.addExercise);
	const removeExercise = useGymStore((s) => s.removeExercise);
	const addSet = useGymStore((s) => s.addSet);
	const removeSet = useGymStore((s) => s.removeSet);
	const updateSet = useGymStore((s) => s.updateSet);
	const finishSession = useGymStore((s) => s.finishSession);
	const discardSession = useGymStore((s) => s.discardSession);
	const [picker, setPicker] = (0, import_react.useState)(false);
	const [confirmDiscard, setConfirmDiscard] = (0, import_react.useState)(false);
	const sets = completedSetCount(session.exercises);
	const volume = workoutVolume(session.exercises.map((e) => ({
		...e,
		sets: e.sets.map((s) => ({
			...s,
			done: true
		}))
	})));
	const doneVolume = workoutVolume(session.exercises);
	const canFinish = sets > 0;
	const elapsed = (0, import_react.useMemo)(() => {
		const ms = Date.now() - new Date(session.startedAt).getTime();
		return Math.max(0, Math.floor(ms / 6e4));
	}, [session.startedAt]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tabular-nums text-muted-foreground",
					children: [elapsed, " 分鐘"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-[14rem] truncate font-display text-3xl tracking-wide",
					children: session.name
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setConfirmDiscard(true),
					className: "flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated",
					"aria-label": "放棄",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"已完成 ",
					sets,
					" 組 · ",
					doneVolume,
					" kg"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: session.exercises.map((block) => {
					const ex = getExercise(block.exerciseId);
					if (!ex) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "min-w-0 rounded-xl border border-border bg-card p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: ex.nameZh
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										loadKindHint(ex.loadKind),
										" · ",
										MUSCLE_LABELS[ex.muscle]
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/guide/$id",
										params: { id: ex.id },
										className: "px-2 py-1 text-xs text-accent",
										children: "指導"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "flex size-9 items-center justify-center rounded-sm text-subtle hover:text-destructive",
										onClick: () => removeExercise(ex.id),
										"aria-label": "移除動作",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "set-grid px-1 pb-1 text-xs text-subtle",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "組" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "重量" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "次數" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-center",
										children: "完成"
									})
								]
							}),
							block.sets.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("mb-1 set-grid items-center rounded-md px-1 py-0.5", s.done && "bg-elevated"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-center text-xs tabular-nums text-muted-foreground",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
										value: s.weight,
										step: ex.loadKind === "dumbbell" || ex.loadKind === "bodyweight" ? 1 : 2.5,
										min: 0,
										onChange: (weight) => updateSet(ex.id, s.id, { weight })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
										value: s.reps,
										step: 1,
										min: 0,
										onChange: (reps) => updateSet(ex.id, s.id, { reps })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => updateSet(ex.id, s.id, { done: !s.done }),
										className: cn("mx-auto flex size-9 items-center justify-center rounded-sm border transition-colors duration-150", s.done ? "border-accent bg-accent text-accent-foreground" : "border-border text-subtle"),
										"aria-label": s.done ? "取消完成" : "標記完成",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
									})
								]
							}, s.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => addSet(ex.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "加一組"]
								}), block.sets.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => removeSet(ex.id, block.sets[block.sets.length - 1].id),
									children: "刪末組"
								}) : null]
							})
						]
					}, block.exerciseId);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: () => setPicker(true),
						children: "新增動作"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						size: "lg",
						disabled: !canFinish,
						onClick: () => finishSession(),
						children: "完成訓練"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-subtle",
						children: [
							"預計訓練量 ",
							volume,
							" kg（以已填重量計）"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExercisePicker, {
				open: picker,
				onOpenChange: setPicker,
				exclude: session.exercises.map((e) => e.exerciseId),
				onPick: (id) => {
					addExercise(id);
					setPicker(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
				open: confirmDiscard,
				onOpenChange: setConfirmDiscard,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
					title: "放棄呢場？",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 pt-2 text-sm text-muted-foreground",
						children: "未完成嘅組數唔會存檔。"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 p-5 pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: () => {
								discardSession();
								setConfirmDiscard(false);
							},
							children: "放棄"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setConfirmDiscard(false),
							children: "繼續練"
						})]
					})]
				})
			})
		]
	});
}
function Stepper({ value, onChange, step, min }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-10 min-w-0 items-center rounded-sm border border-border bg-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-8 shrink-0 items-center justify-center text-muted-foreground",
				onClick: () => onChange(Math.max(min, roundStep(value - step, step))),
				"aria-label": "減少",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "h-full min-w-0 flex-1 bg-transparent text-center text-sm tabular-nums outline-none",
				inputMode: "decimal",
				value: String(value),
				onChange: (e) => {
					const n = Number(e.target.value);
					if (Number.isFinite(n)) onChange(Math.max(min, n));
					if (e.target.value === "") onChange(min);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-8 shrink-0 items-center justify-center text-muted-foreground",
				onClick: () => onChange(roundStep(value + step, step)),
				"aria-label": "增加",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
			})
		]
	});
}
function roundStep(n, step) {
	const r = Math.round(n / step) * step;
	return Math.round(r * 10) / 10;
}
function ExercisePicker({ open, onOpenChange, onPick, exclude }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [muscle, setMuscle] = (0, import_react.useState)("all");
	const list = EXERCISES.filter((e) => {
		if (exclude.includes(e.id)) return false;
		if (muscle !== "all" && e.muscle !== muscle) return false;
		if (!q.trim()) return true;
		const s = q.trim().toLowerCase();
		return e.nameZh.includes(q.trim()) || e.nameEn.toLowerCase().includes(s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			title: "加入動作",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-3 left-3 size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						placeholder: "搜尋動作或英文名",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-1.5 overflow-x-auto pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: muscle === "all",
						onClick: () => setMuscle("all"),
						children: "全部"
					}), Object.keys(MUSCLE_LABELS).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: muscle === m,
						onClick: () => setMuscle(m),
						children: MUSCLE_LABELS[m]
					}, m))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 overflow-y-auto px-5 pb-8",
				children: [list.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(e.id),
					className: "flex w-full items-center justify-between border-b border-border py-3 text-left last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: e.nameZh
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: [
							MUSCLE_LABELS[e.muscle],
							" · ",
							EQUIPMENT_LABELS[e.equipment]
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-subtle" })]
				}, e.id)), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "冇搵到動作"
				}) : null]
			})]
		})
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 shrink-0 rounded-full px-3 text-xs", active ? "bg-accent text-accent-foreground" : "bg-elevated text-muted-foreground"),
		children
	});
}
function SummaryView({ summary, onDone }) {
	const rank = summary.leveledUpTo ? RANKS[Math.min(RANKS.length - 1, Math.max(0, Math.floor(summary.leveledUpTo / 5)))] : RANKS[4];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "summary-screen flex flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
				rank,
				size: 108
			}),
			summary.leveledUpTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 font-display text-4xl tracking-wide",
				children: ["升級 LV.", summary.leveledUpTo]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-4xl tracking-wide",
				children: "訓練完成"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-display text-3xl tabular-nums text-accent",
				children: [
					"+",
					summary.xp,
					" XP"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"連續 ",
					summary.streak,
					" 日"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 w-full max-w-xs space-y-1.5 text-sm",
				children: summary.breakdown.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-foreground",
						children: ["+", b.amount]
					})]
				}, b.label))
			}),
			summary.prs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-accent",
				children: ["新紀錄 ", summary.prs.map((id) => getExercise(id)?.nameZh ?? id).join("、")]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8 w-full max-w-xs",
				size: "lg",
				onClick: onDone,
				children: "回到主頁"
			})
		]
	});
}
//#endregion
export { TrainPage as component };
