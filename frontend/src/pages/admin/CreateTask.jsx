
import React, { useState } from "react";
import Sidebar from '../../components/layouts/sidebar'
import CreateTask from "../../components/layouts/createtask";
import { useTasks } from "../../hooks/task";


export default function CreateTaskPg() {
   const { addTask } = useTasks();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-8 space-y-10">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}