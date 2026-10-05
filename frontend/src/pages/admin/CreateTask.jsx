import React from "react";
import Sidebar from "../../components/layouts/sidebar";
import CreateTask from "../../components/layouts/createtask";
import Topbar from "../../components/layouts/Topbar";
export default function CreateTaskPg() {
  return (
    <div className="display">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        <Topbar />
        <div className="flex-1 min-h-0 overflow-auto">
          <CreateTask/>
        </div>
      </div>
    </div>
  );
}
