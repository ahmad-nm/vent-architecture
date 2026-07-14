import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import ProjectCard from "@/components/projects/ProjectCard";
import CategoryFilter from "@/components/projects/CategoryFilter";

import { getProjects } from "@/api/project";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Fetch projects on mount
  useEffect(() => {
    setLoading(true);

    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects when category changes or projects load
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.project_type === selectedCategory),
      );
    }
  }, [selectedCategory, projects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div>
      {/* HERO */}
      <Section>
        <Container>
          <div className="space-y-6 max-w-3xl">
            <p className="uppercase tracking-[0.3em] text-sm text-white/40">
              Portfolio
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light">
              Selected Projects
            </h1>

            <p className="text-white/60 leading-relaxed">
              A collection of architectural explorations focused on spatial
              atmosphere, structure, and modern living.
            </p>
          </div>
        </Container>
      </Section>

      {/* FILTER */}
      <Section className="pt-0">
        <Container>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </Container>
      </Section>

      {/* GRID */}
      <Section className="pt-0">
        <Container>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.length === 0 ? (
              <p className="text-white/40">
                No projects found for the selected category.
              </p>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
