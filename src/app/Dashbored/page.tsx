"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CampaignOverview } from "../Component/campaign-overview";
import { RevenueProgress } from "../Component/revenue-progress";
import { CumulativeRevenue } from "../Component/cumulative-revenue";
import { Leaderboard } from "../Component/leaderboard";
import { DailyTrends } from "../Component/daily-trends";
import { IndividualPerformance } from "../Component/individual-performance";
import DashboardLayout from "../Component/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold">Campaign Dashboard</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <CampaignOverview />
          <RevenueProgress />
          <CumulativeRevenue />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              Top performers and full employee rankings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          {/* <Card>
            <CardHeader>
              <CardTitle>Daily Trends</CardTitle>
              <CardDescription>
                Referrals and revenue growth over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DailyTrends />
            </CardContent>
          </Card> */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Referal Performance</CardTitle>
              <CardDescription>
                Track individual referral performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IndividualPerformance />
            </CardContent>
          </Card> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
