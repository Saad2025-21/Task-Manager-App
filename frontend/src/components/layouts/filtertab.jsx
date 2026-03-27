
import React from "react";

export default function FilterTabs({ filters, activeFilter, setActiveFilter }) {
  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-full px-1 py-1 gap-1 shadow-sm">
      {filters.map((f) => (
        <button
          key={f.label}
          onClick={() => setActiveFilter(f.label)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === f.label ? "bg-gray-800 text-white shadow" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {f.label}
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
              activeFilter === f.label ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}