import { getProjectById } from "@/api/project";
import Container from "@/components/ui/Container";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/animations/variants";

export default function ProjectDetailsPage() {
    const projectId = useParams().id;
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setLoading(true);

        const fetchProject = async () => {
            try {
                const data = await getProjectById(projectId);
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-500">Loading project...</p>
            </div>
        );
    }

    // Check if project is interior type and has zones
    const isInteriorProject = project.project_type?.toLowerCase() === "interior";
    const hasZones =
        isInteriorProject &&
        project.images &&
        project.images.some((img) => img.zone);

    // Group images by zone if they have zones
    const imagesByZone = hasZones
        ? project.images.reduce((acc, img) => {
            const zone = img.zone || "General";
            if (!acc[zone]) acc[zone] = [];
            acc[zone].push(img);
            return acc;
        }, {})
        : null;

    return (
        <div>
            {/* HERO IMAGE */}
            <section className="h-[45vh] md:h-[70vh] bg-white/5 border-b border-white/10 overflow-hidden">
                {project.main_image ? (
                    <motion.img
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src={resolveImageUrl(project.main_image)}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                        <p className="text-white/40 text-sm uppercase tracking-widest">
                            No Image Available
                        </p>
                    </div>
                )}
            </section>

            {/* CONTENT */}
            <section className="py-8">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
                        {/* LEFT */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <p className="text-white/40 text-sm uppercase tracking-widest">
                                    {project.project_type}
                                </p>

                                <h1 className="text-3xl md:text-4xl font-light mt-3">
                                    {project.name}
                                </h1>
                            </div>

                            <div className="space-y-3 text-white/60 text-sm">
                                <p>Location — {project.location}</p>
                                <p>Year — {project.date.substring(0, 4)}</p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-2 space-y-8">
                            <p className="text-white/70 leading-relaxed text-base md:text-lg">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* GALLERY SECTION */}
            {project.images && project.images.length > 0 && (
                <section className="py-8">
                    <Container>
                        {hasZones ? (
                            // ZONE-BASED GALLERY (for interior projects only)
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-12"
                            >
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                                        Gallery
                                    </h2>
                                    <div className="h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                                </div>

                                {Object.entries(imagesByZone).map(([zone, images]) => (
                                    <motion.div
                                        key={zone}
                                        variants={itemVariants}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-xl font-light text-white/80 uppercase tracking-widest">
                                            {zone}
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {images.map((image, idx) => (
                                                <motion.div
                                                    key={image.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="group relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-white/30 transition-all"
                                                    onClick={() => setSelectedImage(image)}
                                                >
                                                    <img
                                                        src={resolveImageUrl(image.image_path)}
                                                        alt={`${zone} ${idx + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                                                            🔍
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            // PINTEREST-STYLE MASONRY GALLERY (for non-interior projects)
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                                        Gallery
                                    </h2>
                                    <div className="h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                                </div>

                                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                                    {project.images.map((image, idx) => (
                                        <motion.div
                                            key={image.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.03 }}
                                            className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-white/30 transition-all break-inside-avoid hover:shadow-xl"
                                            onClick={() => setSelectedImage(image)}
                                        >
                                            <img
                                                src={resolveImageUrl(image.image_path)}
                                                alt={`Gallery ${idx + 1}`}
                                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                                                    🔍
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </Container>
                </section>
            )}

            {/* LIGHTBOX MODAL */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative h-full flex items-center justify-center p-4"
                    >
                        {/* IMAGE */}
                        <img
                            src={resolveImageUrl(selectedImage.image_path)}
                            alt="Full size"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* IMAGE COUNT */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
                            <span>
                                {project.images.findIndex(
                                    (img) => img.id === selectedImage.id,
                                ) + 1}
                            </span>
                            <span className="mx-2">/</span>
                            <span>{project.images.length}</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
