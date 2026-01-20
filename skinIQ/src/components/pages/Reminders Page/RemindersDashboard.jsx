import React from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import { Bell, Clock } from "lucide-react";

const RemindersDashboard = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Reminders</h2>
          <p className="text-muted">
            Stay consistent with your skincare and wellness routines
          </p>
        </div>

        <Button variant="primary">
          Add Reminder
        </Button>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">
              <Clock size={16} /> Today’s Reminders
            </h5>

            <div className="card-scroll-content">
              <p className="text-muted">
                No reminders scheduled for today.
              </p>
            </div>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">
              <Bell size={16} /> Upcoming Reminders
            </h5>

            <div className="card-scroll-content">
              <p className="text-muted">
                Your upcoming reminders will appear here.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RemindersDashboard;
