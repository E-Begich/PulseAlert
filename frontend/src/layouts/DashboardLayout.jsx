import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavBar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-900 relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative flex flex-col md:ml-72 min-h-screen">
        <TopNavbar onMenuClick={toggleSidebar} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
