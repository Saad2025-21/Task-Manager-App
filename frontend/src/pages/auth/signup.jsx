import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { SiTask } from "react-icons/si";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipath";
import { TypeAnimation } from "react-type-animation";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminJoinCode: "",
  });
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
      setMessage(
        data?.message || "Your account is ready. Sign in to continue.",
      );
      setTimeout(() => navigate("/"), 900);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (!error) return;
    if (!message) return;
    const id = setTimeout(() => setError(""), 500);
    return () => clearTimeout(id);
  }, [error, message]);
  return (
    <main className="min-h-screen bg-[#f4f7f4] p-4 flex items-center justify-center">
      <div className="grid lg:w-full w-[80vw] max-w-5xl overflow-visible h-[85vh] lg:h-[95vh] rounded-[28px] bg-white shadow-xl lg:grid-cols-[.95fr_1.05fr] ">
        {/* desktop */}
        <section className="relative hidden min-h-[580px]  h-[95vh] rounded-[28px] flex-col justify-between overflow-hidden bg-brand-gradient p-10 text-white lg:flex">
          <div className="absolute -right-24 -top-20 size-80 rounded-full border border-white/15" />
          <div className="absolute -bottom-40 -left-24 size-[420px] rounded-full border border-white/15" />
          <div className="relative flex items-center gap-3 text-xl font-semibold">
            <span className="grid size-10 place-items-center rounded-xl bg-white/15">
              <SiTask className="animate-pulse" />
            </span>
            Taskflow
          </div>
          <div className="relative max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-white/70">
              A calmer way to work
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Make room for the work that matters.
            </h1>
            <p className="mt-5 leading-7 text-white/75">
              Bring your projects, priorities, and people together in one clear
              workspace.
            </p>
            <div className="mt-7 space-y-3 text-sm text-white/90">
              {[
                "Know what needs attention",
                "Keep every task moving",
                "Celebrate progress as a team",
              ].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <FiCheckCircle />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <p className="relative text-xs text-white/60">
            Your workspace, right where you left it.
          </p>
        </section>
        {/* Mobile */}
        <section className="flex items-center px-6 py-11 sm:px-12 lg:px-14 h-full rounded-[28px]">
          <div className="mx-auto w-full max-w-sm h-full overflow-visible">
            <div className="mb-8 lg:hidden">
              <div className="mb-6 grid size-11 place-items-center rounded-2xl bg-brand-gradient text-xl font-bold text-white">
                <SiTask className="animate-pulse"/>
              </div>
              <p className="text-sm font-semibold text-brand-700">
                TASKFLOW WORKSPACE
              </p>
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
              <TypeAnimation
                sequence={["Get started", 1500, "Create Your Account", 1500]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-brand-600"
              />
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              A few details and you’ll be ready to plan.
            </p>
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            {message && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700"
              >
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit} className="mt-7 space-y-[18px]">
              <label className="block text-sm font-medium text-ink">
                Full name
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-[11px] text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Email address
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-[11px] text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Password
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  placeholder="At least 6 characters"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-[11px] text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                />
              </label>
              <fieldset className="mb-[12px] text-sm font-medium text-ink">
                <legend className="mb-2">Role</legend>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={form.role === "user"}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                    />
                    User
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={form.role === "admin"}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                    />
                    Admin
                  </label>
                  {form.role === "admin" && (
                    <input
                      type="password"
                      value={form.adminJoinCode}
                      onChange={(e) =>
                        setForm({ ...form, adminJoinCode: e.target.value })
                      }
                      className="m-0 w-[25vw] lg:w-[12vw]  rounded-[10px] border border-line p-[5px] text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                    />
                  )}
                </div>
              </fieldset>

              <button
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-[13px] text-sm font-semibold text-white shadow-active transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create account"}{" "}
                {!isSubmitting && <FiArrowRight />}
              </button>
              <p className="-mt-[10px] text-center text-sm text-ink-muted">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-brand-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
