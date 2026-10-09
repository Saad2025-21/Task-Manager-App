import { useEffect, useState } from "react";
import { FiMail, FiPlus, FiSearch, FiTrash2, FiUser, FiX } from "react-icons/fi";
import Sidebar from "../../components/layouts/sidebar";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

const emptyForm = { name: "", email: "", password: "" };

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      const list = Array.isArray(data) ? data : data?.users;
      if (!Array.isArray(list)) throw new Error("The users response was not a list.");
      setUsers(list);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not load people.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const openUser = async (id) => {
    setError("");
    try {
      const { data } = await axiosInstance.get(API_PATHS.USERS.GET_USER_BY_ID(id));
      setSelectedUser(data?.user || data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not load this user.");
    }
  };

  const createUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await axiosInstance.post(API_PATHS.USERS.CREATE_USER, form);
      setShowCreate(false);
      setForm(emptyForm);
      setNotice("Team member created.");
      await loadUsers();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create team member.");
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async () => {
    if (!pendingDelete) return;
    setError("");
    try {
      await axiosInstance.delete(API_PATHS.USERS.DELETE_USER(pendingDelete._id || pendingDelete.id));
      setUsers((current) => current.filter((user) => (user._id || user.id) !== (pendingDelete._id || pendingDelete.id)));
      setNotice("Team member removed.");
      setPendingDelete(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not remove this team member.");
      setPendingDelete(null);
    }
  };

  const visibleUsers = users.filter((user) => `${user.username || user.name || ""} ${user.email || ""}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto font-sans text-ink">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">Workspace</p><h1 className="mt-1 text-title text-brand-700">People</h1><p className="mt-1 text-small text-ink-muted">Manage your team and see task progress at a glance.</p></div>
          <button onClick={() => { setShowCreate(true); setNotice(""); }} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-active transition hover:brightness-105"><FiPlus /> Add member</button>
        </header>
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <article className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card"><p className="text-sm text-ink-muted">Team members</p><p className="mt-3 text-stat text-brand-700">{users.length}</p></article>
          <article className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card"><p className="text-sm text-ink-muted">Tasks in progress</p><p className="mt-3 text-stat text-brand-700">{users.reduce((sum, user) => sum + Number(user.inProgressTask || user.inprogressTask || 0), 0)}</p></article>
          <article className="col-span-2 rounded-2xl border border-brand-100 bg-white p-5 shadow-card lg:col-span-1"><p className="text-sm text-ink-muted">Completed tasks</p><p className="mt-3 text-stat text-brand-700">{users.reduce((sum, user) => sum + Number(user.completedTask || 0), 0)}</p></article>
        </section>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">{notice}</p>}
        <section className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card">
          <div className="flex flex-col gap-3 border-b border-line-soft p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div><h2 className="font-semibold">Team members</h2><p className="mt-1 text-xs text-ink-muted">Select a member to view their account details.</p></div>
            <label className="relative block w-full sm:max-w-xs"><FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people..." className="w-full rounded-xl border border-line py-2.5 pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100" /></label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-brand-50/70 text-xs uppercase tracking-wider text-ink-muted"><tr><th className="px-6 py-3 font-semibold">Member</th><th className="px-6 py-3 font-semibold">To do</th><th className="px-6 py-3 font-semibold">In progress</th><th className="px-6 py-3 font-semibold">Completed</th><th className="px-6 py-3 text-right font-semibold">Action</th></tr></thead>
              <tbody className="divide-y divide-line-soft">
                {loading ? <tr><td colSpan="5" className="px-6 py-12 text-center text-ink-muted">Loading team...</td></tr> : visibleUsers.length ? visibleUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-brand-50/40">
                    <td className="px-6 py-4"><button onClick={() => openUser(user._id || user.id)} className="flex items-center gap-3 text-left">
                      <span className="grid size-10 place-items-center rounded-full bg-brand-100 font-semibold text-brand-700">{(user.username || user.name || "?").slice(0, 1).toUpperCase()}</span>
                      <span><span className="block font-semibold text-ink">{user.username || user.name || "Unnamed member"}</span><span className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted"><FiMail />{user.email}</span></span>
                    </button></td>
                    <td className="px-6 py-4 text-ink-muted">{user.pendingTask ?? 0}</td><td className="px-6 py-4 text-ink-muted">{user.inProgressTask ?? user.inprogressTask ?? 0}</td><td className="px-6 py-4 text-ink-muted">{user.completedTask ?? 0}</td>
                    <td className="px-6 py-4 text-right"><button onClick={() => setPendingDelete(user)} aria-label={`Remove ${user.username || user.name}`} className="rounded-lg p-2 text-ink-faint transition hover:bg-red-50 hover:text-red-600"><FiTrash2 /></button></td>
                  </tr>
                )) : <tr><td colSpan="5" className="px-6 py-12 text-center text-ink-muted">{users.length ? "No people match your search." : "No team members yet. Add someone to get started."}</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {(showCreate || selectedUser || pendingDelete) && <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowCreate(false); setSelectedUser(null); setPendingDelete(null); } }}>
        <section role="dialog" aria-modal="true" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-modal">
          <div className="mb-5 flex items-start justify-between"><div><p className="text-tiny font-semibold uppercase tracking-wider text-brand-600">{showCreate ? "Add to your team" : pendingDelete ? "Remove member" : "Member details"}</p><h2 className="mt-1 text-xl font-semibold">{showCreate ? "Create member" : pendingDelete ? "Are you sure?" : "Profile"}</h2></div><button onClick={() => { setShowCreate(false); setSelectedUser(null); setPendingDelete(null); }} aria-label="Close dialog" className="rounded-lg p-2 text-ink-muted hover:bg-brand-50"><FiX /></button></div>
          {showCreate && <form onSubmit={createUser} className="space-y-4">
            <label className="block text-sm font-medium">Full name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100" /></label>
            <label className="block text-sm font-medium">Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100" /></label>
            <label className="block text-sm font-medium">Temporary password<input required type="password" minLength={6} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100" /></label>
            <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface">Cancel</button><button disabled={saving} className="rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Creating..." : "Create member"}</button></div>
          </form>}
          {selectedUser && <div className="space-y-4"><div className="flex items-center gap-3 rounded-xl bg-brand-50 p-4"><span className="grid size-11 place-items-center rounded-full bg-brand-100 text-brand-700"><FiUser /></span><div><p className="font-semibold">{selectedUser.username || selectedUser.name}</p><p className="text-sm text-ink-muted">{selectedUser.email}</p></div></div><p className="text-sm text-ink-muted">Role <span className="float-right font-medium capitalize text-ink">{selectedUser.role || "user"}</span></p><button onClick={() => setSelectedUser(null)} className="w-full rounded-xl bg-brand-gradient py-3 text-sm font-semibold text-white">Done</button></div>}
          {pendingDelete && <div><p className="text-sm leading-6 text-ink-muted">This will remove <span className="font-semibold text-ink">{pendingDelete.username || pendingDelete.name || pendingDelete.email}</span> from the team. This action cannot be undone.</p><div className="mt-6 flex justify-end gap-2"><button onClick={() => setPendingDelete(null)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface">Cancel</button><button onClick={deleteUser} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Remove member</button></div></div>}
        </section>
      </div>}
    </div>
  );
}
