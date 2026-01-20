import React, { useState } from "react";
import "../Dashboard Page/Dashboard.css";
import Sidebar from "../../molecules/SideBar/Sidebar";
import Topbar from "../../molecules/Topbar/Topbar";
import ReportsDashboard from "./ReportsDashboard";

const ReportsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main-wrapper">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="dashboard-main">
          <ReportsDashboard />
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

export default ReportsLayout;
