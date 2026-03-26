import React, { useEffect, useState } from "react";
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

import { auth } from "../../services/firebase";
import { db } from "../../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let unsubscribeFirestore;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        // Listen to Firestore user document
        const userDocRef = doc(db, "users", user.uid);

        unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileImage(data.photoURL);
            // keep username if provided
            setUsername(data.username || "");
          }
        });
      }
    });

    return () => {
      if (unsubscribeFirestore) unsubscribeFirestore();
      unsubscribeAuth();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      
      <div className="sidebar-close d-lg-none" onClick={onClose}>
        <X size={20} />
      </div>

      <div className="sidebar-profile">
        <img
          src={
            profileImage
              ? profileImage
              : "https://img.freepik.com/premium-photo/rendered-photo-beautiful-model-applying-skin-care-products-flat-illustration_1096167-104394.jpg?w=360"
          }
          alt="User"
          className="profile-img"
        />
        {/* show username if set above email */}
        {username && <h5 className="mt-3 mb-0">{username}</h5>}
        <h6 className="mt-1 mb-0">
          {userEmail ? userEmail : "Loading..."}
        </h6>
        <span>Premium User</span>
      </div>

      <ul className="sidebar-nav">
        <li onClick={() => navigate("/dashboard")}>
          <LayoutDashboard size={18} /> Dashboard
        </li>
        <li onClick={() => navigate("/ai-skin-analysis")}>
          <Camera size={18} /> AI Skin Analysis
        </li>
        <li onClick={() => navigate("/reports")}>
          <FileText size={18} /> Reports
        </li>
        <li onClick={() => navigate("/skincare-routine")}>
          <Sparkles size={18} /> Skincare Routine
        </li>
        <li onClick={() => navigate("/product-checker")}>
          <ShieldCheck size={18} /> Product Checker
        </li>
        <li onClick={() => navigate("/ai-chat")}>
          <MessageSquare size={18} /> AI Chat
        </li>
        <li onClick={() => navigate("/reminders")}>
          <Bell size={18} /> Reminders
        </li>

        <hr />
        <li onClick={() => navigate("/profile")}>
          <Settings size={18} /> Settings
        </li>
        <li className="logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;