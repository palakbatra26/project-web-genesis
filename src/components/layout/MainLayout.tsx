
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className={cn(
          "flex-1 overflow-y-auto p-6",
          "transition-all duration-300 ease-in-out",
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
