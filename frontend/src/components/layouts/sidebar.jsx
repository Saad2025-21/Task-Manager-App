import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiGrid,
  FiCheckSquare,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";

// "bar"  = left accent bar + bold label + colored icon (matches the Donezo reference)
// "pill" = filled gradient pill (matches the Tasko reference)
const ACTIVE_STYLE = "bar";

// taskCount is optional: pass the real number from your app, e.g. <Sidebar taskCount={tasks.length} />
export default function Sidebar({ taskCount = 6 }) {
  const [isOpen, setIsOpen] = useState(false);

  // Same items and paths as before; "section" and "showBadge" are new, for grouping and the count badge.
  const navItems = [
    {
      label: "Dashboard",
      icon: <FiGrid />,
      path: "/admin/dashboard",
      section: "MENU",
    },
    {
      label: "Tasks",
      icon: <FiCheckSquare />,
      path: "/admin/tasks",
      section: "MENU",
      showBadge: true,
    },
    {
      label: "Create Task",
      icon: <FiPlusCircle />,
      path: "/admin/create-task",
      section: "MENU",
    },
    {
      label: "Logout",
      icon: <FiLogOut />,
      path: "/logout",
      section: "GENERAL",
    },
  ];

  const sections = ["MENU", "GENERAL"];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isBar = ACTIVE_STYLE === "bar";

  return (
    <>
      {/* --- Mobile Hamburger Button --- */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-surface shadow-card border border-line text-ink-muted hover:text-brand-600 transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* --- Mobile Overlay  --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* --- Sidebar Container --- */}
      <aside
        className={`
                 fixed inset-y-3 left-3 z-40 flex w-55 shrink-0 flex-col rounded-2xl bg-neutral-100 px-4 pb-4 pt-6 shadow-xl
        transition-transform duration-300 ease-in-out
        lg:static lg:inset-auto lg:h-full lg:shrink-0 lg:translate-x-0 lg:shadow-none
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        {/* Branding Section */}
                <div className="flex items-center gap-3 px-0 mt-10 lg:mt-0 mb-6">
                    <span className="grid place-items-center size-[2rem] rounded-pill bg-brand-gradient shrink-0">
                        <svg viewBox="0 0 24 24" className="size-6 text-white" fill="currentColor" aria-hidden="true">
                            <ellipse cx="8.3" cy="10" rx="2.3" ry="3" />
                            <ellipse cx="15.7" cy="10" rx="2.3" ry="3" />
                            <path d="M9 16.2c.9.7 1.9 1 3 1s2.1-.3 3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                        </svg>
                    </span>
                    <h1 className="text-[1rem] font-medium text-ink pl-[5px]">TaskManager</h1>
                </div>

        {/* Navigation Links, grouped by section */}
        <nav className="flex flex-col gap-5">
                    {sections.map((section) => (
                        <div key={section}>
                            <p className="px-0 mb-2 text-tiny uppercase font-medium text-ink-muted">
                                {section}
                            </p>

                            <div className="flex flex-col gap-0.5">
                                {navItems
                                    .filter((item) => item.section === section)
                                    .map((item) => (
                                        <NavLink
                                            key={item.label}
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `relative flex items-center gap-[2rem] px-3.5 h-nav text-body transition-all duration-200
                                                ${isBar ? "rounded-md" : "rounded-pill"}
                                                ${isActive
                                                    ? isBar
                                                        ? "text-ink font-semibold"
                                                        : "bg-brand-gradient text-white font-semibold shadow-active"
                                                    : "font-medium text-ink-muted hover:bg-brand-50 hover:text-ink"
                                                }`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {isBar && isActive && (
                                                        <span className="absolute -left-4 top-1 bottom-1 w-1 rounded-r-pill bg-brand-gradient-v" />
                                                    )}

                                                    <span className={`text-lg shrink-0 ${isBar && isActive ? "text-brand-600" : ""}`}>
                                                        {item.icon}
                                                    </span>
                                                    <span className="flex-1">{item.label}</span>

                                                    {item.showBadge && (
                                                        <span
                                                            className={`min-w-6 px-2 py-0.5 text-tiny font-bold text-center text-white
                                                            ${isBar ? "rounded-sm bg-brand-700" : "rounded-pill"}
                                                            ${!isBar && (isActive ? "bg-white/25" : "bg-brand-300")}`}
                                                        >
                                                            {taskCount}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </NavLink>
                                    ))}
                            </div>
                        </div>
                    ))}
                </nav>
      </aside>
    </>
  );
}
