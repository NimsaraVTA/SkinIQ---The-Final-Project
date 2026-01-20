import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Camera,
  FileText,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  X
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      
      <div className="sidebar-close d-lg-none" onClick={onClose}>
        <X size={20} />
      </div>

      <div className="sidebar-profile">
        <img
          src="https://thepicturesdp.in/wp-content/uploads/2025/07/black-images-dp-1.jpg"
          alt="User"
          className="profile-img"
        />
        <h6 className="mt-3 mb-0">Thathsarani Bandara</h6>
        <span>Premium User</span>
      </div>

      <ul className="sidebar-nav">
        <li onClick={() => navigate("/dashboard")}>
          <LayoutDashboard size={18} /> Dashboard
        </li>
        <li onClick={() => navigate("/ai-skin-analysis")}>
          <Camera size={18} /> AI Skin Analysis
        </li>
        <li><FileText size={18} /> Reports</li>
        <li><Sparkles size={18} /> Skincare Routine</li>
        <li><ShieldCheck size={18} /> Product Checker</li>
        <li onClick={() => navigate("/ai-chat")}>
          <MessageSquare size={18} /> AI Chat
        </li>
        <li><Bell size={18} /> Reminders</li>

        <hr />
        <li onClick={() => navigate("/profile")}>
          <Settings size={18} /> Settings
        </li>
        <li className="logout" onClick={handleLogout}><LogOut size={18} /> Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
