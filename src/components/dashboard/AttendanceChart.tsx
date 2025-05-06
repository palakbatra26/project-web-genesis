
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, TooltipProps 
} from "recharts";

const data = [
  { day: "Mon", present: 95, absent: 5, late: 8 },
  { day: "Tue", present: 92, absent: 8, late: 10 },
  { day: "Wed", present: 96, absent: 4, late: 7 },
  { day: "Thu", present: 93, absent: 7, late: 9 },
  { day: "Fri", present: 90, absent: 10, late: 12 },
  { day: "Sat", present: 45, absent: 5, late: 3 },
  { day: "Sun", present: 20, absent: 2, late: 1 },
];

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium">{payload[0]?.payload.day}</p>
        <p className="text-sm text-primary-500">
          Present: {payload[0]?.value}%
        </p>
        <p className="text-sm text-destructive">
          Absent: {payload[1]?.value}%
        </p>
        <p className="text-sm text-amber-500">
          Late: {payload[2]?.value}%
        </p>
      </div>
    );
  }
  return null;
};

const AttendanceChart = () => {
  return (
    <Card className="col-span-7">
      <CardHeader>
        <CardTitle>Weekly Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="present" fill="#2563eb" stackId="a" />
            <Bar dataKey="absent" fill="#ef4444" stackId="a" />
            <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
