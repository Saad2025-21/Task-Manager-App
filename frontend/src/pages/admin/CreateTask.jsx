
import React, { useState } from "react";
import Sidebar from '../../components/layouts/sidebar'
import CreateTask from "../../components/layouts/createtask";

export default function CreateTaskPg() {


  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 p-8 space-y-10">
      <CreateTask />

      </div>
    </div>
  );
}