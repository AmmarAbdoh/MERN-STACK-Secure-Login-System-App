import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../Style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyContext } from "../src/App";

const Dashboard = () => {
  const { DashboardMessage, setDashBoardFlag } = useContext(MyContext);

  const handleBack = () => {
    setDashBoardFlag(false);
  };
  return (
    <Card className="dashboard-card">
      <Card.Body>
        <Card.Title className="text-center display-4 mb-3">
          {DashboardMessage.welcome}
        </Card.Title>
        <Card.Text className="text-center display-6">
          {DashboardMessage.message}
        </Card.Text>
        <div className="text-center">
          <Button
            variant="primary"
            className="btn btn-primary mt-4"
            size="lg"
            onClick={handleBack}
          >
            Go Back
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
export default Dashboard;
