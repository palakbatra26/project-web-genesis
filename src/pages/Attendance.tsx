
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type AttendanceStatus = "present" | "absent" | "late" | "early" | "halfday";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
  workHours: number;
}

const statusColors: Record<AttendanceStatus, string> = {
  present: "bg-green-100 text-green-800 hover:bg-green-100/80",
  absent: "bg-red-100 text-red-800 hover:bg-red-100/80",
  late: "bg-amber-100 text-amber-800 hover:bg-amber-100/80",
  early: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
  halfday: "bg-purple-100 text-purple-800 hover:bg-purple-100/80",
};

const generateMockData = (): AttendanceRecord[] => {
  const employees = [
    { id: "EMP001", name: "John Smith" },
    { id: "EMP002", name: "Sarah Johnson" },
    { id: "EMP003", name: "Michael Chen" },
    { id: "EMP004", name: "Emma Thompson" },
    { id: "EMP005", name: "Robert Garcia" },
    { id: "EMP006", name: "Aisha Patel" },
  ];

  const today = new Date();
  const records: AttendanceRecord[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    employees.forEach((employee, idx) => {
      // Skip weekends for some employees to make data more realistic
      if ((date.getDay() === 0 || date.getDay() === 6) && idx % 2 === 0) {
        return;
      }

      // Generate random status
      const statuses: AttendanceStatus[] = ["present", "absent", "late", "early", "halfday"];
      const statusWeights = [0.7, 0.05, 0.1, 0.1, 0.05]; // More likely to be present
      
      let statusIndex = 0;
      const rnd = Math.random();
      let cumulativeWeight = 0;
      
      for (let i = 0; i < statuses.length; i++) {
        cumulativeWeight += statusWeights[i];
        if (rnd < cumulativeWeight) {
          statusIndex = i;
          break;
        }
      }
      
      const status = statuses[statusIndex];
      
      // Generate check-in and check-out times based on status
      let checkIn = "";
      let checkOut = "";
      let workHours = 0;
      
      switch (status) {
        case "present":
          checkIn = `09:${Math.floor(Math.random() * 15).toString().padStart(2, '0')}`;
          checkOut = `17:${Math.floor(Math.random() * 30 + 30).toString().padStart(2, '0')}`;
          workHours = 8 + (Math.random() * 0.5);
          break;
        case "absent":
          checkIn = "-";
          checkOut = "-";
          workHours = 0;
          break;
        case "late":
          checkIn = `10:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}`;
          checkOut = `17:${Math.floor(Math.random() * 30 + 30).toString().padStart(2, '0')}`;
          workHours = 7 + (Math.random() * 0.5);
          break;
        case "early":
          checkIn = `09:${Math.floor(Math.random() * 15).toString().padStart(2, '0')}`;
          checkOut = `16:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}`;
          workHours = 7 + (Math.random() * 0.5);
          break;
        case "halfday":
          checkIn = `09:${Math.floor(Math.random() * 15).toString().padStart(2, '0')}`;
          checkOut = `13:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}`;
          workHours = 4 + (Math.random() * 0.5);
          break;
      }
      
      records.push({
        id: `ATT-${date.getTime()}-${employee.id}`,
        employeeId: employee.id,
        employeeName: employee.name,
        date: new Date(date),
        checkIn,
        checkOut,
        status,
        workHours,
      });
    });
  }

  return records;
};

const attendanceRecords = generateMockData();

const attendanceStats = {
  present: attendanceRecords.filter(record => record.status === "present").length,
  absent: attendanceRecords.filter(record => record.status === "absent").length,
  late: attendanceRecords.filter(record => record.status === "late").length,
  early: attendanceRecords.filter(record => record.status === "early").length,
  halfday: attendanceRecords.filter(record => record.status === "halfday").length,
};

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesDate = date 
      ? record.date.toDateString() === date.toDateString()
      : true;
      
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesDate && matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track employee attendance records</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Present</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">{attendanceStats.present}</div>
              <p className="text-xs text-muted-foreground">Employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Absent</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">{attendanceStats.absent}</div>
              <p className="text-xs text-muted-foreground">Employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Late</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">{attendanceStats.late}</div>
              <p className="text-xs text-muted-foreground">Employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Early Departure</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">{attendanceStats.early}</div>
              <p className="text-xs text-muted-foreground">Employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Half Day</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">{attendanceStats.halfday}</div>
              <p className="text-xs text-muted-foreground">Employees</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="early">Early Departure</SelectItem>
              <SelectItem value="halfday">Half Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Work Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden sm:flex h-8 w-8">
                          <AvatarImage src="" alt={record.employeeName} />
                          <AvatarFallback>
                            {record.employeeName.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{record.employeeName}</p>
                          <p className="text-xs text-muted-foreground">{record.employeeId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{format(record.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>
                      {record.workHours > 0 ? `${record.workHours.toFixed(1)} hrs` : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[record.status]} variant="outline">
                        {record.status === "present" && "Present"}
                        {record.status === "absent" && "Absent"}
                        {record.status === "late" && "Late"}
                        {record.status === "early" && "Early Departure"}
                        {record.status === "halfday" && "Half Day"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No attendance records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Attendance;
