import { getExperiences, getProjectBySlug } from "@/lib/data";
import ExperienceCard from "./ExperienceCard";
import { Reveal } from "./motion";
import { SectionBadge, SectionTitle } from "./Tag";

export default function Experiencia() {
  const experiences = getExperiences();

  return (
    <section id="experiencia" className="py-[88px] pc:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pc:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] pc:gap-16">
        <Reveal className="pc:sticky pc:top-28 pc:self-start">
          <SectionBadge>EXPERIÊNCIA</SectionBadge>
          <SectionTitle className="mt-5">Aprendizagem em contexto real.</SectionTitle>
          <p className="mt-5 max-w-[420px] font-serif text-[16px] leading-[1.75] text-muted">
            O meu percurso profissional, do mais recente para o mais antigo.
          </p>
        </Reveal>

        <div className="flex flex-col gap-6">
          {experiences.map((e, i) => (
            <Reveal key={`${e.company}-${e.period}`} delay={0.12 + i * 0.06}>
              <ExperienceCard
                experience={e}
                projectName={e.projectSlug ? getProjectBySlug(e.projectSlug)?.name : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
