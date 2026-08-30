import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as ArrowLeft } from "../_libs/lucide-react.mjs";
import { N as cn, T as progressFromXp, o as Input, p as useGymStore, r as UserButton, s as Button } from "./router-DHcSck8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Cv0Eczc3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileInner, {});
}
function ProfileInner() {
	const profile = useGymStore((s) => s.profile);
	const setProfile = useGymStore((s) => s.setProfile);
	const resetAll = useGymStore((s) => s.resetAll);
	const xp = useGymStore((s) => s.xp);
	const workouts = useGymStore((s) => s.workouts);
	const [name, setName] = (0, import_react.useState)(profile.name);
	const [bw, setBw] = (0, import_react.useState)(String(profile.bodyweight));
	const [sex, setSex] = (0, import_react.useState)(profile.sex);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const level = progressFromXp(xp).level;
	function save() {
		setProfile({
			name: name.trim() || profile.name,
			bodyweight: Math.max(30, Math.min(250, Number(bw) || profile.bodyweight)),
			sex
		});
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-5 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center gap-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "主頁"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-wide",
				children: "檔案"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"LV.",
					level,
					" · ",
					workouts.length,
					" 場訓練 · ",
					xp,
					" XP"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 min-w-0 overflow-x-auto rounded-xl border border-border bg-card px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs text-muted-foreground",
					children: "雲端帳號"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "稱呼"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "性別"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [["male", "男性"], ["female", "女性"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSex(id),
								className: cn("h-11 rounded-md border text-sm", sex === id ? "border-accent bg-accent text-accent-foreground" : "border-border bg-elevated"),
								children: label
							}, id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "體重 kg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: bw,
							onChange: (e) => setBw(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						children: saved ? "已儲存" : "儲存"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "關於段位"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "段位唔係即時線上榜，而係用你嘅估計 1RM 同體重比例，對照典型健身人口分布。白金大約係全球前 40%（Top 40%）。登入後訓練資料會存到雲端，換機都可以繼續。"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "destructive",
				className: "mt-8 w-full",
				onClick: () => {
					if (window.confirm("清除所有訓練同經驗？呢步還原唔到。")) resetAll();
				},
				children: "清除所有資料"
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
