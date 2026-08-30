import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-SNx8R0ev.mjs";
import { a as RankEmblem, c as useCurrentUserState, j as RANKS, o as Input, s as Button } from "./router-DHcSck8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CFnKMlSZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function submit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.split("@")[0]
				});
				if (err) throw new Error(err.message || "註冊失敗");
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (err) throw new Error(err.message || "登入失敗");
			}
			await authClient.getSession();
			window.location.assign("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "登入失敗，請再試");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col justify-center px-6 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankEmblem, {
						rank: RANKS[4],
						size: 72
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-sm tracking-widest text-muted-foreground",
						children: "IRON RANK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl tracking-wide",
						children: "鐵階"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xs text-sm text-muted-foreground",
						children: "用電郵登入，訓練紀錄同段位會跟住你，換機都唔會唔見。"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 flex flex-col gap-3",
				onSubmit: submit,
				children: [
					mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "稱呼"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoComplete: "nickname",
							placeholder: "例如 浩然"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "電郵"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							autoComplete: "email",
							inputMode: "email",
							placeholder: "you@email.com"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "密碼"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							required: true,
							minLength: 8,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							autoComplete: mode === "up" ? "new-password" : "current-password",
							placeholder: "至少 8 個字"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "mt-1 w-full",
						disabled: busy,
						children: busy ? "處理中…" : mode === "up" ? "建立帳號" : "電郵登入"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 text-sm text-muted-foreground",
						onClick: () => {
							setMode(mode === "up" ? "in" : "up");
							setError(null);
						},
						children: mode === "up" ? "已有帳號？改為登入" : "未有帳號？建立一個"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs tracking-widest text-subtle",
					children: "或用其他方式"
				}), GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					className: "w-full",
					onClick: () => void signIn(p.providerId, { callbackURL: "/" }),
					children: ["繼續用 ", p.label]
				}, p.providerId))]
			})
		]
	});
}
//#endregion
export { Login as component };
