import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    uploadProjectImage,
    deleteProjectImage,
    updateProjectImage,
} from "@/api/adminGallery";
import GalleryImageCard from "./GalleryImageCard";

export default function GalleryManager({
    projectId,
    images = [],
    projectType = "residential",
}) {
    const [galleryImages, setGalleryImages] = useState(images);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setGalleryImages(images);
    }, [images]);

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setError(null);

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append("file", files[i]);
                formData.append("zone", ""); // Default empty zone

                const newImage = await uploadProjectImage(projectId, formData);
                setGalleryImages((prev) => [...prev, newImage.image]);
            }

            setSuccess(`${files.length} image(s) uploaded successfully!`);
            setTimeout(() => setSuccess(null), 3000);

            // Dispatch toast event
            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: {
                        type: "success",
                        message: `${files.length} image(s) uploaded!`,
                    },
                }),
            );
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Failed to upload image(s). Please try again.";
            setError(message);

            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: {
                        type: "error",
                        message,
                    },
                }),
            );
        } finally {
            setIsUploading(false);
            // Reset file input
            e.target.value = "";
        }
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await deleteProjectImage(projectId, imageId);
            setGalleryImages((prev) => prev.filter((img) => img.id !== imageId));

            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: {
                        type: "success",
                        message: "Image deleted successfully!",
                    },
                }),
            );
        } catch (err) {
            const message = err.response?.data?.message || "Failed to delete image.";

            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: {
                        type: "error",
                        message,
                    },
                }),
            );
        }
    };

    const handleUpdateZone = async (imageId, zone) => {
        try {
            await updateProjectImage(projectId, imageId, { zone });
            setGalleryImages((prev) =>
                prev.map((img) => (img.id === imageId ? { ...img, zone } : img)),
            );

            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: {
                        type: "success",
                        message: "Zone updated successfully!",
                    },
                }),
            );
        } catch (err) {
            const message = err.response?.data?.message || "Failed to update zone.";

            window.dispatchEvent(
                new CustomEvent("toast", {
                    detail: {
                        type: "error",
                        message,
                    },
                }),
            );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
        >
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Gallery Images</h2>
                <p className="text-slate-400">
                    Manage project gallery{" "}
                    {projectType === "interior" && "and organize zones"}
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                    ⚠️ {error}
                </motion.div>
            )}

            {/* Success Message */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
                >
                    ✓ {success}
                </motion.div>
            )}

            {/* Upload Area */}
            <div className="mb-8">
                <label
                    htmlFor="gallery_upload"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-500/30 rounded-xl bg-blue-500/5 cursor-pointer hover:border-blue-400/50 hover:bg-blue-500/10 transition-all"
                >
                    <span className="text-4xl mb-2">📸</span>
                    <span className="text-sm font-medium text-blue-300">
                        Click to upload gallery images
                    </span>
                    <span className="text-xs text-slate-500 mt-2">
                        PNG, JPG, GIF up to 5MB • Multiple files supported
                    </span>
                </label>
                <input
                    id="gallery_upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                />
            </div>

            {/* Loading State */}
            {isUploading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-slate-400 text-sm">Uploading images...</p>
                    </div>
                </div>
            )}

            {/* Gallery Grid */}
            {galleryImages.length > 0 && !isUploading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {galleryImages.map((image) => (
                            <GalleryImageCard
                                key={image.id}
                                image={image}
                                projectType={projectType}
                                onDelete={handleDeleteImage}
                                onUpdateZone={handleUpdateZone}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Empty State */}
            {galleryImages.length === 0 && !isUploading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                >
                    <p className="text-slate-400 text-sm">
                        No gallery images yet. Upload some to get started!
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
