import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Progress', value: 2500000 },
  { name: 'Remaining', value: 1500000 },
]

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))']

export function RevenueProgress() {
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 text-center">
          <p className="text-sm font-medium">2,500,000 ETB / 4,000,000 ETB</p>
          <p className="text-xs text-muted-foreground">62.5% of goal reached</p>
        </div>
      </CardContent>
    </Card>
  )
}