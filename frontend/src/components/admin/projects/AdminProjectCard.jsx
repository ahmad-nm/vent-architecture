import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteProject } from "@/api/adminProject";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

export default function AdminProjectCard({ project, onDelete }) {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const getProjectTypeColor = (type) => {
        const colors = {
            residential: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            commercial: "bg-purple-500/20 text-purple-300 border-purple-500/30",
            industrial: "bg-orange-500/20 text-orange-300 border-orange-500/30",
            mixed: "bg-pink-500/20 text-pink-300 border-pink-500/30",
            default: "bg-slate-500/20 text-slate-300 border-slate-500/30",
        };
        return colors[type?.toLowerCase()] || colors.default;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleEdit = () => {
        navigate(`/admin/projects/${project.id}/edit`);
    };

    const handleView = () => {
        navigate(`/projects/${project.id}`);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project?")) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteProject(project.id);

            // Show success message
            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: { type: "success", message: "Project deleted successfully!" },
                }),
            );

            // Call parent callback to refresh list
            if (onDelete) {
                onDelete(project.id);
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: { type: "error", message: "Failed to delete project" },
                }),
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const imageCount = project.images?.length || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300"
        >
            {/* Main Image Container */}
            <div className="relative h-48 overflow-hidden bg-slate-900">
                {project.main_image ? (
                    <img
                        src={resolveImageUrl(project.main_image)}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🖼️</span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Image Count Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                    📸 {imageCount}
                </div>

                {/* Project Type Badge */}
                <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getProjectTypeColor(project.project_type)}`}
                >
                    {project.project_type || "Project"}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-4">
                {/* Project Name */}
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                        {project.name}
                    </h3>
                </div>

                {/* Description */}
                {project.description && (
                    <p className="text-sm text-slate-400 line-clamp-2 hover:line-clamp-none">
                        {project.description}
                    </p>
                )}

                {/* Location and Date */}
                <div className="space-y-2 pt-2 border-t border-slate-700">
                    {project.location && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">📍</span>
                            <span className="text-slate-400">{project.location}</span>
                        </div>
                    )}
                    {project.date && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">📅</span>
                            <span className="text-slate-400">{formatDate(project.date)}</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <motion.button
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleEdit}
                        className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium transition-all cursor-pointer"
                        title="Edit project"
                    >
                        ✏️ Edit
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleView}
                        className="flex-1 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-medium transition-all cursor-pointer"
                        title="View details"
                    >
                        👁️ View
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        title="Delete project"
                    >
                        {isDeleting ? "⏳ Deleting..." : "🗑️ Delete"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
