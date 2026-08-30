import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = {
  date: string;
  weight: number;
  reps: number;
  e1rm: number;
  volume: number;
  label: string;
};

export function LiftChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={{
            background: "var(--color-elevated)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            color: "var(--color-foreground)",
          }}
        />
        <Line
          type="monotone"
          dataKey="e1rm"
          name="估計 1RM"
          stroke="var(--color-accent)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
