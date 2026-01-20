import React from "react";
import Card from "../../atoms/Card/Card";

const ReportsDashboard = () => {
  return (
    <>
      <div className="mb-4">
        <h2>Reports Dashboard</h2>
        <p className="text-muted">
          View and manage your skin health analysis reports
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-12">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">Reports Overview</h5>

            <div className="card-scroll-content d-flex align-items-center justify-content-center">
              <p className="text-muted">
                No reports available yet
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReportsDashboard;
