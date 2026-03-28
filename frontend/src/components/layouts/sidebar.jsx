import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiGrid, FiCheckSquare, FiPlusCircle, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    
    const navItems = [
        { label: "Dashboard", icon: <FiGrid />, path: "/admin/dashboard" },
        { label: "Manage Tasks", icon: <FiCheckSquare />, path: "/admin/tasks" },
        { label: "Create Task", icon: <FiPlusCircle />, path: "/admin/create-task" },
        { label: "Logout", icon: <FiLogOut />, path: "/logout" },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* --- Mobile Hamburger Button --- */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* --- Mobile Overlay  --- */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* --- Sidebar Container --- */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 gap-2 shadow-xl transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:w-56 lg:shadow-sm
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                
                {/* Branding Section */}
                <div className="flex flex-col items-start mb-10 px-2">
                    <h1 className="text-xl font-extrabold uppercase bg-gradient-to-br from-violet-600 to-cyan-500 bg-clip-text text-transparent tracking-wider">
                        TaskManager
                    </h1>
                    <span className="text-gray-400 text-xs font-semibold mt-1 tracking-tight">
                        EFFICIENT WORKFLOW
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1.5">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            onClick={() => setIsOpen(false)} 
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-500 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
