
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, CalendarCheck, FileText, 
  BarChart3, Settings, LogOut, 
  Menu, Home
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Employees", icon: Users, href: "/employees" },
  { name: "Attendance", icon: CalendarCheck, href: "/attendance" },
  { name: "Payroll", icon: FileText, href: "/payroll" },
  { name: "Reports", icon: BarChart3, href: "/reports" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-sidebar h-screen fixed md:relative z-30 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
      )}
    >
      <div className="h-full flex flex-col">
        <div className={cn(
          "flex items-center justify-center h-16 border-b border-sidebar-border",
          isOpen ? "px-4" : "px-2"
        )}>
          {isOpen ? (
            <h1 className="text-xl font-bold text-white">HR System</h1>
          ) : (
            <div className="w-10 h-10 rounded-full bg-hr-primary flex items-center justify-center">
              <span className="text-white font-bold">HR</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 pt-5 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent group transition-colors",
                    !isOpen && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isOpen && "mr-2")} />
                  {isOpen && <span>{item.name}</span>}
                  {!isOpen && (
                    <span className="fixed left-20 scale-0 rounded bg-sidebar-accent px-2 py-1 text-xs text-sidebar-foreground group-hover:scale-100">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-3 border-t border-sidebar-border mt-auto">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full text-sidebar-foreground hover:bg-sidebar-accent flex items-center",
              !isOpen && "justify-center"
            )}
          >
            <LogOut className={cn("h-5 w-5", isOpen && "mr-2")} />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
