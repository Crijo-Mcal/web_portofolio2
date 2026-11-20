import Image from "next/image";
import { DEVICON_BASE, getSkills, type Skill } from "@/lib/data";
import { GrowBar, Reveal, Stagger, StaggerItem } from "./motion";
import { SectionBadge, SectionTitle } from "./Tag";

function SkillIcon({ skill, size = 28 }: { skill: Skill; size?: number }) {
  return (
    <Image
      src={DEVICON_BASE + skill.icon}
      alt={skill.name}
      width={size}
      height={size}
      unoptimized
      className={skill.invert ? "invert" : undefined}
    />
  );
}

export default function Competencias() {
  const skills = getSkills();
  const comfortable = skills.filter((s) => s.level === "À vontade");
  const familiar = skills.filter((s) => s.level === "Familiaridade");

  return (
    <section id="competencias" className="py-[88px] pc:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionBadge>COMPETÊNCIAS</SectionBadge>
          <SectionTitle className="mt-5">Tecnologias com que trabalho</SectionTitle>
        </Reveal>

        {/* Tablet & PC: icon + name + level + bar */}
        <Stagger as="ul" stagger={0.05} className="mt-12 hidden gap-4 tab:grid tab:grid-cols-2 pc:grid-cols-3">
          {skills.map((s, i) => {
            const full = s.level === "À vontade";
            return (
              <StaggerItem
                as="li"
                key={s.name}
                className="flex items-center gap-4 rounded-[10px] border border-border bg-card/50 p-4 shadow-card transition-colors hover:border-accent/50"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-card shadow-icon">
                  <SkillIcon skill={s} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-[16px] font-bold">{s.name}</span>
                    <span className={`font-display text-[12px] font-medium ${full ? "text-accent" : "text-text/75"}`}>
                      {s.level}
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 rounded-full bg-white/10" aria-hidden="true">
                    <GrowBar
                      delay={i * 0.05}
                      className={`h-full rounded-full ${full ? "w-full bg-accent" : "w-1/2 bg-accent/60"}`}
                    />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* HP: two cards with logos only */}
        <div className="mt-10 flex flex-col gap-5 tab:hidden">
          {[
            { title: "À vontade com", list: comfortable, highlight: true },
            { title: "Familiaridade", list: familiar, highlight: false },
          ].map((group) => (
            <Reveal
              key={group.title}
              className={`rounded-[12px] border bg-card/50 p-5 shadow-card ${
                group.highlight ? "border-accent" : "border-border"
              }`}
            >
              <h3 className="font-display text-[16px] font-bold">{group.title}</h3>
              <Stagger as="ul" stagger={0.04} className="mt-4 grid grid-cols-5 gap-3">
                {group.list.map((s) => (
                  <StaggerItem
                    as="li"
                    key={s.name}
                    className="grid aspect-square place-items-center rounded-[8px] bg-card shadow-icon"
                    title={s.name}
                  >
                    <SkillIcon skill={s} size={26} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
