import api from "@/api/axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdminProjectCard from "@/components/admin/projects/AdminProjectCard";
import { containerVariants } from "@/animations/variants";
import { getAdminProjects } from "@/api/adminProject";

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const fetchProjects = async () => {
            try {
                const response = await getAdminProjects();
                console.log("Fetched projects:", response);
                setProjects(Array.isArray(response) ? response : response || []);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleDeleteProject = (projectId) => {
        setProjects(projects.filter((p) => p.id !== projectId));
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Manage all your projects
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/admin/projects/create")}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all cursor-pointer"
                >
                    ➕ Add Project
                </motion.button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-400">Loading projects...</p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && projects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-slate-800/30 border border-slate-700 rounded-2xl"
                >
                    <p className="text-4xl mb-4">📭</p>
                    <p className="text-slate-400 mb-4">No projects found</p>
                    <motion.button
                        whileHover={{ scale: 0.95 }}
                        onClick={() => navigate("/admin/projects/create")}
                        whileTap={{ scale: 0.9 }}
                        className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 font-medium rounded-lg transition-all cursor-pointer"
                    >
                        Create your first project
                    </motion.button>
                </motion.div>
            )}

            {/* Projects Grid */}
            {!loading && projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <AdminProjectCard
                                project={project}
                                onDelete={handleDeleteProject}
                            />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Stats Footer */}
            {!loading && projects.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center pt-8 border-t border-slate-700"
                >
                    <p className="text-slate-400 text-sm">
                        Showing{" "}
                        <span className="font-semibold text-white">{projects.length}</span>{" "}
                        project{projects.length !== 1 ? "s" : ""}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
