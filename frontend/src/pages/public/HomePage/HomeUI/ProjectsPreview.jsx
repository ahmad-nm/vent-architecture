import { getProjects } from "@/api/project";
import ProjectCard from "@/components/projects/ProjectCard";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useEffect, useState } from "react";

export default function ProjectsPreview({ type }) {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        const filtered =
          type === "All"
            ? data
            : data.filter((project) => project.project_type === type);
        setFilteredProjects(filtered);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Section>
      <Container>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-10">
          <h2 className="text-2xl font-light">Selected Projects / {type}</h2>
          <a
            href="/projects"
            className="text-white/50 text-sm hover:text-white"
          >
            View all
          </a>
        </div>

        {loading ? (
          <p className="text-xl text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <p className="text-white/40">
                No projects found for the selected category.
              </p>
            ) : (
              filteredProjects
                .slice(0, 3)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
