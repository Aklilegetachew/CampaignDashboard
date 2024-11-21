import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Day 1', revenue: 100000 },
  { name: 'Day 5', revenue: 500000 },
  { name: 'Day 10', revenue: 1200000 },
  { name: 'Day 15', revenue: 2500000 },
]

export function CumulativeRevenue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}