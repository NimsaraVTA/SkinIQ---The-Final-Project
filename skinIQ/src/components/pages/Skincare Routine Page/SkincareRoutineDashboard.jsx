import React from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import { MessageSquare } from "lucide-react";

const SkincareRoutineDashboard = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>AI Skincare Routine Generator</h2>
          <p className="text-muted">
            Chat with AI to generate a personalized skincare routine
          </p>
        </div>

        <Button variant="primary">
          Start AI Chat
        </Button>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">
              <MessageSquare size={16} /> AI Chat Assistant
            </h5>

            <div className="card-scroll-content">
              <p className="text-muted">
                AI chatbot conversation will appear here.
              </p>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">Generated Routine</h5>

            <div className="card-scroll-content">
              <p className="text-muted">
                Your AM / PM skincare routine will be generated here based on AI responses.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SkincareRoutineDashboard;
