import Dashboardlayout from "../../components/layouts/dashboardlayout";
import Sidebar from "../../components/layouts/sidebar";

const Dashboard = () => {
  return (
    <div className="display">
      <Sidebar />
      <div className="content-glow flex-1 min-w-0 min-h-0 overflow-auto">
        <Dashboardlayout />
      </div>
    </div>
  );
};

export default Dashboard;
