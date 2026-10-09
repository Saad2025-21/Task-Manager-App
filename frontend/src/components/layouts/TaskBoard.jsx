import { FiArrowUpRight, FiSearch } from "react-icons/fi";

export default function TaskBoard() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-6 font-sans text-ink">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">
            Workspace
          </p>
          <h1 className="mt-1 text-title text-brand-700">Tasks</h1>
          <p className="mt-1 text-small text-ink-muted">
            Review and manage work in one place.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-active transition hover:brightness-105 sm:self-auto"
        >
          Create task <FiArrowUpRight />
        </button>
      </header>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="inline-flex flex-wrap items-center gap-1 rounded-pill bg-white p-1 shadow-card">
          <button
            type="button"
            className="flex items-center gap-2 rounded-pill bg-brand-gradient px-4 py-1.5 text-small font-medium capitalize text-white shadow-active transition-colors"
          >
            All
            <span className="min-w-6 rounded-pill bg-white/25 px-1.5 py-0.5 text-center text-tiny font-semibold text-white">
              0
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-pill px-4 py-1.5 text-small font-medium capitalize text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            To do
            <span className="min-w-6 rounded-pill bg-kbd px-1.5 py-0.5 text-center text-tiny font-semibold text-brand-600">
              0
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-pill px-4 py-1.5 text-small font-medium capitalize text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            In progress
            <span className="min-w-6 rounded-pill bg-kbd px-1.5 py-0.5 text-center text-tiny font-semibold text-brand-600">
              0
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-pill px-4 py-1.5 text-small font-medium capitalize text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            Completed
            <span className="min-w-6 rounded-pill bg-kbd px-1.5 py-0.5 text-center text-tiny font-semibold text-brand-600">
              0
            </span>
          </button>
        </div>

        <label className="relative block w-full xl:max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 pb-3 sm:grid-cols-2 2xl:grid-cols-3">
          <article className="flex min-w-0 flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-active">
            <div className="flex items-start justify-between gap-3">
              <h2 className="truncate text-heading text-ink">Task title</h2>
              <div className="flex shrink-0 flex-wrap justify-end gap-2">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-chart-2/10 px-2.5 py-0.5 text-tiny font-medium text-chart-2">
                  <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                  To do
                </span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-brand-100 px-2.5 py-0.5 text-tiny font-medium text-brand-600">
                  <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                  Priority
                </span>
              </div>
            </div>
            <p className="min-h-[2.8em] text-small text-ink-muted">
              Task description will appear here.
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between text-small">
                <span className="text-ink-muted">Task progress</span>
                <span className="font-semibold text-brand-600">0%</span>
              </div>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-brand-100"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="h-full w-0 rounded-pill bg-brand-gradient" />
              </div>
              <p className="mt-2 text-small text-ink-muted">
                <span className="font-semibold text-ink">0</span>/0 checklist
                items
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
