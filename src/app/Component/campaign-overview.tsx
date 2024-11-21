import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrencyIcon as CurrencyEtb, Users, Calendar } from 'lucide-react'

export function CampaignOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <CurrencyEtb className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Total Revenue</p>
            <p className="text-2xl font-bold">2,500,000 ETB</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Users className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">New Subscribers</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Days Remaining</p>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}