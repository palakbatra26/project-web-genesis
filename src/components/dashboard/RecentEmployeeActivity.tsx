
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type ActivityType = "joined" | "left" | "promoted" | "onLeave";

interface EmployeeActivity {
  id: number;
  name: string;
  avatarUrl: string;
  activityType: ActivityType;
  department: string;
  timestamp: string;
}

const activities: EmployeeActivity[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatarUrl: "",
    activityType: "joined",
    department: "Marketing",
    timestamp: "1h ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatarUrl: "",
    activityType: "promoted",
    department: "Development",
    timestamp: "3h ago",
  },
  {
    id: 3,
    name: "Aisha Patel",
    avatarUrl: "",
    activityType: "onLeave",
    department: "HR",
    timestamp: "6h ago",
  },
  {
    id: 4,
    name: "John Smith",
    avatarUrl: "",
    activityType: "left",
    department: "Finance",
    timestamp: "1d ago",
  }
];

const activityColors: Record<ActivityType, string> = {
  joined: "bg-green-100 text-green-800",
  left: "bg-red-100 text-red-800",
  promoted: "bg-blue-100 text-blue-800",
  onLeave: "bg-amber-100 text-amber-800",
};

const activityLabels: Record<ActivityType, string> = {
  joined: "Joined",
  left: "Left",
  promoted: "Promoted",
  onLeave: "On Leave",
};

const RecentEmployeeActivity = () => {
  return (
    <Card className="col-span-5">
      <CardHeader>
        <CardTitle>Recent Employee Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatarUrl} alt={activity.name} />
                <AvatarFallback>
                  {activity.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{activity.department}</span>
                  <span className="mx-2">•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              <Badge className={activityColors[activity.activityType]}>
                {activityLabels[activity.activityType]}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEmployeeActivity;
