import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Tag from "@/components/Tag";
import { getProjectBySlug, getProjects } from "@/lib/data";

// Only slugs from data/projects.json exist; anything else returns 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    openGraph: { title: project.name, description: project.description, images: [project.detailImage] },
  };
}

function InfoCard({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[12px] border border-border bg-card p-6 shadow-card tab:p-8 ${className}`}>
      <h2 className="font-display text-[12px] font-bold tracking-[0.16em] text-accent uppercase">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LinkButton({ href, label, variant }: { href: string; label: string; variant: "primary" | "outline" }) {
  return (
    // Without a link the Button renders as a disabled (non-clickable) button.
    <Button href={href || undefined} variant={variant} external>
      {label}
    </Button>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  return (
    // Single wrapper (not a Fragment): Next resets scroll only when the page's top is off-screen,
    // and a sticky header as first element always looks "in view", so the page kept the old scroll.
    <div>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-6">
          <Logo href="/" />
          <Button href="/#projetos" variant="outline" className="px-4 tab:px-6">
            Voltar aos projetos
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 pt-10 pb-24 pc:pt-14">
        <div className="stage relative aspect-[16/10] overflow-hidden rounded-[12px] border border-border shadow-card tab:aspect-[21/9]">
          <Image
            src={p.detailImage}
            alt={`Imagem do projeto ${p.name}`}
            fill
            preload
            sizes="(max-width: 1248px) 100vw, 1200px"
            className="object-contain p-4 tab:p-8"
          />
        </div>

        <div className="mt-10 max-w-[820px] pc:mt-14">
          <Tag variant="badge" className="font-bold tracking-[0.16em]">
            {p.number} · {p.category}
          </Tag>
          <h1 className="mt-5 font-display text-[36px] leading-[1.05] font-extrabold tracking-[-0.03em] tab:text-[40px] pc:text-[56px]">
            {p.name}
          </h1>
          <p className="mt-5 font-serif text-[16px] leading-[1.7] text-muted pc:text-[18px]">{p.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={p.demoUrl} label="Ver demo do website" variant="primary" />
            <LinkButton href={p.repoUrl} label="Ver repositório no GitHub" variant="outline" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 pc:grid-cols-2">
          <InfoCard title="Sobre o projeto" className="pc:row-span-2">
            <h3 className="font-display text-[24px] font-bold max-tab:text-[20px]">O que a aplicação faz</h3>
            <ul className="mt-5 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 font-serif text-[16px] leading-[1.6] text-muted">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Tecnologias">
            <ul className="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </InfoCard>

          {p.context && (
            <InfoCard title="Contexto">
              <p className="font-display text-[12px] font-bold tracking-[0.16em] text-text/75">{p.context.label}</p>
              <h3 className="mt-2 font-display text-[20px] font-bold">{p.context.title}</h3>
              <p className="mt-3 font-serif text-[16px] leading-[1.7] text-muted">{p.context.text}</p>
            </InfoCard>
          )}

          <InfoCard title="Tipo">
            <p className="font-display text-[18px] font-medium">{p.type}</p>
          </InfoCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
