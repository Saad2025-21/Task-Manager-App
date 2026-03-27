import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layouts/sidebar";
import TaskCard from "../../components/layouts/Taskcard";
import FilterTabs from "../../components/layouts/filtertab";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);   
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
        setTasks(res.data.recentTask || []); 
        console.log("Fetched tasks:", res.data.recentTask);    
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);                       
      }
    };
    fetchTasks();
  }, []);

  const filters = [
  { label: "All", count: tasks.length },
  { label: "pending", count: tasks.filter((t) => t.status === "pending").length },
  { label: "in-progress", count: tasks.filter((t) => t.status === "in-progress").length },
  { label: "completed", count: tasks.filter((t) => t.status === "completed").length },
];


  const filteredTasks = tasks.filter((t) =>
    activeFilter === "All" ? true : t.status === activeFilter
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
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
              <TaskCard key={task._id} task={task} />
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
