import React, { useState } from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import { Bell } from "lucide-react";
import NotificationDrawer from "./NotificationDrawer";
import LiveClock from "../../molecules/Liveclock/LiveClock";
import skincareHero from "../../../assets/skincare-hero.svg";
import skincareProducts from "../../../assets/skincare-products.svg";

const Dashboard = () => {
  const [openNotifications, setOpenNotifications] = useState(false);

  const routineChecklist = [
    "Gentle cleanser completed",
    "Hydrating serum applied",
    "Moisturizer applied",
    "Sunscreen reapplication pending",
  ];

  const skinFocus = [
    "Calm redness around cheeks",
    "Maintain hydration barrier",
    "Reduce dark spot appearance",
  ];

  return (
    <>
      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>SkinIQ Dashboard</h2>

          <div className="d-flex align-items-center gap-3 position-relative">
            <button
              className="notification-btn"
              onClick={() => setOpenNotifications(true)}
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <Button variant="primary">Log Routine Update</Button>
          </div>
        </div>

        <Card className="dashboard-hero-card mb-4">
          <div className="dashboard-hero-content">
            <div className="dashboard-hero-text">
              <p className="dashboard-hero-badge">Daily Skin Intelligence</p>
              <h4>Healthy skin starts with consistent care and smart tracking.</h4>
              <p className="text-muted mb-0">
                Monitor hydration, sun protection, and routine progress from one professional dashboard.
              </p>
            </div>
            <img src={skincareHero} alt="Skin care dashboard illustration" className="dashboard-hero-image" />
          </div>
        </Card>

        <div className="row g-4">
          <div className="col-md-4">
            <Card className="dashboard-card">
              <h5 className="card-title-bordered">Today Overview</h5>
              <div className="card-scroll-content">
                <LiveClock />
                <p className="dashboard-highlight-text">Current skin condition: Stable</p>
                <p className="text-muted mb-0">Best care window: Evening repair routine</p>
              </div>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="dashboard-card">
              <h5 className="card-title-bordered">Hydration Level</h5>
              <p className="dashboard-score">78%</p>
              <p className="text-muted mb-0">Increase water intake and use barrier cream tonight.</p>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="dashboard-card">
              <h5 className="card-title-bordered">UV Protection</h5>
              <p className="dashboard-score">Moderate Risk</p>
              <p className="text-muted mb-0">Next sunscreen reapplication in 1 hour.</p>
            </Card>
          </div>

          <div className="col-md-6 d-flex">
            <Card className="dashboard-mid-card">
              <h5 className="card-title-bordered">Routine Checklist</h5>
              <ul className="dashboard-list">
                {routineChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="col-md-6 d-flex">
            <Card className="dashboard-mid-card">
              <h5 className="card-title-bordered">Skin Focus Areas</h5>
              <ul className="dashboard-list">
                {skinFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="col-12">
            <Card>
              <h5 className="card-title-bordered">Recommended Products Today</h5>
              <div className="dashboard-products-layout">
                <img
                  src={skincareProducts}
                  alt="Skincare product set illustration"
                  className="dashboard-products-image"
                />
                <div className="dashboard-products-grid">
                <div className="dashboard-product-item">
                  <h6>Morning</h6>
                  <p className="text-muted mb-0">Vitamin C serum, moisturizer, SPF 50 sunscreen.</p>
                </div>
                <div className="dashboard-product-item">
                  <h6>Evening</h6>
                  <p className="text-muted mb-0">Gentle cleanser, niacinamide serum, ceramide night cream.</p>
                </div>
                <div className="dashboard-product-item">
                  <h6>Weekly Care</h6>
                  <p className="text-muted mb-0">Hydrating mask and mild exfoliation (1-2 times).</p>
                </div>
                </div>
              </div>
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
