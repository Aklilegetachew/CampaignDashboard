import { Progress } from "@/components/ui/progress";

export function IndividualPerformance() {
  const referrals = 25;
  const revenue = 125000;
  const referralGoal = 50;
  const revenueGoal = 250000;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Referrals</span>
          <span className="text-sm font-medium">
            {referrals} / {referralGoal}
          </span>
        </div>
        <Progress value={(referrals / referralGoal) * 100} />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Revenue Contribution (ETB)
          </span>
          <span className="text-sm font-medium">
            {revenue.toLocaleString()} / {revenueGoal.toLocaleString()}
          </span>
        </div>
        <Progress value={(revenue / revenueGoal) * 100} />
      </div>
    </div>
  );
}
