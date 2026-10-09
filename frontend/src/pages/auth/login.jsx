import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiLock } from "react-icons/fi";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, form);
      if (!data?.token || !data?.role) {
        throw new Error("The server response did not include a session token and role.");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.rest) localStorage.setItem("user", JSON.stringify(data.rest));
      navigate(data.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f4] p-4 sm:p-8 flex items-center justify-center">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-brand-gradient p-12 text-white lg:flex">
          <div className="absolute -right-24 -top-20 size-80 rounded-full border border-white/15" />
          <div className="absolute -bottom-40 -left-24 size-[420px] rounded-full border border-white/15" />
          <div className="relative flex items-center gap-3 text-xl font-semibold">
            <span className="grid size-10 place-items-center rounded-xl bg-white/15">✓</span>Taskflow
          </div>
          <div className="relative max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-white/70">A calmer way to work</p>
            <h1 className="text-4xl font-semibold leading-tight">Make room for the work that matters.</h1>
            <p className="mt-5 leading-7 text-white/75">Bring your projects, priorities, and people together in one clear workspace.</p>
            <div className="mt-8 space-y-3 text-sm text-white/90">
              {["Know what needs attention", "Keep every task moving", "Celebrate progress as a team"].map((item) => (
                <p key={item} className="flex items-center gap-2"><FiCheckCircle />{item}</p>
              ))}
            </div>
          </div>
          <p className="relative text-xs text-white/60">Your workspace, right where you left it.</p>
        </section>
        <section className="flex items-center px-6 py-12 sm:px-12 lg:px-14">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-9 lg:hidden">
              <div className="mb-6 grid size-11 place-items-center rounded-2xl bg-brand-gradient text-xl font-bold text-white">T</div>
              <p className="text-sm font-semibold text-brand-700">TASKFLOW WORKSPACE</p>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[.15em] text-brand-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Sign in to Taskflow</h2>
            <p className="mt-2 text-small text-ink-muted">Enter your details to continue to your workspace.</p>
            {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-ink">
                Email address
                <input type="email" required autoComplete="email" value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
              </label>
              <label className="block text-sm font-medium text-ink">
                Password
                <div className="relative mt-2">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                  <input type={showPassword ? "text" : "password"} required autoComplete="current-password"
                    value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-line py-3 pl-11 pr-16 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-600">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>
              <button disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-active transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70">
                {isSubmitting ? "Signing in..." : "Sign in"} {!isSubmitting && <FiArrowRight />}
              </button>
            </form>
            <p className="mt-7 text-center text-sm text-ink-muted">New to Taskflow? <Link to="/signup" className="font-semibold text-brand-600 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
