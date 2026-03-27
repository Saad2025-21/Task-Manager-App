import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {


    const navItems = [
        { label: "Dashboard", icon: "⊞", path: "/admin/dashboard" },
        { label: "Manage Tasks", icon: "☐", path: "/admin/tasks" },
        { label: "Create Task", icon: "⊕", path: "/admin/create-task" },
        { label: "Logout", icon: "→", path: "/logout" },
    ];

    const location = useLocation();
    return (

        <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-8 px-4 gap-2 shadow-sm">
            {/* Profile */}
            <div className="flex flex-col items-start mb-8 ">

                {/* Logo */}
                <h1 className="text-1xl font-extrabold uppercase bg-gradient-to-br from-violet-500 to-cyan-400 bg-clip-text text-transparent tracking-wider 
                 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.7)] hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]">
                    TaskManager
                </h1>

                {/* Tagline */}
                <span className="text-gray-500 text-sm font-medium mt-1">
                    Organize your tasks efficiently
                </span>

            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
    ${isActive
                                ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            }`
                        }
                    >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>

    );
}