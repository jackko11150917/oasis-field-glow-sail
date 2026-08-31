import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
import { D as EXERCISES, O as MUSCLE_LABELS, P as cn, o as Input, u as EQUIPMENT_LABELS } from "./router-BFutvdcX.mjs";
import { t as ExerciseIcon } from "./exercise-icon-SylKqOIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-8m8H9255.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideInner, {});
}
function GuideInner() {
	const [q, setQ] = (0, import_react.useState)("");
	const [muscle, setMuscle] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => {
		return EXERCISES.filter((e) => {
			if (muscle !== "all" && e.muscle !== muscle) return false;
			if (!q.trim()) return true;
			const s = q.trim().toLowerCase();
			return e.nameZh.includes(q.trim()) || e.nameEn.toLowerCase().includes(s) || e.cues.some((c) => c.includes(q.trim()));
		});
	}, [q, muscle]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground",
				children: "COACHING"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl tracking-wide",
				children: "動作指導"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "沉肩、挺胸、夾背——每部機、每個動作嘅關鍵提示。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-3 left-3 size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "pl-9",
					placeholder: "搜尋動作、器械或提示",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-1.5 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: muscle === "all",
					onClick: () => setMuscle("all"),
					children: "全部"
				}), Object.keys(MUSCLE_LABELS).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: muscle === m,
					onClick: () => setMuscle(m),
					children: MUSCLE_LABELS[m]
				}, m))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-subtle",
				children: [list.length, " 個動作"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: list.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/guide/$id",
					params: { id: e.id },
					className: "flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-colors duration-150 hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseIcon, {
						id: e.id,
						size: 48,
						className: "mt-0.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "min-w-0 truncate font-medium",
									children: e.nameZh
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "shrink-0 text-xs text-subtle",
									children: [
										MUSCLE_LABELS[e.muscle],
										" · ",
										EQUIPMENT_LABELS[e.equipment]
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: e.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: e.cues.slice(0, 4).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-border px-2 py-0.5 text-xs text-accent",
									children: c
								}, c))
							})
						]
					})]
				}) }, e.id))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-center text-sm text-muted-foreground",
				children: "冇搵到相關動作"
			}) : null
		]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 shrink-0 rounded-full px-3 text-xs", active ? "bg-accent text-accent-foreground" : "bg-elevated text-muted-foreground"),
		children
	});
}
//#endregion
export { GuidePage as component };
