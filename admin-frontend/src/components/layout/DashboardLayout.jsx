import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="content">
        <Topbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
