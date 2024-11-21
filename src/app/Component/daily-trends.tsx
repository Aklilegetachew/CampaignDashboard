import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Day 1", referrals: 10, revenue: 50000 },
  { name: "Day 2", referrals: 15, revenue: 75000 },
  { name: "Day 3", referrals: 20, revenue: 100000 },
  { name: "Day 4", referrals: 25, revenue: 125000 },
  { name: "Day 5", referrals: 30, revenue: 150000 },
];

export function DailyTrends() {
  return (
    <ChartContainer
      config={{
        referrals: {
          label: "Referrals",
          color: "hsl(var(--primary))",
        },
        revenue: {
          label: "Revenue (ETB)",
          color: "hsl(var(--secondary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="referrals"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary))"
            fillOpacity={0.3}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
