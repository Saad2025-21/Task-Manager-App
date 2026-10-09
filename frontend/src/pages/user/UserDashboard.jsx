import { FiArrowUpRight, FiCheckCircle, FiClock, FiList } from "react-icons/fi";
import Sidebar from "../../components/layouts/sidebar";
import { TaskDistributionChart, TaskPriorityChart } from "../../components/layouts/charts";

const taskStats = [
  { label: "Assigned to me", value: "12", icon: <FiList />, style: "bg-brand-gradient text-white" },
  { label: "To do", value: "4", icon: <FiClock />, style: "bg-white text-ink" },
  { label: "In progress", value: "5", icon: <FiArrowUpRight />, style: "bg-white text-ink" },
  { label: "Completed", value: "3", icon: <FiCheckCircle />, style: "bg-white text-ink" },
];

export default function UserDashboard() {
  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto font-sans text-ink">
        <header>
          <p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">Your overview</p>
          <h1 className="mt-1 text-title text-brand-700">Good work starts here.</h1>
          <p className="mt-1 text-small text-ink-muted">A clear view of your workload and what’s next.</p>
        </header>

        {/* Practice: connect the dashboard API and replace these sample values with its response. */}
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {taskStats.map((stat, index) => (
            <article key={stat.label} className={`flex min-h-32 flex-col justify-between rounded-2xl border border-brand-100 p-5 shadow-card ${stat.style}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${index === 0 ? "text-white/80" : "text-ink-muted"}`}>{stat.label}</span>
                <span className={index === 0 ? "text-white/80" : "text-brand-600"}>{stat.icon}</span>
              </div>
              <p className="text-stat">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="grid min-h-[320px] grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-h-72 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <TaskDistributionChart data={[
              { name: "To do", value: 4, color: "#65b88e" },
              { name: "In progress", value: 5, color: "#21805a" },
              { name: "Completed", value: 3, color: "#124b37" },
            ]} />
          </div>
          <div className="min-h-72 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
            <TaskPriorityChart data={[
              { name: "Low", value: 5, color: "#9bcab1" },
              { name: "Medium", value: 4, color: "#21805a" },
              { name: "High", value: 3, color: "#124b37" },
            ]} />
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <div><h2 className="text-heading">Recently assigned</h2><p className="mt-1 text-small text-ink-muted">Pick up where you left off.</p></div>
            <button type="button" className="text-sm font-semibold text-brand-600 hover:underline">View all tasks</button>
          </div>
          {/* Practice: load and render recent assignments, then link each card to its detail page. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            <article className="flex min-w-0 flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <h3 className="truncate text-heading text-ink">Sample assigned task</h3>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-chart-2/10 px-2.5 py-0.5 text-tiny font-medium text-chart-2">
                  <span className="h-1.5 w-1.5 rounded-pill bg-current" />To do
                </span>
              </div>
              <p className="min-h-[2.8em] text-small text-ink-muted">A short description for the sample assignment.</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-small">
                  <span className="text-ink-muted">Task progress</span><span className="font-semibold text-brand-600">25%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-brand-100">
                  <div className="h-full w-1/4 rounded-pill bg-brand-gradient" />
                </div>
                <p className="mt-2 text-small text-ink-muted"><span className="font-semibold text-ink">1</span>/4 checklist items</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
