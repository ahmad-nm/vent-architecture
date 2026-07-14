import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminProjectForm from "@/components/admin/projects/AdminProjectForm";
import GalleryManager from "@/components/admin/projects/GalleryManager";
import {
    getAdminProjectById,
    createProject,
    updateProject,
} from "@/api/adminProject";
import { containerVariants, itemVariants } from "@/animations/variants";

export default function AdminProjectCreateEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(!!id); // Only load if editing
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const data = await getAdminProjectById(id);
            setProject(data);
        } catch (err) {
            console.error("Error fetching project:", err);
            setError("Failed to load project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);
            setError(null);

            if (isEditMode) {
                await updateProject(id, formData);
                // Show success message
                window.dispatchEvent(
                    new CustomEvent("toast", {
                        detail: {
                            type: "success",
                            message: "Project updated successfully!",
                        },
                    }),
                );
                // Stay on edit page
                fetchProject();
            } else {
                const createdProject = await createProject(formData);
                // Show success message
                window.dispatchEvent(
                    new CustomEvent("toast", {
                        detail: {
                            type: "success",
                            message: "Project created successfully! Now add gallery images.",
                        },
                    }),
                );
                // Redirect to edit page (now user can add gallery images)
                setTimeout(() => {
                    navigate(`/admin/projects/${createdProject.id}/edit`);
                }, 800);
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setError(
                err.response?.data?.message ||
                "Failed to save project. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Loading state for fetching project
    if (isEditMode && loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading project...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-3 text-slate-400 mb-4">
                    <button
                        onClick={() => navigate("/admin/projects")}
                        className="hover:text-white transition-colors cursor-pointer"
                    >
                        ← Back
                    </button>
                    <span>/</span>
                    <span>{isEditMode ? "Edit Project" : "Create Project"}</span>
                </div>
                <h1 className="text-3xl font-bold text-white">
                    {isEditMode ? "✏️ Edit Project" : "➕ Create New Project"}
                </h1>
                <p className="text-slate-400 text-sm">
                    {isEditMode
                        ? "Update your project information and images"
                        : "Add a new project to your portfolio"}
                </p>
            </motion.div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center gap-3"
                >
                    <span>⚠️</span>
                    <span>{error}</span>
                </motion.div>
            )}

            {/* Form */}
            <AdminProjectForm
                initialData={project}
                onSubmit={handleSubmit}
                loading={submitting}
            />

            {/* Gallery Manager - Only in Edit Mode */}
            {isEditMode && project && (
                <GalleryManager
                    projectId={project.id}
                    images={project.images || []}
                    projectType={project.project_type}
                />
            )}
        </motion.div>
    );
}
