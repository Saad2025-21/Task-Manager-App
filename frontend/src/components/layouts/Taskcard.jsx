import React from "react";

// Status: three brand hues (same as the dashboard charts)
const STATUS_STYLES = {
  pending: "bg-chart-2/10 text-chart-2",
  "in-progress": "bg-chart-1/10 text-chart-1",
  completed: "bg-chart-3/10 text-chart-3",
};

// Priority: one hue, light -> dark = low -> high
const PRIORITY_STYLES = {
  low: "bg-brand-100 text-brand-600",
  medium: "bg-brand-300/40 text-brand-700",
  high: "bg-brand-900 text-white",
};

const Badge = ({ className = "", children }) => (
  <span
    className={
      "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-tiny font-medium whitespace-nowrap " +
      className
    }
  >
    <span className="h-1.5 w-1.5 rounded-pill bg-current" />
    {children}
  </span>
);

const TaskCard = ({ task }) => {
  // NOTE: adjust these two lines if your task object names its checklist differently.
  const rawList = task.todochecklist ?? task.todoChecklist;
  const checklist = Array.isArray(rawList) ? rawList : null;
  const total = checklist ? checklist.length : (task.totalTodos ?? 0);
  const done = checklist
    ? checklist.filter((t) => t.completed).length
    : (task.completedTodoCount ?? 0);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const statusStyle = STATUS_STYLES[task.status] || STATUS_STYLES.pending;
  const priorityStyle =
    PRIORITY_STYLES[String(task.priority || "").toLowerCase()] ||
    PRIORITY_STYLES.low;

  return (
    <article className="h-full flex flex-col gap-3 p-5 min-w-0 border-none">
      {/* Title + badges */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-heading text-ink truncate">{task.title}</h3>
        <div className="flex flex-wrap justify-end gap-2 shrink-0">
          <Badge className={statusStyle}>{task.status}</Badge>
          <Badge className={priorityStyle}>{task.priority}</Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-small text-ink-muted line-clamp-2 min-h-[2.8em]">
        {task.description}
      </p>

      {/* Progress */}
      <div className="mt-auto">
        <div className="flex items-center justify-between text-small">
          <span className="text-ink-muted">Task done</span>
          <span className="font-semibold text-brand-600">{percent}%</span>
        </div>

        <div
          className="mt-2 h-2 w-full rounded-pill bg-brand-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-pill bg-brand-gradient transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-2 text-small text-ink-muted">
          <span className="font-semibold text-ink">{done}</span>/{total} tasks
        </p>
      </div>
    </article>
  );
};

export default TaskCard;
