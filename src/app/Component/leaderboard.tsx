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

const data = [
  { name: "John Doe", referrals: 50, revenue: 250000 },
  { name: "Jane Smith", referrals: 45, revenue: 225000 },
  { name: "Bob Johnson", referrals: 40, revenue: 200000 },
  { name: "Alice Brown", referrals: 35, revenue: 175000 },
  { name: "Charlie Davis", referrals: 30, revenue: 150000 },
];

export function Leaderboard() {
  return (
    <div className="space-y-8">
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
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Bar dataKey="referrals" fill="hsl(var(--primary))" />
            <Bar dataKey="revenue" fill="hsl(var(--secondary))" />
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
    </div>
  );
}
