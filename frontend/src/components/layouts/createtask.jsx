import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

const fieldClass = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-sm font-medium text-ink-muted";

export default function CreateTaskForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium", status: "pending" });
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignee, setAssignee] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [assigneeError, setAssigneeError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoadingUsers(true);
    axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : data?.users;
        if (!Array.isArray(list)) throw new Error("The users response was not a list.");
        if (!cancelled) setUsers(list);
      })
      .catch((requestError) => {
        if (!cancelled) setAssigneeError(requestError.response?.data?.message || "Assignee list is unavailable; the task can still be created without selecting a team member.");
      })
      .finally(() => { if (!cancelled) setLoadingUsers(false); });
    return () => { cancelled = true; };
  }, []);

  const addTodo = () => {
    const text = todoInput.trim();
    if (!text) return;
    setTodos((current) => [...current, { id: `${Date.now()}-${current.length}`, text, completed: false }]);
    setTodoInput("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        todochecklist: todos.map(({ text, completed }) => ({ text, completed })),
        ...(assignee.length ? { assignee } : {}),
      };
      const { data } = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, payload);
      const createdTask = data?.Tasks || data?.task;
      const createdId = createdTask?._id || createdTask?.id;
      navigate(createdId ? `/admin/taskdetail/${createdId}` : "/admin/tasks", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create this task. Please check the details and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-4xl flex-col gap-5 rounded-2xl bg-white p-5 shadow-card sm:p-8">
      <button type="button" onClick={() => navigate("/admin/tasks")} className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand-700"><FiArrowLeft /> Back to tasks</button>
      <header><p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">New work item</p><h1 className="mt-1 text-title text-brand-700">Create a task</h1><p className="mt-1 text-small text-ink-muted">Add the important details and make ownership clear.</p></header>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="space-y-4">
          <label className="block"><span className={labelClass}>Task title</span><input required maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Prepare launch checklist" className={fieldClass} /></label>
          <label className="block"><span className={labelClass}>Description</span><textarea rows={6} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Add context, links, or what done looks like..." className={`${fieldClass} resize-y`} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={labelClass}>Priority</span><select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className={fieldClass}><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="block"><span className={labelClass}>Initial status</span><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className={fieldClass}><option value="pending">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></label>
          </div>
          <label className="block"><span className={labelClass}>Assign to team members</span><select multiple value={assignee} onChange={(event) => setAssignee(Array.from(event.target.selectedOptions, (option) => option.value))} disabled={loadingUsers} className={`${fieldClass} min-h-28`}>
            {users.map((user) => <option key={user._id || user.id} value={user._id || user.id}>{user.username || user.name || user.email}</option>)}
          </select><span className="mt-1.5 block text-xs text-ink-faint">{loadingUsers ? "Loading team..." : "Hold Ctrl (Windows) or Command (Mac) to select multiple members. Leave blank to use the default assignee."}</span>
          {assigneeError && <span className="mt-2 block text-xs text-amber-700">{assigneeError}</span>}</label>
        </section>
        <section className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
          <h2 className="text-heading">Checklist</h2><p className="mt-1 text-sm text-ink-muted">Break this task into clear next steps.</p>
          <div className="mt-4 flex gap-2"><input value={todoInput} onChange={(event) => setTodoInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addTodo(); } }} placeholder="Add checklist item" className={`${fieldClass} min-w-0`} /><button type="button" onClick={addTodo} aria-label="Add checklist item" className="grid shrink-0 place-items-center rounded-xl bg-brand-700 px-4 text-white hover:bg-brand-900"><FiPlus /></button></div>
          {todos.length ? <ul className="mt-4 space-y-2">{todos.map((todo) => <li key={todo.id} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3"><span className="min-w-0 flex-1 text-sm">{todo.text}</span><button type="button" onClick={() => setTodos((current) => current.filter((item) => item.id !== todo.id))} aria-label={`Remove ${todo.text}`} className="text-ink-faint hover:text-red-600"><FiTrash2 /></button></li>)}</ul> : <div className="mt-4 rounded-xl border border-dashed border-brand-200 bg-white/70 px-3 py-8 text-center text-sm text-ink-faint">No checklist items added.</div>}
        </section>
      </div>
      <footer className="flex flex-col-reverse justify-end gap-2 border-t border-line-soft pt-5 sm:flex-row">
        <button type="button" onClick={() => navigate("/admin/tasks")} className="rounded-xl px-5 py-3 text-sm font-medium text-ink-muted hover:bg-surface">Cancel</button>
        <button disabled={saving} className="rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-active transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60">{saving ? "Creating task..." : "Create task"}</button>
      </footer>
    </form>
  );
}
