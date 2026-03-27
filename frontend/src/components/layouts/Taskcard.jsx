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



export default function TaskCard({ task }) {

  


  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm 
          ${statusStyles[task.status]}`}
        >
          {task.status}
        </span>

        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm 
          ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base leading-snug mb-1">
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      </div>
   


    </div>
  );
}
