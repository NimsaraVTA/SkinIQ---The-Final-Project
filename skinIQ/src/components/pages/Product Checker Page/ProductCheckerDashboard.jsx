import React from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";

const ProductCheckerDashboard = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>AI Skin Care Product Checker</h2>
          <p className="text-muted">
            Analyze skincare products using AI-powered ingredient insights
          </p>
        </div>

        <Button variant="primary">
          Check New Product
        </Button>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">Ingredient Safety</h5>
            <div className="card-scroll-content">
              <p className="text-muted">
                AI-based ingredient safety analysis will appear here.
              </p>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">Skin Compatibility</h5>
            <div className="card-scroll-content">
              <p className="text-muted">
                Compatibility score based on your skin profile.
              </p>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="dashboard-card">
            <h5 className="card-title-bordered">AI Recommendation</h5>
            <div className="card-scroll-content">
              <p className="text-muted">
                Personalized AI recommendations will be displayed here.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductCheckerDashboard;
