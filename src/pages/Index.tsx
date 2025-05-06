
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import RecentEmployeeActivity from "@/components/dashboard/RecentEmployeeActivity";
import UpcomingPayroll from "@/components/dashboard/UpcomingPayroll";
import PerformanceSection from "@/components/dashboard/PerformanceSection";
import { Users, CalendarCheck, FileText, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your centralized employee management system</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Employees" 
            value={127} 
            icon={<Users size={18} />} 
            trend={{ value: 4.3, isPositive: true }}
          />
          <StatCard 
            title="Today's Attendance" 
            value="94%" 
            icon={<CalendarCheck size={18} />} 
            trend={{ value: 1.2, isPositive: true }}
          />
          <StatCard 
            title="Payroll Processing" 
            value="$156,230" 
            icon={<FileText size={18} />} 
          />
          <StatCard 
            title="Performance Score" 
            value="86%" 
            icon={<TrendingUp size={18} />} 
            trend={{ value: 2.1, isPositive: false }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <AttendanceChart />
          <RecentEmployeeActivity />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <UpcomingPayroll />
          <PerformanceSection />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
