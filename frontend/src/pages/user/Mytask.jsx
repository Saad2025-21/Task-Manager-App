import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";
import Sidebar from "../../components/layouts/sidebar";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

export default function MyTasks() {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get(API_PATHS.TASKS.GET_ALL_TASKS)
      .then(({ data }) => {
        if (!cancelled) setTasks(data.tasks);
      })
      .catch((requestError) => {
        if (!cancelled)
          setError(
            requestError.response?.data?.message ||
              "Could not load tasks. Check your connection and try again.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!tasks && !error)
    return (
      <div className="display">
        <Sidebar />
        <main className="content-glow flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto max-lg:overflow-visible">
          <div className="grid h-full min-h-48 place-items-center text-brand-600">
            <TbLoader3 className="animate-spin" size={32} />
            <span className="sr-only">Loading tasks</span>
          </div>
        </main>
      </div>
    );

  const allTasks = tasks || [];
  const pending = allTasks.filter((task) => task.status === "pending");
  const inProgress = allTasks.filter((task) => task.status === "in-progress");
  const completed = allTasks.filter((task) => task.status === "completed");
  const visibleTasks =
    selected === "all"
      ? allTasks
      : allTasks.filter((task) => task.status === selected);
  const searchTasks = visibleTasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto font-sans text-ink max-lg:overflow-visible">
        <header>
          <p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">
            Workspace
          </p>
          <h1 className="mt-1 text-title text-brand-700">Tasks</h1>
          <p className="mt-1 text-small text-ink-muted">
            Review your assigned work in one place.
          </p>
        </header>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="inline-flex flex-wrap items-center gap-1 rounded-pill bg-white p-1 shadow-card">
            {[
              { value: "all", label: "All", count: allTasks.length },
              { value: "pending", label: "To do", count: pending.length },
              {
                value: "in-progress",
                label: "In progress",
                count: inProgress.length,
              },
              { value: "completed", label: "Completed", count: completed.length },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`flex max-lg:min-h-11 items-center gap-2 rounded-pill px-4 py-1.5 text-small font-medium capitalize transition-colors ${
                  selected === filter.value
                    ? "bg-brand-gradient text-white shadow-active"
                    : "text-ink-muted hover:bg-brand-50 hover:text-brand-600"
                }`}
                onClick={() => setSelected(filter.value)}
              >
                {filter.label}
                <span
                  className={`min-w-6 rounded-pill px-1.5 py-0.5 text-center text-tiny font-semibold ${
                    selected === filter.value
                      ? "bg-white/25 text-white"
                      : "bg-kbd text-brand-600"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          <label className="relative block w-full xl:max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              placeholder="Search tasks..."
              className="max-lg:min-h-11 w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700"
          >
            {error}
          </p>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto max-lg:overflow-visible">
          <div className="grid grid-cols-1 gap-4 pb-3 sm:grid-cols-2 2xl:grid-cols-3">
            {searchTasks.map((task) => {
              const checklist = task.todochecklist || [];
              const total = checklist.length;
              const done = checklist.filter((item) => item.completed).length;
              const percent =
                total === 0 ? 0 : Math.round((done / total) * 100);
              return (
                <article
                  key={task._id}
                  className="flex min-w-0 flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-active"
                >
                  <div className="flex items-start justify-between gap-3 max-sm:flex-col">
                    <h2 className="truncate text-heading text-ink">
                      <Link to={`/user/taskdetail/${task._id}`}>
                        {task.title}
                      </Link>
                    </h2>
                    <div className="flex shrink-0 flex-wrap justify-end gap-2 max-sm:justify-start">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-chart-2/10 px-2.5 py-0.5 text-tiny font-medium text-chart-2">
                        <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                        {task.status}
                      </span>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-brand-100 px-2.5 py-0.5 text-tiny font-medium text-brand-600">
                        <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <p className="min-h-[2.8em] text-small text-ink-muted">
                    {task.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-small">
                      <span className="text-ink-muted">Task progress</span>
                      <span className="font-semibold text-brand-600">
                        {percent}%
                      </span>
                    </div>
                    <div
                      className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-brand-100"
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="h-full rounded-pill bg-brand-gradient"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-small text-ink-muted">
                      <span className="font-semibold text-ink">{done}</span>/
                      {total} checklist items
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
