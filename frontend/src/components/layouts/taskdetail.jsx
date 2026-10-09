import { FiArrowLeft, FiPlus, FiSave, FiTrash2, FiX } from "react-icons/fi";

const inputStyle = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:bg-surface disabled:text-ink-muted";
const labelStyle = "mb-1.5 block text-sm font-medium text-ink-muted";

export default function TaskDetailLayout() {
  const checklist = [
    { text: "Review the task requirements", completed: true },
    { text: "Complete the first draft", completed: false },
  ];
  const doneCount = checklist.filter((item) => item.completed).length;
  const progress = Math.round((doneCount / checklist.length) * 100);

  return (
    <main className="flex min-h-full flex-col gap-5 rounded-2xl bg-white p-5 shadow-card sm:p-8">
      {/* Practice: fetch a task by its route ID and replace the sample task details below. */}
      <button type="button" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand-700">
        <FiArrowLeft /> Back to tasks
      </button>

      <header className="flex flex-col gap-3 border-b border-line-soft pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">Task details</p>
          <h1 className="mt-1 text-3xl font-semibold text-brand-900">Sample task title</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            A sample description for your task. Replace this placeholder with details from your task data.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold capitalize text-brand-700">To do</span>
          <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold capitalize text-ink-muted">Low priority</span>
          <button type="button" aria-label="Delete task" className="rounded-xl border border-red-100 p-2.5 text-red-600 hover:bg-red-50">
            <FiTrash2 />
          </button>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <section className="space-y-5">
          <div>
            <h2 className="mb-3 text-heading">Task information</h2>
            <label className={labelStyle}>
              Title
              <input disabled defaultValue="Sample task title" className={inputStyle} />
            </label>
            <label className={`${labelStyle} mt-4`}>
              Description
              <textarea disabled rows={4} defaultValue="A sample description for this task." className={`${inputStyle} resize-y`} />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className={labelStyle}>
                Priority
                <select disabled defaultValue="Low" className={inputStyle}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </label>
              <label className={labelStyle}>
                Status
                <select disabled defaultValue="pending" className={inputStyle}>
                  <option value="pending">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option>
                </select>
              </label>
            </div>
            <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-active">
              <FiSave /> Save task details
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <div className="flex items-start justify-between gap-3">
            <div><h2 className="text-heading">Checklist</h2><p className="mt-1 text-sm text-ink-muted">{doneCount} of {checklist.length} items complete</p></div>
            <span className="text-lg font-semibold text-brand-700">{progress}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-100">
            <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-5 flex gap-2">
            <input disabled placeholder="Add a checklist item" className={`${inputStyle} min-w-0`} />
            <button type="button" aria-label="Add checklist item" className="grid shrink-0 place-items-center rounded-xl bg-brand-700 px-4 text-white hover:bg-brand-900"><FiPlus /></button>
          </div>
          {/* Practice: add checklist item, completion toggle, removal, and save behavior here. */}
          <ul className="mt-4 space-y-2">
            {checklist.map((item) => (
              <li key={item.text} className="flex items-center gap-3 rounded-xl border border-line-soft bg-white px-3 py-3">
                <input type="checkbox" checked={item.completed} readOnly aria-label={`Mark ${item.text}`} className="size-4 accent-brand-600" />
                <span className={`min-w-0 flex-1 text-sm ${item.completed ? "text-ink-faint line-through" : "text-ink"}`}>{item.text}</span>
                <button type="button" aria-label={`Remove ${item.text}`} className="text-ink-faint hover:text-red-600"><FiX /></button>
              </li>
            ))}
          </ul>
          <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            <FiSave /> Save checklist
          </button>
        </section>
      </div>
    </main>
  );
}
