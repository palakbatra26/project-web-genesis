
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface TopPerformer {
  id: number;
  name: string;
  avatarUrl: string;
  department: string;
  score: number;
}

const topPerformers: TopPerformer[] = [
  {
    id: 1,
    name: "David Williams",
    avatarUrl: "",
    department: "Sales",
    score: 95,
  },
  {
    id: 2,
    name: "Emma Thompson",
    avatarUrl: "",
    department: "Marketing",
    score: 92,
  },
  {
    id: 3,
    name: "Robert Chen",
    avatarUrl: "",
    department: "Development",
    score: 89,
  },
];

const PerformanceSection = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {topPerformers.map((performer) => (
          <div key={performer.id} className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={performer.avatarUrl} alt={performer.name} />
                <AvatarFallback>
                  {performer.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{performer.name}</p>
                <p className="text-xs text-muted-foreground">{performer.department}</p>
              </div>
              <div className="text-sm font-medium">{performer.score}%</div>
            </div>
            <Progress value={performer.score} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PerformanceSection;
