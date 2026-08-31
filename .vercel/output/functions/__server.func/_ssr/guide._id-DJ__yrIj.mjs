import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as ArrowLeft } from "../_libs/lucide-react.mjs";
import { A as getExercise, N as UNRANKED, O as MUSCLE_LABELS, a as RankEmblem, i as RankChip, m as bestSets, n as Route$1, p as useGymStore, s as Button, u as EQUIPMENT_LABELS, x as rankExercise, y as loadKindHint } from "./router-BFutvdcX.mjs";
import { t as ExerciseIcon } from "./exercise-icon-SylKqOIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide._id-DJ__yrIj.js
var import_jsx_runtime = require_jsx_runtime();
function GuideDetailPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideDetail, {});
}
function GuideDetail() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const exercise = getExercise(id);
	const profile = useGymStore((s) => s.profile);
	const workouts = useGymStore((s) => s.workouts);
	const startSession = useGymStore((s) => s.startSession);
	const session = useGymStore((s) => s.session);
	const addExercise = useGymStore((s) => s.addExercise);
	if (!exercise) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "搵唔到呢個動作。" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/guide",
			className: "mt-3 inline-block text-accent",
			children: "返回指導"
		})]
	});
	const best = bestSets(workouts)[exercise.id] ?? null;
	const ranked = rankExercise(exercise, best, profile);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-5 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/guide",
				className: "inline-flex h-11 items-center gap-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "指導"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseIcon, {
					id: exercise.id,
					size: 72
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-muted-foreground",
							children: exercise.nameEn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl tracking-wide",
							children: exercise.nameZh
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								MUSCLE_LABELS[exercise.muscle],
								" · ",
								EQUIPMENT_LABELS[exercise.equipment],
								" ·",
								" ",
								loadKindHint(exercise.loadKind)
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: exercise.summary
			}),
			ranked.rank.id !== UNRANKED.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
					rank: ranked.rank,
					size: 56
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankChip, {
					rank: ranked.rank,
					percentile: ranked.percentile
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"最佳 ",
						ranked.best?.weight,
						" kg × ",
						ranked.best?.reps,
						" · 估計 1RM ",
						ranked.best?.e1rm,
						" kg"
					]
				})] })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "設置",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "list-decimal space-y-2 pl-5 text-sm text-muted-foreground",
					children: exercise.setup.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "關鍵提示",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: exercise.cues.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-accent/30 bg-elevated px-3 py-1.5 text-sm text-accent",
						children: c
					}, c))
				})
			}),
			exercise.machineTip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "器械要點",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: exercise.machineTip
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "呼吸",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: exercise.breathing
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "常見錯誤",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: exercise.mistakes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m })]
					}, m))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6 w-full",
				size: "lg",
				onClick: () => {
					if (session) addExercise(exercise.id);
					else startSession(exercise.nameZh, [exercise.id]);
					navigate({ to: "/train" });
				},
				children: session ? "加入今場訓練" : "用呢個動作開場"
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-medium",
			children: title
		}), children]
	});
}
//#endregion
export { GuideDetailPage as component };
