import Link from "next/link";
import type { Experience } from "@/lib/data";
import Tag from "./Tag";

export default function ExperienceCard({
  experience,
  projectName,
}: {
  experience: Experience;
  /** Name of the linked project (resolved from projectSlug). */
  projectName?: string;
}) {
  const e = experience;
  return (
    <article className="rounded-[12px] border border-border bg-card p-6 shadow-card tab:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent px-3 py-1 font-display text-[12px] font-bold tracking-[0.14em] text-on-accent">
            {e.type}
          </span>
          <span className="font-display text-[12px] font-bold tracking-[0.16em] text-text/75">{e.place}</span>
        </div>
        <p className="font-display text-[14px] text-text/80">{e.period}</p>
      </div>

      <h3 className="mt-6 font-display text-[24px] leading-tight font-bold pc:text-[28px]">{e.company}</h3>
      <p className="mt-1 font-display text-[16px] font-medium text-accent">{e.role}</p>
      <p className="mt-4 font-serif text-[16px] leading-[1.75] text-muted">{e.description}</p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Áreas">
        {e.areas.map((a) => (
          <li key={a}>
            <Tag>{a}</Tag>
          </li>
        ))}
      </ul>

      {e.projectSlug && projectName && (
        <Link
          href={`/projetos/${e.projectSlug}`}
          className="mt-6 inline-flex min-h-11 items-center font-display text-[14px] font-bold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
        >
          Ver projeto {projectName}
        </Link>
      )}
    </article>
  );
}
