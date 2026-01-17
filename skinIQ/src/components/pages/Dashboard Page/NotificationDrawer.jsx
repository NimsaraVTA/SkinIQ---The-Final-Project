import React from "react";
import { X } from "lucide-react";

const NotificationDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`notification-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h5>Notifications</h5>
          <X size={20} onClick={onClose} className="close-icon" />
        </div>

        <div className="drawer-content">
          <div className="notification-item">
            <h6>Skin Scan Reminder</h6>
            <p>Your next skin scan is scheduled for today.</p>
            <span>2 hours ago</span>
          </div>

          <div className="notification-item">
            <h6>Routine Update</h6>
            <p>Your skincare routine has been updated.</p>
            <span>Yesterday</span>
          </div>

          <div className="notification-item">
            <h6>AI Report Ready</h6>
            <p>Your skin analysis report is now available.</p>
            <span>2 days ago</span>
          </div>
        </div>
      </div>

      {isOpen && <div className="notification-overlay" onClick={onClose} />}
    </>
  );
};

export default NotificationDrawer;
