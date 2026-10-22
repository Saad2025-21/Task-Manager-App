import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";
import Sidebar from "../../components/layouts/sidebar";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

const STATUS_STYLES = {
  pending: { label: "To do", badge: "bg-chart-2/10 text-chart-2" },
  "in-progress": {
    label: "In progress",
    badge: "bg-yellow-100 text-yellow-700",
  },
  completed: { label: "Completed", badge: "bg-brand-100 text-brand-700" },
};

export default function Taskdetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get(API_PATHS.TASKS.GET_TASK_BY_ID(id))
      .then(({ data }) => {
        if (!cancelled) setTask(data);
      })
      .catch((requestError) => {
        if (!cancelled)
          setError(
            requestError.response?.data?.message || "Could not load this task.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toggleItem = async (clicked) => {
    const checklist = task.todochecklist || [];
    const newList = checklist.map((item) =>
      item._id === clicked._id ? { ...item, completed: !item.completed } : item,
    );
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todochecklist: newList },
      );
      setTask(data.task);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not update the checklist.",
      );
    }
  };

  const changeStatus = async (event) => {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK_STATUS(id),
        { status: event.target.value },
      );
      setTask(data.task);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Could not update the status.",
      );
    }
  };

  const checklist = task?.todochecklist || [];
  const total = checklist.length;
  const done = checklist.filter((item) => item.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const status = STATUS_STYLES[task?.status] || STATUS_STYLES.pending;

  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto max-lg:overflow-visible">
        {!task && !error ? (
          <div className="grid h-full min-h-48 place-items-center text-brand-600">
            <TbLoader3 className="animate-spin" size={32} />
            <span className="sr-only">Loading task</span>
          </div>
        ) : !task ? (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        ) : (
          <div className="flex flex-col gap-5 font-sans text-ink">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex max-lg:min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand-600 hover:underline"
            >
              <FiArrowLeft /> Back
            </button>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <article className="flex flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-card max-sm:p-4">
              <div className="flex items-start justify-between gap-3 max-sm:flex-col">
                <h1 className="text-title text-brand-700 max-sm:text-3xl">{task.title}</h1>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-2.5 py-0.5 text-tiny font-medium ${status.badge}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                    {status.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-brand-100 px-2.5 py-0.5 text-tiny font-medium text-brand-600">
                    <span className="h-1.5 w-1.5 rounded-pill bg-current" />
                    {task.priority}
                  </span>
                </div>
              </div>

              <p className="text-small text-ink-muted">
                {task.description || "No description"}
              </p>

              <div>
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
                    className="h-full rounded-pill bg-brand-gradient transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-2 text-small text-ink-muted">
                  <span className="font-semibold text-ink">{done}</span>/{total}{" "}
                  checklist items
                </p>
              </div>

              <div>
                <h2 className="mb-2 text-heading">Checklist</h2>
                {total === 0 ? (
                  <p className="text-small text-ink-muted">
                    No checklist items.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {checklist.map((item) => (
                      <li key={item._id}>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-brand-100 px-4 py-3 text-sm hover:bg-brand-50">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleItem(item)}
                          />
                          <span
                            className={
                              item.completed ? "text-ink-muted line-through" : ""
                            }
                          >
                            {item.text}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label className="block text-sm font-medium text-ink">
                Status
                <select
                  value={task.status}
                  onChange={changeStatus}
                  className="mt-2 max-lg:min-h-11 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                >
                  <option value="pending">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </article>
          </div>
        )}
      </main>
    </div>
  );
}
