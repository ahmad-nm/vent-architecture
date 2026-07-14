import { getDashboardStats } from "@/api/dashboard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { containerVariants, itemVariants } from "@/animations/variants";
import { formatDate } from "@/utils/helperFunctions";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchStats();
    }, []);

    const metricsData = [
        {
            id: 1,
            icon: "📊",
            label: "Total Projects",
            value: stats?.total_projects || 0,
            color: "from-blue-600 to-blue-400",
        },
        {
            id: 2,
            icon: "🖼️",
            label: "Gallery Images",
            value: stats?.total_images || 0,
            color: "from-purple-600 to-purple-400",
        },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metricsData.map((metric, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, translateY: -8 }}
                        className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
                    >
                        {/* Background gradient */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                        ></div>

                        {/* Border */}
                        <div className="absolute inset-0 rounded-2xl border border-slate-700 group-hover:border-slate-600 transition-colors"></div>

                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-slate-400 text-sm font-medium mb-3">
                                    {metric.label}
                                </p>
                                <h3 className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    {metric.value}
                                </h3>
                            </div>
                            <div className="ml-6 text-6xl opacity-60 group-hover:opacity-100 transition-opacity group-hover:scale-110 transition-transform">
                                {metric.icon}
                            </div>
                        </div>

                        {/* Accent line */}
                        <div
                            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                        ></div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latest Uploads */}
                <motion.div
                    variants={itemVariants}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>📸</span> Latest Uploads
                        </h3>
                        <a
                            href="/admin/projects"
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            View all →
                        </a>
                    </div>

                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-slate-500">Loading...</p>
                            </div>
                        ) : stats?.latest_uploads?.length > 0 ? (
                            stats.latest_uploads.map((upload, idx) => (
                                <motion.div
                                    key={upload.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer group"
                                >
                                    {/* Image Thumbnail */}
                                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={resolveImageUrl(upload.image_path)}
                                            alt={upload.project_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm truncate">
                                            {upload.project_name}
                                        </p>
                                        <p className="text-slate-500 text-xs">Image uploaded</p>
                                    </div>
                                    <p className="text-slate-500 text-xs whitespace-nowrap">
                                        {formatDate(upload.uploaded_at)}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-center py-8">No uploads yet</p>
                        )}
                    </div>
                </motion.div>

                {/* Latest Edits */}
                <motion.div
                    variants={itemVariants}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>✏️</span> Latest Edits
                        </h3>
                        <a
                            href="/admin/projects"
                            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            View all →
                        </a>
                    </div>

                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-slate-500">Loading...</p>
                            </div>
                        ) : stats?.latest_edits?.length > 0 ? (
                            stats.latest_edits.map((edit, idx) => (
                                <motion.div
                                    key={edit.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {edit.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm truncate">
                                            {edit.name}
                                        </p>
                                        <p className="text-slate-500 text-xs">Project updated</p>
                                    </div>
                                    <p className="text-slate-500 text-xs whitespace-nowrap">
                                        {formatDate(edit.edited_at)}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-center py-8">No edits yet</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}