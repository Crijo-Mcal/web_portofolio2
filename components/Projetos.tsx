import { getFeaturedProject, getGridProjects, getProjects } from "@/lib/data";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionBadge, SectionTitle } from "./Tag";

export default function Projetos() {
  const total = getProjects().length;
  const featured = getFeaturedProject();
  const grid = getGridProjects();

  return (
    <section id="projetos" className="bg-bg-alt py-[88px] pc:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionBadge>PROJETOS</SectionBadge>
            <SectionTitle className="mt-5">Aplicações que estou a construir</SectionTitle>
          </div>
          <p className="font-display text-[14px] text-text/75">
            {String(total).padStart(2, "0")} projetos · clique para ver detalhes
          </p>
        </Reveal>

        {featured && (
          <Reveal y={40} delay={0.1} className="mt-12">
            <FeaturedProject project={featured} />
          </Reveal>
        )}

        {grid.length > 0 && (
          <Stagger stagger={0.1} className="mt-8 grid grid-cols-1 gap-6 tab:grid-cols-2 pc:grid-cols-3">
            {grid.map((p) => (
              <StaggerItem key={p.slug} className="flex">
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
