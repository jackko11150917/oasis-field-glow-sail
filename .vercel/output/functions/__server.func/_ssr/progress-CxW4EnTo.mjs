import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { N as cn } from "./router-DHcSck8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CxW4EnTo.js
var import_jsx_runtime = require_jsx_runtime();
function Progress({ value, className, barClassName }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-2 w-full overflow-hidden rounded-full bg-elevated", className),
		role: "progressbar",
		"aria-valuenow": Math.round(pct),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full bg-accent xp-fill", barClassName),
			style: { width: `${pct}%` }
		})
	});
}
//#endregion
export { Progress as t };
