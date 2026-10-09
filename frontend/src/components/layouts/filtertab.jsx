import React from "react";

const FilterTabs = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 bg-white rounded-pill p-1 shadow-card">
      {filters.map((f) => {
        const value = f.value ?? f.label;
        const active = activeFilter === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setActiveFilter(value)}
            className={
              "flex items-center gap-2 rounded-pill px-4 py-1.5 text-small font-medium capitalize transition-colors " +
              (active
                ? "bg-brand-gradient text-white shadow-active"
                : "text-ink-muted hover:text-brand-600 hover:bg-brand-50")
            }
          >
            {f.label}
            <span
              className={
                "min-w-6 text-center rounded-pill px-1.5 py-0.5 text-tiny font-semibold " +
                (active ? "bg-white/25 text-white" : "bg-kbd text-brand-600")
              }
            >
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;