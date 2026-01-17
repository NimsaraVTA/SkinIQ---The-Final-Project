import React, { useState, useEffect } from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import { Bell } from "lucide-react";
import NotificationDrawer from "./NotificationDrawer";
import LiveClock from "../../molecules/Liveclock/LiveClock";

const Dashboard = () => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <>
      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Personal Skin Health Dashboard</h2>

          <div className="d-flex align-items-center gap-3 position-relative">
            <button
              className="notification-btn"
              onClick={() => setOpenNotifications(true)}
            >
              <span className="notification-dot"></span>
            </button>
            <Bell size={22} className="notification-icon"/>
            <Button variant="primary">New Skin Scan</Button>
          </div>
        </div>

        <div className="row g-4">
        <div className="col-md-4">
        <Card className="dashboard-card">
            <h5 className="card-title-bordered">Session Time</h5>
            <div className="card-scroll-content">
            <LiveClock />
            <p className="text-muted">{formatTime(sessionTime)}</p>
            </div>
        </Card>
        </div>

          <div className="col-md-4">
            <Card>
              <h5 className="card-title-bordered">Skin Score</h5>
              <p className="text-muted">82 / 100</p>
            </Card>
          </div>

          <div className="col-md-4">
            <Card>
              <h5 className="card-title-bordered">Active Routine</h5>
              <p className="text-muted">AM + PM</p>
            </Card>
          </div>
        </div>
      </div>

      <NotificationDrawer
        isOpen={openNotifications}
        onClose={() => setOpenNotifications(false)}
      />
    </>
  );
};

export default Dashboard;
