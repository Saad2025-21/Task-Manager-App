import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiList } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";
import { TaskDistributionChart, TaskPriorityChart } from "./charts";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

export default function DashboardLayout() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA)
      .then(({ data }) => { if (!cancelled) setDashboardData(data); })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.response?.data?.message || "Could not load the dashboard. Check your connection and try again.");
      });
    return () => { cancelled = true; };
  }, []);

  if (!dashboardData && !error) return <div className="grid h-full min-h-48 place-items-center text-brand-600"><TbLoader3 className="animate-spin" size={32} /><span className="sr-only">Loading dashboard</span></div>;

  const statistics = dashboardData?.statistics || {};
  const distribution = dashboardData?.chart?.taskDistribution || {};
  const priority = dashboardData?.chart?.taskpriorityLevel || {};
  const stats = [
    { label: "Total tasks", value: statistics.totalTask ?? 0, color: "#14714e" },
    { label: "To do", value: statistics.pendingTask ?? 0, color: "#65b88e" },
    { label: "In progress", value: statistics.inprogress ?? 0, color: "#21805a" },
    { label: "Completed", value: statistics.completedTask ?? 0, color: "#124b37" },
  ];
  const taskDistributionData = [
    { name: "To do", value: distribution.pending ?? 0, color: "#65b88e" },
    { name: "In progress", value: distribution["in-progress"] ?? 0, color: "#21805a" },
    { name: "Completed", value: distribution.completed ?? 0, color: "#124b37" },
  ];
  const priorityData = [
    { name: "Low", value: priority.Low ?? 0, color: "#9bcab1" },
    { name: "Medium", value: priority.Medium ?? 0, color: "#21805a" },
    { name: "High", value: priority.High ?? 0, color: "#124b37" },
  ];

  return (
    <main className="flex min-h-full flex-col gap-5 font-sans text-ink">
      <header className="flex items-end justify-between">
        <div><p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">Workspace overview</p><h1 className="mt-1 text-title text-brand-700">Dashboard</h1><p className="mt-1 text-small text-ink-muted">Plan, prioritize, and accomplish your team’s work.</p></div>
        <Link to="/admin/create-task" className="hidden items-center gap-2 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-active transition hover:brightness-105 sm:inline-flex">New task <FiArrowUpRight /></Link>
      </header>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {dashboardData && <>
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {stats.map((stat, index) => <article key={stat.label} className={`flex min-h-28 flex-col justify-between rounded-2xl border border-brand-100 p-5 shadow-card ${index === 0 ? "bg-brand-gradient text-white" : "bg-white text-ink"}`}>
            <div className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ backgroundColor: index === 0 ? "#fff" : stat.color }} /><p className={`text-sm font-medium ${index === 0 ? "text-white/80" : "text-ink-muted"}`}>{stat.label}</p></div>
            <p className="text-stat">{stat.value}</p>
          </article>)}
        </section>
        <section className="grid min-h-70 grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-h-72 rounded-2xl border border-brand-100 bg-white p-5 shadow-card"><TaskDistributionChart data={taskDistributionData} /></div>
          <div className="min-h-72 rounded-2xl border border-brand-100 bg-white p-5 shadow-card"><TaskPriorityChart data={priorityData} /></div>
        </section>
        <section>
          <div className="mb-3 flex items-end justify-between"><div><h2 className="text-heading">Recent tasks</h2><p className="mt-1 text-small text-ink-muted">The latest activity in your workspace.</p></div><Link to="/admin/tasks" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"><FiList /> All tasks</Link></div>
          {/* Practice here: load recent tasks, then render a card for each task and link to its detail page. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            <article className="flex min-w-0 flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <h3 className="truncate text-heading text-ink">Recent task placeholder</h3>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-chart-2/10 px-2.5 py-0.5 text-tiny font-medium text-chart-2">
                  <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                  To do
                </span>
              </div>
              <p className="min-h-[2.8em] text-small text-ink-muted">
                Replace this sample card with recent task data.
              </p>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-small">
                  <span className="text-ink-muted">Task progress</span>
                  <span className="font-semibold text-brand-600">0%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-brand-100">
                  <div className="h-full w-0 rounded-pill bg-brand-gradient" />
                </div>
                <p className="mt-2 text-small text-ink-muted">0/0 checklist items</p>
              </div>
            </article>
          </div>
        </section>
      </>}
    </main>
  );
}
