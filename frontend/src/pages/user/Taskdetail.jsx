import React from "react";
import Sidebar from "../../components/layouts/sidebar";
import Taskdetail from "../../components/layouts/taskdetail";
import Topbar from "../../components/layouts/Topbar";
export default function Taskdetailpg() {
  return (
    <div className="display">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        <Topbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <Taskdetail/>
        </div>
      </div>
    </div>
  );
}
