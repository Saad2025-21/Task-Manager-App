import React from "react";
import Dashboardlayout from "../../components/layouts/dashboardlayout";
import Sidebar from "../../components/layouts/sidebar";
import Topbar from "../../components/layouts/Topbar";
import { useState } from "react";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="display">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        <Topbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <Dashboardlayout />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
