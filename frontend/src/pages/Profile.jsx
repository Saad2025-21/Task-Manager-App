import { FiMail, FiShield, FiUser } from "react-icons/fi";
import Sidebar from "../components/layouts/sidebar";
import { useEffect, useState } from "react";
import axiosInstance from "../utilis/axiosinstance";
import { API_PATHS } from "../utilis/apipath";

export default function Profile() {
  const [dashboardData, setdashboardData] = useState(null);
  const [error, seterror] = useState("");

  useEffect(() => {
    let cancelled = false;
    axiosInstance
      .get(API_PATHS.AUTH.GET_PROFILE)
      .then(({ data }) => {
        if (!cancelled) setdashboardData(data);
      })
      .catch((requestError) => {
        if (!cancelled)
          seterror(
            requestError.response?.data?.message ||
              "Could not load the Profile. Check your connection and try again.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const profile = dashboardData?.rest;
  console.log(profile);
  return (
    <div className="display">
      <Sidebar />
      <main className="content-glow flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto font-sans text-ink">
        <header>
          <p className="text-tiny font-semibold uppercase tracking-[.16em] text-brand-600">
            Account
          </p>
          <h1 className="mt-1 text-title text-brand-700">Your profile</h1>
          <p className="mt-1 text-small text-ink-muted">
            Your account details and workspace access.
          </p>
        </header>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {!profile && !error && (
          <p className="text-sm text-ink-muted">Loading your profile...</p>
        )}
        {profile && (
          <section className="max-w-2xl overflow-visible rounded-2xl border border-brand-100 bg-white shadow-card">
            <div className="bg-brand-gradient px-6 py-8 text-white sm:px-8">
              <span className="grid size-16 place-items-center rounded-2xl bg-white/15 text-2xl font-semibold">
                {(profile.username || "?").slice(0, 1).toUpperCase()}
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                {profile.username}
              </h2>
              <p className="mt-1 text-sm capitalize text-white/75">
                {profile.role}
              </p>
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex items-center gap-4 rounded-xl bg-brand-50/70 p-4">
                <span className="text-brand-600">
                  <FiUser />
                </span>
                <div>
                  <p className="text-xs text-ink-muted">Full name</p>
                  <p className="mt-1 font-medium">{profile.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-brand-50/70 p-4">
                <span className="text-brand-600">
                  <FiMail />
                </span>
                <div>
                  <p className="text-xs text-ink-muted">Email address</p>
                  <p className="mt-1 font-medium">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-brand-50/70 p-4">
                <span className="text-brand-600">
                  <FiShield />
                </span>
                <div>
                  <p className="text-xs text-ink-muted">Access level</p>
                  <p className="mt-1 font-medium capitalize">{profile.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
