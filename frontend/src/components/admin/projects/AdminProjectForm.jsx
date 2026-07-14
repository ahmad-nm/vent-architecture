import { useState } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

export default function AdminProjectForm({
    initialData = null,
    onSubmit,
    loading = false,
}) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        project_type: initialData?.project_type || "residential",
        location: initialData?.location || "",
        date: initialData?.date
            ? new Date(initialData.date).toISOString().split("T")[0]
            : "",
        main_image: null,
    });

    const [imagePreview, setImagePreview] = useState(
        initialData?.main_image || null,
    );
    const [errors, setErrors] = useState({});

    const projectTypes = [
        { value: "exterior", label: "🏠 Exterior" },
        { value: "interior", label: "🏠 Interior" },
        { value: "landscape", label: "🌳 Landscape" },
        { value: "mixed", label: "🔀 Mixed" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                main_image: file,
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Project name is required";
        }
        if (!formData.project_type) {
            newErrors.project_type = "Project type is required";
        }
        if (!formData.date) {
            newErrors.date = "Project date is required";
        }
        if (!initialData && !formData.main_image) {
            newErrors.main_image = "Main image is required for new projects";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitData = new FormData();
        submitData.append("name", formData.name);
        submitData.append("description", formData.description);
        submitData.append("project_type", formData.project_type);
        submitData.append("location", formData.location);
        submitData.append("date", formData.date);

        if (formData.main_image instanceof File) {
            submitData.append("main_image", formData.main_image);
        }

        await onSubmit(submitData);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Main Image Upload */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
            >
                <label className="block text-sm font-medium text-slate-300 mb-4">
                    Main Image
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Preview */}
                    <div className="flex flex-col items-center justify-center">
                        {imagePreview ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                <img
                                    src={resolveImageUrl(imagePreview)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData((prev) => ({ ...prev, main_image: null }));
                                    }}
                                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition-colors cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center bg-slate-900/30">
                                <p className="text-slate-400 text-center">
                                    <span className="text-3xl block mb-2">🖼️</span>
                                    No image selected
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Upload Area */}
                    <div className="flex flex-col justify-center">
                        <label
                            htmlFor="main_image"
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-500/30 rounded-xl bg-blue-500/5 cursor-pointer hover:border-blue-400/50 hover:bg-blue-500/10 transition-all"
                        >
                            <span className="text-4xl mb-2">📤</span>
                            <span className="text-sm font-medium text-blue-300">
                                Click to upload
                            </span>
                            <span className="text-xs text-slate-500 mt-2">
                                PNG, JPG, GIF up to 5MB
                            </span>
                        </label>
                        <input
                            id="main_image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {errors.main_image && (
                            <p className="text-red-400 text-sm mt-2">
                                ⚠️ {errors.main_image}
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Project Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter project name"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-1">⚠️ {errors.name}</p>
                    )}
                </motion.div>

                {/* Project Type */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <label
                        htmlFor="project_type"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Project Type *
                    </label>
                    <select
                        id="project_type"
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all appearance-none"
                    >
                        {projectTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {errors.project_type && (
                        <p className="text-red-400 text-sm mt-1">
                            ⚠️ {errors.project_type}
                        </p>
                    )}
                </motion.div>

                {/* Location */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter project location"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                </motion.div>

                {/* Date */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Project Date *
                    </label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                    {errors.date && (
                        <p className="text-red-400 text-sm mt-1">⚠️ {errors.date}</p>
                    )}
                </motion.div>
            </div>

            {/* Description */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
            >
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-300 mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter project description"
                    rows="5"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                />
            </motion.div>

            {/* Submit Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 pt-4"
            >
                <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                        </>
                    ) : (
                        <>✅ {initialData ? "Update Project" : "Create Project"}</>
                    )}
                </motion.button>
                <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 font-semibold rounded-lg transition-all cursor-pointer"
                >
                    Cancel
                </motion.button>
            </motion.div>
        </motion.form>
    );
}
