import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axiosInstance from "@/axios/axiosInstance";
import { useEffect, useState } from "react";

const data = [
  { name: "Progress", value: 2500000 },
  { name: "Remaining", value: 1500000 },
];
const goal = 4000000; // 4 million ETB goal

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

export function RevenueProgress() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [remainingRevenue, setRemainingRevenue] = useState<number>(goal);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axiosInstance.get("/Employee/total-revenue");
        const revenue = parseFloat(response.data);
        setTotalRevenue(revenue);
        const remaining = goal - revenue;
        setRemainingRevenue(remaining);
        setPercentage(parseFloat(((revenue / goal) * 100).toFixed(2)));
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    fetchTotalRevenue();
  }, []);

  const data = [
    { name: "Progress", value: totalRevenue },
    { name: "Remaining", value: remainingRevenue },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            progress: {
              label: "Progress",
              color: "hsl(var(--primary))",
            },
            remaining: {
              label: "Remaining",
              color: "hsl(var(--secondary))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 text-center">
          <p className="text-sm font-medium">
            {totalRevenue.toLocaleString()} ETB / {goal.toLocaleString()} ETB
          </p>
          <p className="text-xs text-muted-foreground">
            {percentage}% of goal reached
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
