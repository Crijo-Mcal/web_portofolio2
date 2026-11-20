import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import Tag from "./Tag";

/** Grid card: image with number badge, name, technologies, button. Whole card is clickable. */
export default function ProjectCard({ project }: { project: Project }) {
  const p = project;
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-[12px] border border-border bg-card shadow-card transition-colors hover:border-accent/60">
      {/* Image shown whole (contain) on a stage, so device mockups are never cropped */}
      <div className="stage relative aspect-video overflow-hidden">
        <Image
          src={p.image}
          alt={`Imagem do projeto ${p.name}`}
          fill
          sizes="(max-width: 600px) 92vw, (max-width: 900px) 46vw, 390px"
          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-on-accent/85 px-2.5 py-1 font-display text-[12px] font-bold tracking-[0.1em] text-accent">
          {p.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[12px] font-bold tracking-[0.14em] text-text/75">{p.category}</p>
        <h3 className="mt-2 font-display text-[20px] leading-tight font-bold">{p.name}</h3>

        <ul className="mt-4 mb-6 flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {p.technologies.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <Link
          href={`/projetos/${p.slug}`}
          className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-3 font-display text-[14px] font-medium text-on-accent shadow-accent transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-[#ffb94d]"
        >
          Ver projeto completo
        </Link>
      </div>
    </article>
  );
}
