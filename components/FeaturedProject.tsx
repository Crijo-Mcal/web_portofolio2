import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import Tag from "./Tag";

/** Large full-width orange card for the project marked "featured": true. */
export default function FeaturedProject({ project }: { project: Project }) {
  const p = project;
  const caption = [p.status, p.context?.label].filter(Boolean).join(" · ");

  return (
    <article className="group relative isolate overflow-hidden rounded-[12px] bg-accent p-6 text-on-accent shadow-featured tab:p-10 pc:p-14">
      {/* Giant faint number */}
      <span
        className="pointer-events-none absolute -right-4 -bottom-16 -z-10 font-display text-[clamp(200px,32vw,420px)] leading-none font-extrabold tracking-[-0.06em] text-on-accent/[0.07] select-none"
        aria-hidden="true"
      >
        {p.number}
      </span>

      <div className="grid items-center gap-10 pc:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] pc:gap-14">
        {/* Image in a slightly tilted browser window (moves to top ≤900px) */}
        <div className="relative order-1 pc:order-2">
          {/* Dark layer behind the window for depth */}
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[8px] bg-on-accent/20"
            aria-hidden="true"
          />
          <div className="relative -rotate-2 overflow-hidden rounded-[8px] border-[6px] border-on-accent bg-on-accent shadow-featured transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:-rotate-1">
            <div className="flex items-center gap-1.5 px-2.5 pt-1 pb-2.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="mx-auto h-5 w-1/2 rounded-md bg-white/10" />
              <span className="w-[42px]" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[8px] bg-white">
              <Image
                src={p.image}
                alt={`Imagem do projeto ${p.name}`}
                fill
                sizes="(max-width: 900px) 90vw, 640px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="order-2 pc:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1.5 font-display text-[12px] font-bold tracking-[0.16em] text-white">
            <span aria-hidden="true">★</span> PROJETO PRINCIPAL
          </span>
          <h3 className="mt-5 font-display text-[40px] leading-none font-extrabold tracking-[-0.03em] pc:text-[56px]">
            {p.name}
          </h3>
          <p className="mt-4 max-w-[460px] font-serif text-[16px] leading-[1.7] pc:text-[18px]">
            {p.shortDescription}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias">
            {p.technologies.map((t) => (
              <li key={t}>
                <Tag variant="dark">{t}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {/* Stretched link: the whole card is clickable */}
            <Link
              href={`/projetos/${p.slug}`}
              className="inline-flex min-h-11 items-center rounded-full bg-on-accent px-6 py-3 font-display text-[14px] font-medium text-text transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-[#262626]"
            >
              Ver projeto completo
            </Link>
            {caption && (
              <p className="font-display text-[12px] font-bold tracking-[0.16em] uppercase">{caption}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
