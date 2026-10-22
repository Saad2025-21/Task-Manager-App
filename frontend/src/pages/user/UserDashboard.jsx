import { FiArrowUpRight, FiCheckCircle, FiClock, FiList } from "react-icons/fi";
import Sidebar from "../../components/layouts/sidebar";
import {
  TaskDistributionChart,
  TaskPriorityChart,
} from "../../components/layouts/charts";
import { useState, useEffect } from "react";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";
import { TbLoader3 } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [dashboardData, setdashboardData] = useState(null);

  const [error, seterror] = useState("");

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get(API_PATHS.TASKS.GET_USER_DASHBAORD_DATA)
      .then(({ data }) => {
        if (!cancelled) {
          setdashboardData(data);
        }
      })
      .catch((requestError) => {
        if (!cancelled)
          seterror(
            requestError.response?.data?.message ||
              "Could not load the dashboard. Check your connection and try again.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!dashboardData && !error)
    return (
      <div className="grid h-full min-h-48 place-items-center text-brand-600">
        <TbLoader3 className="animate-spin" size={32} />
        <span className="sr-only">Loading dashboard</span>
      </div>
    );

  const taskStats = [
    {
      label: "Assigned to me",
      value: dashboardData?.statistics?.totalTask,
      icon: <FiList />,
      style: "bg-brand-gradient text-white",
    },
    {
      label: "To do",
      value: dashboardData?.statistics?.pendingTask || 0,
      icon: <FiClock />,
      style: "bg-white text-ink",
    },
    {
      label: "In progress",
      value: dashboardData?.statistics?.inprogress || 0,
      icon: <FiArrowUpRight />,
      style: "bg-white text-ink",
    },
    {
      label: "Completed",
      value: dashboardData?.statistics?.completedTask || 0,
      icon: <FiCheckCircle />,
      style: "bg-white text-ink",
    },
  ];
  const recent_task = dashboardData?.recentTask || [];
  const status_styles = {
    "in-progress": { label: "In progress", color: "text-red-600" },
    pending: { label: "Pending", color: "text-yellow-600" },
    completed: { label: "Completed", color: "text-white" },
  };
  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto font-sans text-ink max-lg:overflow-visible">
        <header>
          <p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">
            Your overview
          </p>
          <h1 className="mt-1 text-title text-brand-700 max-sm:text-3xl">
            Good work starts here.
          </h1>
          <p className="mt-1 text-small text-ink-muted">
            A clear view of your workload and what’s next.
          </p>
        </header>

        {/* Practice: connect the dashboard API and replace these sample values with its response. */}
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {taskStats.map((stat, index) => (
            <article
              key={stat.label}
              className={`flex min-h-32 flex-col justify-between rounded-2xl border border-brand-100 p-5 shadow-card ${stat.style}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${index === 0 ? "text-white/80" : "text-ink-muted"}`}
                >
                  {stat.label}
                </span>
                <span
                  className={index === 0 ? "text-white/80" : "text-brand-600"}
                >
                  {stat.icon}
                </span>
              </div>
              <p className="text-stat">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="grid min-h-80 grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-h-72 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <TaskDistributionChart
              data={[
                {
                  name: "To do",
                  value: dashboardData?.chart?.taskDistribution?.pending || 0,
                  color: "#65b88e",
                },
                {
                  name: "In progress",
                  value:
                    dashboardData?.chart?.taskDistribution?.["in-progress"] || 0,
                  color: "#21805a",
                },
                {
                  name: "Completed",
                  value: dashboardData?.chart?.taskDistribution?.completed || 0,
                  color: "#124b37",
                },
              ]}
            />
          </div>
          <div className="min-h-72 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <TaskPriorityChart
              data={[
                {
                  name: "Low",
                  value: dashboardData?.chart?.prioritylevel?.Low || 0,
                  color: "#9bcab1",
                },
                {
                  name: "Medium",
                  value: dashboardData?.chart?.prioritylevel?.Medium || 0,
                  color: "#21805a",
                },
                {
                  name: "High",
                  value: dashboardData?.chart?.prioritylevel?.High || 0,
                  color: "#124b37",
                },
              ]}
            />
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-heading">Recently assigned</h2>
              <p className="mt-1 text-small text-ink-muted">
                Pick up where you left off.
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              View all tasks
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 h-[55vh] overflow-hidden max-lg:h-auto max-lg:overflow-visible">
            {recent_task.map((task) => {
              const status = task.status;
              const checklist = task?.todochecklist || [];
              const total = checklist.length ?? 0;
              const completed = checklist.filter(
                (done) => done.completed,
              ).length;
              const percent =
                total === 0 ? 0 : Math.round((completed / total) * 100);
              return (
                <article
                  key={task._id}
                  className="flex min-w-0 flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card"
                >
                    <div className="flex items-start justify-between gap-3 max-sm:flex-col">
                      <h3 className="truncate text-heading text-ink">
                        <Link to={`/user/taskdetail/${task._id}`}>
                          {task.title}
                        </Link>
                      </h3>
                      <div className="flex gap-1 max-sm:flex-wrap">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-chart-2/10 px-2.5 py-0.5 text-tiny font-medium text-chart-2">
                          <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                          {(status_styles[status] || status_styles.pending).label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-chart-2/10 px-2.5 py-0.5 text-tiny font-medium text-chart-2">
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
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-brand-100">
                        <div
                          className="h-full rounded-pill bg-brand-gradient"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="mt-2 text-small text-ink-muted">
                        {completed}/{total} checklist items
                      </p>
                    </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
