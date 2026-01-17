import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  return (
    <div className="topbar d-lg-none">
      <button className="menu-btn" onClick={onMenuClick}>
        <Menu size={22} />
      </button>
      <h5 className="mb-0">SkinIQ Dashboard</h5>
    </div>
  );
};

export default Topbar;
