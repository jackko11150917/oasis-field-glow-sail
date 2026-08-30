import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as getExercise, C as workoutVolume, D as EXERCISES, N as cn, O as MUSCLE_LABELS, _ as historyForExercise, p as useGymStore, s as Button, w as e1rm } from "./router-DHcSck8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-CdhQ-aeA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LiftChart = (0, import_react.lazy)(() => import("./lift-chart-CAMLdmQA.mjs").then((m) => ({ default: m.LiftChart })));
function LogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogInner, {});
}
function LogInner() {
	const workouts = useGymStore((s) => s.workouts);
	const [tab, setTab] = (0, import_react.useState)("sessions");
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [liftId, setLiftId] = (0, import_react.useState)(EXERCISES[0].id);
	const reversed = (0, import_react.useMemo)(() => [...workouts].reverse(), [workouts]);
	const history = (0, import_react.useMemo)(() => historyForExercise(workouts, liftId), [workouts, liftId]);
	const lift = getExercise(liftId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground",
				children: "LOG"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl tracking-wide",
				children: "訓練紀錄"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 rounded-lg bg-elevated p-1",
				children: [["sessions", "場次"], ["lifts", "動作進度"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-10 rounded-md text-sm transition-colors duration-150", tab === id ? "bg-card text-foreground" : "text-muted-foreground"),
					children: label
				}, id))
			}),
			tab === "sessions" ? reversed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyLog, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: reversed.map((w) => {
					const open = openId === w.id;
					const vol = workoutVolume(w.exercises);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between px-4 py-3 text-left",
							onClick: () => setOpenId(open ? null : w.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: w.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: new Date(w.finishedAt).toLocaleString("zh-HK", {
									month: "short",
									day: "numeric",
									weekday: "short",
									hour: "2-digit",
									minute: "2-digit"
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block font-display text-lg tabular-nums",
									children: ["+", w.xpEarned]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-subtle",
									children: [vol, " kg"]
								})]
							})]
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border px-4 py-3",
							children: [w.exercises.map((ex) => {
								const meta = getExercise(ex.exerciseId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 last:mb-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: meta?.nameZh ?? ex.exerciseId
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "mt-1 w-full text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "text-left text-xs text-subtle",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-1 font-medium",
													children: "組"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-1 font-medium",
													children: "重量"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-1 font-medium",
													children: "次數"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-1 font-medium",
													children: "估計 1RM"
												})
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ex.sets.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "tabular-nums text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-0.5",
													children: i + 1
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.weight }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.reps }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: e1rm(s.weight, s.reps) })
											]
										}, s.id)) })]
									})]
								}, ex.exerciseId);
							}), w.prs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-accent",
								children: ["新紀錄：", w.prs.map((id) => getExercise(id)?.nameZh ?? id).join("、")]
							}) : null]
						}) : null]
					}, w.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-muted-foreground",
						children: "選擇動作"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-1 h-11 w-full rounded-md border border-input bg-elevated px-3 text-base",
						value: liftId,
						onChange: (e) => setLiftId(e.target.value),
						children: EXERCISES.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: e.id,
							children: [
								e.nameZh,
								" · ",
								MUSCLE_LABELS[e.muscle]
							]
						}, e.id))
					}),
					history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-center text-sm text-muted-foreground",
						children: "呢個動作未有紀錄。去訓練頁加一組先。"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-44 min-w-0 rounded-xl border border-border bg-card p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-md bg-elevated" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiftChart, { data: history.map((h) => ({
									...h,
									label: shortDate(h.date)
								})) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 overflow-x-auto rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "table-min w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-elevated text-left text-xs text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "日期"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "重量"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "次數"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "1RM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "容量"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...history].reverse().map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border tabular-nums",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: shortDate(row.date)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.weight
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.reps
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.e1rm
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2",
											children: row.volume
										})
									]
								}, row.date + row.weight + row.reps)) })]
							})
						}),
						lift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-subtle",
							children: [
								lift.loadKind === "dumbbell" ? "重量為單手。" : null,
								lift.loadKind === "bodyweight" ? "重量為額外負重。" : null,
								"估計 1RM 用 Epley 公式。"
							]
						}) : null
					] })
				]
			})
		]
	});
}
function EmptyLog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "未有訓練紀錄。"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/train",
				children: "開始第一場"
			})
		})]
	});
}
function shortDate(iso) {
	const d = new Date(iso);
	return `${d.getMonth() + 1}/${d.getDate()}`;
}
//#endregion
export { LogPage as component };
