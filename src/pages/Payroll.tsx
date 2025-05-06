
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, MoreVertical, FileText } from "lucide-react";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  baseSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: "pending" | "processed" | "failed";
}

const statusColors = {
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-100/80",
  processed: "bg-green-100 text-green-800 hover:bg-green-100/80",
  failed: "bg-red-100 text-red-800 hover:bg-red-100/80",
};

const payrollRecords: PayrollRecord[] = [
  {
    id: "PAY-001-2023",
    employeeId: "EMP001",
    employeeName: "John Smith",
    payPeriod: "April 2023",
    baseSalary: 5000,
    overtime: 350,
    bonus: 500,
    deductions: 1200,
    netPay: 4650,
    status: "processed",
  },
  {
    id: "PAY-002-2023",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    payPeriod: "April 2023",
    baseSalary: 5500,
    overtime: 0,
    bonus: 800,
    deductions: 1350,
    netPay: 4950,
    status: "processed",
  },
  {
    id: "PAY-003-2023",
    employeeId: "EMP003",
    employeeName: "Michael Chen",
    payPeriod: "April 2023",
    baseSalary: 4800,
    overtime: 200,
    bonus: 300,
    deductions: 1050,
    netPay: 4250,
    status: "processed",
  },
  {
    id: "PAY-004-2023",
    employeeId: "EMP004",
    employeeName: "Emma Thompson",
    payPeriod: "April 2023",
    baseSalary: 4600,
    overtime: 180,
    bonus: 0,
    deductions: 950,
    netPay: 3830,
    status: "processed",
  },
  {
    id: "PAY-005-2023",
    employeeId: "EMP001",
    employeeName: "John Smith",
    payPeriod: "May 2023",
    baseSalary: 5000,
    overtime: 280,
    bonus: 0,
    deductions: 1200,
    netPay: 4080,
    status: "pending",
  },
  {
    id: "PAY-006-2023",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    payPeriod: "May 2023",
    baseSalary: 5500,
    overtime: 150,
    bonus: 0,
    deductions: 1350,
    netPay: 4300,
    status: "failed",
  },
];

// Calculate summary statistics
const totalPayroll = payrollRecords.reduce((acc, record) => acc + record.netPay, 0);
const avgSalary = Math.round(payrollRecords.reduce((acc, record) => acc + record.baseSalary, 0) / payrollRecords.length);
const totalDeductions = payrollRecords.reduce((acc, record) => acc + record.deductions, 0);
const totalBonusOvertime = payrollRecords.reduce((acc, record) => acc + record.bonus + record.overtime, 0);

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRecords = payrollRecords.filter((record) => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.id.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesPeriod = periodFilter === "all" || record.payPeriod === periodFilter;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesPeriod && matchesStatus;
  });
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payroll</h1>
            <p className="text-muted-foreground">Process and manage employee payroll</p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Run Payroll
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Total Payroll</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Avg. Base Salary</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">${avgSalary.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per employee</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Total Deductions</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">${totalDeductions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tax, benefits, etc.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Bonuses & Overtime</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 pt-0">
              <div className="text-2xl font-bold">${totalBonusOvertime.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Additional pay</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search payroll records..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Pay Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Periods</SelectItem>
              <SelectItem value="April 2023">April 2023</SelectItem>
              <SelectItem value="May 2023">May 2023</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payroll ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden md:table-cell">Pay Period</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{record.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{record.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{record.payPeriod}</TableCell>
                    <TableCell>${record.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[record.status]} variant="outline">
                        {record.status === "pending" && "Pending"}
                        {record.status === "processed" && "Processed"}
                        {record.status === "failed" && "Failed"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Send via Email</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No payroll records found
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

export default Payroll;
