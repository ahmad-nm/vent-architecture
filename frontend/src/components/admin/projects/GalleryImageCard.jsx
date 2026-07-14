import { useState } from "react";
import { motion } from "framer-motion";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

import { formatZoneForDisplay, formatZoneForStorage } from "@/utils/helperFunctions";

export default function GalleryImageCard({
    image,
    projectType,
    onDelete,
    onUpdateZone,
}) {
    const [isZoneEditing, setIsZoneEditing] = useState(false);
    const [zone, setZone] = useState(image.zone || "");
    const [isDeleting, setIsDeleting] = useState(false);

    const isInteriorProject = projectType?.toLowerCase() === "interior";

    const handleZoneSave = async () => {
        if (onUpdateZone) {
            const formattedZone = formatZoneForStorage(zone);
            await onUpdateZone(image.id, formattedZone);
        }
        setIsZoneEditing(false);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            setIsDeleting(true);
            if (onDelete) {
                await onDelete(image.id);
            }
            setIsDeleting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative group"
        >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                {/* Image */}
                <img
                    src={resolveImageUrl(image.image_path || image.url)}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition-colors disabled:opacity-50"
                        title="Delete image"
                    >
                        {isDeleting ? "..." : "🗑️"}
                    </button>

                    {/* Zone Edit Button (Interior Only) */}
                    {isInteriorProject && (
                        <button
                            onClick={() => setIsZoneEditing(!isZoneEditing)}
                            className="p-2 bg-blue-500/80 hover:bg-blue-600 rounded-lg text-white transition-colors"
                            title="Edit zone"
                        >
                            ✏️
                        </button>
                    )}
                </div>

                {/* Zone Badge */}
                {isInteriorProject && zone && !isZoneEditing && (
                    <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Zone: {formatZoneForDisplay(zone)}
                    </div>
                )}
            </div>

            {/* Zone Edit Modal */}
            {isZoneEditing && isInteriorProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setIsZoneEditing(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-96 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm text-slate-300 font-medium">
                                Zone Name
                            </label>
                            <button
                                onClick={() => setIsZoneEditing(false)}
                                className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                placeholder="e.g., Master Bedroom"
                                className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => setIsZoneEditing(false)}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleZoneSave}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}
