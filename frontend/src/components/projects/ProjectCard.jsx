import { Link } from "react-router-dom";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

export default function ProjectCard({ project }) {
    return (
        <Link to={`/projects/${project.id}`} className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition">

            {/* Image */}
            <div className="h-64 bg-white/5 overflow-hidden">
                {project.main_image ? (
                    <img src={resolveImageUrl(project.main_image)} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent">
                        <p className="text-white/40 text-sm uppercase tracking-widest">
                            No Image Available
                        </p>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">

                <div className="flex items-center justify-between">
                    <p className="text-sm text-white/40 uppercase tracking-wider">
                        {project.project_type}
                    </p>

                    <p className="text-sm text-white/30">
                        {(project.date).substring(0, 4)}
                    </p>
                </div>

                <h3 className="text-2xl font-light">
                    {project.name}
                </h3>

                <p className="text-white/55 leading-relaxed text-sm">
                    {project.description}
                </p>

            </div>
        </Link>
    );
}