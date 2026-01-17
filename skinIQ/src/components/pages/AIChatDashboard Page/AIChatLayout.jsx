import React, { useState } from "react";
import Sidebar from "../../molecules/SideBar/Sidebar";
import Topbar from "../../molecules/Topbar/Topbar";
import AIChatDashboard from "./AIChatDashboard";

const AIChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main-wrapper">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="dashboard-main">
          <AIChatDashboard />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AIChatLayout;
