
import React, { useState } from "react";
import Sidebar from "../../components/layouts/sidebar";
import TaskCard from "../../components/layouts/Taskcard";
import FilterTabs from "../../components/layouts/filtertab";
import { filters } from "../../utilis/data"; 
import { useTasks } from "../../hooks/task";

const ManageTask = () => {
   const { tasks } = useTasks();
   
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTasks = tasks.filter((t) =>
    activeFilter === "All" ? true : t.status === activeFilter
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mb-8">

          <div className="flex flex-wrap items-center gap-3">
            <FilterTabs
              filters={filters}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
        </div>

        {/* Task Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-medium">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTask;