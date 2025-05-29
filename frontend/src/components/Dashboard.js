import React from "react";
import "./Dashboard.css"; // optional, for your custom CRM styles

const Dashboard = ({ user }) => (
  <div className="dashboard-container">
    <h1>🚀 My CRM Dashboard</h1>
    <p>Welcome, <strong>{user?.username || user?.name || "User"}</strong>!</p>
    <p>Your CRM starts here. Add stats, leads, charts, whatever you want!</p>
    {/* Add more dashboard widgets/components here */}
  </div>
);

export default Dashboard;
