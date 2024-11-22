import React, { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyIcon as CurrencyEtb, Users, Calendar } from "lucide-react";

export function CampaignOverview() {
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState<number | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(15);

  const goalDate = new Date("2024-12-29");

  const calculateRemainingDays = () => {
    const currentDate = new Date();
    const timeDiff = goalDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return remainingDays > 0 ? remainingDays : 0;
  };

  useEffect(() => {
    setDaysRemaining(calculateRemainingDays());
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/Employee/total-revenue-and-subscribers"
        );
        setTotalRevenue(response.data.totalRevenue);
        setTotalSubscribers(response.data.totalSubscribers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
            <p className="text-2xl font-bold">
              {totalRevenue !== null
                ? `${totalRevenue.toLocaleString()} ETB`
                : "Loading..."}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Users className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">New Subscribers</p>
            <p className="text-2xl font-bold">
              {totalSubscribers !== null
                ? totalSubscribers.toLocaleString()
                : "Loading..."}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium leading-none">Days Remaining</p>
            <p className="text-2xl font-bold">{daysRemaining}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
