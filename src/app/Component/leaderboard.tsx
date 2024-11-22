import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "@/axios/axiosInstance";

export function Leaderboard() {
  const [data, setData] = useState<
    { name: string; referrals: number; revenue: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axiosInstance.get("/Employee/employee-data");
        const sortedData = response.data.sort((a: any, b: any) => b.revenue - a.revenue);
        setData(sortedData); // Assuming the API returns data in the required format
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="space-y-8">
      {isLoading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <>
          <ChartContainer
            config={{
              referrals: {
                label: "Referrals",
                color: "hsl(#4CAF50)",
              },
              revenue: {
                label: "Revenue (ETB)",
                color: "hsl(var(--secondary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                {/* Updated bar colors */}
                <Bar
                  dataKey="referrals"
                  fill={hoveredBar === "revenue" ? "#FF8A65" : "#FF5722"}
                  style={{ cursor: "pointer" }}
                />{" "}
                {/* Green */}
                <Bar
                  dataKey="revenue"
                  fill={hoveredBar === "referrals" ? "#81C784" : "#4CAF50"}
                  style={{ cursor: "pointer" }}
                />{" "}
                {/* Orange */}
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Referrals</TableHead>
                <TableHead>Revenue (ETB)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.referrals}</TableCell>
                  <TableCell>{employee.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
