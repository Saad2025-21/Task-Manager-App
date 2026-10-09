import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.SignUP, form);
      setMessage(data?.message || "Your account is ready. Sign in to continue.");
      setTimeout(() => navigate("/"), 900);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f4] p-4 sm:p-8 flex items-center justify-center">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-xl lg:grid-cols-[.95fr_1.05fr]">
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-brand-gradient p-12 text-white lg:flex">
          <div className="flex items-center gap-3 text-xl font-semibold"><span className="grid size-10 place-items-center rounded-xl bg-white/15">✓</span>Taskflow</div>
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-white/70">Start with clarity</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">A better rhythm for your team starts here.</h1>
            <p className="mt-5 leading-7 text-white/75">Create a workspace to organize tasks, make progress visible, and keep everyone moving together.</p>
          </div>
          <p className="text-xs text-white/60">Simple planning. Meaningful progress.</p>
        </section>
        <section className="flex items-center px-6 py-12 sm:px-12 lg:px-14">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-9 lg:hidden"><div className="mb-6 grid size-11 place-items-center rounded-2xl bg-brand-gradient text-xl font-bold text-white">T</div><p className="text-sm font-semibold text-brand-700">TASKFLOW WORKSPACE</p></div>
            <p className="text-sm font-semibold uppercase tracking-[.15em] text-brand-600">Get started</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Create your account</h2>
            <p className="mt-2 text-small text-ink-muted">A few details and you’ll be ready to plan.</p>
            {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            {message && <p role="status" className="mt-5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">{message}</p>}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-ink">Full name
                <input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name" className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
              </label>
              <label className="block text-sm font-medium text-ink">Email address
                <input type="email" required autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@company.com" className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
              </label>
              <label className="block text-sm font-medium text-ink">Password
                <input type="password" required minLength={6} autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="At least 6 characters" className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
              </label>
              <button disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-active transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70">
                {isSubmitting ? "Creating account..." : "Create account"} {!isSubmitting && <FiArrowRight />}
              </button>
            </form>
            <p className="mt-7 text-center text-sm text-ink-muted">Already have an account? <Link to="/" className="font-semibold text-brand-600 hover:underline">Sign in</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
