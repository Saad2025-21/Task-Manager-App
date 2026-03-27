
import React from "react";

const statusStyles = {
  "In Progress": "bg-cyan-50 text-cyan-600 border border-cyan-200",
  Pending: "bg-purple-50 text-purple-600 border border-purple-200",
  Completed: "bg-green-50 text-green-600 border border-green-200",
};

const priorityStyles = {
  "High Priority": "bg-red-50 text-red-500 border border-red-200",
  "Medium Priority": "bg-orange-50 text-orange-400 border border-orange-200",
  "Low Priority": "bg-green-50 text-green-500 border border-green-200",
};

const progressBarColor = {
  "In Progress": "bg-gradient-to-r from-cyan-400 to-blue-500",
  Pending: "bg-gradient-to-r from-purple-300 to-purple-400",
  Completed: "bg-gradient-to-r from-green-400 to-emerald-500",
};

export default function TaskCard({ task }) {
  const progress = Math.round((task.taskDone / task.taskTotal) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full 
    ${statusStyles[task.status]} 
    ${task.status?.toLowerCase() === "pending" ? "text-red-500" : ""}
    ${task.status?.toLowerCase() === "in progress" ? "text-orange-500" : ""}
    ${task.status?.toLowerCase() === "completed" ? "text-green-400" : ""}`}
        >
          {task.status}
        </span>


        <span className={`text-xs font-medium px-3 py-1 rounded-full ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base leading-snug mb-1">{task.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{task.description}</p>
      </div>

      {/* Progress Bar
      <div>
        <p className="text-sm text-gray-500 mb-1.5">
          Task Done: <span className="font-semibold text-gray-700">{task.taskDone} / {task.taskTotal}</span>
        </p>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${progressBarColor[task.status]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div> */}

      {/* Dates
      <div className="flex justify-between text-xs text-gray-400 pt-1">
        <div>
          <p className="font-medium text-gray-500 mb-0.5">Start Date</p>
          <p className="font-semibold text-gray-700 text-sm">{task.startDate}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-500 mb-0.5">Due Date</p>
          <p className="font-semibold text-gray-700 text-sm">{task.dueDate}</p>
        </div>
      </div> */}
    </div>
  );
}