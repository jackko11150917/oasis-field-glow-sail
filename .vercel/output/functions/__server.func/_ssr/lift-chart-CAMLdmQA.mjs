import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lift-chart-CAMLdmQA.js
var import_jsx_runtime = require_jsx_runtime();
function LiftChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--color-border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tick: {
						fill: "var(--color-muted-foreground)",
						fontSize: 11
					},
					axisLine: false,
					tickLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tick: {
						fill: "var(--color-muted-foreground)",
						fontSize: 11
					},
					axisLine: false,
					tickLine: false,
					width: 36
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
					background: "var(--color-elevated)",
					border: "1px solid var(--color-border)",
					borderRadius: 8,
					color: "var(--color-foreground)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					type: "monotone",
					dataKey: "e1rm",
					name: "估計 1RM",
					stroke: "var(--color-accent)",
					strokeWidth: 2,
					dot: false
				})
			]
		})
	});
}
//#endregion
export { LiftChart };
