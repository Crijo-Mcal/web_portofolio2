import type { ReactNode } from "react";
import type { Site } from "@/lib/data";
import Button from "./Button";
import { Reveal } from "./motion";
import { SectionTitle } from "./Tag";

const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M9 14h6M9 18h6" />
    </svg>
  ),
};

function ContactRow({
  icon,
  label,
  value,
  href,
  download,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  download?: boolean;
}) {
  const inner = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-card text-accent shadow-icon">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[12px] font-bold tracking-[0.16em] text-text/75">{label}</span>
        <span className="block truncate font-display text-[16px] font-medium">{value}</span>
      </span>
    </>
  );
  const cls = "flex items-center gap-4 rounded-[10px] border border-border p-4 transition-colors";

  if (!href) {
    return (
      <div className={`${cls} opacity-50`} aria-disabled="true">
        {inner}
      </div>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${cls} hover:border-accent/60 hover:bg-card/40`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {inner}
    </a>
  );
}

export default function Contactos({ site }: { site: Site }) {
  return (
    <section id="contactos" className="py-[88px] pc:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 pc:grid-cols-2 pc:gap-[120px]">
        <Reveal>
          <p className="font-display text-[12px] font-bold tracking-[0.18em] text-accent">CONTACTOS</p>
          <SectionTitle className="mt-4">Vamos trabalhar juntos?</SectionTitle>
          <p className="mt-5 max-w-[440px] font-serif text-[16px] leading-[1.75] text-muted pc:text-[18px]">
            Estou disponível para conversar sobre projetos, oportunidades e novas formas de aprender.
          </p>
          <Button href={site.emailUrl} className="mt-8">
            Enviar email
          </Button>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="font-display text-[12px] font-bold tracking-[0.18em] text-text/75">SIGA-ME</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <ContactRow icon={icons.github} label="GITHUB" value={site.github.label} href={site.github.url} />
            </li>
            <li>
              <ContactRow icon={icons.mail} label="EMAIL" value={site.email} href={site.emailUrl} />
            </li>
            <li>
              <ContactRow
                icon={icons.file}
                label="CURRÍCULO"
                value={site.cvAvailable ? "Descarregar CV" : "Descarregar CV (em breve)"}
                href={site.cvAvailable ? site.cvUrl : undefined}
                download
              />
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
