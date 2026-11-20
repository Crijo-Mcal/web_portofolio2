import Button from "./Button";
import { Reveal } from "./motion";
import { SectionBadge, SectionTitle } from "./Tag";

/** Same two-column layout as Experiência: heading on the left, card on the right. */
export default function Sobre() {
  return (
    <section id="sobre" className="bg-bg-alt py-[88px] pc:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pc:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] pc:gap-16">
        <Reveal className="pc:self-start">
          <SectionBadge>SOBRE MIM</SectionBadge>
          <SectionTitle className="mt-5">Design, código e vontade de evoluir.</SectionTitle>
          <Button href="#experiencia" variant="outline" className="mt-8">
            Ver experiência
          </Button>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="rounded-[12px] border border-border bg-card p-6 shadow-card tab:p-8">
            <div className="space-y-5 font-serif text-[16px] leading-[1.75] text-muted">
              <p>
                Sou Crijolise, venho de <strong className="font-bold text-accent">Timor-Leste</strong> e concluí a{" "}
                <strong className="font-bold text-accent">Licenciatura em Design e Multimédia</strong> na{" "}
                <strong className="font-bold text-accent">Universidade de Coimbra</strong>.
              </p>
              <p>Atualmente, dedico-me ao desenvolvimento web, explorando tanto o frontend como o backend.</p>
              <p>Gosto de aprender, experimentar novas ideias e continuar a evoluir através de novos projetos.</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
