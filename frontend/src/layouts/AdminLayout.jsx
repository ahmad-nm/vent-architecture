import { Outlet, Link, useLocation } from "react-router-dom";
import { logout } from "@/api/auth";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error:", err);
        }

        window.location.href = "/login";
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: "Dashboard", path: "/admin", icon: "📊" },
        { label: "Projects", path: "/admin/projects", icon: "📁" },
        { label: "View Site", path: "/", icon: "🌐" },
    ];

    return (
        <div className="flex h-full bg-slate-950 text-slate-50">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col overflow-hidden"
            >
                {/* Logo Section */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col"
                        >
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Admin
                            </h1>
                            <p className="text-xs text-slate-500">Management Panel</p>
                        </motion.div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title={sidebarOpen ? "Collapse" : "Expand"}
                    >
                        {sidebarOpen ? (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={!sidebarOpen ? item.label : ""}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {sidebarOpen && (
                                <span className="font-medium text-sm">{item.label}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-slate-800">
                    <motion.button
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer ${!sidebarOpen ? "justify-center" : ""
                            }`}
                        title={!sidebarOpen ? "Logout" : ""}
                    >
                        <span className="text-lg">🚪</span>
                        {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
                    </motion.button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Top Bar */}
                <div className="bg-slate-900/50 border-b border-slate-800 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-50">
                            {navItems.find((item) => isActive(item.path))?.label ||
                                "Dashboard"}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Welcome back to your administration panel
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer hover:scale-95 active:scale-90"
                        >
                            Logout
                        </button>

                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
