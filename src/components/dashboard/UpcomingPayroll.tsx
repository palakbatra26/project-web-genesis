
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const UpcomingPayroll = () => {
  const today = new Date();
  const payrollDate = new Date(today.getFullYear(), today.getMonth(), 25);
  
  if (today.getDate() > 25) {
    payrollDate.setMonth(payrollDate.getMonth() + 1);
  }
  
  const daysLeft = Math.ceil((payrollDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = 30;
  const progress = Math.min(100, Math.round(((totalDays - daysLeft) / totalDays) * 100));
  
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const payrollDateFormatted = formatter.format(payrollDate);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Upcoming Payroll</CardTitle>
        <CardDescription>Next scheduled payroll processing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Processing date</span>
            <span className="font-medium">{payrollDateFormatted}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Days remaining</span>
            <span className="font-medium">{daysLeft} days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Employees</span>
            <span className="font-medium">127 employees</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated amount</span>
            <span className="font-medium">$156,230.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPayroll;
